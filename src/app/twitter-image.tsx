import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DATE - Ancient Seed. Modern Resilience.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f5f5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            left: -100,
            bottom: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#3a1f87",
            opacity: 0.05,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -50,
            top: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "#d40055",
            opacity: 0.05,
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            color: "#000000",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}
        >
          DATE
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#3a1f87",
            letterSpacing: "0.2em",
            marginBottom: 40,
          }}
        >
          ANCIENT SEED. MODERN RESILIENCE.
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 200,
            height: 3,
            background: "#d40055",
            marginBottom: 40,
          }}
        />

        {/* Benefits */}
        <div
          style={{
            fontSize: 22,
            color: "#666666",
            display: "flex",
            gap: 30,
          }}
        >
          <span>Zero Caffeine</span>
          <span>•</span>
          <span>Zero Sugar</span>
          <span>•</span>
          <span>Prebiotic Fiber</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
