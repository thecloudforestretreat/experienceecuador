(function () {
  "use strict";

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

  function buildSpanishPath(enPath) {
    var p = normalizePath(enPath || "/");

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

      var location = parts[1];
      return "/es/regiones/" + region + "/" + location + "/";
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
      return "/es/experiencias/" + expRest + "/";
    }

    return "/es" + p;
  }

  function buildEnglishPath(esPath) {
    var p = normalizePath(esPath || "/");

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

      var location = parts[1];
      return "/regions/" + region + "/" + location + "/";
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
      return "/experiences/" + expRest + "/";
    }

    return p.replace(/^\/es\//, "/");
  }

  function getCounterpartPath(path) {
    var p = normalizePath(path || "/");
    return isSpanishPath(p) ? buildEnglishPath(p) : buildSpanishPath(p);
  }

  function translateHref(el, spanish) {
    var explicitHref = spanish ? el.getAttribute("data-es-href") : el.getAttribute("data-en-href");
    if (explicitHref) return explicitHref;

    var currentHref = el.getAttribute("href");
    if (!currentHref) return currentHref;
    if (/^(https?:|mailto:|tel:|#)/i.test(currentHref)) return currentHref;

    return spanish ? buildSpanishPath(currentHref) : buildEnglishPath(currentHref);
  }

  function applyHeaderI18n(root) {
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
    }

    function closeMenu() {
      if (toggle) toggle.checked = false;
      showMainView();
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

  function bootAll() {
    bootHeaderWhenReady();
    bootWhatsAppWhenReady();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAll);
  } else {
    bootAll();
  }

  window.addEventListener("popstate", function () {
    var headerRoot = qs(".topbar");
    if (headerRoot) applyHeaderI18n(headerRoot);

    qsa(".eeWaFab").forEach(function (widget) {
      widget.__eeWaInit = false;
      initWhatsAppWidget(widget);
    });
  });
})();
