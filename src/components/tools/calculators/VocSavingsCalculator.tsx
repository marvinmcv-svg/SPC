"use client";

import { useState } from "react";
import { CO2_PER_KG_VOC, fmt, vocSavings } from "@/lib/calc";
import { NumberField, ResultCard, Disclaimer } from "../ToolShell";
import { PrintButton } from "../PrintButton";

export function VocSavingsCalculator() {
  const [area, setArea] = useState(5000);
  const [dft, setDft] = useState(500);
  const [solids, setSolids] = useState(65);
  const [voc, setVoc] = useState(340);
  const [loss, setLoss] = useState(25);
  const r = vocSavings({ areaM2: area, dftUm: dft, altSolidsPct: solids, altVocGPerL: voc, lossPct: loss });

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <h2 className="font-semibold text-navy-900">Your project</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="area" label="Area" value={area} onChange={setArea} unit="m²" />
          <NumberField id="dft" label="Total DFT" value={dft} onChange={setDft} unit="µm" />
          <NumberField id="loss" label="Loss factor" value={loss} onChange={setLoss} unit="%" />
        </div>
        <h2 className="pt-2 font-semibold text-navy-900">Solvent-borne alternative</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="solids" label="Volume solids" value={solids} onChange={setSolids} unit="%" hint="From the alternative's data sheet" />
          <NumberField id="voc" label="VOC content" value={voc} onChange={setVoc} unit="g/L" hint="From the alternative's data sheet" />
        </div>
      </div>
      <div className="rounded-xl bg-off-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-navy-900">Switching to SPC 100% solids avoids</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultCard label="VOC emissions avoided" value={fmt(r.vocKgAvoided, 0)} unit="kg" big />
          <ResultCard label="CO₂e from VOC oxidation (est.)" value={fmt(r.co2eKgAvoided, 0)} unit="kg" big />
          <ResultCard label="Solvent-borne coating needed" value={fmt(r.altLitres, 0)} unit="L" />
          <ResultCard label="SPC coating needed" value={fmt(r.spcLitres, 0)} unit="L" />
        </div>
        <div className="mt-4"><PrintButton label="Save for ESG report" /></div>
        <Disclaimer>
          Estimate for comparison purposes. CO₂e assumes VOCs are ~85% carbon by mass and fully oxidise ({fmt(CO2_PER_KG_VOC, 2)} kg CO₂ per kg VOC).
          It excludes manufacturing and transport emissions. Use your own emission factors for formal reporting.
        </Disclaimer>
      </div>
    </div>
  );
}
