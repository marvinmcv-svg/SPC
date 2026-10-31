"use client";

import { useState } from "react";
import { fieldJointVolume, fmt, inchesToMm, UM_PER_MIL } from "@/lib/calc";
import { NumberField, ResultCard, ToolActions, Disclaimer } from "../ToolShell";

export function VolumeEstimator() {
  const [units, setUnits] = useState<"imperial" | "metric">("imperial");
  const [od, setOd] = useState(24);
  const [joints, setJoints] = useState(500);
  const [cutback, setCutback] = useState(150);
  const [overlap, setOverlap] = useState(50);
  const [dft, setDft] = useState(40);
  const [loss, setLoss] = useState(20);
  const [kit, setKit] = useState(NaN);

  const odMm = units === "imperial" ? inchesToMm(od) : od;
  const dftUm = units === "imperial" ? dft * UM_PER_MIL : dft;
  const r = fieldJointVolume({ odMm, joints, cutbackMm: cutback, overlapMm: overlap, dftUm, lossPct: loss, kitLitres: kit });
  const summary = `Field joints: ${joints} × ${fmt(od)}${units === "imperial" ? '"' : " mm"} OD, cutback ${cutback} mm + overlap ${overlap} mm per side, DFT ${fmt(dft)} ${units === "imperial" ? "mils" : "µm"}, loss ${loss}% → ≈ ${fmt(r.litresWithLoss, 0)} L`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <fieldset className="flex gap-4 text-sm">
          <legend className="field-label">Units</legend>
          {(["imperial", "metric"] as const).map((u) => (
            <label key={u} className="flex items-center gap-2 capitalize">
              <input type="radio" name="units" checked={units === u} onChange={() => setUnits(u)} /> {u === "imperial" ? "Inches / mils" : "mm / µm"}
            </label>
          ))}
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="od" label="Pipe outside diameter" value={od} onChange={setOd} unit={units === "imperial" ? "in" : "mm"} />
          <NumberField id="joints" label="Number of joints" value={joints} onChange={setJoints} step={1} />
          <NumberField id="cutback" label="Cutback per side" value={cutback} onChange={setCutback} unit="mm" />
          <NumberField id="overlap" label="Overlap onto mill coating per side" value={overlap} onChange={setOverlap} unit="mm" />
          <NumberField id="dft" label="Specified DFT" value={dft} onChange={setDft} unit={units === "imperial" ? "mils" : "µm"} />
          <NumberField id="loss" label="Loss / waste factor" value={loss} onChange={setLoss} unit="%" hint="Brush ~10–20%, spray ~20–40%" />
          <NumberField id="kit" label="Kit size" value={kit} onChange={setKit} unit="L" hint="From the PDS or price list" />
        </div>
      </div>
      <div className="rounded-xl bg-off-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-navy-900">Estimate</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="Coated area per joint" value={fmt(r.areaPerJointM2, 3)} unit="m²" />
          <ResultCard label="Total coated area" value={fmt(r.totalAreaM2, 1)} unit="m²" />
          <ResultCard label="Theoretical volume" value={fmt(r.theoreticalLitres, 1)} unit="L" />
          <ResultCard label="With loss factor" value={fmt(r.litresWithLoss, 1)} unit="L" big />
          <ResultCard label="Kits required" value={Number.isFinite(kit) && kit > 0 ? String(r.kits) : "Enter kit size"} />
          <ResultCard label="US gallons" value={fmt(r.litresWithLoss / 3.785, 1)} unit="gal" />
        </div>
        <ToolActions rfqSummary={summary} />
        <Disclaimer>
          Based on 100% volume solids (wet film = dry film). Estimates only — confirm against the current product data sheet and your specification.
        </Disclaimer>
      </div>
    </div>
  );
}
