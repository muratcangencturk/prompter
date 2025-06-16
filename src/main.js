import { initializeApp } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(console.error);
  });
  // Commented out to prevent automatic page refresh when the service worker
  // activates. Reload manually if you want to update the cached assets.
  // navigator.serviceWorker.addEventListener('controllerchange', () => {
  //   window.location.reload();
  // });
}
