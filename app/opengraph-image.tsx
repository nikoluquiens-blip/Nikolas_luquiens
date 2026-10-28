import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(37,99,235,0.35), transparent 50%), radial-gradient(circle at 10% 85%, rgba(147,51,234,0.25), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            marginBottom: 40,
          }}
        >
          Niko<span style={{ color: "#60a5fa" }}>.</span>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Nikolas Luquiens
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontWeight: 600,
            marginTop: 14,
          }}
        >
          <span style={{ color: "white", marginRight: 14 }}>Futur</span>
          <span style={{ color: "#d8b4fe" }}>médiamaticien</span>
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#9ca3af",
            marginTop: 32,
          }}
        >
          À la recherche d&apos;un contrat d&apos;apprentissage (CFC) pour la rentrée 2027
        </div>
      </div>
    ),
    { ...size }
  );
}
