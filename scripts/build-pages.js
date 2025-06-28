#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'templates', 'index.template.html');
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

function build() {
  const template = fs.readFileSync(templatePath, 'utf8');
  const translations = readTranslations();
  for (const t of translations) {
    const lang = t.code;
    const baseHref = lang === 'en' ? './' : '../';
    const canonical = `${siteUrl}${lang === 'en' ? '/' : '/' + lang + '/'}`;
    const ogAlternates = translations
      .filter(o => o.code !== lang)
      .map(o => `<meta property="og:locale:alternate" content="${o.code}" />`)
      .join('\n    ');
    const alternateLinks = [
      `<link rel="alternate" href="${siteUrl}/" hreflang="x-default" />`,
      ...translations.map(o => {
        const href = `${siteUrl}${o.code === 'en' ? '/' : '/' + o.code + '/'}`;
        return `<link rel="alternate" href="${href}" hreflang="${o.code}" />`;
      }),
    ].join('\n    ');
    const inLanguages = `[${translations.map(o => `"${o.code}"`).join(', ')}]`;
    const params = {
      LANG: lang,
      BASE_HREF: baseHref,
      DESCRIPTION: t.description,
      KEYWORDS: t.keywords,
      CANONICAL_URL: canonical,
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
    const outDir = lang === 'en' ? root : path.join(root, lang);
    if (lang !== 'en') fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log('Wrote', path.relative(root, path.join(outDir, 'index.html')));
  }
}

build();
