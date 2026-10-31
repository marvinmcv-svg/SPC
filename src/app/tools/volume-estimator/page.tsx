import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { VolumeEstimator } from "@/components/tools/calculators/VolumeEstimator";

export const metadata: Metadata = {
  title: "Field-Joint Volume & Kit Estimator",
  description: "Estimate litres and kits of 100% solids epoxy for pipeline girth welds from pipe OD, joint count, cutback and DFT.",
  alternates: { canonical: "/tools/volume-estimator" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Tools", href: "/tools" }, { label: "Field-Joint Volume & Kit Estimator", href: "/tools/volume-estimator" }]} eyebrow="Tool" title="Field-Joint Volume & Kit Estimator" intro="Pipe OD × joints × cutback × DFT → litres and kits. Then request a quote in one click." />
      <Section tone="white">
        <VolumeEstimator />
      </Section>
    </>
  );
}
