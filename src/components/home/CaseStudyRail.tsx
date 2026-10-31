import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { marketNames } from "@/content/markets";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export function CaseStudyRail() {
  return (
    <Section tone="white" labelledBy="cases-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader id="cases-title" eyebrow="Proven in the field" title="Projects that had to work the first time." />
        <ButtonLink href="/case-studies" variant="ghost" className="mb-10">
          All case studies →
        </ButtonLink>
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4">
        {caseStudies.map((c) => (
          <li key={c.slug} className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[32%]">
            <Link href={`/case-studies/${c.slug}`} className="flex h-full flex-col overflow-hidden rounded-xl border border-steel-200 bg-off-white hover:shadow-lg">
              <div className="relative h-40 bg-gradient-to-br from-navy-800 to-spc-green-700">
                {c.placeholder && (
                  <span className="absolute left-3 top-3 rounded bg-amber-cta px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-navy-950">
                    Sample template
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">
                  {marketNames[c.market]} · {c.country} · {c.year}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{c.title}</h3>
                <dl className="mt-auto flex gap-6 pt-4">
                  {c.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <dt className="text-xs text-steel-500">{m.label}</dt>
                      <dd className="font-mono font-semibold text-navy-900">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
