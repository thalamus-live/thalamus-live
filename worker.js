export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

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

const TIKTOK_TOKENS_KEY = 'tiktok_tokens';
const TIKTOK_API = 'https://open.tiktokapis.com';

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

  const resp = await fetch(`${TIKTOK_API}/v2/oauth/token/`, {
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
  const codeChallenge = tiktokBase64url(await tiktokSha256(codeVerifier));
  const state = tiktokRandomString(24);

  await env.TIKTOK_KV.put(`oauth_state:${state}`, codeVerifier, { expirationTtl: 600 });

  const authUrl = new URL('https://www.tiktok.com/v2/auth/authorize/');
  authUrl.searchParams.set('client_key', env.TIKTOK_CLIENT_KEY);
  authUrl.searchParams.set('scope', 'user.info.basic,video.publish');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', env.TIKTOK_REDIRECT_URI);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  return Response.redirect(authUrl.toString(), 302);
}

async function tiktokHandleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  const redirectError = (reason) =>
    Response.redirect(`${env.APP_URL}/?tiktok=error&reason=${encodeURIComponent(reason)}`, 302);

  if (error) return redirectError(error);

  const codeVerifier = state ? await env.TIKTOK_KV.get(`oauth_state:${state}`) : null;
  if (!code || !codeVerifier) return redirectError('invalid_state');
  await env.TIKTOK_KV.delete(`oauth_state:${state}`);

  const body = new URLSearchParams({
    client_key: env.TIKTOK_CLIENT_KEY,
    client_secret: env.TIKTOK_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: env.TIKTOK_REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const resp = await fetch(`${TIKTOK_API}/v2/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body,
  });
  const data = await resp.json();
  if (!data.access_token) return redirectError('token_exchange_failed');

  await tiktokSaveTokens(env, {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    open_id: data.open_id,
    expires_at: Date.now() + data.expires_in * 1000,
    refresh_expires_at: Date.now() + data.refresh_expires_in * 1000,
  });

  return Response.redirect(`${env.APP_URL}/?tiktok=connected`, 302);
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
