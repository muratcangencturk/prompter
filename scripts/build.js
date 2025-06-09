const fs = require('fs');
const path = require('path');

const promptsDir = path.join(__dirname, '..', 'prompts');
const outputFile = path.join(__dirname, '..', 'prompts.js');
const utilsFile = path.join(__dirname, 'attachStructure.js');

function loadPrompts() {
  const data = {};
  for (const lang of fs.readdirSync(promptsDir)) {
    const langDir = path.join(promptsDir, lang);
    if (!fs.statSync(langDir).isDirectory()) continue;
    data[lang] = {};
    for (const file of fs.readdirSync(langDir)) {
      if (file.endsWith('.json')) {
        const cat = path.basename(file, '.json');
        const content = JSON.parse(fs.readFileSync(path.join(langDir, file), 'utf8'));
        data[lang][cat] = content;
      }
    }
  }
  return data;
}

function buildFile(data) {
  const header = 'window.prompts = ' + JSON.stringify(data, null, 4) + ';\n\n';
  const utils = fs.readFileSync(utilsFile, 'utf8');
  return header + utils + '\n';
}

const data = loadPrompts();
fs.writeFileSync(outputFile, buildFile(data));
console.log('prompts.js built from JSON files');
