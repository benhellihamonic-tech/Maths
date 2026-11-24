// Alignement sur les fiches N22 à N27 du livret de leçons de 6e, pages 28 à 33.
const decimalNumber=value=>new Intl.NumberFormat("fr-FR",{maximumFractionDigits:4}).format(value);
const decimalFraction=(numerator,denominator)=>`<span class="decimal-fraction" role="math" aria-label="${numerator} sur ${denominator}"><span>${numerator}</span><span>${denominator}</span></span>`;

export const decimalSheets={
  N22:{title:"Utiliser des fractions décimales",short:"Fractions décimales",icon:"½",
    rule:"Une fraction décimale a pour dénominateur 1, 10, 100, 1 000… Son numérateur est entier. Chaque carreau ci-dessous vaut un centième.",
    tip:"Dans 2,04, le zéro garde la place des dixièmes. Tous les entiers sont aussi des nombres décimaux."},
  N23:{title:"Utiliser les unités de numération",short:"Unités de numération",icon:"▦",
    rule:"Le chiffre des dixièmes occupe une seule case. Le nombre de dixièmes compte tous les dixièmes complets contenus dans le nombre.",
    tip:"10 dixièmes = 1 unité. 10 centièmes = 1 dixième. 10 millièmes = 1 centième. La partie décimale de 15,05 est 0,05."},
  N24:{title:"Associer les écritures d’un nombre décimal",short:"Plusieurs écritures",icon:"=",
    rule:"Ces écritures représentent le même nombre. Chaque chiffre prend sa valeur selon son rang.",
    tip:"Un zéro peut marquer un rang vide. Par exemple, 3,07 = 3 + 7/100, alors que 3,7 = 3 + 7/10."},
  N25:{title:"Repérer et placer sur une demi-droite graduée",short:"Droite graduée",icon:"↦",
    rule:"Le pas est la valeur d’un intervalle. On divise l’écart entre deux nombres connus par le nombre d’intervalles.",
    tip:"Compte les espaces entre les graduations. L’abscisse est le nombre qui repère un point."},
  N26:{title:"Comparer et ordonner des nombres décimaux",short:"Comparer et ordonner",icon:"≶",
    rule:"Compare d’abord les parties entières, puis les dixièmes, les centièmes… Le premier rang différent permet de conclure.",
    tip:"Ajouter des zéros à droite de la partie décimale ne change pas le nombre. Dans l’ordre croissant, on va du plus petit au plus grand."},
  N27:{title:"Encadrer et intercaler des nombres décimaux",short:"Encadrer et intercaler",icon:"↔",
    rule:"Au dixième, les bornes sont deux dixièmes consécutifs. Au centième, ce sont deux centièmes consécutifs. La borne de gauche peut être égale au nombre.",
    tip:"Pour intercaler, les deux inégalités sont strictes. Plusieurs réponses conviennent. Ajouter un zéro final ne crée pas un nouveau nombre."},
};

export function decimalPlaceTable(value){
  const [integer,part=""]=String(value).replace(",",".").split(".");
  const digits=integer.padStart(2," ")+","+part.padEnd(3,"0");
  return `<div class="decimal-table-wrap"><table class="decimal-place-table"><caption>Tableau de numération</caption><thead><tr>
    ${["Dizaines","Unités",",","Dixièmes","Centièmes","Millièmes"].map(label=>`<th scope="col">${label}</th>`).join("")}
    </tr></thead><tbody><tr>${[...digits].map(digit=>`<td>${digit}</td>`).join("")}</tr></tbody></table></div>`;
}

