import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { locations } from "@/content/locations";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectsMap } from "@/components/tools/ProjectsMap";

export const metadata: Metadata = {
  title: "Global Projects Map",
  description: "Explore SPC coating projects worldwide by market and year.",
  alternates: { canonical: "/projects-map" },
};

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Projects map", href: "/projects-map" }]} eyebrow="Projects map" title="Where SPC coatings are working." intro="Filter by market. Project data is being collected — sample points are shown until real projects are published." />
      <ProjectsMap projects={caseStudies} locations={locations} />
    </>
  );
}
