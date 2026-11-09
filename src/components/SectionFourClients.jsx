import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionFourClients Component
 * Renders Section 4: "OUR CLIENTS (so far)"
 * Displays a 4-card placeholder logo grid matching the provided design.
 */
export default function SectionFourClients({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  // Cascading animation variants
  const cascadeContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(14px)',
      y: -24,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeHeader = {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeCard = {
    hidden: { opacity: 0, y: 22, scale: 0.94, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const placeholders = [1, 2, 3, 4];

  return (
    <motion.div
      variants={cascadeContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4"
    >
      {/* 1. Header Title: OUR CLIENTS (so far) */}
      <motion.h2
        variants={cascadeHeader}
        className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[600] tracking-[-0.02em] text-white text-center"
      >
        {isEs ? 'OUR CLIENTS (so far)' : 'OUR CLIENTS (so far)'}
      </motion.h2>

      {/* 2. Grid with 4 Logo Placeholders */}
      <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full max-w-4xl mx-auto">
        {placeholders.map((num) => (
          <motion.div
            key={num}
            variants={cascadeCard}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="group relative h-24 sm:h-28 md:h-32 bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[20px] sm:rounded-[24px] flex items-center justify-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-default select-none"
          >
            <span className="font-['Manrope',sans-serif] text-base sm:text-lg md:text-xl font-[400] text-white/35 group-hover:text-white/60 tracking-wider transition-colors duration-200">
              Logo
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

