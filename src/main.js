import { initializeApp } from './ui.js';


const hideEmptyAdSlots = () => {
  const slots = document.querySelectorAll('.ad-slot');
  slots.forEach((slot) => {
    const hasAd = slot.querySelector('iframe, img, ins');
    if (!hasAd || slot.offsetHeight < 5) {
      slot.remove();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.stopInit) return;
  initializeApp();
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  setTimeout(hideEmptyAdSlots, 4000);
});

