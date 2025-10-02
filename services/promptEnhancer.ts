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
    "lieux": [
      "château ancien lugubre",
      "corridor médiéval éclairé à la torche",
      "salle de banquet gothique abandonnée",
      "tour de guet sombre et humide"
    ],
    "tenues": ["robe noire en velours", "cape sombre", "corset victorien", "costume d'époque"],
    "expressions": ["regard intense", "air mystérieux", "expression dramatique", "sourire sombre"],
    "lumieres": ["clair-obscur", "lumière de chandelle", "halo dramatique", "éclairage lunaire"],
    "accessoires": ["croix en argent", "livre ancien", "gants de velours", "aucun"]
  },
  "cimetiere_victorien": {
    "lieux": [
      "cimetière brumeux avec croix en pierre",
      "mausolée victorien",
      "allée funéraire avec statues d'anges",
      "tombes envahies par le lierre"
    ],
    "tenues": ["robe noire victorienne", "cape sombre", "manteau long", "robe gothique dentelle"],
    "expressions": ["regard mélancolique", "air mystérieux", "expression dramatique", "sourire discret"],
    "lumieres": ["brume crépusculaire", "clair de lune", "halo dramatique", "lumière diffuse"],
    "accessoires": ["ombrelle victorienne", "fleurs fanées", "collier ancien", "aucun"]
  },
  "eglise_gothique": {
    "lieux": [
      "nef gothique avec vitraux colorés",
      "autel dramatique éclairé",
      "piliers élancés",
      "confessionnal sombre"
    ],
    "tenues": ["robe noire longue", "robe rouge dramatique", "cape gothique", "costume sombre"],
    "expressions": ["regard intense", "air solennel", "expression dramatique", "regard mystérieux"],
    "lumieres": ["lumière traversant les vitraux", "contre-jour dramatique", "clair-obscur", "halo mystique"],
    "accessoires": ["rosaire", "collier gothique", "gants sombres", "aucun"]
  },
  "portrait_victorien": {
    "lieux": [
      "studio victorien avec rideaux lourds",
      "bibliothèque ancienne",
      "salon victorien décoré",
      "fond neutre sépia"
    ],
    "tenues": ["corset ancien", "robe victorienne sombre", "costume trois pièces", "robe baroque"],
    "expressions": ["sourire discret", "air sévère", "regard perçant", "expression mystérieuse"],
    "lumieres": ["éclairage sépia", "halo victorien", "ombre douce", "clair-obscur dramatique"],
    "accessoires": ["montre de poche", "médaillon ancien", "ombrelle", "aucun"]
  },
  "gothique_moderne": {
    "lieux": [
      "rue urbaine sombre avec néons",
      "club underground",
      "rooftop nocturne",
      "studio minimaliste sombre"
    ],
    "tenues": ["cuir noir", "ensemble cyberpunk", "robe latex sombre", "look punk-goth"],
    "expressions": ["regard rebelle", "air mystérieux", "sourire discret", "expression dramatique"],
    "lumieres": ["néons rouges et bleus", "contre-jour urbain", "projecteur unique", "halo artificiel"],
    "accessoires": ["piercings", "lunettes sombres", "collier métallique", "aucun"]
  },
  "gothique_baroque": {
    "lieux": [
      "salon baroque avec miroirs",
      "salle de bal dorée",
      "théâtre ancien",
      "bibliothèque baroque"
    ],
    "tenues": ["robe baroque noire et or", "costume ancien", "robe dramatique en dentelle", "cape extravagante"],
    "expressions": ["air théâtral", "regard intense", "sourire discret", "expression mystérieuse"],
    "lumieres": ["chandelles multiples", "lumière dorée", "ombres dramatiques", "halo baroque"],
    "accessoires": ["masque vénitien", "bijoux imposants", "éventail ancien", "aucun"]
  },
  "dark_romantique": {
    "lieux": [
      "salle obscure décorée de roses fanées",
      "chambre gothique en velours",
      "terrasse nocturne",
      "bibliothèque sombre"
    ],
    "tenues": ["robe velours rouge", "robe noire romantique", "chemise ouverte sombre", "corset dramatique"],
    "expressions": ["air séducteur", "sourire subtil", "regard mystérieux", "expression passionnée"],
    "lumieres": ["bougies multiples", "clair-obscur romantique", "halo doux", "contre-jour dramatique"],
    "accessoires": ["rose fanée", "collier cœur sombre", "gants élégants", "aucun"]
  },
  "bar_gothique": {
    "lieux": [
      "bar sombre avec vitraux colorés",
      "club gothique avec jukebox ancien",
      "salle décorée de crânes et chandelles",
      "bar underground gothique"
    ],
    "tenues": ["cuir sombre", "robe en dentelle noire", "corset", "look punk-goth"],
    "expressions": ["air mystérieux", "sourire enigmatique", "regard intense", "pose décontractée"],
    "lumieres": ["néons rouges", "lumière tamisée", "éclairage de bar sombre", "reflets sur les verres"],
    "accessoires": ["verre de cocktail sombre", "cendrier vintage", "bougies sur la table", "aucun"]
  }
};

