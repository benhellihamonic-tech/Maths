// Les schémas et les valeurs de la question utilisent les mêmes données.
function figureText(x,y,value,anchor="middle",solved=false){
  return `<text x="${x}" y="${y}" text-anchor="${anchor}"${solved?' class="figure-solution-text"':""}>${value}</text>`;
}
function trainingSvg(label,body,viewBox="0 0 320 174"){
  return `<figure class="training-figure"><svg viewBox="${viewBox}" role="img" aria-label="${label}">
    ${body}</svg></figure>`;
}

export function trainingVisual(figure,solution=null){
  if(!figure) return "";
  switch(figure.kind){
    case "rectangle": {
      const {length,width}=figure;
      const scale=Math.min(180/length,100/width);
      const w=length*scale,h=width*scale,x=(276-w)/2,y=(150-h)/2;
      return trainingSvg(`Rectangle. Côté horizontal : ${length} cm. Côté vertical : ${width} cm.`,`
        <rect class="figure-shape ${solution?(solution.perimeter?"figure-solution-line":"figure-solution-fill"):""}" x="${x}" y="${y}" width="${w}" height="${h}"/>
        ${figureText(x+w/2,y-9,`${length} cm`)}
        ${figureText(x+w+10,y+h/2+5,`${width} cm`,"start")}`,"0 0 320 150");
    }
    case "numberLine": {
      const x=index=>30+32*index;
      const {labels,point}=figure;
      return trainingSvg(`Droite graduée régulièrement. ${labels[0][1]} et ${labels[1][1]} sont séparés par deux intervalles.
        Le point A se trouve à ${point-labels[0][0]} intervalles à droite de ${labels[0][1]}.`,`
        <path class="figure-line" d="M14 61H306m-8 -5l8 5-8 5"/>
        ${Array.from({length:9},(_,i)=>`<path class="figure-line" d="M${x(i)} 54v14"/>`).join("")}
        ${labels.map(([i,value])=>figureText(x(i),90,value)).join("")}
        <circle class="figure-point ${solution?"figure-solution-text":""}" cx="${x(point)}" cy="61" r="5"/>
        ${figureText(x(point),42,"A","middle",Boolean(solution))}
        ${solution?figureText(x(point),90,solution.answer,"middle",true):""}`,"0 0 320 104");
    }
    case "angles": {
      const {left,right}=figure;
      const a=Math.tan(left*Math.PI/180),b=Math.tan(right*Math.PI/180);
      const x=56+208*b/(a+b), y=135-(x-56)*a;
      const arc=(origin,angle,direction)=>{
        const radians=angle*Math.PI/180;
        return `<path class="figure-accent" d="M${origin+direction*32} 135 A32 32 0 0 ${direction===1?0:1} ${origin+direction*32*Math.cos(radians)} ${135-32*Math.sin(radians)}"/>`;
      };
      return trainingSvg(`Triangle. Angle à gauche : ${left} degrés. Angle à droite : ${right} degrés. Angle du sommet : ${solution?solution.answer+" degrés":"inconnu"}.`,`
        <path class="figure-shape" d="M56 135H264L${x} ${y}Z"/>
        ${arc(56,left,1)}${arc(264,right,-1)}
        ${figureText(56,160,left+"°")}${figureText(264,160,right+"°")}${figureText(x,y-10,solution?solution.answer+"°":"?","middle",Boolean(solution))}`);
    }
    case "triangleArea":
      return trainingSvg(`Triangle de base ${figure.base} cm. Hauteur perpendiculaire à la base : ${figure.height} cm.`,`
        <path class="figure-shape" d="M47 139H272L118 28Z"/>
        <path class="figure-accent figure-dashed ${solution?"figure-solution-line":""}" d="M118 28V139"/>
        ${solution?'<path class="figure-line figure-solution-line" d="M47 139H272"/>':""}
        <path class="figure-line" d="M118 129h10v10"/>
        ${figureText(127,85,`${figure.height} cm`,"start")}
        ${figureText(160,161,`${figure.base} cm`)}`);
    case "prism":
      return trainingSvg(`Prisme droit. Aire de la base triangulaire : ${figure.baseArea} cm². Hauteur : ${figure.height} cm.`,`
        <path class="figure-shape" d="M75 66L232 42V116L75 140Z"/>
        <path class="figure-line figure-dashed" d="M145 17v74l87 25m-87-25-70 49"/>
        <path class="figure-shape figure-base ${solution?"figure-solution-fill":""}" d="M75 66L232 42 145 17Z"/>
        <path class="figure-accent ${solution?"figure-solution-line":""}" d="M252 43v73m-5-73h10m-10 73h10"/>
        ${figureText(263,84,`${figure.height} cm`,"start")}
        ${figureText(156,161,`Aire de la base : ${figure.baseArea} cm²`)}`);
    case "triangleSides": {
      const [vertical,horizontal,diagonal]=figure.lengths;
      const {rightAngle}=figure;
      const top=rightAngle?62:96;
      const label=length=>length===null?(solution?`${solution.answer} cm`:"?"):`${length} cm`;
      return trainingSvg(`Triangle. Côté de gauche : ${label(vertical)}. Côté du bas : ${label(horizontal)}. Troisième côté : ${label(diagonal)}.${rightAngle?" Angle droit entre les côtés gauche et bas.":" Schéma non à l’échelle."}`,`
        <path class="figure-shape" d="M62 124H257L${top} 24Z"/>
        ${rightAngle?'<path class="figure-line" d="M62 111h13v13"/>':""}
        ${figureText(53,78,label(vertical),"end")}
        ${figureText(160,147,label(horizontal))}
        ${figureText(181,61,label(diagonal),"middle",Boolean(solution&&rightAngle))}
        ${rightAngle?"":figureText(160,169,"Figure non à l’échelle.")}`);
    }
    case "thales":
      return trainingSvg(`A, M, B alignés dans cet ordre. A, N, C alignés dans cet ordre. MN parallèle à BC. AM = ${figure.am}, AB = ${figure.ab}, AC = ${figure.ac}.`,`
        <path class="figure-shape" d="M38 83L257 24V142Z"/>
        <path class="figure-accent" d="M147.5 53.5v59"/>
        ${figureText(22,88,"A")}${figureText(142,46,"M")}${figureText(145,133,"N")}
        ${figureText(271,29,"B")}${figureText(271,146,"C")}
        ${figureText(94,59,figure.am)}
        ${figureText(210,20,`AB = ${figure.ab}`)}
        ${figureText(217,158,`AC = ${figure.ac}`)}
        ${figureText(199,88,"(MN) ∥ (BC)")}
        ${solution?`<path class="figure-line figure-solution-line" d="M38 83L147.5 112.5"/>
          ${figureText(83,123,`AN = ${solution.answer}`,"middle",true)}`:""}`);
    default:
      return "";
  }
}
