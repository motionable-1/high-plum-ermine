import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import {
  FadeInWords,
  BlurReveal,
} from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: headingFont } = loadSpaceGrotesk();
const { fontFamily: bodyFont } = loadInter();

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 30,
  });
  const logoRotation = interpolate(Math.max(0, frame - 3), [0, 30], [-90, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Button pulse
  const btnScale = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 25,
  });
  const btnGlow = 8 + Math.sin((frame / fps) * 3) * 4;

  // URL text
  const urlOpacity = interpolate(frame - 62, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const urlY = interpolate(frame - 62, [0, 15], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
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
      {/* Logo mark */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D97757 0%, #E8956E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          boxShadow: "0 8px 32px rgba(217,119,87,0.3)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Headline */}
      <FadeInWords
        startFrom={15}
        stagger={0.08}
        duration={0.5}
        ease="power3.out"
        style={{
          fontFamily: headingFont,
          fontSize: 52,
          fontWeight: 700,
          color: "#141413",
          letterSpacing: "-0.03em",
          textAlign: "center",
          textWrap: "balance",
          lineHeight: 1.15,
        }}
      >
        Start building with Claude
      </FadeInWords>

      {/* Subtitle */}
      <BlurReveal
        startFrom={30}
        stagger={0.025}
        duration={0.5}
        style={{
          fontFamily: bodyFont,
          fontSize: 20,
          fontWeight: 400,
          color: "#141413",
          opacity: 0.5,
          textAlign: "center",
          maxWidth: 480,
          textWrap: "balance",
          lineHeight: 1.5,
        }}
      >
        Your AI partner for complex challenges
      </BlurReveal>

      {/* CTA Button */}
      {frame >= 50 && (
        <div
          style={{
            marginTop: 8,
            padding: "16px 40px",
            borderRadius: 14,
            background: "#141413",
            transform: `scale(${btnScale})`,
            boxShadow: `0 4px ${btnGlow}px rgba(20,20,19,0.2)`,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 18,
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.01em",
            }}
          >
            Try Claude Free
          </span>
        </div>
      )}

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          marginTop: 4,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            fontWeight: 500,
            color: "#1A73E8",
            letterSpacing: "0.02em",
          }}
        >
          claude.ai
        </span>
      </div>

      {/* Floating decorative elements */}
      {[
        { x: "10%", y: "18%", size: 10, delay: 0 },
        { x: "88%", y: "22%", size: 8, delay: 0.4 },
        { x: "6%", y: "75%", size: 12, delay: 0.8 },
        { x: "92%", y: "70%", size: 9, delay: 0.6 },
        { x: "20%", y: "85%", size: 7, delay: 1.2 },
        { x: "78%", y: "82%", size: 11, delay: 0.2 },
      ].map((dot, i) => {
        const dotOpacity = 0.08 + Math.sin((frame / fps + dot.delay) * 2.5) * 0.06;
        const dotY = Math.sin((frame / fps + dot.delay) * 1.8) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: "#1A73E8",
              opacity: dotOpacity,
              transform: `translateY(${dotY}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
