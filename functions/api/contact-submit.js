/**
 * Cloudflare Pages Function: /api/contact-submit
 *
 * What it does:
 * 1) Verifies Cloudflare Turnstile token server-side
 * 2) Forwards the sanitized payload to your Google Apps Script Web App
 * 3) Returns the Apps Script JSON back to the browser
 *
 * Required env vars:
 * - TURNSTILE_SECRET
 * - GAS_CONTACT_URL
 *
 * Optional:
 * - ALLOW_ORIGIN (defaults to https://experienceecuador.com)
 */

function jsonResponse(data, status = 200, origin = null) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }

  return new Response(JSON.stringify(data), { status, headers });
}

function getClientIp(request) {
  return request.headers.get("CF-Connecting-IP") || "";
}

async function verifyTurnstile({ token, ip, secret }) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form
  });

  const data = await resp.json().catch(() => ({}));
  return data;
}

export async function onRequestOptions({ env }) {
  const allowOrigin = env.ALLOW_ORIGIN || "https://experienceecuador.com";
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    }
  });
}

export async function onRequestGet({ env }) {
  const allowOrigin = env.ALLOW_ORIGIN || "https://experienceecuador.com";
  return jsonResponse(
    {
      ok: false,
      code: "method_not_allowed",
      message: "Use POST for /api/contact-submit."
    },
    405,
    allowOrigin
  );
}

export async function onRequestPost({ request, env }) {
  const allowOrigin = env.ALLOW_ORIGIN || "https://experienceecuador.com";

  if (!env.TURNSTILE_SECRET) {
    return jsonResponse({ ok: false, code: "missing_env", message: "TURNSTILE_SECRET is not set." }, 500, allowOrigin);
  }
  if (!env.GAS_CONTACT_URL) {
    return jsonResponse({ ok: false, code: "missing_env", message: "GAS_CONTACT_URL is not set." }, 500, allowOrigin);
  }

  let payload = {};
  try {
    const ct = (request.headers.get("Content-Type") || "").toLowerCase();
    if (ct.includes("application/json")) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch (e) {
    return jsonResponse({ ok: false, code: "bad_request", message: "Invalid request body." }, 400, allowOrigin);
  }

  const token = String(payload.turnstile_token || payload["cf-turnstile-response"] || "").trim();
  if (!token) {
    return jsonResponse({ ok: false, code: "missing_turnstile", message: "Turnstile token is missing." }, 400, allowOrigin);
  }

  const ip = getClientIp(request);
  const ua = request.headers.get("User-Agent") || "";

  const ver = await verifyTurnstile({ token, ip, secret: env.TURNSTILE_SECRET });
  if (!ver || ver.success !== true) {
    return jsonResponse(
      {
        ok: false,
        code: "turnstile_failed",
        message: "Turnstile verification failed.",
        turnstile: ver || null
      },
      403,
      allowOrigin
    );
  }

  const forward = {
    first_name: String(payload.first_name || ""),
    last_name: String(payload.last_name || ""),
    email: String(payload.email || ""),
    phone: String(payload.phone || ""),
    interests: String(payload.interests || ""),
    notes: String(payload.notes || ""),
    how_did_you_hear_about_us: String(payload.how_did_you_hear_about_us || ""),
    language: String(payload.language || "en"),
    source: String(payload.source || "EE Contact"),
    user_agent: String(payload.user_agent || ua),
    "ip_best-effort": String(payload["ip_best-effort"] || ip),
    status: String(payload.status || "New")
  };

  let gasJson = null;
  try {
    const gasResp = await fetch(env.GAS_CONTACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(forward)
    });

    const text = await gasResp.text();
    try {
      gasJson = JSON.parse(text);
    } catch {
      gasJson = {
        ok: false,
        code: "gas_non_json",
        message: "Apps Script did not return JSON.",
        raw: text.slice(0, 500)
      };
    }
  } catch (e) {
    return jsonResponse(
      { ok: false, code: "gas_fetch_failed", message: String(e && e.message ? e.message : e) },
      502,
      allowOrigin
    );
  }

  return jsonResponse(gasJson, 200, allowOrigin);
}

export async function onRequest({ request, env, next }) {
  const method = (request.method || "GET").toUpperCase();
  if (method === "GET") return onRequestGet({ env });
  if (method === "OPTIONS") return onRequestOptions({ env });
  if (method === "POST") return onRequestPost({ request, env });

  const allowOrigin = env.ALLOW_ORIGIN || "https://experienceecuador.com";
  return jsonResponse(
    { ok: false, code: "method_not_allowed", message: "Only POST is supported for /api/contact-submit." },
    405,
    allowOrigin
  );
}
