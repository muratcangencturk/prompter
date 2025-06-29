const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const promptsDir = path.join(rootDir, 'prompts');
const outputFile = path.join(rootDir, 'prompts.js');
const manifestFile = path.join(rootDir, 'manifest.json');

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const preservePunctuation = {
  mindBlowing: [2],
  video: [2],
  image: [2],
};

function stripPunctuation(str) {
  return str.replace(/[.!?]+$/, '');
}

function cleanParts(key, parts) {
  return parts.map((arr, idx) => {
    if (idx < 3 && !(preservePunctuation[key] || []).includes(idx)) {
      return arr.map((s) => stripPunctuation(s));
    }
    return arr;
  });
}

function buildPrompts() {
  const result = {};
  for (const lang of fs.readdirSync(promptsDir)) {
    const langDir = path.join(promptsDir, lang);
    if (!fs.statSync(langDir).isDirectory()) continue;
    result[lang] = {};
    for (const file of fs.readdirSync(langDir)) {
      if (file.endsWith('.json')) {
        const key = path.basename(file, '.json');
        const data = readJSON(path.join(langDir, file));
        if (Array.isArray(data.parts)) {
          data.parts = cleanParts(key, data.parts);
        }
        result[lang][key] = data;
      }
    }
  }
  return result;
}


function bumpManifestVersion() {
  const manifest = readJSON(manifestFile);
  const current = parseInt(manifest.version, 10);
  const next = Number.isNaN(current) ? 1 : current + 1;
  manifest.version = String(next);
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Updated ${manifestFile} to version ${manifest.version}`);
  return manifest.version;
}

function getHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      files = files.concat(getHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function getServedHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        ['node_modules', 'templates', 'translations', 'prompts', 'scripts', 'test', 'elonmusksimulator-main'].includes(entry.name)
      ) {
        continue;
      }
      files = files.concat(getServedHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function appendVersionToAssets(html, version) {
  const assetRegex = /(src|href|content)=("|')(?!https?:\/\/|\/\/|mailto:|#)([^"'>]+)(\2)/g;
  const extPattern = /\.(js|css|svg|png|jpe?g|webp|gif|json|ico)$/i;
  let result = html.replace(assetRegex, (m, attr, quote, url) => {
    // Skip anchors to other html pages
    if (url.endsWith('.html')) return m;
    const base = url.split(/[?#]/)[0];
    if (!extPattern.test(base)) return m;
    // Remove existing version query parameter if present
    const cleaned = url.replace(/[?&]v=\d+$/, '');
    const sep = cleaned.includes('?') ? '&' : '?';
    return `${attr}=${quote}${cleaned}${sep}v=${version}${quote}`;
  });
  result = result.replace(/lucide\.min\.js(?:\?v=\d+)?/g, `lucide.min.js?v=${version}`);
  result = result.replace(/prompts\.js(?:\?v=\d+)?/g, `prompts.js?v=${version}`);
  return result;
}

function updateBaseHref(html, href) {
  return html.replace(/<base\s+href="[^"]*"\s*\/?>(?=)/i, `<base href="${href}" />`);
}

function updateSiteUrl(html, siteUrl) {
  return html.replace(/__SITE_URL__/g, siteUrl);
}

function updateConfigFile(siteUrl) {
  const configPath = path.join(rootDir, 'src', 'config.js');
  let contents = fs.readFileSync(configPath, 'utf8');
  contents = contents.replace(/__SITE_URL__/g, siteUrl);
  fs.writeFileSync(configPath, contents);
  console.log(`Updated ${path.relative(rootDir, configPath)}`);
}

function updateRobotsFile(siteUrl) {
  const robotsPath = path.join(rootDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) return;
  let contents = fs.readFileSync(robotsPath, 'utf8');
  const sanitized = siteUrl.replace(/\/+$/, '');
  const line = `Sitemap: ${sanitized}/sitemap.xml`;
  if (/^Sitemap:/m.test(contents)) {
    contents = contents.replace(/^Sitemap:.*/m, line);
  } else {
    contents += `\n${line}\n`;
  }
  fs.writeFileSync(robotsPath, contents);
  console.log(`Updated ${path.relative(rootDir, robotsPath)}`);
}

function gatherAssets() {
  const htmlFiles = getServedHtmlFiles(rootDir);
  const assetRegex = /(src|href|content)=("|')(?!https?:\/\/|\/\/|mailto:|#)([^"'>]+)(\2)/g;
  const extPattern = /\.(js|css|svg|png|jpe?g|webp|gif|json|ico)$/i;
  const assets = new Set(['/']);
  for (const file of htmlFiles) {
    const rel = path.relative(rootDir, file).replace(/\\/g, '/');
    assets.add(rel);
    if (['blog.html', 'pro.html', 'social.html'].includes(rel)) {
      assets.add(rel.replace(/\.html$/, ''));
    }
    const html = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = assetRegex.exec(html))) {
      let url = m[3];
      if (url.endsWith('.html')) continue;
      const base = url.split(/[?#]/)[0];
      if (!extPattern.test(base)) continue;
      if (url.startsWith('/')) url = url.slice(1);
      url = url.replace(/^\.\//, '');
      while (url.startsWith('../')) url = url.slice(3);
      assets.add(url);
    }
  }
  return Array.from(assets).sort();
}

function updateServiceWorker(version) {
  const swPath = path.join(rootDir, 'sw.js');
  let sw = fs.readFileSync(swPath, 'utf8');
  const assets = gatherAssets();
  const assetLines = assets.map((a) => `  '${a}'`).join(',\n');
  sw = sw.replace(/const CACHE_VERSION = 'v\d+';/, `const CACHE_VERSION = 'v${version}';`);
  sw = sw.replace(/const ASSETS = \[[^\]]*\]/s, `const ASSETS = [\n${assetLines}\n]`);
  fs.writeFileSync(swPath, sw);
  console.log(`Updated ${path.relative(rootDir, swPath)}`);
}

function updateHtmlFiles(version, baseHref, siteUrl) {
  const htmlFiles = getHtmlFiles(rootDir);
  for (const file of htmlFiles) {
    const original = fs.readFileSync(file, 'utf8');
    let updated = appendVersionToAssets(original, version);
    if (baseHref) {
      updated = updateBaseHref(updated, baseHref);
    }
    if (siteUrl) {
      updated = updateSiteUrl(updated, siteUrl);
    }
    fs.writeFileSync(file, updated);
    console.log(`Updated ${path.relative(rootDir, file)}`);
  }
}

const prompts = buildPrompts();
const output = `// Auto-generated by scripts/build-prompts.js\nwindow.prompts = ${JSON.stringify(
  prompts,
  null,
  2
)};\n`;
fs.writeFileSync(outputFile, output);
console.log(`Wrote ${outputFile}`);

const version = bumpManifestVersion();
const baseHref = process.env.BASE_HREF;
const siteUrl = process.env.SITE_URL || 'https://prompterai.space';
updateHtmlFiles(version, baseHref, siteUrl);
updateConfigFile(siteUrl);
updateRobotsFile(siteUrl);
updateServiceWorker(version);
