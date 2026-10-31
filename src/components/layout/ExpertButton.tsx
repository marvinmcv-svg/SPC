"use client";

import { useExpert } from "./ExpertProvider";
import { buttonClasses } from "@/components/ui/Button";

type Props = {
  className?: string;
  children?: React.ReactNode;
  variant?: Parameters<typeof buttonClasses>[0];
  size?: Parameters<typeof buttonClasses>[1];
  /** "chat" opens the AI assistant directly, optionally prefilled. */
  mode?: "expert" | "chat";
  prefill?: string;
};

export function ExpertButton({ className, children, variant = "primary", size = "md", mode = "expert", prefill }: Props) {
  const { openExpert, openChat } = useExpert();
  return (
    <button
      type="button"
      className={buttonClasses(variant, size, className)}
      onClick={() => (mode === "chat" ? openChat(prefill) : openExpert())}
    >
      {children ?? "Talk to an expert"}
    </button>
  );
}
