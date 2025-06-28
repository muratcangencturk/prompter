const CACHE_VERSION = 'v2';
const CACHE_NAME = `prompter-${CACHE_VERSION}`;
const ASSETS = [
  '/',
  'index.html',
  // TODO: generate this list automatically during the build process
  'blog.html',
  'pro.html',
  'social.html',
  'css/tailwind.css',
  'css/app.css',
  'css/theme-dark.css',
  'css/theme-light.css',
  'src/init-app.js',
  'src/version.js',
  'src/lucide-loader.js',
  'lucide.min.js',
  'manifest.json',
  'icons/logo.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const cleanup = async () => {
    await self.clients.claim();
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    );
    const clients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    clients.forEach((client) => {
      client.navigate(client.url);
    });
  };
  event.waitUntil(cleanup());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('index.html');
          }
          return undefined;
        })
    )
  );
});
