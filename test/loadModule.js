const fs = require('fs');
const path = require('path');
const os = require('os');

async function loadModule(srcRelative) {
  const srcPath = path.resolve(__dirname, '..', srcRelative);
  let code = fs.readFileSync(srcPath, 'utf8');
  const repl = {
    'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js':
      'file://' + path.resolve(__dirname, 'mocks/firestore.js').replace(/\\/g, '/'),
    './firebase.js':
      'file://' + path.resolve(__dirname, 'mocks/firebase.js').replace(/\\/g, '/'),
    './notifications.js':
      'file://' + path.resolve(__dirname, 'mocks/notifications.js').replace(/\\/g, '/'),
  };
  for (const [orig, rep] of Object.entries(repl)) {
    code = code.replace(orig, rep);
  }
  const tmp = path.join(os.tmpdir(), 'tmp_' + path.basename(srcRelative));
  fs.writeFileSync(tmp, code);
  return import('file://' + tmp + '?v=' + Date.now());
}

module.exports = { loadModule };
