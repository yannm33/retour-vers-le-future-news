/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Helper Function ---
/**
 * Selects a random element from an array.
 * @param arr The array to select from.
 * @returns A random element from the array.
 */
const selectRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Creative Libraries ---

const CAMERA_ANGLES = [
    'dramatic low-angle shot', 'intimate close-up shot', 'dynamic dutch angle', 'heroic high-angle shot',
    'candid medium shot', 'cinematic wide shot', 'over-the-shoulder view', 'point-of-view (POV) shot',
    'profile shot', 'three-quarter view', 'eye-level shot'
];

const LIGHTING_STYLES = [
    'dramatic Rembrandt lighting with deep shadows', 'soft and dreamy golden hour lighting', 'harsh noon sunlight creating strong contrasts',
    'mysterious moonlight with volumetric haze', 'vibrant neon noir lighting with blue and pink hues', 'cinematic three-point lighting setup',
    'backlighting creating a halo effect around the subject', 'soft, diffused light from an overcast sky', 'eerie bottom lighting',
    'chiaroscuro lighting technique'
];

const ATMOSPHERES = [
    'serene and peaceful', 'tense and suspenseful', 'energetic and chaotic', 'melancholic and somber',
    'dreamy and ethereal', 'joyful and celebratory', 'mysterious and intriguing', 'gritty and raw',
    'nostalgic and vintage', 'futuristic and sleek'
];

