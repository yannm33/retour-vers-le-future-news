/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { PHOTOGRAPHER_LIBRARY } from './photographerLibrary';

export interface PhotoSettings {
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    resolution?: string;
    colorMode?: 'color' | 'b&w';
}

export function buildPrompt(userPrompt: string, settings: PhotoSettings): string {
    const parts: string[] = [userPrompt];
    
    const techSpecs: string[] = [];
    if (settings.focalLength) techSpecs.push(`Focale : ${settings.focalLength}.`);
    if (settings.aperture) techSpecs.push(`Ouverture : ${settings.aperture}.`);
    if (settings.shutterSpeed) techSpecs.push(`Vitesse d'obturation : ${settings.shutterSpeed}.`);
    if (settings.resolution) techSpecs.push(`Résolution cible : ${settings.resolution}.`);
    if (settings.colorMode === 'b&w') techSpecs.push('Mode : Noir et Blanc (monochrome).');
    
    if (techSpecs.length > 0) {
        parts.push('\n//-- SPÉCIFICATIONS TECHNIQUES --');
        parts.push(...techSpecs);
    }

    return parts.join('\n');
}

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
    'pirates_corsaires': [
        'Sur le pont en bois usé et trempé d\'un galion pirate pendant une tempête. Éclairage cinématique dramatique, vagues déchaînées, embruns. Rendu photoréaliste, style film d\'aventure historique. Éviter toute lumière néon ou futuriste.',
        'Dans une crique secrète éclairée uniquement par des torches vacillantes. Partageant un trésor, l\'or scintillant. Clair-obscur prononcé, ambiance digne d\'un tableau de Caravage, réalisme absolu.',
        'Dans une taverne de pirates enfumée et bruyante à Tortuga. Lumière chaude des bougies et des lanternes à huile. Rendu granuleux, comme une photo prise sur pellicule, avec beaucoup de texture sur le bois et les vêtements en cuir.',
        'À la barre du navire, naviguant de nuit d\'après un ciel étoilé et un astrolabe. Éclairage naturel de la lune, reflets doux sur l\'eau calme. Ambiance sereine mais tendue. Hyper-réalisme.',
        'En plein combat à l\'épée dans le gréement, au-dessus du pont. Caméra dynamique, léger flou de mouvement, capture d\'action de type film. Le réalisme de l\'équipement et des vêtements est primordial.',
        'Examinant une vieille carte au trésor dans la cabine du capitaine. Une seule lanterne à huile illumine la scène, créant de longues ombres. Focus sur les détails de la carte, du bois de la table, du cuir des vêtements.',
        'Menant un abordage, se balançant d’un navire à l’autre. Scène d\'action chaotique, photoréaliste, avec des éclats de bois volant. Le style doit être brut et réaliste, pas fantaisiste.'
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

const COSTUME_DE_FILM_LIBRARY = {
    "renaissance_italienne": {
        "lieux": [
            "dans un somptueux palais florentin orné de fresques. Le décor doit être historiquement exact, sans aucun élément moderne (pas de voitures, d'antennes de télévision, de lignes électriques)",
            "sur un balcon en pierre surplombant un paysage toscan vallonné et authentique. Le décor doit être historiquement exact, sans aucun élément moderne",
            "dans l'atelier d'un artiste de la Renaissance, avec des toiles, des pigments et des sculptures. Le décor doit être historiquement exact, sans aucun élément moderne",
            "dans la cour intérieure d'un palazzo avec une fontaine en marbre. Le décor doit être historiquement exact, sans aucun élément moderne",
            "sur un pont vénitien en pierre, au-dessus d'un canal avec des gondoles. Le décor doit être historiquement exact, sans aucun élément moderne"
        ],
        "tenues": [
            "une robe en velours rouge et or avec des broderies complexes",
            "une robe de noble en brocart avec des manches bouffantes et fendues",
            "une tenue d'artiste avec une simple tunique en lin sur une chemise",
            "un costume de courtisan avec des collants et un pourpoint élégant"
        ],
        "expressions": [
            "un regard serein et digne, comme dans un portrait de Raphaël",
            "un air contemplatif et artistique",
            "un sourire subtil et énigmatique (style Mona Lisa)",
            "une expression de noblesse et de grâce"
        ],
        "lumieres": [
            "une lumière naturelle douce provenant d'une grande fenêtre latérale (style clair-obscur)",
            "la lumière chaude et dorée d'une fin d'après-midi en Toscane",
            "un éclairage pictural qui imite les maîtres de la Renaissance comme le Caravage",
            "la lueur vacillante de plusieurs bougies dans un intérieur sombre"
        ],
        "accessoires": [
            "un collier de perles élaboré ou un pendentif orné",
            "une coiffe délicate en perles ou un simple diadème",
            "un livre relié en cuir à la main",
            "un éventail orné de peintures"
        ],
        "poses": [
            "Posant de trois-quarts, le corps légèrement tourné, le visage vers la caméra, dans le style des portraits de la Renaissance.",
            "Regardant par une fenêtre cintrée, le profil illuminé par la lumière naturelle.",
            "Assise dans un fauteuil 'sgabello', lisant un livre ou une lettre.",
            "Se tenant sur un balcon en pierre, une main sur la balustrade, contemplant le paysage."
        ]
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
      "accessoires": ["pochette haute couture", "chapeau extravagant", "bijoux luxueux", "aucun"],
      "poses": ["En pleine marche puissante sur le podium, la robe flottant derrière elle.", "Un tour spectaculaire au bout du podium, capturant le mouvement du vêtement.", "Une pose statique et sculpturale, mettant en valeur l'architecture de la tenue.", "Un regard intense vers les photographes depuis le podium."]
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
      "accessoires": ["boucles d’oreilles voyantes", "bracelet haute couture", "aucun", "lunettes mode"],
       "poses": ["Assise sur une chaise design, une jambe croisée sur l'autre, posture impeccable.", "Debout, de profil, le corps dessinant une courbe élégante.", "En mouvement, sautant légèrement, capturant un moment de légèreté.", "Allongée au sol dans une composition artistique."]
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
      "accessoires": ["bijoux diamants", "pochette soirée", "écharpe élégante", "aucun"],
      "poses": ["Descendant un grand escalier, une main sur la rampe.", "Regardant au loin depuis un balcon, le vent faisant bouger sa robe.", "Marchant dans une rue bondée, créant un contraste entre la haute couture et le quotidien.", "Posant à côté d'une statue ou d'une fontaine, intégrant l'environnement."]
    }
};

const PORTRAIT_GLAMOUR_LIBRARY = {
    'studio_classique': {
      "lieux": ["fond uni noir", "fond blanc", "studio pastel", "fond doré texturé"],
      "tenues": ["robe satin rouge", "smoking élégant", "robe noire moulante", "tailleur chic"],
      "expressions": ["sourire subtil", "regard perçant", "sourire coquin", "air mystérieux"],
      "lumieres": ["softbox homogène", "éclairage 3 points", "projecteur unique", "halo diffus"],
      "accessoires": ["boucles sobres", "bracelet argenté", "aucun", "lunettes de studio"],
      "poses": ["Assise sur un tabouret, le corps de trois-quarts, regardant par-dessus son épaule vers l'objectif.", "Debout, une main sur la hanche, le corps légèrement arqué, tête inclinée.", "Appuyée contre un mur, bras croisés, regard confiant.", "En mouvement, comme si elle marchait vers la caméra, un pied devant l'autre.", "Profil perdu, regardant hors-champ vers une source de lumière."]
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
      "accessoires": ["pochette soirée", "collier scintillant", "boucles pendantes", "aucun"],
       "poses": ["Montant les marches emblématiques, jetant un regard par-dessus l'épaule.", "Saluant la foule avec un geste élégant de la main.", "Posant pour les photographes, les mains sur les hanches.", "Riant spontanément avec une autre célébrité (invisible)."]
    },
    'cinematique_noir': {
      "lieux": ["bar feutré années 50", "ruelle dramatique", "studio ombragé", "salon rétro"],
      "tenues": ["robe noire dramatique", "robe rouge satin", "costume sombre", "robe violette sombre"],
      "expressions": ["regard intense", "sourire discret", "expression dramatique", "air mystérieux"],
      "lumieres": ["contre-jour", "ombres diagonales", "projecteur unique", "lumière dramatique"],
      "accessoires": ["cigarette vintage", "gants satin", "chapeau rétro", "aucun"],
       "poses": ["Se cachant dans l'ombre, seule une partie de son visage est illuminée.", "Appuyée contre un mur humide, regardant une ruelle sombre.", "Tenant un verre au bar, le regard fixé sur un point hors champ.", "Assise dans un fauteuil en cuir, les jambes croisées, enveloppée de fumée."]
    },
    'luxe_exterieur': {
      "lieux": ["terrasse villa", "yacht", "rooftop urbain", "jardin privé"],
      "tenues": ["robe champagne", "robe bleue électrique", "smoking chic", "robe noire fendue"],
      "expressions": ["sourire franc", "regard au loin", "sourire glamour", "expression sérieuse"],
      "lumieres": ["golden hour", "lumière soirée", "contre-jour urbain", "flashs extérieurs"],
      "accessoires": ["bijoux diamants", "sac de luxe", "lunettes soleil", "aucun"],
      "poses": ["S'appuyant à la balustrade d'un yacht, regardant l'horizon.", "Marchant au bord d'une piscine à débordement.", "Assise sur un canapé extérieur luxueux, un verre à la main.", "Regardant la ville depuis un rooftop, le vent dans les cheveux."]
    },
    'hotel_glamour': {
      "lieux": ["hall luxueux", "chambre design", "bar cosy", "lounge feutré"],
      "tenues": ["robe satinée", "peignoir chic", "smoking noir", "robe dorée glamour"],
      "expressions": ["air détendu", "sourire charmeur", "regard mystérieux", "pose sensuelle"],
      "lumieres": ["lumière chaude tamisée", "lampes design", "ambiance feutrée", "golden hour baies vitrées"],
      "accessoires": ["verre de champagne", "collier perles", "boucles dorées", "aucun"],
      "poses": ["Allongée sur un lit d'hôtel luxueux, lisant un livre.", "Assise au bar, commandant un cocktail.", "Regardant par la fenêtre d'une suite avec vue sur la ville.", "Descendant un grand escalier dans le hall de l'hôtel."]
    },
    'soiree_glamour': {
      "lieux": ["club privé", "salle de bal", "fête luxueuse", "discothèque chic"],
      "tenues": ["robe à paillettes", "smoking blanc", "robe rouge fendue", "robe noire élégante"],
      "expressions": ["sourire exubérant", "clin d’œil", "rire franc", "pose élégante"],
      "lumieres": ["spot coloré", "lumière de soirée", "ambiance tamisée", "flashs improvisés"],
      "accessoires": ["coupe de champagne", "sac clutch", "bijoux discrets", "aucun"],
       "poses": ["Dansant au milieu d'une piste de danse bondée.", "Discutant et riant avec des amis (invisibles) dans un coin salon.", "Tenant une coupe de champagne, portant un toast.", "Faisant une entrée remarquée dans la salle de bal."]
    },
    'plage_glamour': {
      "lieux": ["plage privée avec vacanciers", "transat design au bord de mer", "coucher de soleil avec silhouettes au loin", "cabane chic sur sable fin"],
      "tenues": ["robe légère blanche", "bikini chic", "robe rouge fluide", "chemise élégante"],
      "expressions": ["sourire lumineux", "regard intense", "air séducteur", "rire subtil"],
      "lumieres": ["golden hour plage", "lumière douce matin", "contre-jour océan", "reflet sur l’eau"],
      "accessoires": ["lunettes soleil", "collier coquillage chic", "chapeau large", "aucun"],
      "poses": ["Marchant le long du rivage, laissant l'eau effleurer ses pieds.", "Allongée sur un transat, lisant un magazine de mode.", "Jouant avec un chapeau de paille, le tenant pour ne pas qu'il s'envole.", "Regardant le coucher de soleil, de dos ou de profil."]
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
    ],
    "poses": ["S'étirant paresseusement dans le lit.", "Assise sur le bord du lit, buvant son café.", "Regardant par la fenêtre, baignée de lumière matinale."]
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
    ],
    "poses": ["Se maquillant devant un miroir, très concentrée.", "S'enroulant les cheveux dans une serviette.", "Se brossant les dents avec une grimace amusante."]
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
    ],
    "poses": ["Se faisant maquiller, les yeux fermés.", "Attendant son tour, assise sur une caisse, consultant son téléphone.", "Enfilant une tenue complexe avec l'aide d'un styliste."]
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
    ],
    "poses": ["Marchant avec une démarche puissante et assurée sur le podium.", "Effectuant un tour spectaculaire au bout de la passerelle.", "Posant de manière statique et forte pour les photographes."]
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
    ],
    "poses": ["Enroulée dans un plaid sur le canapé, un livre à la main.", "Caressant son chat, assise près de la cheminée.", "Regardant un film sur son ordinateur portable, une tasse de thé à proximité."]
  }
};

