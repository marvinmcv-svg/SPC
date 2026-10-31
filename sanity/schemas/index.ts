/**
 * Sanity CMS schemas (master plan §13 "CMS MODELS").
 *
 * Written as plain schema objects so they type-check without the `sanity`
 * package; drop them into a Studio (`sanity.config.ts` → schema.types).
 * They mirror src/content/types.ts, so swapping local content for GROQ
 * queries does not change the pages.
 */
type Field = Record<string, unknown> & { name: string; type: string };
const doc = (name: string, title: string, fields: Field[], extra: Record<string, unknown> = {}) => ({ name, title, type: "document", fields, ...extra });
const str = (name: string, extra: Record<string, unknown> = {}): Field => ({ name, type: "string", ...extra });
const text = (name: string): Field => ({ name, type: "text" });
const slug = (source = "name"): Field => ({ name: "slug", type: "slug", options: { source }, validation: (r: { required: () => unknown }) => r.required() });
const ref = (name: string, to: string | string[], array = false): Field =>
  array
    ? { name, type: "array", of: [{ type: "reference", to: ([] as string[]).concat(to).map((t) => ({ type: t })) }] }
    : { name, type: "reference", to: ([] as string[]).concat(to).map((t) => ({ type: t })) };
const verified: Field = { name: "verified", type: "boolean", description: "Confirmed by SPC (unchecked = placeholder, shows a 'to confirm' marker)", initialValue: false };
const locale: Field = { name: "language", type: "string", options: { list: ["en", "es", "fr", "pt", "ar"] }, initialValue: "en" };
const geo: Field = { name: "location", type: "geopoint" };

export const schemaTypes = [
  doc("siteSettings", "Site settings", [
    str("phone"), str("fax"), str("email"), str("hoursLabel"),
    { name: "whatsappNumbers", type: "array", of: [{ type: "object", fields: [str("region"), str("number")] }] },
    { name: "proof", title: "Proof bar", type: "array", of: [{ type: "object", fields: [str("label"), str("value"), verified] }] },
  ]),
  doc("productFamily", "Product family", [str("name"), slug(), text("description")]),
  doc("market", "Market", [str("name"), slug(), str("headline"), text("answer"), text("intro"), ref("applications", "application", true), { name: "challenges", type: "array", of: [{ type: "string" }] }, ref("faqs", "faq", true)]),
  doc("application", "Application", [str("name"), slug(), text("description"), ref("market", "market")]),
  doc("product", "Product", [
    str("name"), slug(), verified, ref("family", "productFamily"), str("tagline"), text("description"),
    ref("markets", "market", true), ref("applications", "application", true),
    { name: "methods", type: "array", of: [{ type: "string" }], options: { list: ["brush", "roller", "spray", "plural-spray"] } },
    { name: "substrates", type: "array", of: [{ type: "string" }] },
    { name: "maxServiceTempC", type: "number" },
    { name: "specs", type: "array", of: [{ type: "object", fields: [str("label"), str("value"), verified] }] },
    ref("approvals", "approval", true), ref("documents", "document", true), ref("faqs", "faq", true),
    str("legacyId", { description: "Old ?prod= value, used for redirects" }),
  ]),
  doc("document", "Document", [
    str("title"), str("docType", { options: { list: ["PDS", "SDS", "Application Guide", "Certificate", "Brochure"] } }),
    ref("product", "product"), locale, str("version"), { name: "updated", type: "date" }, str("region"),
    { name: "file", type: "file", options: { accept: "application/pdf" } },
  ]),
  doc("approval", "Approval", [str("name"), ref("standard", "standard"), str("certificateNumber"), { name: "expires", type: "date" }, { name: "certificate", type: "file" }, verified]),
  doc("standard", "Standard", [str("code"), str("title"), text("summary")]),
  doc("caseStudy", "Case study", [
    str("title"), slug("title"), ref("market", "market"), str("country"), { name: "year", type: "number" },
    ref("products", "product", true), text("challenge"), text("solution"),
    { name: "metrics", type: "array", of: [{ type: "object", fields: [str("label"), str("value")] }] },
    { name: "media", type: "array", of: [{ type: "image" }, { type: "file" }] },
    { name: "quote", type: "object", fields: [text("text"), str("author"), str("role")] },
    { name: "clientLogoPermitted", type: "boolean", initialValue: false }, geo,
  ]),
  doc("project", "Project (map point)", [str("name"), ref("market", "market"), ref("products", "product", true), { name: "year", type: "number" }, geo, ref("caseStudy", "caseStudy")]),
  doc("location", "Location", [
    str("name"), str("kind", { options: { list: ["office", "plant", "warehouse", "distributor", "agent"] } }),
    text("address"), str("country"), str("phone"), str("email"), geo,
    { name: "territories", type: "array", of: [{ type: "string" }], description: "Countries/regions this location serves (lead routing)" }, verified,
  ]),
  doc("person", "Person", [str("name"), str("role"), { name: "photo", type: "image" }, str("linkedin"), str("territory")]),
  doc("article", "Article", [str("title"), slug("title"), str("category", { options: { list: ["Guide", "Q&A", "Explainer", "Webinar"] } }), text("summary"), { name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] }, { name: "published", type: "date" }, ref("author", "person"), locale]),
  doc("video", "Video", [str("title"), str("url"), text("description"), { name: "thumbnail", type: "image" }, ref("products", "product", true)]),
  doc("faq", "FAQ", [str("question"), text("answer"), locale]),
  doc("redirect", "Redirect", [str("source"), str("destination"), { name: "permanent", type: "boolean", initialValue: true }]),
];
