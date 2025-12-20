/* /assets/js/site.js
   ExperienceEcuador.com — Global header behavior
   - Works with injected /assets/includes/header.html
   - Hamburger open/close + scroll lock
   - Mobile drill-down menus (data-target / data-back)
   - Uses event delegation so taps on inner spans still work
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
    // NOTE: removing touchAction prevents iOS weird tap issues
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

    // Event delegation (fixes “tap on span doesn’t work”)
    mobileNav.addEventListener("click", (e) => {
      const t = e.target;

      // Drill-down forward
      const next = t.closest(".m-next");
      if (next && mobileNav.contains(next)) {
        e.preventDefault();
        const targetSel = next.getAttribute("data-target") || "";
        if (targetSel) showSubmenu(headerEl, targetSel);
        return;
      }

      // Back to main
      const back = t.closest("[data-back]");
      if (back && mobileNav.contains(back)) {
        e.preventDefault();
        showMain(headerEl);
        return;
      }

      // Normal link click inside mobile menu closes the menu
      const link = t.closest('a[href]');
      if (link && mobileNav.contains(link)) {
        const href = link.getAttribute("href") || "";
        if (!href || href.charAt(0) === "#") return;
        closeMobile(headerEl);
      }
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
      if (!headerEl.contains(e.target)) closeMobile(headerEl);
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
