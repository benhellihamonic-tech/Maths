import {displayNumber} from "./curriculum.js";

function squares(a,b) {
  const area=a*a+b*b, c=Math.sqrt(area);
  // Le carré de l’hypoténuse est construit vers l’extérieur du triangle.
  const polygons=[
    {points:[[0,0],[0,a],[-a,a],[-a,0]],fill:"#bceafa",value:a*a},
    {points:[[0,0],[b,0],[b,-b],[0,-b]],fill:"#f9e5ac",value:b*b},
    {points:[[0,a],[b,0],[b+a,b],[a,a+b]],fill:"#d6e5ff",value:area},
  ];
  const points=polygons.flatMap(p=>p.points);
  const minX=Math.min(...points.map(([x])=>x))-1,maxX=Math.max(...points.map(([x])=>x))+1;
  const minY=Math.min(...points.map(([,y])=>y))-1,maxY=Math.max(...points.map(([,y])=>y))+1;
  const polygon=points=>points.map(([x,y])=>`${x},${-y}`).join(" ");
  return `<figure class="lesson-figure"><svg viewBox="${minX} ${-maxY} ${maxX-minX} ${maxY-minY}" role="img" aria-label="Triangle rectangle et carrés d’aires ${a*a}, ${b*b} et ${area}">
    ${polygons.map(({points,fill,value})=>{
      const x=points.reduce((sum,p)=>sum+p[0],0)/4,y=-points.reduce((sum,p)=>sum+p[1],0)/4;
      return `<polygon points="${polygon(points)}" fill="${fill}" stroke="#2b587e" stroke-width=".12"/>
        <text x="${x}" y="${y+.35}" text-anchor="middle" font-size="1.05">${value}</text>`;
    }).join("")}
    <polygon points="${polygon([[0,0],[0,a],[b,0]])}" fill="white" stroke="#2b587e" stroke-width=".14"/>
    <path d="M0 -.55h.55V0" fill="none" stroke="#2b587e" stroke-width=".12"/>
    </svg><figcaption>Les nombres écrits dans les carrés sont leurs <strong>aires</strong>, en unités carrées.</figcaption></figure>
    <p class="formula">${a}² + ${b}² = ${a*a} + ${b*b} = ${area}</p>
    <p>L’hypoténuse mesure <strong>${Number.isInteger(c)?c:`√${area} ≈ ${displayNumber(Math.round(c*100)/100)}`}</strong> unités.</p>`;
}
function fractionRows(a,b) {
  const row=(parts,taken,tone)=>`<div class="fraction-strips" aria-label="${taken} parts sur ${parts}">${Array.from({length:Math.max(1,Math.ceil(taken/parts))},(_,unit)=>
    `<div class="fraction-strip ${tone}" style="--parts:${parts}">${Array.from({length:parts},(_,i)=>`<span class="${unit*parts+i<taken?"filled":""}"></span>`).join("")}</div>`).join("")}</div>`;
  return `<div class="fraction-model"><p><strong>${a}/4</strong> · chaque quart est découpé en deux huitièmes.</p>${row(4,a,"lagoon")}${row(8,2*a,"lagoon")}
    <p><strong>${b}/8</strong> · cette bande est déjà graduée en huitièmes.</p>${row(8,b,"gold")}
    <p><strong>Le total</strong> · chaque bande complète vaut une unité.</p>${row(8,2*a+b,"total")}
    <p class="formula">${a}/4 + ${b}/8 = ${2*a}/8 + ${b}/8 = ${2*a+b}/8</p></div>`;
}
function affine(a,b,x) {
  const px=n=>45+32*(n+4),py=n=>152-9*n;
  const y=a*x+b;
  const slope=b+a;
  return `<figure class="lesson-figure"><svg viewBox="0 0 326 275" role="img" aria-label="Droite de la fonction et point (${x} ; ${y})">
  ${Array.from({length:9},(_,i)=>i-4).map(n=>`<path d="M${px(n)} 12V260" stroke="var(--chart-grid)"/><text x="${px(n)}" y="271" text-anchor="middle">${n}</text>`).join("")}
  ${Array.from({length:14},(_,i)=>-12+2*i).map(n=>`<path d="M45 ${py(n)}H301" stroke="var(--chart-grid)"/><text x="39" y="${py(n)+4}" text-anchor="end">${n}</text>`).join("")}
  <path d="M45 ${py(0)}H306M${px(0)} 12V260" stroke="var(--ink)" stroke-width="2"/>
  <path d="M${px(-4)} ${py(-4*a+b)}L${px(4)} ${py(4*a+b)}" stroke="var(--chart-blue)" stroke-width="3"/>
  <path d="M${px(x)} ${py(0)}V${py(y)}H${px(0)}" fill="none" stroke="var(--chart-sand)" stroke-width="2" stroke-dasharray="4 3"/>
  <circle cx="${px(0)}" cy="${py(b)}" r="4" fill="var(--chart-blue)"/>
  <circle cx="${px(x)}" cy="${py(y)}" r="5" fill="var(--chart-sand)"/>
  </svg><figcaption>Le point ocre a pour abscisse <strong>${x}</strong> et pour ordonnée <strong>${y}</strong>.</figcaption></figure>
  <p class="formula">f(${x}) = ${a} × (${x}) + ${b} = ${y}</p>
  <p>Sur l’axe vertical, f(0) = ${b}. En avançant de 1, on arrive à f(1) = ${slope}, soit une variation de ${a}.</p>`;
}
function decimals(n) {
  const cx=30+n*4;
  return `<figure class="lesson-figure decimal-figure"><svg viewBox="0 0 460 88" role="img" aria-label="Droite graduée de zéro à un, point à ${displayNumber(n/100)}">
    <path d="M30 48H430" stroke="#155b88" stroke-width="2"/>
    ${Array.from({length:101},(_,i)=>`<path d="M${30+i*4} 48v${i%10===0?12:5}" stroke="#527fa2"/>`).join("")}
    ${Array.from({length:11},(_,i)=>`<text x="${30+i*40}" y="76" text-anchor="middle">${displayNumber(i/10)}</text>`).join("")}
    <circle cx="${cx}" cy="48" r="5" fill="var(--chart-sand)"/><text x="${cx}" y="35" text-anchor="middle" font-weight="bold">${displayNumber(n/100)}</text>
    </svg><figcaption>Entre deux dixièmes, il y a dix intervalles d’un centième.</figcaption></figure>
    <p class="formula">${n}/100 = ${displayNumber(n/100)}</p>
    <p>${n<100?`${Math.floor(n/10)} dixième(s) et ${n%10} centième(s).`:"Cent centièmes forment une unité."}</p>`;
}
const affineLesson={
  title:"De la formule à la droite",
  question:"Avant de changer b, prédis si la droite va se déplacer ou changer d’inclinaison. Ensuite garde b fixe et change a.",
  controls:[["a","Coefficient a",2,0,3],["b","Terme constant b",3,0,3],["x","Entrée x",2,-4,4]],
  draw:affine,
  recap:"Dans f(x) = ax + b, b est la valeur de f(0). Lorsque x augmente de 1, f(x) varie de a. Pour lire une image, pars de l’abscisse. Pour chercher un antécédent, pars de l’ordonnée.",
};
export const explorations = {
  pythagore:{
    title:"Ce que les trois carrés ont en commun",
    question:"Commence avec des côtés de 3 et 4 unités. Compare les trois aires. Ensuite change un seul côté. La même relation reste-t-elle vraie ?",
    controls:[["a","Premier côté de l’angle droit",3,2,9],["b","Second côté de l’angle droit",4,2,9]],
    draw:squares,
    recap:"Dans un triangle rectangle, l’aire du carré construit sur l’hypoténuse est égale à la somme des aires des deux autres carrés. Pour retrouver une longueur à partir de son carré, prends la racine carrée.",
  },
  fractions6:{
    title:"Additionner des parts de même taille",
    question:"Prédis le total de 1/4 et 3/8. Observe les bandes. Puis essaie 3/4 et 4/8 : le résultat dépasse-t-il une unité ?",
    controls:[["a","Nombre de quarts",1,0,4],["b","Nombre de huitièmes",3,0,8]],
    draw:fractionRows,
    recap:"Un quart et un huitième n’ont pas la même taille. Écris d’abord les deux fractions en huitièmes, puis additionne les numérateurs.",
  },
  fonctions:affineLesson,
  affine3:affineLesson,
  decimaux6:{
    title:"Placer les centièmes sur une droite",
    question:"Place 37 centièmes. Entre quels dixièmes se trouve le point ? Puis ajoute trois centièmes et regarde quelle graduation il atteint.",
    controls:[["a","Nombre de centièmes",37,0,100]],
    draw:decimals,
    recap:"Un centième vaut 0,01. Pour lire un décimal, repère la valeur de chaque chiffre et la taille d’un intervalle sur la droite graduée.",
  },
};

