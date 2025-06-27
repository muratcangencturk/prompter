const fs = require('fs');
const vm = require('vm');

// find question files
const files = fs.readdirSync('.')
  .filter(f => /^questions(\.|$)/.test(f) || /^new_questions_batch\d+\.js$/.test(f));

let tech = [];
let politics = [];
let misc = [];

const techKeywords = [
  'technology','ai','robot','neuralink','spacex','tesla','mars','rocket',
  'innovation','chip','software','computer','space','crypto','bitcoin','blockchain'
];
const politicsKeywords = [
  'president','government','minister','congress','senator','politics','election',
  'campaign','policy','regulation','law','supreme court','republican','democrat','politician','trump','biden'
];

function categorize(q){
  const text = `${q.text} ${q.rightResponse} ${q.leftResponse}`.toLowerCase();
  const isTech = techKeywords.some(k => text.includes(k));
  const isPolitics = politicsKeywords.some(k => text.includes(k));
  if (isPolitics) return 'politics';
  if (isTech) return 'tech';
  return 'misc';
}

files.forEach(file => {
  const content = fs.readFileSync(file,'utf8');
  const varMatch = content.match(/const\s+(\w+)\s*=\s*/);
  if(!varMatch) return;
  const start = content.indexOf('[');
  const end = content.lastIndexOf(']');
  const arrayCode = content.slice(start, end+1);
  const context = {};
  vm.createContext(context);
  vm.runInContext(`result = ${arrayCode}`, context);
  const arr = context.result;
  arr.forEach(q => {
    const cat = categorize(q);
    if(cat === 'tech') tech.push(q);
    else if(cat === 'politics') politics.push(q);
    else misc.push(q);
  });
});

fs.writeFileSync('tech.json', JSON.stringify(tech, null, 2));
fs.writeFileSync('politics.json', JSON.stringify(politics, null, 2));
fs.writeFileSync('misc.json', JSON.stringify(misc, null, 2));

console.log(`tech: ${tech.length}, politics: ${politics.length}, misc: ${misc.length}`);
