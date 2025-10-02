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

// --- UI Control Options ---
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
    'Aucune', 'Sueur', 'Sueur et Poussière', 'Boue séchée (éclaboussures)', 'Suie ou Cendres', 'Poussière épaisse', 'Terre humide', 'Motte', 'Incrustation d\'argile', 'Fibre', 'Vase', 'Peluche', 'Gouttelettes d\'eau', 'Éboulis', 'Graisse', 'Huile mécanique', 'Algues', 'Mousse ou Lichen', 'Sable fin', 'Résidu de fumée', 'Poussière de rouille', 'Taches d\'herbe écrasée', 'Rouille sur métal', 'Camouflage de visage (militaire)'
];
export const GRAINS = [
    'Aucun', 'Ultra Fin', 'Fin Standard', 'Moyen', 'Grossier', 'Très Grossier', 'Bruit ISO élevé', 'Vieux film 35mm', 'Finition Mate', 'Contrasté', 'Doux', 'Pointillé', 'Granuleux', 'Flou Doux', 'Cinéma', 'Vignetté'
];

export const ASPECT_RATIOS = {
    Portrait: ['4:5', '3:4', '2:3', '10:16', '9:16', '1:2'],
    Carré: ['1:1'],
    Paysage: ['5:4', '4:3', '3:2', '16:10', '16:9', '2:1', '3:1'],
};