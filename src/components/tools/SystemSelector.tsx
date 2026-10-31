"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardList, FileText, MessageSquareText } from "lucide-react";
import { scenes } from "@/content/systems";
import { getProduct, familyNames } from "@/content/products";
import { useExpert } from "@/components/layout/ExpertProvider";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { track } from "@/lib/analytics";
import { SceneArt } from "./SceneArt";

export function SystemSelector() {
  const router = useRouter();
  const params = useSearchParams();
  const { openChat } = useExpert();
  const initialScene = scenes.find((s) => s.id === params.get("scene"))?.id ?? scenes[0].id;
  const [sceneId, setSceneId] = useState(initialScene);
  const scene = scenes.find((s) => s.id === sceneId)!;
  const [zoneId, setZoneId] = useState(scene.zones[0].id);
  const zone = scene.zones.find((z) => z.id === zoneId) ?? scene.zones[0];

  useEffect(() => {
    setZoneId(scene.zones[0].id);
  }, [scene]);

  return (
    <div>
      <div role="tablist" aria-label="Asset" className="mb-6 flex flex-wrap gap-2">
        {scenes.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === sceneId}
            onClick={() => {
              setSceneId(s.id);
              router.replace(`/system-selector?scene=${s.id}`, { scroll: false });
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold",
              s.id === sceneId ? "bg-navy-900 text-white" : "bg-white text-navy-900 ring-1 ring-steel-300 hover:bg-steel-100",
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-steel-200 bg-navy-900">
          <SceneArt scene={scene.id} />
          {scene.zones.map((z) => (
            <button
              key={z.id}
              onClick={() => {
                setZoneId(z.id);
                track("selector_zone", { scene: scene.id, zone: z.id });
              }}
              style={{ left: `${z.x}%`, top: `${z.y}%` }}
              aria-pressed={z.id === zone.id}
              className={cn(
                "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition",
                z.id === zone.id ? "bg-amber-cta text-navy-950 ring-4 ring-amber-cta/30" : "bg-white text-navy-900 hover:bg-amber-cta",
              )}
            >
              <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-spc-green-500 align-middle" aria-hidden />
              {z.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-steel-200 bg-white p-6" aria-live="polite">
          <p className="eyebrow">{scene.name}</p>
          <h2 className="mt-2 text-2xl font-semibold text-navy-900">{zone.label}</h2>
          <p className="mt-1 text-steel-700">{zone.description}</p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-steel-500">Recommended system</h3>
          <ul className="mt-2 space-y-2">
            {zone.products.map((slug) => {
              const p = getProduct(slug);
              if (!p) return null;
              return (
                <li key={slug} className="rounded-lg border border-steel-200 p-3">
                  <Link href={`/products/${slug}`} className="font-semibold text-navy-900 hover:underline">{p.name}</Link>
                  {!p.verified && <span className="ml-2 font-mono text-[10px] uppercase text-amber-700">placeholder</span>}
                  <p className="text-xs text-steel-500">{familyNames[p.family]} · {p.tagline}</p>
                </li>
              );
            })}
          </ul>
          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm">
            <div><dt className="inline font-semibold text-navy-900">DFT: </dt><dd className="inline font-mono">{zone.dft}</dd></div>
            <div><dt className="inline font-semibold text-navy-900">Notes: </dt><dd className="inline text-steel-700">{zone.notes}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={`/spec-builder?scene=${scene.id}&zone=${zone.id}`} className={buttonClasses("primary", "sm")}>
              <ClipboardList className="h-4 w-4" aria-hidden /> Build spec
            </Link>
            <button className={buttonClasses("secondary", "sm")} onClick={() => openChat(`For a ${zone.label.toLowerCase()} on a ${scene.name.toLowerCase()}, `)}>
              <MessageSquareText className="h-4 w-4" aria-hidden /> Ask AI
            </button>
            <Link href={`/products/${zone.products[0]}#documents`} className={buttonClasses("ghost", "sm")}>
              <FileText className="h-4 w-4" aria-hidden /> Datasheets
            </Link>
          </div>
          <p className="mt-4 text-xs text-steel-500">Recommendations are a starting point. Our technical team confirms every system against your conditions.</p>
        </div>
      </div>
    </div>
  );
}
