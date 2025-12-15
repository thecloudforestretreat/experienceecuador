export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);

    // Expected query params: lat, lon
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing lat or lon" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    // Open-Meteo daily forecast (7 days)
    const upstream = new URL("https://api.open-meteo.com/v1/forecast");
    upstream.searchParams.set("latitude", lat);
    upstream.searchParams.set("longitude", lon);
    upstream.searchParams.set("daily", "temperature_2m_min,temperature_2m_max,precipitation_sum");
    upstream.searchParams.set("timezone", "auto");
    upstream.searchParams.set("forecast_days", "7");

    // Light caching to avoid “burning” requests
    const res = await fetch(upstream.toString(), {
      cf: { cacheTtl: 900, cacheEverything: true } // 15 min cache at Cloudflare edge
    });

    const data = await res.json();

    return new Response(JSON.stringify({ ok: true, source: "open-meteo", data }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=900"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || "Unknown error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
