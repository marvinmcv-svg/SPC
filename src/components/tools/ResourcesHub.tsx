"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import type { DocumentRef } from "@/content/types";
import { useBasket } from "@/lib/basket";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { buttonClasses } from "@/components/ui/Button";
import { BasketButton } from "./BasketButton";
import { ConsentField, Honeypot } from "./ConsentField";

export function ResourcesHub({ docs, productNames }: { docs: DocumentRef[]; productNames: Record<string, string> }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [product, setProduct] = useState("");
  const basket = useBasket();
  const { state, error, submit } = useLeadSubmit();

  const filtered = useMemo(
    () =>
      docs.filter(
        (d) =>
          (!type || d.type === type) &&
          (!product || d.product === product) &&
          (!q || d.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [docs, q, type, product],
  );
  const inBasket = docs.filter((d) => basket.has(d.id));
  const types = Array.from(new Set(docs.map((d) => d.type)));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div><label htmlFor="r-q" className="field-label">Search</label><input id="r-q" type="search" className="field-input" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div>
            <label htmlFor="r-type" className="field-label">Document type</label>
            <select id="r-type" className="field-input" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="r-product" className="field-label">Product</label>
            <select id="r-product" className="field-input" value={product} onChange={(e) => setProduct(e.target.value)}>
              <option value="">All</option>
              {Object.entries(productNames).map(([s, n]) => <option key={s} value={s}>{n}</option>)}
            </select>
          </div>
        </div>
        <ul className="divide-y divide-steel-200 rounded-xl border border-steel-200 bg-white">
          {filtered.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-navy-700" aria-hidden />
                <div>
                  <p className="font-medium text-navy-900">{d.title}</p>
                  <p className="font-mono text-xs text-steel-500">
                    {d.type} · {d.language.toUpperCase()} · v{d.version} · updated {d.updated}
                    {d.product && <> · <Link href={`/products/${d.product}`} className="underline">{productNames[d.product]}</Link></>}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {d.url ? <a href={d.url} className={buttonClasses("secondary", "sm")}>PDF</a> : <span className="self-center text-xs text-steel-500">Upload pending</span>}
                <BasketButton id={d.id} />
              </div>
            </li>
          ))}
          {!filtered.length && <li className="px-5 py-8 text-center text-steel-500">No documents match.</li>}
        </ul>
      </div>

      <aside className="h-fit rounded-xl border border-steel-200 bg-white p-6 lg:sticky lg:top-28" aria-label="Document basket">
        <h2 className="text-lg font-semibold text-navy-900">Your basket ({inBasket.length})</h2>
        {inBasket.length === 0 ? (
          <p className="mt-2 text-sm text-steel-500">Add data sheets to email or download them together.</p>
        ) : (
          <>
            <ul className="mt-3 space-y-2 text-sm">
              {inBasket.map((d) => (
                <li key={d.id} className="flex items-start justify-between gap-2">
                  <span>{d.title}</span>
                  <button onClick={() => basket.toggle(d.id)} aria-label={`Remove ${d.title}`} className="text-steel-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            {state === "done" ? (
              <p className="mt-4 rounded bg-spc-green-100 p-3 text-sm text-spc-green-700" role="status">Sent — check your inbox shortly.</p>
            ) : (
              <form
                className="relative mt-4 space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  await submit({
                    type: "documents",
                    name: f.get("name"),
                    email: f.get("email"),
                    documents: inBasket.map((d) => d.id),
                    consent: f.get("consent") === "on",
                    website: f.get("website") || undefined,
                  });
                }}
              >
                <div><label className="field-label" htmlFor="b-name">Name</label><input id="b-name" name="name" required className="field-input" /></div>
                <div><label className="field-label" htmlFor="b-email">Email</label><input id="b-email" name="email" type="email" required className="field-input" /></div>
                <ConsentField id="b-consent" />
                <Honeypot />
                {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
                <button className={buttonClasses("primary", "md", "w-full")} disabled={state === "sending"}>Email me these documents</button>
                <button type="button" className="w-full text-xs text-steel-500 underline" onClick={basket.clear}>Clear basket</button>
              </form>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
