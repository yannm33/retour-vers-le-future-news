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
        'salle_de_briefing': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique, éclairage tamisé.
            Scène & Ambiance : Intérieur, une salle de briefing tactique (TOC). Des cartes sont épinglées sur les murs, des écrans affichent des images satellites.
            Personnage(s) : Un officier, représentation fidèle de la personne sur la photo, donne des instructions à une équipe d'opérateurs attentifs autour d'une table. L'ambiance est sérieuse et concentrée.
            Équipement : Ordinateurs portables robustes, casques de communication, pointeur laser.
            Requête principale : L'officier donnant le briefing doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'checkpoint_sous_tension': (opts) =>
            `Créer une image 8k ultra-réaliste, style documentaire, lumière dure du désert.
            Scène & Ambiance : Extérieur, un checkpoint improvisé sur une route désertique. Des barrières Hesco et des sacs de sable.
            Personnage(s) : Un soldat, représentation fidèle de la personne sur la photo, fait signe à un véhicule d'avancer tout en maintenant une posture vigilante, son fusil d'assaut en position basse.
            Véhicules & Transport : Un véhicule blindé (MRAP) est en position de surveillance. Un vieux pick-up s'approche du checkpoint.
            Requête principale : Le soldat au checkpoint doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'feu_d_artillerie_nocturne': (opts) =>
            `Créer une image 8k ultra-réaliste, longue exposition, action dynamique.
            Scène & Ambiance : Nuit, champ ouvert. La lueur intense du départ d'un obus d'un obusier M777 illumine la scène.
            Personnage(s) : Un artilleur, représentation fidèle de la personne sur la photo, se bouche les oreilles juste après avoir tiré. Son visage est illuminé par le flash.
            Équipement : Obusier M777, obus, équipement de protection auditive.
            Requête principale : L'artilleur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'pilote_de_chasse_pre_vol': (opts) =>
            `Créer une image 8k ultra-réaliste, style "Top Gun", golden hour.
            Scène & Ambiance : Extérieur, sur le tarmac d'une base aérienne au coucher du soleil.
            Personnage(s) : Un pilote de chasse, représentation fidèle de la personne sur la photo, marche vers son avion, son casque de vol sous le bras.
            Véhicules & Transport : Un avion de chasse moderne (F-22 Raptor ou F-35) en arrière-plan, avec la verrière ouverte.
            Requête principale : Le pilote doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'medecin_de_combat_medevac': (opts) =>
            `Créer une image 8k ultra-réaliste, style documentaire chaotique, caméra à l'épaule.
            Scène & Ambiance : Extérieur, zone de combat. Un hélicoptère MEDEVAC (Black Hawk avec croix rouges) atterrit, soulevant de la poussière.
            Personnage(s) : Un médecin de combat, représentation fidèle de la personne sur la photo, se précipite vers un soldat blessé sur une civière, prêt à le charger dans l'hélicoptère.
            Équipement : Trousse médicale de combat, civière, fumigène pour marquer la zone d'atterrissage.
            Requête principale : Le médecin de combat doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'combat_urbain_cqb': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique, intérieurs poussiéreux.
            Scène & Ambiance : Intérieur d'un bâtiment en ruine. La lumière du jour filtre à travers les trous de balles et les fenêtres brisées.
            Personnage(s) : Un soldat, représentation fidèle de la personne sur la photo, se déplace prudemment le long d'un mur, son fusil d'assaut prêt à faire feu.
            Équipement : Équipement de combat urbain complet, genouillères, casque avec support NVG.
            Requête principale : Le soldat doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'garde_d_honneur_ceremoniale': (opts) =>
            `Créer une image 8k ultra-réaliste, style formel et solennel, faible profondeur de champ.
            Scène & Ambiance : Extérieur, devant un monument national ou un cimetière militaire.
            Personnage(s) : Un soldat de la garde d'honneur, représentation fidèle de la personne sur la photo, se tient au garde-à-vous, son expression stoïque. Il porte un uniforme de cérémonie impeccable.
            Équipement : Fusil de cérémonie poli, gants blancs.
            Requête principale : Le garde doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'vie_en_caserne': (opts) =>
            `Créer une image 8k ultra-réaliste, style documentaire et intimiste.
            Scène & Ambiance : Intérieur, une chambrée de caserne. Lits superposés, casiers, équipement personnel.
            Personnage(s) : Un soldat, représentation fidèle de la personne sur la photo, est assis sur son lit, nettoyant son fusil ou écrivant une lettre. L'ambiance est calme.
            Équipement : Kit de nettoyage d'arme, photos personnelles, uniforme plié.
            Requête principale : Le soldat doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'maintenance_de_blinde_hangar': (opts) =>
            `Créer une image 8k ultra-réaliste, style industriel, éclairage de hangar.
            Scène & Ambiance : Intérieur, un grand hangar de maintenance. Des outils, des pièces de rechange et une odeur d'huile.
            Personnage(s) : Un mécanicien, représentation fidèle de la personne sur la photo, en combinaison de travail graisseuse, travaille sur le moteur exposé d'un char d'assaut (M1 Abrams).
            Véhicules & Transport : Un char M1 Abrams en cours de maintenance.
            Requête principale : Le mécanicien doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'operations_en_milieu_arctique': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique, lumière froide.
            Scène & Ambiance : Extérieur, un paysage enneigé et venteux. Le souffle est visible.
            Personnage(s) : Un soldat, représentation fidèle de la personne sur la photo, en équipement de camouflage d'hiver, regarde à travers des jumelles.
            Équipement : Tenue de camouflage de neige, raquettes ou skis, fusil avec peinture blanche.
            Requête principale : Le soldat doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'guerre_en_jungle': (opts) =>
            `Créer une image 8k ultra-réaliste, style "Platoon", lumière filtrant à travers la canopée.
            Scène & Ambiance : Extérieur, jungle dense et humide. Des rayons de lumière percent le feuillage épais.
            Personnage(s) : Un soldat, représentation fidèle de la personne sur la photo, traverse une rivière à gué, de l'eau jusqu'à la taille, son fusil tenu haut.
            Équipement : Camouflage jungle, visage peint, équipement léger et adapté à l'humidité.
            Requête principale : Le soldat doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'operateur_de_drone_gcs': (opts) =>
            `Créer une image 8k ultra-réaliste, style moderne et high-tech.
            Scène & Ambiance : Intérieur, une station de contrôle au sol (GCS), sombre, éclairée uniquement par les moniteurs.
            Personnage(s) : Un opérateur de drone, représentation fidèle de la personne sur la photo, est assis devant un grand écran affichant la vue d'un drone (Predator/Reaper). Son visage est illuminé par l'écran, son expression est concentrée.
            Équipement : Joystick, multiples moniteurs, clavier, casque de communication.
            Requête principale : L'opérateur doit être une représentation fidèle de la personne sur la photo fournie.
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
        'plongee_de_combat': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique sombre et granuleux.
            Scène & Ambiance : Nuit. Deux plongeurs de combat émergent silencieusement d'une eau noire et huileuse près des piliers d'un quai industriel.
            Personnage(s) : Le plongeur de tête, représentation fidèle de la personne sur la photo, retire son recycleur à circuit fermé Draeger. De l'eau ruisselle sur sa combinaison de plongée noire. Ils sont équipés de pistolets avec silencieux (HK MK23) et de sacs étanches.
            Équipement : Palmes, masques de plongée relevés sur le front. En arrière-plan, la silhouette d'un mini-sous-marin (SDV - Swimmer Delivery Vehicle) est à peine visible.
            Requête principale : Le plongeur de tête doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'raid_en_zodiac_nocturne': (opts) =>
            `Créer une image 8k ultra-réaliste avec un effet de vitesse et des embruns.
            Scène & Ambiance : Nuit, en pleine mer. Un Zodiac noir file à toute vitesse sur une mer agitée, sous un ciel nuageux éclairé par la lune.
            Personnage(s) : Une équipe de commandos est à bord. L'opérateur à la proue, représentation fidèle de la personne sur la photo, scrute l'horizon avec des jumelles de vision nocturne. Tous portent des équipements noirs, des gilets de sauvetage tactiques et des casques.
            Véhicules & Transport : Le Zodiac est équipé de moteurs hors-bord silencieux et d'une mitrailleuse légère montée.
            Requête principale : L'opérateur à la proue doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'liberation_d_otage_cqb': (opts) =>
            `Créer une image 8k ultra-réaliste, style caméra embarquée (GoPro), avec un éclairage violent des lampes tactiques.
            Scène & Ambiance : Intérieur, couloir d'un bâtiment délabré. Une porte vient d'être enfoncée. La poussière et les débris sont en suspension dans l'air.
            Personnage(s) : L'opérateur en tête de colonne ("point man"), représentation fidèle de la personne sur la photo, entre dans la pièce, son fusil HK416 à canon court pointé, lampe tactique allumée. Il porte un casque balistique avec des lunettes de vision nocturne relevées.
            Équipement : Bouclier balistique, bélier, charges de brèche. L'équipe suit de près.
            Requête principale : Le "point man" doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'saut_operationnel_halo': (opts) =>
            `Créer une image 8k ultra-réaliste, vue subjective depuis le casque d'un autre sauteur.
            Scène & Ambiance : Très haute altitude, nuit noire. Au-dessus d'une mer de nuages illuminée par la lune en dessous.
            Personnage(s) : Un opérateur commando en chute libre. Il est une représentation fidèle de la personne sur la photo. Il porte une combinaison de saut, un masque à oxygène, des lunettes de protection et un casque avec altimètre visible.
            Équipement : Parachute dorsal et ventral, sac de matériel attaché aux jambes.
            Requête principale : Le sauteur en chute libre doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'extraction_vip': (opts) =>
            `Créer une image 8k ultra-réaliste, style reportage de guerre tendu.
            Scène & Ambiance : Jour, rue chaotique d'une ville du Moyen-Orient ou d'Asie. Fumée, foule en panique.
            Personnage(s) : Un opérateur commando en civil (jean, veste tactique discrète), représentation fidèle de la personne sur la photo, escorte fermement un civil (le VIP) à travers la foule, son pistolet (Glock 19) à la main en position de sécurité.
            Équipement : Oreillette de communication discrète, sac à dos tactique.
            Requête principale : L'opérateur commando doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'sabotage_d_infrastructure': (opts) =>
            `Créer une image 8k ultra-réaliste, éclairage nocturne dramatique.
            Scène & Ambiance : Nuit. Au pied d'un pont ferroviaire en treillis métallique ou d'une antenne radar.
            Personnage(s) : Un commando, représentation fidèle de la personne sur la photo, est en train de fixer des charges explosives C4 sur une poutre structurelle. Il travaille à la lueur d'une lampe frontale rouge pour préserver sa vision nocturne.
            Équipement : Sac à dos rempli d'explosifs, détonateurs, pinces. Un coéquipier assure la sécurité en arrière-plan.
            Requête principale : Le commando plaçant les charges doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'poste_d_observation': (opts) =>
            `Créer une image 8k ultra-réaliste, très faible profondeur de champ, focus sur le visage.
            Scène & Ambiance : Jour, position de surveillance dissimulée dans une végétation dense ou dans les décombres d'un bâtiment.
            Personnage(s) : Un observateur, représentation fidèle de la personne sur la photo, a le visage peint en camouflage. Il regarde à travers des jumelles à très longue portée (Leica Vector). Son expression est concentrée et patiente.
            Équipement : Filet de camouflage, fusil de précision avec silencieux à proximité (M110 SASS).
            Requête principale : L'observateur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'assaut_vertical_rappel': (opts) =>
            `Créer une image 8k ultra-réaliste, vue en contre-plongée depuis le sol.
            Scène & Ambiance : Nuit, façade d'un gratte-ciel en verre ou d'un barrage en béton.
            Personnage(s) : Une équipe de commandos descend en rappel. L'un d'eux, représentation fidèle de la personne sur la photo, est à mi-descente, en position "australienne" (face au sol), prêt à tirer avec son pistolet à silencieux.
            Équipement : Harnais, cordes de rappel, mousquetons, équipement de combat noir.
            Requête principale : Le commando en rappel doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'guerre_en_tunnel': (opts) =>
            `Créer une image 8k ultra-réaliste, style claustrophobique, éclairage unique par les lampes d'armes.
            Scène & Ambiance : Intérieur, tunnel souterrain étroit et humide, en béton brut ou creusé à même la terre.
            Personnage(s) : Le commando de tête, représentation fidèle de la personne sur la photo, progresse lentement, son fusil à canon court (HK416c) balayant les angles. Le faisceau de sa lampe d'arme est la principale source de lumière, créant de longues ombres.
            Équipement : Appareil respiratoire à circuit court possible, genouillères, équipement compact.
            Requête principale : Le commando de tête doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'capture_de_cible_hvt': (opts) =>
            `Créer une image 8k ultra-réaliste, scène d'action figée et dynamique.
            Scène & Ambiance : Nuit, intersection de rue. Une berline noire a été bloquée. Les portières sont ouvertes.
            Personnage(s) : Un commando, représentation fidèle de la personne sur la photo, extrait de force une cible de grande valeur (HVT) du véhicule. L'action est rapide et agressive. D'autres commandos couvrent les angles.
            Équipement : Casques avec lampes stroboscopiques pour désorienter, menottes flexibles, fusils pointés.
            Requête principale : Le commando effectuant l'extraction doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'demolition_sous_marine': (opts) =>
            `Créer une image 8k ultra-réaliste, ambiance sous-marine verdâtre et trouble.
            Scène & Ambiance : Sous l'eau, près de la coque d'un cargo ou d'un sous-marin. Des bulles s'échappent lentement.
            Personnage(s) : Un plongeur de combat, représentation fidèle de la personne sur la photo, place une mine magnétique (mine limpet) sur la coque. Il porte un recycleur à circuit fermé pour ne pas faire de bulles.
            Équipement : Profondimètre au poignet, boussole sous-marine, lampe de plongée.
            Requête principale : Le plongeur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
        'preparation_clandestine': (opts) =>
            `Créer une image 8k ultra-réaliste, style clair-obscur, ambiance tendue.
            Scène & Ambiance : Intérieur, une chambre d'hôtel miteuse ou un entrepôt abandonné.
            Personnage(s) : Un opérateur, représentation fidèle de la personne sur la photo, est assis sur un lit ou une caisse. Il assemble et vérifie son fusil (par ex. un SCAR-H avec silencieux) à la lueur d'une seule lampe de bureau. D'autres pièces d'équipement sont étalées autour de lui.
            Équipement : Cartes, radio satellite, chargeurs, équipement médical, fausse identité.
            Requête principale : L'opérateur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
    },
    'Navy SEAL': {
        'debarquement_amphibie': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique nocturne, grain de film prononcé.
            Scène & Ambiance : Nuit, une plage sombre. Une équipe de Navy SEALs émerge silencieusement des vagues, l'eau ruisselant sur leur équipement de combat noir.
            Personnage(s) : L'opérateur de tête, une représentation fidèle de la personne sur la photo, est à genoux dans le ressac, scrutant la plage avec des lunettes de vision nocturne (GPNVG-18).
            Équipement : Armes avec silencieux (HK416), équipement de combat humide, sacs étanches.
            Véhicules & Transport : En arrière-plan, la silhouette d'un bateau pneumatique à coque rigide (RHIB) est visible juste au-delà des brisants.
            Requête principale : L'opérateur de tête doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'plongee_combat': (opts) =>
            `Créer une image 8k ultra-réaliste, ambiance sous-marine verdâtre et trouble.
            Scène & Ambiance : Sous l'eau, près de la coque d'un cargo ou d'un sous-marin. Des bulles s'échappent lentement du recycleur.
            Personnage(s) : Un plongeur de combat, représentation fidèle de la personne sur la photo, vérifie sa boussole de poignet. Il porte un recycleur à circuit fermé (Draeger LAR V) pour ne pas faire de bulles.
            Équipement : Palmes, boussole sous-marine, fusil d'assaut sous-marin (APS), mine magnétique (mine limpet) attachée à son équipement.
            Requête principale : Le plongeur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'sabotage_portuaire': (opts) =>
            `Créer une image 8k ultra-réaliste, style film d'espionnage nocturne, très contrasté.
            Scène & Ambiance : Nuit, un port industriel. Le SEAL vient d'émerger de l'eau sombre et huileuse le long d'un quai en béton.
            Personnage(s) : Le SEAL, représentation fidèle de la personne sur la photo, retire son équipement de plongée. Il est en train de placer une charge de démolition sur un pilier du quai.
            Équipement : Combinaison de plongée noire, charges explosives, détonateurs. La scène est éclairée uniquement par la lune et les lumières lointaines du port.
            Requête principale : Le SEAL doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'operations_urbaines_cotieres': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique, lumière de fin de journée ("golden hour").
            Scène & Ambiance : Une ville côtière méditerranéenne. L'équipe se déplace le long d'une ruelle étroite avec vue sur la mer.
            Personnage(s) : L'opérateur de tête, représentation fidèle de la personne sur la photo, se penche à un coin de rue, son fusil (HK416) en position "low ready". Il porte un équipement léger et discret par-dessus des vêtements civils.
            Équipement : Porte-plaques discret, casque balistique rapide, pistolet à la hanche.
            Requête principale : L'opérateur doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'abordage_de_navire': (opts) =>
            `Créer une image 8k ultra-réaliste, action dynamique, mer agitée.
            Scène & Ambiance : Nuit, en pleine mer. Un hélicoptère MH-60 Black Hawk est en vol stationnaire au-dessus du pont d'un cargo. Le souffle du rotor soulève des embruns.
            Personnage(s) : Un SEAL, représentation fidèle de la personne sur la photo, descend en rappel (fast rope) sur le pont du navire. L'équipe se déploie rapidement sur le pont.
            Équipement : Équipement de VBSS (Visit, Board, Search, and Seizure), casques avec NVG, fusils d'assaut.
            Requête principale : Le SEAL descendant en rappel doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'infiltration_sous_marine_sdv': (opts) =>
            `Créer une image 8k ultra-réaliste, style cinématique sombre et granuleux.
            Scène & Ambiance : Nuit. Deux plongeurs de combat émergent silencieusement d'une eau noire près d'une cible (quai, navire).
            Personnage(s) : Le plongeur de tête, une représentation fidèle de la personne sur la photo, fait un signe de la main à son coéquipier.
            Véhicules & Transport : En arrière-plan, la silhouette d'un mini-sous-marin (SDV - Swimmer Delivery Vehicle) est à peine visible sous la surface.
            Requête principale : Le plongeur de tête doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'extraction_helicoptere_en_mer': (opts) =>
            `Créer une image 8k ultra-réaliste, avec un flou de mouvement et des embruns.
            Scène & Ambiance : Jour, mer agitée. Un hélicoptère MH-60 Black Hawk effectue une extraction par SPIE (Special Patrol Insertion/Extraction).
            Personnage(s) : Une équipe de SEALs, dont l'un est une représentation fidèle de la personne sur la photo, est attachée à la corde SPIE et est soulevée hors de l'eau.
            Équipement : Équipement de combat complet, harnais SPIE. L'eau s'écoule d'eux alors qu'ils s'élèvent.
            Requête principale : Le SEAL au premier plan sur la corde doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'reconnaissance_littorale': (opts) =>
            `Créer une image 8k ultra-réaliste, faible profondeur de champ.
            Scène & Ambiance : Aube, une position d'observation dissimulée dans les rochers surplombant une plage ou un port ennemi.
            Personnage(s) : Un sniper SEAL, une représentation fidèle de la personne sur la photo, est en position couchée, observant la cible à travers la lunette de son fusil de précision (Mk 13 Mod 7). Son visage est peint en camouflage.
            Équipement : Fusil de sniper avec silencieux, tenue ghillie, jumelles, radio.
            Requête principale : Le sniper doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'raid_nocturne_plateforme_petroliere': (opts) =>
            `Créer une image 8k ultra-réaliste, style film d'action, éclairage industriel.
            Scène & Ambiance : Nuit, une plateforme pétrolière en mer. L'ambiance est tendue, avec le bruit des machines et de la mer.
            Personnage(s) : Un SEAL, une représentation fidèle de la personne sur la photo, se déplace le long d'une passerelle métallique, son arme pointée. Des ombres et des reflets métalliques partout.
            Équipement : Équipement de CQB (Close Quarters Battle), NVG, fusils avec lampes tactiques.
            Requête principale : Le SEAL doit être une représentation fidèle de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,

        'tenue_ceremonie': (opts) =>
            `Créer une photo 8k ultra-réaliste, style portrait formel.
            Scène & Ambiance : Intérieur, devant un drapeau américain ou sur le pont d'un navire de guerre. La lumière est douce et contrôlée.
            Personnage(s) : Un officier Navy SEAL, une représentation fidèle de la personne sur la photo, dans son uniforme de cérémonie 'Service Dress White' impeccable.
            Équipement : Rangée complète de médailles sur la poitrine, y compris le Trident des SEALs. L'expression est sérieuse et fière.
            Requête principale : L'officier doit être une représentation hyper-réaliste de la personne sur la photo fournie.
            Spécifications techniques : Format ${opts.aspectRatio}. Mode couleur : ${opts.colorMode}. Qualité de rendu : ${opts.renderQuality}. Cible d'upscale : ${opts.upscale}.`,
    },
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