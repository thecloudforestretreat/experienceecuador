/* /assets/js/site.js
   Global header behavior for ExperienceEcuador.com
   Works even when header.html is injected AFTER this script loads.
*/
(function () {
  "use strict";

  const HEADER_MOUNT_ID = "siteHeader";
  const TOGGLE_ID = "eeNavToggle";

  function qs(root, sel) {
    return root ? root.querySelector(sel) : null;
  }
  function qsa(root, sel) {
    return root ? Array.from(root.querySelectorAll(sel)) : [];
  }

  function setBodyLock(locked) {
    document.documentElement.classList.toggle("nav-open", locked);
    document.body.style.overflow = locked ? "hidden" : "";
    document.body.style.touchAction = locked ? "none" : "";
  }

  function closeMobile(headerEl) {
    const toggle = qs(headerEl, `#${TOGGLE_ID}`);
    if (toggle) toggle.checked = false;
    setBodyLock(false);

    // Always return to main view on close
    const panel = qs(headerEl, ".nav-mobile .m-panel");
    const main = qs(headerEl, ".nav-mobile .m-main");
    const subs = qsa(headerEl, ".nav-mobile .m-submenu");
    if (panel && main) {
      main.hidden = false;
      subs.forEach((s) => (s.hidden = true));
    }
  }

  function openMobile(headerEl) {
    const toggle = qs(headerEl, `#${TOGGLE_ID}`);
    if (toggle) toggle.checked = true;
    setBodyLock(true);
  }

  function initMobileViews(headerEl) {
    const main = qs(headerEl, ".nav-mobile .m-main");
    const subs = qsa(headerEl, ".nav-mobile .m-submenu");

    if (main) main.hidden = false;
    subs.forEach((s) => (s.hidden = true));

    // MAIN -> SUBMENU
    qsa(headerEl, ".nav-mobile .m-next").forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        e.preventDefault();

        const target = qs(headerEl, href);
        if (!target) return;

        if (main) main.hidden = true;
        subs.forEach((s) => (s.hidden = true));
        target.hidden = false;
      });
    });

    // SUBMENU -> MAIN
    qsa(headerEl, ".nav-mobile .m-back").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (main) main.hidden = false;
        subs.forEach((s) => (s.hidden = true));
      });
    });
  }

  function initHeader(headerEl) {
    if (!headerEl || headerEl.__eeNavInit) return;
    headerEl.__eeNavInit = true;

    const toggle = qs(headerEl, `#${TOGGLE_ID}`);
    const toggleBtn = qs(headerEl, `.nav-toggle-btn[for="${TOGGLE_ID}"]`);
    const mobileNav = qs(headerEl, ".nav.nav-mobile");

    // If the include changed or did not mount correctly, do nothing
    if (!toggle || !toggleBtn || !mobileNav) return;

    initMobileViews(headerEl);

    // Ensure opening the checkbox locks scroll (CSS-only menus often miss this)
    toggle.addEventListener("change", () => {
      if (toggle.checked) openMobile(headerEl);
      else closeMobile(headerEl);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobile(headerEl);
    });

    // Close when tapping outside the header
    document.addEventListener("click", (e) => {
      if (!toggle.checked) return;
      const inside = headerEl.contains(e.target);
      if (!inside) closeMobile(headerEl);
    });

    // Close after selecting any real link in the mobile menu
    qsa(headerEl, ".nav.nav-mobile a[href]").forEach((a) => {
      a.addEventListener("click", () => {
        const href = a.getAttribute("href") || "";
        if (href.startsWith("#")) return; // submenu nav stays open
        closeMobile(headerEl);
      });
    });

    // Close if switching to desktop width
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 901) closeMobile(headerEl);
    });
  }

  function tryInitFromMount() {
    const mount = document.getElementById(HEADER_MOUNT_ID);
    if (!mount) return false;

    // header include root
    const headerEl = qs(mount, ".topbar") || qs(mount, "header");
    if (!headerEl) return false;

    initHeader(headerEl);
    return true;
  }

  // 1) Try immediately (for pages where header is already in DOM)
  tryInitFromMount();

  // 2) Observe the mount, because your pages inject header AFTER site.js loads
  const mount = document.getElementById(HEADER_MOUNT_ID);
  if (mount) {
    const mo = new MutationObserver(() => {
      if (tryInitFromMount()) mo.disconnect();
    });
    mo.observe(mount, { childList: true, subtree: true });
  }

  // 3) Safety: if something injects later than expected, try again after load
  window.addEventListener("load", () => {
    tryInitFromMount();
  });
})();
