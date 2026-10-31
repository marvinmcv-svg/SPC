import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { getProduct, products, familyNames } from "@/content/products";
import { scenes } from "@/content/systems";
import { getDocument } from "@/content/documents";
import { handleLead, leadSchema } from "@/lib/leads";
import { site } from "@/lib/site";
import { allLocations, searchKnowledge, type Chunk } from "./knowledge";

export type ToolDef = Anthropic.Beta.BetaTool;

export const TOOLS: ToolDef[] = [
  {
    name: "search_docs",
    description:
      "Search SPC's knowledge base (product data, market pages, FAQs, application articles, document library, locations). Call this before answering any question about SPC products, specs, approvals, application or locations. Returns text passages with their source.",
    input_schema: {
      type: "object",
      properties: { query: { type: "string", description: "Search terms, in English, e.g. 'SP-2888 RG max film build one coat'" } },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "get_product",
    description: "Get the full record for one SPC product by slug or name (e.g. 'sp-2888-rg' or 'SP-2888 RG'). Use list=true to list all products.",
    input_schema: {
      type: "object",
      properties: {
        product: { type: "string", description: "Product slug or name" },
        list: { type: "boolean", description: "Return the list of all products instead" },
      },
      additionalProperties: false,
    },
  },
  {
    name: "recommend_system",
    description:
      "Recommend an SPC coating system for an asset area. Assets: pipeline (girth-weld, bend, hdd), tank (tank-floor, containment), vessel (hull, ballast, deck), water (reservoir, digester).",
    input_schema: {
      type: "object",
      properties: {
        asset: { type: "string", enum: scenes.map((s) => s.id) },
        area: { type: "string", enum: scenes.flatMap((s) => s.zones.map((z) => z.id)) },
        substrate: { type: "string" },
        service_temp_c: { type: "number" },
        immersion: { type: "string", enum: ["none", "soil", "water", "potable", "hydrocarbon", "chemical"] },
        method: { type: "string", enum: ["brush", "spray", "plural-spray"] },
      },
      required: ["asset", "area"],
      additionalProperties: false,
    },
  },
  {
    name: "get_distributor",
    description: "Find SPC offices, plants, distributors or agents serving a country or region.",
    input_schema: {
      type: "object",
      properties: { country: { type: "string" } },
      required: ["country"],
      additionalProperties: false,
    },
  },
  {
    name: "create_lead",
    description:
      "Save the person's details so the right SPC rep or distributor follows up (quotes, technical meetings, samples). Only call after the person explicitly consented to storing their details in this conversation.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        company: { type: "string" },
        role: { type: "string" },
        phone: { type: "string" },
        country: { type: "string" },
        market: { type: "string" },
        project: { type: "string", description: "Short summary of the project and what they need" },
        quantity: { type: "string" },
        timeline: { type: "string" },
        request_type: { type: "string", enum: ["rfq", "contact", "callback"] },
        consent: { type: "boolean", description: "True only if the person explicitly agreed in this conversation" },
      },
      required: ["name", "email", "consent", "request_type"],
      additionalProperties: false,
    },
  },
  {
    name: "send_documents",
    description: "Email SPC documents (PDS, SDS, guides, certificates) to the person. Requires their email and explicit consent.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        document_ids: { type: "array", items: { type: "string" } },
        consent: { type: "boolean" },
      },
      required: ["name", "email", "document_ids", "consent"],
      additionalProperties: false,
    },
  },
  {
    name: "book_meeting",
    description: "Get a link for the person to book a technical call with a specialist for their region.",
    input_schema: {
      type: "object",
      properties: { country: { type: "string" } },
      additionalProperties: false,
    },
  },
  {
    name: "handoff_human",
    description: "Hand the conversation to SPC staff. Use when the person asks for a human, the issue is safety-critical or a warranty/claim, or you cannot answer from the knowledge base.",
    input_schema: {
      type: "object",
      properties: {
        reason: { type: "string" },
        summary: { type: "string", description: "Short summary of the conversation for the human agent" },
      },
      required: ["reason", "summary"],
      additionalProperties: false,
    },
  },
];

export interface ToolContext {
  transcript: string;
  page?: string;
  /** Collected sources, streamed back to the UI as citations */
  cite: (chunks: Pick<Chunk, "sourceId" | "title" | "href" | "url">[]) => void;
}

const LeadToolInput = z.object({
  name: z.string(),
  email: z.string(),
  company: z.string().optional(),
  role: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  market: z.string().optional(),
  project: z.string().optional(),
  quantity: z.string().optional(),
  timeline: z.string().optional(),
  request_type: z.enum(["rfq", "contact", "callback"]),
  consent: z.boolean(),
});

function json(v: unknown) {
  return JSON.stringify(v);
}

