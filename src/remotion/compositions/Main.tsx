import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Artifact,
  Audio,
  interpolate,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { morph } from "../library/components/layout/transitions/presentations/morph";

import { Background } from "./scenes/Background";
import { HeroScene } from "./scenes/HeroScene";
import { CapabilitiesScene } from "./scenes/CapabilitiesScene";
import { CoworkScene } from "./scenes/CoworkScene";
import { PhilosophyScene } from "./scenes/PhilosophyScene";
import { CTAScene } from "./scenes/CTAScene";

// Audio URLs
const MUSIC_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1773245003530_jbclzne545i_music_Modern_clean_corpora.mp3";
const WHOOSH_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773244937343_hmsazgj6f09_sfx_subtle_modern_tech_whoosh_tran.mp3";
const CHIME_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773244949403_1fz95a0iacd_sfx_soft_digital_notification_chim.mp3";

/*
  SCENE TIMELINE (30fps):
  ────────────────────────────
  Scene 1 - Hero:         0–150  (5s)
  Transition:             20 frames overlap
  Scene 2 - Capabilities: ~130–300 (5.7s)
  Transition:             20 frames overlap
  Scene 3 - Cowork:       ~280–450 (5.7s)
  Transition:             20 frames overlap
  Scene 4 - Philosophy:   ~430–570 (4.7s)
  Transition:             20 frames overlap
  Scene 5 - CTA:          ~550–720 (5.7s)

  Total = 150+170+170+140+170 - 4*20 = 800 - 80 = 720 frames
  Plus ~30 frames breathing room at end = 750 frames = 25s
*/

const SCENE_DURATIONS = {
  hero: 150,
  capabilities: 170,
  cowork: 170,
  philosophy: 140,
  cta: 170,
};
const TRANSITION_DURATION = 20;
export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Persistent animated background */}
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>

      {/* Scene transitions */}
      <AbsoluteFill>
        <TransitionSeries>
          {/* Scene 1: Hero */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hero}>
            <HeroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Capabilities */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.capabilities}>
            <CapabilitiesScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={morph({ shape: "rounded", contract: 20, blur: 8 })}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Cowork */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cowork}>
            <CoworkScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Philosophy */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.philosophy}>
            <PhilosophyScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={morph({ shape: "rounded", contract: 15, blur: 6 })}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: CTA */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>

      {/* Background Music */}
      <Audio
        src={MUSIC_URL}
        volume={(f) => {
          // Fade in over 1s, steady, fade out over 2s at end
          const fadeIn = interpolate(f, [0, fps], [0, 0.2], {
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(
            f,
            [durationInFrames - 2 * fps, durationInFrames],
            [0.2, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return Math.min(fadeIn, fadeOut);
        }}
      />

      {/* Transition SFX */}
      <Sequence from={SCENE_DURATIONS.hero - TRANSITION_DURATION / 2}>
        <Audio src={WHOOSH_URL} volume={0.15} />
      </Sequence>
      <Sequence
        from={
          SCENE_DURATIONS.hero +
          SCENE_DURATIONS.capabilities -
          TRANSITION_DURATION -
          TRANSITION_DURATION / 2
        }
      >
        <Audio src={CHIME_URL} volume={0.12} />
      </Sequence>
      <Sequence
        from={
          SCENE_DURATIONS.hero +
          SCENE_DURATIONS.capabilities +
          SCENE_DURATIONS.cowork -
          2 * TRANSITION_DURATION -
          TRANSITION_DURATION / 2
        }
      >
        <Audio src={WHOOSH_URL} volume={0.13} />
      </Sequence>
      <Sequence
        from={
          SCENE_DURATIONS.hero +
          SCENE_DURATIONS.capabilities +
          SCENE_DURATIONS.cowork +
          SCENE_DURATIONS.philosophy -
          3 * TRANSITION_DURATION -
          TRANSITION_DURATION / 2
        }
      >
        <Audio src={CHIME_URL} volume={0.1} />
      </Sequence>
    </>
  );
};