// Context-specific details to make scenes more vivid
const CONTEXTUAL_ENVIRONMENTS: Record<string, string[]> = {
    'western': [
        'in a dusty, bustling saloon with patrons in the background',
        'overlooking a vast canyon at sunset',
        'during a tense standoff on a deserted main street',
        'inside a rustic sheriff\'s office with wanted posters on the wall',
        'riding a horse through a sun-drenched prairie',
        'around a crackling campfire under a vast, starry night sky',
        'defending a lone homestead from bandits',
        'on a speeding steam train crossing a wooden trestle bridge',
        'in a windswept ghost town during a storm',
        'working at a blacksmith\'s forge, sparks flying from the anvil',
        'in the middle of a chaotic cattle drive across a wide, muddy river',
        'panning for gold in a cold mountain stream, surrounded by pine trees',
        'involved in a high-stakes poker game in a back room',
        'defending a stagecoach from outlaws on a rocky mountain pass'
    ],
    'science_fiction_cyberpunk': [
        'in a rain-slicked alleyway illuminated by flickering holographic advertisements',
        'on a crowded, multi-level high-tech marketplace with flying vehicles whizzing by',
        'inside a minimalist, sterile corporate laboratory with glowing data screens',
        'looking out from a high-rise mega-apartment over a sprawling, neon-lit cityscape',
        'in an underground hacker den filled with tangled wires, servers, and monitors',
        'at a grimy noodle bar on a crowded, steam-filled street',
        'in the cockpit of a futuristic hover-car during a high-speed chase',
        'navigating a shimmering, abstract augmented reality dataspace',
        'in a grimy, back-alley cybernetics clinic with flickering surgical lights and spare parts',
        'at a high-end corporate party on the 100th floor of a chrome skyscraper',
        'navigating the giant, noisy maintenance shafts and tunnels of a city-sized megastructure',
        'in a zero-gravity combat arena with neon-glowing obstacles'
    ],
    'post_apocalyptique': [
        'scavenging in the ruins of a decaying metropolis overgrown with nature',
        'standing guard at a makeshift fortified settlement made of scrap metal',
        'driving a heavily modified, armored vehicle across a desolate, sun-scorched wasteland',
        'huddled around a barrel fire in a destroyed subway station shelter',
        'looking out over a flooded, abandoned city from a rooftop',
        'bartering goods at a bustling, makeshift trading post',
        'in a lone watchtower, scanning the barren landscape with binoculars',
        'exploring a derelict, sand-buried shipwreck on what was once a seabed',
        'navigating a toxic, irradiated "forbidden zone" in a patched-up hazmat suit',
        'tending to a struggling hydroponic farm inside a reinforced underground bunker',
        'climbing the skeletal remains of a collapsed skyscraper for a better view',
        'sailing a makeshift raft through the flooded streets of a "water-world" city'
    ],
    'fantasy': [
        'in an enchanted forest with glowing flora and ancient, moss-covered trees',
        'within a grand, medieval castle throne room with high vaulted ceilings',
        'consulting a magical, glowing tome in a vast, ancient library',
        'on the crumbling edge of a volcanic cliff overlooking a dragon\'s lair',
        'in a bustling fantasy market square filled with mythical creatures and vendors',
        'crossing a precarious rope bridge suspended high above a misty chasm',
        'in a mystical cave network, with walls embedded with glowing crystals',
        'in a hidden elven city built among the high branches of giant, ancient trees',
        'deep within a dwarven mountain-hold, amidst grand stone halls and rivers of lava',
        'standing before a council of powerful wizards in a chamber of floating crystals'
    ],
    'film_noir_1930s_40s': [
        'in a smoky, dimly lit detective\'s office as rain streaks down the window',
        'waiting under a solitary streetlamp on a foggy, wet street at night',
        'at a glamorous but treacherous high-society gala in a grand ballroom',
        'in a shadowy back alley during a clandestine meeting, steam rising from vents',
        'at the bar of a moody, atmospheric jazz club with a lone saxophonist on stage',
        'on the rain-swept docks at midnight, with the silhouette of a cargo ship nearby',
        'inside a grand, shadowy train station, waiting for a mysterious arrival',
        'in a tense interrogation room, with a single bare bulb hanging from the ceiling',
        'making a desperate phone call from a phone booth on a deserted, rain-lashed street corner',
        'hiding in the shadows of a grand, art-deco cinema lobby'
    ],
    'medieval': [
        'in a bustling medieval castle courtyard during a festival, with jesters and merchants',
        'on the cold, stone ramparts of a fortress, overlooking a vast kingdom at dawn',
        'in a humble but busy blacksmith\'s forge, with sparks flying from the anvil',
        'as a participant in a royal jousting tournament, with crowds cheering',
        'in a great, torch-lit medieval banquet hall, feasting at a long table',
        'in a quiet monastery scriptorium, surrounded by illuminated manuscripts',
        'training with a sword and shield in a muddy castle training yard',
        'attending a royal court, filled with nobles, intrigue, and whispered secrets'
    ],
    'pirates': [
        'on the chaotic deck of a pirate ship during a fierce storm at sea, with waves crashing over the side',
        'in a hidden, torch-lit cove, dividing treasure chests overflowing with gold and jewels',
        'in a rowdy, smoke-filled pirate tavern on a tropical island like Tortuga',
        'at the helm of the ship, navigating by the stars with a large, wooden ship\'s wheel',
        'engaged in a desperate sword fight amidst the ship\'s rigging, high above the deck',
        'examining a mysterious treasure map in the captain\'s cabin by candlelight',
        'leading a boarding party, swinging from one ship to another on a rope'
    ],
    'espionnage_cold_war': [
        'at a clandestine dead drop under a bridge in Cold War Berlin, as a train rumbles overhead',
        'in a tense, secret meeting in a smoke-filled, wood-paneled office in London',
        'covertly observing a target from a rooftop with high-powered binoculars in Vienna',
        'during a high-stakes prisoner exchange on a fog-shrouded bridge',
        'blending in at a lavish embassy party in Moscow to gather intelligence',
        'in a high-speed car chase through the narrow streets of a European capital',
        'setting up covert surveillance equipment in a hotel room across from a target\'s location'
    ],
    'samourai_japon_feodal': [
        'in a serene zen rock garden, meditating before a duel as cherry blossoms fall',
        'on a misty battlefield, standing under the proud banner of their clan',
        'in a traditional, quiet teahouse, performing the intricate tea ceremony',
        'standing solemn guard at the imposing gate of a majestic Japanese castle',
        'walking silently through a dense bamboo forest shrouded in mist',
        'defending a small village from a bandit attack, standing alongside peasants',
        'engaging in a formal, moonlit duel on a wooden bridge over a rushing river'
    ]
};

/**
 * The "AI Art Director". Generates a unique set of creative instructions to ensure image diversity.
 * @param style The main style (e.g., 'Cinema Costumes').
 * @param subStyle The sub-style (e.g., 'western').
 * @returns A string containing unique, randomized creative directions.
 */
export const getDynamicEnhancements = (style: string, subStyle: string): string => {
    const enhancements: string[] = [];

    // 1. Select a unique environment if one is defined for the sub-style
    const environmentOptions = CONTEXTUAL_ENVIRONMENTS[subStyle];
    if (environmentOptions) {
        enhancements.push(`Scene Environment: ${selectRandom(environmentOptions)}.`);
    }

    // 2. Select a random camera angle, lighting style, and atmosphere for every prompt
    enhancements.push(`Camera Angle: ${selectRandom(CAMERA_ANGLES)}.`);
    enhancements.push(`Lighting: ${selectRandom(LIGHTING_STYLES)}.`);
    enhancements.push(`Atmosphere/Mood: ${selectRandom(ATMOSPHERES)}.`);
    enhancements.push(`Composition: Ensure this image is compositionally unique from any others in this batch. Avoid repetition.`);

    return enhancements.join(' ');
};
