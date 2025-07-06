const CACHE_VERSION = 'v91';
const CACHE_NAME = `prompter-${CACHE_VERSION}`;
const ASSETS = [
  '/',
  '404',
  '404.html',
  'blog',
  'blog.html',
  'css/app.css?v=91',
  'css/tailwind.css?v=91',
  'css/theme-dark.css?v=91',
  'dist/auth.js?v=91',
  'dist/dm.js?v=91',
  'dist/init-app.js?v=91',
  'dist/main.js?v=91',
  'dist/profile.js?v=91',
  'dist/top-collectors.js?v=91',
  'dist/top-creators.js?v=91',
  'dist/top-prompts.js?v=91',
  'dist/user-page.js?v=91',
  'dm',
  'dm.html',
  'es/404',
  'es/404.html',
  'es/blog',
  'es/blog.html',
  'es/dm',
  'es/dm.html',
  'es/index',
  'es/index.html',
  'es/intro',
  'es/intro.html',
  'es/login',
  'es/login.html',
  'es/privacy',
  'es/privacy.html',
  'es/pro',
  'es/pro.html',
  'es/profile',
  'es/profile.html',
  'es/social',
  'es/social.html',
  'es/terms',
  'es/terms.html',
  'es/top',
  'es/top-collectors',
  'es/top-collectors.html',
  'es/top-creators',
  'es/top-creators.html',
  'es/top-prompts',
  'es/top-prompts.html',
  'es/top.html',
  'es/user',
  'es/user.html',
  'fr/404',
  'fr/404.html',
  'fr/blog',
  'fr/blog.html',
  'fr/dm',
  'fr/dm.html',
  'fr/index',
  'fr/index.html',
  'fr/intro',
  'fr/intro.html',
  'fr/login',
  'fr/login.html',
  'fr/privacy',
  'fr/privacy.html',
  'fr/pro',
  'fr/pro.html',
  'fr/profile',
  'fr/profile.html',
  'fr/social',
  'fr/social.html',
  'fr/terms',
  'fr/terms.html',
  'fr/top',
  'fr/top-collectors',
  'fr/top-collectors.html',
  'fr/top-creators',
  'fr/top-creators.html',
  'fr/top-prompts',
  'fr/top-prompts.html',
  'fr/top.html',
  'fr/user',
  'fr/user.html',
  'hi/404',
  'hi/404.html',
  'hi/blog',
  'hi/blog.html',
  'hi/dm',
  'hi/dm.html',
  'hi/index',
  'hi/index.html',
  'hi/intro',
  'hi/intro.html',
  'hi/login',
  'hi/login.html',
  'hi/privacy',
  'hi/privacy.html',
  'hi/pro',
  'hi/pro.html',
  'hi/profile',
  'hi/profile.html',
  'hi/social',
  'hi/social.html',
  'hi/terms',
  'hi/terms.html',
  'hi/top',
  'hi/top-collectors',
  'hi/top-collectors.html',
  'hi/top-creators',
  'hi/top-creators.html',
  'hi/top-prompts',
  'hi/top-prompts.html',
  'hi/top.html',
  'hi/user',
  'hi/user.html',
  'icons/logo.svg?v=91',
  'icons/whatsapp.svg?v=91',
  'index.html',
  'intro',
  'intro.html',
  'login',
  'login.html',
  'manifest.json?v=91',
  'privacy',
  'privacy.html',
  'pro',
  'pro.html',
  'profile',
  'profile.html',
  'social',
  'social.html',
  'space',
  'space.html',
  'src/auth.js?v=91',
  'src/dm.js?v=91',
  'src/init-app.js?v=91',
  'src/lucide-loader.js?v=91',
  'src/main.js?v=91',
  'src/profile.js?v=91',
  'src/top-collectors.js?v=91',
  'src/top-creators.js?v=91',
  'src/top-pro.js?v=91',
  'src/top-prompts.js?v=91',
  'src/top-supporters.js?v=91',
  'src/user-page.js?v=91',
  'src/version.js?v=91',
  'terms',
  'terms.html',
  'top',
  'top-collectors',
  'top-collectors.html',
  'top-creators',
  'top-creators.html',
  'top-prompts',
  'top-prompts.html',
  'top.html',
  'tr/404',
  'tr/404.html',
  'tr/blog',
  'tr/blog.html',
  'tr/dm',
  'tr/dm.html',
  'tr/index',
  'tr/index.html',
  'tr/intro',
  'tr/intro.html',
  'tr/login',
  'tr/login.html',
  'tr/privacy',
  'tr/privacy.html',
  'tr/pro',
  'tr/pro.html',
  'tr/profile',
  'tr/profile.html',
  'tr/social',
  'tr/social.html',
  'tr/terms',
  'tr/terms.html',
  'tr/top',
  'tr/top-collectors',
  'tr/top-collectors.html',
  'tr/top-creators',
  'tr/top-creators.html',
  'tr/top-prompts',
  'tr/top-prompts.html',
  'tr/top.html',
  'tr/user',
  'tr/user.html',
  'translations/ui/en.json?v=91',
  'translations/ui/es.json?v=91',
  'translations/ui/fr.json?v=91',
  'translations/ui/hi.json?v=91',
  'translations/ui/tr.json?v=91',
  'translations/ui/zh.json?v=91',
  'user',
  'user.html',
  'zh/404',
  'zh/404.html',
  'zh/blog',
  'zh/blog.html',
  'zh/dm',
  'zh/dm.html',
  'zh/index',
  'zh/index.html',
  'zh/intro',
  'zh/intro.html',
  'zh/login',
  'zh/login.html',
  'zh/privacy',
  'zh/privacy.html',
  'zh/pro',
  'zh/pro.html',
  'zh/profile',
  'zh/profile.html',
  'zh/social',
  'zh/social.html',
  'zh/terms',
  'zh/terms.html',
  'zh/top',
  'zh/top-collectors',
  'zh/top-collectors.html',
  'zh/top-creators',
  'zh/top-creators.html',
  'zh/top-prompts',
  'zh/top-prompts.html',
  'zh/top.html',
  'zh/user',
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
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (
          response.redirected ||
          (response.status >= 301 && response.status <= 308)
        ) {
          return fetch(response.url);
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('index.html');
          }
          return undefined;
        })
      )
  );
});
