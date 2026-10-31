/**
 * Lightweight SVG map (equirectangular) over a pre-rendered land layer. Used until a Mapbox
 * token is configured; keeps the page fast and works without JavaScript.
 */
export type MapPoint = {
  id: string;
  label: string;
  coords: [number, number];
  kind: "office" | "plant" | "warehouse" | "distributor" | "agent" | "project";
};

const colors: Record<MapPoint["kind"], string> = {
  office: "#f5a400",
  plant: "#f5a400",
  warehouse: "#f5a400",
  distributor: "#7cc79e",
  agent: "#7cc79e",
  project: "#ffffff",
};

function project([lng, lat]: [number, number]) {
  return { x: ((lng + 180) / 360) * 1000, y: ((90 - lat) / 180) * 500 };
}

export function WorldMap({ points, className }: { points: MapPoint[]; className?: string }) {
  return (
    <svg viewBox="0 60 1000 360" className={className} role="img" aria-label="Map of SPC locations and projects">
      <rect x="0" y="0" width="1000" height="500" fill="transparent" />
      {/* Natural Earth 1:110m land, pre-rendered to /public/world-land.svg (same equirectangular projection) */}
      <image href="/world-land.svg" x="0" y="0" width="1000" height="500" />
      {[-60, -30, 0, 30, 60].map((lat) => {
        const { y } = project([0, lat]);
        return <line key={lat} x1="0" x2="1000" y1={y} y2={y} stroke="#fff" strokeOpacity={lat === 0 ? 0.15 : 0.06} />;
      })}
      {points.map((p) => {
        const { x, y } = project(p.coords);
        return (
          <g key={p.id}>
            <circle cx={x} cy={y} r="14" fill={colors[p.kind]} opacity="0.15">
              <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={x} cy={y} r="5" fill={colors[p.kind]} stroke="#0b1f33" strokeWidth="1.5">
              <title>{p.label}</title>
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

export function MapLegend() {
  return (
    <ul className="flex flex-wrap gap-4 text-xs text-steel-300">
      <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-cta" /> SPC offices & plants</li>
      <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-spc-green-300" /> Distributors & agents</li>
      <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-white" /> Projects</li>
    </ul>
  );
}
