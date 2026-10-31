import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { locations } from "@/content/locations";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MapLegend, WorldMap } from "@/components/ui/WorldMap";
import { Verify } from "@/components/ui/Verify";
import { JsonLd } from "@/components/ui/JsonLd";
import { ExpertButton } from "@/components/layout/ExpertButton";

export const metadata: Metadata = {
  title: "Where to Buy — Offices, Distributors & Agents",
  description: "Find SPC offices, plants and local distributors and agents worldwide.",
  alternates: { canonical: "/where-to-buy" },
};

const kindLabel = { office: "Office", plant: "Plant", warehouse: "Warehouse", distributor: "Distributor", agent: "Agent" };

export default function WhereToBuyPage() {
  const countries = Array.from(new Set(locations.map((l) => l.country)));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Where to buy", href: "/where-to-buy" }]}
        eyebrow="Where to buy"
        title="Local supply. Global backing."
        intro="SPC serves clients worldwide through its own offices and a network of agents and distributors, backed by Carboline and RPM."
      >
        <ExpertButton mode="chat" prefill="Who is the SPC distributor for my country? I'm in ">Find my local partner</ExpertButton>
      </PageHero>
      <section className="dark-section bg-navy-900 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <WorldMap className="w-full" points={locations.map((l) => ({ id: l.id, label: l.name, coords: l.coords, kind: l.kind }))} />
          <MapLegend />
        </div>
      </section>
      <Section tone="light">
        {countries.map((c) => (
          <div key={c} className="mb-10">
            <SectionHeader title={c} />
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {locations.filter((l) => l.country === c).map((l) => (
                <li key={l.id} className="rounded-xl border border-steel-200 bg-white p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-spc-green-700">{kindLabel[l.kind]}</p>
                  <h3 className="mt-1 font-semibold text-navy-900">{l.name}{!l.verified && <Verify note={l.note} />}</h3>
                  <p className="mt-2 flex gap-2 text-sm text-steel-700"><MapPin className="h-4 w-4 shrink-0" aria-hidden />{l.address}</p>
                  {l.phone && <p className="mt-1 flex gap-2 text-sm"><Phone className="h-4 w-4" aria-hidden /><a className="underline" href={`tel:${l.phone.replace(/\s/g, "")}`}>{l.phone}</a></p>}
                  {l.verified && l.note && <p className="mt-2 text-xs text-steel-500">{l.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-sm text-steel-700">
          Don&apos;t see your country? Most of our clients are served through agents and distributors. Call {site.phone.display} or ask the assistant.
        </p>
      </Section>
      <JsonLd
        data={locations.filter((l) => l.verified).map((l) => ({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: l.name,
          address: l.address,
          telephone: l.phone,
          geo: { "@type": "GeoCoordinates", latitude: l.coords[1], longitude: l.coords[0] },
          parentOrganization: { "@type": "Organization", name: site.name },
        }))}
      />
    </>
  );
}
