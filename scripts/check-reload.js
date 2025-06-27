const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

(async () => {
  const server = spawn('npx', ['http-server', '-c-1', '-p', '8000']);
  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      if (data.toString().includes('Available on')) resolve();
    });
  });
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  let loads = 0;
  page.on('load', () => loads++);
  await page.goto('http://localhost:8000/index.html');
  await new Promise(r => setTimeout(r, 3000));
  await browser.close();
  server.kill();
  console.log('Load count:', loads);
})();
