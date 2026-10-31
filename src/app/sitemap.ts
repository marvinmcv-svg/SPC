import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { markets } from "@/content/markets";
import { products } from "@/content/products";
import { caseStudies } from "@/content/case-studies";
import { articles } from "@/content/insights";

const staticRoutes = [
  "", "/solutions", "/products", "/products/compare", "/system-selector", "/spec-builder", "/tools",
  "/tools/volume-estimator", "/tools/coverage-kit-calculator", "/tools/cure-time-calculator", "/tools/voc-carbon-savings",
  "/case-studies", "/projects-map", "/resources", "/insights", "/training", "/about", "/about/sustainability",
  "/about/quality", "/about/rpm-carboline", "/where-to-buy", "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r}`, lastModified: now, priority: r === "" ? 1 : 0.7 })),
    ...markets.map((m) => ({ url: `${site.url}/solutions/${m.slug}`, lastModified: now, priority: 0.9 })),
    // Placeholder entries are noindex and kept out of the sitemap.
    ...products.filter((p) => p.verified).map((p) => ({ url: `${site.url}/products/${p.slug}`, lastModified: now, priority: 0.9 })),
    ...caseStudies.filter((c) => !c.placeholder).map((c) => ({ url: `${site.url}/case-studies/${c.slug}`, lastModified: now })),
    ...articles.map((a) => ({ url: `${site.url}/insights/${a.slug}`, lastModified: new Date(a.published) })),
  ];
}
