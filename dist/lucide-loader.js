"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadWithFallback = loadWithFallback;
function addScript(src, onLoad) {
  var s = document.createElement('script');
  s.src = src;
  s.async = true;
  if (onLoad) s.addEventListener('load', onLoad, {
    once: true
  });
  document.head.appendChild(s);
  return s;
}
function fetchWithTimeout(url) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  return Promise.race([fetch(url, {
    method: 'HEAD',
    mode: 'no-cors'
  }), new Promise(function (_, reject) {
    return setTimeout(function () {
      return reject(new Error('timeout'));
    }, timeout);
  })]);
}
function loadWithFallback(primary, local) {
  var cdnScript = null;
  var localScript = null;
  var resolveLoad;
  var loadPromise = new Promise(function (resolve) {
    resolveLoad = resolve;
  });
  var addLocal = function addLocal() {
    if (!localScript) {
      localScript = document.createElement('script');
      localScript.src = local;
      localScript.async = true;
      localScript.addEventListener('load', resolveLoad, {
        once: true
      });
      document.head.appendChild(localScript);
    }
  };
  if (!primary || !navigator.onLine) {
    addLocal();
    return {
      cdn: null,
      local: localScript,
      loadPromise: loadPromise
    };
  }
  var fallbackTimer = setTimeout(function () {
    addLocal();
    fallbackTimer = null;
  }, 500);
  fetchWithTimeout(primary)["catch"](function () {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    addLocal();
  });
  cdnScript = addScript(primary, function () {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    resolveLoad();
  });
  cdnScript.onerror = function () {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    addLocal();
  };
  return {
    cdn: cdnScript,
    local: localScript,
    loadPromise: loadPromise
  };
}
window.lucideScripts = loadWithFallback('https://unpkg.com/lucide@latest/dist/umd/lucide.min.js?v=66', 'lucide.min.js?v=66');
window.lucideScripts.loadPromise["finally"](function () {
  var appContainer = document.getElementById('app-container');
  var loadingScreen = document.getElementById('loading-screen');
  if (appContainer) appContainer.style.visibility = 'visible';
  if (loadingScreen) loadingScreen.classList.add('hidden');
});
