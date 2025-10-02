/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { STYLE_GUIDE } from '../services/styleLibrary';

// --- Types ---
export type ColorMode = 'Couleur' | 'N&B';
export type Upscale = 'Standard' | '4K' | '6K' | '8K';
export type RenderQuality = 'APERÇU (RAPIDE)' | 'HD (QUALITÉ)' | 'UHD (RÉALISME)';


// --- I18n Translations ---
export const translations = {
    title: "Retour vers le futur",
    subtitle: "Aperçu cinématique et photographique",
    downloadAlbum: "TOUT TÉLÉCHARGER",
    loadPortrait: "Portrait",
    generating: "GÉNÉRATION...",
    generate: "GÉNÉRER",
    style: "Style",
    substyle: "Sous-style",
    chooseSubstyle: "Choisir un sous-style",
    customPromptTitle: "Votre prompt personnalisé",
    customPromptPlaceholder: "Collez votre prompt ici (scène, style, lumière...)",
    uploadPlaceholder: "Chargez un portrait pour commencer",
    renderQuality: "Qualité de rendu",
    preview: "APERÇU (RAPIDE)",
    hd: "HD (QUALITÉ)",
    uhd: "UHD (RÉALISME)",
    color: "COULEUR",
    bw: "N&B",
    upscale: "Upscale",
    photoSettings: "Réglages Photographiques",
    focal: "FOCALE",
    aperture: "OUVERTURE",
    speed: "VITESSE",
    hairColor: "Couleur des cheveux",
    expression: "Expression",
    glasses: "Lunettes",
    framing: "Cadrage",
    luts: "LUTs Cinéma",
    dirt: "Salissure",
    photoGrain: "Grain Photo",
    sweat: "Sueur",
    speedEffect: "Effet de vitesse",
    signature: "Signature personnelle",
    lockedOn: "ON - VERROUILLÉ",
    off: "OFF",
    formatSize: "Format & Taille",
    portrait: "Portrait",
    square: "Carré",
    landscape: "Paysage",
    download: "TÉLÉCHARGER",
    regenerate: "Régénérer",
    quantity: "QTÉ"
};

// --- Magazine Cover Prompt Details ---
export const MAGAZINE_PROMPT_DETAILS = {
    'Couverture Vogue': {
        masthead: 'VOGUE',
        description: 'Le style doit être haute-couture, artistique et iconique. Pensez à des compositions puissantes, élégantes et souvent minimalistes. L\'éclairage doit être dramatique et cinématique. La personne doit avoir une expression confiante, haute-couture, et être impeccablement stylée.'
    },
    'Couverture Elle': {
        masthead: 'ELLE',
        description: 'Le style doit être frais, vibrant et accessible. L\'ambiance est joyeuse, moderne et facile à s\'identifier. Utilisez un éclairage lumineux, naturel ou de studio énergique. La personne doit paraître amicale et stylée, souvent avec un sourire ou une pose détendue et confiante.'
    },
    'Couverture Elle Deco': {
        masthead: 'ELLE DECORATION',
        description: "L'accent est mis sur des intérieurs de luxe, des designs sophistiqués et un style de vie élégant. Les scènes doivent être purement décoratives, sans personne visible, mettant en valeur l'architecture, le mobilier et l'atmosphère."
    }
};
export const MAGAZINE_STYLES = Object.keys(MAGAZINE_PROMPT_DETAILS);


// --- Unified Style Configuration ---
const SPECIALIZED_PROMPT_STYLES = {
    'Militaire': { substyles: ['vehicule_blinde', 'patrouille', 'uniforme_parade', 'base_operationnelle_avancee'], notes: '' },
    'Commando': { substyles: ['sniper', 'embarquement_helicoptere', 'infiltration_plage'], notes: '' },
    'Neviscile (Unité Spéciale)': { substyles: ['plongee_tactique', 'saut_haho', 'sabotage_portuaire'], notes: '' }
};

