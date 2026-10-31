import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CureTimeCalculator } from "@/components/tools/calculators/CureTimeCalculator";

export const metadata: Metadata = {
  title: "Cure-Time & Dew-Point Calculator",
  description: "Check the dew-point margin and estimate how steel temperature changes coating cure time.",
  alternates: { canonical: "/tools/cure-time-calculator" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Tools", href: "/tools" }, { label: "Cure-Time & Dew-Point Calculator", href: "/tools/cure-time-calculator" }]} eyebrow="Tool" title="Cure-Time & Dew-Point Calculator" intro="Check the dew-point margin before you coat, and see how steel temperature changes your cure window." />
      <Section tone="white">
        <CureTimeCalculator />
      </Section>
    </>
  );
}
