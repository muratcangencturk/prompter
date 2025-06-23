self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const cleanup = async () => {
    await self.clients.claim();
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch {}

    try {
      await self.registration.unregister();
    } catch {}

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
