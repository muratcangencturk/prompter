const fs = require('fs');
const path = require('path');

const promptsDir = path.join(__dirname, '..', 'prompts');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function flatten(parts) {
  return parts.reduce((acc, arr) => acc.concat(arr), []);
}

function validate() {
  const languages = fs
    .readdirSync(promptsDir)
    .filter((p) => fs.statSync(path.join(promptsDir, p)).isDirectory());

  const categories = new Set();
  languages.forEach((lang) => {
    const langDir = path.join(promptsDir, lang);
    fs.readdirSync(langDir)
      .filter((f) => f.endsWith('.json'))
      .forEach((f) => categories.add(f));
  });

  let valid = true;

  categories.forEach((cat) => {
    const partsByLang = {};

    languages.forEach((lang) => {
      const filePath = path.join(promptsDir, lang, cat);
      if (!fs.existsSync(filePath)) {
        console.error(`Missing file ${lang}/${cat}`);
        valid = false;
        return;
      }

      const json = readJSON(filePath);
      if (!Array.isArray(json.parts)) {
        console.error(`Invalid or missing parts in ${lang}/${cat}`);
        valid = false;
        return;
      }
      partsByLang[lang] = json.parts;

      const flat = flatten(json.parts);
      const seen = new Set();
      const dups = new Set();
      flat.forEach((p) => {
        if (seen.has(p)) dups.add(p);
        seen.add(p);
      });
      if (dups.size > 0) {
        console.error(`Duplicate entries in ${lang}/${cat}: ${Array.from(dups).join(', ')}`);
        valid = false;
      }
    });

    const counts = Object.fromEntries(
      Object.entries(partsByLang).map(([lang, parts]) => [lang, parts.length])
    );
    const uniqueCounts = new Set(Object.values(counts));
    if (uniqueCounts.size > 1) {
      console.error(
        `Part count mismatch for ${cat}: ${Object.entries(counts)
          .map(([l, c]) => `${l}=${c}`)
          .join(', ')}`
      );
      valid = false;
    }
  });

  if (!valid) {
    console.error('Prompt validation failed.');
    process.exit(1);
  } else {
    console.log('All prompt files validated.');
  }
}

if (require.main === module) {
  validate();
}

module.exports = validate;
