import type { Metadata } from "next";
import Link from "next/link";
import { products, familyNames, methodNames, getProduct } from "@/content/products";
import { marketNames } from "@/content/markets";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CompareForm } from "@/components/tools/CompareForm";

export const metadata: Metadata = {
  title: "Compare Products",
  description: "Compare up to three SPC coatings side by side.",
  alternates: { canonical: "/products/compare" },
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p } = await searchParams;
  const slugs = (p ?? "").split(",").filter(Boolean).slice(0, 3);
  const chosen = slugs.map(getProduct).filter((x) => x !== undefined);
  const specLabels = Array.from(new Set(chosen.flatMap((c) => c.specs.map((s) => s.label))));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Products", href: "/products" }, { label: "Compare", href: "/products/compare" }]}
        eyebrow="Compare"
        title="Compare up to three products."
      />
      <Section tone="white">
        <CompareForm options={products.map((x) => ({ slug: x.slug, name: x.name }))} initial={slugs} />

        {chosen.length === 0 ? (
          <p className="text-steel-700">Choose products above, or tick “Compare” in the <Link className="underline" href="/products">catalogue</Link>.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy-900">
                  <th scope="col" className="w-48 py-3 pr-4"> </th>
                  {chosen.map((c) => (
                    <th key={c.slug} scope="col" className="py-3 pr-4 text-lg font-semibold text-navy-900">
                      <Link href={`/products/${c.slug}`} className="hover:underline">{c.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200">
                <Row label="Chemistry" values={chosen.map((c) => familyNames[c.family])} />
                <Row label="Markets" values={chosen.map((c) => c.markets.map((m) => marketNames[m]).join(", "))} />
                <Row label="Application" values={chosen.map((c) => c.methods.map((m) => methodNames[m]).join(", "))} />
                <Row label="Approvals" values={chosen.map((c) => c.approvals.map((a) => a.name + (a.verified ? "" : " (to confirm)")).join(", ") || "—")} />
                {specLabels.map((l) => (
                  <Row key={l} label={l} mono values={chosen.map((c) => { const s = c.specs.find((x) => x.label === l); return s ? s.value + (s.verified ? "" : " (to confirm)") : "—"; })} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
}

function Row({ label, values, mono }: { label: string; values: string[]; mono?: boolean }) {
  return (
    <tr>
      <th scope="row" className="py-3 pr-4 font-medium text-steel-700">{label}</th>
      {values.map((v, i) => <td key={i} className={`py-3 pr-4 text-navy-900 ${mono ? "font-mono" : ""}`}>{v}</td>)}
    </tr>
  );
}
