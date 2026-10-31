import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "About SPC — 100% Solids Specialists Since 1989",
  description: "Specialty Polymer Coatings has formulated 100% solids, zero-VOC epoxies since 1989. Part of RPM International, reporting through Carboline.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "1989", text: "SPC begins formulating 100% solids epoxies." },
  { year: "1990", text: "SP-2888 RG girth-weld epoxy is approved by a major Canadian pipeline company." },
  { year: "2016", text: "RPM International acquires SPC. It runs as a standalone business in RPM's Performance Coatings Group, reporting through Carboline." },
  { year: "Today", text: "Clients worldwide, served through SPC offices and a global network of agents and distributors." },
];

const pillars = [
  { t: "Specialist expertise", b: "A 100% solids focus since 1989 — no dilution of the formula or the focus." },
  { t: "Proven in the field", b: "Decades on major pipelines, with operator approvals and Lloyd's Register approval." },
  { t: "Responsible chemistry", b: "No VOCs, no solvents — better for crews and for the planet." },
  { t: "People who pick up the phone", b: "Technical service on site and on call. Small enough to care." },
  { t: "Global backing", b: "Part of RPM and Carboline, with worldwide supply and distribution." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about" }]} eyebrow="Our story" title={site.brandLine} intro="For more than 35 years SPC has done one thing: formulate liquid coatings with no solvent in them, and help crews apply them right." />
      <Section tone="white">
        <SectionHeader eyebrow="Since 1989" title="A specialist from day one." />
        <ol className="relative space-y-8 border-l-2 border-spc-green-500 pl-8">
          {timeline.map((t) => (
            <li key={t.year}>
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-spc-green-500" aria-hidden />
              <p className="font-mono text-sm font-semibold text-spc-green-700">{t.year}</p>
              <p className="mt-1 max-w-2xl text-steel-700">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="light">
        <SectionHeader eyebrow="What we stand for" title="Five things we won't compromise on." />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <li key={p.t} className="rounded-xl border border-steel-200 bg-white p-5">
              <h3 className="font-semibold text-navy-900">{p.t}</h3>
              <p className="mt-2 text-sm text-steel-700">{p.b}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link className="underline" href="/about/rpm-carboline">RPM & Carboline</Link>
          <Link className="underline" href="/about/sustainability">Sustainability</Link>
          <Link className="underline" href="/about/quality">Quality & approvals</Link>
          <Link className="underline" href="/where-to-buy">Locations</Link>
        </div>
      </Section>
      <Section tone="white">
        <SectionHeader eyebrow="Our people" title="Meet the team" intro="Team profiles with photos and LinkedIn links are coming soon. In the meantime, our technical service team is one call away." />
      </Section>
      <CtaBand />
    </>
  );
}
