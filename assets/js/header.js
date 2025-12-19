(function(){
  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function closeAllDesktopDropdowns(){
    qsa('.topbar .dropdown.open').forEach(dd => dd.classList.remove('open'));
    qsa('.topbar .dropbtn[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
  }

  function openDesktopDropdown(dd){
    closeAllDesktopDropdowns();
    dd.classList.add('open');
    const btn = qs('.dropbtn', dd);
    if(btn) btn.setAttribute('aria-expanded','true');
  }

  function isMobile(){
    return window.matchMedia && window.matchMedia('(max-width: 720px)').matches;
  }

  // Build mobile drawer once, based on your existing nav markup
  function ensureMobilePanel(){
    const topbar = qs('.topbar');
    if(!topbar) return;

    if(qs('.menu-toggle', topbar)) return; // already built

    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label','Open menu');
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML = `
      <span class="burger" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span>Menu</span>
    `;

    // Insert toggle on the right side of topbar-inner
    const inner = qs('.topbar-inner', topbar);
    inner.appendChild(toggle);

    const panel = document.createElement('div');
    panel.className = 'mobile-panel';
    panel.innerHTML = `
      <div class="mobile-backdrop" data-close></div>
      <div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
        <div class="mobile-drawer-header">
          <div class="mobile-drawer-title">Menu</div>
          <button class="mobile-close" type="button" data-close aria-label="Close menu">Close</button>
        </div>
        <div class="mobile-drawer-body">
          <div class="mobile-links" data-mobile-links></div>
        </div>
      </div>
    `;
    topbar.appendChild(panel);

    function openPanel(){
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded','true');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closePanel(){
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      if(panel.classList.contains('is-open')) closePanel();
      else openPanel();
    });

    qsa('[data-close]', panel).forEach(el => el.addEventListener('click', closePanel));

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });

    // Populate links
    const nav = qs('.topbar .nav');
    const mount = qs('[data-mobile-links]', panel);
    if(nav && mount){
      // Primary links in the order you want for mobile:
      // Home, About, Mission, Contact, then Regions submenu, Experiences submenu, Trip Builder
      const home = qs('.nav-home', nav);
      const about = qs('.nav-about', nav);
      const mission = qs('.nav-mission', nav);
      const contact = qs('.nav-contact', nav);
      const trip = qs('.nav-trip', nav);

      const regionsDD = qs('.nav-regions.dropdown', nav);
      const expDD = qs('.nav-experiences.dropdown', nav);

      function cloneLink(a){
        if(!a) return null;
        const c = a.cloneNode(true);
        c.removeAttribute('class');
        c.addEventListener('click', () => closePanel());
        return c;
      }

      // Top links
      const topWrap = document.createElement('div');
      topWrap.className = 'mobile-links';
      [home, about, mission, contact].forEach(a => {
        const c = cloneLink(a);
        if(c) topWrap.appendChild(c);
      });

      // Regions section
      const regionsSection = document.createElement('div');
      regionsSection.className = 'mobile-section';
      regionsSection.innerHTML = `<div class="mobile-section-title">Regions</div><div class="mobile-sub"></div>`;
      const regionsSub = qs('.mobile-sub', regionsSection);
      if(regionsDD){
        qsa('.dropdown-menu a', regionsDD).forEach(a => {
          const c = cloneLink(a);
          if(c) regionsSub.appendChild(c);
        });
      }

      // Experiences section
      const expSection = document.createElement('div');
      expSection.className = 'mobile-section';
      expSection.innerHTML = `<div class="mobile-section-title">Experiences</div><div class="mobile-sub"></div>`;
      const expSub = qs('.mobile-sub', expSection);
      if(expDD){
        qsa('.dropdown-menu a', expDD).forEach(a => {
          const c = cloneLink(a);
          if(c) expSub.appendChild(c);
        });
      }

      // Trip Builder link
      const bottomWrap = document.createElement('div');
      bottomWrap.className = 'mobile-section';
      const t = cloneLink(trip);
      if(t){
        bottomWrap.appendChild(t);
      }

      mount.appendChild(topWrap);
      mount.appendChild(regionsSection);
      mount.appendChild(expSection);
      mount.appendChild(bottomWrap);
    }
  }

  function bindDesktopDropdowns(){
    const nav = qs('.topbar .nav');
    if(!nav) return;

    // Toggle dropdowns on click
    qsa('.topbar .dropdown[data-dd]').forEach(dd => {
      const btn = qs('.dropbtn', dd);
      if(!btn) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if(isMobile()) return; // mobile uses drawer
        const isOpen = dd.classList.contains('open');
        if(isOpen) closeAllDesktopDropdowns();
        else openDesktopDropdown(dd);
      });
    });

    // Click outside closes
    document.addEventListener('click', (e) => {
      if(isMobile()) return;
      const topbar = qs('.topbar');
      if(topbar && !topbar.contains(e.target)) closeAllDesktopDropdowns();
    });

    // ESC closes
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeAllDesktopDropdowns();
    });

    // Resize closes dropdowns
    window.addEventListener('resize', () => closeAllDesktopDropdowns());
  }

  // Init after header.html is injected
  function init(){
    ensureMobilePanel();
    bindDesktopDropdowns();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
