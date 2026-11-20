import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.wordmark} — Strategic Communications`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f8f5ef",
          color: "#191816",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #191816",
            paddingBottom: 24,
            fontSize: 40,
          }}
        >
          <div style={{ display: "flex" }}>
            {site.wordmark}
            <span style={{ color: "#a33a1f" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              color: "#736f66",
            }}
          >
            Strategic Communications
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 104, lineHeight: 1.02, letterSpacing: -3 }}>
          Make Your Brand Impossible to Ignore.
        </div>
        <div style={{ display: "flex", fontSize: 26, fontFamily: "sans-serif", color: "#55524b" }}>
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
