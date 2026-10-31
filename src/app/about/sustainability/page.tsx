import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sustainability — Zero-VOC, Solvent-Free Coatings",
  description: "How SPC's 100% solids chemistry reduces VOC emissions, improves crew safety and extends asset life.",
  alternates: { canonical: "/about/sustainability" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about" }, { label: "Sustainability", href: "/about/sustainability" }]} eyebrow="Sustainability" title="Zero VOCs isn't a feature. It's the formula." />
      <Section tone="white">
        <div className="prose-spc max-w-3xl">
          <h2>No solvent, no VOC emissions</h2>
          <p>Every SPC product is 100% solids. There is no solvent to evaporate into the air during application or cure, so there are no VOC emissions from the coating.</p>
          <h2>Safer for crews</h2>
          <p>Less solvent vapour means a better working environment, especially in confined spaces like tanks and ballast tanks.</p>
          <h2>Less material, fewer coats</h2>
          <p>Because the wet film is the dry film, crews reach the specified thickness with less material and often in a single coat — fewer trips, less waste.</p>
          <h2>Longer asset life</h2>
          <p>The most sustainable coating is the one you don&apos;t have to replace. Thick, well-bonded films protect assets for longer.</p>
          <p>Quantify the difference for your project with our <Link className="underline" href="/tools/voc-carbon-savings">VOC & carbon savings calculator</Link>.</p>
        </div>
      </Section>
    </>
  );
}
