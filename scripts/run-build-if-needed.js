#!/usr/bin/env node
const { execSync } = require('child_process');

function getChangedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
    encoding: 'utf8',
  });
  return output.split('\n').filter(Boolean);
}

function hasRelevantChanges(files) {
  return files.some(
    (f) =>
      f.endsWith('.html') ||
      f.startsWith('prompts/') ||
      (f.startsWith('src/') && f.endsWith('.js')) ||
      f === 'src/styles.css' ||
      f === 'tailwind.config.js'
  );
}

function hasCssChanges(files) {
  return files.some((f) => f === 'src/styles.css' || f === 'tailwind.config.js');
}

const changed = getChangedFiles();
if (hasRelevantChanges(changed)) {
  const cssChanged = hasCssChanges(changed);
  console.log(
    'HTML, prompts, JavaScript, or CSS changes detected. Running build...'
  );
  if (cssChanged) {
    execSync('npm run build:css', { stdio: 'inherit' });
  }
  execSync('npm run build', { stdio: 'inherit' });
}
