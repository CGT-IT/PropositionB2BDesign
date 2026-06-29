// IIFE pour ne pas exposer de variables globales
(function () {
  const NAV_ITEMS = [
    { icon: 'bi-house-door-fill',   label: 'Accueil',       href: '#' },
    { icon: 'bi-person-lines-fill', label: 'Mes données',   href: '#' },
    { icon: 'bi-briefcase-fill',    label: 'Mes offres',    href: 'index.html' },
    { icon: 'bi-folder2-open',      label: 'Mes démarches', href: 'demarches.html' },
    { icon: 'bi-headset',           label: 'Contact',       href: '#' },
    { icon: 'bi-question-circle',   label: 'FAQ',           href: '#' },
  ];

  // || 'index.html' gère le cas où l'URL se termine par '/' sans nom de fichier
  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function buildSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const page = currentPage();
    const navHtml = NAV_ITEMS.map(item => {
      const active = item.href === page ? ' active' : '';
      return `
        <a class="nav-link${active}" href="${item.href}"
          data-bs-toggle="tooltip" data-bs-placement="right" title="${item.label}">
          <i class="bi ${item.icon}"></i><span>${item.label}</span>
        </a>`;
    }).join('');

    sidebar.innerHTML = `
      <div class="brand">
        <div class="brand-icon">
          <img src="https://www.tourismewallonie.be/wp-content/uploads/2025/06/logo-tourisme-wallonie.svg" alt="Tourisme Wallonie">
        </div>
      </div>
      <nav class="nav flex-column">${navHtml}</nav>
      <div class="sidebar-footer">
        <button class="sidebar-toggle-btn" id="sidebarToggleBtn" aria-label="Réduire le menu">
          <i class="bi bi-chevron-left"></i>
          <span class="btn-label">Réduire</span>
        </button>
      </div>`;
  }

  // Les tooltips ne sont utiles qu'en mode réduit, quand les libellés sont masqués
  function syncTooltips() {
    const sidebar = document.getElementById('sidebar');
    const collapsed = sidebar.classList.contains('collapsed');
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      const t = bootstrap.Tooltip.getOrCreateInstance(el, { trigger: 'hover focus' });
      collapsed ? t.enable() : t.disable();
    });
  }

  function isMobile() {
    return window.innerWidth <= 991.98;
  }

  function initToggle() {
    const sidebar = document.getElementById('sidebar');
    const btn = document.getElementById('sidebarToggleBtn');
    const icon = btn.querySelector('i');
    const label = btn.querySelector('.btn-label');

    const refresh = () => {
      const collapsed = sidebar.classList.contains('collapsed');
      icon.className = `bi bi-chevron-${collapsed ? 'right' : 'left'}`;
      label.textContent = collapsed ? 'Ouvrir' : 'Réduire';
      btn.setAttribute('aria-label', collapsed ? 'Ouvrir le menu' : 'Réduire le menu');
    };

    const syncMobile = () => {
      if (isMobile()) sidebar.classList.add('collapsed');
      refresh();
      syncTooltips();
    };

    btn.addEventListener('click', () => {
      if (isMobile()) return;
      sidebar.classList.toggle('collapsed');
      refresh();
      syncTooltips();
    });

    window.addEventListener('resize', syncMobile);
    syncMobile();
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    initToggle();
    syncTooltips();
  });
})();
