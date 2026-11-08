import { concepts, games, lessons, questions } from "../public/content.js";
import { commonFactor } from "../public/assessment.js";
import { updateEvidence } from "../public/progression.js";
import { chapters } from "../public/chapters.js";

const encode = value => new TextEncoder().encode(value);
const cookieName = "__Host-archipel";
const lifetime = 43200;
const grades = ["6e", "5e", "4e", "3e"];
const modes = ["lecon", "quiz", "jeu"];
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "X-Frame-Options": "DENY",
};
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2,"0")).join("");
const unhex = text => Uint8Array.from(text.match(/../g), byte => parseInt(byte,16));
const random = (length=32) => hex(crypto.getRandomValues(new Uint8Array(length)));
const hash = async value => hex(await crypto.subtle.digest("SHA-256",encode(value)));
const now = () => Math.floor(Date.now()/1000);
const eventID = value => typeof value==="string"&&/^[-a-zA-Z0-9]{8,64}$/.test(value);
const revisionNumber = value => Number.isSafeInteger(value)&&value>=0&&value<Number.MAX_SAFE_INTEGER;

async function passwordDigest(password, salt) {
  const key = await crypto.subtle.importKey("raw",encode(password),"PBKDF2",false,["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:unhex(salt),iterations:100000},key,256));
}
function equals(a,b) {
  let difference=a.length^b.length;
  for(let i=0;i<a.length;i++) difference|=a.charCodeAt(i)^b.charCodeAt(i);
  return difference===0;
}
function reply(data,status=200,cookie) {
  return Response.json(data,{status,headers:{
    ...securityHeaders,"Cache-Control":"no-store",...(cookie?{"Set-Cookie":cookie}:{}),
  }});
}
const fail=(message,status)=>reply({error:message},status);
const sessionCookie=(token,seconds)=>`${cookieName}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${seconds}`;
const tokenFrom=request=>request.headers.get("Cookie")?.split(";").map(c=>c.trim())
  .find(c=>c.startsWith(cookieName+"="))?.slice(cookieName.length+1);

async function login(request,db,body) {
  const username=typeof body.username==="string"?body.username.trim().toLowerCase():"";
  const password=body.password;
  if(!/^[a-z0-9-]{3,24}$/.test(username)||typeof password!=="string"||password.length<8||password.length>128)
    return fail("Identifiant de 3 à 24 caractères et mot de passe de 8 à 128 caractères.",400);
  if(body.create!==undefined&&typeof body.create!=="boolean") return fail("Mode de connexion invalide.",400);
  const timestamp=now();
  const ip=request.headers.get("CF-Connecting-IP")||"unknown";
  const key=await hash(ip+"|"+username+"|"+Math.floor(timestamp/300));
  const ipKey=await hash(ip+"|"+Math.floor(timestamp/300));
  const limit=db.prepare(`INSERT INTO auth_limits VALUES (?, ?, 1)
    ON CONFLICT(key) DO UPDATE SET attempts=attempts+1 RETURNING attempts`);
  const [pair,global]=await db.batch([limit.bind(key,timestamp+300),limit.bind(ipKey,timestamp+300)]);
  if(pair.results[0].attempts>12||global.results[0].attempts>90)
    return fail("Trop de tentatives. Réessaie dans quelques minutes.",429);
  let user=await db.prepare("SELECT * FROM users WHERE username=?").bind(username).first();
  if(user&&body.create===true) return fail("Cet identifiant est déjà utilisé.",409);
  if(!user&&body.create===false) return fail("Identifiant ou mot de passe incorrect.",401);
  if(!user) {
    const salt=random(16), digest=await passwordDigest(password,salt);
    const created=await db.prepare("INSERT OR IGNORE INTO users (username,name,salt,password) VALUES (?,?,?,?)")
      .bind(username,username,salt,digest).run();
    if(created.meta.changes) user={password:digest,salt};
    else if(body.create===true) return fail("Cet identifiant est déjà utilisé.",409);
    else user=await db.prepare("SELECT * FROM users WHERE username=?").bind(username).first();
  }
  if(!equals(await passwordDigest(password,user.salt),user.password))
    return fail("Identifiant ou mot de passe incorrect.",401);
  const token=random();
  await db.batch([
    db.prepare("DELETE FROM sessions WHERE expiry<=?").bind(timestamp),
    db.prepare("DELETE FROM auth_limits WHERE expiry<=?").bind(timestamp),
    db.prepare("INSERT INTO sessions VALUES (?,?,?)").bind(await hash(token),username,timestamp+lifetime),
  ]);
  return reply({ok:true},200,sessionCookie(token,lifetime));
}

const evidenceQuery = `SELECT lesson,mode,state FROM progress_history
  WHERE username=? AND (mode='jeu' OR json_extract(state,'$.done')=1)
  UNION ALL SELECT lesson,mode,state FROM progress WHERE username=?`;
export function summarizeProgress(rows) {
  const record=Object.create(null);
  for(const row of rows){
    if(!Object.hasOwn(lessons,row.lesson)||!modes.includes(row.mode)) continue;
    const state=JSON.parse(row.state);
    const verified=row.mode==="quiz"?sanitizeProgress(row.lesson,row.mode,state):state;
    if(verified) updateEvidence(record,row.lesson,row.mode,verified);
  }
  return record;
}
async function evidence(db,username) {
  const {results}=await db.prepare(evidenceQuery).bind(username,username).all();
  return summarizeProgress(results);
}

function correctAnswer(q,value) {
  if(q.kind==="order"||q.kind==="bars")
    return Array.isArray(value)&&value.length===q.answer.length&&q.answer.every((n,i)=>n===value[i]);
  if(q.kind==="choice"||q.kind==="point") return value===String(q.answer);
  if(q.kind==="fraction") {
    const match=typeof value==="string"&&value.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if(!match) return false;
    const a=Number(match[1]),b=Number(match[2]);
    if(b<=0||Math.abs(a)>1e7||b>1e7) return false;
    let x=Math.abs(a),y=b;
    while(y) [x,y]=[y,x%y];
    return a*q.answer[1]===b*q.answer[0]&&(!q.irreducible||x===1);
  }
  return typeof value==="number"&&Number.isFinite(value)&&Math.abs(value-q.answer)<1e-9;
}
function gameReward(lesson,step,proof) {
  if(!Array.isArray(proof)||!proof.every(Number.isInteger)) return null;
  if(lesson==="arithmetique3"){
    const [n,b]=proof;
    const [startN,startB]=[[24,18],[30,42],[45,60]][step];
    return proof.length===2&&n>0&&n<=startN&&b>0&&b<=startB&&
      n*startB===b*startN&&commonFactor(n,b)===1?1:null;
  }
  if(lesson==="graphiques3"){
    const [distance]=proof;
    return proof.length===1&&distance>=0&&distance<=10&&
      [distance===4,distance>0&&distance<4,distance>4][step]?1:null;
  }
  const concept=concepts[lesson];
  if(concept){
    const [value]=proof;
    return proof.length===1&&value>=concept.min&&value<=concept.max&&
      concept.model(value)===concept.model(concept.targets[step])?1:null;
  }
  const mission=games[lesson]?.[step];
  if(!mission||proof.length!==2) return null;
  const [a,b]=proof;
  if(lesson!=="division") return a===mission.a&&b===mission.b?1:null;
  const seats=a*mission.a+b*mission.b;
  if(a<0||b<0||a+b>mission.max||seats<mission.goal) return null;
  for(let i=0;i<=mission.max;i++) for(let j=0;j<=mission.max-i;j++){
    const alternative=i*mission.a+j*mission.b;
    if(alternative>=mission.goal&&alternative<seats) return 0;
  }
  return 1;
}
export function sanitizeProgress(lesson,mode,state,previous,proof) {
  if(!Object.hasOwn(lessons,lesson)||!modes.includes(mode)) return null;
  if(!state||typeof state!=="object"||typeof state.done!=="boolean"||!Number.isInteger(state.step)||
    !Number.isInteger(state.seed)||state.seed<0||state.seed>0x7fffffff||![0,1,2].includes(state.level)||
    !Array.isArray(state.game)||state.game.length>3||!state.game.every(n=>Number.isInteger(n)&&Math.abs(n)<=100)) return null;
  const limit={quiz:5,jeu:3,lecon:1}[mode];
  if(state.step<0||state.step>limit||state.done!==(state.step===limit)) return null;
  const version=state.quizVersion??0;
  if(![0,1,2,3,4,5].includes(version)) return null;
  const checked={step:state.step,done:state.done,seed:state.seed,level:state.level,
    quizVersion:version,game:state.game,answers:[],stars:0,bestStars:0};
  if(mode==="jeu") {
    const sameAttempt=previous?.seed===state.seed;
    const before=sameAttempt?previous.step:0;
    if(state.step===0) {
      if(sameAttempt&&before>0) return null;
    } else {
      if(state.step!==before+1) return null;
      const earned=proof===undefined?0:gameReward(lesson,before,proof);
      if(earned===null) return null;
      checked.stars=(sameAttempt?previous.stars||0:0)+earned;
    }
    checked.bestStars=Math.max(previous?.bestStars||0,previous?.stars||0,checked.stars);
  }
  if(mode==="quiz") {
    if(!Array.isArray(state.answers)||state.answers.length!==state.step) return null;
    const series=questions(lesson,state.seed,state.level,version);
    for(const [i,answer] of state.answers.entries()) {
      if(!answer||typeof answer.help!=="boolean"||JSON.stringify(answer.value)?.length>100) return null;
      checked.answers.push({value:answer.value,help:state.level===0||answer.help,
        correct:correctAnswer(series[i],answer.value),explain:series[i].explain});
    }
  }
  return checked;
}

function activityRecord(row) {
  return row?{id:row.id,state:JSON.parse(row.state),revision:row.revision}:null;
}
async function saveActivity(db,username,{id,state,revision,event}) {
  if(typeof id!=="string"||!/^[-a-zA-Z0-9/:_]{1,120}$/.test(id)||
    !state||typeof state!=="object"||Array.isArray(state)||!revisionNumber(revision)||!eventID(event))
    return fail("Activité invalide.",400);
  const payload=JSON.stringify(state);
  const noEvent="NOT EXISTS (SELECT 1 FROM activity_events WHERE username=? AND event=?)";
  const [, , , receipt, result]=await db.batch([
    db.prepare(`INSERT INTO activities (username,id,state,revision,last_event)
      SELECT ?,?,?,1,? WHERE ?=0 AND ${noEvent} ON CONFLICT(username,id) DO NOTHING`)
      .bind(username,id,payload,event,revision,username,event),
    db.prepare(`UPDATE activities SET state=?,revision=revision+1,last_event=?
      WHERE username=? AND id=? AND revision=? AND ${noEvent}`)
      .bind(payload,event,username,id,revision,username,event),
    db.prepare(`INSERT OR IGNORE INTO activity_events (username,event,id,state,revision,updated)
      SELECT username,?,id,CASE WHEN json_type(state,'$.done')='true' THEN state END,revision,?
      FROM activities WHERE username=? AND id=? AND last_event=?`)
      .bind(event,Date.now(),username,id,event),
    db.prepare("SELECT id FROM activity_events WHERE username=? AND event=?").bind(username,event),
    db.prepare("SELECT id,state,revision FROM activities WHERE username=? AND id=?").bind(username,id),
  ]);
  const activity=activityRecord(result.results[0]);
  if(receipt.results[0]?.id!==id)
    return reply({error:"Cette activité a changé sur un autre appareil.",activity},409);
  return reply({activity});
}

async function classFocus(db) {
  const {results}=await db.prepare("SELECT grade,chapter FROM class_focus").all();
  return Object.fromEntries(results.map(({grade,chapter})=>[grade,chapter]));
}
async function setClassFocus(db,{grade,chapter}) {
  if(!grades.includes(grade)||typeof chapter!=="string"||!/^[a-z0-9-]{0,100}$/.test(chapter))
    return fail("Chapitre de classe invalide.",400);
  if(chapter) {
    await db.prepare(`INSERT INTO class_focus (grade,chapter) VALUES (?,?)
      ON CONFLICT(grade) DO UPDATE SET chapter=excluded.chapter`).bind(grade,chapter).run();
  } else await db.prepare("DELETE FROM class_focus WHERE grade=?").bind(grade).run();
  return reply({classFocus:await classFocus(db)});
}
export function isClassChapter(grade,chapter){
  return grades.includes(grade)&&chapters[grade].some(entry=>entry.id===chapter);
}
async function classChapterStatus(db){
  const status=Object.fromEntries(grades.map(grade=>[grade,[]]));
  const {results}=await db.prepare("SELECT grade,chapter FROM class_chapters").all();
  for(const {grade,chapter} of results) status[grade]?.push(chapter);
  return reply({classChapters:status});
}
async function setClassChapter(db,{grade,chapter,covered}){
  if(typeof covered!=="boolean"||!isClassChapter(grade,chapter)) return fail("Chapitre de classe invalide.",400);
  const sql=covered?"INSERT OR IGNORE INTO class_chapters (grade,chapter) VALUES (?,?)"
    :"DELETE FROM class_chapters WHERE grade=? AND chapter=?";
  await db.prepare(sql).bind(grade,chapter).run();
  return classChapterStatus(db);
}

const progressQuery=`SELECT lesson,mode,state,COALESCE(revision,0) AS revision
  FROM progress LEFT JOIN progress_revisions USING (username,lesson,mode)`;
const progressRecord = row => row?{lesson:row.lesson,mode:row.mode,...JSON.parse(row.state),revision:row.revision}:null;
async function saveProgress(db,username,{lesson,mode,event,state:submitted,revision,proof}) {
  if(!Object.hasOwn(lessons,lesson)||!modes.includes(mode)||!eventID(event)||
    (revision!==undefined&&!revisionNumber(revision))) return fail("Progression invalide.",400);
  const existing=db.prepare(progressQuery+" WHERE username=? AND lesson=? AND mode=?").bind(username,lesson,mode);
  const receipt=db.prepare("SELECT lesson,mode FROM progress_history WHERE username=? AND event=?").bind(username,event);
  const [current,replayed]=await Promise.all([existing.first(),receipt.first()]);
  const previous=progressRecord(current);
  const expected=revision??previous?.revision??0;
  if(replayed?.lesson===lesson&&replayed.mode===mode)
    return reply({ok:true,progress:previous,revision:previous?.revision??0,evidence:await evidence(db,username)});
  if(replayed||expected!==(previous?.revision??0))
    return reply({error:"Cette progression a changé sur un autre appareil.",progress:previous},409);
  const state=sanitizeProgress(lesson,mode,submitted,previous,proof);
  if(!state) return fail("Progression invalide.",400);
  const updated=Date.now(), payload=JSON.stringify(state), next=expected+1;
  const noEvent="NOT EXISTS (SELECT 1 FROM progress_history WHERE username=? AND event=?)";
  const accepted=`EXISTS (SELECT 1 FROM progress_revisions WHERE username=? AND lesson=? AND mode=?
    AND revision=? AND last_event=?) AND ${noEvent}`;
  const guard=[username,lesson,mode,next,event,username,event];
  const [, , , , recorded,result]=await db.batch([
    db.prepare(`INSERT INTO progress_revisions (username,lesson,mode,revision,last_event)
      SELECT ?,?,?,1,? WHERE ?=0 AND ${noEvent} ON CONFLICT(username,lesson,mode) DO NOTHING`)
      .bind(username,lesson,mode,event,expected,username,event),
    db.prepare(`UPDATE progress_revisions SET revision=?,last_event=?
      WHERE username=? AND lesson=? AND mode=? AND revision=? AND ${noEvent}`)
      .bind(next,event,username,lesson,mode,expected,username,event),
    db.prepare(`INSERT INTO progress (username,lesson,mode,state,updated) SELECT ?,?,?,?,? WHERE ${accepted}
      ON CONFLICT(username,lesson,mode) DO UPDATE SET state=excluded.state,updated=excluded.updated`)
      .bind(username,lesson,mode,payload,updated,...guard),
    db.prepare(`INSERT INTO progress_history (username,event,lesson,mode,state,updated)
      SELECT ?,?,?,?,?,? WHERE ${accepted}`).bind(username,event,lesson,mode,payload,updated,...guard),
    receipt,existing,
  ]);
  const progress=progressRecord(result.results[0]);
  if(recorded.results[0]?.lesson!==lesson||recorded.results[0].mode!==mode)
    return reply({error:"Cette progression a changé sur un autre appareil.",progress},409);
  return reply({ok:true,progress,revision:progress.revision,evidence:await evidence(db,username)});
}

async function api(request,env,path) {
  const db=env.DB;
  if(path==="/api/class-chapters"&&request.method==="GET") return classChapterStatus(db);
  let body;
  if(request.method==="POST") {
    if(request.headers.get("Origin")!==new URL(request.url).origin) return fail("Origine refusée.",403);
    if(!request.headers.get("Content-Type")?.startsWith("application/json")) return fail("Format invalide.",415);
    const raw=await request.text();
    if(raw.length>32768) return fail("Requête trop grande.",413);
    try { body=JSON.parse(raw); } catch { return fail("Requête invalide.",400); }
    if(!body||typeof body!=="object"||Array.isArray(body)) return fail("Requête invalide.",400);
    if(path==="/api/login") return login(request,db,body);
  } else if(request.method!=="GET") return fail("Méthode non prise en charge.",405);
  const token=tokenFrom(request);
  if(!token||!/^([a-f0-9]{64})$/.test(token)) return fail("Connexion requise.",401);
  const session=await hash(token);
  const user=await db.prepare(`SELECT users.username,name,grade,role FROM sessions JOIN users USING(username)
    WHERE token=? AND expiry>?`).bind(session,now()).first();
  if(!user) return fail("Connexion requise.",401);
  const username=user.username;
  if(request.method==="GET"){
    if(path==="/api/me"){
      const [progress,activities,history,learning,focus]=await Promise.all([
        db.prepare(progressQuery+" WHERE username=? ORDER BY updated DESC").bind(username).all(),
        db.prepare("SELECT id,state,revision FROM activities WHERE username=?").bind(username).all(),
        db.prepare("SELECT id,state,revision FROM activity_events WHERE username=? AND state IS NOT NULL ORDER BY updated DESC")
          .bind(username).all(),
        evidence(db,username),
        classFocus(db),
      ]);
      return reply({user,progress:progress.results.map(progressRecord),
        activities:activities.results.map(activityRecord),activityHistory:history.results.map(activityRecord),
        classFocus:focus,evidence:learning});
    }
    if(path==="/api/students"&&user.role==="teacher"){
      const {results}=await db.prepare(`SELECT username,name,grade,
        (SELECT count(*) FROM progress WHERE progress.username=users.username AND json_extract(state,'$.done')=1) completed,
        (SELECT count(*) FROM activity_events WHERE activity_events.username=users.username AND state IS NOT NULL) activitiesCompleted
        FROM users WHERE role='student' ORDER BY name`).all();
      return reply({students:results});
    }
    return fail("Page introuvable.",404);
  }
  if(path==="/api/logout"){
    await db.prepare("DELETE FROM sessions WHERE token=?").bind(session).run();
    return reply({ok:true},200,sessionCookie("",0));
  }
  if(path==="/api/grade"&&user.role==="student"){
    if(!grades.includes(body.grade)) return fail("Classe invalide.",400);
    await db.prepare("UPDATE users SET grade=? WHERE username=?").bind(body.grade,username).run();
    return reply({ok:true});
  }
  if(path==="/api/activity"&&user.role==="student") return saveActivity(db,username,body);
  if(path==="/api/progress"&&user.role==="student") return saveProgress(db,username,body);
  if(path==="/api/class-focus"&&user.role==="teacher") return setClassFocus(db,body);
  if(path==="/api/class-chapters") return user.role==="teacher"?setClassChapter(db,body):fail("Accès réservé à l’espace prof.",403);
  if(["/api/students","/api/reset"].includes(path)&&user.role==="teacher"){
    const account=typeof body.username==="string"?body.username.trim().toLowerCase():"";
    if(!/^[a-z0-9-]{3,24}$/.test(account)) return fail("Identifiant invalide.",400);
    const password=random(12),salt=random(16),digest=await passwordDigest(password,salt);
    if(path==="/api/reset"){
      const [result]=await db.batch([
        db.prepare("UPDATE users SET salt=?,password=? WHERE username=? AND role='student'").bind(salt,digest,account),
        db.prepare("DELETE FROM sessions WHERE username IN (SELECT username FROM users WHERE username=? AND role='student')").bind(account),
      ]);
      if(!result.meta.changes) return fail("Élève introuvable.",404);
    }else{
      const name=typeof body.name==="string"?body.name.trim():"";
      if(!name||name.length>50||!grades.includes(body.grade)) return fail("Prénom ou pseudo et classe requis.",400);
      const result=await db.prepare("INSERT OR IGNORE INTO users (username,name,grade,salt,password) VALUES (?,?,?,?,?)")
        .bind(account,name,body.grade,salt,digest).run();
      if(!result.meta.changes) return fail("Cet identifiant est déjà utilisé.",409);
    }
    return reply({username:account,password});
  }
  return fail("Action indisponible.",404);
}

export default {
  async fetch(request,env){
    const path=new URL(request.url).pathname;
    if(path==="/api/health"&&request.method==="GET"){
      try {
        await env.DB.batch([
          env.DB.prepare("SELECT revision FROM activity_events LIMIT 1"),
          env.DB.prepare("SELECT revision FROM progress_revisions LIMIT 1"),
          env.DB.prepare("SELECT chapter FROM class_focus LIMIT 1"),
          env.DB.prepare("SELECT chapter FROM class_chapters LIMIT 1"),
        ]);
        return reply({ok:true,storage:"d1",activities:true});
      }
      catch { return fail("Base indisponible.",503); }
    }
    if(path.startsWith("/api/")){
      try { return await api(request,env,path); }
      catch { return fail("Le service est temporairement indisponible.",503); }
    }
    const response=await env.ASSETS.fetch(request);
    const headers=new Headers(response.headers);
    for(const [key,value] of Object.entries(securityHeaders)) headers.set(key,value);
    headers.set("Content-Security-Policy","default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    return new Response(response.body,{status:response.status,headers});
  },
};
