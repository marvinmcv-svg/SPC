"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, ImagePlus, Loader2, Send, UserRound, X, FileText } from "lucide-react";
import { useExpert } from "@/components/layout/ExpertProvider";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/components/ui/cn";

type Citation = { id: string; title: string; url: string | null; href: string };
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  image?: string;
  citations?: Citation[];
  status?: string;
};

const SUGGESTIONS = [
  "What coating should I use for girth welds?",
  "How thick can SP-2888 RG go in one coat?",
  "Is there a distributor in Australia?",
  "Why choose 100% solids over solvent-borne?",
];

/** Downscale an image file to a JPEG data URL (max 1280px) before upload. */
async function toDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

export function ChatWidget() {
  const { chatOpen, closeChat, consumePrefill, chatPrefill } = useExpert();
  const pathname = usePathname();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatOpen) {
      track("chat_open", { page: pathname });
      const p = consumePrefill();
      if (p) setInput(p);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen, chatPrefill]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeChat();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen, closeChat]);

  async function send(text: string) {
    const content = text.trim();
    if ((!content && !image) || busy) return;
    const userMsg: ChatMessage = { role: "user", content: content || "Please look at this photo.", image: image ?? undefined };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "", status: "Thinking…" }]);
    setInput("");
    setImage(null);
    setBusy(true);
    track("chat_message", { page: pathname, has_image: Boolean(userMsg.image) });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: pathname,
          messages: history.map((m) => ({ role: m.role, content: m.content, image: m.image })),
        }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let citations: Citation[] = [];
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const evt = JSON.parse(line) as
            | { type: "text"; text: string }
            | { type: "status"; text: string }
            | { type: "citations"; docs: Citation[] }
            | { type: "error"; text: string };
          if (evt.type === "text") acc += evt.text;
          if (evt.type === "error") acc += (acc ? "\n\n" : "") + evt.text;
          if (evt.type === "citations") citations = mergeCitations(citations, evt.docs);
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: acc,
              citations,
              status: evt.type === "status" ? evt.text : undefined,
            };
            return next;
          });
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: `Sorry — I couldn't connect just now. Please call us on ${site.phone.display} or use WhatsApp.`,
        };
        return next;
      });
    } finally {
      setBusy(false);
    }
  }

  if (!chatOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="SPC Tech Assistant"
      className="fixed inset-0 z-[60] flex flex-col bg-white shadow-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-xl sm:border sm:border-steel-200"
    >
      <header className="flex items-center justify-between rounded-t-xl bg-navy-900 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spc-green-500">
            <Bot className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="font-semibold leading-tight">SPC Tech Assistant</p>
            <p className="text-xs text-steel-300">AI · answers from SPC documents · 24/7</p>
          </div>
        </div>
        <button onClick={closeChat} aria-label="Close chat" className="rounded p-1 hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-steel-700">
              Hi! I can answer technical questions from SPC&apos;s data sheets, suggest a coating system, find your local
              partner or connect you with our team. Ask in any language.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-steel-300 px-3 py-1.5 text-left text-xs text-navy-900 hover:border-navy-600 hover:bg-steel-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-2", m.role === "user" && "flex-row-reverse")}>
            <span
              className={cn(
                "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                m.role === "user" ? "bg-steel-200 text-navy-900" : "bg-spc-green-100 text-spc-green-700",
              )}
              aria-hidden
            >
              {m.role === "user" ? <UserRound className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </span>
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                m.role === "user" ? "bg-navy-900 text-white" : "bg-steel-100 text-steel-900",
              )}
            >
              {m.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.image} alt="Uploaded photo" className="mb-2 max-h-40 rounded" />
              )}
              {m.content ? (
                <p className="whitespace-pre-wrap">{m.content}</p>
              ) : (
                <p className="flex items-center gap-2 text-steel-500">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {m.status ?? "Thinking…"}
                </p>
              )}
              {m.content && m.status && <p className="mt-1 text-xs text-steel-500">{m.status}</p>}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-2 border-t border-steel-300 pt-2">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-steel-500">Sources</p>
                  <ul className="space-y-1">
                    {m.citations.map((c) => (
                      <li key={c.id}>
                        <a href={c.url ?? c.href} className="flex items-center gap-1 text-xs text-navy-700 underline">
                          <FileText className="h-3 w-3" aria-hidden /> {c.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-steel-200 px-3 pb-3 pt-2">
        <div className="mb-2 flex items-center gap-3 text-xs">
          <WhatsAppLink context={`the SPC website (${pathname})`} source="chat" className="flex items-center gap-1 text-spc-green-700 hover:underline">
            <WhatsAppIcon className="h-3.5 w-3.5" /> Continue on WhatsApp
          </WhatsAppLink>
          <button onClick={() => send("I'd like to talk to a person, please.")} className="text-navy-700 hover:underline">
            Talk to a person
          </button>
        </div>
        {image && (
          <div className="mb-2 flex items-center gap-2 text-xs text-steel-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Selected photo" className="h-10 w-10 rounded object-cover" />
            Photo attached
            <button onClick={() => setImage(null)} className="text-steel-500 underline">
              remove
            </button>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) setImage(await toDataUrl(f));
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Attach a photo of a coating defect"
            className="rounded-md p-2 text-steel-500 hover:bg-steel-100"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
          <label htmlFor="chat-input" className="sr-only">
            Your message
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask a technical question…"
            className="max-h-32 flex-1 resize-none rounded-md border border-steel-300 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || (!input.trim() && !image)}
            aria-label="Send"
            className="rounded-md bg-amber-cta p-2 text-navy-950 hover:bg-amber-cta-hover disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
        <p className="mt-2 text-[10px] leading-snug text-steel-500">
          AI answers can be wrong. Always check the current PDS/SDS. We only store contact details you agree to share.{" "}
          <a href="/privacy" className="underline">
            Privacy
          </a>
        </p>
      </div>
    </div>
  );
}

function mergeCitations(a: Citation[], b: Citation[]) {
  const seen = new Set(a.map((c) => c.id));
  return [...a, ...b.filter((c) => !seen.has(c.id))];
}
