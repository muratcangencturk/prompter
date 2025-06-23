import { initializeApp } from './ui.js';

let currentManifestVersion = null;

const fetchManifestVersion = async () => {
  try {
    const link = document.querySelector('link[rel="manifest"]');
    if (!link) return null;
    const url = link.href; // ensures correct path under <base>
    const sep = url.includes('?') ? '&' : '?';
    const res = await fetch(`${url}${sep}v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.version;
  } catch {
    return null;
  }
};

const startVersionCheck = async () => {
  currentManifestVersion = await fetchManifestVersion();
  setInterval(async () => {
    const newVersion = await fetchManifestVersion();
    if (
      newVersion &&
      currentManifestVersion &&
      newVersion !== currentManifestVersion
    ) {
      location.reload();
    }
  }, 5 * 60 * 1000);
};

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
  startVersionCheck();
});

const clearServiceWorkersAndCaches = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => {
        for (const reg of regs) {
          reg.unregister().catch(() => {});
        }
      })
      .catch(() => {});
  }

  if ('caches' in window) {
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {});
  }
};

clearServiceWorkersAndCaches();
