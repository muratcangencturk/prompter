import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.6/+esm';
export const sanitizeHTML = (html) => DOMPurify.sanitize(html);
export const setSanitizedHTML = (el, html) => {
  el.innerHTML = DOMPurify.sanitize(html);
};
