/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// This library provides detailed technical instructions for the AI for each photographic effect.

const EFFECTS_PROMPT_LIBRARY: Record<string, string> = {
    // Studio Portrait
    rembrandt_lighting: "Appliquer un éclairage de style Rembrandt : une source de lumière principale placée à environ 45 degrés du sujet et légèrement au-dessus, avec un réflecteur du côté opposé pour déboucher les ombres, créant un triangle de lumière distinctif sur la joue la plus sombre.",
    high_key: "Créer une image en high key : fond blanc ou très clair, éclairage doux et enveloppant qui minimise les ombres, créant une atmosphère lumineuse et optimiste.",
    low_key: "Créer une image en low key : fond noir ou très sombre, éclairage directionnel qui sculpte le sujet avec de profondes ombres, créant une atmosphère dramatique et mystérieuse.",
    hard_light_flash: "Utiliser un flash direct avec une lumière dure pour créer des ombres nettes et un contraste élevé, style photo de mode brute.",
    softbox: "Simuler l'utilisation d'une grande softbox pour un éclairage principal. La lumière doit être extrêmement douce, diffuse et homogène, adoucissant la peau et minimisant les textures.",
    color_gels: "Intégrer l'utilisation de gels colorés (ex: rouge, bleu, violet) sur les sources lumineuses pour teinter les ombres ou créer des faisceaux de lumière colorée sur le sujet ou l'arrière-plan.",
    studio_bokeh: "Simuler une prise de vue en studio avec une très faible profondeur de champ pour créer un arrière-plan artificiellement et esthétiquement flouté (bokeh).",

    // Outdoor Lifestyle
    golden_hour: "La scène doit se dérouler pendant la golden hour (juste après le lever ou avant le coucher du soleil). La lumière doit être chaude, dorée, douce et directionnelle, créant de longues ombres.",
    blue_hour: "La scène doit se dérouler pendant la blue hour (juste avant le lever ou après le coucher du soleil). L'ambiance doit être froide, avec une lumière ambiante bleue profonde et des contrastes doux.",
    natural_lens_flare: "Intégrer un lens flare naturel et artistique provoqué par le soleil entrant directement dans l'objectif, créant des halos et des polygones lumineux.",
    vintage_35mm: "Donner à l'image l'esthétique d'une photo prise avec un appareil 35mm des années 80-90 : grain de film notable, couleurs légèrement désaturées ou décalées, et une certaine douceur dans la netteté.",
    cinematic_framing: "Utiliser un cadrage cinématique, comme un plan large (widescreen) pour capturer le sujet et son environnement, créant une sensation narrative.",
    long_exposure_motion: "Simuler une pose longue (vitesse d'obturation lente) pour capturer le mouvement des éléments fluides comme les cheveux ou les vêtements dans le vent, tandis que le sujet reste net.",

    // Travel Photography
    wide_angle_silhouette: "Utiliser un objectif grand angle pour capturer un paysage vaste, avec le sujet principal apparaissant comme une petite silhouette se détachant sur l'horizon.",
    saturated_postcard: "Créer une image aux couleurs très vives et saturées, avec un ciel bleu profond et des verts luxuriants, dans le style d'une carte postale idyllique.",
    hdr_landscape: "Appliquer un style HDR (High Dynamic Range) prononcé pour révéler un maximum de détails dans les zones d'ombre et de haute lumière du paysage, créant un look hyper-réaliste et parfois surréaliste.",
    backlight_silhouette: "Placer le sujet en contre-jour complet par rapport à une source de lumière puissante (comme le soleil couchant) pour créer une silhouette noire parfaitement découpée.",
    urban_motion: "Capturer une scène de rue en utilisant une vitesse d'obturation légèrement lente pour que les personnages et véhicules en mouvement autour du sujet principal (qui reste net) soient flous.",
    color_splash: "Rendre l'ensemble de la scène en noir et blanc, à l'exception d'un seul élément ou d'une seule couleur qui reste vibrant, attirant l'œil sur un détail spécifique.",

    // Street Photography
    doisneau_contrast_bw: "Produire une image en noir et blanc à fort contraste, avec des noirs profonds et des blancs purs, dans le style poétique et humaniste de Robert Doisneau.",
    motion_blur: "Utiliser une vitesse d'obturation lente (ex: 1/15s) pour créer un flou de mouvement généralisé, capturant l'énergie et le chaos de la rue.",
    night_long_exposure: "Simuler une pose longue de nuit pour transformer les phares des voitures et autres lumières mobiles en traînées lumineuses, tandis que les éléments statiques restent nets.",
    high_speed_snapshot: "Simuler une vitesse d'obturation très élevée (ex: 1/2000s) pour figer un instant décisif dans la rue, capturant une action avec une netteté parfaite.",
    retro_film_grain: "Ajouter un grain argentique prononcé, typique des pellicules noir et blanc à haute sensibilité (comme Kodak Tri-X 400), pour un rendu rétro et texturé.",
    reflection_composition: "Construire l'image autour d'un reflet dans une vitrine, une flaque d'eau ou un miroir, superposant plusieurs couches de réalité dans une seule composition.",

    // Corporate / Business
    pro_neutral_background: "Créer un portrait professionnel avec un arrière-plan neutre et uni (gris, blanc cassé) et un éclairage flatteur qui inspire confiance et compétence.",
    classic_triangle_lighting: "Utiliser un éclairage en triangle (loop lighting), une technique de portrait classique où une petite ombre du nez se connecte à l'ombre de la joue, créant de la profondeur.",
    elegant_bw: "Convertir le portrait en un noir et blanc élégant et intemporel, avec une gamme de gris riche et des contrastes maîtrisés.",
    window_lighting: "Simuler un éclairage principal provenant d'une grande fenêtre, créant une lumière naturelle, douce et directionnelle avec des ombres subtiles.",
    dramatic_chiaroscuro: "Utiliser un éclairage en clair-obscur dramatique, avec une seule source de lumière dure, pour un portrait de dirigeant puissant et affirmé.",
    office_lifestyle_blur: "Placer le sujet dans un environnement de bureau moderne, avec l'arrière-plan (collègues, architecture) légèrement flou pour concentrer l'attention sur le sujet.",

    // Dramatic B&W
    high_contrast: "Forcer un contraste très élevé avec des ombres dures et des hautes lumières presque brûlées pour un effet graphique et dramatique.",
    film_grain: "Intégrer un grain de film argentique visible pour ajouter de la texture et une sensation organique à l'image.",
    high_key_bw: "Créer une image en noir et blanc high-key, dominée par les tons clairs et les gris pâles, pour une atmosphère douce et éthérée.",
    low_key_bw: "Créer une image en noir et blanc low-key, dominée par les noirs profonds et les ombres, pour un rendu sombre et mystérieux.",
    backlight_silhouette_bw: "Utiliser un contre-jour puissant pour transformer le sujet en une silhouette noire se détachant sur un fond clair.",
    textured_portrait: "Accentuer les détails et la texture de la peau, des cheveux ou des vêtements à travers un éclairage latéral et une grande netteté.",

    // Vintage Sepia
    yellowed_photo: "Appliquer une forte tonalité sépia et un léger jaunissement pour simuler l'aspect d'une vieille photographie qui a vieilli.",
    film_1920: "Recréer l'esthétique des films muets des années 1920, avec un contraste doux, un léger flou (soft focus) et une tonalité sépia.",
    polaroid_edges: "Ajouter des bordures larges et légèrement usées, typiques d'un tirage Polaroid ou d'une vieille photo de famille.",
    old_photo_double_exposure: "Créer une double exposition avec des images de style ancien, comme un portrait superposé à une lettre manuscrite ou un paysage.",
    dusty_grain: "Ajouter un grain prononcé ainsi que des imperfections simulées comme des poussières et des petites rayures pour un aspect authentiquement ancien.",
    studio_portrait_40s: "Simuler un portrait de studio des années 1940, avec un éclairage glamour, des poses formelles et une finition sépia.",

    // Artistic Double Exposure
    silhouette_landscape: "Créer une double exposition en superposant un paysage (forêt, montagne, mer) à l'intérieur de la silhouette d'un portrait.",
    portrait_texture: "Superposer une texture (bois, métal rouillé, ciel étoilé) sur un portrait, en laissant transparaître les traits du visage.",
    face_buildings: "Fusionner un visage avec un paysage urbain, où les lignes des immeubles se superposent aux contours du portrait.",
    shadow_sea: "Superposer l'image d'une mer ou d'un élément naturel avec l'ombre projetée d'une personne.",
    multiple_faces: "Superposer plusieurs portraits de la même personne avec des expressions ou des angles différents pour un effet psychologique.",
    psychedelic_colors: "Créer une double exposition avec des couleurs inversées ou psychédéliques pour un effet surréaliste et vibrant.",

    // Action Sport
    freeze_motion: "Simuler une vitesse d'obturation extrêmement rapide (ex: 1/4000s) pour figer parfaitement une action rapide (saut, frappe de balle), avec des détails d'une netteté absolue.",
    panning: "Simuler une vitesse d'obturation lente (ex: 1/30s) tout en suivant le sujet principal avec la caméra pour créer un fond filé horizontalement, gardant le sujet relativement net.",
    speed_blur: "Ajouter un flou de mouvement directionnel (zoom blur ou motion blur) pour accentuer la sensation de vitesse extrême.",
    impact_capture: "Figer l'instant précis de l'impact : le ballon qui se déforme, l'eau qui éclabousse, la poussière qui explose.",
    extreme_motion: "Capturer un mouvement à son apogée (un sprinteur en pleine foulée, un boxeur en pleine frappe) avec une composition dynamique et des muscles tendus.",
    dynamic_closeup: "Utiliser un gros plan dynamique sur le visage ou un détail de l'action, en accentuant la texture comme la sueur, la concentration ou la tension.",

    // Environmental Portrait
    subject_integrated: "Intégrer le sujet dans son environnement de vie ou de travail (atelier, bureau, cuisine) de manière naturelle et narrative.",
    silhouette_sharp_env: "Créer un portrait où le sujet est en silhouette mais l'environnement autour de lui reste parfaitement net et détaillé.",
    wide_angle_framing: "Utiliser un cadrage grand angle pour montrer le sujet en relation avec un décor vaste et significatif.",
    natural_decor_light: "Utiliser uniquement les sources de lumière naturelles présentes dans le décor (fenêtre, lampe) pour un rendu authentique.",
    shallow_dof: "Utiliser une très faible profondeur de champ pour garder le sujet net tout en rendant l'environnement magnifiquement flou.",
    storytelling_mood: "Créer une ambiance narrative où le sujet interagit avec des objets de son environnement, racontant une histoire.",

    // Golden Hour Light
    sunset_silhouette: "Positionner le sujet directement devant le soleil couchant pour créer une silhouette saisissante sur un ciel orange et rouge.",
    golden_reflection_portrait: "Créer un portrait où la lumière chaude et dorée du soleil se reflète sur le visage du sujet, lui donnant un éclat radieux.",
    warm_round_flare: "Intégrer un lens flare chaud, rond et diffus pour une atmosphère douce et rêveuse.",
    warm_orange_tone: "Appliquer une tonalité générale très chaude, presque orange, à toute l'image pour une sensation estivale intense.",
    long_soft_shadows: "Mettre en scène de longues ombres douces projetées par le sujet, caractéristiques de la lumière rasante de fin de journée.",
    water_sunset_reflection: "Capturer les reflets dorés du soleil couchant sur une surface d'eau (mer, lac, flaque).",

    // Blue Hour Light
    deep_blue_sky: "Mettre en valeur le ciel bleu profond et intense de la blue hour comme élément principal de la composition.",
    cold_backlight: "Utiliser la lumière froide de la blue hour comme contre-jour pour détacher le sujet du fond.",
    urban_silhouette_lamps: "Créer une silhouette urbaine où les bâtiments se découpent sur le ciel bleu, et les premiers lampadaires s'allument.",
    mixed_lighting: "Jouer avec le contraste entre la lumière naturelle bleue et froide et les lumières artificielles chaudes (vitrines, phares).",
    night_portrait_glowing_bg: "Réaliser un portrait de nuit où le sujet est éclairé par une source artificielle, avec un arrière-plan lumineux (ville, fête).",
    thriller_movie_effect: "Utiliser les tons bleus et les ombres profondes de la blue hour pour créer une ambiance de film à suspense ou de thriller.",

    // High Speed / Splash
    suspended_water_drops: "Figer des gouttes d'eau en suspension dans l'air avec une netteté parfaite, comme si le temps était arrêté.",
    frozen_colored_powder: "Capturer l'explosion d'une poudre colorée (style festival Holi) en plein vol, figeant chaque particule.",
    extreme_sport_stopped: "Arrêter net un moment culminant d'un sport extrême (un skateur en l'air, un surfeur dans une vague).",
    exploding_liquid: "Saisir l'instant précis où un liquide (lait, peinture, eau) éclabousse ou explose sur un objet ou une personne.",
    macro_closeup_frozen_splash: "Utiliser un gros plan macro pour capturer les détails d'une éclaboussure figée, comme une couronne formée par une goutte.",
    hair_fabric_stopped_motion: "Figer le mouvement de cheveux ou de tissus projetés en l'air (par exemple, par un saut ou un mouvement de danse).",

    // Natural Window Light
    portrait_light_beam: "Créer un portrait où un faisceau de lumière direct provenant d'une fenêtre découpe et illumine une partie du sujet.",
    soft_side_light: "Utiliser une lumière de fenêtre douce et latérale pour modeler délicatement le visage avec des transitions douces entre l'ombre et la lumière.",
    geometric_shadows: "Projeter les ombres géométriques d'une fenêtre, de stores ou de rideaux sur le sujet ou le mur pour une composition graphique.",
    dramatic_chiaroscuro_effect: "Utiliser une petite source de lumière de fenêtre dans une pièce sombre pour créer un effet de clair-obscur dramatique.",
    overexposed_window_backlight: "Placer le sujet devant une fenêtre intentionnellement surexposée, créant un fond blanc éclatant et un halo autour du sujet.",
    intimate_mood: "Créer une ambiance intimiste et calme, avec le sujet engagé dans une activité paisible (lecture, écriture) à la lumière du jour.",
};

export const getEffectInstruction = (effectKey: string): string | null => {
    return EFFECTS_PROMPT_LIBRARY[effectKey] || null;
};
