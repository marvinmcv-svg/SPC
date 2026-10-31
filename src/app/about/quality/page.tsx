import type { Metadata } from "next";
import { products } from "@/content/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Verify } from "@/components/ui/Verify";

export const metadata: Metadata = {
  title: "Quality & Approvals",
  description: "SPC approvals and certificates, including Lloyd's Register approval and pipeline operator approvals.",
  alternates: { canonical: "/about/quality" },
};

export default function Page() {
  const approvals = products.flatMap((p) => p.approvals.map((a) => ({ ...a, product: p.name, productVerified: p.verified })));
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about" }, { label: "Quality & approvals", href: "/about/quality" }]} eyebrow="Quality" title="Approvals you can check." intro="Every claim on this page links to a certificate. Ask us for any certificate not yet published." />
      <Section tone="white">
        <SectionHeader title="Approvals & certificates wall" />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-xl border border-steel-200 p-5">
            <p className="font-mono text-xs uppercase text-spc-green-700">Company</p>
            <h3 className="mt-1 font-semibold text-navy-900">Lloyd&apos;s Register approval (marine)</h3>
            <p className="mt-2 text-xs text-steel-500">Certificate number & expiry: <Verify /></p>
          </li>
          {approvals.map((a) => (
            <li key={a.product + a.name} className="rounded-xl border border-steel-200 p-5">
              <p className="font-mono text-xs uppercase text-spc-green-700">{a.product}</p>
              <h3 className="mt-1 font-semibold text-navy-900">{a.name}{(!a.verified || !a.productVerified) && <Verify />}</h3>
              <p className="mt-2 text-xs text-steel-500">Certificate & expiry date to be published.</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
