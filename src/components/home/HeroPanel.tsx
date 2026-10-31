import Link from "next/link";
import { site } from "@/lib/site";

const stats = [
  { value: "100%", label: "Solids by volume", sub: "Wet film = dry film" },
  { value: "0 g/L", label: "VOC", sub: "No solvent to flash off" },
  { value: "≈60 mils", label: "In a single coat", sub: "SP-2888 RG, brush or spray" },
  { value: String(site.founded), label: "Formulating since", sub: "Pipeline approval in 1990" },
];

/** Hero side panel: the data-sheet "spec card" look, with the layered mils motif as bars. */
export function HeroPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel-300">Typical data · SPC 100% solids</p>
      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
        {stats.map((s) => (
          <div key={s.label} className="bg-navy-950/80 p-5">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-steel-300">{s.label}</dt>
            <dd className="mt-2 font-mono text-3xl font-semibold text-white">{s.value}</dd>
            <dd className="mt-1 text-xs text-steel-300">{s.sub}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full" aria-hidden>
        <span className="layer-build w-1/4 bg-steel-500" />
        <span className="layer-build w-2/4 bg-spc-green-500" style={{ animationDelay: "0.3s" }} />
        <span className="layer-build w-[6%] bg-amber-cta" style={{ animationDelay: "0.6s" }} />
        <span className="flex-1 bg-navy-700" />
      </div>
      <p className="mt-4 text-sm text-steel-300">
        Values are typical; always work from the current{" "}
        <Link href="/resources" className="text-white underline">product data sheet</Link>.
      </p>
    </div>
  );
}
