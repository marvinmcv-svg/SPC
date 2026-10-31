import type { Market, MarketSlug } from "./types";

export const markets: Market[] = [
  {
    slug: "pipeline",
    name: "Pipeline",
    short: "Girth welds, field joints, rehabilitation and mainline.",
    headline: "Field-joint and pipeline coatings that build thick in one coat.",
    icon: "pipeline",
    answer:
      "SPC supplies 100% solids, zero-VOC liquid epoxy coatings for pipeline girth welds, field joints, bends, fittings and rehabilitation. Its flagship SP-2888 RG can be brushed or sprayed and built up to about 60 mils in a single coat, and has been specified on major pipelines since its first operator approval in 1990.",
    intro:
      "Pipeline is SPC's core business. Since 1989 we have formulated liquid epoxies for the hardest part of any line: the joints, bends and repairs that are coated in the field, in the weather, against the clock. Our coatings go on thick, cure fast and bond hard to blasted steel and to the mill-applied coating on either side of the joint.",
    applications: [
      {
        slug: "girth-welds-field-joints",
        name: "Girth welds & field joints",
        description:
          "Brush- or spray-applied liquid epoxy over the cutback, overlapping FBE or 3LPE mill coatings, built in one coat.",
      },
      {
        slug: "rehabilitation",
        name: "Rehabilitation",
        description:
          "Recoating in-service lines after the old coating is removed, where surface tolerance and fast return to service matter.",
      },
      {
        slug: "bends-fittings",
        name: "Bends, fittings & valves",
        description:
          "Coating shapes that a plant line can't reach, with the same chemistry as the joints.",
      },
      {
        slug: "hdd-abrasion",
        name: "HDD & abrasion resistance",
        description:
          "Abrasion-resistant overcoats for directional drilling and bored crossings.",
      },
      {
        slug: "mainline",
        name: "Mainline",
        description: "Liquid-applied mainline coating for short runs and special sections.",
      },
    ],
    challenges: [
      "Field conditions: cold steel, humidity and wind make thin solvent-borne films fail.",
      "Schedule: the coating crew must keep pace with the welding spread.",
      "Compatibility: the joint coating has to bond to the mill coating on both sides.",
      "Inspection: the film must pass holiday testing and meet the specified DFT first time.",
    ],
    faqs: [
      {
        q: "What is a girth weld (field joint) coating?",
        a: "It is the coating applied in the field over the welded joint between two pipe sections, where the factory-applied coating has been held back (the cutback) so the pipe can be welded. It restores corrosion protection across the joint and overlaps the mill coating on either side.",
      },
      {
        q: "Why use a 100% solids liquid epoxy for field joints?",
        a: "A 100% solids epoxy contains no solvent, so nothing evaporates as it cures. The full wet film becomes dry film, which lets crews build high thickness in a single coat, avoid solvent entrapment and work without VOC emissions.",
      },
      {
        q: "How thick can SP-2888 RG be applied in one coat?",
        a: "SP-2888 RG can be built up to approximately 60 mils (about 1.5 mm) in a single coat. Always follow the current product data sheet for the specified DFT range on your project.",
      },
    ],
  },
  {
    slug: "marine",
    name: "Marine",
    short: "Hulls, decks, ballast tanks, pilings and docks.",
    headline: "Solvent-free marine protection with Lloyd's Register approval.",
    icon: "ship",
    answer:
      "SPC's marine coatings are 100% solids, zero-VOC epoxies and polyurethanes for hulls, decks, ballast tanks, pilings, docks and marine pipelines. SPC holds Lloyd's Register approval for marine use.",
    intro:
      "Seawater, abrasion and constant wet-dry cycling punish coatings. Our solvent-free systems build high film thickness quickly, which means fewer coats, less time in dry dock and no solvent vapour in enclosed spaces like ballast tanks.",
    applications: [
      { slug: "hulls", name: "Hulls", description: "High-build epoxy protection for underwater and boot-top areas." },
      { slug: "decks", name: "Decks", description: "Abrasion-resistant epoxy and polyurethane deck systems." },
      { slug: "ballast-tanks", name: "Ballast tanks", description: "Solvent-free linings for confined, immersed spaces." },
      { slug: "pilings-docks", name: "Pilings & docks", description: "Splash-zone and immersion protection for marine structures." },
      { slug: "marine-pipelines", name: "Marine pipelines", description: "Field-joint coatings for offshore and near-shore lines." },
    ],
    challenges: [
      "Enclosed spaces where solvent vapour is a safety hazard.",
      "Splash zones with severe wet-dry cycling and abrasion.",
      "Dry-dock time is expensive, so fewer coats and faster cure matter.",
    ],
    faqs: [
      {
        q: "Are SPC marine coatings approved by Lloyd's Register?",
        a: "Yes. SPC holds Lloyd's Register approval for marine coatings. Check the approvals section of each product page, or ask us for the certificate covering your specific product.",
      },
      {
        q: "Why use solvent-free coatings in ballast tanks?",
        a: "Ballast tanks are confined spaces. A 100% solids coating releases no solvent vapour while it cures, which improves crew safety and removes the risk of solvent being trapped in a thick film.",
      },
    ],
  },
  {
    slug: "storage-tanks",
    name: "Storage Tanks",
    short: "Internal linings and secondary containment.",
    headline: "High-performance tank linings, supplied as complete systems.",
    icon: "tank",
    answer:
      "SPC supplies 100% solids epoxy and epoxy novolac internal linings for storage tanks, sold as complete systems with primer, lining and application support. Epoxy novolacs are used where higher chemical and temperature resistance is needed.",
    intro:
      "A tank lining failure means downtime, contaminated product and an expensive re-line. We supply complete lining systems and the technical support to get them applied right, from surface preparation to final inspection.",
    applications: [
      { slug: "internal-linings", name: "Internal linings", description: "Floors, shells and roofs of crude, fuel, chemical and water tanks." },
      { slug: "secondary-containment", name: "Secondary containment", description: "Chemical-resistant coatings for bunds and containment areas." },
    ],
    challenges: [
      "Chemical and temperature exposure that varies by stored product.",
      "Tight shutdown windows for re-lining.",
      "Holiday-free films on floors, welds and corners.",
    ],
    faqs: [
      {
        q: "When should I choose an epoxy novolac over a standard epoxy?",
        a: "Epoxy novolacs have a higher crosslink density, which generally gives better resistance to aggressive chemicals, solvents and higher service temperatures. The right choice depends on the stored product and temperature, so check the chemical-resistance data or ask our technical team.",
      },
    ],
  },
  {
    slug: "water-wastewater",
    name: "Water & Wastewater",
    short: "Potable water pipes and tanks, digesters and sewers.",
    headline: "Solvent-free, quick-curing linings for water infrastructure.",
    icon: "water",
    answer:
      "SPC makes solvent-free, quick-curing epoxy linings for potable water pipes and tanks, plus linings for sewage digesters and wastewater structures. Because they contain no solvent, they release no VOCs and can return assets to service quickly.",
    intro:
      "Utilities need linings that protect public health, cure fast enough to limit outages and survive aggressive wastewater environments. Our 100% solids chemistry is built for exactly that.",
    applications: [
      { slug: "potable-water", name: "Potable water", description: "Linings for drinking-water pipes and reservoirs (check product approvals)." },
      { slug: "digesters", name: "Digesters", description: "Linings for sewage digesters and treatment tanks." },
      { slug: "pipes", name: "Water pipes", description: "Internal and external protection for water transmission pipe." },
    ],
    challenges: [
      "Potable water contact approvals for every product in the system.",
      "Short outage windows for reservoirs and mains.",
      "Hydrogen sulphide and acid attack in wastewater.",
    ],
    faqs: [
      {
        q: "Are SPC linings approved for potable water?",
        a: "Potable water approvals (for example NSF/ANSI/CAN 61) are product-specific. Check the approvals listed on each product page or ask our team for the current certificate before specifying.",
      },
    ],
  },
  {
    slug: "industrial",
    name: "Industrial",
    short: "Railcars, steel structures and general industrial.",
    headline: "Tough, zero-VOC protection for steel that works hard.",
    icon: "factory",
    answer:
      "Beyond pipelines and tanks, SPC's 100% solids epoxies and polyurethane finishes protect railcars, structural steel and general industrial equipment, with no VOC emissions and high film build per coat.",
    intro:
      "The same chemistry that protects pipelines in the field protects railcars and structural steel in the shop and on site: thick films, fast cure, no solvent.",
    applications: [
      { slug: "railcars", name: "Railcars", description: "Interior linings and exterior protection for railcars." },
      { slug: "steel-structures", name: "Steel structures", description: "High-build protection for structural steel." },
    ],
    challenges: [
      "Shop throughput: faster cure means faster turnaround.",
      "VOC limits on shop emissions.",
    ],
    faqs: [
      {
        q: "Do polyurethane finishes contain VOCs?",
        a: "SPC's polyurethane finishes are formulated as 100% solids, zero-VOC products. Check the data sheet for each product's exact properties.",
      },
    ],
  },
];

export function getMarket(slug: string): Market | undefined {
  return markets.find((m) => m.slug === slug);
}

export const marketNames: Record<MarketSlug, string> = Object.fromEntries(
  markets.map((m) => [m.slug, m.name]),
) as Record<MarketSlug, string>;
