import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, CircleDashed, FileText, MessageSquareText } from "lucide-react";
import { getProduct, products, familyNames, methodNames } from "@/content/products";
import { getDocument } from "@/content/documents";
import { marketNames } from "@/content/markets";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { Verify } from "@/components/ui/Verify";
import { buttonClasses } from "@/components/ui/Button";
import { ExpertButton } from "@/components/layout/ExpertButton";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { BasketButton } from "@/components/tools/BasketButton";
import { CtaBand } from "@/components/home/CtaBand";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${familyNames[p.family]}`,
    description: p.description.slice(0, 160),
    alternates: { canonical: `/products/${p.slug}` },
    robots: p.verified ? undefined : { index: false },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const docs = p.documents.map(getDocument).filter((d) => d !== undefined);
  const cases = caseStudies.filter((c) => c.products.includes(p.slug));

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Products", href: "/products" },
          { label: p.name, href: `/products/${p.slug}` },
        ]}
        eyebrow={familyNames[p.family]}
        title={p.name}
        intro={p.tagline}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#documents" className={buttonClasses("primary", "md")}>
            <FileText className="h-4 w-4" aria-hidden /> Datasheets
          </a>
          <ExpertButton variant="outline-light" mode="chat" prefill={`Question about ${p.name}: `}>
            <MessageSquareText className="h-4 w-4" aria-hidden /> Ask about {p.name}
          </ExpertButton>
          <WhatsAppLink context={p.name} source="product" className={buttonClasses("outline-light", "md")}>
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </WhatsAppLink>
        </div>
      </PageHero>

      {!p.verified && (
        <div className="border-b border-amber-cta bg-amber-cta/15 py-3 text-center text-sm text-navy-900">
          This is a placeholder catalogue entry. Product name and data will be replaced with SPC&apos;s official data sheet.
        </div>
      )}

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-steel-700">{p.description}</p>

            <h2 className="mt-10 text-2xl font-semibold text-navy-900">Key properties</h2>
            <dl className="mt-4 divide-y divide-steel-200 rounded-xl border border-steel-200">
              {p.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 px-5 py-3">
                  <dt className="text-sm text-steel-700">{s.label}</dt>
                  <dd className="font-mono text-sm text-navy-900">
                    {s.value}
                    {!s.verified && <Verify note="Take from the current PDS" />}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-steel-500">
              Typical values. Always work from the current product data sheet and safety data sheet.
            </p>

            <h2 className="mt-10 text-2xl font-semibold text-navy-900">Where it&apos;s used</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.applications.map((a) => (
                <li key={a} className="rounded-full bg-spc-green-100 px-3 py-1 text-sm text-spc-green-700">{a}</li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-steel-200 bg-off-white p-6">
              <h2 className="font-semibold text-navy-900">At a glance</h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div><dt className="text-steel-500">Markets</dt><dd className="text-navy-900">{p.markets.map((m) => marketNames[m]).join(", ")}</dd></div>
                <div><dt className="text-steel-500">Application</dt><dd className="text-navy-900">{p.methods.map((m) => methodNames[m]).join(", ")}</dd></div>
                <div><dt className="text-steel-500">Substrates</dt><dd className="text-navy-900">{p.substrates.join(", ")}</dd></div>
              </dl>
            </div>
            <div className="rounded-xl border border-steel-200 bg-off-white p-6">
              <h2 className="font-semibold text-navy-900">Approvals</h2>
              {p.approvals.length ? (
                <ul className="mt-3 space-y-2 text-sm">
                  {p.approvals.map((a) => (
                    <li key={a.name} className="flex items-start gap-2">
                      {a.verified ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spc-green-600" aria-hidden />
                      ) : (
                        <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-steel-500" aria-hidden />
                      )}
                      <span>
                        {a.name}
                        {!a.verified && <Verify note="Confirm this product holds this approval" />}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-steel-500">Approvals to be listed.</p>
              )}
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light" id="documents">
        <SectionHeader eyebrow="Documents" title="Data sheets & guides" intro="Free to download. Add several to your basket to email or download together." />
        {docs.length ? (
          <ul className="divide-y divide-steel-200 rounded-xl border border-steel-200 bg-white">
            {docs.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-navy-700" aria-hidden />
                  <div>
                    <p className="font-medium text-navy-900">{d.title}</p>
                    <p className="font-mono text-xs text-steel-500">{d.type} · {d.language.toUpperCase()} · v{d.version} · updated {d.updated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {d.url ? (
                    <a href={d.url} className={buttonClasses("secondary", "sm")}>Download PDF</a>
                  ) : (
                    <Link href={`/contact?topic=documents&doc=${d.id}`} className={buttonClasses("ghost", "sm")}>Request</Link>
                  )}
                  <BasketButton id={d.id} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-steel-700">
            Documents for this product are being uploaded. <Link className="underline" href="/contact?topic=documents">Request them here</Link>.
          </p>
        )}
      </Section>

      {p.faqs.length > 0 && (
        <Section tone="white">
          <SectionHeader eyebrow="FAQ" title={`${p.name} questions`} />
          <div className="max-w-3xl"><FaqList faqs={p.faqs} /></div>
        </Section>
      )}

      {cases.length > 0 && (
        <Section tone="light">
          <SectionHeader eyebrow="In the field" title={`Projects using ${p.name}`} />
          <ul className="grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="block rounded-xl border border-steel-200 bg-white p-5 hover:border-navy-600">
                  <h3 className="font-semibold text-navy-900">{c.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand title={`Specifying ${p.name}?`} body="Get the spec text, data sheets and a technical review of your project conditions." />

      {p.verified && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            category: familyNames[p.family],
            brand: { "@type": "Brand", name: "SPC" },
            manufacturer: { "@type": "Organization", name: site.name, url: site.url },
            url: `${site.url}/products/${p.slug}`,
            additionalProperty: p.specs
              .filter((s) => s.verified)
              .map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
          }}
        />
      )}
    </>
  );
}
