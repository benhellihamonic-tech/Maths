// Progressions de classe. Chaque groupe relie la séquence enseignée aux ateliers disponibles.
export const classPlans = {
  "6e":[
    ["Nombres entiers et premières constructions","entiers6 droites6 fractions operations6 cercles6"],
    ["Décimaux et fractions","decimaux6 fractions fractions6 sommedecimale6"],
    ["Périmètres, durées, angles et triangles","disque6 durees6 angles6 triangle6"],
    ["Données, aires et calcul décimal","donnees6 aires6 airesunites6 produitdecimal6"],
    ["Divisions, quotient et proportionnalité","division divdecimal6 quotient6 proportion6 probabilites6"],
    ["Symétrie, médiatrice, pourcentages et espace","symetrie6 bissectrice6 quotient6 pourcentages6 echelles6 solides6 volumes6"],
  ],
  "4e":[
    ["Rappels, relatifs, proportionnalité et Pythagore","aires6 relatifs proportion4 pythagore"],
    ["Relatifs, pourcentages, calcul littéral, vitesse et entiers","relatifs4 remises4 priorites4 algebre grandeurs4 conversions4 premiers4"],
    ["Fractions, réduction, translations, statistiques et volumes","fractions4 algebre translation4 statistiques4 pyramide4"],
    ["Distributivité, réciproque de Pythagore, fractions, probabilités et puissances","developper4 triangles4 fractions4 probabilites4 puissances4"],
    ["Équations, factorisation, graphiques et fin d’année","equations4 developper4 graphique4 rotation4 semblables4 code4"],
  ],
  "3e":[
    ["Pythagore, proportionnalité, notion de fonction et Thalès emboîté","pythagore3 proportion4 fonctions graphique4 thales3"],
    ["Arithmétique, fractions, réciproque de Pythagore et transformations","premiers3 arithmetique3 rationnels3 reciproque3 transformations3"],
    ["Thalès papillon, vitesse, pourcentages d’évolution, fonction linéaire et statistiques","papillon3 grandeurs4 conversions4 pourcentages evolutions3 lineaire3 statistiques3"],
    ["Trigonométrie, puissances, probabilités et réciproque de Thalès","trigo3 puissances3 simulation3 thalesreciproque3"],
    ["Agrandissements, triangles semblables, homothéties et fonctions affines","airesvolumes3 thales3 transformations3 affine3 graphiques3"],
    ["Espace, probabilités à deux épreuves et révisions","sections3 boule3 probabilites3 code3"],
    ["Calcul littéral en parallèle","algebre developper4 equations4 distributivite3 produits3"],
  ],
};

export const beltColors=["Blanche","Jaune","Orange","Verte","Bleue","Marron","Noire"];
export const classBelts={
 "6e":[
  "table2 complet10 table5 div2 table10 plus9",
  "table3 moins9 table4 div5 doubleTriple div10",
  "table11 mul10 mul4 square addInt mul20",
  "table6 scale10 table7 trou mul50half decimalAdd",
  "table8 mul9 table9 decimalFraction parts divSmall",
  "tables regroup fractionOf mixed fracSame percent",
  "distributivity mul25 fracAdd remainder smartMul conversions",
 ],
 "5e":[
  "divisibility2510 doubleTripleQuad divideFour tables timeConvert decimalAdd",
  "divisibility halfThirdQuarter fracSame priority length smartMul",
  "multipleOrDivisor fractionOf scale10 priority2 mass areaPerimeter",
  "shortAlgebra percent signedSum priority3 fracBounds rectangularVolume",
  "reduce fracEqual signedDifference powers calculateProgram fractionToDecimal",
  "substitution angle signedAdd areaVolumeConversion timeConvert2 fracMultiple",
  "checkEquation mean euclideanQR discount primeFactors irreducible",
 ],
 "4e":[
  "tables divisibility scale10 priority length parts",
  "fractionOf fracEqual time powers mass areaPerimeter",
  "angle fracCompare speed signedAdd substitution percent",
  "signedMul fracProduct expand power10 areaVolumeConversion signedPower",
  "fractionOfFraction solids priority2 reduce timeConvert scientific",
  "stats fracAdd discount enlargement rightTriangle checkEquation",
  "irreducible primeFactors pythagoras factor equation scale",
 ],
 "3e":[
  "tables divisibility substitution fractionOf conversions areaPerimeter",
  "signedAdd powers reduce fracCompare time angle",
  "signedMul priority2 expand percent areaVolumeConversion pythagoras",
  "power10 checkEquation equation fracEqual speed solids",
  "scientific primeFactors roots fracProduct timeConvert rightTriangle",
  "images squareEquation factor fracAdd discount thales",
  "coefficients zeroProduct identity irreducible scale parallel",
 ],
};

export const weeklyAutomatisms=[
 ["AUT01","Tables de multiplication","tables"],
 ["AUT02","Compléter à 10, 100, 1 000 ou 10 000","complements"],
 ["AUT03","Doubles et moitiés","doubleHalf"],
 ["AUT04","Ajouter ou retrancher un nombre qui finit par 8 ou 9","plus89 moins89"],
 ["AUT05","Quadruples et quarts","quarter"],
 ["AUT06","Multiplier ou diviser par 5","mulDiv5"],
 ["Numération","Lire les rangs et décomposer un entier","placeValue"],
];

