// ── STATE ─────────────────────────────────────────────────────────────────────
const state = {
  sort: { key: 'name', direction: 'asc' },
  openRows: new Set()
};

const toggleRow = createToggle(state.openRows, 'data-id');

// ── DONNÉES FILTRÉES / TRIÉES ─────────────────────────────────────────────────
function getVisibleOffers() {
  const search = document.getElementById('search').value.toLowerCase().trim();
  const typeVal = document.getElementById('filter-type').value;
  const statusVal = document.getElementById('filter-status').value;

  const filtered = OFFERS.filter(offer => {
    if (typeVal !== 'Tous' && offer.type !== typeVal) return false;
    if (statusVal !== 'Tous' && offer.status !== statusVal) return false;
    if (search) {
      const haystack = [
        offer.name, offer.type, offer.subType, offer.status,
        offer.adresseComplete, offer.numeroEnregistrement, offer.dateFinASI
      ].join(' ').toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  const { key, direction } = state.sort;
  const multiplier = direction === 'asc' ? 1 : -1;

  filtered.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA < valB) return -multiplier;
    if (valA > valB) return multiplier;
    return 0;
  });

  return filtered;
}

// ── BUILD : BLOCS HTML ────────────────────────────────────────────────────────

function buildChildrenHtml(offer) {
  // Seules les maisons d'hôtes non encore certifiées peuvent gérer leurs chambres
  const canEdit = offer.type === 'Hébergement'
    && offer.subType === "Maison d'hôtes"
    && ['Nouveau', 'Enregistrée'].includes(offer.status);

  if (!offer.children?.length && !canEdit) return '';

  const atMax = (offer.children?.length ?? 0) >= MAX_CHILDREN;
  const addBtn = canEdit
    ? `<button type="button" class="btn btn-sm btn-outline-success add-child-btn ms-2"
         data-offer-id="${offer.id}"
         ${atMax ? 'disabled title="Maximum 5 chambres atteint"' : ''}>
         <i class="bi bi-plus-lg me-1"></i>Ajouter une chambre
       </button>`
    : '';

  const rows = (offer.children ?? []).map(child => {
    const capacityHtml = child.capacity != null
      ? `<span><i class="bi bi-person me-1"></i>${child.capacity} pers.</span>`
      : '';
    const deleteBtn = canEdit
      ? `<button type="button" class="btn btn-sm btn-outline-danger delete-child-btn ms-1"
           data-offer-id="${offer.id}" data-child-id="${child.id}" title="Supprimer">
           <i class="bi bi-trash"></i>
         </button>`
      : '';
    return `
      <div class="child-row d-flex justify-content-between align-items-center mb-2">
        <div>
          <i class="bi bi-arrow-return-right me-1 text-muted"></i>
          <strong>${child.name}</strong><br>
          <small class="text-muted d-flex align-items-center gap-2">
            ${capacityHtml}
            <span title="Numéro d'enregistrement" aria-label="Numéro d'enregistrement : ${child.numeroEnregistrement}">
              <i class="bi bi-hash" aria-hidden="true"></i> ${child.numeroEnregistrement}
            </span>
            <button type="button" class="btn btn-link btn-sm p-0 copy-btn"
              data-copy="${child.numeroEnregistrement}" title="Copier le numéro d'enregistrement"
              aria-label="Copier le numéro d'enregistrement ${child.numeroEnregistrement}">
              <i class="bi bi-copy" aria-hidden="true"></i>
            </button>
          </small>
        </div>
        <div class="text-end d-flex align-items-center gap-1">
          ${canEdit ? `<button class="btn btn-sm btn-outline-primary" title="Modifier">
            <i class="bi bi-pencil"></i>
          </button>` : ''}
          ${deleteBtn}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="mt-3 child-offer">
      <div class="fw-semibold mb-2 d-flex align-items-center">
        <i class="bi bi-diagram-3"></i>&nbsp;${(offer.children ?? []).length <= 1 ? 'Chambre / Unité' : 'Chambres / Unités'} (${(offer.children ?? []).length})
        ${addBtn}
      </div>
      ${rows}
    </div>`;
}

function buildNumerosHtml(offer) {
  if (!offer.numeros?.length) return '';

  const label = offer.numeros.length <= 1 ? 'Numéro de décision' : 'Numéros de décision';

  const NUMERO_META = [
    { key: 'poleDattraction',       label: "Pôle d'attraction" },
    { key: 'sousPoleRecréatif',     label: "Sous pôle récréatif" },
    { key: 'certification',         label: "Certification" },
    { key: 'categorieCertification',label: "Catégorie de certification" },
    { key: 'classement',            label: "Classement" },
  ];

  return `
    <div class="mt-4">
      <div class="fw-semibold mb-2">
        <i class="bi bi-file-earmark-text"></i> ${label} (${offer.numeros.length})
      </div>
      <div class="list-group">
        ${offer.numeros.map(n => {
          const metaItems = NUMERO_META
            .filter(m => n[m.key])
            .map(m => `<span><strong>${m.label} :</strong> ${n[m.key]}</span>`)
            .join('');

          return `
          <div class="list-group-item py-2">
            <div class="fw-semibold">${n.sujet}</div>
            <small class="text-muted d-flex flex-wrap align-items-center gap-2 mt-1">
              <span class="d-flex align-items-center gap-1" title="Numéro de décision">
                <i class="bi bi-hash" aria-hidden="true"></i>
                <span class="font-monospace" aria-label="Numéro de décision : ${n.noDecision}">${n.noDecision}</span>
                <button type="button" class="btn btn-link btn-sm p-0 copy-btn"
                  data-copy="${n.noDecision}" title="Copier le numéro de décision"
                  aria-label="Copier le numéro de décision ${n.noDecision}">
                  <i class="bi bi-copy" aria-hidden="true"></i>
                </button>
              </span>
              <span class="text-muted-subtle" aria-hidden="true">·</span>
              <span title="Date de délivrance" aria-label="Délivré le ${n.dateDelivrance}">
                <i class="bi bi-calendar-check me-1" aria-hidden="true"></i>${n.dateDelivrance}
              </span>
              <span class="text-muted-subtle" aria-hidden="true">→</span>
              <span title="Date de fin de validité" aria-label="Valable jusqu'au ${n.dateFin}">
                <i class="bi bi-calendar-x me-1" aria-hidden="true"></i>${n.dateFin}
              </span>
            </small>
            ${metaItems ? `<small class="text-muted d-flex flex-wrap gap-3 mt-1">${metaItems}</small>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function buildOfferRows(offer) {
  const statusColor = STATUS_COLOR[offer.status] ?? 'secondary';
  const isHebergement = offer.type === 'Hébergement';
  const isOpen = state.openRows.has(offer.id);
  const subTypeBadge = offer.subType
    ? ` <span class="badge bg-info-subtle text-info-emphasis ms-1">${offer.subType}</span>`
    : '';

  const mainRow = document.createElement('tr');
  mainRow.className = `clickable-row${isOpen ? ' row-open' : ''}`;
  mainRow.dataset.id = offer.id;
  mainRow.setAttribute('role', 'button');
  mainRow.setAttribute('tabindex', '0');
  mainRow.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  mainRow.innerHTML = `
    <td><i class="bi bi-chevron-right toggle-icon" aria-hidden="true"></i></td>
    <td>${offer.name}${offer.children?.length ? ` <span class="badge bg-light text-dark ms-2">${offer.children.length}</span>` : ''}</td>
    <td class="d-none d-md-table-cell">${offer.type}${subTypeBadge}</td>
    <td class="d-none d-md-table-cell"><span class="badge bg-${statusColor}">${offer.status}</span></td>
    <td class="text-end">
      <div class="d-flex gap-2 justify-content-end">
        <button type="button" class="btn btn-sm btn-outline-primary" title="Modifier">
          <i class="bi bi-pencil"></i>
        </button>
        <button type="button" class="btn btn-sm btn-success new-action-btn" data-id="${offer.id}">
          + Nouvelle démarche
        </button>
      </div>
    </td>`;

  const detailRow = document.createElement('tr');
  detailRow.id = `detail-${offer.id}`;
  detailRow.className = `detail-cell collapse${isOpen ? ' show' : ''}`;
  detailRow.innerHTML = `
    <td colspan="5">
      <div class="p-3">
        <div class="row g-3 d-md-none">
          <div class="col-12 col-sm-6"><strong>Type</strong><div>${offer.type}${subTypeBadge}</div></div>
          <div class="col-12 col-sm-6"><strong>Statut</strong><div><span class="badge bg-${statusColor}">${offer.status}</span></div></div>
        </div>
        <div class="row g-3">
          <div class="col-12 col-md-6"><strong>Adresse</strong><div>${offer.adresseComplete}</div></div>
          ${offer.numeroEnregistrement ? `
          <div class="col-12 col-md-3">
            <strong>N° Enregistrement</strong>
            <div class="d-flex align-items-center gap-2">
              ${offer.numeroEnregistrement}
              <button type="button" class="btn btn-link btn-sm p-0 copy-btn"
                data-copy="${offer.numeroEnregistrement}" title="Copier le numéro d'enregistrement"
                aria-label="Copier le numéro d'enregistrement ${offer.numeroEnregistrement}">
                <i class="bi bi-copy" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="col-12 col-md-3"><strong>Date de fin ASI</strong><div>${offer.dateFinASI}</div></div>` : ''}
        </div>
        ${buildChildrenHtml(offer)}
        ${buildNumerosHtml(offer)}
      </div>
    </td>`;

  return [mainRow, detailRow];
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function renderTable() {
  const tbody = document.getElementById('tableBody');
  const fragment = document.createDocumentFragment();
  getVisibleOffers().forEach(offer => {
    buildOfferRows(offer).forEach(row => fragment.appendChild(row));
  });
  tbody.replaceChildren(fragment);
  initTooltips(tbody);
}

// Ajoute l'offre aux lignes ouvertes avant le re-rendu pour maintenir le panneau visible
function refreshOffer(offerId) {
  state.openRows.add(offerId);
  renderTable();
}

const MAX_CHILDREN = 5;

function onAddChild(offerId) {
  const offer = OFFERS.find(o => o.id === offerId);
  if (!offer) return;
  if (!offer.children) offer.children = [];
  if (offer.children.length >= MAX_CHILDREN) return;
  const nextNum = offer.children.length + 1;
  const padded = String(nextNum).padStart(2, '0');
  offer.children.push({
    id: Date.now(),
    name: `Chambre ${nextNum}`,
    capacity: 2,
    numeroEnregistrement: `${offer.numeroEnregistrement}-${padded}`
  });
  refreshOffer(offerId);
}

function onDeleteChild(offerId, childId) {
  const offer = OFFERS.find(o => o.id === offerId);
  if (!offer?.children) return;
  offer.children = offer.children.filter(c => c.id !== childId);
  refreshOffer(offerId);
}

function onNewProcedure(id) {
  console.log('Nouvelle démarche pour offre', id);
}

// ── INIT : ÉVÉNEMENTS ─────────────────────────────────────────────────────────
function initTableEvents() {
  const tbody = document.getElementById('tableBody');

  tbody.addEventListener('click', e => {
    const actionBtn = e.target.closest('.new-action-btn');
    if (actionBtn) {
      e.stopPropagation();
      onNewProcedure(Number(actionBtn.dataset.id));
      return;
    }

    const addChildBtn = e.target.closest('.add-child-btn');
    if (addChildBtn) {
      e.stopPropagation();
      onAddChild(Number(addChildBtn.dataset.offerId));
      return;
    }

    const deleteChildBtn = e.target.closest('.delete-child-btn');
    if (deleteChildBtn) {
      e.stopPropagation();
      onDeleteChild(Number(deleteChildBtn.dataset.offerId), Number(deleteChildBtn.dataset.childId));
      return;
    }

    const mainRow = e.target.closest('.clickable-row');
    if (mainRow) toggleRow(Number(mainRow.dataset.id));
  });

  tbody.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const mainRow = e.target.closest('.clickable-row');
    if (mainRow) {
      e.preventDefault();
      toggleRow(Number(mainRow.dataset.id));
    }
  });
}

function initFilters() {
  populateSelect('filter-type', uniqueSortedFrom(OFFERS, 'type'));
  populateSelect('filter-status', uniqueSortedFrom(OFFERS, 'status'));

  ['search', 'filter-type', 'filter-status'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', renderTable);
    el.addEventListener('change', renderTable);
  });
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSortHeaders(state.sort, renderTable);
  initTableEvents();
  initCopyButtons();
  updateSortHeaders(state.sort);
  renderTable();
});
