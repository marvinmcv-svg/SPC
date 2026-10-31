import Link from "next/link";
import { ClipboardList, MessageSquareText } from "lucide-react";
import { ExpertButton } from "@/components/layout/ExpertButton";

export function NumberField({
  id,
  label,
  value,
  onChange,
  unit,
  step = "any",
  min = 0,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  step?: string | number;
  min?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <div className="flex">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          className="field-input rounded-r-none font-mono"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        {unit && (
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-steel-300 bg-steel-100 px-3 font-mono text-xs text-steel-700">
            {unit}
          </span>
        )}
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-steel-500">{hint}</p>}
    </div>
  );
}

export function ResultCard({ label, value, unit, big }: { label: string; value: string; unit?: string; big?: boolean }) {
  return (
    <div className={`rounded-lg ${big ? "bg-navy-900 text-white" : "bg-white text-navy-900"} border border-steel-200 p-4`}>
      <p className={`font-mono text-[11px] uppercase tracking-wider ${big ? "text-steel-300" : "text-steel-500"}`}>{label}</p>
      <p className={`mt-1 font-mono ${big ? "text-3xl" : "text-xl"} font-semibold`}>
        {value} {unit && <span className="text-sm font-normal">{unit}</span>}
      </p>
    </div>
  );
}

export function ToolActions({ rfqSummary }: { rfqSummary: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href={`/contact?topic=rfq&details=${encodeURIComponent(rfqSummary)}`}
        className="inline-flex items-center gap-2 rounded-md bg-amber-cta px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-amber-cta-hover"
      >
        <ClipboardList className="h-4 w-4" aria-hidden /> Request a quote with these numbers
      </Link>
      <ExpertButton variant="ghost" mode="chat" prefill={`I used the calculator: ${rfqSummary}. Can you check this for my project?`}>
        <MessageSquareText className="h-4 w-4" aria-hidden /> Check with the tech assistant
      </ExpertButton>
    </div>
  );
}

export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <p className="mt-6 border-l-2 border-amber-cta pl-3 text-xs leading-relaxed text-steel-500">
      {children ??
        "Estimates only. Actual consumption depends on surface profile, application method, conditions and crew. Always confirm against the current product data sheet and your project specification."}
    </p>
  );
}
