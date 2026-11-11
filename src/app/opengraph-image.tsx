import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#FAF5F2",
          borderLeft: "24px solid #B45309",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, color: "#292524", lineHeight: 1.1, display: "flex" }}>
          {site.name}
        </div>
        <div style={{ width: 120, height: 8, background: "#D97706", margin: "40px 0", display: "flex" }} />
        <div style={{ fontSize: 40, color: "#57534E", display: "flex" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
