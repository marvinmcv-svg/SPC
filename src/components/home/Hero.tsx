import { ArrowRight, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExpertButton } from "@/components/layout/ExpertButton";
import { HeroPanel } from "./HeroPanel";

const HERO_VIDEO = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

export function Hero() {
  return (
    <section className="dark-section relative isolate overflow-hidden bg-navy-950 text-white" aria-labelledby="hero-title">
      {HERO_VIDEO && (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35 motion-reduce:hidden"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(46,139,87,0.25),transparent_60%)]" />
      <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Pipeline · Marine · Tanks · Water
          </p>
          <h1 id="hero-title" className="text-4xl font-semibold leading-[1.05] sm:text-6xl">
            {site.heroHeadline}
            <span className="mt-2 block text-spc-green-300">{site.heroSubline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
            Liquid epoxy and polyurethane coatings that build thick in one coat, cure fast and release no solvent.
            Specified on pipelines worldwide since {site.founded}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/system-selector" size="lg">
              Find the right system <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ExpertButton variant="outline-light" size="lg">
              Talk to a coatings expert
            </ExpertButton>
          </div>
        </div>
        <HeroPanel />
      </Container>
    </section>
  );
}
