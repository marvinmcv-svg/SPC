import Link from "next/link";
import { articles } from "@/content/insights";
import { Section, SectionHeader } from "@/components/ui/Section";

export function LatestInsights() {
  return (
    <Section tone="white" labelledBy="insights-title">
      <SectionHeader id="insights-title" eyebrow="Insights" title="Straight answers to coatings questions." />
      <ul className="grid gap-6 md:grid-cols-3">
        {articles.slice(0, 3).map((a) => (
          <li key={a.slug}>
            <Link href={`/insights/${a.slug}`} className="group block h-full rounded-xl border border-steel-200 p-6 hover:border-navy-600">
              <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">
                {a.category} · {a.readMinutes} min
              </p>
              <h3 className="mt-2 text-lg font-semibold text-navy-900 group-hover:underline">{a.title}</h3>
              <p className="mt-2 text-sm text-steel-700">{a.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
