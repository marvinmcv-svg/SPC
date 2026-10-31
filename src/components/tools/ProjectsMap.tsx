"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseStudy, Location } from "@/content/types";
import { markets, marketNames } from "@/content/markets";
import { MapLegend, WorldMap } from "@/components/ui/WorldMap";
import { cn } from "@/components/ui/cn";

/** SVG map with filters. Swap for Mapbox GL when NEXT_PUBLIC_MAPBOX_TOKEN is configured. */
export function ProjectsMap({ projects, locations }: { projects: CaseStudy[]; locations: Location[] }) {
  const [market, setMarket] = useState("");
  const shown = projects.filter((p) => !market || p.market === market);
  return (
    <section className="dark-section bg-navy-900 pb-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by market">
          {[{ slug: "", name: "All" }, ...markets].map((m) => (
            <button key={m.slug} onClick={() => setMarket(m.slug)} aria-pressed={market === m.slug}
              className={cn("rounded-full px-3 py-1.5 text-sm", market === m.slug ? "bg-amber-cta text-navy-950" : "bg-white/10 hover:bg-white/20")}>
              {m.name}
            </button>
          ))}
        </div>
        <WorldMap className="w-full" points={[
          ...locations.map((l) => ({ id: l.id, label: l.name, coords: l.coords, kind: l.kind })),
          ...shown.map((p) => ({ id: p.slug, label: p.title, coords: p.coords, kind: "project" as const })),
        ]} />
        <MapLegend />
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link href={`/case-studies/${p.slug}`} className="block rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10">
                <p className="font-mono text-xs text-steel-300">{marketNames[p.market]} · {p.country} · {p.year}</p>
                <p className="mt-1 font-semibold">{p.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
