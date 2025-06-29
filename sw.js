const CACHE_VERSION = 'v74';
const CACHE_NAME = `prompter-${CACHE_VERSION}`;
const ASSETS = [
  '/',
  '404.html',
  'blog',
  'blog.html',
  'css/app.css?v=74',
  'css/tailwind.css?v=74',
  'css/theme-dark.css?v=74',
  'dist/auth.js?v=74',
  'dist/dm.js?v=74',
  'dist/init-app.js?v=74',
  'dist/main.js?v=74',
  'dist/profile.js?v=74',
  'dist/top-collectors.js?v=74',
  'dist/top-creators.js?v=74',
  'dist/top-prompts.js?v=74',
  'dist/user-page.js?v=74',
  'dm.html',
  'es/404.html',
  'es/blog.html',
  'es/dm.html',
  'es/index.html',
  'es/intro.html',
  'es/login.html',
  'es/privacy.html',
  'es/pro.html',
  'es/profile.html',
  'es/social.html',
  'es/terms.html',
  'es/top-collectors.html',
  'es/top-creators.html',
  'es/top-prompts.html',
  'es/top.html',
  'es/user.html',
  'fr/404.html',
  'fr/blog.html',
  'fr/dm.html',
  'fr/index.html',
  'fr/intro.html',
  'fr/login.html',
  'fr/privacy.html',
  'fr/pro.html',
  'fr/profile.html',
  'fr/social.html',
  'fr/terms.html',
  'fr/top-collectors.html',
  'fr/top-creators.html',
  'fr/top-prompts.html',
  'fr/top.html',
  'fr/user.html',
  'hi/404.html',
  'hi/blog.html',
  'hi/dm.html',
  'hi/index.html',
  'hi/intro.html',
  'hi/login.html',
  'hi/privacy.html',
  'hi/pro.html',
  'hi/profile.html',
  'hi/social.html',
  'hi/terms.html',
  'hi/top-collectors.html',
  'hi/top-creators.html',
  'hi/top-prompts.html',
  'hi/top.html',
  'hi/user.html',
  'icons/logo.svg?v=74',
  'icons/whatsapp.svg?v=74',
  'index.html',
  'intro.html',
  'login.html',
  'manifest.json?v=74',
  'privacy.html',
  'pro',
  'pro.html',
  'profile.html',
  'social',
  'social.html',
  'space.html',
  'src/auth.js?v=74',
  'src/dm.js?v=74',
  'src/init-app.js?v=74',
  'src/lucide-loader.js?v=74',
  'src/main.js?v=74',
  'src/profile.js?v=74',
  'src/top-collectors.js?v=74',
  'src/top-creators.js?v=74',
  'src/top-pro.js?v=74',
  'src/top-prompts.js?v=74',
  'src/top-supporters.js?v=74',
  'src/user-page.js?v=74',
  'src/version.js?v=74',
  'terms.html',
  'top-collectors.html',
  'top-creators.html',
  'top-prompts.html',
  'top.html',
  'tr/404.html',
  'tr/blog.html',
  'tr/dm.html',
  'tr/index.html',
  'tr/intro.html',
  'tr/login.html',
  'tr/privacy.html',
  'tr/pro.html',
  'tr/profile.html',
  'tr/social.html',
  'tr/terms.html',
  'tr/top-collectors.html',
  'tr/top-creators.html',
  'tr/top-prompts.html',
  'tr/top.html',
  'tr/user.html',
  'translations/ui/en.json?v=74',
  'translations/ui/es.json?v=74',
  'translations/ui/fr.json?v=74',
  'translations/ui/hi.json?v=74',
  'translations/ui/tr.json?v=74',
  'translations/ui/zh.json?v=74',
  'user.html',
  'zh/404.html',
  'zh/blog.html',
  'zh/dm.html',
  'zh/index.html',
  'zh/intro.html',
  'zh/login.html',
  'zh/privacy.html',
  'zh/pro.html',
  'zh/profile.html',
  'zh/social.html',
  'zh/terms.html',
  'zh/top-collectors.html',
  'zh/top-creators.html',
  'zh/top-prompts.html',
  'zh/top.html',
  'zh/user.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((err) => console.error('Failed to cache assets', err))
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
