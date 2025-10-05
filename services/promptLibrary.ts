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
const PROMPT_DATABASE: Record<string, Record<string, any>> = {
    'militaire': {
        'vehicule_blinde': {
            "scene": [
                "Contraste saisissant au crépuscule : un véhicule blindé MRAP monte la garde dans une rue dévastée. Devant, le sujet (officier), représentation fidèle de la photo, se tient dans un uniforme de cérémonie impeccable, son calme tranchant avec le chaos environnant.",
                "Un instant capturé dans le désert aride : un convoi de blindés soulève un nuage de poussière dorée. Le sujet, fidèle à la photo, se tient dans la tourelle du véhicule de tête, le regard fixé sur l'horizon à travers des jumelles.",
                "Gros plan sur les mains gantées et couvertes de graisse d'un mécanicien resserrant un boulon sur le moteur d'un blindé. En arrière-plan, dans la lumière crue du hangar, le sujet (officier), fidèle à la photo, observe la scène, une expression de confiance sur son visage fatigué."
            ]
        },
        'patrouille': {
            "scene": [
                "Un instant de silence dans une forêt dense au crépuscule. L'homme de tête (le sujet), agenouillé, trace une route du doigt sur une carte papier. La lumière filtrant à travers les arbres dessine des motifs de camouflage sur son visage concentré.",
                "Dans un village de montagne enneigé, le chef de patrouille (le sujet) retire son gant pour serrer la main d'un ancien du village. Un geste de respect au milieu du froid glacial, la vapeur de leur souffle se mêlant dans l'air.",
                "La caméra, fixée à l'intérieur d'un véhicule de patrouille, tremble sur une route désertique. Le sujet, aux commandes de la mitrailleuse, balaie l'horizon, ses yeux plissés pour se protéger du soleil et du sable."
            ]
        },
        'uniforme_parade': {
            "scene": [
                "Dans un hall militaire imposant, un officier de haut rang (le sujet) se tient au garde-à-vous, seul. La lumière d'une haute fenêtre se reflète sur ses médailles et le sol en marbre poli, créant une atmosphère de solennité et de solitude du commandement.",
                "Portrait serré, presque intime. La caméra se concentre sur la rangée de médailles sur la poitrine de l'officier (le sujet). L'éclairage de studio, doux et formel, révèle chaque détail de l'uniforme et la détermination tranquille dans son regard.",
                "Le sujet passe les troupes en revue. La caméra, placée derrière les soldats au garde-à-vous, se concentre sur son visage concentré alors qu'il marche, son regard évaluant chaque homme."
            ]
        },
        'base_operationnelle_avancee': {
            "scene": [
                "Au lever du soleil, la silhouette du sujet se dessine dans le nuage de poussière soulevé par les hélices d'un avion-cargo Cessna. Il guide l'appareil avec des gestes précis sur une piste d'atterrissage improvisée.",
                "À l'intérieur du Centre d'Opérations Tactiques, la seule lumière provient des écrans et d'une carte holographique. Le sujet, le visage baigné d'une lueur bleue, est penché sur la carte, planifiant la prochaine mission avec son équipe.",
                "Un rare moment de calme. Assis sur une caisse de munitions à l'extérieur de sa tente, le sujet lit une lettre froissée de chez lui. Le bruit de fond de la base est assourdi, l'instant est suspendu."
            ]
        },
        'salle_de_briefing': {
            "scene": [
                "Le sujet, officier, se tient au-dessus d'une table holographique projetant une carte 3D du terrain. Ses mains bougent, manipulant l'hologramme, tandis qu'il donne ses ordres à une équipe d'opérateurs dont les visages concentrés sont illuminés par la lueur de la carte.",
                "Ambiance 'vieille école' : le sujet pointe une carte murale jaunie avec une baguette, son ombre se projetant sur les plans. La salle est enfumée, la tension est palpable.",
                "Fin du briefing. Le sujet serre fermement la main de son chef d'équipe. Un gros plan sur leurs mains et leurs regards échangés exprime une confiance mutuelle absolue avant la mission."
            ]
        },
        'checkpoint_sous_tension': {
            "scene": [
                "La chaleur déforme l'air sur une route désertique. Le sujet, soldat, fait signe à un vieux pick-up d'avancer vers le checkpoint. Sa main est posée, comme par inadvertance, sur son arme. La tension est visible dans son regard.",
                "Nuit noire. Le faisceau de la lampe torche du sujet coupe l'obscurité, illuminant les papiers et le visage nerveux d'un conducteur. En arrière-plan, la silhouette de son coéquipier, prêt à intervenir.",
                "Le vent d'une tempête de sable imminente fouette le checkpoint. Le sujet, le visage protégé par un shemagh, maintient sa position, une silhouette solitaire face aux éléments."
            ]
        },
        'feu_d_artillerie_nocturne': {
            "scene": [
                "L'explosion du départ d'obus d'un M777 illumine la nuit d'une lumière blanche et brutale, figeant la scène pour une fraction de seconde. Le sujet, artilleur, est surpris le corps contracté, se protégeant de l'onde de choc.",
                "Dans un effort synchronisé, l'équipe charge le prochain obus. La caméra se concentre sur le visage en sueur du sujet, travaillant en parfaite harmonie avec ses camarades sous la faible lueur de la lune.",
                "L'instant d'après le tir. Le sujet, à genoux, suit la trajectoire de l'obus dans le ciel nocturne à travers des jumelles, son souffle formant un nuage dans l'air froid."
            ]
        },
        'pilote_de_chasse_pre_vol': {
            "scene": [
                "Ambiance 'Top Gun' au coucher du soleil. La silhouette du sujet, pilote de chasse, se dessine alors qu'il marche sur le tarmac vers son F-22 Raptor. Il tient son casque sous le bras, le regard déjà fixé sur le ciel.",
                "Vue depuis l'intérieur du cockpit. Le visage du sujet est illuminé par la myriade de lumières et d'écrans. Un gros plan sur sa main gantée actionnant un interrupteur, ultime vérification avant le décollage.",
                "Au ras du sol, la caméra suit un membre de l'équipe au sol (le sujet) qui effectue une dernière inspection de l'avion, sa main glissant le long du fuselage froid du chasseur."
            ]
        },
        'medecin_de_combat_medevac': {
            "scene": [
                "Dans le chaos d'un atterrissage MEDEVAC qui soulève un tourbillon de poussière, le sujet, médecin de combat, court vers un soldat blessé sur une civière. Son visage exprime une urgence et une concentration absolues.",
                "À l'intérieur de l'hélicoptère vibrant, le médecin (le sujet) travaille frénétiquement pour stabiliser un soldat blessé. La lumière rouge de l'intérieur baigne la scène, accentuant le drame.",
                "Avant l'évacuation, un moment de compassion pure. Le sujet tient la main d'un soldat blessé, lui parlant doucement pour le rassurer, un îlot de calme au milieu de la guerre."
            ]
        },
        'combat_urbain_cqb': {
            "scene": [
                "Le sujet se déplace en silence le long d'un mur criblé de balles dans un bâtiment en ruine. La lumière du jour filtre à travers les trous, créant des faisceaux de poussière dansants. Son fusil est épaulé, prêt.",
                "L'instant de la brèche. La porte explose. Le sujet, en tête de l'équipe d'assaut, plonge dans la pièce sombre, le faisceau de sa lampe tactique coupant l'obscurité comme une lame.",
                "Sur un toit surplombant la ville, le sujet fournit un feu de couverture. Des douilles vides sont éjectées de son arme dans un mouvement ralenti, brillant dans la lumière du soleil."
            ]
        },
        'garde_d_honneur_ceremoniale': {
            "scene": [
                "Immobilité parfaite. La caméra fait un lent travelling sur le visage stoïque du sujet, garde d'honneur devant un monument national. Seul un cillement trahit sa concentration intense.",
                "Un salut au fusil parfaitement synchronisé. La caméra capture le reflet du ciel sur les baïonnettes alignées. Le sujet est un élément d'une machine cérémoniale sans faille.",
                "Gros plan sur la botte parfaitement cirée du sujet qui frappe le sol avec une précision millimétrée lors de sa ronde au Tombeau du Soldat Inconnu. Le son claque dans le silence respectueux."
            ]
        },
        'vie_en_caserne': {
            "scene": [
                "Dans la lumière tamisée d'une chambrée, le sujet est assis sur son lit, nettoyant méticuleusement son fusil. Chaque geste est précis, presque méditatif. C'est un rituel personnel.",
                "Un éclat de rire suspendu. Le sujet est surpris au milieu d'une partie de cartes avec ses camarades, un rare moment de détente et de camaraderie franche.",
                "La tension de l'inspection. Le sujet se tient au garde-à-vous à côté de son lit fait au carré, son regard fixé droit devant, attendant le passage de l'officier."
            ]
        },
        'maintenance_de_blinde_hangar': {
            "scene": [
                "Le visage du sujet, mécanicien, est maculé de graisse. Il est penché sur le moteur exposé d'un char M1 Abrams, concentré, la lumière d'une baladeuse jetant de longues ombres dans le hangar immense.",
                "Sous le ventre d'un char, le sujet est en train de souder. Des gerbes d'étincelles illuminent son masque et la fosse de maintenance, créant une scène industrielle et brute.",
                "L'équipe de maintenance utilise une grue pour soulever la tourelle massive d'un char. Le sujet guide l'opération avec des signaux manuels, criant des ordres pour couvrir le bruit des machines."
            ]
        },
        'operations_en_milieu_arctique': {
            "scene": [
                "Le sujet, vêtu d'un camouflage d'hiver, est allongé dans la neige, presque invisible. Seul le nuage de sa respiration trahit sa présence alors qu'il observe l'horizon à travers des jumelles.",
                "L'effort silencieux. Le sujet, à skis, tire un traîneau lourd de matériel à travers une forêt enneigée. La seule bande son est le crissement de la neige et sa propre respiration saccadée.",
                "Dans l'urgence d'une tempête de blizzard imminente, le sujet creuse frénétiquement la neige pour construire un abri de fortune, le vent fouettant son visage."
            ]
        },
        'guerre_en_jungle': {
            "scene": [
                "Le sujet traverse une rivière boueuse, de l'eau jusqu'à la taille, son fusil tenu au-dessus de sa tête. L'humidité est palpable, chaque goutte d'eau sur son visage est visible.",
                "Un rayon de soleil perce la canopée dense, illuminant le sujet alors qu'il se fraie un chemin à la machette. Son visage, peint en camouflage, est un masque de concentration.",
                "Pendant une pause, le sujet est accroupi, parfaitement immobile, son regard balayant la jungle. Il ne fait qu'un avec l'environnement, à l'écoute du moindre bruit suspect."
            ]
        },
        'operateur_de_drone_gcs': {
            "scene": [
                "Dans l'obscurité d'une station de contrôle au sol, le visage du sujet est la seule chose visible, illuminé par la lueur froide de l'écran affichant la vue d'un drone Predator.",
                "Gros plan sur la main du sujet qui serre le joystick. Son pouce survole le bouton de tir. Son expression est un mélange de concentration intense et de distance émotionnelle.",
                "L'instant de la décision. Le sujet et son coéquipier échangent un regard silencieux devant l'écran principal, attendant la confirmation de l'ordre de frappe."
            ]
        },
    },
    'commando': {
        'sniper': {
            "scene": [
                "Immobile depuis des heures. Le sujet, tireur d'élite, est camouflé sur le toit d'un bâtiment en ruine. La caméra se concentre sur son œil dans la lunette du fusil M110 SASS, un monde de détails dans cette petite fenêtre.",
                "Infiltration nocturne. Le sujet rampe silencieusement dans une forêt dense. Une branche craque au loin. Il se fige, son souffle suspendu, une silhouette à peine visible sous la lueur de la lune.",
                "Le rituel du nettoyage. Dans une planque sécurisée, à la lueur d'une seule ampoule, le sujet démonte et nettoie méticuleusement son fusil de précision. Chaque pièce est un objet sacré."
            ]
        },
        'embarquement_helicoptere': {
            "scene": [
                "Extraction par corde lisse. Le sujet descend de l'hélicoptère Black Hawk en vol stationnaire. Pour un instant, il est suspendu entre le ciel et la terre, une silhouette se découpant sur la ville nocturne.",
                "Zone chaude. Le sujet, déjà à bord, se penche pour attraper la main de son coéquipier et le hisser à l'intérieur de l'hélicoptère qui décolle déjà, les balles traçantes illuminant la nuit.",
                "Les pieds dans le vide. Assis sur le bord de la soute ouverte d'un Black Hawk en vol, le sujet observe le paysage défiler, un rare moment de calme avant la prochaine action."
            ]
        },
        'infiltration_plage': {
            "scene": [
                "Un instant capté au ras de l'eau : le visage dégoulinant du sujet émerge du ressac nocturne. Le silence est seulement brisé par le clapotis de l'eau sur son équipement. Son regard est fixé sur la côte.",
                "À moitié immergé, le sujet observe la côte à travers des jumelles. Dans les lentilles, on devine la silhouette d'une sentinelle ennemie. Il reste parfaitement immobile.",
                "Caché derrière des rochers après le débarquement, le sujet déplie une carte étanche. La seule lumière est la lueur rouge de sa lampe, qui illumine son visage concentré et les gouttes d'eau sur la carte."
            ]
        },
        'plongee_de_combat': {
            "scene": [
                "Deux têtes émergent sans un bruit de l'eau noire d'un port industriel. Le sujet retire son recycleur, son regard balayant immédiatement les quais. Pas un son, pas une éclaboussure.",
                "Sous l'eau, le faisceau du scooter sous-marin du sujet coupe l'obscurité trouble. Des silhouettes de poissons passent rapidement, effrayés par cette présence silencieuse et rapide.",
                "Dans l'obscurité quasi totale sous la coque d'un navire, le 'clic' magnétique de la charge de démolition que le sujet vient de poser est le seul son audible."
            ]
        },
        'raid_en_zodiac_nocturne': {
            "scene": [
                "Le Zodiac fend les vagues à toute vitesse. À la proue, le sujet est une silhouette tendue, fouettée par les embruns, scrutant l'horizon à travers des jumelles de vision nocturne.",
                "L'instant de l'abordage. Le sujet saute du Zodiac en mouvement sur l'échelle d'un navire plus grand. C'est un ballet de force et de précision au-dessus des vagues sombres.",
                "Le moteur du Zodiac est coupé. L'embarcation dérive en silence vers sa cible. Le sujet vérifie une dernière fois son arme, le bruit métallique du chargeur qui s'enclenche brisant le silence."
            ]
        },
        'liberation_d_otage_cqb': {
            "scene": [
                "La porte explose en un nuage de débris. Le sujet, en tête, plonge dans la pièce, son fusil HK416 balayant chaque coin en une fraction de seconde. Le faisceau de sa lampe danse dans la poussière.",
                "Le sujet enveloppe un otage terrifié de son corps, le guidant à travers un couloir tandis que des tirs éclatent derrière eux. Son visage est un masque de concentration protectrice.",
                "Gros plan sur les mains du sujet qui pose délicatement une charge de brèche sur une porte. Ses doigts bougent avec une précision chirurgicale, un calme mortel avant la tempête."
            ]
        },
        'saut_operationnel_halo': {
            "scene": [
                "Chute libre à 30 000 pieds. Le sujet est un point minuscule au-dessus d'une mer de nuages illuminée par la lune. Le seul son est le hurlement du vent. C'est un moment de solitude absolue et de liberté intense.",
                "Sur la rampe ouverte d'un C-130, le sujet se tient au bord du vide, le vent glacial fouettant son visage. Il attend le signal vert, son regard fixé sur l'obscurité en dessous.",
                "Sous voile, le silence est roi. Après la violence de la chute libre, le sujet navigue calmement vers sa zone d'atterrissage, une ombre planant au-dessus d'un paysage endormi."
            ]
        },
        'extraction_vip': {
            "scene": [
                "En civil, le sujet se fraie un chemin à travers une foule hostile dans un marché bondé, son bras fermement enroulé autour d'un VIP. Son regard balaye constamment la foule, cherchant la menace.",
                "Des tirs éclatent. Le sujet pousse violemment le VIP à l'intérieur d'un véhicule blindé, se retournant pour riposter avant même que la porte ne soit fermée.",
                "Sur un toit, le sujet est allongé, l'œil dans la lunette de son fusil de précision. Il couvre l'extraction du VIP par hélicoptère en contrebas, son doigt effleurant la détente."
            ]
        },
        'sabotage_d_infrastructure': {
            "scene": [
                "Suspendu sous un pont ferroviaire dans l'obscurité, le sujet fixe des charges de C4 sur une poutre en acier. La seule lumière est celle, rouge et discrète, de sa lampe frontale.",
                "Dans une salle de contrôle, le sujet tape frénétiquement sur un ordinateur portable, piratant le système d'une antenne radar. Des lignes de code défilent sur l'écran et se reflètent dans ses lunettes.",
                "À des kilomètres de distance, depuis un poste d'observation, le sujet regarde sa cible à travers des jumelles. Sa main se lève, prête à appuyer sur le détonateur."
            ]
        },
        'poste_d_observation': {
            "scene": [
                "Parfaitement camouflé dans la végétation, le sujet est immobile depuis des heures. La caméra fait un gros plan sur son œil qui regarde à travers des jumelles à très longue portée. Il ne fait qu'un avec la nature.",
                "Dans un 'nid de corbeau' urbain, un appartement abandonné, le sujet dessine méticuleusement la disposition des gardes dans un carnet. C'est un travail de patience et de précision.",
                "La lueur verte du désignateur laser illumine le visage concentré du sujet alors qu'il marque une cible pour une frappe aérienne. Un pouvoir immense contenu dans un petit point de lumière."
            ]
        },
        'assaut_vertical_rappel': {
            "scene": [
                "Le sujet descend en rappel 'à l'australienne' (face au sol) le long d'une façade de gratte-ciel en verre, la ville se reflétant sous lui. C'est une danse verticale défiant la gravité.",
                "Au bord du toit, le sujet vérifie une dernière fois son harnais et sa corde, jetant un regard dans le vide avant de basculer en arrière dans la nuit.",
                "À mi-descente, le sujet se balance avec force pour percuter une fenêtre, entrant dans le bâtiment dans une pluie de verre."
            ]
        },
        'guerre_en_tunnel': {
            "scene": [
                "Le faisceau de la lampe tactique du sujet coupe l'obscurité d'un tunnel souterrain étroit et suintant. Chaque goutte d'eau qui tombe résonne dans le silence tendu.",
                "Le sujet déploie un petit robot de reconnaissance à roues qui s'enfonce dans le tunnel. Il observe la progression du robot sur une tablette attachée à son poignet.",
                "À une intersection de tunnels, l'équipe fait une pause. Le sujet consulte un plan sur une tablette, la lumière de l'écran révélant les visages fatigués et tendus de ses coéquipiers."
            ]
        },
        'capture_de_cible_hvt': {
            "scene": [
                "L'instant du chaos. Le sujet extrait violemment une cible de grande valeur (HVT) d'une berline noire après un accident orchestré. Les cris et le bruit de tôle froissée remplissent l'air.",
                "Le sujet maintient fermement la cible au sol, passant rapidement des menottes en plastique. Son regard ne quitte jamais les alentours, évaluant les menaces pendant que son équipe sécurise la zone.",
                "Pendant l'exfiltration vers l'hélicoptère, le sujet ne lâche pas le bras de la HVT, le traînant presque. C'est une course contre la montre."
            ]
        },
        'demolition_sous_marine': {
            "scene": [
                "Dans une eau trouble, le sujet, plongeur de combat, pose une mine magnétique sur la coque d'un navire. Les bulles de son recycleur sont la seule indication de sa présence.",
                "En utilisant des outils hydrauliques qui semblent massifs sous l'eau, l'équipe coupe un câble de communication sous-marin. L'effort est visible malgré la lenteur des mouvements.",
                "Gros plan sur la main gantée du sujet qui tourne le minuteur d'un détonateur. Il jette un dernier regard à la charge avant de s'éloigner d'un coup de palmes puissant."
            ]
        },
        'preparation_clandestine': {
            "scene": [
                "Dans la lumière jaunâtre d'une chambre d'hôtel miteuse, le sujet est assis sur le lit, assemblant son fusil avec une efficacité froide et silencieuse. Chaque pièce s'emboîte avec un clic métallique.",
                "Le sujet, en civil, est assis à la terrasse d'un café. Derrière ses lunettes de soleil, son regard n'est pas sur son café, mais sur le bâtiment de l'autre côté de la rue, sa cible.",
                "Étendu sur le sol de sa chambre, le sujet étudie une carte de la ville, traçant des itinéraires avec un marqueur rouge. Son visage est un masque de concentration absolue."
            ]
        },
    },
    'navy_seal': {
        'debarquement_amphibie': {
            "scene": [
                "Émergeant des vagues comme des fantômes, l'équipe prend position. Le sujet, à genoux dans le ressac, lève ses lunettes de vision nocturne, révélant un regard intense qui balaie la plage sombre.",
                "Le bateau pneumatique heurte le sable avec un bruit sourd. Avant même qu'il ne s'arrête, le sujet saute dans l'eau jusqu'à la taille, son arme déjà en position, sécurisant la zone de débarquement en quelques secondes.",
                "Regroupés derrière une dune, à l'abri des regards, le sujet chuchote dans sa radio. Sa voix est calme, contrastant avec le bruit des vagues et le sifflement du vent."
            ]
        },
        'plongee_combat': {
            "scene": [
                "Sous l'eau, dans une obscurité presque totale, le sujet pose une mine magnétique sur la coque d'un sous-marin. La seule lumière est la lueur verte de sa montre tactique, qui illumine ses mains et la surface métallique.",
                "L'écoutille du mini-sous-marin (SDV) s'ouvre, libérant une colonne de bulles. Le sujet, en tête, se glisse à l'extérieur, une silhouette se découpant dans la faible lumière bleue du cockpit.",
                "Naviguant dans une forêt de piliers de quai couverts d'algues, le sujet se déplace avec une grâce prédatrice, son fusil d'assaut sous-marin prêt à faire feu."
            ]
        },
        'sabotage_portuaire': {
            "scene": [
                "Le sujet émerge de l'eau huileuse le long d'un quai, sans une éclaboussure. Des gouttes d'eau perlent sur son visage alors qu'il place une charge de démolition contre un pilier en béton.",
                "Caché dans l'ombre d'un conteneur, le sujet se déplace avec une furtivité féline à travers la zone portuaire. Les lumières des grues balaient la zone, mais il reste invisible.",
                "Depuis un toit surplombant le port, le sujet observe les rondes des gardes à travers des jumelles. Il est une statue immobile, attendant le moment parfait pour agir."
            ]
        },
        'operations_urbaines_cotieres': {
            "scene": [
                "Le sujet, en tête de son équipe, se penche au coin d'une ruelle étroite dans une ville méditerranéenne. Il tient son fusil en position 'low ready', prêt à engager la menace à tout moment.",
                "Dans un appartement surplombant le port, le sujet observe un navire cible à travers une lunette de détection. Son œil ne cligne pas, sa concentration est totale.",
                "L'équipe descend en rappel le long d'un mur pour atteindre un balcon. Le sujet est à mi-descente, une ombre se déplaçant rapidement sur la façade du bâtiment."
            ]
        },
        'abordage_de_navire': {
            "scene": [
                "Le sujet descend en rappel d'un hélicoptère Black Hawk sur le pont d'un cargo qui tangue en pleine mer. Il atterrit avec une agilité féline, immédiatement en position de combat.",
                "Le sujet est le premier à atteindre le pont du navire cible depuis une échelle de spéléologie. Il se hisse par-dessus le bastingage, son arme déjà pointée vers l'avant.",
                "À l'intérieur du navire, l'équipe progresse dans des couloirs étroits et métalliques. Le sujet utilise un miroir d'angle pour vérifier un coin, son visage un masque de tension contrôlée."
            ]
        },
        'infiltration_sous_marine_sdv': {
            "scene": [
                "Deux silhouettes émergent de l'eau, la forme de leur mini-sous-marin (SDV) à peine visible sous la surface. Le sujet, en tête, fait un signe de la main à son coéquipier : 'zone claire'.",
                "À l'intérieur du cockpit exigu du SDV, le visage du sujet est illuminé par les instruments de navigation. Il pilote l'engin avec une précision millimétrique à travers des eaux dangereuses.",
                "L'équipe attache son SDV à la coque d'un sous-marin ennemi. C'est une opération délicate, effectuée dans un silence presque total, uniquement perturbé par le bruit de leur propre respiration."
            ]
        },
        'extraction_helicoptere_en_mer': {
            "scene": [
                "Une corde tombe du ciel. Le sujet et son équipe s'y accrochent. L'hélicoptère les arrache à l'eau dans une gerbe d'écume. Ils sont suspendus au-dessus de l'océan, une grappe humaine s'élevant vers la sécurité.",
                "Le sujet est treuillé à bord de l'hélicoptère. L'eau s'écoule de son équipement alors qu'il est hissé, fatigué mais en sécurité.",
                "Sur le pont d'un sous-marin en surface, le sujet est le dernier à s'accrocher à la corde de l'hélicoptère, jetant un dernier regard en arrière avant d'être soulevé dans les airs."
            ]
        },
        'reconnaissance_littorale': {
            "scene": [
                "Allongé dans les rochers surplombant une plage, le sujet est un fantôme. Il observe sa cible à travers la lunette de son fusil de précision, son doigt effleurant la détente.",
                "Le sujet utilise une caméra à longue portée pour photographier les défenses ennemies. Chaque clic de l'obturateur est un son assourdissant dans le silence de sa cachette.",
                "Débarquant d'un kayak sur une côte rocheuse, le sujet et son équipe se fondent dans l'ombre. Leur mission d'observation de 24 heures ne fait que commencer."
            ]
        },
        'raid_nocturne_plateforme_petroliere': {
            "scene": [
                "Le sujet se déplace dans un labyrinthe de tuyaux et de passerelles métalliques sur une plateforme pétrolière. Chaque pas est calculé pour ne faire aucun bruit.",
                "L'équipe grimpe le long d'un des piliers massifs de la plateforme, émergeant de la mer comme des créatures de la nuit. Le sujet est le premier à atteindre une passerelle.",
                "Sur l'héliport de la plateforme, le sujet place des charges explosives sur un hélicoptère ennemi. Ses mouvements sont rapides et efficaces dans l'obscurité."
            ]
        },
        'tenue_ceremonie': {
            "scene": [
                "Impeccable dans son uniforme 'Service Dress White', le sujet se tient sur le pont d'un navire de guerre, le vent faisant claquer le drapeau derrière lui. Son regard est fixé sur l'horizon.",
                "Portrait formel. Le sujet nous fait face, sa poitrine couverte de médailles. Le Trident des SEALs est visible, un symbole de son appartenance à l'élite.",
                "L'instant de la reconnaissance. Un amiral épingle une médaille sur l'uniforme du sujet. Son visage reste humble mais fier."
            ]
        },
    },
};


