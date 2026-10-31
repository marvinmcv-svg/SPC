/**
 * Interim wordmark. Replace with the official SPC logo files (⚠️ VERIFY brand assets).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden="true">
        <rect width="36" height="36" rx="6" fill="#12304d" />
        <rect x="6" y="24" width="24" height="6" fill="#6b7783" />
        <rect x="6" y="17" width="24" height="7" fill="#2e8b57" />
        <rect x="6" y="13" width="24" height="4" fill="#7cc79e" />
        <rect x="6" y="11" width="24" height="2" fill="#f5a400" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-xl font-bold tracking-tight">SPC</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-steel-300">
          Specialty Polymer Coatings
        </span>
      </span>
    </span>
  );
}