export function decimalLine(figure,solution=null){
  const {start,step,count=10,point,place}=figure;
  const x=i=>30+60*i;
  const number=i=>decimalNumber((start+step*i)/1000);
  const marked=place?(solution?Math.round((Number(String(solution.answer).replace(",","."))*1000-start)/step):null):point;
  return `<figure class="training-figure decimal-line"><svg viewBox="0 0 660 180" role="img" aria-label="Demi-droite graduée de ${number(0)} à ${number(count)}, avec ${count} intervalles égaux${marked===null||marked===undefined?"":`. Point A sur la graduation numéro ${marked} après le début.`}">
    <path class="figure-line" d="M17 90H650m-8-5 8 5-8 5"/>
    ${Array.from({length:count+1},(_,i)=>`<path class="figure-line" d="M${x(i)} 82v16"/>${i===0||i===count?`<text x="${x(i)}" y="160" text-anchor="middle">${number(i)}</text>`:""}`).join("")}
    ${Number.isInteger(marked)?`<circle class="figure-point${solution?" figure-solution-text":""}" cx="${x(marked)}" cy="90" r="6"/>
      <text x="${x(marked)}" y="50" text-anchor="middle" class="${solution?"figure-solution-text":""}">A${solution?"("+decimalNumber(Number(String(solution.answer).replace(",",".")))+")":""}</text>`:""}
    </svg></figure>`;
}

function hundredGrid(count){
  return `<span class="decimal-hundred" aria-label="${count} centièmes">${Array.from({length:100},(_,i)=>`<i${i<count?' class="filled"':""}></i>`).join("")}</span>`;
}
export function decimalSheetRecall(id){
  const sheet=decimalSheets[id];
  let visual;
  switch(id){
    case "N22":
      visual=`<div class="decimal-grids" aria-label="Deux unités et quatre centièmes">${hundredGrid(100)}${hundredGrid(100)}${hundredGrid(4)}</div>
        <div class="decimal-equality"><span>2 unités + 4 centièmes</span><b>=</b>${decimalFraction(204,100)}<b>= 2,04</b></div>`;
      break;
    case "N23":
      visual=`${decimalPlaceTable("84.136")}<div class="decimal-facts"><p>Chiffre des dixièmes <b>1</b></p>
        <p>Nombre de dixièmes complets <b>841</b></p></div><p class="decimal-equality">84,136 = 84 + 0,136</p>`;
      break;
    case "N24":
      visual=`<p class="decimal-center">3,17</p><div class="decimal-equivalents">
        <span>${decimalFraction(317,100)}</span><span>3 + ${decimalFraction(17,100)}</span>
        <span>3 + ${decimalFraction(1,10)} + ${decimalFraction(7,100)}</span>
        <span>${decimalFraction(31,10)} + ${decimalFraction(7,100)}</span>
        <span>3 unités et 17 centièmes</span><span>317 %</span></div>`;
      break;
    case "N25":
      visual=`${decimalLine({start:5300,step:10,point:4})}<div class="decimal-steps"><span>Écart <b>5,4 − 5,3 = 0,1</b></span>
        <span>10 intervalles <b>0,1 ÷ 10 = 0,01</b></span><span>4 pas jusqu’à A <b>A(5,34)</b></span></div>`;
      break;
    case "N26":
      visual=`<div class="decimal-comparison"><span>3,4<strong>7</strong>5</span><b>&lt;</b><span>3,4<strong>8</strong>0</span></div>
        <p class="decimal-equality">7 centièmes &lt; 8 centièmes</p>
        <div class="decimal-steps"><span>Croissant <b>2,4 &lt; 2,43 &lt; 2,5</b></span><span>Décroissant <b>2,5 &gt; 2,43 &gt; 2,4</b></span></div>`;
      break;
    case "N27":
      visual=`<div class="decimal-steps"><span>À l’unité <b>14 ≤ 14,72 &lt; 15</b></span>
        <span>Au dixième <b>14,7 ≤ 14,72 &lt; 14,8</b></span></div>
        ${decimalLine({start:7800,step:10,point:4},{answer:7.84})}
        <p class="decimal-equality">7,8 &lt; <strong>7,84</strong> &lt; 7,9</p>`;
      break;
  }
  return `<section class="paper decimal-recall" aria-label="Rappel visuel de ${id}"><p class="eyebrow">RAPPEL · ${id}</p>
    ${visual}<p>${sheet.rule}</p><details><summary>Le point à retenir</summary><p>${sheet.tip}</p></details></section>`;
}

