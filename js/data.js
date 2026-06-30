const OFFERS = [
  {
    id: 1,
    name: "Bivouac du Gitan",
    date: "12/09/2025",
    type: "Hébergement",
    subType: "Maison d'hôtes",
    status: "Enregistrée",
    adresseComplete: "Rue des Fagnes 12, 4960 Malmedy, BEL",
    capaciteASI: 5,
    numeroEnregistrement: "BELWAL001/001/0000440",
    dateFinASI: "15/11/2028",
    children: [
      { id: 101, name: "Chambre Bleue", capacity: 2, numeroEnregistrement: "BELWAL001/001/0000440-01" },
      { id: 102, name: "Chambre Verte", capacity: 3, numeroEnregistrement: "BELWAL001/001/0000440-02" }
    ],
    numeros: [
      {
        noDecision: "BELWAL001/001/0000440",
        sujet: "Enregistrer un hébergement",
        dateDelivrance: "15/11/2025",
        dateFin: "15/11/2028"
      }
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
    status: "Enregistrée",
    adresseComplete: "Rue du Gîte 8, 4845 Jalhay, BEL",
    capaciteASI: 4,
    numeroEnregistrement: "BELWAL001/001/0000441",
    dateFinASI: "15/06/2031",
    numeros: [
      {
        noDecision: "BELWAL001/001/0000441",
        sujet: "Enregistrer un hébergement",
        dateDelivrance: "20/12/2025",
        dateFin: "15/06/2031"
      }
    ],
    demarches: [
      { id: 1, numero: "001/001/0000003", title: "Enregistrer un hébergement", createdAt: "12/09/2025", closedAt: "20/12/2025", status: "Octroyée" },
      { id: 3, numero: "001/001/0000005", title: "Demander la certification d'un hébergement", createdAt: "15/06/2026", delay: "45 jours", status: "Complétée" }
    ]
  },
  {
    id: 3,
    name: "Balade gourmande Ardennaise",
    date: "05/10/2025",
    type: "Activité",
    status: "Nouveau",
    adresseComplete: "Chaussée de Liège 23, 4500 Huy, BEL"
  },
  {
    id: 4,
    name: "Soirée terroir en terrasse",
    date: "20/11/2025",
    type: "Attraction",
    status: "Nouveau",
    adresseComplete: "Avenue des Nations 5, 4020 Liège, BEL",
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
    adresseComplete: "Route de Marche 45, 6900 Marche-en-Famenne, BEL",
    capaciteASI: 18,
    numeroEnregistrement: "BELWAL001/001/0000442",
    dateFinASI: "28/09/2030",
    numeros: [
      {
        noDecision: "BELWAL001/001/0000442",
        sujet: "Enregistrer un hébergement",
        dateDelivrance: "20/04/2025",
        dateFin: "28/09/2030"
      },
      {
        noDecision: "001/001/000006",
        sujet: "Demander la certification d'un hébergement",
        certification: "Certification spécifique",
        categorieCertification: "Hôtel de Tourisme",
        dateDelivrance: "28/09/2025",
        dateFin: "28/09/2030"
      }
    ],
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
    adresseComplete: "Chemin du Bois 3, 6980 La Roche-en-Ardenne, BEL",
    capaciteASI: 12,
    numeroEnregistrement: "BELWAL001/001/0000443",
    dateFinASI: "10/06/2028",
    numeros: [
      {
        noDecision: "BELWAL001/001/0000443",
        sujet: "Enregistrer un hébergement",
        dateDelivrance: "10/06/2025",
        dateFin: "10/06/2028"
      }
    ],
    demarches: [
      { id: 1, numero: "001/001/0000008", title: "Enregistrer un hébergement", createdAt: "15/03/2025", closedAt: "10/06/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000009", title: "Renouveler la validité d'un enregistrement", createdAt: "10/03/2026", delay: "30 jours", status: "Soumise" }
    ]
  },
  {
    id: 7,
    name: "La Ferme de la Lesse",
    date: "22/04/2025",
    type: "Hébergement",
    subType: "Maison d'hôtes",
    status: "Certifiée",
    adresseComplete: "Rue de la Lesse 17, 5560 Houyet, BEL",
    capaciteASI: 9,
    numeroEnregistrement: "BELWAL001/001/0000444",
    dateFinASI: "20/02/2029",
    children: [
      { id: 701, name: "Suite Ardenne", capacity: 3, numeroEnregistrement: "BELWAL001/001/0000444-01" },
      { id: 702, name: "Chambre Meuse", capacity: 2, numeroEnregistrement: "BELWAL001/001/0000444-02" },
      { id: 703, name: "Chambre Famenne", capacity: 4, numeroEnregistrement: "BELWAL001/001/0000444-03" }
    ],
    numeros: [
      {
        noDecision: "BELWAL001/001/0000444",
        sujet: "Enregistrer un hébergement",
        dateDelivrance: "15/07/2025",
        dateFin: "20/02/2029"
      },
      {
        noDecision: "001/001/000009",
        sujet: "Demander la certification d'un hébergement",
        certification: "Certification de base",
        dateDelivrance: "15/11/2025",
        dateFin: "20/02/2029"
      }
    ],
    demarches: [
      { id: 1, numero: "001/001/0000010", title: "Enregistrer un hébergement", createdAt: "22/04/2025", closedAt: "15/07/2025", status: "Octroyée" },
      { id: 3, numero: "001/001/0000012", title: "Demander la certification d'un hébergement", createdAt: "15/10/2025", closedAt: "15/11/2025", status: "Octroyée" }
    ]
  },
  {
    id: 8,
    name: "Studio Les Fagnes",
    date: "10/06/2025",
    type: "Hébergement",
    subType: "Meublé",
    status: "Nouveau",
    adresseComplete: "Avenue des Fagnes 2, 4950 Waimes, BEL",
    capaciteASI: 2,
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
    status: "Classé",
    adresseComplete: "Place du Marché 1, 4000 Liège, BEL",
    capaciteASI: 20,
    numeroEnregistrement: "BELWAL001/001/0000446",
    dateFinASI: "15/03/2031",
    numeros: [
      {
        noDecision: "BELWAL001/001/0000446",
        sujet: "Enregistrer un hébergement",
        dateDelivrance: "20/10/2025",
        dateFin: "15/03/2031"
      },
      {
        noDecision: "001/001/000011",
        sujet: "Demander la certification d'un hébergement",
        certification: "Certification spécifique",
        categorieCertification: "Hôtel de Tourisme",
        dateDelivrance: "15/01/2026",
        dateFin: "15/03/2031"
      },
      {
        noDecision: "001/001/000012",
        sujet: "Demander le classement d'un hébergement",
        classement: "3 étoiles",
        dateDelivrance: "15/03/2026",
        dateFin: "15/03/2031"
      }
    ],
    demarches: [
      { id: 1, numero: "001/001/0000014", title: "Enregistrer un hébergement", createdAt: "07/07/2025", closedAt: "20/10/2025", status: "Octroyée" },
      { id: 2, numero: "001/001/0000015", title: "Demander la certification d'un hébergement", createdAt: "10/11/2025", closedAt: "15/01/2026", status: "Octroyée" },
      { id: 3, numero: "001/001/0000018", title: "Demander le classement d'un hébergement", createdAt: "15/01/2026", closedAt: "15/03/2026", status: "Octroyée" },
      { id: 4, numero: "001/001/0000016", title: "Arrêter une exploitation", createdAt: "01/06/2026", closedAt: "25/09/2026", status: "Sans suite" }
    ]
  },
  {
    id: 10,
    name: "Visite des Grottes de Han",
    date: "18/08/2025",
    type: "Attraction",
    status: "Certifiée",
    adresseComplete: "Rue Joseph Lamotte 2, 5580 Han-sur-Lesse, BEL",
    numeros: [
      {
        noDecision: "001/002/000001",
        sujet: "Demander la certification d'une attraction",
        poleDattraction: "Naturel",
        dateDelivrance: "05/12/2025",
        dateFin: "05/12/2030"
      }
    ],
    demarches: [
      { id: 1, numero: "001/002/0000002", title: "Demander la certification d'une attraction", createdAt: "18/08/2025", closedAt: "05/12/2025", status: "Octroyée" }
    ]
  },
  {
    id: 12,
    name: "Marché de Noël de Namur",
    date: "01/11/2025",
    type: "Attraction",
    status: "Certifiée",
    adresseComplete: "Place d'Armes 1, 5000 Namur, BEL",
    numeros: [
      {
        noDecision: "001/002/000002",
        sujet: "Demander la certification d'une attraction",
        poleDattraction: "Récréatif",
        sousPoleRecréatif: "Circuit à thème",
        dateDelivrance: "15/02/2026",
        dateFin: "15/02/2031"
      }
    ],
    demarches: [
      { id: 1, numero: "001/002/0000003", title: "Demander la certification d'une attraction", createdAt: "01/11/2025", closedAt: "15/02/2026", status: "Octroyée" },
      { id: 2, numero: "001/002/0000004", title: "Demander la certification d'une attraction", createdAt: "01/05/2026", delay: "60 jours", status: "Soumise" }
    ]
  },
  {
    id: 13,
    name: "Escapade en kayak sur l'Ourthe",
    date: "14/11/2025",
    type: "Activité",
    status: "Nouveau",
    adresseComplete: "Quai de l'Ourthe 8, 4190 Ferrières, BEL"
  },
  {
    id: 14,
    name: "Camping de la Semois",
    date: "02/12/2025",
    type: "Hébergement",
    subType: "Camping",
    status: "Nouveau",
    adresseComplete: "Route de la Semois 22, 6830 Bouillon, BEL",
    capaciteASI: 8,
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
