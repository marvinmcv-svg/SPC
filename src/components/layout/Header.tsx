"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ExpertButton } from "./ExpertButton";
import { Logo } from "./Logo";
import { cn } from "@/components/ui/cn";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 text-white backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-amber-cta focus:px-3 focus:py-2 focus:text-navy-950"
      >
        Skip to content
      </a>
      <div className="hidden border-b border-white/10 text-xs text-steel-300 lg:block">
        <Container className="flex h-8 items-center justify-between">
          <p>{site.brandLine}</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phone.tel}`} className="flex items-center gap-1 hover:text-white">
              <Phone className="h-3 w-3" aria-hidden /> Technical service {site.phone.display}
            </a>
            <span>
              Part of{" "}
              <a href={site.parent.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                RPM International
              </a>
            </span>
          </div>
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="SPC home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors hover:text-amber-cta",
                    isActive(item.href) ? "text-amber-cta" : "text-steel-100",
                  )}
                >
                  {item.label}
                  {"children" in item && <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />}
                </Link>
                {"children" in item && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-60 rounded-lg border border-steel-200 bg-white p-2 text-navy-900 shadow-xl">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded px-3 py-2 text-sm hover:bg-steel-100">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <ExpertButton size="sm" />
          </span>
          <button
            className="rounded p-2 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 lg:hidden">
          <Container className="py-4">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded px-2 py-2 font-semibold hover:bg-white/5">
                    {item.label}
                  </Link>
                  {"children" in item && (
                    <ul className="mb-2 ml-3 border-l border-white/10 pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block py-1.5 text-sm text-steel-300 hover:text-white">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link href="/contact" className="block rounded px-2 py-2 font-semibold hover:bg-white/5">
                  Contact
                </Link>
              </li>
            </ul>
            <ExpertButton className="mt-4 w-full" />
          </Container>
        </nav>
      )}
    </header>
  );
}
