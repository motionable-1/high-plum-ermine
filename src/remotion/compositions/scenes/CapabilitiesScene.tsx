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
} from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: headingFont } = loadSpaceGrotesk();
const { fontFamily: bodyFont } = loadInter();

const CAPABILITIES = [
  {
    icon: "https://api.iconify.design/lucide/message-square.svg?color=%231A73E8&width=36",
    title: "Intelligent Conversation",
    desc: "Reason through complex problems with natural dialogue",
    delay: 15,
  },
  {
    icon: "https://api.iconify.design/lucide/bar-chart-3.svg?color=%231A73E8&width=36",
    title: "Analyze Data",
    desc: "Extract insights from reports, spreadsheets and documents",
    delay: 25,
  },
  {
    icon: "https://api.iconify.design/lucide/code.svg?color=%231A73E8&width=36",
    title: "Write Code",
    desc: "Build applications, debug issues, and automate workflows",
    delay: 35,
  },
];

const CapabilityCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay: number;
  index: number;
}> = ({ icon, title, desc, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardFrame = Math.max(0, frame - delay);
  const cardScale = spring({
    frame: cardFrame,
    fps,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 30,
  });
  const cardY = interpolate(cardFrame, [0, 20], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardOpacity = interpolate(cardFrame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const iconBounce = spring({
    frame: Math.max(0, cardFrame - 5),
    fps,
    config: { damping: 10, stiffness: 120 },
    durationInFrames: 25,
  });

  const glowIntensity = 4 + Math.sin(((frame + index * 20) / fps) * 2) * 2;

  return (
    <div
      style={{
        width: 300,
        padding: 32,
        borderRadius: 20,
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(26,115,232,0.1)",
        boxShadow: `0 4px ${glowIntensity}px rgba(26,115,232,0.08), 0 1px 3px rgba(0,0,0,0.04)`,
        transform: `scale(${cardScale}) translateY(${cardY}px)`,
        opacity: cardOpacity,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "rgba(26,115,232,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${iconBounce})`,
        }}
      >
        <Img src={icon} width={36} height={36} />
      </div>
      <span
        style={{
          fontFamily: headingFont,
          fontSize: 20,
          fontWeight: 600,
          color: "#141413",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 15,
          fontWeight: 400,
          color: "#141413",
          opacity: 0.55,
          lineHeight: 1.5,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

export const CapabilitiesScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        padding: 60,
      }}
    >
      <FadeInWords
        startFrom={0}
        stagger={0.06}
        duration={0.5}
        ease="power3.out"
        style={{
          fontFamily: headingFont,
          fontSize: 44,
          fontWeight: 700,
          color: "#141413",
          letterSpacing: "-0.03em",
          textAlign: "center",
          textWrap: "balance",
        }}
      >
        Your versatile AI partner
      </FadeInWords>
      <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
        {CAPABILITIES.map((cap, i) => (
          <CapabilityCard key={i} {...cap} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
