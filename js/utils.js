// ── TOOLTIPS ──────────────────────────────────────────────────────────────────
function initTooltips(container = document) {
  container.querySelectorAll('[title]').forEach(el => {
    bootstrap.Tooltip.getOrCreateInstance(el, { trigger: 'hover focus' });
  });
}

// ── COPIER ────────────────────────────────────────────────────────────────────
function initCopyButtons() {
  // Délégation sur document car les boutons sont injectés dynamiquement dans le tableau
  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    // Empêche le clic de remonter jusqu'à la ligne et de déclencher l'accordéon
    e.stopPropagation();
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const icon = btn.querySelector('i');
      icon.className = 'bi bi-check-lg text-success';
      setTimeout(() => { icon.className = 'bi bi-copy'; }, 1500);
    });
  });
}

// ── FILTRES ───────────────────────────────────────────────────────────────────
function populateSelect(selectId, values) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="Tous">Tous</option>';
  values.forEach(value => {
    const option = document.createElement('option');
    option.value = option.textContent = value;
    select.appendChild(option);
  });
}

// filter(Boolean) écarte les entrées undefined/null avant le tri
function uniqueSortedFrom(dataset, key) {
  return [...new Set(dataset.map(item => item[key]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
}

// ── TRI ───────────────────────────────────────────────────────────────────────
// Retourne 0 pour les valeurs manquantes afin de garantir un tri stable
function parseDMY(str) {
  if (!str) return 0;
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d).getTime();
}

function updateSortHeaders(sortState) {
  document.querySelectorAll('th.sortable').forEach(header => {
    header.classList.remove('sorted-asc', 'sorted-desc');
    if (header.dataset.sort === sortState.key) {
      header.classList.add(`sorted-${sortState.direction}`);
    }
  });
}

function initSortHeaders(sortState, renderFn) {
  document.querySelectorAll('th.sortable').forEach(header => {
    header.addEventListener('click', () => {
      const key = header.dataset.sort;
      sortState.direction = sortState.key === key
        ? (sortState.direction === 'asc' ? 'desc' : 'asc')
        : 'asc';
      sortState.key = key;
      updateSortHeaders(sortState);
      renderFn();
    });
  });
}

// ── ACCORDÉON ─────────────────────────────────────────────────────────────────
// Factory : chaque tableau a ses propres openRows et son propre attribut identifiant
function createToggle(openRows, attrKey) {
  return function (id) {
    const mainRow = document.querySelector(`.clickable-row[${attrKey}="${id}"]`);
    const detailRow = document.getElementById(`detail-${id}`);
    if (!mainRow || !detailRow) return;

    const isOpen = openRows.has(id);

    // Ferme la ligne actuellement ouverte avant d'en ouvrir une nouvelle (une seule à la fois)
    if (!isOpen) {
      openRows.forEach(openId => {
        const openMain = document.querySelector(`.clickable-row[${attrKey}="${openId}"]`);
        const openDetail = document.getElementById(`detail-${openId}`);
        if (openMain && openDetail) {
          openMain.classList.remove('row-open');
          openMain.setAttribute('aria-expanded', 'false');
          bootstrap.Collapse.getOrCreateInstance(openDetail, { toggle: false }).hide();
        }
      });
      openRows.clear();
    }

    isOpen ? openRows.delete(id) : openRows.add(id);
    mainRow.classList.toggle('row-open', !isOpen);
    mainRow.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    // { toggle: false } évite que Bootstrap déclenche un second toggle automatique à l'instanciation
    bootstrap.Collapse.getOrCreateInstance(detailRow, { toggle: false }).toggle();
  };
}
