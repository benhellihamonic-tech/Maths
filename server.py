#!/usr/bin/env python3
import argparse
import hashlib
import hmac
import json
import os
import re
import secrets
import shutil
import sqlite3
import subprocess
from contextlib import contextmanager
from http.cookies import SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from time import time
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
LESSONS = {"division", "algebre", "fractions", "proportion", "relatifs", "pythagore", "pourcentages", "fonctions"}
LESSONS.update(json.loads((ROOT / "curriculum_ids.json").read_text(encoding="utf-8")))
MODES = {"lecon", "quiz", "jeu"}
SESSION_SECONDS = 43200
EVENT_ID = re.compile(r"[-a-zA-Z0-9]{8,64}")
ACTIVITY_ID = re.compile(r"[-a-zA-Z0-9/:_]{1,120}")
CHAPTER_ID = re.compile(r"[a-z0-9-]{0,100}")
GRADES = ("6e", "5e", "4e", "3e")
JSCORE = Path("/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc")
PROGRESS_QUERY = """SELECT lesson,mode,state,COALESCE(revision,0) AS revision
    FROM progress LEFT JOIN progress_revisions USING (username,lesson,mode)"""


@contextmanager
def database(path):
    db = sqlite3.connect(path, timeout=10)
    db.row_factory = sqlite3.Row
    try:
        with db:
            yield db
    finally:
        db.close()


def password_hash(password, salt):
    return hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 240000).hex()


def create_account(db, username, password, name, grade, role="student"):
    salt = secrets.token_bytes(16)
    db.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)",
               (username, name, grade, role, salt, password_hash(password, salt)))


def initialize(path):
    with database(path) as db:
        db.executescript("""
            CREATE TABLE IF NOT EXISTS users (
              username TEXT PRIMARY KEY, name TEXT, grade TEXT, role TEXT,
              salt BLOB, password TEXT
            );
            CREATE TABLE IF NOT EXISTS sessions (
              token TEXT PRIMARY KEY, username TEXT, expiry INTEGER
            );
            CREATE TABLE IF NOT EXISTS progress_history (
              username TEXT, lesson TEXT, mode TEXT, event TEXT, state TEXT,
              updated INTEGER, PRIMARY KEY(username, event)
            );
            CREATE TABLE IF NOT EXISTS progress (
              username TEXT, lesson TEXT, mode TEXT, state TEXT,
              updated INTEGER, PRIMARY KEY(username, lesson, mode)
            );
        """)
        db.executescript((ROOT / "cloudflare/migrations/0003_activities.sql").read_text(encoding="utf-8"))
        db.executescript((ROOT / "cloudflare/migrations/0004_class_chapters.sql").read_text(encoding="utf-8"))
        for user, password, name, grade, role in (
            ("camille", "atelier6", "Camille", "6e", "student"),
            ("noa", "atelier4", "Noa", "4e", "student"),
            ("marie", "atelierprof", "Marie", "", "teacher"),
        ):
            if not db.execute("SELECT 1 FROM users WHERE username=?", (user,)).fetchone():
                create_account(db, user, password, name, grade, role)
        db.commit()


def progress_operation(operation, *args):
    # The local demo uses the same question generator and validator as Cloudflare.
    # Pass submissions on stdin, never in command arguments or through a shell.
    invoke = """
        const {operation,args}=JSON.parse(input);
        emit(JSON.stringify(worker[operation](...args)));
    """
    if JSCORE.is_file():
        command = [str(JSCORE), "-e", """
            import("./cloudflare/worker.mjs").then(worker=>{
                const input=readline(), emit=print;
                """ + invoke + """
            }).catch(error=>{print(error);quit(1);});
        """]
    else:
        node = shutil.which("node")
        if not node:
            raise RuntimeError("Node.js est nécessaire pour vérifier la progression sur ce serveur local.")
        command = [node, "--input-type=module", "-e", """
            import * as worker from "./cloudflare/worker.mjs";
            import {readFileSync} from "node:fs";
            const input=readFileSync(0,"utf8"), emit=console.log;
        """ + invoke]
    result = subprocess.run(command, cwd=ROOT, input=json.dumps({"operation": operation, "args": args}) + "\n",
                            text=True, capture_output=True, check=True, timeout=10)
    return json.loads(result.stdout)


