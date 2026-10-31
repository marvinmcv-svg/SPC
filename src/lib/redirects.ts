import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * 301 redirects from the legacy spc-net.com URLs (Umbraco).
 * ⚠️ Complete this map from a full crawl of the live site during discovery.
 */
export const legacyRedirects: Redirect[] = [
  // Product detail pages used a query string: /products/product-details/?prod=SP-2888%20RG
  {
    source: "/products/product-details",
    has: [{ type: "query", key: "prod", value: "(?<prod>SP-2888.*RG.*)" }],
    destination: "/products/sp-2888-rg",
    permanent: true,
  },
  { source: "/products/product-details", destination: "/products", permanent: true },
  { source: "/markets", destination: "/solutions", permanent: true },
  { source: "/markets/:market", destination: "/solutions/:market", permanent: true },
  { source: "/locations", destination: "/where-to-buy", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/solution-spot", destination: "/insights", permanent: true },
  { source: "/events", destination: "/insights", permanent: true },
  { source: "/search-results", destination: "/products", permanent: true },
  { source: "/100-solids-volume-estimation-tool", destination: "/tools/volume-estimator", permanent: true },
];
