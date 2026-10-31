import { FileText } from "lucide-react";
import { getProduct } from "@/content/products";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ExpertButton } from "@/components/layout/ExpertButton";
import { CrossSection } from "./CrossSection";

export function Spotlight() {
  const p = getProduct("sp-2888-rg")!;
  const specs = p.specs.filter((s) => s.verified);
  return (
    <Section tone="dark" labelledBy="spotlight-title">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <CrossSection className="order-2 lg:order-1" />
        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-3">Flagship product</p>
          <h2 id="spotlight-title" className="text-4xl font-semibold">
            {p.name}
          </h2>
          <p className="mt-2 text-xl text-spc-green-300">{p.tagline}</p>
          <p className="mt-5 leading-relaxed text-steel-200">{p.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-steel-300">{s.label}</dt>
                <dd className="mt-1 font-mono text-lg text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/products/${p.slug}`}>
              <FileText className="h-4 w-4" aria-hidden /> Specs & datasheets
            </ButtonLink>
            <ExpertButton variant="outline-light" mode="chat" prefill={`Tell me about ${p.name} for my project: `}>
              Ask about {p.name}
            </ExpertButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