/**
 * Retrieves a specialized prompt if one exists for the given style and sub-style combination.
 * This version introduces randomness by selecting from an array of scenes.
 * @param style The main style selected by the user.
 * @param subStyle The sub-style selected by the user.
 * @param options Additional options from the UI to be injected into the prompt.
 * @returns A detailed prompt string or null if no specialized prompt is found.
 */
export const getSpecializedPrompt = (style: string, subStyle: string, options: PromptOptions): string | null => {
    const styleData = PROMPT_DATABASE[style];
    if (styleData && styleData[subStyle]) {
        const subStyleData = styleData[subStyle];
        
        // Check if it has a 'scene' array and select a random one
        if (subStyleData.scene && Array.isArray(subStyleData.scene) && subStyleData.scene.length > 0) {
            const randomScene = subStyleData.scene[Math.floor(Math.random() * subStyleData.scene.length)];
            
            // Construct the full prompt with the chosen scene and technical specs
            const technicalSpecs = `Spécifications techniques : Format ${options.aspectRatio}. Mode couleur : ${options.colorMode}. Qualité de rendu : ${options.renderQuality}. Cible d'upscale : ${options.upscale}.`;
            
            // The prompt structure now directly uses the scene text.
            return `${randomScene}\n\n${technicalSpecs}`;
        }
    }
    return null;
};