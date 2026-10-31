import Link from "next/link";
import { Calculator, ClipboardList, Crosshair, Leaf, Thermometer, Columns3 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

export const toolCards = [
  { href: "/system-selector", icon: Crosshair, title: "System selector", body: "Click the asset — pipeline, tank, vessel or water plant — and get the recommended system." },
  { href: "/spec-builder", icon: ClipboardList, title: "Spec builder", body: "Answer six questions. Get spec text and the datasheets you need, ready for your package." },
  { href: "/tools/volume-estimator", icon: Calculator, title: "Volume & kit estimator", body: "Pipe OD × joints × cutback × DFT → litres and kits, then a one-click RFQ." },
  { href: "/tools/coverage-kit-calculator", icon: Calculator, title: "Coverage calculator", body: "Area and thickness to litres for tanks, decks and structures." },
  { href: "/tools/cure-time-calculator", icon: Thermometer, title: "Cure-time estimator", body: "See how steel temperature changes your recoat and handling windows." },
  { href: "/tools/voc-carbon-savings", icon: Leaf, title: "VOC & carbon savings", body: "Quantify the emissions avoided by switching to 100% solids." },
  { href: "/products/compare", icon: Columns3, title: "Compare products", body: "Put up to three products side by side." },
];

export function ToolsRow({ limit = 3 }: { limit?: number }) {
  return (
    <Section tone="light" labelledBy="tools-title">
      <SectionHeader id="tools-title" eyebrow="Tools for the field" title="Work it out before you order." />
      <ul className="grid gap-5 md:grid-cols-3">
        {toolCards.slice(0, limit).map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="group flex h-full flex-col rounded-xl border border-steel-200 bg-white p-6 transition hover:border-navy-600 hover:shadow-lg">
              <t.icon className="h-8 w-8 text-navy-700" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{t.title}</h3>
              <p className="mt-2 text-sm text-steel-700">{t.body}</p>
              <span className="mt-auto pt-4 text-sm font-semibold text-spc-green-700 group-hover:underline">Open tool →</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
