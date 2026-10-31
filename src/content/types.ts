/**
 * Content types. These mirror the Sanity schemas in /sanity/schemas so the
 * local content files can be swapped for CMS queries without touching pages.
 */

export type MarketSlug =
  | "pipeline"
  | "marine"
  | "storage-tanks"
  | "water-wastewater"
  | "industrial";

export type ProductFamily = "epoxy-amine" | "epoxy-novolac" | "polyurethane";

export type ApplicationMethod = "brush" | "roller" | "spray" | "plural-spray";

export interface Market {
  slug: MarketSlug;
  name: string;
  short: string;
  headline: string;
  intro: string;
  /** Answer-first summary used at the top of the page and in llms.txt */
  answer: string;
  applications: { slug: string; name: string; description: string }[];
  challenges: string[];
  faqs: Faq[];
  icon: "pipeline" | "ship" | "tank" | "water" | "factory";
}

export interface Faq {
  q: string;
  a: string;
}

export interface Spec {
  label: string;
  value: string;
  verified: boolean;
}

export interface Product {
  slug: string;
  name: string;
  family: ProductFamily;
  /** False for placeholder catalogue entries awaiting SPC product data. */
  verified: boolean;
  tagline: string;
  description: string;
  markets: MarketSlug[];
  applications: string[];
  methods: ApplicationMethod[];
  substrates: string[];
  maxServiceTempC?: number;
  approvals: { name: string; verified: boolean }[];
  specs: Spec[];
  documents: string[];
  faqs: Faq[];
  legacyId?: string;
}

export type DocType = "PDS" | "SDS" | "Application Guide" | "Certificate" | "Brochure";

export interface DocumentRef {
  id: string;
  title: string;
  type: DocType;
  product?: string;
  language: "en" | "es" | "fr" | "pt" | "ar";
  version: string;
  updated: string;
  /** Path to the PDF. Null until the file is uploaded. */
  url: string | null;
  region?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  market: MarketSlug;
  country: string;
  year: number;
  products: string[];
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  quote?: { text: string; author: string; role: string };
  /** Approximate location for the projects map: [lng, lat] */
  coords: [number, number];
  placeholder: boolean;
}

export interface Location {
  id: string;
  name: string;
  kind: "office" | "plant" | "warehouse" | "distributor" | "agent";
  address: string;
  country: "Canada" | "USA" | "Australia" | string;
  phone?: string;
  coords: [number, number];
  verified: boolean;
  note?: string;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: "Guide" | "Q&A" | "Explainer" | "Webinar";
  readMinutes: number;
  published: string;
  /** Article body as simple sections so pages render server-side for AEO. */
  sections: { heading: string; body: string[] }[];
  draft: boolean;
}
