import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Applicator Training & Certification",
  description: "Hands-on and online training for applicators of SPC 100% solids coatings.",
  alternates: { canonical: "/training" },
};

const modules = [
  "Mixing and handling 100% solids epoxies",
  "Brush application on girth welds",
  "Spray and plural-component application",
  "Inspection: DFT and holiday testing",
  "Repairs",
  "Cold-weather application",
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Training", href: "/training" }]} eyebrow="Training" title="Train your crew to get it right first time." intro="Hands-on sessions with SPC technicians, with online modules and a certified-applicator programme coming next." />
      <Section tone="white">
        <SectionHeader title="Course topics" />
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => <li key={m} className="rounded-lg border border-steel-200 p-4 text-navy-900">{m}</li>)}
        </ul>
        <div className="mt-8"><ButtonLink href="/contact?topic=callback&details=Training%20request">Book crew training</ButtonLink></div>
      </Section>
    </>
  );
}
