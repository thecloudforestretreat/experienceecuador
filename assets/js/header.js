(function () {
  function qs(sel, root = document) { return root.querySelector(sel); }
  function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  const topbar = qs('.topbar');
  if (!topbar) return;

  // Desktop dropdowns (Regions/Experiences)
  qsa('[data-dd]', topbar).forEach(dd => {
    const btn = qs('.dropbtn', dd);
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.contains('open');
      qsa('[data-dd].open', topbar).forEach(x => x.classList.remove('open'));
      dd.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!topbar.contains(e.target)) {
      qsa('[data-dd].open', topbar).forEach(x => {
        x.classList.remove('open');
        const b = qs('.dropbtn', x);
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile hamburger
  const toggle = qs('.nav-toggle', topbar);
  const drawer = qs('#mobileNav', topbar);
  const backdrop = qs('[data-mobile-backdrop]', topbar);

  function openMobile() {
    if (!drawer || !backdrop || !toggle) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMobile() {
    if (!drawer || !backdrop || !toggle) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
    document.documentElement.style.overflow = '';
  }

  if (toggle && drawer && backdrop) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) closeMobile();
      else openMobile();
    });

    backdrop.addEventListener('click', closeMobile);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobile();
    });

    // Close after clicking any link inside drawer
    qsa('a', drawer).forEach(a => a.addEventListener('click', closeMobile));
  }
})();
