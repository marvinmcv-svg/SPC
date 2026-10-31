import { locations } from "@/content/locations";
import { caseStudies } from "@/content/case-studies";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MapLegend, WorldMap } from "@/components/ui/WorldMap";
import { ButtonLink } from "@/components/ui/Button";

export function GlobalPresence() {
  const points = [
    ...locations.map((l) => ({ id: l.id, label: l.name, coords: l.coords, kind: l.kind })),
    ...caseStudies.map((c) => ({ id: c.slug, label: c.title, coords: c.coords, kind: "project" as const })),
  ];
  return (
    <Section tone="dark" labelledBy="global-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeader
            id="global-title"
            dark
            eyebrow="Global presence"
            title="Small enough to care. Big enough to deliver."
            intro="SPC's technical team works alongside a worldwide network of agents and distributors — backed by the supply chain of Carboline and RPM International."
          />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/where-to-buy">Find your local partner</ButtonLink>
            <ButtonLink href="/projects-map" variant="outline-light">Explore the projects map</ButtonLink>
          </div>
        </div>
        <div>
          <WorldMap points={points} className="w-full" />
          <MapLegend />
        </div>
      </div>
    </Section>
  );
}
