import { NextResponse } from "next/server";
import { handleLead, leadSchema } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many submissions. Please call us instead." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true }); // honeypot: silently accept
  try {
    const { territory } = await handleLead(parsed.data);
    return NextResponse.json({ ok: true, territory });
  } catch (e) {
    console.error("[lead] failed", e);
    return NextResponse.json({ error: "Something went wrong. Please call or WhatsApp us." }, { status: 500 });
  }
}
