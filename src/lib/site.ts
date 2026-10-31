/**
 * Site-wide settings. In production these come from the Sanity `siteSettings`
 * document; values here are the launch defaults.
 *
 * Anything with `verified: false` is a placeholder from the master plan's
 * ⚠️ VERIFY list and renders with a "to confirm" marker until SPC signs it off.
 */

export type Verifiable<T> = { value: T; verified: boolean; note?: string };

export const site = {
  name: "Specialty Polymer Coatings, Inc.",
  shortName: "SPC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.spc-net.com",
  brandLine: "Small enough to care. Big enough to deliver.",
  heroHeadline: "100% Solids. Zero VOCs.",
  heroSubline: "Protection that goes on thick — and stays on.",
  description:
    "SPC formulates and manufactures 100% solids, zero-VOC liquid epoxy and polyurethane coatings for pipelines, marine assets, storage tanks and water infrastructure. Since 1989. Part of RPM International.",
  founded: 1989,
  parent: {
    name: "RPM International Inc.",
    url: "https://www.rpminc.com",
    via: "Carboline",
    viaUrl: "https://www.carboline.com",
  },
  phone: {
    display: "+1 604 514 9711",
    tel: "+16045149711",
  },
  fax: "+1 604 514 9722",
  email: {
    value: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@spc-net.com",
    verified: false,
    note: "No email is published today. Confirm the inbox before launch.",
  } satisfies Verifiable<string>,
  hours: {
    timezone: "America/Vancouver",
    openHour: 8,
    closeHour: 17,
    days: [1, 2, 3, 4, 5],
    label: "Mon–Fri, 8:00–17:00 Pacific",
  },
  /** LinkedIn and Facebook page URLs are not in the plan yet (⚠️ VERIFY); set via env. */
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    youtube: "https://www.youtube.com/@specialtypolymercoatingsin6623",
  } as Record<"linkedin" | "facebook" | "youtube", string | undefined>,
  /** Proof bar. Numbers are placeholders until SPC confirms them. */
  proof: [
    { label: "Formulating since", value: "1989", verified: true },
    { label: "Pipeline protected", value: "X,000+ km", verified: false },
    { label: "Marine approval", value: "Lloyd's Register", verified: true },
    { label: "Backed by", value: "RPM / Carboline", verified: true },
    { label: "Countries supplied", value: "Y+", verified: false },
  ],
} as const;

export type Region = "CA" | "US" | "AU";

/**
 * WhatsApp numbers come from env so they can differ per environment and region.
 * Use full international format without "+" or spaces, e.g. 16045149711.
 */
export const whatsappNumbers: Record<Region, string | undefined> = {
  CA: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_CA,
  US: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_US,
  AU: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_AU,
};

export function defaultWhatsappNumber(): string | undefined {
  return whatsappNumbers.CA ?? whatsappNumbers.US ?? whatsappNumbers.AU;
}

export const mainNav = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Pipeline", href: "/solutions/pipeline" },
      { label: "Marine", href: "/solutions/marine" },
      { label: "Storage Tanks", href: "/solutions/storage-tanks" },
      { label: "Water & Wastewater", href: "/solutions/water-wastewater" },
      { label: "Industrial", href: "/solutions/industrial" },
    ],
  },
  { label: "Products", href: "/products" },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "System Selector", href: "/system-selector" },
      { label: "Spec Builder", href: "/spec-builder" },
      { label: "Volume & Kit Estimator", href: "/tools/volume-estimator" },
      { label: "Coverage Calculator", href: "/tools/coverage-kit-calculator" },
      { label: "Cure-Time Calculator", href: "/tools/cure-time-calculator" },
      { label: "VOC & Carbon Savings", href: "/tools/voc-carbon-savings" },
      { label: "Compare Products", href: "/products/compare" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story", href: "/about" },
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "Quality & approvals", href: "/about/quality" },
      { label: "Insights", href: "/insights" },
      { label: "Training", href: "/training" },
    ],
  },
  { label: "Where to Buy", href: "/where-to-buy" },
] as const;
