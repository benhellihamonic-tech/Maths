import {explorations, correctionTone} from "./pedagogie.js";
import {writtenPractice, tariffValues, commonFactor} from "./assessment.js";
import {lessons, modes, levels, questions, games, concepts, connections, lessonGroups} from "./content.js";
import {displayNumber} from "./curriculum.js";
import {classProgress, lessonXP, ranks, updateEvidence, xpRoutes} from "./progression.js";

const root = document.querySelector("#app");
const nav = {parcours:["⌖","Parcours"], chapitres:["▤","Chapitres"], defis:["ϟ","Défis"], profil:["◉","Profil"]};
const grades = ["6e","5e","4e","3e"];
const localDemo = ["localhost","127.0.0.1"].includes(location.hostname);
const standalone = location.protocol === "file:" || Boolean(window.ARCHIPEL_APERCU);
let free = false, evidence = {};
let user, progress = [], selectedGrade = "", activeKey = "", active = null, busy = false;
let installPrompt, selectedDomain = "";
let notice = "", error = "", feedback = "", pending = null, help = false, filter = "", query = "";
const clean = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const cap = (n,a,b) => Math.max(a,Math.min(b,n));
const fresh = (level=0) => ({step:0,done:false,quizVersion:3,seed:Math.floor(Math.random()*0x7fffffff),level,answers:[],stars:0,help:false,game:[]});
const route = () => location.hash.slice(2).split("/");
const go = path => { location.hash = "/" + path; };
const get = (lesson,mode) => progress.find(p=>p.lesson===lesson && p.mode===mode);
const credit = '<footer class="site-credit">Réalisé par <strong>Marie HAMONIC</strong> · collège Jean Moulin</footer>';
const totalStars = () => progress.filter(p=>p.mode==="jeu").reduce((a,p)=>a+(p.bestStars||p.stars||0),0);

