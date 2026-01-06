/* /assets/js/site.js
   ExperienceEcuador.com — Global header behavior
   - Works with injected /assets/includes/header.html
   - Hamburger open/close + scroll lock
   - Mobile drill-down menus (data-target / data-back)
   - Language switch (EN <-> ES) + header link rewriting + i18n labels
   - Google Analytics 4 loader (runs even when header is injected via innerHTML)
   - GA4 Events: WhatsApp clicks + Contact form submits
*/
(function () {
  "use strict";

  /* =========================
     GA4 (must live in JS, not injected HTML)
     ========================= */
  (function initGA4() {
    var MID = "G-3EDLVGV2HD";

    // Prevent double-loading across pages / reinits
    if (window.__EE_GA4_LOADED__) return;
    window.__EE_GA4_LOADED__ = true;

    // dataLayer + gtag shim
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };

    // Load GA library if not already present
    var hasGtag = document.querySelector(
      'script[src^="https://www.googletagmanager.com/gtag/js?id="]'
    );
    if (!hasGtag) {
      var s = document.createElement("script");
      s.async = true;
      s.src =
        "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MID);
      document.head.appendChild(s);
    }

    // Init + page_view
    window.gtag("js", new Date());
    window.gtag("config", MID, {
      anonymize_ip: true,
      send_page_view: true
    });

    // Optional debug helper in console
    // console.log("[EE] GA4 initialized:", MID);
  })();

  /* =========================
     GA4 Events: WhatsApp clicks + Contact form submits
     ========================= */
  (function initGA4Events() {
    function safeGtag() {
      return typeof window.gtag === "function";
    }

    function track(name, params) {
      if (!safeGtag()) return;
      try {
        window.gtag("event", name, params || {});
      } catch (e) {}
    }

    // 1) Track WhatsApp link clicks (captures desktop + mobile, header/footer too)
    document.addEventListener(
      "click",
      function (e) {
        var a =
          e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;

        var href = a.getAttribute("href") || "";
        var isWhatsapp =
          href.indexOf("wa.me/") !== -1 ||
          href.indexOf("api.whatsapp.com/") !== -1 ||
          href.indexOf("whatsapp://") !== -1;

        if (!isWhatsapp) return;

        track("whatsapp_click", {
          link_url: href,
          link_text: (a.textContent || "").trim().slice(0, 80),
          page_path: window.location.pathname || "/"
        });
      },
      true
    );

    // 2) Track contact form submits
    // Recommended: add data-ga="contact_form" to the form element you want to track.
    document.addEventListener(
      "submit",
      function (e) {
        var form = e.target;
        if (!form || form.nodeName !== "FORM") return;

        var tag = form.getAttribute("data-ga") || "";
        var isContactForm =
          tag === "contact_form" ||
          form.id === "contactForm" ||
          (form.classList && form.classList.contains("contact-form"));

        if (!isContactForm) return;

        track("contact_form_submit", {
          form_id: form.id || "",
          form_name: form.getAttribute("name") || "",
          page_path: window.location.pathname || "/"
        });
      },
      true
    );
  })();

  const HEADER_MOUNT_ID = "siteHeader";
  const TOGGLE_ID = "eeNavToggle";

  function qs(root, sel) {
    return root ? root.querySelector(sel) : null;
  }
  function qsa(root, sel) {
    return root ? Array.from(root.querySelectorAll(sel)) : [];
  }

  function normalizePath(p) {
    let path = String(p || "/").trim();
    if (!path.startsWith("/")) path = "/" + path;
    if (!path.endsWith("/")) path += "/";
    path = path.replace(/\/{2,}/g, "/");
    return path;
  }

  function isSpanishPath(pathname) {
    const p = normalizePath(pathname);
    return p === "/es/" || p.startsWith("/es/");
  }

  // Explicit page mappings (top-level slugs and key sections)
  const EN_TO_ES = {
    "/": "/es/",
    "/about/": "/es/sobre-nosotros/",
    "/mission/": "/es/mision/",
    "/contact/": "/es/contacto/",
    "/trip-builder/": "/es/planificador-de-viajes/",
    "/regions/": "/es/regiones/",
    "/experiences/": "/es/experiencias/",
    "/experiences/adventure/": "/es/experiencias/aventura/",
    "/experiences/nature/": "/es/experiencias/naturaleza/",
    "/experiences/wildlife-birding/": "/es/experiencias/vida-silvestre-y-aves/",
    "/experiences/relaxation/": "/es/experiencias/relajacion/",
    "/experiences/culinary/": "/es/experiencias/gastronomia/",
    "/experiences/culture/": "/es/experiencias/cultura/",
    "/regions/galapagos/": "/es/regiones/galapagos/",
    "/regions/coast/": "/es/regiones/costa/",
    "/regions/andes/": "/es/regiones/andes/",
    "/regions/amazon/": "/es/regiones/amazonia/"
  };

  // Build reverse map automatically
  const ES_TO_EN = (function () {
    const m = {};
    Object.keys(EN_TO_ES).forEach((en) => {
      m[EN_TO_ES[en]] = en;
    });
    return m;
  })();

  // Fallback rules for deeper pages
  function translatePath(pathname, toLang) {
    const from = normalizePath(pathname);
    const target = String(toLang || "en").toLowerCase() === "es" ? "es" : "en";

    if (target === "es" && isSpanishPath(from)) return from;
    if (target === "en" && !isSpanishPath(from)) return from;

    if (target === "es" && EN_TO_ES[from]) return normalizePath(EN_TO_ES[from]);
    if (target === "en" && ES_TO_EN[from]) return normalizePath(ES_TO_EN[from]);

    if (target === "es") {
      if (from.startsWith("/regions/")) {
        return normalizePath("/es/regiones/" + from.slice("/regions/".length));
      }
      if (from.startsWith("/experiences/")) {
        return normalizePath(
          "/es/experiencias/" + from.slice("/experiences/".length)
        );
      }
      if (from === "/") return "/es/";
      return normalizePath("/es" + from);
    }

    if (from.startsWith("/es/regiones/")) {
      return normalizePath("/regions/" + from.slice("/es/regiones/".length));
    }
    if (from.startsWith("/es/experiencias/")) {
      return normalizePath(
        "/experiences/" + from.slice("/es/experiencias/".length)
      );
    }
    if (from.startsWith("/es/")) {
      const stripped = "/" + from.slice("/es/".length);
      return normalizePath(stripped);
    }

    return normalizePath("/");
  }

  function setBodyLock(locked) {
    document.documentElement.classList.toggle("nav-open", locked);
    document.body.style.overflow = locked ? "hidden" : "";
    document.body.style.touchAction = "";
  }

  function showMain(headerEl) {
    const main = qs(headerEl, ".nav-mobile .m-main");
    const subs = qsa(headerEl, ".nav-mobile .m-submenu");
    if (main) main.hidden = false;
    subs.forEach((s) => (s.hidden = true));
  }

  function showSubmenu(headerEl, selector) {
    const main = qs(headerEl, ".nav-mobile .m-main");
    const subs = qsa(headerEl, ".nav-mobile .m-submenu");
    const target = selector ? qs(headerEl, selector) : null;
    if (!target) return;

    if (main) main.hidden = true;
    subs.forEach((s) => (s.hidden = true));
    target.hidden = false;
  }

  function closeMobile(headerEl) {
    const toggle = qs(headerEl, `#${TOGGLE_ID}`);
    if (toggle) toggle.checked = false;
    setBodyLock(false);
    showMain(headerEl);
  }

  function openMobile(headerEl) {
    const toggle = qs(headerEl, `#${TOGGLE_ID}`);
    if (toggle) toggle.checked = true;
    setBodyLock(true);
  }

  function initMobileViews(headerEl) {
    showMain(headerEl);

    const mobileNav = qs(headerEl, ".nav.nav-mobile");
    if (!mobileNav) return;

    mobileNav.addEventListener("click", (e) => {
      const t = e.target;

      const next = t.closest(".m-next");
      if (next && mobileNav.contains(next)) {
        e.preventDefault();
        const targetSel = next.getAttribute("data-target") || "";
        if (targetSel) showSubmenu(headerEl, targetSel);
        return;
      }

      const back = t.closest("[data-back]");
      if (back && mobileNav.contains(back)) {
        e.preventDefault();
        showMain(headerEl);
        return;
      }

      const link = t.closest("a[href]");
      if (link && mobileNav.contains(link)) {
        const href = link.getAttribute("href") || "";
        if (!href || href.charAt(0) === "#") return;
        closeMobile(headerEl);
      }
    });
  }

  function applyI18n(headerEl, onEs) {
    // Swap visible labels
    qsa(headerEl, ".i18n[data-en][data-es]").forEach((el) => {
      const en = el.getAttribute("data-en") || "";
      const es = el.getAttribute("data-es") || "";
      const val = onEs ? es : en;
      if (val) el.textContent = val;
    });

    // Swap hamburger aria-label (label element)
    const burgerLabel = qs(
      headerEl,
      ".nav-toggle-btn[data-en-aria][data-es-aria]"
    );
    if (burgerLabel) {
      const enA = burgerLabel.getAttribute("data-en-aria") || "Menu";
      const esA = burgerLabel.getAttribute("data-es-aria") || "Menu";
      burgerLabel.setAttribute("aria-label", onEs ? esA : enA);
    }
  }

  function initLanguage(headerEl) {
    const current = normalizePath(window.location.pathname || "/");
    const onEs = isSpanishPath(current);
    const targetLang = onEs ? "en" : "es";
    const switchHref = translatePath(current, targetLang);

    // Update all language switch anchors in header (desktop + mobile)
    const switches = qsa(headerEl, "[data-lang-switch]");
    switches.forEach((a) => {
      a.setAttribute("href", switchHref);

      // Label
      if (a.classList.contains("nav-link")) {
        a.textContent = onEs ? "EN" : "ES";
      } else {
        a.textContent = onEs ? "English" : "Espanol";
      }

      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href") || "";
        if (!href || href === "#") return;
        e.preventDefault();
        closeMobile(headerEl);
        window.location.href = href;
      });
    });

    // Rewrite internal header links to match current language
    const allLinks = qsa(headerEl, 'a[href^="/"]');

    allLinks.forEach((link) => {
      if (link.hasAttribute("data-lang-switch")) return;

      const hrefRaw = link.getAttribute("href") || "";
      const href = normalizePath(hrefRaw);

      if (
        href.startsWith("/assets/") ||
        href.startsWith("/favicon") ||
        href.startsWith("/site.webmanifest") ||
        href.startsWith("/apple-touch-icon")
      ) {
        return;
      }

      const newHref = onEs ? translatePath(href, "es") : translatePath(href, "en");
      link.setAttribute("href", newHref);
    });

    // Set html lang + swap labels
    document.documentElement.setAttribute("lang", onEs ? "es" : "en");
    applyI18n(headerEl, onEs);
  }

  function initHeader(headerEl) {
    if (!headerEl || headerEl.__eeNavInit) return;
    headerEl.__eeNavInit = true;

    const toggle = qs(headerEl, `#${TOGGLE_ID}`);
    const toggleBtn = qs(headerEl, `.nav-toggle-btn[for="${TOGGLE_ID}"]`);
    const mobileNav = qs(headerEl, ".nav.nav-mobile");

    if (!toggle || !toggleBtn || !mobileNav) return;

    initMobileViews(headerEl);

    toggle.addEventListener("change", () => {
      if (toggle.checked) openMobile(headerEl);
      else closeMobile(headerEl);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobile(headerEl);
    });

    document.addEventListener("click", (e) => {
      if (!toggle.checked) return;
      if (!headerEl.contains(e.target)) closeMobile(headerEl);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 901) closeMobile(headerEl);
    });

    // Language setup
    initLanguage(headerEl);
  }

  function tryInitFromMount() {
    const mount = document.getElementById(HEADER_MOUNT_ID);
    if (!mount) return false;

    const headerEl = qs(mount, ".topbar") || qs(mount, "header");
    if (!headerEl) return false;

    initHeader(headerEl);
    return true;
  }

  // Try now
  tryInitFromMount();

  // Observe injection
  const mount = document.getElementById(HEADER_MOUNT_ID);
  if (mount) {
    const mo = new MutationObserver(() => {
      if (tryInitFromMount()) mo.disconnect();
    });
    mo.observe(mount, { childList: true, subtree: true });
  }

  // Safety
  window.addEventListener("load", () => {
    tryInitFromMount();
  });
})();
