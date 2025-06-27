#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.SITE_URL || 'https://prompterai.space';

const rootDir = path.join(__dirname, '..');

function getHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') return [];
      return getHtmlFiles(res);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [res] : [];
  });
}

function pathToUrl(file) {
  const rel = path.relative(rootDir, file).replace(/\\/g, '/');
  if (rel === 'index.html') return `${BASE_URL}/`;
  if (rel.endsWith('/index.html')) {
    return `${BASE_URL}/${rel.slice(0, -'index.html'.length)}`;
  }
  return `${BASE_URL}/${rel}`;
}

let htmlFiles = getHtmlFiles(rootDir);
const customFiles = [
  path.join(rootDir, '404.html'),
  path.join(rootDir, 'tr', '404.html'),
  path.join(rootDir, 'es', '404.html'),
  path.join(rootDir, 'fr', '404.html'),
  path.join(rootDir, 'hi', '404.html'),
  path.join(rootDir, 'zh', '404.html'),
];
htmlFiles = Array.from(new Set([...htmlFiles, ...customFiles]));

const urls = htmlFiles.map((file) => ({
  loc: pathToUrl(file),
  lastmod: fs.statSync(file).mtime.toISOString().split('T')[0],
  changefreq: 'monthly',
}));

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq></url>`
    )
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml);
console.log('Wrote sitemap.xml');
