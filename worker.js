export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── /api/odds  →  proxy seguro a The Odds API, con cache de edge ──────
    if (url.pathname === '/api/odds') {
      const sport    = url.searchParams.get('sport')      || 'basketball_nba';
      const regions  = url.searchParams.get('regions')    || 'us';
      const markets  = url.searchParams.get('markets')    || 'h2h,totals,spreads';
      const format   = url.searchParams.get('oddsFormat') || 'decimal';

      // TTL del cache en segundos. 300s = 5 min.
      // No importa cuántos usuarios abran la app dentro de esa ventana:
      // solo se hace 1 request real a The Odds API.
      const CACHE_TTL = 300;

      // Cache key normalizada — solo depende de los parámetros que importan.
      const cacheKeyUrl = new URL(request.url);
      cacheKeyUrl.search = `?sport=${sport}&regions=${regions}&markets=${markets}&oddsFormat=${format}`;
      const cacheKey = new Request(cacheKeyUrl.toString(), { method: 'GET' });

      const cache = caches.default;

      // 1. ¿Está en cache de edge?
      let cached = await cache.match(cacheKey);
      if (cached) {
        const res = new Response(cached.body, cached);
        res.headers.set('X-Cache', 'HIT');
        return res;
      }

      // 2. No está en cache → llamar a The Odds API
      const apiUrl =
        `https://api.the-odds-api.com/v4/sports/${sport}/odds/` +
        `?apiKey=${env.ODDS_API_KEY}` +
        `&regions=${regions}&markets=${markets}&oddsFormat=${format}`;

      try {
        const resp = await fetch(apiUrl);
        const body = await resp.text();

        const response = new Response(body, {
          status: resp.status,
          headers: {
            'Content-Type':                'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control':                `public, max-age=${CACHE_TTL}`,
            'X-Cache':                      'MISS',
          },
        });

        // Solo cachear respuestas exitosas — un error o "out of credits"
        // no debe quedar pegado por 5 minutos.
        if (resp.ok) {
          ctx.waitUntil(cache.put(cacheKey, response.clone()));
        }

        return response;
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 502,
          headers: {
            'Content-Type':                'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // ── Sirve index.html desde GitHub (comportamiento original) ───────────
    const htmlUrl  = 'https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/index.html';
    const response = await fetch(htmlUrl, {
      cf: { cacheEverything: false },
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
    });
    const html = await response.text();
    return new Response(html, {
      headers: {
        'Content-Type':  'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Deploy':      Date.now().toString(),
      },
    });
  },
};
