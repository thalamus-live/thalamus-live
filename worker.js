export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Verificación de dominio TikTok (archivo de firma) ───────────────────
    if (url.pathname === '/tiktok4pwHmljmTw12x8u6Ix0Td2oMJseH8Ij5.txt') {
      return new Response('tiktok-developers-site-verification=4pwHmljmTw12x8u6Ix0Td2oMJseH8Ij5', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // ── Signals KV sync (Esquina Radar cloud history) ────────────────────────
    if (url.pathname.startsWith('/signals/')) {
      return handleSignals(request, env, url);
    }

    // ── TikTok publishing (Esquina Radar "Publicación en TikTok") ───────────
    if (url.pathname.startsWith('/tiktok/')) {
      return handleTikTok(request, env, url);
    }

    // ── /api/odds → proxy seguro a The Odds API, con cache de edge ──────────
    if (url.pathname === '/api/odds') {
      const sport   = url.searchParams.get('sport')   || 'basketball_nba';
      const regions = url.searchParams.get('regions') || 'us';
      const markets = url.searchParams.get('markets') || 'h2h,totals,spreads';
      const format  = url.searchParams.get('oddsFormat') || 'decimal';

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
      const ODDS_KEY = env.ODDS_API_KEY || 'aefdb7968b5b74e09753c07860ad0f14';
      const apiUrl =
        `https://api.the-odds-api.com/v4/sports/${sport}/odds/` +
        `?apiKey=${ODDS_KEY}` +
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
    // ── /api/af-odds → proxy seguro a API-Football /odds/live ───────────────
    // Soporta: /api/af-odds?fixture=ID&bet=ID  (cuotas en vivo de un partido)
    //          /api/af-odds?action=bookmakers    (lista de casas disponibles)
    //          /api/af-odds?action=bets           (lista de mercados disponibles)
    //          /api/af-odds?action=live-fixtures  (partidos en vivo con cuotas)
    if (url.pathname === '/api/af-odds') {
      const AF_KEY = '60ca2e420b5bfdfdba95028fc079f507';
      const AF_BASE = 'https://v3.football.api-sports.io';
      const cors = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

      if (request.method === 'OPTIONS') return new Response(null, { headers: { ...cors } });

      const action = url.searchParams.get('action');
      const fixtureId = url.searchParams.get('fixture');
      const betId = url.searchParams.get('bet');

      let afUrl;
      if (action === 'bookmakers') {
        afUrl = `${AF_BASE}/odds/bookmakers`;
      } else if (action === 'bets') {
        afUrl = `${AF_BASE}/odds/bets`;
      } else if (action === 'live-fixtures') {
        afUrl = `${AF_BASE}/odds/live`;
      } else if (fixtureId) {
        afUrl = `${AF_BASE}/odds/live?fixture=${fixtureId}${betId ? `&bet=${betId}` : ''}`;
      } else {
        return new Response(JSON.stringify({ error: 'Missing fixture or action param' }), { status: 400, headers: cors });
      }

      try {
        const resp = await fetch(afUrl, {
          headers: { 'x-apisports-key': AF_KEY }
        });
        const body = await resp.text();
        return new Response(body, { status: resp.status, headers: cors });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: cors });
      }
    }


    // ── /api/pinnacle → proxy a Pinnacle API pública ─────────────────────────
    // /api/pinnacle?action=sports                    → lista deportes
    // /api/pinnacle?action=leagues&sport=29          → ligas de fútbol
    // /api/pinnacle?action=matchups&league=ID        → partidos + specials
    // /api/pinnacle?action=markets&matchup=ID        → cuotas de un partido
    if (url.pathname === '/api/pinnacle') {
      const PINN_KEY  = 'CmX2KcMrXuFmNg6YFbmTxE0y9CIrOi0R';
      const PINN_BASE = 'https://guest.api.arcadia.pinnacle.com/0.1';
      const cors = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      };
      if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

      const action  = url.searchParams.get('action');
      const sport   = url.searchParams.get('sport') || '29';
      const league  = url.searchParams.get('league');
      const matchup = url.searchParams.get('matchup');

      let pinnUrl;
      if      (action === 'sports')                      pinnUrl = `${PINN_BASE}/sports`;
      else if (action === 'leagues')                     pinnUrl = `${PINN_BASE}/sports/${sport}/leagues?all=false`;
      else if (action === 'matchups' && league)          pinnUrl = `${PINN_BASE}/leagues/${league}/matchups?withSpecials=true&brandId=0`;
      else if (action === 'markets'  && matchup)         pinnUrl = `${PINN_BASE}/matchups/${matchup}/markets/straight`;
      else if (action === 'live-markets' && matchup)     pinnUrl = `${PINN_BASE}/matchups/${matchup}/markets/straight?live=true`;
      else if (action === 'live-leagues')                pinnUrl = `${PINN_BASE}/sports/${sport}/leagues?all=false&hasLive=true`;
      else return new Response(JSON.stringify({ error: 'Missing or invalid action param' }), { status: 400, headers: cors });

      try {
        const resp = await fetch(pinnUrl, { headers: { 'X-Api-Key': PINN_KEY } });
        const body = await resp.text();
        return new Response(body, { status: resp.status, headers: cors });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: cors });
      }
    }


    // ── Sirve sw.js (Service Worker para notificaciones push) ───────────────
    if (url.pathname === '/sw.js') {
      const swUrl = 'https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/sw.js';
      const swResp = await fetch(swUrl, { cf: { cacheEverything: false } });
      const swBody = await swResp.text();
      return new Response(swBody, {
        headers: {
          'Content-Type': 'application/javascript',
          'Service-Worker-Allowed': '/',
          'Cache-Control': 'no-cache',
        }
      });
    }

    if (url.pathname === '/esquina-radar') {
      const erUrl = 'https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/esquina-radar.html?bust=1782237016';
      const erResponse = await fetch(erUrl, {
        cf: { cacheEverything: false },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const erHtml = await erResponse.text();
      return new Response(erHtml, {
        headers: {
          'Content-Type':  'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Deploy':      Date.now().toString(),
        },
      });
    }

    // ── Sirve index.html desde GitHub (comportamiento original) ────────────
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

/* =========================================================================
 * TIKTOK — Login (OAuth + PKCE) y Content Posting API (Direct Post)
 *
 * Requiere:
 *  - KV namespace enlazado como `TIKTOK_KV` (wrangler.toml)
 *  - Secrets: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI,
 *             APP_URL  (wrangler secret put ...)
 *
 * Rutas:
 *  GET  /tiktok/login            -> redirige a TikTok para autorizar
 *  GET  /tiktok/callback         -> recibe el "code", guarda los tokens
 *  GET  /tiktok/status           -> { connected, username }
 *  POST /tiktok/disconnect       -> borra los tokens guardados
 *  POST /tiktok/publish          -> sube y publica un video (FormData: video, title)
 *  GET  /tiktok/publish-status   -> ?id=<publish_id> — estado de publicación
 * ========================================================================= */

// ── Signals KV Handler ─────────────────────────────────────────────────────
const SIGNALS_KEY = 'esquina_signals_v1';

async function handleSignals(request, env, url) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

  const json = (data, status = 200) => new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json', ...cors }
  });

  try {
    // GET /signals/list → return all signals
    if (url.pathname === '/signals/list' && request.method === 'GET') {
      const raw = await env.TIKTOK_KV.get(SIGNALS_KEY);
      const signals = raw ? JSON.parse(raw) : [];
      return json({ ok: true, signals });
    }

    // POST /signals/save → save full signals array
    if (url.pathname === '/signals/save' && request.method === 'POST') {
      const body = await request.json();
      const signals = body.signals || [];
      await env.TIKTOK_KV.put(SIGNALS_KEY, JSON.stringify(signals));
      return json({ ok: true, count: signals.length });
    }

    // POST /signals/update → update one signal by id (status, finalTotal)
    if (url.pathname === '/signals/update' && request.method === 'POST') {
      const body = await request.json();
      const { id, status, finalTotal, currentTotal } = body;
      const raw = await env.TIKTOK_KV.get(SIGNALS_KEY);
      const signals = raw ? JSON.parse(raw) : [];
      const idx = signals.findIndex(s => s.id === id);
      if (idx >= 0) {
        if (status != null) signals[idx].status = status;
        if (finalTotal != null) signals[idx].finalTotal = finalTotal;
        if (currentTotal != null) signals[idx].currentTotal = currentTotal;
        await env.TIKTOK_KV.put(SIGNALS_KEY, JSON.stringify(signals));
        return json({ ok: true });
      }
      return json({ ok: false, error: 'not found' }, 404);
    }

    // DELETE /signals/clear → wipe all signals
    if (url.pathname === '/signals/clear' && request.method === 'POST') {
      await env.TIKTOK_KV.put(SIGNALS_KEY, '[]');
      return json({ ok: true });
    }

  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
  return new Response('Not found', { status: 404 });
}

