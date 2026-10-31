import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";

const rows = [
  { label: "Solvent released while curing", spc: "None", solvent: "Typically 20–50% of the wet film" },
  { label: "VOC emissions", spc: "Zero", solvent: "Regulated, must be reported" },
  { label: "Film build per coat", spc: "High build, e.g. ≈ 60 mils (SP-2888 RG)", solvent: "Limited by solvent release" },
  { label: "Risk of solvent entrapment", spc: "None", solvent: "Rises with film thickness" },
  { label: "Crew exposure in confined spaces", spc: "No solvent vapour", solvent: "Ventilation & monitoring required" },
  { label: "Coats to reach spec", spc: "Often one", solvent: "Often several" },
];

export function WhySolids() {
  return (
    <Section tone="light" labelledBy="why-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeader
            id="why-title"
            eyebrow="Why 100% solids"
            title="Everything you apply stays on the steel."
            intro="A 100% solids coating has no solvent to evaporate. The wet film you apply is the dry film you inspect — so you build thickness faster, with no VOCs and less risk."
          />
          <Link href="/tools/voc-carbon-savings" className="group block rounded-xl border border-spc-green-500/40 bg-spc-green-100 p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">Calculator</p>
            <p className="mt-1 text-lg font-semibold text-navy-900">How much VOC would your project avoid?</p>
            <p className="mt-1 text-sm text-steel-700 group-hover:underline">Estimate VOC & CO₂e savings for your ESG report →</p>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-steel-200 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">100% solids coatings compared with solvent-borne coatings</caption>
            <thead className="bg-navy-900 text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium"> </th>
                <th scope="col" className="px-4 py-3 font-semibold">SPC 100% solids</th>
                <th scope="col" className="px-4 py-3 font-medium text-steel-300">Typical solvent-borne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-200">
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-4 py-3 font-medium text-navy-900">{r.label}</th>
                  <td className="px-4 py-3 text-steel-900">
                    <span className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-spc-green-600" aria-hidden />{r.spc}</span>
                  </td>
                  <td className="px-4 py-3 text-steel-500">
                    <span className="flex items-start gap-2"><Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{r.solvent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
