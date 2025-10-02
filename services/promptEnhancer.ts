/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Helper Function ---
/**
 * Selects a random element from an array.
 * @param arr The array to select from.
 * @returns A random element from the array.
 */
const selectRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Creative Libraries ---

const CAMERA_ANGLES = [
    'plongée dramatique', 'gros plan intime', 'angle hollandais dynamique', 'contre-plongée héroïque',
    'plan moyen candide', 'plan large cinématique', 'vue par-dessus l\'épaule', 'vue subjective (POV)',
    'plan de profil', 'vue de trois quarts', 'plan à hauteur des yeux'
];

const LIGHTING_STYLES = [
    'éclairage Rembrandt dramatique avec des ombres profondes', 'lumière douce et rêveuse de l\'heure dorée', 'lumière crue du soleil de midi créant des contrastes forts',
    'clair de lune mystérieux avec un brouillard volumétrique', 'éclairage néon noir vibrant avec des teintes bleues et roses', 'configuration d\'éclairage cinématique à trois points',
    'contre-jour créant un effet de halo autour du sujet', 'lumière douce et diffuse d\'un ciel couvert', 'éclairage inquiétant par le bas',
    'technique d\'éclairage en clair-obscur'
];

const ATMOSPHERES = [
    'sereine et paisible', 'tendue et pleine de suspense', 'énergique et chaotique', 'mélancolique et sombre',
    'rêveuse et éthérée', 'joyeuse et festive', 'mystérieuse et intrigante', 'brute et granuleuse',
    'nostalgique et vintage', 'futuriste et épurée'
];

// Context-specific details to make scenes more vivid
const CONTEXTUAL_ENVIRONMENTS: Record<string, string[]> = {
    'western': [
        'dans un saloon poussiéreux et animé avec des clients en arrière-plan',
        'surplombant un vaste canyon au coucher du soleil',
        'pendant une confrontation tendue dans une rue principale déserte',
        'à l\'intérieur d\'un bureau de shérif rustique avec des affiches de recherche sur le mur',
        'montant à cheval à travers une prairie ensoleillée',
        'autour d\'un feu de camp crépitant sous un vaste ciel étoilé',
        'défendant une ferme isolée contre des bandits',
        'à bord d\'un train à vapeur lancé à toute vitesse traversant un pont en bois',
        'dans une ville fantôme balayée par le vent pendant une tempête',
        'travaillant à la forge d\'un forgeron, des étincelles jaillissant de l\'enclume',
        'au milieu d\'une conduite de bétail chaotique à travers une large rivière boueuse',
        'cherchant de l\'or dans un ruisseau de montagne froid, entouré de pins',
        'participant à une partie de poker à enjeux élevés dans une arrière-salle',
        'défendant une diligence contre des hors-la-loi sur un col de montagne rocheux'
    ],
    'science_fiction_cyberpunk': [
        'dans une ruelle détrempée par la pluie, illuminée par des publicités holographiques vacillantes',
        'sur un marché high-tech bondé à plusieurs niveaux avec des véhicules volants qui passent à toute vitesse',
        'à l\'intérieur d\'un laboratoire d\'entreprise minimaliste et stérile avec des écrans de données lumineux',
        'regardant depuis un méga-appartement d\'un gratte-ciel une cityscape tentaculaire et éclairée au néon',
        'dans un repaire de pirates informatiques souterrain rempli de fils emmêlés, de serveurs et de moniteurs',
        'à un bar à nouilles miteux dans une rue bondée et remplie de vapeur',
        'dans le cockpit d\'une hover-voiture futuriste lors d\'une course-poursuite à grande vitesse',
        'navigant dans un espace de données de réalité augmentée chatoyant et abstrait',
        'dans une clinique de cybernétique miteuse d\'une ruelle avec des lumières chirurgicales vacillantes et des pièces de rechange',
        'à une fête d\'entreprise haut de gamme au 100ème étage d\'un gratte-ciel chromé',
        'navigant dans les gigantesques et bruyants puits de maintenance et tunnels d\'une mégastructure de la taille d\'une ville',
        'dans une arène de combat en apesanteur avec des obstacles lumineux au néon'
    ],
    'post_apocalyptique': [
        'fouillant les ruines d\'une métropole en décomposition envahie par la nature',
        'montant la garde dans une colonie fortifiée improvisée faite de ferraille',
        'conduisant un véhicule blindé lourdement modifié à travers un désert désolé et brûlé par le soleil',
        'blotti autour d\'un feu de baril dans un abri de station de métro détruite',
        'regardant une ville inondée et abandonnée depuis un toit',
        'troquant des marchandises dans un poste de traite animé et improvisé',
        'dans une tour de guet solitaire, scrutant le paysage aride avec des jumelles',
        'explorant une épave de navire abandonnée et ensablée sur ce qui était autrefois un fond marin',
        'navigant dans une "zone interdite" toxique et irradiée dans une combinaison de protection rafistolée',
        's\'occupant d\'une ferme hydroponique en difficulté à l\'intérieur d\'un bunker souterrain renforcé',
        'escaladant les restes squelettiques d\'un gratte-ciel effondré pour une meilleure vue',
        'navigant sur un radeau de fortune à travers les rues inondées d\'une ville "aquatique"'
    ],
    'fantasy': [
        'dans une forêt enchantée avec une flore lumineuse et d\'anciens arbres couverts de mousse',
        'dans une grande salle du trône d\'un château médiéval avec de hauts plafonds voûtés',
        'consultant un tome magique et lumineux dans une vaste bibliothèque ancienne',
        'au bord d\'une falaise volcanique qui s\'effrite, surplombant l\'antre d\'un dragon',
        'sur une place de marché fantastique animée, remplie de créatures mythiques et de vendeurs',
        'traversant un pont de corde précaire suspendu au-dessus d\'un gouffre brumeux',
        'dans un réseau de grottes mystiques, avec des murs incrustés de cristaux lumineux',
        'dans une cité elfe cachée, construite parmi les hautes branches d\'arbres géants et anciens',
        'au plus profond d\'une forteresse naine dans la montagne, au milieu de grandes salles de pierre et de rivières de lave',
        'devant un conseil de puissants sorciers dans une chambre de cristaux flottants'
    ],
    'film_noir_1930s_40s': [
        'dans un bureau de détective enfumé et faiblement éclairé alors que la pluie ruisselle sur la fenêtre',
        'attendant sous un lampadaire solitaire dans une rue brumeuse et humide la nuit',
        'à un gala de la haute société glamour mais dangereux dans une grande salle de bal',
        'dans une ruelle sombre lors d\'une réunion clandestine, de la vapeur s\'élevant des bouches d\'aération',
        'au bar d\'un club de jazz à l\'atmosphère maussade, avec un saxophoniste solitaire sur scène',
        'sur les quais balayés par la pluie à minuit, avec la silhouette d\'un cargo à proximité',
        'à l\'intérieur d\'une grande gare sombre, attendant une arrivée mystérieuse',
        'dans une salle d\'interrogatoire tendue, avec une seule ampoule nue suspendue au plafond',
        'passant un appel désespéré depuis une cabine téléphonique au coin d\'une rue déserte et battue par la pluie',
        'se cachant dans l\'ombre d\'un grand hall de cinéma art-déco'
    ],
    'medieval': [
        'dans une cour de château médiéval animée pendant un festival, avec des bouffons et des marchands',
        'sur les remparts froids en pierre d\'une forteresse, surplombant un vaste royaume à l\'aube',
        'dans la forge humble mais occupée d\'un forgeron, avec des étincelles jaillissant de l\'enclume',
        'en tant que participant à un tournoi de joute royal, avec la foule qui applaudit',
        'dans une grande salle de banquet médiévale éclairée à la torche, festoyant à une longue table',
        'dans un scriptorium de monastère calme, entouré de manuscrits enluminés',
        's\'entraînant avec une épée et un bouclier dans une cour d\'entraînement de château boueuse',
        'assistant à une cour royale, remplie de nobles, d\'intrigues et de secrets chuchotés'
    ],
    'pirates': [
        'sur le pont chaotique d\'un bateau pirate pendant une violente tempête en mer, avec des vagues s\'écrasant sur le côté',
        'dans une crique cachée éclairée à la torche, partageant des coffres au trésor débordant d\'or et de bijoux',
        'dans une taverne de pirates bruyante et enfumée sur une île tropicale comme Tortuga',
        'à la barre du navire, naviguant d\'après les étoiles avec un grand gouvernail en bois',
        'engagé dans un combat à l\'épée désespéré au milieu des gréements du navire, bien au-dessus du pont',
        'examinant une mystérieuse carte au trésor dans la cabine du capitaine à la lueur d\'une bougie',
        'menant un groupe d\'abordage, se balançant d\'un navire à l\'autre sur une corde'
    ],
    'espionnage_guerre_froide': [
        'à un point de dépôt clandestin sous un pont dans le Berlin de la Guerre Froide, alors qu\'un train gronde au-dessus',
        'lors d\'une réunion secrète et tendue dans un bureau boisé et enfumé à Londres',
        'observant secrètement une cible depuis un toit avec des jumelles à longue portée à Vienne',
        'lors d\'un échange de prisonniers à haut risque sur un pont enveloppé de brouillard',
        'se fondant dans la masse lors d\'une somptueuse fête d\'ambassade à Moscou pour recueillir des renseignements',
        'dans une course-poursuite en voiture à grande vitesse dans les rues étroites d\'une capitale européenne',
        'installant du matériel de surveillance secret dans une chambre d\'hôtel en face de l\'emplacement d\'une cible'
    ],
    'samourai_japon_feodal': [
        'dans un jardin de rocaille zen serein, méditant avant un duel alors que les fleurs de cerisier tombent',
        'sur un champ de bataille brumeux, debout sous la fière bannière de leur clan',
        'dans une maison de thé traditionnelle et calme, exécutant la cérémonie du thé complexe',
        'montant la garde solennellement à la porte imposante d\'un majestueux château japonais',
        'marchant silencieusement à travers une forêt de bambous dense enveloppée de brume',
        'défendant un petit village d\'une attaque de bandits, aux côtés des paysans',
        's\'engageant dans un duel formel au clair de lune sur un pont en bois au-dessus d\'une rivière tumultueuse'
    ]
};

