export function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    const safeUrl = url.replace(/"/g, '&quot;');
    return `<a href="${safeUrl}" target="_blank" class="underline">${url}</a>`;
  });
}