export const classAutomatisms={
 "6e":weeklyAutomatisms,
 "4e":[
  ["Cycle 1","Priorités, aires, périmètres et premiers relatifs","priority areaPerimeter signedSum"],
  ["Cycle 2","Proportionnalité et égalité de Pythagore","proportional pythagoras"],
  ["Cycle 3","Signe d’un produit ou d’un quotient","signedMul"],
  ["Cycle 4","Substitution et calcul d’une expression","substitution"],
  ["Cycle 5","Produit et simplification de fractions","fracTimes irreducible"],
  ["Cycle 6","Moyenne, médiane et étendue","mean median range"],
  ["Cycle 7","Développement et réduction","expand reduce"],
  ["Cycle 8","Probabilités simples","probability"],
  ["Cycle 9","Tester et résoudre une équation","checkEquation equation"],
  ["Cycle 10","Priorités et calculs fractionnaires","priority3 fracAdd"],
  ["Cycle 11","Triangles semblables et synthèse","similar tables proportional substitution"],
 ],
 "3e":[
  ["3.04","Pythagore, ratios, fonctions et réduction","pythagoras ratioShare images reduce"],
  ["3.06","Fractions, ratios, fonctions, calcul littéral et Thalès","fracAdd ratioShare images expand thales"],
  ["3.08","Nombres premiers, calcul littéral, Thalès, fonctions et vitesse","primeFactors substitution thales images speed"],
  ["3.02","Calcul littéral, proportionnalité, vitesse, divisibilité et triangle rectangle","reduce proportional speed divisibility rightTriangle"],
  ["3.11","Ratios, fonctions, Pythagore, équations et double distributivité","ratioShare images rightTriangle equation doubleExpand"],
  ["3.16","Factorisation, proportionnalité, puissances, transformations et ratios","factor proportional signedPower centralSymmetry ratioShare"],
  ["3.07","Pourcentages, calcul littéral, fonctions et réciproque de Pythagore","percent reduce images rightTriangle"],
  ["3.22","Arithmétique, fonction linéaire, vitesse, statistiques et transformations","divisibility linearImage speed stats centralSymmetry"],
  ["3.14","Calcul littéral, statistiques, fonction linéaire, Thalès et vitesse","substitution stats linearImage thales speed"],
  ["3.12","Factorisation, équations, ratios, vitesse, statistiques, puissances et transformations","factor equation ratioShare speed stats powers centralSymmetry"],
  ["3.23","Calcul littéral, ratios, relatifs, divisibilité et réciproque de Thalès","reduce ratioShare signedAdd divisibility parallel"],
  ["3.24","Équations, double distributivité, probabilités, durées et trigonométrie","equation doubleExpand probability timeConvert trigRatio"],
  ["3.18","Factorisation, agrandissements, ratios, puissances, statistiques, conversions et Thalès","factor enlargement ratioShare powers stats conversions thales"],
  ["3.28","Fonctions affines, puissances, vitesse, statistiques, volumes, proportionnalité et réciproque de Thalès","images scientific speed stats rectangularVolume proportional parallel"],
  ["3.32","Bilan de révision : calcul, fonctions, géométrie et données","fracAdd signedPower equation images thales pythagoras mean probability"],
 ],
};

const additiveProblem=(prompt,left,right,find,unit)=>{
 const total=left+right;
 const missing=find==="part";
 return {prompt,solution:missing?`${total} − ${left} = ${right} ${unit}.`:`${left} + ${right} = ${total} ${unit}.`,
  method:missing?"Repère le tout et la partie connue. Quelle opération permet de trouver la partie manquante ?":"Repère les deux parties. Elles composent le tout.",
  bars:{total:missing?String(total):"Tout : ?",segments:[{label:String(left),weight:left},{label:missing?"?":String(right),weight:right}]}};
};

const fractionProblem=(prompt,parts,knownParts,part,find,unit)=>{
 const whole=parts*part, group=knownParts*part;
 const findWhole=find==="whole";
 return {prompt,solution:findWhole?`${group} ÷ ${knownParts} = ${part}, puis ${part} × ${parts} = ${whole} ${unit}.`:`${whole} ÷ ${parts} = ${part}, puis ${part} × ${knownParts} = ${group} ${unit}.`,
  method:findWhole?"Les parts ont la même valeur. Calcule la valeur d’une part du groupe connu avant de retrouver le tout.":"Partage le tout en parts égales. Cherche la valeur du groupe indiqué.",
  bars:{total:findWhole?"Tout : ?":String(whole),segments:Array.from({length:parts},()=>({label:"",weight:1})),group:{count:knownParts,label:findWhole?String(group):"Partie cherchée : ?"}}};
};

const additiveWhole=[
 additiveProblem("Deux boîtes contiennent 36 et 27 cartes. Combien y a-t-il de cartes en tout ?",36,27,"whole","cartes"),
 additiveProblem("Le port compte 126 places au nord et 89 au sud. Combien de places compte-t-il au total ?",126,89,"whole","places"),
 additiveProblem("Un groupe a lu 147 pages le matin et 58 l’après-midi. Combien de pages a-t-il lues ?",147,58,"whole","pages"),
];
const additivePart=[
 additiveProblem("Un club compte 84 inscrits. Parmi eux, 37 viennent le samedi. Combien ne viennent pas le samedi ?",37,47,"part","inscrits"),
 additiveProblem("Une boîte contient 150 cartes, dont 64 cartes bleues. Combien ne sont pas bleues ?",64,86,"part","cartes"),
 additiveProblem("Un trajet mesure 235 km. L’équipage a parcouru 128 km. Combien reste-t-il à parcourir ?",128,107,"part","km"),
];
const fractionPart=[
 fractionProblem("Sur 48 places, les trois quarts sont occupés. Combien de places sont occupées ?",4,3,12,"part","places"),
 fractionProblem("Sur 45 cartes, les deux cinquièmes sont rouges. Combien de cartes sont rouges ?",5,2,9,"part","cartes"),
 fractionProblem("Un musée possède 72 affiches. Il expose les cinq sixièmes de ses affiches. Combien en expose-t-il ?",6,5,12,"part","affiches"),
];
const fractionWhole=[
 fractionProblem("Les trois cinquièmes d’une collection représentent 24 coquillages. Combien de coquillages compte la collection ?",5,3,8,"whole","coquillages"),
 fractionProblem("Les deux septièmes d’un parcours représentent 18 km. Quelle est la longueur du parcours ?",7,2,9,"whole","km"),
 fractionProblem("Les quatre neuvièmes d’une caisse représentent 28 livres. Combien y a-t-il de livres dans la caisse ?",9,4,7,"whole","livres"),
];

export const weeklyProblems=[
 {title:"Recherche du tout",problems:additiveWhole},
 {title:"Recherche d’une partie",problems:additivePart},
 {title:"Calculer une fraction d’une quantité",problems:fractionPart},
 {title:"Retrouver le tout à partir d’une fraction",problems:fractionWhole},
 {title:"Bilan des problèmes additifs",problems:[
  additiveProblem("Deux équipes ont planté 108 et 95 arbres. Combien ont-elles planté d’arbres ensemble ?",108,95,"whole","arbres"),
  additiveProblem("Un club commande 240 maillots. 156 sont déjà livrés. Combien reste-t-il à livrer ?",156,84,"part","maillots"),
 ]},
 {title:"Bilan des problèmes de fractions",problems:[
  fractionProblem("Sur 88 élèves, les trois huitièmes viennent à vélo. Combien viennent à vélo ?",8,3,11,"part","élèves"),
  fractionProblem("Les deux tiers d’un stock représentent 54 boîtes. Combien le stock contient-il de boîtes ?",3,2,27,"whole","boîtes"),
 ]},
];