const VOGUE_EDITORIALE_LIBRARY = {
    "studio_magazine": {
      "lieux": ["fond blanc", "fond beige élégant", "fond coloré pastel", "fond noir chic"],
      "tenues": ["robe couture minimaliste", "ensemble fashion noir", "tailleur élégant", "robe colorée vibrante"],
      "expressions": ["pose sérieuse", "regard perçant", "sourire subtil", "air mystérieux"],
      "lumieres": ["softbox homogène", "éclairage diffus", "lumière cinéma douce", "spot frontal"],
      "accessoires": ["aucun", "boucles sobres", "collier discret", "lunettes mode"]
    },
    "urbain_chic": {
      "lieux": ["rue moderne", "métro new-yorkais", "rooftop urbain", "devant un immeuble design"],
      "tenues": ["robe noire couture", "ensemble street-chic", "robe argentée", "look couture coloré"],
      "expressions": ["regard assuré", "pose élégante", "air mystérieux", "clin d’œil"],
      "lumieres": ["golden hour", "lumière urbaine nocturne", "contre-jour dramatique", "flash studio extérieur"],
      "accessoires": ["sac couture", "bijoux fashion", "aucun", "lunettes soleil"]
    },
    "mode_conceptuelle": {
      "lieux": ["décor minimaliste blanc", "installation artistique", "studio géométrique", "fond abstrait coloré"],
      "tenues": ["robe expérimentale", "ensemble géométrique", "robe couture asymétrique", "look futuriste fashion"],
      "expressions": ["pose conceptuelle", "regard intense", "expression mystérieuse", "pose exagérée"],
      "lumieres": ["néons colorés", "softbox diffuse", "contre-jour artistique", "ombres dramatiques"],
      "accessoires": ["bijoux conceptuels", "lunettes oversized", "aucun", "collier imposant"]
    }
};

const HAUTE_COUTURE_LIBRARY = {
    "defile_parisien": {
      "lieux": [
        "podium fashion week Paris avec foule et photographes",
        "salle de défilé bondée avec spectateurs",
        "entrée de gala avec public et sécurité",
        "backstage visible avec projecteurs et rideaux"
      ],
      "tenues": ["robe de soirée dorée", "smoking couture femme", "robe noire sculpturale", "ensemble futuriste"],
      "expressions": ["regard intense", "pose sérieuse", "expression mystérieuse", "air assuré"],
      "lumieres": ["spotlights défilé", "flashs photographes", "éclairage latéral", "contre-jour dramatique"],
      "accessoires": ["pochette haute couture", "chapeau extravagant", "bijoux luxueux", "aucun"]
    },
    "studio_editorial": {
      "lieux": [
        "fond uni gris",
        "studio mode minimaliste avec réflecteurs visibles",
        "fond blanc éclatant",
        "décor géométrique coloré"
      ],
      "tenues": ["robe sculpturale", "tailleur noir chic", "robe asymétrique", "ensemble couture pastel"],
      "expressions": ["sourire subtil", "pose sérieuse", "regard assuré", "expression dramatique"],
      "lumieres": ["softbox diffuse", "éclairage 3 points", "projecteur unique", "éclairage coloré fashion"],
      "accessoires": ["boucles d’oreilles voyantes", "bracelet haute couture", "aucun", "lunettes mode"]
    },
    "couture_exterieure": {
      "lieux": [
        "façade palais parisien avec passants",
        "terrasse chic au coucher du soleil",
        "opéra Garnier avec foule",
        "rooftop urbain de luxe avec skyline"
      ],
      "tenues": [
        "robe longue satin",
        "ensemble chic blanc",
        "robe fendue haute couture",
        "manteau couture"
      ],
      "expressions": ["sourire glamour", "regard perçant", "air mystérieux", "pose assurée"],
      "lumieres": ["golden hour", "lumière urbaine nocturne", "flashs paparazzi", "contre-jour soleil"],
      "accessoires": ["bijoux diamants", "pochette soirée", "écharpe élégante", "aucun"]
    }
};

