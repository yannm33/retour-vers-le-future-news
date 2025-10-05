/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { LUTS_LIBRARY } from '../services/lutsLibrary';

// --- Types ---
export type ColorMode = 'Couleur' | 'N&B';

// --- Local Storage Keys ---
export const GOOGLE_KEY_LS = 'googleApiKey';
export const IDEOGRAM_KEY_LS = 'ideogramApiKey';
export const REVART_KEY_LS = 'revartApiKey';
export const LANGUAGE_KEY_LS = 'language';

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
export const GLASSES_OPTIONS = [
    'Aucun', 'Lunettes de soleil classiques', 'Lunettes de rallye / motocross', 'Lunettes de vue simples', 'Lunettes de vue de créateur', 'Lunettes fantaisie', 'Aviateur (style pilote)', 'Wafer carrées', 'Sportives enveloppantes', 'Rondes vintage'
];
export const FRAMES = [
    'Très gros plan', 'Gros plan', 'Plan poitrine', 'Plan taille', 'Plan italien', 'Plan américain', 'Plan moyen', 'Plan pied', 'Plan large', 'Contre-plongée', 'Vue de drone'
];
export const LUTS = LUTS_LIBRARY;
export const EFFECTS = [
    'Aucune', 'Sueur', 'Sueur et Poussière', 'Boue séchée (éclaboussures)', 'Suie ou Cendres', 'Poussière épaisse', 'Terre humide', 'Motte', 'Incrustation d\'argile', 'Fibre', 'Vase', 'Peluche', 'Gouttelettes d\'eau', 'Éboulis', 'Graisse', 'Huile mécanique', 'Algues', 'Mousse ou Lichen', 'Sable fin', 'Résidu de fumée', 'Poussière de rouille', 'Taches d\'herbe écrasée', 'Rouille sur métal', 'Camouflage de visage (militaire)'
];

// FIX: Add missing constant exports to resolve import errors.
export const GRAINS = ['Aucun', 'Fin et subtil', 'Standard (ISO 400)', 'Prononcé (ISO 1600+)', 'Très gros (look Lomo)'];

export const FILM_STOCKS = [
    'Aucune',
    // Couleur
    'Kodak Portra 400', 'Kodak Ektar 100', 'Kodak Gold 200', 'Fuji Pro 400H', 'Fuji Superia 400', 'CineStill 800T',
    // N&B
    'Kodak Tri-X 400', 'Ilford HP5 Plus 400', 'Ilford Delta 3200',
    // Cinéma
    'Kodak Vision3 50D', 'Kodak Vision3 500T'
];

export const ISO_SENSITIVITIES = ['Auto', '100', '200', '400', '800', '1600', '3200', '6400'];

export const ASPECT_RATIOS: { [key: string]: string[] } = {
    portrait: ['10:16', '9:16'],
    square: ['1:1'],
    landscape: ['16:10', '16:9', '21:9', '3:1']
};

export const UNIVERSAL_ACCESSORIES_CONFIG = [
    {
        nameKey: "accessories_group_luxury",
        elements: ["Montre de luxe", "Bijoux en or", "Sac à main de créateur", "Stylo-plume", "Verre de whisky"]
    },
    {
        nameKey: "accessories_group_clothing",
        elements: ["Chapeau fedora", "Écharpe en soie", "Gants en cuir", "Bretelles vintage", "Foulard noué"]
    },
    {
        nameKey: "accessories_group_equipment",
        elements: ["Casque de pilote", "Casque de moto", "Casque de soldat", "Masque à gaz", "Lunettes de vision nocturne"]
    },
    {
        nameKey: "accessories_group_personal",
        elements: ["Appareil photo vintage", "Pipe", "Cigare", "Jeu de cartes", "Livre ancien", "Caméra Super 8"]
    },
    {
        nameKey: "accessories_group_action",
        elements: ["Pistolet (type film noir)", "Épée médiévale", "Revolver de western", "Katana", "Talkie-walkie"]
    },
    {
        nameKey: "accessories_group_decor",
        elements: ["Néon d'enseigne", "Fumée de cigarette", "Pluie battante", "Vent dans les cheveux", "Pétales de fleurs"]
    }
];
