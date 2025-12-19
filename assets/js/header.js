(function () {
  function qs(sel, root = document) { return root.querySelector(sel); }
  function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  function closeDesktopDropdowns() {
    qsa('.topbar .dropdown.open').forEach(d => d.classList.remove('open'));
    qsa('.topbar .dropdown .dropbtn').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }

  function initDesktopDropdowns() {
    qsa('.topbar [data-dd]').forEach(dd => {
      const btn = qs('.dropbtn', dd);
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dd.classList.contains('open');
        closeDesktopDropdowns();
        if (!isOpen) {
          dd.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', (e) => {
      const inside = e.target.closest('.topbar [data-dd]');
      if (!inside) closeDesktopDropdowns();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDesktopDropdowns();
    });
  }

  function setMobileOpen(isOpen) {
    const toggle = qs('.topbar .nav-toggle');
    const panel = qs('.topbar .mobile-nav');
    if (!toggle || !panel) return;

    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    panel.hidden = !isOpen;

    if (!isOpen) {
      qsa('.topbar .mobile-accordion').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      qsa('.topbar .mobile-submenu').forEach(sm => sm.hidden = true);
    }
  }

  function initMobileMenu() {
    const toggle = qs('.topbar .nav-toggle');
    const panel = qs('.topbar .mobile-nav');
    if (!toggle || !panel) return;

    setMobileOpen(false);

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      setMobileOpen(!open);
    });

    qsa('.topbar .mobile-accordion').forEach(btn => {
      const targetId = btn.getAttribute('aria-controls');
      const target = targetId ? document.getElementById(targetId) : null;

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (target) target.hidden = isOpen;
      });
    });

    // Close on click outside the menu area (mobile only)
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 620) return;
      const insideHeader = e.target.closest('.topbar');
      if (!insideHeader) setMobileOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    });

    // If you rotate or resize to desktop, close mobile menu
    window.addEventListener('resize', () => {
      if (window.innerWidth > 620) setMobileOpen(false);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDesktopDropdowns();
    initMobileMenu();
  });
})();
