/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { STYLE_GUIDE } from '../services/styleLibrary';

// --- Types ---
export type ColorMode = 'Couleur' | 'N&B';
export type Upscale = 'Standard' | '4K' | '6K' | '8K';
export type RenderQuality = 'Aperçu (Rapide)' | 'HD (Qualité)' | 'UHD (Réalisme)';


// --- I18n Translations ---
export const translations = {
    FR: {
        title: "Retour vers le futur",
        subtitle: "Prévisualisation cinématographique et photographique",
        downloadAlbum: "TOUT TÉLÉCHARGER",
        loadPortrait: "CHARGER UN PORTRAIT",
        generating: "GÉNÉRATION...",
        generate: "GÉNÉRER",
        style: "Style",
        substyle: "Sous-style",
        chooseSubstyle: "Choisir un sous-style",
        customPromptTitle: "Votre Prompt Personnalisé",
        customPromptPlaceholder: "Coller ici le prompt (scène, style, lumière...)",
        uploadPlaceholder: "Chargez un portrait pour commencer",
        renderQuality: "Qualité du rendu",
        preview: "APERÇU (RAPIDE)",
        hd: "HD (QUALITÉ)",
        uhd: "UHD (RÉALISME)",
        color: "COULEUR",
        bw: "N&B",
        upscale: "Upscale",
        photoSettings: "Réglages photographiques",
        focal: "FOCALE",
        aperture: "OUVERTURE",
        speed: "VITESSE",
        hairColor: "Couleur des cheveux",
        expression: "Expression",
        glasses: "Lunettes",
        framing: "Cadrage",
        luts: "Luts Cinéma",
        dirt: "Saleté",
        grain: "Grain Photo",
        sweat: "Sueur",
        speedEffect: "Effet Vitesse",
        signature: "Signature Personnelle",
        lockedOn: "ON - VERROUILLÉ",
        off: "OFF",
        formatSize: "Format & Taille",
        portrait: "Portrait",
        square: "Carré",
        landscape: "Paysage",
        download: "TÉLÉCHARGER",
        regenerate: "Régénérer",
        quantity: "QUT"
    },
    EN: {
        title: "Back to the Future",
        subtitle: "Cinematic and Photographic Preview",
        downloadAlbum: "DOWNLOAD ALL",
        loadPortrait: "LOAD PORTRAIT",
        generating: "GENERATING...",
        generate: "GENERATE",
        style: "Style",
        substyle: "Sub-style",
        chooseSubstyle: "Choose a sub-style",
        customPromptTitle: "Your Custom Prompt",
        customPromptPlaceholder: "Paste your prompt here (scene, style, light...)",
        uploadPlaceholder: "Upload a portrait to start",
        renderQuality: "Render Quality",
        preview: "PREVIEW (FAST)",
        hd: "HD (QUALITY)",
        uhd: "UHD (REALISM)",
        color: "COLOR",
        bw: "B&W",
        upscale: "Upscale",
        photoSettings: "Photographic Settings",
        focal: "FOCAL",
        aperture: "APERTURE",
        speed: "SPEED",
        hairColor: "Hair Color",
        expression: "Expression",
        glasses: "Glasses",
        framing: "Framing",
        luts: "Cinema LUTs",
        dirt: "Dirt",
        photoGrain: "Photo Grain",
        sweat: "Sweat",
        speedEffect: "Speed Effect",
        signature: "Personal Signature",
        lockedOn: "ON - LOCKED",
        off: "OFF",
        formatSize: "Format & Size",
        portrait: "Portrait",
        square: "Square",
        landscape: "Landscape",
        download: "DOWNLOAD",
        regenerate: "Regenerate",
        quantity: "QTY"
    }
};