const COUVERTURE_VOGUE_LIBRARY = {
  "noir_blanc_iconique": {
    "scene": "Portrait intemporel en noir et blanc, poses marquées, inspiration Avedon",
    "lieux": ["studio photo neutre", "fond blanc éclatant", "fond gris uni"],
    "tenues": ["robe noire minimaliste", "smoking femme", "tailleur blanc élégant"],
    "expressions": ["regard intense", "pose sérieuse", "air mystérieux"],
    "lumieres": ["éclairage contrasté", "lumière dure latérale", "projecteur unique"],
    "accessoires": ["aucun", "chapeau noir", "boucles sobres", "cigarette vintage"],
    "poses": ["Visage en gros plan, une main effleurant la joue.", "Profil dramatique, le regard perdu hors champ.", "Assise sur une simple caisse en bois, le corps formant une composition graphique.", "Debout, le corps de face mais le visage tourné de profil."]
  },
  "glamour_dore": {
    "scene": "Couverture éclatante avec robes scintillantes et lumière chaude",
    "lieux": ["studio luxueux doré", "salle de gala", "podium illuminé"],
    "tenues": ["robe dorée couture", "robe argentée scintillante", "smoking blanc chic"],
    "expressions": ["sourire glamour", "regard assuré", "clin d’œil séducteur"],
    "lumieres": ["spotlights chauds", "éclairage doré diffus", "halo lumineux"],
    "accessoires": ["pochette brillante", "bijoux diamants", "bracelet doré", "aucun"],
    "poses": ["Adossée à un pilier doré, regardant l'objectif avec assurance.", "En train de rire, la tête légèrement renversée en arrière.", "Descendant un escalier de marbre, la robe scintillant à chaque pas.", "Assise sur un canapé en velours, une coupe de champagne à la main."]
  },
  "vogue_de_rue": {
    "scene": "Shooting urbain haute couture en extérieur, style brut",
    "lieux": ["rue new-yorkais", "métro bondé", "rooftop moderne", "façade design"],
    "tenues": ["robe noire couture", "ensemble street-chic", "look asymétrique coloré"],
    "expressions": ["regard confiant", "pose élégante", "sourire subtil"],
    "lumieres": ["golden hour urbaine", "flashs improvisés", "lumière néon de rue"],
    "accessoires": ["sac couture", "lunettes de soleil", "chapeau mode", "aucun"],
    "poses": ["Traversant une rue animée, sans regarder l'objectif, capturée en plein mouvement.", "Appuyée contre un mur de graffitis, créant un contraste saisissant.", "Sortant d'un taxi jaune, un pied sur le trottoir.", "Assise sur les marches d'un bâtiment emblématique, observant les passants."]
  },
  "revival_retro": {
    "scene": "Look rétro inspiré des années 60-70 avec couleurs pop et cadrages vintage",
    "lieux": ["studio coloré", "salle rétro avec mobilier 70s", "mur texturé pastel"],
    "tenues": ["robe trapèze années 60", "ensemble psychédélique", "robe pop colorée"],
    "expressions": ["sourire exubérant", "clin d’œil complice", "pose dramatique rétro"],
    "lumieres": ["néons colorés", "éclairage diffus rétro", "projecteur vintage"],
    "accessoires": ["boucles rondes oversized", "lunettes rétro", "sac pop coloré", "aucun"],
     "poses": ["Dansant de manière exubérante, les cheveux en mouvement.", "Posant de manière graphique et angulaire, typique des années 60.", "Allongée sur un tapis à motifs psychédéliques.", "Parlant dans un téléphone vintage à cadran."]
  },
  "studio_luxe_minimaliste": {
    "scene": "Fond neutre et luxe sobre, silhouette mise en valeur",
    "lieux": ["fond uni blanc", "fond beige minimaliste", "studio pastel épuré"],
    "tenues": ["robe couture minimaliste", "tailleur élégant", "ensemble noir chic"],
    "expressions": ["regard sérieux", "pose statique élégante", "air mystérieux"],
    "lumieres": ["softbox homogène", "éclairage 3 points neutre", "spot frontal"],
    "accessoires": ["aucun", "collier discret", "bracelet fin", "boucles sobres"],
    "poses": ["Debout, parfaitement droite, le corps formant une ligne pure.", "Assise sur un cube blanc, créant une composition géométrique.", "Le visage encadré par ses mains, en gros plan.", "De dos, tournant la tête pour regarder l'objectif."]
  },
  "avant_garde_conceptuel": {
    "scene": "Expérimentation artistique et futuriste avec décors abstraits",
    "lieux": ["installation artistique", "studio géométrique", "fond abstrait coloré"],
    "tenues": ["robe futuriste", "ensemble conceptuel asymétrique", "look expérimental"],
    "expressions": ["pose conceptuelle", "regard intense", "expression exagérée"],
    "lumieres": ["néons colorés", "contre-jour dramatique", "éclairage artistique"],
    "accessoires": ["bijoux conceptuels", "lunettes oversized", "aucun", "collier imposant"],
    "poses": ["Interagissant avec une installation lumineuse, créant des ombres étranges.", "Corps contorsionné dans une pose non naturelle et sculpturale.", "Le visage peint ou partiellement couvert, remettant en question l'identité.", "Flottant ou suspendue, défiant la gravité."]
  },
  "podium_couture": {
    "scene": "Scène captée en direct du défilé comme une couverture instantanée",
    "lieux": ["podium fashion week", "salle bondée avec public", "passerelle illuminée"],
    "tenues": ["robe haute couture spectaculaire", "ensemble couture futuriste", "robe asymétrique couture"],
    "expressions": ["regard assuré", "pose confiante", "expression glamour"],
    "lumieres": ["spotlights puissants", "flashs photographes", "contre-jour podium"],
    "accessoires": ["aucun", "bijoux couture", "clutch élégante"],
     "poses": ["Capturée en pleine démarche, un pied devant l'autre, le mouvement figé.", "Au bout du podium, marquant une pause puissante, le regard fixé.", "Un gros plan sur le visage en plein défilé, le décor devenant flou.", "De dos, révélant un détail spectaculaire de la robe alors qu'elle s'éloigne."]
  }
};

