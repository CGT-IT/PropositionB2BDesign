# PropositionB2BDesign — Documentation

## Structure des fichiers

```
├── index.html          — Écran liste des offres
├── demarches.html      — Écran liste des démarches
├── css/
│   └── main.css
└── js/
    ├── data.js         — Données statiques (OFFERS)
    ├── offers.js       — Logique et rendu de l'écran offres
    ├── demarches.js    — Logique et rendu de l'écran démarches
    ├── sidebar.js      — Navigation latérale
    └── utils.js        — Fonctions utilitaires partagées
```

---

## Structure des données (`data.js`)

### Objet `OFFER`

| Champ | Type | Présence | Description |
|---|---|---|---|
| `id` | number | Toujours | Identifiant unique |
| `name` | string | Toujours | Nom de l'offre |
| `date` | string `dd/mm/yyyy` | Toujours | Date de création de l'offre |
| `type` | string | Toujours | `Hébergement`, `Activité` ou `Attraction` |
| `subType` | string | Hébergement uniquement | Ex. `Hôtel`, `Camping`, `Meublé`, `Maison d'hôtes` |
| `status` | string | Toujours | `Nouveau`, `Enregistrée`, `Certifiée`, `Classé` |
| `adresseComplete` | string | Toujours | Format : `"rue n°, code postal Commune, BEL"` (Wallonie) |
| `capaciteASI` | number | Hébergement uniquement | Capacité en personnes |
| `numeroEnregistrement` | string | Si enregistrée/certifiée/classé | Numéro d'enregisterment |
| `dateFinASI` | string `dd/mm/yyyy` | Si `numeroEnregistrement` présent | Date de fin de validité de l'ASI |
| `children` | array | Maison d'hôtes uniquement | Liste des chambres / unités (max 5) |
| `numeros` | array | Si décisions rendues | Liste des numéros de décision |
| `demarches` | array | Si démarches initiées | Liste des démarches liées à l'offre |

### Objet `children[]`

| Champ | Type | Présence | Description |
|---|---|---|---|
| `id` | number | Toujours | Identifiant |
| `name` | string | Toujours | Nom de la chambre |
| `capacity` | number | Toujours | Capacité en personnes |
| `numeroEnregistrement` | string | Toujours | Numéro suffixé `-01`, `-02`, etc. |

### Objet `numeros[]`

| Champ | Type | Présence | Description |
|---|---|---|---|
| `noDecision` | string | Toujours | Numéro de la décision |
| `sujet` | string | Toujours | Intitulé de la décision (correspond au `title` de la démarche associée) |
| `dateDelivrance` | string `dd/mm/yyyy` | Toujours | Date de délivrance |
| `dateFin` | string `dd/mm/yyyy` | Toujours | Date de fin de validité |
| `poleDattraction` | string | Attraction uniquement | Ex. `Naturel`, `Récréatif` |
| `sousPoleRecréatif` | string | Si pôle récréatif | Ex. `Circuit à thème` |
| `certification` | string | Si certification | Ex. `Certification de base`, `Certification spécifique` |
| `categorieCertification` | string | Si certification spécifique | Ex. `Hôtel de Tourisme` |
| `classement` | string | Si classement | Ex. `3 étoiles` |

### Objet `demarches[]`

