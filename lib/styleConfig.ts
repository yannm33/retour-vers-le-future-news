/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Type Definitions for Style Configuration ---

/** Represents a single, selectable sub-style. */
export interface SubStyle {
    key: string;
    name: string;
}

/** Represents a group of sub-styles, used for creating <optgroup> in dropdowns. */
export interface SubStyleGroup {
    name: string;
    subStyles: SubStyle[];
}

/** Represents a top-level style category. Its sub-styles can be a flat list or a list of groups. */
export interface Style {
    name: string;
    notes: string;
    subStyles: SubStyle[] | SubStyleGroup[];
}

// --- Helper Function ---

/**
 * Converts a display name into a URL-friendly key.
 * e.g., "Grèce antique" -> "grece_antique"
 */
const toKey = (name: string): string => {
    return name
        .toLowerCase()
        .normalize("NFD") // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric chars
        .trim()
        .replace(/\s+/g, "_");
};


// --- Master Style Configuration ---

export const STYLES_CONFIG: Style[] = [
    {
        name: "Photographes",
        notes: "S'inspirer du style visuel, de l'éclairage et de la composition des grands maîtres de la photographie.",
        subStyles: [
            "Peter Lindbergh",
            "Richard Avedon",
            "Helmut Newton",
            "Annie Leibovitz",
            "Edward Steichen",
            "Nick Knight",
            "Mario Testino",
            "Steven Meisel",
            "Patrick Demarchelier",
            "Philippe Robert",
            "Russell James",
            "Nadine Ijewere",
            "Nadia Lee Cohen",
            "Studio Harcourt",
            "Jocelyn Lee",
            "Robert Farber",
            "Pat Brassington",
            "Rankin",
            "Bettina Rheims",
            "Arthur Tress",
            "Tom Ford",
            "Marc Hoppe"
        ].map(name => ({ name, key: toKey(name) }))
    },
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
        name: "Costume de Film",
        notes: "Création de costumes fidèles à travers les âges et les genres pour des productions cinématographiques.",
        subStyles: [
            {
                name: "Préhistoire",
                subStyles: ["Tribus primitives", "Peaux de bêtes", "Peintures corporelles", "Armes rudimentaires"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Antiquité",
                subStyles: ["Égypte antique (pharaons, prêtres)", "Grèce antique (citoyens, hoplites)", "Rome antique (gladiateurs, sénateurs)", "Empire perse & babylonien"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Moyen-Âge",
                subStyles: ["Chevaliers & armures", "Paysans & artisans", "Noblesse médiévale", "Vie religieuse (moines, prêtres)"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Renaissance & Baroque",
                subStyles: ["Renaissance italienne", "Cour française (Henri IV, Louis XIV)", "Rococo & Lumières", "Costumes élisabéthains"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "XIXe siècle",
                subStyles: ["Empire Napoléonien", "Époque Victorienne", "Belle Époque 1900", "Costumes militaires XIXe"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "XXe siècle",
                subStyles: ["Années 20 Gatsby & Prohibition", "Années 30-40 Films noirs & Aviation", "Années 50-60 Rock’n’roll", "Années 70 Hippie & Disco", "Années 80 Flashy & Pop", "Années 90 Grunge & Alternatif"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Cultures du monde",
                subStyles: ["Samouraï Japon féodal", "Chine impériale", "Épopée indienne", "Civilisations amérindiennes", "Costumes africains traditionnels"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Genres de cinéma",
                subStyles: ["Western", "Film d’espionnage", "Fantaisie médiévale", "Pirates & Corsaires", "Science-fiction rétro", "Post-apocalyptique", "Super-héros modernes"].map(name => ({ name, key: toKey(name) }))
            }
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
            { key: "rallye_raid", name: "Rallye Raid" },
            { key: "classic_vintage", name: "Classic Vintage" },
            { key: "luxe_moderne", name: "Luxe Moderne" },
            { key: "stock_car", name: "Stock Car" },
            { key: "drag_race", name: "Drag Race" },
            { key: "tuning_street", name: "Tuning Street" },
        ]
    },
    {
        name: "Moto",
        notes: "Varier les types de motos, les angles de caméra dynamiques, l'éclairage jour/nuit.",
        subStyles: [
            { key: "moto_piste", name: "Moto sur Piste" },
            { key: "motocross", name: "Motocross" },
            { key: "rallye_raid_moto", name: "Rallye Raid" },
            { key: "biker_harley", name: "Biker / Harley" },
            { key: "drag_race_moto", name: "Drag Race" },
            { key: "cafe_racer", name: "Café Racer" },
            { key: "enduro", name: "Enduro" },
            { key: "trial", name: "Trial" },
        ]
    },
    {
        name: "Sportif",
        notes: "Toujours contextualiser (piscine, ciel, stade), poses dynamiques.",
        subStyles: [
            {
                name: "Natation",
                subStyles: ["Course en piscine", "Natation synchronisée", "Plongeon", "Eau libre"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Parachutisme",
                subStyles: [
                    "Préparation au sol (équipement, pliage parachute)",
                    "Embarquement dans l'avion",
                    "Dans l'avion (en attente, visage sous tension)",
                    "Au bord de la porte, prêt à sauter",
                    "Saut en altitude (visage déformé par l'air, lunettes, combinaison)",
                    "Vol en chute libre",
                    "Ouverture du parachute",
                    "Approche et atterrissage",
                    "Ramassage et pliage du matériel"
                ].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Plongée",
                subStyles: ["Plongée bouteille loisir", "Apnée", "Plongée sous-marine avec combinaison complète", "Plongée spéléologique"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Course à pied",
                subStyles: ["Sprint", "Marathon", "Trail", "Athlétisme (piste)"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Arts martiaux",
                subStyles: ["Karaté", "Judo", "Taekwondo", "MMA", "Boxe anglaise", "Kick-boxing"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Football",
                subStyles: ["Match en action", "Entraînement", "Célébration de but", "Gardien en arrêt"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Basketball",
                subStyles: ["Match NBA", "Streetball urbain", "Dunk spectaculaire", "Entraînement intensif"].map(name => ({ name, key: toKey(name) }))
            },
            {
                name: "Tennis",
                subStyles: ["Match en tournoi", "Service puissant", "Échange en fond de court", "Victoire célébrée"].map(name => ({ name, key: toKey(name) }))
            }
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
        notes: "Scénarios militaires conventionnels, mettant l'accent sur l'équipement, les véhicules et les uniformes.",
        subStyles: [
            { key: "vehicule_blinde", name: "Véhicule Blindé" },
            { key: "patrouille", name: "Patrouille" },
            { key: "uniforme_parade", name: "Uniforme de Parade" },
            { key: "base_operationnelle_avancee", name: "Base Opérationnelle Avancée" },
            { key: "salle_de_briefing", name: "Salle de Briefing (Avant-Mission)" },
            { key: "checkpoint_sous_tension", name: "Checkpoint sous Tension" },
            { key: "feu_d_artillerie_nocturne", name: "Feu d'Artillerie Nocturne" },
            { key: "pilote_de_chasse_pre_vol", name: "Pilote de Chasse (Pré-vol)" },
            { key: "medecin_de_combat_medevac", name: "Médecin de Combat (MEDEVAC)" },
            { key: "combat_urbain_cqb", name: "Combat Urbain (CQB)" },
            { key: "garde_d_honneur_ceremoniale", name: "Garde d'Honneur Cérémoniale" },
            { key: "vie_en_caserne", name: "Vie en Caserne" },
            { key: "maintenance_de_blinde_hangar", name: "Maintenance de Blindé (Hangar)" },
            { key: "operations_en_milieu_arctique", name: "Opérations en Milieu Arctique" },
            { key: "guerre_en_jungle", name: "Guerre en Jungle" },
            { key: "operateur_de_drone_gcs", name: "Opérateur de Drone (GCS)" },
        ]
    },
    {
        name: "Commando",
        notes: "Missions d'opérations spéciales, mettant l'accent sur la furtivité, l'équipement spécialisé et les environnements tactiques.",
        subStyles: [
            { key: "sniper", name: "Sniper" },
            { key: "embarquement_helicoptere", name: "Embarquement Hélicoptère" },
            { key: "infiltration_plage", name: "Infiltration par la Plage" },
            { key: "plongee_de_combat", name: "Plongée de Combat" },
            { key: "raid_en_zodiac_nocturne", name: "Raid en Zodiac Nocturne" },
            { key: "liberation_d_otage_cqb", name: "Libération d'Otage (CQB)" },
            { key: "saut_operationnel_halo", name: "Saut Opérationnel (HALO)" },
            { key: "extraction_vip", name: "Extraction VIP" },
            { key: "sabotage_d_infrastructure", name: "Sabotage d'Infrastructure" },
            { key: "poste_d_observation", name: "Poste d'Observation" },
            { key: "assaut_vertical_rappel", name: "Assaut Vertical (Rappel)" },
            { key: "guerre_en_tunnel", name: "Guerre en Tunnel" },
            { key: "capture_de_cible_hvt", name: "Capture de Cible (HVT)" },
            { key: "demolition_sous_marine", name: "Démolition Sous-Marine" },
            { key: "preparation_clandestine", name: "Préparation Clandestine" },
        ]
    },
    {
        name: "Pilote de Chasse",
        notes: "Scénarios centrés sur les missions et la vie des pilotes de chasse modernes, mettant l'accent sur la technologie, la vitesse et l'action.",
        subStyles: [
            "Préparation Pré-Vol (Tarmac)",
            "Décollage Porte-Avions",
            "Dogfight (Combat Aérien)",
            "Vol en Formation",
            "Bombardement de Précision",
            "Retour de Mission (Débriefing)",
            "Vol Très Basse Altitude",
            "Ravitaillement en Vol",
            "Éjection d'Urgence",
            "Portrait en Cockpit",
            "Vol Acrobatique (Airshow)",
            "Maintenance (Hangar)",
        ].map(name => ({ name, key: toKey(name) }))
    },
];