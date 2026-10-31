import type { Metadata } from "next";
import { products } from "@/content/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ProductCatalogue } from "@/components/tools/ProductCatalogue";

export const metadata: Metadata = {
  title: "Products — Epoxy Amines, Epoxy Novolacs & Polyurethanes",
  description: "Browse SPC's 100% solids, zero-VOC coatings by market, chemistry, application method and approvals.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Products", href: "/products" }]}
        eyebrow="Product catalogue"
        title="100% solids. Every product. No VOCs."
        intro="Filter by market, chemistry, application method and approvals. Datasheets are always free — no form required."
      />
      <Section tone="light">
        <ProductCatalogue products={products} />
      </Section>
    </>
  );
}
