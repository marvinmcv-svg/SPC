import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";
import { LayerMotif } from "./LayerMotif";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="dark-section relative overflow-hidden bg-navy-900 pb-16 pt-10 text-white sm:pb-20">
      <LayerMotif className="pointer-events-none absolute -right-10 bottom-0 hidden h-full w-1/3 opacity-40 lg:block" />
      <Container className="relative">
        <Breadcrumbs items={crumbs} dark />
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-steel-200">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
