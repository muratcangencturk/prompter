import { initializeApp } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

if ('serviceWorker' in navigator) {
  // Unregister any previously installed service workers so the site
  // always loads the latest files from the network.
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => {
      for (const reg of regs) {
        reg.unregister().catch(() => {});
      }
    })
    .catch(() => {});
}
