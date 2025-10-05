/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Export missing constants to resolve import errors.
// This library contains detailed stylistic scenarios for emulating famous photographers and other creative styles.
// Each entry provides a rich set of options to ensure variety and stylistic accuracy.

export const EMOTIONAL_TONES = [
  "Joyeux et optimiste",
  "Mélancolique et introspectif",
  "Puissant et confiant",
  "Serein et paisible",
  "Mystérieux et tendu",
  "Nostalgique et rêveur",
];

export const PHOTOGRAPHER_STANCES = [
  "Observateur distant, capturant la scène sans intervenir.",
  "Participant intime, créant une connexion proche avec le sujet.",
  "Metteur en scène, contrôlant chaque détail de la composition.",
  "Documentariste, recherchant l'authenticité brute du moment.",
];

export const ARTISTIC_IMPERFECTIONS = [
  "Léger flou de bougé, ajoutant une sensation de mouvement et d'urgence.",
  "Grain de film prononcé, pour une texture organique et rétro.",
  "Lens flare subtil et naturel, ajoutant une touche de magie lumineuse.",
  "Vignetage doux, pour centrer l'attention sur le sujet.",
  "Couleurs légèrement désaturées, pour une ambiance nostalgique.",
  "Aberration chromatique subtile sur les bords.",
];

// Placeholder Libraries for styles
export const PHOTOGRAPHER_LIBRARY = {
    peter_lindbergh: {
        scene: "Portrait en noir et blanc sur une plage, lumière naturelle, expression authentique.",
        lumieres: ["Lumière naturelle douce", "Contraste élevé en noir et blanc"],
    },
};
export const COSTUME_DE_FILM_LIBRARY = {
    egypte_antique: {
        scene: "Un pharaon dans son temple, portant des parures en or et une coiffe Némès.",
        tenues: ["Toge en lin blanc", "Bijoux en lapis-lazuli et or"],
    }
};
export const HAUTE_COUTURE_LIBRARY = {
    defile_parisien: {
        scene: "Un mannequin sur le podium d'un défilé à Paris, portant une création extravagante.",
        ambiances: ["Élégante et dramatique", "Moderne et audacieuse"],
    }
};
export const PORTRAIT_GLAMOUR_LIBRARY = {
    festival_de_cannes: {
        scene: "Une actrice sur le tapis rouge de Cannes, robe de soirée scintillante et flashs des photographes.",
        lumieres: ["Flashs multiples", "Lumière dorée du crépuscule"],
    }
};
export const JOURNEE_MANNEQUIN_LIBRARY = {
    backstage_fashion_week: {
        scene: "En coulisses d'un défilé, le mannequin est en pleine préparation, entouré de stylistes et de maquilleurs.",
        ambiances: ["Chaos organisé", "Tension et excitation"],
    }
};
export const COUVERTURE_VOGUE_LIBRARY = {
    noir_blanc_iconique: {
        scene: "Portrait en studio, noir et blanc iconique, pose puissante et regard direct.",
    }
};
export const COUVERTURE_ELLE_LIBRARY = {
    plage_ete: {
        scene: "En couverture d'un magazine de mode, une ambiance estivale et joyeuse sur une plage ensoleillée.",
    }
};
export const COUVERTURE_ELLE_DECO_LIBRARY = {
    moderne_minimaliste: {
        scene: "Un intérieur de salon moderne et minimaliste, avec une lumière naturelle abondante et des meubles design.",
    }
};
export const PORTRAIT_MINIMALISTE_LIBRARY = {
    studio_blanc: {
        scene: "Portrait sur fond blanc infini, éclairage doux, mettant l'accent sur la forme et l'expression.",
    }
};
export const PUNK_LIBRARY = {
    punk_urbain: {
        scene: "Dans une ruelle taguée, un jeune punk avec une crête iroquoise et une veste en cuir à clous.",
    }
};
export const GOTHIC_LIBRARY = {
    cimetiere_victorien: {
        scene: "Une femme en robe de velours noir dans un cimetière victorien brumeux.",
    }
};
export const VIKING_LIBRARY = {
    raid_marin: {
        scene: "Des guerriers vikings sur un drakkar fendant les vagues d'une mer agitée.",
    }
};
export const BOHEME_LIBRARY = {
    festival_boheme: {
        scene: "Ambiance de festival en plein air, style bohème avec des couronnes de fleurs et des robes longues.",
    }
};
export const AUTOMOBILE_LIBRARY = {
    course_circuit: {
        scene: "Une voiture de course prenant un virage à grande vitesse sur un circuit, avec un effet de flou de mouvement.",
    }
};
export const MOTO_LIBRARY = {
    biker_harley: {
        scene: "Un biker sur une Harley-Davidson customisée, sur une route déserte américaine.",
    }
};