const PORTRAIT_GLAMOUR_LIBRARY = {
    'studio_classique': {
      "lieux": ["fond uni noir", "fond blanc", "studio pastel", "fond doré texturé"],
      "tenues": ["robe satin rouge", "smoking élégant", "robe noire moulante", "tailleur chic"],
      "expressions": ["sourire subtil", "regard perçant", "sourire coquin", "air mystérieux"],
      "lumieres": ["softbox homogène", "éclairage 3 points", "projecteur unique", "halo diffus"],
      "accessoires": ["boucles sobres", "bracelet argenté", "aucun", "lunettes de studio"]
    },
    'festival_de_cannes': {
      "lieux": [
        "festival de Cannes avec les marches et la foule derrière",
        "Oscars Hollywood, tapis rouge bondé, projecteurs, foule",
        "soirée gala mode Paris avec public, journalistes, barrières",
        "tapis rouge de cinéma avec sécurité, fans et photographes"
      ],
      "tenues": ["robe dorée couture", "robe noire haute couture", "smoking blanc", "robe argentée scintillante"],
      "expressions": ["sourire glamour", "regard assuré", "clin d’œil", "pose dramatique"],
      "lumieres": ["flashs paparazzi multiples", "projecteurs puissants", "spotlight unique", "contre-jour glamour"],
      "accessoires": ["pochette soirée", "collier scintillant", "boucles pendantes", "aucun"]
    },
    'cinematique_noir': {
      "lieux": ["bar feutré années 50", "ruelle dramatique", "studio ombragé", "salon rétro"],
      "tenues": ["robe noire dramatique", "robe rouge satin", "costume sombre", "robe violette sombre"],
      "expressions": ["regard intense", "sourire discret", "expression dramatique", "air mystérieux"],
      "lumieres": ["contre-jour", "ombres diagonales", "projecteur unique", "lumière dramatique"],
      "accessoires": ["cigarette vintage", "gants satin", "chapeau rétro", "aucun"]
    },
    'luxe_exterieur': {
      "lieux": ["terrasse villa", "yacht", "rooftop urbain", "jardin privé"],
      "tenues": ["robe champagne", "robe bleue électrique", "smoking chic", "robe noire fendue"],
      "expressions": ["sourire franc", "regard au loin", "sourire glamour", "expression sérieuse"],
      "lumieres": ["golden hour", "lumière soirée", "contre-jour urbain", "flashs extérieurs"],
      "accessoires": ["bijoux diamants", "sac de luxe", "lunettes soleil", "aucun"]
    },
    'hotel_glamour': {
      "lieux": ["hall luxueux", "chambre design", "bar cosy", "lounge feutré"],
      "tenues": ["robe satinée", "peignoir chic", "smoking noir", "robe dorée glamour"],
      "expressions": ["air détendu", "sourire charmeur", "regard mystérieux", "pose sensuelle"],
      "lumieres": ["lumière chaude tamisée", "lampes design", "ambiance feutrée", "golden hour baies vitrées"],
      "accessoires": ["verre de champagne", "collier perles", "boucles dorées", "aucun"]
    },
    'soiree_glamour': {
      "lieux": ["club privé", "salle de bal", "fête luxueuse", "discothèque chic"],
      "tenues": ["robe à paillettes", "smoking blanc", "robe rouge fendue", "robe noire élégante"],
      "expressions": ["sourire exubérant", "clin d’œil", "rire franc", "pose élégante"],
      "lumieres": ["spot coloré", "lumière de soirée", "ambiance tamisée", "flashs improvisés"],
      "accessoires": ["coupe de champagne", "sac clutch", "bijoux discrets", "aucun"]
    },
    'plage_glamour': {
      "lieux": ["plage privée avec vacanciers", "transat design au bord de mer", "coucher de soleil avec silhouettes au loin", "cabane chic sur sable fin"],
      "tenues": ["robe légère blanche", "bikini chic", "robe rouge fluide", "chemise élégante"],
      "expressions": ["sourire lumineux", "regard intense", "air séducteur", "rire subtil"],
      "lumieres": ["golden hour plage", "lumière douce matin", "contre-jour océan", "reflet sur l’eau"],
      "accessoires": ["lunettes soleil", "collier coquillage chic", "chapeau large", "aucun"]
    }
};

const JOURNEE_MANNEQUIN_LIBRARY = {
  "reveil_matinal": {
    "scene": "Réveil dans une chambre lumineuse, draps blancs, tasse de café posée sur la table de nuit",
    "lieux": [
      "chambre cosy",
      "lit défait avec oreillers",
      "fenêtre entrouverte laissant passer la lumière"
    ],
    "tenues": [
      "pyjama soyeux clair",
      "peignoir blanc élégant",
      "chemise de nuit satinée"
    ],
    "expressions": [
      "air ensommeillé",
      "sourire discret du matin",
      "regard rêveur"
    ],
    "lumieres": [
      "lumière douce matinale",
      "rayons de soleil filtrant à travers des rideaux",
      "ambiance chaude et feutrée"
    ],
    "accessoires": [
      "tasse de café",
      "chat sacré de Birmanie",
      "livre posé",
      "oreiller décoratif"
    ]
  },
  "preparation_salle_de_bain": {
    "scene": "Préparation dans la salle de bain, miroir éclairé, maquillage et coiffure en cours",
    "lieux": [
      "salle de bain moderne avec miroir lumineux",
      "coiffeuse avec produits de beauté",
      "salle carrelée avec grande glace"
    ],
    "tenues": [
      "serviette enroulée",
      "peignoir en coton",
      "robe légère avant défilé"
    ],
    "expressions": [
      "air concentré",
      "sourire subtil",
      "regard sérieux dans le miroir"
    ],
    "lumieres": [
      "néons blancs",
      "éclairage diffus",
      "ambiance naturelle salle de bain"
    ],
    "accessoires": [
      "sèche-cheveux",
      "rouge à lèvres",
      "brosse à cheveux",
      "chat sacré de Birmanie"
    ]
  },
  "backstage_fashion_week": {
    "scene": "Coulisses bondées, maquilleuses et stylistes s’affairent autour des mannequins",
    "lieux": [
      "backstage rempli de portants",
      "zone maquillage",
      "coulisses animées avec projecteurs"
    ],
    "tenues": [
      "peignoir backstage",
      "robe couture en préparation",
      "ensemble stylisé prêt pour le podium"
    ],
    "expressions": [
      "air concentré",
      "regard assuré",
      "expression nerveuse avant le show"
    ],
    "lumieres": [
      "éclairage néon",
      "spots techniques puissants",
      "ambiance backstage"
    ],
    "accessoires": [
      "chaussures sur portants",
      "sac couture",
      "miroirs éclairés",
      "pinceaux maquillage"
    ]
  },
  "podium_fashion_week": {
    "scene": "Sur le podium, devant les spectateurs et les flashs des photographes",
    "lieux": [
      "passerelle fashion week",
      "podium illuminé",
      "salle bondée avec public"
    ],
    "tenues": [
      "robe haute couture dorée",
      "smoking féminin couture",
      "robe asymétrique spectaculaire"
    ],
    "expressions": [
      "regard intense",
      "pose assurée",
      "sourire glamour"
    ],
    "lumieres": [
      "spotlights puissants",
      "flashs photographes",
      "contre-jour dramatique"
    ],
    "accessoires": [
      "bijoux luxueux",
      "clutch couture",
      "aucun (focus sur la robe)"
    ]
  },
  "soiree_cosy_maison": {
    "scene": "Retour à la maison, ambiance cosy avec plaid et chat, tasse de thé sur la table",
    "lieux": [
      "salon chaleureux",
      "canapé confortable",
      "table basse avec bougie"
    ],
    "tenues": [
      "gros pull en laine",
      "chaussettes épaisses",
      "legging cosy"
    ],
    "expressions": [
      "air détendu",
      "sourire apaisé",
      "expression rêveuse"
    ],
    "lumieres": [
      "lumière d’intérieur douce",
      "lampe tamisée",
      "bougie chaude"
    ],
    "accessoires": [
      "chat sacré de Birmanie",
      "tasse de thé",
      "livre",
      "ordinateur portable"
    ]
  }
};

