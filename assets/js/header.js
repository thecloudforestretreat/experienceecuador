(function () {
  const dropdowns = document.querySelectorAll('[data-dd]');

  function closeAll() {
    dropdowns.forEach(dd => {
      dd.classList.remove('open');
      const btn = dd.querySelector('.dropbtn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function clampDropdownToViewport(dd) {
    const menu = dd.querySelector('.dropdown-menu');
    if (!menu) return;

    // Reset any prior inline positioning
    menu.style.left = '';
    menu.style.right = '';
    menu.style.transform = '';
    menu.style.marginLeft = '';

    // Only clamp on mobile-ish screens where overflow happens most
    const isMobile = window.matchMedia('(max-width: 620px)').matches;

    // Temporarily show to measure
    const wasHidden = getComputedStyle(menu).display === 'none';
    if (wasHidden) {
      menu.style.display = 'block';
      menu.style.visibility = 'hidden';
    }

    const rect = menu.getBoundingClientRect();
    const pad = 12;

    // Default: center under button
    menu.style.left = '50%';
    menu.style.transform = 'translateX(-50%)';
    menu.style.right = 'auto';

    // Re-measure after centering
    const rect2 = menu.getBoundingClientRect();
    const overflowLeft = rect2.left < pad;
    const overflowRight = rect2.right > (window.innerWidth - pad);

    if (isMobile && (overflowLeft || overflowRight)) {
      // Clamp by nudging via margin-left in px
      let delta = 0;
      if (overflowLeft) delta = pad - rect2.left;
      if (overflowRight) delta = (window.innerWidth - pad) - rect2.right;
      menu.style.marginLeft = `${delta}px`;
    } else {
      menu.style.marginLeft = '0px';
    }

    if (wasHidden) {
      menu.style.display = '';
      menu.style.visibility = '';
    }
  }

  dropdowns.forEach(dd => {
    const btn = dd.querySelector('.dropbtn');
    const menu = dd.querySelector('.dropdown-menu');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = dd.classList.contains('open');
      closeAll();

      if (!isOpen) {
        dd.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        clampDropdownToViewport(dd);
      } else {
        dd.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (menu) menu.addEventListener('click', (e) => e.stopPropagation());
  });

  window.addEventListener('resize', () => {
    const open = document.querySelector('[data-dd].open');
    if (open) clampDropdownToViewport(open);
  });

  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
})();