// --- Magazine Cover Prompt Details ---
export const MAGAZINE_PROMPT_DETAILS = {
    'Couverture Vogue': {
        masthead: 'VOGUE',
        description: 'The style must be high-fashion, artistic, and iconic. Think powerful, elegant, and often minimalist compositions. The lighting should be dramatic and cinematic. The person should have a confident, high-fashion expression, styled impeccably.'
    },
    'Couverture Elle': {
        masthead: 'ELLE',
        description: 'The style must be fresh, vibrant, and accessible. The mood is joyful, modern, and relatable. Use bright, natural, or energetic studio lighting. The person should appear friendly and stylish, often with a smile or a relaxed, confident pose.'
    },
    'Couverture Elle Deco': {
        masthead: 'ELLE DECORATION',
        description: 'The focus must be on sophisticated living and design-forward interiors. The person should be elegantly integrated into a stunning and stylish home environment (e.g., a modern living room, a chic kitchen, a bohemian bedroom). The lighting should highlight both the person and the architectural/design details of the space.'
    }
};
export const MAGAZINE_STYLES = Object.keys(MAGAZINE_PROMPT_DETAILS);


// --- Unified Style Configuration ---
const SPECIALIZED_PROMPT_STYLES = {
    'Militaire': { substyles: ['véhicule blindé', 'patrouille', 'uniforme parade', 'base avancée'], notes: '' },
    'Commando': { substyles: ['sniper', 'embarquement hélico', 'infiltration plage'], notes: '' },
    'Néviscile (unité spéciale)': { substyles: ['plongée sous-marine', 'saut HAHO', 'sabotage portuaire'], notes: '' }
};

const formattedStyleGuide = Object.entries(STYLE_GUIDE.styles).reduce((acc, [key, value]) => {
    const formattedKey = key.replace(/_/g, ' ');
    acc[formattedKey] = value;
    return acc;
}, {} as typeof STYLE_GUIDE.styles);

export const ALL_STYLES_CONFIG = { ...formattedStyleGuide, ...SPECIALIZED_PROMPT_STYLES };
export const STYLES = Object.keys(ALL_STYLES_CONFIG);

// --- Translation Maps for UI controls ---
// The `FR` value is the canonical value used in prompts.
export const STYLE_TRANSLATIONS: Record<string, { FR: string, EN: string }> = {
    'Portrait Glamour': { FR: 'Portrait Glamour', EN: 'Glamour Portrait' },
    'Mode Haute Couture': { FR: 'Mode Haute Couture', EN: 'High Fashion' },
    'Couverture Vogue': { FR: 'Couverture Vogue', EN: 'Vogue Cover' },
    'Couverture Elle': { FR: 'Couverture Elle', EN: 'Elle Cover' },
    'Couverture Elle Deco': { FR: 'Couverture Elle Deco', EN: 'Elle Deco Cover' },
    'Editorial Chic': { FR: 'Editorial Chic', EN: 'Chic Editorial' },
    'Punk Grunge': { FR: 'Punk Grunge', EN: 'Punk Grunge' },
    'Boheme Viking': { FR: 'Boheme Viking', EN: 'Bohemian Viking' },
    'Automobile Moto': { FR: 'Automobile Moto', EN: 'Car & Motorcycle' },
    'Photo Mode Minimaliste': { FR: 'Photo Mode Minimaliste', EN: 'Minimalist Fashion Photo' },
    'Photo': { FR: 'Photo', EN: 'Photo' },
    'Sportifs': { FR: 'Sportifs', EN: 'Athletes' },
    'Cinema Costumes': { FR: 'Cinema Costumes', EN: 'Cinema & Costumes' },
    'Navy SEAL': { FR: 'Navy SEAL', EN: 'Navy SEAL' },
    'Militaire': { FR: 'Militaire', EN: 'Military' },
    'Commando': { FR: 'Commando', EN: 'Commando' },
    'Néviscile (unité spéciale)': { FR: 'Néviscile (unité spéciale)', EN: 'Néviscile (Special Unit)' },
};

