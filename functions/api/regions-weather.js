const PLACES = [
  { id: "quito",    name: "Quito",    lat: -0.1807, lon: -78.4678 },
  { id: "mindo",    name: "Mindo",    lat:  0.0500, lon: -78.7760 },
  { id: "otavalo",  name: "Otavalo",  lat:  0.2340, lon: -78.2620 },
  { id: "cotopaxi", name: "Cotopaxi", lat: -0.6808, lon: -78.4376 },
  { id: "banos",    name: "Baños",    lat: -1.3964, lon: -78.4246 },
];

export async function onRequestGet(context) {
  const { request } = context;

  // 30 minutes cache is usually plenty for “current weather / forecast tiles”
  const TTL_SECONDS = 60 * 30;

  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString(), request);

  const cached = await cache.match(cacheKey);
  if (cached) return withCacheHeaders(cached, TTL_SECONDS, true);

  // Open-Meteo supports multiple coordinates by comma-separating lat/lon
  const latList = PLACES.map(p => p.lat).join(",");
  const lonList = PLACES.map(p => p.lon).join(",");

  const upstreamUrl = new URL("https://api.open-meteo.com/v1/forecast");
  upstreamUrl.searchParams.set("latitude", latList);
  upstreamUrl.searchParams.set("longitude", lonList);

  // For tiles: include current + 7 day daily min/max/precip
  upstreamUrl.searchParams.set("current", "temperature_2m,precipitation,weather_code");
  upstreamUrl.searchParams.set("daily", "temperature_2m_min,temperature_2m_max,precipitation_sum");
  upstreamUrl.searchParams.set("forecast_days", "7");
  upstreamUrl.searchParams.set("timezone", "auto");

  let upstreamResp;
  try {
    upstreamResp = await fetch(upstreamUrl.toString(), {
      headers: { "Accept": "application/json" },
      cf: { cacheTtl: TTL_SECONDS, cacheEverything: true },
    });
  } catch (e) {
    return json({ ok: false, error: "Upstream fetch failed", details: String(e) }, 502);
  }

  const data = await upstreamResp.json().catch(() => null);

  // Normalize response so your front end doesn’t have to guess indexing
  const payload = {
    ok: true,
    source: "open-meteo",
    places: PLACES,
    data,
  };

  const resp = json(payload, upstreamResp.ok ? 200 : upstreamResp.status);

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
