import React from 'react';
import { motion } from 'framer-motion';
import './BottomGlow.css';

export default function BottomGlow() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[45vh] pointer-events-none overflow-hidden select-none z-0">
      {/* Left Orange/Coral Orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.85, 1, 0.85],
          x: ['-5%', '2%', '-5%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-24 -left-20 w-[45vw] h-[350px] rounded-full bg-gradient-to-tr from-[#FF5722] via-[#FF6637] to-transparent blur-[85px] will-change-transform"
      />

      {/* Center Purple / Deep Violet Ambient Base */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-16 left-[20%] right-[20%] h-[300px] rounded-full bg-gradient-to-t from-[#3E3183] via-[#2A1045] to-transparent blur-[90px] will-change-transform"
      />

      {/* Right Red-Orange Warm Orb */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.75, 0.95, 0.75],
          x: ['5%', '-2%', '5%'],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute -bottom-24 -right-16 w-[45vw] h-[360px] rounded-full bg-gradient-to-tl from-[#D70417] via-[#8E1F1A] to-transparent blur-[85px] will-change-transform"
      />

      {/* Global Dark Vignette Fade (smooth falloff to deep black) */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#070709]/30 to-[#070709]" />
    </div>
  );
}
