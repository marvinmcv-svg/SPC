import type { MarketSlug } from "./types";

/**
 * Clickable zones for the "click the asset" system selector.
 * Each zone points at recommended product slugs. Recommendations must be
 * reviewed by SPC technical service before launch.
 */
export interface SelectorZone {
  id: string;
  label: string;
  description: string;
  products: string[];
  dft: string;
  notes: string;
  /** Position of the hotspot on the scene, in percent. */
  x: number;
  y: number;
}

export interface SelectorScene {
  id: string;
  name: string;
  market: MarketSlug;
  zones: SelectorZone[];
}

export const scenes: SelectorScene[] = [
  {
    id: "pipeline",
    name: "Pipeline right-of-way",
    market: "pipeline",
    zones: [
      {
        id: "girth-weld",
        label: "Girth weld / field joint",
        description: "Joint coating over the cutback, overlapping the mill coating.",
        products: ["sp-2888-rg"],
        dft: "Per spec; up to ≈ 60 mils in one coat",
        notes: "Brush grade for repairs and tie-ins, spray grade for production spreads.",
        x: 38,
        y: 55,
      },
      {
        id: "bend",
        label: "Bends & fittings",
        description: "Induction bends, tees and fittings coated in the field or shop.",
        products: ["sp-2888-rg"],
        dft: "Per spec",
        notes: "Same chemistry as the joints keeps the system compatible.",
        x: 70,
        y: 45,
      },
      {
        id: "hdd",
        label: "HDD crossing",
        description: "Abrasion resistance for directional drilling.",
        products: ["sp-2888-rg", "polyurethane-finish"],
        dft: "TBC with technical service",
        notes: "Abrasion-resistant overcoat recommendation to confirm.",
        x: 15,
        y: 70,
      },
    ],
  },
  {
    id: "tank",
    name: "Tank farm",
    market: "storage-tanks",
    zones: [
      {
        id: "tank-floor",
        label: "Tank floor & shell",
        description: "Internal lining in contact with stored product.",
        products: ["epoxy-novolac-tank-lining"],
        dft: "TBC by stored product",
        notes: "Choice depends on the chemical and temperature exposure.",
        x: 45,
        y: 60,
      },
      {
        id: "containment",
        label: "Secondary containment",
        description: "Bunds and containment areas.",
        products: ["epoxy-novolac-tank-lining"],
        dft: "TBC",
        notes: "Concrete requires a suitable primer.",
        x: 80,
        y: 78,
      },
    ],
  },
  {
    id: "vessel",
    name: "Vessel",
    market: "marine",
    zones: [
      {
        id: "hull",
        label: "Hull",
        description: "Underwater hull and boot-top.",
        products: ["marine-high-build-epoxy"],
        dft: "TBC",
        notes: "Antifouling topcoat compatibility to confirm.",
        x: 50,
        y: 62,
      },
      {
        id: "ballast",
        label: "Ballast tanks",
        description: "Confined, immersed spaces.",
        products: ["marine-high-build-epoxy"],
        dft: "TBC",
        notes: "Solvent-free chemistry for enclosed-space safety.",
        x: 30,
        y: 50,
      },
      {
        id: "deck",
        label: "Deck",
        description: "Abrasion and UV exposure.",
        products: ["marine-high-build-epoxy", "polyurethane-finish"],
        dft: "TBC",
        notes: "Polyurethane topcoat for UV stability.",
        x: 65,
        y: 30,
      },
    ],
  },
  {
    id: "water",
    name: "Water treatment plant",
    market: "water-wastewater",
    zones: [
      {
        id: "reservoir",
        label: "Potable water reservoir",
        description: "Drinking-water contact lining.",
        products: ["potable-water-epoxy-lining"],
        dft: "TBC",
        notes: "Confirm potable water approval for your jurisdiction.",
        x: 30,
        y: 55,
      },
      {
        id: "digester",
        label: "Digester",
        description: "Sewage digester lining.",
        products: ["epoxy-novolac-tank-lining"],
        dft: "TBC",
        notes: "H₂S and acid exposure; confirm with technical service.",
        x: 72,
        y: 50,
      },
    ],
  },
];
