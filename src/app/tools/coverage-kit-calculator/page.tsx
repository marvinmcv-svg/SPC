import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CoverageCalculator } from "@/components/tools/calculators/CoverageCalculator";

export const metadata: Metadata = {
  title: "Coverage Calculator",
  description: "Calculate coating volume for tanks and areas at a specified DFT, with loss factor and kit count.",
  alternates: { canonical: "/tools/coverage-kit-calculator" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Tools", href: "/tools" }, { label: "Coverage Calculator", href: "/tools/coverage-kit-calculator" }]} eyebrow="Tool" title="Coverage Calculator" intro="Area and thickness to litres and kits, for tank linings, decks and structures." />
      <Section tone="white">
        <CoverageCalculator />
      </Section>
    </>
  );
}
