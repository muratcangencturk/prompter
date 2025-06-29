#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const templatesDir = path.join(root, 'templates');
const translationsDir = path.join(root, 'translations');
const siteUrl = process.env.SITE_URL || 'https://prompterai.space';

function readTranslations() {
  const entries = fs.readdirSync(translationsDir);
  return entries.filter(f => f.endsWith('.json')).map(f => {
    const obj = JSON.parse(fs.readFileSync(path.join(translationsDir, f), 'utf8'));
    return obj;
  });
}

function render(template, params) {
  return Object.keys(params).reduce((html, key) => {
    return html.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
  }, template);
}

function pathFor(lang, page) {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const pathPart = page === 'index.html' ? '/' : `/${page}`;
  return `${prefix}${pathPart}`;
}

function urlFor(lang, page) {
  return `${siteUrl}${pathFor(lang, page)}`;
}

function build() {
  const templates = fs
    .readdirSync(templatesDir)
    .filter(f => f.endsWith('.template.html'));
  const translations = readTranslations();

  for (const templateFile of templates) {
    const template = fs.readFileSync(path.join(templatesDir, templateFile), 'utf8');
    const page = templateFile.replace('.template.html', '.html');
    const pageKey = page.replace('.html', '').replace(/-/g, '_');

    for (const t of translations) {
      const lang = t.code;
      const baseHref = lang === 'en' ? './' : '../';
      const canonicalPath = pathFor(lang, page);
      const canonical = urlFor(lang, page);
      const ogAlternates = translations
        .filter(o => o.code !== lang)
        .map(o => `<meta property="og:locale:alternate" content="${o.code}" />`)
        .join('\n    ');
      const alternateLinks = [
        `<link rel="alternate" href="${pathFor('en', page)}" hreflang="x-default" />`,
        ...translations.map(o => {
          const href = pathFor(o.code, page);
          return `<link rel="alternate" href="${href}" hreflang="${o.code}" />`;
        }),
      ].join('\n    ');
      const inLanguages = `[${translations.map(o => `"${o.code}"`).join(', ')}]`;
      const params = {
        ...t,
        LANG: lang,
        BASE_HREF: baseHref,
        DESCRIPTION: t[`${pageKey}_description`] || t.description,
        KEYWORDS: t[`${pageKey}_keywords`] || t.keywords,
        CANONICAL_URL: canonical,
        PAGE_PATH: canonicalPath,
        ALTERNATE_LINKS: alternateLinks,
        OG_ALTERNATES: ogAlternates,
        IN_LANGUAGES: inLanguages,
        FAQ_QUESTION: t.faq_question,
        FAQ_ANSWER: t.faq_answer,
        PROMPTER_LOGO_ALT: t.prompter_logo_alt,
        WHATSAPP_LOGO_ALT: t.whatsapp_logo_alt,
        SET_LANGUAGE: lang === 'en' ? '' : `<script>localStorage.setItem('language', '${lang}');</script>`,
      };
      let html = render(template, params);
      html = html.replace('</head>', `  <link rel="prefetch" href="translations/ui/${lang}.json" as="fetch" />\n  </head>`);
      const outDir = lang === 'en' ? root : path.join(root, lang);
      if (lang !== 'en') fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, page), html);
      console.log('Wrote', path.relative(root, path.join(outDir, page)));
    }
  }
}

build();
