export async function onRequestGet({ env }) {
  const gas = (env.GAS_ONBOARDING_URL || "").trim();
  const sitekey = (env.TURNSTILE_SITE_KEY || "").trim(); // only if you store it in Pages env
  const allowed = (env.TURNSTILE_ALLOWED_HOSTS || "").trim();

  return new Response(
    JSON.stringify({
      ok: true,
      gas_onboarding_url: gas,
      turnstile_site_key: sitekey,
      turnstile_allowed_hosts: allowed
    }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      }
    }
  );
}