const TIKTOK_TOKENS_KEY = 'tiktok_tokens';
const TIKTOK_API = 'https://open.tiktokapis.com';
// Para Sandbox: https://open-sandbox.tiktokapis.com
// El token exchange del Sandbox usa un endpoint diferente
const TIKTOK_TOKEN_API = 'https://open-sandbox.tiktokapis.com';

function tiktokBase64url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function tiktokSha256(input) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
}

function tiktokRandomString(len = 64) {
  return tiktokBase64url(crypto.getRandomValues(new Uint8Array(len))).slice(0, len);
}

function tiktokCors(env) {
  return {
    'Access-Control-Allow-Origin': env.APP_URL || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function tiktokJson(data, env, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...tiktokCors(env), ...(init.headers || {}) },
  });
}

async function tiktokGetTokens(env) {
  const raw = await env.TIKTOK_KV.get(TIKTOK_TOKENS_KEY);
  return raw ? JSON.parse(raw) : null;
}

async function tiktokSaveTokens(env, tokens) {
  await env.TIKTOK_KV.put(TIKTOK_TOKENS_KEY, JSON.stringify(tokens));
}

// Devuelve un access_token vigente, renovándolo con refresh_token si hace falta.
async function tiktokGetValidTokens(env) {
  const tokens = await tiktokGetTokens(env);
  if (!tokens) return null;

  if (tokens.expires_at && Date.now() < tokens.expires_at - 60_000) {
    return tokens;
  }

  const body = new URLSearchParams({
    client_key: env.TIKTOK_CLIENT_KEY,
    client_secret: env.TIKTOK_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
  });

  const resp = await fetch(`${TIKTOK_TOKEN_API}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body,
  });
  const data = await resp.json();
  if (!data.access_token) return null;

  const updated = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || tokens.refresh_token,
    open_id: data.open_id || tokens.open_id,
    expires_at: Date.now() + data.expires_in * 1000,
    refresh_expires_at: Date.now() + data.refresh_expires_in * 1000,
  };
  await tiktokSaveTokens(env, updated);
  return updated;
}

async function tiktokHandleLogin(env) {
  const codeVerifier = tiktokRandomString(64);
  const state = tiktokRandomString(24);
  // No PKCE - TikTok Sandbox does not support code_verifier in token exchange
  await env.TIKTOK_KV.put(`oauth_state:${state}`, 'ok', { expirationTtl: 600 });

  const authUrl = new URL('https://www.tiktok.com/v2/auth/authorize/');
  authUrl.searchParams.set('client_key', env.TIKTOK_CLIENT_KEY);
  authUrl.searchParams.set('scope', 'user.info.basic,video.upload');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', env.TIKTOK_REDIRECT_URI);
  authUrl.searchParams.set('state', state);

  return Response.redirect(authUrl.toString(), 302);
}

async function tiktokHandleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  const appBase = (env.APP_URL || 'https://thalamus-live.panfernan5.workers.dev').replace(/\/+$/, '');
  const redirectError = (reason) =>
    Response.redirect(`${appBase}/esquina-radar?tiktok=error&reason=${encodeURIComponent(reason)}`, 302);
  const redirectOk = () =>
    Response.redirect(`${appBase}/esquina-radar?tiktok=connected`, 302);

  if (error) return redirectError(error);

  const stateOk = state ? await env.TIKTOK_KV.get(`oauth_state:${state}`) : null;
  if (!code || !stateOk) return redirectError('invalid_state');
  await env.TIKTOK_KV.delete(`oauth_state:${state}`);

  const body = new URLSearchParams({
    client_key: env.TIKTOK_CLIENT_KEY,
    client_secret: env.TIKTOK_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: env.TIKTOK_REDIRECT_URI,
  });

  const resp = await fetch(`${TIKTOK_TOKEN_API}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body,
  });
  const rawText = await resp.text();
  let data;
  try { data = JSON.parse(rawText); } catch(e) { return redirectError('tpf:' + rawText.slice(0,200)); }
  if (!data.access_token) return redirectError('tef:' + JSON.stringify(data));

  await tiktokSaveTokens(env, {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    open_id: data.open_id,
    expires_at: Date.now() + data.expires_in * 1000,
    refresh_expires_at: Date.now() + data.refresh_expires_in * 1000,
  });

  return redirectOk();
}

