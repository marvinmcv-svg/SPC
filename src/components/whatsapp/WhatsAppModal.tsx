"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Modal } from "@/components/ui/Modal";
import { buttonClasses } from "@/components/ui/Button";
import { useExpert } from "@/components/layout/ExpertProvider";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { useBusinessHours } from "@/lib/useBusinessHours";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Desktop: shows a QR code to continue on the phone, plus a WhatsApp Web link.
 * Mobile devices never see this — WhatsAppLink opens the app directly.
 */
export function WhatsAppModal() {
  const { whatsappOpen, closeWhatsapp, whatsappContext, openChat } = useExpert();
  const [qr, setQr] = useState<string | null>(null);
  const link = buildWhatsappLink(whatsappContext);
  const open = useBusinessHours();

  useEffect(() => {
    if (!whatsappOpen || !link) return;
    QRCode.toDataURL(link, { margin: 1, width: 220, color: { dark: "#0b1f33", light: "#ffffff" } }).then(setQr);
  }, [whatsappOpen, link]);

  return (
    <Modal open={whatsappOpen} onClose={closeWhatsapp} title="Chat with SPC on WhatsApp">
      {link ? (
        <div className="text-center">
          <p className="text-sm text-steel-700">Scan with your phone to continue the conversation in WhatsApp.</p>
          {qr && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt="QR code that opens a WhatsApp chat with SPC" width={220} height={220} className="mx-auto my-4" />
          )}
          <p className="mb-4 text-xs text-steel-500">
            {open
              ? "Our team is online now and typically replies within minutes."
              : `Our team is offline (${site.hours.label}). Leave a message and we'll reply next business day.`}
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "qr_modal", context: whatsappContext })}
            className={buttonClasses("green", "md", "w-full")}
          >
            <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp Web
          </a>
        </div>
      ) : (
        <div className="space-y-4 text-sm text-steel-700">
          <p>
            WhatsApp is being set up for SPC. In the meantime our AI assistant can answer right now, or call us on{" "}
            <a className="font-semibold text-navy-900 underline" href={`tel:${site.phone.tel}`}>
              {site.phone.display}
            </a>
            .
          </p>
          <button className={buttonClasses("secondary", "md", "w-full")} onClick={() => { closeWhatsapp(); openChat(); }}>
            Ask the AI assistant
          </button>
        </div>
      )}
    </Modal>
  );
}
