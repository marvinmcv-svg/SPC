import Link from "next/link";
import { mainNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { Verify } from "@/components/ui/Verify";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 pb-24 pt-16 text-steel-300 sm:pb-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              100% solids, zero-VOC liquid epoxy and polyurethane coatings. Formulating since {site.founded}.
            </p>
            <p className="mt-4 font-display text-white">“{site.brandLine}”</p>
          </div>
          {mainNav
            .filter((n) => "children" in n)
            .map((n) => (
              <div key={n.href}>
                <h2 className="mb-3 text-sm font-semibold text-white">{n.label}</h2>
                <ul className="space-y-2 text-sm">
                  {"children" in n &&
                    n.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="hover:text-white">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">Contact</h2>
            <address className="space-y-2 text-sm not-italic">
              <p>#14 – 1595 Cliveden Avenue, Delta, BC V3M 6M2, Canada</p>
              <p>
                <a href={`tel:${site.phone.tel}`} className="hover:text-white">
                  T {site.phone.display}
                </a>
              </p>
              <p>F {site.fax}</p>
              <p>
                <a href={`mailto:${site.email.value}`} className="hover:text-white">
                  {site.email.value}
                </a>
                {!site.email.verified && <Verify note={site.email.note} />}
              </p>
            </address>
            <ul className="mt-4 flex gap-4 text-sm">
              {Object.entries(site.social)
                .filter(([, url]) => url)
                .map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                      {name === "linkedin" ? "LinkedIn" : name === "youtube" ? "YouTube" : name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. A business of{" "}
            <a href={site.parent.url} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
              RPM International Inc.
            </a>
            , reporting through{" "}
            <a href={site.parent.viaUrl} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
              Carboline
            </a>
            .
          </p>
          <ul className="flex flex-wrap gap-4">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/where-to-buy" className="hover:text-white">Locations</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
