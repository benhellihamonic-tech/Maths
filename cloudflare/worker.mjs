import { lessons, questions } from "../public/content.js";
import { updateEvidence } from "../public/progression.js";

const encoder = new TextEncoder();
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
const hash = async value => hex(await crypto.subtle.digest("SHA-256",encoder.encode(value)));
const now = () => Math.floor(Date.now()/1000);

async function passwordDigest(password, salt) {
  const key = await crypto.subtle.importKey("raw",encoder.encode(password),"PBKDF2",false,["deriveBits"]);
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
  if(!user) {
    const salt=random(16), digest=await passwordDigest(password,salt);
    const created=await db.prepare("INSERT OR IGNORE INTO users (username,name,salt,password) VALUES (?,?,?,?)")
      .bind(username,username,salt,digest).run();
    if(created.meta.changes) user={password:digest,salt};
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

async function evidence(db,username) {
  const {results}=await db.prepare(`SELECT lesson,mode,state FROM progress_history
    WHERE username=? AND json_extract(state,'$.done')=1
    UNION ALL SELECT lesson,mode,state FROM progress WHERE username=?`).bind(username,username).all();
  const record=Object.create(null);
  for(const row of results) updateEvidence(record,row.lesson,row.mode,JSON.parse(row.state));
  return record;
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
function sanitizeProgress(lesson,mode,state) {
  if(!state||typeof state!=="object"||typeof state.done!=="boolean"||!Number.isInteger(state.step)||
    !Number.isInteger(state.seed)||state.seed<0||state.seed>0x7fffffff||![0,1,2].includes(state.level)||
    !Array.isArray(state.game)||state.game.length>3||!state.game.every(n=>Number.isInteger(n)&&Math.abs(n)<=100)) return null;
  const limit={quiz:5,jeu:3,lecon:1}[mode];
  if(state.step<0||state.step>limit||state.done!==(state.step===limit)) return null;
  const version=state.quizVersion??0;
  if(![0,1,2,3].includes(version)) return null;
  const checked={step:state.step,done:state.done,seed:state.seed,level:state.level,
    quizVersion:version,game:state.game,answers:[],stars:0,bestStars:0};
  if(mode==="jeu") {
    if(![state.stars,state.bestStars].every(n=>Number.isInteger(n)&&n>=0&&n<=3)||state.stars>state.step) return null;
    checked.stars=state.stars;
    checked.bestStars=state.bestStars;
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

async function api(request,env,path) {
  const db=env.DB;
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
      const {results}=await db.prepare("SELECT lesson,mode,state FROM progress WHERE username=? ORDER BY updated DESC")
        .bind(username).all();
      return reply({user,progress:results.map(({lesson,mode,state})=>({lesson,mode,...JSON.parse(state)})),
        evidence:await evidence(db,username)});
    }
    if(path==="/api/students"&&user.role==="teacher"){
      const {results}=await db.prepare(`SELECT username,name,grade,
        (SELECT count(*) FROM progress WHERE progress.username=users.username AND json_extract(state,'$.done')=1) completed
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
  if(path==="/api/progress"&&user.role==="student"){
    const {lesson,mode,event}=body;
    if(!Object.hasOwn(lessons,lesson)||!modes.includes(mode)||typeof event!=="string"||!/^[-a-zA-Z0-9]{8,64}$/.test(event))
      return fail("Progression invalide.",400);
    const state=sanitizeProgress(lesson,mode,body.state);
    if(!state) return fail("Progression invalide.",400);
    const updated=Date.now(), payload=JSON.stringify(state);
    // A duplicate event is harmless. The two writes are atomic in D1 batch.
    await db.batch([
      db.prepare(`INSERT INTO progress SELECT ?,?,?,?,?
        WHERE NOT EXISTS (SELECT 1 FROM progress_history WHERE username=? AND event=?)
        ON CONFLICT(username,lesson,mode) DO UPDATE SET state=excluded.state,updated=excluded.updated`)
        .bind(username,lesson,mode,payload,updated,username,event),
      db.prepare("INSERT OR IGNORE INTO progress_history VALUES (?,?,?,?,?,?)")
        .bind(username,event,lesson,mode,payload,updated),
    ]);
    return reply({ok:true,evidence:await evidence(db,username)});
  }
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
      try { await env.DB.prepare("SELECT 1 FROM users LIMIT 1").all(); return reply({ok:true,storage:"d1"}); }
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
