"use client";

import { useState } from "react";
import { cn } from "@/components/ui/cn";

const layers = [
  { id: "env", label: "Environment", detail: "Soil stress, moisture, cathodic protection, abrasion", color: "#12304d", h: 60 },
  { id: "coat", label: "SP-2888 RG — up to ≈ 60 mils, one coat", detail: "100% solids epoxy. No solvent to trap, no VOCs.", color: "#2e8b57", h: 90 },
  { id: "profile", label: "Anchor profile", detail: "Abrasive-blasted surface for mechanical bond", color: "#f5a400", h: 10 },
  { id: "steel", label: "Steel substrate", detail: "Pipe wall at the girth weld", color: "#6b7783", h: 80 },
];

/** Interactive coating cross-section: the brand's "mils and layers" motif. */
export function CrossSection({ className }: { className?: string }) {
  const [active, setActive] = useState("coat");
  const current = layers.find((l) => l.id === active)!;
  let y = 0;
  return (
    <figure className={cn("rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur", className)}>
      <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label="Cross-section of a coated pipeline girth weld">
        {layers.map((l, i) => {
          const top = y;
          y += l.h;
          return (
            <g key={l.id} onMouseEnter={() => setActive(l.id)} className="cursor-pointer">
              <rect
                x="0"
                y={top}
                width="400"
                height={l.h}
                fill={l.color}
                opacity={active === l.id ? 1 : 0.75}
                className="layer-build"
                style={{ animationDelay: `${(layers.length - i) * 0.2}s` }}
              />
              {l.id === "coat" && (
                <path d={`M0 ${top + 6} Q100 ${top - 2} 200 ${top + 6} T400 ${top + 4}`} stroke="#7cc79e" strokeWidth="2" fill="none" />
              )}
            </g>
          );
        })}
        <g fontFamily="var(--font-mono)" fontSize="10" fill="#fff">
          <line x1="360" x2="360" y1="60" y2="150" stroke="#fff" strokeOpacity="0.7" />
          <line x1="354" x2="366" y1="60" y2="60" stroke="#fff" strokeOpacity="0.7" />
          <line x1="354" x2="366" y1="150" y2="150" stroke="#fff" strokeOpacity="0.7" />
          <text x="330" y="108" textAnchor="end">≈60 mils</text>
        </g>
      </svg>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Coating layers">
        {layers.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={active === l.id}
            onClick={() => setActive(l.id)}
            onFocus={() => setActive(l.id)}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider",
              active === l.id ? "bg-white text-navy-900" : "bg-white/10 text-steel-200 hover:bg-white/20",
            )}
          >
            {l.label.split(" — ")[0]}
          </button>
        ))}
      </div>
      <figcaption className="mt-3 min-h-12 text-sm text-steel-200" aria-live="polite">
        <span className="font-semibold text-white">{current.label}.</span> {current.detail}
      </figcaption>
    </figure>
  );
}
