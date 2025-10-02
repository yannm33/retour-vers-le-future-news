/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface SubStyle {
    key: string;
    name: string;
}

export interface Style {
    name: string;
    subStyles: SubStyle[];
    notes?: string;
}

export const STYLES_CONFIG: Style[] = [
    {
        name: "Photos",
        notes: "Capturer des moments réalistes, avec une lumière naturelle et des décors authentiques.",
        subStyles: [
            { key: "portrait_studio", name: "Portrait en Studio" },
            { key: "lifestyle_exterieur", name: "Lifestyle en Extérieur" },
            { key: "photographie_voyage", name: "Photographie de Voyage" },
            { key: "photographie_rue", name: "Photographie de Rue" },
            { key: "corporate_affaires", name: "Corporate / Affaires" },
            { key: "nb_dramatique", name: "N&B Dramatique" },
            { key: "sepia_vintage", name: "Sépia Vintage" },
            { key: "double_exposition_artistique", name: "Double Exposition Artistique" },
            { key: "sport_action", name: "Sport d'Action" },
            { key: "portrait_environnemental", name: "Portrait Environnemental" },
            { key: "lumiere_golden_hour", name: "Lumière Golden Hour" },
            { key: "lumiere_blue_hour", name: "Lumière Blue Hour" },
            { key: "haute_vitesse_eclaboussure", name: "Haute Vitesse (Éclaboussure)" },
            { key: "lumiere_naturelle_fenetre", name: "Lumière Naturelle de Fenêtre" },
        ]
    },
    {
        name: "Portrait Glamour",
        notes: "Varier les coiffures, les couleurs de robes, les accessoires discrets, éviter la répétition.",
        subStyles: [
            { key: "studio_classique", name: "Studio Classique" },
            { key: "festival_de_cannes", name: "Festival de Cannes" },
            { key: "cinematique_noir", name: "Cinématique Noir" },
            { key: "luxe_exterieur", name: "Luxe Extérieur" },
            { key: "hotel_glamour", name: "Hôtel Glamour" },
            { key: "soiree_glamour", name: "Soirée Glamour" },
            { key: "plage_glamour", name: "Plage Glamour" },
        ]
    },
    {
        name: "Portrait Minimaliste",
        notes: "Variations minimalisme + pop-art, accessoires simples, fonds graphiques.",
        subStyles: [
            { key: "studio_blanc", name: "Studio Blanc" },
            { key: "architecture_moderne", name: "Architecture Moderne" },
            { key: "noir_blanc_dramatique", name: "Noir & Blanc Dramatique" },
            { key: "couleur_pastel", name: "Couleur Pastel" },
            { key: "pop_art_vibrant", name: "Pop Art Vibrant" },
        ]
    },
    {
        name: "Mode Haute Couture",
        notes: "Alterner les couleurs dominantes, les positions variées.",
        subStyles: [
            { key: "defile_parisien", name: "Défilé Parisien" },
            { key: "studio_editorial", name: "Studio Éditorial" },
            { key: "couture_exterieure", name: "Couture Extérieure" },
        ]
    },
    {
        name: "Couverture Vogue",
        notes: "Toujours inclure une typographie réaliste, des angles variés.",
        subStyles: [
            { key: "noir_blanc_iconique", name: "Noir & Blanc Iconique" },
            { key: "glamour_dore", name: "Glamour Doré" },
            { key: "vogue_de_rue", name: "Vogue de Rue" },
            { key: "revival_retro", name: "Revival Rétro" },
            { key: "studio_luxe_minimaliste", name: "Studio Luxe Minimaliste" },
            { key: "avant_garde_conceptuel", name: "Avant-Garde Conceptuel" },
            { key: "podium_couture", name: "Podium Couture" },
        ]
    },
    {
        name: "Couverture Elle",
        notes: "Ambiance lifestyle, sourires, looks accessibles.",
        subStyles: [
            { key: "plage_ete", name: "Plage d'Été" },
            { key: "chic_decontracte", name: "Chic Décontracté" },
            { key: "pastel_romantique", name: "Pastel Romantique" },
            { key: "look_fete", name: "Look de Fête" },
            { key: "mode_lifestyle_urbain", name: "Mode Lifestyle Urbain" },
            { key: "cocooning_interieur", name: "Cocooning Intérieur" },
            { key: "sport_chic", name: "Sport Chic" },
        ]
    },
    {
        name: "Couverture Elle Deco",
        notes: "Focus exclusif sur des intérieurs de design, sans personnages. Chaque scène doit être une composition photographique digne d'un magazine de décoration, mettant en valeur l'atmosphère, les matériaux et la lumière.",
        subStyles: [
            { key: "moderne_minimaliste", name: "Moderne Minimaliste" },
            { key: "boheme_chic", name: "Bohème Chic" },
            { key: "elegant_bord_de_mer", name: "Élégant Bord de Mer" },
            { key: "loft_urbain", name: "Loft Urbain" },
            { key: "vintage_subtil", name: "Vintage Subtil" },
            { key: "fusion_contemporaine", name: "Fusion Contemporaine" },
            { key: "nature_lumiere", name: "Nature & Lumière" },
        ]
    },
    {
        name: "Journée d'un mannequin",
        notes: "Capturer différents moments de la vie d'un mannequin, des coulisses au podium et à la maison, pour un rendu authentique et varié.",
        subStyles: [
            { key: "reveil_matinal", name: "Réveil Matinal" },
            { key: "preparation_salle_de_bain", name: "Préparation Salle de Bain" },
            { key: "backstage_fashion_week", name: "Backstage Fashion Week" },
            { key: "podium_fashion_week", name: "Podium Fashion Week" },
            { key: "soiree_cosy_maison", name: "Soirée Cosy Maison" },
        ]
    },
    {
        name: "Punk",
        notes: "Attitudes rebelles, atmosphère urbaine brute.",
        subStyles: [
            { key: "punk_urbain", name: "Punk Urbain" },
            { key: "punk_uk_70s", name: "Punk UK 70s" },
            { key: "punk_80s_glam", name: "Punk 80s Glam" },
            { key: "concert_punk", name: "Concert Punk" },
            { key: "grunge_90s", name: "Grunge 90s" },
            { key: "punk_avant_garde", name: "Punk Avant-Garde" },
        ]
    },
    {
        name: "Gothique",
        notes: "Ambiance sombre et romantique, avec des éléments architecturaux médiévaux, victoriens ou religieux. Mettre l'accent sur un éclairage dramatique et des tenues élaborées.",
        subStyles: [
            { key: "medieval_sombre", name: "Médiéval Sombre" },
            { key: "cimetiere_victorien", name: "Cimetière Victorien" },
            { key: "eglise_gothique", name: "Église Gothique" },
            { key: "portrait_victorien", name: "Portrait Victorien" },
            { key: "gothique_moderne", name: "Gothique Moderne" },
            { key: "gothique_baroque", name: "Gothique Baroque" },
            { key: "dark_romantic", name: "Dark Romantic" },
            { key: "bar_gothique", name: "Bar Gothique" },
        ]
    },
    {
        name: "Viking",
        notes: "Mélanger l'esthétique historique des Vikings. Se concentrer sur l'action cinématique, les paysages spectaculaires et un équipement détaillé et usé.",
        subStyles: [
            { key: "raid_marin", name: "Raid Marin" },
            { key: "crique_tresor", name: "Crique au Trésor" },
            { key: "festin_maison_longue", name: "Festin en Maison Longue" },
            { key: "explorateur_nordique", name: "Explorateur Nordique" },
            { key: "guerrier_mythologique", name: "Guerrier Mythologique" },
            { key: "vie_du_village", name: "Vie du Village" },
            { key: "navigation_drakkar", name: "Navigation en Drakkar" },
        ]
    },
    {
        name: "Bohème",
        notes: "Ambiances cinématiques, accessoires contextuels (franges, motifs floraux, lumière naturelle).",
        subStyles: [
            { key: "boheme_chic", name: "Bohème Chic" },
            { key: "festival_boheme", name: "Festival Bohème" },
            { key: "boheme_urbain", name: "Bohème Urbain" },
            { key: "boheme_vintage", name: "Bohème Vintage" },
            { key: "boheme_nature", name: "Bohème Nature" },
            { key: "boheme_luxe", name: "Bohème Luxe" },
            { key: "boheme_baba_cool", name: "Bohème Baba Cool" },
        ]
    },
    {
        name: "Automobile",
        notes: "Varier les véhicules, les angles de caméra, l'éclairage jour/nuit.",
        subStyles: [
            { key: "course_circuit", name: "Course sur Circuit" },
            { key: "rallye_sauvage", name: "Rallye Sauvage" },
            { key: "classique_vintage", name: "Classique Vintage" },
            { key: "luxe_moderne", name: "Luxe Moderne" },
        ]
    },
    {
        name: "Moto",
        notes: "Varier les types de motos, les angles de caméra dynamiques, l'éclairage jour/nuit.",
        subStyles: [
            { key: "course_circuit", name: "Course sur Circuit" },
            { key: "road_trip_sauvage", name: "Road Trip Sauvage" },
            { key: "classique_vintage", name: "Classique Vintage" },
            { key: "urbain_moderne", name: "Urbain Moderne" },
        ]
    },
    {
        name: "Cinéma & Costumes",
        notes: "Varier par décennies, genres et époques. Chaque sous-style doit être cinématique, avec des accessoires et des décors appropriés.",
        subStyles: [
            { key: "gatsby_1920s", name: "Gatsby Années 1920" },
            { key: "film_noir_1930s_40s", name: "Film Noir Années 1930-40" },
            { key: "espionnage_guerre_froide", name: "Espionnage Guerre Froide" },
            { key: "rococo_baroque", name: "Rococo Baroque" },
            { key: "western", name: "Western" },
            { key: "annees_1950_60", name: "Années 1950-60" },
            { key: "annees_1970_disco", name: "Années 1970 Disco" },
            { key: "annees_1980_flashy", name: "Années 1980 Flashy" },
            { key: "annees_1990_grunge", name: "Années 1990 Grunge" },
            { key: "medieval", name: "Médiéval" },
            { key: "fantasy", name: "Fantasy" },
            { key: "antiquite_rome_grece", name: "Antiquité Rome/Grèce" },
            { key: "samourai_japon_feodal", name: "Samouraï Japon Féodal" },
            { key: "pirates", name: "Pirates" },
            { key: "science_fiction_cyberpunk", name: "Science-Fiction Cyberpunk" },
            { key: "post_apocalyptique", name: "Post-Apocalyptique" },
        ]
    },
    {
        name: "Sportifs",
        notes: "Toujours contextualiser (piscine, ciel, stade), poses dynamiques.",
        subStyles: [
            { key: "natation", name: "Natation" },
            { key: "parachutisme", name: "Parachutisme" },
            { key: "plongee", name: "Plongée" },
            { key: "course", name: "Course à pied" },
            { key: "arts_martiaux", name: "Arts Martiaux" },
            { key: "football", name: "Football" },
            { key: "basketball", name: "Basketball" },
            { key: "tennis", name: "Tennis" },
        ]
    },
    {
        name: "Navy SEAL",
        notes: "Scénarios hyper-réalistes axés sur des missions et des environnements spécifiques des Navy SEALs. Chaque sous-style nécessite un équipement, des décors et un contexte opérationnel précis.",
        subStyles: [
            { key: "insertion_aeroportee", name: "Insertion aéroportée" },
            { key: "debarquement_amphibie", name: "Débarquement amphibie" },
            { key: "plongee_combat", name: "Plongée de combat" },
            { key: "sabotage_portuaire", name: "Sabotage portuaire" },
            { key: "operations_urbaines", name: "Opérations urbaines" },
            { key: "reconnaissance_desert", name: "Reconnaissance désert" },
            { key: "operations_foret_jungle", name: "Opérations forêt/jungle" },
            { key: "operations_neige_montagne", name: "Opérations neige/montagne" },
            { key: "raid_nocturne", name: "Raid nocturne" },
            { key: "tenue_ceremonie", name: "Tenue de cérémonie" },
        ]
    },
    {
        name: "Militaire",
        notes: "",
        subStyles: [
            { key: "vehicule_blinde", name: "Véhicule Blindé" },
            { key: "patrouille", name: "Patrouille" },
            { key: "uniforme_parade", name: "Uniforme de Parade" },
            { key: "base_operationnelle_avancee", name: "Base Opérationnelle Avancée" },
        ]
    },
    {
        name: "Commando",
        notes: "",
        subStyles: [
            { key: "sniper", name: "Sniper" },
            { key: "embarquement_helicoptere", name: "Embarquement Hélicoptère" },
            { key: "infiltration_plage", name: "Infiltration par la Plage" },
        ]
    },
    {
        name: "Neviscile (Unité Spéciale)",
        notes: "",
        subStyles: [
            { key: "plongee_tactique", name: "Plongée Tactique" },
            { key: "saut_haho", name: "Saut HAHO" },
            { key: "sabotage_portuaire", name: "Sabotage portuaire" },
        ]
    },
];