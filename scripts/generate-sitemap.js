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

let htmlFiles = getHtmlFiles(rootDir).filter(
  (file) => !file.endsWith('404.html')
);

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
