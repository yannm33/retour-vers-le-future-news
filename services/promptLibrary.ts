
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Types ---
interface PromptOptions {
    aspectRatio: string;
    colorMode: string;
    renderQuality: string;
    upscale: string;
}

/**
 * This library contains highly detailed, structured prompts for specific style/sub-style combinations.
 * It allows for a level of detail beyond what the generic UI controls can provide.
 * Based on the user's "master prompt" universal template for hyper-realism.
 */
const PROMPT_DATABASE: Record<string, Record<string, (opts: PromptOptions) => string>> = {
    'Militaire': {
        'vehicule_blinde': (opts) => 
            `Scène : Véhicule blindé MRAP en ville, officier en tenue de cérémonie au premier plan (insignes de grade visibles, médailles), équipe en tenue opérationnelle autour, caisses de munitions, radios PRC-148, ambiance crépusculaire, aspect photoréaliste, cinématique, profondeur de champ, détails d'usure. L'officier au premier plan doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        
        'patrouille': (opts) =>
            `Créer une image 8k ultra-réaliste avec un style cinématique rappelant la pellicule Kodak Vision3 500T.
            Scène & Ambiance : Extérieur, forêt tempérée dense, fin d'après-midi avec de longues ombres ("golden hour").
            Personnage(s) : Une équipe de feu de 4 hommes en patrouille. L'homme de tête, qui doit être une représentation fidèle de la personne sur la photo fournie, est agenouillé, vérifiant une carte papier par rapport à un GPS Garmin Foretrex 701 à son poignet. Tous portent un équipement opérationnel complet avec un camouflage moderne, des porte-plaques, et des fusils HK416 14.5" avec des viseurs EOTech.
            Équipement : L'équipement inclut des radios tactiques de type PRC-148, des sacs d'hydratation Camelbak, et des sacs à dos remplis.
            Requête principale : Représenter fidèlement la personne de la photo fournie en tant qu'homme de tête.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'uniforme_parade': (opts) =>
            `Créer une photo 8k ultra-réaliste avec une très faible profondeur de champ, se concentrant sur le sujet.
            Scène & Ambiance : Intérieur, un hall ou bureau militaire formel. Un grand drapeau est artistement drapé en arrière-plan.
            Personnage(s) : Un unique officier de haut rang dans un uniforme de cérémonie impeccable. Les détails sont essentiels : insignes de grade précis sur les épaules, une rangée complète de médailles sur la poitrine, des broderies dorées sur le col et les poignets, et un képi de cérémonie tenu sous le bras. L'expression de l'officier est confiante et sérieuse.
            Requête principale : L'officier doit être une représentation hyper-réaliste de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        
        'base_operationnelle_avancee': (opts) =>
            `Scène : petit aérodrome militaire improvisé, avion cargo Cessna Caravan, palettes de l'OTAN, personnel en gilets de chargement, chariot élévateur, drapeau discret, poussière en suspension, rendu photographique, lumière chaude du matin, hyper-réalisme. Un des membres du personnel doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
    },
    'Commando': {
        'sniper': (opts) =>
            `Créer une image 8k ultra-réaliste avec une faible profondeur de champ et un style cinématique : Kodak Vision3 500T, contraste élevé, grain notable.
            Scène & Ambiance : Extérieur, forêt brumeuse à l'aube (golden hour).
            Personnage(s) : Une équipe de sniper commando de deux hommes en tenue ghillie complète est en position de tir dissimulée et couchée. Le tireur, qui doit être une représentation fidèle de la personne sur la photo fournie, regarde à travers la lunette d'un fusil M110 SASS 7.62mm équipé d'une lunette Leupold Mark 5HD et d'un silencieux. L'observateur observe avec des jumelles.
            Équipement : Un anémomètre Kestrel et une tablette tactique robuste affichant des données balistiques sont visibles à côté de l'observateur. Leur radio PRC-152 avec micro laryngophone est visible.
            Requête principale : Le tireur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'embarquement_helicoptere': (opts) =>
            `Créer une image 8k ultra-réaliste avec un flou de mouvement dynamique et un lens flare cinématique.
            Scène & Ambiance : Nuit, extérieur. Une équipe de commandos est extraite par corde lisse depuis un hélicoptère MH-60 Black Hawk en vol stationnaire bas. Le souffle du rotor soulève de la poussière et des débris.
            Personnage(s) : Un commando est sur la corde, à mi-hauteur. Cette personne doit être une représentation fidèle de la personne de la photo fournie. Il porte un équipement opérationnel complet, des lunettes de vision nocturne (GPNVG-18) abaissées, et un HK416 avec silencieux.
            Véhicules & Transport : Le MH-60 Black Hawk est visible, avec des mitrailleurs de porte assurant la couverture.
            Requête principale : Le commando sur la corde doit être une représentation fidèle de la personne de la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        
        'infiltration_plage': (opts) =>
            `Créer une image 8k ultra-réaliste avec un style noir à fort contraste, éclairé par la lune.
            Scène & Ambiance : Nuit, débarquement sur une plage, mer agitée avec des vagues à crête blanche.
            Personnage(s) : Une équipe de nageurs de combat sortant des vagues. Le chef d'équipe, qui doit être une représentation fidèle de la personne de la photo fournie, donne des signaux manuels. Ils portent un équipement de combat sombre et humide par-dessus leurs combinaisons.
            Équipement : Ils transportent des armes avec silencieux (HK416) dans des sacs étanches.
            Véhicules & Transport : En arrière-plan, un bateau pneumatique à coque rigide (RHIB) est visible, attendant juste au-delà des brisants.
            Requête principale : Le chef d'équipe doit être une représentation fidèle de la personne de la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
    },
    'Neviscile (Unité Spéciale)': {
        'plongee_tactique': (opts) => 
            `Scène : insertion maritime de nuit, deux opérateurs en équipement tactique, recycleurs de plongée en circuit fermé (CCR, pas de bulles), combinaisons étanches, RHIB pour 8 personnes, moteur hors-bord visible, lampes IR, mer calme, reflet de la lune, hyper-réaliste, rendu 8K, détails mécaniques (vannes, raccords), attitude : préparation silencieuse. Un des opérateurs doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'saut_haho': (opts) =>
            `Créer une image 8k ultra-réaliste depuis une perspective en contre-plongée dramatique.
            Scène & Ambiance : Haute altitude (30 000 pieds), ciel clair au crépuscule. La courbure de la Terre est visible en dessous.
            Personnage(s) : Un opérateur de Neviscile en plein vol lors d'un saut à Haute Altitude et Haute Ouverture (HAHO). Cette personne doit être une représentation fidèle de la personne de la photo fournie.
            Équipement personnel : Il porte un équipement de saut HALO/HAHO complet, incluant un masque à oxygène connecté à une console, un parachute spécialisé, et un GPS/altimètre au poignet. Son équipement de combat est solidement attaché.
            Action : Il est stable en chute libre, juste avant de déployer son parachute.
            Requête principale : L'opérateur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'sabotage_portuaire': (opts) =>
            `Créer une image 8k ultra-réaliste avec une atmosphère industrielle, granuleuse et tendue.
            Scène & Ambiance : Nuit, dans un port commercial animé mais mal éclairé. La pluie tombe, créant des reflets sur le béton mouillé.
            Personnage(s) : Un unique opérateur de Neviscile, qui doit être une représentation fidèle de la personne de la photo fournie, se déplace furtivement entre des conteneurs d'expédition. Il porte un uniforme opérationnel noir.
            Équipement : Il transporte un pistolet avec silencieux et un sac à dos contenant des charges de démolition. Une radio tactique avec une oreillette est visible.
            Logistique & accessoires : La scène est remplie d'éléments portuaires réalistes : conteneurs empilés avec des logos (Maersk, Hapag-Lloyd), grues, et des flaques d'eau huileuse.
            Requête principale : L'opérateur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`
    }
};


/**
 * Retrieves a specialized prompt if one exists for the given style and sub-style combination.
 * @param style The main style selected by the user.
 * @param subStyle The sub-style selected by the user.
 * @param options Additional options from the UI to be injected into the prompt.
 * @returns A detailed prompt string or null if no specialized prompt is found.
 */
export const getSpecializedPrompt = (style: string, subStyle: string, options: PromptOptions): string | null => {
    const stylePrompts = PROMPT_DATABASE[style];
    if (stylePrompts && stylePrompts[subStyle]) {
        return stylePrompts[subStyle](options);
    }
    return null;
};