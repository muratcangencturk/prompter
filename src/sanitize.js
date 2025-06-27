import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@2.4.4/dist/purify.es.js';
export const sanitizeHTML = (html) => DOMPurify.sanitize(html);
export const setSanitizedHTML = (el, html) => {
  el.innerHTML = DOMPurify.sanitize(html);
};
