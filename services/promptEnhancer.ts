/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {
    PHOTOGRAPHER_LIBRARY,
    COSTUME_DE_FILM_LIBRARY,
    HAUTE_COUTURE_LIBRARY,
    PORTRAIT_GLAMOUR_LIBRARY,
    JOURNEE_MANNEQUIN_LIBRARY,
    COUVERTURE_VOGUE_LIBRARY,
    COUVERTURE_ELLE_LIBRARY,
    COUVERTURE_ELLE_DECO_LIBRARY,
    PORTRAIT_MINIMALISTE_LIBRARY,
    PUNK_LIBRARY,
    GOTHIC_LIBRARY,
    VIKING_LIBRARY,
    BOHEME_LIBRARY,
    AUTOMOBILE_LIBRARY,
    MOTO_LIBRARY,
    CAMERA_ANGLES,
    LIGHTING_STYLES,
    ATMOSPHERES,
    CONTEXTUAL_ENVIRONMENTS,
    LUXE_POSES,
    LUXE_EXPRESSIONS,
    LUXE_LIGHTING,
    LUXE_COMPOSITION,
    JEWELRY_SUBSTYLES,
    PRODUCT_FOCUSED_SUBSTYLES,
    FASHION_CAMERA_ANGLES,
    FASHION_LIGHTING_STYLES,
    FASHION_ATMOSPHERES
} from './photographerLibrary';
import { classifyStyle } from '../lib/styleClassifier';


export interface PhotoSettings {
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    resolution?: string;
    colorMode?: 'color' | 'b&w';
}

export function buildPrompt(userPrompt: string, settings: PhotoSettings): string {
    const parts: string[] = [userPrompt];
    
    const techSpecs: string[] = [];
    if (settings.focalLength) techSpecs.push(`Focale : ${settings.focalLength}.`);
    if (settings.aperture) techSpecs.push(`Ouverture : ${settings.aperture}.`);
    if (settings.shutterSpeed) techSpecs.push(`Vitesse d'obturation : ${settings.shutterSpeed}.`);
    if (settings.resolution) techSpecs.push(`Résolution cible : ${settings.resolution}.`);
    
    // Add a strong, imperative instruction for the color mode to override any conflicting styles.
    if (settings.colorMode === 'b&w') {
        techSpecs.push('Mode : IMPÉRATIVEMENT en Noir et Blanc (monochrome). Ne PAS générer en couleur.');
    } else {
        techSpecs.push('Mode : IMPÉRATIVEMENT en Couleur. Ne PAS générer en noir et blanc.');
    }
    
    if (techSpecs.length > 0) {
        parts.push('\n//-- SPÉCIFICATIONS TECHNIQUES IMPÉRATIVES --');
        parts.push(...techSpecs);
    }

    return parts.join('\n');
}

// --- Helper Function ---
/**
 * Selects a random element from an array.
 * @param arr The array to select from.
 * @returns A random element from the array.
 */
const selectRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Dynamic Enhancement Logic ---

const styleLibraryMap: Record<string, Record<string, any>> = {
    'photographers': PHOTOGRAPHER_LIBRARY,
    'portrait_glamour': PORTRAIT_GLAMOUR_LIBRARY,
    'mode_haute_couture': HAUTE_COUTURE_LIBRARY,
    'journee_dun_mannequin': JOURNEE_MANNEQUIN_LIBRARY,
    'couverture_vogue': COUVERTURE_VOGUE_LIBRARY,
    'couverture_elle': COUVERTURE_ELLE_LIBRARY,
    'couverture_elle_deco': COUVERTURE_ELLE_DECO_LIBRARY,
    'portrait_minimaliste': PORTRAIT_MINIMALISTE_LIBRARY,
    'punk': PUNK_LIBRARY,
    'gothique': GOTHIC_LIBRARY,
    'viking': VIKING_LIBRARY,
    'boheme': BOHEME_LIBRARY,
    'automobile': AUTOMOBILE_LIBRARY,
    'moto': MOTO_LIBRARY,
    'costume_de_film': COSTUME_DE_FILM_LIBRARY,
};

const keyToPrefix: Record<string, string> = {
    lieux: 'Lieu',
    tenues: 'Tenue',
    expressions: 'Expression',
    lumieres: 'Lumière',
    accessoires: 'Accessoire',
    poses: 'Pose',
    vehicules: 'Véhicule',
    ambiance: 'Ambiance',
    ambiances: 'Ambiance',
    scenes: 'Scène',
    lighting: 'Éclairage',
};

/**
 * Generates a unique set of creative directions for a prompt based on style and sub-style.
 * @param style The main style category.
 * @param subStyle The specific sub-style.
 * @returns A string of dynamic creative enhancements to be added to the prompt.
 */
