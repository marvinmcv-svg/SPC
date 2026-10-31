import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Privacy Notice", alternates: { canonical: "/privacy" } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ label: "Privacy", href: "/privacy" }]} title="Privacy notice" intro="Draft for legal review (GDPR, PIPEDA, CCPA). Not final." />
      <Section tone="white">
        <div className="prose-spc max-w-3xl">
          <h2>What we collect</h2>
          <p>Contact details you give us in forms, the AI assistant or WhatsApp (name, email, company, phone, country and project details), only after you agree. Conversation logs from the AI assistant, used to answer you and improve answers. Analytics data, only if you accept analytics cookies.</p>
          <h2>Why</h2>
          <p>To respond to your request, route it to the right specialist or distributor, and improve our content and service.</p>
          <h2>Who we share it with</h2>
          <p>SPC staff, our authorised distributors for your territory, and service providers that process data on our behalf (hosting, CRM, email, AI model providers).</p>
          <h2>Your rights</h2>
          <p>You can ask to access, correct or delete your data at any time by contacting {site.email.value} or {site.phone.display}.</p>
        </div>
      </Section>
    </>
  );
}
