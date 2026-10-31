"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Ctx = {
  chatOpen: boolean;
  openChat: (prefill?: string) => void;
  closeChat: () => void;
  chatPrefill: string | null;
  consumePrefill: () => string | null;
  expertOpen: boolean;
  openExpert: () => void;
  closeExpert: () => void;
  whatsappOpen: boolean;
  openWhatsapp: (context?: string) => void;
  closeWhatsapp: () => void;
  whatsappContext?: string;
};

const ExpertContext = createContext<Ctx | null>(null);

export function ExpertProvider({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState<string | null>(null);
  const [expertOpen, setExpertOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappContext, setWhatsappContext] = useState<string | undefined>();

  const openChat = useCallback((prefill?: string) => {
    setExpertOpen(false);
    setChatPrefill(prefill ?? null);
    setChatOpen(true);
  }, []);
  const consumePrefill = useCallback(() => {
    const p = chatPrefill;
    setChatPrefill(null);
    return p;
  }, [chatPrefill]);

  const value = useMemo<Ctx>(
    () => ({
      chatOpen,
      openChat,
      closeChat: () => setChatOpen(false),
      chatPrefill,
      consumePrefill,
      expertOpen,
      openExpert: () => setExpertOpen(true),
      closeExpert: () => setExpertOpen(false),
      whatsappOpen,
      openWhatsapp: (context?: string) => {
        setExpertOpen(false);
        setWhatsappContext(context);
        setWhatsappOpen(true);
      },
      closeWhatsapp: () => setWhatsappOpen(false),
      whatsappContext,
    }),
    [chatOpen, openChat, chatPrefill, consumePrefill, expertOpen, whatsappOpen, whatsappContext],
  );

  return <ExpertContext.Provider value={value}>{children}</ExpertContext.Provider>;
}

export function useExpert() {
  const ctx = useContext(ExpertContext);
  if (!ctx) throw new Error("useExpert must be used inside ExpertProvider");
  return ctx;
}
