"use client";

import Link from "next/link";
import { CalendarDays, Mail, MessageSquareText, Phone } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useExpert } from "./ExpertProvider";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { site } from "@/lib/site";
import { useBusinessHours } from "@/lib/useBusinessHours";

/** The global "Talk to an expert" chooser: AI chat / WhatsApp / book a call / form. */
export function ExpertModal() {
  const { expertOpen, closeExpert, openChat } = useExpert();
  const online = useBusinessHours();
  const bookingUrl = process.env.NEXT_PUBLIC_CALCOM_URL;

  const row =
    "flex w-full items-start gap-4 rounded-lg border border-steel-200 p-4 text-left transition hover:border-navy-600 hover:bg-steel-100";

  return (
    <Modal open={expertOpen} onClose={closeExpert} title="Talk to a coatings expert">
      <p className="mb-4 text-sm text-steel-700">
        {online === null ? "" : online ? "Our technical team is online now." : `Our team is offline right now (${site.hours.label}).`} Our AI
        assistant answers instantly, any time.
      </p>
      <div className="space-y-3">
        <button className={row} onClick={() => openChat()}>
          <MessageSquareText className="mt-0.5 h-6 w-6 text-navy-700" aria-hidden />
          <span>
            <span className="block font-semibold text-navy-900">Ask the AI tech assistant</span>
            <span className="text-sm text-steel-700">Instant answers from SPC data sheets, 24/7, any language.</span>
          </span>
        </button>
        <WhatsAppLink className={row} source="expert_modal" context="your products">
          <WhatsAppIcon className="mt-0.5 h-6 w-6 text-spc-green-600" />
          <span>
            <span className="block font-semibold text-navy-900">Chat on WhatsApp</span>
            <span className="text-sm text-steel-700">Send photos from the field and get datasheets in-chat.</span>
          </span>
        </WhatsAppLink>
        {bookingUrl ? (
          <a className={row} href={bookingUrl} target="_blank" rel="noopener noreferrer">
            <CalendarDays className="mt-0.5 h-6 w-6 text-navy-700" aria-hidden />
            <span>
              <span className="block font-semibold text-navy-900">Book a technical call</span>
              <span className="text-sm text-steel-700">Pick a time with a specialist for your region.</span>
            </span>
          </a>
        ) : null}
        <a className={row} href={`tel:${site.phone.tel}`}>
          <Phone className="mt-0.5 h-6 w-6 text-navy-700" aria-hidden />
          <span>
            <span className="block font-semibold text-navy-900">Call {site.phone.display}</span>
            <span className="text-sm text-steel-700">{site.hours.label}</span>
          </span>
        </a>
        <Link className={row} href="/contact" onClick={closeExpert}>
          <Mail className="mt-0.5 h-6 w-6 text-navy-700" aria-hidden />
          <span>
            <span className="block font-semibold text-navy-900">Send a project enquiry</span>
            <span className="text-sm text-steel-700">A specialist replies within 4 business hours.</span>
          </span>
        </Link>
      </div>
    </Modal>
  );
}
