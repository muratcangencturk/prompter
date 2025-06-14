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
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
