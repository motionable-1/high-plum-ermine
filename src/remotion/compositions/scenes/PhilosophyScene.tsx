import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
} from "remotion";
import {
  FadeInChars,
  FadeInWords,
} from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: headingFont } = loadSpaceGrotesk();
const { fontFamily: bodyFont } = loadInter();

export const PhilosophyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zap icon entrance
  const zapScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 25,
  });
  const zapRotate = interpolate(Math.max(0, frame - 5), [0, 20], [-15, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.7)),
  });

  // Accent bar scale
  const barWidth = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 18, stiffness: 60 },
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: 80,
      }}
    >
      {/* Zap icon */}
      <div
        style={{
          transform: `scale(${zapScale}) rotate(${zapRotate}deg)`,
        }}
      >
        <Img
          src="https://api.iconify.design/lucide/zap.svg?color=%231A73E8&width=56"
          width={56}
          height={56}
        />
      </div>

      {/* Main headline */}
      <FadeInChars
        startFrom={12}
        stagger={0.025}
        duration={0.4}
        ease="power3.out"
        style={{
          fontFamily: headingFont,
          fontSize: 68,
          fontWeight: 800,
          color: "#141413",
          letterSpacing: "-0.04em",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Think fast, build faster
      </FadeInChars>

      {/* Accent bar */}
      <div
        style={{
          width: 80 * barWidth,
          height: 4,
          borderRadius: 2,
          background: "linear-gradient(90deg, #1A73E8, #4285F4)",
        }}
      />

      {/* Supporting text */}
      <FadeInWords
        startFrom={35}
        stagger={0.06}
        duration={0.5}
        ease="power2.out"
        style={{
          fontFamily: bodyFont,
          fontSize: 22,
          fontWeight: 400,
          color: "#141413",
          opacity: 0.55,
          textAlign: "center",
          maxWidth: 580,
          textWrap: "balance",
          lineHeight: 1.6,
        }}
      >
        Focus on what matters most — let Claude handle the complex analytical work
      </FadeInWords>

      {/* Floating accent shapes */}
      {[
        { x: "8%", y: "25%", size: 80, color: "rgba(26,115,232,0.06)", delay: 0 },
        { x: "85%", y: "20%", size: 60, color: "rgba(26,115,232,0.05)", delay: 0.5 },
        { x: "12%", y: "70%", size: 50, color: "rgba(20,20,19,0.03)", delay: 1 },
        { x: "80%", y: "72%", size: 70, color: "rgba(26,115,232,0.04)", delay: 0.3 },
      ].map((shape, i) => {
        const floatY = Math.sin((frame / fps + shape.delay) * 1.5) * 8;
        const floatScale = 0.95 + Math.sin((frame / fps + shape.delay) * 2) * 0.05;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: shape.color,
              transform: `translateY(${floatY}px) scale(${floatScale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
