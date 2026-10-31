import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { marketNames } from "@/content/markets";
import { getProduct } from "@/content/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buttonClasses } from "@/components/ui/Button";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.challenge.slice(0, 160), robots: c.placeholder ? { index: false } : undefined, alternates: { canonical: `/case-studies/${c.slug}` } };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Case studies", href: "/case-studies" }, { label: c.title, href: `/case-studies/${c.slug}` }]}
        eyebrow={`${marketNames[c.market]} · ${c.country} · ${c.year}`}
        title={c.title}
      />
      {c.placeholder && (
        <div className="border-b border-amber-cta bg-amber-cta/15 py-3 text-center text-sm text-navy-900">
          Sample template — to be replaced with a real, permissioned SPC project.
        </div>
      )}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-spc">
            <h2>The challenge</h2>
            <p>{c.challenge}</p>
            <h2>The solution</h2>
            <p>{c.solution}</p>
            {c.quote && (
              <blockquote className="mt-8 border-l-4 border-spc-green-500 pl-5 text-lg text-navy-900">
                “{c.quote.text}”<footer className="mt-2 text-sm text-steel-500">— {c.quote.author}, {c.quote.role}</footer>
              </blockquote>
            )}
          </div>
          <aside className="space-y-4">
            <dl className="grid grid-cols-2 gap-3">
              {c.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-navy-900 p-4 text-white">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-steel-300">{m.label}</dt>
                  <dd className="mt-1 font-mono text-xl">{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-lg border border-steel-200 p-4">
              <h2 className="text-sm font-semibold text-navy-900">Products used</h2>
              <ul className="mt-2 text-sm">
                {c.products.map((s) => <li key={s}><Link href={`/products/${s}`} className="underline">{getProduct(s)?.name ?? s}</Link></li>)}
              </ul>
            </div>
            <WhatsAppLink context={`the case study “${c.title}”`} source="case_study" className={buttonClasses("green", "md", "w-full")}>
              <WhatsAppIcon className="h-4 w-4" /> Ask about a similar project
            </WhatsAppLink>
          </aside>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
