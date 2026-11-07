import {chapters} from "./chapters.js";
import {beltColors,classBelts,classAutomatisms,weeklyAutomatisms,weeklyProblems,classRaces,officialCAN,officialCANArchives,trainingSet,trainingCorrect,chapterAnswerCorrect} from "./classroom.js";
import {explorations, correctionTone} from "./pedagogie.js";
import {writtenPractice, tariffValues, commonFactor} from "./assessment.js";
import {lessons, modes, levels, questions, games, concepts, connections, lessonGroups} from "./content.js";
import {displayNumber} from "./curriculum.js";
import {classProgress, lessonXP, ranks, updateEvidence, xpRoutes} from "./progression.js";

const root = document.querySelector("#app");
const nav = {parcours:["⌖","Parcours"], chapitres:["▤","Mon cours"], defis:["ϟ","Entraînement"], profil:["◉","Profil"]};
const grades = ["6e","5e","4e","3e"];
const teachingGrades = grades;
const localDemo = ["localhost","127.0.0.1"].includes(location.hostname);
const standalone = location.protocol === "file:" || Boolean(window.ARCHIPEL_APERCU);
let free = false, evidence = {};
let activities=new Map(), activityHistory=[], classFocus={}, activityPending=null, entryDestination=null;
let user, progress = [], selectedGrade = "", activeKey = "", active = null, busy = false;
let installPrompt, selectedDomain = "";
let notice = "", error = "", feedback = "", pending = null, help = false, filter = "", query = "";
const clean = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const cap = (n,a,b) => Math.max(a,Math.min(b,n));
const fresh = (level=0) => ({step:0,done:false,quizVersion:4,seed:Math.floor(Math.random()*0x7fffffff),level,answers:[],stars:0,help:false,game:[]});
const route = () => location.hash.slice(2).split("/");
const go = path => { location.hash = "/" + path; };
const get = (lesson,mode) => progress.find(p=>p.lesson===lesson && p.mode===mode);
const credit = '<footer class="site-credit">Réalisé par <strong>Marie HAMONIC</strong> · collège Jean Moulin</footer>';
const totalStars = () => progress.filter(p=>p.mode==="jeu").reduce((a,p)=>a+(p.bestStars||p.stars||0),0);

const themeKey = "archipel-theme";
const systemTheme = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
let themePreference;
try {
  const saved=globalThis.localStorage?.getItem(themeKey);
  if(saved==="light"||saved==="dark") themePreference=saved;
} catch { /* La préférence reste disponible pendant la visite. */ }
const currentTheme=()=>themePreference||(systemTheme?.matches?"dark":"light");
function applyTheme() {
  const theme=currentTheme();
  document.documentElement.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content",theme==="dark"?"#081c33":"#0b254c");
  document.querySelectorAll('[data-action="theme"]').forEach(button=>button.setAttribute("aria-pressed",String(theme==="dark")));
}
applyTheme();
systemTheme?.addEventListener?.("change",()=>{if(!themePreference) applyTheme();});

function themeButton() {
  return `<button type="button" class="theme-toggle" data-action="theme" aria-label="Mode sombre" aria-pressed="${currentTheme()==="dark"}">
    <span class="theme-symbol" aria-hidden="true"></span><span class="theme-label">Mode sombre</span></button>`;
}

async function api(path, body) {
  const response = await fetch("/api/"+path, {
    method:body===undefined?"GET":"POST", cache:"no-store",
    ...(body===undefined?{}:{headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}),
  });
  const data = await response.json();
  if (!response.ok) {
    const failure = new Error(data.error);
    failure.status = response.status;
    failure.data = data;
    throw failure;
  }
  return data;
}

function brand() {
  return '<img src="/icon.svg" alt="" width="37" height="37"><span><b>L’Archipel des mathématiques</b><small>PARCOURS DU COLLÈGE</small></span>';
}
function installLink() {
  return installPrompt ? '<button class="quiet install" data-action="install">Installer l’application ↗</button>' : "";
}
function status() {
  return (notice?'<p class="notice" role="status">'+clean(notice)+'</p>':'') +
    (error?'<p class="error" role="alert">'+clean(error)+'</p>':'');
}
function login() {
  return `<main id="content" tabindex="-1" class="login"><section class="login-art">
    <div class="brand">${brand()}</div><div class="login-title"><p class="eyebrow">✦ &nbsp; EXPÉDITION MATHÉMATIQUE</p>
    <h1>Les maths,<br><em>ça s’explore.</em></h1><p>Des notions à manipuler, des missions à relever et ton propre chemin de la 6e à la 3e.</p></div>
    <div class="coordinates">48° N &nbsp; / &nbsp; 02° O <span>ATLAS · ÉDITION 01</span></div></section>
    <section class="login-form"><div><div class="login-theme">${themeButton()}</div><p class="eyebrow">● &nbsp; LE POINT DE DÉPART</p><h2>Bienvenue à bord.</h2>
    <p>Explore librement ou connecte-toi pour retrouver ta progression.</p>
    <button class="primary" data-action="free">Parcours libre <span>↗</span></button>
    ${standalone?'<p class="footnote">Version autonome · pour utiliser un compte, ouvre Lancer-Archipel.command dans le Finder.</p>':`<form id="login"><label>Identifiant<input name="username" required autocomplete="username"></label>
    <label>Mot de passe<input name="password" type="password" required autocomplete="current-password"></label>
    <div class="pills"><button class="primary" name="account" value="login" ${busy?"disabled":""}>Se connecter ↗</button><button class="quiet" name="account" value="create" ${busy?"disabled":""}>Créer mon compte</button></div><small>Choisis un mot de passe d’au moins 8 caractères pour créer un compte.</small></form>`}
    ${status()}${installLink()}${standalone||!localDemo?"":`<p class="demo-label">ESSAYER AVEC UN COMPTE DE DÉMO</p>
    <div class="demo-options"><button data-demo="camille" ${busy?"disabled":""}>Camille · 6e</button><button data-demo="noa" ${busy?"disabled":""}>Noa · 4e</button><button data-demo="marie" ${busy?"disabled":""}>Espace prof</button></div>
    <p class="footnote">Les progrès des comptes sont enregistrés sur le serveur de cette démo.</p>`}${credit}</div></section></main>`;
}
function shell(body,tab) {
  const links = user.role==="teacher" ? '<a class="on" href="#/prof"><i>▤</i> Espace prof</a>' :
    Object.entries(nav).map(([key,[icon,name]])=>`<a href="#/${key}" ${key===tab?'class="on" aria-current="page"':''}><i aria-hidden="true">${icon}</i>${name}</a>`).join("");
  const rank=selectedGrade&&user.role==="student"?classProgress(selectedGrade,evidence):null;
  return `<div class="shell"><aside class="side"><a class="brand" href="#/${user.role==="teacher"?"prof":"parcours"}">${brand()}</a>
    <nav aria-label="Navigation principale">${links}</nav><div class="side-end"><div class="avatar">${clean(user.name[0])}</div><div><b>${clean(user.name)}</b><small>${clean(user.grade || (user.role==="teacher"?"Enseignante":"Classe à choisir"))}</small></div>
    <button data-action="logout" title="Déconnexion" aria-label="Déconnexion">↪</button></div></aside>
    <main id="content" tabindex="-1" class="content"><header class="top"><span>✦ &nbsp; ARCHIPEL <i>/</i> ${clean(nav[tab]?.[1] || "Espace prof")}</span>
    <span class="top-profile">${themeButton()}${free?'<small>Parcours libre · session en cours</small>':""}${rank?`<a class="xp-chip" href="#/profil" title="Voir mon rang">${rank.xp} XP</a>`:""}<strong>★ ${totalStars()}</strong><button data-action="logout" aria-label="Déconnexion">↪</button></span></header>
    ${status()}${installLink()}${body}${credit}</main></div>`;
}
function card(key, lesson) {
  const n = Object.keys(modes).filter(mode=>get(key,mode)?.done).length;
  return `<a class="chapter-card" href="#/atelier/${key}"><div class="tile-icon ${key}">${lesson.icon}</div>
    <div><p class="eyebrow">${lesson.grade} · ${lesson.tag}</p><h3>${lesson.title}</h3><p>${lesson.intro}</p>
    <small>${n}/3 modes terminés${inClassRoute(key)?"":" · Atelier complémentaire"}</small></div><span class="arrow">↗</span></a>`;
}
const inClassRoute=key=>key!=="thales4"&&key!=="cosinus4";
function resumeLink() {
  const next = progress.find(p=>!p.done && inClassRoute(p.lesson) && lessons[p.lesson]?.grade===selectedGrade);
  if(next) return {url:`#/atelier/${next.lesson}/${next.mode}`,label:"Reprendre"};
  for(const [key,lesson] of Object.entries(lessons)){
    if(lesson.grade!==selectedGrade||!inClassRoute(key)) continue;
    const mode=Object.keys(modes).find(mode=>!get(key,mode)?.done);
    if(mode) return {url:`#/atelier/${key}/${mode}`,label:mode==="lecon"?"Explorer la leçon":"Étape suivante"};
  }
  return {url:"#/defis",label:"Rejouer un défi"};
}
function choisir() {
  return `<p class="eyebrow">✦ &nbsp; CHOISIS TON POINT DE DÉPART</p><h1>Dans quelle classe es-tu ?</h1>
  <p>Chaque classe a sa propre carte. Les îles représentent les notions, et les routes montrent leurs liens.</p>
  <div class="grade-grid">${teachingGrades.map((g,i)=>`<button class="chapter-card" data-grade="${g}" ${busy?"disabled":""}><span class="tile-icon">${g}</span>
    <span><b>${["Sixième","Cinquième","Quatrième","Troisième"][i]}</b><small>Explorer les notions ↗</small></span></button>`).join("")}</div>`;
}
function nextActivities(rank, omit) {
  const options=xpRoutes({...rank,keys:rank.keys.filter(inClassRoute)},evidence,progress,omit);
  if(!options.length) return omit?"":'<p class="next-activities-empty">Tu as obtenu tous les XP des activités disponibles dans cette classe.</p>';
  const labels={
    lecon:["Explorer la leçon","Reprendre la leçon","Revoir la leçon"],
    quiz:["Faire le quiz","Reprendre le quiz","Améliorer mon score"],
    jeu:["Jouer la mission","Reprendre la mission","Viser plus d’étoiles"],
  };
  const icons={lecon:"▤",quiz:"✓",jeu:"✧"};
  return `<section class="next-activities" aria-label="Activités pour progresser"><p class="eyebrow">À TOI DE CHOISIR</p>
    <div class="xp-routes">${options.map(({key,mode,max,guaranteed,resume,replay})=>{
      const label=labels[mode][resume?1:replay?2:0];
      const reward=mode==="lecon"?"+10 XP":guaranteed?`+${guaranteed} XP pour terminer la série`:`Jusqu’à +${max} XP`;
      return `<a class="xp-route" href="#/atelier/${key}/${mode}"><span class="xp-route-icon" aria-hidden="true">${icons[mode]}</span>
        <span><b>${label} ↗</b><small>${lessons[key].title}</small><small class="xp-reward">${reward}</small></span></a>`;
    }).join("")}</div></section>`;
}

