import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";

export function CtaBand({
  title = "Get a spec package in 60 seconds.",
  body = "Tell us the asset and conditions. We'll send the system, data sheets and spec text — and a specialist will follow up.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-spc-green-700 text-white" aria-labelledby="cta-title">
      <Container className="flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-spc-green-100">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/spec-builder" size="lg">Build my spec</ButtonLink>
          <WhatsAppLink source="cta_band" className={buttonClasses("outline-light", "lg")}>
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </WhatsAppLink>
          <a href={`tel:${site.phone.tel}`} className={buttonClasses("outline-light", "lg")}>
            <Phone className="h-5 w-5" aria-hidden /> Call
          </a>
          <a href={`mailto:${site.email.value}`} className={buttonClasses("outline-light", "lg")}>
            <Mail className="h-5 w-5" aria-hidden /> Email
          </a>
        </div>
      </Container>
    </section>
  );
}
