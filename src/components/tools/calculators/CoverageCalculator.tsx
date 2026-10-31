"use client";

import { useState } from "react";
import { fmt, litresFor, spreadingRate } from "@/lib/calc";
import { NumberField, ResultCard, ToolActions, Disclaimer } from "../ToolShell";

type Shape = "area" | "tank";

export function CoverageCalculator() {
  const [shape, setShape] = useState<Shape>("tank");
  const [area, setArea] = useState(500);
  const [diameter, setDiameter] = useState(15);
  const [height, setHeight] = useState(10);
  const [floor, setFloor] = useState(true);
  const [roof, setRoof] = useState(false);
  const [shell, setShell] = useState(true);
  const [dft, setDft] = useState(500);
  const [loss, setLoss] = useState(25);
  const [kit, setKit] = useState(NaN);

  const r = diameter / 2;
  const tankArea = (shell ? Math.PI * diameter * height : 0) + (floor ? Math.PI * r * r : 0) + (roof ? Math.PI * r * r : 0);
  const a = shape === "tank" ? tankArea : area;
  const v = litresFor(a, dft, 100, loss);
  const summary = `Coverage: ${fmt(a, 0)} m² at ${dft} µm DFT, loss ${loss}% → ≈ ${fmt(v.withLoss, 0)} L`;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <fieldset className="flex gap-4 text-sm">
          <legend className="field-label">What are you coating?</legend>
          <label className="flex items-center gap-2"><input type="radio" checked={shape === "tank"} onChange={() => setShape("tank")} /> Cylindrical tank</label>
          <label className="flex items-center gap-2"><input type="radio" checked={shape === "area"} onChange={() => setShape("area")} /> Known area</label>
        </fieldset>
        {shape === "tank" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField id="dia" label="Tank diameter" value={diameter} onChange={setDiameter} unit="m" />
              <NumberField id="h" label="Shell height to coat" value={height} onChange={setHeight} unit="m" />
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={floor} onChange={(e) => setFloor(e.target.checked)} /> Floor</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={shell} onChange={(e) => setShell(e.target.checked)} /> Shell</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={roof} onChange={(e) => setRoof(e.target.checked)} /> Roof underside</label>
            </div>
          </>
        ) : (
          <NumberField id="area" label="Area" value={area} onChange={setArea} unit="m²" />
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="dft" label="Specified DFT" value={dft} onChange={setDft} unit="µm" hint={`= ${fmt(dft / 25.4, 1)} mils`} />
          <NumberField id="loss" label="Loss / waste factor" value={loss} onChange={setLoss} unit="%" />
          <NumberField id="kit" label="Kit size" value={kit} onChange={setKit} unit="L" />
        </div>
      </div>
      <div className="rounded-xl bg-off-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-navy-900">Estimate</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="Area to coat" value={fmt(a, 1)} unit="m²" />
          <ResultCard label="Spreading rate (theoretical)" value={fmt(spreadingRate(dft), 2)} unit="m²/L" />
          <ResultCard label="Theoretical volume" value={fmt(v.theoretical, 1)} unit="L" />
          <ResultCard label="With loss factor" value={fmt(v.withLoss, 1)} unit="L" big />
          <ResultCard label="Kits" value={kit > 0 ? String(Math.ceil(v.withLoss / kit)) : "Enter kit size"} />
        </div>
        <ToolActions rfqSummary={summary} />
        <Disclaimer />
      </div>
    </div>
  );
}
