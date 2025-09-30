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
        "classic_studio",
        "red_carpet",
        "cinematic_noir",
        "outdoor_luxe"
      ],
      "notes": "Varier coiffures, couleurs de robes, accessoires discrets, éviter répétitions."
    },
    "Mode_Haute_Couture": {
      "substyles": [
        "avant_garde",
        "runway_show",
        "futuristic",
        "retro_couture"
      ],
      "notes": "Alterner couleurs dominantes, positions variées."
    },
    "Couverture_Vogue": {
      "substyles": [
        "black_white_iconic",
        "golden_glamour",
        "street_vogue",
        "retro_revival"
      ],
      "notes": "Toujours inclure typographie réaliste, angles variés."
    },
    "Couverture_Elle": {
      "substyles": [
        "summer_beach",
        "casual_chic",
        "romantic_pastel",
        "party_look"
      ],
      "notes": "Ambiance lifestyle, sourires, looks accessibles."
    },
    "Couverture_Elle_Deco": {
      "substyles": [
        "minimalist_modern",
        "boho_chic",
        "seaside_elegance",
        "urban_loft"
      ],
      "notes": "Décors intérieurs design, mannequins intégrés au décor."
    },
    "Editorial_Chic": {
      "substyles": [
        "cinematic_storytelling",
        "conceptual_art",
        "power_chic"
      ],
      "notes": "Accessoires stylisés, lumières expérimentales."
    },
    "Punk_Grunge": {
      "substyles": [
        "urban_punk",
        "grunge_90s",
        "glam_punk"
      ],
      "notes": "Attitudes rebelles, ambiance urbaine brute."
    },
    "Boheme_Viking": {
      "substyles": [
        "boheme_chic",
        "viking_hall",
        "viking_sea"
      ],
      "notes": "Ambiances cinématiques, accessoires contextuels (torches, capes, bateaux)."
    },
    "Automobile_Moto": {
      "substyles": [
        "rally_raid",
        "24h_mans",
        "formula1_paddock",
        "moto_gp",
        "motocross",
        "biker"
      ],
      "notes": "Changer véhicules, angles de vue, lumières jour/nuit."
    },
    "Photo_Mode_Minimaliste": {
      "substyles": [
        "studio_blanc",
        "architecture_moderne",
        "noir_blanc_dramatique",
        "couleur_pastel",
        "pop_art_vibrant"
      ],
      "notes": "Minimalisme + variantes pop-art, accessoires simples, fonds graphiques."
    },
    "Photo": {
      "substyles": [
        "studio_portrait",
        "outdoor_lifestyle",
        "travel_photography",
        "street_photography",
        "corporate_business",
        "dramatic_bw",
        "vintage_sepia",
        "double_exposure",
        "action_sport",
        "environmental_portrait",
        "golden_hour",
        "blue_hour",
        "high_speed_splash",
        "natural_window_light"
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
        "espionnage_cold_war",
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
      "notes": "Varier par décennies, genres et époques. Chaque sous-style doit être cinématographique, avec accessoires et décors adaptés."
    },
    "Navy_SEAL": {
      "substyles": [
        "Airborne insertion",
        "Amphibious landing",
        "Combat diving",
        "Port sabotage",
        "Urban ops",
        "Desert recon",
        "Forest / jungle ops",
        "Snow / mountain ops",
        "Night raid",
        "Ceremonial dress"
      ],
      "notes": "Hyper-realistic scenarios focusing on specific Navy SEAL missions and environments. Each sub-style requires accurate gear, settings, and operational context."
    }
  },
  "usage": "scenographic_visuals",
  "instruction": "Chaque style et sous-style doit générer des rendus cinématographiques ou photographiques, hyper-réalistes, avec variations systématiques pour éviter redondance. Respecter contexte visuel et accessoire cohérent."
};