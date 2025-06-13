#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://example.com';

const urls = [`${BASE_URL}/`, `${BASE_URL}/tr/`];

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), xml);
console.log('Wrote sitemap.xml');
