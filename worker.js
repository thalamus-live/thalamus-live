export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Verificación de dominio TikTok (archivo de firma) ───────────────────
    if (url.pathname === '/tiktokpgsid6TJGjs85B0WumjohXrTt8mRhVfB.txt') {
            return new Response('tiktok-developers-site-verification=pgsid6TJGjs85B0WumjohXrTt8mRhVfB', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

        // — Privacy Policy (Esquina Radar)
        if (url.pathname === '/privacy') {
                const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Politica de Privacidad - Esquina Radar</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;line-height:1.6;color:#222}h1{font-size:26px}h2{font-size:19px;margin-top:32px}p,li{font-size:15px}</style></head><body><h1>Politica de Privacidad</h1><p><strong>Esquina Radar</strong> - Ultima actualizacion: 18 de julio de 2026</p><h2>1. Quienes somos</h2><p>Esquina Radar es una aplicacion que ofrece analisis en vivo de estadisticas de futbol (corners y goles) con fines informativos y de entretenimiento.</p><h2>2. Que informacion recopilamos</h2><ul><li>Informacion basica de tu perfil de TikTok (nombre de usuario y foto de perfil) cuando conectas tu cuenta mediante TikTok Login Kit.</li><li>Datos publicos de partidos de futbol obtenidos de proveedores externos (ESPN, SofaScore, The Odds API).</li><li>No recopilamos datos financieros, de pago, ni informacion de apuestas reales.</li></ul><h2>3. Como usamos tu informacion</h2><p>Usamos tu informacion de TikTok unicamente para autenticar tu cuenta y publicar, cuando tu lo autorizas, contenido de video generado por la app en tu nombre. Tambien mostramos tu nombre de usuario conectado dentro del panel de la aplicacion.</p><h2>4. Almacenamiento y seguridad</h2><p>El token de acceso de TikTok se almacena de forma cifrada en la infraestructura de Cloudflare (KV Storage) y nunca se comparte con terceros ni se vende a anunciantes.</p><h2>5. Tus derechos</h2><p>Puedes desconectar tu cuenta de TikTok en cualquier momento desde el panel de la app, o revocar el acceso directamente desde la configuracion de tu cuenta de TikTok. Al desconectar, eliminamos el token almacenado.</p><h2>6. Cambios a esta politica</h2><p>Podemos actualizar esta politica ocasionalmente. Los cambios se reflejaran en esta misma pagina con la fecha de ultima actualizacion.</p><h2>7. Contacto</h2><p>Si tienes preguntas sobre esta politica, contactanos en: panfernan5@gmail.com</p></body></html>`;
                return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }

        // — Terms of Service (Esquina Radar)
        if (url.pathname === '/terms') {
                                                                const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Terminos de Servicio - Esquina Radar</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;line-height:1.6;color:#222}h1{font-size:26px}h2{font-size:19px;margin-top:32px}p,li{font-size:15px}.aviso{background:#fff3cd;border-left:4px solid #e0a800;padding:14px 18px;margin:20px 0;font-size:14px}</style></head><body><h1>Terminos de Servicio</h1><p><strong>Esquina Radar</strong> - Ultima actualizacion: 18 de julio de 2026</p><div class="aviso"><strong>Aviso importante:</strong> Esquina Radar es una plataforma de analisis estadistico y generacion de senales deportivas en tiempo real (corners, goles y otros eventos de partidos de futbol). No somos una casa de apuestas, no operamos como corredor ni intermediario de apuestas, no procesamos depositos ni retiros, y no ejecutamos ni facilitamos transacciones de dinero de ningun tipo. Toda decision de apostar o no apostar, y con que operador hacerlo, es responsabilidad exclusiva y personal del usuario.<br><br><strong>Descargo de responsabilidad:</strong> No garantizamos resultados ni un porcentaje de acierto especifico en ninguna senal, pronostico o estadistica generada por el Servicio. El objetivo de nuestros modelos es maximizar la mayor cantidad de aciertos posible en base a los datos historicos y en vivo disponibles, pero se trata de estimaciones probabilisticas, no de certezas. Ni Esquina Radar, ni Thalamus, ni ningun miembro de nuestro equipo tiene la decision final sobre tus apuestas: esa decision es, en todo momento y sin excepcion, exclusivamente tuya.</div><h2>1. Aceptacion de los terminos</h2><p>Estos Terminos de Servicio ("Terminos") regulan el acceso y uso de la aplicacion Esquina Radar (el "Servicio"), operada bajo la marca Thalamus ("nosotros", "la Compania"). Al acceder, registrarte, conectar tu cuenta de TikTok o utilizar de cualquier forma el Servicio, declaras haber leido, entendido y aceptado estos Terminos en su totalidad, junto con nuestra Politica de Privacidad. Si no estas de acuerdo con alguna parte de estos Terminos, debes abstenerte de usar el Servicio.</p><h2>2. Descripcion del servicio</h2><p>Esquina Radar es un escaner de senales deportivas en vivo especializado en futbol. El Servicio monitorea partidos en curso a traves de multiples fuentes de datos (estadisticas de corners, goles, posesion, tiros a puerta y cuotas de mercado) y aplica modelos internos de probabilidad para generar senales informativas sobre la evolucion esperada de un partido. El Servicio tambien permite, de forma opcional y bajo autorizacion expresa del usuario, la publicacion automatica de contenido de video en la cuenta de TikTok conectada.</p><p>El Servicio se ofrece exclusivamente con fines informativos, analiticos y de entretenimiento. Ninguna senal, pronostico, porcentaje de probabilidad o estadistica mostrada en la aplicacion constituye asesoria financiera, recomendacion de inversion, ni una invitacion a apostar.</p><h2>3. Elegibilidad y edad minima</h2><p>El uso del Servicio esta restringido a personas mayores de 18 anios, o la mayoria de edad legal en su jurisdiccion de residencia si esta es superior. Al usar el Servicio declaras y garantizas que cumples con este requisito de edad y que el acceso a contenido relacionado con analisis deportivo y de apuestas es legal en tu jurisdiccion. Es responsabilidad exclusiva del usuario verificar la legalidad del uso de este tipo de herramientas en su pais o region antes de utilizarlas.</p><h2>4. Naturaleza probabilistica de las senales</h2><p>Las senales, porcentajes de probabilidad y estadisticas de acierto mostradas en la aplicacion (incluyendo cualquier historial de "aciertos" o "fallos") se calculan a partir de datos historicos y modelos estadisticos internos. Estos valores son estimaciones probabilisticas y no predicciones garantizadas. El rendimiento historico de un modelo, sistema o senal no garantiza ni permite inferir resultados futuros. Los mercados deportivos y las cuotas cambian constantemente en funcion de variables que el Servicio no controla, incluyendo lesiones, decisiones arbitrales, condiciones climaticas y cambios tacticos en tiempo real.</p><h2>5. Juego responsable</h2><p>Si decides utilizar la informacion generada por Esquina Radar en el contexto de apuestas deportivas realizadas en plataformas de terceros, te recomendamos encarecidamente practicar el juego responsable: define limites de tiempo y de dinero antes de apostar, nunca apuestes dinero que no puedas permitirte perder, no persigas perdidas, y no utilices el apostar como una fuente de ingresos ni como una solucion a problemas financieros o emocionales. Si consideras que tu relacion con el juego se ha vuelto problematica, te recomendamos buscar apoyo profesional o contactar a las lineas de ayuda sobre ludopatia disponibles en tu pais. Esquina Radar no ofrece servicios de apuestas y no tiene control sobre las herramientas de juego responsable (limites de deposito, autoexclusion, etc.) de los operadores de apuestas que puedas utilizar por tu cuenta.</p><h2>6. Registro, cuenta e integracion con TikTok</h2><p>Para acceder a determinadas funciones del Servicio, en particular la publicacion automatica de contenido, debes conectar tu cuenta de TikTok mediante TikTok Login Kit. Al hacerlo, autorizas a Esquina Radar a acceder a la informacion basica de tu perfil (nombre de usuario, avatar) y a publicar en tu nombre, unicamente cuando tu configures o actives dicha funcion, videos generados automaticamente por la aplicacion con el resumen de senales del dia o de los resultados. Puedes revocar esta autorizacion en cualquier momento desde el panel de la aplicacion o desde la configuracion de aplicaciones conectadas de tu cuenta de TikTok. Eres el unico responsable del contenido publicado en tu cuenta mientras la integracion permanezca activa.</p><h2>7. Uso aceptable y conductas prohibidas</h2><p>Al utilizar el Servicio, te comprometes a no incurrir en ninguna de las siguientes conductas:</p><ul><li>Utilizar el Servicio para actividades ilegales, fraudulentas o que infrinjan derechos de terceros.</li><li>Automatizar, escrapear, indexar masivamente o extraer datos del Servicio mediante bots, scripts o herramientas no autorizadas.</li><li>Revender, sublicenciar o redistribuir comercialmente las senales, datos o contenido generado por el Servicio sin autorizacion previa y por escrito.</li><li>Utilizar la integracion con TikTok para publicar contenido spam, enganioso, o que viole las politicas de la comunidad de TikTok.</li><li>Intentar realizar ingenieria inversa, descompilar o acceder al codigo fuente del Servicio salvo en la medida permitida por la ley aplicable.</li><li>Suplantar la identidad de otra persona o entidad, o falsear tu vinculacion con alguna persona o entidad.</li></ul><p>Nos reservamos el derecho de suspender o cancelar el acceso al Servicio de cualquier usuario que incumpla estas condiciones, sin previo aviso y sin perjuicio de otras acciones legales que puedan corresponder.</p><h2>8. Fuentes de datos de terceros</h2><p>El Servicio obtiene datos deportivos y de cuotas de proveedores externos, incluyendo entre otros ESPN, SofaScore, API-Football y The Odds API. Estos datos se muestran "tal cual" son recibidos y pueden contener errores, retrasos o interrupciones ajenos a nuestro control. No garantizamos la exactitud, integridad o disponibilidad continua de los datos de terceros, y no somos responsables de discrepancias entre la informacion mostrada en el Servicio y los datos oficiales del partido o de la casa de apuestas que utilices.</p><h2>9. Propiedad intelectual</h2><p>El Servicio, su codigo, disenio, marca "Esquina Radar", logotipos, modelos de analisis y todo el contenido generado por la Compania son propiedad exclusiva de Thalamus, salvo el contenido de terceros expresamente identificado como tal. Queda prohibida su reproduccion, distribucion o uso comercial sin autorizacion previa y por escrito. Todas las marcas de terceros mencionadas (TikTok, ESPN, SofaScore, entre otras) pertenecen a sus respectivos propietarios y se mencionan unicamente con fines descriptivos.</p><h2>10. Disponibilidad, cambios y discontinuacion del servicio</h2><p>Nos reservamos el derecho de modificar, suspender, limitar o discontinuar total o parcialmente el Servicio, o cualquiera de sus funciones, en cualquier momento y sin previo aviso, por motivos tecnicos, operativos, legales o comerciales. No garantizamos que el Servicio este disponible de forma ininterrumpida ni libre de errores.</p><h2>11. Exencion de garantias</h2><p>El Servicio se proporciona "tal cual" y "segun disponibilidad", sin garantias de ningun tipo, ya sean expresas o implicitas, incluyendo, entre otras, garantias de comerciabilidad, idoneidad para un fin particular, exactitud de los datos o no infraccion. No garantizamos que las senales generadas produzcan resultados favorables en apuestas deportivas ni en ningun otro contexto.</p><h2>12. Limitacion de responsabilidad</h2><p>En la maxima medida permitida por la ley aplicable, Thalamus y Esquina Radar no seran responsables por danios directos, indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo sin limitacion perdidas economicas, perdidas de apuestas, perdida de datos o de beneficios, derivados del uso o la imposibilidad de uso del Servicio, incluso si se nos ha advertido de la posibilidad de tales danios. El usuario asume la totalidad del riesgo derivado del uso de la informacion proporcionada por el Servicio, incluyendo decisiones de apuesta tomadas con base en dicha informacion.</p><h2>13. Indemnizacion</h2><p>Aceptas indemnizar y mantener indemne a Thalamus, sus responsables, empleados y colaboradores frente a cualquier reclamo, demanda, danio, perdida o gasto (incluyendo honorarios legales razonables) derivado de tu uso indebido del Servicio, del incumplimiento de estos Terminos, o de la infraccion de derechos de terceros.</p><h2>14. Suspension y terminacion de cuenta</h2><p>Podemos suspender o terminar tu acceso al Servicio, con o sin previo aviso, si incumples estos Terminos, si detectamos actividad fraudulenta o abusiva, o por decision unilateral de la Compania. Puedes dejar de usar el Servicio y desconectar tu cuenta de TikTok en cualquier momento.</p><h2>15. Ley aplicable y resolucion de disputas</h2><p>Estos Terminos se rigen por las leyes aplicables en la jurisdiccion de operacion de la Compania, sin perjuicio de las normas de proteccion al consumidor que puedan corresponder segun tu lugar de residencia. Cualquier disputa derivada de estos Terminos se intentara resolver primero de forma amistosa contactando a panfernan5@gmail.com antes de recurrir a cualquier via judicial o arbitral.</p><h2>16. Modificaciones a estos terminos</h2><p>Podemos actualizar estos Terminos periodicamente para reflejar cambios en el Servicio o en requisitos legales o regulatorios. La fecha de "Ultima actualizacion" al inicio de este documento indica la version vigente. El uso continuado del Servicio despues de una actualizacion implica la aceptacion de los Terminos modificados.</p><h2>17. Contacto</h2><p>Para consultas, reclamos o solicitudes relacionadas con estos Terminos, puedes escribirnos a: panfernan5@gmail.com</p></body></html>`;
                return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
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

    // ── /api/claude-scan → proxy seguro a Anthropic para Atlas Finanzas ─────
    if (url.pathname === '/api/claude-scan' && request.method === 'POST') {
      const corsH = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
      if (request.method === 'OPTIONS') return new Response(null, { headers: corsH });
      try {
        const { imgB64, imgType, prompt } = await request.json();
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1500,
            messages: [{ role: 'user', content: [
              { type: 'image', source: { type: 'base64', media_type: imgType, data: imgB64 } },
              { type: 'text', text: prompt }
            ]}]
          })
        });
        const data = await r.json();
        const raw = data.content?.find(b => b.type === 'text')?.text || '';
        const result = JSON.parse(raw.replace(/```json|```/g, '').trim());
        return new Response(JSON.stringify({ result }), {
          headers: { ...corsH, 'Content-Type': 'application/json' }
        });
      } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
      }
    }

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
      const AF_KEY = '5a0d5818ad87681f784e2512d3944259';
      const AF_BASE = 'https://v3.football.api-sports.io';
      const cors = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

      if (request.method === 'OPTIONS') return new Response(null, { headers: { ...cors } });

      const action = url.searchParams.get('action');
      const fixtureId = url.searchParams.get('fixture');
      const betId = url.searchParams.get('bet');
      const date = url.searchParams.get('date');
      const leagueId = url.searchParams.get('league');

      let afUrl;
      if (action === 'bookmakers') {
        afUrl = `${AF_BASE}/odds/bookmakers`;
      } else if (action === 'bets') {
        afUrl = `${AF_BASE}/odds/bets`;
      } else if (action === 'live-fixtures') {
        afUrl = `${AF_BASE}/odds/live`;
      } else if (action === 'fixtures-today' && date) {
        afUrl = `${AF_BASE}/fixtures?date=${date}${leagueId ? `&league=${leagueId}` : ''}`;
      } else if (action === 'fixture-players' && fixtureId) {
        // Returns per-player match stats including rating — used to find the
        // standout player for share-card/video generation.
        afUrl = `${AF_BASE}/fixtures/players?fixture=${fixtureId}`;
      } else if (action === 'player-photo' && url.searchParams.get('player')) {
        afUrl = `${AF_BASE}/players?id=${url.searchParams.get('player')}&season=${url.searchParams.get('season') || new Date().getFullYear()}`;
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

    // ── /api/sofascore → fallback de corners cuando ESPN no reporta stats y
    //    API-Football está caído/suspendido. SofaScore no es una API oficial:
    //    es el endpoint interno que usa sofascore.com, sin key ni registro.
    //    Puede cambiar de formato o bloquear por IP sin aviso — por eso es un
    //    fallback #2, no la fuente principal. Se proxea aquí (no directo desde
    //    el navegador) porque requiere un User-Agent de navegador real, algo
    //    que fetch() del lado del cliente no puede setear.
    // /api/sofascore?home=Equipo A&away=Equipo B
    if (url.pathname === '/api/sofascore') {
      const homeQ = url.searchParams.get('home') || '';
      const awayQ = url.searchParams.get('away') || '';
      const cors = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

      const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

      const norm = (s) => (s || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim();

      try {
        const liveRes = await fetch('https://api.sofascore.com/api/v1/sport/football/events/live', {
          headers: { 'User-Agent': UA, 'Accept': 'application/json' }
        });
        if (!liveRes.ok) {
          return new Response(JSON.stringify({ error: `SofaScore live HTTP ${liveRes.status}` }), { status: 502, headers: cors });
        }
        const liveData = await liveRes.json();
        const events = liveData.events || [];

        const h = norm(homeQ), a = norm(awayQ);
        const match = events.find(ev => {
          const eh = norm(ev.homeTeam && ev.homeTeam.name);
          const ea = norm(ev.awayTeam && ev.awayTeam.name);
          if (!eh || !ea) return false;
          const sameOrder = (eh.includes(h) || h.includes(eh)) && (ea.includes(a) || a.includes(ea));
          const swapped   = (eh.includes(a) || a.includes(eh)) && (ea.includes(h) || h.includes(ea));
          return sameOrder || swapped;
        });

        if (!match) {
          return new Response(JSON.stringify({
            error: `No encontrado en SofaScore: "${homeQ}" vs "${awayQ}"`,
            liveCount: events.length,
          }), { status: 404, headers: cors });
        }

        const statsRes = await fetch(`https://api.sofascore.com/api/v1/event/${match.id}/statistics`, {
          headers: { 'User-Agent': UA, 'Accept': 'application/json' }
        });
        if (!statsRes.ok) {
          return new Response(JSON.stringify({ error: `SofaScore stats HTTP ${statsRes.status}` }), { status: 502, headers: cors });
        }
        const statsData = await statsRes.json();
        const periods = statsData.statistics || [];
        const allPeriod = periods.find(p => p.period === 'ALL') || periods[0];

        let homeCorners = null, awayCorners = null;
        if (allPeriod) {
          for (const group of (allPeriod.groups || [])) {
            for (const item of (group.statisticsItems || [])) {
              if (/corner/i.test(item.name || '')) {
                const hv = parseInt(item.home, 10);
                const av = parseInt(item.away, 10);
                if (!isNaN(hv)) homeCorners = hv;
                if (!isNaN(av)) awayCorners = av;
              }
            }
          }
        }

        return new Response(JSON.stringify({
          matchId: match.id,
          home: match.homeTeam && match.homeTeam.name,
          away: match.awayTeam && match.awayTeam.name,
          homeCorners, awayCorners,
          statusDesc: match.status && match.status.description,
        }), { headers: cors });
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

    // ── /api/claude → proxy a Anthropic API (evita CORS desde el browser) ──
    if (url.pathname === '/api/claude') {
      const cors = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

      try {
        const body = await request.json();
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'x-api-key': env.ANTHROPIC_API_KEY || '',
          },
          body: JSON.stringify(body)
        });
        const data = await resp.text();
        return new Response(data, { status: resp.status, headers: cors });
      } catch(err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: cors });
      }
    }

    // ── /privacy → Política de Privacidad ────────────────────────────────────
    if (url.pathname === '/privacy') {
      const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Política de Privacidad — Esquina Radar</title>
      <style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#222}h1{color:#3a7a5a}h2{color:#3a7a5a;margin-top:32px}a{color:#3a7a5a}</style></head>
      <body><h1>Política de Privacidad</h1><p><strong>Última actualización:</strong> Junio 2026</p>
      <p>Esquina Radar ("la aplicación") es un escáner de señales deportivas en vivo desarrollado bajo la marca Thalamus. Esta política describe cómo tratamos la información de los usuarios.</p>
      <h2>1. Datos que recopilamos</h2>
      <p>La aplicación no recopila datos personales identificables. Las señales y pronósticos generados se almacenan localmente en el dispositivo del usuario y en servidores de Cloudflare KV de forma anónima.</p>
      <h2>2. Uso de TikTok</h2>
      <p>Si el usuario conecta su cuenta de TikTok, utilizamos los permisos concedidos únicamente para publicar videos de pronósticos deportivos en nombre del usuario. No almacenamos contraseñas ni accedemos a datos privados de la cuenta más allá de lo necesario para la publicación.</p>
      <h2>3. Datos de terceros</h2>
      <p>Utilizamos APIs públicas de ESPN, Pinnacle y The Odds API para obtener estadísticas deportivas y cuotas de apuestas. No compartimos datos de usuarios con estos servicios.</p>
      <h2>4. Cookies</h2><p>La aplicación no utiliza cookies de seguimiento.</p>
      <h2>5. Contacto</h2><p>Para consultas sobre privacidad: <a href="mailto:panfernan5@gmail.com">panfernan5@gmail.com</a></p>
      <p><a href="/esquina-radar">← Volver a Esquina Radar</a></p></body></html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    }

    // ── /terms → Términos de Servicio ─────────────────────────────────────────
    if (url.pathname === '/terms') {
      const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Términos de Servicio — Esquina Radar</title>
      <style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#222}h1{color:#3a7a5a}h2{color:#3a7a5a;margin-top:32px}a{color:#3a7a5a}</style></head>
      <body><h1>Términos de Servicio</h1><p><strong>Última actualización:</strong> Junio 2026</p>
      <p>Al usar Esquina Radar aceptas los siguientes términos.</p>
      <h2>1. Uso de la aplicación</h2>
      <p>Esquina Radar es una herramienta de análisis deportivo informativa. Las señales generadas no constituyen asesoramiento financiero ni garantía de resultados en apuestas deportivas.</p>
      <h2>2. Responsabilidad</h2>
      <p>El usuario es el único responsable de sus decisiones de apuesta. Thalamus no se hace responsable de pérdidas derivadas del uso de las señales generadas por la aplicación.</p>
      <h2>3. Propiedad intelectual</h2>
      <p>El código, diseño y marca de Esquina Radar son propiedad de Thalamus. Queda prohibida su reproducción sin autorización.</p>
      <h2>4. Modificaciones</h2>
      <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado de la aplicación implica la aceptación de los nuevos términos.</p>
      <h2>5. Contacto</h2><p><a href="mailto:panfernan5@gmail.com">panfernan5@gmail.com</a></p>
      <p><a href="/esquina-radar">← Volver a Esquina Radar</a></p></body></html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    }

    if (url.pathname === '/esquina-radar') {
      const erUrl = `https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/esquina-radar.html?bust=${Date.now()}`;
      const erResponse = await fetch(erUrl, {
        cf: { cacheEverything: false, cacheTtl: 0 },
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

    // ── Mis cuentas (bank account wallet) ──────────────────────────────────
    if (url.pathname === '/mis-cuentas') {
      const cuUrl = `https://raw.githubusercontent.com/thalamus-live/thalamus-live/main/cuentas.html?bust=${Date.now()}`;
      const cuResponse = await fetch(cuUrl, {
        cf: { cacheEverything: false },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const cuHtml = await cuResponse.text();
      return new Response(cuHtml, {
        headers: {
          'Content-Type':  'text/html; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Deploy':      Date.now().toString(),
        },
      });
    }

    if (url.pathname === '/api/cuentas') {
      return handleCuentas(request, env);
    }

    if (url.pathname === '/api/chat') {
      return handleChat(request, env);
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

// ── Chat / retroalimentación KV Handler ────────────────────────────────
const CHAT_KEY = 'thalamus_cuentas_chat_v1';
const CHAT_MAX = 60;

function chatUid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

async function handleChat(request, env) {
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
    if (request.method === 'GET') {
      const raw = await env.TIKTOK_KV.get(CHAT_KEY);
      const messages = raw ? JSON.parse(raw) : [];
      return json({ ok: true, messages });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const action = body.action || 'send';
      const raw = await env.TIKTOK_KV.get(CHAT_KEY);
      let messages = raw ? JSON.parse(raw) : [];

      if (action === 'send') {
        const author = String(body.author || 'Anónimo').slice(0, 40);
        const text = String(body.text || '').slice(0, 500);
        const image = typeof body.image === 'string' && body.image.startsWith('data:image/') ? body.image : null;
        if (!text.trim() && !image) return json({ ok: false, error: 'empty message' }, 400);
        messages.push({ id: chatUid(), author, text, image, pinned: false, ts: Date.now() });
        // Al recortar por límite, conserva los fijados aunque sean viejos.
        if (messages.length > CHAT_MAX) {
          const pinned = messages.filter(m => m.pinned);
          const rest = messages.filter(m => !m.pinned).slice(-1 * (CHAT_MAX - pinned.length));
          messages = [...pinned, ...rest].sort((a, b) => a.ts - b.ts);
        }
        await env.TIKTOK_KV.put(CHAT_KEY, JSON.stringify(messages));
        return json({ ok: true });
      }

      if (action === 'delete') {
        messages = messages.filter(m => m.id !== body.id);
        await env.TIKTOK_KV.put(CHAT_KEY, JSON.stringify(messages));
        return json({ ok: true });
      }

      if (action === 'pin') {
        const idx = messages.findIndex(m => m.id === body.id);
        if (idx >= 0) {
          messages[idx].pinned = !!body.pinned;
          await env.TIKTOK_KV.put(CHAT_KEY, JSON.stringify(messages));
          return json({ ok: true });
        }
        return json({ ok: false, error: 'not found' }, 404);
      }

      return json({ ok: false, error: 'unknown action' }, 400);
    }
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
  return new Response('Method not allowed', { status: 405, headers: cors });
}

// ── Cuentas KV Handler ──────────────────────────────────────────────────
const CUENTAS_KEY = 'thalamus_cuentas_v1';

async function handleCuentas(request, env) {
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
    if (request.method === 'GET') {
      const raw = await env.TIKTOK_KV.get(CUENTAS_KEY);
      const accounts = raw ? JSON.parse(raw) : [];
      return json({ ok: true, accounts });
    }
    if (request.method === 'POST') {
      const body = await request.json();
      const accounts = body.accounts || [];
      await env.TIKTOK_KV.put(CUENTAS_KEY, JSON.stringify(accounts));
      return json({ ok: true, count: accounts.length });
    }
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
  return new Response('Method not allowed', { status: 405, headers: cors });
}

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
const TIKTOK_TOKEN_API = 'https://open.tiktokapis.com';

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

  // Accept callback as long as we have a code — state validation was causing
  // invalid_state errors due to KV eventual consistency across CF edge nodes.
  if (!code) return redirectError('missing_code');
  // Clean up state from KV if it exists (best effort)
  if (state) env.TIKTOK_KV.delete(`oauth_state:${state}`).catch(() => {});

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

  // Nuestra conexión OAuth solo tiene el scope `video.upload` (no
  // `video.publish` — ese requiere que la app pase la revisión de TikTok).
  // Por eso usamos el endpoint de "inbox" (borrador): sube el video a la
  // bandeja de entrada de TikTok del creador; el creador debe abrir la app
  // y tocar "Publicar" para que salga público. No requiere creator_info
  // ni post_info — esos solo aplican al endpoint de publicación directa.
  const initResp = await fetch(`${TIKTOK_API}/v2/post/publish/inbox/video/init/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
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
  // Usa el Content-Type real del archivo (Chrome en Windows suele grabar
  // webm, no mp4) — mandarlo como mp4 cuando el contenido es webm hace que
  // TikTok lo rechace con "The video info is empty".
  const contentType = (file.type && file.type.startsWith('video/')) ? file.type : 'video/mp4';
  const uploadResp = await fetch(upload_url, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Content-Range': `bytes 0-${videoSize - 1}/${videoSize}`,
    },
    body: videoBuffer,
  });
  if (!uploadResp.ok) {
    const uploadErr = await uploadResp.text().catch(()=>'');
    return tiktokJson({ error: 'upload_failed', status: uploadResp.status, detail: uploadErr }, env, { status: 502 });
  }

  return tiktokJson({ publish_id, mode: 'inbox_draft' }, env);
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