async function tiktokHandleStatus(env) {
  const tokens = await tiktokGetTokens(env);
  if (!tokens) return tiktokJson({ connected: false }, env);

  let username = null;
  try {
    const valid = await tiktokGetValidTokens(env);
    if (valid) {
      const infoResp = await fetch(`${TIKTOK_API}/v2/user/info/?fields=display_name`, {
        headers: { Authorization: `Bearer ${valid.access_token}` },
      });
      const info = await infoResp.json();
      username = info?.data?.user?.display_name || null;
    }
  } catch (e) { /* still report connected even if profile lookup fails */ }

  return tiktokJson({ connected: true, username }, env);
}

async function tiktokHandleDisconnect(env) {
  await env.TIKTOK_KV.delete(TIKTOK_TOKENS_KEY);
  return tiktokJson({ ok: true }, env);
}

async function tiktokHandlePublish(request, env) {
  const tokens = await tiktokGetValidTokens(env);
  if (!tokens) return tiktokJson({ error: 'not_connected' }, env, { status: 401 });

  const form = await request.formData();
  const file = form.get('video');
  const title = (form.get('title') || 'Pronóstico - Esquina Radar').toString().slice(0, 150);
  if (!file) return tiktokJson({ error: 'missing_video' }, env, { status: 400 });

  const videoBuffer = await file.arrayBuffer();
  const videoSize = videoBuffer.byteLength;

  // 1. Query creator info — requerido antes de publicar; indica qué niveles
  //    de privacidad permite esta combinación de app/cuenta.
  const creatorResp = await fetch(`${TIKTOK_API}/v2/post/publish/creator_info/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  const creatorData = await creatorResp.json();
  const privacyOptions = creatorData?.data?.privacy_level_options || [];
  // Apps sin auditar quedan restringidas a SELF_ONLY (privado) sin importar
  // lo que pidamos — la elegimos si está disponible.
  const privacyLevel = privacyOptions.includes('SELF_ONLY')
    ? 'SELF_ONLY'
    : privacyOptions[0] || 'SELF_ONLY';

  // 2. Inicializa la publicación (1 solo chunk — nuestros clips son ~3MB)
  const initResp = await fetch(`${TIKTOK_API}/v2/post/publish/video/init/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      post_info: {
        title,
        privacy_level: privacyLevel,
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: videoSize,
        chunk_size: videoSize,
        total_chunk_count: 1,
      },
    }),
  });
  const initData = await initResp.json();
  if (!initData?.data?.upload_url) {
    return tiktokJson({ error: 'init_failed', detail: initData }, env, { status: 502 });
  }
  const { publish_id, upload_url } = initData.data;

  // 3. Sube el video al upload_url que dio TikTok
  const uploadResp = await fetch(upload_url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'video/mp4',
      'Content-Range': `bytes 0-${videoSize - 1}/${videoSize}`,
    },
    body: videoBuffer,
  });
  if (!uploadResp.ok) {
    return tiktokJson({ error: 'upload_failed', status: uploadResp.status }, env, { status: 502 });
  }

  return tiktokJson({ publish_id, privacy_level: privacyLevel }, env);
}