const COUVERTURE_VOGUE_LIBRARY = {
  "noir_blanc_iconique": {
    "scene": "Portrait intemporel en noir et blanc, poses marquées, inspiration Avedon",
    "lieux": ["studio photo neutre", "fond blanc éclatant", "fond gris uni"],
    "tenues": ["robe noire minimaliste", "smoking femme", "tailleur blanc élégant"],
    "expressions": ["regard intense", "pose sérieuse", "air mystérieux"],
    "lumieres": ["éclairage contrasté", "lumière dure latérale", "projecteur unique"],
    "accessoires": ["aucun", "chapeau noir", "boucles sobres", "cigarette vintage"]
  },
  "glamour_dore": {
    "scene": "Couverture éclatante avec robes scintillantes et lumière chaude",
    "lieux": ["studio luxueux doré", "salle de gala", "podium illuminé"],
    "tenues": ["robe dorée couture", "robe argentée scintillante", "smoking blanc chic"],
    "expressions": ["sourire glamour", "regard assuré", "clin d’œil séducteur"],
    "lumieres": ["spotlights chauds", "éclairage doré diffus", "halo lumineux"],
    "accessoires": ["pochette brillante", "bijoux diamants", "bracelet doré", "aucun"]
  },
  "vogue_de_rue": {
    "scene": "Shooting urbain haute couture en extérieur, style brut",
    "lieux": ["rue new-yorkais", "métro bondé", "rooftop moderne", "façade design"],
    "tenues": ["robe noire couture", "ensemble street-chic", "look asymétrique coloré"],
    "expressions": ["regard confiant", "pose élégante", "sourire subtil"],
    "lumieres": ["golden hour urbaine", "flashs improvisés", "lumière néon de rue"],
    "accessoires": ["sac couture", "lunettes de soleil", "chapeau mode", "aucun"]
  },
  "revival_retro": {
    "scene": "Look rétro inspiré des années 60-70 avec couleurs pop et cadrages vintage",
    "lieux": ["studio coloré", "salle rétro avec mobilier 70s", "mur texturé pastel"],
    "tenues": ["robe trapèze années 60", "ensemble psychédélique", "robe pop colorée"],
    "expressions": ["sourire exubérant", "clin d’œil complice", "pose dramatique rétro"],
    "lumieres": ["néons colorés", "éclairage diffus rétro", "projecteur vintage"],
    "accessoires": ["boucles rondes oversized", "lunettes rétro", "sac pop coloré", "aucun"]
  },
  "studio_luxe_minimaliste": {
    "scene": "Fond neutre et luxe sobre, silhouette mise en valeur",
    "lieux": ["fond uni blanc", "fond beige minimaliste", "studio pastel épuré"],
    "tenues": ["robe couture minimaliste", "tailleur élégant", "ensemble noir chic"],
    "expressions": ["regard sérieux", "pose statique élégante", "air mystérieux"],
    "lumieres": ["softbox homogène", "éclairage 3 points neutre", "spot frontal"],
    "accessoires": ["aucun", "collier discret", "bracelet fin", "boucles sobres"]
  },
  "avant_garde_conceptuel": {
    "scene": "Expérimentation artistique et futuriste avec décors abstraits",
    "lieux": ["installation artistique", "studio géométrique", "fond abstrait coloré"],
    "tenues": ["robe futuriste", "ensemble conceptuel asymétrique", "look expérimental"],
    "expressions": ["pose conceptuelle", "regard intense", "expression exagérée"],
    "lumieres": ["néons colorés", "contre-jour dramatique", "éclairage artistique"],
    "accessoires": ["bijoux conceptuels", "lunettes oversized", "aucun", "collier imposant"]
  },
  "podium_couture": {
    "scene": "Scène captée en direct du défilé comme une couverture instantanée",
    "lieux": ["podium fashion week", "salle bondée avec public", "passerelle illuminée"],
    "tenues": ["robe haute couture spectaculaire", "ensemble couture futuriste", "robe asymétrique couture"],
    "expressions": ["regard assuré", "pose confiante", "expression glamour"],
    "lumieres": ["spotlights puissants", "flashs photographes", "contre-jour podium"],
    "accessoires": ["aucun", "bijoux couture", "clutch élégante"]
  }
};