// --- Generic Creative Enhancements ---
export const CAMERA_ANGLES = [
  "Plan très large, montrant le sujet minuscule dans un vaste paysage.",
  "Plan large, montrant le sujet de la tête aux pieds avec son environnement.",
  "Plan moyen, cadré à la taille, pour se concentrer sur le langage corporel.",
  "Gros plan, se concentrant sur le visage pour capturer l'émotion.",
  "Très gros plan, isolant un détail (un œil, une bouche).",
  "Contre-plongée, pour donner au sujet un air de puissance et de domination.",
  "Plongée, pour donner au sujet un air de vulnérabilité ou pour montrer le contexte.",
  "Plan hollandais (dutch angle), inclinant la caméra pour créer une tension ou un malaise.",
  "Vue à travers quelque chose (through-the-lens), cadrant à travers une fenêtre, un feuillage."
];

export const LIGHTING_STYLES = [
  "Éclairage Rembrandt, avec un petit triangle de lumière sur la joue ombragée.",
  "High-key, avec une lumière vive et peu d'ombres pour une ambiance optimiste.",
  "Low-key, avec des ombres profondes pour une atmosphère dramatique et mystérieuse.",
  "Contre-jour, plaçant la source de lumière derrière le sujet pour créer une silhouette ou un halo.",
  "Lumière latérale, pour sculpter les formes et accentuer les textures.",
  "Lumière douce et diffuse, pour un rendu flatteur et sans défaut.",
  "Lumière dure et directe, pour des ombres nettes et un contraste élevé.",
  "Utilisation de gels colorés (rouge, bleu) pour teinter la scène.",
  "Lumière naturelle provenant d'une fenêtre, pour un rendu doux et authentique."
];

export const ATMOSPHERES = [
  "Rêveur et éthéré, avec une légère brume ou un flou artistique.",
  "Sombre et mélancolique, avec une palette de couleurs froides.",
  "Énergique et vibrant, avec des couleurs saturées et du mouvement.",
  "Serein et contemplatif, dans un environnement calme.",
  "Brut et réaliste, sans artifice, montrant la vérité du moment.",
  "Cinématique et narratif, comme une scène tirée d'un film.",
  "Mystérieux et inquiétant, jouant avec les ombres et le non-dit.",
  "Romantique et doux, avec des tons chauds et une lumière caressante."
];

export const CONTEXTUAL_ENVIRONMENTS: Record<string, string[]> = {
  'portrait_studio': ["un cyclorama blanc infini", "un fond en toile peinte texturée", "un décor minimaliste avec un seul accessoire (chaise, cube)"],
  'lifestyle_exterieur': ["un café en terrasse animé", "un parc en automne avec des feuilles mortes", "un marché de producteurs coloré"],
  'photographie_rue': ["un passage piéton bondé à New York", "une ruelle étroite et pluvieuse à Tokyo", "devant une fresque de street art à Berlin"],
  'corporate_affaires': ["un bureau moderne avec une baie vitrée surplombant la ville", "une salle de réunion design", "le hall d'entrée d'un gratte-ciel en verre et acier"]
};

