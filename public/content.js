import {assessment, tariffQuestions, irreducibleQuestions, reasoningQuestions} from "./assessment.js";
import {curriculum} from "./curriculum.js";
export const lessons = {
  division: {
    grade:"6e", title:"Division euclidienne", mission:"Le quai des départs", tag:"Nombres et calculs", icon:"÷",
    intro:"Des passagers, des navettes et une question : que faire du reste ?",
    summary:"Dividende = diviseur × quotient + reste. Le reste est toujours inférieur au diviseur.",
    help:"Le quotient donne le nombre de groupes complets. Le reste indique ce qu’il reste après ces groupes.",
  },
  algebre: {
    grade:"4e", title:"Calcul littéral", mission:"La fabrique des formules", tag:"Nombres et calculs", icon:"x",
    intro:"Construis une formule, change la valeur de x et regarde la machine réagir.",
    summary:"Dans 3x + 2, 3x signifie 3 × x. Pour calculer la valeur de l’expression, remplace x par le nombre donné.",
    help:"Dans une expression comme 3x + 2, commence par multiplier x par 3, puis ajoute 2.",
  },
};
export const modes = {lecon:"Leçon",quiz:"Quiz",jeu:"Jeu"};
export const levels = ["Guidé","En autonomie","Défi"];

export function questions(lesson, seed, level, version=0) {
  if(lesson==="arithmetique3"&&version>=3) return irreducibleQuestions(seed,level,version);
  if(lesson==="graphiques3"&&version>=2) return tariffQuestions(seed,level,version);
  if(version>=4) {
    const reasoning=reasoningQuestions(lesson,seed);
    if(reasoning) return reasoning;
  }
  const random = n => ((Math.imul(seed ^ (n * 4051), 2654435761) >>> 0) % 113);
  const used = new Set();
  return Array.from({length:5}, (_,i) => {
    if(version<4) return quizItem(lesson,i,level,version,random);
    for(let shift=0;shift<113;shift++){
      const q=quizItem(lesson,i,level,version,n=>random(n)+shift);
      const signature=questionSignature(q);
      if(!used.has(signature)){used.add(signature);return q;}
    }
    // A repeated static check is skipped in favour of another generated question.
    for(let shift=0;shift<113;shift++){
      const q=quizItem(lesson,i,level,0,n=>random(n)+shift,true);
      const signature=questionSignature(q);
      if(!used.has(signature)){used.add(signature);return q;}
    }
    return quizItem(lesson,i,level,version,random);
  });
}

export function questionSignature(q){
  // Identifie le travail demandé, y compris le support qui accompagne une consigne.
  return JSON.stringify([q.prompt,q.graph,q.comparison,q.values,q.given,q.labels]);
}

function quizItem(lesson,i,level,version,random,skipInverse=version>=4){
  const checks=Object.hasOwn(assessment,lesson)?assessment[lesson]:[];
  if(version>=1 && (i===3 || (i===4 && checks.length>1)) && checks.length) {
    return checks[(i-3)%checks.length];
  }
  if (concepts[lesson]) {
    if(curriculum[lesson]) {
      const {min,max}=curriculum[lesson];
      const n=min+random(i+2)%Math.min(max-min+1,skipInverse?7+level*3:5+level*4);
      const form=skipInverse&&i%3===2?i+1:i;
      const [prompt,answer,explain]=curriculum[lesson].question(n,form);
      return {prompt,answer,explain};
    }
    const n = lesson === "fractions" ? 1 + random(i+2)%8 : 2 + random(i+2)%(skipInverse?5+3*level:3+2*level);
    let exercise = concepts[lesson].question(n);
    if (lesson === "proportion" && i % 3 === 1)
      exercise = [`${n} lots identiques coûtent ${4*n} €. Quel est le prix d’un lot ?`,4,`On divise le prix total par le nombre de lots : ${4*n} ÷ ${n} = 4 €.`];
    if (lesson === "proportion" && i % 3 === 2)
      exercise = [`Avec ${4*n} €, combien de lots à 4 € peut-on acheter ?`,n,`On cherche le nombre de lots : ${4*n} ÷ 4 = ${n}.`];
    if (lesson === "relatifs" && i % 3 === 1)
      exercise = [`Quel est le plus petit des deux nombres : −${n+2} ou −${n} ?`,-n-2,`−${n+2} se trouve plus à gauche sur la droite graduée.`];
    if (lesson === "relatifs" && i % 3 === 2)
      exercise = [`La sonde part de −${n} m et remonte de ${n+3} m. À quelle altitude arrive-t-elle ?`,3,`−${n} + ${n+3} = 3 m.`];
    const [prompt,answer,explain] = exercise;
    return {prompt,answer,explain};
  }
  if (lesson === "division") {
    const d = 4 + random(i+1) % (5+level*3);
    const q = 3 + random(i+9) % (6+level*4);
    const r = i === 4 ? 0 : 1 + random(i+20) % (d-1);
    const n = d*q+r;
    const kind = i % 3;
    return {prompt:[
      `Combien de groupes complets de ${d} peut-on former avec ${n} personnes ?`,
      `On partage ${n} jetons en groupes de ${d}. Quel est le reste ?`,
      `Il faut transporter ${n} personnes. Une navette a ${d} places. Combien de navettes faut-il au minimum ?`,
    ][kind], answer:[q,r,q+Number(r>0)][kind], explain:`${n} = ${d} × ${q} + ${r}. ${kind===2 ? (r ? "Il faut une navette supplémentaire pour les passagers restants." : "Toutes les navettes sont pleines.") : `Le quotient est ${q} et le reste est ${r}.`}`};
  }
  const a = 2 + random(i+2) % (4+level*3);
  const b = (random(i+11) % 8) * (level===2 && i%2 ? -1 : 1);
  const x = (2 + random(i+19) % 7) * (level>0 && i%2 ? -1 : 1);
  const op = b < 0 ? "−" : "+";
  if (i===4) return {prompt:`Dans ${a}x + 2x ${op} ${Math.abs(b)}, quel est le coefficient de x après réduction ?`,answer:a+2,explain:`On additionne les coefficients de x. ${a}x + 2x = ${a+2}x.`};
  return {prompt:`Calcule ${a}x ${op} ${Math.abs(b)} pour x = ${x}.`,answer:a*x+b,explain:`${a} × (${x}) ${op} ${Math.abs(b)} = ${a*x+b}.`};
}

