import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Verify } from "@/components/ui/Verify";
import { buttonClasses } from "@/components/ui/Button";
import { ContactForm } from "@/components/tools/ContactForm";
import { ExpertButton } from "@/components/layout/ExpertButton";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Contact SPC — Technical Service & Sales",
  description: `Talk to SPC's coatings specialists by phone, WhatsApp, AI chat or project enquiry. ${site.phone.display}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Talk to people who know coatings."
        intro="Real specialists, not a call centre. Choose the fastest way for you — we reply to enquiries within 4 business hours."
      >
        <div className="flex flex-wrap gap-3">
          <ExpertButton mode="chat">Ask the AI assistant now</ExpertButton>
          <WhatsAppLink context="the contact page" source="contact" className={buttonClasses("outline-light", "md")}>
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </WhatsAppLink>
          <a href={`tel:${site.phone.tel}`} className={buttonClasses("outline-light", "md")}>
            <Phone className="h-4 w-4" aria-hidden /> {site.phone.display}
          </a>
        </div>
      </PageHero>
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Suspense>
            <ContactForm />
          </Suspense>
          <aside className="space-y-6 text-sm">
            <div className="rounded-xl border border-steel-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-navy-900">Head office & technical service</h2>
              <ul className="mt-4 space-y-3 text-steel-700">
                <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-navy-700" aria-hidden />#14 – 1595 Cliveden Avenue, Delta, BC V3M 6M2, Canada</li>
                <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-navy-700" aria-hidden /><a className="underline" href={`tel:${site.phone.tel}`}>{site.phone.display}</a> · Fax {site.fax}</li>
                <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-navy-700" aria-hidden /><span><a className="underline" href={`mailto:${site.email.value}`}>{site.email.value}</a>{!site.email.verified && <Verify note={site.email.note} />}</span></li>
                <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-navy-700" aria-hidden />{site.hours.label}. AI assistant 24/7.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-navy-900 p-6 text-white">
              <h2 className="text-lg font-semibold">In the field?</h2>
              <p className="mt-2 text-steel-200">Send a photo of the problem on WhatsApp or in the AI chat. We&apos;ll triage it and a technician will follow up.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
