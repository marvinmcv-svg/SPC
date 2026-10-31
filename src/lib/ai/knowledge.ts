import { products, familyNames, methodNames } from "@/content/products";
import { markets } from "@/content/markets";
import { documents } from "@/content/documents";
import { articles } from "@/content/insights";
import { locations } from "@/content/locations";
import { site } from "@/lib/site";

/**
 * Knowledge base for the AI assistant.
 *
 * Phase 1 indexes the site's structured content with a lightweight BM25
 * keyword search, so the assistant works with zero infrastructure. Phase 2
 * replaces `searchKnowledge` with Supabase pgvector search over the parsed
 * PDS/SDS/guide PDFs (same return shape), re-indexed on Sanity publish.
 */
export interface Chunk {
  id: string;
  sourceId: string;
  title: string;
  href: string;
  /** Direct PDF link when the source is a document */
  url: string | null;
  kind: "product" | "market" | "faq" | "article" | "document" | "location" | "company";
  text: string;
  verified: boolean;
}

function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];
  chunks.push({
    id: "company",
    sourceId: "company",
    title: "About SPC",
    href: "/about",
    url: null,
    kind: "company",
    verified: true,
    text: `${site.name} (SPC). ${site.description} Founded ${site.founded}. Brand line: "${site.brandLine}". Parent: ${site.parent.name}, reporting through ${site.parent.via} (acquired September 2016). HQ: #14 – 1595 Cliveden Avenue, Delta, BC, Canada. Phone ${site.phone.display}. Hours ${site.hours.label}. Product families: Epoxy Amines, Epoxy Novolacs, Polyurethane Finishes. Markets: pipeline, marine (Lloyd's Register approved), storage tanks, water & wastewater, industrial.`,
  });
  for (const p of products) {
    chunks.push({
      id: `product:${p.slug}`,
      sourceId: p.slug,
      title: p.name,
      href: `/products/${p.slug}`,
      url: null,
      kind: "product",
      verified: p.verified,
      text: [
        `${p.name} — ${familyNames[p.family]}. ${p.verified ? "" : "PLACEHOLDER ENTRY: not an official SPC product name; do not quote as a real product."}`,
        p.description,
        `Markets: ${p.markets.join(", ")}. Applications: ${p.applications.join(", ")}.`,
        `Application methods: ${p.methods.map((m) => methodNames[m]).join(", ")}. Substrates: ${p.substrates.join(", ")}.`,
        `Specs: ${p.specs.map((s) => `${s.label}: ${s.verified ? s.value : "not yet confirmed — refer to PDS"}`).join("; ")}.`,
        `Approvals: ${p.approvals.map((a) => `${a.name}${a.verified ? "" : " (NOT CONFIRMED)"}`).join("; ") || "none listed"}.`,
      ].join("\n"),
    });
    for (const f of p.faqs) {
      chunks.push({ id: `faq:${p.slug}:${f.q}`, sourceId: p.slug, title: `${p.name} FAQ`, href: `/products/${p.slug}`, url: null, kind: "faq", verified: p.verified, text: `Q: ${f.q}\nA: ${f.a}` });
    }
  }
  for (const m of markets) {
    chunks.push({
      id: `market:${m.slug}`,
      sourceId: m.slug,
      title: `${m.name} coatings`,
      href: `/solutions/${m.slug}`,
      url: null,
      kind: "market",
      verified: true,
      text: `${m.answer}\n${m.intro}\nApplications: ${m.applications.map((a) => `${a.name}: ${a.description}`).join(" ")}\nChallenges: ${m.challenges.join(" ")}`,
    });
    for (const f of m.faqs) {
      chunks.push({ id: `faq:${m.slug}:${f.q}`, sourceId: m.slug, title: `${m.name} FAQ`, href: `/solutions/${m.slug}`, url: null, kind: "faq", verified: true, text: `Q: ${f.q}\nA: ${f.a}` });
    }
  }
  for (const a of articles) {
    for (const s of a.sections) {
      chunks.push({ id: `article:${a.slug}:${s.heading}`, sourceId: a.slug, title: a.title, href: `/insights/${a.slug}`, url: null, kind: "article", verified: !a.draft, text: `${a.title} — ${s.heading}\n${s.body.join("\n")}` });
    }
  }
  for (const d of documents) {
    chunks.push({ id: `doc:${d.id}`, sourceId: d.id, title: d.title, href: `/resources`, url: d.url, kind: "document", verified: true, text: `${d.title} (${d.type}, ${d.language}, version ${d.version}). ${d.url ? "Available to download." : "Not yet uploaded; can be requested."}` });
  }
  for (const l of locations) {
    chunks.push({ id: `loc:${l.id}`, sourceId: l.id, title: l.name, href: "/where-to-buy", url: null, kind: "location", verified: l.verified, text: `${l.name} (${l.kind}) — ${l.address}, ${l.country}. ${l.phone ? `Phone ${l.phone}.` : ""} ${l.verified ? "" : "Details not yet confirmed."}` });
  }
  return chunks;
}

const STOP = new Set("a an and are as at be by can do does for from how i in is it my of on or our the to what when where which who why with you your".split(" "));

function tokenize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const CHUNKS = buildChunks();
const DOC_TOKENS = CHUNKS.map((c) => tokenize(`${c.title} ${c.text}`));
const AVG_LEN = DOC_TOKENS.reduce((n, t) => n + t.length, 0) / DOC_TOKENS.length;
const DF = new Map<string, number>();
for (const toks of DOC_TOKENS) for (const t of new Set(toks)) DF.set(t, (DF.get(t) ?? 0) + 1);

/** BM25 keyword search over the knowledge chunks. */
export function searchKnowledge(query: string, k = 6): Chunk[] {
  const q = tokenize(query);
  if (!q.length) return [];
  const N = CHUNKS.length;
  const scored = DOC_TOKENS.map((toks, i) => {
    let score = 0;
    for (const term of q) {
      const tf = toks.filter((t) => t === term || (term.length > 4 && t.startsWith(term.slice(0, -1)))).length;
      if (!tf) continue;
      const df = DF.get(term) ?? 1;
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      score += idf * ((tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * (toks.length / AVG_LEN))));
    }
    return { i, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => CHUNKS[s.i]);
}

export function allLocations() {
  return locations;
}
