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
                "Scène : Véhicule blindé MRAP en position de surveillance dans une rue urbaine dévastée au crépuscule. L'officier au premier plan, une représentation fidèle de la personne sur la photo, est en tenue de cérémonie impeccable, créant un contraste saisissant.",
                "Un convoi de véhicules blindés traverse un paysage désertique aride. L'officier, fidèle à la photo, est debout dans la tourelle du véhicule de tête, observant les environs avec des jumelles.",
                "Maintenance d'un véhicule blindé dans un hangar faiblement éclairé. L'officier, fidèle à la photo, supervise l'opération, discutant avec un mécanicien, le visage taché de graisse."
            ]
        },
        'patrouille': {
            "scene": [
                "Une équipe de feu de 4 hommes en patrouille dans une forêt tempérée dense au crépuscule. L'homme de tête, fidèle à la photo, est agenouillé, vérifiant une carte papier.",
                "Patrouille à pied dans un village de montagne enneigé. Le chef de patrouille, fidèle à la photo, interagit avec un ancien du village.",
                "Patrouille motorisée dans le désert. Le soldat, fidèle à la photo, est aux commandes de la mitrailleuse montée sur le véhicule, scrutant l'horizon."
            ]
        },
        'uniforme_parade': {
            "scene": [
                "Un unique officier de haut rang, fidèle à la photo, dans un uniforme de cérémonie impeccable, se tenant au garde-à-vous dans un hall militaire formel devant un grand drapeau.",
                "Portrait en buste d'un officier, fidèle à la photo, avec une rangée complète de médailles sur la poitrine. L'éclairage est doux et formel, style portrait officiel.",
                "L'officier, fidèle à la photo, passe en revue les troupes lors d'une cérémonie en extérieur, son expression sérieuse et confiante."
            ]
        },
        'base_operationnelle_avancee': {
            "scene": [
                "Un membre du personnel, fidèle à la photo, guide un avion cargo Cessna Caravan sur un aérodrome militaire improvisé au lever du soleil, la poussière en suspension.",
                "À l'intérieur du centre d'opérations tactiques (TOC), l'officier, fidèle à la photo, est penché sur une carte, planifiant une mission avec son équipe.",
                "Moment de repos sur la base. Le soldat, fidèle à la photo, est assis sur une caisse de munitions, lisant une lettre de chez lui."
            ]
        },
        'salle_de_briefing': {
            "scene": [
                "Un officier, fidèle à la photo, donne des instructions à une équipe d'opérateurs attentifs autour d'une table holographique affichant une carte 3D.",
                "Dans une salle de briefing de la vieille école, l'officier, fidèle à la photo, pointe une carte murale avec une baguette, expliquant la stratégie.",
                "Fin de briefing. L'officier, fidèle à la photo, serre la main de son commandant d'équipe, une expression de confiance mutuelle sur leurs visages."
            ]
        },
        'checkpoint_sous_tension': {
            "scene": [
                "Un soldat, fidèle à la photo, fait signe à un vieux pick-up d'avancer à un checkpoint improvisé sur une route désertique. La tension est palpable.",
                "Nuit. Le soldat, fidèle à la photo, utilise une lampe de poche pour inspecter les papiers d'un conducteur, son coéquipier en couverture en arrière-plan.",
                "Une tempête de sable s'approche. Le soldat, fidèle à la photo, plisse les yeux contre le vent, maintenant sa position au checkpoint."
            ]
        },
        'feu_d_artillerie_nocturne': {
            "scene": [
                "La lueur intense du départ d'un obus d'un obusier M777 illumine la scène. Un artilleur, fidèle à la photo, se bouche les oreilles juste après avoir tiré.",
                "L'équipe d'artilleurs, dont l'un est fidèle à la photo, travaille en synchronisation pour charger le prochain obus dans l'obusier, sous la lumière blafarde de la lune.",
                "Après le tir, l'artilleur, fidèle à la photo, observe la trajectoire de l'obus dans le ciel nocturne à travers des jumelles."
            ]
        },
        'pilote_de_chasse_pre_vol': {
            "scene": [
                "Un pilote de chasse, fidèle à la photo, marche vers son F-22 Raptor sur le tarmac au coucher du soleil, son casque de vol sous le bras, style 'Top Gun'.",
                "Le pilote, fidèle à la photo, est dans le cockpit, effectuant les dernières vérifications avant le décollage. Son visage est illuminé par les écrans.",
                "L'équipe au sol, dont un membre est fidèle à la photo, fait les derniers ajustements sur l'avion de chasse avant que le pilote ne monte à bord."
            ]
        },
        'medecin_de_combat_medevac': {
            "scene": [
                "Un hélicoptère MEDEVAC atterrit, soulevant de la poussière. Un médecin de combat, fidèle à la photo, se précipite vers un soldat blessé sur une civière.",
                "À l'intérieur de l'hélicoptère en vol, le médecin de combat, fidèle à la photo, administre les premiers soins à un soldat blessé, son visage concentré malgré le chaos.",
                "Le médecin de combat, fidèle à la photo, réconforte un soldat blessé en attendant l'évacuation, lui tenant la main."
            ]
        },
        'combat_urbain_cqb': {
            "scene": [
                "Un soldat, fidèle à la photo, se déplace prudemment le long d'un mur dans un bâtiment en ruine, son fusil d'assaut prêt à faire feu.",
                "L'équipe d'assaut enfonce une porte. Le soldat de tête, fidèle à la photo, entre en premier dans la pièce sombre, éclairée uniquement par sa lampe tactique.",
                "Sur un toit, le soldat, fidèle à la photo, fournit une couverture à son équipe en contrebas, tirant sur des cibles ennemies."
            ]
        },
        'garde_d_honneur_ceremoniale': {
            "scene": [
                "Un soldat de la garde d'honneur, fidèle à la photo, se tient au garde-à-vous impeccable devant un monument national, son expression stoïque.",
                "La garde d'honneur effectue un salut au fusil parfaitement synchronisé lors d'une cérémonie. L'un des gardes est une représentation fidèle de la personne sur la photo.",
                "Gros plan sur le visage concentré du garde, fidèle à la photo, pendant qu'il effectue sa ronde au Tombeau du Soldat Inconnu."
            ]
        },
        'vie_en_caserne': {
            "scene": [
                "Un soldat, fidèle à la photo, est assis sur son lit dans une chambrée, nettoyant méticuleusement son fusil.",
                "Moment de camaraderie. Le soldat, fidèle à la photo, joue aux cartes avec ses camarades dans la salle commune de la caserne.",
                "Préparation pour l'inspection. Le soldat, fidèle à la photo, fait son lit au carré avec une précision militaire."
            ]
        },
        'maintenance_de_blinde_hangar': {
            "scene": [
                "Un mécanicien, fidèle à la photo, en combinaison de travail graisseuse, travaille sur le moteur exposé d'un char M1 Abrams dans un grand hangar de maintenance.",
                "L'équipe de maintenance, dont un membre est fidèle à la photo, utilise une grue pour soulever la tourelle d'un char pour des réparations.",
                "Le mécanicien, fidèle à la photo, effectue des soudures sur le blindage d'un véhicule, des étincelles jaillissant autour de lui."
            ]
        },
        'operations_en_milieu_arctique': {
            "scene": [
                "Un soldat, fidèle à la photo, en équipement de camouflage d'hiver, regarde à travers des jumelles dans un paysage enneigé et venteux.",
                "L'équipe progresse à skis, tirant des traîneaux de matériel à travers une forêt enneigée. L'un des soldats est une représentation fidèle de la personne sur la photo.",
                "Le soldat, fidèle à la photo, construit un abri de neige (quinzhee) pour se protéger d'une tempête de blizzard imminente."
            ]
        },
        'guerre_en_jungle': {
            "scene": [
                "Un soldat, fidèle à la photo, traverse une rivière à gué, de l'eau jusqu'à la taille, son fusil tenu haut, dans une jungle dense et humide.",
                "Le soldat, fidèle à la photo, utilise une machette pour se frayer un chemin à travers une végétation dense, son visage peint en camouflage.",
                "L'équipe fait une pause, en alerte, dans une clairière de la jungle. Le soldat, fidèle à la photo, est à l'écoute des bruits de la jungle."
            ]
        },
        'operateur_de_drone_gcs': {
            "scene": [
                "Un opérateur de drone, fidèle à la photo, est assis devant un grand écran affichant la vue d'un drone Predator dans une station de contrôle au sol sombre.",
                "Le visage de l'opérateur, fidèle à la photo, est illuminé par la lueur des moniteurs, son expression concentrée alors qu'il pilote le drone avec un joystick.",
                "L'équipe de la station de contrôle, dont un membre est fidèle à la photo, observe une cible sur l'écran principal, attendant l'ordre de faire feu."
            ]
        },
    },
    'commando': {
        'sniper': {
            "scene": [
                "Une équipe de sniper commando de deux hommes en tenue ghillie est en position de tir dissimulée sur le toit d'un bâtiment en ruine. Le tireur, fidèle à la photo, regarde à travers la lunette d'un fusil M110 SASS.",
                "Infiltration nocturne. L'équipe de sniper, dont le chef est fidèle à la photo, progresse furtivement à travers une forêt dense, sous la lueur de la lune.",
                "Dans une planque sécurisée, l'opérateur, fidèle à la photo, nettoie et calibre méticuleusement son fusil de précision, entouré de cartes et d'équipement."
            ]
        },
        'embarquement_helicoptere': {
            "scene": [
                "Extraction nocturne par corde lisse depuis un hélicoptère MH-60 Black Hawk en vol stationnaire. Un commando, fidèle à la photo, est sur la corde, à mi-hauteur.",
                "Embarquement rapide dans un hélicoptère sur le point de décoller d'une zone chaude. L'opérateur, fidèle à la photo, aide un coéquipier à monter à bord.",
                "Assis sur le bord de la soute ouverte d'un Black Hawk en vol, les pieds dans le vide, le commando, fidèle à la photo, observe le paysage défiler en dessous."
            ]
        },
        'infiltration_plage': {
            "scene": [
                "Une équipe de nageurs de combat sort des vagues sur une plage sombre. Le chef d'équipe, fidèle à la photo, donne des signaux manuels à ses hommes.",
                "Le commando, fidèle à la photo, est à moitié immergé dans l'eau, utilisant des jumelles pour observer la côte avant de débarquer.",
                "Après l'atterrissage, l'équipe se cache derrière des rochers. L'opérateur, fidèle à la photo, consulte une carte étanche à la lueur d'une lampe rouge."
            ]
        },
        'plongee_de_combat': {
            "scene": [
                "Deux plongeurs de combat émergent silencieusement d'une eau noire près des piliers d'un quai industriel. Le plongeur de tête, fidèle à la photo, retire son recycleur.",
                "Sous l'eau, le plongeur, fidèle à la photo, utilise un scooter sous-marin pour se déplacer rapidement vers sa cible.",
                "Le plongeur, fidèle à la photo, place une charge de démolition sur la coque d'un navire ennemi, travaillant dans l'obscurité quasi totale."
            ]
        },
        'raid_en_zodiac_nocturne': {
            "scene": [
                "Un Zodiac noir file à toute vitesse sur une mer agitée. L'opérateur à la proue, fidèle à la photo, scrute l'horizon avec des jumelles de vision nocturne.",
                "L'équipe de commandos aborde un autre navire depuis leur Zodiac en mouvement. L'un des opérateurs, fidèle à la photo, est le premier à monter à bord.",
                "Moteur coupé, le Zodiac dérive silencieusement vers une cible. L'opérateur, fidèle à la photo, prépare son équipement pour l'assaut."
            ]
        },
        'liberation_d_otage_cqb': {
            "scene": [
                "L'opérateur en tête de colonne ('point man'), fidèle à la photo, entre dans une pièce après que la porte ait été enfoncée, son fusil HK416 à canon court pointé.",
                "Le commando, fidèle à la photo, escorte un otage libéré à travers un couloir, le protégeant de son corps.",
                "L'équipe se prépare à entrer. L'opérateur, fidèle à la photo, place une charge de brèche sur une porte."
            ]
        },
        'saut_operationnel_halo': {
            "scene": [
                "Un opérateur commando en chute libre, fidèle à la photo, à très haute altitude, au-dessus d'une mer de nuages illuminée par la lune.",
                "Juste avant le saut, l'opérateur, fidèle à la photo, se tient sur la rampe ouverte d'un C-130, attendant le signal vert.",
                "Sous voile, après avoir ouvert son parachute, l'opérateur, fidèle à la photo, navigue vers sa zone d'atterrissage, observant le sol en contrebas."
            ]
        },
        'extraction_vip': {
            "scene": [
                "Un opérateur commando en civil, fidèle à la photo, escorte fermement un VIP à travers une foule chaotique dans une rue d'une ville du Moyen-Orient.",
                "L'opérateur, fidèle à la photo, pousse le VIP à l'intérieur d'un véhicule blindé alors que des tirs éclatent en arrière-plan.",
                "Sur un toit, l'opérateur, fidèle à la photo, fournit une couverture avec un fusil de précision pendant que le VIP est extrait par hélicoptère."
            ]
        },
        'sabotage_d_infrastructure': {
            "scene": [
                "Un commando, fidèle à la photo, fixe des charges explosives C4 sur la poutre structurelle d'un pont ferroviaire, à la lueur d'une lampe frontale rouge.",
                "L'opérateur, fidèle à la photo, utilise un ordinateur portable pour pirater le système de contrôle d'une antenne radar.",
                "Depuis un poste d'observation éloigné, l'opérateur, fidèle à la photo, s'apprête à déclencher les explosifs, regardant la cible à travers des jumelles."
            ]
        },
        'poste_d_observation': {
            "scene": [
                "Un observateur, fidèle à la photo, visage peint en camouflage, regarde à travers des jumelles à très longue portée depuis une position dissimulée dans la végétation.",
                "Dans un poste d'observation urbain ('nid de corbeau'), l'opérateur, fidèle à la photo, dessine des croquis de la zone cible dans un carnet.",
                "L'opérateur, fidèle à la photo, utilise un désignateur laser pour marquer une cible pour une frappe aérienne, son visage illuminé par la lueur verte de l'appareil."
            ]
        },
        'assaut_vertical_rappel': {
            "scene": [
                "Une équipe de commandos descend en rappel sur la façade d'un gratte-ciel en verre. L'un d'eux, fidèle à la photo, est en position 'australienne' (face au sol).",
                "L'opérateur, fidèle à la photo, se prépare à descendre, vérifiant son harnais et sa corde au bord du toit d'un bâtiment.",
                "Le commando, fidèle à la photo, se balance pour passer à travers une fenêtre en plein milieu de sa descente en rappel."
            ]
        },
        'guerre_en_tunnel': {
            "scene": [
                "Le commando de tête, fidèle à la photo, progresse lentement dans un tunnel souterrain étroit et humide, son fusil à canon court balayant les angles.",
                "L'opérateur, fidèle à la photo, utilise un robot de reconnaissance pour explorer le tunnel avant d'avancer.",
                "L'équipe fait une pause à une intersection de tunnels. L'opérateur, fidèle à la photo, consulte un plan sur une tablette tactique."
            ]
        },
        'capture_de_cible_hvt': {
            "scene": [
                "Un commando, fidèle à la photo, extrait de force une cible de grande valeur (HVT) d'une berline noire qui a été bloquée dans une intersection.",
                "L'opérateur, fidèle à la photo, menotte la cible au sol, pendant que ses coéquipiers assurent la sécurité.",
                "L'équipe exfiltre la cible vers un hélicoptère qui attend. L'opérateur, fidèle à la photo, tient fermement le bras de la HVT."
            ]
        },
        'demolition_sous_marine': {
            "scene": [
                "Un plongeur de combat, fidèle à la photo, place une mine magnétique (mine limpet) sur la coque d'un navire. Il porte un recycleur à circuit fermé.",
                "L'équipe de démolition, dont un membre est fidèle à la photo, travaille ensemble pour couper un câble sous-marin avec des outils spécialisés.",
                "Le plongeur, fidèle à la photo, active le détonateur à retardement de la charge avant de s'éloigner rapidement."
            ]
        },
        'preparation_clandestine': {
            "scene": [
                "Un opérateur, fidèle à la photo, est assis sur un lit dans une chambre d'hôtel miteuse, assemblant et vérifiant son fusil à la lueur d'une seule lampe.",
                "L'opérateur, fidèle à la photo, étudie une carte de la ville, planifiant son itinéraire d'infiltration.",
                "En civil, l'opérateur, fidèle à la photo, est assis à la terrasse d'un café, observant discrètement sa cible de l'autre côté de la rue."
            ]
        },
    },
    'navy_seal': {
        'debarquement_amphibie': {
            "scene": [
                "Une équipe de Navy SEALs émerge silencieusement des vagues sur une plage sombre. L'opérateur de tête, fidèle à la photo, est à genoux dans le ressac, scrutant la plage avec des lunettes de vision nocturne.",
                "Le débarquement se fait depuis un bateau pneumatique à coque rigide (RHIB) qui s'échoue sur la plage. L'opérateur, fidèle à la photo, est le premier à sauter et à sécuriser la zone.",
                "Après le débarquement, l'équipe se regroupe derrière la dune de sable. L'opérateur, fidèle à la photo, communique par radio avec le commandement."
            ]
        },
        'plongee_combat': {
            "scene": [
                "Opération sous-marine nocturne. Le plongeur de combat, fidèle à la photo, portant une cagoule de plongée et un recycleur, fixe une mine magnétique sur la coque d'un sous-marin ennemi. La scène est éclairée par la lueur verte de sa montre tactique.",
                "Infiltration via un mini-sous-marin (SDV). Le leader de l'équipe, fidèle à la photo, se prépare à quitter le véhicule pour approcher une installation portuaire. Lumière bleue faible provenant du cockpit.",
                "Le plongeur, fidèle à la photo, navigue à l'aide d'une boussole sous-marine à travers une forêt de piliers de quai, son fusil d'assaut sous-marin en main."
            ]
        },
        'sabotage_portuaire': {
            "scene": [
                "Le SEAL, fidèle à la photo, vient d'émerger de l'eau sombre et huileuse le long d'un quai en béton et place une charge de démolition sur un pilier.",
                "Depuis un point d'observation sur un toit, l'opérateur, fidèle à la photo, utilise des jumelles pour surveiller les gardes du port avant l'opération.",
                "Le SEAL, fidèle à la photo, se déplace furtivement dans l'ombre des conteneurs d'expédition dans une zone portuaire animée."
            ]
        },
        'operations_urbaines_cotieres': {
            "scene": [
                "L'équipe se déplace le long d'une ruelle étroite dans une ville côtière méditerranéenne. L'opérateur de tête, fidèle à la photo, se penche à un coin de rue, son fusil en position 'low ready'.",
                "Surveillance depuis un appartement surplombant le port. Le SEAL, fidèle à la photo, utilise une lunette de détection pour observer un navire cible.",
                "L'équipe effectue une descente en rappel depuis un toit sur un balcon, dans une ville côtière. L'un des opérateurs est une représentation fidèle de la personne sur la photo."
            ]
        },
        'abordage_de_navire': {
            "scene": [
                "Un hélicoptère MH-60 Black Hawk est en vol stationnaire au-dessus du pont d'un cargo en pleine mer. Un SEAL, fidèle à la photo, descend en rappel (fast rope) sur le pont.",
                "L'équipe d'abordage monte à bord du navire cible depuis un RHIB à l'aide d'une échelle de spéléologie. Le premier homme à monter, fidèle à la photo, sécurise le pont.",
                "À l'intérieur du navire, l'équipe se déplace dans des couloirs étroits. L'opérateur de tête, fidèle à la photo, utilise un miroir d'angle pour vérifier les coins."
            ]
        },
        'infiltration_sous_marine_sdv': {
            "scene": [
                "Deux plongeurs de combat, dont le leader est fidèle à la photo, émergent silencieusement de l'eau près d'une cible, la silhouette de leur mini-sous-marin (SDV) visible sous la surface.",
                "À l'intérieur du SDV, le pilote, fidèle à la photo, navigue à travers des eaux dangereuses, son visage illuminé par les instruments.",
                "L'équipe attache le SDV à la coque d'un navire plus grand pour une infiltration clandestine."
            ]
        },
        'extraction_helicoptere_en_mer': {
            "scene": [
                "Un hélicoptère MH-60 Black Hawk effectue une extraction par SPIE. Une équipe de SEALs, dont l'un est fidèle à la photo, est attachée à la corde et est soulevée hors de l'eau.",
                "Un SEAL, fidèle à la photo, est treuillé à bord de l'hélicoptère depuis la surface de l'océan.",
                "L'équipe est extraite d'un sous-marin en surface par un hélicoptère. L'un des SEALs, fidèle à la photo, est le dernier à accrocher la corde."
            ]
        },
        'reconnaissance_littorale': {
            "scene": [
                "Un sniper SEAL, fidèle à la photo, est en position couchée dans les rochers surplombant une plage ennemie, observant la cible à travers la lunette de son fusil de précision.",
                "Le SEAL, fidèle à la photo, utilise une caméra à longue portée pour photographier les défenses ennemies depuis une position d'observation dissimulée.",
                "L'équipe de reconnaissance débarque discrètement d'un kayak sur une côte rocheuse pour une mission d'observation de 24 heures. L'un des SEALs est une représentation fidèle de la personne sur la photo."
            ]
        },
        'raid_nocturne_plateforme_petroliere': {
            "scene": [
                "Un SEAL, fidèle à la photo, se déplace le long d'une passerelle métallique sur une plateforme pétrolière, son arme pointée, dans un dédale de tuyaux et de machines.",
                "L'équipe monte à bord de la plateforme pétrolière depuis la mer, en grimpant sur l'un de ses piliers. L'opérateur de tête est une représentation fidèle de la personne sur la photo.",
                "Sur l'héliport de la plateforme, le SEAL, fidèle à la photo, place des charges pour neutraliser un hélicoptère ennemi."
            ]
        },
        'tenue_ceremonie': {
            "scene": [
                "Un officier Navy SEAL, fidèle à la photo, dans son uniforme de cérémonie 'Service Dress White' impeccable, debout sur le pont d'un navire de guerre.",
                "Portrait formel d'un Navy SEAL décoré, fidèle à la photo, avec sa rangée complète de médailles, y compris le Trident des SEALs.",
                "Le SEAL, fidèle à la photo, reçoit une médaille des mains d'un amiral lors d'une cérémonie officielle."
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