const COUVERTURE_ELLE_LIBRARY = {
  "plage_ete": {
    "scene": "Shooting mode sur une plage ensoleillée avec sable, mer et accessoires colorés",
    "lieux": ["plage de sable fin", "bord de mer avec parasols", "transats design au soleil"],
    "tenues": ["maillot une pièce élégant", "robe fluide légère", "paréo chic", "bikini couture"],
    "expressions": ["sourire lumineux", "regard séducteur", "air détendu"],
    "lumieres": ["golden hour plage", "soleil éclatant", "lumière douce matin"],
    "accessoires": ["lunettes de soleil", "chapeau large", "sac de plage couture", "serviette colorée"]
  },
  "chic_decontracte": {
    "scene": "Look urbain décontracté mais sophistiqué, ambiance street-style parisien",
    "lieux": ["terrasse de café parisien", "rue chic", "rooftop urbain"],
    "tenues": ["jean taille haute avec blazer", "robe simple stylisée", "ensemble casual couture"],
    "expressions": ["sourire naturel", "regard assuré", "clin d’œil complice"],
    "lumieres": ["lumière naturelle urbaine", "golden hour en ville", "éclairage doux extérieur"],
    "accessoires": ["sac à main chic", "lunettes rondes", "boucles sobres", "aucun"]
  },
  "pastel_romantique": {
    "scene": "Couleurs douces, robes fluides, ambiance rêveuse et poétique",
    "lieux": ["jardin fleuri", "studio pastel", "terrasse ensoleillée avec fleurs"],
    "tenues": ["robe longue pastel", "jupe fluide romantique", "ensemble léger rose pâle"],
    "expressions": ["sourire subtil", "regard rêveur", "air mystérieux"],
    "lumieres": ["softbox diffuse", "golden hour douce", "éclairage naturel tamisé"],
    "accessoires": ["fleurs à la main", "couronne florale", "sac pastel", "aucun"]
  },
  "look_fete": {
    "scene": "Ambiance festive, soirée glamour avec paillettes et danse",
    "lieux": ["discothèque chic", "soirée cocktail", "salle de fête élégante"],
    "tenues": ["robe à paillettes", "smoking féminin", "robe rouge glamour"],
    "expressions": ["rire franc", "clin d’œil", "sourire exubérant"],
    "lumieres": ["spots colorés", "lumière tamisée soirée", "flash improvisé"],
    "accessoires": ["coupe de champagne", "sac clutch", "boucles voyantes", "aucun"]
  },
  "mode_lifestyle_urbain": {
    "scene": "Photos de mode ancrées dans la vie réelle, cafés et terrasses citadines",
    "lieux": ["terrasse de café parisien", "bar cosy urbain", "rue commerçante chic"],
    "tenues": ["robe élégante quotidienne", "ensemble city-chic", "look fashion street"],
    "expressions": ["sourire léger", "pose élégante", "air détendu"],
    "lumieres": ["éclairage naturel extérieur", "soleil de fin d’après-midi", "lampadaires urbains doux"],
    "accessoires": ["sac couture", "journal", "lunettes soleil", "tasse de café"]
  },
  "cocooning_interieur": {
    "scene": "Ambiance cosy à l’intérieur, confort chic et mode cocooning",
    "lieux": ["salon chaleureux", "chambre avec plaid", "canapé confortable"],
    "tenues": ["pull oversize", "chaussettes épaisses", "legging doux"],
    "expressions": ["air apaisé", "sourire détendu", "expression rêveuse"],
    "lumieres": ["lampe tamisée", "lumière naturelle intérieure", "bougie chaude"],
    "accessoires": ["tasse de thé", "livre", "ordinateur portable", "chat sacré de Birmanie"]
  },
  "sport_chic": {
    "scene": "Mode activewear élégante, entre sport et style urbain",
    "lieux": ["studio minimaliste", "salle de sport chic", "rooftop en plein effort"],
    "tenues": ["legging couture", "brassière élégante", "ensemble sport stylisé"],
    "expressions": ["air concentré", "regard intense", "sourire en mouvement"],
    "lumieres": ["lumière crue de studio", "éclairage naturel sportif", "contre-jour dynamique"],
    "accessoires": ["tapis de yoga", "casque audio", "bouteille design", "aucun"]
  }
};

const COUVERTURE_ELLE_DECO_LIBRARY = {
  "moderne_minimaliste": {
    "scene": "Intérieur contemporain épuré avec lignes droites et baies vitrées",
    "lieux": ["salon design blanc", "pièce ouverte minimaliste", "villa moderne avec vue mer"],
    "tenues": ["aucun (focus déco)"],
    "expressions": ["aucun (focus déco)"],
    "lumieres": ["lumière naturelle abondante", "éclairage indirect doux", "baies vitrées plein soleil"],
    "accessoires": ["table basse design", "canapé modulable", "sculpture minimaliste", "aucun"]
  },
  "boheme_chic": {
    "scene": "Ambiance chaleureuse et cosy avec tapis ethniques et plantes vertes",
    "lieux": ["salon bohème avec coussins colorés", "terrasse cosy bohème", "pièce avec tapis persans et tentures"],
    "tenues": ["aucun"],
    "expressions": ["aucun"],
    "lumieres": ["lumière chaude tamisée", "lumière naturelle filtrée par rideaux", "bougies et lampes"],
    "accessoires": ["plantes suspendues", "paniers tressés", "tapis ethnique", "miroir soleil"]
  },
  "elegant_bord_de_mer": {
    "scene": "Maison raffinée en bord de mer, ambiance marine et élégante",
    "lieux": ["salon bord de mer", "terrasse avec vue océan", "chambre blanche avec déco marine"],
    "tenues": ["aucun"],
    "expressions": ["aucun"],
    "lumieres": ["soleil méditerranéen", "lumière douce de fin de journée", "ambiance lumineuse marine"],
    "accessoires": ["bois flotté sculptural", "coussins bleus et blancs", "coquillages décoratifs", "tapis en lin naturel"]
  },
  "loft_urbain": {
    "scene": "Loft industriel revisité avec briques et mobilier design",
    "lieux": ["salon avec murs en briques", "atelier reconverti design", "loft new-yorkais spacieux"],
    "tenues": ["aucun"],
    "expressions": ["aucun"],
    "lumieres": ["lumière naturelle par verrière", "spots industriels suspendus", "éclairage urbain nocturne"],
    "accessoires": ["mobilier en métal noir", "table industrielle bois brut", "fauteuil cuir vintage", "plantes modernes en pots design"]
  },
  "vintage_subtil": {
    "scene": "Mobilier et couleurs rétro (50s/70s) revisités avec élégance",
    "lieux": ["salon vintage avec buffet 60s", "salle à manger rétro chic", "chambre aux tons orange et vert pastel"],
    "tenues": ["aucun"],
    "expressions": ["aucun"],
    "lumieres": ["lampes rétro globe", "lumière naturelle filtrée", "spots design vintage"],
    "accessoires": ["buffet scandinave", "lampe boule", "fauteuil rétro", "vinyle posé sur une platine"]
  },
  "fusion_contemporaine": {
    "scene": "Mélange harmonieux entre ancien et moderne, moulures classiques et mobilier design",
    "lieux": ["salon haussmannien avec déco moderne", "chambre classique avec touches contemporaines", "salle à manger avec contraste ancien/ultra-moderne"],
    "tenues": ["aucun"],
    "expressions": ["aucun"],
    "lumieres": ["lustre classique", "spots encastrés modernes", "lumière naturelle par grandes fenêtres"],
    "accessoires": ["table design moderne", "canapé contemporain", "miroir ancien doré", "sculpture abstraite"]
  },
  "nature_lumiere": {
    "scene": "Maison ouverte sur l’extérieur, intégration du bois, pierre et végétal",
    "lieux": ["salon avec baies vitrées donnant sur la forêt", "terrasse bois et pierre", "pièce avec jardin intérieur"],
    "tenues": ["aucun"],
    "expressions": ["aucun"],
    "lumieres": ["lumière naturelle abondante", "reflets doux sur bois et pierre", "ambiance lumineuse zen"],
    "accessoires": ["bois brut sculptural", "plantes vertes imposantes", "table pierre naturelle", "tapis en fibres naturelles"]
  }
};

const DETAILED_CONTEXT_LIBRARY: Record<string, Record<string, string[]>> = {
    'architecture_moderne': {
      "lieux": ["gratte-ciel vitré", "villa design avec grandes baies vitrées", "salon minimaliste blanc", "immeuble géométrique futuriste"],
      "vetements": ["robe rouge satin", "ensemble blanc minimaliste", "manteau noir structuré", "robe argentée brillante"],
      "couleurs_cheveux": ["brun long", "blond court", "cheveux attachés châtains", "brun avec frange"],
      "expressions": ["sourire coquin", "regard intense", "expression mystérieuse", "sourire franc"],
      "lumieres": ["golden hour", "studio softbox", "contre-jour dramatique", "néons discrets"],
      "accessoires": ["lunettes de soleil", "sac minimaliste", "bijoux argentés", "aucun accessoire"]
    }
};

