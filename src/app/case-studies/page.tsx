import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { marketNames } from "@/content/markets";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Pipeline, marine, tank and water projects protected with SPC 100% solids coatings.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Case studies", href: "/case-studies" }]} eyebrow="Proof" title="Projects that had to work the first time." intro="Challenge, solution, numbers. Filter by market on the projects map." />
      <Section tone="light">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <li key={c.slug}>
              <Link href={`/case-studies/${c.slug}`} className="block h-full overflow-hidden rounded-xl border border-steel-200 bg-white hover:shadow-lg">
                <div className="relative h-40 bg-gradient-to-br from-navy-800 to-spc-green-700">
                  {c.placeholder && <span className="absolute left-3 top-3 rounded bg-amber-cta px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-navy-950">Sample template</span>}
                </div>
                <div className="p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">{marketNames[c.market]} · {c.country} · {c.year}</p>
                  <h2 className="mt-2 text-lg font-semibold text-navy-900">{c.title}</h2>
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
