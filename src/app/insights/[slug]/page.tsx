import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/insights";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/home/CtaBand";
import { ExpertButton } from "@/components/layout/ExpertButton";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return { title: a.title, description: a.summary, alternates: { canonical: `/insights/${a.slug}` }, openGraph: { type: "article" } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  return (
    <>
      <PageHero crumbs={[{ label: "Insights", href: "/insights" }, { label: a.title, href: `/insights/${a.slug}` }]} eyebrow={`${a.category} · ${a.readMinutes} min read`} title={a.title} intro={a.summary} />
      <Section tone="white">
        <article className="prose-spc mx-auto max-w-3xl">
          {a.draft && <p className="rounded border border-dashed border-amber-cta bg-amber-cta/10 p-3 text-sm">Draft — pending SPC technical review.</p>}
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </section>
          ))}
          <div className="not-prose mt-10 rounded-xl bg-navy-900 p-6 text-white">
            <p className="font-semibold">Have a question about your project?</p>
            <ExpertButton mode="chat" className="mt-3" prefill={`I read "${a.title}". My question: `}>Ask the tech assistant</ExpertButton>
          </div>
        </article>
      </Section>
      <CtaBand />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.summary,
        datePublished: a.published,
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        mainEntityOfPage: `${site.url}/insights/${a.slug}`,
      }} />
    </>
  );
}
