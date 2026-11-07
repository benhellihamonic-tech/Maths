import {lessonGroups,questions,questionSignature} from "./content.js";

// Les seuils sont communs aux quatre classes. Les preuves restent propres à une notion.
export const ranks = [
  [0,"Moussaillon"],[15,"Matelot"],[40,"Quartier-maître"],[70,"Second maître"],
  [105,"Maître"],[145,"Premier maître"],[190,"Maître principal"],[245,"Enseigne de vaisseau"],
  [310,"Lieutenant de vaisseau"],[390,"Capitaine de frégate"],[480,"Capitaine de vaisseau"],
  [600,"Contre-amiral"],[750,"Vice-amiral"],
];

// Une entrée ne pourra passer à true qu’après vérification de l’inventaire complet
// des notions de la classe et de leurs quiz de maîtrise.
const coverageComplete = {"6e":false,"5e":false,"4e":false,"3e":false};

export function updateEvidence(all, key, mode, state) {
  const evidence = all[key] ??= {};
  if (mode==="lecon" && state.done) evidence.lesson=true;
  if (mode==="jeu") evidence.stars=Math.max(evidence.stars||0,state.bestStars||0,state.stars||0);
  if (mode==="quiz" && state.done && state.answers.length===5) {
    const score=state.answers.filter(a=>a.correct).length;
    const independent=state.answers.filter(a=>a.correct&&!a.help).length;
    evidence.quiz=true;
    evidence.score=Math.max(evidence.score||0,score);
    evidence.independent=Math.max(evidence.independent||0,independent);
    if (independent===5 && state.level>=1) {
      const perfect=evidence.perfect ??= [];
      const version=state.quizVersion??0;
      const items=new Set(questions(key,state.seed,state.level,version).map(questionSignature));
      // Deux séries autonomes doivent comporter cinq questions distinctes et
      // proposer au moins trois nouvelles tâches dans la seconde série.
      if (items.size===5 && perfect.length<2 &&
          perfect.every(series=>JSON.parse(series).filter(item=>!items.has(item)).length>=3))
        perfect.push(JSON.stringify([...items].sort()));
    }
  }
}

export function lessonXP(evidence={}) {
  return (evidence.lesson?10:0)+(evidence.stars||0)*5+(evidence.quiz?15:0)
    +(evidence.score||0)*8+(evidence.independent||0)*10+(evidence.perfect?.length||0)*25;
}

export function xpRoutes(rank, evidence, progress, omit) {
  const remaining = rank.next ? rank.next[0] - rank.xp : 0;
  const quizLimit = lessonXP({quiz:true, score:5, independent:5, perfect:[0,1]});
  const options = rank.keys.flatMap(key => {
    const record = evidence[key] || {};
    const quizXP = lessonXP({...record, lesson:false, stars:0});
    return [
      {key, mode:"lecon", max:record.lesson ? 0 : 10, guaranteed:10},
      {key, mode:"quiz", max:quizLimit - quizXP, guaranteed:record.quiz ? 0 : 15},
      {key, mode:"jeu", max:(3 - (record.stars || 0)) * 5, guaranteed:0},
    ];
  }).filter(option => option.max > 0 && !(option.key === omit?.key && option.mode === omit?.mode))
    .map(option => {
      const saved = progress.find(p => p.lesson === option.key && p.mode === option.mode);
      return {...option, resume:Boolean(saved && !saved.done && saved.step > 0), replay:Boolean(saved?.done)};
    });
  options.sort((a,b) => {
    const priority = option => option.guaranteed >= remaining && remaining > 0 ? 0
      : option.resume ? 1 : option.max >= remaining ? 2 : 3;
    return priority(a) - priority(b) || Number(a.replay) - Number(b.replay);
  });
  return options.filter((option,i) => options.findIndex(other => other.mode === option.mode) === i);
}

export function classProgress(grade,evidence) {
  const allGroups=lessonGroups(grade);
  const groups=grade==="4e"?allGroups.map(([domain,keys])=>[domain,keys.filter(key=>key!=="thales4"&&key!=="cosinus4")]).filter(([,keys])=>keys.length):allGroups;
  const keys=[...new Set(groups.flatMap(([,keys])=>keys))];
  const mastered=key=>(evidence[key]?.perfect?.length||0)>=2;
  const xp=[...new Set(allGroups.flatMap(([,list])=>list))].reduce((total,key)=>total+lessonXP(evidence[key]),0);
  const champion=Boolean(coverageComplete[grade]&&groups.length&&groups.every(([,list])=>list.length&&list.every(mastered)));
  const index=ranks.reduce((last,[threshold],i)=>xp>=threshold?i:last,0);
  return {xp,level:champion?ranks.length+1:index+1,title:champion?"Amiral":ranks[index][1],
    next:ranks[index+1],start:ranks[index][0],groups,keys,mastered,champion,coverageComplete:coverageComplete[grade]};
}
