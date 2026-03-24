
/* =========================================
   Experience Ecuador WhatsApp Smart CTA
   ========================================= */

(function () {
  "use strict";

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function normalizePath(p) {
    p = p || "/";
    if (p.length > 1 && p.charAt(p.length - 1) !== "/") p = p + "/";
    return p;
  }

  function isSpanishPath(p) {
    return p === "/es/" || p.indexOf("/es/") === 0;
  }

  function getInlineWaQuestions() {
    var el = document.getElementById("eeWaQuestions");
    if (!el) return null;
    try { return JSON.parse(el.textContent || el.innerText || "{}"); }
    catch (e) { return null; }
  }

  function getCurrentConfig() {
    var data = getInlineWaQuestions();
    var path = normalizePath(window.location.pathname || "/");
    if (!data) return null;

    var base = isSpanishPath(path) ? (data.default_es || {}) : (data.default_en || {});
    var pageRow = data.pages ? (data.pages[path] || {}) : {};
    var merged = {};
    Object.keys(base).forEach(function (k) { merged[k] = base[k]; });
    Object.keys(pageRow).forEach(function (k) { merged[k] = pageRow[k]; });
    return merged;
  }

  function fillText(template) {
    var pageUrl = window.location.href;
    var title = (document.title || "").trim();
    return String(template || "")
      .replace(/\{url\}/g, pageUrl)
      .replace(/\{title\}/g, title);
  }

  function buildWhatsAppUrl(number, message) {
    var digits = String(number || "").replace(/\D+/g, "");
    if (!digits) return "";
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(message || "");
  }

  function trackWidgetClick(label) {
    try {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: "whatsapp_widget_click",
          whatsapp_label: label || "",
          page_path: window.location.pathname || "/"
        });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_widget_click", {
          event_category: "engagement",
          event_label: label || "",
          page_path: window.location.pathname || "/"
        });
      }
    } catch (e) {}
  }

  function openWidget(root) {
    root.classList.add("is-open");
    var btn = qs(".eeWaFabBtn", root);
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  function closeWidget(root) {
    root.classList.remove("is-open");
    var btn = qs(".eeWaFabBtn", root);
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function init(root) {
    if (!root || root.__eeWaInit) return;
    root.__eeWaInit = true;

    var number = root.getAttribute("data-wa-number") || "";
    var icon = root.getAttribute("data-wa-icon") || "";
    var img = qs(".eeWaFabImg", root);
    var btn = qs(".eeWaFabBtn", root);
    var closeBtn = qs(".eeWaFabClose", root);
    var backdrop = qs(".eeWaFabBackdrop", root);
    var title = qs(".eeWaFabTitle", root);
    var actions = qsa(".eeWaFabAction", root);

    if (img && icon) img.setAttribute("src", icon);

    var cfg = getCurrentConfig() || {};

    if (title && cfg.title) title.textContent = cfg.title;

    actions.forEach(function (a, idx) {
      var n = idx + 1;
      var q = cfg["q" + n];
      var t = cfg["t" + n];

      if (!q) {
        a.style.display = "none";
        return;
      }

      a.style.display = "";
      a.textContent = q;
      a.setAttribute("data-wa-label", q);
      a.setAttribute("data-wa-message", fillText(t || ""));
      a.setAttribute("href", buildWhatsAppUrl(number, fillText(t || "")));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });

    if (btn) {
      btn.addEventListener("click", function () {
        if (root.classList.contains("is-open")) closeWidget(root);
        else openWidget(root);
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", function () { closeWidget(root); });
    if (backdrop) backdrop.addEventListener("click", function () { closeWidget(root); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeWidget(root);
    });

    actions.forEach(function (a) {
      a.addEventListener("click", function () {
        trackWidgetClick(a.getAttribute("data-wa-label") || "");
        closeWidget(root);
      });
    });
  }

  function boot() {
    qsa(".eeWaFab").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
