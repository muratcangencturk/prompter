// Increment the cache name whenever this file changes so old caches are cleared
const CACHE_NAME = 'elon-sim-cache-v3';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'main.js',
  'questions.json',
  'new_questions_batch1.json',
  'new_questions_batch2.json',
  'new_questions_batch3.json',
  'new_questions_batch4.json',
  'new_questions_batch5.json',
  'tech.json',
  'tech_tr.json',
  'politics.json',
  'politics_tr.json',
  'misc.json',
  'misc_tr.json',
  'elon_musk_cartoon.png',
  'elon_musk_happy.png',
  'elon_musk_angry.png',
  'manifest.json'
];

self.addEventListener('install', event => {
  console.log('Service worker installed, skipping waiting');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activated, claiming clients');
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.mode === 'navigate' || request.url.endsWith('.js')) {
    // Prefer the network for navigation and script requests
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    // For other assets, use cache first and update from the network if missing
    event.respondWith(
      caches.match(request).then(cached => {
        return (
          cached ||
          fetch(request).then(response => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
            return response;
          })
        );
      })
    );
  }
});
