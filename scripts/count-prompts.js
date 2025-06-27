#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const promptsDir = path.join(__dirname, '..', 'prompts');

function listLanguages() {
  return fs.readdirSync(promptsDir).filter((p) => {
    const full = path.join(promptsDir, p);
    return fs.statSync(full).isDirectory();
  });
}

function countForFile(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(data.parts)) return 0;
  return data.parts.reduce(
    (acc, arr) => acc * (Array.isArray(arr) ? arr.length : 0),
    1
  );
}

const results = {};
for (const lang of listLanguages()) {
  const langDir = path.join(promptsDir, lang);
  results[lang] = {};
  for (const file of fs.readdirSync(langDir)) {
    if (!file.endsWith('.json')) continue;
    const key = path.basename(file, '.json');
    const filePath = path.join(langDir, file);
    const count = countForFile(filePath);
    results[lang][key] = count;
  }
}

for (const lang of Object.keys(results)) {
  console.log(`${lang}:`);
  const categories = results[lang];
  for (const key of Object.keys(categories)) {
    const count = categories[key];
    console.log(`  ${key}: ${count.toLocaleString()}`);
  }
}