export async function runTool(name: string, rawInput: unknown, ctx: ToolContext): Promise<{ content: string; isError?: boolean }> {
  const input = (rawInput ?? {}) as Record<string, unknown>;
  switch (name) {
    case "search_docs": {
      const q = String(input.query ?? "");
      const hits = searchKnowledge(q);
      ctx.cite(hits.filter((h) => h.kind !== "location"));
      if (!hits.length) return { content: "No matching passages in the SPC knowledge base." };
      return {
        content: hits
          .map((h) => `[source: ${h.title} — ${h.href}${h.verified ? "" : " — UNVERIFIED/PLACEHOLDER"}]\n${h.text}`)
          .join("\n\n---\n\n"),
      };
    }
    case "get_product": {
      if (input.list) {
        return { content: json(products.map((p) => ({ slug: p.slug, name: p.name, family: familyNames[p.family], verified: p.verified, tagline: p.tagline }))) };
      }
      const key = String(input.product ?? "").toLowerCase().replace(/\s+/g, "-");
      const p = getProduct(key) ?? products.find((x) => x.name.toLowerCase() === String(input.product ?? "").toLowerCase());
      if (!p) return { content: `No product found for "${input.product}". Use list=true to see all products.`, isError: true };
      ctx.cite([{ sourceId: p.slug, title: p.name, href: `/products/${p.slug}`, url: null }]);
      const docs = p.documents.map(getDocument).filter(Boolean);
      return {
        content: json({
          ...p,
          note: p.verified ? undefined : "PLACEHOLDER product entry — do not present as a real SPC product.",
          specs: p.specs.map((s) => ({ ...s, value: s.verified ? s.value : "not yet confirmed — refer to the PDS" })),
          documents: docs,
          page: `/products/${p.slug}`,
        }),
      };
    }
    case "recommend_system": {
      const scene = scenes.find((s) => s.id === input.asset);
      const zone = scene?.zones.find((z) => z.id === input.area);
      if (!scene || !zone) return { content: "Unknown asset/area combination.", isError: true };
      const recs = zone.products.map(getProduct).filter((p) => p !== undefined);
      const notes: string[] = [zone.notes];
      const temp = Number(input.service_temp_c);
      if (input.immersion === "chemical" || temp > 80) notes.push("Chemical immersion or >80 °C: an epoxy novolac may be needed — technical service must confirm.");
      if (input.immersion === "potable") notes.push("Potable water: confirm the jurisdiction's drinking-water approval for every product.");
      ctx.cite(recs.map((p) => ({ sourceId: p.slug, title: p.name, href: `/products/${p.slug}`, url: null })));
      return {
        content: json({
          asset: scene.name,
          area: zone.label,
          products: recs.map((p) => ({ name: p.name, slug: p.slug, verified: p.verified, family: familyNames[p.family] })),
          dft: zone.dft,
          notes,
          caveat: "Starting-point recommendation. SPC technical service confirms every system against project conditions.",
          spec_builder: `/spec-builder?scene=${scene.id}&zone=${zone.id}`,
        }),
      };
    }
    case "get_distributor": {
      const c = String(input.country ?? "").toLowerCase();
      const all = allLocations();
      const matches = all.filter((l) => l.country.toLowerCase().includes(c) || c.includes(l.country.toLowerCase()));
      return {
        content: json({
          matches: matches.map((l) => ({ name: l.name, kind: l.kind, address: l.address, phone: l.phone, confirmed: l.verified })),
          fallback: matches.length
            ? undefined
            : `No listed partner for ${input.country}. SPC serves clients worldwide through agents and distributors — offer to create a lead so the international team can connect them, or call ${site.phone.display}.`,
          page: "/where-to-buy",
        }),
      };
    }
    case "create_lead": {
      const parsed = LeadToolInput.safeParse(input);
      if (!parsed.success) return { content: `Invalid input: ${parsed.error.message}`, isError: true };
      if (!parsed.data.consent) return { content: "Consent not given. Ask for explicit consent before saving details.", isError: true };
      const lead = leadSchema.safeParse({ ...parsed.data, type: parsed.data.request_type === "rfq" ? "rfq" : parsed.data.request_type, transcript: ctx.transcript, page: ctx.page });
      if (!lead.success) return { content: `Could not save: ${lead.error.issues.map((i) => i.path.join(".") + " " + i.message).join("; ")}`, isError: true };
      const r = await handleLead(lead.data);
      return { content: json({ saved: true, territory: r.territory, next_step: "A specialist will reply within 4 business hours." }) };
    }
    case "send_documents": {
      const ids = Array.isArray(input.document_ids) ? input.document_ids.map(String) : [];
      const docs = ids.map(getDocument).filter((d) => d !== undefined);
      if (!input.consent) return { content: "Consent not given.", isError: true };
      const lead = leadSchema.safeParse({ type: "documents", name: input.name, email: input.email, documents: docs.map((d) => d.id), consent: true, transcript: ctx.transcript, page: ctx.page });
      if (!lead.success) return { content: `Could not send: ${lead.error.issues.map((i) => i.message).join("; ")}`, isError: true };
      await handleLead(lead.data);
      const downloadable = docs.filter((d) => d.url);
      return {
        content: json({
          queued: docs.map((d) => d.title),
          unknown_ids: ids.filter((i) => !getDocument(i)),
          direct_links: downloadable.map((d) => ({ title: d.title, url: d.url })),
          note: "Documents not yet uploaded will be emailed by the SPC team.",
        }),
      };
    }
    case "book_meeting": {
      const url = process.env.NEXT_PUBLIC_CALCOM_URL;
      return {
        content: json(
          url
            ? { booking_url: url, note: "Share this link so they can pick a time." }
            : { booking_url: null, note: `Online booking isn't live yet. Offer to create a callback lead, or call ${site.phone.display}.` },
        ),
      };
    }
    case "handoff_human": {
      // Phase 2: open a Chatwoot conversation with the transcript for live takeover.
      if (process.env.CHATWOOT_API_URL && process.env.CHATWOOT_API_TOKEN) {
        // Integration point intentionally left as a stub until the inbox exists.
      }
      return {
        content: json({
          handed_off: false,
          options: [
            `Call ${site.phone.display} (${site.hours.label})`,
            "WhatsApp via the green button",
            "Leave details (with consent) and a specialist replies within 4 business hours",
          ],
          note: "Live chat takeover is not connected yet; give the person these options.",
        }),
      };
    }
    default:
      return { content: `Unknown tool ${name}`, isError: true };
  }
}
