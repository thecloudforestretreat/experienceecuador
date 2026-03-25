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

  function applyI18n(root) {
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
    applyI18n(root);
    initModernMobileMenu(root);
  }

  function bootWhenReady() {
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootWhenReady);
  } else {
    bootWhenReady();
  }

  window.addEventListener("popstate", function () {
    var headerRoot = qs(".topbar");
    if (headerRoot) applyI18n(headerRoot);
  });
})();
