export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    if (!env.TURNSTILE_SECRET_KEY) {
      return json({ ok: false, code: "server_misconfig", message: "Turnstile secret missing." }, 500);
    }

    // Basic origin/host hardening (optional via env)
    const url = new URL(request.url);
    const allowedHosts = (env.TURNSTILE_ALLOWED_HOSTS || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (allowedHosts.length && !allowedHosts.includes(url.hostname)) {
      return json({ ok: false, code: "host_not_allowed" }, 403);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, code: "bad_json" }, 400);
    }

    const token = (body && body.token) ? String(body.token) : "";
    if (!token) {
      return json({ ok: false, code: "missing_token", message: "Missing Turnstile token." }, 400);
    }

    // Turnstile verify
    const formData = new FormData();
    formData.append("secret", env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);

    // Optional: attach user IP if present (helps Turnstile accuracy)
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "";
    if (ip) formData.append("remoteip", ip.split(",")[0].trim());

    const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData
    });

    const verifyJson = await verifyResp.json();

    if (verifyJson && verifyJson.success) {
      return json({ ok: true }, 200);
    }

    // Defensive: return error codes but do not leak secrets
    const codes = Array.isArray(verifyJson["error-codes"]) ? verifyJson["error-codes"] : [];
    return json(
      {
        ok: false,
        code: "turnstile_failed",
        error_codes: codes
      },
      403
    );
  } catch (err) {
    return json({ ok: false, code: "server_error" }, 500);
  }
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
