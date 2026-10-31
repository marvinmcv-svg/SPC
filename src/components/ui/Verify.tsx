import { cn } from "./cn";

/**
 * Marks content that is a placeholder from the master plan's ⚠️ VERIFY list.
 * Set NEXT_PUBLIC_HIDE_VERIFY=1 to hide the markers (e.g. for screenshots),
 * but placeholder values should be replaced, not hidden, before launch.
 */
export function Verify({ note, className }: { note?: string; className?: string }) {
  if (process.env.NEXT_PUBLIC_HIDE_VERIFY === "1") return null;
  return (
    <span
      title={note ?? "Placeholder — to be confirmed by SPC before launch"}
      className={cn(
        "ml-1.5 inline-flex items-center rounded border border-dashed border-amber-cta/70 bg-amber-cta/10 px-1.5 py-0.5 align-middle font-mono text-[10px] font-medium uppercase tracking-wider text-amber-700",
        className,
      )}
    >
      To confirm
    </span>
  );
}
