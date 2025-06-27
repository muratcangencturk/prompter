function addScript(src, onLoad) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  if (onLoad) s.addEventListener('load', onLoad, { once: true });
  document.head.appendChild(s);
  return s;
}

function fetchWithTimeout(url, timeout = 500) {
  return Promise.race([
    fetch(url, { method: 'HEAD', mode: 'no-cors' }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
  ]);
}

export function loadWithFallback(primary, local) {
  let cdnScript = null;
  let localScript = null;
  let resolveLoad;
  const loadPromise = new Promise((resolve) => {
    resolveLoad = resolve;
  });

  const addLocal = () => {
    if (!localScript) {
      localScript = document.createElement('script');
      localScript.src = local;
      localScript.async = true;
      localScript.addEventListener('load', resolveLoad, { once: true });
      document.head.appendChild(localScript);
    }
  };

  if (!primary || !navigator.onLine) {
    addLocal();
    return { cdn: null, local: localScript, loadPromise };
  }

  let fallbackTimer = setTimeout(() => {
    addLocal();
    fallbackTimer = null;
  }, 500);

  fetchWithTimeout(primary).catch(() => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    addLocal();
  });

  cdnScript = addScript(primary, () => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    resolveLoad();
  });

  cdnScript.onerror = () => {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    addLocal();
  };

  return { cdn: cdnScript, local: localScript, loadPromise };
}

window.lucideScripts = loadWithFallback(
  'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js?v=65',
  'lucide.min.js?v=65',
);

window.lucideScripts.loadPromise.finally(() => {
  const appContainer = document.getElementById('app-container');
  const loadingScreen = document.getElementById('loading-screen');
  if (appContainer) appContainer.style.visibility = 'visible';
  if (loadingScreen) loadingScreen.classList.add('hidden');
});
