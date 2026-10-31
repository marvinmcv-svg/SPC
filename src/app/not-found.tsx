import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="light" className="min-h-[60vh]">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy-900">We couldn&apos;t find that page.</h1>
      <p className="mt-4 text-steel-700">It may have moved in our site update. Try one of these:</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/products">Products</ButtonLink>
        <ButtonLink href="/resources" variant="secondary">Data sheets</ButtonLink>
        <ButtonLink href="/contact" variant="ghost">Contact</ButtonLink>
      </div>
      <p className="mt-6 text-sm text-steel-500">Or <Link href="/" className="underline">go to the homepage</Link>.</p>
    </Section>
  );
}
