"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/content/types";
import { familyNames, methodNames } from "@/content/products";
import { marketNames } from "@/content/markets";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

type Filters = { market: string; family: string; method: string; q: string };

export function ProductCatalogue({ products }: { products: Product[] }) {
  const router = useRouter();
  const [f, setF] = useState<Filters>({ market: "", family: "", method: "", q: "" });
  const [compare, setCompare] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!f.market || p.markets.includes(f.market as Product["markets"][number])) &&
          (!f.family || p.family === f.family) &&
          (!f.method || p.methods.includes(f.method as Product["methods"][number])) &&
          (!f.q ||
            `${p.name} ${p.tagline} ${p.applications.join(" ")}`.toLowerCase().includes(f.q.toLowerCase())),
      ),
    [products, f],
  );

  const select = (key: keyof Filters, label: string, options: Record<string, string>) => (
    <div>
      <label htmlFor={`f-${key}`} className="field-label">{label}</label>
      <select id={`f-${key}`} className="field-input" value={f[key]} onChange={(e) => setF({ ...f, [key]: e.target.value })}>
        <option value="">All</option>
        {Object.entries(options).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start" aria-label="Filters">
        <div>
          <label htmlFor="f-q" className="field-label">Search</label>
          <input id="f-q" type="search" className="field-input" placeholder="e.g. girth weld" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
        </div>
        {select("market", "Market", marketNames)}
        {select("family", "Chemistry", familyNames)}
        {select("method", "Application method", methodNames)}
        <button className="text-sm text-navy-700 underline" onClick={() => setF({ market: "", family: "", method: "", q: "" })}>
          Clear filters
        </button>
      </aside>

      <div>
        <p className="mb-4 text-sm text-steel-500" aria-live="polite">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>
        <ul className="grid gap-5 md:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.slug} className="flex flex-col rounded-xl border border-steel-200 bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">{familyNames[p.family]}</p>
              <h2 className="mt-1 text-xl font-semibold text-navy-900">
                <Link href={`/products/${p.slug}`} className="hover:underline">{p.name}</Link>
                {!p.verified && (
                  <span className="ml-2 rounded border border-dashed border-amber-cta px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase text-amber-700">
                    Placeholder
                  </span>
                )}
              </h2>
              <p className="mt-1 text-sm text-steel-700">{p.tagline}</p>
              <p className="mt-3 text-xs text-steel-500">{p.markets.map((m) => marketNames[m]).join(" · ")}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <Link href={`/products/${p.slug}`} className="text-sm font-semibold text-spc-green-700 hover:underline">
                  Specs & datasheets →
                </Link>
                <label className="flex items-center gap-2 text-xs text-steel-700">
                  <input
                    type="checkbox"
                    checked={compare.includes(p.slug)}
                    disabled={!compare.includes(p.slug) && compare.length >= 3}
                    onChange={() =>
                      setCompare((c) => (c.includes(p.slug) ? c.filter((s) => s !== p.slug) : [...c, p.slug]))
                    }
                  />
                  Compare
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-14 z-40 border-t border-steel-200 bg-white p-3 shadow-2xl transition sm:bottom-0",
          compare.length ? "translate-y-0" : "pointer-events-none translate-y-full opacity-0",
        )}
        aria-hidden={!compare.length}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
          <p className="text-sm text-navy-900">
            Comparing <strong>{compare.length}</strong> of 3
          </p>
          <button
            className={buttonClasses("secondary", "sm")}
            disabled={compare.length < 2}
            onClick={() => router.push(`/products/compare?p=${compare.join(",")}`)}
          >
            Compare now
          </button>
        </div>
      </div>
    </div>
  );
}