const formattedStyleGuide = Object.entries(STYLE_GUIDE.styles).reduce((acc, [key, value]) => {
    // This formatting is a bit brittle, but works for the current keys.
    const formattedKey = key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    acc[formattedKey] = value;
    return acc;
}, {} as Record<string, (typeof STYLE_GUIDE.styles)[keyof typeof STYLE_GUIDE.styles]>);


export const ALL_STYLES_CONFIG = { ...formattedStyleGuide, ...SPECIALIZED_PROMPT_STYLES };
export const STYLES = Object.keys(ALL_STYLES_CONFIG);

// --- Translation Maps for UI controls ---
export const SUBSTYLE_TRANSLATIONS: Record<string, string> = {
    'studio_classique': 'Studio Classique',
    'festival_de_cannes': 'Festival de Cannes',
    'cinematique_noir': 'Cinématique Noir',
    'luxe_exterieur': 'Luxe Extérieur',
    'hotel_glamour': 'Hôtel Glamour',
    'soiree_glamour': 'Soirée Glamour',
    'plage_glamour': 'Plage Glamour',
    'defile_parisien': 'Défilé Parisien',
    'studio_editorial': 'Studio Éditorial',
    'couture_exterieure': 'Couture Extérieure',
    'studio_magazine': 'Studio Magazine',
    'urbain_chic': 'Urbain Chic',
    'mode_conceptuelle': 'Mode Conceptuelle',
    'reveil_matinal': 'Réveil Matinal',
    'preparation_salle_de_bain': 'Préparation Salle de Bain',
    'backstage_fashion_week': 'Backstage Fashion Week',
    'podium_fashion_week': 'Podium Fashion Week',
    'soiree_cosy_maison': 'Soirée Cosy Maison',
    'noir_blanc_iconique': 'Noir & Blanc Iconique',
    'glamour_dore': 'Glamour Doré',
    'vogue_de_rue': 'Vogue de Rue',
    'revival_retro': 'Revival Rétro',
    'studio_luxe_minimaliste': 'Studio Luxe Minimaliste',
    'avant_garde_conceptuel': 'Avant-Garde Conceptuel',
    'podium_couture': 'Podium Couture',
    'plage_ete': 'Plage d\'Été',
    'chic_decontracte': 'Chic Décontracté',
    'pastel_romantique': 'Pastel Romantique',
    'look_fete': 'Look de Fête',
    'mode_lifestyle_urbain': 'Mode Lifestyle Urbain',
    'cocooning_interieur': 'Cocooning Intérieur',
    'sport_chic': 'Sport Chic',
    'moderne_minimaliste': 'Moderne Minimaliste',
    'boheme_chic': 'Bohème Chic',
    'elegant_bord_de_mer': 'Élégant Bord de Mer',
    'loft_urbain': 'Loft Urbain',
    'vintage_subtil': 'Vintage Subtil',
    'fusion_contemporaine': 'Fusion Contemporaine',
    'nature_lumiere': 'Nature & Lumière',
    'storytelling_cinematique': 'Storytelling Cinématique',
    'art_conceptuel': 'Art Conceptuel',
    'chic_puissant': 'Power Chic',
    'punk_urbain': 'Punk Urbain',
    'punk_uk_70s': 'Punk UK 70s',
    'punk_80s_glam': 'Punk 80s Glam',
    'concert_punk': 'Concert Punk',
    'grunge_90s': 'Grunge 90s',
    'punk_avant_garde': 'Punk Avant-Garde',
    'medieval_sombre': 'Médiéval Sombre',
    'cimetiere_victorien': 'Cimetière Victorien',
    'eglise_gothique': 'Église Gothique',
    'portrait_victorien': 'Portrait Victorien',
    'gothique_moderne': 'Gothique Moderne',
    'gothique_baroque': 'Gothique Baroque',
    'dark_romantic': 'Dark Romantic',
    'raid_marin': 'Raid Marin',
    'crique_tresor': 'Crique au Trésor',
    'festin_maison_longue': 'Festin en Maison Longue',
    'explorateur_nordique': 'Explorateur Nordique',
    'guerrier_mythologique': 'Guerrier Mythologique',
    'vie_du_village': 'Vie du Village',
    'boheme_urbain': 'Bohème Urbain',
    'boheme_festival': 'Bohème Festival',
    'boheme_vintage': 'Bohème Vintage',
    'boheme_nature': 'Bohème Nature',
    'boheme_romantique': 'Bohème Romantique',
    'course_circuit': 'Course sur Circuit',
    'rallye_sauvage': 'Rallye Sauvage',
    'classique_vintage': 'Classique Vintage',
    'luxe_moderne': 'Luxe Moderne',
    'studio_blanc': 'Studio Blanc',
    'architecture_moderne': 'Architecture Moderne',
    'noir_blanc_dramatique': 'Noir & Blanc Dramatique',
    'couleur_pastel': 'Couleur Pastel',
    'pop_art_vibrant': 'Pop Art Vibrant',
    'portrait_studio': 'Portrait en Studio',
    'lifestyle_exterieur': 'Lifestyle en Extérieur',
    'photographie_voyage': 'Photographie de Voyage',
    'photographie_rue': 'Photographie de Rue',
    'corporate_affaires': 'Corporate / Affaires',
    'nb_dramatique': 'N&B Dramatique',
    'sepia_vintage': 'Sépia Vintage',
    'double_exposition_artistique': 'Double Exposition Artistique',
    'sport_action': 'Sport d\'Action',
    'portrait_environnemental': 'Portrait Environnemental',
    'lumiere_golden_hour': 'Lumière Golden Hour',
    'lumiere_blue_hour': 'Lumière Blue Hour',
    'haute_vitesse_eclaboussure': 'Haute Vitesse (Éclaboussure)',
    'lumiere_naturelle_fenetre': 'Lumière Naturelle de Fenêtre',
    'natation': 'Natation',
    'parachutisme': 'Parachutisme',
    'plongee': 'Plongée',
    'course': 'Course à pied',
    'arts_martiaux': 'Arts Martiaux',
    'football': 'Football',
    'basketball': 'Basketball',
    'tennis': 'Tennis',
    'gatsby_1920s': 'Gatsby Années 1920',
    'film_noir_1930s_40s': 'Film Noir Années 1930-40',
    'espionnage_guerre_froide': 'Espionnage Guerre Froide',
    'rococo_baroque': 'Rococo Baroque',
    'western': 'Western',
    'annees_1950_60': 'Années 1950-60',
    'annees_1970_disco': 'Années 1970 Disco',
    'annees_1980_flashy': 'Années 1980 Flashy',
    'annees_1990_grunge': 'Années 1990 Grunge',
    'medieval': 'Médiéval',
    'fantasy': 'Fantasy',
    'antiquite_rome_grece': 'Antiquité Rome/Grèce',
    'samourai_japon_feodal': 'Samouraï Japon Féodal',
    'pirates': 'Pirates',
    'science_fiction_cyberpunk': 'Science-Fiction Cyberpunk',
    'post_apocalyptique': 'Post-Apocalyptique',
    'insertion_aeroportee': 'Insertion aéroportée',
    'debarquement_amphibie': 'Débarquement amphibie',
    'plongee_combat': 'Plongée de combat',
    'sabotage_portuaire': 'Sabotage portuaire',
    'operations_urbaines': 'Opérations urbaines',
    'reconnaissance_desert': 'Reconnaissance désert',
    'operations_foret_jungle': 'Opérations forêt/jungle',
    'operations_neige_montagne': 'Opérations neige/montagne',
    'raid_nocturne': 'Raid nocturne',
    'tenue_ceremonie': 'Tenue de cérémonie',
    'vehicule_blinde': 'Véhicule Blindé',
    'patrouille': 'Patrouille',
    'uniforme_parade': 'Uniforme de Parade',
    'base_operationnelle_avancee': 'Base Opérationnelle Avancée',
    'sniper': 'Sniper',
    'embarquement_helicoptere': 'Embarquement Hélicoptère',
    'infiltration_plage': 'Infiltration par la Plage',
    'plongee_tactique': 'Plongée Tactique',
    'saut_haho': 'Saut HAHO',
};

