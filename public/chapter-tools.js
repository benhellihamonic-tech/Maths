export function chapterItem(prompt, answer, explain) {
  return {prompt, answer:String(answer), explain, written:false};
}
export function chapterWriting(prompt, answer, explain) {
  return {prompt, answer, explain, written:true};
}
export function makeChapter(id, code, title, skills, example, recap, practice, first, second, links=[], track="cours") {
  const tagSkills=items=>items.map((item,i)=>({...item,skill:i%skills.length}));
  return {id,code,title,skills,example,recap,practice:tagSkills(practice),tests:[tagSkills(first),tagSkills(second)],links,track};
}
