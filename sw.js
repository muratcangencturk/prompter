let CACHE_NAME = 'prompter-v1';

async function updateCacheName() {
  try {
    const res = await fetch('./manifest.json', { cache: 'no-cache' });
    const manifest = await res.json();
    if (manifest.version) {
      CACHE_NAME = `prompter-v${manifest.version}`;
    }
  } catch (e) {
    // ignore and use default
  }
}
const ASSETS = [
  './',
  './index.html',
  './tailwind.js',
  './prompts.js',
  './lucide.min.js',
  './src/main.js',
  './icons/logo.svg',
  './css/theme-dark.css',
  './css/theme-light.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      await updateCacheName();
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await updateCacheName();
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
