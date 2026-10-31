import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/insights";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Insights — Coatings Guides, Q&A and Explainers",
  description: "Answer-first guides on 100% solids coatings, field-joint coating, amine blush, DFT and more.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Insights", href: "/insights" }]} eyebrow="Insights" title="Straight answers to coatings questions." />
      <Section tone="light">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/insights/${a.slug}`} className="block h-full rounded-xl border border-steel-200 bg-white p-6 hover:border-navy-600">
                <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">{a.category} · {a.readMinutes} min</p>
                <h2 className="mt-2 text-lg font-semibold text-navy-900">{a.title}</h2>
                <p className="mt-2 text-sm text-steel-700">{a.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
