"use client";

import Link from "next/link";
import { FileText, MessageSquareText, Phone } from "lucide-react";
import { useExpert } from "./ExpertProvider";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

/** Sticky mobile bar: Call · WhatsApp · Chat · Datasheets */
export function MobileActionBar() {
  const { openChat } = useExpert();
  const item = "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-steel-200 bg-white/95 pb-[env(safe-area-inset-bottom)] text-navy-900 backdrop-blur sm:hidden"
    >
      <a href={`tel:${site.phone.tel}`} className={item} onClick={() => track("call_click", { source: "mobile_bar" })}>
        <Phone className="h-5 w-5" aria-hidden /> Call
      </a>
      <WhatsAppLink
        source="mobile_bar"
        className={`${item} text-spc-green-700`}
      >
        <WhatsAppIcon className="h-5 w-5" /> WhatsApp
      </WhatsAppLink>
      <button onClick={() => openChat()} className={item}>
        <MessageSquareText className="h-5 w-5" aria-hidden /> Chat
      </button>
      <Link href="/resources" className={item}>
        <FileText className="h-5 w-5" aria-hidden /> Datasheets
      </Link>
    </nav>
  );
}
