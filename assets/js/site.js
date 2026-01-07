/* /assets/js/site.js
   ExperienceEcuador.com - Global header behavior
   - Works with injected /assets/includes/header.html
   - Hamburger open/close + scroll lock
   - Mobile drill-down menus (data-target / data-back)
   - Language switch (EN <-> ES) + header link rewriting + i18n labels
   - Google Analytics 4 loader (runs even when header is injected via innerHTML)
   - GA4 Events: WhatsApp clicks + Contact form submits + Trip Builder start/submit
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
  })();

  /* =========================
     GA4 Events: WhatsApp clicks + Contact form submits + Trip Builder
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

    /* -------------------------
       1) WhatsApp link clicks
       ------------------------- */
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

    /* -------------------------
       2) Contact form submits
       Recommended: add data-ga="contact_form" to the form element you want to track.
       ------------------------- */
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

    /* -------------------------
       3) Trip Builder events
       trip_builder_start: fires once on first meaningful interaction
       trip_builder_submit: fires when clicking "Generate Itinerary"
       ------------------------- */
    (function initTripBuilderEvents() {
      var started = false;

      function byId(id) {
        return document.getElementById(id);
      }

      function isTripBuilderPage() {
        // Detect by required elements that exist on both EN and ES pages.
        return !!(
          byId("daysSelect") &&
          byId("regionsPills") &&
          byId("experiencesPills") &&
          byId("generateBtn")
        );
      }

      function getSelectedPillCount(containerId) {
        var root = byId(containerId);
        if (!root) return 0;
        return root.querySelectorAll('.pill[aria-pressed="true"]').length;
      }

      function fireStart(reason) {
        if (started) return;
        started = true;

        track("trip_builder_start", {
          trigger: String(reason || "unknown"),
          page_path: window.location.pathname || "/"
        });
      }

      function fireSubmit() {
        var daysEl = byId("daysSelect");
        var daysVal = daysEl ? String(daysEl.value || "") : "";
        var regionsCount = getSelectedPillCount("regionsPills");
        var experiencesCount = getSelectedPillCount("experiencesPills");

        track("trip_builder_submit", {
          days: daysVal,
          regions_selected: regionsCount,
          experiences_selected: experiencesCount,
          page_path: window.location.pathname || "/"
        });
      }

      if (!isTripBuilderPage()) return;

      document.addEventListener(
        "change",
        function (e) {
          var t = e.target;
          if (!t) return;
          if (t.id === "daysSelect") fireStart("days_change");
        },
        true
      );

      document.addEventListener(
        "click",
        function (e) {
          var t = e.target;
          if (!t) return;

          var inRegions = t.closest ? t.closest("#regionsPills .pill") : null;
          var inExperiences = t.closest
            ? t.closest("#experiencesPills .pill")
            : null;

          if (inRegions) fireStart("region_select");
          if (inExperiences) fireStart("experience_select");

          var genBtn = t.closest ? t.closest("#generateBtn") : null;
          if (genBtn) {
            fireStart("generate_click");
            if (!genBtn.disabled) fireSubmit();
          }
        },
        true
      );
    })();
  })();

  /* =========================
     Header / Mobile Nav / Language
     ========================= */
  var HEADER_MOUNT_ID = "siteHeader";
  var TOGGLE_ID = "eeNavToggle";

  function qs(root, sel) {
    return root ? root.querySelector(sel) : null;
  }
  function qsa(root, sel) {
    return root ? Array.from(root.querySelectorAll(sel)) : [];
  }

  function normalizePath(p) {
    var path = String(p || "/").trim();

    // Keep hashes/queries out of normalization
    // (they should not be translated by our path mapper)
    if (path.indexOf("#") !== -1) path = path.split("#")[0] || "/";
    if (path.indexOf("?") !== -1) path = path.split("?")[0] || "/";

    if (!path.startsWith("/")) path = "/" + path;
    if (!path.endsWith("/")) path += "/";
    path = path.replace(/\/{2,}/g, "/");
    return path;
  }

  function isSpanishPath(pathname) {
    var p = normalizePath(pathname);
    return p === "/es/" || p.startsWith("/es/");
  }

  // Explicit page mappings (top-level slugs and key sections)
  var EN_TO_ES = {
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
  var ES_TO_EN = (function () {
    var m = {};
    Object.keys(EN_TO_ES).forEach(function (en) {
      m[EN_TO_ES[en]] = en;
    });
    return m;
  })();

  // Fallback rules for deeper pages
  function translatePath(pathname, toLang) {
    var from = normalizePath(pathname);
    var target = String(toLang || "en").toLowerCase() === "es" ? "es" : "en";

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
      var stripped = "/" + from.slice("/es/".length);
      return normalizePath(stripped);
    }

    return normalizePath("/");
  }

  function setBodyLock(locked) {
    document.documentElement.classList.toggle("nav-open", locked);
    document.body.style.overflow = locked ? "hidden" : "";
    // Helps iOS prevent background scroll while menu is open
    document.body.style.touchAction = locked ? "none" : "";
  }

  function showMain(headerEl) {
    var main = qs(headerEl, ".nav-mobile .m-main");
    var subs = qsa(headerEl, ".nav-mobile .m-submenu");
    if (main) main.hidden = false;
    subs.forEach(function (s) {
      s.hidden = true;
    });
  }

  function showSubmenu(headerEl, selector) {
    var main = qs(headerEl, ".nav-mobile .m-main");
    var subs = qsa(headerEl, ".nav-mobile .m-submenu");
    var target = selector ? qs(headerEl, selector) : null;
    if (!target) return;

    if (main) main.hidden = true;
    subs.forEach(function (s) {
      s.hidden = true;
    });
    target.hidden = false;
  }

  function closeMobile(headerEl) {
    var toggle = qs(headerEl, "#" + TOGGLE_ID);
    if (toggle) toggle.checked = false;
    setBodyLock(false);
    showMain(headerEl);
  }

  function openMobile(headerEl) {
    var toggle = qs(headerEl, "#" + TOGGLE_ID);
    if (toggle) toggle.checked = true;
    // Always open to main view (prevents "all submenus visible" states)
    showMain(headerEl);
    setBodyLock(true);
  }

  function initMobileViews(headerEl) {
    showMain(headerEl);

    var mobileNav = qs(headerEl, ".nav.nav-mobile");
    if (!mobileNav) return;

    mobileNav.addEventListener("click", function (e) {
      var t = e.target;
      if (!t) return;

      var next = t.closest ? t.closest(".m-next") : null;
      if (next && mobileNav.contains(next)) {
        e.preventDefault();
        var targetSel = next.getAttribute("data-target") || "";
        if (targetSel) showSubmenu(headerEl, targetSel);
        return;
      }

      var back = t.closest ? t.closest("[data-back]") : null;
      if (back && mobileNav.contains(back)) {
        e.preventDefault();
        showMain(headerEl);
        return;
      }

      var link = t.closest ? t.closest("a[href]") : null;
      if (link && mobileNav.contains(link)) {
        var href = link.getAttribute("href") || "";
        if (!href || href.charAt(0) === "#") return;
        closeMobile(headerEl);
      }
    });
  }

  function applyI18n(headerEl, onEs) {
    qsa(headerEl, ".i18n[data-en][data-es]").forEach(function (el) {
      var en = el.getAttribute("data-en") || "";
      var es = el.getAttribute("data-es") || "";
      var val = onEs ? es : en;
      if (val) el.textContent = val;
    });

    var burgerLabel = qs(
      headerEl,
      '.nav-toggle-btn[data-en-aria][data-es-aria]'
    );
    if (burgerLabel) {
      var enA = burgerLabel.getAttribute("data-en-aria") || "Menu";
      var esA = burgerLabel.getAttribute("data-es-aria") || "Menu";
      burgerLabel.setAttribute("aria-label", onEs ? esA : enA);
    }
  }

  function initLanguage(headerEl) {
    var current = normalizePath(window.location.pathname || "/");
    var onEs = isSpanishPath(current);
    var targetLang = onEs ? "en" : "es";
    var switchHref = translatePath(current, targetLang);

    var switches = qsa(headerEl, "[data-lang-switch]");
    switches.forEach(function (a) {
      a.setAttribute("href", switchHref);

      // Keep ASCII
      if (a.classList.contains("nav-link")) {
        a.textContent = onEs ? "EN" : "ES";
      } else {
        a.textContent = onEs ? "English" : "Espanol";
      }

      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href") || "";
        if (!href || href === "#") return;
        e.preventDefault();
        closeMobile(headerEl);
        window.location.href = href;
      });
    });

    // Rewrite internal header links to match current language
    var allLinks = qsa(headerEl, 'a[href^="/"]');
    allLinks.forEach(function (link) {
      if (link.hasAttribute("data-lang-switch")) return;

      var hrefRaw = link.getAttribute("href") || "";
      // Skip anchors/queries (do not translate these)
      if (hrefRaw.indexOf("#") !== -1 || hrefRaw.indexOf("?") !== -1) return;

      var href = normalizePath(hrefRaw);

      if (
        href.startsWith("/assets/") ||
        href.startsWith("/favicon") ||
        href.startsWith("/site.webmanifest") ||
        href.startsWith("/apple-touch-icon")
      ) {
        return;
      }

      var newHref = onEs ? translatePath(href, "es") : translatePath(href, "en");
      link.setAttribute("href", newHref);
    });

    document.documentElement.setAttribute("lang", onEs ? "es" : "en");
    applyI18n(headerEl, onEs);
  }

  function initHeader(headerEl) {
    if (!headerEl || headerEl.__eeNavInit) return;
    headerEl.__eeNavInit = true;

    var toggle = qs(headerEl, "#" + TOGGLE_ID);
    var mobileNav = qs(headerEl, ".nav.nav-mobile");
    if (!toggle || !mobileNav) return;

    initMobileViews(headerEl);

    toggle.addEventListener("change", function () {
      if (toggle.checked) openMobile(headerEl);
      else closeMobile(headerEl);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobile(headerEl);
    });

    document.addEventListener("click", function (e) {
      if (!toggle.checked) return;
      if (!headerEl.contains(e.target)) closeMobile(headerEl);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 901) closeMobile(headerEl);
    });

    // Language setup
    initLanguage(headerEl);
  }

  function tryInitFromMount() {
    var mount = document.getElementById(HEADER_MOUNT_ID);
    if (!mount) return false;

    // Be flexible about markup: header might be <header class="topbar"> or <div class="topbar">
    var headerEl = qs(mount, ".topbar") || qs(mount, "header") || qs(mount, "[data-header]");
    if (!headerEl) return false;

    initHeader(headerEl);
    return true;
  }

  // Try now
  tryInitFromMount();

  // Observe injection
  var mount = document.getElementById(HEADER_MOUNT_ID);
  if (mount) {
    var mo = new MutationObserver(function () {
      if (tryInitFromMount()) mo.disconnect();
    });
    mo.observe(mount, { childList: true, subtree: true });
  }

  // Safety
  window.addEventListener("load", function () {
    tryInitFromMount();
  });
})();
