import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import InteractiveDotField from './InteractiveDotField';
import './BottomAmbientGlow.css';

/**
 * HarmonicBar Component
 * Renders an individual harmonic wave channel that actively repels away
 * and dips downward when the mouse cursor is nearby, creating an empty space.
 */
function HarmonicBar({ index, total, smoothMouseX, smoothGlowIntensity }) {
  const position = index / (total - 1);
  const distanceFromCenter = Math.abs(position - 0.5);
  const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
  const baseHeight = 35 + (100 - 35) * heightPercentage;
  const initialScale = baseHeight / 100;

  // Symmetrical Brand HEAT chromatic mapping:
  // Left: Orange (#FF6637) -> Mid-left: Crimson (#D70417) -> Center: Deep Violet (#3E3183) -> Right: Pure Orange (#FF6637)
  let barColor = 'rgba(255, 102, 55, 0.5)';
  if (position >= 0.38 && position <= 0.62) {
    barColor = 'rgba(62, 49, 131, 0.6)';
  } else if (position > 0.20 && position < 0.38) {
    barColor = 'rgba(215, 4, 23, 0.45)';
  } else if (position > 0.62) {
    barColor = 'rgba(255, 102, 55, 0.55)';
  }

  // Reactive Repulsion: Bar dips downward and empties when cursor is near
  const repelScaleY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const dist = Math.abs(position - x);
      const repulsionRadius = 0.22;
      if (dist < repulsionRadius) {
        const factor = Math.cos((dist / repulsionRadius) * (Math.PI / 2));
        const scaleDrop = 1 - factor * 0.85 * intensity;
        return initialScale * Math.max(0.1, scaleDrop);
      }
      return initialScale;
    }
  );

  // Pushes laterally away from the cursor
  const repelX = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const dist = position - x;
      const absDist = Math.abs(dist);
      const repulsionRadius = 0.22;
      if (absDist < repulsionRadius && absDist > 0.001) {
        const factor = Math.cos((absDist / repulsionRadius) * (Math.PI / 2));
        const direction = dist > 0 ? 1 : -1;
        return direction * factor * 26 * intensity;
      }
      return 0;
    }
  );

  // Fades opacity under the cursor to empty the space
  const repelOpacity = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const dist = Math.abs(position - x);
      const repulsionRadius = 0.18;
      if (dist < repulsionRadius) {
        const factor = Math.cos((dist / repulsionRadius) * (Math.PI / 2));
        return Math.max(0.04, 1 - factor * 0.92 * intensity);
      }
      return 1;
    }
  );

  return (
    <motion.div
      className="ambient-harmonic-bar"
      style={{
        flex: `1 0 calc(100% / ${total})`,
        maxWidth: `calc(100% / ${total})`,
        height: '100%',
        background: `linear-gradient(to top, ${barColor}, transparent)`,
        transformOrigin: 'bottom',
        scaleY: repelScaleY,
        x: repelX,
        opacity: repelOpacity,
        // @ts-ignore
        '--initial-scale': initialScale,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          animation: `ambientBarPulse 2.8s ease-in-out infinite alternate`,
          animationDelay: `${index * 0.14}s`,
          transformOrigin: 'bottom',
        }}
      />
    </motion.div>
  );
}

/**
 * BottomAmbientGlow Component
 * Faithfully crafted from the exact Figma vectors & Brand HEAT palette:
 * - Left Orange Synapse (#FF6637, high blur 220px)
 * - Right Orange Synapse (#FF6637, high blur 220px, mirrored)
 * - Center-Left Purple Synapse (#3E3183, high blur 220px)
 * - Wide Orange Wave (#FF6637, high blur 180px)
 * - Wide Purple Wave (#3E3183, high blur 180px)
 * - Base Crimson Orb (#D70417, radius 861px, high blur 280px)
 *
 * Repulsion / Displacement Interaction:
 * - When the mouse moves across the bottom area, the color MOVES AWAY from the cursor,
 *   creating an organic empty space around the cursor (clearing force-field).
 * - Bars and shapes dip down and part laterally away like fluid parting.
 */
