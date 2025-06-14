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
  './tr/index.html',
  './tailwind.js',
  './lucide.min.js',
  './src/main.js',
  './icons/logo.svg',
  './css/app.css',
  './css/theme-dark.css',
  './css/theme-light.css',
  './prompts/en/ai.json',
  './prompts/en/crazy.json',
  './prompts/en/educational.json',
  './prompts/en/hellprompts.json',
  './prompts/en/ideas.json',
  './prompts/en/image.json',
  './prompts/en/inspiring.json',
  './prompts/en/mindBlowing.json',
  './prompts/en/perspective.json',
  './prompts/en/productivity.json',
  './prompts/en/video.json',
  './prompts/es/ai.json',
  './prompts/es/crazy.json',
  './prompts/es/educational.json',
  './prompts/es/hellprompts.json',
  './prompts/es/ideas.json',
  './prompts/es/image.json',
  './prompts/es/inspiring.json',
  './prompts/es/mindBlowing.json',
  './prompts/es/perspective.json',
  './prompts/es/productivity.json',
  './prompts/es/video.json',
  './prompts/tr/ai.json',
  './prompts/tr/crazy.json',
  './prompts/tr/educational.json',
  './prompts/tr/hellprompts.json',
  './prompts/tr/ideas.json',
  './prompts/tr/image.json',
  './prompts/tr/inspiring.json',
  './prompts/tr/mindBlowing.json',
  './prompts/tr/perspective.json',
  './prompts/tr/productivity.json',
  './prompts/tr/video.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      await updateCacheName();
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
      self.skipWaiting();
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
      self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      // Fetch from network and conditionally cache the result
      const networkFetch = fetch(event.request).then((response) => {
        // Only cache GET requests from our own origin
        if (
          event.request.method === 'GET' &&
          new URL(event.request.url).origin === self.location.origin
        ) {
          cache.put(event.request, response.clone());
        }
        return response;
      });

      if (cachedResponse) {
        event.waitUntil(networkFetch.catch(() => {}));
        return cachedResponse;
      }

      return networkFetch;
    })()
  );
});
