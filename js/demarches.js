// ── STATE ─────────────────────────────────────────────────────────────────────
const stateD = {
  sort: { key: 'createdAt', direction: 'desc' },
  openRows: new Set()
};

// Suffixe _D pour éviter toute collision de nom si offers.js était jamais chargé sur la même page
const CLOSURE_STATUSES_D = ['Octroyée', 'Refusée', 'Sans suite'];

// Les démarches utilisent data-uid (chaîne composée) plutôt que data-id numérique comme les offres
const toggleDemarcheRow = createToggle(stateD.openRows, 'data-uid');

// ── DONNÉES APLATIES ──────────────────────────────────────────────────────────
const FLAT_DEMARCHES = OFFERS.flatMap(offer =>
  (offer.demarches ?? []).map(d => ({
    // Les IDs de démarches (1, 2, 3…) ne sont uniques qu'au sein d'une offre, pas globalement
    uid: `${offer.id}-${d.id}`,
    offerId: offer.id,
    offerName: offer.name,
    offerType: offer.type,
    numero: d.numero ?? null,
    title: d.title,
    createdAt: d.createdAt,
    submitedAt: d.submitedAt,
    closedAt: d.closedAt ?? null,
    delay: d.delay ?? null,
    status: d.status
  }))
);

// ── DONNÉES FILTRÉES / TRIÉES ─────────────────────────────────────────────────
function getVisibleDemarches() {
  const search = document.getElementById('d-search').value.toLowerCase().trim();
  const typeVal = document.getElementById('d-filter-type').value;
  const statusVal = document.getElementById('d-filter-status').value;

  const filtered = FLAT_DEMARCHES.filter(d => {
    if (typeVal !== 'Tous' && d.offerType !== typeVal) return false;
    if (statusVal !== 'Tous' && d.status !== statusVal) return false;
    if (search) {
      const haystack = [d.offerName, d.offerType, d.title, d.status, d.createdAt, d.submitedAt].join(' ').toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    const aIsClosure = CLOSURE_STATUSES_D.includes(a.status);
    const bIsClosure = CLOSURE_STATUSES_D.includes(b.status);
    if (aIsClosure !== bIsClosure) return aIsClosure ? 1 : -1;
    // dd/mm/yyyy ne peut pas être trié de base — conversion en timestamp nécessaire
    return parseDMY(b.createdAt) - parseDMY(a.createdAt);
  });

  return filtered;
}

// ── BUILD : LIGNES HTML ───────────────────────────────────────────────────────
function buildDemarcheRows(d) {
  const color = DEMARCHE_STATUS_COLOR[d.status] ?? 'secondary';
  const progress = DEMARCHE_PROGRESS[d.status] ?? 0;
  const isBrouillon = d.status === 'Brouillon';
  const isClosure = CLOSURE_STATUSES_D.includes(d.status);
  const canEdit = isBrouillon || d.status === 'A compléter';
  const isOpen = stateD.openRows.has(d.uid);

  const mainRow = document.createElement('tr');
  mainRow.className = `clickable-row${isOpen ? ' row-open' : ''}`;
  mainRow.dataset.uid = d.uid;
  mainRow.setAttribute('role', 'button');
  mainRow.setAttribute('tabindex', '0');
  mainRow.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  mainRow.innerHTML = `
    <td><i class="bi bi-chevron-right toggle-icon" aria-hidden="true"></i></td>
    <td>${d.offerName}</td>
    <td>${d.title}</td>
    <td class="d-none d-md-table-cell"><span class="badge bg-${color}">${d.status}</span></td>
    <td class="d-none d-lg-table-cell" style="min-width:130px;">
      <div class="demarche-progress-pct">${progress}%</div>
      <div class="progress bg-secondary-subtle" style="height:6px;">
        <div class="progress-bar bg-success" role="progressbar"
          style="width:${progress}%"
          aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
        </div>
      </div>
    </td>
    <td class="text-end">
      <div class="d-flex gap-2 justify-content-end">
        <button type="button" class="btn btn-sm btn-outline-secondary" title="Visualiser">
          <i class="bi bi-eye"></i>
        </button>
        ${canEdit ? `<button type="button" class="btn btn-sm btn-outline-primary" title="Modifier">
          <i class="bi bi-pencil"></i>
        </button>` : ''}
        ${isBrouillon ? `<button type="button" class="btn btn-sm btn-outline-danger" title="Supprimer">
          <i class="bi bi-trash"></i>
        </button>` : ''}
      </div>
    </td>`;

  // Contenu du panneau déroulant
  let delayHtml = '';
  // Un brouillon n'ayant pas encore été soumis, le délai de traitement ne s'applique pas
  if (!isBrouillon && d.delay) {
    const delayLabel = d.status === 'A compléter' ? 'Délai pour répondre' : 'Délai max. réponse';
    delayHtml = `<div class="col-12 col-md-3"><strong>${delayLabel}</strong><div>${d.delay}</div></div>`;
  }

  let closedAtHtml = '';
  if (isClosure && d.closedAt) {
    closedAtHtml = `<div class="col-12 col-md-3"><strong>Date de clôture</strong><div>${d.closedAt}</div></div>`;
  }

  const detailRow = document.createElement('tr');
  detailRow.id = `detail-${d.uid}`;
  detailRow.className = `detail-cell collapse${isOpen ? ' show' : ''}`;
  detailRow.innerHTML = `
    <td colspan="6">
      <div class="p-3">
        <div class="row g-3 d-md-none">
          <div class="col-12 col-sm-6"><strong>Statut</strong><div><span class="badge bg-${color}">${d.status}</span></div></div>
        </div>
        <div class="row g-3">
          ${d.numero ? `
          <div class="col-12 col-md-3">
            <strong>N° de démarche</strong>
            <div class="d-flex align-items-center gap-2">
              ${d.numero}
              <button type="button" class="btn btn-link btn-sm p-0 copy-btn"
                data-copy="${d.numero}" title="Copier">
                <i class="bi bi-copy"></i>
              </button>
            </div>
          </div>` : ''}
          <div class="col-12 col-md-3"><strong>Type d'offre</strong><div>${d.offerType}</div></div>
          ${isBrouillon
            ? `<div class="col-12 col-md-3"><strong>Date de création</strong><div>${d.createdAt}</div></div>`
            : `<div class="col-12 col-md-3"><strong>Date de soumission</strong><div>${d.submitedAt}</div></div>`}
          ${delayHtml}
          ${closedAtHtml}
        </div>
      </div>
    </td>`;

  return [mainRow, detailRow];
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function renderDemarchesTable() {
  const tbody = document.getElementById('d-tableBody');
  const fragment = document.createDocumentFragment();
  getVisibleDemarches().forEach(d => {
    buildDemarcheRows(d).forEach(row => fragment.appendChild(row));
  });
  tbody.replaceChildren(fragment);
  initTooltips(tbody);
}

// ── INIT : ÉVÉNEMENTS ─────────────────────────────────────────────────────────
function initDemarchesTableEvents() {
  const tbody = document.getElementById('d-tableBody');

  tbody.addEventListener('click', e => {
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    const mainRow = e.target.closest('.clickable-row');
    if (mainRow) toggleDemarcheRow(mainRow.dataset.uid);
  });

  tbody.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const mainRow = e.target.closest('.clickable-row');
    if (mainRow) {
      e.preventDefault();
      toggleDemarcheRow(mainRow.dataset.uid);
    }
  });
}

function initDemarchesFilters() {
  populateSelect('d-filter-type', uniqueSortedFrom(FLAT_DEMARCHES, 'offerType'));
  populateSelect('d-filter-status', uniqueSortedFrom(FLAT_DEMARCHES, 'status'));

  // Préfixe d- sur les IDs pour ne pas entrer en conflit avec les éléments de offers.js
  ['d-search', 'd-filter-type', 'd-filter-status'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', renderDemarchesTable);
    el.addEventListener('change', renderDemarchesTable);
  });
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDemarchesFilters();
  initSortHeaders(stateD.sort, renderDemarchesTable);
  initDemarchesTableEvents();
  initCopyButtons();
  updateSortHeaders(stateD.sort);
  renderDemarchesTable();
});
