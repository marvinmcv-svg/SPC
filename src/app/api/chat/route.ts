import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { TOOLS, runTool } from "@/lib/ai/tools";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 60;

/** The master plan specifies Sonnet for speed and cost on the receptionist; override with ANTHROPIC_MODEL. */
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5";
const MAX_TOOL_ROUNDS = 6;

const Body = z.object({
  page: z.string().max(300).optional(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8000),
        image: z
          .string()
          .regex(/^data:image\/(jpeg|png|webp|gif);base64,/)
          .max(6_000_000)
          .optional(),
      }),
    )
    .min(1)
    .max(40),
});

type Citation = { id: string; title: string; url: string | null; href: string };

export async function POST(req: Request) {
  if (!rateLimit(`chat:${clientIp(req)}`, 30, 10 * 60 * 1000)) {
    return new Response("Too many messages. Please wait a few minutes or call us.", { status: 429 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return new Response("Bad request", { status: 400 });
  const { messages, page } = parsed.data;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (evt: Record<string, unknown>) => controller.enqueue(encoder.encode(JSON.stringify(evt) + "\n"));

      if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
        send({
          type: "text",
          text: `The AI assistant isn't connected in this environment yet (no API key configured). You can call us on ${site.phone.display}, use WhatsApp, or send an enquiry from the contact page.`,
        });
        controller.close();
        return;
      }

      const client = new Anthropic();
      const transcript = messages.map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`).join("\n");
      const seen = new Set<string>();
      const ctx = {
        transcript,
        page,
        cite: (chunks: { sourceId: string; title: string; href: string; url: string | null }[]) => {
          const fresh: Citation[] = [];
          for (const c of chunks) {
            if (seen.has(c.sourceId)) continue;
            seen.add(c.sourceId);
            fresh.push({ id: c.sourceId, title: c.title, href: c.href, url: c.url });
          }
          if (fresh.length) send({ type: "citations", docs: fresh });
        },
      };

      // Plain-text history from the browser; the latest user turn may carry a photo.
      const history: Anthropic.Beta.BetaMessageParam[] = messages.map((m, i) => {
        if (m.role === "user" && m.image && i === messages.length - 1) {
          const [, mediaType, data] = m.image.match(/^data:(image\/[a-z]+);base64,(.*)$/) ?? [];
          return {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType as "image/jpeg", data } },
              { type: "text", text: m.content },
            ],
          };
        }
        return { role: m.role, content: m.content };
      });
      if (page) {
        // Page context goes in the conversation, not the system prompt, so the system prefix stays cacheable.
        const last = history[history.length - 1];
        const note = `\n\n(Visitor is on page: ${page})`;
        if (typeof last.content === "string") last.content += note;
        else if (Array.isArray(last.content)) last.content.push({ type: "text", text: note });
      }

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const s = client.beta.messages.stream({
            model: MODEL,
            max_tokens: 4000,
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            output_config: { effort: "medium" },
            system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
            tools: TOOLS,
            messages: history,
          });
          s.on("text", (delta) => send({ type: "text", text: delta }));
          const msg = await s.finalMessage();

          if (msg.stop_reason === "refusal") {
            send({ type: "error", text: `I can't help with that here. For technical questions, call ${site.phone.display}.` });
            break;
          }
          // Append the full assistant turn unchanged (keeps thinking/tool blocks valid).
          history.push({ role: "assistant", content: msg.content });

          if (msg.stop_reason === "pause_turn") continue;
          if (msg.stop_reason !== "tool_use") break;

          const toolUses = msg.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
          send({ type: "status", text: statusFor(toolUses[0]?.name) });
          const results = await Promise.all(
            toolUses.map(async (t): Promise<Anthropic.Beta.BetaToolResultBlockParam> => {
              try {
                const r = await runTool(t.name, t.input, ctx);
                return { type: "tool_result", tool_use_id: t.id, content: r.content, is_error: r.isError };
              } catch (e) {
                console.error("[chat] tool failed", t.name, e);
                return { type: "tool_result", tool_use_id: t.id, content: "Tool failed. Apologise and offer the phone number.", is_error: true };
              }
            }),
          );
          history.push({ role: "user", content: results });
        }
        // Phase 2: persist the conversation (Supabase) for QA and the unanswered-questions report.
      } catch (e) {
        if (e instanceof Anthropic.RateLimitError) {
          send({ type: "error", text: `We're very busy right now — please try again in a minute or call ${site.phone.display}.` });
        } else if (e instanceof Anthropic.APIError) {
          console.error("[chat] API error", e.status, e.message);
          send({ type: "error", text: `Sorry, something went wrong on our side. Please call ${site.phone.display} or use WhatsApp.` });
        } else {
          console.error("[chat] error", e);
          send({ type: "error", text: `Sorry, something went wrong. Please call ${site.phone.display}.` });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function statusFor(tool?: string) {
  switch (tool) {
    case "search_docs":
    case "get_product":
      return "Checking SPC documents…";
    case "recommend_system":
      return "Selecting a system…";
    case "get_distributor":
      return "Finding your local partner…";
    case "create_lead":
    case "send_documents":
      return "Passing this to our team…";
    default:
      return "Working on it…";
  }
}
