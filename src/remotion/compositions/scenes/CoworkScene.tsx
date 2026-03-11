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
  FadeInWords,
  BlurReveal,
} from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: headingFont } = loadSpaceGrotesk();
const { fontFamily: bodyFont } = loadInter();

const STEPS = [
  { icon: "https://api.iconify.design/lucide/file-text.svg?color=%23ffffff&width=24", label: "Process transcripts" },
  { icon: "https://api.iconify.design/lucide/sparkles.svg?color=%23ffffff&width=24", label: "Extract key insights" },
  { icon: "https://api.iconify.design/lucide/presentation.svg?color=%23ffffff&width=24", label: "Build presentations" },
];

const StepPill: React.FC<{
  icon: string;
  label: string;
  index: number;
  startFrame: number;
}> = ({ icon, label, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillFrame = Math.max(0, frame - startFrame - index * 12);
  const scale = spring({
    frame: pillFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 25,
  });
  const opacity = interpolate(pillFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Connector line progress
  const connectorProgress = index < STEPS.length - 1
    ? interpolate(Math.max(0, pillFrame - 10), [0, 15], [0, 1], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    : 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 24px",
          borderRadius: 16,
          background: "#1A73E8",
          transform: `scale(${scale})`,
          opacity,
          boxShadow: "0 4px 20px rgba(26,115,232,0.25)",
        }}
      >
        <Img src={icon} width={24} height={24} />
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            fontWeight: 500,
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
      {index < STEPS.length - 1 && (
        <div
          style={{
            width: 40,
            height: 2,
            background: "rgba(26,115,232,0.3)",
            overflow: "hidden",
            borderRadius: 1,
          }}
        >
          <div
            style={{
              width: `${connectorProgress * 100}%`,
              height: "100%",
              background: "#1A73E8",
              borderRadius: 1,
            }}
          />
        </div>
      )}
    </div>
  );
};

export const CoworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Cowork" badge entrance
  const badgeScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 90 },
    durationInFrames: 25,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        padding: 60,
      }}
    >
      {/* Cowork badge */}
      <div
        style={{
          padding: "8px 20px",
          borderRadius: 100,
          background: "linear-gradient(135deg, #1A73E8, #4285F4)",
          transform: `scale(${badgeScale})`,
          boxShadow: "0 4px 16px rgba(26,115,232,0.3)",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 14,
            fontWeight: 600,
            color: "white",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          New Feature
        </span>
      </div>

      {/* Title */}
      <FadeInWords
        startFrom={12}
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
        }}
      >
        Meet Cowork
      </FadeInWords>

      {/* Subtitle */}
      <BlurReveal
        startFrom={24}
        stagger={0.025}
        duration={0.5}
        style={{
          fontFamily: bodyFont,
          fontSize: 20,
          fontWeight: 400,
          color: "#141413",
          opacity: 0.55,
          textAlign: "center",
          maxWidth: 550,
          textWrap: "balance",
          lineHeight: 1.5,
        }}
      >
        Automate multi-step workflows — from meeting transcripts to polished deliverables
      </BlurReveal>

      {/* Workflow steps */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          marginTop: 16,
        }}
      >
        {STEPS.map((step, i) => (
          <StepPill
            key={i}
            icon={step.icon}
            label={step.label}
            index={i}
            startFrame={38}
          />
        ))}
      </div>

      {/* Floating sparkle decorations */}
      {[
        { x: 120, y: 180, size: 20, delay: 0.3 },
        { x: 1100, y: 220, size: 16, delay: 0.7 },
        { x: 200, y: 550, size: 14, delay: 1.1 },
        { x: 1000, y: 500, size: 18, delay: 0.5 },
      ].map((spark, i) => {
        const sparkOpacity = 0.15 + Math.sin((frame / fps + spark.delay) * 3) * 0.1;
        const sparkScale = 0.9 + Math.sin((frame / fps + spark.delay) * 2.5) * 0.1;
        return (
          <Img
            key={i}
            src="https://api.iconify.design/lucide/sparkles.svg?color=%231A73E8&width=24"
            style={{
              position: "absolute",
              left: spark.x,
              top: spark.y,
              width: spark.size,
              height: spark.size,
              opacity: sparkOpacity,
              transform: `scale(${sparkScale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