export const SUBSTYLE_TRANSLATIONS: Record<string, { FR: string, EN: string }> = {
    'classic_studio': { FR: 'Studio Classique', EN: 'Classic Studio' },
    'red_carpet': { FR: 'Tapis Rouge', EN: 'Red Carpet' },
    'cinematic_noir': { FR: 'Cinematic Noir', EN: 'Cinematic Noir' },
    'outdoor_luxe': { FR: 'Luxe Extérieur', EN: 'Outdoor Luxury' },
    'avant_garde': { FR: 'Avant-Garde', EN: 'Avant-Garde' },
    'runway_show': { FR: 'Défilé de Mode', EN: 'Runway Show' },
    'futuristic': { FR: 'Futuriste', EN: 'Futuristic' },
    'retro_couture': { FR: 'Couture Rétro', EN: 'Retro Couture' },
    'black_white_iconic': { FR: 'Iconique Noir & Blanc', EN: 'Iconic Black & White' },
    'golden_glamour': { FR: 'Glamour Doré', EN: 'Golden Glamour' },
    'street_vogue': { FR: 'Vogue Urbain', EN: 'Street Vogue' },
    'retro_revival': { FR: 'Renaissance Rétro', EN: 'Retro Revival' },
    'summer_beach': { FR: 'Plage d\'Été', EN: 'Summer Beach' },
    'casual_chic': { FR: 'Chic Décontracté', EN: 'Casual Chic' },
    'romantic_pastel': { FR: 'Pastel Romantique', EN: 'Romantic Pastel' },
    'party_look': { FR: 'Look de Fête', EN: 'Party Look' },
    'minimalist_modern': { FR: 'Moderne Minimaliste', EN: 'Minimalist Modern' },
    'boho_chic': { FR: 'Bohème Chic', EN: 'Boho Chic' },
    'seaside_elegance': { FR: 'Élégance Balnéaire', EN: 'Seaside Elegance' },
    'urban_loft': { FR: 'Loft Urbain', EN: 'Urban Loft' },
    'cinematic_storytelling': { FR: 'Narration Cinématographique', EN: 'Cinematic Storytelling' },
    'conceptual_art': { FR: 'Art Conceptuel', EN: 'Conceptual Art' },
    'power_chic': { FR: 'Power Chic', EN: 'Power Chic' },
    'urban_punk': { FR: 'Punk Urbain', EN: 'Urban Punk' },
    'grunge_90s': { FR: 'Grunge Années 90', EN: '90s Grunge' },
    'glam_punk': { FR: 'Glam Punk', EN: 'Glam Punk' },
    'boheme_chic': { FR: 'Bohème Chic', EN: 'Bohemian Chic' },
    'viking_hall': { FR: 'Salle Viking', EN: 'Viking Hall' },
    'viking_sea': { FR: 'Mer Viking', EN: 'Viking Sea' },
    'rally_raid': { FR: 'Rallye-Raid', EN: 'Rally Raid' },
    '24h_mans': { FR: '24h du Mans', EN: '24h Le Mans' },
    'formula1_paddock': { FR: 'Paddock de Formule 1', EN: 'Formula 1 Paddock' },
    'moto_gp': { FR: 'Moto GP', EN: 'Moto GP' },
    'motocross': { FR: 'Motocross', EN: 'Motocross' },
    'biker': { FR: 'Motard', EN: 'Biker' },
    'studio_blanc': { FR: 'Studio Blanc', EN: 'White Studio' },
    'architecture_moderne': { FR: 'Architecture Moderne', EN: 'Modern Architecture' },
    'noir_blanc_dramatique': { FR: 'Noir & Blanc Dramatique', EN: 'Dramatic Black & White' },
    'couleur_pastel': { FR: 'Couleur Pastel', EN: 'Pastel Color' },
    'pop_art_vibrant': { FR: 'Pop Art Vibrant', EN: 'Vibrant Pop Art' },
    'studio_portrait': { FR: 'Portrait Studio', EN: 'Studio Portrait' },
    'outdoor_lifestyle': { FR: 'Lifestyle en Extérieur', EN: 'Outdoor Lifestyle' },
    'travel_photography': { FR: 'Photographie de Voyage', EN: 'Travel Photography' },
    'street_photography': { FR: 'Photographie de Rue', EN: 'Street Photography' },
    'corporate_business': { FR: 'Corporate / Business', EN: 'Corporate / Business' },
    'dramatic_bw': { FR: 'Noir & Blanc Dramatique', EN: 'Dramatic Black & White' },
    'vintage_sepia': { FR: 'Sépia Vintage', EN: 'Vintage Sepia' },
    'double_exposure': { FR: 'Double Exposition Artistique', EN: 'Artistic Double Exposure' },
    'action_sport': { FR: 'Sport en Action', EN: 'Action Sport' },
    'environmental_portrait': { FR: 'Portrait Environnemental', EN: 'Environmental Portrait' },
    'golden_hour': { FR: 'Lumière Heure Dorée', EN: 'Golden Hour Light' },
    'blue_hour': { FR: 'Lumière Heure Bleue', EN: 'Blue Hour Light' },
    'high_speed_splash': { FR: 'Haute Vitesse (Splash)', EN: 'High-Speed (Splash)' },
    'natural_window_light': { FR: 'Lumière Naturelle Fenêtre', EN: 'Natural Window Light' },
    'natation': { FR: 'Natation', EN: 'Swimming' },
    'parachutisme': { FR: 'Parachutisme', EN: 'Skydiving' },
    'plongee': { FR: 'Plongée', EN: 'Diving' },
    'course': { FR: 'Course', EN: 'Running' },
    'arts_martiaux': { FR: 'Arts Martiaux', EN: 'Martial Arts' },
    'football': { FR: 'Football', EN: 'Soccer' },
    'basketball': { FR: 'Basketball', EN: 'Basketball' },
    'tennis': { FR: 'Tennis', EN: 'Tennis' },
    'gatsby_1920s': { FR: 'Gatsby Années 1920', EN: 'Gatsby 1920s' },
    'film_noir_1930s_40s': { FR: 'Film Noir Années 30-40', EN: 'Film Noir 1930s-40s' },
    'espionnage_cold_war': { FR: 'Espionnage Guerre Froide', EN: 'Cold War Spy' },
    'rococo_baroque': { FR: 'Rococo Baroque', EN: 'Rococo Baroque' },
    'western': { FR: 'Western', EN: 'Western' },
    'annees_1950_60': { FR: 'Années 1950-60', EN: '1950s-60s' },
    'annees_1970_disco': { FR: 'Années 1970 Disco', EN: '1970s Disco' },
    'annees_1980_flashy': { FR: 'Années 1980 Flashy', EN: '1980s Flashy' },
    'annees_1990_grunge': { FR: 'Années 1990 Grunge', EN: '1990s Grunge' },
    'medieval': { FR: 'Médiéval', EN: 'Medieval' },
    'fantasy': { FR: 'Fantasy', EN: 'Fantasy' },
    'antiquite_rome_grece': { FR: 'Antiquité Rome/Grèce', EN: 'Antiquity Rome/Greece' },
    'samourai_japon_feodal': { FR: 'Samouraï Japon Féodal', EN: 'Samurai Feudal Japan' },
    'pirates': { FR: 'Pirates', EN: 'Pirates' },
    'science_fiction_cyberpunk': { FR: 'Science-Fiction Cyberpunk', EN: 'Sci-Fi Cyberpunk' },
    'post_apocalyptique': { FR: 'Post-Apocalyptique', EN: 'Post-Apocalyptic' },
    'Airborne insertion': { FR: 'Insertion aéroportée', EN: 'Airborne insertion' },
    'Amphibious landing': { FR: 'Débarquement amphibie', EN: 'Amphibious landing' },
    'Combat diving': { FR: 'Plongée de combat', EN: 'Combat diving' },
    'Port sabotage': { FR: 'Sabotage portuaire', EN: 'Port sabotage' },
    'Urban ops': { FR: 'Opérations urbaines', EN: 'Urban ops' },
    'Desert recon': { FR: 'Reconnaissance désert', EN: 'Desert recon' },
    'Forest / jungle ops': { FR: 'Opérations forêt/jungle', EN: 'Forest / jungle ops' },
    'Snow / mountain ops': { FR: 'Opérations neige/montagne', EN: 'Snow / mountain ops' },
    'Night raid': { FR: 'Raid de nuit', EN: 'Night raid' },
    'Ceremonial dress': { FR: 'Tenue de cérémonie', EN: 'Ceremonial dress' },
    'véhicule blindé': { FR: 'Véhicule Blindé', EN: 'Armored Vehicle' },
    'patrouille': { FR: 'Patrouille', EN: 'Patrol' },
    'uniforme parade': { FR: 'Uniforme de Parade', EN: 'Parade Uniform' },
    'base avancée': { FR: 'Base Avancée', EN: 'Forward Operating Base' },
    'sniper': { FR: 'Sniper', EN: 'Sniper' },
    'embarquement hélico': { FR: 'Embarquement Hélico', EN: 'Helicopter Boarding' },
    'infiltration plage': { FR: 'Infiltration Plage', EN: 'Beach Infiltration' },
    'plongée sous-marine': { FR: 'Plongée Sous-Marine', EN: 'Scuba Diving' },
    'saut HAHO': { FR: 'Saut HAHO', EN: 'HAHO Jump' },
    'sabotage portuaire': { FR: 'Sabotage Portuaire', EN: 'Port Sabotage' },
};

