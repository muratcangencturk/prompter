import { initializeApp } from './ui.js';

document.addEventListener('DOMContentLoaded', initializeApp);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(console.error);
  });
}
