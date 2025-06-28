#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const translationsDir = path.join(root, 'translations');
const siteUrl = process.env.SITE_URL || 'https://prompterai.space';

function readTranslations() {
  return fs
    .readdirSync(translationsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(translationsDir, f), 'utf8')));
}

function getHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'templates'].includes(entry.name)) return [];
      return getHtmlFiles(res);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [res] : [];
  });
}

function parsePath(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  let lang = 'en';
  let page = rel;
  const parts = rel.split('/');
  if (parts.length > 1 && fs.existsSync(path.join(translationsDir, parts[0] + '.json'))) {
    lang = parts[0];
    page = parts.slice(1).join('/');
  }
  if (page === 'index.html') page = '';
  return { lang, page };
}

function hrefFor(code, page) {
  const prefix = code === 'en' ? '' : `/${code}`;
  const suffix = page ? `/${page}` : '/';
  return `${siteUrl}${prefix}${suffix}`;
}

function build() {
  const translations = readTranslations();
  const codes = translations.map(t => t.code);
  const htmlFiles = getHtmlFiles(root);

  for (const file of htmlFiles) {
    let html = fs.readFileSync(file, 'utf8');
    const { page } = parsePath(file);
    // remove existing alternate link lines
    html = html
      .split('\n')
      .filter(line => !/rel="alternate"/i.test(line))
      .join('\n');

    const lines = html.split('\n');
    let insertIdx = lines.findIndex(l => l.includes('rel="canonical"'));
    if (insertIdx === -1) {
      insertIdx = lines.findIndex(l => /<\/head>/i.test(l));
      if (insertIdx === -1) continue;
    } else {
      insertIdx += 1;
    }

    const links = [];
    links.push(`    <link rel="alternate" href="${hrefFor('en', page)}" hreflang="x-default" />`);
    for (const code of codes) {
      // check file exists
      const target = code === 'en'
        ? path.join(root, page || 'index.html')
        : path.join(root, code, page || 'index.html');
      if (!fs.existsSync(target)) continue;
      links.push(`    <link rel="alternate" href="${hrefFor(code, page)}" hreflang="${code}" />`);
    }

    lines.splice(insertIdx, 0, ...links);
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Updated', path.relative(root, file));
  }
}

build();
