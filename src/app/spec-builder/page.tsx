import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SpecBuilder } from "@/components/tools/SpecBuilder";

export const metadata: Metadata = {
  title: "Spec Builder — Coating Specification in 60 Seconds",
  description: "Answer six questions about your asset and conditions to get a recommended SPC coating system, editable spec text and data sheets.",
  alternates: { canonical: "/spec-builder" },
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Spec builder", href: "/spec-builder" }]}
        eyebrow="Spec builder"
        title="A spec package in 60 seconds."
        intro="Six quick steps. You get the recommended system, editable spec text and the data sheets — reviewed by our technical team."
      />
      <Section tone="light">
        <Suspense>
          <SpecBuilder />
        </Suspense>
      </Section>
    </>
  );
}