function rankCard(rank, detail=false) {
  const goal=rank.next?.[0];
  const width=goal?Math.round((rank.xp-rank.start)/(goal-rank.start)*100):100;
  const mastered=rank.keys.filter(rank.mastered).length;
  return `<section class="rank-card"><div class="rank-emblem" aria-hidden="true">⚓</div>
    <div class="rank-body"><p class="eyebrow">NIVEAU ${rank.level} · ${selectedGrade}</p>
    <div class="rank-heading"><h2>${rank.title}</h2><b>${rank.xp} XP</b></div>
    ${goal?`<progress max="100" value="${width}" aria-label="Progression vers ${rank.next[1]}"></progress>
    <p>Encore <strong>${goal-rank.xp} XP</strong> pour devenir <strong>${rank.next[1]}</strong>.</p>`:
    `<p>${rank.champion?"Champion de ta classe !":"Prochain cap : Amiral, en maîtrisant tout le programme de ta classe."}</p>`}
    <p>${mastered}/${rank.keys.length} notions disponibles maîtrisées ${detail?"":'· <a class="text-link" href="#/profil">Voir mon carnet ↗</a>'}</p>
    ${nextActivities(rank)}</div></section>`;
}
function parcours() {
  const recent=recentCourse(), focusChapter=findChapter(selectedGrade,classFocus[selectedGrade]);
  const resume = recent?{url:recent.href,label:recent.done?"Revoir mon bilan":"Reprendre mon travail"}:{url:"#/chapitres",label:"Ouvrir mon cours"};
  const rank=classProgress(selectedGrade,evidence);
  const groups=rank.groups.map(([name,keys])=>[name,keys.filter(inClassRoute)]);
  const [domain,keys]=groups.find(([name])=>name===selectedDomain)||groups[0];
  const pins=[[23,62],[47,34],[68,62],[82,26],[10,29],[58,79],[89,65]];
  return `<div class="intro"><div><p class="eyebrow">✦ &nbsp; TON EXPÉDITION · ${selectedGrade}</p><h1>L’archipel de ${selectedGrade}</h1>
    <p>Explore les notions et découvre les routes qui les relient.</p></div><a class="primary" href="${resume.url}">${resume.label} <span>↗</span></a></div>
    ${chapters[selectedGrade]?.length?`<section class="paper class-harbor"><p class="eyebrow">MON COURS · ${selectedGrade}</p><h2>${focusChapter?"Chapitre indiqué en classe":"Retrouve le travail de ta classe"}</h2>
      ${focusChapter?`<p><strong>${clean(focusChapter.code)} · ${clean(focusChapter.title)}</strong></p>`:""}
      <div class="pills">${focusChapter?`<a class="primary" href="${courseHref(focusChapter)}">Ouvrir le chapitre ↗</a><a class="quiet" href="${courseHref(focusChapter,"evaluation")}">Préparer l’évaluation ↗</a>`:""}
      <a class="${focusChapter?"quiet":"primary"}" href="#/chapitres">Progression et chapitres ↗</a>
      <a class="quiet" href="#/defis">Course aux nombres et ceintures ↗</a>
      ${selectedGrade==="3e"?'<a class="quiet" href="#/chapitres/fil-rouge">Calcul littéral · fil rouge ↗</a>':""}
      ${progress.some(entry=>!entry.done&&lessons[entry.lesson]?.grade===selectedGrade)?`<a class="quiet" href="${resumeLink().url}">Reprendre un atelier ↗</a>`:""}
      ${selectedGrade==="6e"?'<a class="quiet" href="#/defis/semaine">Automatismes et problèmes ↗</a>':""}</div></section>`:""}
    ${rankCard(rank)}
    <section class="map-section"><div class="section-row"><div><p class="eyebrow">CARTE DES NOTIONS</p><h2>Les îles de ${selectedGrade}</h2></div><a class="text-link" href="#/classe">Changer de classe ↗</a></div>
    <div class="atlas"><span class="map-index">L’ARCHIPEL DES MATHÉMATIQUES <b>✦</b> ${selectedGrade}</span>
    ${groups.map(([name,list],i)=>{
      const completed=list.filter(rank.mastered).length;
      return `<button data-domain="${name}" aria-label="${name}" aria-pressed="${domain===name}" style="--x:${pins[i][0]}%;--y:${pins[i][1]}%" class="pin ${domain===name?"selected":""}">
        <span>${i+1}</span><b>${name}</b><small>${completed}/${list.length}</small></button>`;
    }).join("")}
    <span class="map-caption">✧ &nbsp; CHOISIS UN DOMAINE SUR LA CARTE</span></div></section>
    <div class="section-row after-map"><div><p class="eyebrow">AU PROGRAMME · ${selectedGrade}</p><h2>${domain}</h2></div><a class="text-link" href="#/chapitres">Tous les chapitres ↗</a></div>
    <div class="domain-tabs pills" aria-label="Domaines">${groups.map(([name])=>`<button data-domain="${name}" aria-pressed="${domain===name}">${name}</button>`).join("")}</div>
    <div class="cards">${keys.map(key=>card(key,lessons[key])).join("")}</div>`;
}
function chapterList() {
  const entries = Object.entries(lessons).filter(([,l])=>(filter?l.grade===filter:teachingGrades.includes(l.grade))&&
    (l.title+" "+l.tag+" "+l.mission).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")));
  return entries.map(pair=>card(...pair)).join("") || '<div class="empty">Aucun atelier ouvert pour cette recherche. Essaie un autre mot-clé ou une autre classe.</div>';
}
function courseHref(chapter,mode="fiche",grade=selectedGrade){
  return `#/cours/${grade}/${chapter.id}/${mode}`;
}
function findChapter(grade,id){
  return chapters[grade]?.find(chapter=>chapter.id===id);
}
function classPlan(){
  const list=(chapters[selectedGrade]||[]).filter(chapter=>route()[1]!=="fil-rouge"||chapter.track==="fil rouge");
  const groups=new Map();
  for(const chapter of list){
    const label=chapter.track==="cours"||!chapter.track?"Chapitres":chapter.track==="fil rouge"?"Calcul littéral · fil rouge":chapter.track==="bilans"?"Bilans et devoirs communs":chapter.track;
    if(!groups.has(label)) groups.set(label,[]);
    groups.get(label).push(chapter);
  }
  return `<section class="paper class-harbor"><p class="eyebrow">${selectedGrade==="5e"?"PARCOURS NATIONAL":"PROGRESSION DE CLASSE"} · ${selectedGrade}</p>
    <h2>${route()[1]==="fil-rouge"?"Le fil rouge de calcul littéral":"Le fil de l’année"}</h2><p>Choisis le chapitre indiqué dans ton cahier.</p>
    ${route()[1]==="fil-rouge"?'<p><a href="#/chapitres">Tous les chapitres ↗</a></p>':""}
    <label class="search">Chercher dans mon cours <input id="course-search" type="search" placeholder="Titre ou code du chapitre"></label>
    ${[...groups].map(([name,entries])=>`<section class="course-track"><h3>${clean(name)}</h3><ol class="course-list">
      ${entries.map(chapter=>`<li data-course-search="${clean([chapter.code,chapter.title,...(chapter.refs||[])].join(" "))}"><a href="${courseHref(chapter)}"><small>${clean(chapter.code)}</small> ${clean(chapter.title)}</a>
        <a class="text-link" href="${courseHref(chapter,"evaluation")}" aria-label="Préparer l’évaluation · ${clean(chapter.title)}">Préparer ↗</a></li>`).join("")}</ol></section>`).join("")}
    <p id="course-no-results" hidden>Aucun chapitre trouvé.</p></section>`;
}
const courseSections={fiche:"Fiche",exercices:"S’entraîner",evaluation:"Préparer l’évaluation"};
const chapterRef=(grade,id,mode,form)=>`chapter/${grade}/${id}/${mode}/${form}`;
function activityEvent(){
  return globalThis.crypto?.randomUUID?.()??Date.now()+"-"+Math.random().toString(36).slice(2);
}
async function saveActivity(id,state,event=activityEvent()){
  if(free){
    activities.set(id,{id,state,revision:0});
    if(state.done) activityHistory.unshift({id,state,revision:0});
    return true;
  }
  if(busy||(activityPending&&activityPending.id!==id)) return false;
  busy=true;
  const request={id,state,revision:activities.get(id)?.revision??0,event};
  try {
    const {activity}=await api("activity",request);
    activities.set(id,activity);activityPending=null;error="";
    if(state.done&&!activityHistory.some(row=>row.id===id&&row.revision===activity.revision)) activityHistory.unshift(activity);
    notice="✓ Enregistré dans ton carnet.";
    return true;
  } catch(e){
    if(e.status===409){
      if(e.data.activity) activities.set(id,e.data.activity);
      else activities.delete(id);
      activityPending=null;
      error="Cette activité a changé sur un autre appareil. La version enregistrée a été rechargée.";
    }else{
      activityPending={id,state,event,owner:user?.username};
      if(e.status===401){captureDestination();user=null;activeKey="";}
      error=e.status===401?"Ta session a expiré. Reconnecte-toi au même compte pour reprendre.":"Enregistrement interrompu. Ta réponse est encore disponible dans cette page.";
    }
    return false;
  } finally {busy=false;}
}
function chapterAnswers(items,values={}){
  return items.map((item,i)=>`<fieldset class="chapter-question" data-item-skill="${item.skill}"><legend>${i+1}. ${clean(item.prompt)}</legend>
    ${item.written?`<label>Ta démarche <textarea name="answer${i}" rows="3" maxlength="1200" placeholder="Tu peux aussi rédiger sur ton cahier.">${clean(values[i]??"")}</textarea></label>`:
      `<label>Ta réponse <input name="answer${i}" value="${clean(values[i]??"")}" maxlength="120" autocomplete="off"></label>`}
    </fieldset>`).join("");
}
function chapterCorrect(item,value){
  return !item.written&&chapterAnswerCorrect(item,value??"");
}
function chapterBilan(chapter,items,answers,grade){
  const auto=items.filter(item=>!item.written).length;
  const correct=items.filter((item,i)=>chapterCorrect(item,answers[i])).length;
  return `<section class="paper"><h2 id="course-feedback" tabindex="-1">Ton bilan</h2>
    <p>${auto?`${correct} / ${auto} réponses vérifiées automatiquement. `:""}Les démarches rédigées se comparent au corrigé, sur ton cahier ou à l’écran.</p>
    ${items.map((item,i)=>`<details class="course-correction"><summary>${i+1}. ${clean(chapter.skills[item.skill])} · ${item.written?"À vérifier":chapterCorrect(item,answers[i])?"Bravo !":answers[i]?"À reprendre":"Sans réponse"}</summary>
      <p>${clean(item.prompt)}</p>${answers[i]?`<p><b>Ta réponse</b> ${clean(answers[i])}</p>`:""}
      <p><b>Réponse attendue</b> ${clean(item.answer)}</p><p>${clean(item.explain)}</p>
      <p><a class="text-link" href="${courseHref(chapter,"exercices",grade)}/1/${item.skill}">Revoir cette compétence ↗</a></p></details>`).join("")}
    <div class="pills"><a class="quiet" href="${courseHref(chapter,"fiche",grade)}">Relire la fiche ↗</a>
    <a class="quiet" href="${courseHref(chapter,"exercices",grade)}">Retravailler le chapitre ↗</a></div></section>`;
}
function chapterLab(chapter,grade){
  const links=chapter.links;
  if(grade==="6e"&&links.includes("division")) return `<details class="course-lab"><summary>Expérimenter avec les navettes</summary>
    <p>Pour 53 passagers, chaque navette offre 8 places. Prédit le quotient, le reste et le nombre de navettes à prévoir. Puis représente ton choix.</p>
    <form id="division-lab">
      <label>Groupes complets <input name="q" type="number" min="0" max="10" required></label>
      <label>Passagers restants <input name="r" type="number" min="0" max="53" required></label>
      <label>Navettes nécessaires <input name="n" type="number" min="0" max="12" required></label>
      <button class="primary">Vérifier ma répartition</button>
    </form><div id="division-lab-result" role="status"></div></details>`;
  if(grade==="4e"&&links.includes("algebre")) return `<details class="course-lab"><summary>Comparer deux assemblages Algéblocks</summary>
    <p>Le modèle comporte deux rangées identiques de x + 3. Construis le même assemblage sans les rangées, puis vérifie ce que cela donne pour x = 4.</p>
    <div class="blocks" aria-label="Deux rangées identiques contenant chacune un bloc x et trois unités">
      ${Array.from({length:2},()=>'<div><span>x</span><i>1</i><i>1</i><i>1</i></div>').join("")}</div>
    <form id="blocks-lab">
      <label>Blocs x <input name="x" type="number" min="0" max="9" required></label>
      <label>Unités <input name="units" type="number" min="0" max="20" required></label>
      <label>Valeur pour x = 4 <input name="value" type="number" required></label>
      <button class="primary">Comparer les assemblages</button>
    </form><div id="blocks-lab-result" role="status"></div></details>`;
  if(grade==="3e"&&chapter.id==="fonctions") return `<details class="course-lab"><summary>Explorer les antécédents sur une courbe</summary>
    <p>Pour chaque hauteur proposée, prédis combien d’antécédents elle possède, puis compare avec les intersections.</p>
    ${functionCurve()}
    <form id="curve-lab"><label>Hauteur à chercher <select name="height"><option>4</option><option>9</option><option>10</option></select></label>
    <label>Nombre d’antécédents <input name="count" type="number" min="0" max="2" required></label><button class="primary">Vérifier ↗</button></form>
    <div id="curve-lab-result" role="status"></div></details>`;
  if(grade==="3e"&&links.includes("graphiques3")) return `<details class="course-lab"><summary>Lire et vérifier le point d’égalité</summary>
    <p>Les droites représentent deux tarifs. Repère leur intersection. Quel prix commun se lit à cette distance ?</p>
    ${tariffGraph(5)}
    <form id="tariff-lab">
      <label>Abscisse en km <input name="distance" type="number" min="0" max="10" required></label>
      <label>Ordonnée en euros <input name="price" type="number" min="0" required></label>
      <button class="primary">Vérifier mon point</button>
    </form><div id="tariff-lab-result" role="status"></div></details>`;
  return "";
}
function functionCurve(height=null){
  const cx=x=>135+x*36,cy=y=>230-y*19;
  const curve=Array.from({length:51},(_,i)=>{const x=-2+i/10;return `${cx(x)},${cy(x*x)}`;}).join(" ");
  const roots=height===4?[-2,2]:height===9?[3]:[];
  return `<figure class="lesson-figure"><svg viewBox="0 0 274 255" role="img" aria-label="Courbe de f de x égale x au carré, pour x de moins deux à trois">
    ${[-2,-1,0,1,2,3].map(x=>`<path d="M${cx(x)} 21V230" stroke="var(--chart-grid)"/><text x="${cx(x)}" y="249" text-anchor="middle">${x}</text>`).join("")}
    ${[0,2,4,6,8,10].map(y=>`<path d="M50 ${cy(y)}H250" stroke="var(--chart-grid)"/><text x="42" y="${cy(y)+4}" text-anchor="end">${y}</text>`).join("")}
    <path d="M50 230H250M135 230V21" stroke="var(--ink)" fill="none"/>
    <polyline points="${curve}" fill="none" stroke="var(--chart-blue)" stroke-width="3"/>
    ${height===null?"":`<path d="M50 ${cy(height)}H250" stroke="var(--chart-sand)" stroke-width="2" stroke-dasharray="5 4"/>
      ${roots.map(x=>`<circle cx="${cx(x)}" cy="${cy(height)}" r="5" fill="var(--chart-sand)"/>`).join("")}`}
    </svg><figcaption>La courbe s’arrête à x = −2 à gauche et à x = 3 à droite.</figcaption></figure>`;
}
function chapterFigure(grade,id){
  if(grade==="3e"&&(id==="thales-emboite"||id==="thales-converse")) return `<figure class="lesson-figure"><svg viewBox="0 0 240 136" role="img" aria-label="A, M, B sur la première sécante ; A, N, C sur la seconde ; MN et BC parallèles">
    <path d="M24 66L214 16V116Z" fill="none" stroke="var(--chart-blue)" stroke-width="2"/>
    <path d="M126 39V93" stroke="var(--chart-sand)" stroke-width="3"/>
    <text x="7" y="72">A</text><text x="116" y="33">M</text><text x="116" y="110">N</text>
    <text x="220" y="21">B</text><text x="220" y="119">C</text></svg>
    <figcaption>Correspondances des côtés : AM avec AB, AN avec AC et MN avec BC.</figcaption></figure>`;
  if(grade==="6e"&&id==="angles") return `<figure class="lesson-figure"><svg viewBox="0 0 235 132" role="img" aria-label="Angle ABC, sommet B, côtés BA et BC">
    <path d="M196 106H36L126 21" fill="none" stroke="var(--chart-blue)" stroke-width="3"/>
    <path d="M70 106A34 34 0 0 0 61 82" fill="none" stroke="var(--chart-sand)" stroke-width="3"/>
    <text x="201" y="110">A</text><text x="20" y="124">B</text><text x="131" y="22">C</text></svg>
    <figcaption>Le sommet B est la lettre du milieu. Place le centre du rapporteur sur B.</figcaption></figure>`;
  return "";
}
function checkChapterLab(id,values){
  const output=document.querySelector("#"+id+"-result");
  if(id==="curve-lab"){
    const height=Number(values.height), count=height===4?2:height===9?1:0;
    const conclusion=height===4?"Deux intersections, en −2 et 2.":height===9?"Une intersection, en 3. L’abscisse −3 est hors du domaine.":"Aucune intersection. La courbe ne monte pas jusqu’à 10.";
    output.innerHTML=`${functionCurve(height)}<p>${Number(values.count)===count?"Bravo ! ":"Recompte les points d’intersection. "}${conclusion}</p>`;
  }else if(id==="division-lab"){
    const q=Number(values.q), r=Number(values.r), n=Number(values.n);
    const represented=8*q+r;
    output.innerHTML=`<p>${q} groupes de 8 et ${r} restant(s) représentent ${represented} passagers.</p>
      <div class="manipulation">${"<span class='boat'>8</span>".repeat(q)}${r?`<span class="boat rest">${r}</span>`:""}</div>
      <p>${represented!==53?"La représentation doit compter 53 passagers.":r>=8?"Il reste assez de passagers pour compléter une autre navette.":n!==q+1?"Les passagers restants ont aussi besoin de places.":"Bravo ! 53 = 8 × 6 + 5. Six navettes sont pleines, il faut en prévoir sept."}</p>`;
  }else if(id==="blocks-lab"){
    const x=Number(values.x), units=Number(values.units), value=Number(values.value);
    output.innerHTML=`<div class="blocks" aria-label="${x} blocs x et ${units} unités">${"<span>x</span>".repeat(x)}${"<i>1</i>".repeat(units)}</div>
      <p>${x!==2||units!==6?"Regroupe les deux blocs x. Compte les unités des deux rangées séparément.":value!==14?"L’assemblage est juste. Pour x = 4, chaque bloc x vaut quatre unités.":"Bravo ! Les blocs montrent 2(x + 3) = 2x + 6. Pour x = 4, cela donne 14."}</p>`;
  }else{
    const distance=Number(values.distance), price=Number(values.price), [a,b]=tariffValues(distance,5);
    output.innerHTML=`${tariffGraph(5,distance)}<p>${a!==b?"À cette distance, le trait vertical coupe les droites à deux hauteurs différentes.":price!==a?"Les droites se rejoignent bien à cette abscisse. Lis maintenant la hauteur commune sur l’axe des prix.":"Bravo ! Les offres coûtent 15 € à 5 km. On peut vérifier en résolvant 3x = 2x + 5."}</p>`;
  }
}

function courseView(grade,id,mode,formPart){
  const chapter=findChapter(grade,id);
  if(!chapter) return `<h1>Chapitre introuvable</h1><a href="#/chapitres">Voir mon cours ↗</a>`;
  if(!Object.hasOwn(courseSections,mode)) mode="fiche";
  const form=formPart==="2"?2:1;
  const path=courseHref(chapter,mode,grade);
  const title=`<a class="text-link" href="#/chapitres">← Mon cours</a>${grade!==selectedGrade?`<p class="hint">Tu consultes un chapitre de ${clean(grade)}. Il reste dans le carnet de cette classe.</p>`:""}<p class="eyebrow">${clean(grade)} · ${clean(chapter.code)}</p>
    <h1>${clean(chapter.title)}</h1>
    <nav class="pills course-tabs" aria-label="Étapes du chapitre">${Object.entries(courseSections).map(([key,label])=>
      `<a class="${mode===key?"primary":"quiet"}" href="${courseHref(chapter,key,grade)}" ${mode===key?'aria-current="page"':""}>${label}</a>`).join("")}</nav>`;
  const skills=`<ul>${chapter.skills.map(skill=>`<li>${clean(skill)}</li>`).join("")}</ul>`;
  if(mode==="fiche"){
    const connected=chapter.links.filter(key=>Object.hasOwn(lessons,key));
    return title+`<section class="paper"><h2>Exemple</h2><p class="course-example">${clean(chapter.example)}</p>${chapterFigure(grade,id)}
      ${chapterLab(chapter,grade)}
      <details><summary>Rappel et méthode</summary><p>${clean(chapter.recap)}</p></details>
      <details><summary>Ce que je dois savoir faire</summary>${skills}</details>
      ${connected.length?`<details><summary>Ateliers liés à ce chapitre</summary><ul>${connected.map(key=>`<li><a href="#/atelier/${key}">${clean(lessons[key].title)}${lessons[key].grade!==grade?` · rappel de ${lessons[key].grade}`:""} ↗</a></li>`).join("")}</ul></details>`:""}
      <p><a class="primary" href="${courseHref(chapter,"exercices",grade)}">M’entraîner ↗</a></p></section>`;
  }
  const assessmentMode=mode==="evaluation";
  const items=assessmentMode?chapter.tests[form-1]:chapter.practice;
  const ref=chapterRef(grade,id,mode,form);
  const saved=activities.get(ref)?.state;
  const values=activityPending?.id===ref?activityPending.state.answers:saved?.answers;
  const body=`<section class="paper"><h2>${assessmentMode?`Sujet blanc ${form===1?"A":"B"}`:"Exercices du chapitre"}</h2>
    ${assessmentMode?`<p>Fais les exercices avant d’ouvrir le corrigé. Tu peux rédiger sur ton cahier.</p>
      <div class="pills"><a class="quiet" href="${path}" ${form===1?'aria-current="page"':""}>Sujet A</a><a class="quiet" href="${path}/2" ${form===2?'aria-current="page"':""}>Sujet B</a></div>
      <details><summary>Les compétences évaluées</summary>${skills}</details>`:
      `<details><summary>Rappel de méthode</summary><p>${clean(chapter.recap)}</p></details>`}
    ${saved?.done?`<button class="quiet" data-course-reset="${ref}">Refaire cette série</button>`:`<form id="course-answers" data-course-ref="${ref}">
      ${chapterAnswers(items,values)}
      <div class="pills"><button class="primary" name="submitMode" value="finish">Corriger mon travail ↗</button>
        <button class="quiet" name="submitMode" value="draft">Enregistrer mon brouillon</button></div></form>`}</section>`;
  return title+body+(saved?.done?chapterBilan(chapter,items,saved.answers,grade):"");
}
function recentCourse(){
  const prefix=`chapter/${selectedGrade}/`;
  const recent=[...activities.values()].filter(activity=>activity.id.startsWith(prefix))
    .sort((a,b)=>Number(a.state.done)-Number(b.state.done)||(b.state.updated??0)-(a.state.updated??0))[0];
  if(!recent) return null;
  const [,grade,id,mode,form]=recent.id.split("/");
  const chapter=findChapter(grade,id);
  return chapter?{title:chapter.title,href:courseHref(chapter,mode,grade)+(form==="2"?"/2":""),done:recent.state.done}:null;
}

function chapitres() {
  return `<p class="eyebrow">✦ &nbsp; LA BIBLIOTHÈQUE</p><h1>Mon cours · ${selectedGrade}</h1>
    ${classPlan()}<h2>Bibliothèque d’ateliers</h2><p>Choisis une notion pour une révision ou un entraînement complémentaire.</p>
    <label class="search">Rechercher une notion <input id="search" type="search" value="${clean(query)}" placeholder="Ex. division, calcul littéral…"></label>
    <div class="pills"><button data-filter="" aria-pressed="${!filter}">Toutes</button>${teachingGrades.map(g=>`<button data-filter="${g}" aria-pressed="${g===filter}">${g}</button>`).join("")}</div>
    <div id="chapter-list" class="cards">${chapterList()}</div>`;
}

let training=null, trainingTimer=null, renderTrainingIntro=null;
function restoreTraining(ref){
  const candidate=[...activities.values()].filter(activity=>activity.id.startsWith("training/"+ref+"/"))
    .sort((a,b)=>b.state.updated-a.state.updated)[0];
  if(!candidate) return null;
  const [grade,type,id]=ref.split("/");
  const questions=trainingSet(type,grade,id,candidate.state.seed);
  return questions.length?{...candidate.state,ref,questions,activityId:candidate.id}:null;
}
async function saveTraining(){
  if(!training) return;
  const {activityId,seed,answers,index,done,deadline}=training;
  const saved=await saveActivity(activityId,{seed,answers:[...answers],index,done,deadline,updated:Date.now()});
  if(!saved&&!activityPending&&training?.activityId===activityId){
    const canonical=activities.get(activityId);
    training=canonical?{...training,...canonical.state}:null;
  }
}
function captureTrainingAnswer(){
  const form=root.querySelector("#training-answer");
  if(form) training.answers[training.index]=String(Object.fromEntries(new FormData(form)).answer??"").trim();
}
async function finishTraining(){
  if(!training||training.done||busy||activityPending) return;
  captureTrainingAnswer();
  training.done=true;
  await saveTraining();render();
}
function trainingClock() {
  const node=document.querySelector("#training-clock");
  if(!training?.deadline||training.done||!node) return;
  const seconds=Math.max(0,Math.ceil((training.deadline-Date.now())/1000));
  node.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`;
  if(seconds===0) void finishTraining();
}
function trainingPage(type,id) {
  const isRace=type==="can", isBelt=type==="belt", isAuto=type==="auto";
  const race=classRaces(selectedGrade).find(item=>item.level===id);
  const valid=isRace?Boolean(race):isBelt?/^([0-6])$/.test(id)&&Boolean(classBelts[selectedGrade]):
    isAuto&&/^(0|[1-9]\d*)$/.test(id)&&Boolean(classAutomatisms[selectedGrade]?.[Number(id)]);
  if(!valid) return "";
  const title=isRace?`Course aux nombres · ${race.name}`:isBelt?`Ceinture ${beltColors[Number(id)].toLowerCase()} · ${selectedGrade}`:
    classAutomatisms[selectedGrade][Number(id)].slice(0,2).join(" · ");
  const ref=[selectedGrade,type,id].join("/");
  if(training?.ref!==ref&&renderTrainingIntro!==ref) training=restoreTraining(ref);
  const head=`<a class="text-link" href="#/defis">← Les entraînements</a><p class="eyebrow">✦ &nbsp; ${selectedGrade}</p><h1>${title}</h1>`;
  if(training?.ref!==ref){
    return head+`<section class="paper"><p>${isRace?"30 questions. Pour une simulation, réponds de tête en 9 minutes, sans calculatrice ni brouillon.":isBelt?"12 questions réparties entre les six compétences de la ceinture.":"6 questions pour retravailler l’automatisme."} Le corrigé apparaît à la fin.</p>
      <div class="pills"><button class="primary" data-training-start="libre">Commencer sans chrono ↗</button>
      ${isRace?'<button class="quiet" data-training-start="chrono">Lancer le chrono de 9 min ↗</button>':""}</div>
      ${race?`<p class="footnote">Série originale inspirée des sujets de la Course aux nombres. <a class="text-link" href="${officialCANArchives}" target="_blank" rel="noopener">Retrouver les sujets dans les annales officielles ↗</a></p>`:""}</section>`;
  }
  if(training.done){
    const correct=training.questions.filter((q,i)=>trainingCorrect(q,training.answers[i]??"")).length;
    return head+`<section class="paper result"><h2>${correct} / ${training.questions.length}</h2>
      <p>${isBelt?"Bilan d’entraînement. La validation de la ceinture se fait en classe.":"Relis la méthode des questions qui t’ont posé problème."}</p>
      <button class="primary" data-training-restart>Nouvelle série ↗</button>
      <div class="quiz-review">${training.questions.map((q,i)=>{
        const value=training.answers[i]??"", ok=trainingCorrect(q,value);
        return `<details><summary>${i+1}. ${clean(q.skill)} · ${ok?"Réussie":value?"À revoir":"Non répondue"}</summary>
          <p>${clean(q.prompt)}</p><p><strong>Ta réponse.</strong> ${clean(value||"—")} · <strong>Réponse attendue.</strong> ${typeof q.answer==="number"?displayNumber(q.answer):clean(q.answer)}</p>
          <p>${clean(q.explain)}</p></details>`;
      }).join("")}</div></section>`;
  }
  const q=training.questions[training.index], saved=training.answers[training.index]??"";
  return head+`<section class="paper"><p class="eyebrow">QUESTION ${training.index+1} / ${training.questions.length}
    ${training.deadline?' · <output id="training-clock" aria-label="Temps restant"></output>':""}</p><h2>${clean(q.prompt)}</h2>
    <form id="training-answer" class="answer">${q.options?`<fieldset class="quiz-choice"><legend>Choisis une réponse</legend>
      ${q.options.map(option=>`<label><input type="radio" name="answer" value="${clean(option)}" ${option===saved?"checked":""}> ${clean(option)}</label>`).join("")}</fieldset>`:
      `<label>Ta réponse<input name="answer" value="${clean(saved)}" maxlength="80" autocomplete="off"></label>`}
    <button class="primary">${training.index+1===training.questions.length?"Voir le bilan":"Question suivante"} ↗</button></form>
    <div class="pills">${training.index?'<button class="quiet" data-training-back>Question précédente</button>':""}
    <button class="quiet" data-training-finish>Terminer la série</button></div></section>`;
}
function weeklyPage(){
  const date=new Intl.DateTimeFormat("sv-SE",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  const week=Math.max(0,Math.floor((Date.parse(date)-Date.UTC(2026,7,31))/604800000));
  const auto=week%weeklyAutomatisms.length, featured=week%weeklyProblems.length;
  return `<a class="text-link" href="#/defis">← Les entraînements</a><h1>Les rituels de 6e</h1>
    <section class="paper"><p class="eyebrow">SUGGESTION DE RÉVISION</p><h2>${clean(weeklyAutomatisms[auto][1])}</h2>
    <a class="primary" href="#/defis/auto/${auto}">Faire les 6 questions ↗</a></section>
    ${automatismsList("6e")}
    <section class="paper"><h2>Problèmes de la semaine</h2><p>Prépare un schéma, un calcul et une phrase-réponse sur ton cahier.</p>
    ${[featured,...weeklyProblems.keys()].filter((i,p,list)=>list.indexOf(i)===p).map(i=>{
      const {title,problems}=weeklyProblems[i];
      return `<details><summary>${clean(title)}${i===featured?" · révision suggérée":""}</summary>
      ${problems.map(({prompt,solution,method,bars},j)=>`<article class="weekly-problem"><h3>Problème ${j+1}</h3><p>${clean(prompt)}</p>
      <details><summary>Voir un indice et le schéma</summary><p>${clean(method)}</p>
        <figure class="bar-figure"><figcaption>Barre entière · ${clean(bars.total)}</figcaption>
        <div class="problem-bars">${bars.segments.map(({label,weight},k)=>`<span style="flex:${Number(weight)} 1 0" class="${bars.group&&k<bars.group.count?"grouped":""}">${clean(label)}</span>`).join("")}</div>
        ${bars.group?`<p>Les ${bars.group.count} premières parts · ${clean(bars.group.label)}</p>`:""}</figure></details>
        <details><summary>Corrigé</summary><p>${clean(solution)}</p></details></article>`).join("")}</details>`;
    }).join("")}</section>`;
}
function automatismsList(grade){
  const list=classAutomatisms[grade];
  if(!list) return "";
  const title=grade==="3e"?"Réactivations · Automaths et Rapido":grade==="4e"?"Cycles d’automatismes":"Les automatismes du cahier";
  return `<section class="paper class-harbor"><h2>${title}</h2>
    <p>${grade==="3e"?"Retrouve les notions de la fiche indiquée en cours.":grade==="4e"?"Ouvre le cycle du moment. Tu peux générer une seconde série pour te vérifier.":"Retrouve le numéro donné en classe."}</p>
    <ol class="course-list">${list.map(([code,label],i)=>`<li><a href="#/defis/auto/${i}">${clean(code)} · ${clean(label)} ↗</a></li>`).join("")}</ol></section>`;
}
function defis() {
  const [,type,id]=route();
  if(type==="semaine"&&selectedGrade==="6e") return weeklyPage();
  if(type&&id){const page=trainingPage(type,id);if(page) return page;}
  const raceCards=classRaces(selectedGrade);
  return `<p class="eyebrow">✦ &nbsp; LE COIN DES RÉFLEXES</p><h1>Entraînement · ${selectedGrade}</h1>
    ${selectedGrade==="6e"?'<section class="paper class-harbor"><h2>Les rituels de 6e</h2><p>Automatismes du cahier et problèmes de la semaine, avec schémas en barres.</p><a class="primary" href="#/defis/semaine">Ouvrir les rituels ↗</a></section>':""}
    ${raceCards.length?`<section class="paper class-harbor"><h2>Course aux nombres</h2><p>Deux parcours séparés. Le niveau conseillé correspond à la période de l’année.</p>
      <div class="cards">${raceCards.map(r=>`<a class="chapter-card" href="#/defis/can/${r.level}"><strong>${r.name}</strong>
        ${r.featured?'<small>Conseillé en ce moment</small>':""}<span class="arrow">↗</span></a>`).join("")}</div>
      <p><a class="text-link" href="${officialCANArchives}" target="_blank" rel="noopener">Annales officielles ↗</a> · <a class="text-link" href="${officialCAN}" target="_blank" rel="noopener">Règles du concours ↗</a></p></section>`:""}
    ${classBelts[selectedGrade]?`<section class="paper class-harbor"><h2>Ceintures de calcul mental</h2><p>Choisis la couleur que tu prépares.</p>
      <div class="cards">${beltColors.map((color,i)=>`<a class="chapter-card" href="#/defis/belt/${i}"><strong>Ceinture ${color.toLowerCase()}</strong><small>12 questions</small><span class="arrow">↗</span></a>`).join("")}</div></section>`:""}
    ${selectedGrade!=="6e"?automatismsList(selectedGrade):""}
    <details class="paper"><summary>Quiz par chapitre</summary><div class="cards">
    ${Object.entries(lessons).filter(([key,l])=>l.grade===selectedGrade&&inClassRoute(key)).map(([key,l])=>`<a class="chapter-card" href="#/atelier/${key}/quiz"><strong>${l.title}</strong><span class="arrow">↗</span></a>`).join("")}</div></details>`;
}
function activityJournal(){
  const rows=activityHistory.filter(row=>row.id.split("/")[1]===selectedGrade).slice(0,15);
  if(!rows.length) return "";
  return `<section class="paper class-harbor"><h2>Mes bilans récents</h2><ul>${rows.map(row=>{
    const [kind,grade,id,mode,form]=row.id.split("/");
    if(kind==="chapter"){
      const chapter=findChapter(grade,id);
      return chapter?`<li>${clean(chapter.title)} · ${mode==="evaluation"?"Sujet blanc "+(form==="2"?"B":"A"):"Entraînement"}</li>`:"";
    }
    const title=id==="belt"?`Ceinture ${beltColors[Number(mode)]}`:id==="can"?`Course aux nombres · fin de ${mode==="cm2"?"CM2":mode}`:classAutomatisms[grade]?.[Number(mode)]?.[1];
    const items=trainingSet(id,grade,mode,row.state.seed);
    const score=items.filter((item,i)=>trainingCorrect(item,row.state.answers?.[i]??"")).length;
    return title&&items.length?`<li>${clean(title)} · ${score}/${items.length}</li>`:"";
  }).join("")}</ul></section>`;
}
function profil() {
  const rank=classProgress(selectedGrade,evidence), recent=recentCourse();
  const list=chapters[selectedGrade]||[];
  const completed=list.filter(chapter=>[1,2].some(form=>activities.get(chapterRef(selectedGrade,chapter.id,"evaluation",form))?.state.done
    ||activityHistory.some(record=>record.id===chapterRef(selectedGrade,chapter.id,"evaluation",form)))).length;
  return `<p class="eyebrow">✦ &nbsp; CARNET DE BORD</p><h1>Ton profil</h1><p>${clean(user.name)} · ${selectedGrade} · ★ ${totalStars()} étoiles</p>
    ${recent?`<section class="paper class-harbor"><h2>Ton dernier chapitre</h2><p>${clean(recent.title)}</p><a class="primary" href="${recent.href}">${recent.done?"Revoir le bilan":"Reprendre"} ↗</a></section>`:""}
    <section class="paper class-harbor"><h2>Préparation des évaluations</h2><p>${completed} chapitre${completed>1?"s":""} avec un sujet blanc remis sur ${list.length}.</p>
    <progress max="${list.length||1}" value="${completed}" aria-label="Chapitres avec un sujet blanc remis"></progress>
    <p><a class="text-link" href="#/chapitres">Préparer un autre chapitre ↗</a></p></section>
    ${activityJournal()}
    ${rankCard(rank,true)}
    <div class="paper"><p class="eyebrow">LE CAP FINAL · AMIRAL</p><h2>La maîtrise du programme</h2>
    <p>Pour valider une notion, réussis deux quiz différents à 5/5, en autonomie et sans indice.</p>
    ${rank.coverageComplete?"":'<p class="hint">Les ateliers couvrent les grands domaines. Le rang Amiral s’ouvrira une fois tous les attendus et leurs quiz de maîtrise validés.</p>'}
    <div class="domain-list">${rank.groups.map(([domain,keys])=>`<section><h3>${domain}</h3>
      ${keys.length?keys.map(key=>`<a href="#/atelier/${key}/quiz"><b>${lessons[key].title}</b><span>${rank.mastered(key)?"✓ Maîtrisée":`${evidence[key]?.perfect?.length||0}/2 séries parfaites`} · ${lessonXP(evidence[key])} XP ↗</span></a>`).join(""):"<p>Ateliers à venir</p>"}</section>`).join("")}</div></div>
    <details class="paper relation"><summary>Comment gagner des XP et changer de rang</summary>
      <p>10 XP pour terminer une leçon. 5 XP par étoile de jeu, selon ton meilleur résultat. Au quiz, 15 XP pour ta première série terminée, puis 8 XP par bonne réponse dans ton meilleur score, 10 XP par bonne réponse sans aide dans ton meilleur score en autonomie, et 25 XP par série parfaite en autonomie (deux séries différentes maximum par notion). Rejouer permet d’améliorer tes scores et de valider la maîtrise.</p>
      <p>${ranks.map(([threshold,title])=>`${title} · ${threshold} XP`).join(" → ")} → Amiral · programme maîtrisé.</p>
    </details>`;
}

function atelier(key,mode) {
  const l=lessons[key];
  const hero=`<a class="text-link" href="#/chapitres">← Les chapitres</a><div class="workshop"><div class="tile-icon ${key}">${l.icon}</div>
    <div><p class="eyebrow">${l.grade} · ${l.tag}</p><h1>${l.title}</h1><p>${l.intro}</p></div></div>
    <nav class="mode-bar" aria-label="Modes de l’atelier">${Object.entries(modes).map(([m,label])=>`<a href="#/atelier/${key}/${m}" ${mode===m?'aria-current="page"':''}>${{lecon:"▤",quiz:"✓",jeu:"✧"}[m]} &nbsp; ${label}</a>`).join("")}</nav>`;
  if(!modes[mode]) {
    const [related,reason]=connections[key];
    return hero+`<div class="paper"><p class="eyebrow">OBJECTIF DE L’ATELIER</p><h2>${l.mission}</h2><p>${l.summary}</p>
      <a class="primary" href="#/atelier/${key}/lecon">Découvrir la leçon ↗</a></div>
      <div class="paper relation"><p class="eyebrow">⌖ &nbsp; ROUTE ENTRE DEUX NOTIONS</p><p>${reason}</p>
      <a class="text-link" href="#/atelier/${related}">${lessons[related].title} · ${lessons[related].grade} ↗</a></div>`;
  }
  const suggestions=active.done && (mode!=="quiz" || !feedback)
    ? nextActivities(classProgress(selectedGrade,evidence),{key,mode}) : "";
  return hero+({lecon:lessonView,quiz:quizView,jeu:gameView}[mode])(key)+suggestions+(mode==="lecon"?production(key):"");
}
function stepper(name,label,value,min,max) {
  return `<div class="stepper"><span>${label}</span><button data-adjust="${name}" data-delta="-1" ${value<=min?"disabled":""} aria-label="Diminuer ${label}">−</button><strong>${value}</strong><button data-adjust="${name}" data-delta="1" ${value>=max?"disabled":""} aria-label="Augmenter ${label}">+</button></div>`;
}
const sliders = (id,label,value,min,max) => `<label class="slider">${label} <strong id="${id}-out">${value}</strong><input id="${id}" type="range" min="${min}" max="${max}" value="${value}"></label>`;
function tariffGraph(fee=4, distance=null) {
  const px=x=>50+32*x, py=y=>218-6*y;
  const series=(start,end,color,dash="")=>`<path d="M${px(0)} ${py(start)}L${px(10)} ${py(end)}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}"/>`;
  const [a,b]=distance===null?[]:tariffValues(distance,fee);
  const marker=distance===null?"":`<path d="M${px(distance)} 218V${py(Math.max(a,b))}" stroke="var(--muted)" stroke-dasharray="3 4"/>
    <circle cx="${px(distance)}" cy="${py(b)}" r="6" fill="var(--chart-sand)" stroke="white" stroke-width="1.5"/>
    <circle cx="${px(distance)}" cy="${py(a)}" r="${a===b?3:5}" fill="var(--chart-blue)" stroke="white" stroke-width="1.5"/>`;
  return `<figure class="tariff-graph"><svg viewBox="0 0 392 260" role="img" aria-label="Tarifs Alizé et Brise selon la distance">
    ${Array.from({length:33},(_,y)=>`<path d="M50 ${py(y)}H370" stroke="${y%4===0?"var(--chart-grid)":"var(--chart-minor)"}"/>${y%4===0?`<text x="42" y="${py(y)+4}" text-anchor="end">${y}</text>`:""}`).join("")}
    ${Array.from({length:11},(_,x)=>`<path d="M${px(x)} 26V218" stroke="var(--chart-grid)"/><text x="${px(x)}" y="237" text-anchor="middle">${x}</text>`).join("")}
    <path d="M50 21V218H375" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <text x="6" y="16">Prix (€)</text><text x="369" y="254" text-anchor="end">Distance (km)</text>
    ${series(0,30,"var(--chart-blue)")}${series(fee,20+fee,"var(--chart-sand)","8 4")}${marker}
    </svg><figcaption><span class="tariff-a">━ Alizé · 3 € par km</span><span class="tariff-b">┄ Brise · ${fee} € au départ + 2 € par km</span></figcaption></figure>`;
}
function tariffReading(distance) {
  const [a,b]=tariffValues(distance);
  const difference=Math.abs(a-b);
  const conclusion=a===b
    ? `Les deux points se confondent. À ${distance} km, les deux compagnies demandent ${a} €.`
    : `Le point ${a<b?"Alizé":"Brise"} est plus bas. Ce tarif est moins cher de ${difference} €.`;
  return `${tariffGraph(4,distance)}<p class="hint" role="status"><strong>À ${distance} km</strong> · Alizé : ${a} € · Brise : ${b} €.<br>${conclusion}</p>`;
}
function tariffLesson() {
  const distance=cap(active.game[0]??2,0,10);
  return `<article class="paper"><p class="eyebrow">01 · COMPARER DEUX TARIFS</p>
    <h2>Quel bateau coûte le moins cher ?</h2>
    <p>Alizé demande <strong>3 € par kilomètre</strong>. Brise demande <strong>4 € au départ, puis 2 € par kilomètre</strong>. On cherche à quel moment il devient plus intéressant de choisir Brise.</p>
    <p><strong>Avant de bouger le curseur</strong>, prédis le tarif le moins cher pour un trajet de 2 km, puis pour un trajet de 7 km.</p>
    <div class="controls">${sliders("a","Distance du trajet (km)",distance,0,10)}</div>
    <div id="model">${tariffReading(distance)}</div>
    <p>Le trait vertical part de la distance choisie. Là où il rencontre chaque droite, lis le prix sur l’axe vertical. Essaie de faire coïncider les deux points.</p>
    <details><summary>Vérifier le point de croisement</summary><p>Les droites se coupent en <strong>(4 ; 12)</strong>. On lit <strong>4 km</strong> en abscisse et <strong>12 €</strong> en ordonnée. À 4 km, les deux prix sont égaux.</p></details>
    <p class="eyebrow tariff-step">02 · RELIER LE GRAPHIQUE AU CALCUL</p>
    <ul><li><strong>Équation.</strong> On cherche quand les deux prix sont égaux : 3x = 2x + 4. En retranchant 2x, on obtient x = 4.</li>
    <li><strong>Comparaison.</strong> Alizé coûte moins cher quand sa droite est en dessous de celle de Brise, donc pour 0 ≤ x &lt; 4. Au-delà de 4 km, Brise coûte moins cher.</li>
    <li><strong>« Au plus autant ».</strong> On inclut le point de croisement. Sur le graphique, 3x ≤ 2x + 4 pour 0 ≤ x ≤ 4.</li></ul>
    <button class="primary" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Leçon terminée":"Terminer la leçon"} ↗</button>
    <a class="text-link next-link" href="#/atelier/graphiques3/quiz">Aller au quiz →</a></article>`;
}
const tariffMissions=[
  ["Repère la distance pour laquelle les deux compagnies coûtent le même prix.",x=>x===4],
  ["Choisis un trajet de plus de 0 km où Alizé est strictement moins chère.",x=>x>0&&x<4],
  ["Choisis un trajet où Brise est strictement moins chère.",x=>x>4],
];
function explorationLesson(key, lesson) {
  return `<article class="paper"><p class="eyebrow">01 · PRÉDIS, PUIS ESSAIE</p><h2>${lesson.title}</h2><p>${lesson.question}</p>
    <div class="controls">${lesson.controls.map(([id,label,start,min,max],i)=>sliders(id,label,cap(active.game[i]??start,min,max),min,max)).join("")}</div>
    <div id="model"></div>
    <details class="course-recap"><summary>Rappel et méthode</summary><p>${lesson.recap}</p></details>
    <button class="primary" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Leçon terminée":"Terminer la leçon"} ↗</button>
    <a class="text-link next-link" href="#/atelier/${key}/quiz">Aller au quiz →</a></article>`;
}
const reductionMissions=[[24,18],[30,42],[45,60]];
function fractionText(n,d){
  return `<span class="fraction-display" aria-label="${n} sur ${d}"><span>${n}</span><span>${d}</span></span>`;
}
function fractionWorkbench(mode) {
  const [startN,startD]=reductionMissions[mode==="jeu"?active.step:0];
  const [n,d]=active.game.length===2?active.game:[startN,startD];
  const title=mode==="jeu"?"Simplifie la fraction":"Quelle division conserve la fraction ?";
  return `<article class="paper"><p class="eyebrow">${mode==="jeu"?`MISSION ${active.step+1} / 3`:"01 · CHOISIR UN DIVISEUR COMMUN"}</p>
    <h2>${title}</h2>
    <p>Choisis un nombre qui divise <strong>à la fois le numérateur et le dénominateur</strong>, sans reste. Répète jusqu’à ce qu’aucun entier supérieur à 1 ne divise les deux.</p>
    <div class="fraction-workbench"><div><span>Au départ</span>${fractionText(startN,startD)}</div><span aria-hidden="true">=</span>
      <div><span>Fraction actuelle</span>${fractionText(n,d)}</div></div>
    <div class="pills" aria-label="Diviseurs à essayer">${[2,3,4,5,6,7,10,15].map(k=>`<button data-reduce="${k}" ${busy?"disabled":""}>Diviser par ${k}</button>`).join("")}</div>
    ${feedback?`<p class="hint" role="status">${clean(feedback)}</p>`:""}
    <button class="${mode==="jeu"?"primary":"quiet"}" data-action="check-irreducible" ${busy?"disabled":""}>Vérifier si je peux m’arrêter ↗</button>
    <button class="quiet" data-action="reset-fraction" ${busy?"disabled":""}>Repartir du début</button>
    ${mode==="lecon"?`<div class="course-recap"><p class="eyebrow">02 · À RETENIR</p>
      <p>Diviser les deux termes par le même entier conserve la valeur de la fraction. Par exemple, 24/18 = 12/9 en divisant par 2, puis 12/9 = 4/3 en divisant par 3.</p>
      <p>On s’arrête à 4/3 car 4 et 3 ont seulement 1 comme diviseur commun. On pouvait aussi passer directement de 24/18 à 4/3 en divisant par 6.</p></div>
      <button class="primary" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Leçon terminée":"Terminer la leçon"} ↗</button>
      <a class="text-link next-link" href="#/atelier/arithmetique3/quiz">Aller au quiz →</a>`:""}
    </article>`;
}
function lessonView(key) {
  if(key==="graphiques3") return tariffLesson();
  if(key==="arithmetique3") return fractionWorkbench("lecon");
  if(Object.hasOwn(explorations,key)) return explorationLesson(key,explorations[key]);
  const concept=concepts[key];
  if(concept?.worked){
    const [prompt,answer]=concept.worked(concept.initial);
    return `<article class="paper"><h2>Exemple à résoudre</h2><p>${clean(prompt)}</p>
      <details><summary>Vérifier ma réponse</summary><p>${displayNumber(answer)}</p></details>
      <details><summary>Rappel et méthode</summary><p>${clean(concept.summary)}</p></details>
      <div class="pills"><button class="quiet" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Fiche terminée":"Marquer la fiche comme lue"}</button>
      <a class="primary" href="#/atelier/${key}/quiz">M’entraîner ↗</a></div></article>`;
  }
  if(concept) return `<article class="paper"><p class="eyebrow">01 · MANIPULER</p><h2>${concept.title}</h2><p>${concept.worked?"Choisis une valeur, puis lis l’exemple qui lui correspond. Essaie de trouver le résultat avant de lire la réponse.":concept.intro}</p>
    <div class="controls">${sliders("a",concept.control,active.game[0]??concept.initial,concept.min,concept.max)}</div>
    <div id="model" class="manipulation"></div><p id="formula" class="formula"></p>
    <details><summary>Rappel et méthode</summary><p>${concept.summary}</p></details>
    <button class="primary" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Leçon terminée":"Terminer la leçon"} ↗</button>
    <a class="text-link next-link" href="#/atelier/${key}/quiz">Aller au quiz →</a></article>`;
  const division=key==="division";
  const [a,b]=active.game.length?active.game:division?[47,8]:[3,2];
  const x=active.game[2]??3;
  return `<article class="paper"><p class="eyebrow">01 · MANIPULER</p><h2>${division?"Remplis les navettes":"La machine à expressions"}</h2>
    <p>${division?"Change le nombre de passagers ou la capacité. Observe les groupes complets et le reste.":"Change le nombre de blocs x, d’unités et la valeur de x."}</p>
    <div class="controls">${division?sliders("a","Passagers",a,5,60)+sliders("b","Places par navette",b,2,12):sliders("a","Blocs x",a,1,6)+sliders("b","Unités",b,0,8)+sliders("x","Valeur de x",x,0,8)}</div>
    <div class="manipulation" id="model"></div><p class="formula" id="formula"></p>
    <details><summary>Rappel et méthode</summary><p>${lessons[key].summary}</p></details>
    <button class="primary" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Leçon terminée · sauvegarder":"Terminer la leçon"} ↗</button>
    <a class="text-link next-link" href="#/atelier/${key}/quiz">Aller au quiz →</a></article>`;
}
function model(key) {
  if(key==="arithmetique3") return;
  if(key==="graphiques3"){
    const distance=Number(document.querySelector("#a").value);
    document.querySelector("#a-out").textContent=distance;
    document.querySelector("#model").innerHTML=tariffReading(distance);
    return;
  }
  if(Object.hasOwn(explorations,key)){
    const lesson=explorations[key];
    const values=lesson.controls.map(([id])=>{
      const value=Number(document.querySelector("#"+id).value);
      document.querySelector("#"+id+"-out").textContent=value;
      return value;
    });
    document.querySelector("#model").innerHTML=lesson.draw(...values);
    return;
  }
  const concept=concepts[key];
  if(concept){
    const n=Number(document.querySelector("#a").value);
    document.querySelector("#a-out").textContent=n;
    if(concept.worked){
      const [prompt,answer]=concept.worked(n);
      document.querySelector("#model").innerHTML=`<div class="live-example"><p><strong>Exemple avec ton réglage.</strong> ${clean(prompt)}</p>
        <p><strong>Réponse.</strong> ${displayNumber(answer)}</p></div>`;
      document.querySelector("#formula").textContent="";
      return;
    }
    document.querySelector("#model").innerHTML=key==="fractions"
      ? `<div class="fraction-bar" aria-label="${n} parts sur 8">${Array.from({length:8},(_,i)=>`<span class="${i<n?"taken":""}">${i+1}</span>`).join("")}</div>`
      : key==="relatifs"
      ? `<div class="number-line">${[-9,-6,-3,0,3,6,9,12].map(t=>`<span>${t}</span>`).join("")}<b style="left:${(concept.model(n)+9)/21*100}%">●</b></div>`
      : `<div class="game-scene live-result"><strong>${displayNumber(concept.model(n))}</strong> ${concept.label}</div>`;
    document.querySelector("#formula").textContent=concept.equation(n);
    return;
  }
  const a=Number(document.querySelector("#a").value),b=Number(document.querySelector("#b").value);
  const x=Number(document.querySelector("#x")?.value??0);
  for(const [id,val] of [["a",a],["b",b],["x",x]]) {
    const out=document.querySelector("#"+id+"-out"); if(out) out.textContent=val;
  }
  document.querySelector("#model").innerHTML=key==="division"?
    Array.from({length:Math.ceil(a/b)},(_,i)=>`<div class="boat ${i*b+b>a?"rest":""}" aria-label="${Math.min(b,a-i*b)} passagers"><div>${"● ".repeat(Math.min(b,a-i*b))}</div></div>`).join(""):
    `<div class="blocks">${"<span>x</span>".repeat(a)}${"<i>1</i>".repeat(b)}</div>`;
  document.querySelector("#formula").textContent=key==="division"?
    `${a} = ${b} × ${Math.floor(a/b)} + ${a%b}`:`${a}x + ${b} = ${a} × ${x} + ${b} = ${a*x+b}`;
}
function production(key) {
  const practice=writtenPractice[key];
  return (practice?`<section class="paper relation"><p class="eyebrow">SUR TON CAHIER OU AVEC UN LOGICIEL</p>
    <h2>À construire ou à rédiger</h2><p>${practice[0]}</p>
    <label class="practice-draft">Brouillon facultatif <textarea rows="3" placeholder="Écris ta démarche ou prépare-la sur ton cahier."></textarea></label>
    <p class="footnote">Compare ta démarche au corrigé. Ce brouillon n’est pas noté ni enregistré.</p><details><summary>Comparer mon travail au corrigé</summary>
    <p>${practice[1]}</p><p><strong>À vérifier dans ta production.</strong> ${practice[2]}</p></details></section>`:"")
    + (key==="simulation3"?`<section class="paper relation"><p class="eyebrow">EXPÉRIENCE ALÉATOIRE</p><h2>Comparer des séries de lancers</h2>
      <p>Choisis un nombre de lancers d’une pièce équilibrée. Compare la fréquence de pile avec 50 % et relance plusieurs fois.</p>
      <div class="pills">${[20,100,1000].map(n=>`<button data-simulate="${n}">${n} lancers</button>`).join("")}</div>
      <div id="simulation-result" role="status"></div></section>`:"")
    + (key==="tableur4"?`<section class="paper relation"><p class="eyebrow">EXPÉRIMENTER</p><h2>Les cellules et la formule</h2>
      <p>Modifie les trois relevés. La cellule A5, qui contient la formule =MOYENNE(A2:A4), se recalcule.</p>
      <table class="mini-sheet"><thead><tr><th scope="col">Ligne</th><th scope="col">A · Relevés</th></tr></thead><tbody>
      ${[4,7,10].map((value,i)=>`<tr><th scope="row">${i+2}</th><td><input class="sheet-value" type="number" step="any" value="${value}" aria-label="Cellule A${i+2}"></td></tr>`).join("")}
      <tr><th scope="row">5</th><td><output id="sheet-mean" aria-label="Moyenne">7</output></td></tr></tbody></table></section>`:"");
}
function quizChart(values, max=Math.max(...values.map(([,count])=>count))) {
  const scale=Array.from({length:max+1},(_,i)=>`<span>${max-i}</span>`).join("");
  return `<div class="quiz-chart" aria-label="Diagramme en bâtons"><div class="chart-axis">${scale}</div>
    ${values.map(([label,count])=>`<div class="chart-column"><div class="chart-track"><span style="height:${count/max*100}%" aria-label="${clean(label)} : ${count}"></span></div><b>${clean(label)}</b></div>`).join("")}</div>`;
}
function quizGraph(graph) {
  const px=x=>34+x*36, py=y=>188-y*26;
  const plot=(points,color,dash="")=>`<polyline points="${points.map(([x,y])=>px(x)+","+py(y)).join(" ")}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}"/>`;
  return `<svg class="quiz-graph" viewBox="0 0 204 215" role="img" aria-label="Repère gradué, ${graph.second?"deux droites":"une droite"}">
    ${Array.from({length:7},(_,y)=>`<path d="M34 ${py(y)}H178" stroke="var(--chart-grid)"/><text x="18" y="${py(y)+4}">${y}</text>`).join("")}
    ${Array.from({length:5},(_,x)=>`<path d="M${px(x)} 32V188" stroke="var(--chart-grid)"/><text x="${px(x)-4}" y="207">${x}</text>`).join("")}
    <path d="M34 28V188H188" fill="none" stroke="var(--ink)" stroke-width="2"/>
    ${plot(graph.points,"var(--chart-reef)")}${graph.second?plot(graph.second,"var(--chart-sand)","5 3"):""}</svg>`;
}
function answerFields(q) {
  if(q.kind==="bars") return `<fieldset class="quiz-order"><legend>Règle les hauteurs des bâtons</legend>
    <div id="chart-draft">${quizChart(q.labels.map(label=>[label,0]),q.max)}</div>
    ${q.labels.map((label,i)=>`<label>${label} <input type="range" min="0" max="${q.max}" value="0" name="bar${i}" data-chart-bar></label>`).join("")}</fieldset>`;
  if(q.kind==="choice") return `<fieldset class="quiz-choice"><legend>Choisis une réponse</legend>${q.options.map((label,i)=>
    `<label><input type="radio" name="answer" value="${i}" required> ${clean(label)}</label>`).join("")}</fieldset>`;
  if(q.kind==="order") return `<fieldset class="quiz-order"><legend>Remets les étapes dans l’ordre</legend>${q.options.map((_,step)=>
    `<label>Étape ${step+1}<select name="order${step}" required><option value="">Choisis une étape</option>${q.options.map((label,i)=>
      `<option value="${i}">${clean(label)}</option>`).join("")}</select></label>`).join("")}</fieldset>`;
  if(q.kind==="point") return `<fieldset class="quiz-point"><legend>Choisis une intersection du quadrillage</legend>
    <div class="point-grid"><span></span>${Array.from({length:9},(_,i)=>`<b>${i-4}</b>`).join("")}
    ${Array.from({length:9},(_,row)=>{
      const y=4-row;
      return `<b>${y}</b>`+Array.from({length:9},(_,column)=>{
        const x=column-4, given=q.given.find(([,gx,gy])=>gx===x&&gy===y);
        return `<label class="${x===0||y===0?"axis":""}"><input type="radio" name="answer" value="${x},${y}" aria-label="(${x} ; ${y})" required><span aria-hidden="true">${given?given[0]:"·"}</span></label>`;
      }).join("");
    }).join("")}</div></fieldset>`;
  return `<label>Ta réponse<input name="answer" inputmode="text" ${q.kind==="fraction"?'placeholder="Ex. 3/4"':""} required></label>`;
}
function validateAnswer(q, values) {
  if(q.kind==="bars"){
    const value=q.labels.map((_,i)=>Number(values["bar"+i]));
    return {value,correct:q.answer.every((n,i)=>n===value[i])};
  }
  if(q.kind==="order"){
    const value=q.options.map((_,i)=>Number(values["order"+i]));
    if(new Set(value).size!==value.length) return {error:"Utilise chaque étape une seule fois."};
    return {value,correct:q.answer.every((n,i)=>n===value[i])};
  }
  if(q.kind==="choice" || q.kind==="point"){
    const value=values.answer;
    return {value,correct:value===String(q.answer)};
  }
  const raw=(values.answer||"").trim().replace(/−/g,"-").replace(",",".").replace(/^[+-]?\d{1,3}(?:[ \u00a0\u202f]\d{3})+(?:\.\d+)?$/,part=>part.replace(/\s/g,""));
  if(q.kind==="fraction"){
    const match=raw.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if(!match || !Number(match[2]) || match.slice(1).some(n=>Math.abs(Number(n))>1e7))
      return {error:"Écris une fraction avec un dénominateur positif, par exemple 3/4."};
    const a=Number(match[1]), b=Number(match[2]);
    let x=Math.abs(a), y=b;
    while(y) [x,y]=[y,x%y];
    return {value:raw,correct:a*q.answer[1]===b*q.answer[0]&&(!q.irreducible||x===1)};
  }
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(raw)||!Number.isFinite(Number(raw)))
    return {error:"Entre un nombre, par exemple 12, −4 ou 0,5."};
  const value=Number(raw);
  return {value,correct:Math.abs(value-q.answer)<1e-9};
}
function responseLabel(q,value) {
  if(q.kind==="choice") return q.options[Number(value)]??"";
  if(q.kind==="order") return value.map(i=>q.options[i]).join(" → ");
  if(q.kind==="bars") return value.map((n,i)=>q.labels[i]+" : "+n).join(" · ");
  if(q.kind==="point") return "("+String(value).replace(","," ; ")+")";
  return typeof value==="number"?displayNumber(value):value;
}
function quizVisual(q) {
  return (q.values?quizChart(q.values):"")+(q.graph?quizGraph(q.graph):"")+(q.comparison?tariffGraph(q.comparison.fee):"");
}
function correctionBlock(q,answer) {
  const [tone,title,detail]=correctionTone(q,answer);
  return `<section class="correction ${tone}" role="status"><h2>${title}</h2>
    <p><strong>Ta réponse.</strong> ${clean(responseLabel(q,answer.value))}</p>
    ${detail?`<p>${clean(detail)}</p>`:""}
    <p><strong>La méthode.</strong> ${clean(answer.explain||q.explain)}</p></section>`;
}
function quizView(key) {
  const series=questions(key,active.seed,active.level,active.quizVersion);
  if(feedback) return `<article class="paper"><p class="eyebrow">QUESTION ${active.step} / 5 · CORRECTION</p>
    <p>${clean(series[active.step-1].prompt)}</p>${quizVisual(series[active.step-1])}
    ${correctionBlock(series[active.step-1],active.answers.at(-1))}
    <button class="primary" data-action="continue-quiz">${active.done?"Voir mon bilan":"Question suivante"} →</button></article>`;
  const levelButtons=`<div class="pills">${levels.map((l,i)=>`<button data-level="${i}" aria-pressed="${active.level===i}" ${active.answers.length||busy?"disabled":""}>${l}</button>`).join("")}</div>`;
  if(active.done){
    const score=active.answers.filter(a=>a.correct).length;
    const review=active.answers.map((answer,i)=>`<details><summary>Question ${i+1} · ${answer.correct?"Réussie":"À revoir"}</summary>
      <p>${clean(series[i].prompt)}</p>${correctionBlock(series[i],answer)}</details>`).join("");
    return `<article class="paper result"><p class="eyebrow">✦ &nbsp; BILAN DU QUIZ</p><h2>${score}/5 réponses justes</h2><p>${active.answers.filter(a=>a.correct&&!a.help).length} réussies en autonomie · ${evidence[key]?.perfect?.length||0}/2 séries parfaites pour maîtriser la notion.</p>
      <div class="quiz-review">${review}</div>
      <button class="primary" data-action="restart">Nouvelle série ↗</button><a class="text-link next-link" href="#/atelier/${key}/lecon">Revoir la leçon →</a><a class="text-link next-link" href="#/atelier/${key}/jeu">Passer au jeu →</a></article>`;
  }
  const q=series[active.step];
  return `<article class="paper"><p class="eyebrow">QUESTION ${active.step+1} / 5</p>
    <div class="segments" aria-label="Question ${active.step+1} sur 5">${Array.from({length:5},(_,i)=>`<span class="${i<=active.step?"filled":""}"></span>`).join("")}</div>
    ${levelButtons}<p class="quiz-goal">✦ Termine les cinq questions pour gagner des XP. Pour valider une série parfaite, choisis En autonomie ou Défi et réponds juste sans indice.</p><h2>${clean(q.prompt)}</h2>${quizVisual(q)}<form id="answer" class="answer">${answerFields(q)}
    <button class="primary" ${busy?"disabled":""}>Vérifier ↗</button></form>
    <button class="quiet" data-action="help" aria-controls="quiz-help" aria-expanded="${help||active.level===0}">Indice et rappel de cours</button>
    <div id="quiz-help" class="hint" ${help||active.level===0?"":"hidden"}><p><strong>Indice.</strong> ${clean(q.hint||lessons[key].help)}</p>
      <p><strong>À retenir.</strong> ${clean(explorations[key]?.recap||lessons[key].summary)}</p></div>
    </article>`;
}
function gameView(key) {
  const isDivision=key==="division";
  if(active.done) return `<article class="paper result"><p class="eyebrow">MISSION ACCOMPLIE</p><h2>${"★ ".repeat(active.stars||0)||"Trois étapes réussies"}</h2><p>Les trois étapes ont été validées. ${free?"Tu peux rejouer.":"Ton résultat est enregistré."}</p><button class="primary" data-action="restart">Rejouer ↗</button></article>`;
  if(key==="arithmetique3") return fractionWorkbench("jeu");
  if(key==="graphiques3"){
    const distance=cap(active.game[0]??2,0,10);
    return `<article class="paper"><p class="eyebrow">MISSION ${active.step+1} / 3</p><h2>À toi de choisir le trajet</h2>
      <p>${tariffMissions[active.step][0]}</p>${tariffGraph(4,distance)}
      <div class="controls">${stepper("a","Distance en km",distance,0,10)}</div>
      <button class="primary" data-action="game-test" ${busy?"disabled":""}>Valider la distance ↗</button>
      ${feedback?`<p class="hint" role="status">${clean(feedback)}</p>`:""}</article>`;
  }
  const concept=concepts[key];
  if(concept){
    const target=concept.targets[active.step], expected=displayNumber(concept.model(target));
    return `<article class="paper"><p class="eyebrow">DÉFI ${active.step+1} / 3</p><h2>${clean(concept.mission)}</h2>
      <p>Trouve une valeur de départ qui donne <b>${expected} ${clean(concept.label)}</b>.</p>
      <details><summary>Voir un exemple de méthode</summary><p>${clean(concept.summary)}</p><p>${clean(concept.equation(concept.initial))}</p></details>
      <form class="answer" id="concept-answer"><label>${clean(concept.control)} <input name="setting" type="number" step="1" min="${concept.min}" max="${concept.max}" required></label>
      <button class="primary" ${busy?"disabled":""}>Valider ↗</button></form>
      ${feedback?`<p class="hint" role="status">${clean(feedback)}</p>`:""}</article>`;
  }
  const g=games[key][active.step];
  const [a,b]=active.game.length?active.game:[0,0];
  return `<article class="paper"><p class="eyebrow">MISSION ${active.step+1} / 3</p><h2>${lessons[key].mission}</h2>
    <p>${isDivision?`Embarque ${g.goal} passagers avec au maximum ${g.max} navettes. Réduis le nombre de places vides pour gagner une étoile.`:"Règle les blocs x et les unités pour que ta machine produise les trois résultats attendus."}</p>
    ${isDivision?`<div class="game-scene"><span>◈ &nbsp; QUAI D’EMBARQUEMENT</span><strong>${a*g.a+b*g.b} <small>/ ${g.goal} places nécessaires</small></strong><div>${"▰ ".repeat(a+b)||"Ajoute des navettes pour commencer."}</div></div>`:
      `<div class="game-scene"><span>◈ &nbsp; BANC D’ESSAI</span><strong>${a}x ${b<0?"−":"+"} ${Math.abs(b)}</strong><div class="test-values">${g.values.map(x=>`<span>x = ${x} → ${a*x+b} <small>/ attendu ${g.a*x+g.b}</small></span>`).join("")}</div></div>`}
    <div class="controls">${stepper("a",isDivision?`Navettes de ${g.a}`:"Blocs x",a,0,isDivision?g.max:8)}${stepper("b",isDivision?`Navettes de ${g.b}`:"Unités",b,isDivision?0:-8,isDivision?g.max:8)}</div>
    <button class="primary" data-action="game-test" ${busy?"disabled":""}>${isDivision?"Lancer le départ":"Tester la machine"} ↗</button>
    ${feedback?`<p class="hint" role="status">${clean(feedback)}</p>`:""}</article>`;
}

let students = [], teacherResult = "";
function teacher() {
  return `<p class="eyebrow">✦ &nbsp; POSTE D’OBSERVATION</p><h1>Espace prof</h1><p>Comptes élèves et avancement des ateliers.</p>
    <section class="paper class-harbor"><h2>Chapitre indiqué en classe</h2>
    <p>Choisis le chapitre à mettre en tête du parcours. Tu peux aussi retirer le repère.</p>
    <form id="class-focus"><label>Classe et chapitre <select name="focus">
    ${grades.map(grade=>`<optgroup label="${grade}"><option value="${grade}/">Retirer le repère de ${grade}</option>
      ${(chapters[grade]||[]).map(chapter=>`<option value="${grade}/${chapter.id}" ${classFocus[grade]===chapter.id?"selected":""}>${clean(chapter.code+" · "+chapter.title)}</option>`).join("")}</optgroup>`).join("")}
    </select></label><button class="primary" ${busy?"disabled":""}>Mettre à jour le repère ↗</button></form></section>
    <div class="teacher-grid"><article class="paper"><h2>Créer un compte</h2><form id="student">
    <label>Prénom ou pseudo<input name="name" required maxlength="50"></label><label>Identifiant<input name="username" required minlength="3" maxlength="24"></label>
    <label>Classe<select name="grade">${teachingGrades.map(g=>`<option>${g}</option>`).join("")}</select></label>
    <button class="primary" ${busy?"disabled":""}>Créer le compte ↗</button></form></article>
    <article class="paper"><h2>Les élèves</h2><div class="progress-list">${students.map(s=>`<div><div><b>${clean(s.name)}</b><small>${clean(s.grade)} · ${s.completed} ateliers terminés · ${s.activitiesCompleted??0} bilans</small></div><button class="quiet" data-reset="${clean(s.username)}" ${busy?"disabled":""}>Réinitialiser l’accès</button></div>`).join("")}</div></article></div>
    ${teacherResult?`<p class="notice" role="status">${clean(teacherResult)}</p>`:""}`;
}
function render() {
  if(trainingTimer!==null){clearInterval(trainingTimer);trainingTimer=null;}
  if(!user){root.innerHTML=login();return;}
  if(user.role==="teacher"){root.innerHTML=shell(teacher(),"prof");return;}
  let [tab,key,mode]=route();
  if(!selectedGrade||tab==="classe"){root.innerHTML=shell(choisir(),"parcours");return;}
  if(tab!=="atelier"&&tab!=="cours"&&!nav[tab]) tab="parcours";
  if(tab==="atelier"&&!lessons[key]) tab="parcours";
  if(tab==="atelier"&&modes[mode]){
    const id=key+"/"+mode;
    if(activeKey!==id){
      activeKey=id;
      const old=get(key,mode);
      if(old){const {lesson,mode:ignored,...state}=old;active={...fresh(),quizVersion:0,...state};}
      else active=fresh();
      feedback="";help=false;
    }
  } else activeKey="";
  const body=tab==="atelier"?atelier(key,mode):tab==="cours"?courseView(key,mode,route()[3],route()[4]):({parcours,chapitres,defis,profil}[tab])();
  root.innerHTML=shell((activityPending?'<div class="retry"><p>Un entraînement attend son enregistrement.</p><button class="quiet" data-action="retry-activity">Réessayer</button></div>':"")+(pending?`<div class="retry"><p>Une réponse attend son enregistrement.</p><button class="quiet" data-action="retry" ${busy?"disabled":""}>Réessayer</button></div>`:"")+body,tab==="atelier"||tab==="cours"?"chapitres":tab);
  if(tab==="atelier"&&mode==="lecon"&&document.querySelector("#model")) model(key);
  if(tab==="defis"&&training?.deadline&&!training.done&&document.querySelector("#training-clock")){
    trainingTimer=setInterval(trainingClock,250);trainingClock();
  }
}

async function session() {
  const data=await api("me");
  activities=new Map((data.activities??[]).map(activity=>[activity.id,activity]));
  training=null;renderTrainingIntro=null;
  activityHistory=data.activityHistory??[];classFocus=data.classFocus??{};
  user=data.user;progress=data.progress;evidence=data.evidence||{};selectedGrade=user.grade||"";filter=selectedGrade;
  if(user.role==="teacher") students=(await api("students")).students;
}
function captureDestination(){
  if(["atelier","cours","defis"].includes(route()[0])) entryDestination=route().join("/");
}
function enterCourse(){
  if(!selectedGrade) return go("classe");
  go(entryDestination||"parcours");entryDestination=null;
}
async function signIn(username,password,create) {
  captureDestination();
  if(busy) return;
  busy=true;error="";render();
  try {
    await api("login",{username,password,...(create===undefined?{}:{create})});
    await session();
    if(activityPending&&activityPending.owner!==user.username) activityPending=null;
    if(user.role==="teacher") go("prof"); else enterCourse();
  } catch(e){error=e.message==="Failed to fetch"?"Le serveur est inaccessible.":e.message;}
  finally {busy=false;render();}
}
async function commit(request) {
  if(busy) return;
  const {key,mode,state,after,proof}=request;
  request.event ??= globalThis.crypto?.randomUUID?.() ?? Date.now()+"-"+Math.random().toString(36).slice(2);
  pending=request;busy=true;error="";notice="";render();
  try {
    const before=classProgress(lessons[key].grade,evidence);
    if(free) updateEvidence(evidence,key,mode,state);
    else {
      const result=await api("progress",{lesson:key,mode,state,event:request.event,proof,revision:get(key,mode)?.revision??0});
      evidence=result.evidence;
      if(result.revision!==undefined) state.revision=result.revision;
      if(result.progress) Object.assign(state,result.progress);
    }
    const afterRank=classProgress(lessons[key].grade,evidence);
    const gain=afterRank.xp-before.xp;
    progress=[{lesson:key,mode,...state},...progress.filter(p=>p.lesson!==key||p.mode!==mode)];
    if(activeKey===key+"/"+mode){active=state;after?.();}
    pending=null;
    notice=gain>0?`✦ +${gain} XP${afterRank.level>before.level?` · Nouveau rang : ${afterRank.title} !`:""}`:
      free?(mode==="quiz"&&!state.done?"":"✓ Étape terminée en parcours libre"):"✓ Progression enregistrée";
  } catch(e){
    if(e.status===409){
      await session();activeKey="";pending=null;error="Cet atelier a changé sur un autre appareil. La progression enregistrée a été rechargée.";
    }else if(e.status===401){user=null;activeKey="";pending=null;error="Ta session a expiré. Reconnecte-toi.";}
    else error="Enregistrement interrompu. Réessaie quand le serveur est disponible.";
  } finally {busy=false;render();}
}

root.addEventListener("input",e=>{
  if(e.target.id==="course-search"){
    const normalize=value=>value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"").trim();
    const q=normalize(e.target.value);
    let matches=0;
    for(const row of document.querySelectorAll("[data-course-search]")){row.hidden=!normalize(row.dataset.courseSearch).includes(q);if(!row.hidden) matches++;}
    document.querySelector("#course-no-results").hidden=Boolean(matches);
    return;
  }
  if(e.target.classList?.contains("sheet-value")){
    const cells=[...document.querySelectorAll(".sheet-value")];
    const values=cells.filter(cell=>cell.value!=="").map(cell=>cell.valueAsNumber);
    document.querySelector("#sheet-mean").textContent=values.length&&values.every(Number.isFinite)
      ?displayNumber(values.reduce((sum,value)=>sum+value,0)/values.length):"—";
  }
  if(e.target.id==="search"){
    query=e.target.value;document.querySelector("#chapter-list").innerHTML=chapterList();
  }
  if(e.target.hasAttribute?.("data-chart-bar")){
    const [,key]=route();
    const q=questions(key,active.seed,active.level,active.quizVersion)[active.step];
    const sliders=[...document.querySelectorAll("[data-chart-bar]")];
    document.querySelector("#chart-draft").innerHTML=quizChart(q.labels.map((label,i)=>[label,Number(sliders[i].value)]),q.max);
  }
  if(e.target.type==="range"&&route()[0]==="atelier"&&route()[2]==="lecon"){
    model(route()[1]);
    active.game=["a","b","x"].map(id=>Number(document.querySelector("#"+id)?.value??0));
  }
});
root.addEventListener("submit",async e=>{
  e.preventDefault();
  const values=Object.fromEntries(new FormData(e.target));
  if(e.target.id==="login") return signIn(values.username,values.password,e.submitter?.value==="create");
  if(["division-lab","blocks-lab","tariff-lab","curve-lab"].includes(e.target.id)){checkChapterLab(e.target.id,values);return;}
  if(e.target.id==="course-answers"){
    if(busy||activityPending) return;
    const id=e.target.dataset.courseRef;
    const answers=[...e.target.querySelectorAll("[name^=answer]")].map(field=>field.value.trim());
    const done=e.submitter?.value!=="draft";
    const ok=await saveActivity(id,{answers,done,updated:Date.now()});
    render();
    if(ok&&done) document.querySelector("#course-feedback")?.focus();
    return;
  }
  if(e.target.id==="training-answer"&&training&&!training.done){
    if(busy||activityPending) return;
    if(training.deadline&&Date.now()>=training.deadline) return finishTraining();
    training.answers[training.index]=String(values.answer??"").trim();
    if(training.index+1===training.questions.length) training.done=true;
    else training.index++;
    await saveTraining();render();
    document.querySelector("#training-answer input")?.focus();return;
  }
  if(busy||pending) return;
  if(e.target.id==="concept-answer"){
    const key=route()[1], concept=concepts[key], setting=Number(values.setting);
    if(!concept||!Number.isInteger(setting)||setting<concept.min||setting>concept.max) return;
    if(concept.model(setting)!==concept.model(concept.targets[active.step])){
      feedback=`Avec ${setting}, tu obtiens ${displayNumber(concept.model(setting))}. Réessaie en utilisant la relation de la fiche.`;
      render();document.querySelector("#concept-answer input")?.focus();return;
    }
    const stars=active.stars+1;
    return commit({key,mode:"jeu",proof:[setting],state:{...active,step:active.step+1,done:active.step===2,stars,bestStars:Math.max(active.bestStars||0,stars),game:[]},
      after:()=>{feedback="Bravo ! Le résultat correspond.";}});
  }
  if(e.target.id==="answer"){
    const key=route()[1], q=questions(key,active.seed,active.level,active.quizVersion)[active.step];
    const {value,correct,error:invalid}=validateAnswer(q,values);
    if(invalid){error=invalid;render();return;}
    const usedHelp=help||active.level===0;
    const state={...active,step:active.step+1,done:active.step===4,answers:[...active.answers,{value,correct,help:usedHelp,explain:q.explain}]};
    return commit({key,mode:"quiz",state,after:()=>{help=false;feedback=(correct?"Bien joué ! ":"À retenir. ")+q.explain;}});
  }
  if(e.target.id==="student") return manage("students",values);
  if(e.target.id==="class-focus"){
    const [grade,chapter]=values.focus.split("/");
    busy=true;
    try{classFocus=(await api("class-focus",{grade,chapter})).classFocus;notice="Chapitre repère mis à jour.";error="";}
    catch(e){error=e.message;}finally{busy=false;render();}
  }
});
async function manage(action,body){
  if(busy) return;
  busy=true;error="";teacherResult="";render();
  try{
    const result=await api(action,body);
    teacherResult=`Identifiant ${result.username} · Mot de passe ${result.password}`;
    students=(await api("students")).students;
  }catch(e){error=e.message;}
  finally{busy=false;render();}
}
root.addEventListener("click",async e=>{
  const button=e.target.closest("button");
  if(!button) return;
  const d=button.dataset;
  const [,key,mode]=route();
  if(d.courseReset){
    await saveActivity(d.courseReset,{answers:[],done:false,updated:Date.now()});
    render();return;
  }
  if(d.trainingStart){
    const [tab,type,id]=route();
    if(tab!=="defis") return;
    if(busy||activityPending) return;
    const seed=Math.floor(Math.random()*0x7fffffff), ref=[selectedGrade,type,id].join("/");
    const series=trainingSet(type,selectedGrade,id,seed);
    if(!series.length) return;
    renderTrainingIntro=null;
    training={ref,seed,activityId:"training/"+ref+"/"+activityEvent(),questions:series,answers:[],index:0,done:false,
      deadline:d.trainingStart==="chrono"?Date.now()+540000:null};
    await saveTraining();render();return;
  }
  if("trainingRestart" in d){
    if(busy||activityPending) return;
    renderTrainingIntro=training.ref;training=null;render();return;
  }
  if(("trainingBack" in d || "trainingFinish" in d)&&training&&!training.done){
    if(busy||activityPending) return;
    if(busy) return;
    if(training.deadline&&Date.now()>=training.deadline) return finishTraining();
    if("trainingFinish" in d) return finishTraining();
    captureTrainingAnswer();
    training.index=Math.max(0,training.index-1);
    await saveTraining();render();return;
  }
  if(d.action==="theme"){
    themePreference=currentTheme()==="dark"?"light":"dark";
    try { globalThis.localStorage?.setItem(themeKey,themePreference); } catch { /* Préférence de la visite. */ }
    applyTheme();
    return;
  }
  if(d.simulate){
    const trials=Number(d.simulate);
    let heads=0;
    for(let i=0;i<trials;i++) if(Math.random()<0.5) heads++;
    const frequency=100*heads/trials;
    document.querySelector("#simulation-result").innerHTML=`<p class="hint"><strong>${heads} piles sur ${trials}</strong> · fréquence : ${displayNumber(frequency)} % · écart à 50 % : ${displayNumber(Math.abs(frequency-50))} points.</p>`;
    return;
  }
  if(d.action==="install"&&installPrompt){
    const prompt=installPrompt;installPrompt=undefined;await prompt.prompt();render();return;
  }
  if(d.action==="free"){
    captureDestination();activities.clear();activityHistory=[];classFocus={};activityPending=null;
    free=true;user={name:"Exploration libre",grade:"",role:"student"};progress=[];evidence={};selectedGrade="";filter="";activeKey="";
    error="";go("classe");render();return;
  }
  if(d.demo) return signIn(d.demo,{camille:"atelier6",noa:"atelier4",marie:"atelierprof"}[d.demo]);
  if(d.domain){selectedDomain=d.domain;render();return;}
  if(d.grade){
    if(busy||!grades.includes(d.grade)) return;
    busy=true;error="";
    try {
      if(!free) await api("grade",{grade:d.grade});
      selectedGrade=d.grade;selectedDomain="";filter=d.grade;training=null;user.grade=d.grade;enterCourse();
    } catch(e){error=e.message;}
    finally{busy=false;render();}
    return;
  }
  if("filter" in d){filter=d.filter;render();return;}
  if(d.action==="logout"){
    if(busy) return;
    try{if(!free) await api("logout",{});free=false;user=null;progress=[];evidence={};training=null;activities.clear();activityHistory=[];classFocus={};activityPending=null;activeKey="";pending=null;notice="";error="";go("parcours");render();}
    catch(e){if(e.status===401){user=null;activities.clear();activityHistory=[];activityPending=null;training=null;render();}
      else {error="Déconnexion impossible. Réessaie quand le serveur est disponible.";render();}}
    return;
  }
  if(d.action==="retry-activity"&&activityPending){
    const {id,state,event}=activityPending;
    const form=root.querySelector("#course-answers");
    const localDraft=form&&form.dataset.courseRef!==id
      ?[...form.querySelectorAll("[name^=answer]")].map(field=>field.value):null;
    await saveActivity(id,state,event);render();
    const restored=root.querySelector("#course-answers");
    if(localDraft&&restored?.dataset.courseRef===form.dataset.courseRef)
      restored.querySelectorAll("[name^=answer]").forEach((field,i)=>{field.value=localDraft[i]??"";});
    return;
  }
  if(d.action==="retry"&&pending) return commit(pending);
  if(busy||pending) return;
  if(d.reset) return manage("reset",{username:d.reset});
  if(!active||!lessons[key]||!modes[mode]) return;
  if(key==="arithmetique3" && (mode==="lecon" || mode==="jeu") &&
      (d.reduce || ["check-irreducible","reset-fraction"].includes(d.action))){
    const [n,b]=active.game.length===2?active.game:reductionMissions[mode==="jeu"?active.step:0];
    if(d.action==="reset-fraction"){
      active={...active,game:[]};feedback="";render();return;
    }
    if(d.reduce){
      const k=Number(d.reduce), left=n%k, right=b%k;
      if(left||right){
        feedback=`La division par ${k} ne convient pas. Reste pour ${n} : ${left}. Reste pour ${b} : ${right}. Il faut deux restes nuls.`;
      }else{
        active={...active,game:[n/k,b/k]};
        feedback=`${n} ÷ ${k} = ${n/k} et ${b} ÷ ${k} = ${b/k}. Les deux termes ont été divisés par ${k} : la fraction garde sa valeur.`;
      }
      render();return;
    }
    const divisor=commonFactor(n,b);
    if(divisor!==1){
      feedback=`On peut encore simplifier : ${divisor} divise à la fois ${n} et ${b}.`;render();return;
    }
    feedback=`Bravo ! ${n} et ${b} n’ont aucun diviseur commun supérieur à 1. La fraction est irréductible.`;
    if(mode==="lecon"){render();return;}
    const message=feedback,stars=active.stars+1;
    return commit({key,mode,proof:[n,b],state:{...active,step:active.step+1,done:active.step===2,stars,bestStars:Math.max(active.bestStars||0,stars),game:[]},
      after:()=>{feedback=message;}});
  }
  if(d.level!==undefined){active=fresh(Number(d.level));render();return;}
  if(d.adjust){
    if(key==="graphiques3"){
      active={...active,game:[cap((active.game[0]??2)+Number(d.delta),0,10)]};
      feedback="";render();return;
    }
    const concept=concepts[key];
    if(concept){
      active={...active,game:[cap((active.game[0]??concept.min)+Number(d.delta),concept.min,concept.max)]};
      feedback="";render();return;
    }
    const g=games[key][active.step], isDivision=key==="division";
    const game=active.game.length?[...active.game]:[0,0];
    const i=d.adjust==="a"?0:1;
    game[i]=cap(game[i]+Number(d.delta),isDivision||i===0?0:-8,isDivision?g.max:8);
    active={...active,game};feedback="";render();return;
  }
  if(d.action==="help"){
    help=true;
    const panel=document.querySelector("#quiz-help");
    if(panel){panel.hidden=false;button.setAttribute("aria-expanded","true");}
    return;
  }
  if(d.action==="continue-quiz"){feedback="";if(!active.done)notice="";render();return;}
  if(d.action==="restart") return commit({key,mode,state:{...fresh(active.level),bestStars:active.bestStars||active.stars||0},after:()=>{feedback="";help=false;}});
  if(d.action==="finish-lesson") return commit({key,mode,state:{...active,done:true,step:1}});
  if(d.action==="game-test"){
    if(key==="graphiques3"){
      const distance=cap(active.game[0]??2,0,10);
      if(!tariffMissions[active.step][1](distance)){
        feedback="À cette distance, compare les deux points à la verticale. Essaie une autre distance.";render();return;
      }
      const stars=active.stars+1;
      return commit({key,mode,proof:[distance],state:{...active,step:active.step+1,done:active.step===2,stars,bestStars:Math.max(active.bestStars||0,stars),game:[]},
        after:()=>{feedback="Bonne lecture du graphique.";}});
    }
    const g=games[key][active.step], [a,b]=active.game.length?active.game:[0,0];
    let stars=1;
    if(key==="division"){
      const seats=a*g.a+b*g.b;
      if(a+b>g.max||seats<g.goal){
        feedback=a+b>g.max?"Tu as utilisé trop de navettes.":"Il manque "+(g.goal-seats)+" places. Ajuste ton plan et réessaie.";
        render();return;
      }
      const choices=[];
      for(let i=0;i<=g.max;i++) for(let j=0;j<=g.max-i;j++) if(i*g.a+j*g.b>=g.goal) choices.push(i*g.a+j*g.b);
      stars=Number(seats===Math.min(...choices));
      feedback=stars?"Départ réussi et capacité optimale !":"Départ réussi ! Un autre plan laisserait moins de places vides.";
    }else if(a!==g.a||b!==g.b){
      feedback="Au moins une valeur ne correspond pas. Compare les résultats affichés et ajuste les réglages.";
      render();return;
    }else feedback="Tous les résultats correspondent !";
    const message=feedback;
    const state={...active,step:active.step+1,done:active.step===2,stars:active.stars+stars,bestStars:Math.max(active.bestStars||0,active.stars+stars),game:[]};
    return commit({key,mode,state,proof:[a,b],after:()=>{feedback=message;}});
  }
});
document.querySelector(".skip")?.addEventListener("click",event=>{
  event.preventDefault();document.querySelector("#content")?.focus();
});
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;render();});
window.addEventListener("appinstalled",()=>{installPrompt=undefined;render();});
window.addEventListener("hashchange",()=>{
  notice="";error="";render();window.scrollTo(0,0);
  const skill=route()[0]==="cours"&&route()[3]==="exercices"?route()[5]:null;
  const item=skill&&/^\d+$/.test(skill)?root.querySelector?.(`[data-item-skill="${skill}"]`):null;
  const heading=item||root.querySelector?.("h1");
  if(heading){heading.setAttribute("tabindex","-1");heading.focus({preventScroll:!item});}
});
if(!standalone&&"serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{});
root.innerHTML='<main class="loading">✦ &nbsp; Préparation de ton atlas…</main>';
if(standalone) render();
else session().catch(e=>{if(e.status!==401) error="Le serveur est inaccessible.";}).finally(render);
