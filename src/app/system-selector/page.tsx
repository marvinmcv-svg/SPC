import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SystemSelector } from "@/components/tools/SystemSelector";

export const metadata: Metadata = {
  title: "System Selector — Click the Asset",
  description: "Click a pipeline, tank farm, vessel or water plant to see the recommended SPC coating system, DFT and datasheets.",
  alternates: { canonical: "/system-selector" },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "System selector", href: "/system-selector" }]}
        eyebrow="System selector"
        title="Click the asset. Get the system."
        intro="Choose a scene, then click the area you need to protect."
      />
      <Section tone="light">
        <Suspense>
          <SystemSelector />
        </Suspense>
      </Section>
    </>
  );
}
