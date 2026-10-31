"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { markets } from "@/content/markets";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { ConsentField, Honeypot } from "./ConsentField";

const ROLES = ["Owner / operator engineer", "Specifier / consultant", "EPC / contractor", "Applicator", "Procurement", "Distributor", "Other"];
const TOPICS: Record<string, string> = {
  contact: "General enquiry",
  rfq: "Request a quote",
  documents: "Request documents",
  callback: "Technical call-back",
};

/** Multi-step smart form: who you are → project → details. Routed by country + market server-side. */
export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = params.get("topic") ?? "contact";
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({
    type: TOPICS[initialTopic] ? initialTopic : "contact",
    project: [params.get("details"), params.get("doc") ? `Document requested: ${params.get("doc")}` : ""].filter(Boolean).join("\n"),
  });
  const { state, error, submit } = useLeadSubmit();
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-spc-green-500 bg-spc-green-100 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-spc-green-600" aria-hidden />
        <h2 className="mt-4 text-2xl font-semibold text-navy-900">Thanks, {data.name?.split(" ")[0]} — we&apos;ve got it.</h2>
        <p className="mt-2 text-steel-700">A specialist will reply within 4 business hours. Need it sooner? Use WhatsApp or the AI assistant.</p>
      </div>
    );
  }

  const steps = ["About you", "Your project", "Details"];
  return (
    <form
      className="relative rounded-2xl border border-steel-200 bg-white p-6 sm:p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (step < 2) return setStep(step + 1);
        const f = new FormData(e.currentTarget);
        await submit({ ...data, consent: f.get("consent") === "on", website: f.get("website") || undefined });
      }}
    >
      <ol className="mb-6 flex gap-2 text-xs" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={cn("flex-1 border-t-4 pt-2", i <= step ? "border-spc-green-500 text-navy-900" : "border-steel-200 text-steel-500")}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="c-type">How can we help?</label>
            <select id="c-type" className="field-input" value={data.type} onChange={set("type")}>
              {Object.entries(TOPICS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div><label className="field-label" htmlFor="c-name">Name</label><input id="c-name" required className="field-input" autoComplete="name" value={data.name ?? ""} onChange={set("name")} /></div>
          <div><label className="field-label" htmlFor="c-email">Work email</label><input id="c-email" type="email" required className="field-input" autoComplete="email" value={data.email ?? ""} onChange={set("email")} /></div>
          <div><label className="field-label" htmlFor="c-company">Company</label><input id="c-company" className="field-input" autoComplete="organization" value={data.company ?? ""} onChange={set("company")} /></div>
          <div>
            <label className="field-label" htmlFor="c-role">Your role</label>
            <select id="c-role" className="field-input" value={data.role ?? ""} onChange={set("role")}>
              <option value="">Select…</option>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div><label className="field-label" htmlFor="c-phone">Phone / WhatsApp</label><input id="c-phone" type="tel" className="field-input" autoComplete="tel" value={data.phone ?? ""} onChange={set("phone")} /></div>
          <div><label className="field-label" htmlFor="c-country">Country</label><input id="c-country" required className="field-input" autoComplete="country-name" value={data.country ?? ""} onChange={set("country")} /></div>
        </div>
      )}
      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="c-market">Market</label>
            <select id="c-market" className="field-input" value={data.market ?? ""} onChange={set("market")}>
              <option value="">Select…</option>
              {markets.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="c-timeline">Timeline</label>
            <select id="c-timeline" className="field-input" value={data.timeline ?? ""} onChange={set("timeline")}>
              <option value="">Select…</option>
              {["ASAP", "Within a month", "1–3 months", "3–12 months", "Researching / specifying"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2"><label className="field-label" htmlFor="c-qty">Quantity / size (joints, m², litres…)</label><input id="c-qty" className="field-input" value={data.quantity ?? ""} onChange={set("quantity")} /></div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="field-label" htmlFor="c-project">Tell us about the project</label>
            <textarea id="c-project" rows={6} className="field-input" placeholder="Asset, conditions, specification, product you're considering…" value={data.project ?? ""} onChange={set("project")} />
          </div>
          <ConsentField id="c-consent" />
          <Honeypot />
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}
      <div className="mt-6 flex justify-between">
        <button type="button" className={buttonClasses("ghost", "md")} disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
        <button type="submit" disabled={state === "sending"} className={buttonClasses(step === 2 ? "primary" : "secondary", "md")}>
          {step < 2 ? "Next →" : state === "sending" ? "Sending…" : "Send to a specialist"}
        </button>
      </div>
    </form>
  );
}