// --- 'Luxe & Volupté' Style Enhancements ---
export const LUXE_POSES = [
  "Appuyé nonchalamment contre une voiture de sport, le regard au loin.",
  "Assis dans un fauteuil en cuir profond, un verre à la main.",
  "Marchant d'un pas assuré sur une avenue prestigieuse, sac de luxe à la main.",
  "Regardant par la fenêtre d'une suite de palace, contemplant la ville.",
  "Ajustant le bouton de manchette de sa chemise, un geste subtil et confiant.",
  "Descendant un grand escalier en marbre, avec élégance.",
  "Le corps de profil, la tête tournée vers l'objectif, une pose sculpturale."
];

export const LUXE_EXPRESSIONS = [
  "Un léger sourire en coin, confiant et énigmatique.",
  "Un regard intense et direct, plein d'assurance.",
  "Une expression neutre mais puissante, presque arrogante.",
  "Un air détendu et serein, comme si le luxe était naturel.",
  "Un regard contemplatif, perdu dans des pensées profondes.",
  "Une expression de satisfaction subtile."
];

export const LUXE_LIGHTING = {
  type: [
    "Lumière douce et enveloppante d'une grande softbox.",
    "Clair-obscur subtil, inspiré de la peinture, qui sculpte le visage.",
    "Lumière naturelle filtrée par les voilages d'une suite d'hôtel.",
    "Contre-jour léger qui crée un halo sur les cheveux.",
    "Lumière chaude et directionnelle d'une lampe de designer."
  ],
  tonalite: [
    "Tons chauds et dorés, évoquant l'opulence.",
    "Palette de couleurs monochromes ou aux tons neutres (beige, gris, ivoire).",
    "Noir et blanc à fort contraste, pour un rendu intemporel et dramatique.",
    "Tonalité 'teal and orange' très douce pour une ambiance cinématique moderne."
  ]
};

export const LUXE_COMPOSITION = {
  produit_star: [
    "montre",
    "parfum",
    "bijou (bague, collier)",
    "sac à main",
    "voiture",
    "stylo",
    "verre de spiritueux"
  ],
  cadrage: [
    "Plan large laissant de l'espace négatif pour du texte publicitaire.",
    "Gros plan sur un détail du produit porté par le sujet.",
    "Composition en règle des tiers, plaçant le sujet et le produit sur les points forts.",
    "Cadrage à travers un élément du décor (plante, architecture) pour créer de la profondeur."
  ]
};

export const JEWELRY_SUBSTYLES = [
  'luxe_cartier',
  'luxe_bulgari',
  'luxe_tiffany'
];

export const PRODUCT_FOCUSED_SUBSTYLES = [
  'luxe_dior',
  'luxe_chanel',
  'luxe_louis_vuitton',
  'luxe_cartier',
  'luxe_hermes',
  'luxe_rolex',
  'luxe_patek_philippe',
  'luxe_audemars',
  'luxe_jaeger',
  'luxe_balmain',
  'luxe_bulgari',
  'luxe_tiffany',
  'luxe_moncler',
];

// --- FASHION Category Enhancements ---
export const FASHION_CAMERA_ANGLES = [
  "Plan en pied (full-length shot) pour montrer l'intégralité de la tenue.",
  "Contre-plongée pour allonger la silhouette et donner un air puissant.",
  "Plan rapproché sur un détail du vêtement ou un accessoire.",
  "Vue de profil, pour souligner la coupe et la structure du vêtement.",
  "Plan capturé en mouvement, pour montrer la fluidité du tissu.",
  "Plan de dos, pour révéler un détail inattendu ou une coupe audacieuse."
];

export const FASHION_LIGHTING_STYLES = [
  "Éclairage 'beauty dish', pour un rendu contrasté mais flatteur sur la peau.",
  "Flash direct et dur, pour un look 'éditorial' brut et moderne.",
  "Lumière très douce d'une grande boîte à lumière, pour un look éthéré.",
  "Contre-jour puissant pour une silhouette dramatique.",
  "Utilisation de réflecteurs (or ou argent) pour sculpter la lumière."
];

export const FASHION_ATMOSPHERES = [
  "Minimaliste et conceptuel, dans un studio épuré.",
  "Urbain et 'edgy', dans les rues d'une métropole.",
];
