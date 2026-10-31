import { ImageResponse } from "next/og";

export const alt = "SPC — 100% Solids. Zero VOCs. Protection that goes on thick and stays on.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b1f33", color: "white", padding: 72 }}>
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>SPC · Specialty Polymer Coatings</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>100% Solids. Zero VOCs.</div>
          <div style={{ fontSize: 44, color: "#7cc79e", marginTop: 16 }}>Protection that goes on thick — and stays on.</div>
        </div>
        <div style={{ display: "flex", height: 28 }}>
          <div style={{ flex: 1, background: "#6b7783" }} />
          <div style={{ flex: 2, background: "#2e8b57" }} />
          <div style={{ flex: 0.3, background: "#f5a400" }} />
        </div>
      </div>
    ),
    size,
  );
}
