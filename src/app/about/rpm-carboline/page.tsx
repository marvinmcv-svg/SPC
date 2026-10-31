import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Part of RPM International & Carboline",
  description: "SPC is a standalone business within RPM International's Performance Coatings Group, reporting through Carboline.",
  alternates: { canonical: "/about/rpm-carboline" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about" }, { label: "RPM & Carboline", href: "/about/rpm-carboline" }]} eyebrow="Our family" title="Specialist focus. Global backing." />
      <Section tone="white">
        <div className="prose-spc max-w-3xl">
          <p>RPM International Inc. acquired SPC in September 2016. SPC operates as a standalone business within RPM&apos;s Performance Coatings Group and reports through Carboline.</p>
          <p>That means customers get SPC&apos;s specialist 100% solids expertise and hands-on technical service, with the supply chain, global reach and financial strength of one of the world&apos;s largest specialty coatings groups.</p>
          <p>
            <a className="underline" href={site.parent.url} target="_blank" rel="noopener noreferrer">RPM International</a> ·{" "}
            <a className="underline" href={site.parent.viaUrl} target="_blank" rel="noopener noreferrer">Carboline</a>
          </p>
        </div>
      </Section>
    </>
  );
}
