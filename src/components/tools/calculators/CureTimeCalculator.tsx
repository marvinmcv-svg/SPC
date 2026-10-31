"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { dewPointC, fmt, scaledCureHours } from "@/lib/calc";
import { NumberField, ResultCard, Disclaimer } from "../ToolShell";

export function CureTimeCalculator() {
  const [air, setAir] = useState(10);
  const [rh, setRh] = useState(75);
  const [steel, setSteel] = useState(8);
  const [refHours, setRefHours] = useState(NaN);
  const [refTemp, setRefTemp] = useState(25);

  const dp = dewPointC(air, rh);
  const margin = steel - dp;
  const ok = margin >= 3;
  const est = scaledCureHours(refHours, refTemp, steel);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h2 className="mb-3 font-semibold text-navy-900">1 · Site conditions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField id="air" label="Air temp" value={air} onChange={setAir} unit="°C" min={-40} />
            <NumberField id="rh" label="Relative humidity" value={rh} onChange={setRh} unit="%" />
            <NumberField id="steel" label="Steel temp" value={steel} onChange={setSteel} unit="°C" min={-40} />
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-navy-900">2 · From the product data sheet</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id="ref" label="Cure time on PDS" value={refHours} onChange={setRefHours} unit="h" hint="e.g. time to handle or recoat" />
            <NumberField id="reft" label="…at temperature" value={refTemp} onChange={setRefTemp} unit="°C" />
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-off-white p-6">
        <div className={`mb-4 flex items-start gap-3 rounded-lg p-4 ${ok ? "bg-spc-green-100 text-spc-green-700" : "bg-red-50 text-red-800"}`} role="status">
          {ok ? <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden /> : <XCircle className="h-6 w-6 shrink-0" aria-hidden />}
          <p className="text-sm">
            {ok
              ? `Steel is ${fmt(margin)} °C above the dew point. The common 3 °C (5 °F) margin is met.`
              : `Steel is only ${fmt(margin)} °C above the dew point. Most specifications require at least 3 °C (5 °F). Do not coat — risk of condensation and amine blush.`}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="Dew point" value={fmt(dp)} unit="°C" />
          <ResultCard label="Margin above dew point" value={fmt(margin)} unit="°C" />
          <ResultCard label="Estimated cure time at steel temp" value={Number.isFinite(est) ? fmt(est, 1) : "Enter PDS value"} unit={Number.isFinite(est) ? "h" : undefined} big />
        </div>
        <Disclaimer>
          Cure estimate uses the rule of thumb that reaction rate roughly doubles for every 10 °C rise. It is a planning aid only — the
          product data sheet&apos;s cure table and minimum application temperature always take precedence. Dew point uses the Magnus approximation.
        </Disclaimer>
      </div>
    </div>
  );
}
