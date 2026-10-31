import { Hero } from "@/components/home/Hero";
import { ProofBar } from "@/components/home/ProofBar";
import { AssetStrip } from "@/components/home/AssetStrip";
import { Spotlight } from "@/components/home/Spotlight";
import { WhySolids } from "@/components/home/WhySolids";
import { CaseStudyRail } from "@/components/home/CaseStudyRail";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { ToolsRow } from "@/components/home/ToolsRow";
import { LatestInsights } from "@/components/home/LatestInsights";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <AssetStrip />
      <Spotlight />
      <WhySolids />
      <CaseStudyRail />
      <GlobalPresence />
      <ToolsRow />
      <LatestInsights />
      <CtaBand />
    </>
  );
}
