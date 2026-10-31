import { z } from "zod";

export const leadSchema = z.object({
  type: z.enum(["contact", "rfq", "spec_package", "documents", "chat", "callback"]),
  name: z.string().min(1).max(120),
  email: z.email().max(200),
  company: z.string().max(200).optional().default(""),
  role: z.string().max(120).optional().default(""),
  phone: z.string().max(60).optional().default(""),
  country: z.string().max(80).optional().default(""),
  market: z.string().max(60).optional().default(""),
  project: z.string().max(4000).optional().default(""),
  quantity: z.string().max(200).optional().default(""),
  timeline: z.string().max(120).optional().default(""),
  documents: z.array(z.string().max(80)).max(50).optional().default([]),
  transcript: z.string().max(20000).optional(),
  consent: z.literal(true, { error: "Consent is required to store your details." }),
  page: z.string().max(300).optional(),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional(),
});

export type Lead = z.infer<typeof leadSchema>;

/** Simple rule-based lead score (0–100). Tune with sales once CRM data exists. */
export function scoreLead(l: Lead) {
  let s = 10;
  if (l.type === "rfq") s += 35;
  if (l.type === "spec_package") s += 25;
  if (l.company) s += 10;
  if (l.phone) s += 10;
  if (l.quantity) s += 10;
  if (/asap|immediate|month|week|q[1-4]/i.test(l.timeline)) s += 10;
  if (/engineer|procure|buyer|manager|director|owner|specifier/i.test(l.role)) s += 5;
  return Math.min(100, s);
}

/** Territory routing. Replace with the real rep/distributor matrix from SPC. */
export function routeLead(l: Lead) {
  const c = l.country.toLowerCase();
  if (/united states|usa|^us$|mexico/.test(c)) return { territory: "USA", email: process.env.LEAD_EMAIL_US };
  if (/australia|new zealand/.test(c)) return { territory: "Australia & NZ", email: process.env.LEAD_EMAIL_AU };
  if (/canada/.test(c)) return { territory: "Canada", email: process.env.LEAD_EMAIL_CA };
  return { territory: "International", email: process.env.LEAD_EMAIL_INTL };
}

/**
 * Persist and forward a lead. Each integration is optional and switched on by
 * env vars, so the site works end-to-end in development without credentials.
 */
export async function handleLead(lead: Lead) {
  const score = scoreLead(lead);
  const route = routeLead(lead);
  const results: Record<string, string> = {};

  // 1. Supabase (leads table)
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...lead, website: undefined, score, territory: route.territory }),
    });
    results.supabase = res.ok ? "ok" : `error ${res.status}`;
  }

  // 2. HubSpot contact (CRM v3, private app token)
  if (process.env.HUBSPOT_TOKEN) {
    const [firstname, ...rest] = lead.name.split(" ");
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        properties: {
          email: lead.email,
          firstname,
          lastname: rest.join(" "),
          company: lead.company,
          phone: lead.phone,
          country: lead.country,
          jobtitle: lead.role,
          message: [`[${lead.type}] score ${score} · ${route.territory}`, lead.project, lead.quantity, lead.timeline].filter(Boolean).join("\n"),
        },
      }),
    });
    // 409 = contact exists; acceptable for now (update flow is a follow-up).
    results.hubspot = res.ok || res.status === 409 ? "ok" : `error ${res.status}`;
  }

  // 3. Notify the rep by email (Resend)
  const to = route.email ?? process.env.LEAD_EMAIL_DEFAULT;
  if (process.env.RESEND_API_KEY && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM ?? "SPC Website <website@spc-net.com>",
        to,
        reply_to: lead.email,
        subject: `[${route.territory}] New ${lead.type} lead (score ${score}) — ${lead.company || lead.name}`,
        text: Object.entries({ ...lead, score, territory: route.territory, transcript: undefined, website: undefined })
          .filter(([, v]) => v !== undefined && v !== "")
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join("\n") + (lead.transcript ? `\n\n--- Chat transcript ---\n${lead.transcript}` : ""),
      }),
    });
    results.email = res.ok ? "ok" : `error ${res.status}`;
  }

  if (!Object.keys(results).length) {
    console.info("[lead] no integrations configured; lead received", { type: lead.type, score, territory: route.territory });
  }
  return { score, territory: route.territory, results };
}