const COUVERTURE_ELLE_LIBRARY = {
  "plage_ete": {
    "scene": "Shooting mode sur une plage ensoleillée avec sable, mer et accessoires colorés",
    "lieux": ["plage de sable fin", "bord de mer avec parasols", "transats design au soleil"],
    "tenues": ["maillot une pièce élégant", "robe fluide légère", "paréo chic", "bikini couture"],
    "expressions": ["sourire lumineux", "regard séducteur", "air détendu"],
    "lumieres": ["golden hour plage", "soleil éclatant", "lumière douce matin"],
    "accessoires": ["lunettes de soleil", "chapeau large", "sac de plage couture", "serviette colorée"],
    "poses": ["Courant le long de la plage, riant aux éclats.", "S'appliquant de la crème solaire de manière joueuse.", "Construisant un château de sable, avec un sourire complice.", "Sautant par-dessus une vague, capturée en plein air."]
  },
  "chic_decontracte": {
    "scene": "Look urbain décontracté mais sophistiqué, ambiance street-style parisien",
    "lieux": ["terrasse de café parisien", "rue chic", "rooftop urbain"],
    "tenues": ["jean taille haute avec blazer", "robe simple stylisée", "ensemble casual couture"],
    "expressions": ["sourire naturel", "regard assuré", "clin d’œil complice"],
    "lumieres": ["lumière naturelle urbaine", "golden hour en ville", "éclairage doux extérieur"],
    "accessoires": ["sac à main chic", "lunettes rondes", "boucles sobres", "aucun"],
     "poses": ["Buvant un café en terrasse, lisant un journal.", "Faisant du lèche-vitrine, regardant une boutique avec envie.", "Marchant en ville, un sac de shopping à la main.", "Consultant une carte, l'air d'une touriste chic."]
  },
  "pastel_romantique": {
    "scene": "Couleurs douces, robes fluides, ambiance rêveuse et poétique",
    "lieux": ["jardin fleuri", "studio pastel", "terrasse ensoleillée avec fleurs"],
    "tenues": ["robe longue pastel", "jupe fluide romantique", "ensemble léger rose pâle"],
    "expressions": ["sourire subtil", "regard rêveur", "air mystérieux"],
    "lumieres": ["softbox diffuse", "golden hour douce", "éclairage naturel tamisé"],
    "accessoires": ["fleurs à la main", "couronne florale", "sac pastel", "aucun"],
    "poses": ["Sentant le parfum d'une fleur, les yeux fermés.", "Faisant une sieste dans un champ de lavande.", "Lisant un livre de poésie, assise sur un banc de jardin.", "Se balançant doucement sur une balançoire fleurie."]
  },
  "look_fete": {
    "scene": "Ambiance festive, soirée glamour avec paillettes et danse",
    "lieux": ["discothèque chic", "soirée cocktail", "salle de fête élégante"],
    "tenues": ["robe à paillettes", "smoking féminin", "robe rouge glamour"],
    "expressions": ["rire franc", "clin d’œil", "sourire exubérant"],
    "lumieres": ["spots colorés", "lumière tamisée soirée", "flash improvisé"],
    "accessoires": ["coupe de champagne", "sac clutch", "boucles voyantes", "aucun"],
    "poses": ["Dansant sous une boule à facettes, les bras levés.", "Trinquant avec des amis (invisibles).", "Chantant à tue-tête, un verre à la main.", "Se faufilant à travers la foule, un sourire aux lèvres."]
  },
  "mode_lifestyle_urbain": {
    "scene": "Photos de mode ancrées dans la vie réelle, cafés et terrasses citadines",
    "lieux": ["terrasse de café parisien", "bar cosy urbain", "rue commerçante chic"],
    "tenues": ["robe élégante quotidienne", "ensemble city-chic", "look fashion street"],
    "expressions": ["sourire léger", "pose élégante", "air détendu"],
    "lumieres": ["éclairage naturel extérieur", "soleil de fin d’après-midi", "lampadaires urbains doux"],
    "accessoires": ["sac couture", "journal", "lunettes soleil", "tasse de café"],
    "poses": ["Sortant d'une librairie, un livre à la main.", "Achevant son jogging matinal dans un parc.", "Faisant ses courses au marché avec un panier en osier.", "Attendant un ami au coin d'une rue, consultant sa montre."]
  },
  "cocooning_interieur": {
    "scene": "Ambiance cosy à l’intérieur, confort chic et mode cocooning",
    "lieux": ["salon chaleureux", "chambre avec plaid", "canapé confortable"],
    "tenues": ["pull oversize", "chaussettes épaisses", "legging doux"],
    "expressions": ["air apaisé", "sourire détendu", "expression rêveuse"],
    "lumieres": ["lampe tamisée", "lumière naturelle intérieure", "bougie chaude"],
    "accessoires": ["tasse de thé", "livre", "ordinateur portable", "chat sacré de Birmanie"],
    "poses": ["Cuisinant un plat réconfortant dans une cuisine chaleureuse.", "S'occupant de ses plantes d'intérieur.", "Écoutant de la musique avec un casque, les yeux fermés.", "Enroulée dans un plaid, regardant la pluie par la fenêtre."]
  },
  "sport_chic": {
    "scene": "Mode activewear élégante, entre sport et style urbain",
    "lieux": ["studio minimaliste", "salle de sport chic", "rooftop en plein effort"],
    "tenues": ["legging couture", "brassière élégante", "ensemble sport stylisé"],
    "expressions": ["air concentré", "regard intense", "sourire en mouvement"],
    "lumieres": ["lumière crue de studio", "éclairage naturel sportif", "contre-jour dynamique"],
    "accessoires": ["tapis de yoga", "casque audio", "bouteille design", "aucun"],
    "poses": ["En pleine posture de yoga sur un rooftop au lever du soleil.", "S'étirant après une course, adossée à un mur en ville.", "Soulevant des poids légers avec une expression concentrée.", "Buvant de l'eau après l'effort, le visage perlant de sueur."]
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

const PORTRAIT_MINIMALISTE_LIBRARY = {
    'studio_blanc': {
      "lieux": ["fond blanc infini", "studio avec cyclorama blanc", "mur blanc texturé", "décor blanc avec une seule chaise design"],
      "tenues": ["chemise blanche oversize", "robe noire simple", "tenue ton sur ton beige", "costume minimaliste"],
      "expressions": ["regard direct et neutre", "sourire subtil", "expression sereine", "pose sculpturale"],
      "lumieres": ["lumière douce et diffuse", "éclairage high-key sans ombres", "contre-jour doux", "une seule source de lumière dure"],
      "accessoires": ["aucun", "un seul bijou géométrique", "lunettes conceptuelles", "un simple tabouret en bois"],
      "poses": ["Debout, profil pur.", "Assis au sol, composition géométrique.", "Gros plan sur le visage avec une expression neutre.", "Jeu d'ombres et de lumière sur le corps."]
    },
    'architecture_moderne': {
      "lieux": ["devant un mur en béton brut", "près d'une grande baie vitrée", "dans un escalier en colimaçon moderne", "sur un toit avec des lignes architecturales épurées"],
      "tenues": ["robe rouge contrastante", "ensemble noir structuré", "manteau long minimaliste", "tenue qui complète les lignes du décor"],
      "expressions": ["regard confiant", "expression pensive", "pose qui interagit avec l'architecture", "air sophistiqué"],
      "lumieres": ["lumière naturelle dure créant des ombres graphiques", "lumière rasante sur le béton", "reflets dans les surfaces vitrées", "contre-jour avec la silhouette de la ville"],
      "accessoires": ["aucun", "sac à main design", "lunettes de soleil architecturales", "un seul bracelet audacieux"],
      "poses": ["Posant de manière à ce que les lignes du corps prolongent celles de l'architecture.", "Regardant au loin depuis une fenêtre.", "Montant ou descendant un escalier de manière graphique.", "Utilisant les ombres projetées par le bâtiment."]
    },
    'noir_blanc_dramatique': {
      "lieux": ["fond noir absolu", "studio avec un seul projecteur", "décor sombre et texturé", "mur en briques peintes en noir"],
      "tenues": ["robe en soie blanche", "costume noir", "pull à col roulé noir", "corps nu sculptural"],
      "expressions": ["regard intense et perçant", "expression mélancolique", "visage à moitié dans l'ombre", "pose dramatique et théâtrale"],
      "lumieres": ["éclairage en clair-obscur (chiaroscuro)", "lumière dure latérale (split lighting)", "contre-jour créant une silhouette", "un seul faisceau de lumière (snoot)"],
      "accessoires": ["chapeau à larges bords", "fumée de cigarette", "un verre de vin rouge (apparaissant sombre)", "mains expressives"],
      "poses": ["Le visage émergeant de l'obscurité.", "Silhouette se découpant sur un fond clair.", "Pose contorsionnée créant des formes abstraites.", "Portrait serré avec un contraste extrême."]
    },
    'couleur_pastel': {
      "lieux": ["fond rose poudré", "mur bleu ciel", "décor géométrique avec des blocs pastel", "studio avec des rideaux en voile pastel"],
      "tenues": ["robe jaune pastel", "ensemble monochrome lavande", "chemise vert d'eau", "tenue blanche sur fond pastel"],
      "expressions": ["sourire doux et rêveur", "expression sereine et calme", "regard innocent", "air léger et joyeux"],
      "lumieres": ["lumière douce et uniforme", "éclairage high-key", "lumière diffuse à travers un tissu coloré", "reflets colorés subtils"],
      "accessoires": ["une seule fleur pastel", "ballon de baudruche pastel", "sucette colorée", "bijoux en acrylique pastel"],
      "poses": ["Tenant une fleur devant son visage.", "Assis sur un cube de couleur pastel.", "Soufflant des bulles de savon.", "Profil délicat sur un fond coloré."]
    },
    'pop_art_vibrant': {
      "lieux": ["fond jaune vif", "mur bicolore avec une séparation nette (color blocking)", "décor inspiré de Warhol ou Lichtenstein", "studio avec des formes géométriques géantes et colorées"],
      "tenues": ["robe rouge primaire", "ensemble avec des motifs à pois ou à rayures", "tenue bleue électrique", "maquillage pop art (points de trame)"],
      "expressions": ["expression audacieuse et graphique", "sourire exagéré", "air surpris (façon BD)", "pose figée et stylisée"],
      "lumieres": ["flash en anneau (ring flash) pour un éclairage plat et sans ombres", "lumière dure et directe", "gels colorés (rouge, bleu, jaune) sur les projecteurs", "éclairage très contrasté"],
      "accessoires": ["téléphone vintage coloré", "lunettes de soleil pop et surdimensionnées", "accessoires en plastique coloré", "une banane (clin d'œil à Warhol)"],
      "poses": ["Pose frontale et symétrique.", "Expression figée comme une image de bande dessinée.", "Interagissant avec un objet de couleur vive.", "Répétition du même portrait avec différentes couleurs de fond (diptyque/triptyque)."]
    }
};

export const PUNK_LIBRARY = {
  "punk_urbain": {
    "lieux": ["rue taguée", "squat underground", "concert de rue", "ruelle sombre"],
    "tenues": ["cuir clouté", "t-shirt déchiré", "pantalon tartan", "chaussures montantes"],
    "expressions": ["regard provocateur", "air rebelle", "cri de scène", "sourire ironique"],
    "lumieres": ["néons colorés", "spot brut", "flash improvisé", "contre-jour dramatique"],
    "accessoires": ["guitare électrique", "crête colorée", "chaînes métalliques", "aucun"],
    "poses": ["S'appuyant contre un mur de graffitis, bras croisés.", "Sautant en l'air, guitare à la main.", "Hurlant dans un microphone, le visage tordu par l'effort.", "Assis sur le trottoir, regardant la caméra avec défi."]
  },
  "punk_uk_70s": {
    "lieux": ["club londonien", "rue de Camden", "pub underground", "salle de concert enfumée"],
    "tenues": ["cuir noir", "t-shirt à slogan", "pantalon serré", "chaussures Doc Martens"],
    "expressions": ["air défiant", "sourire narquois", "grimace punk", "regard fixe"],
    "lumieres": ["flash brutal", "contre-jour", "spot unique", "éclairage de scène"],
    "accessoires": ["pogo", "épingle à nourrice", "boucles métalliques", "aucun"],
    "poses": ["En train de danser le pogo au milieu d'une foule.", "Fixant l'objectif avec un air de défi, le poing levé.", "Fumant une cigarette dans une ruelle sombre derrière un club.", "Posant avec son groupe, l'air arrogant."]
  },
  "punk_80s_glam": {
    "lieux": ["scène colorée", "club flashy", "studio photo", "soirée underground"],
    "tenues": ["paillettes", "maquillage outrancier", "vestes cuir cloutées", "legging métallisé"],
    "expressions": ["air exubérant", "pose théâtrale", "sourire provocateur", "rire franc"],
    "lumieres": ["spots multicolores", "néons saturés", "projecteurs scintillants", "flash disco"],
    "accessoires": ["lunettes oversized", "bracelets multiples", "collier extravagant", "aucun"],
    "poses": ["Prenant une pose outrancière sur scène, sous les projecteurs.", "Se maquillant de manière excessive devant un miroir.", "Dansant de manière extravagante dans un club.", "Posant de manière androgyne et provocatrice."]
  },
  "concert_punk": {
    "lieux": ["salle de concert bondée", "festival en plein air", "club sombre", "scène improvisée"],
    "tenues": ["t-shirt de groupe", "veste cloutée", "short usé", "bottes montantes"],
    "expressions": ["cri intense", "rage scénique", "air en transe", "rire sauvage"],
    "lumieres": ["stroboscope", "flash de scène", "spots rouges", "fumée éclairée"],
    "accessoires": ["microphone", "basse électrique", "canette écrasée", "aucun"],
    "poses": ["Se jetant dans la foule (stage diving).", "Jouant de la guitare avec une énergie frénétique.", "Interagissant avec le public, le micro tendu vers eux.", "En sueur, à la fin du concert, remerciant le public."]
  },
  "grunge_90s": {
    "lieux": ["garage", "sous-sol musical", "salle de répète", "rue pluvieuse"],
    "tenues": ["chemise à carreaux", "jean troué", "t-shirt gris", "pull loose"],
    "expressions": ["air détaché", "regard fatigué", "expression mélancolique", "air nostalgique"],
    "lumieres": ["lumière diffuse", "projecteurs froids", "clair-obscur", "lumière naturelle faible"],
    "accessoires": ["guitare usée", "café à emporter", "chaussures usées", "aucun"],
    "poses": ["Assis sur un vieil ampli, jouant de la guitare acoustique.", "Marchant sous la pluie, les mains dans les poches.", "Regardant par une fenêtre sale, l'air pensif.", "Répétant avec son groupe dans un sous-sol encombré."]
  },
  "punk_avant_garde": {
    "lieux": ["studio artistique", "podium expérimental", "décor abstrait", "galerie alternative"],
    "tenues": ["costumes déstructurés", "matériaux non conventionnels", "robes asymétriques", "tenues futuristes punk"],
    "expressions": ["air théâtral", "pose exagérée", "sourire mystérieux", "regard fixe"],
    "lumieres": ["néons violets", "projecteurs artistiques", "contre-jour futuriste", "lumière colorée"],
    "accessoires": ["accessoires conceptuels", "bijoux démesurés", "lunettes extravagantes", "aucun"],
    "poses": ["Posant comme une statue vivante dans une galerie d'art.", "Défilant avec une démarche saccadée et robotique.", "Interagissant avec une œuvre d'art abstraite.", "Le corps peint, se fondant dans un décor coloré."]
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
    "accessoires": ["croix en argent", "livre ancien", "gants de velours", "aucun"],
    "poses": ["Assise sur un trône de pierre, l'air autoritaire.", "Errant dans un couloir sombre, une bougie à la main.", "Regardant par une fenêtre en ogive une nuit d'orage.", "Ouvrant un livre ancien et poussiéreux dans une bibliothèque oubliée."]
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
    "accessoires": ["ombrelle victorienne", "fleurs fanées", "collier ancien", "aucun"],
    "poses": ["Déposant une rose fanée sur une tombe.", "Assise sur une pierre tombale, l'air pensif.", "S'appuyant contre une statue d'ange en pleurs.", "Marchant lentement dans une allée brumeuse."]
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
    "accessoires": ["rosaire", "collier gothique", "gants sombres", "aucun"],
    "poses": ["Agenouillée devant l'autel, en prière.", "Debout dans le faisceau de lumière d'un vitrail.", "Se cachant derrière un pilier, observant la scène.", "Assise sur un banc d'église, seule dans l'immense nef."]
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
    "accessoires": ["montre de poche", "médaillon ancien", "ombrelle", "aucun"],
    "poses": ["Posant de manière rigide pour un daguerréotype.", "Lisait un livre dans un fauteuil en cuir.", "Se regardant dans un miroir ancien.", "Jouant du piano dans un salon sombre."]
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
    "accessoires": ["piercings", "lunettes sombres", "collier métallique", "aucun"],
    "poses": ["S'appuyant contre un mur de briques dans une ruelle.", "Dansant dans un club underground.", "Regardant la ville depuis un toit, la nuit.", "Posant de manière agressive face à la caméra."]
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
    "accessoires": ["masque vénitien", "bijoux imposants", "éventail ancien", "aucun"],
    "poses": ["Dansant une valse lente dans une salle de bal vide.", "Se regardant dans un miroir orné.", "Assistant à un opéra depuis une loge privée.", "Descendant un escalier majestueux."]
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
    "accessoires": ["rose fanée", "collier cœur sombre", "gants élégants", "aucun"],
    "poses": ["Allongée sur un lit de velours, entourée de pétales de rose.", "Buvant un verre de vin rouge, le regard perdu.", "Écrivant une lettre à la lueur d'une bougie.", "Dansant seule au clair de lune sur un balcon."]
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
    "accessoires": ["verre de cocktail sombre", "cendrier vintage", "bougies sur la table", "aucun"],
    "poses": ["Accoudée au bar, observant la salle.", "Jouant au billard dans une arrière-salle enfumée.", "Discutant avec le barman, un sourire en coin.", "Choisissant une chanson sur un jukebox vintage."]
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
    "accessoires": ["hache viking à double tranchant", "bouclier en bois rond orné de motifs", "épée nordique à la garde travaillée", "aucun"],
    "poses": ["Se tenant fièrement à la proue du drakkar, défiant la tempête.", "Sautant du bateau dans l'eau glacée pour mener l'assaut.", "Brandissant sa hache, prêt à aborder un navire ennemi.", "Ramant en rythme avec ses compagnons, le visage tendu par l'effort."]
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
    "accessoires": ["carte au trésor en parchemin usé", "cascade de pièces d’or et de bijoux", "artefacts vikings précieux", "aucun"],
    "poses": ["Ouvrant un lourd coffre au trésor, le visage illuminé par son contenu.", "Déchiffrant des runes anciennes gravées sur un mur de pierre.", "Creusant le sable avec impatience pour déterrer un butin.", "Montant la garde à l'entrée d'une grotte secrète, l'épée à la main."]
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
    "accessoires": ["corne à boire remplie d'hydromel", "hache de cérémonie posée sur la table", "bijoux nordiques opulents", "aucun"],
    "poses": ["Levant sa corne à boire pour porter un toast bruyant.", "Riant aux éclats à une blague, renversé sur son banc.", "Racontant un exploit de bataille avec de grands gestes.", "Écoutant attentivement un barde jouer de la harpe près du feu."]
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
    "accessoires": ["boussole solaire primitive en bois", "hache courte d'explorateur", "sac en cuir rempli de provisions", "aucun"],
    "poses": ["Plantant un étendard sur une nouvelle terre découverte.", "Pointant l'horizon depuis la proue d'un navire.", "Construisant un abri de fortune dans la neige.", "Observant les aurores boréales, la tête renversée en arrière."]
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
    "accessoires": ["marteau runique crépitant d'énergie", "épée légendaire brillante d'une lueur magique", "bouclier orné de symboles divins", "aucun"],
    "poses": ["Frappant le sol avec une arme mythique, créant une onde de choc.", "Terrassant une bête monstrueuse.", "Se tenant au sommet d'une montagne, défiant les cieux.", "Consultant les dieux devant un autel sacrificiel."]
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
    "accessoires": ["outils de forgeron", "bétail comme des chèvres ou des moutons", "paniers remplis de provisions", "aucun"],
    "poses": ["Forgeant une lame dans une forge, le marteau levé.", "Réparant un filet de pêche sur le quai.", "S'occupant des animaux de la ferme.", "Partageant un repas simple avec sa famille devant sa maison."]
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
    "accessoires": ["rames sculptées plongeant en rythme dans l'eau", "boucliers en bois colorés alignés le long de la coque", "cordages usés et tendus par le vent", "aucun"],
    "poses": ["Tenant fermement la barre du gouvernail dans la tempête.", "Grattant le mât pour avoir une meilleure vue.", "Hissant la voile avec d'autres marins.", "Sonnant dans une corne pour signaler un autre navire."]
  }
};

export const BOHEME_LIBRARY = {
  "boheme_chic": {
    "lieux": [
      "terrasse ensoleillée d’un hôtel design",
      "salon cosy avec tapis persans",
      "plage privée au coucher de soleil",
      "villa méditerranéenne avec bougainvilliers"
    ],
    "tenues": ["robe fluide blanche", "jupe longue imprimée", "kimono élégant", "ensemble bohème pastel"],
    "expressions": ["sourire doux", "regard mystérieux", "air détendu", "pose élégante"],
    "lumieres": ["golden hour", "lumière tamisée de bougie", "contre-jour doré", "lumière naturelle douce"],
    "accessoires": ["chapeau de paille chic", "bijoux fins", "sac en cuir naturel", "aucun"],
    "poses": ["Lisait un livre dans un hamac.", "Sirotant un cocktail au bord d'une piscine.", "Marchant pieds nus sur une terrasse en bois.", "S'appuyant nonchalamment contre un mur blanchi à la chaux."]
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
    "accessoires": ["couronne de fleurs", "bracelets multiples", "sac frangé", "aucun"],
    "poses": ["Dansant librement devant la scène.", "Assise en tailleur sur l'herbe avec des amis.", "Faisant des bulles de savon.", "Jouant du ukulélé près d'un feu de camp."]
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
    "accessoires": ["sac bandoulière cuir", "collier artisanal", "lunettes rondes", "aucun"],
    "poses": ["Buvant un café latte en terrasse.", "Regardant une œuvre d'art dans une galerie.", "Marchant en ville, un carnet de croquis à la main.", "S'arrêtant pour écouter un musicien de rue."]
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
    "accessoires": ["vinyle rétro", "collier peace & love", "sac vintage", "aucun"],
    "poses": ["Écoutant un vinyle sur un tourne-disque vintage.", "Fouillant dans un bac de vieux vêtements.", "Posant de manière théâtrale sur un fauteuil en velours.", "Conduisant un combi Volkswagen coloré."]
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
    "accessoires": ["guitare acoustique", "attrape-rêves", "bracelet artisanal", "aucun"],
    "poses": ["Jouant de la guitare au coin du feu.", "Méditant au lever du soleil.", "Tressant une couronne de fleurs.", "Marchant pieds nus dans une rivière."]
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
    "accessoires": ["bijoux en or", "sac de luxe", "boucles élégantes", "aucun"],
    "poses": ["Contemplant la vue depuis un balcon privé.", "Dégustant un repas gastronomique dans un cadre élégant.", "Se prélassant dans un bain à remous avec vue.", "Assistant à une exposition d'art privée."]
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
    "accessoires": ["tresses dans les cheveux", "colliers multiples", "sac tissé", "aucun"],
    "poses": ["Jonglant avec des balles ou des bâtons du diable.", "Peignant une fresque sur un mur.", "Faisant de l'auto-stop au bord d'une route de campagne.", "Participant à un cercle de percussion sur la plage."]
  }
};

export const AUTOMOBILE_LIBRARY = {
  "course_circuit": {
    "lieux": [
      "piste de Formule 1 avec tribunes bondées",
      "circuit d'endurance avec stands et mécanos",
      "circuit GT urbain avec gratte-ciel en arrière-plan",
      "virage serré d'un circuit de montagne"
    ],
    "vehicules": [
      "monoplace F1 rouge vif",
      "GT sportive noire",
      "voiture d'endurance avec sponsors",
      "prototype futuriste aérodynamique"
    ],
    "expressions": [
      "concentration intense du pilote",
      "regard déterminé",
      "air victorieux",
      "expression de vitesse pure"
    ],
    "lumieres": [
      "spotlights nocturnes",
      "soleil couchant dramatique",
      "flashs des photographes",
      "éclairage naturel du jour"
    ],
    "accessoires": [
      "casque racing",
      "combinaison pilote",
      "drapeau à damier",
      "aucun"
    ],
    "poses": ["Célébrant une victoire, le poing levé dans le cockpit.", "Négociant un virage à la corde, à la limite de l'adhérence.", "Dépassant un concurrent dans une ligne droite.", "Discutant avec son ingénieur dans les stands, casque à la main."]
  },
  "rallye_raid": {
    "lieux": [
      "désert poussiéreux du Dakar",
      "piste boueuse en forêt",
      "montagnes rocailleuses enneigées",
      "traversée de rivière en pleine course"
    ],
    "vehicules": [
      "4x4 modifié rallye",
      "buggy tout-terrain",
      "camion d’assistance énorme",
      "moto rallye raid"
    ],
    "expressions": [
      "regard concentré",
      "visage couvert de poussière",
      "air déterminé",
      "adrénaline intense"
    ],
    "lumieres": [
      "soleil écrasant du désert",
      "ciel orageux dramatique",
      "golden hour dans le sable",
      "phares puissants dans la nuit"
    ],
    "accessoires": [
      "boussole",
      "drapeau du pays",
      "roue de secours",
      "aucun"
    ],
    "poses": ["La voiture effectuant un saut spectaculaire au-dessus d'une dune.", "Glissant dans un virage en épingle, projetant de la boue.", "En train de changer un pneu en urgence au milieu de nulle part.", "Naviguant à travers un paysage difficile, carte à la main."]
  },
  "classic_vintage": {
    "lieux": [
      "rue pavée parisienne années 50",
      "diner américain rétro",
      "route côtière années 70",
      "parking de collection"
    ],
    "vehicules": [
      "Chevrolet Bel Air 1957",
      "Porsche 356 argentée",
      "Jaguar E-Type",
      "Citroën DS noire"
    ],
    "expressions": [
      "style rétro chic",
      "sourire nostalgique",
      "air mystérieux",
      "pose élégante"
    ],
    "lumieres": [
      "noir et blanc contrasté",
      "golden hour nostalgique",
      "lumière néon vintage",
      "studio rétro"
    ],
    "accessoires": [
      "lunettes vintage",
      "foulard soie",
      "chapeau rétro",
      "aucun"
    ],
    "poses": ["S'appuyant nonchalamment contre la portière de la voiture.", "Conduisant le long d'une route panoramique, le vent dans les cheveux.", "Polissant le chrome de sa voiture avec soin.", "Pique-niquant à côté de sa voiture classique lors d'un rallye."]
  },
  "luxe_moderne": {
    "lieux": [
      "devant une villa moderne",
      "sur un rooftop urbain",
      "autoroute futuriste de nuit",
      "devant un hôtel 5 étoiles"
    ],
    "vehicules": [
      "Lamborghini Aventador",
      "Bugatti Chiron",
      "Ferrari SF90",
      "Porsche 911 Turbo"
    ],
    "expressions": [
      "confiance absolue",
      "regard assuré",
      "pose glamour",
      "air mystérieux"
    ],
    "lumieres": [
      "lumière néon urbaine",
      "projecteurs de rue",
      "golden hour",
      "éclairage futuriste coloré"
    ],
    "accessoires": [
      "sac de luxe",
      "montre haut de gamme",
      "lunettes de soleil",
      "aucun"
    ],
    "poses": ["Sortant de la voiture avec élégance, les portes papillon ouvertes.", "Posant devant la voiture, reflétée dans sa carrosserie impeccable.", "Conduisant à grande vitesse sur un pont illuminé la nuit.", "Remettant les clés au voiturier d'un palace."]
  },
  "stock_car": {
    "lieux": [
      "arène de stock-car avec tribunes",
      "piste ovale poussiéreuse",
      "parking improvisé en zone industrielle",
      "terrain boueux après collision"
    ],
    "vehicules": [
      "voiture cabossée",
      "muscle car renforcée",
      "pickup modifié",
      "voiture peinte aux couleurs flashy"
    ],
    "expressions": [
      "adrénaline brute",
      "regard fougueux",
      "expression agressive",
      "air déterminé"
    ],
    "lumieres": [
      "lumière de stade nocturne",
      "soleil brûlant",
      "phares dans la poussière",
      "ciel orageux dramatique"
    ],
    "accessoires": [
      "casque rayé",
      "drapeau rouge",
      "roue de secours cabossée",
      "aucun"
    ],
    "poses": ["En pleine collision avec une autre voiture, des étincelles jaillissant.", "Célébrant une victoire sur le toit de sa voiture cabossée.", "Effectuant des réparations rapides dans les stands avec du ruban adhésif.", "Dérapant dans un virage, projetant de la terre."]
  },
  "drag_race": {
    "lieux": [
      "ligne droite urbaine",
      "piste de drag avec public",
      "parking de supermarché la nuit",
      "tunnel sombre illuminé par des néons"
    ],
    "vehicules": [
      "muscle car américaine",
      "Nissan Skyline GT-R",
      "Dodge Charger",
      "Tesla Plaid"
    ],
    "expressions": [
      "regard défiant",
      "air confiant",
      "concentration extrême",
      "expression victorieuse"
    ],
    "lumieres": [
      "phares éblouissants",
      "fumée de pneus éclairée",
      "golden hour urbaine",
      "néons multicolores"
    ],
    "accessoires": [
      "bouteille de NOS",
      "casquette tuning",
      "drapeau check",
      "aucun"
    ],
    "poses": ["La voiture cabrée au démarrage, les pneus avant décollant du sol.", "Laissant des traces de pneu noires sur l'asphalte.", "Déployant un parachute de freinage à la fin de la course.", "Posant fièrement à côté de son bolide, les bras croisés."]
  },
  "tuning_street": {
    "lieux": [
      "parking souterrain",
      "ruelle avec graffitis",
      "toit urbain avec skyline",
      "zone industrielle nocturne"
    ],
    "vehicules": [
      "Honda Civic modifiée",
      "Toyota Supra avec aileron",
      "Nissan 350Z tunée",
      "BMW M3 avec néons"
    ],
    "expressions": [
      "air rebelle",
      "regard provocateur",
      "sourire complice",
      "pose street"
    ],
    "lumieres": [
      "néons violets et bleus",
      "phares de voiture",
      "fumée de pneus",
      "éclairage urbain nocturne"
    ],
    "accessoires": [
      "casquette street",
      "chaîne argent",
      "enceinte portable",
      "aucun"
    ],
    "poses": ["Montrant le moteur customisé, le capot ouvert.", "Faisant crisser les pneus en effectuant un donut.", "Assis sur le capot de la voiture, écoutant de la musique.", "Participant à un rassemblement de voitures tunées, entouré d'admirateurs."]
  }
};

export const MOTO_LIBRARY = {
  "moto_piste": {
    "lieux": [
      "circuit GP international avec tribunes",
      "virage serré de circuit avec spectateurs",
      "ligne droite à pleine vitesse",
      "stand technique avec mécaniciens"
    ],
    "vehicules": ["superbike", "motoGP", "sportive carénée"],
    "expressions": ["concentration maximale", "adrenaline pure", "regard focalisé"],
    "ambiance": ["bruit de moteur assourdissant", "fumée de pneus", "drapeaux de course"],
    "poses": ["Genou à terre dans un virage serré.", "En wheeling en passant la ligne d'arrivée.", "Dépassant un adversaire à l'intérieur d'un virage.", "Célébrant sur le podium, bouteille de champagne à la main."]
  },
  "motocross": {
    "lieux": [
      "terrain boueux avec rampes",
      "sauts spectaculaires en pleine poussière",
      "piste forestière accidentée",
      "course à plusieurs motos"
    ],
    "vehicules": ["motocross 250cc", "motocross 450cc"],
    "expressions": ["détermination", "frisson de vitesse", "concentration absolue"],
    "ambiance": ["terre projetée", "fumée de boue", "cris du public"],
    "poses": ["En plein saut, la moto parallèle au sol (whip).", "Glissant dans un virage relevé, projetant de la terre.", "Luttant coude à coude avec d'autres pilotes au départ.", "Couvert de boue à l'arrivée, le poing levé."]
  },
  "rallye_raid_moto": {
    "lieux": [
      "désert infini type Dakar",
      "pistes rocailleuses sahariennes",
      "oasis en arrière-plan",
      "dunes immenses au coucher du soleil"
    ],
    "vehicules": ["moto rallye raid KTM", "Yamaha Ténéré", "Honda Africa Twin"],
    "expressions": ["endurant", "solitaire", "explorateur"],
    "ambiance": ["poussière", "chaleur écrasante", "course d’endurance"],
    "poses": ["Naviguant au roadbook à travers les dunes.", "Réparant sa moto au milieu du désert.", "Sautant par-dessus une dune de sable.", "S'arrêtant pour boire de l'eau, le visage fatigué mais déterminé."]
  },
  "biker_harley": {
    "lieux": [
      "route 66 américaine",
      "bar biker en néon",
      "désert du Nevada",
      "rassemblement moto de nuit"
    ],
    "vehicules": ["Harley-Davidson", "Custom chopper"],
    "expressions": ["attitude rebelle", "cool assuré", "air libre"],
    "ambiance": ["blouson cuir", "tatouages", "sons graves de moteur V-Twin"],
    "poses": ["Conduisant en groupe sur une route déserte.", "Garé devant un bar, s'appuyant sur sa moto.", "Personnalisant sa moto dans un garage.", "Participant à un bras de fer dans un bar de motards."]
  },
  "drag_race_moto": {
    "lieux": [
      "ligne droite dragstrip",
      "course de nuit avec néons",
      "ligne de départ avec fumée blanche",
      "tribunes bondées"
    ],
    "vehicules": ["drag bike", "moto turbo"],
    "expressions": ["puissance brute", "adrénaline", "regard agressif"],
    "ambiance": ["fumée de pneu", "cris du public", "compteur explosif"],
    "poses": ["Démarrage explosif, la roue avant se levant.", "Allongé sur la moto pour un aérodynamisme maximal.", "Déployant un parachute de freinage à l'arrivée.", "Faisant chauffer le pneu arrière avant le départ (burnout)."]
  },
  "cafe_racer": {
    "lieux": [
      "rue vintage urbaine",
      "garage rétro",
      "café londonien années 60",
      "route de campagne"
    ],
    "vehicules": ["Triumph Bonneville", "Norton Commando", "Honda CB customisée"],
    "expressions": ["style détaché", "attitude rebelle chic", "regard vintage"],
    "ambiance": ["chrome poli", "cuir patiné", "lumière rétro"],
    "poses": ["Garé devant un café, une tasse à la main.", "Prenant un virage à grande vitesse sur une route sinueuse.", "Travaillant sur sa moto avec des outils vintage.", "Posant avec sa moto, vêtu d'un blouson en cuir et d'un casque jet."]
  },
  "enduro": {
    "lieux": [
      "forêt dense avec obstacles naturels",
      "montée rocheuse en terrain difficile",
      "rivière à franchir",
      "piste escarpée de montagne"
    ],
    "vehicules": ["KTM Enduro", "Husqvarna Enduro"],
    "expressions": ["effort physique", "concentration", "maîtrise"],
    "ambiance": ["poussière", "rochers", "nature sauvage"],
    "poses": ["Franchissant un tronc d'arbre couché.", "Montant une pente abrupte, la roue avant délestée.", "Traversant une rivière, de l'eau jusqu'au moteur.", "Poussant la moto dans une section difficile."]
  },
  "trial": {
    "lieux": [
      "rochers abrupts",
      "tronc d’arbre à franchir",
      "zone urbaine aménagée pour le trial",
      "parcours artificiel en compétition"
    ],
    "vehicules": ["GasGas Trial", "Montesa Trial"],
    "expressions": ["équilibre extrême", "maîtrise", "calme"],
    "ambiance": ["silence avant saut", "public concentré", "mouvement millimétré"],
    "poses": ["En équilibre sur la roue arrière sur un rocher.", "Sautant d'un obstacle à un autre sans poser le pied.", "Franchissant un mur vertical.", "Se concentrant intensément avant une section difficile."]
  }
};

// --- Dynamic Enhancement Logic ---

const styleLibraryMap: Record<string, Record<string, any>> = {
    'photographers': PHOTOGRAPHER_LIBRARY,
    'portrait_glamour': PORTRAIT_GLAMOUR_LIBRARY,
    'mode_haute_couture': HAUTE_COUTURE_LIBRARY,
    'journee_dun_mannequin': JOURNEE_MANNEQUIN_LIBRARY,
    'couverture_vogue': COUVERTURE_VOGUE_LIBRARY,
    'couverture_elle': COUVERTURE_ELLE_LIBRARY,
    'couverture_elle_deco': COUVERTURE_ELLE_DECO_LIBRARY,
    'portrait_minimaliste': PORTRAIT_MINIMALISTE_LIBRARY,
    'punk': PUNK_LIBRARY,
    'gothique': GOTHIC_LIBRARY,
    'viking': VIKING_LIBRARY,
    'boheme': BOHEME_LIBRARY,
    'automobile': AUTOMOBILE_LIBRARY,
    'moto': MOTO_LIBRARY,
    'costume_de_film': COSTUME_DE_FILM_LIBRARY,
};

const keyToPrefix: Record<string, string> = {
    lieux: 'Lieu',
    tenues: 'Tenue',
    expressions: 'Expression',
    lumieres: 'Lumière',
    accessoires: 'Accessoire',
    poses: 'Pose',
    vehicules: 'Véhicule',
    ambiance: 'Ambiance',
    scenes: 'Scène',
    lighting: 'Éclairage',
};

/**
 * Generates a unique set of creative directions for a prompt based on style and sub-style.
 * @param style The main style category.
 * @param subStyle The specific sub-style.
 * @returns A string of dynamic creative enhancements to be added to the prompt.
 */
export function getDynamicEnhancements(style: string, subStyle: string): string {
    const enhancements: string[] = [];
    let specificEnhancementsFound = false;

    const libraryForStyle = styleLibraryMap[style];
    if (libraryForStyle && subStyle && libraryForStyle[subStyle]) {
        const subStyleLibrary = libraryForStyle[subStyle];
        for (const key in subStyleLibrary) {
            if (key === 'scene' && typeof subStyleLibrary[key] === 'string') {
                enhancements.push(`Scène: ${subStyleLibrary[key]}.`);
                specificEnhancementsFound = true;
            } else if (Array.isArray(subStyleLibrary[key]) && subStyleLibrary[key].length > 0) {
                const prefix = keyToPrefix[key] || (key.charAt(0).toUpperCase() + key.slice(1));
                enhancements.push(`${prefix}: ${selectRandom(subStyleLibrary[key])}.`);
                specificEnhancementsFound = true;
            }
        }
    }
    
    // Contextual environments can add more detail.
    if (subStyle && CONTEXTUAL_ENVIRONMENTS[subStyle]) {
        enhancements.push(`Environnement: ${selectRandom(CONTEXTUAL_ENVIRONMENTS[subStyle])}.`);
        specificEnhancementsFound = true;
    }

    // Fallback to generic enhancements if no specific ones were found, or for general styles.
    if (!specificEnhancementsFound || style === 'photos') {
        enhancements.push(`Angle de caméra: ${selectRandom(CAMERA_ANGLES)}.`);
        enhancements.push(`Style d'éclairage: ${selectRandom(LIGHTING_STYLES)}.`);
        enhancements.push(`Atmosphère: ${selectRandom(ATMOSPHERES)}.`);
    }

    return enhancements.filter(e => e).join('\n');
}