function decimalQuestion(prompt,answer,explain,options,extra={}){
  const formatted=options&&typeof answer==="number"?decimalNumber(answer):answer;
  return {prompt,answer:formatted,explain,...(options?{options:options.map(option=>typeof option==="number"?decimalNumber(option):option)}:{}),...extra};
}

export function decimalTrainingSet(id,seed){
  if(!decimalSheets[id]) return [];
  const n=2+(seed>>>0)%6, digit=1+(seed>>>3)%8;
  const f=decimalNumber, q=decimalQuestion;
  const table={figure:{kind:"decimalPlace",value:`${n}4.136`}};
  let items;
  switch(id){
    case "N22":
      items=[
        q(`Écris ${n*100+4}/100 en écriture à virgule.`,n+.04,`${n*100+4} centièmes = ${n} unités et 4 centièmes. Le chiffre des dixièmes est 0.`),
        q(`Écris ${n*10+digit}/10 en écriture à virgule.`,n+digit/10,`Dix dixièmes forment une unité. Il reste ${digit} dixièmes.`),
        q(`Choisis l’écriture décimale de ${n*100+9}/1 000.`,(n*100+9)/1000,`Dans les millièmes, il faut garder le rang des centièmes vide.`,[(n*100+9)/1000,(n*100+9)/100,(n*10+9)/100,(n*100+9)/10]),
        q(`Écris ${f(n+.03)} sous forme de fraction décimale de plus petit dénominateur.`,`${n*100+3}/100`,`Il faut ${n*100+3} centièmes, donc le dénominateur est 100.`,null,{irreducible:"same-denominator"}),
        q("Quelle écriture est une fraction décimale ?","37/100","Son dénominateur est 100. Les autres dénominateurs ne sont ni 1, ni 10, ni 100, ni 1 000…",["37/100","3/4","7/20","5/3"]),
        q(`Écris ${f(n+.7)} sous forme de fraction décimale de plus petit dénominateur.`,`${n*10+7}/10`,`${n} unités et 7 dixièmes font ${n*10+7} dixièmes.`,null,{irreducible:"same-denominator"}),
        q(`Le nombre entier ${n} est-il un nombre décimal ?`,"Oui",`Oui, car ${n} = ${n}/1. Une fraction de dénominateur 1 est une fraction décimale.`,["Oui","Non"]),
        q(`Quelle fraction décimale représente ${f(n+.005)} ?`,`${n*1000+5}/1000`,"Le dernier rang occupé est celui des millièmes.",[`${n*1000+5}/1000`,`${n*100+5}/100`,`${n*10+5}/10`,`${n+5}/1000`]),
      ];
      break;
    case "N23":
      items=[
        q("Quel est le chiffre des dixièmes ?",1,"C’est le premier chiffre après la virgule.",[1,n*100+41,3,6],table),
        q("Combien y a-t-il de dixièmes complets ?",n*100+41,`${f(n*10+4.136)} contient ${n*100+41} dixièmes complets et encore 0,036.`,null,table),
        q("Quel est le chiffre des centièmes ?",3,"C’est le deuxième chiffre après la virgule.",[3,1,6,4],table),
        q(`Quelle est la partie entière de ${f(n+7.684)} ?`,n+7,"La partie entière est le nombre d’unités complètes."),
        q(`Quelle est la partie décimale de ${f(n+30.07)} ?`,.07,`${f(n+30.07)} = ${n+30} + 0,07. La partie décimale est un nombre inférieur à 1.`,[.07,7,n+30,.7]),
        q("Combien de centièmes forment un dixième ?",10,"1/10 = 10/100. Il faut dix centièmes pour faire un dixième.",[10,100,1,1000]),
        q(`${n} unités et 3 centièmes, combien cela fait-il de centièmes ?`,100*n+3,`${n} unités font ${100*n} centièmes. Ajoute les 3 centièmes.`),
        q(`Combien de millièmes complets contient ${f(n+.0479)} ?`,1000*n+47,`${f(n+.0479)} = ${1000*n+47}/1 000 + 9/10 000.`),
      ];
      break;
    case "N24":
      items=[
        q(`Écris ${n} + 3/10 + 7/100 en écriture à virgule.`,n+.37,"Place le 3 au rang des dixièmes et le 7 au rang des centièmes."),
        q(`Quelle décomposition correspond à ${f(n+.073)} ?`,`${n} + 7/100 + 3/1000`,"Le chiffre des dixièmes est zéro.",[`${n} + 7/100 + 3/1000`,`${n} + 7/10 + 3/100`,`${n} + 7/10 + 3/1000`,`${n} + 73/100`]),
        q(`Quelle écriture en nombre mixte est égale à ${f(n+.17)} ?`,`${n} + 17/100`,"La partie décimale est 17/100.",[`${n} + 17/100`,`${n} + 17/10`,`${n} + 17/1000`,`${n+1} + 7/100`]),
        q(`Écris ${n*10+1} dixièmes et 7 centièmes en écriture à virgule.`,n+.17,`${n*10+1} dixièmes = ${f(n+.1)}. Ajoute 0,07.`),
        q(`Quelle fraction décimale est égale à ${f(n+.17)} ?`,`${n*100+17}/100`,"Compte les centièmes contenus dans le nombre.",[`${n*100+17}/100`,`${n*100+17}/10`,`${n*100+17}/1000`,`${n*10+17}/100`]),
        q(`Écris ${n} unités et 8 millièmes en écriture à virgule.`,n+.008,"Il y a zéro dixième et zéro centième."),
        q(`Quel pourcentage représente le nombre ${f(n+.17)} ?`,`${n*100+17} %`,`${f(n+.17)} = ${n*100+17}/100 = ${n*100+17} %.`,[`${n*100+17} %`,`${n*10+17} %`,`${n+17} %`,`${f((n+.17)/100)} %`]),
        q(`Écris (${n} × 1) + (4 × 0,1) + (2 × 0,001) en écriture à virgule.`,n+.402,"4 dixièmes, zéro centième et 2 millièmes."),
      ];
      break;
    case "N25": {
      const start=n*1000+200;
      items=[
        q("Lis l’abscisse du point A.",(start+4*10)/1000,"Les dix intervalles partagent 0,1. Le pas vaut 0,01. A est quatre pas après le début.",null,{figure:{kind:"decimalLine",start,step:10,point:4}}),
        q("Quelle est la valeur d’un intervalle ?",.1,"L’écart vaut 1 et il y a dix intervalles. 1 ÷ 10 = 0,1.",null,{figure:{kind:"decimalLine",start:n*1000,step:100}}),
        q(`Place A(${f((start+7*10)/1000)}) en touchant sa graduation.`,(start+7*10)/1000,"Le pas vaut 0,01. Avance de sept intervalles à partir de la graduation de gauche.",null,{place:true,figure:{kind:"decimalLine",start,step:10,place:true}}),
        q("Lis l’abscisse du point A.",(n*1000+6*100)/1000,"Le pas vaut 0,1. A se trouve six dixièmes après la graduation de gauche.",null,{figure:{kind:"decimalLine",start:n*1000,step:100,point:6}}),
        q("Quelle est la valeur d’un intervalle ?",.001,"L’écart entre les deux nombres repérés vaut 0,01. 0,01 ÷ 10 = 0,001.",null,{figure:{kind:"decimalLine",start:n*1000+40,step:1}}),
        q(`Place A(${f((n*1000+48)/1000)}) en touchant sa graduation.`,(n*1000+48)/1000,"Chaque pas vaut 0,001. A se place huit intervalles après la graduation de gauche.",null,{place:true,figure:{kind:"decimalLine",start:n*1000+40,step:1,place:true}}),
        q("Lis l’abscisse du point A.",(n*1000+35)/1000,"Le pas vaut 0,005. Trois intervalles représentent 0,015.",null,{figure:{kind:"decimalLine",start:n*1000+20,step:5,point:3}}),
        q(`Place A(${f(n+.5)}) en touchant sa graduation.`,n+.5,"L’écart total vaut 2. Le pas est 2 ÷ 10 = 0,2. A est cinq pas après la première graduation.",null,{place:true,figure:{kind:"decimalLine",start:n*1000-500,step:200,place:true}}),
      ];
      break;
    }
    case "N26": {
      const compare=(left,right,answer,explain)=>q("Compare ces deux nombres.",answer,explain,["<","=",">"],{compare:{left,right}});
      items=[
        compare(f(n+.44),f(n+.5),"<",`${f(n+.44)} < ${f(n+.5)} car 44 centièmes sont plus petits que 50 centièmes.`),
        compare(f(n+10.3),f(n+7.85),">","Compare les parties entières avant les chiffres après la virgule."),
        compare(`${n},490`,`${n},49`,"=","Un zéro final après la virgule ne change pas la valeur du nombre."),
        compare(`${n},809`,`${n},89`,"<","Écris le second nombre avec trois chiffres après la virgule et compare 809 à 890."),
        q("Choisis les nombres dans l’ordre croissant.",`${n},018 < ${n},08 < ${n},8`,"Écris les parties décimales sur trois rangs. 018 < 080 < 800.",[`${n},018 < ${n},08 < ${n},8`,`${n},8 < ${n},08 < ${n},018`,`${n},08 < ${n},018 < ${n},8`]),
        q("Choisis les nombres dans l’ordre décroissant.",`${n},7 > ${n},35 > ${n},345`,"350 millièmes sont plus grands que 345 millièmes.",[`${n},7 > ${n},35 > ${n},345`,`${n},345 > ${n},35 > ${n},7`,`${n},7 > ${n},345 > ${n},35`]),
        compare(`${n},007`,`${n},07`,"<","7 millièmes sont plus petits que 7 centièmes."),
        compare(`${n},5`,`${n},499`,">","500 millièmes sont plus grands que 499 millièmes."),
      ];
      break;
    }
    case "N27": {
      const bound=(value,lower,upper,precision,wrongLower,wrongUpper)=>{
        const answer=`${f(lower)} ≤ ${f(value)} < ${f(upper)}`;
        return q(`Choisis l’encadrement ${precision}.`,answer,`Les bornes sont consécutives au rang demandé. Leur écart vaut ${f(upper-lower)}.`,[answer,`${f(wrongLower)} ≤ ${f(value)} < ${f(wrongUpper)}`,`${f(upper)} ≤ ${f(value)} < ${f(upper+upper-lower)}`],{display:f(value)});
      };
      items=[
        bound(n+.68,n,n+1,"à l’unité",n-1,n+1),
        bound(n+.46,n+.4,n+.5,"au dixième",n,n+1),
        bound(n+.583,n+.58,n+.59,"au centième",n+.5,n+.6),
        bound(n+.076,n+.07,n+.08,"au centième",n+.0,n+.1),
        q("Choisis un nombre strictement entre les deux bornes.",n+.84,"Le nombre doit être plus grand que la borne de gauche et plus petit que celle de droite.",[n+.84,n+.8,n+.9,n+.94],{display:`${f(n+.8)} < ? < ${f(n+.9)}`}),
        q("Intercale un nombre entre les deux bornes.",n+.245,"Plusieurs réponses conviennent, par exemple "+f(n+.245)+". Les bornes sont exclues.",null,{display:`${f(n+.24)} < ? < ${f(n+.25)}`,between:[n+.24,n+.25]}),
        bound(n+.4,n+.4,n+.5,"au dixième",n+.3,n+.4),
        q("Intercale un nombre entre les deux bornes.",n+.5,"Tout nombre strictement compris entre les deux entiers convient.",null,{display:`${n} < ? < ${n+1}`,between:[n,n+1]}),
      ];
      break;
    }
  }
  return items.map((item,index)=>{
    const offset=item.options?((seed>>>0)+index)%item.options.length:0;
    return {...item,...(item.options?{options:item.options.slice(offset).concat(item.options.slice(0,offset))}:{}),
      skill:`${id} · ${decimalSheets[id].short}`};
  });
}