export const games = {
  division:[
    {goal:23,a:8,b:5,max:3},
    {goal:34,a:9,b:6,max:4},
    {goal:47,a:12,b:7,max:5},
  ],
  algebre:[
    {a:3,b:2,values:[1,3,5]},
    {a:4,b:1,values:[2,4,7]},
    {a:2,b:-3,values:[-2,0,4]},
  ],
};

export const concepts = {
  fractions: {
    grade:"6e", title:"Fractions et partage", mission:"La réserve des navigateurs", icon:"½", tag:"Nombres et calculs",
    intro:"Partage une réserve en parts égales et lis la fraction prélevée.",
    summary:"Dans 3/8, le dénominateur indique les 8 parts égales de l’unité. Le numérateur indique les 3 parts que l’on prend.",
    help:"Compte les parts prises au numérateur et toutes les parts de l’unité au dénominateur.",
    control:"Parts prises", initial:3, min:0, max:8, label:"parts prises sur 8",
    model:n=>n, equation:n=>`${n}/8 de la réserve · ${8-n} parts disponibles`,
    question:n=>[`Une réserve est partagée en 8 parts égales. On prend ${n} parts. Quel est le numérateur de la fraction prise ?`,n,`On prend ${n} des 8 parts, soit ${n}/8.`],
    missionText:n=>`Prépare ${n}/8 de la réserve pour l’expédition. Sélectionne le bon nombre de parts.`,
    targets:[2,5,7], related:"division", relation:"Une fraction et une division permettent toutes les deux de décrire un partage.",
  },
  proportion: {
    grade:"5e", title:"Proportionnalité", mission:"Le marché de l’archipel", icon:"×", tag:"Nombres et calculs",
    intro:"Ajuste des quantités en gardant le même prix par lot.",
    summary:"Dans une situation de proportionnalité, on multiplie toujours par le même nombre pour passer d’une grandeur à l’autre.",
    help:"Un lot coûte 4 €. Pour n lots, multiplie n par 4.",
    control:"Nombre de lots", initial:3, min:0, max:12, label:"prix en euros",
    model:n=>4*n, equation:n=>`${n} lots × 4 € = ${4*n} €`,
    question:n=>[`Un lot coûte 4 €. Combien coûtent ${n} lots, en euros ?`,4*n,`Le prix total est ${n} × 4 = ${4*n} €.`],
    missionText:n=>`Le client a exactement ${4*n} €. Chaque lot coûte 4 €. Prépare sa commande en utilisant tout son budget.`,
    targets:[3,7,11], related:"pourcentages", relation:"Un pourcentage s’applique comme un coefficient de proportionnalité.",
  },
  relatifs: {
    grade:"5e", title:"Nombres relatifs", mission:"La balise des profondeurs", icon:"±", tag:"Nombres et calculs",
    intro:"Déplace une sonde et repère sa position par rapport à la surface.",
    summary:"Le signe situe le nombre par rapport à zéro. Pour calculer un déplacement, on ajoute un nombre positif quand on monte et un nombre négatif quand on descend.",
    help:"La surface est à 0. Une descente de 4 correspond au déplacement −4.",
    control:"Déplacement de la sonde", initial:-4, min:-12, max:8, label:"altitude en mètres",
    model:n=>3+n, equation:n=>`Altitude : 3 + (${n}) = ${3+n} m`,
    question:n=>[`La sonde part de +3 m. Elle descend de ${n} m. Quelle est sa nouvelle altitude ?`,3-n,`Descendre de ${n} m revient à ajouter −${n} : 3 − ${n} = ${3-n}.`],
    missionText:n=>`Place la sonde à ${3+n} m. Elle part de +3 m. Choisis son déplacement.`,
    targets:[-5,2,-9], related:"algebre", relation:"Les nombres négatifs peuvent remplacer x dans une expression littérale.",
  },
  pythagore: {
    grade:"4e", title:"Théorème de Pythagore", mission:"La passerelle du phare", icon:"△", tag:"Géométrie",
    intro:"Relie les carrés construits sur les côtés d’un triangle rectangle.",
    summary:"Dans un triangle rectangle, le carré de la longueur de l’hypoténuse est égal à la somme des carrés des longueurs des deux côtés de l’angle droit.",
    help:"Pour des côtés de l’angle droit 3k et 4k, l’hypoténuse vaut 5k car 9k² + 16k² = 25k².",
    control:"Échelle du triangle", initial:1, min:1, max:8, label:"hypoténuse en mètres",
    model:n=>5*n, equation:n=>`${3*n}² + ${4*n}² = ${25*n*n} = ${5*n}²`,
    question:n=>[`Dans un triangle rectangle, les côtés de l’angle droit mesurent ${3*n} m et ${4*n} m. Quelle est la longueur de l’hypoténuse ?`,5*n,`${3*n}² + ${4*n}² = ${25*n*n}. Sa racine carrée vaut ${5*n}.`],
    missionText:n=>`La passerelle est l’hypoténuse et doit mesurer ${5*n} m. Agrandis le triangle de côtés 3, 4 et 5 à la bonne échelle.`,
    targets:[2,3,6], related:"proportion", relation:"Agrandir un triangle multiplie toutes ses longueurs par le même coefficient.",
  },
  pourcentages: {
    grade:"3e", title:"Pourcentages et évolutions", mission:"Le comptoir des remises", icon:"%", tag:"Nombres et calculs",
    intro:"Observe comment une remise change un prix de départ.",
    summary:"Pour diminuer une valeur de 20 %, on garde 80 % de cette valeur. Le coefficient multiplicateur est 0,80.",
    help:"Divise le prix par 5 pour obtenir 20 %, puis soustrais la remise du prix initial.",
    control:"Prix initial en dizaines d’euros", initial:5, min:1, max:12, label:"prix remisé en euros",
    model:n=>8*n, equation:n=>`${10*n} € − ${2*n} € = ${8*n} € après 20 % de remise`,
    question:n=>[`Un article à ${10*n} € bénéficie d’une remise de 20 %. Quel est son nouveau prix ?`,8*n,`20 % de ${10*n} € représentent ${2*n} €. On paie donc ${8*n} €.`],
    missionText:n=>`Après 20 % de remise, l’article doit coûter ${8*n} €. Règle son prix initial.`,
    targets:[4,8,11], related:"proportion", relation:"Pour calculer 20 % d’un prix, on multiplie ce prix par 20/100.",
  },
  fonctions: {
    grade:"3e", title:"Fonctions affines", mission:"Le pilote automatique", icon:"ƒ", tag:"Fonctions",
    intro:"Relie une valeur d’entrée à son image, puis retrouve l’entrée.",
    summary:"Une fonction affine est de la forme f(x) = ax + b. L’image se calcule en remplaçant x. Un antécédent est une valeur d’entrée qui produit l’image demandée.",
    help:"Pour la machine f(x) = 2x + 3, multiplie d’abord l’entrée par 2, puis ajoute 3.",
    control:"Entrée x", initial:2, min:-8, max:12, label:"image f(x)",
    model:n=>2*n+3, equation:n=>`f(${n}) = 2 × (${n}) + 3 = ${2*n+3}`,
    question:n=>[`Soit f(x) = 2x + 3. Quelle est l’image de ${n} ?`,2*n+3,`On remplace x par ${n}. On obtient 2 × ${n} + 3 = ${2*n+3}.`],
    missionText:n=>`Le pilote doit produire ${2*n+3}. Trouve l’entrée de la machine f(x) = 2x + 3.`,
    targets:[-2,4,7], related:"algebre", relation:"Pour calculer une image, on évalue une expression littérale.",
  },
};
Object.assign(concepts,curriculum);
Object.assign(lessons, concepts);
export const connections = {
  division:["fractions","Une fraction prolonge l’idée de partage quand la division ne tombe pas juste."],
  algebre:["relatifs","Remplacer x par un nombre négatif mobilise les règles de calcul avec les relatifs."],
};
for(const [key,concept] of Object.entries(concepts)) connections[key]=[concept.related,concept.relation];


const domainLabels = {
  calcul:"Nombres et calculs", algebre:"Algèbre", geometrie:"Espace et géométrie",
  mesure:"Grandeurs et mesures", donnees:"Données et probabilités",
  proportion:"Proportionnalité et fonctions", code:"Pensée informatique",
};
const originalDomains = {
  division:"calcul", fractions:"calcul", relatifs:"calcul", proportion:"proportion",
  algebre:"algebre", pythagore:"geometrie", pourcentages:"proportion", fonctions:"proportion",
};
export function lessonGroups(grade){
  return Object.entries(domainLabels).flatMap(([domain,label])=>{
    const keys=Object.keys(lessons).filter(key=>lessons[key].grade===grade&&(originalDomains[key]||lessons[key].domain)===domain);
    return keys.length?[[label,keys]]:[];
  });
}
