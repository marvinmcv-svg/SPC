import type { Product, ProductFamily } from "./types";

export const familyNames: Record<ProductFamily, string> = {
  "epoxy-amine": "Epoxy Amines",
  "epoxy-novolac": "Epoxy Novolacs",
  polyurethane: "Polyurethane Finishes",
};

/**
 * Product catalogue.
 *
 * SP-2888 RG facts come from the master plan. The remaining entries are
 * clearly-marked placeholders (verified: false) for each family until SPC
 * supplies the full product list and data sheets. Do not publish placeholder
 * specs as real values.
 */
export const products: Product[] = [
  {
    slug: "sp-2888-rg",
    name: "SP-2888 RG",
    family: "epoxy-amine",
    verified: true,
    tagline: "The field-joint epoxy that started it all.",
    description:
      "SP-2888 RG is a 100% solids, zero-VOC liquid epoxy for pipeline girth welds and field joints. It is available in brush and spray grades and can be built up to approximately 60 mils in a single coat. It was first approved by a major Canadian pipeline company in 1990 and has been SPC's flagship product ever since.",
    markets: ["pipeline", "marine"],
    applications: ["Girth welds & field joints", "Bends & fittings", "Rehabilitation", "Marine pipelines"],
    methods: ["brush", "spray", "plural-spray"],
    substrates: ["Blasted carbon steel", "FBE mill coating (overlap)", "3LPE mill coating (overlap, per spec)"],
    approvals: [
      { name: "Major Canadian pipeline operator approval (since 1990)", verified: true },
      { name: "CSA Z245.30", verified: false },
      { name: "ISO 21809-3", verified: false },
    ],
    specs: [
      { label: "Solids by volume", value: "100%", verified: true },
      { label: "VOC", value: "0 g/L", verified: true },
      { label: "Max film build, one coat", value: "≈ 60 mils (1,500 µm)", verified: true },
      { label: "Application", value: "Brush or spray grade", verified: true },
      { label: "Mix ratio", value: "From current PDS", verified: false },
      { label: "Pot life @ 25 °C", value: "From current PDS", verified: false },
      { label: "Cure to handle @ 25 °C", value: "From current PDS", verified: false },
      { label: "Max service temperature", value: "From current PDS", verified: false },
    ],
    documents: ["pds-sp-2888-rg-en", "sds-sp-2888-rg-en", "guide-field-joint-en"],
    faqs: [
      {
        q: "Can SP-2888 RG be applied by brush?",
        a: "Yes. SP-2888 RG is available in brush and spray grades, so the same chemistry can be used on small repairs and on high-production spreads.",
      },
      {
        q: "What film thickness can I achieve in a single coat?",
        a: "Up to approximately 60 mils (about 1.5 mm) in one coat. Your project specification and the current PDS set the required DFT range.",
      },
      {
        q: "Does SP-2888 RG contain solvents?",
        a: "No. It is a 100% solids product with no VOCs.",
      },
    ],
    legacyId: "SP-2888 RG",
  },
  {
    slug: "epoxy-novolac-tank-lining",
    name: "Epoxy Novolac Tank Lining",
    family: "epoxy-novolac",
    verified: false,
    tagline: "Placeholder: chemical-resistant novolac lining.",
    description:
      "Placeholder entry for SPC's epoxy novolac lining range. Replace with the real product name, description and data sheet values from SPC.",
    markets: ["storage-tanks", "industrial"],
    applications: ["Internal tank linings", "Secondary containment"],
    methods: ["spray", "plural-spray"],
    substrates: ["Blasted carbon steel", "Concrete (with primer)"],
    approvals: [],
    specs: [
      { label: "Solids by volume", value: "100%", verified: true },
      { label: "VOC", value: "0 g/L", verified: true },
      { label: "Max service temperature", value: "TBC", verified: false },
    ],
    documents: [],
    faqs: [],
  },
  {
    slug: "potable-water-epoxy-lining",
    name: "Potable Water Epoxy Lining",
    family: "epoxy-amine",
    verified: false,
    tagline: "Placeholder: quick-curing lining for drinking water.",
    description:
      "Placeholder entry for SPC's potable water lining. Replace with the real product name, approvals (e.g. NSF/ANSI/CAN 61, if held) and PDS values.",
    markets: ["water-wastewater"],
    applications: ["Potable water tanks", "Potable water pipe"],
    methods: ["spray", "plural-spray"],
    substrates: ["Blasted carbon steel", "Ductile iron", "Concrete (with primer)"],
    approvals: [{ name: "NSF/ANSI/CAN 61", verified: false }],
    specs: [
      { label: "Solids by volume", value: "100%", verified: true },
      { label: "VOC", value: "0 g/L", verified: true },
    ],
    documents: [],
    faqs: [],
  },
  {
    slug: "marine-high-build-epoxy",
    name: "Marine High-Build Epoxy",
    family: "epoxy-amine",
    verified: false,
    tagline: "Placeholder: Lloyd's Register approved marine epoxy.",
    description:
      "Placeholder entry for SPC's Lloyd's Register approved marine epoxy. Replace with the real product and the certificate number.",
    markets: ["marine"],
    applications: ["Hulls", "Ballast tanks", "Pilings & docks"],
    methods: ["spray", "plural-spray", "brush"],
    substrates: ["Blasted carbon steel"],
    approvals: [{ name: "Lloyd's Register", verified: false }],
    specs: [
      { label: "Solids by volume", value: "100%", verified: true },
      { label: "VOC", value: "0 g/L", verified: true },
    ],
    documents: [],
    faqs: [],
  },
  {
    slug: "polyurethane-finish",
    name: "Polyurethane Finish",
    family: "polyurethane",
    verified: false,
    tagline: "Placeholder: tough, zero-VOC polyurethane topcoat.",
    description:
      "Placeholder entry for SPC's polyurethane finishes. Replace with the real product name and PDS values.",
    markets: ["industrial", "marine", "pipeline"],
    applications: ["Railcars", "Steel structures", "Decks", "Abrasion overcoat"],
    methods: ["plural-spray"],
    substrates: ["Epoxy primer", "Blasted carbon steel"],
    approvals: [],
    specs: [
      { label: "Solids by volume", value: "100%", verified: true },
      { label: "VOC", value: "0 g/L", verified: true },
    ],
    documents: [],
    faqs: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const methodNames: Record<string, string> = {
  brush: "Brush",
  roller: "Roller",
  spray: "Airless spray",
  "plural-spray": "Plural-component spray",
};