const races={
 "cm2":"tables complet10 parts addInt scale10 decimalAdd length mass priority timeConvert areaPerimeter fractionOf trou mul4 div2 remainder conversions",
 "6e":"tables decimalAdd scale10 fractionOf mixed fracSame angle length time areaPerimeter percent remainder divSmall conversions decimalFraction distributivity",
 "5e":"tables timeConvert decimalAdd length scale10 fractionOf trou priority percent fracEqual angle signedAdd stats solids irreducible speed",
 "4e":"tables scale10 priority2 signedAdd signedMul fracProduct fracAdd stats probability power10 areaVolumeConversion rightTriangle substitution percent solids equation",
 "3e":"signedMul fracAdd scientific percent discount coefficients roots pythagoras thales substitution images reduce factor equation probability stats",
};
// Une lecture graphique dans chaque nouvelle série, sans modifier les séries déjà enregistrées.
const lineReplacedSkills={cm2:"complet10","6e":"divSmall","5e":"trou","4e":"power10","3e":"discount"};
function canNumberLine(level,n,m,i){
 const scale=level==="cm2"?1:10;
 const step=(level==="cm2"?[2,5,10]:[1,2,5,10])[i%(level==="cm2"?3:4)];
 const start=level==="cm2"?n*step:level==="6e"?n*10+m:-n*step;
 const point=[2,5,6,7][m%4];
 const labels=[[1,fm((start+step)/scale)],[3,fm((start+3*step)/scale)]];
 const answer=(start+point*step)/scale;
 return {prompt:"Lis l’abscisse du point A.",answer,skill:"Lire une droite graduée",
  figure:{kind:"numberLine",labels,point},
  explain:`Il y a deux intervalles entre les graduations ${labels[0][1]} et ${labels[1][1]}. Un intervalle vaut ${fm(step/scale)}. Le point A est à ${point-1} intervalle(s) à droite de ${labels[0][1]}, donc son abscisse vaut ${fm(answer)}.`};
}
const courseNames={cm2:"Fin de CM2","6e":"Fin de 6e","5e":"Fin de 5e","4e":"Fin de 4e","3e":"Fin de 3e"};
export const officialCAN="https://codimd.apps.education.fr/s/7G91CuKJR";
export const officialCANArchives="https://codimd.apps.education.fr/s/QNNYn5gTJ";
export function classRaces(grade,date=new Date()){
 const byGrade={"6e":["cm2","6e"],"5e":["6e","5e"],"4e":["5e","4e"],"3e":["4e","3e"]};
 const levels=byGrade[grade]||[];
 const paris=new Intl.DateTimeFormat("sv-SE",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit"}).format(date);
 const featured=paris<"2027-03-08"?levels[0]:levels[1];
 return levels.map(level=>({level,name:courseNames[level],featured:level===featured}));
}

const skillBank={};
const fm=n=>String(Math.round(n*1e8)/1e8).replace(".",",");
const ratio=(a,b)=>`${a}/${b}`;
function skill(key,label,build){skillBank[key]={label,build};}
function table(k){return (n,m)=>[`${k} × ${m}`,k*m,`Additionne ${m} fois ${k} ou utilise la table de ${k}.`];}
for(const k of [2,3,4,5,6,7,8,9,10,11]) skill("table"+k,"Table de "+k,table(k));
skill("tables","Tables de multiplication",(n,m)=>table(n%9+2)(n,m));
skill("complet10","Complément à 10",n=>[`${n%9+1} + … = 10`,9-n%9,"Soustrais le premier terme de 10."]);
skill("complements","Compléments à 10, 100, 1 000 et 10 000",(n,m,i)=>{
 const target=[10,100,1000,10000][i%4];
 const start=1+((n*791+m*337)%(target-1));
 return [`${start} + … = ${target}`,target-start,`Le complément vaut ${target} − ${start}.`];
});
for(const [k,d] of [["div2",2],["div5",5],["div10",10],["divisibility",0]])skill(k,d?"Divisibilité par "+d:"Critères de divisibilité",(n,m,i)=>{
 const v=d||[2,3,5,9,10][i%5], x=v*n+(i%2);
 return [`${x} est-il divisible par ${v} ?`,x%v===0?"Oui":"Non",`La division de ${x} par ${v} donne un reste de ${x%v}.`,["Oui","Non"]];
});
for(const [key,sign,last] of [["plus9",1,9],["moins9",-1,9],["plus89",1,8],["moins89",-1,8]])skill(key,sign===1?"Ajouter en compensant":"Soustraire en compensant",(n,m,i)=>{
 const a=100+3*n, z=10*m+(i%2?9:last);
 return [`${a} ${sign===1?"+":"−"} ${z}`,a+sign*z,`Remplace ${z} par ${10*(m+1)} − ${10-z%10}, puis compense.`];
});
skill("doubleTriple","Doubles et triples",(n,m,i)=>[`${i%2?"Triple":"Double"} de ${n}`,n*(i%2?3:2),"Multiplier par 2 donne le double, par 3 le triple."]);
skill("doubleHalf","Doubles et moitiés",(n,m,i)=>[i%2?`Moitié de ${2*n}`:`Double de ${n}`,i%2?n:2*n,"Le double et la moitié sont des opérations inverses."]);
skill("quarter","Quadruples et quarts",(n,m,i)=>[i%2?`Quart de ${4*n}`:`Quadruple de ${n}`,i%2?n:4*n,"Multiplie ou divise par 4 selon la consigne."]);
skill("mulDiv5","Multiplier ou diviser par 5",(n,m,i)=>[i%2?`${5*n} ÷ 5`:`${n} × 5`,i%2?n:5*n,"Pour multiplier par 5, on peut multiplier par 10 puis prendre la moitié."]);
skill("parts","Doubles, triples, quadruples, moitiés, tiers et quarts",(n,m,i)=>{
 const d=2+i%3, names=["double","triple","quadruple","moitié","tiers","quart"], k=i%6;
 return [`Donne ${k===3?"la":"le"} ${names[k]} de ${k<3?n:n*d}.`,k<3?n*d:n,"Multiplie pour un multiple et divise pour une part."];
});
for(const [key,k,label] of [["mul4",4,"Multiplier par 4"],["mul20",20,"Multiplier par 20"],["mul50half",50,"Multiplier par 50 ou 0,5"],["mul9",9,"Multiplier par 9 ou 99"],["mul25",25,"Multiplier par 25, 1,5 ou 2,5"],["divSmall",.1,"Multiplier par 0,1, 0,01 ou 0,001"]])
 skill(key,label,(n,m,i)=>{
 const vals={mul50half:[50,.5],mul9:[9,99],mul25:[25,1.5,2.5],divSmall:[.1,.01,.001]}[key]||[k];
 const factor=vals[i%vals.length];
 return [`${n} × ${fm(factor)}`,n*factor,`Décompose ${fm(factor)} ou utilise une multiplication connue. Résultat : ${fm(n*factor)}.`];
});
skill("square","Carrés de 1 à 10",n=>[`${n%10+1}²`,(n%10+1)**2,"Un carré est le produit d’un nombre par lui-même."]);
skill("mul10","Multiplier un entier par 10, 100 ou 1 000",(n,m,i)=>[`${n} × ${10**(i%3+1)}`,n*10**(i%3+1),"Chaque chiffre change de rang d’une, deux ou trois positions."]);
skill("scale10","Multiplier ou diviser par 10, 100 ou 1 000",(n,m,i)=>{
 const k=10**(i%3+1);
 return [i%2?`${n} ÷ ${k}`:`${fm(n/10)} × ${k}`,i%2?n/k:n*k/10,"Repère le changement de valeur de chaque chiffre."];
});
skill("addInt","Additionner des entiers",(n,m)=>[`${30+n} + ${40+m}`,70+n+m,"Additionne séparément les dizaines et les unités."]);
skill("trou","Compléter une égalité",(n,m)=>[`${n} + … = ${n+m}`,m,`Calcule ${n+m} − ${n}.`]);
skill("decimalAdd","Ajouter et soustraire des décimaux",(n,m,i)=>[`${fm(n/10)} ${i%2?"−":"+"} ${fm(m/100)}`,(10*n+(i%2?-m:m))/100,"Aligne mentalement les dixièmes et les centièmes."]);
skill("decimalFraction","Écriture en fraction décimale",n=>[`Écris ${fm(n/100)} avec 100 comme dénominateur.`,ratio(n,100),`Il y a ${n} centièmes.`,null,"same-denominator"]);
skill("regroup","Additionner en regroupant",(n,m)=>[`${100-m} + ${n} + ${m}`,100+n,"Regroupe les premier et dernier termes pour obtenir 100."]);
skill("fractionOf","Fraction d’une quantité",(n,m,i)=>{
 const d=[3,4,5][i%3], a=d-1;
 return [`Calcule ${a}/${d} de ${d*m}.`,a*m,`Une part vaut ${m}, puis multiplie par ${a}.`];
});
skill("mixed","Décomposer une fraction",(n,m)=>[`Écris ${5*n+2}/5 sous la forme d’un entier plus une fraction.`,`${n} + 2/5`,`La division par 5 donne un quotient de ${n} et un reste de 2.`,[`${n} + 2/5`,`${n} + 3/5`,`${n+1} + 2/5`]]);
skill("fracSame","Additionner ou soustraire des fractions de même dénominateur",(n,m,i)=>{
 const sign=i%2?-1:1,a=n%8+2,b=n%3+1;
 return [`${a}/9 ${sign===1?"+":"−"} ${b}/9. Donne une fraction.`,ratio(a+sign*b,9),"Conserve le dénominateur et calcule avec les numérateurs."];
});
skill("fracAdd","Additionner ou soustraire des fractions de dénominateurs différents",(n,m,i)=>{
 const a=n%7+2,b=m%4+1,sign=i%2?-1:1;
 return [`${a}/6 ${sign===1?"+":"−"} ${b}/4. Donne une fraction.`,ratio(2*a+sign*3*b,12),"Passe aux douzièmes avant de calculer."];
});
skill("percent","Pourcentages simples",(n,m,i)=>{
 const p=[50,25,75,10][i%4];
 return [`${p} % de ${20*n}`,n*p/5,`Multiplie ${20*n} par ${p}/100.`];
});
skill("distributivity","Utiliser la distributivité",(n,m)=>[`${m} × ${100+n%7}`,m*(100+n%7),`Multiplie ${m} par 100 puis par ${n%7}, et additionne.`]);
skill("remainder","Reste de la division",(n,m)=>[`Reste de ${7*n+m%7} ÷ 7 ?`,m%7,`Le multiple de 7 immédiatement inférieur ou égal est ${7*n}.`]);
skill("smartMul","Multiplier astucieusement",(n,m)=>[`25 × ${4*n}`,100*n,"Regroupe 25 et 4 pour obtenir 100."]);
for(const [key,label] of [["length","Conversions de longueurs"],["mass","Conversions de masses"],["conversions","Conversions de grandeurs"]])skill(key,label,(n,m,i)=>{
 const set=key==="length"?["m","cm",100]:key==="mass"?["kg","g",1000]:[["m","cm",100],["kg","g",1000],["L","cL",100]][i%3];
 return [`${fm(n/10)} ${set[0]} = … ${set[1]}`,n*set[2]/10,`1 ${set[0]} = ${set[2]} ${set[1]}.`];
});
skill("priority","Priorités opératoires",(n,m)=>[`${n} + 3 × ${m}`,n+3*m,"Calcule la multiplication avant l’addition."]);
skill("priority2","Enchaîner plusieurs opérations",(n,m)=>[`${n} − 2 × (${m} − 3)`,n-2*(m-3),"Calcule la parenthèse, puis le produit, puis la soustraction."]);
skill("fracEqual","Compléter une égalité de fractions",(n,m)=>[`${n%5+1}/6 = …/${6*m}`,(n%5+1)*m,`Le dénominateur a été multiplié par ${m}. Fais de même avec le numérateur.`]);
skill("fracCompare","Reconnaître des fractions égales",(n,m,i)=>{
 const a=n%5+1,b=6, c=a*m+i%2;
 return [`${a}/${b} et ${c}/${b*m} sont-elles égales ?`,i%2?"Non":"Oui",`${a}/${b} = ${a*m}/${b*m}.`,["Oui","Non"]];
});
skill("time","Calculs avec les durées",(n,m)=>[`Il est 8 h 45. Combien de minutes se seront écoulées à 9 h ${String(n).padStart(2,"0")} ?`,15+n,"Compte d’abord 15 minutes jusqu’à 9 h."]);
skill("timeConvert","Convertir des durées",(n,m,i)=>i%2?[`${n} h ${m} min = … min`,60*n+m,"Une heure vaut 60 minutes."]:[`Combien de minutes y a-t-il dans 3/4 d’heure ?`,45,"Un quart d’heure vaut 15 minutes."]);
skill("powers","Carrés et cubes",(n,m,i)=>{
 const d=i%2?3:2,a=n%8+1;
 return [`${a}${d===2?"²":"³"}`,a**d,`Multiplie ${a} par lui-même avec ${d} facteurs.`];
});
skill("signedPower","Puissances d’un nombre relatif",(n,m,i)=>{
 const d=i%2?3:2,a=-(n%6+1);
 return [`(${a})${d===2?"²":"³"}`,a**d,d===2?"Deux facteurs négatifs donnent un produit positif.":"Trois facteurs négatifs donnent un produit négatif."];
});
skill("areaPerimeter","Aires et périmètres usuels",(n,m,i)=>[
 `Rectangle de ${n} cm sur ${m} cm. Donne ${i%2?"son périmètre en cm":"son aire en cm²"}.`,i%2?2*(n+m):n*m,i%2?"Additionne les quatre longueurs.":"Multiplie longueur et largeur."
]);
skill("angle","Troisième angle d’un triangle",(n,m)=>[`Deux angles d’un triangle mesurent ${4*n}° et ${5*m}°. Quelle est la mesure du troisième en degrés ?`,180-4*n-5*m,"La somme des trois angles vaut 180°."]);
skill("speed","Vitesse, distance et durée",(n,m,i)=>i%2?
 [`On parcourt ${6*n*m} km à ${6*n} km/h. Combien d’heures dure le trajet ?`,m,"Divise la distance par la vitesse."]:
 [`À ${6*n} km/h pendant ${m} h, quelle distance en km parcourt-on ?`,6*n*m,"Multiplie la vitesse par la durée."]);
skill("signedAdd","Additionner et soustraire des relatifs",(n,m,i)=>[`(${-n}) ${i%2?"−":"+"} (${-m})`,-n+(i%2?m:-m),"Soustraire un nombre revient à ajouter son opposé."]);
skill("signedMul","Multiplier et diviser des relatifs",(n,m,i)=>{
 const divide=i%2===1, b=i%4<2?m:-m, sign=b<0?1:-1;
 const result=divide?sign*n:sign*n*m;
 const operation=divide?"quotient":"produit";
 return [divide?`(−${n*m}) ÷ (${b})`:`(−${n}) × (${b})`,result,
  `Des signes ${sign>0?"identiques":"différents"} donnent un ${operation} ${sign>0?"positif":"négatif"}.`];
});
skill("substitution","Calcul littéral par substitution",(n,m)=>[`Calcule ${m}x − 3 pour x = ${n}.`,m*n-3,"Remplace x par sa valeur, puis calcule."]);
skill("fracProduct","Multiplier ou diviser des fractions",(n,m,i)=>i%2?
 [`${n}/5 ÷ 2/${m}. Donne une fraction.`,ratio(n*m,10),"Diviser par une fraction revient à multiplier par son inverse."]:
 [`${n}/5 × 2/${m}. Donne une fraction.`,ratio(2*n,5*m),"Multiplie les numérateurs entre eux, et les dénominateurs entre eux."]);
skill("expand","Développer par distributivité",(n,m)=>[`Développe ${m}(x + ${n}).`,`${m}x + ${m*n}`,"Multiplie chaque terme de la parenthèse.",[`${m}x + ${n}`,`${m}x + ${m*n}`,`x + ${m*n}`]]);
skill("power10","Multiplier par une puissance de 10",(n,m,i)=>{
 const e=i%5-2;
 return [`${n} × 10^(${e})`,n*10**e,"Un exposant négatif correspond à une division par la puissance positive."];});
skill("areaVolumeConversion","Convertir aires et volumes",(n,m,i)=>[`${n} ${i%2?"dm³ = … cm³":"dm² = … cm²"}`,n*(i%2?1000:100),"Un facteur 10 sur chaque dimension donne 100 pour une aire et 1 000 pour un volume."]);
skill("fractionOfFraction","Fraction d’une fraction",(n,m)=>[`Calcule la moitié de ${n}/${m}. Donne une fraction.`,ratio(n,2*m),"Multiplie la fraction par 1/2."]);
skill("solids","Aires et volumes",(n,m,i)=>i%2?
 [`Un prisme a une aire de base de ${n} cm² et une hauteur de ${m} cm. Donne son volume en cm³.`,n*m,"Multiplie l’aire de la base par la hauteur."]:
 [`Un triangle a une base de ${2*n} cm et une hauteur de ${m} cm. Donne son aire en cm².`,n*m,"Multiplie base et hauteur, puis divise par deux."]);
skill("reduce","Réduire une expression",(n,m)=>[`Réduis ${n}x + ${m}x. Quel est le coefficient de x ?`,n+m,"Additionne les coefficients des termes en x."]);
skill("scientific","Écriture scientifique",(n,m,i)=>{
 const a=n%8+2,e=i%4+2;
 return [`Écris ${a*10**e} en notation scientifique.`,`${a} × 10^${e}`,"Le premier facteur doit être compris entre 1 inclus et 10 exclu.",[`${a*10} × 10^${e-1}`,`${a} × 10^${e}`,`${a} × 10^${e+1}`]];
});
skill("stats","Moyenne et médiane",(n,m,i)=>i%2?
 [`Quelle est la médiane de ${n+8} ; ${n} ; ${n+2} ?`,n+2,"Range les trois nombres et prends celui du milieu."]:
 [`Quelle est la moyenne de ${n} ; ${n+2} ; ${n+7} ?`,n+3,"Additionne les trois valeurs puis divise par 3."]);
skill("discount","Prix après réduction",n=>[`Prix de ${4*n} € réduit de 25 %. Nouveau prix en euros ?`,3*n,"On paie 75 %, soit trois quarts du prix."]);
skill("enlargement","Longueur après agrandissement",(n,m)=>[`Un segment de ${n} cm est agrandi de coefficient ${m}. Longueur image en cm ?`,n*m,"Multiplie la longueur par le coefficient."]);
skill("scale","Coefficient d’agrandissement ou de réduction",(n,m,i)=>i%2?[`Une longueur passe de ${2*n} cm à ${n} cm. Quel est le coefficient ?`,.5,"Divise la longueur image par la longueur de départ."]:[`Une longueur passe de ${n} cm à ${m*n} cm. Quel est le coefficient ?`,m,"Divise la longueur image par la longueur de départ."]);
skill("rightTriangle","Reconnaître un triangle rectangle",(n,m,i)=>{
 const k=1+n%4, h=5*k+i%2;
 return [`Les côtés mesurent ${3*k}, ${4*k} et ${h} cm. Le triangle est-il rectangle ?`,i%2?"Non":"Oui",`${(3*k)**2} + ${(4*k)**2} ${i%2?"≠":"="} ${h*h}. Compare les carrés.`,["Oui","Non"]];
});
skill("checkEquation","Tester une solution",(n,m,i)=>[`x = ${n} vérifie-t-il 2x + 3 = ${2*n+3+i%2} ?`,i%2?"Non":"Oui",`En remplaçant x, le membre de gauche vaut ${2*n+3}.`,["Oui","Non"]]);
skill("equation","Résoudre une équation",(n,m)=>[`Résous ${m}x + 3 = ${m*n+3}.`,n,`Retire 3 des deux côtés puis divise par ${m}.`]);
skill("irreducible","Rendre une fraction irréductible",(n,m)=>[`Rends ${3*m}/${5*m} irréductible.`,"3/5",`Divise les deux termes par ${m}.`,null,true]);
skill("primeFactors","Décomposer en facteurs premiers",(n,m)=>{
 const k=n%4+2, x=3*2**k;
 return [`Quelle est la décomposition en facteurs premiers de ${x} ?`,`2^${k} × 3`,"2 et 3 sont premiers. Vérifie le produit.",[`2^${k} × 3`,`2^${k-1} × 6`,`2^${k+1} × 3`]];
});
skill("pythagoras","Longueur avec Pythagore",n=>{
 const k=1+n%4;
 return [`Les côtés de l’angle droit mesurent ${3*k} et ${4*k} cm. Donne l’hypoténuse en cm.`,5*k,"Additionne les deux carrés puis prends la racine carrée."];
});
skill("factor","Factoriser au maximum",(n,m)=>{
 const d=2+n%5;
 return [`Factorise au maximum ${2*d}x + ${3*d}.`,`${d}(2x + 3)`,`Le facteur commun maximal est ${d}.`,[`${d}(2x + 3)`,`x(${2*d} + ${3*d})`,`${d}(2x + ${3*d})`]];
});
skill("roots","Carrés et racines carrées",(n,m,i)=>i%2?[`${m}²`,m*m,"Multiplie le nombre par lui-même."]:[`√${n*n}`,n,"La racine carrée est le nombre positif dont le carré vaut ce nombre."]);
skill("images","Images et antécédents",(n,m,i)=>i%2?
 [`Quel est l’antécédent de ${2*n+3} pour f(x) = 2x + 3 ?`,n,"Résous 2x + 3 = valeur donnée."]:
 [`Donne l’image de ${n} pour f(x) = 2x + 3.`,2*n+3,"Remplace x par la valeur donnée."]);
skill("squareEquation","Résoudre x² = a",(n,m)=>[`Quelle est la solution négative de x² = ${n*n} ?`,-n,`Les deux solutions sont ${n} et −${n}.`]);
skill("thales","Longueur dans une configuration de Thalès",(n,m)=>[
 `Dans ABC, M ∈ [AB], N ∈ [AC] et (MN) ∥ (BC). AM = ${m}, AB = ${2*m}, AC = ${2*n}. Quelle est AN ?`,n,"Par Thalès, AN/AC = AM/AB = 1/2."
]);
skill("coefficients","Coefficients d’augmentation et de réduction",(n,m,i)=>{
 const p=[10,15,20,25][i%4], plus=i%2;
 return [`Quel est le coefficient multiplicateur d’une ${plus?"hausse":"baisse"} de ${p} % ?`,1+(plus?1:-1)*p/100,`On part de 1 et on ${plus?"ajoute":"soustrait"} ${p}/100.`];
});
skill("zeroProduct","Résoudre une équation-produit",(n,m)=>[`Quelle est la solution positive de (x − ${n})(x + ${m}) = 0 ?`,n,"Un produit nul a au moins un facteur nul."]);
skill("identity","Factoriser une différence de carrés",(n,m)=>[`Factorise x² − ${m*m}.`,`(x − ${m})(x + ${m})`,"Utilise a² − b² = (a − b)(a + b).",[`(x − ${m})²`,`(x − ${m})(x + ${m})`,`(x + ${m})²`]]);
skill("parallel","Réciproque de Thalès et parallélisme",(n,m,i)=>[
 `Dans ABC, M ∈ [AB] et N ∈ [AC]. AM/AB = 1/2 et AN/AC = ${i%2?"1/3":"1/2"}. (MN) et (BC) sont-elles parallèles ?`,i%2?"Non":"Oui",
 i%2?"Des droites parallèles imposeraient des rapports égaux.":"Les points sont alignés dans le même ordre et les rapports sont égaux.",["Oui","Non"]
]);
skill("probability","Probabilité simple",(n,m)=>[`Dans un sac de ${2*m} jetons, la moitié est bleue. Quelle est la probabilité de tirer bleu ? Donne une fraction.`,"1/2","La moitié des issues est favorable."]);


skill("divisibility2510","Critères de divisibilité par 2, 5 et 10",(n,m,i)=>{
 const d=[2,5,10][i%3], value=d*n+(m%2);
 return [`${value} est-il divisible par ${d} ?`,value%d?"Non":"Oui",`Le reste de la division par ${d} vaut ${value%d}.`,["Oui","Non"]];
});
skill("doubleTripleQuad","Doubles, triples et quadruples",(n,m,i)=>{
 const k=2+i%3;
 return [`Quel est le ${["double","triple","quadruple"][k-2]} de ${n} ?`,k*n,`On calcule ${k} × ${n}.`];
});
skill("halfThirdQuarter","Moitiés, tiers et quarts",(n,m,i)=>{
 const k=2+i%3, label=["la moitié","le tiers","le quart"][k-2];
 return [`Calcule ${label} de ${k*n}.`,n,`On partage ${k*n} en ${k} parts égales.`];
});
skill("divideFour","Diviser par quatre",n=>[`${4*n} ÷ 4`,n,"Divise par 2, puis encore par 2."]);
skill("multipleOrDivisor","Multiples et diviseurs",(n,m,i)=>{
 const value=n*m+i%2;
 return [i%4<2?`${n} est-il un diviseur de ${value} ?`:`${value} est-il un multiple de ${n} ?`,
  i%2?"Non":"Oui",`${value} = ${n} × ${m} + ${i%2}. Le reste doit être nul.`,["Oui","Non"]];
});
skill("shortAlgebra","Alléger l’écriture littérale",(n,m)=>[`Écris ${n} × x + 1 × y sans signes ×.`,`${n}x + y`,
 "On omet × devant une lettre et on écrit y pour 1 × y.",[`${n}x + y`,`x + ${n}y`,`${n}xy`]]);
skill("signedSum","Additionner des relatifs",(n,m,i)=>{
 const b=i%2?-m:m;
 return [`(−${n}) + (${b})`,-n+b,b<0?"Les deux termes sont négatifs. Additionne les distances à zéro et garde le signe −.":"Soustrais les distances à zéro. Garde le signe du terme le plus éloigné de zéro, ou obtiens 0 si elles sont égales."];
});
skill("signedDifference","Soustraire des relatifs",(n,m,i)=>{
 const b=i%2?-m:m;
 return [`(−${n}) − (${b})`,-n-b,`Soustraire ${b} revient à ajouter ${-b}.`];
});
skill("priority3","Calculer avec plusieurs priorités",(n,m)=>[`${n} + 4 × (${m} − 2) ÷ 2`,n+2*(m-2),
 "Calcule la parenthèse, puis la multiplication et la division de gauche à droite. Termine par l’addition."]);
skill("fracBounds","Encadrer une fraction par des entiers",(n,m)=>{
 const a=n*m+1;
 return [`Quel est le plus petit des deux entiers consécutifs qui encadrent ${a}/${m} ?`,n,
  `${a}/${m} = ${n} + 1/${m} se trouve entre ${n} et ${n+1}.`];
});
skill("rectangularVolume","Volume d’un cube ou d’un pavé",(n,m,i)=>i%2?
 [`Quel est le volume, en cm³, d’un pavé droit de ${n} cm sur ${m} cm sur 2 cm ?`,2*n*m,"Multiplie les trois dimensions exprimées dans la même unité."]:
 [`Quel est le volume, en cm³, d’un cube d’arête ${n} cm ?`,n**3,"Élève la longueur de l’arête au cube : arête × arête × arête."]);
skill("calculateProgram","Appliquer un programme de calcul",(n,m)=>[
 `Pars de ${n}, ajoute 3 et multiplie le résultat par ${m}. Quel nombre obtiens-tu ?`,(n+3)*m,"Traduis les étapes par une parenthèse avant de multiplier."]);
skill("fractionToDecimal","Écriture décimale d’une fraction",(n,m,i)=>{
 const d=[2,4,5,10][i%4];
 return [`Écris ${n}/${d} sous la forme d’un nombre décimal.`,n/d,`Calcule ${n} ÷ ${d} ou écris une fraction équivalente sur 10 ou sur 100.`];
});
skill("timeConvert2","Convertir des durées avec un reste",(n,m,i)=>i%2?
 [`${60*n+5*m} minutes = ${n} h et combien de minutes ?`,5*m,`Retire ${n} × 60 minutes.`]:
 [`Combien de minutes dans ${n} heures et ${5*m} minutes ?`,60*n+5*m,"Multiplie le nombre d’heures par 60 puis ajoute les minutes."]);
skill("fracMultiple","Fractions de dénominateurs multiples",(n,m,i)=>{
 const d=2+n%4,a=m%5+1,b=n%5+1;
 return [`${a}/${d} ${i%2?"−":"+"} ${b}/${2*d}. Donne une fraction.`,ratio(2*a+(i%2?-b:b),2*d),
  `Écris ${a}/${d} sous la forme ${2*a}/${2*d}, puis calcule avec les numérateurs.`];
});
skill("mean","Moyenne",(n,m)=>[`Quelle est la moyenne de ${n}, ${n+m} et ${n+2*m} ?`,n+m,"Additionne les trois valeurs puis divise par 3."]);
skill("median","Médiane",(n,m)=>[`Quelle est la médiane de ${n+m}, ${n-2}, ${n} et ${n+2*m} ?`,n+m/2,"Range les quatre valeurs. Fais la moyenne des deux valeurs du milieu."]);
skill("range","Étendue",(n,m)=>[`Quelle est l’étendue de ${n+m}, ${n-2} et ${n} ?`,m+2,"Soustrais la plus petite valeur à la plus grande."]);
skill("euclideanQR","Quotient et reste de la division euclidienne",(n,m,i)=>{
 const d=3+i%5,r=1+m%(d-1),number=n*d+r;
 return [`Quel est le ${i%2?"reste":"quotient"} de la division euclidienne de ${number} par ${d} ?`,i%2?r:n,`${number} = ${d} × ${n} + ${r}, avec ${r} < ${d}.`];
});
skill("placeValue","Rangs dans les nombres entiers",(n,m,i)=>{
 const hundreds=2+n%8,number=1000*n+100*hundreds+10*m;
 return [i%2?`Quel est le nombre de centaines complètes dans ${number} ?`:`Quel est le chiffre des centaines de ${number} ?`,
  i%2?10*n+hundreds:hundreds,
  i%2?`La division de ${number} par 100 donne ${10*n+hundreds} centaines complètes et ${10*m} unités restantes.`:`Le chiffre des centaines vaut ${hundreds}.`];
});
skill("proportional","Passage à l’unité et quatrième proportionnelle",(n,m)=>[
 `${n} objets identiques coûtent ${n*m} €. Combien coûtent ${n+2} objets en euros ?`,(n+2)*m,`Un objet coûte ${m} €. Multiplie par ${n+2}.`]);
skill("fracTimes","Produit de fractions",(n,m)=>[
 `Calcule ${n}/5 × 2/${m}. Donne une fraction.`,ratio(2*n,5*m),"Multiplie les numérateurs entre eux et les dénominateurs entre eux."]);
skill("similar","Rapport de côtés homologues",(n,m)=>[
 `Deux triangles semblables sont dans le rapport ${m}. Un côté du petit mesure ${n} cm. Combien mesure son homologue dans le grand, en cm ?`,m*n,"Multiplie la petite longueur par le rapport d’agrandissement."]);
skill("ratioShare","Partage en ratio",(n,m)=>[
 `On partage ${5*n} € entre Ana et Sam dans le ratio 2 : 3. Quelle est la part d’Ana, en euros ?`,2*n,`Une part vaut ${5*n} ÷ 5, puis on en prend deux.`]);
skill("doubleExpand","Double distributivité",(n,m)=>[
 `Quel est le coefficient de x dans le développement de (x + ${n})(x + ${m}) ?`,n+m,
 `Les deux produits qui contiennent x au premier degré sont ${n}x et ${m}x.`]);
skill("centralSymmetry","Symétrie centrale dans un repère",(n,m,i)=>[
 `A(${n} ; −${m}). Quelle est l’${i%2?"ordonnée":"abscisse"} de son symétrique par rapport à l’origine ?`,i%2?m:-n,
 "Le centre de symétrie est le milieu du segment reliant les deux points. Les deux coordonnées changent de signe."]);
skill("linearImage","Calculer l’image par une fonction linéaire",(n,m)=>[
 `Pour f(x) = ${m}x, que vaut f(${n}) ?`,m*n,`On remplace x par ${n} et on multiplie.`]);
skill("trigRatio","Choisir un rapport trigonométrique",(n,m,i)=>{
 const names=["Sinus","Cosinus","Tangente"],j=i%3;
 return [`Dans un triangle rectangle, pour l’angle étudié, quel rapport vaut ${["côté opposé ÷ hypoténuse","côté adjacent ÷ hypoténuse","côté opposé ÷ côté adjacent"][j]} ?`,
  names[j],`Le rapport demandé est : ${["opposé ÷ hypoténuse","adjacent ÷ hypoténuse","opposé ÷ adjacent"][j]}.`,names];
});

const unitless=text=>String(text).trim().replace(/−/g,"-").replace(",",".").replace(/\s+/g,"");
function fractionParts(text){
 const match=/^(-?\d+)\/(-?\d+)$/.exec(text);
 if(!match) return null;
 const a=Number(match[1]),b=Number(match[2]);
 return b&&Math.abs(a)<1e7&&Math.abs(b)<1e7?[a,b]:null;
}
export function trainingCorrect(question,value){
 const raw=unitless(value), expected=question.answer;
 if(!raw) return false;
 if(question.options) return String(value)===String(expected);
 const fraction=fractionParts(unitless(expected));
 if(fraction){
  const answer=fractionParts(raw);
  if(!answer || answer[0]*fraction[1]!==answer[1]*fraction[0]) return false;
  if(question.irreducible==="same-denominator") return answer[1]===fraction[1];
  if(!question.irreducible) return true;
  let [a,b]=answer.map(Math.abs);
  while(b) [a,b]=[b,a%b];
  return a===1&&answer[1]>0;
 }
 return /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(raw)&&Math.abs(Number(raw)-expected)<1e-8;
}
function chapterNumber(value){
 const raw=String(value).trim().replace(/−/g,"-").replace(/,/g,".");
 const integer="[+-]?(?:[0-9]+|[0-9]{1,3}(?:[ \u00a0\u202f][0-9]{3})+)";
 if(raw.length>120) return null;
 const fraction=new RegExp(`^(${integer}) *\\/ *(${integer})$`).exec(raw);
 const digits=n=>n.replace(/[ \u00a0\u202f]/g,"");
 if(fraction){
  const numerator=BigInt(digits(fraction[1])), denominator=BigInt(digits(fraction[2]));
  return denominator>0n?{numerator,denominator,fraction:true}:null;
 }
 if(!new RegExp(`^(?:${integer}(?:\\.[0-9]+)?|[+-]?\\.[0-9]+)$`).test(raw)) return null;
 const [integerPart,decimalPart=""]=digits(raw).split(".");
 const sign=integerPart.startsWith("-")?-1n:1n;
 return {numerator:sign*BigInt((integerPart.replace(/^[+-]/,"")+decimalPart)||"0"),
  denominator:10n**BigInt(decimalPart.length),fraction:false};
}

export function chapterAnswerCorrect(item,value){
 if(item.written) return false;
 const actual=chapterNumber(value), expected=chapterNumber(item.answer);
 if(!actual||!expected||actual.numerator*expected.denominator!==expected.numerator*actual.denominator) return false;
 // Les formats explicites des énoncés hérités restent des critères de réussite.
 const format=item.format||(expected.fraction
  ?/en [a-zéèê]+ièmes?\b|avec \d+ comme dénominateur/i.test(item.prompt)?"denominator"
   :/irréductible/i.test(item.prompt)?"irreducible"
   :/sous (?:la )?forme (?:d’une |de )?fraction|donne une fraction|écris la fraction|probabilité.*sous forme de fraction/i.test(item.prompt)?"fraction":""
  :/écriture (?:décimale|à virgule)|(?:comme|forme d’un) nombre décimal|écris en chiffres/i.test(item.prompt)?"decimal":"");
 if(format==="decimal") return !actual.fraction;
 if(format==="fraction") return actual.fraction;
 if(format==="denominator") return actual.fraction&&actual.denominator===expected.denominator;
 if(format==="irreducible"){
  if(!actual.fraction) return false;
  let a=actual.numerator<0n?-actual.numerator:actual.numerator,b=actual.denominator;
  while(b) [a,b]=[b,a%b];
  return a===1n;
 }
 return true;
}

function trainingFigure(key,n,m,i){
 switch(key){
  case "areaPerimeter":
   return {kind:"rectangle",length:n,width:m,prompt:i%2?"Calcule le périmètre du rectangle en cm.":"Calcule l’aire du rectangle en cm²."};
  case "angle":
   return {kind:"angles",left:4*n,right:5*m,prompt:"Calcule l’angle marqué ? en degrés."};
  case "solids":
   return i%2?{kind:"prism",baseArea:n,height:m,prompt:"Calcule le volume du prisme en cm³."}:
    {kind:"triangleArea",base:2*n,height:m,prompt:"Calcule l’aire du triangle en cm²."};
  case "rightTriangle":
   return {kind:"triangleSides",lengths:[3*(1+n%4),4*(1+n%4),5*(1+n%4)+i%2],prompt:"Ce triangle est-il rectangle ?"};
  case "pythagoras":
   return {kind:"triangleSides",lengths:[3*(1+n%4),4*(1+n%4),null],rightAngle:true,prompt:"Calcule la longueur marquée ? en cm."};
  case "thales":
   return {kind:"thales",am:m,ab:2*m,ac:2*n,prompt:"Calcule la longueur AN."};
  default:
   return null;
 }
}

export function trainingSet(type,grade,id,seed,version=0){
 const skills=type==="can"&&classRaces(grade).some(race=>race.level===id)?races[id]:
  type==="belt"?classBelts[grade]?.[Number(id)]:
  type==="auto"?classAutomatisms[grade]?.[Number(id)]?.[2]:undefined;
 const keys=skills?.split(" ");
 if(!keys?.length) return [];
 const count=type==="can"?30:type==="belt"?12:6;
 const seen=new Set();
 return Array.from({length:count},(_,i)=>{
  const key=keys[i%keys.length];
  const isNumberLine=type==="can"&&version>=2&&key===lineReplacedSkills[id];
  const skill=skillBank[key];
  for(let attempt=0;attempt<88;attempt++){
   const n=2+((Math.imul(seed^(i*731+17),2654435761)>>>0)+attempt)%11;
   const m=2+((Math.imul(seed^(i*131+39),2246822519)>>>0)+Math.floor(attempt/11))%8;
   const variant=i+Math.floor(i/keys.length)+(seed%12)+attempt;
   if(isNumberLine){
    const question=canNumberLine(id,n,m,variant);
    const signature=JSON.stringify(question.figure);
    if(seen.has(signature)) continue;
    seen.add(signature);
    return question;
   }
   if(version>=1&&key==="fracCompare"){
    const a=n%5+1, b=6, denominator=b*m, numerator=a*m;
    const answer=["<","=",">"][variant%3];
    const left=`${a}/${b}`, right=`${numerator+[1,0,-1][variant%3]}/${denominator}`;
    const signature=left+"|"+right;
    if(seen.has(signature)) continue;
    seen.add(signature);
    return {prompt:"Compare ces deux nombres.",compare:{left,right},answer,options:["<","=",">"],
      explain:`${left} = ${numerator}/${denominator}. Les dénominateurs sont maintenant égaux : compare les numérateurs.`,
      skill:"Comparer des fractions"};
   }
   const [prompt,answer,explain,options,irreducible]=skill.build(n,m,variant);
   if(seen.has(prompt)) continue;
   seen.add(prompt);
   const offset=options?((Math.imul(seed+i+1,1103515245)>>>0)%options.length):0;
   const choices=options&&options.slice(offset).concat(options.slice(0,offset));
   const figure=trainingFigure(key,n,m,variant);
   return {prompt:figure?.prompt??prompt,answer,explain,options:choices,irreducible,skill:skill.label,...(figure?{figure}:{})};
  }
  throw new Error(`Pas assez de variantes pour ${key}`);
 });
}
