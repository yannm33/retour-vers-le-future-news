

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// This library contains detailed stylistic scenarios and specific creative configurations.
// Global creative lists (angles, lights, moods) are now managed in `data/systematik_master.ts`.

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
    },
    vogue_de_rue: {
        lieux: [
            "Une rue pavée et calme d'un quartier historique, avec des maisons en briques rouges en arrière-plan.",
            "Devant la vitrine d'une boutique de luxe dans un quartier chic, avec des reflets urbains.",
            "Sur un passage piéton d'une grande avenue, capturant le mouvement de la ville.",
            "Assise sur les marches d'un perron en pierre d'un bâtiment haussmannien.",
            "Dans une ruelle animée, avec des néons et des passants en arrière-plan flou."
        ],
        tenues: [
            "Un trench-coat élégant sur un tailleur-pantalon, style effortless chic.",
            "Une robe d'avant-garde avec des bottes hautes, créant un contraste avec le décor urbain.",
            "Un look superposé avec un long manteau, un jean et des accessoires audacieux.",
            "Une tenue de soirée portée en plein jour, pour un effet dramatique et décalé."
        ],
        lumieres: [
            "Lumière naturelle douce de fin d'après-midi, créant de longues ombres.",
            "Reflets des néons et des lumières de la ville sur le sol humide après la pluie.",
            "Lumière vive et contrastée d'un soleil de midi, pour un look audacieux.",
            "Lumière filtrée par les arbres d'une avenue."
        ],
        poses: [
            "Marchant d'un pas décidé vers la caméra.",
            "Arrêtée au milieu de la rue, regardant par-dessus son épaule.",
            "Appuyée nonchalamment contre un mur en briques.",
            "Consultant son téléphone ou attendant quelqu'un, une pose naturelle et spontanée."
        ]
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


// --- 'Luxe & Volupté' Style Specifics ---
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
    "lunettes de soleil de créateur"
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
