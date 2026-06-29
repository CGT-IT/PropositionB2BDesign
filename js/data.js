const OFFERS = [
  {
    id: 1,
    name: "Bivouac du Gitan",
    date: "12/09/2025",
    type: "Hébergement",
    subType: "Maison d'hôtes",
    status: "Enregistrée",
    codePostal: "4960",
    rue: "Rue des Fagnes 12",
    numeroEnregistrement: "BELWAL001/001/0000440",
    dateFinASI: "31/12/2026",
    children: [
      { id: 101, name: "Chambre Bleue", capacity: 2, numeroEnregistrement: "BELWAL001/001/0000440-01" },
      { id: 102, name: "Chambre Verte", capacity: 3, numeroEnregistrement: "BELWAL001/001/0000440-02" }
    ],
    demarches: [
      { id: 1, numero: "001/001/0000001", title: "Enregistrer un hébergement", createdAt: "10/08/2025", closedAt: "15/11/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000002", title: "Renouveler la validité d'un enregistrement", createdAt: "05/01/2026", delay: "30 jours", status: "En traitement" }
    ]
  },
  {
    id: 2,
    name: "Gîte du Gitan",
    date: "12/09/2025",
    type: "Hébergement",
    subType: "Meublé",
    status: "Certifiée",
    codePostal: "4845",
    rue: "Rue du Gîte 8",
    numeroEnregistrement: "BELWAL001/001/0000441",
    dateFinASI: "15/09/2026",
    demarches: [
      { id: 1, numero: "001/001/0000003", title: "Enregistrer un hébergement", createdAt: "12/09/2025", closedAt: "20/12/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000004", title: "Demander le classement d'un hébergement", createdAt: "01/03/2026", closedAt: "15/06/2026", status: "Octroyée" },
      { id: 3, numero: "001/001/0000005", title: "Demander la certification d'un hébergement", createdAt: "15/06/2026", delay: "45 jours", status: "Complétée" }
    ]
  },
  {
    id: 3,
    name: "Balade gourmande Ardennaise",
    date: "05/10/2025",
    type: "Activité",
    status: "Nouveau",
    codePostal: "4500",
    rue: "Chaussée de Liège 23"
  },
  {
    id: 4,
    name: "Soirée terroir en terrasse",
    date: "20/11/2025",
    type: "Attraction",
    status: "Nouveau",
    codePostal: "4020",
    rue: "Avenue des Nations 5",
    demarches: [
      { id: 1, numero: "001/002/0000001", title: "Demander la certification d'une attraction", createdAt: "20/11/2025", status: "Brouillon" }
    ]
  },
  {
    id: 5,
    name: "Le Manoir des Ardennes",
    date: "03/01/2025",
    type: "Hébergement",
    subType: "Hôtel",
    status: "Certifiée",
    codePostal: "6900",
    rue: "Route de Marche 45",
    numeroEnregistrement: "BELWAL001/001/0000442",
    dateFinASI: "28/02/2027",
    demarches: [
      { id: 1, numero: "001/001/0000006", title: "Enregistrer un hébergement", createdAt: "03/01/2025", closedAt: "20/04/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000007", title: "Demander la certification d'un hébergement", createdAt: "15/06/2025", closedAt: "28/09/2025", status: "Octroyée" }
    ]
  },
  {
    id: 6,
    name: "Camping des Trois Vallées",
    date: "15/03/2025",
    type: "Hébergement",
    subType: "Camping",
    status: "Enregistrée",
    codePostal: "6980",
    rue: "Chemin du Bois 3",
    numeroEnregistrement: "BELWAL001/001/0000443",
    dateFinASI: "30/06/2027",
    demarches: [
      { id: 1, numero: "001/001/0000008", title: "Enregistrer un hébergement", createdAt: "15/03/2025", closedAt: "10/06/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000009", title: "Renouveler la validité d'un enregistrement", createdAt: "10/06/2027", delay: "30 jours", status: "Soumise" }
    ]
  },
  {
    id: 7,
    name: "La Ferme de la Lesse",
    date: "22/04/2025",
    type: "Hébergement",
    subType: "Maison d'hôtes",
    status: "Certifiée",
    codePostal: "5560",
    rue: "Rue de la Lesse 17",
    numeroEnregistrement: "BELWAL001/001/0000444",
    dateFinASI: "31/12/2026",
    children: [
      { id: 701, name: "Suite Ardenne", capacity: 3, numeroEnregistrement: "BELWAL001/001/0000444-01" },
      { id: 702, name: "Chambre Meuse", capacity: 2, numeroEnregistrement: "BELWAL001/001/0000444-02" },
      { id: 703, name: "Chambre Famenne", capacity: 4, numeroEnregistrement: "BELWAL001/001/0000444-03" }
    ],
    demarches: [
      { id: 1, numero: "001/001/0000010", title: "Enregistrer un hébergement", createdAt: "22/04/2025", closedAt: "15/07/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000011", title: "Demander le classement d'un hébergement", createdAt: "01/09/2025", closedAt: "10/12/2025", status: "Refusée" },
      { id: 3, numero: "001/001/0000012", title: "Demander la certification d'un hébergement", createdAt: "15/10/2025", delay: "45 jours", status: "A compléter" }
    ]
  },
  {
    id: 8,
    name: "Studio Les Fagnes",
    date: "10/06/2025",
    type: "Hébergement",
    subType: "Meublé",
    status: "Nouveau",
    codePostal: "4950",
    rue: "Avenue des Fagnes 2",
    numeroEnregistrement: "BELWAL001/001/0000445",
    dateFinASI: "30/09/2026",
    demarches: [
      { id: 1, numero: "001/001/0000013", title: "Enregistrer un hébergement", createdAt: "10/06/2025", status: "Brouillon" }
    ]
  },
  {
    id: 9,
    name: "Hôtel du Château de Liège",
    date: "07/07/2025",
    type: "Hébergement",
    subType: "Hôtel",
    status: "Certifiée",
    codePostal: "4000",
    rue: "Place du Marché 1",
    numeroEnregistrement: "BELWAL001/001/0000446",
    dateFinASI: "01/03/2027",
    demarches: [
      { id: 1, numero: "001/001/0000014", title: "Enregistrer un hébergement", createdAt: "07/07/2025", closedAt: "20/10/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000015", title: "Demander la certification d'un hébergement", createdAt: "20/01/2026", delay: "45 jours", status: "En traitement" },
      { id: 3, numero: "001/001/0000016", title: "Arrêter une exploitation", createdAt: "01/06/2026", closedAt: "25/09/2026", status: "Sans suite" }
    ]
  },
  {
    id: 10,
    name: "Visite des Grottes de Han",
    date: "18/08/2025",
    type: "Attraction",
    status: "Certifiée",
    codePostal: "5580",
    rue: "Rue Joseph Lamotte 2",
    demarches: [
      { id: 1, numero: "001/002/0000002", title: "Demander la certification d'une attraction", createdAt: "18/08/2025", closedAt: "05/12/2025", status: "Octroyée" }
    ]
  },
  {
    id: 11,
    name: "Randonnée des Crêtes de l'Ourthe",
    date: "30/08/2025",
    type: "Activité",
    status: "Enregistrée",
    codePostal: "6660",
    rue: "Place du Village 4"
  },
  {
    id: 12,
    name: "Marché de Noël de Namur",
    date: "01/11/2025",
    type: "Attraction",
    status: "Certifiée",
    codePostal: "5000",
    rue: "Place d'Armes 1",
    demarches: [
      { id: 1, numero: "001/002/0000003", title: "Demander la certification d'une attraction", createdAt: "01/11/2025", closedAt: "15/02/2026", status: "Octroyée" },
      { id: 2, numero: "001/002/0000004", title: "Demander la certification d'une attraction", createdAt: "01/11/2026", delay: "60 jours", status: "Soumise" }
    ]
  },
  {
    id: 13,
    name: "Escapade en kayak sur l'Ourthe",
    date: "14/11/2025",
    type: "Activité",
    status: "Nouveau",
    codePostal: "4190",
    rue: "Quai de l'Ourthe 8"
  },
  {
    id: 14,
    name: "Camping de la Semois",
    date: "02/12/2025",
    type: "Hébergement",
    subType: "Camping",
    status: "Nouveau",
    codePostal: "6830",
    rue: "Route de la Semois 22",
    numeroEnregistrement: "BELWAL001/001/0000447",
    dateFinASI: "31/10/2026",
    demarches: [
      { id: 1, numero: "001/001/0000017", title: "Enregistrer un hébergement", createdAt: "02/12/2025", delay: "21 jours", status: "A compléter" }
    ]
  }
];

// Correspondance statut offre → classe Bootstrap (bg-*)
const STATUS_COLOR = {
  'Certifiée': 'success',
  'Enregistrée': 'secondary',
  'Nouveau': 'warning'
};

// Correspondance statut démarche → classe Bootstrap (bg-*)
const DEMARCHE_STATUS_COLOR = {
  'Brouillon': 'secondary',
  'Soumise': 'primary',
  'A compléter': 'warning',
  'Complétée': 'info',
  'En traitement': 'primary',
  'Sans suite': 'dark',
  'Octroyée': 'success',
  'Refusée': 'danger'
};

// Pourcentage d'avancement affiché dans la barre de progression — les statuts terminaux sont à 100
const DEMARCHE_PROGRESS = {
  'Brouillon': 10,
  'Soumise': 30,
  'A compléter': 50,
  'Complétée': 65,
  'En traitement': 80,
  'Sans suite': 100,
  'Octroyée': 100,
  'Refusée': 100
};
