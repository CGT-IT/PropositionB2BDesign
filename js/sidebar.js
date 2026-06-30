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

  function isPortraitMobile() { return window.innerWidth <= 767.98; }
  function isTablet()          { return window.innerWidth >= 768 && window.innerWidth <= 991.98; }

  function initToggle() {
    const sidebar   = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const burgerBtn = document.getElementById('burgerBtn');

    // Backdrop créé dynamiquement, ajouté au body une seule fois
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    const refreshToggleBtn = () => {
      const collapsed = sidebar.classList.contains('collapsed');
      const icon  = toggleBtn.querySelector('i');
      const label = toggleBtn.querySelector('.btn-label');
      icon.className = `bi bi-chevron-${collapsed ? 'right' : 'left'}`;
      label.textContent = collapsed ? 'Ouvrir' : 'Réduire';
      toggleBtn.setAttribute('aria-label', collapsed ? 'Ouvrir le menu' : 'Réduire le menu');
    };

    const closeMobileSidebar = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    };

    const openMobileSidebar = () => {
      sidebar.classList.add('open');
      backdrop.classList.add('show');
    };

    const syncLayout = () => {
      if (isPortraitMobile()) {
        // Mode burger : sidebar cachée, pas de collapsed
        sidebar.classList.remove('collapsed', 'open');
        backdrop.classList.remove('show');
      } else if (isTablet()) {
        // Tablette : icônes fixes, pas de toggle
        sidebar.classList.add('collapsed');
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
        syncTooltips();
      } else {
        // Desktop : comportement normal
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
        refreshToggleBtn();
        syncTooltips();
      }
    };

    // Bouton toggle desktop (expand/collapse)
    toggleBtn.addEventListener('click', () => {
      if (isPortraitMobile() || isTablet()) return;
      sidebar.classList.toggle('collapsed');
      refreshToggleBtn();
      syncTooltips();
    });

    // Burger (portrait mobile)
    if (burgerBtn) {
      burgerBtn.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeMobileSidebar() : openMobileSidebar();
      });
    }

    // Clic sur le backdrop : ferme la sidebar
    backdrop.addEventListener('click', closeMobileSidebar);

    // Clic sur un lien de nav en mobile : ferme la sidebar
    sidebar.addEventListener('click', e => {
      if (isPortraitMobile() && e.target.closest('.nav-link')) {
        closeMobileSidebar();
      }
    });

    window.addEventListener('resize', syncLayout);
    syncLayout();
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    initToggle();
    syncTooltips();
  });
})();
