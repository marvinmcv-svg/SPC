import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { getMarket, markets } from "@/content/markets";
import { products, familyNames } from "@/content/products";
import { caseStudies } from "@/content/case-studies";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/FaqList";
import { ButtonLink } from "@/components/ui/Button";
import { ExpertButton } from "@/components/layout/ExpertButton";
import { CtaBand } from "@/components/home/CtaBand";
import { Verify } from "@/components/ui/Verify";

export function generateStaticParams() {
  return markets.map((m) => ({ market: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const m = getMarket((await params).market);
  if (!m) return {};
  return {
    title: `${m.name} Coatings`,
    description: m.answer,
    alternates: { canonical: `/solutions/${m.slug}` },
  };
}

export default async function MarketPage({ params }: { params: Promise<{ market: string }> }) {
  const m = getMarket((await params).market);
  if (!m) notFound();
  const related = products.filter((p) => p.markets.includes(m.slug));
  const cases = caseStudies.filter((c) => c.market === m.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: m.name, href: `/solutions/${m.slug}` },
        ]}
        eyebrow={`${m.name} coatings`}
        title={m.headline}
        intro={m.answer}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/system-selector">Find the right system</ButtonLink>
          <ExpertButton variant="outline-light" mode="chat" prefill={`I need a ${m.name.toLowerCase()} coating for `}>
            Ask the tech assistant
          </ExpertButton>
        </div>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-spc">
            <p className="text-lg">{m.intro}</p>
            <h2>Applications</h2>
            <div className="not-prose grid gap-4 sm:grid-cols-2">
              {m.applications.map((a) => (
                <div key={a.slug} id={a.slug} className="rounded-lg border border-steel-200 bg-off-white p-5">
                  <h3 className="font-semibold text-navy-900">{a.name}</h3>
                  <p className="mt-1 text-sm text-steel-700">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl bg-navy-900 p-6 text-white">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-amber-cta" aria-hidden /> What goes wrong
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-steel-200">
                {m.challenges.map((c) => (
                  <li key={c} className="border-l-2 border-spc-green-500 pl-3">{c}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow="Products" title={`SPC products for ${m.name.toLowerCase()}`} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="block h-full rounded-xl border border-steel-200 bg-white p-6 hover:border-navy-600 hover:shadow-md">
                <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">{familyNames[p.family]}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy-900">
                  {p.name}
                  {!p.verified && <Verify note="Placeholder product entry" />}
                </h3>
                <p className="mt-1 text-sm text-steel-700">{p.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {cases.length > 0 && (
        <Section tone="white">
          <SectionHeader eyebrow="Case studies" title={`${m.name} projects`} />
          <ul className="grid gap-5 md:grid-cols-3">
            {cases.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="block rounded-xl border border-steel-200 p-5 hover:border-navy-600">
                  <p className="font-mono text-xs text-steel-500">{c.country} · {c.year}</p>
                  <h3 className="mt-1 font-semibold text-navy-900">{c.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="light">
        <SectionHeader eyebrow="FAQ" title={`${m.name} coating questions`} />
        <div className="max-w-3xl">
          <FaqList faqs={m.faqs} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
