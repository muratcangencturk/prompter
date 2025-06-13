const fs = require('fs');
const path = require('path');

const promptsDir = path.join(__dirname, '..', 'prompts');

const additions = {
  en: [
    'Create a scenario where',
    'challenges existing ideas',
    'using a surprising twist',
    'keeping it concise.'
  ],
  tr: [
    'Şöyle bir senaryo oluştur ki',
    'mevcut fikirleri zorlasın',
    'şaşırtıcı bir hamleyle',
    'kısa tutarak.'
  ]
};

for (const lang of fs.readdirSync(promptsDir)) {
  const langDir = path.join(promptsDir, lang);
  if (!fs.statSync(langDir).isDirectory()) continue;
  for (const file of fs.readdirSync(langDir)) {
    if (!file.endsWith('.json')) continue;
    const filePath = path.join(langDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!Array.isArray(data.parts)) continue;
    const add = additions[lang] || additions['en'];
    data.parts.forEach((arr, idx) => {
      if (Array.isArray(arr) && add[idx]) {
        if (!arr.includes(add[idx])) {
          arr.push(add[idx]);
        }
      }
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Updated ${path.relative(process.cwd(), filePath)}`);
  }
}
