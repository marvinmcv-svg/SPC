"use client";

import { useExpert } from "@/components/layout/ExpertProvider";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

function isMobile() {
  return typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/**
 * Inline "Chat on WhatsApp" trigger. Mobile opens the app directly via wa.me;
 * desktop opens the QR modal.
 */
export function WhatsAppLink({
  context,
  className,
  children,
  source = "inline",
}: {
  context?: string;
  className?: string;
  children: React.ReactNode;
  source?: string;
}) {
  const { openWhatsapp } = useExpert();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        // Default context is the current page title, read at click time.
        const ctx = context ?? document.title.split(" | ")[0];
        const link = buildWhatsappLink(ctx);
        track("whatsapp_click", { source, context: ctx });
        if (link && isMobile()) {
          window.location.href = link;
        } else {
          openWhatsapp(ctx);
        }
      }}
    >
      {children}
    </button>
  );
}