export function getDynamicEnhancements(style: string, subStyle: string): string {
    const enhancements: string[] = [];
    let specificEnhancementsFound = false;

    if (style === 'luxe_et_volupte') {
        enhancements.push(`Pose: ${selectRandom(LUXE_POSES)}.`);
        enhancements.push(`Expression: ${selectRandom(LUXE_EXPRESSIONS)}.`);
        enhancements.push(`Posture: corps relâché mais élégant, mains utilisées pour soutenir la narration visuelle.`);
        enhancements.push(`Type de lumière: ${selectRandom(LUXE_LIGHTING.type)}.`);
        enhancements.push(`Tonalité de lumière: ${selectRandom(LUXE_LIGHTING.tonalite)}.`);
        enhancements.push(`Contraste: moyen à élevé, adapté au décor.`);
        enhancements.push(`Produit mis en avant: ${selectRandom(LUXE_COMPOSITION.produit_star)}.`);
        enhancements.push(`Composition: Laisser un espace libre dans la composition pour un futur slogan ou logo (texte placeholder).`);
        
        // High-Fidelity Product Directive for specific styles
        if (PRODUCT_FOCUSED_SUBSTYLES.includes(subStyle)) {
            enhancements.push('//-- DIRECTIVE PRODUIT HAUTE-FIDÉLITÉ --');
            enhancements.push('Le produit mis en avant (parfum, montre, bijou, etc.) doit être rendu avec un photoréalisme absolu.');
            enhancements.push("IMPÉRATIF : Le nom de la marque, le logo et tout texte sur le produit doivent être PARFAITEMENT LISIBLES, NETS ET EXACTS. Aucune écriture floue, générique ou insensée n'est autorisée. Le rendu doit être indiscernable d'une photographie publicitaire professionnelle.");
        }
        
        // Universal Macro & Ad Composition for Jewelry
        if (JEWELRY_SUBSTYLES.includes(subStyle)) {
            const rand = Math.random();
            let shotType = '';
            if (rand < 0.3) { // 30% macro
                shotType = "Plan macro / très rapproché sur l'objet. Nette té maximale sur le métal, la texture de la peau et la lumière. Profondeur de champ faible avec un bokeh naturel. Fond légèrement flouté pour faire ressortir le produit.";
            } else if (rand < 0.7) { // 40% close-up
                shotType = "Plan rapproché du produit porté (ex: au poignet, à la main). Montrer une interaction naturelle et élégante, avec des mains soignées.";
            } else { // 30% wide
                shotType = "Plan d'ensemble large pour le contexte. Montrer le sujet et le produit dans un décor luxueux (voiture, hôtel, boutique) pour créer une narration publicitaire.";
            }
            enhancements.push(`Type de plan: ${shotType}`);
        } else {
            // Fallback for non-jewelry luxe styles
            enhancements.push(`Cadrage publicitaire: ${selectRandom(LUXE_COMPOSITION.cadrage)}.`);
        }
        
        return enhancements.join('\n');
    }

    const libraryForStyle = styleLibraryMap[style];
    if (libraryForStyle && subStyle && libraryForStyle[subStyle]) {
        const subStyleLibrary = libraryForStyle[subStyle];
        for (const key in subStyleLibrary) {
            if (key === 'scene' && typeof subStyleLibrary[key] === 'string') {
                enhancements.push(`Scène: ${subStyleLibrary[key]}.`);
                specificEnhancementsFound = true;
            } else if (Array.isArray(subStyleLibrary[key]) && subStyleLibrary[key].length > 0) {
                const prefix = keyToPrefix[key] || (key.charAt(0).toUpperCase() + key.slice(1));
                enhancements.push(`${prefix}: ${selectRandom(subStyleLibrary[key])}.`);
                specificEnhancementsFound = true;
            }
        }
    }
    
    // Contextual environments can add more detail.
    if (subStyle && CONTEXTUAL_ENVIRONMENTS[subStyle]) {
        enhancements.push(`Environnement: ${selectRandom(CONTEXTUAL_ENVIRONMENTS[subStyle])}.`);
        specificEnhancementsFound = true;
    }

    // Fallback to generic enhancements if no specific ones were found, or for general styles.
    if (!specificEnhancementsFound || style === 'photos') {
        const category = classifyStyle(style);
        
        if (category === 'MODE') {
            enhancements.push(`Angle de caméra: ${selectRandom(FASHION_CAMERA_ANGLES)}.`);
            enhancements.push(`Style d'éclairage: ${selectRandom(FASHION_LIGHTING_STYLES)}.`);
            enhancements.push(`Atmosphère: ${selectRandom(FASHION_ATMOSPHERES)}.`);
        } else {
            enhancements.push(`Angle de caméra: ${selectRandom(CAMERA_ANGLES)}.`);
            enhancements.push(`Style d'éclairage: ${selectRandom(LIGHTING_STYLES)}.`);
            enhancements.push(`Atmosphère: ${selectRandom(ATMOSPHERES)}.`);
        }
    }

    return enhancements.filter(e => e).join('\n');
}