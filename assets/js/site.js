(function () {
  "use strict";

  // GTM LOADER
  (function(){
    var GTM_ID = "GTM-WJQXQR2H";
    if (window.__eeGtmLoaded) return;
    window.__eeGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js"
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    var firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(s, firstScript);
    } else {
      document.head.appendChild(s);
    }
  })();

  // GA LOADER
  (function(){
    var MID = "G-3EDLVGV2HD";
    if (window.gtag) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + MID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', MID, {
      anonymize_ip: true,
      send_page_view: true,
      debug_mode: /[?&]debug_mode=true\b/.test(window.location.search)
    });
  })();


  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function normalizePath(path) {
    var p = path || "/";
    if (p.length > 1 && p.charAt(p.length - 1) !== "/") p += "/";
    return p;
  }

  function isSpanishPath(path) {
    var p = normalizePath(path);
    return p === "/es/" || p.indexOf("/es/") === 0;
  }

  function trimSlashes(str) {
    return String(str || "").replace(/^\/+|\/+$/g, "");
  }

  function mapExperienceSlugToSpanish(slug) {
    var map = {
      "birdwatching": "observacion-de-aves",
      "nature": "naturaleza",
      "adventure": "aventura",
      "culture": "cultura",
      "relaxation": "relajacion",
      "culinary": "culinaria"
    };
    return map[slug] || slug;
  }

  function mapExperienceSlugToEnglish(slug) {
    var map = {
      "observacion-de-aves": "birdwatching",
      "naturaleza": "nature",
      "aventura": "adventure",
      "cultura": "culture",
      "relajacion": "relaxation",
      "culinaria": "culinary"
    };
    return map[slug] || slug;
  }

  function buildSpanishPath(enPath) {
    var p = normalizePath(enPath || "/");
    if (isSpanishPath(p)) return p;

    if (p === "/") return "/es/";
    if (p === "/about/") return "/es/sobre-nosotros/";
    if (p === "/mission/") return "/es/mision/";
    if (p === "/contact/") return "/es/contacto/";
    if (p === "/trip-builder/") return "/es/planificador-de-viajes/";
    if (p === "/partners/") return "/es/aliados/";

    if (p === "/regions/") return "/es/regiones/";
    if (p.indexOf("/regions/") === 0) {
      var regionRest = trimSlashes(p.replace(/^\/regions\//, ""));
      var parts = regionRest ? regionRest.split("/") : [];
      if (!parts.length) return "/es/regiones/";
      var region = parts[0];
      if (region === "amazon") region = "amazonia";
      if (parts.length === 1) return "/es/regiones/" + region + "/";
      return "/es/regiones/" + region + "/" + parts[1] + "/";
    }

    if (p === "/recommendations/") return "/es/recomendados/";
    if (p.indexOf("/recommendations/members/") === 0) {
      var memberRest = trimSlashes(p.replace(/^\/recommendations\/members\//, ""));
      return "/es/recomendados/miembros/" + memberRest + "/";
    }
    if (p.indexOf("/recommendations/") === 0) {
      var recRest = trimSlashes(p.replace(/^\/recommendations\//, ""));
      return "/es/recomendados/" + recRest + "/";
    }

    if (p === "/experiences/") return "/es/experiencias/";
    if (p.indexOf("/experiences/") === 0) {
      var expRest = trimSlashes(p.replace(/^\/experiences\//, ""));
      var expParts = expRest ? expRest.split("/") : [];
      if (!expParts.length) return "/es/experiencias/";
      expParts[0] = mapExperienceSlugToSpanish(expParts[0]);
      return "/es/experiencias/" + expParts.join("/") + "/";
    }

    return "/es" + p;
  }

  function buildEnglishPath(esPath) {
    var p = normalizePath(esPath || "/");
    if (!isSpanishPath(p)) return p;

    if (p === "/es/") return "/";
    if (p === "/es/sobre-nosotros/") return "/about/";
    if (p === "/es/mision/") return "/mission/";
    if (p === "/es/contacto/") return "/contact/";
    if (p === "/es/planificador-de-viajes/") return "/trip-builder/";
    if (p === "/es/aliados/") return "/partners/";

    if (p === "/es/regiones/") return "/regions/";
    if (p.indexOf("/es/regiones/") === 0) {
      var regionRest = trimSlashes(p.replace(/^\/es\/regiones\//, ""));
      var parts = regionRest ? regionRest.split("/") : [];
      if (!parts.length) return "/regions/";
      var region = parts[0];
      if (region === "amazonia") region = "amazon";
      if (parts.length === 1) return "/regions/" + region + "/";
      return "/regions/" + region + "/" + parts[1] + "/";
    }

    if (p === "/es/recomendados/") return "/recommendations/";
    if (p.indexOf("/es/recomendados/miembros/") === 0) {
      var memberRest = trimSlashes(p.replace(/^\/es\/recomendados\/miembros\//, ""));
      return "/recommendations/members/" + memberRest + "/";
    }
    if (p.indexOf("/es/recomendados/") === 0) {
      var recRest = trimSlashes(p.replace(/^\/es\/recomendados\//, ""));
      return "/recommendations/" + recRest + "/";
    }

    if (p === "/es/experiencias/") return "/experiences/";
    if (p.indexOf("/es/experiencias/") === 0) {
      var expRest = trimSlashes(p.replace(/^\/es\/experiencias\//, ""));
      var expParts = expRest ? expRest.split("/") : [];
      if (!expParts.length) return "/experiences/";
      expParts[0] = mapExperienceSlugToEnglish(expParts[0]);
      return "/experiences/" + expParts.join("/") + "/";
    }

    return p.replace(/^\/es\//, "/");
  }

  function getCounterpartPath(path) {
    var p = normalizePath(path || "/");
    return isSpanishPath(p) ? buildEnglishPath(p) : buildSpanishPath(p);
  }

  function getBaseHref(el) {
    var base = el.getAttribute("data-ee-base-href");
    if (base) return base;

    base = el.getAttribute("data-en-href") || el.getAttribute("href") || "";
    el.setAttribute("data-ee-base-href", base);
    return base;
  }

  function translateHref(el, spanish) {
    var explicitHref = spanish ? el.getAttribute("data-es-href") : el.getAttribute("data-en-href");
    if (explicitHref) return explicitHref;

    var baseHref = getBaseHref(el);
    if (!baseHref) return baseHref;
    if (/^(https?:|mailto:|tel:|#)/i.test(baseHref)) return baseHref;

    return spanish ? buildSpanishPath(baseHref) : buildEnglishPath(baseHref);
  }

  function applyHeaderI18n(root) {
    if (!root) return;
    var spanish = isSpanishPath(window.location.pathname || "/");

    qsa(".i18n", root).forEach(function (el) {
      var text = spanish ? el.getAttribute("data-es") : el.getAttribute("data-en");
      var href = translateHref(el, spanish);

      if (text) el.textContent = text;
      if (href) el.setAttribute("href", href);
    });

    qsa("[data-en-aria][data-es-aria]", root).forEach(function (el) {
      var aria = spanish ? el.getAttribute("data-es-aria") : el.getAttribute("data-en-aria");
      if (aria) el.setAttribute("aria-label", aria);
    });

    qsa("[data-lang-switch]", root).forEach(function (el) {
      var targetPath = getCounterpartPath(window.location.pathname || "/");
      var label = spanish ? "EN" : "ES";
      var aria = spanish ? "Switch to English" : "Switch to Spanish";
      el.setAttribute("href", targetPath);
      el.textContent = label;
      el.setAttribute("aria-label", aria);
    });

    qsa(".nav-link, .m-item, .m-back", root).forEach(function (el) {
      if (el.textContent) el.textContent = el.textContent.replace(/\s+/g, " ").trim();
    });
  }

  function refreshHeaderLanguage() {
    var headerRoot = qs(".topbar");
    if (headerRoot) applyHeaderI18n(headerRoot);
  }

  function initModernMobileMenu(root) {
    if (!root || root.__eeMobileInit) return;
    root.__eeMobileInit = true;

    var toggle = qs("#eeNavToggle", root);
    var mobileNav = qs(".nav-mobile", root);
    var mainView = qs(".m-main", root);
    var submenus = qsa(".m-submenu", root);
    var nextButtons = qsa(".m-next[data-target]", root);
    var backButtons = qsa("[data-back]", root);

    function showMainView() {
      if (mainView) mainView.hidden = false;
      submenus.forEach(function (sm) { sm.hidden = true; });
      refreshHeaderLanguage();
    }

    function closeMenu() {
      if (toggle) toggle.checked = false;
      showMainView();
      refreshHeaderLanguage();
    }

    nextButtons.forEach(function (btn) {
      if (btn.__eeBound) return;
      btn.__eeBound = true;
      btn.addEventListener("click", function () {
        var targetSel = btn.getAttribute("data-target");
        var target = targetSel ? qs(targetSel, root) : null;
        if (!target) return;
        if (mainView) mainView.hidden = true;
        submenus.forEach(function (sm) { sm.hidden = true; });
        target.hidden = false;
        refreshHeaderLanguage();
      });
    });

    backButtons.forEach(function (btn) {
      if (btn.__eeBound) return;
      btn.__eeBound = true;
      btn.addEventListener("click", function () {
        showMainView();
      });
    });

    qsa(".nav-mobile a", root).forEach(function (a) {
      if (a.__eeBound) return;
      a.__eeBound = true;
      a.addEventListener("click", function () {
        closeMenu();
      });
    });

    if (toggle && !toggle.__eeBound) {
      toggle.__eeBound = true;
      toggle.addEventListener("change", function () {
        refreshHeaderLanguage();
        if (!toggle.checked) showMainView();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    if (mobileNav) {
      mobileNav.addEventListener("click", function (e) {
        var panel = e.target.closest(".m-panel");
        if (!panel && toggle && toggle.checked) closeMenu();
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });

    showMainView();
  }

  function initHeader(root) {
    if (!root) return;
    applyHeaderI18n(root);
    initModernMobileMenu(root);
  }

  function bootHeaderWhenReady() {
    function tryInit() {
      var headerRoot = qs(".topbar");
      if (!headerRoot) return false;
      initHeader(headerRoot);
      return true;
    }

    if (!tryInit()) {
      var observer = new MutationObserver(function () {
        if (tryInit()) observer.disconnect();
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  function getInlineWaQuestions() {
    var el = document.getElementById("eeWaQuestions");
    if (!el) return null;
    try { return JSON.parse(el.textContent || el.innerText || "{}"); }
    catch (e) { return null; }
  }

  function getCurrentWaConfig() {
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

  function fillWaText(template) {
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

  function initWhatsAppWidget(root) {
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

    var cfg = getCurrentWaConfig() || {};

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
      a.setAttribute("data-wa-message", fillWaText(t || ""));
      a.setAttribute("href", buildWhatsAppUrl(number, fillWaText(t || "")));
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

  function bootWhatsAppWhenReady() {
    function tryInit() {
      var widgets = qsa(".eeWaFab");
      if (!widgets.length) return false;
      widgets.forEach(initWhatsAppWidget);
      return true;
    }

    if (!tryInit()) {
      var observer = new MutationObserver(function () {
        if (tryInit()) observer.disconnect();
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }


  function initCarousel(root) {
    if (!root || root.__eeCarouselInit) return;
    root.__eeCarouselInit = true;

    var track = qs(".carousel-track", root);
    var slides = qsa(".carousel-slide", root);
    var prevBtn = qs(".carousel-btn.prev", root);
    var nextBtn = qs(".carousel-btn.next", root);
    var dotsWrap = qs(".carousel-dots", root);
    var counter = qs(".carousel-counter", root);
    var viewport = qs(".carousel-viewport", root);

    if (!track || !slides.length || !viewport) return;

    var index = 0;
    var AUTOPLAY_MS = 5000;
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var autoplayTimer = null;
    var autoplayEnabled = !prefersReducedMotion;
    var startX = 0;
    var isDown = false;
    var isSpanish = isSpanishPath(window.location.pathname || "/");

    function updateCounter() {
      if (counter) counter.textContent = (index + 1) + " / " + slides.length;
    }

    function updateDots() {
      qsa(".dot", dotsWrap || root).forEach(function (d, i) {
        d.classList.toggle("active", i === index);
      });
    }

    function setIndex(next) {
      index = (next + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      updateDots();
      updateCounter();
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      if (!autoplayEnabled) return;
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        setIndex(index + 1);
      }, AUTOPLAY_MS);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "dot" + (i === 0 ? " active" : "");
        b.setAttribute("aria-label", (isSpanish ? "Ir a la imagen " : "Go to image ") + (i + 1));
        b.addEventListener("click", function () {
          setIndex(i);
          stopAutoplay();
        });
        dotsWrap.appendChild(b);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        setIndex(index - 1);
        stopAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        setIndex(index + 1);
        stopAutoplay();
      });
    }

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        setIndex(index - 1);
        stopAutoplay();
      }
      if (e.key === "ArrowRight") {
        setIndex(index + 1);
        stopAutoplay();
      }
    });

    viewport.addEventListener("pointerdown", function (e) {
      isDown = true;
      startX = e.clientX;
      if (viewport.setPointerCapture) viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointerup", function (e) {
      if (!isDown) return;
      isDown = false;
      var dx = e.clientX - startX;
      var threshold = 40;
      if (dx > threshold) {
        setIndex(index - 1);
        stopAutoplay();
      }
      if (dx < -threshold) {
        setIndex(index + 1);
        stopAutoplay();
      }
    });

    viewport.addEventListener("pointercancel", function () {
      isDown = false;
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", startAutoplay);
    window.addEventListener("resize", function () {
      setIndex(index);
    });

    root.tabIndex = 0;
    buildDots();
    updateCounter();
    setIndex(0);
    startAutoplay();
  }

  function bootCarouselsWhenReady() {
    function tryInit() {
      var carousels = qsa(".carousel");
      if (!carousels.length) return false;
      carousels.forEach(initCarousel);
      return true;
    }

    if (!tryInit()) {
      var observer = new MutationObserver(function () {
        if (tryInit()) observer.disconnect();
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }


  /* ==========================================================================
     EXPERIENCE ECUADOR GLOBAL ANALYTICS ENGINE
     Central source for all page analytics. Pages provide data-analytics-* only.
     ========================================================================== */

  function eeAnalyticsGetPageMeta() {
    var body = document.body || {};
    var path = window.location.pathname || "/";
    return {
      page_type: body.getAttribute ? (body.getAttribute("data-page-type") || "") : "",
      page_language: body.getAttribute ? (body.getAttribute("data-page-language") || (isSpanishPath(path) ? "es" : "en")) : "",
      page_path: path,
      page_title: (document.title || "").trim(),
      region: body.getAttribute ? (body.getAttribute("data-region") || "") : "",
      destination: body.getAttribute ? (body.getAttribute("data-destination") || "") : "",
      experience_type: body.getAttribute ? (body.getAttribute("data-experience-type") || "") : "",
      member_name: body.getAttribute ? (body.getAttribute("data-member-name") || "") : "",
      member_category: body.getAttribute ? (body.getAttribute("data-member-category") || "") : "",
      member_location: body.getAttribute ? (body.getAttribute("data-member-location") || "") : ""
    };
  }

  function eeAnalyticsCleanPayload(payload) {
    var cleaned = {};
    Object.keys(payload || {}).forEach(function (key) {
      var value = payload[key];
      if (value === undefined || value === null) return;
      if (typeof value === "string" && value.trim() === "") return;
      cleaned[key] = value;
    });
    return cleaned;
  }

  function eeAnalyticsSend(eventName, payload) {
    if (!eventName) return false;
    var data = eeAnalyticsCleanPayload(payload || {});
    var sent = false;
    try {
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(Object.assign({ event: eventName }, data));
        sent = true;
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, data);
        sent = true;
      }
    } catch (e) {}
    return sent;
  }

  function eeAnalyticsGetLinkType(href) {
    href = String(href || "");
    if (!href) return "";
    if (/^mailto:/i.test(href)) return "email";
    if (/^tel:/i.test(href)) return "phone";
    if (/^(https?:)?\/\/wa\.me\//i.test(href) || href.indexOf("whatsapp") !== -1) return "whatsapp";
    if (/^#/i.test(href)) return "anchor";
    if (/^https?:\/\//i.test(href) && href.indexOf("experienceecuador.com") === -1) return "outbound";
    return "internal";
  }

  function eeAnalyticsPayloadFromElement(el) {
    var pageMeta = eeAnalyticsGetPageMeta();
    var href = el.getAttribute("href") || "";
    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    return Object.assign({}, pageMeta, {
      cta_label: el.getAttribute("data-analytics-label") || text,
      cta_location: el.getAttribute("data-analytics-location") || "",
      link_text: text,
      link_url: href,
      link_type: eeAnalyticsGetLinkType(href),
      section_name: el.getAttribute("data-analytics-section") || el.getAttribute("data-analytics-location") || "",
      target_language: el.getAttribute("data-analytics-target-language") || "",
      region: el.getAttribute("data-analytics-region") || pageMeta.region,
      experience_type: el.getAttribute("data-analytics-experience") || pageMeta.experience_type,
      member_name: el.getAttribute("data-analytics-member") || pageMeta.member_name || el.getAttribute("data-title") || "",
      member_category: el.getAttribute("data-category") || pageMeta.member_category,
      member_location: el.getAttribute("data-location") || pageMeta.member_location,
      partner_name: el.getAttribute("data-analytics-partner") || "",
      form_name: el.getAttribute("data-analytics-form") || "",
      item_id: el.getAttribute("data-id") || "",
      action: el.getAttribute("data-action") || ""
    });
  }

  function eeAnalyticsInferEvent(el) {
    if (!el || !el.getAttribute) return "";
    var explicit = el.getAttribute("data-analytics-event");
    if (explicit) return explicit;
    var href = el.getAttribute("href") || "";
    var type = eeAnalyticsGetLinkType(href);
    if (type === "email") return "member_email_click";
    if (type === "whatsapp") return "member_whatsapp_click";
    if (type === "outbound") return "outbound_link_click";
    if (type === "internal" || type === "anchor") return "internal_link_click";
    return "";
  }

  function eeAnalyticsTrackClick(el) {
    var eventName = eeAnalyticsInferEvent(el);
    if (!eventName) return;
    eeAnalyticsSend(eventName, eeAnalyticsPayloadFromElement(el));
  }

  function eeAnalyticsInitClicks() {
    if (document.__eeAnalyticsClicksInit) return;
    document.__eeAnalyticsClicksInit = true;
    document.addEventListener("click", function (e) {
      var el = e.target && e.target.closest ? e.target.closest("[data-analytics-event], a[href]") : null;
      if (!el) return;
      if (!el.getAttribute("data-analytics-event") && el.tagName !== "A") return;
      eeAnalyticsTrackClick(el);
    }, true);
  }

  function eeAnalyticsInitPageView() {
    if (window.__eeAnalyticsPageViewSent) return;
    window.__eeAnalyticsPageViewSent = true;
    eeAnalyticsSend("page_view_enhanced", eeAnalyticsGetPageMeta());
  }

  function eeAnalyticsInitScrollDepth() {
    if (window.__eeAnalyticsScrollDepthInit) return;
    window.__eeAnalyticsScrollDepthInit = true;
    var marks = {25:false, 50:false, 75:false, 90:false};
    function checkScrollDepth() {
      var doc = document.documentElement;
      var body = document.body;
      if (!doc || !body) return;
      var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
      var height = Math.max(body.scrollHeight, doc.scrollHeight, body.offsetHeight, doc.offsetHeight, body.clientHeight, doc.clientHeight);
      var viewport = window.innerHeight || doc.clientHeight || 0;
      var percent = height <= viewport ? 100 : Math.round(((scrollTop + viewport) / height) * 100);
      [25, 50, 75, 90].forEach(function (mark) {
        if (!marks[mark] && percent >= mark) {
          marks[mark] = true;
          eeAnalyticsSend("scroll_depth", Object.assign({}, eeAnalyticsGetPageMeta(), { scroll_percent: mark }));
        }
      });
    }
    window.addEventListener("scroll", checkScrollDepth, { passive: true });
    window.addEventListener("load", checkScrollDepth);
    setTimeout(checkScrollDepth, 800);
  }

  function eeAnalyticsInitForms() {
    if (document.__eeAnalyticsFormsInit) return;
    document.__eeAnalyticsFormsInit = true;
    document.addEventListener("submit", function (e) {
      var form = e.target;
      if (!form || !form.getAttribute) return;
      var formName = form.getAttribute("data-analytics-form") || form.getAttribute("name") || form.getAttribute("id") || "form";
      eeAnalyticsSend("form_submit_success", Object.assign({}, eeAnalyticsGetPageMeta(), { form_name: formName }));
    }, true);
    document.addEventListener("focusin", function (e) {
      var form = e.target && e.target.closest ? e.target.closest("form") : null;
      if (!form || form.__eeAnalyticsFormStarted) return;
      form.__eeAnalyticsFormStarted = true;
      var formName = form.getAttribute("data-analytics-form") || form.getAttribute("name") || form.getAttribute("id") || "form";
      eeAnalyticsSend("form_start", Object.assign({}, eeAnalyticsGetPageMeta(), { form_name: formName }));
    }, true);
  }

  function eeAnalyticsBoot() {
    eeAnalyticsInitPageView();
    eeAnalyticsInitScrollDepth();
    eeAnalyticsInitClicks();
    eeAnalyticsInitForms();
  }

  window.eeAnalytics = {
    send: eeAnalyticsSend,
    pageMeta: eeAnalyticsGetPageMeta,
    trackClick: eeAnalyticsTrackClick
  };

  function bootAll() {
    eeAnalyticsBoot();
    bootHeaderWhenReady();
    bootWhatsAppWhenReady();
    bootCarouselsWhenReady();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAll);
  } else {
    bootAll();
  }

  window.addEventListener("popstate", function () {
    refreshHeaderLanguage();
    qsa(".eeWaFab").forEach(function (widget) {
      widget.__eeWaInit = false;
      initWhatsAppWidget(widget);
    });
  });

  window.addEventListener("pageshow", function () {
    refreshHeaderLanguage();
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refreshHeaderLanguage();
  });
})();
