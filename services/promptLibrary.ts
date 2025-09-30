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
        'véhicule blindé': (opts) => 
            `Scène : blindé MRAP en ville, officier en tenue d’apparat au premier plan (galons visibles, médailles), équipe en tenue opérationnelle autour, caisses ammo, radios PRC-148, ambiance crépusculaire, photoréaliste, look cinéma, profondeur de champ, détails de l’usure. L'officier au premier plan doit être une représentation fidèle de la personne sur la photo fournie.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,
        
        'patrouille': (opts) =>
            `Create an ultra-realistic 8k image with a cinematic style reminiscent of Kodak Vision3 500T film stock.
            Scene & Ambiance: Exterior, dense temperate forest, late afternoon with long shadows ("golden hour").
            Personnage(s): A 4-man fire team on patrol. The point man, who must be a faithful representation of the person in the provided photo, is kneeling, checking a paper map against a Garmin Foretrex 701 GPS on his wrist. All are wearing full operational gear (tenue opérationnelle) with modern camouflage, plate carriers, and carrying HK416 14.5" rifles with EOTech sights.
            Équipements: Gear includes PRC-148 style tactical radios, Camelbak hydration packs, and packed rucksacks.
            Core Request: Faithfully represent the person from the provided photo as the point man.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,

        'uniforme parade': (opts) =>
            `Create an ultra-realistic 8k photo with a very shallow depth of field, focusing on the subject.
            Scene & Ambiance: Interior, a formal military hall or office. A large flag is artfully draped in the background.
            Personnage(s): A single high-ranking officer in a pristine tenue d’apparat (formal dress uniform). Details are critical: precise rank insignias on the shoulders, a full rack of medals on the chest, golden embroidery on the collar and cuffs, and a formal képi held under the arm. The officer's expression is confident and serious.
            Core Request: The officer must be a hyper-realistic representation of the person in the provided photo.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,
        
        'base avancée': (opts) =>
            `Scène : petit aéroport militaire improvisé, Cessna Caravan cargo, palettes NATO, personnel en gilets de chargement, chariot élévateur, drapeau discret, poussière en suspension, rendu photographique, lumière chaude du matin, hyper-réalisme. L'un des membres du personnel doit être une représentation fidèle de la personne sur la photo fournie.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,
    },
    'Commando': {
        'sniper': (opts) =>
            `Create an ultra-realistic 8k image with a shallow depth of field and a cinematic style: Kodak Vision3 500T, high contrast, noticeable grain.
            Scene & Ambiance: Exterior, misty forest at dawn (golden hour).
            Personnage(s): A two-man commando sniper team in full ghillie suits is in a concealed, prone firing position. The sniper, who must be a faithful representation of the person in the provided photo, is looking through the scope of an M110 SASS 7.62mm rifle equipped with a Leupold Mark 5HD scope and suppressor. The spotter is observing with binoculars.
            Équipements: A Kestrel weather meter and a ruggedized tactical tablet displaying ballistic data are visible next to the spotter. Their PRC-152 radio with throat mic is visible.
            Core Request: The sniper must be a faithful representation of the person in the provided photo.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,

        'embarquement hélico': (opts) =>
            `Create an ultra-realistic 8k image with dynamic motion blur and cinematic lens flare.
            Scene & Ambiance: Night, exterior. A commando team is being extracted via fast-rope from an MH-60 Black Hawk helicopter hovering low. The rotor wash is kicking up dust and debris.
            Personnage(s): One commando is on the rope, halfway up. This person must be a faithful representation of the person from the provided photo. They are in full operational kit, night vision goggles (GPNVG-18) flipped down, and carrying a silenced HK416.
            Véhicules & Transport: The MH-60 Black Hawk is visible, with door gunners providing cover.
            Core Request: The commando on the rope must be a faithful representation of the person in the provided photo.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,
        
        'infiltration plage': (opts) =>
            `Create an ultra-realistic 8k image with a high-contrast, moonlit noir style.
            Scene & Ambiance: Night, beach landing, rough sea with white-capped waves.
            Personnage(s): A team of combat swimmers emerging from the surf. The team leader, who must be a faithful representation of the person from the provided photo, is giving hand signals. They are wearing dark, wet combat gear over their wetsuits.
            Équipements: They carry silenced weapons (HK416) in waterproof bags.
            Véhicules & Transport: In the background, a rigid-hulled inflatable boat (RHIB) is visible waiting just beyond the breakers.
            Core Request: The team leader must be a faithful representation of the person from the provided photo.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,
    },
    'Néviscile (unité spéciale)': {
        'plongée sous-marine': (opts) => 
            `Scène : insertion maritime de nuit, deux opérateurs en tenue tactique, rigs de plongée fermés (rebreather CCR, pas de bulles), combinaisons drysuit, RHIB 8 places, moteur hors-bord visible, lampes IR, mer calme, reflet de la lune, hyper-réaliste, rendu 8K, détails mécaniques (valves, raccords), attitude : préparation silencieuse. L'un des opérateurs doit être une représentation fidèle de la personne sur la photo fournie.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,

        'saut HAHO': (opts) =>
            `Create an ultra-realistic 8k image from a dramatic low-angle perspective.
            Scene & Ambiance: High altitude (30,000 ft), clear sky at dusk. The curvature of the Earth is visible below.
            Personnage(s): A Néviscile operator in mid-air during a High Altitude High Opening (HAHO) jump. This person must be a faithful representation of the person from the provided photo.
            Équipements personnels: They are wearing a full HALO/HAHO jump rig, including an oxygen mask connected to a console, a specialized parachute pack, and a wrist-mounted GPS/altimeter. Their combat gear is strapped securely.
            Action: They are stable in freefall, just before deploying their parachute.
            Core Request: The operator must be a faithful representation of the person in the provided photo.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`,

        'sabotage portuaire': (opts) =>
            `Create an ultra-realistic 8k image with a gritty, industrial, and tense atmosphere.
            Scene & Ambiance: Night, within a busy but poorly lit commercial port. Rain is falling, creating reflections on the wet concrete.
            Personnage(s): A single Néviscile operator, who must be a faithful representation of the person from the provided photo, is covertly moving between shipping containers. They are wearing a black operational uniform.
            Équipements: They are carrying a silenced pistol and a backpack containing demolition charges. A tactical radio with an earpiece is visible.
            Logistique & accessoires: The scene is filled with realistic port elements: stacked shipping containers with logos (Maersk, Hapag-Lloyd), cranes, and puddles of oily water.
            Core Request: The operator must be a faithful representation of the person in the provided photo.
            Technical Specs: Aspect ratio ${opts.aspectRatio}. Color mode: ${opts.colorMode}. Render quality: ${opts.renderQuality}. Upscale target: ${opts.upscale}.`
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