export const PUNK_LIBRARY = {
  "punk_urbain": {
    "lieux": ["rue taguée", "squat underground", "concert de rue", "ruelle sombre"],
    "tenues": ["cuir clouté", "t-shirt déchiré", "pantalon tartan", "chaussures montantes"],
    "expressions": ["regard provocateur", "air rebelle", "cri de scène", "sourire ironique"],
    "lumieres": ["néons colorés", "spot brut", "flash improvisé", "contre-jour dramatique"],
    "accessoires": ["guitare électrique", "crête colorée", "chaînes métalliques", "aucun"]
  },
  "punk_uk_70s": {
    "lieux": ["club londonien", "rue de Camden", "pub underground", "salle de concert enfumée"],
    "tenues": ["cuir noir", "t-shirt à slogan", "pantalon serré", "chaussures Doc Martens"],
    "expressions": ["air défiant", "sourire narquois", "grimace punk", "regard fixe"],
    "lumieres": ["flash brutal", "contre-jour", "spot unique", "éclairage de scène"],
    "accessoires": ["pogo", "épingle à nourrice", "boucles métalliques", "aucun"]
  },
  "punk_80s_glam": {
    "lieux": ["scène colorée", "club flashy", "studio photo", "soirée underground"],
    "tenues": ["paillettes", "maquillage outrancier", "vestes cuir cloutées", "legging métallisé"],
    "expressions": ["air exubérant", "pose théâtrale", "sourire provocateur", "rire franc"],
    "lumieres": ["spots multicolores", "néons saturés", "projecteurs scintillants", "flash disco"],
    "accessoires": ["lunettes oversized", "bracelets multiples", "collier extravagant", "aucun"]
  },
  "concert_punk": {
    "lieux": ["salle de concert bondée", "festival en plein air", "club sombre", "scène improvisée"],
    "tenues": ["t-shirt de groupe", "veste cloutée", "short usé", "bottes montantes"],
    "expressions": ["cri intense", "rage scénique", "air en transe", "rire sauvage"],
    "lumieres": ["stroboscope", "flash de scène", "spots rouges", "fumée éclairée"],
    "accessoires": ["microphone", "basse électrique", "canette écrasée", "aucun"]
  },
  "grunge_90s": {
    "lieux": ["garage", "sous-sol musical", "salle de répète", "rue pluvieuse"],
    "tenues": ["chemise à carreaux", "jean troué", "t-shirt gris", "pull loose"],
    "expressions": ["air détaché", "regard fatigué", "expression mélancolique", "air nostalgique"],
    "lumieres": ["lumière diffuse", "projecteurs froids", "clair-obscur", "lumière naturelle faible"],
    "accessoires": ["guitare usée", "café à emporter", "chaussures usées", "aucun"]
  },
  "punk_avant_garde": {
    "lieux": ["studio artistique", "podium expérimental", "décor abstrait", "galerie alternative"],
    "tenues": ["costumes déstructurés", "matériaux non conventionnels", "robes asymétriques", "tenues futuristes punk"],
    "expressions": ["air théâtral", "pose exagérée", "sourire mystérieux", "regard fixe"],
    "lumieres": ["néons violets", "projecteurs artistiques", "contre-jour futuriste", "lumière colorée"],
    "accessoires": ["accessoires conceptuels", "bijoux démesurés", "lunettes extravagantes", "aucun"]
  }
};

export const GOTHIC_LIBRARY = {
  "medieval_sombre": {
    "lieux": ["château ancien", "corridor de pierre", "salle aux torches", "salle gothique"],
    "tenues": ["robe noire", "cape sombre", "corset", "tenue médiévale sombre"],
    "expressions": ["regard intense", "expression dramatique", "air mélancolique", "sourire discret"],
    "lumieres": ["clair-obscur", "torches", "contre-jour dramatique", "ombres profondes"],
    "accessoires": ["chandelle", "croix", "collier ancien", "aucun"]
  },
  "cimetiere_victorien": {
    "lieux": ["cimetière brumeux", "croix de pierre", "statue gothique", "allée de tombes"],
    "tenues": ["robe longue noire", "voile sombre", "manteau victorien", "corset sombre"],
    "expressions": ["regard sombre", "air mélancolique", "expression dramatique", "regard fixe"],
    "lumieres": ["brouillard éclairé", "clair de lune", "éclairage dramatique", "contre-jour"],
    "accessoires": ["fleurs fanées", "rosaire", "ombrelle noire", "aucun"]
  },
  "eglise_gothique": {
    "lieux": ["nef gothique", "vitraux colorés", "autel", "confessionnal"],
    "tenues": ["robe sombre", "cape longue", "corset victorien", "robe dramatique"],
    "expressions": ["expression dramatique", "regard mystique", "air intense", "sourire discret"],
    "lumieres": ["lumière des vitraux", "contre-jour dramatique", "ombre forte", "éclairage divin sombre"],
    "accessoires": ["chapelet", "collier gothique", "croix ancienne", "aucun"]
  },
  "portrait_victorien": {
    "lieux": ["salon ancien", "bibliothèque victorienne", "manoir sombre", "hall victorien"],
    "tenues": ["robe victorienne", "corset", "costume sombre", "robe dramatique"],
    "expressions": ["air mélancolique", "regard intense", "expression triste", "air mystérieux"],
    "lumieres": ["clair-obscur", "lumière tamisée", "contre-jour", "halo diffus"],
    "accessoires": ["collier ancien", "livre", "ombrelle", "aucun"]
  },
  "gothique_moderne": {
    "lieux": ["rue nocturne", "rooftop urbain", "club underground", "studio sombre"],
    "tenues": ["robe noire urbaine", "cuir", "dentelle moderne", "ensemble gothique chic"],
    "expressions": ["air rebelle", "regard sombre", "pose assurée", "sourire discret"],
    "lumieres": ["néons froids", "contre-jour urbain", "lumière tamisée", "spot dramatique"],
    "accessoires": ["lunettes noires", "bijoux gothiques", "croix moderne", "aucun"]
  }
};