export const HAIR_COLORS = [
    'Noir Profond', 'Brun Foncé', 'Brun Clair', 'Blond Platine', 'Blond Cendré', 'Blond Doré', 'Roux Vif', 'Roux Cuivré Clair', 'Poivre et Sel', 'Gris Argenté', 'Blanc Neige', 'Rose Fantaisie', 'Bleu Fantaisie'
];
export const EXPRESSIONS = [
    'Neutre', 'Sourire Doux', 'Sourire Standard', 'Large Sourire', 'Sourire Subtil', 'Sourire Enjoué', 'Sourire Malicieux', 'Clin d\'œil', 'Rire', 'Sérieux', 'Confiant', 'Tristesse', 'Tristesse Profonde', 'Colère Contenue', 'Colère Explosive / Rage', 'Peur Légère', 'Inquiétude', 'Peur Intense', 'Panique', 'Surprise Neutre', 'Surprise Émerveillée', 'Dégoût / Mépris', 'Fatigue', 'Lassitude', 'Concentration', 'Réflexion', 'Séduction Assurée'
];
export const ACCESSORIES = [
    'Aucun', 'Lunettes de soleil classiques', 'Lunettes de rallye / motocross', 'Lunettes de vue simples', 'Lunettes de vue de créateur', 'Lunettes fantaisie', 'Aviateur (style pilote)', 'Wafer carrées', 'Sportives enveloppantes', 'Rondes vintage', 'Casque de moto', 'Casque de pilote de course auto', 'Casque de pilote de rallye'
];
export const FRAMES = [
    'Très gros plan', 'Gros plan', 'Plan poitrine', 'Plan taille', 'Plan italien', 'Plan américain', 'Plan moyen', 'Plan pied', 'Plan large', 'Contre-plongée', 'Vue de drone'
];
export const LUTS = [
    'Aucun', 'Vintage Kodachrome', 'Technicolor', 'Bleach Bypass', 'Teal & Orange', 'Film d\'Action', 'Film de Mariage', 'AR1', 'Blast', 'Couleur Cinéma', 'Film Classique', 'Film Cinématique', 'Vert Profond / Nature', 'Style Documentaire', 'Effet Film Mat', 'Film Noir Cinématique', 'Film d\'Horreur', 'Film Indépendant', 'Film Travel Buddha', 'Film Hero', 'Rétro', 'Charme Rustique', 'Science-Fiction Colorée', 'Slog', 'Cinéma Trois Mariages', 'Cinéma Urbain', 'Film Maudit Chaud', 'Wanderlust Rêveur'
];
export const DIRTS = [
    'Aucune', 'Sueur et Poussière', 'Boue séchée (éclaboussures)', 'Suie ou Cendres', 'Poussière épaisse', 'Terre humide', 'Motte', 'Incrustation d\'argile', 'Fibre', 'Vase', 'Peluche', 'Gouttelettes d\'eau', 'Éboulis', 'Graisse', 'Huile mécanique', 'Algues', 'Mousse ou Lichen', 'Sable fin', 'Résidu de fumée', 'Poussière de rouille', 'Taches d\'herbe écrasée', 'Rouille sur métal', 'Camouflage de visage (militaire)'
];
export const GRAINS = [
    'Aucun', 'Ultra Fin', 'Fin Standard', 'Moyen', 'Grossier', 'Très Grossier', 'Bruit ISO élevé', 'Vieux film 35mm', 'Finition Mate', 'Contrasté', 'Doux', 'Pointillé', 'Granuleux', 'Flou Doux', 'Cinéma', 'Vignetté'
];

export const ASPECT_RATIOS = {
    Portrait: ['4:5', '3:4', '2:3', '10:16', '9:16', '1:2'],
    Carré: ['1:1'],
    Paysage: ['5:4', '4:3', '3:2', '16:10', '16:9', '2:1', '3:1'],
};