"use client";

import { MessageSquareText, X } from "lucide-react";
import { useExpert } from "./ExpertProvider";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";

/**
 * Bottom-right launchers: AI chat stacked above WhatsApp.
 * Hidden on small screens, where the sticky mobile action bar takes over.
 */
export function FloatingActions() {
  const { chatOpen, openChat, closeChat } = useExpert();

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 sm:flex">
      <button
        onClick={() => (chatOpen ? closeChat() : openChat())}
        aria-label={chatOpen ? "Close the SPC Tech Assistant" : "Open the SPC Tech Assistant"}
        aria-expanded={chatOpen}
        className="group flex items-center gap-2 rounded-full bg-navy-900 py-3 pl-4 pr-5 font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-navy-800"
      >
        {chatOpen ? <X className="h-5 w-5" /> : <MessageSquareText className="h-5 w-5" />}
        <span className="text-sm">{chatOpen ? "Close" : "Ask our tech assistant"}</span>
      </button>
      <WhatsAppLink
        source="floating"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="sr-only">Chat with SPC on WhatsApp</span>
      </WhatsAppLink>
    </div>
  );
}
