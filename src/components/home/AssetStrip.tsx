import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { markets } from "@/content/markets";
import { MarketIcon } from "@/components/ui/MarketIcon";
import { Section, SectionHeader } from "@/components/ui/Section";

const sceneFor: Record<string, string> = {
  pipeline: "pipeline",
  marine: "vessel",
  "storage-tanks": "tank",
  "water-wastewater": "water",
};

export function AssetStrip() {
  return (
    <Section tone="white" labelledBy="assets-title">
      <SectionHeader
        id="assets-title"
        eyebrow="What are you protecting?"
        title="Start with the asset. We'll show you the system."
        intro="Pick your asset to see recommended SPC systems, film thickness, approvals and data sheets."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {markets.map((m) => (
          <li key={m.slug}>
            <Link
              href={sceneFor[m.slug] ? `/system-selector?scene=${sceneFor[m.slug]}` : `/solutions/${m.slug}`}
              className="group flex h-full flex-col rounded-xl border border-steel-200 bg-off-white p-5 transition hover:-translate-y-0.5 hover:border-spc-green-500 hover:shadow-lg"
            >
              <MarketIcon icon={m.icon} className="h-9 w-9 text-spc-green-600" />
              <h3 className="mt-4 flex items-center justify-between text-lg font-semibold text-navy-900">
                {m.name}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
              </h3>
              <p className="mt-1 text-sm text-steel-700">{m.short}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
