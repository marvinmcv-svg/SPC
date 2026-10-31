import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Verify } from "@/components/ui/Verify";

export function ProofBar() {
  return (
    <div className="border-y border-white/10 bg-navy-900 text-white">
      <Container>
        <dl className="grid grid-cols-2 divide-white/10 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {site.proof.map((p) => (
            <div key={p.label} className="px-4 py-3 text-center">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-steel-300">{p.label}</dt>
              <dd className="mt-1 font-display text-xl font-semibold">
                {p.value}
                {!p.verified && <Verify />}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
