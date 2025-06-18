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
      (f.startsWith('src/') && f.endsWith('.js'))
  );
}

const changed = getChangedFiles();
if (hasRelevantChanges(changed)) {
  console.log('HTML, prompts, or JavaScript changes detected. Running build...');
  execSync('npm run build', { stdio: 'inherit' });
}
