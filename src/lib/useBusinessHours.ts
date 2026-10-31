"use client";

import { useEffect, useState } from "react";
import { isWithinBusinessHours } from "./whatsapp";

/** Client-only business-hours check (null during SSR to avoid hydration mismatch). */
export function useBusinessHours(): boolean | null {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    setOpen(isWithinBusinessHours());
    const t = setInterval(() => setOpen(isWithinBusinessHours()), 60_000);
    return () => clearInterval(t);
  }, []);
  return open;
}