export function correctionTone(q, answer) {
  if(answer.correct) return ["bravo","Bravo !",""];
  const value=answer.value;
  const detail=q.diagnostics?.[value];
  if(detail) return [detail[0],detail[0]==="presque"?"Presque !":"Pas encore.",detail[1]];
  if(q.kind==="bars" && Array.isArray(value) && q.answer.some((n,i)=>n===value[i]))
    return ["presque","Presque !","Au moins un bâton est à la bonne hauteur. Vérifie les autres sur la même échelle."];
  if(q.kind==="order" && Array.isArray(value) && q.answer.some((n,i)=>n===value[i]))
    return ["presque","Presque !","Au moins une étape est à la bonne place. Vérifie ce qui doit être fait avant la conclusion."];
  if(q.kind==="point" && typeof value==="string"){
    const coords=value.split(",").map(Number);
    if(q.answer.some((n,i)=>n===coords[i]))
      return ["presque","Presque !","Une des deux coordonnées est juste. Lis l’abscisse horizontalement, puis l’ordonnée verticalement."];
  }
  if(q.kind==="fraction" && q.irreducible && typeof value==="string"){
    const [a,b]=value.split("/").map(Number);
    if(a*q.answer[1]===b*q.answer[0])
      return ["presque","Presque !","Ta fraction représente le bon nombre. Il reste à la simplifier jusqu’à ce qu’elle soit irréductible."];
  }
  return ["reprendre","Pas encore.",""];
}
