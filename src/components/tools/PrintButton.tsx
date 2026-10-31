"use client";

import { Printer } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

/** Browser print → "Save as PDF". A server-rendered React-PDF export can replace this later. */
export function PrintButton({ label = "Print / PDF" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClasses("ghost", "md", "print:hidden")}>
      <Printer className="h-4 w-4" aria-hidden /> {label}
    </button>
  );
}
