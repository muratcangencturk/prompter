#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const promptsDir = path.join(__dirname, '..', 'prompts');

const preservePunctuation = {
  mindBlowing: [2],
  video: [2],
  image: [2],
};

function listPromptFiles() {
  const files = [];
  for (const lang of fs.readdirSync(promptsDir)) {
    const langDir = path.join(promptsDir, lang);
    if (!fs.statSync(langDir).isDirectory()) continue;
    for (const file of fs.readdirSync(langDir)) {
      if (file.endsWith('.json')) {
        files.push(path.join(langDir, file));
      }
    }
  }
  return files;
}

function checkFile(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const errors = [];
  if (!Array.isArray(data.parts)) return errors;
  const key = path.basename(file, '.json');
  data.parts.slice(0, 3).forEach((arr, partIdx) => {
    if (!Array.isArray(arr)) return;
    const allowPunct = (preservePunctuation[key] || []).includes(partIdx);
    arr.forEach((str, idx) => {
      if (typeof str !== 'string') return;
      const hasSpace = str.trim() !== str;
      const hasPunct = /[.!?]$/.test(str);
      if (hasSpace || (hasPunct && !allowPunct)) {
        errors.push(
          `${path.relative(process.cwd(), file)} [${partIdx}:${idx}] "${str}"`
        );
      }
    });
  });
  return errors;
}

let allErrors = [];
for (const file of listPromptFiles()) {
  allErrors = allErrors.concat(checkFile(file));
}

const fullSentenceFiles = [
  path.join(__dirname, '..', 'fullsentenceprompts.en.json'),
  path.join(__dirname, '..', 'fullsentenceprompts.tr.json'),
];

for (const file of fullSentenceFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(data)) {
      allErrors.push(`${path.relative(process.cwd(), file)} is not an array`);
    }
  } catch (err) {
    allErrors.push(`${path.relative(process.cwd(), file)} is invalid JSON`);
  }
}

if (allErrors.length) {
  console.error('Prompt format issues found:');
  for (const err of allErrors) {
    console.error(' -', err);
  }
  process.exitCode = 1;
} else {
  console.log('All prompts look good.');
}