def learning_evidence(db, username):
    rows = db.execute("""SELECT lesson,mode,state FROM progress_history
        WHERE username=? AND (mode='jeu' OR json_extract(state,'$.done')=1)
        UNION ALL SELECT lesson,mode,state FROM progress WHERE username=?""", (username, username))
    records = [dict(row) for row in rows]
    return progress_operation("summarizeProgress", records) if records else {}


def valid_revision(value):
    return type(value) is int and 0 <= value < 2**53 - 1


def activity_record(row):
    return {"id": row["id"], "state": json.loads(row["state"]), "revision": row["revision"]} if row else None


def progress_record(row):
    return {"lesson": row["lesson"], "mode": row["mode"], **json.loads(row["state"]),
            "revision": row["revision"]} if row else None


def class_focus(db):
    return {row["grade"]: row["chapter"] for row in db.execute("SELECT grade,chapter FROM class_focus")}


def class_chapter_status(db):
    status = {grade: [] for grade in GRADES}
    for row in db.execute("SELECT grade,chapter FROM class_chapters"):
        if row["grade"] in status:
            status[row["grade"]].append(row["chapter"])
    return {"classChapters": status}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "public"), **kwargs)

    def reply(self, data, status=200, cookie=None):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def identity(self, db):
        cookie = SimpleCookie(self.headers.get("Cookie", ""))
        token = cookie.get("jpp_session")
        if not token:
            return None
        return db.execute("""
            SELECT users.username, name, grade, role FROM sessions JOIN users USING(username)
            WHERE token=? AND expiry>?
        """, (token.value, int(time()))).fetchone()

    def do_GET(self):
        path = urlsplit(self.path).path
        if not path.startswith("/api/"):
            return super().do_GET()
        with database(self.server.db_path) as db:
            if path == "/api/class-chapters":
                return self.reply(class_chapter_status(db))
            user = self.identity(db)
            if not user:
                return self.reply({"error": "Connexion requise."}, 401)
            if path == "/api/me":
                rows = db.execute(PROGRESS_QUERY + " WHERE username=? ORDER BY updated DESC", (user["username"],))
                activities = db.execute("SELECT id,state,revision FROM activities WHERE username=?", (user["username"],))
                history = db.execute("""SELECT id,state,revision FROM activity_events
                    WHERE username=? AND state IS NOT NULL ORDER BY updated DESC""", (user["username"],))
                try:
                    evidence = learning_evidence(db, user["username"])
                except (RuntimeError, subprocess.SubprocessError, ValueError):
                    return self.reply({"error": "Le moteur de correction local est indisponible."}, 503)
                return self.reply({"user": dict(user), "evidence": evidence,
                                   "progress": [progress_record(row) for row in rows],
                                   "activities": [activity_record(row) for row in activities],
                                   "activityHistory": [activity_record(row) for row in history],
                                   "classFocus": class_focus(db)})
            if path == "/api/students" and user["role"] == "teacher":
                rows = db.execute("""SELECT username, name, grade,
                    (SELECT count(*) FROM progress WHERE progress.username=users.username
                     AND json_extract(state, '$.done')=1) AS completed,
                    (SELECT count(*) FROM activity_events WHERE activity_events.username=users.username
                     AND state IS NOT NULL) AS activitiesCompleted
                    FROM users WHERE role='student' ORDER BY name""")
                return self.reply({"students": [dict(row) for row in rows]})
        return self.reply({"error": "Page introuvable."}, 404)

    def do_POST(self):
        if self.headers.get("Origin") not in (None, "http://" + self.headers.get("Host", "")):
            return self.reply({"error": "Origine refusée."}, 403)
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 32768:
                raise ValueError
            body = json.loads(self.rfile.read(size))
            if not isinstance(body, dict):
                raise ValueError
        except (ValueError, UnicodeError):
            return self.reply({"error": "Requête invalide."}, 400)
        path = urlsplit(self.path).path
        with database(self.server.db_path) as db:
            if path == "/api/login":
                username, password = body.get("username"), body.get("password")
                create = body.get("create")
                if "create" in body and type(create) is not bool:
                    return self.reply({"error": "Mode de connexion invalide."}, 400)
                if not isinstance(username, str) or not isinstance(password, str) or len(password) > 128:
                    return self.reply({"error": "Identifiants invalides."}, 400)
                username = username.strip().lower()
                if not 3 <= len(username) <= 24 or not username.isascii() or not username.replace("-", "").isalnum():
                    return self.reply({"error": "Choisis un identifiant de 3 à 24 caractères : lettres, chiffres ou tiret."}, 400)
                db.execute("BEGIN IMMEDIATE")
                user = db.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
                if user and create is True:
                    return self.reply({"error": "Cet identifiant est déjà utilisé."}, 409)
                if not user and create is False:
                    return self.reply({"error": "Identifiant ou mot de passe incorrect."}, 401)
                if not user:
                    if len(password) < 8:
                        return self.reply({"error": "Choisis un mot de passe de 8 caractères minimum."}, 400)
                    create_account(db, username, password, username, "")
                    user = db.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
                candidate = password_hash(password, user["salt"] if user else b"jpp-demo-login")
                if not user or not hmac.compare_digest(candidate, user["password"]):
                    return self.reply({"error": "Identifiant ou mot de passe incorrect."}, 401)
                token = secrets.token_urlsafe(32)
                db.execute("DELETE FROM sessions WHERE expiry<=?", (int(time()),))
                db.execute("INSERT INTO sessions VALUES (?, ?, ?)",
                           (token, user["username"], int(time()) + SESSION_SECONDS))
                db.commit()
                return self.reply({"ok": True}, cookie=f"jpp_session={token}; Path=/; HttpOnly; SameSite=Strict; Max-Age={SESSION_SECONDS}")
            user = self.identity(db)
            if not user:
                return self.reply({"error": "Connexion requise."}, 401)
            if path == "/api/logout":
                cookie = SimpleCookie(self.headers["Cookie"])
                db.execute("DELETE FROM sessions WHERE token=?", (cookie["jpp_session"].value,))
                db.commit()
                return self.reply({"ok": True}, cookie="jpp_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0")
            if path == "/api/grade" and user["role"] == "student":
                grade = body.get("grade")
                if grade not in GRADES:
                    return self.reply({"error": "Classe invalide."}, 400)
                db.execute("UPDATE users SET grade=? WHERE username=?", (grade, user["username"]))
                db.commit()
                return self.reply({"ok": True})
            if path == "/api/activity" and user["role"] == "student":
                return self.save_activity(db, user["username"], body)
            if path == "/api/progress" and user["role"] == "student":
                try:
                    return self.save_progress(db, user["username"], body)
                except (RuntimeError, subprocess.SubprocessError, ValueError):
                    return self.reply({"error": "Le moteur de correction local est indisponible."}, 503)
            if path == "/api/class-focus" and user["role"] == "teacher":
                return self.set_class_focus(db, body)
            if path == "/api/class-chapters":
                if user["role"] != "teacher":
                    return self.reply({"error": "Accès réservé à l’espace prof."}, 403)
                return self.set_class_chapter(db, body)
            if path in ("/api/students", "/api/reset") and user["role"] == "teacher":
                return self.manage_student(db, path, body)
        return self.reply({"error": "Action indisponible."}, 404)

    def save_activity(self, db, username, body):
        activity_id, state, revision, event = (body.get(key) for key in ("id", "state", "revision", "event"))
        if (not isinstance(activity_id, str) or not ACTIVITY_ID.fullmatch(activity_id)
                or not isinstance(state, dict) or not valid_revision(revision)
                or not isinstance(event, str) or not EVENT_ID.fullmatch(event)):
            return self.reply({"error": "Activité invalide."}, 400)
        try:
            payload = json.dumps(state, allow_nan=False)
        except ValueError:
            return self.reply({"error": "Activité invalide."}, 400)
        db.execute("BEGIN IMMEDIATE")
        previous = activity_record(db.execute(
            "SELECT id,state,revision FROM activities WHERE username=? AND id=?", (username, activity_id)).fetchone())
        receipt = db.execute("SELECT id FROM activity_events WHERE username=? AND event=?", (username, event)).fetchone()
        if receipt and receipt["id"] == activity_id:
            return self.reply({"activity": previous})
        if receipt or revision != (previous["revision"] if previous else 0):
            return self.reply({"error": "Cette activité a changé sur un autre appareil.", "activity": previous}, 409)
        next_revision = revision + 1
        db.execute("""INSERT INTO activities (username,id,state,revision,last_event) VALUES (?,?,?,?,?)
            ON CONFLICT(username,id) DO UPDATE SET state=excluded.state,
            revision=excluded.revision,last_event=excluded.last_event""",
                   (username, activity_id, payload, next_revision, event))
        db.execute("""INSERT INTO activity_events (username,event,id,state,revision,updated) VALUES (?,?,?,?,?,?)""",
                   (username, event, activity_id, payload if state.get("done") is True else None,
                    next_revision, time_ns()))
        db.commit()
        return self.reply({"activity": {"id": activity_id, "state": state, "revision": next_revision}})

    def set_class_focus(self, db, body):
        grade, chapter = body.get("grade"), body.get("chapter")
        if grade not in GRADES or not isinstance(chapter, str) or not CHAPTER_ID.fullmatch(chapter):
            return self.reply({"error": "Chapitre de classe invalide."}, 400)
        if chapter:
            db.execute("""INSERT INTO class_focus (grade,chapter) VALUES (?,?)
                ON CONFLICT(grade) DO UPDATE SET chapter=excluded.chapter""", (grade, chapter))
        else:
            db.execute("DELETE FROM class_focus WHERE grade=?", (grade,))
        db.commit()
        return self.reply({"classFocus": class_focus(db)})

    def set_class_chapter(self, db, body):
        grade, chapter, covered = (body.get(key) for key in ("grade", "chapter", "covered"))
        if grade not in GRADES or not isinstance(chapter, str) or not isinstance(covered, bool):
            return self.reply({"error": "Chapitre de classe invalide."}, 400)
        try:
            valid = progress_operation("isClassChapter", grade, chapter)
        except (RuntimeError, subprocess.SubprocessError, ValueError):
            return self.reply({"error": "Le suivi de classe est indisponible."}, 503)
        if not valid:
            return self.reply({"error": "Chapitre de classe invalide."}, 400)
        if covered:
            db.execute("INSERT OR IGNORE INTO class_chapters (grade,chapter) VALUES (?,?)", (grade, chapter))
        else:
            db.execute("DELETE FROM class_chapters WHERE grade=? AND chapter=?", (grade, chapter))
        db.commit()
        return self.reply(class_chapter_status(db))

    def save_progress(self, db, username, body):
        lesson, mode, submitted, event = (body.get(key) for key in ("lesson", "mode", "state", "event"))
        if (not isinstance(lesson, str) or lesson not in LESSONS or not isinstance(mode, str) or mode not in MODES
                or not isinstance(submitted, dict) or not isinstance(event, str) or not EVENT_ID.fullmatch(event)
                or ("revision" in body and not valid_revision(body["revision"]))):
            return self.reply({"error": "Progression invalide."}, 400)
        db.execute("BEGIN IMMEDIATE")
        previous = progress_record(db.execute(
            PROGRESS_QUERY + " WHERE username=? AND lesson=? AND mode=?", (username, lesson, mode)).fetchone())
        revision = previous["revision"] if previous else 0
        receipt = db.execute("SELECT lesson,mode FROM progress_history WHERE username=? AND event=?",
                             (username, event)).fetchone()
        if receipt and (receipt["lesson"], receipt["mode"]) == (lesson, mode):
            return self.reply({"ok": True, "progress": previous, "revision": revision,
                               "evidence": learning_evidence(db, username)})
        if receipt or body.get("revision", revision) != revision:
            return self.reply({"error": "Cette progression a changé sur un autre appareil.", "progress": previous}, 409)
        args = [lesson, mode, submitted, previous]
        if "proof" in body:
            args.append(body["proof"])
        state = progress_operation("sanitizeProgress", *args)
        if state is None:
            return self.reply({"error": "Progression invalide."}, 400)
        payload, updated, next_revision = json.dumps(state), time_ns(), revision + 1
        db.execute("""INSERT INTO progress_history (username,lesson,mode,event,state,updated) VALUES (?,?,?,?,?,?)""",
                   (username, lesson, mode, event, payload, updated))
        db.execute("""INSERT INTO progress VALUES (?,?,?,?,?) ON CONFLICT(username,lesson,mode) DO UPDATE
            SET state=excluded.state, updated=excluded.updated""", (username, lesson, mode, payload, updated))
        db.execute("""INSERT INTO progress_revisions VALUES (?,?,?,?,?) ON CONFLICT(username,lesson,mode)
            DO UPDATE SET revision=excluded.revision,last_event=excluded.last_event""",
                   (username, lesson, mode, next_revision, event))
        db.commit()
        return self.reply({"ok": True, "progress": {"lesson": lesson, "mode": mode, **state, "revision": next_revision},
                           "revision": next_revision, "evidence": learning_evidence(db, username)})

    def manage_student(self, db, path, body):
        user = str(body.get("username", "")).strip().lower()
        if not 3 <= len(user) <= 24 or not user.isascii() or not user.replace("-", "").isalnum():
            return self.reply({"error": "Identifiant de 3 à 24 caractères (lettres, chiffres, tiret)."}, 400)
        password = secrets.token_urlsafe(9)
        if path == "/api/reset":
            salt = secrets.token_bytes(16)
            result = db.execute("UPDATE users SET salt=?, password=? WHERE username=? AND role='student'",
                                (salt, password_hash(password, salt), user))
            if not result.rowcount:
                return self.reply({"error": "Élève introuvable."}, 404)
            db.execute("DELETE FROM sessions WHERE username=?", (user,))
        else:
            name, grade = str(body.get("name", "")).strip(), body.get("grade")
            if not 1 <= len(name) <= 50 or grade not in GRADES:
                return self.reply({"error": "Renseigne le prénom et la classe."}, 400)
            try:
                create_account(db, user, password, name, grade)
            except sqlite3.IntegrityError:
                return self.reply({"error": "Cet identifiant est déjà utilisé."}, 409)
        db.commit()
        return self.reply({"username": user, "password": password})


def time_ns():
    return int(time() * 1_000_000)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--db", type=Path, default=ROOT / "data" / "jppmaths.sqlite3")
    args = parser.parse_args()
    os.umask(0o077)
    args.db.parent.mkdir(exist_ok=True, parents=True)
    initialize(args.db)
    with ThreadingHTTPServer(("127.0.0.1", args.port), Handler) as server:
        server.db_path = args.db
        print(f"L’Archipel des mathématiques · http://localhost:{args.port}", flush=True)
        server.serve_forever()


if __name__ == "__main__":
    main()
