"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Accessible modal built on the native <dialog> element. */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="modal-title"
      className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-xl bg-white p-0 text-steel-900 shadow-2xl backdrop:bg-navy-950/60"
    >
      <div className="flex items-center justify-between border-b border-steel-200 px-6 py-4">
        <h2 id="modal-title" className="text-lg font-semibold text-navy-900">
          {title}
        </h2>
        <button onClick={onClose} className="rounded p-1 text-steel-500 hover:bg-steel-100" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}
