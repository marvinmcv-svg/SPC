/**
 * The "mils and layers" brand motif: a stylised coating cross-section
 * (substrate → coating → environment).
 */
export function LayerMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 400" className={className} aria-hidden="true" preserveAspectRatio="xMaxYMax slice">
      <defs>
        <linearGradient id="steel" x1="0" x2="1">
          <stop offset="0" stopColor="#3d4852" />
          <stop offset="1" stopColor="#6b7783" />
        </linearGradient>
      </defs>
      <rect x="0" y="300" width="300" height="100" fill="url(#steel)" />
      <rect className="layer-build" style={{ animationDelay: "0.1s" }} x="0" y="240" width="300" height="60" fill="#1f6b42" />
      <rect className="layer-build" style={{ animationDelay: "0.4s" }} x="0" y="200" width="300" height="40" fill="#2e8b57" />
      <rect className="layer-build" style={{ animationDelay: "0.7s" }} x="0" y="185" width="300" height="15" fill="#f5a400" opacity="0.85" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="0" x2="300" y1={60 + i * 22} y2={60 + i * 22} stroke="#ffffff" strokeOpacity="0.06" />
      ))}
    </svg>
  );
}
