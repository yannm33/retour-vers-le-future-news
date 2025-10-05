/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// This master file centralizes all global creative lists for prompt generation.
// It is the single source of truth for emotions, lighting, angles, etc.

export const EMOTIONAL_TONES = [
  "Joyeux et optimiste",
  "Mélancolique et introspectif",
  "Puissant et confiant",
  "Serein et paisible",
  "Mystérieux et tendu",
  "Nostalgique et rêveur"
];

export const PHOTOGRAPHER_STANCES = [
  "Observateur distant, capturant la scène sans intervenir.",
  "Participant intime, créant une connexion proche avec le sujet.",
  "Metteur en scène, contrôlant chaque détail de la composition.",
  "Documentariste, recherchant l'authenticité brute du moment."
];

export const ARTISTIC_IMPERFECTIONS = [
  "Léger flou de bougé, ajoutant une sensation de mouvement et d'urgence.",
  "Grain de film prononcé, pour une texture organique et rétro.",
  "Lens flare subtil et naturel, ajoutant une touche de magie lumineuse.",
  "Vignetage doux, pour centrer l'attention sur le sujet.",
  "Couleurs légèrement désaturées, pour une ambiance nostalgique.",
  "Aberration chromatique subtile sur les bords."
];

export const CAMERA_ANGLES = [
  "Plan très large, montrant le sujet minuscule dans un vaste paysage.",
  "Plan large, montrant le sujet de la tête aux pieds avec son environnement.",
  "Plan moyen, cadré à la taille, pour se concentrer sur le langage corporel.",
  "Gros plan, se concentrant sur le visage pour capturer l'émotion.",
  "Très gros plan, isolant un détail (un œil, une bouche).",
  "Contre-plongée, pour donner au sujet un air de puissance et de domination.",
  "Plongée, pour donner au sujet un air de vulnérabilité ou pour montrer le contexte.",
  "Plan hollandais (dutch angle), inclinant la caméra pour créer une tension ou un malaise.",
  "Vue à travers quelque chose (through-the-lens), cadrant à travers une fenêtre ou un feuillage."
];

export const LIGHTING_STYLES = [
  "Éclairage Rembrandt, avec un petit triangle de lumière sur la joue ombragée.",
  "High-key, lumière vive et peu d'ombres pour une ambiance optimiste.",
  "Low-key, ombres profondes pour une atmosphère dramatique et mystérieuse.",
  "Contre-jour, source de lumière derrière le sujet créant silhouette ou halo.",
  "Lumière latérale, pour sculpter les formes et accentuer les textures.",
  "Lumière douce et diffuse, pour un rendu flatteur.",
  "Lumière dure et directe, pour des ombres nettes et un contraste élevé.",
  "Utilisation de gels colorés (rouge, bleu) pour teinter la scène.",
  "Lumière naturelle provenant d'une fenêtre, pour un rendu doux et authentique."
];

export const ATMOSPHERES = [
  "Rêveur et éthéré, avec une légère brume ou un flou artistique.",
  "Sombre et mélancolique, avec une palette de couleurs froides.",
  "Énergique et vibrant, avec des couleurs saturées et du mouvement.",
  "Serein et contemplatif, dans un environnement calme.",
  "Brut et réaliste, sans artifice, montrant la vérité du moment.",
  "Cinématique et narratif, comme une scène tirée d'un film.",
  "Mystérieux et inquiétant, jouant avec les ombres et le non-dit.",
  "Romantique et doux, avec des tons chauds et une lumière caressante."
];

export const CANDID_MOMENTS_POSES = [
  "Sujet capturé en plein saut au-dessus d'une flaque d'eau, son reflet visible.",
  "Personne lisant un journal à une terrasse de café, visage partiellement masqué.",
  "Enfants jouant et riant dans une rue, créant un contraste avec l'environnement.",
  "Cycliste passant rapidement devant un mur texturé ou une affiche, juxtaposant mouvement et statisme.",
  "Silhouette regardant à travers une fenêtre ou une grille, créant un cadre dans le cadre.",
  "Personne se penchant pour boire à une fontaine publique, un geste simple et géométrique.",
  "Un couple s'embrassant furtivement dans un coin de rue, à l'abri des regards.",
  "Homme courant sous la pluie, tenant un journal au-dessus de sa tête.",
  "Foule se déplaçant dans des directions différentes sur un passage piéton.",
  "Artisan au travail dans son atelier, absorbé par sa tâche.",
  "Un moment de repos sur un banc public, le regard perdu dans le vide.",
  "Jeu d'ombres et de lumière sur une personne marchant dans une ruelle étroite."
];

