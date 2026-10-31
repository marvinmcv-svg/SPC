import type { Metadata } from "next";
import Link from "next/link";
import { markets } from "@/content/markets";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { MarketIcon } from "@/components/ui/MarketIcon";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Solutions by Market",
  description: "100% solids epoxy and polyurethane coatings for pipeline, marine, storage tank, water & wastewater and industrial assets.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions", href: "/solutions" }]}
        eyebrow="Solutions"
        title="Coatings for assets that can't afford to fail."
        intro="One chemistry — 100% solids, zero VOCs — engineered for five demanding markets."
      />
      <Section tone="white">
        <ul className="grid gap-6 md:grid-cols-2">
          {markets.map((m) => (
            <li key={m.slug}>
              <Link href={`/solutions/${m.slug}`} className="group flex h-full gap-5 rounded-xl border border-steel-200 p-6 hover:border-spc-green-500 hover:shadow-lg">
                <MarketIcon icon={m.icon} className="h-10 w-10 shrink-0 text-spc-green-600" />
                <div>
                  <h2 className="text-xl font-semibold text-navy-900 group-hover:underline">{m.name}</h2>
                  <p className="mt-1 text-steel-700">{m.headline}</p>
                  <p className="mt-3 text-sm text-steel-500">{m.applications.map((a) => a.name).join(" · ")}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
