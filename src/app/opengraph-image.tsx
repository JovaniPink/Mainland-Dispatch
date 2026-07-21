import { ImageResponse } from "next/og";

export const alt = "Mainland Dispatch — every source gets context";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f3f0e8",
        color: "#191b18",
        padding: "72px 84px",
        borderLeft: "14px solid #bd382d",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span style={{ color: "#486e64", letterSpacing: "0.12em" }}>
          VOL. 001
        </span>
        <span style={{ color: "#62655f" }}>
          CHINA · UNITED STATES · CULTURE
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <span style={{ fontSize: 84, lineHeight: 0.95 }}>
          MAINLAND DISPATCH
        </span>
        <span style={{ fontSize: 34, fontStyle: "italic", color: "#62655f" }}>
          Every source gets context. Every developing story keeps its history.
        </span>
      </div>
      <div style={{ height: 3, width: 260, background: "#bd382d" }} />
    </div>,
    size
  );
}
