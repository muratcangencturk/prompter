const fs = require('fs');
const path = require('path');

const swPath = path.resolve(__dirname, '..', 'sw.js');
const swText = fs.readFileSync(swPath, 'utf8');

describe('service worker asset list', () => {
  const assets = [
    'tech.json',
    'tech_tr.json',
    'politics.json',
    'politics_tr.json',
    'misc.json',
    'misc_tr.json'
  ];

  test('includes category question files', () => {
    assets.forEach(file => {
      expect(swText).toContain(`'${file}'`);
    });
  });
});
