import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Terms", href: "/terms" }]} title="Terms of use" intro="Draft for legal review. Not final." />
      <Section tone="white">
        <div className="prose-spc max-w-3xl">
          <h2>Technical information</h2>
          <p>Information on this website, from the calculators and from the AI assistant is general guidance. It does not replace the current product data sheet, safety data sheet, project specification or advice from SPC technical service.</p>
          <h2>AI assistant</h2>
          <p>The assistant answers from SPC documents but can make mistakes. Always confirm critical values against the current PDS/SDS.</p>
        </div>
      </Section>
    </>
  );
}