export const CONTEXTUAL_ENVIRONMENTS: Record<string, string[]> = {
  "portrait_studio": [
    "un cyclorama blanc infini",
    "un fond en toile peinte texturée",
    "un décor minimaliste avec un seul accessoire (chaise, cube)"
  ],
  "lifestyle_exterieur": [
    "un café en terrasse animé",
    "un parc en automne avec des feuilles mortes",
    "un marché de producteurs coloré"
  ],
  "photographie_rue": [
    "un passage piéton bondé à New York",
    "une ruelle étroite et pluvieuse à Tokyo",
    "devant une fresque de street art à Berlin"
  ],
  "corporate_affaires": [
    "un bureau moderne avec une baie vitrée surplombant la ville",
    "une salle de réunion design",
    "le hall d'entrée d'un gratte-ciel en verre et acier"
  ]
};

export const LUXE_POSES = [
  "Appuyé nonchalamment contre une voiture de sport, le regard au loin.",
  "Marchant d'un pas assuré sur une avenue prestigieuse, sac de luxe à la main.",
  "Regardant par la fenêtre d'une suite de palace, contemplant la ville.",
  "Ajustant le bouton de manchette de sa chemise, un geste subtil et confiant.",
  "Descendant un grand escalier en marbre, avec élégance.",
  "Le corps de profil, la tête tournée vers l'objectif, une pose sculpturale."
];

// FIX: Define and export the missing `LUXE_POSES_STUDIO` constant.
export const LUXE_POSES_STUDIO = [
  "Assis sur un tabouret de studio, une pose simple et élégante, le corps légèrement tourné.",
  "Debout, une main sur la hanche, l'autre détendue, une pose de mode classique.",
  "Portrait rapproché, les mains encadrant subtilement le visage pour mettre en valeur un bijou.",
  "Pose dynamique, comme un léger saut ou un mouvement de danse figé, pour un look éditorial.",
  "Allongé sur un sol neutre, créant une composition graphique vue de dessus."
];

export const LUXE_EXPRESSIONS = [
  "Un léger sourire en coin, confiant et énigmatique.",
  "Un regard intense et direct, plein d'assurance.",
  "Une expression neutre mais puissante, presque arrogante.",
  "Un air détendu et serein, comme si le luxe était naturel.",
  "Un regard contemplatif, perdu dans des pensées profondes.",
  "Une expression de satisfaction subtile."
];

export const FASHION_CAMERA_ANGLES = [
  "Plan en pied pour montrer l'intégralité de la tenue.",
  "Contre-plongée pour allonger la silhouette et donner un air puissant.",
  "Plan rapproché sur un détail du vêtement ou un accessoire.",
  "Vue de profil, pour souligner la coupe du vêtement.",
  "Plan capturé en mouvement, pour montrer la fluidité du tissu.",
  "Plan de dos, pour révéler un détail inattendu ou une coupe audacieuse."
];

export const FASHION_LIGHTING_STYLES = [
  "Éclairage beauty dish, rendu contrasté mais flatteur sur la peau.",
  "Flash direct et dur, pour un look éditorial brut et moderne.",
  "Lumière très douce d'une grande boîte à lumière, pour un look éthéré.",
  "Contre-jour puissant pour une silhouette dramatique.",
  "Utilisation de réflecteurs or ou argent pour sculpter la lumière."
];

export const FASHION_ATMOSPHERES = [
  "Minimaliste et conceptuel, dans un studio épuré.",
  "Urbain et edgy, dans les rues d'une métropole."
];