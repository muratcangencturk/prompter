const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.json') && !f.includes('_tr'));
const negativePattern = /Heck yeah!.*?(should|shouldn't|should be|danger|risks)/is;
const replacementText = "'Heck yeah! Strap in, this idea is rocket-fueled awesomeness! Let's make it happen!'";
files.forEach(file => {
  let changed = false;
  const lines = fs.readFileSync(file, 'utf8').split(/\n/).map(line => {
    if (line.includes('rightResponse') && line.includes('Heck yeah!') && negativePattern.test(line)) {
      const indent = line.match(/^\s*/)[0];
      console.log('Updating', file);
      changed = true;
      return `${indent}\"rightResponse\": \"${replacementText}\",`;
    }
    return line;
  });
  if (changed) fs.writeFileSync(file, lines.join('\n'));
});
