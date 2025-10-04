/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Type Definitions for Style Configuration ---

/** Represents a single, selectable sub-style. */
export interface SubStyle {
    key: string;
    name?: string; // Proper nouns that don't need translation can be hardcoded here
}

/** Represents a group of sub-styles, used for creating <optgroup> in dropdowns. */
export interface SubStyleGroup {
    nameKey: string;
    subStyles: SubStyle[];
}

/** Represents a top-level style category. Its sub-styles can be a flat list or a list of groups. */
export interface Style {
    key: string;
    notesKey: string;
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
// The `name` property is now derived from translation keys like `style_photos` or `substyle_portrait_studio`.
// Proper nouns (like photographer names) that don't need translation can still use the `name` property.

export const STYLES_CONFIG: Style[] = [
    {
        key: "photographers",
        notesKey: "photographers_notes",
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
            "Tom Ford",
            "Marc Hoppe",
            "Robert Doisneau",
            "Henri Cartier-Bresson"
        ].map(name => ({ name, key: toKey(name) }))
    },
    {
        key: "photos",
        notesKey: "photos_notes",
        subStyles: [
            { key: "portrait_studio" },
            { key: "lifestyle_exterieur" },
            { key: "photographie_voyage" },
            { key: "photographie_rue" },
            { key: "corporate_affaires" },
            { key: "nb_dramatique" },
            { key: "sepia_vintage" },
            { key: "double_exposition_artistique" },
            { key: "sport_action" },
            { key: "portrait_environnemental" },
            { key: "lumiere_golden_hour" },
            { key: "lumiere_blue_hour" },
            { key: "haute_vitesse_eclaboussure" },
            { key: "lumiere_naturelle_fenetre" },
        ]
    },
    {
        key: "portrait_glamour",
        notesKey: "portrait_glamour_notes",
        subStyles: [
            { key: "studio_classique" },
            { key: "festival_de_cannes" },
            { key: "cinematique_noir" },
            { key: "luxe_exterieur" },
            { key: "hotel_glamour" },
            { key: "soiree_glamour" },
            { key: "plage_glamour" },
        ]
    },
     {
        key: "portrait_minimaliste",
        notesKey: "portrait_minimaliste_notes",
        subStyles: [
            { key: "studio_blanc" },
            { key: "architecture_moderne" },
            { key: "noir_blanc_dramatique" },
            { key: "couleur_pastel" },
            { key: "pop_art_vibrant" },
        ]
    },
    {
        key: "luxe_evolupte",
        notesKey: "luxe_evolupte_notes",
        subStyles: [
            {
                nameKey: 'group_luxe_scenarios',
                subStyles: [
                    { key: "luxe_boutique" },
                    { key: "luxe_rue" },
                    { key: "luxe_hotel" },
                    { key: "luxe_studio" },
                    { key: "luxe_soiree" },
                ]
            },
            {
                nameKey: 'group_maisons_francaises',
                subStyles: [
                    { key: 'luxe_dior', name: "Dior Éternel" },
                    { key: 'luxe_chanel', name: "Chanel Intemporel" },
                    { key: 'luxe_louis_vuitton', name: "Louis Vuitton Voyage" },
                    { key: 'luxe_cartier', name: "Cartier Éclat" },
                    { key: 'luxe_hermes', name: "Hermès Élégance" }
                ]
            },
            {
                nameKey: 'group_maisons_suisses',
                subStyles: [
                    { key: 'luxe_rolex', name: "Rolex Précision" },
                    { key: 'luxe_patek_philippe', name: "Patek Héritage" },
                    { key: 'luxe_audemars', name: "Audemars Piguet Modernité" },
                    { key: 'luxe_jaeger', name: "Jaeger LeCoultre Épure" }
                ]
            },
            {
                nameKey: 'group_maisons_italiennes',
                subStyles: [
                    { key: 'luxe_gucci', name: "Gucci Attitude" },
                    { key: 'luxe_prada', name: "Prada Architecture" },
                    { key: 'luxe_versace', name: "Versace Glam" },
                    { key: 'luxe_fendi', name: "Fendi Contemporain" }
                ]
            },
            {
                nameKey: 'group_maisons_internationales',
                subStyles: [
                    { key: 'luxe_balmain', name: "Balmain Force" },
                    { key: 'luxe_bulgari', name: "Bulgari Lueur" },
                    { key: 'luxe_tiffany', name: "Tiffany Pureté" },
                    { key: 'luxe_moncler', name: "Moncler Élément" }
                ]
            }
        ]
    },
    {
        key: "mode_haute_couture",
        notesKey: "mode_haute_couture_notes",
        subStyles: [
            { key: "defile_parisien" },
            { key: "studio_editorial" },
            { key: "couture_exterieure" },
        ]
    },
    {
        key: "couverture_vogue",
        notesKey: "couverture_vogue_notes",
        subStyles: [
            { key: "noir_blanc_iconique" },
            { key: "glamour_dore" },
            { key: "vogue_de_rue" },
            { key: "revival_retro" },
            { key: "studio_luxe_minimaliste" },
            { key: "avant_garde_conceptuel" },
            { key: "podium_couture" },
        ]
    },
    {
        key: "couverture_elle",
        notesKey: "couverture_elle_notes",
        subStyles: [
            { key: "plage_ete" },
            { key: "chic_decontracte" },
            { key: "pastel_romantique" },
            { key: "look_fete" },
            { key: "mode_lifestyle_urbain" },
            { key: "cocooning_interieur" },
            { key: "sport_chic" },
        ]
    },
    {
        key: "couverture_elle_deco",
        notesKey: "couverture_elle_deco_notes",
        subStyles: [
            { key: "moderne_minimaliste" },
            { key: "boheme_chic" },
            { key: "elegant_bord_de_mer" },
            { key: "loft_urbain" },
            { key: "vintage_subtil" },
            { key: "fusion_contemporaine" },
            { key: "nature_lumiere" },
        ]
    },
    {
        key: "journee_dun_mannequin",
        notesKey: "journee_dun_mannequin_notes",
        subStyles: [
            { key: "reveil_matinal" },
            { key: "preparation_salle_de_bain" },
            { key: "backstage_fashion_week" },
            { key: "podium_fashion_week" },
            { key: "soiree_cosy_maison" },
        ]
    },
    {
        key: "costume_de_film",
        notesKey: "costume_de_film_notes",
        subStyles: [
            {
                nameKey: "group_prehistoire",
                subStyles: ["tribus_primitives", "peaux_de_betes", "peintures_corporelles", "armes_rudimentaires"].map(key => ({ key }))
            },
            {
                nameKey: "group_antiquite",
                subStyles: ["egypte_antique", "grece_antique", "rome_antique", "empire_perse_babylonien"].map(key => ({ key }))
            },
            {
                nameKey: "group_moyen_age",
                subStyles: ["chevaliers_armures", "paysans_artisans", "noblesse_medievale", "vie_religieuse"].map(key => ({ key }))
            },
            {
                nameKey: "group_renaissance_baroque",
                subStyles: ["renaissance_italienne", "cour_francaise", "rococo_lumieres", "costumes_elisabethains"].map(key => ({ key }))
            },
            {
                nameKey: "group_xixe_siecle",
                subStyles: ["empire_napoleonien", "epoque_victorienne", "belle_epoque_1900", "costumes_militaires_xixe"].map(key => ({ key }))
            },
            {
                nameKey: "group_xxe_siecle",
                subStyles: ["annees_20_gatsby", "annees_30_40_films_noirs", "annees_50_60_rocknroll", "annees_70_hippie_disco", "annees_80_flashy_pop", "annees_90_grunge"].map(key => ({ key }))
            },
            {
                nameKey: "group_cultures_du_monde",
                subStyles: ["samourai_japon_feodal", "chine_imperiale", "epopee_indienne", "civilisations_amerindiennes", "costumes_africains_traditionnels"].map(key => ({ key }))
            },
            {
                nameKey: "group_genres_de_cinema",
                subStyles: ["western", "film_espionnage", "fantaisie_medievale", "pirates_corsaires", "science_fiction_retro", "post_apocalyptique", "super_heros_modernes"].map(key => ({ key }))
            }
        ]
    },
    {
        key: "punk",
        notesKey: "punk_notes",
        subStyles: [
            { key: "punk_urbain" },
            { key: "punk_uk_70s" },
            { key: "punk_80s_glam" },
            { key: "concert_punk" },
            { key: "grunge_90s" },
            { key: "punk_avant_garde" },
        ]
    },
    {
        key: "gothique",
        notesKey: "gothique_notes",
        subStyles: [
            { key: "medieval_sombre" },
            { key: "cimetiere_victorien" },
            { key: "eglise_gothique" },
            { key: "portrait_victorien" },
            { key: "gothique_moderne" },
            { key: "gothique_baroque" },
            { key: "dark_romantic" },
            { key: "bar_gothique" },
        ]
    },
    {
        key: "viking",
        notesKey: "viking_notes",
        subStyles: [
            { key: "raid_marin" },
            { key: "crique_tresor" },
            { key: "festin_maison_longue" },
            { key: "explorateur_nordique" },
            { key: "guerrier_mythologique" },
            { key: "vie_du_village" },
            { key: "navigation_drakkar" },
        ]
    },
    {
        key: "boheme",
        notesKey: "boheme_notes",
        subStyles: [
            { key: "boheme_chic" },
            { key: "festival_boheme" },
            { key: "boheme_urbain" },
            { key: "boheme_vintage" },
            { key: "boheme_nature" },
            { key: "boheme_luxe" },
            { key: "boheme_baba_cool" },
        ]
    },
    {
        key: "automobile",
        notesKey: "automobile_notes",
        subStyles: [
            { key: "course_circuit" },
            { key: "rallye_raid" },
            { key: "classic_vintage" },
            { key: "luxe_moderne" },
            { key: "stock_car" },
            { key: "drag_race" },
            { key: "tuning_street" },
        ]
    },
    {
        key: "moto",
        notesKey: "moto_notes",
        subStyles: [
            { key: "moto_piste" },
            { key: "motocross" },
            { key: "rallye_raid_moto" },
            { key: "biker_harley" },
            { key: "drag_race_moto" },
            { key: "cafe_racer" },
            { key: "enduro" },
            { key: "trial" },
        ]
    },
    {
        key: "sportif",
        notesKey: "sportif_notes",
        subStyles: [
            {
                nameKey: "group_natation",
                subStyles: ["course_en_piscine", "natation_synchronisee", "plongeon", "eau_libre"].map(key => ({ key }))
            },
            {
                nameKey: "group_parachutisme",
                subStyles: [
                    "preparation_au_sol",
                    "embarquement_avion",
                    "dans_avion",
                    "pret_a_sauter",
                    "saut_en_altitude",
                    "vol_en_chute_libre",
                    "ouverture_parachute",
                    "approche_atterrissage",
                    "ramassage_materiel"
                ].map(key => ({ key }))
            },
            {
                nameKey: "group_plongee",
                subStyles: ["plongee_bouteille", "apnee", "plongee_combinaison", "plongee_speleologique"].map(key => ({ key }))
            },
            {
                nameKey: "group_course_a_pied",
                subStyles: ["sprint", "marathon", "trail", "athletisme_piste"].map(key => ({ key }))
            },
            {
                nameKey: "group_arts_martiaux",
                subStyles: ["karate", "judo", "taekwondo", "mma", "boxe_anglaise", "kick_boxing"].map(key => ({ key }))
            },
            {
                nameKey: "group_football",
                subStyles: ["match_action", "entrainement", "celebration_but", "gardien_arret"].map(key => ({ key }))
            },
            {
                nameKey: "group_basketball",
                subStyles: ["match_nba", "streetball_urbain", "dunk_spectaculaire", "entrainement_intensif"].map(key => ({ key }))
            },
            {
                nameKey: "group_tennis",
                subStyles: ["match_tournoi", "service_puissant", "echange_fond_court", "victoire_celebree"].map(key => ({ key }))
            }
        ]
    },
    {
        key: "navy_seal",
        notesKey: "navy_seal_notes",
        subStyles: [
            { key: "insertion_aeroportee" },
            { key: "debarquement_amphibie" },
            { key: "plongee_combat" },
            { key: "sabotage_portuaire" },
            { key: "operations_urbaines" },
            { key: "reconnaissance_desert" },
            { key: "operations_foret_jungle" },
            { key: "operations_neige_montagne" },
            { key: "raid_nocturne" },
            { key: "tenue_ceremonie" },
        ]
    },
    {
        key: "militaire",
        notesKey: "militaire_notes",
        subStyles: [
            { key: "vehicule_blinde" },
            { key: "patrouille" },
            { key: "uniforme_parade" },
            { key: "base_operationnelle_avancee" },
            { key: "salle_de_briefing" },
            { key: "checkpoint_sous_tension" },
            { key: "feu_d_artillerie_nocturne" },
            { key: "pilote_de_chasse_pre_vol" },
            { key: "medecin_de_combat_medevac" },
            { key: "combat_urbain_cqb" },
            { key: "garde_d_honneur_ceremoniale" },
            { key: "vie_en_caserne" },
            { key: "maintenance_de_blinde_hangar" },
            { key: "operations_en_milieu_arctique" },
            { key: "guerre_en_jungle" },
            { key: "operateur_de_drone_gcs" },
        ]
    },
    {
        key: "commando",
        notesKey: "commando_notes",
        subStyles: [
            { key: "sniper" },
            { key: "embarquement_helicoptere" },
            { key: "infiltration_plage" },
            { key: "plongee_de_combat" },
            { key: "raid_en_zodiac_nocturne" },
            { key: "liberation_d_otage_cqb" },
            { key: "saut_operationnel_halo" },
            { key: "extraction_vip" },
            { key: "sabotage_d_infrastructure" },
            { key: "poste_d_observation" },
            { key: "assaut_vertical_rappel" },
            { key: "guerre_en_tunnel" },
            { key: "capture_de_cible_hvt" },
            { key: "demolition_sous_marine" },
            { key: "preparation_clandestine" },
        ]
    },
    {
        key: "pilote_de_chasse",
        notesKey: "pilote_de_chasse_notes",
        subStyles: [
            "preparation_pre_vol",
            "decollage_porte_avions",
            "dogfight",
            "vol_en_formation",
            "bombardement_precision",
            "retour_mission",
            "vol_tres_basse_altitude",
            "ravitaillement_en_vol",
            "ejection_urgence",
            "portrait_cockpit",
            "vol_acrobatique",
            "maintenance_hangar",
        ].map(name => ({ key: toKey(name) }))
    },
];