#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'node_modules');

if (!fs.existsSync(modulesDir)) {
  console.error('Dependencies missing. Run "npm install" before "npm test".');
  process.exit(1);
}
