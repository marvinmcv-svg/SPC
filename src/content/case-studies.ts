import type { CaseStudy } from "./types";

/**
 * Case studies are on the critical path (master plan §12). These entries are
 * TEMPLATES showing the structure only. Each is flagged `placeholder: true`
 * and rendered with a visible "sample" banner until real, permissioned
 * project data replaces it.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-girth-weld-spread",
    title: "Sample: keeping pace with a mainline welding spread",
    market: "pipeline",
    country: "Canada",
    year: 2024,
    products: ["sp-2888-rg"],
    challenge:
      "Template text. Describe the project: line size, length, season and why the field-joint coating was critical (schedule, cold weather, mill coating type).",
    solution:
      "Template text. Describe the SPC system, application method, crew training and technical-service support on site.",
    metrics: [
      { label: "Joints coated", value: "TBC" },
      { label: "Pipeline length", value: "TBC km" },
      { label: "DFT achieved", value: "TBC mils" },
    ],
    coords: [-114.07, 51.05],
    placeholder: true,
  },
  {
    slug: "sample-ballast-tank-relining",
    title: "Sample: solvent-free ballast tank relining",
    market: "marine",
    country: "TBC",
    year: 2023,
    products: ["marine-high-build-epoxy"],
    challenge: "Template text. Vessel type, tank condition and dry-dock window.",
    solution: "Template text. Surface prep, SPC system and approvals that applied.",
    metrics: [
      { label: "Area lined", value: "TBC m²" },
      { label: "Dry-dock days saved", value: "TBC" },
    ],
    coords: [103.82, 1.35],
    placeholder: true,
  },
  {
    slug: "sample-potable-water-reservoir",
    title: "Sample: returning a potable water reservoir to service",
    market: "water-wastewater",
    country: "USA",
    year: 2023,
    products: ["potable-water-epoxy-lining"],
    challenge: "Template text. Reservoir size, outage window, regulatory requirements.",
    solution: "Template text. Lining system and cure schedule.",
    metrics: [
      { label: "Area lined", value: "TBC m²" },
      { label: "Outage", value: "TBC days" },
    ],
    coords: [-95.37, 29.76],
    placeholder: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
