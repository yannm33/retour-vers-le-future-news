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
    ],
    'medieval_sombre': [
      "portrait gothique, robe noire, château ancien en arrière-plan, chandelles, regard intense",
      "femme gothique avec cape, bibliothèque médiévale, livre ancien dans les mains",
      "personnage gothique, vitraux colorés derrière, ambiance dramatique",
      "robe sombre en dentelle, corridor de château, chandeliers au mur"
    ],
    'cimetiere_victorien': [
      "robe gothique, cimetière brumeux, croix de pierre",
      "femme gothique portant un chapeau victorien, rosier fané à la main",
      "portrait gothique près d'une tombe, ambiance crépusculaire"
    ],
    'eglise_gothique': [
      "robe noire longue, nef d’église gothique, lumière traversant les vitraux",
      "portrait gothique avec collier ancien, autel en arrière-plan",
      "personnage gothique assis dans un confessionnal, lumière dramatique"
    ],
    'raid_marin_viking': [
        'menant un abordage sur un navire marchand dans une mer déchaînée, avec des vagues qui s\'écrasent',
        'à la barre d\'un drakkar à tête de dragon, naviguant à travers un fjord brumeux',
        'dans une bataille navale chaotique, avec des haches qui s\'entrechoquent et des flèches qui volent',
        'effectuant un débarquement spectaculaire sur une plage rocheuse balayée par le vent, prêt pour un raid',
        'réparant la voile d\'un drakkar sur une mer calme sous un ciel étoilé'
    ],
    'crique_tresor_viking': [
        'découvrant un coffre au trésor caché débordant d\'or dans une grotte marine éclairée à la torche',
        'examinant une carte au trésor usée par le temps sur la plage d\'une île volcanique',
        'défendant un trésor contre des pirates rivaux dans une crique cachée',
        'faisant la fête autour d\'un feu de joie sur une plage tropicale, entouré de butin',
        'enterrant un coffre au trésor sur une île déserte marquée par une pierre runique'
    ],
    'festin_maison_longue_viking': [
        'présidant un festin bruyant dans une grande maison longue viking enfumée, avec des boucliers sur les murs',
        'levant une corne à boire pour un toast, entouré de compagnons guerriers et de trésors',
        'écoutant un scalde raconter des contes d\'aventure près d\'un foyer central',
        'gravant des runes sur une poutre en bois de la maison longue pour commémorer un voyage réussi',
        'jouant une partie de Hnefatafl (échecs vikings) au milieu de la fête'
    ],
    'explorateur_nordique': [
        'debout seul au bord d\'une falaise, regardant une mer inconnue et inexplorée',
        'cartographiant une côte nouvellement découverte depuis la proue d\'un petit navire d\'exploration',
        'établissant le premier contact avec une tribu indigène sur un rivage luxuriant et étranger',
        'naviguant grâce au soleil et aux étoiles en utilisant d\'anciennes méthodes nordiques',
        'installant un petit campement temporaire dans un paysage sauvage et indompté'
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
      "tenues": ["robe longue satin", "ensemble chic blanc", "robe fendue haute couture", "manteau couture"],
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

/**
 * The "AI Art Director". Generates a unique set of creative instructions to ensure image diversity.
 * @param style The main style (e.g., 'Cinema & Costumes').
 * @param subStyle The sub-style (e.g., 'Western').
 * @returns A string containing unique, randomized creative directions.
 */
export const getDynamicEnhancements = (style: string, subStyle: string): string => {
    const enhancements: string[] = [];

    // Check for "Vogue Editorial Cover" enhancements
    const vogueEnhancements = VOGUE_EDITORIALE_LIBRARY[subStyle as keyof typeof VOGUE_EDITORIALE_LIBRARY];
    if (style === 'Couverture Vogue Editoriale' && vogueEnhancements) {
        const lieu = selectRandom(vogueEnhancements.lieux);
        const tenue = selectRandom(vogueEnhancements.tenues);
        const expression = selectRandom(vogueEnhancements.expressions);
        const lumiere = selectRandom(vogueEnhancements.lumieres);
        const accessoire = selectRandom(vogueEnhancements.accessoires);

        const sentence = `Couverture de magazine Vogue d'une femme portant une ${tenue} dans un décor de ${lieu}, avec une expression ${expression}, un éclairage ${lumiere}, et accessoirisée avec : ${accessoire}.`;
        
        enhancements.push(sentence);
        enhancements.push(`Angle de caméra : ${selectRandom(CAMERA_ANGLES)}.`);
        enhancements.push(`Atmosphère : ${selectRandom(ATMOSPHERES)}.`);
        enhancements.push(`Composition : Assurez-vous que cette image est unique dans sa composition. Évitez la répétition.`);

        return enhancements.join(' ');
    }

    // Check for "High Fashion" enhancements
    const coutureEnhancements = HAUTE_COUTURE_LIBRARY[subStyle as keyof typeof HAUTE_COUTURE_LIBRARY];
    if (style === 'Mode Haute Couture' && coutureEnhancements) {
        const lieu = selectRandom(coutureEnhancements.lieux);
        const tenue = selectRandom(coutureEnhancements.tenues);
        const expression = selectRandom(coutureEnhancements.expressions);
        const lumiere = selectRandom(coutureEnhancements.lumieres);
        const accessoire = selectRandom(coutureEnhancements.accessoires);

        const sentence = `Photo de haute couture d'une femme portant une ${tenue} dans un décor de ${lieu}, avec une expression ${expression}, un éclairage ${lumiere}, et accessoirisée avec : ${accessoire}.`;
        
        enhancements.push(sentence);
        enhancements.push(`Angle de caméra : ${selectRandom(CAMERA_ANGLES)}.`);
        enhancements.push(`Atmosphère : ${selectRandom(ATMOSPHERES)}.`);
        enhancements.push(`Composition : Assurez-vous que cette image est unique dans sa composition. Évitez la répétition.`);

        return enhancements.join(' ');
    }

    // Check for "Glamour Portrait" detailed enhancements.
    const glamourEnhancements = PORTRAIT_GLAMOUR_LIBRARY[subStyle as keyof typeof PORTRAIT_GLAMOUR_LIBRARY];
    if (style === 'Portrait Glamour' && glamourEnhancements) {
        const lieu = selectRandom(glamourEnhancements.lieux);
        const tenue = selectRandom(glamourEnhancements.tenues);
        const expression = selectRandom(glamourEnhancements.expressions);
        const lumiere = selectRandom(glamourEnhancements.lumieres);
        const accessoire = selectRandom(glamourEnhancements.accessoires);

        const sentence = `Portrait glamour d'une femme portant une ${tenue} dans un décor de ${lieu}, avec une expression ${expression}, un éclairage ${lumiere}, et accessoirisée avec : ${accessoire}.`;
        
        enhancements.push(sentence);
        enhancements.push(`Angle de caméra : ${selectRandom(CAMERA_ANGLES)}.`);
        enhancements.push(`Atmosphère : ${selectRandom(ATMOSPHERES)}.`);
        enhancements.push(`Composition : Assurez-vous que cette image est unique dans sa composition. Évitez la répétition.`);

        return enhancements.join(' ');
    }
    
    // Check for "A Model's Day" enhancements
    const mannequinEnhancements = JOURNEE_MANNEQUIN_LIBRARY[subStyle as keyof typeof JOURNEE_MANNEQUIN_LIBRARY];
    if (style === 'Journee Dun Mannequin' && mannequinEnhancements) {
        // Use the new narrative scene description as the base
        const scene = mannequinEnhancements.scene;
        // Then add randomized details for variety
        const lieu = selectRandom(mannequinEnhancements.lieux);
        const tenue = selectRandom(mannequinEnhancements.tenues);
        const expression = selectRandom(mannequinEnhancements.expressions);
        const lumiere = selectRandom(mannequinEnhancements.lumieres);
        const accessoire = selectRandom(mannequinEnhancements.accessoires);

        // Construct a more detailed, narrative sentence
        const sentence = `${scene}. Détails additionnels pour cette image unique : décor de ${lieu}, tenue ${tenue}, expression ${expression}, éclairage ${lumiere}, accessoirisée avec : ${accessoire}.`;
        
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
