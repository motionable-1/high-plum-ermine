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

// Claude sparkle SVG logo mark (the asterisk/star shape)
const ClaudeLogo: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, durationInFrames: 40 });
  const logoRotation = interpolate(frame, [0, 40], [-90, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #D97757 0%, #E8956E 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
        boxShadow: "0 8px 32px rgba(217,119,87,0.3)",
      }}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance timing
  const logoDelay = 5;
  const titleDelay = 18;
  const subtitleDelay = 32;
  const taglineDelay = 44;

  // Anthropic wordmark fade
  const wordmarkOpacity = interpolate(frame - logoDelay - 8, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const wordmarkY = interpolate(frame - logoDelay - 8, [0, 15], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Decorative line
  const lineWidth = spring({
    frame: frame - 12,
    fps,
    config: { damping: 20, stiffness: 60 },
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Logo + Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <ClaudeLogo frame={Math.max(0, frame - logoDelay)} fps={fps} />
          <div
            style={{
              opacity: wordmarkOpacity,
              transform: `translateY(${wordmarkY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: headingFont,
                fontSize: 48,
                fontWeight: 700,
                color: "#141413",
                letterSpacing: "-0.02em",
              }}
            >
              Claude
            </span>
          </div>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 120 * lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #1A73E8, transparent)",
            borderRadius: 1,
          }}
        />

        {/* Title */}
        <FadeInWords
          startFrom={titleDelay}
          stagger={0.08}
          duration={0.5}
          ease="power3.out"
          style={{
            fontFamily: headingFont,
            fontSize: 62,
            fontWeight: 700,
            color: "#141413",
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            maxWidth: 900,
            textWrap: "balance",
          }}
        >
          Built for problem solvers
        </FadeInWords>

        {/* Subtitle */}
        <BlurReveal
          startFrom={subtitleDelay}
          stagger={0.03}
          duration={0.6}
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 400,
            color: "#141413",
            opacity: 0.6,
            textAlign: "center",
            maxWidth: 600,
            textWrap: "balance",
            lineHeight: 1.5,
          }}
        >
          Tackle complex challenges through intelligent conversation
        </BlurReveal>

        {/* Tagline pill */}
        {frame >= taglineDelay && (
          <div
            style={{
              marginTop: 8,
              padding: "10px 24px",
              borderRadius: 100,
              background: "rgba(26,115,232,0.08)",
              border: "1px solid rgba(26,115,232,0.15)",
              transform: `scale(${spring({
                frame: frame - taglineDelay,
                fps,
                config: { damping: 14, stiffness: 100 },
                durationInFrames: 25,
              })})`,
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
              Anthropic&apos;s AI Assistant
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
