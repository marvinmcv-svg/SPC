import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { VocSavingsCalculator } from "@/components/tools/calculators/VocSavingsCalculator";

export const metadata: Metadata = {
  title: "VOC & Carbon Savings Calculator",
  description: "Estimate VOC emissions and CO2e avoided by using 100% solids coatings instead of solvent-borne alternatives.",
  alternates: { canonical: "/tools/voc-carbon-savings" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Tools", href: "/tools" }, { label: "VOC & Carbon Savings Calculator", href: "/tools/voc-carbon-savings" }]} eyebrow="Tool" title="VOC & Carbon Savings Calculator" intro="Quantify the VOC emissions your project avoids with 100% solids coatings — for permits and ESG reports." />
      <Section tone="white">
        <VocSavingsCalculator />
      </Section>
    </>
  );
}
