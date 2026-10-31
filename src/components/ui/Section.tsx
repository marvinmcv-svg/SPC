import { cn } from "./cn";
import { Container } from "./Container";

type Tone = "light" | "white" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-off-white text-steel-900",
  white: "bg-white text-steel-900",
  dark: "dark-section bg-navy-900 text-white",
};

export function Section({
  tone = "light",
  id,
  className,
  children,
  labelledBy,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "py-16 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  dark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className={cn("text-3xl font-semibold sm:text-4xl", dark ? "text-white" : "text-navy-900")}>
        {title}
      </h2>
      {intro && <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-steel-200" : "text-steel-700")}>{intro}</p>}
    </div>
  );
}
