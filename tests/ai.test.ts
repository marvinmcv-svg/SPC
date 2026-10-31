import { describe, expect, it } from "vitest";
import { searchKnowledge } from "@/lib/ai/knowledge";
import { runTool } from "@/lib/ai/tools";

const ctx = { transcript: "", cite: () => {} };

describe("knowledge search", () => {
  it("finds SP-2888 RG for a girth weld query", () => {
    const hits = searchKnowledge("girth weld coating one coat thickness");
    expect(hits.some((h) => h.sourceId === "sp-2888-rg")).toBe(true);
  });
  it("returns nothing for gibberish", () => {
    expect(searchKnowledge("zzqx")).toHaveLength(0);
  });
});

describe("assistant tools", () => {
  it("get_product hides unverified spec values", async () => {
    const r = await runTool("get_product", { product: "SP-2888 RG" }, ctx);
    expect(r.content).toContain("not yet confirmed");
    expect(r.content).toContain("≈ 60 mils");
  });
  it("create_lead refuses without consent", async () => {
    const r = await runTool("create_lead", { name: "A", email: "a@example.com", consent: false, request_type: "rfq" }, ctx);
    expect(r.isError).toBe(true);
  });
  it("recommend_system rejects unknown areas", async () => {
    const r = await runTool("recommend_system", { asset: "pipeline", area: "ballast" }, ctx);
    expect(r.isError).toBe(true);
  });
  it("get_distributor falls back for unlisted countries", async () => {
    const r = await runTool("get_distributor", { country: "Peru" }, ctx);
    expect(JSON.parse(r.content).fallback).toBeTruthy();
  });
});
