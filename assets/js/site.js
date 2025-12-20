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

    // MAIN -> SUBMENU (buttons)
    qsa(headerEl, ".nav-mobile .m-next").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const targetSel = btn.getAttribute("data-target") || "";
        if (!targetSel) return;

        showSubmenu(headerEl, targetSel);
      });
    });

    // SUBMENU -> MAIN (buttons)
    qsa(headerEl, ".nav-mobile [data-back]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        showMain(headerEl);
      });
    });
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
      const inside = headerEl.contains(e.target);
      if (!inside) closeMobile(headerEl);
    });

    // Close after selecting any real link in the mobile menu
    qsa(headerEl, ".nav.nav-mobile a[href]").forEach((a) => {
      a.addEventListener("click", () => {
        const href = a.getAttribute("href") || "";
        if (!href || href.charAt(0) === "#") return;
        closeMobile(headerEl);
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 901) closeMobile(headerEl);
    });
  }

  function tryInitFromMount() {
    const mount = document.getElementById(HEADER_MOUNT_ID);
    if (!mount) return false;

    const headerEl = qs(mount, ".topbar") || qs(mount, "header");
    if (!headerEl) return false;

    initHeader(headerEl);
    return true;
  }

  tryInitFromMount();

  const mount = document.getElementById(HEADER_MOUNT_ID);
  if (mount) {
    const mo = new MutationObserver(() => {
      if (tryInitFromMount()) mo.disconnect();
    });
    mo.observe(mount, { childList: true, subtree: true });
  }

  window.addEventListener("load", () => {
    tryInitFromMount();
  });
})();
