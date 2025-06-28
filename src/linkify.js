import { sanitizeHTML } from './sanitize.js';
export function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+?)([).]+)?(?=\s|$)/g;
  const html = text.replace(urlRegex, (match, url, punctuation = '') => {
    const safeUrl = url.replace(/"/g, '&quot;');
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="underline">${url}</a>${punctuation}`;
  });
  return sanitizeHTML(html);
}
