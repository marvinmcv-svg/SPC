import type { Article } from "./types";

/**
 * Launch insight articles. These are general technical explainers written
 * answer-first for search and AI answer engines. SPC's technical team should
 * review each one before launch (draft: true until signed off).
 */
export const articles: Article[] = [
  {
    slug: "what-does-100-percent-solids-mean",
    title: "What does “100% solids” mean for a coating?",
    summary:
      "A 100% solids coating contains no solvent: everything you apply stays on the steel as cured film. Here is why that matters for film build, VOCs and crew safety.",
    category: "Explainer",
    readMinutes: 4,
    published: "2026-10-01",
    draft: true,
    sections: [
      {
        heading: "The short answer",
        body: [
          "A 100% solids coating has no solvent or water that evaporates during cure. The liquid you apply reacts chemically and becomes the cured film, so wet film thickness and dry film thickness are essentially the same.",
          "Conventional solvent-borne coatings might be 50–80% solids by volume. The rest is solvent that has to evaporate before and during cure.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Film build: with no solvent to release, thick films can be applied in a single coat without trapping solvent, which can cause blistering and porosity.",
          "Emissions: no solvent means no volatile organic compounds (VOCs) released to the air, which helps with permits, emissions reporting and neighbours.",
          "Crew safety: less solvent vapour in confined spaces such as tanks and ballast tanks.",
          "Speed: fewer coats to reach the specified thickness means less time on each joint or surface.",
        ],
      },
      {
        heading: "What to watch",
        body: [
          "100% solids coatings are often higher viscosity and have shorter pot lives. Application equipment, material temperature and mixing must follow the product data sheet. Plural-component spray equipment is common on high-production work.",
        ],
      },
    ],
  },
  {
    slug: "liquid-epoxy-vs-shrink-sleeves-field-joints",
    title: "Liquid epoxy vs. heat-shrink sleeves for pipeline field joints",
    summary:
      "Both are widely used field-joint coatings. This guide compares how they are applied, how they bond to mill coatings and where each fits.",
    category: "Guide",
    readMinutes: 6,
    published: "2026-10-08",
    draft: true,
    sections: [
      {
        heading: "The short answer",
        body: [
          "Liquid epoxies are applied as a coating over the blasted joint and cure into a continuous film bonded to the steel and the mill coating. Heat-shrink sleeves are pre-made wraps that are shrunk around the joint with heat. The right choice depends on the mill coating, service temperature, project specification and the contractor's spread.",
        ],
      },
      {
        heading: "How liquid epoxy field joints are applied",
        body: [
          "The joint is abrasive-blasted, the mill coating bevel is abraded, and the epoxy is applied by brush or spray to the specified thickness. High-build 100% solids epoxies can reach full thickness in one coat.",
        ],
      },
      {
        heading: "Questions to ask when specifying",
        body: [
          "Which standard governs the project (for example ISO 21809-3 or CSA Z245.30)?",
          "What is the mill coating (FBE, 3LPE, 3LPP) and what is the maximum operating temperature?",
          "What ambient conditions will the crew face, and what cure time is available before backfill or lowering-in?",
        ],
      },
    ],
  },
  {
    slug: "amine-blush-explained",
    title: "Amine blush: what it is and how to prevent it",
    summary:
      "Amine blush is a waxy surface film that can form on curing epoxies in cold, humid conditions. It can cause intercoat adhesion failure if it isn't removed.",
    category: "Q&A",
    readMinutes: 3,
    published: "2026-10-15",
    draft: true,
    sections: [
      {
        heading: "The short answer",
        body: [
          "Amine blush forms when amine curing agents at the surface of a curing epoxy react with moisture and carbon dioxide in the air. It shows up as a greasy, waxy or cloudy film and is most likely in cold, humid conditions.",
        ],
      },
      {
        heading: "Prevention",
        body: [
          "Apply within the temperature, humidity and dew-point limits on the product data sheet. Keep the steel at least 3 °C (5 °F) above the dew point. Use heat or enclosures in cold weather where the specification allows.",
        ],
      },
      {
        heading: "Removal",
        body: [
          "Blush is water-soluble. It is typically removed by washing with clean water and a stiff brush, then drying, before overcoating. Follow the manufacturer's instructions for the specific product.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
