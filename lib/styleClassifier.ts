// lib/styleClassifier.ts
export type StyleCategory =
  | "ACTION" | "MODE" | "URBAIN" | "FANTASTIQUE" | "HISTORIQUE"
  | "VEHICULES" | "DECO" | "NATURE" | "SPORT" | "MUSIQUE" | "CULINAIRE" | "UNKNOWN";

const PATTERNS: Record<StyleCategory, RegExp[]> = {
  ACTION:      [/commando/i, /militaire/i, /navy[_-]?seal/i, /forces?_?speciales?/i, /tactic/i],
  MODE:        [/mode/i, /haute[_-]?couture/i, /fast[_-]?fashion/i, /glamour/i, /minimaliste/i, /luxe/i, /editorial/i],
  URBAIN:      [/urbain/i, /street/i, /skate/i, /hip[_-]?hop/i, /grunge/i],
  FANTASTIQUE: [/fantastique/i, /sci[_-]?fi/i, /cyberpunk/i, /fantasy/i, /steampunk/i],
  HISTORIQUE:  [/viking/i, /medieval/i, /samoura[iï]/i, /western/i, /renaissance/i],
  VEHICULES:   [/auto(mobile)?/i, /moto/i, /a[eé]ro/i, /pilote[_-]?de[_-]?chasse/i, /naval/i, /train/i, /spatial/i],
  DECO:        [/deco/i, /architecture/i, /int(e|é)rieur/i, /design[_-]?objet/i],
  NATURE:      [/exploration/i, /aventure/i, /montagne/i, /oc[ée]an/i, /d[eé]sert/i, /for[eê]t/i],
  SPORT:       [/sport/i, /football/i, /basket/i, /surf/i, /boxe/i, /tennis/i],
  MUSIQUE:     [/concert/i, /studio[_-]?musique/i, /festival/i, /dj/i],
  CULINAIRE:   [/culinaire/i, /gastronomie/i, /cuisine/i],
  UNKNOWN:     []
};

export function classifyStyle(styleKey: string): StyleCategory {
  const k = styleKey.toLowerCase();
  for (const [cat, regs] of Object.entries(PATTERNS)) {
    if (regs.some(r => r.test(k))) return cat as StyleCategory;
  }
  return "UNKNOWN";
}