export const VIKING_LIBRARY = {
  "raid_marin": {
    "lieux": [
      "drakkar viking luttant contre des vagues déchaînées au milieu d'une mer d'encre",
      "débarquement spectaculaire sur une plage de sable noir balayée par le vent",
      "combat naval chaotique au milieu d'une tempête, avec des éclairs zébrant le ciel",
      "fjord brumeux et silencieux, avec la proue d'un drakkar à tête de dragon émergeant de la brume"
    ],
    "tenues": ["armure de cuir usée", "cotte de mailles étincelante", "cape en fourrure épaisse", "casque viking gravé"],
    "expressions": ["air déterminé et sauvage", "regard féroce et perçant", "cri de guerre guttural", "air concentré avant la bataille"],
    "lumieres": ["clair-obscur dramatique projeté par les nuages d'orage", "halo lunaire spectral sur l'eau agitée", "lueur vacillante des torches sur le pont", "contre-jour marin avec le soleil perçant la brume"],
    "accessoires": ["hache viking à double tranchant", "bouclier en bois rond orné de motifs", "épée nordique à la garde travaillée", "aucun"]
  },
  "crique_tresor": {
    "lieux": [
      "caverne marine secrète dont les murs scintillent, éclairée par une seule torche",
      "plage de sable blanc isolée avec un coffre au trésor à moitié enfoui",
      "île volcanique désolée avec d'anciennes pierres runiques gravées dans la roche noire",
      "crique cachée accessible uniquement à marée basse, entourée de falaises abruptes"
    ],
    "tenues": ["tunique sombre et pratique", "cape nordique élimée par le voyage", "armure légère en cuir", "tenue discrète pour l'exploration"],
    "expressions": ["air méfiant, scrutant les ombres", "regard mystérieux et calculateur", "sourire triomphant à la vue du butin", "expression sérieuse et concentrée"],
    "lumieres": ["lueur chaude et vacillante des torches", "clair de lune filtrant à travers une ouverture dans la roche", "halo doré émanant du trésor ouvert", "ombres longues et dramatiques"],
    "accessoires": ["carte au trésor en parchemin usé", "cascade de pièces d’or et de bijoux", "artefacts vikings précieux", "aucun"]
  },
  "festin_maison_longue": {
    "lieux": [
      "grande maison longue enfumée et bruyante, avec un foyer central crépitant",
      "salle de banquet festive, les murs ornés de boucliers et de tapisseries",
      "table de banquet massive chargée de nourriture et de cornes à boire, entourée de guerriers rieurs",
      "intérieur sombre où les ombres dansent à la lueur vacillante des torches"
    ],
    "tenues": ["tunique festive brodée", "armure de cérémonie décorée", "cape de chef doublée de fourrure", "vêtements de fête rustiques mais propres"],
    "expressions": ["rire bruyant et franc", "air jovial et fraternel", "regard fier en racontant une histoire", "expression théâtrale en chantant une saga"],
    "lumieres": ["lumière dansante des torches murales", "lueur vive du feu central", "halo chaleureux et convivial", "ombres profondes dans les coins de la salle"],
    "accessoires": ["corne à boire remplie d'hydromel", "hache de cérémonie posée sur la table", "bijoux nordiques opulents", "aucun"]
  },
  "explorateur_nordique": {
    "lieux": [
      "falaise escarpée surplombant une mer inconnue et glacée",
      "carte ancienne déroulée sur la proue d’un drakkar fendant les vagues",
      "campement de fortune dans une forêt boréale silencieuse et enneigée",
      "rivage d’une terre nouvelle et sauvage sous une aurore boréale spectaculaire"
    ],
    "tenues": ["cape en laine épaisse pour se protéger du froid", "armure légère et fonctionnelle", "tunique nordique usée par le voyage", "manteau épais doublé de fourrure"],
    "expressions": ["regard scrutant l’horizon avec espoir", "air concentré en étudiant la carte", "expression rêveuse face à la beauté sauvage", "air inspiré et déterminé"],
    "lumieres": ["lumière verte et mouvante des aurores boréales", "halo doux du soleil de minuit", "ciel nocturne limpide et étoilé", "lumière diffuse et pâle d'un jour polaire"],
    "accessoires": ["boussole solaire primitive en bois", "hache courte d'explorateur", "sac en cuir rempli de provisions", "aucun"]
  },
  "guerrier_mythologique": {
    "lieux": [
      "champ de bataille mythologique jonché de créatures tombées, sous un ciel orageux",
      "arène sacrée entourée de statues de dieux nordiques",
      "forêt enchantée et sombre où se dressent des pierres runiques lumineuses",
      "hall d'Asgard rempli de flammes éternelles et d’éclairs"
    ],
    "tenues": ["armure divine gravée de runes lumineuses", "cape rouge flottant au vent de manière surnaturelle", "casque ailé ou cornu emblématique", "tenue de demi-dieu"],
    "expressions": ["regard transcendant brillant d'une lumière intérieure", "air héroïque et indomptable", "colère divine manifestée par des éclairs dans les yeux", "air mystique et sage"],
    "lumieres": ["éclairs divins zébrant le ciel", "halo doré de puissance", "flammes sacrées illuminant la scène", "clair-obscur mystique et intense"],
    "accessoires": ["marteau runique crépitant d'énergie", "épée légendaire brillante d'une lueur magique", "bouclier orné de symboles divins", "aucun"]
  },
  "vie_de_village": {
    "lieux": [
      "village viking animé et enneigé, avec des cabanes en bois et des toits de chaume",
      "place de marché animée avec des artisans vendant leurs marchandises",
      "ferme rustique avec du bétail et des champs cultivés",
      "forge active où un forgeron martèle une épée rougeoyante"
    ],
    "tenues": ["vêtements rustiques en laine et en lin", "tablier de forgeron en cuir", "tunique simple de paysan", "cape nordique pratique"],
    "expressions": ["sourire simple et authentique", "air de labeur et de concentration", "regard paisible et bienveillant", "air familial et communautaire"],
    "lumieres": ["lumière naturelle et douce d'un jour d'hiver", "lueur chaude et intense du feu de forge", "halo doux du soleil matinal", "lueur tremblotante des torches rustiques le soir"],
    "accessoires": ["outils de forgeron", "bétail comme des chèvres ou des moutons", "paniers remplis de provisions", "aucun"]
  },
  "navigation_drakkar": {
    "lieux": [
      "drakkar majestueux fendant les vagues d'une mer agitée",
      "fjord brumeux et étroit, traversé par une flotte de navires vikings",
      "rivage sablonneux se préparant à un débarquement imminent",
      "océan infini sous un ciel orageux et menaçant"
    ],
    "tenues": ["cape en fourrure pour se protéger des embruns", "armure légère pour la manœuvre", "tenue de marin viking usée par le sel", "casque nordique pour la bataille"],
    "expressions": ["cri de guerre unissant l'équipage", "air concentré sur la navigation", "regard inspiré vers la destination", "air combatif et prêt à l'action"],
    "lumieres": ["coucher de soleil flamboyant sur la mer", "clair de lune dramatique se reflétant sur les vagues", "ciel sombre d'un orage imminent", "halo marin diffus et brumeux"],
    "accessoires": ["rames sculptées plongeant en rythme dans l'eau", "boucliers en bois colorés alignés le long de la coque", "cordages usés et tendus par le vent", "aucun"]
  }
};

