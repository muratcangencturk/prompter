(() => {
  // Redirect only when visiting the root path
  if (location.pathname !== '/' && location.pathname !== '/index.html') {
    return;
  }

  // Map the first part of navigator.language to language directories
  const routes = {
    tr: '/tr/',
    hi: '/hi/',
    es: '/es/',
    fr: '/fr/',
    zh: '/zh/',
  };

  // Normalize the browser language to lower case
  const lang = (navigator.language || '').toLowerCase();
  const prefix = lang.slice(0, 2);

  const target = routes[prefix] || '/';

  // Avoid redirect loops by checking current path
  if (location.pathname !== target) {
    // Use replace so the redirect doesn't create a history entry
    location.replace(target);
  }
})();
