import { site } from "@/lib/site";
import { markets } from "@/content/markets";
import { products, familyNames } from "@/content/products";
import { articles } from "@/content/insights";

export const dynamic = "force-static";

/** llms.txt — a concise, answer-first map of the site for AI answer engines. */
export function GET() {
  const lines = [
    `# ${site.name} (SPC)`,
    "",
    `> ${site.description}`,
    "",
    `- Founded: ${site.founded}`,
    `- Parent: ${site.parent.name} (reports through ${site.parent.via})`,
    `- HQ: Delta, BC, Canada · Phone ${site.phone.display}`,
    `- Brand line: "${site.brandLine}"`,
    "",
    "## Markets",
    ...markets.map((m) => `- [${m.name}](${site.url}/solutions/${m.slug}): ${m.answer}`),
    "",
    "## Products",
    ...products.filter((p) => p.verified).map((p) => `- [${p.name}](${site.url}/products/${p.slug}) (${familyNames[p.family]}): ${p.description}`),
    "",
    "## Guides",
    ...articles.map((a) => `- [${a.title}](${site.url}/insights/${a.slug}): ${a.summary}`),
    "",
    "## Tools",
    `- [System selector](${site.url}/system-selector)`,
    `- [Spec builder](${site.url}/spec-builder)`,
    `- [Field-joint volume & kit estimator](${site.url}/tools/volume-estimator)`,
    `- [Data sheets and SDS](${site.url}/resources)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