export const VIKING_LIBRARY = {
  "raid_marin": {
    "lieux": ["drakkar en mer déchaînée", "plage rocheuse balayée par le vent", "fjord brumeux", "combat naval chaotique"],
    "tenues": ["armure en cuir", "cotte de mailles", "casque viking", "tunique nordique"],
    "expressions": ["regard guerrier", "cri de bataille", "air intense", "air assuré"],
    "lumieres": ["clair de lune", "brouillard dramatique", "contre-jour épique", "torches"],
    "accessoires": ["hache", "bouclier", "épée", "aucun"]
  },
  "crique_tresor": {
    "lieux": ["grotte runique", "plage isolée", "île mystérieuse", "forêt nordique"],
    "tenues": ["tunique nordique", "cape sombre", "armure simple", "robe nordique"],
    "expressions": ["air intrigué", "regard assuré", "pose dramatique", "expression concentrée"],
    "lumieres": ["torches", "clair de lune", "contre-jour dramatique", "halo diffus"],
    "accessoires": ["coffre d’or", "runes", "bijoux anciens", "aucun"]
  },
  "festin_maison_longue": {
    "lieux": ["maison longue enfumée", "banquet viking", "foyer central", "salle décorée de boucliers"],
    "tenues": ["tunique festive", "cape chaude", "armure légère", "robe nordique"],
    "expressions": ["air jovial", "rire franc", "chant festif", "air solennel"],
    "lumieres": ["torches murales", "feu central", "lueur de braises", "clair-obscur chaleureux"],
    "accessoires": ["corne à boire", "table de banquet", "bijoux en or", "aucun"]
  },
  "explorateur_nordique": {
    "lieux": ["falaise dominant la mer", "fjord glacé", "campement nordique", "forêt boréale"],
    "tenues": ["tunique épaisse", "cape en fourrure", "armure nordique", "tenue de voyage"],
    "expressions": ["regard lointain", "air songeur", "expression courageuse", "air concentré"],
    "lumieres": ["aube polaire", "coucher de soleil nordique", "clair de lune", "ciel couvert"],
    "accessoires": ["carte ancienne", "boussole primitive", "hache d’explorateur", "aucun"]
  },
  "guerrier_mythologique": {
    "lieux": ["champ de bataille épique", "falaise sacrée", "temple nordique", "paysage enneigé"],
    "tenues": ["armure divine", "cape flamboyante", "armure nordique gravée", "tenue héroïque"],
    "expressions": ["cri guerrier", "regard divin", "air furieux", "pose imposante"],
    "lumieres": ["éclairs dramatiques", "halo divin", "contre-jour épique", "torches sacrées"],
    "accessoires": ["marteau mythique", "lance sacrée", "bouclier runique", "aucun"]
  },
  "vie_du_village": {
    "lieux": ["village nordique", "forge animée", "marché viking", "ferme rustique"],
    "tenues": ["tunique simple", "tablier d’artisan", "robe nordique", "cape rustique"],
    "expressions": ["sourire franc", "air concentré", "regard bienveillant", "air déterminé"],
    "lumieres": ["feu de foyer", "lumière douce du matin", "coucher de soleil", "torches simples"],
    "accessoires": ["outils", "paniers de nourriture", "armes simples", "aucun"]
  }
};

export const BOHEME_LIBRARY = {
  "boheme_chic": {
    "lieux": ["plage bohème chic", "festival en plein air", "prairie ensoleillée", "terrasse bohème"],
    "tenues": ["robe longue fluide", "kimono bohème", "ensemble décontracté", "look bohème chic"],
    "expressions": ["air détendu", "sourire lumineux", "expression rêveuse", "clin d’œil"],
    "lumieres": ["golden hour", "lumière naturelle douce", "contre-jour bohème", "halo diffus"],
    "accessoires": ["chapeau large", "collier artisanal", "fleurs", "aucun"]
  },
  "boheme_urbain": {
    "lieux": ["café artistique", "friperie rétro", "rue bohème", "atelier créatif"],
    "tenues": ["robe vintage", "pantalon ample", "chemise colorée", "tenue rétro bohème"],
    "expressions": ["regard mystérieux", "air détendu", "sourire subtil", "air poétique"],
    "lumieres": ["lumière de ville", "contre-jour urbain", "softbox bohème", "éclairage doux"],
    "accessoires": ["carnet de croquis", "lunettes rondes", "bijoux artisanaux", "aucun"]
  },
  "boheme_festival": {
    "lieux": ["concert en plein air", "festival coloré", "prairie avec foule", "campement bohème"],
    "tenues": ["robe fleurie", "short bohème", "haut coloré", "kimono ample"],
    "expressions": ["air joyeux", "sourire éclatant", "danse libre", "air festif"],
    "lumieres": ["golden hour festival", "néons colorés", "feu de camp", "halo lumineux"],
    "accessoires": ["couronne de fleurs", "guitare", "bracelets multiples", "aucun"]
  },
  "boheme_vintage": {
    "lieux": ["salon rétro", "intérieur éclectique", "marché vintage", "chambre bohème"],
    "tenues": ["robe rétro", "chemise ample", "jupe colorée", "look des années 70"],
    "expressions": ["air rêveur", "sourire doux", "regard nostalgique", "air apaisé"],
    "lumieres": ["lumière tamisée", "contre-jour vintage", "halo chaud", "lampe rétro"],
    "accessoires": ["vinyle", "lampe vintage", "bijoux anciens", "aucun"]
  },
  "boheme_nature": {
    "lieux": ["prairie sauvage", "forêt bohème", "bord de rivière", "colline fleurie"],
    "tenues": ["robe fluide", "jupe longue", "haut léger", "kimono nature"],
    "expressions": ["air apaisé", "regard contemplatif", "sourire naturel", "air détendu"],
    "lumieres": ["lumière dorée", "clair de lune doux", "lumière naturelle", "halo diffus"],
    "accessoires": ["fleurs sauvages", "panier", "écharpe légère", "aucun"]
  },
  "boheme_romantique": {
    "lieux": ["jardin bohème", "terrasse fleurie", "intérieur cosy", "prairie au coucher du soleil"],
    "tenues": ["robe romantique", "jupe fluide", "ensemble bohème chic", "robe pastel"],
    "expressions": ["sourire doux", "air rêveur", "expression tendre", "regard amoureux"],
    "lumieres": ["golden hour", "lumière douce", "halo rosé", "lumière tamisée"],
    "accessoires": ["bouquet de fleurs", "collier fin", "bracelet romantique", "aucun"]
  }
};

export const AUTOMOBILE_LIBRARY = {
  "course_circuit": {
    "lieux": ["circuit de F1", "stands avec mécaniciens", "ligne de départ bondée", "virage serré à grande vitesse"],
    "tenues": ["combinaison de pilote", "casque intégral", "tenue racing GT", "combinaison sponsorisée"],
    "expressions": ["air concentré", "regard intense", "expression déterminée", "air victorieux"],
    "lumieres": ["plein soleil", "lumière de projecteurs", "contre-jour dramatique", "halo nocturne"],
    "accessoires": ["voiture de course", "drapeau à damier", "trophée", "aucun"]
  },
  "rallye_sauvage": {
    "lieux": ["piste boueuse", "route de montagne", "chemin forestier", "désert rocailleux"],
    "tenues": ["combinaison rallye", "casque renforcé", "tenue hors piste", "look pilote décontracté"],
    "expressions": ["air concentré", "expression tendue", "air déterminé", "sourire franc"],
    "lumieres": ["soleil éclatant", "poussière dorée", "contre-jour dramatique", "halo du soir"],
    "accessoires": ["voiture de rallye", "poussière", "boue sur carrosserie", "aucun"]
  },
  "classique_vintage": {
    "lieux": ["route rétro des années 60", "station essence vintage", "parking old school", "bord de mer rétro"],
    "tenues": ["robe rétro", "costume élégant", "look casual vintage", "lunettes rétro"],
    "expressions": ["air détendu", "regard nostalgique", "sourire doux", "expression rêveuse"],
    "lumieres": ["golden hour rétro", "halo chaud", "soleil couchant", "clair-obscur doux"],
    "accessoires": ["voiture vintage", "sac en cuir", "lunettes de soleil rétro", "aucun"]
  },
  "luxe_moderne": {
    "lieux": ["rooftop urbain", "devant un hôtel 5 étoiles", "piste privée", "villa contemporaine"],
    "tenues": ["robe de soirée", "costume sur mesure", "ensemble chic", "look glamour"],
    "expressions": ["air confiant", "sourire élégant", "regard assuré", "pose sophistiquée"],
    "lumieres": ["lumière urbaine nocturne", "golden hour", "flashs studio", "éclairage architectural"],
    "accessoires": ["voiture de sport de luxe", "bijoux", "sac de luxe", "aucun"]
  }
};


