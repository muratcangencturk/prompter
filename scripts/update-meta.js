#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const translationsDir = path.join(root, 'translations');

const pages = [
  { file: 'login.html', descKey: 'login_description', keyKey: 'login_keywords' },
  { file: 'profile.html', descKey: 'profile_description', keyKey: 'profile_keywords' },
];

function readTranslations() {
  return fs.readdirSync(translationsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(translationsDir, f), 'utf8')));
}

function replaceMeta(html, attr, value) {
  const regex = new RegExp(`(<meta[^>]*${attr}[^>]*content=")([^"]*)(")`, 'i');
  return html.replace(regex, `$1${value}$3`);
}

function updateFile(filePath, desc, keywords) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  html = replaceMeta(html, 'name="description"', desc);
  html = replaceMeta(html, 'name="keywords"', keywords);
  html = replaceMeta(html, 'property="og:description"', desc);
  html = replaceMeta(html, 'name="twitter:description"', desc);
  fs.writeFileSync(filePath, html);
}

function run() {
  const translations = readTranslations();
  for (const t of translations) {
    const dir = t.code === 'en' ? root : path.join(root, t.code);
    for (const { file, descKey, keyKey } of pages) {
      const filePath = path.join(dir, file);
      const desc = t[descKey] || t.description;
      const keywords = t[keyKey] || t.keywords;
      updateFile(filePath, desc, keywords);
      if (fs.existsSync(filePath)) {
        console.log('Updated', path.relative(root, filePath));
      }
    }
  }
}

run();