async function tiktokHandlePublishStatus(request, env) {
  const tokens = await tiktokGetValidTokens(env);
  if (!tokens) return tiktokJson({ error: 'not_connected' }, env, { status: 401 });

  const url = new URL(request.url);
  const publishId = url.searchParams.get('id');
  if (!publishId) return tiktokJson({ error: 'missing_id' }, env, { status: 400 });

  const resp = await fetch(`${TIKTOK_API}/v2/post/publish/status/fetch/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ publish_id: publishId }),
  });
  const data = await resp.json();
  return tiktokJson(data, env);
}

async function handleTikTok(request, env, url) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: tiktokCors(env) });
  }

  try {
    const path = url.pathname;
    if (path === '/tiktok/login' && request.method === 'GET') return tiktokHandleLogin(env);
    if (path === '/tiktok/callback' && request.method === 'GET') return tiktokHandleCallback(request, env);
    if (path === '/tiktok/status' && request.method === 'GET') return tiktokHandleStatus(env);
    if (path === '/tiktok/disconnect' && request.method === 'POST') return tiktokHandleDisconnect(env);
    if (path === '/tiktok/publish' && request.method === 'POST') return tiktokHandlePublish(request, env);
    if (path === '/tiktok/publish-status' && request.method === 'GET') return tiktokHandlePublishStatus(request, env);
  } catch (err) {
    return tiktokJson({ error: 'internal_error', detail: String(err) }, env, { status: 500 });
  }

  return new Response('Not found', { status: 404 });
}



