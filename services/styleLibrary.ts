/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * This file contains the master configuration for all creative styles available in the application.
 * It follows a structured format to define styles, their available sub-styles (variations),
 * and creative notes to guide the AI prompt generation.
 */
export const STYLE_GUIDE = {
  "styles": {
    "Portrait_Glamour": {
      "substyles": [
        "studio_classique",
        "festival_de_cannes",
        "cinematique_noir",
        "luxe_exterieur",
        "hotel_glamour",
        "soiree_glamour",
        "plage_glamour"
      ],
      "notes": "Varier les coiffures, les couleurs de robes, les accessoires discrets, éviter la répétition."
    },
    "Mode_Haute_Couture": {
      "substyles": [
        "defile_parisien",
        "studio_editorial",
        "couture_exterieure"
      ],
      "notes": "Alterner les couleurs dominantes, les positions variées."
    },
    "Couverture_Vogue_Editoriale": {
      "substyles": [
        "studio_magazine",
        "urbain_chic",
        "mode_conceptuelle"
      ],
      "notes": "Mettre l'accent sur des compositions éditoriales dignes de Vogue, avec une forte direction artistique."
    },
    "Journee_dun_mannequin": {
      "substyles": [
        "reveil_matinal",
        "preparation_salle_de_bain",
        "backstage_fashion_week",
        "podium_fashion_week",
        "soiree_cosy_maison"
      ],
      "notes": "Capturer différents moments de la vie d'un mannequin, des coulisses au podium et à la maison, pour un rendu authentique et varié."
    },
    "Couverture_Vogue": {
      "substyles": [
        "noir_blanc_iconique",
        "glamour_dore",
        "vogue_rue",
        "revival_retro"
      ],
      "notes": "Toujours inclure une typographie réaliste, des angles variés."
    },
    "Couverture_Elle": {
      "substyles": [
        "plage_ete",
        "chic_decontracte",
        "pastel_romantique",
        "look_fete"
      ],
      "notes": "Ambiance lifestyle, sourires, looks accessibles."
    },
    "Couverture_Elle_Deco": {
      "substyles": [
        "moderne_minimaliste",
        "boheme_chic",
        "elegance_bord_de_mer",
        "loft_urbain"
      ],
      "notes": "Décors intérieurs design, mannequins intégrés au décor."
    },
    "Editorial_Chic": {
      "substyles": [
        "storytelling_cinematique",
        "art_conceptuel",
        "chic_puissant"
      ],
      "notes": "Accessoires stylisés, éclairages expérimentaux."
    },
    "Punk_Grunge": {
      "substyles": [
        "punk_urbain",
        "grunge_90s",
        "glam_punk"
      ],
      "notes": "Attitudes rebelles, atmosphère urbaine brute."
    },
    "Gothique": {
      "substyles": [
        "medieval_sombre",
        "cimetiere_victorien",
        "eglise_gothique"
      ],
      "notes": "Ambiance sombre et romantique, avec des éléments architecturaux médiévaux, victoriens ou religieux. Mettre l'accent sur un éclairage dramatique et des tenues élaborées."
    },
    "Boheme_Viking": {
      "substyles": [
        "boheme_chic_viking",
        "hall_viking",
        "mer_viking"
      ],
      "notes": "Ambiances cinématiques, accessoires contextuels (torches, capes, bateaux)."
    },
    "Automobile_Moto": {
      "substyles": [
        "rallye_raid",
        "24h_mans",
        "paddock_formule1",
        "moto_gp",
        "motocross",
        "biker"
      ],
      "notes": "Changer les véhicules, les angles de caméra, l'éclairage jour/nuit."
    },
    "Photo_Mode_Minimaliste": {
      "substyles": [
        "studio_blanc",
        "architecture_moderne",
        "noir_blanc_dramatique",
        "couleur_pastel",
        "pop_art_vibrant"
      ],
      "notes": "Variations minimalisme + pop-art, accessoires simples, fonds graphiques."
    },
    "Photo": {
      "substyles": [
        "portrait_studio",
        "lifestyle_exterieur",
        "photographie_voyage",
        "photographie_rue",
        "corporate_affaires",
        "nb_dramatique",
        "sepia_vintage",
        "double_exposition_artistique",
        "sport_action",
        "portrait_environnemental",
        "lumiere_golden_hour",
        "lumiere_blue_hour",
        "haute_vitesse_eclaboussure",
        "lumiere_naturelle_fenetre"
      ],
      "notes": "Capturer des moments réalistes, avec une lumière naturelle et des décors authentiques."
    },
    "Sportifs": {
      "substyles": [
        "natation",
        "parachutisme",
        "plongee",
        "course",
        "arts_martiaux",
        "football",
        "basketball",
        "tennis"
      ],
      "notes": "Toujours contextualiser (piscine, ciel, stade), poses dynamiques."
    },
    "Cinema_Costumes": {
      "substyles": [
        "gatsby_1920s",
        "film_noir_1930s_40s",
        "espionnage_guerre_froide",
        "rococo_baroque",
        "western",
        "annees_1950_60",
        "annees_1970_disco",
        "annees_1980_flashy",
        "annees_1990_grunge",
        "medieval",
        "fantasy",
        "antiquite_rome_grece",
        "samourai_japon_feodal",
        "pirates",
        "science_fiction_cyberpunk",
        "post_apocalyptique"
      ],
      "notes": "Varier par décennies, genres et époques. Chaque sous-style doit être cinématique, avec des accessoires et des décors appropriés."
    },
    "Viking_Pirate": {
      "substyles": [
        "raid_marin_viking",
        "crique_tresor_viking",
        "festin_maison_longue_viking",
        "explorateur_nordique"
      ],
      "notes": "Mélanger l'esthétique historique des Vikings avec les tropes classiques des pirates. Se concentrer sur l'action cinématique, les paysages spectaculaires et un équipement détaillé et usé."
    },
    "Navy_SEAL": {
      "substyles": [
        "insertion_aeroportee",
        "debarquement_amphibie",
        "plongee_combat",
        "sabotage_portuaire",
        "operations_urbaines",
        "reconnaissance_desert",
        "operations_foret_jungle",
        "operations_neige_montagne",
        "raid_nocturne",
        "tenue_ceremonie"
      ],
      "notes": "Scénarios hyper-réalistes axés sur des missions et des environnements spécifiques des Navy SEALs. Chaque sous-style nécessite un équipement, des décors et un contexte opérationnel précis."
    }
  },
  "usage": "visuels_scenographiques",
  "instruction": "Chaque style et sous-style doit générer des rendus cinématiques ou photographiques, hyper-réalistes, avec des variations systématiques pour éviter la redondance. Respecter le contexte visuel et les accessoires cohérents."
};