export const BOHEME_LIBRARY = {
  "boheme_chic": {
    "lieux": [
      "terrasse ensoleillée d’un hôtel design",
      "salon cosy avec tapis persans",
      "plage privée au coucher du soleil",
      "villa méditerranéenne avec bougainvilliers"
    ],
    "tenues": ["robe fluide blanche", "jupe longue imprimée", "kimono élégant", "ensemble bohème pastel"],
    "expressions": ["sourire doux", "regard mystérieux", "air détendu", "pose élégante"],
    "lumieres": ["golden hour", "lumière tamisée de bougie", "contre-jour doré", "lumière naturelle douce"],
    "accessoires": ["chapeau de paille chic", "bijoux fins", "sac en cuir naturel", "aucun"]
  },
  "festival_boheme": {
    "lieux": [
      "festival en plein air avec foule et tentes colorées",
      "scène musicale avec guitares et danseurs",
      "prairie fleurie au soleil",
      "campement bohème avec tapis et lanternes"
    ],
    "tenues": ["short en jean et top crochet", "robe fleurie", "kimono coloré", "franges style western"],
    "expressions": ["rire franc", "air festif", "clin d’œil", "sourire lumineux"],
    "lumieres": ["soleil intense", "coucher de soleil festivalier", "feu de camp", "guirlandes lumineuses"],
    "accessoires": ["couronne de fleurs", "bracelets multiples", "sac frangé", "aucun"]
  },
  "boheme_urbain": {
    "lieux": [
      "café arty en centre-ville",
      "rooftop avec graffitis en arrière-plan",
      "atelier de créateur bohème",
      "rue pavée animée avec galeries d’art"
    ],
    "tenues": ["pantalon ample en lin", "veste vintage", "robe bohème colorée", "ensemble bohème moderne"],
    "expressions": ["regard assuré", "pose décontractée", "air pensif", "sourire subtil"],
    "lumieres": ["éclairage urbain de nuit", "contre-jour en ville", "golden hour urbaine", "lumière douce"],
    "accessoires": ["sac bandoulière cuir", "collier artisanal", "lunettes rondes", "aucun"]
  },
  "boheme_vintage": {
    "lieux": [
      "salon rétro avec tapisseries colorées",
      "chambre décorée façon années 70",
      "marché aux puces vintage",
      "studio photo rétro avec fauteuils en velours"
    ],
    "tenues": ["robe imprimée psychédélique", "pantalon patte d’eph", "chemise colorée", "jupe à motifs géométriques"],
    "expressions": ["regard nostalgique", "air mystérieux", "sourire doux", "pose exagérée rétro"],
    "lumieres": ["éclairage jaune vintage", "spot coloré", "ombre dramatique", "halo tamisé rétro"],
    "accessoires": ["vinyle rétro", "collier peace & love", "sac vintage", "aucun"]
  },
  "boheme_nature": {
    "lieux": [
      "clairière ensoleillée",
      "dunes de sable au coucher de soleil",
      "forêt enchantée avec feu de camp",
      "bord de rivière avec lanternes suspendues"
    ],
    "tenues": ["robe longue en coton", "jupe fluide fleurie", "tunique en lin", "cape naturelle"],
    "expressions": ["air rêveur", "regard vers l’horizon", "sourire détendu", "pose méditative"],
    "lumieres": ["golden hour", "flammes du feu de camp", "clair de lune argenté", "halo naturel doux"],
    "accessoires": ["guitare acoustique", "attrape-rêves", "bracelet artisanal", "aucun"]
  },
  "boheme_luxe": {
    "lieux": [
      "suite d’hôtel design",
      "terrasse privée avec vue sur mer",
      "intérieur minimaliste avec touches bohèmes",
      "salle de gala décorée de tapis orientaux"
    ],
    "tenues": ["robe couture fluide", "ensemble chic inspiré boho", "kimono de luxe", "robe longue satinée"],
    "expressions": ["regard intense", "air sophistiqué", "sourire subtil", "pose glamour"],
    "lumieres": ["spot doux", "éclairage doré", "halo feutré", "projecteurs tamisés"],
    "accessoires": ["bijoux en or", "sac de luxe", "boucles élégantes", "aucun"]
  },
  "boheme_baba_cool": {
    "lieux": [
      "campement improvisé en forêt",
      "prairie avec tapis posés à même le sol",
      "rue animée avec peintures murales",
      "bord de mer sauvage avec feu improvisé"
    ],
    "tenues": ["pantalon ample froissé", "top tie-dye", "jupe patchwork", "chemise ouverte colorée"],
    "expressions": ["rire désinvolte", "air nonchalant", "sourire naturel", "expression rêveuse"],
    "lumieres": ["soleil cru", "lumière de fin d’après-midi", "halo de feu improvisé", "clair de lune brut"],
    "accessoires": ["tresses dans les cheveux", "colliers multiples", "sac tissé", "aucun"]
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

export const MOTO_LIBRARY = {
  "course_circuit": {
    "lieux": ["circuit MotoGP", "paddock avec équipe technique", "grille de départ animée", "virage en épingle à grande vitesse"],
    "tenues": ["combinaison de pilote en cuir", "casque intégral de course", "tenue de pilote sponsorisée", "équipement de protection complet"],
    "expressions": ["concentration extrême", "regard de prédateur", "détermination", "joie de la victoire"],
    "lumieres": ["soleil de plomb sur l'asphalte", "lumières de projecteurs de nuit", "contre-jour sur la piste", "flou de vitesse"],
    "accessoires": ["moto de course supersport", "drapeau à damier", "genou au sol dans un virage", "aucun"]
  },
  "road_trip_sauvage": {
    "lieux": ["route de montagne sinueuse", "désert américain", "côte escarpée", "forêt dense"],
    "tenues": ["veste en cuir de motard", "jean usé", "casque ouvert vintage", "bottes de moto"],
    "expressions": ["sentiment de liberté", "sourire détendu", "regard vers l'horizon", "air aventureux"],
    "lumieres": ["coucher de soleil (golden hour)", "lumière crue du désert", "brume matinale", "reflets sur le chrome"],
    "accessoires": ["moto custom (chopper/bobber)", "bagages de voyage", "paysage épique en arrière-plan", "aucun"]
  },
  "classique_vintage": {
    "lieux": ["café rétro des années 50", "garage vintage", "route de campagne idyllique", "centre-ville historique"],
    "tenues": ["blouson en cuir classique", "look rockabilly", "tenue de gentleman rider", "lunettes d'aviateur"],
    "expressions": ["air nostalgique", "sourire cool", "pose décontractée", "regard confiant"],
    "lumieres": ["tons sépia", "lumière chaude de fin de journée", "reflets sur la peinture", "éclairage de rue vintage"],
    "accessoires": ["moto classique (Triumph/Norton)", "casque bol", "gants en cuir", "aucun"]
  },
  "urbain_moderne": {
    "lieux": ["rue de métropole la nuit", "pont illuminé", "parking souterrain", "devant un bâtiment futuriste"],
    "tenues": ["équipement de moto moderne et stylé", "casque design", "tenue de motard urbain", "look high-tech"],
    "expressions": ["air déterminé", "regard concentré", "pose agressive", "prêt pour l'action"],
    "lumieres": ["néons de la ville", "reflets sur le bitume mouillé", "éclairage architectural", "contre-jour des phares"],
    "accessoires": ["moto sportive moderne (roadster/naked)", "lumières de la ville en bokeh", "traces de lumière", "aucun"]
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
        'Moto': MOTO_LIBRARY,
        'Couverture Vogue Editoriale': VOGUE_EDITORIALE_LIBRARY,
        'Couverture Vogue': COUVERTURE_VOGUE_LIBRARY,
        'Couverture Elle': COUVERTURE_ELLE_LIBRARY,
        'Couverture Elle Deco': COUVERTURE_ELLE_DECO_LIBRARY,
        'Mode Haute Couture': HAUTE_COUTURE_LIBRARY,
        'Portrait Glamour': PORTRAIT_GLAMOUR_LIBRARY,
        'Journée d\'un mannequin': JOURNEE_MANNEQUIN_LIBRARY,
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