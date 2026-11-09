import React from 'react';
import { motion } from 'framer-motion';
import './MouseScrollIndicator.css';

export default function MouseScrollIndicator({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const target = document.getElementById('how-it-works');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to explore"
      className="relative z-10 mb-8 flex flex-col items-center select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ea4325]/40 rounded-full p-1"
    >
      <div className="w-[22px] h-[34px] rounded-full border-2 border-white/75 flex flex-col items-center justify-start pt-1.5 shadow-[0_0_12px_rgba(255,255,255,0.15)]">
        {/* Scroll Wheel Motion */}
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

      {/* Micro Chevron / Arrow beneath */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-1 text-[8px] text-white/50 leading-none"
      >
        ⌄
      </motion.div>
    </button>
  );
}
