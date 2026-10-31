"use client";

import { useState } from "react";
import { track } from "./analytics";

export function useLeadSubmit() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(payload: Record<string, unknown>) {
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, page: window.location.pathname }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("done");
      track("generate_lead", { type: String(payload.type) });
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setState("error");
      return false;
    }
  }

  return { state, error, submit };
}
