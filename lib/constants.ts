/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Types ---
export type ColorMode = 'Couleur' | 'N&B';
export type Upscale = 'Standard' | '4K' | '6K' | '8K';
export type RenderQuality = 'APERÇU (RAPIDE)' | 'HD (QUALITÉ)' | 'UHD (RÉALISME)';

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

// --- Camera Settings ---
export const SHUTTER_SPEEDS = ["2s", "1s", "1/2s", "1/4s", "1/8s", "1/15s", "1/30s", "1/60s", "1/125s", "1/250s", "1/500s", "1/1000s", "1/2000s", "1/4000s"];
export const APERTURES = ["f/1.4", "f/1.8", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16", "f/22"];
export const FOCAL_LENGTHS = ["14mm", "20mm", "24mm", "35mm", "50mm", "85mm", "105mm", "135mm", "200mm", "400mm", "600mm", "800mm", "1000mm"];


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
export const FILM_STOCKS = [
    'Aucune', 'Kodak Portra 400', 'Kodak Ektar 100', 'Kodak Gold 200', 'Kodak Tri-X 400', 'Kodak Vision3 500T', 'Fujifilm Pro 400H', 'Fujifilm Velvia 50', 'Fujifilm Superia 400', 'Fujifilm Acros 100', 'Ilford HP5 Plus 400', 'Ilford Delta 3200', 'Agfa Vista 200', 'CineStill 800T', 'CineStill 50D', 'Lomography Color Negative 800', 'Polaroid 600'
];
export const ISO_SENSITIVITIES = [
    'Auto', '50', '100', '200', '400', '800', '1600', '3200', '6400'
];

export const ASPECT_RATIOS = {
    Portrait: ['4:5', '3:4', '2:3', '10:16', '9:16', '1:2'],
    Carré: ['1:1'],
    Paysage: ['5:4', '4:3', '3:2', '16:10', '16:9', '2:1', '3:1'],
};