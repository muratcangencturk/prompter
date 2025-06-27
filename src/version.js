// Version and cache management utilities
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

export const startVersionCheck = async () => {
  currentManifestVersion = await fetchManifestVersion();
  setInterval(async () => {
    const newVersion = await fetchManifestVersion();
    if (
      newVersion &&
      currentManifestVersion &&
      newVersion !== currentManifestVersion
    ) {
      if (!document.getElementById('update-banner')) {
        const banner = document.createElement('div');
        banner.id = 'update-banner';
        banner.textContent = 'A new version is available.';
        banner.style.cssText =
          'background:#fef08a;color:#000;padding:8px;text-align:center;font-size:14px;position:sticky;top:0;z-index:1000;';
        const btn = document.createElement('button');
        btn.textContent = 'Refresh';
        btn.style.cssText =
          'margin-left:8px;text-decoration:underline;font-weight:bold;background:transparent;border:none;cursor:pointer;color:inherit;';
        btn.addEventListener('click', () => {
          clearServiceWorkersAndCaches();
          location.reload();
        });
        banner.appendChild(btn);
        document.body.prepend(banner);
      }
    }
  }, 5 * 60 * 1000);
};

export const clearServiceWorkersAndCaches = () => {
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

// automatically run when imported
startVersionCheck();