| Champ | Type | Présence | Description |
|---|---|---|---|
| `id` | number | Toujours | Identifiant (unique au sein de l'offre uniquement) |
| `numero` | string | Si soumise | Numéro de la démarche |
| `title` | string | Toujours | Intitulé de la démarche |
| `createdAt` | string `dd/mm/yyyy` | Toujours | Date de création, antérieure à `submitedAt` |
| `submitedAt` | string `dd/mm/yyyy` | Toujours | Date de soumission |
| `closedAt` | string `dd/mm/yyyy` | Si clôturée | Date de clôture |
| `delay` | string | Si délai applicable | Ex. `30 jours`, `45 jours` |
| `status` | string | Toujours | Voir statuts ci-dessous |

### Statuts et couleurs

#### Offres (`STATUS_COLOR`)

| Statut | Couleur Bootstrap |
|---|---|
| `Certifiée` | `success` |
| `Enregistrée` | `secondary` |
| `Nouveau` | `warning` |

#### Démarches (`DEMARCHE_STATUS_COLOR` / `DEMARCHE_PROGRESS`)

| Statut | Couleur | Progression |
|---|---|---|
| `Brouillon` | `secondary` | 10 % |
| `Soumise` | `primary` | 30 % |
| `A compléter` | `warning` | 50 % |
| `Complétée` | `info` | 65 % |
| `En traitement` | `primary` | 80 % |
| `Sans suite` | `dark` | 100 % |
| `Octroyée` | `success` | 100 % |
| `Refusée` | `danger` | 100 % |

---

## Écran Offres (`index.html` + `offers.js`)

### Ligne principale (tableau)

| Champ | Source | Règle d'affichage |
|---|---|---|
| `name` | `OFFERS[].name` | Toujours affiché |
| `type` | `OFFERS[].type` | Masqué sous `md` |
| `subType` | `OFFERS[].subType` | Badge `bg-info-subtle`, colonne `md+`, absent si null |
| `status` | `OFFERS[].status` | Badge coloré via `STATUS_COLOR`, colonne `md+` |
| `children.length` | `OFFERS[].children` | Badge `bg-light` à côté du badge `subType`, uniquement si Maison d'hôtes avec chambres, tooltip "Nombre de chambres" |

### Panneau de détail (ligne expansée)

| Champ | Source | Règle d'affichage |
|---|---|---|
| `type` + `subType` | `OFFERS[]` | Visible uniquement sous `md` (doublure mobile) |
| `status` | `OFFERS[].status` | Visible uniquement sous `md` (doublure mobile) |
| `adresseComplete` | `OFFERS[].adresseComplete` | Toujours affiché — `col-md-5` |
| `capaciteASI` | `OFFERS[].capaciteASI` | Affiché si présent (Hébergement uniquement) — `col-md-2`, suffixe " pers." |
| `numeroEnregistrement` | `OFFERS[].numeroEnregistrement` | Affiché si présent — `col-md-3`, +bouton copier |
| `dateFinASI` | `OFFERS[].dateFinASI` | Affiché uniquement si `numeroEnregistrement` présent — `col-md-2` |
| **Bloc chambres** | `OFFERS[].children[]` | Affiché si chambres présentes ou si Maison d'hôtes avec statut `Nouveau` / `Enregistrée` (ajout et suppression activés) |
| `children[].name` | `OFFERS[].children[].name` | Toujours affiché dans le bloc chambres |
| `children[].capacity` | `OFFERS[].children[].capacity` | Affiché si non null, suffixe " pers." |
| `children[].numeroEnregistrement` | `OFFERS[].children[].numeroEnregistrement` | Toujours affiché, bouton copier |
| **Bloc numéros de décision** | `OFFERS[].numeros[]` | Affiché uniquement si `numeros` présent et non vide |
| `numeros[].sujet` | `OFFERS[].numeros[].sujet` | Titre de chaque entrée du bloc |
| `numeros[].noDecision` | `OFFERS[].numeros[].noDecision` | Toujours affiché, bouton copier |
| `numeros[].dateDelivrance` | `OFFERS[].numeros[].dateDelivrance` | Toujours affiché, tooltip "Date de délivrance" |
| `numeros[].dateFin` | `OFFERS[].numeros[].dateFin` | Toujours affiché, tooltip "Date de fin de validité" |
| `numeros[].poleDattraction` | `OFFERS[].numeros[].poleDattraction` | Affiché si présent |
| `numeros[].sousPoleRecréatif` | `OFFERS[].numeros[].sousPoleRecréatif` | Affiché si présent |
| `numeros[].certification` | `OFFERS[].numeros[].certification` | Affiché si présent |
| `numeros[].categorieCertification` | `OFFERS[].numeros[].categorieCertification` | Affiché si présent |
| `numeros[].classement` | `OFFERS[].numeros[].classement` | Affiché si présent |

---

## Écran Démarches (`demarches.html` + `demarches.js`)

Les démarches sont aplaties depuis `OFFERS` dans `FLAT_DEMARCHES` : chaque démarche est enrichie des informations de son offre parente et d'un `result` résolu depuis `OFFERS[].numeros[]` (correspondance par `sujet === title`).

### Ligne principale (tableau)

| Champ | Source | Règle d'affichage |
|---|---|---|
| `offerName` | `OFFERS[].name` | Toujours affiché |
| `title` | `OFFERS[].demarches[].title` | Toujours affiché |
| `status` | `OFFERS[].demarches[].status` | Badge coloré via `DEMARCHE_STATUS_COLOR`, masqué sous `md` |
| Progression | Calculé via `DEMARCHE_PROGRESS[status]` | Barre de progression + %, masqué sous `lg` |

### Panneau de détail (ligne expansée)

| Champ | Source | Règle d'affichage |
|---|---|---|
| `status` | `OFFERS[].demarches[].status` | Badge, visible uniquement sous `md` (doublure mobile) |
| `numero` | `OFFERS[].demarches[].numero` | Affiché si présent |
| `offerType` | `OFFERS[].type` | Toujours affiché |
| `createdAt` | `OFFERS[].demarches[].createdAt` | Affiché **uniquement si** statut = `Brouillon` — label "Date de création" |
| `submitedAt` | `OFFERS[].demarches[].submitedAt` | Affiché **uniquement si** statut ≠ `Brouillon` — label "Date de soumission" |
| `delay` | `OFFERS[].demarches[].delay` | Affiché si présent et statut ≠ `Brouillon`. Icône `bi-person-fill` + tooltip "Votre délai de réponse" si statut = `A compléter` ; icône `bi-building` + tooltip "Délai de traitement de l'administration" sinon |
| `closedAt` | `OFFERS[].demarches[].closedAt` | Affiché **uniquement si** statut ∈ {`Octroyée`, `Refusée`, `Sans suite`} et valeur présente — label "Date de clôture" |
| **Bloc résultat** | `OFFERS[].numeros[]` (via `result`) | Affiché **uniquement si** statut = `Octroyée` et `result` non null |
| `result.noDecision` | `OFFERS[].numeros[].noDecision` | Toujours affiché dans le bloc résultat |
| `result.dateDelivrance` | `OFFERS[].numeros[].dateDelivrance` | Toujours affiché, tooltip "Date de délivrance" |
| `result.dateFin` | `OFFERS[].numeros[].dateFin` | Toujours affiché, tooltip "Date de fin de validité" |
| `result.certification` | `OFFERS[].numeros[].certification` | Affiché si présent |
| `result.categorieCertification` | `OFFERS[].numeros[].categorieCertification` | Affiché si présent |
| `result.classement` | `OFFERS[].numeros[].classement` | Affiché si présent |
| `result.poleDattraction` | `OFFERS[].numeros[].poleDattraction` | Affiché si présent |
| `result.sousPoleRecréatif` | `OFFERS[].numeros[].sousPoleRecréatif` | Affiché si présent |

### Tri et filtrage

| Règle | Détail |
|---|---|
| Tri principal | Statuts terminaux (`Octroyée`, `Refusée`, `Sans suite`) repoussés en bas |
| Tri secondaire | `createdAt` descendant dans chaque groupe |
| Recherche (haystack) | `offerName`, `offerType`, `title`, `status`, `createdAt`, `submitedAt` |
| Filtres disponibles | Type d'offre (`offerType`), Statut (`status`) |
