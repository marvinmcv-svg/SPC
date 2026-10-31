import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { toolCards } from "@/components/home/ToolsRow";

export const metadata: Metadata = {
  title: "Coating Tools & Calculators",
  description: "Free field tools: system selector, spec builder, field-joint volume and kit estimator, coverage, cure time and VOC savings calculators.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Tools", href: "/tools" }]} eyebrow="Tools" title="Work it out before you order." intro="Free tools for specifiers, contractors and applicators. No sign-up." />
      <Section tone="light">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toolCards.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="group flex h-full flex-col rounded-xl border border-steel-200 bg-white p-6 hover:border-navy-600 hover:shadow-lg">
                <t.icon className="h-8 w-8 text-navy-700" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold text-navy-900">{t.title}</h2>
                <p className="mt-2 text-sm text-steel-700">{t.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
