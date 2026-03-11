import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * Persistent animated background for the entire video.
 * Warm cream base with floating gradient orbs and subtle grid.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Floating orb positions
  const orb1X = 25 + Math.sin(time * 0.3) * 8;
  const orb1Y = 30 + Math.cos(time * 0.25) * 6;
  const orb2X = 70 + Math.cos(time * 0.2) * 10;
  const orb2Y = 65 + Math.sin(time * 0.35) * 8;
  const orb3X = 50 + Math.sin(time * 0.15 + 1) * 12;
  const orb3Y = 20 + Math.cos(time * 0.28 + 2) * 5;

  return (
    <AbsoluteFill style={{ backgroundColor: "#FAF9F5" }}>
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at ${orb1X}% ${orb1Y}%, rgba(26,115,232,0.12), transparent 45%),
            radial-gradient(circle at ${orb2X}% ${orb2Y}%, rgba(26,115,232,0.08), transparent 50%),
            radial-gradient(circle at ${orb3X}% ${orb3Y}%, rgba(20,20,19,0.04), transparent 40%)
          `,
        }}
      />
      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(20,20,19,0.06) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: interpolate(frame, [0, 30], [0, 0.5], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      />
      {/* Edge vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(20,20,19,0.04) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
