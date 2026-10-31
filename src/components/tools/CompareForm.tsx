"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { PrintButton } from "./PrintButton";

export function CompareForm({ options, initial }: { options: { slug: string; name: string }[]; initial: string[] }) {
  const router = useRouter();
  const [sel, setSel] = useState<string[]>([initial[0] ?? "", initial[1] ?? "", initial[2] ?? ""]);
  return (
    <form
      className="mb-8 flex flex-wrap items-end gap-3 print:hidden"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/products/compare?p=${sel.filter(Boolean).join(",")}`);
      }}
    >
      {sel.map((v, i) => (
        <div key={i}>
          <label className="field-label" htmlFor={`cmp-${i}`}>Product {i + 1}</label>
          <select
            id={`cmp-${i}`}
            value={v}
            onChange={(e) => setSel((s) => s.map((x, j) => (j === i ? e.target.value : x)))}
            className="field-input"
          >
            <option value="">—</option>
            {options.map((o) => <option key={o.slug} value={o.slug}>{o.name}</option>)}
          </select>
        </div>
      ))}
      <button type="submit" className={buttonClasses("secondary", "md")}>Compare</button>
      {initial.length > 0 && <PrintButton label="Export PDF" />}
    </form>
  );
}
