export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Redirect only the root path
    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return fetch(request);
    }

    // Country code from Cloudflare header, empty string if unavailable
    const country = (request.headers.get('cf-ipcountry') || '').toUpperCase();

    // Map of ISO country codes to language directories
    const routes = new Map([
      ['TR', '/tr/'],
      ['IN', '/hi/'],
      // Spanish speaking countries
      ['ES', '/es/'],
      ['MX', '/es/'],
      ['AR', '/es/'],
      ['CO', '/es/'],
      // French
      ['FR', '/fr/'],
      ['BE', '/fr/'],
      // Chinese
      ['CN', '/zh/'],
    ]);

    const target = routes.get(country) || '/en/';

    const redirectUrl = new URL(target, url.origin);
    // Return 302 redirect to the appropriate language path
    return Response.redirect(redirectUrl.toString(), 302);
  },
};
