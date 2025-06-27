import { sanitizeHTML } from './sanitize.js';
export function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const html = text.replace(urlRegex, (url) => {
    const safeUrl = url.replace(/"/g, '&quot;');
    return `<a href="${safeUrl}" target="_blank" class="underline">${url}</a>`;
  });
  return sanitizeHTML(html);
}
