"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Lock } from "lucide-react";
import { scenes } from "@/content/systems";
import { getDocument } from "@/content/documents";
import { recommend, specText, type SpecAnswers } from "@/lib/spec";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { ConsentField, Honeypot } from "./ConsentField";
import { PrintButton } from "./PrintButton";

const STEPS = ["Asset", "Substrate", "Service", "Standards", "Application", "Your package"] as const;
const STANDARDS = [
  "ISO 21809-3 (field joint coatings)",
  "CSA Z245.30 (field-applied external coatings)",
  "AMPP / NACE SP0188 (holiday testing)",
  "SSPC-SP 10 / NACE No. 2 (near-white blast)",
  "NSF/ANSI/CAN 61 (drinking water)",
  "AWWA C210 (liquid epoxy for water pipe)",
];

export function SpecBuilder() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<SpecAnswers>(() => {
    const scene = scenes.find((s) => s.id === params.get("scene")) ?? scenes[0];
    const zone = scene.zones.find((z) => z.id === params.get("zone")) ?? scene.zones[0];
    return {
      scene: scene.id,
      zone: zone.id,
      substrate: "Carbon steel",
      surfacePrep: "Abrasive blast to SSPC-SP 10 / NACE No. 2 (near-white), angular profile per PDS",
      serviceTempC: 40,
      immersion: scene.id === "pipeline" ? "soil" : "none",
      standards: [],
      method: "spray",
      projectName: "",
    };
  });
  const { state, error, submit } = useLeadSubmit();
  const rec = useMemo(() => recommend(a), [a]);
  const text = useMemo(() => specText(a), [a]);
  const scene = scenes.find((s) => s.id === a.scene)!;
  const docs = rec.products.flatMap((p) => p.documents).map(getDocument).filter((d) => d !== undefined);
  const unlocked = state === "done";
  const set = <K extends keyof SpecAnswers>(k: K, v: SpecAnswers[K]) => setA((x) => ({ ...x, [k]: v }));

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <ol className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm",
                i === step ? "bg-navy-900 text-white" : i < step ? "text-navy-900" : "text-steel-500",
              )}
            >
              <span className={cn("flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs", i === step ? "bg-amber-cta text-navy-950" : "bg-steel-200 text-navy-900")}>
                {i + 1}
              </span>
              {s}
            </button>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-steel-200 bg-white p-6 sm:p-8">
        {step === 0 && (
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-navy-900">What are you protecting?</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="scene">Asset</label>
                <select id="scene" className="field-input" value={a.scene} onChange={(e) => { const s = scenes.find((x) => x.id === e.target.value)!; setA((x) => ({ ...x, scene: s.id, zone: s.zones[0].id })); }}>
                  {scenes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="zone">Area</label>
                <select id="zone" className="field-input" value={a.zone} onChange={(e) => set("zone", e.target.value)}>
                  {scene.zones.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="pname">Project name (optional)</label>
              <input id="pname" className="field-input" value={a.projectName} onChange={(e) => set("projectName", e.target.value)} />
            </div>
          </fieldset>
        )}
        {step === 1 && (
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-navy-900">Substrate & surface preparation</legend>
            <div>
              <label className="field-label" htmlFor="sub">Substrate</label>
              <select id="sub" className="field-input" value={a.substrate} onChange={(e) => set("substrate", e.target.value)}>
                {["Carbon steel", "Carbon steel with FBE mill coating (overlap)", "Carbon steel with 3LPE mill coating (overlap)", "Ductile iron", "Concrete", "Previously coated steel"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="prep">Surface preparation</label>
              <textarea id="prep" rows={3} className="field-input" value={a.surfacePrep} onChange={(e) => set("surfacePrep", e.target.value)} />
            </div>
          </fieldset>
        )}
        {step === 2 && (
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-navy-900">Service conditions</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="temp">Max service temperature (°C)</label>
                <input id="temp" type="number" className="field-input font-mono" value={a.serviceTempC} onChange={(e) => set("serviceTempC", Number(e.target.value))} />
              </div>
              <div>
                <label className="field-label" htmlFor="imm">Exposure</label>
                <select id="imm" className="field-input" value={a.immersion} onChange={(e) => set("immersion", e.target.value as SpecAnswers["immersion"])}>
                  <option value="none">Atmospheric</option>
                  <option value="soil">Buried / soil</option>
                  <option value="water">Water / seawater immersion</option>
                  <option value="potable">Potable water</option>
                  <option value="hydrocarbon">Hydrocarbon immersion</option>
                  <option value="chemical">Chemical immersion</option>
                </select>
              </div>
            </div>
          </fieldset>
        )}
        {step === 3 && (
          <fieldset>
            <legend className="mb-4 text-xl font-semibold text-navy-900">Which standards apply?</legend>
            <div className="space-y-2">
              {STANDARDS.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={a.standards.includes(s)} onChange={() => set("standards", a.standards.includes(s) ? a.standards.filter((x) => x !== s) : [...a.standards, s])} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {step === 4 && (
          <fieldset>
            <legend className="mb-4 text-xl font-semibold text-navy-900">Application method</legend>
            <div className="space-y-2">
              {([["brush", "Brush"], ["spray", "Airless spray"], ["plural-spray", "Plural-component spray"]] as const).map(([v, l]) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="method" checked={a.method === v} onChange={() => set("method", v)} /> {l}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold text-navy-900">Your recommended system</h2>
            <ul className="mt-3 space-y-2">
              {rec.products.map((p) => (
                <li key={p.slug} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-spc-green-600" aria-hidden />
                  <Link href={`/products/${p.slug}`} className="font-semibold text-navy-900 underline">{p.name}</Link>
                  {!p.verified && <span className="font-mono text-[10px] uppercase text-amber-700">placeholder</span>}
                </li>
              ))}
            </ul>
            {rec.notes.map((n) => <p key={n} className="mt-2 text-sm text-amber-800">⚠ {n}</p>)}
            <p className="mt-2 text-sm text-steel-700">DFT: <span className="font-mono">{rec.zone.dft}</span></p>

            <h3 className="mt-6 font-semibold text-navy-900">Specification text</h3>
            <div className="relative mt-2">
              <pre className={cn("max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-off-white p-4 font-mono text-xs leading-relaxed text-steel-900", !unlocked && "max-h-40 overflow-hidden")}>
                {text}
              </pre>
              {!unlocked && <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-lg bg-gradient-to-t from-white to-transparent" />}
            </div>

            {unlocked ? (
              <div className="mt-4 space-y-3">
                <p className="rounded-lg bg-spc-green-100 p-3 text-sm text-spc-green-700">
                  Done — we&apos;ve logged your package and a specialist will email the data sheets and confirm the system.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className={buttonClasses("secondary", "sm")} onClick={() => navigator.clipboard.writeText(text)}>
                    <Copy className="h-4 w-4" aria-hidden /> Copy spec text
                  </button>
                  <PrintButton label="Print / save PDF" />
                </div>
                {docs.length > 0 && (
                  <ul className="text-sm">
                    {docs.map((d) => <li key={d.id}>· {d.title} {d.url ? <a className="underline" href={d.url}>download</a> : <span className="text-steel-500">(emailed by our team)</span>}</li>)}
                  </ul>
                )}
              </div>
            ) : (
              <form
                className="relative mt-6 grid gap-3 rounded-xl border border-steel-200 p-5 sm:grid-cols-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  await submit({
                    type: "spec_package",
                    name: f.get("name"),
                    email: f.get("email"),
                    company: f.get("company"),
                    country: f.get("country"),
                    project: text,
                    documents: docs.map((d) => d.id),
                    consent: f.get("consent") === "on",
                    website: f.get("website") || undefined,
                  });
                }}
              >
                <p className="flex items-center gap-2 font-semibold text-navy-900 sm:col-span-2"><Lock className="h-4 w-4" aria-hidden /> Get the full spec package</p>
                <div><label className="field-label" htmlFor="sb-name">Name</label><input id="sb-name" name="name" required className="field-input" autoComplete="name" /></div>
                <div><label className="field-label" htmlFor="sb-email">Work email</label><input id="sb-email" name="email" type="email" required className="field-input" autoComplete="email" /></div>
                <div><label className="field-label" htmlFor="sb-company">Company</label><input id="sb-company" name="company" className="field-input" autoComplete="organization" /></div>
                <div><label className="field-label" htmlFor="sb-country">Country</label><input id="sb-country" name="country" className="field-input" autoComplete="country-name" /></div>
                <div className="sm:col-span-2"><ConsentField id="sb-consent" /></div>
                <Honeypot />
                {error && <p className="text-sm text-red-700 sm:col-span-2" role="alert">{error}</p>}
                <button type="submit" disabled={state === "sending"} className={buttonClasses("primary", "md", "sm:col-span-2")}>
                  {state === "sending" ? "Sending…" : "Unlock & email my spec package"}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-steel-200 pt-5">
          <button className={buttonClasses("ghost", "md")} disabled={step === 0} onClick={() => setStep((s) => s - 1)}>← Back</button>
          {step < STEPS.length - 1 && <button className={buttonClasses("secondary", "md")} onClick={() => setStep((s) => s + 1)}>Next →</button>}
        </div>
      </div>
    </div>
  );
}
