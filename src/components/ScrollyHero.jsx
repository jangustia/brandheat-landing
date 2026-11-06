import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import WordByWordHeading from './WordByWordHeading';
import BottomGlow from './BottomGlow';
import DotsTexture from './DotsTexture';
import MouseScrollIndicator from './MouseScrollIndicator';
import './ScrollyHero.css';

/**
 * ScrollyHero Component
 * Pinned viewport scrollytelling experience:
 * Stage 1: Initial headline with word-by-word blur reveal: "¿Cuánto tarda tu marca..."
 * Stage 2: "Una conversación que prendió escala en horas."
 * Stage 3: "Una campaña tarda semanas."
 * Stage 4: "Ese gap es cada vez más grande. Y más caro."
 * Stage 5: "Meet brandheat." with heat.png gliding from left to right revealing the text
 */
export default function ScrollyHero({ currentLang = 'es' }) {
  const containerRef = useRef(null);

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth responsive spring for organic scroll scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Stage 1 Transitions (0% - 18% of scroll)
  const s1Opacity = useTransform(smoothProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const s1Blur = useTransform(smoothProgress, [0, 0.12, 0.18], [0, 0, 16]);
  const s1Y = useTransform(smoothProgress, [0, 0.12, 0.18], [0, 0, -35]);
  const s1Filter = useTransform(s1Blur, (b) => `blur(${b}px)`);

  // Stage 2 Transitions (18% - 38% of scroll)
  const s2Opacity = useTransform(smoothProgress, [0.17, 0.23, 0.33, 0.38], [0, 1, 1, 0]);
  const s2Blur = useTransform(smoothProgress, [0.17, 0.23, 0.33, 0.38], [14, 0, 0, 14]);
  const s2Y = useTransform(smoothProgress, [0.17, 0.23, 0.33, 0.38], [35, 0, 0, -35]);
  const s2Filter = useTransform(s2Blur, (b) => `blur(${b}px)`);

  // Stage 3 Transitions (38% - 58% of scroll)
  const s3Opacity = useTransform(smoothProgress, [0.37, 0.43, 0.53, 0.58], [0, 1, 1, 0]);
  const s3Blur = useTransform(smoothProgress, [0.37, 0.43, 0.53, 0.58], [14, 0, 0, 14]);
  const s3Y = useTransform(smoothProgress, [0.37, 0.43, 0.53, 0.58], [35, 0, 0, -35]);
  const s3Filter = useTransform(s3Blur, (b) => `blur(${b}px)`);

  // Stage 4 Transitions (58% - 76% of scroll)
  const s4Opacity = useTransform(smoothProgress, [0.57, 0.63, 0.72, 0.76], [0, 1, 1, 0]);
  const s4Blur = useTransform(smoothProgress, [0.57, 0.63, 0.72, 0.76], [14, 0, 0, 14]);
  const s4Y = useTransform(smoothProgress, [0.57, 0.63, 0.72, 0.76], [35, 0, 0, -35]);
  const s4Filter = useTransform(s4Blur, (b) => `blur(${b}px)`);

  // Stage 5 Transitions (76% - 100% of scroll)
  const s5Opacity = useTransform(smoothProgress, [0.75, 0.80, 1.0], [0, 1, 1]);
  const s5Scale = useTransform(smoothProgress, [0.75, 0.83, 1.0], [0.95, 1, 1]);

  // Heat.png flight from left to right bound directly to scroll scrubbing
  const flameX = useTransform(smoothProgress, [0.79, 0.96], ['-20%', '102%']);
  const flameOpacity = useTransform(smoothProgress, [0.76, 0.80, 0.98, 1.0], [0, 1, 1, 0.75]);

  // Reveal clip-path percentage for "Meet brandheat."
  const textRevealPercent = useTransform(smoothProgress, [0.80, 0.96], [0, 100]);
  const textClipPath = useTransform(
    textRevealPercent,
    (val) => `inset(0 ${Math.max(0, 100 - val)}% 0 0)`
  );

  const indicatorOpacity = useTransform(smoothProgress, [0, 0.82, 0.94], [1, 1, 0.25]);

  const isEs = currentLang === 'es';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520vh] bg-[#060709]"
      id="hero-track"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden px-4 sm:px-6 pt-24 pb-8">
        {/* Layer 1: Ambient Bottom Wave & Glow (Continuous pulse & undulating wave) */}
        <BottomGlow />

        {/* Layer 2: High Density Dotted Texture Overlay (7px x 7px) */}
        <DotsTexture />

        {/* Top Spacer */}
        <div className="w-full h-8" />

        {/* Layer 3: Narrative Center Stage */}
        <div className="relative z-20 my-auto w-full max-w-5xl mx-auto flex items-center justify-center min-h-[360px] select-none">
          {/* ========================================================
              STAGE 1: Initial Headline with Word-by-Word Blur Reveal
             ======================================================== */}
          <motion.div
            style={{
              opacity: s1Opacity,
              y: s1Y,
              filter: s1Filter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <WordByWordHeading lang={currentLang} />
          </motion.div>

          {/* ========================================================
              STAGE 2: Una conversación que prendió escala en horas.
             ======================================================== */}
          <motion.div
            style={{
              opacity: s2Opacity,
              y: s2Y,
              filter: s2Filter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.24] md:leading-[1.18] tracking-[-0.025em] text-white">
              <span className="block my-0.5 sm:my-1">
                <span className="font-light text-white/95">
                  {isEs ? 'Una ' : 'A '}
                </span>
                <span className="font-bold text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.25)]">
                  {isEs ? 'conversación' : 'conversation'}
                </span>
                <span className="font-light text-white/95">
                  {isEs ? ' que prendió' : ' that caught fire'}
                </span>
              </span>
              <span className="block my-0.5 sm:my-1 font-light text-white/95">
                {isEs ? 'escala en horas.' : 'escalates in hours.'}
              </span>
            </h2>
          </motion.div>

          {/* ========================================================
              STAGE 3: Una campaña tarda semanas.
             ======================================================== */}
          <motion.div
            style={{
              opacity: s3Opacity,
              y: s3Y,
              filter: s3Filter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.24] md:leading-[1.18] tracking-[-0.025em] font-light text-white/95">
              {isEs ? 'Una campaña tarda semanas.' : 'A campaign takes weeks.'}
            </h2>
          </motion.div>

          {/* ========================================================
              STAGE 4: Ese gap es cada vez más grande. Y más caro.
             ======================================================== */}
          <motion.div
            style={{
              opacity: s4Opacity,
              y: s4Y,
              filter: s4Filter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.24] md:leading-[1.18] tracking-[-0.025em] font-light text-white/95">
              <span className="block my-0.5 sm:my-1">
                {isEs ? 'Ese gap es cada vez más grande.' : 'That gap is getting bigger.'}
              </span>
              <span className="block my-0.5 sm:my-1">
                {isEs ? 'Y más caro.' : 'And more expensive.'}
              </span>
            </h2>
          </motion.div>

          {/* ========================================================
              STAGE 5: Meet brandheat. WITH HEAT.PNG SCROLL REVEAL
             ======================================================== */}
          <motion.div
            style={{
              opacity: s5Opacity,
              scale: s5Scale,
              willChange: 'transform, opacity',
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-auto"
          >
            <div className="relative inline-flex items-center justify-center w-full max-w-4xl py-6 px-4">
              {/* Dim baseline text ensuring stable layout */}
              <div
                aria-hidden="true"
                className="font-['Manrope',sans-serif] text-4xl sm:text-6xl md:text-7xl lg:text-[86px] xl:text-[98px] leading-[1.1] tracking-[-0.03em] opacity-10 select-none whitespace-nowrap"
              >
                <span className="font-light text-white">Meet brand</span>
                <span className="font-bold text-white">heat.</span>
              </div>

              {/* Revealed Text Layer: revealed dynamically as heat.png sweeps across */}
              <motion.div
                style={{
                  clipPath: textClipPath,
                  WebkitClipPath: textClipPath,
                  willChange: 'clip-path',
                }}
                className="absolute inset-0 flex items-center justify-center font-['Manrope',sans-serif] text-4xl sm:text-6xl md:text-7xl lg:text-[86px] xl:text-[98px] leading-[1.1] tracking-[-0.03em] select-none whitespace-nowrap"
              >
                <span className="font-light text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.25)]">
                  Meet brand
                </span>
                <span className="font-bold text-white drop-shadow-[0_0_28px_rgba(255,102,55,0.7)]">
                  heat.
                </span>
              </motion.div>

              {/* heat.png image gliding across from left to right with scroll */}
              <motion.div
                style={{
                  left: flameX,
                  opacity: flameOpacity,
                  willChange: 'left, opacity',
                }}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-30"
              >
                <div className="relative -translate-x-[92%] w-[180px] sm:w-[260px] md:w-[320px] lg:w-[380px] flex items-center justify-center">
                  <img
                    src="/heat.png"
                    alt="Brand HEAT Flame"
                    className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(255,102,55,0.75)]"
                  />

                  {/* Laser ignition spark at the front tip of heat.png */}
                  <div className="absolute right-[4%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] shadow-[0_0_24px_10px_rgba(255,255,255,0.95)] pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Mouse Scroll Cue & Step Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="relative z-20 w-full flex flex-col items-center justify-center pb-2 sm:pb-4 gap-3"
        >
          {/* 5-Step Narrative Progress Dots */}
          <div className="flex items-center gap-2 opacity-70">
            {[0, 1, 2, 3, 4].map((step) => {
              const ranges = [
                [0, 0.18],
                [0.18, 0.38],
                [0.38, 0.58],
                [0.58, 0.78],
                [0.78, 1.0],
              ];
              const [min, max] = ranges[step];
              return (
                <StepDot
                  key={step}
                  step={step}
                  progress={smoothProgress}
                  min={min}
                  max={max}
                />
              );
            })}
          </div>

          <MouseScrollIndicator />
        </motion.div>
      </div>
    </div>
  );
}

function StepDot({ progress, min, max }) {
  const width = useTransform(progress, [min, (min + max) / 2, max], [6, 20, 6]);
  const opacity = useTransform(progress, [min, (min + max) / 2, max], [0.3, 1, 0.3]);
  const bg = useTransform(progress, [min, (min + max) / 2, max], [
    'rgba(255,255,255,0.3)',
    '#FF6637',
    'rgba(255,255,255,0.3)',
  ]);

  return (
    <motion.div
      style={{
        width,
        opacity,
        backgroundColor: bg,
      }}
      className="h-1.5 rounded-full transition-colors"
    />
  );
}
