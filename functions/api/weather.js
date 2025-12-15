export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);

  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return json({ ok: false, error: "Missing lat or lon" }, 400);
  }

  // What we fetch from Open-Meteo
  // Keep it consistent so cache keys are stable.
  const upstreamUrl = new URL("https://api.open-meteo.com/v1/forecast");
  upstreamUrl.searchParams.set("latitude", lat);
  upstreamUrl.searchParams.set("longitude", lon);
  upstreamUrl.searchParams.set("daily", "temperature_2m_min,temperature_2m_max,precipitation_sum");
  upstreamUrl.searchParams.set("timezone", "auto");
  upstreamUrl.searchParams.set("forecast_days", "7");

  // Cache settings:
  // 30 minutes is a good default for a “current weather / forecast” widget.
  const TTL_SECONDS = 60 * 30;

  const cache = caches.default;
  const cacheKey = new Request(upstreamUrl.toString(), {
    method: "GET",
    headers: { "Accept": "application/json" },
  });

  // 1) Serve from cache if we can
  const cached = await cache.match(cacheKey);
  if (cached) {
    return withCacheHeaders(cached, TTL_SECONDS, true);
  }

  // 2) Otherwise fetch upstream
  let upstreamResp;
  try {
    upstreamResp = await fetch(upstreamUrl.toString(), {
      headers: { "Accept": "application/json" },
      cf: {
        // In addition to caches.default, tell Cloudflare this is cacheable
        cacheTtl: TTL_SECONDS,
        cacheEverything: true,
      },
    });
  } catch (e) {
    return json({ ok: false, error: "Upstream fetch failed", details: String(e) }, 502);
  }

  const data = await upstreamResp.json().catch(() => null);

  const resp = json(
    { ok: true, source: "open-meteo", lat, lon, data },
    upstreamResp.ok ? 200 : upstreamResp.status
  );

  // Only cache successful responses
  if (upstreamResp.ok) {
    await cache.put(cacheKey, resp.clone());
  }

  return withCacheHeaders(resp, TTL_SECONDS, false);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function withCacheHeaders(response, ttlSeconds, fromCache) {
  const r = new Response(response.body, response);
  r.headers.set("Cache-Control", `public, max-age=${ttlSeconds}`);
  r.headers.set("X-EE-Cache", fromCache ? "HIT" : "MISS");
  return r;
}