/**
 * The "AI Art Director". Generates a unique set of creative instructions to ensure image diversity.
 * @param style The main style (e.g., 'Cinema & Costumes').
 * @param subStyle The sub-style (e.g., 'Western').
 * @returns A string containing unique, randomized creative directions.
 */
export const getDynamicEnhancements = (style: string, subStyle: string): string => {
    const enhancements: string[] = [];

    const detailedLibraries: Record<string, any> = {
        'Punk': PUNK_LIBRARY,
        'Gothique': GOTHIC_LIBRARY,
        'Viking': VIKING_LIBRARY,
        'Boheme': BOHEME_LIBRARY,
        'Automobile': AUTOMOBILE_LIBRARY,
        'Couverture Vogue Editoriale': VOGUE_EDITORIALE_LIBRARY,
        'Couverture Vogue': COUVERTURE_VOGUE_LIBRARY,
        'Couverture Elle': COUVERTURE_ELLE_LIBRARY,
        'Couverture Elle Deco': COUVERTURE_ELLE_DECO_LIBRARY,
        'Mode Haute Couture': HAUTE_COUTURE_LIBRARY,
        'Portrait Glamour': PORTRAIT_GLAMOUR_LIBRARY,
        'Journee Dun Mannequin': JOURNEE_MANNEQUIN_LIBRARY,
    };

    const library = detailedLibraries[style];
    const details = library ? library[subStyle] : null;

    if (details) {
        const lieu = selectRandom(details.lieux);
        const tenue = selectRandom(details.tenues);
        const expression = selectRandom(details.expressions);
        const lumiere = selectRandom(details.lumieres);
        const accessoire = selectRandom(details.accessoires);

        let sentence = details.scene ? `${details.scene}. ` : '';

        if (style === 'Couverture Elle Deco') {
             sentence += `Détails additionnels pour cette image unique : lieu de ${lieu}, éclairage ${lumiere}, avec les accessoires suivants : ${accessoire}.`;
        } else {
             sentence += `Détails additionnels pour cette image unique : décor de ${lieu}, tenue ${tenue}, expression ${expression}, éclairage ${lumiere}, accessoirisée avec : ${accessoire}.`;
        }
        
        enhancements.push(sentence);
        enhancements.push(`Angle de caméra : ${selectRandom(CAMERA_ANGLES)}.`);
        enhancements.push(`Atmosphère : ${selectRandom(ATMOSPHERES)}.`);
        enhancements.push(`Composition : Assurez-vous que cette image est unique dans sa composition. Évitez la répétition.`);

        return enhancements.join(' ');
    }


    // Check for highly detailed, structured enhancements for 'modern_architecture'.
    const detailedEnhancements = DETAILED_CONTEXT_LIBRARY[subStyle as keyof typeof DETAILED_CONTEXT_LIBRARY];
    if (detailedEnhancements) {
        const vetement = selectRandom(detailedEnhancements.vetements);
        const lieu = selectRandom(detailedEnhancements.lieux);
        const couleurCheveux = selectRandom(detailedEnhancements.couleurs_cheveux);
        const expression = selectRandom(detailedEnhancements.expressions);
        const lumiere = selectRandom(detailedEnhancements.lumieres);
        const accessoire = selectRandom(detailedEnhancements.accessoires);

        const sentence = `femme avec ${vetement} dans un décor de ${lieu}, cheveux ${couleurCheveux}, expression ${expression}, éclairage ${lumiere}, et accessoirisée avec : ${accessoire}.`;

        enhancements.push(sentence);
        enhancements.push(`Angle de caméra : ${selectRandom(CAMERA_ANGLES)}.`);
        enhancements.push(`Atmosphère : ${selectRandom(ATMOSPHERES)}.`);
        enhancements.push(`Composition : Assurez-vous que cette image est unique dans sa composition par rapport aux autres de ce lot. Évitez la répétition.`);

        return enhancements.join(' ');
    }


    // 1. Select a unique environment if one is defined for the sub-style
    const environmentOptions = CONTEXTUAL_ENVIRONMENTS[subStyle];
    if (environmentOptions) {
        enhancements.push(`Environnement de la Scène : ${selectRandom(environmentOptions)}.`);
    }

    // 2. Select a random camera angle, lighting style, and atmosphere for every prompt
    enhancements.push(`Angle de Caméra : ${selectRandom(CAMERA_ANGLES)}.`);
    enhancements.push(`Éclairage : ${selectRandom(LIGHTING_STYLES)}.`);
    enhancements.push(`Ambiance/Humeur : ${selectRandom(ATMOSPHERES)}.`);
    enhancements.push(`Composition : Assurez-vous que cette image est unique dans sa composition par rapport aux autres de ce lot. Évitez la répétition.`);

    return enhancements.join(' ');
};

export const PHOTO_REALISM_PRESET = `Photographie éditoriale ultra réaliste, 8K UHD, appareil photo moyen format, éclairage de studio professionnel,
texture de peau impeccable, étalonnage des couleurs cinématique, ombres douces avec une lumière de remplissage parfaite, profondeur de champ,
mise au point ultra nette, prise de vue avec un objectif Hasselblad H6D 100c + 85mm, style couverture de magazine glacé,
photographie de luxe haut de gamme, couleurs vibrantes mais naturelles, exposition perfectly équilibrée,
--pas de brouillard, --pas de brume, --pas d'éclairage fantaisiste, --pas de sursaturation`;

export interface PhotoSettings {
  focalLength?: string; // ex: "85mm", "35mm"
  aperture?: string;    // ex: "f/1.8", "f/5.6"
  shutterSpeed?: string; // ex: "1/125s"
  resolution?: string;   // "4K", "6K", "8K"
  colorMode?: "color" | "b&w";
}

export function buildPrompt(userPrompt: string, settings: PhotoSettings): string {
  let extra = "";
  if (settings.focalLength) extra += `, photographié avec un objectif de ${settings.focalLength}`;
  if (settings.aperture) extra += `, ouverture ${settings.aperture}`;
  if (settings.shutterSpeed) extra += `, vitesse d'obturation ${settings.shutterSpeed}`;
  if (settings.resolution && settings.resolution !== 'Standard') extra += `, upscale ${settings.resolution}`;
  if (settings.colorMode === "b&w") extra += ", photographie en noir et blanc";

  return `${userPrompt}\n\n${PHOTO_REALISM_PRESET}${extra}`;
}
