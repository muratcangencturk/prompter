const assert = require('assert');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeHTML = (html) => DOMPurify.sanitize(html);

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+?)([).]+)?(?=\s|$)/g;
  const html = text.replace(urlRegex, (match, url, punctuation = '') => {
    const safeUrl = url.replace(/"/g, '&quot;');
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="underline">${url}</a>${punctuation}`;
  });
  return sanitizeHTML(html);
}

function runTest(name, fn) {
  try {
    fn();
    console.log(`\u2713 ${name}`);
  } catch (err) {
    console.error(`\u2717 ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

runTest('sanitizeHTML removes script tags', () => {
  const malicious = '<div>hello<script>alert(1)</script></div>';
  const clean = sanitizeHTML(malicious);
  assert(!/script/i.test(clean));
});

runTest('sanitizeHTML strips event handlers', () => {
  const malicious = '<img src="x" onerror="alert(1)">';
  const clean = sanitizeHTML(malicious);
  assert(!/onerror/i.test(clean));
});

runTest('linkify sanitizes malicious strings', () => {
  const malicious = 'visit https://example.com <img src=x onerror=alert(1)>';
  const clean = linkify(malicious);
  assert(!/onerror/i.test(clean) && !/script/i.test(clean));
});

runTest('linkify adds rel="noopener noreferrer" to links', () => {
  const text = 'visit https://example.com';
  const result = linkify(text);
  assert(/rel="noopener noreferrer"/.test(result));
});

runTest('linkify excludes trailing punctuation from URLs', () => {
  const text = 'visit https://example.com).';
  const result = linkify(text);
  assert(/https:\/\/example\.com<\/a>\)\./.test(result));
});
