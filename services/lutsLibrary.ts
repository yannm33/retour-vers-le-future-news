/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// This file contains the library of LUTs (Look Up Tables) recognized by the system.
// Each entry provides a detailed technical and artistic description to guide the AI,
// transforming a simple nominal instruction into a true color grading brief.

export interface LUTDefinition {
  id: string;
  name: string;
  description: string;
  usage: string;
}

export const LUTS_LIBRARY: LUTDefinition[] = [
  {
    id: "sedona_iwltbap",
    name: "Sedona (IWLTBAP)",
    description: "Ton chaud inspiré 35 mm CN100, touche teal-orange douce",
    usage: "portrait, boutique, lumière chaude"
  },
  {
    id: "aspen_iwltbap",
    name: "Aspen (IWLTBAP)",
    description: "Contraste élevé, cieux cyan, peaux légèrement désaturées",
    usage: "extérieur dramatique, mode urbain"
  },
  {
    id: "renata_iwltbap",
    name: "Renata (IWLTBAP)",
    description: "Bleus profonds, contraste fort, lumière douce dans les ombres",
    usage: "scène feutrée, lumière naturelle"
  },
  {
    id: "arapaho_iwltbap",
    name: "Arapaho (IWLTBAP)",
    description: "Ambiance chaude automnale, verdure transformée en tons orangés",
    usage: "nature, boutique de luxe, intérieur chaud"
  },
  {
    id: "humble_iwltbap",
    name: "Humble (IWLTBAP)",
    description: "Vibe chaude et verte, utile en atmosphères enfumées",
    usage: "bar, fumée, scènes intérieures"
  },
  {
    id: "coronado_iwltbap",
    name: "Coronado (IWLTBAP)",
    description: "Look bleu intense pour ambiance nocturne",
    usage: "scènes de nuit, thriller, extérieur"
  },
  {
    id: "blade_runner2049_emulation",
    name: "Blade Runner 2049 (Émulation)",
    description: "Teintes froides et orangées stylisées, ambiance futuriste",
    usage: "sci-fi, mode audacieuse"
  },
  {
    id: "kodak_2383",
    name: "Kodak Vision3 2383",
    description: "Contraste modéré, tons dorés, peau organique",
    usage: "cinéma classique, portrait, publicité luxe"
  },
  {
    id: "cinematicx_default",
    name: "CinematicX Default",
    description: "Look cinéma polyvalent, balance chaude/modérée",
    usage: "usage général, mode, publicité"
  },
  {
    id: "smallhd_cinematic",
    name: "SmallHD Cinematic",
    description: "Look stylisé cinéma, contrastes prononcés",
    usage: "film, promo, rendu visuel fort"
  },
  {
    id: "bleach_bypass",
    name: "Bleach Bypass",
    description: "Désaturation partielle, contraste dur, style métallique",
    usage: "drame, polar, mode urbaine"
  },
  {
    id: "teal_orange_balanced",
    name: "Teal & Orange Balanced",
    description: "Peaux orangées, ombres vert-bleu, look blockbuster",
    usage: "publicité auto, mode, lifestyle"
  },
  {
    id: "golden_hour_cine",
    name: "Golden Hour Ciné",
    description: "Lumière chaude dorée, ambiance romantique",
    usage: "campagne parfum, mode douce"
  },
  {
    id: "monochrome_silver",
    name: "Monochrome Silver",
    description: "Noir & blanc contrasté, grain argentique",
    usage: "portrait artistique, mode classique"
  },
  {
    id: "lomochrome_92",
    name: "LomoChrome 92",
    description: "Couleurs saturées, halos artistiques",
    usage: "mode alternative, visuel créatif"
  }
];
