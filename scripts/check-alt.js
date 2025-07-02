#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const rootDir = path.join(__dirname, '..');

function getHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') return [];
      return getHtmlFiles(res);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [res] : [];
  });
}

let hasErrors = false;
for (const file of getHtmlFiles(rootDir)) {
  const html = fs.readFileSync(file, 'utf8');
  const dom = new JSDOM(html);
  const missing = [...dom.window.document.querySelectorAll('img:not([alt])')];
  if (missing.length) {
    missing.forEach((img) => {
      console.error(
        `${path.relative(rootDir, file)} missing alt: ${img.outerHTML}`
      );
    });
    hasErrors = true;
  }
}

if (hasErrors) {
  process.exitCode = 1;
} else {
  console.log('All images have alt attributes.');
}
