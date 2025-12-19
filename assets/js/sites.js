/* /assets/js/site.js
   Global header/footer behavior for ExperienceEcuador.com
   - Works with pages that inject /assets/includes/header.html and footer.html
   - Binds hamburger + mobile drill-down menus even if header is injected AFTER this script loads
*/

(function () {
  "use strict";

  // ---------------------------
  // Small utilities
  // ---------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function on(el, evt, fn, opts) {
    if (!el) return;
    el.addEventListener(evt, fn, opts || false);
  }

  function lockBody(lock) {
    // Prevent scroll bleed when menu open (mobile)
    // Use a class so CSS can do the right thing if needed
    document.documentElement.classList.toggle("menu-open", !!lock);
    document.body.classList.toggle("menu-open", !!lock);
  }

  // ---------------------------
  // Header behavior (hamburger + drill-down)
  // ---------------------------
  function initHeaderBehavior() {
    const mount = $("#siteHeader");
    if (!mount) return false;

    // Find a header root inside injected markup
    // Support multiple selector styles to avoid brittle coupling.
    const headerRoot =
      $("[data-site-header]", mount) ||
      $(".site-header", mount) ||
      $("header", mount) || // NOTE: This is inside injected include, not page-level markup
      mount;

    // If nothing injected yet, bail
    if (!headerRoot || headerRoot === mount) {
      // mount exists but may still be empty
      const hasContent = mount.children && mount.children.length > 0;
      if (!hasContent) return false;
    }

    // Prevent duplicate binding if init runs multiple times
    if (headerRoot && headerRoot.__eeBound) return true;
    if (headerRoot) headerRoot.__eeBound = true;

    // ---- Core elements (flexible selectors) ----
    const toggle =
      $("[data-menu-toggle]", headerRoot) ||
      $(".js-menu-toggle", headerRoot) ||
      $("#menuToggle", headerRoot) ||
      $("[aria-controls='mobileMenu']", headerRoot);

    const mobileMenu =
      $("[data-mobile-menu]", headerRoot) ||
      $(".js-mobile-menu", headerRoot) ||
      $("#mobileMenu", headerRoot);

    const overlay =
      $("[data-menu-overlay]", headerRoot) ||
      $(".js-menu-overlay", headerRoot) ||
      $("#mobileMenuOverlay", headerRoot);

    // Panels (main + submenus) for drill-down UX
    const panelMain =
      $("[data-menu-panel='main']", headerRoot) ||
      $(".js-menu-panel-main", headerRoot) ||
      $("#mobileMenuMain", headerRoot);

    const panelRegions =
      $("[data-menu-panel='regions']", headerRoot) ||
      $(".js-menu-panel-regions", headerRoot) ||
      $("#mobileMenuRegions", headerRoot);

    const panelExperiences =
      $("[data-menu-panel='experiences']", headerRoot) ||
      $(".js-menu-panel-experiences", headerRoot) ||
      $("#mobileMenuExperiences", headerRoot);

    // Triggers for submenus
    const regionsTrigger =
      $("[data-open-submenu='regions']", headerRoot) ||
      $(".js-open-regions", headerRoot) ||
      $("[data-submenu='regions']", headerRoot);

    const experiencesTrigger =
      $("[data-open-submenu='experiences']", headerRoot) ||
      $(".js-open-experiences", headerRoot) ||
      $("[data-submenu='experiences']", headerRoot);

    // Back actions
    const backButtons = $$(
      "[data-menu-back], .js-menu-back, [data-back], .menu-back",
      headerRoot
    );

    // Close buttons (optional)
    const closeButtons = $$(
      "[data-menu-close], .js-menu-close, .menu-close",
      headerRoot
    );

    // If the include uses only desktop nav and no mobile menu, we still mark bound and return.
    // But hamburger won't exist, which is fine.
    if (!toggle || !mobileMenu) return true;

    // Accessibility defaults
    if (!toggle.getAttribute("aria-expanded")) toggle.setAttribute("aria-expanded", "false");

    function showPanel(name) {
      // If panels exist, switch them, otherwise do nothing.
      const panels = [panelMain, panelRegions, panelExperiences].filter(Boolean);
      if (!panels.length) return;

      panels.forEach((p) => p.classList.remove("is-active"));
      if (name === "regions" && panelRegions) panelRegions.classList.add("is-active");
      else if (name === "experiences" && panelExperiences) panelExperiences.classList.add("is-active");
      else if (panelMain) panelMain.classList.add("is-active");
    }

    function openMenu() {
      mobileMenu.classList.add("is-open");
      if (overlay) overlay.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      lockBody(true);
      showPanel("main");
    }

    function closeMenu() {
      mobileMenu.classList.remove("is-open");
      if (overlay) overlay.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      lockBody(false);
      showPanel("main");
    }

    function isOpen() {
      return mobileMenu.classList.contains("is-open");
    }

    // Toggle hamburger
    on(toggle, "click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen()) closeMenu();
      else openMenu();
    });

    // Overlay click closes
    on(overlay, "click", (e) => {
      e.preventDefault();
      closeMenu();
    });

    // Close buttons (if present)
    closeButtons.forEach((btn) => {
      on(btn, "click", (e) => {
        e.preventDefault();
        closeMenu();
      });
    });

    // Drill-down open
    on(regionsTrigger, "click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showPanel("regions");
    });

    on(experiencesTrigger, "click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showPanel("experiences");
    });

    // Back buttons go to main
    backButtons.forEach((btn) => {
      on(btn, "click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        showPanel("main");
      });
    });

    // ESC closes
    on(document, "keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Click outside closes (only when open)
    on(document, "click", (e) => {
      if (!isOpen()) return;
      const target = e.target;
      if (!target) return;
      if (mobileMenu.contains(target) || toggle.contains(target)) return;
      closeMenu();
    });

    // If user rotates / resizes to desktop, ensure body unlock
    on(window, "resize", () => {
      if (!isOpen()) return;
      // If the menu becomes irrelevant (desktop), just unlock scrolling safely.
      // Keep menu open state as-is; CSS can decide visibility.
      lockBody(true);
    });

    return true;
  }

  // ---------------------------
  // Ensure init runs AFTER injection
  // ---------------------------
  function boot() {
    // Try immediately
    initHeaderBehavior();

    // Observe header mount for injected content changes
    const mount = document.getElementById("siteHeader");
    if (!mount) return;

    const obs = new MutationObserver(() => {
      // Try to init whenever content changes
      initHeaderBehavior();
    });

    obs.observe(mount, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
