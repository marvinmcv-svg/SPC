import type { Metadata } from "next";
import Link from "next/link";
import { documents } from "@/content/documents";
import { products } from "@/content/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ResourcesHub } from "@/components/tools/ResourcesHub";

export const metadata: Metadata = {
  title: "Resources — Data Sheets, SDS, Application Guides & Certificates",
  description: "Download SPC product data sheets, safety data sheets, application guides and approval certificates. No sign-up required.",
  alternates: { canonical: "/resources" },
};

const standards = [
  { code: "ISO 21809-3", body: "Petroleum and natural gas industries — external coatings for buried or submerged pipelines — field joint coatings." },
  { code: "CSA Z245.30", body: "Field-applied external coatings for steel pipeline systems (Canada)." },
  { code: "AMPP (NACE) SP0188", body: "Discontinuity (holiday) testing of new protective coatings on conductive substrates." },
  { code: "NSF/ANSI/CAN 61", body: "Drinking water system components — health effects." },
  { code: "SSPC-PA 2", body: "Procedure for determining conformance to dry coating thickness requirements." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }]}
        eyebrow="Resources"
        title="Every data sheet. No forms."
        intro="Download product data sheets, SDS, application guides and certificates — or add several to your basket and email them in one go."
      />
      <Section tone="light">
        <ResourcesHub docs={documents} productNames={Object.fromEntries(products.map((p) => [p.slug, p.name]))} />
      </Section>
      <Section tone="white" id="standards">
        <SectionHeader eyebrow="Standards hub" title="The standards our coatings are specified against." intro="A quick reference. Product approvals are listed on each product page." />
        <dl className="grid gap-4 md:grid-cols-2">
          {standards.map((s) => (
            <div key={s.code} className="rounded-lg border border-steel-200 p-5">
              <dt className="font-mono font-semibold text-navy-900">{s.code}</dt>
              <dd className="mt-1 text-sm text-steel-700">{s.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-steel-700">Looking for videos and how-to guides? See <Link href="/training" className="underline">training</Link> and <Link href="/insights" className="underline">insights</Link>.</p>
      </Section>
    </>
  );
}
