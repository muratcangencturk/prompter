let CACHE_NAME = 'prompter-v1';

async function updateCacheName() {
  try {
    const res = await fetch('./manifest.json', {cache: 'no-cache'});
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
  './lucide.min.js',
  './src/main.js',
  './icons/logo.svg',
  './css/theme-dark.css',
  './css/theme-light.css',
  './prompts/en/inspiring.json',
  './prompts/en/mindBlowing.json',
  './prompts/en/productivity.json',
  './prompts/en/educational.json',
  './prompts/en/crazy.json',
  './prompts/en/perspective.json',
  './prompts/en/ai.json',
  './prompts/en/ideas.json',
  './prompts/en/video.json',
  './prompts/en/image.json',
  './prompts/en/hellprompts.json',
  './prompts/tr/inspiring.json',
  './prompts/tr/mindBlowing.json',
  './prompts/tr/productivity.json',
  './prompts/tr/educational.json',
  './prompts/tr/crazy.json',
  './prompts/tr/perspective.json',
  './prompts/tr/ai.json',
  './prompts/tr/ideas.json',
  './prompts/tr/video.json',
  './prompts/tr/image.json',
  './prompts/tr/hellprompts.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      await updateCacheName();
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
    })()
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      await updateCacheName();
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