export default function BottomAmbientGlow({ onScrollClick, currentLang = 'es', isLastStage = false }) {
  const numHarmonicBars = 17;

  // Track normalized mouse coordinates (0 to 1 across X and Y)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(1);
  const isHoveringGlow = useMotionValue(0);

  // Responsive spring for physical repulsion
  const springRepel = { damping: 24, stiffness: 140, mass: 0.5 };

  const smoothMouseX = useSpring(mouseX, springRepel);
  const smoothGlowIntensity = useSpring(isHoveringGlow, { damping: 25, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      mouseX.set(normX);
      mouseY.set(normY);

      // Glow proximity: activates when mouse enters bottom 55% of viewport
      const proximity = Math.max(0, Math.min(1, (normY - 0.4) / 0.45));
      isHoveringGlow.set(proximity);
    };

    const handleMouseLeave = () => {
      isHoveringGlow.set(0);
      mouseX.set(0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isHoveringGlow]);

  // Left Orange Flame Repulsion (pushes left and down when cursor enters left)
  const leftFlameRepelX = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, 1 - x * 2.3);
      return -proximity * intensity * 50; // Pushed left away from cursor
    }
  );
  const leftFlameRepelY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, 1 - x * 2.3);
      return proximity * intensity * 35; // Ducks down
    }
  );
  const leftFlameRepelScaleY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, 1 - x * 2.3);
      return 1 - proximity * intensity * 0.35; // Flattens
    }
  );

  // Right Orange Flame Repulsion (pushes right and down when cursor enters right)
  const rightFlameRepelX = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, (x - 0.55) * 2.3);
      return proximity * intensity * 50; // Pushed right away from cursor
    }
  );
  const rightFlameRepelY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, (x - 0.55) * 2.3);
      return proximity * intensity * 35; // Ducks down
    }
  );
  const rightFlameRepelScaleY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, (x - 0.55) * 2.3);
      return 1 - proximity * intensity * 0.35; // Flattens
    }
  );

  // Center-Left Purple Synapse Repulsion (parts away from cursor)
  const centerPurpleRepelX = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const centerDist = x - 0.5;
      const proximity = 1 - Math.abs(centerDist) * 2.5;
      if (proximity > 0) {
        const dir = centerDist < 0 ? 1 : -1;
        return dir * proximity * intensity * 40;
      }
      return 0;
    }
  );
  const centerPurpleRepelY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, 1 - Math.abs(x - 0.45) * 2.5);
      return proximity * intensity * 30; // Ducks down
    }
  );
  const centerPurpleRepelScaleY = useTransform(
    [smoothMouseX, smoothGlowIntensity],
    ([x, intensity]) => {
      const proximity = Math.max(0, 1 - Math.abs(x - 0.45) * 2.5);
      return 1 - proximity * intensity * 0.32;
    }
  );

  // Wide Waves Repulsion (depresses downward under cursor)
  const wavesRepelY = useTransform(smoothGlowIntensity, [0, 1], [0, 26]);
  const wavesRepelScaleY = useTransform(smoothGlowIntensity, [0, 1], [1, 0.78]);

  // Crimson Base Repulsion (depresses under cursor)
  const crimsonRepelScaleY = useTransform(smoothGlowIntensity, [0, 1], [1, 0.82]);

  return (
    <div className="ambient-glow-wrapper">
      
      {/* 1. CHROMATIC AI GLOW STAGE (DIFFUSE BOTTOM AMBIENCE) */}
      <div className="ambient-chromatic-stage">

        {/* Harmonic Undulating Wave Foundation with Cursor Repulsion */}
        <div className="ambient-harmonic-wave" aria-hidden="true">
          {Array.from({ length: numHarmonicBars }).map((_, index) => (
            <HarmonicBar
              key={index}
              index={index}
              total={numHarmonicBars}
              smoothMouseX={smoothMouseX}
              smoothGlowIntensity={smoothGlowIntensity}
            />
          ))}
        </div>

        {/* 5. Deep Crimson Base Orb (#D70417, blur 280px, radius 861px) */}
        <motion.div
          style={{
            scaleY: crimsonRepelScaleY,
            transformOrigin: 'center bottom',
          }}
          className="ambient-crimson-base"
        >
          <motion.div
            animate={{
              scaleY: [1, 1.18, 0.88, 1.12, 1],
              scaleX: [1, 1.05, 0.96, 1.04, 1],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: 'center bottom' }}
            className="w-full h-full rounded-[861px] will-change-transform"
          />
        </motion.div>

        {/* 4. Wide Purple Wave (#3E3183, width 1440, blur 180) */}
        <motion.div
          style={{
            y: wavesRepelY,
            scaleY: wavesRepelScaleY,
            transformOrigin: 'center bottom',
          }}
          className="absolute -bottom-28 sm:-bottom-36 left-1/2 -translate-x-1/2 w-screen min-w-[1240px] max-w-[1920px] pointer-events-none overflow-visible will-change-transform"
        >
          <motion.div
            animate={{
              scaleY: [1, 1.25, 0.85, 1.15, 1],
              opacity: [0.75, 0.95, 0.7, 0.9, 0.75],
            }}
            transition={{
              duration: 5.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            style={{ transformOrigin: 'center bottom' }}
            className="w-full h-full overflow-visible will-change-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1440"
              height="500"
              viewBox="-600 -350 2800 1600"
              fill="none"
              className="w-full h-auto overflow-visible"
              style={{ overflow: 'visible' }}
            >
              <g filter="url(#filter0_f_119_965956)">
                <path
                  d="M0.0195312 428.106L1179.49 204L1615.3 486.57L314.386 748.379L0.0195312 428.106Z"
                  fill="#3E3183"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_119_965956"
                  x="-800"
                  y="-500"
                  width="3200"
                  height="2000"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="180" result="effect1_foregroundBlur_119_965956" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* 3. Wide Orange Wave (#FF6637, width 1440, blur 180) */}
        <motion.div
          style={{
            y: wavesRepelY,
            scaleY: wavesRepelScaleY,
            transformOrigin: 'center bottom',
          }}
          className="absolute -bottom-28 sm:-bottom-36 left-1/2 -translate-x-1/2 w-screen min-w-[1240px] max-w-[1920px] pointer-events-none overflow-visible will-change-transform"
        >
          <motion.div
            animate={{
              scaleY: [1, 0.85, 1.25, 0.9, 1],
              opacity: [0.8, 1, 0.75, 0.95, 0.8],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            style={{ transformOrigin: 'center bottom' }}
            className="w-full h-full overflow-visible will-change-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1440"
              height="500"
              viewBox="-600 -350 2800 1600"
              fill="none"
              className="w-full h-auto overflow-visible"
              style={{ overflow: 'visible' }}
            >
              <g filter="url(#filter0_f_119_965957)">
                <path
                  d="M-41.0124 368L697.488 204L1302.49 350L1637.12 718.418L310.404 690.091L-41.0124 368Z"
                  fill="#FF6637"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_119_965957"
                  x="-800"
                  y="-500"
                  width="3200"
                  height="2000"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="180" result="effect1_foregroundBlur_119_965957" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* 2. Center-Left Purple Synapse (#3E3183, width 974, blur 220) */}
        <motion.div
          style={{
            x: centerPurpleRepelX,
            y: centerPurpleRepelY,
            scaleY: centerPurpleRepelScaleY,
            transformOrigin: 'center bottom',
          }}
          className="absolute -bottom-24 sm:-bottom-32 left-[18%] sm:left-[24%] w-[68vw] max-w-[974px] pointer-events-none overflow-visible will-change-transform"
        >
          <motion.div
            animate={{
              scaleY: [1, 1.22, 0.88, 1.15, 1],
              scaleX: [1, 1.06, 0.95, 1.04, 1],
              y: [0, -14, 4, -8, 0],
              opacity: [0.75, 0.95, 0.7, 0.9, 0.75],
            }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
            style={{ transformOrigin: 'center bottom' }}
            className="w-full h-full overflow-visible will-change-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="974"
              height="600"
              viewBox="-800 -400 2200 2400"
              fill="none"
              className="w-full h-auto overflow-visible"
              style={{ overflow: 'visible' }}
            >
              <g filter="url(#filter0_f_119_965959)">
                <path
                  d="M-65.3181 738.478L356.009 284L689.676 867.516L258.825 1259.49L-65.3181 738.478Z"
                  fill="#3E3183"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_119_965959"
                  x="-900"
                  y="-500"
                  width="2400"
                  height="2600"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="220" result="effect1_foregroundBlur_119_965959" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* 1. Left Orange Synapse (#FF6637, width 729, blur 220) */}
        <motion.div
          style={{
            x: leftFlameRepelX,
            y: leftFlameRepelY,
            scaleY: leftFlameRepelScaleY,
            transformOrigin: 'left bottom',
          }}
          className="absolute -bottom-24 sm:-bottom-32 -left-12 sm:left-0 w-[54vw] max-w-[729px] pointer-events-none overflow-visible will-change-transform"
        >
          <motion.div
            animate={{
              scaleY: [1, 1.28, 0.82, 1.18, 1],
              scaleX: [1, 1.08, 0.94, 1.05, 1],
              y: [0, -18, 6, -10, 0],
              opacity: [0.85, 1, 0.8, 0.95, 0.85],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            style={{ transformOrigin: 'left bottom' }}
            className="w-full h-full overflow-visible will-change-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="729"
              height="700"
              viewBox="-1100 -400 2200 2000"
              fill="none"
              className="w-full h-auto overflow-visible"
              style={{ overflow: 'visible' }}
            >
              <g filter="url(#filter0_f_119_965960)">
                <path
                  d="M444.843 918.633L-462.708 710.88L-236.371 284L44.9902 544.584L444.843 918.633Z"
                  fill="#FF6637"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_119_965960"
                  x="-1200"
                  y="-500"
                  width="2400"
                  height="2200"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="220" result="effect1_foregroundBlur_119_965960" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* 6. Right Orange Synapse (#FF6637, width 729, blur 220) - Symmetrical balance */}
        <motion.div
          style={{
            x: rightFlameRepelX,
            y: rightFlameRepelY,
            scaleY: rightFlameRepelScaleY,
            transformOrigin: 'right bottom',
          }}
          className="absolute -bottom-24 sm:-bottom-32 -right-12 sm:right-0 w-[54vw] max-w-[729px] pointer-events-none overflow-visible will-change-transform"
        >
          <motion.div
            animate={{
              scaleY: [1, 1.28, 0.82, 1.18, 1],
              scaleX: [1, 1.08, 0.94, 1.05, 1],
              y: [0, -18, 6, -10, 0],
              opacity: [0.85, 1, 0.8, 0.95, 0.85],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
            style={{ transformOrigin: 'right bottom' }}
            className="w-full h-full overflow-visible will-change-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="729"
              height="700"
              viewBox="-1100 -400 2200 2000"
              fill="none"
              className="w-full h-auto overflow-visible"
              style={{ overflow: 'visible', transform: 'scaleX(-1)', transformOrigin: 'center' }}
            >
              <g filter="url(#filter0_f_right_orange)">
                <path
                  d="M444.843 918.633L-462.708 710.88L-236.371 284L44.9902 544.584L444.843 918.633Z"
                  fill="#FF6637"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_right_orange"
                  x="-1200"
                  y="-500"
                  width="2400"
                  height="2200"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="220" result="effect1_foregroundBlur_right_orange" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

      </div>

      {/* 2. INTERACTIVE LIVING PARTICLE FIELD (Brand HEAT Micro-Dots that physically scatter away from cursor) */}
      <InteractiveDotField />

      {/* 3. ANIMATED MOUSE SCROLL INDICATOR */}
      {!isLastStage && (
        <button
          type="button"
          onClick={onScrollClick}
          className="ambient-mouse-indicator focus:outline-none focus:ring-2 focus:ring-[#ea4325]/40 rounded-full group cursor-pointer"
          aria-label={currentLang === 'es' ? 'Desliza para conocer más' : 'Scroll to learn more'}
        >
          <div className="ambient-mouse-capsule group-hover:border-white group-hover:shadow-[0_0_16px_rgba(234,67,37,0.45)] transition-all duration-300">
            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-1.5 bg-white/90 rounded-full"
            />
          </div>

          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-1 text-[8px] text-[#8D8F93] leading-none group-hover:text-white/80 transition-colors"
          >
            ⌄
          </motion.div>

          {/* Indicator text: 'Scroll to learn more' in Spanish and English */}
          <span className="mt-2 text-[10px] sm:text-[11px] font-['Inter',sans-serif] font-[500] tracking-[0.16em] uppercase text-[#8D8F93] group-hover:text-[#ffffff] transition-colors duration-200 select-none">
            {currentLang === 'es' ? 'Desliza para conocer más' : 'Scroll to learn more'}
          </span>
        </button>
      )}

    </div>
  );
}
