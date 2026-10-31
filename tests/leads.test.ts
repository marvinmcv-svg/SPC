import { describe, expect, it } from "vitest";
import { leadSchema, routeLead, scoreLead } from "@/lib/leads";
import { buildWhatsappLink } from "@/lib/whatsapp";

const base = { type: "rfq" as const, name: "Jane", email: "jane@example.com", consent: true as const };

describe("leads", () => {
  it("requires consent", () => {
    expect(leadSchema.safeParse({ ...base, consent: false }).success).toBe(false);
  });
  it("scores RFQs higher than contact", () => {
    const rfq = leadSchema.parse(base);
    const contact = leadSchema.parse({ ...base, type: "contact" });
    expect(scoreLead(rfq)).toBeGreaterThan(scoreLead(contact));
  });
  it("routes by country", () => {
    expect(routeLead(leadSchema.parse({ ...base, country: "Australia" })).territory).toBe("Australia & NZ");
    expect(routeLead(leadSchema.parse({ ...base, country: "Brazil" })).territory).toBe("International");
  });
});

describe("whatsapp", () => {
  it("builds a prefilled wa.me link", () => {
    const link = buildWhatsappLink("SP-2888 RG", "+1 604 555 0100");
    expect(link).toBe(`https://wa.me/16045550100?text=${encodeURIComponent("Hi SPC, I'm looking at SP-2888 RG and have a question about…")}`);
  });
  it("returns null when no number is configured", () => {
    expect(buildWhatsappLink("x", undefined)).toBeNull();
  });
});