export const HAIR_COLORS_MAP = [
    { FR: 'Noir profond', EN: 'Deep Black' }, { FR: 'Châtain foncé', EN: 'Dark Brown' }, { FR: 'Châtain clair', EN: 'Light Brown' }, { FR: 'Blond platine', EN: 'Platinum Blonde' }, { FR: 'Blond cendré', EN: 'Ash Blonde' }, { FR: 'Blond doré', EN: 'Golden Blonde' }, { FR: 'Roux vif', EN: 'Bright Red' }, { FR: 'Roux clair cuivré', EN: 'Light Copper Red' }, { FR: 'Poivre et sel', EN: 'Salt and Pepper' }, { FR: 'Gris argenté', EN: 'Silver Grey' }, { FR: 'Blanc neige', EN: 'Snow White' }, { FR: 'Fantasy rose', EN: 'Fantasy Pink' }, { FR: 'Fantasy bleu', EN: 'Fantasy Blue' }
];
export const EXPRESSIONS_MAP = [
    { FR: 'Neutre', EN: 'Neutral' }, { FR: 'Sourire doux', EN: 'Soft Smile' }, { FR: 'Sourire standard', EN: 'Standard Smile' }, { FR: 'Sourire large', EN: 'Wide Smile' }, { FR: 'Sourire discret', EN: 'Subtle Smile' }, { FR: 'Sourire coquin', EN: 'Playful Smile' }, { FR: 'Sourire malicieux', EN: 'Mischievous Smile' }, { FR: 'Clin d’œil', EN: 'Wink' }, { FR: 'Rire', EN: 'Laugh' }, { FR: 'Sérieux', EN: 'Serious' }, { FR: 'Confiant', EN: 'Confident' }, { FR: 'Tristesse', EN: 'Sadness' }, { FR: 'Tristesse profonde', EN: 'Deep Sadness' }, { FR: 'Colère contenue', EN: 'Contained Anger' }, { FR: 'Colère explosive / rage', EN: 'Explosive Anger / Rage' }, { FR: 'Peur légère', EN: 'Slight Fear' }, { FR: 'Inquiétude', EN: 'Worry' }, { FR: 'Peur intense', EN: 'Intense Fear' }, { FR: 'Panique', EN: 'Panic' }, { FR: 'Surprise neutre', EN: 'Neutral Surprise' }, { FR: 'Surprise émerveillée', EN: 'Amazed Surprise' }, { FR: 'Dégout / dédain', EN: 'Disgust / Scorn' }, { FR: 'Fatigue', EN: 'Fatigue' }, { FR: 'Lassitude', EN: 'Weariness' }, { FR: 'Concentration', EN: 'Concentration' }, { FR: 'Réflexion', EN: 'Reflection' }, { FR: 'Séduction assumée', EN: 'Confident Seduction' }
];
export const ACCESSORIES_MAP = [
    { FR: 'Aucun', EN: 'None' }, { FR: 'Lunettes de soleil classique', EN: 'Classic Sunglasses' }, { FR: 'Masque type rallye / motocross', EN: 'Rally / Motocross Goggles' }, { FR: 'Lunettes de vue basique', EN: 'Basic Eyeglasses' }, { FR: 'Lunettes de vue design', EN: 'Designer Eyeglasses' }, { FR: 'Lunettes fantasy', EN: 'Fantasy Glasses' }, { FR: 'Aviator (style pilote)', EN: 'Aviator (pilot style)' }, { FR: 'Wafer carré', EN: 'Square Wafer' }, { FR: 'Sport wrap enveloppante', EN: 'Sport Wrap-around' }, { FR: 'Vintage rondes', EN: 'Vintage Round' }, { FR: 'Casque moto', EN: 'Motorcycle Helmet' }, { FR: 'Casque voiture pilote de course', EN: 'Racing Car Driver Helmet' }, { FR: 'Casque voiture pilote de rallye', EN: 'Rally Car Driver Helmet' }
];
export const FRAMES_MAP = [
    { FR: 'Très gros plan', EN: 'Extreme Close-up' }, { FR: 'Gros plan', EN: 'Close-up' }, { FR: 'Plan poitrine', EN: 'Chest Shot' }, { FR: 'Plan taille', EN: 'Waist Shot' }, { FR: 'Plan italien', EN: 'Italian Shot' }, { FR: 'Plan américain', EN: 'American Shot' }, { FR: 'Plan moyen', EN: 'Medium Shot' }, { FR: 'Plan en pied', EN: 'Full-length Shot' }, { FR: 'Plan d’ensemble', EN: 'Wide Shot' }, { FR: 'Plan au ras du sol', EN: 'Low-angle Shot' }, { FR: 'Vue drone', EN: 'Drone View' }
];
export const LUTS_MAP = [
    { FR: 'Aucun', EN: 'None' }, { FR: 'Kodachrome vintage', EN: 'Vintage Kodachrome' }, { FR: 'Technicolor', EN: 'Technicolor' }, { FR: 'Bleach bypass', EN: 'Bleach Bypass' }, { FR: 'Teal & Orange', EN: 'Teal & Orange' }, { FR: 'Action (film d’action)', EN: 'Action Film' }, { FR: 'Film de mariage', EN: 'Wedding Film' }, { FR: 'AR1', EN: 'AR1' }, { FR: 'Blast', EN: 'Blast' }, { FR: 'Couleur cinéma', EN: 'Cinema Color' }, { FR: 'Pellicule classique', EN: 'Classic Film' }, { FR: 'Film cinématographique', EN: 'Cinematic Film' }, { FR: 'Vers profond / nature', EN: 'Deep Green / Nature' }, { FR: 'Style documentaire', EN: 'Documentary Style' }, { FR: 'Effet mat de pellicule', EN: 'Matte Film Effect' }, { FR: 'Film noir cinématographique', EN: 'Cinematic Film Noir' }, { FR: 'Film d’horreur', EN: 'Horror Film' }, { FR: 'Film indépendant', EN: 'Indie Film' }, { FR: 'Film “bouddhi voyage”', EN: 'Travel Buddha Film' }, { FR: 'Héros de film', EN: 'Film Hero' }, { FR: 'Rétro', EN: 'Retro' }, { FR: 'Charme rustique', EN: 'Rustic Charm' }, { FR: 'Science-fiction colorée', EN: 'Colorful Sci-Fi' }, { FR: 'Slog', EN: 'Slog' }, { FR: 'Trois mariages cinéma', EN: 'Three Weddings Cinema' }, { FR: 'Cinéma urbain', EN: 'Urban Cinema' }, { FR: 'Film maudit et chaud', EN: 'Warm Cursed Film' }, { FR: 'Wanderlust onirique', EN: 'Dreamy Wanderlust' }
];
export const DIRTS_MAP = [
    { FR: 'Aucune', EN: 'None' }, { FR: 'sueur et poussière', EN: 'Sweat and Dust' }, { FR: 'boue séchée (éclaboussures)', EN: 'Dried Mud (splatters)' }, { FR: 'suie ou cendre', EN: 'Soot or Ash' }, { FR: 'poussière épaisse', EN: 'Thick Dust' }, { FR: 'terre humide', EN: 'Wet Earth' }, { FR: 'grumeux', EN: 'Lumpy' }, { FR: 'incrustation d’argile', EN: 'Clay Incrustation' }, { FR: 'fibre', EN: 'Fiber' }, { FR: 'sludge', EN: 'Sludge' }, { FR: 'peluche', EN: 'Lint' }, { FR: 'gouttelette d’eau', EN: 'Water Droplets' }, { FR: 'ébou', EN: 'Scree' }, { FR: 'cambouis', EN: 'Grease' }, { FR: 'huile mécanique', EN: 'Mechanical Oil' }, { FR: 'algue', EN: 'Algae' }, { FR: 'mousse ou lichen', EN: 'Moss or Lichen' }, { FR: 'sable fin', EN: 'Fine Sand' }, { FR: 'résidus de fumée', EN: 'Smoke Residue' }, { FR: 'poussière de rouille', EN: 'Rust Dust' }, { FR: 'traces d’herbes écrasées', EN: 'Crushed Grass Stains' }, { FR: 'rouille sur métal', EN: 'Rust on Metal' }, { FR: 'camouflage visage (militaire)', EN: 'Face Camouflage (military)' }
];
export const GRAINS_MAP = [
    { FR: 'Aucun', EN: 'None' }, { FR: 'Ultra fin', EN: 'Ultra Fine' }, { FR: 'Fin standard', EN: 'Standard Fine' }, { FR: 'Moyen', EN: 'Medium' }, { FR: 'Grossier', EN: 'Coarse' }, { FR: 'Très grossier', EN: 'Very Coarse' }, { FR: 'Bruit ISO élevé', EN: 'High ISO Noise' }, { FR: 'Film ancien 35 mm', EN: 'Old 35mm Film' }, { FR: 'Fini mat', EN: 'Matte Finish' }, { FR: 'Contrasté', EN: 'Contrasted' }, { FR: 'Doux', EN: 'Soft' }, { FR: 'Pointillé', EN: 'Dotted' }, { FR: 'Granuleux', EN: 'Grainy' }, { FR: 'Flou doux', EN: 'Soft Blur' }, { FR: 'Cinéma', EN: 'Cinema' }, { FR: 'Vignetté', EN: 'Vignetted' }
];


export const ASPECT_RATIOS = {
    Portrait: ['4:5', '3:4', '2:3', '10:16', '9:16', '1:2'],
    Carré: ['1:1'],
    Paysage: ['5:4', '4:3', '3:2', '16:10', '16:9', '2:1', '3:1'],
};