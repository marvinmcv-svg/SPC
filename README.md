# SPC website

The new website for Specialty Polymer Coatings, Inc. (SPC), built from [`SPC_Website_10x_Master_Plan.md`](./SPC_Website_10x_Master_Plan.md).

Next.js 15 (App Router, TypeScript, React Server Components), Tailwind CSS v4 and the Anthropic SDK.

## Run it

```bash
npm install
cp .env.example .env.local   # all values optional
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm test && npm run lint
```

## What's built (delivery steps 1–6 of the plan, first pass)

| Area | Where |
|---|---|
| Design system: navy/green/amber tokens, Inter Tight / Inter / JetBrains Mono, the "mils & layers" motif | `src/app/globals.css`, `src/components/ui` |
| Layout shell: header, mega-nav, footer, skip link, consent banner (Consent Mode v2) | `src/components/layout`, `src/app/layout.tsx` |
| Homepage: all 10 sections from §4.1 | `src/app/page.tsx`, `src/components/home` |
| Solutions (5 markets), product catalogue (faceted), product pages, compare up to 3 | `src/app/solutions`, `src/app/products` |
| **AI receptionist "SPC Tech Assistant"**: streaming chat, tool use, source citations, photo upload, consent-gated lead capture, human handoff options | `src/components/chat`, `src/app/api/chat`, `src/lib/ai` |
| **WhatsApp widget**: floating button, inline CTAs, page-context prefill, desktop QR modal, business-hours status, regional numbers via env | `src/components/whatsapp`, `src/lib/whatsapp.ts` |
| "Talk to an expert" chooser, sticky mobile bar (Call · WhatsApp · Chat · Datasheets) | `src/components/layout` |
| System selector ("click the asset"), spec builder (gated spec package) | `src/app/system-selector`, `src/app/spec-builder` |
| Calculators: field-joint volume & kits, coverage, cure time + dew point, VOC & CO₂e savings | `src/app/tools`, `src/lib/calc.ts` |
| Resources hub with document basket, standards hub | `src/app/resources` |
| Case studies, projects map, where to buy, insights, about, training, contact (multi-step, routed) | `src/app/*` |
| Leads: validation, honeypot, rate limit, scoring, territory routing → Supabase / HubSpot / Resend when configured | `src/lib/leads.ts`, `src/app/api/lead` |
| SEO/AEO: metadata, JSON-LD (Organization, Product, FAQPage, Article, BreadcrumbList, LocalBusiness), sitemap, robots, `llms.txt`, OG image, legacy 301s, security headers/CSP | `src/app/sitemap.ts`, `src/app/llms.txt`, `src/lib/redirects.ts`, `next.config.ts` |
| CMS models (Sanity) and database (Supabase) | `sanity/schemas`, `supabase/migrations` |

## Content and placeholders

Content currently lives in typed files in `src/content` that mirror the Sanity schemas. Anything not yet confirmed by SPC (the plan's ⚠️ VERIFY list) is flagged `verified: false` and shows a **"To confirm"** marker on the page. Placeholder products and case studies are `noindex` and left out of the sitemap. The AI assistant is told not to present them as fact.

Still needed from SPC: the full product list and data sheets (PDFs), approvals per product, proof numbers, case studies, WhatsApp numbers, brand colour hex and logo files, distributor list, and the contact email. See §14 of the plan.

## AI assistant

- The model defaults to `claude-sonnet-5-5` (the plan specifies Sonnet for the receptionist for speed and cost). Override it with `ANTHROPIC_MODEL`. Server-side refusal fallback (`fallbacks: "default"`) is enabled.
- Retrieval today is BM25 keyword search over the site's structured content (`src/lib/ai/knowledge.ts`). Phase 2 swaps in pgvector search over parsed PDFs, keeping the same interface. The table is in the Supabase migration.
- Without `ANTHROPIC_API_KEY` the chat replies with phone, WhatsApp and contact options instead of failing.

## Next phases (not yet built)

WhatsApp Business Cloud API webhook → same agent; Chatwoot live handoff; Cal.com routing by territory; Sanity Studio and GROQ wiring; Mapbox maps; React-PDF/DOCX/ZIP spec packages; i18n (es/fr/pt/ar with RTL); conversation logging and admin dashboard; AI eval suite in CI; Playwright E2E and axe tests; distributor portal.
