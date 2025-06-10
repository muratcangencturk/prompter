const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'prompts');
const languages = fs
  .readdirSync(base)
  .filter((p) => fs.statSync(path.join(base, p)).isDirectory());
const result = {};

languages.forEach((lang) => {
  const langDir = path.join(base, lang);
  const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.json'));
  result[lang] = {};
  files.forEach((file) => {
    const cat = path.basename(file, '.json');
    const json = fs.readFileSync(path.join(langDir, file), 'utf8');
    result[lang][cat] = JSON.parse(json);
  });
});

const out = `window.prompts = ${JSON.stringify(result)};`;
fs.writeFileSync(path.join(__dirname, '..', 'prompts.js'), out + '\n');
console.log('prompts.js generated.');