async function api(path, body) {
  const response = await fetch("/api/"+path, {
    method:body===undefined?"GET":"POST", cache:"no-store",
    ...(body===undefined?{}:{headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}),
  });
  const data = await response.json();
  if (!response.ok) {
    const failure = new Error(data.error);
    failure.status = response.status;
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
  return `<main id="content" class="login"><section class="login-art">
    <div class="brand">${brand()}</div><div class="login-title"><p class="eyebrow">✦ &nbsp; EXPÉDITION MATHÉMATIQUE</p>
    <h1>Les maths,<br><em>ça s’explore.</em></h1><p>Des notions à manipuler, des missions à relever et ton propre chemin de la 6e à la 3e.</p></div>
    <div class="coordinates">48° N &nbsp; / &nbsp; 02° O <span>ATLAS · ÉDITION 01</span></div></section>
    <section class="login-form"><div><p class="eyebrow">● &nbsp; LE POINT DE DÉPART</p><h2>Bienvenue à bord.</h2>
    <p>Explore librement ou connecte-toi pour retrouver ta progression.</p>
    <button class="primary" data-action="free">Parcours libre <span>↗</span></button>
    ${standalone?'<p class="footnote">Version autonome · pour utiliser un compte, ouvre Lancer-Archipel.command dans le Finder.</p>':`<form id="login"><label>Identifiant<input name="username" required autocomplete="username"></label>
    <label>Mot de passe<input name="password" type="password" required autocomplete="current-password"></label>
    <button class="primary" ${busy?"disabled":""}>Se connecter ou créer mon compte <span>↗</span></button><small>Pour un nouvel identifiant, choisis au moins 8 caractères pour le mot de passe.</small></form>`}
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
    <main id="content" class="content"><header class="top"><span>✦ &nbsp; ARCHIPEL <i>/</i> ${clean(nav[tab]?.[1] || "Espace prof")}</span>
    <span class="top-profile">${free?'<small>Parcours libre · session en cours</small>':""}${rank?`<a class="xp-chip" href="#/profil" title="Voir mon rang">${rank.xp} XP</a>`:""}<strong>★ ${totalStars()}</strong><button data-action="logout" aria-label="Déconnexion">↪</button></span></header>
    ${status()}${installLink()}${body}${credit}</main></div>`;
}
function card(key, lesson) {
  const n = Object.keys(modes).filter(mode=>get(key,mode)?.done).length;
  return `<a class="chapter-card" href="#/atelier/${key}"><div class="tile-icon ${key}">${lesson.icon}</div>
    <div><p class="eyebrow">${lesson.grade} · ${lesson.tag}</p><h3>${lesson.title}</h3><p>${lesson.intro}</p>
    <small>${n}/3 modes terminés</small></div><span class="arrow">↗</span></a>`;
}
function resumeLink() {
  const next = progress.find(p=>!p.done && lessons[p.lesson]?.grade===selectedGrade);
  if(next) return {url:`#/atelier/${next.lesson}/${next.mode}`,label:"Reprendre"};
  for(const [key,lesson] of Object.entries(lessons)){
    if(lesson.grade!==selectedGrade) continue;
    const mode=Object.keys(modes).find(mode=>!get(key,mode)?.done);
    if(mode) return {url:`#/atelier/${key}/${mode}`,label:mode==="lecon"?"Explorer la leçon":"Étape suivante"};
  }
  return {url:"#/defis",label:"Rejouer un défi"};
}
function choisir() {
  return `<p class="eyebrow">✦ &nbsp; CHOISIS TON POINT DE DÉPART</p><h1>Dans quelle classe es-tu ?</h1>
  <p>Chaque classe a sa propre carte. Les îles représentent les notions, et les routes montrent leurs liens.</p>
  <div class="grade-grid">${grades.map((g,i)=>`<button class="chapter-card" data-grade="${g}" ${busy?"disabled":""}><span class="tile-icon">${g}</span>
    <span><b>${["Sixième","Cinquième","Quatrième","Troisième"][i]}</b><small>Explorer les notions ↗</small></span></button>`).join("")}</div>`;
}
function nextActivities(rank, omit) {
  const options=xpRoutes(rank,evidence,progress,omit);
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
  const resume = resumeLink();
  const rank=classProgress(selectedGrade,evidence);
  const groups=rank.groups;
  const [domain,keys]=groups.find(([name])=>name===selectedDomain)||groups[0];
  const pins=[[23,62],[47,34],[68,62],[82,26],[10,29],[58,79],[89,65]];
  return `<div class="intro"><div><p class="eyebrow">✦ &nbsp; TON EXPÉDITION · ${selectedGrade}</p><h1>L’archipel de ${selectedGrade}</h1>
    <p>Explore les notions et découvre les routes qui les relient.</p></div><a class="primary" href="${resume.url}">${resume.label} <span>↗</span></a></div>
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
  const entries = Object.entries(lessons).filter(([,l])=>(!filter||l.grade===filter)&&
    (l.title+" "+l.tag+" "+l.mission).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")));
  return entries.map(pair=>card(...pair)).join("") || '<div class="empty">Aucun atelier ouvert pour cette recherche. Essaie un autre mot-clé ou une autre classe.</div>';
}
function chapitres() {
  return `<p class="eyebrow">✦ &nbsp; LA BIBLIOTHÈQUE</p><h1>Les chapitres</h1><p>Choisis une notion et ouvre son atelier.</p>
    <label class="search">Rechercher une notion <input id="search" type="search" value="${clean(query)}" placeholder="Ex. division, calcul littéral…"></label>
    <div class="pills"><button data-filter="" aria-pressed="${!filter}">Toutes</button>${grades.map(g=>`<button data-filter="${g}" aria-pressed="${g===filter}">${g}</button>`).join("")}</div>
    <div id="chapter-list" class="cards">${chapterList()}</div>`;
}
function defis() {
  return `<p class="eyebrow">✦ &nbsp; LE COIN DES RÉFLEXES</p><h1>Les défis</h1><p>Cinq questions, de nouvelles valeurs à chaque série.</p><div class="cards">
    ${Object.entries(lessons).filter(([,l])=>l.grade===selectedGrade).map(([key,l])=>`<div class="chapter-card"><div class="tile-icon ${key}">${l.icon}</div><div><p class="eyebrow">${l.grade} · RÉFLEXES</p><h3>${l.title}</h3><p>${(evidence[key]?.perfect?.length||0)}/2 séries parfaites en autonomie · ${lessonXP(evidence[key])} XP</p><a class="text-link" href="#/atelier/${key}/quiz">Ouvrir le quiz ↗</a></div></div>`).join("")}</div>`;
}
function profil() {
  const rank=classProgress(selectedGrade,evidence);
  return `<p class="eyebrow">✦ &nbsp; CARNET DE BORD</p><h1>Ton profil</h1><p>${clean(user.name)} · ${selectedGrade} · ★ ${totalStars()} étoiles</p>
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
  const marker=distance===null?"":`<path d="M${px(distance)} 218V${py(Math.max(a,b))}" stroke="#45627c" stroke-dasharray="3 4"/>
    <circle cx="${px(distance)}" cy="${py(b)}" r="6" fill="#9a5121" stroke="white" stroke-width="1.5"/>
    <circle cx="${px(distance)}" cy="${py(a)}" r="${a===b?3:5}" fill="#11739c" stroke="white" stroke-width="1.5"/>`;
  return `<figure class="tariff-graph"><svg viewBox="0 0 392 260" role="img" aria-label="Tarifs Alizé et Brise selon la distance">
    ${Array.from({length:33},(_,y)=>`<path d="M50 ${py(y)}H370" stroke="${y%4===0?"#a9c7de":"#e3eef8"}"/>${y%4===0?`<text x="42" y="${py(y)+4}" text-anchor="end">${y}</text>`:""}`).join("")}
    ${Array.from({length:11},(_,x)=>`<path d="M${px(x)} 26V218" stroke="#ccdeee"/><text x="${px(x)}" y="237" text-anchor="middle">${x}</text>`).join("")}
    <path d="M50 21V218H375" fill="none" stroke="#142b48" stroke-width="2"/>
    <text x="6" y="16">Prix (€)</text><text x="369" y="254" text-anchor="end">Distance (km)</text>
    ${series(0,30,"#11739c")}${series(fee,20+fee,"#9a5121","8 4")}${marker}
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
    <div class="course-recap"><p class="eyebrow">02 · À RETENIR</p><p>${lesson.recap}</p></div>
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
  if(concept) return `<article class="paper"><p class="eyebrow">01 · MANIPULER</p><h2>${concept.title}</h2><p>${concept.worked?"Choisis une valeur, puis lis l’exemple qui lui correspond. Essaie de trouver le résultat avant de lire la réponse.":concept.intro}</p>
    <div class="controls">${sliders("a",concept.control,active.game[0]??concept.initial,concept.min,concept.max)}</div>
    <div id="model" class="manipulation"></div><p id="formula" class="formula"></p>
    <p class="eyebrow">02 · À RETENIR</p><p>${concept.summary}</p>
    <button class="primary" data-action="finish-lesson" ${busy?"disabled":""}>${active.done?"✓ Leçon terminée":"Terminer la leçon"} ↗</button>
    <a class="text-link next-link" href="#/atelier/${key}/quiz">Aller au quiz →</a></article>`;
  const division=key==="division";
  const [a,b]=active.game.length?active.game:division?[47,8]:[3,2];
  const x=active.game[2]??3;
  return `<article class="paper"><p class="eyebrow">01 · MANIPULER</p><h2>${division?"Remplis les navettes":"La machine à expressions"}</h2>
    <p>${division?"Change le nombre de passagers ou la capacité. Observe les groupes complets et le reste.":"Change le nombre de blocs x, d’unités et la valeur de x."}</p>
    <div class="controls">${division?sliders("a","Passagers",a,5,60)+sliders("b","Places par navette",b,2,12):sliders("a","Blocs x",a,1,6)+sliders("b","Unités",b,0,8)+sliders("x","Valeur de x",x,0,8)}</div>
    <div class="manipulation" id="model"></div><p class="formula" id="formula"></p>
    <p class="eyebrow">02 · À RETENIR</p><p>${lessons[key].summary}</p>
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
    ${Array.from({length:7},(_,y)=>`<path d="M34 ${py(y)}H178" stroke="#ccdeee"/><text x="18" y="${py(y)+4}">${y}</text>`).join("")}
    ${Array.from({length:5},(_,x)=>`<path d="M${px(x)} 32V188" stroke="#ccdeee"/><text x="${px(x)-4}" y="207">${x}</text>`).join("")}
    <path d="M34 28V188H188" fill="none" stroke="#142b48" stroke-width="2"/>
    ${plot(graph.points,"#126e9e")}${graph.second?plot(graph.second,"#854919","5 3"):""}</svg>`;
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
  const raw=(values.answer||"").trim().replace(/−/g,"-").replace(",",".");
  if(q.kind==="fraction"){
    const match=raw.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if(!match || !Number(match[2]) || match.slice(1).some(n=>Math.abs(Number(n))>1e7))
      return {error:"Écris une fraction avec un dénominateur positif, par exemple 3/4."};
    const a=Number(match[1]), b=Number(match[2]);
    let x=Math.abs(a), y=b;
    while(y) [x,y]=[y,x%y];
    return {value:raw,correct:a*q.answer[1]===b*q.answer[0]&&(!q.irreducible||x===1)};
  }
  if(!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(raw)||!Number.isFinite(Number(raw)))
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
    const value=active.game[0]??concept.min;
    return `<article class="paper"><p class="eyebrow">MISSION ${active.step+1} / 3</p><h2>${concept.mission}</h2>
      <p>${concept.missionText(concept.targets[active.step])}</p><div class="game-scene"><span>◈ &nbsp; TON RÉGLAGE</span><strong>${displayNumber(concept.model(value))}</strong>${concept.label}</div>
      <div class="controls">${stepper("a",concept.control,value,concept.min,concept.max)}</div>
      <button class="primary" data-action="game-test" ${busy?"disabled":""}>Valider le réglage ↗</button>
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
    <div class="teacher-grid"><article class="paper"><h2>Créer un compte</h2><form id="student">
    <label>Prénom ou pseudo<input name="name" required maxlength="50"></label><label>Identifiant<input name="username" required minlength="3" maxlength="24"></label>
    <label>Classe<select name="grade">${grades.map(g=>`<option>${g}</option>`).join("")}</select></label>
    <button class="primary" ${busy?"disabled":""}>Créer le compte ↗</button></form></article>
    <article class="paper"><h2>Les élèves</h2><div class="progress-list">${students.map(s=>`<div><div><b>${clean(s.name)}</b><small>${clean(s.grade)} · ${s.completed} modes terminés</small></div><button class="quiet" data-reset="${clean(s.username)}" ${busy?"disabled":""}>Réinitialiser l’accès</button></div>`).join("")}</div></article></div>
    ${teacherResult?`<p class="notice" role="status">${clean(teacherResult)}</p>`:""}`;
}
function render() {
  if(!user){root.innerHTML=login();return;}
  if(user.role==="teacher"){root.innerHTML=shell(teacher(),"prof");return;}
  let [tab,key,mode]=route();
  if(!selectedGrade||tab==="classe"){root.innerHTML=shell(choisir(),"parcours");return;}
  if(tab!=="atelier"&&!nav[tab]) tab="parcours";
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
  const body=tab==="atelier"?atelier(key,mode):({parcours,chapitres,defis,profil}[tab])();
  root.innerHTML=shell((pending?`<div class="retry"><p>Une réponse attend son enregistrement.</p><button class="quiet" data-action="retry" ${busy?"disabled":""}>Réessayer</button></div>`:"")+body,tab==="atelier"?"chapitres":tab);
  if(tab==="atelier"&&mode==="lecon") model(key);
}

async function session() {
  const data=await api("me");
  user=data.user;progress=data.progress;evidence=data.evidence||{};selectedGrade=user.grade||"";filter=selectedGrade;
  if(user.role==="teacher") students=(await api("students")).students;
}
async function signIn(username,password) {
  if(busy) return;
  busy=true;error="";render();
  try {
    await api("login",{username,password});
    await session();go(user.role==="teacher"?"prof":selectedGrade?"parcours":"classe");
  } catch(e){error=e.message==="Failed to fetch"?"Le serveur est inaccessible.":e.message;}
  finally {busy=false;render();}
}
async function commit(request) {
  if(busy) return;
  const {key,mode,state,after}=request;
  request.event ??= globalThis.crypto?.randomUUID?.() ?? Date.now()+"-"+Math.random().toString(36).slice(2);
  pending=request;busy=true;error="";notice="";render();
  try {
    const before=classProgress(lessons[key].grade,evidence);
    if(free) updateEvidence(evidence,key,mode,state);
    else evidence=(await api("progress",{lesson:key,mode,state,event:request.event})).evidence;
    const afterRank=classProgress(lessons[key].grade,evidence);
    const gain=afterRank.xp-before.xp;
    progress=[{lesson:key,mode,...state},...progress.filter(p=>p.lesson!==key||p.mode!==mode)];
    if(activeKey===key+"/"+mode){active=state;after?.();}
    pending=null;
    notice=gain>0?`✦ +${gain} XP${afterRank.level>before.level?` · Nouveau rang : ${afterRank.title} !`:""}`:
      free?(mode==="quiz"&&!state.done?"":"✓ Étape terminée en parcours libre"):"✓ Progression enregistrée";
  } catch(e){
    if(e.status===401){user=null;activeKey="";pending=null;error="Ta session a expiré. Reconnecte-toi.";}
    else error="Enregistrement interrompu. Réessaie quand le serveur est disponible.";
  } finally {busy=false;render();}
}

root.addEventListener("input",e=>{
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
  if(e.target.type==="range"&&route()[2]==="lecon"){
    model(route()[1]);
    active.game=["a","b","x"].map(id=>Number(document.querySelector("#"+id)?.value??0));
  }
});
root.addEventListener("submit",async e=>{
  e.preventDefault();
  const values=Object.fromEntries(new FormData(e.target));
  if(e.target.id==="login") return signIn(values.username,values.password);
  if(busy||pending) return;
  if(e.target.id==="answer"){
    const key=route()[1], q=questions(key,active.seed,active.level,active.quizVersion)[active.step];
    const {value,correct,error:invalid}=validateAnswer(q,values);
    if(invalid){error=invalid;render();return;}
    const usedHelp=help||active.level===0;
    const state={...active,step:active.step+1,done:active.step===4,answers:[...active.answers,{value,correct,help:usedHelp,explain:q.explain}]};
    return commit({key,mode:"quiz",state,after:()=>{help=false;feedback=(correct?"Bien joué ! ":"À retenir. ")+q.explain;}});
  }
  if(e.target.id==="student") return manage("students",values);
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
      selectedGrade=d.grade;selectedDomain="";filter=d.grade;user.grade=d.grade;go("parcours");
    } catch(e){error=e.message;}
    finally{busy=false;render();}
    return;
  }
  if("filter" in d){filter=d.filter;render();return;}
  if(d.action==="logout"){
    if(busy) return;
    try{if(!free) await api("logout",{});free=false;user=null;progress=[];evidence={};activeKey="";pending=null;notice="";error="";go("parcours");render();}
    catch(e){error="Déconnexion impossible. Réessaie quand le serveur est disponible.";render();}
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
    return commit({key,mode,state:{...active,step:active.step+1,done:active.step===2,stars,bestStars:Math.max(active.bestStars||0,stars),game:[]},
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
      return commit({key,mode,state:{...active,step:active.step+1,done:active.step===2,stars,bestStars:Math.max(active.bestStars||0,stars),game:[]},
        after:()=>{feedback="Bonne lecture du graphique.";}});
    }
    const concept=concepts[key];
    if(concept){
      if(concept.model(active.game[0]??concept.min)!==concept.model(concept.targets[active.step])){
        feedback="Le résultat ne correspond pas encore à l’objectif. Observe ton réglage et réessaie.";render();return;
      }
      const stars=active.stars+1;
      return commit({key,mode,state:{...active,step:active.step+1,done:active.step===2,stars,bestStars:Math.max(active.bestStars||0,stars),game:[]},
        after:()=>{feedback="Objectif atteint ! Voici la mission suivante.";}});
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
    return commit({key,mode,state,after:()=>{feedback=message;}});
  }
});
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;render();});
window.addEventListener("appinstalled",()=>{installPrompt=undefined;render();});
window.addEventListener("hashchange",()=>{notice="";error="";render();window.scrollTo(0,0);});
if(!standalone&&"serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{});
root.innerHTML='<main class="loading">✦ &nbsp; Préparation de ton atlas…</main>';
if(standalone) render();
else session().catch(e=>{if(e.status!==401) error="Le serveur est inaccessible.";}).finally(render);
