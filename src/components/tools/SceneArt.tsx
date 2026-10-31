/** Simple illustrated backdrops for the system selector scenes. */
export function SceneArt({ scene }: { scene: string }) {
  const common = { viewBox: "0 0 100 60", className: "absolute inset-0 h-full w-full", preserveAspectRatio: "none" as const, "aria-hidden": true };
  switch (scene) {
    case "pipeline":
      return (
        <svg {...common}>
          <rect width="100" height="60" fill="#12304d" />
          <path d="M0 40 Q25 35 50 38 T100 34 V60 H0Z" fill="#3b2f22" />
          <rect x="0" y="50" width="100" height="5" fill="#6b7783" />
          <rect x="0" y="50" width="100" height="1.2" fill="#2e8b57" />
          {[20, 38, 56, 74, 92].map((x) => <rect key={x} x={x} y="49.5" width="2.5" height="6" fill="#f5a400" />)}
          <path d="M60 50 Q72 50 76 42 L80 38" stroke="#6b7783" strokeWidth="4" fill="none" />
          <path d="M5 58 Q15 66 30 58" stroke="#7cc79e" strokeWidth="2.5" fill="none" strokeDasharray="1.5 1" />
        </svg>
      );
    case "tank":
      return (
        <svg {...common}>
          <rect width="100" height="60" fill="#12304d" />
          <rect x="0" y="52" width="100" height="8" fill="#3d4852" />
          <rect x="22" y="22" width="46" height="30" fill="#6b7783" />
          <ellipse cx="45" cy="22" rx="23" ry="3" fill="#b4bcc4" />
          <rect x="24" y="44" width="42" height="7" fill="#2e8b57" opacity="0.7" />
          <rect x="70" y="46" width="22" height="8" fill="none" stroke="#7cc79e" strokeWidth="1" />
        </svg>
      );
    case "vessel":
      return (
        <svg {...common}>
          <rect width="100" height="60" fill="#12304d" />
          <rect y="38" width="100" height="22" fill="#1b4166" />
          <path d="M10 30 H90 L82 46 H18 Z" fill="#6b7783" />
          <path d="M14 38 H86 L82 46 H18 Z" fill="#a33" opacity="0.8" />
          <rect x="22" y="40" width="16" height="4" fill="#2e8b57" opacity="0.8" />
          <rect x="55" y="20" width="18" height="10" fill="#b4bcc4" />
          <rect x="10" y="28.5" width="80" height="1.5" fill="#f5a400" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect width="100" height="60" fill="#12304d" />
          <rect x="0" y="50" width="100" height="10" fill="#3d4852" />
          <rect x="12" y="30" width="30" height="20" fill="#6b7783" />
          <rect x="14" y="36" width="26" height="12" fill="#3b82f6" opacity="0.5" />
          <ellipse cx="72" cy="38" rx="14" ry="12" fill="#6b7783" />
          <path d="M58 38 A14 12 0 0 0 86 38" fill="#5b4a2f" opacity="0.7" />
        </svg>
      );
  }
}
