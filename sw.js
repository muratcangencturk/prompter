const CACHE_NAME = 'prompter-v3';
const ASSETS = [
  './',
  './index.html',
  './tailwind.js',
  './prompts.js',
  './lucide.min.js',
  './icons/logo.svg',
  './css/theme-dark.css',
  './css/theme-light.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
