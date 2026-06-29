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
        offer.codePostal, offer.rue, offer.numeroEnregistrement, offer.dateFinASI
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

  const addBtn = canEdit
    ? `<button type="button" class="btn btn-sm btn-outline-success add-child-btn ms-2" data-offer-id="${offer.id}">
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
            <i class="bi bi-hash"></i> ${child.numeroEnregistrement}
            <button type="button" class="btn btn-link btn-sm p-0 copy-btn"
              data-copy="${child.numeroEnregistrement}" title="Copier">
              <i class="bi bi-copy"></i>
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

function buildDemarchesHtml(offer) {
  if (!offer.demarches?.length) return '';

  return `
    <div class="mt-4">
      <div class="fw-semibold mb-2">
        <i class="bi bi-folder2-open"></i>
        ${offer.demarches.length <= 1 ? 'Démarche' : 'Démarches'} (${offer.demarches.length})
      </div>
      <div class="list-group">
        ${offer.demarches.map(demarche => {
          const color = DEMARCHE_STATUS_COLOR[demarche.status] ?? 'secondary';
          const progress = DEMARCHE_PROGRESS[demarche.status] ?? 0;
          // Défini localement : offers.js n'a pas accès aux constantes de demarches.js
          const CLOSURE_STATUSES = ['Octroyée', 'Refusée', 'Sans suite'];
          const isClosure = CLOSURE_STATUSES.includes(demarche.status);
          const isBrouillon = demarche.status === 'Brouillon';
          const canEdit = isBrouillon || demarche.status === 'A compléter';
          let line1Html = '';
          let line2Html = '';
          if (isClosure && demarche.closedAt) {
            line1Html = `<span><i class="bi bi-calendar-check me-1"></i>Clôturée le ${demarche.closedAt}</span>`;
          } else {
            line1Html = `<span><i class="bi bi-calendar3 me-1"></i>Créée le ${demarche.createdAt}</span>`;
            if (!isBrouillon && demarche.delay) {
              const delayLabel = demarche.status === 'A compléter' ? 'Délai pour répondre' : 'Délai max. réponse';
              line2Html = `<span><i class="bi bi-clock me-1"></i>${delayLabel} : ${demarche.delay}</span>`;
            }
          }
          return `
            <div class="list-group-item">
              <div class="row align-items-center g-2">
                <div class="col-12 col-md-7">
                  <strong>${demarche.title}</strong><br>
                  <small class="text-muted d-flex flex-column gap-1">
                    ${line1Html}
                    ${line2Html}
                  </small>
                </div>
                <div class="col-auto col-md-2">
                  <span class="badge bg-${color}">${demarche.status}</span>
                </div>
                <div class="col col-md-2">
                  <div class="demarche-progress-pct">${progress}%</div>
                  <div class="progress bg-secondary-subtle" style="height:6px;">
                    <div class="progress-bar bg-success" role="progressbar"
                      style="width:${progress}%"
                      aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                </div>
                <div class="col-auto ms-auto">
                  <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary" title="Voir">
                      <i class="bi bi-eye"></i>
                    </button>
                    ${canEdit ? `<button class="btn btn-sm btn-outline-primary" title="Modifier">
                      <i class="bi bi-pencil"></i>
                    </button>` : ''}
                  </div>
                </div>
              </div>
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
          <div class="col-12 col-md-3"><strong>Code postal</strong><div>${offer.codePostal}</div></div>
          <div class="col-12 col-md-3"><strong>Rue</strong><div>${offer.rue}</div></div>
          ${isHebergement ? `
          <div class="col-12 col-md-3">
            <strong>N° Enregistrement</strong>
            <div class="d-flex align-items-center gap-2">
              ${offer.numeroEnregistrement}
              <button type="button" class="btn btn-link btn-sm p-0 copy-btn"
                data-copy="${offer.numeroEnregistrement}" title="Copier">
                <i class="bi bi-copy"></i>
              </button>
            </div>
          </div>
          <div class="col-12 col-md-3"><strong>Date de fin ASI</strong><div>${offer.dateFinASI}</div></div>` : ''}
        </div>
        ${buildChildrenHtml(offer)}
        ${buildDemarchesHtml(offer)}
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
}

// Ajoute l'offre aux lignes ouvertes avant le re-rendu pour maintenir le panneau visible
function refreshOffer(offerId) {
  state.openRows.add(offerId);
  renderTable();
}

function onAddChild(offerId) {
  const offer = OFFERS.find(o => o.id === offerId);
  if (!offer) return;
  if (!offer.children) offer.children = [];
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
