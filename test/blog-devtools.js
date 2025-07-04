const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--ignore-certificate-errors'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => {
    errors.push('Page error: ' + err.message);
  });
  const requests = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push('Console error: ' + msg.text());
    }
  });
  page.on('requestfailed', req => {
    errors.push('Request failed: ' + req.url() + ' ' + req.failure().errorText);
  });
  page.on('requestfinished', req => {
    requests.push(req.url());
  });
  await page.goto('http://localhost:8000/blog.html', {waitUntil: 'networkidle0'});
  await new Promise(r => setTimeout(r, 3000));
  console.log('loaded');
  ['http://localhost:8000/src/blog.js',
   'http://localhost:8000/src/init-app.js',
   'http://localhost:8000/firebase.config.json'].forEach(url => {
    if (!requests.some(r => r.startsWith(url))) {
      errors.push('Missing request: ' + url);
    }
  });
  errors.forEach(e => console.log(e));
  await browser.close();
})();
