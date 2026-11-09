import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionFourClients Component
 * Renders Section 4: "OUR CLIENTS (so far)"
 * Built strictly according to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: 1px solid rgba(255,255,255,0.07), rounded-[24px])
 * - Level 3 Hover State (#212121, border: rgba(234,67,37,0.3))
 * - Typography: Poppins font family, Primary #ffffff, Content #E1E1E1, Muted #8D8F93
 * - Small Text Rule: font-weight 500 for text < 14px
 */
export default function SectionFourClients({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';
  const placeholders = [1, 2, 3, 4];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
      {/* 1. Header Title: OUR CLIENTS (so far) */}
      <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[600] tracking-[-0.02em] text-[#ffffff] text-center">
        {isEs ? 'OUR CLIENTS (so far)' : 'OUR CLIENTS (so far)'}
      </h2>

      {/* 2. Grid with 4 Logo Placeholders (Level 2 Parent Cards #151515, rounded-[24px]) */}
      <div className="mt-6 sm:mt-7 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 w-full max-w-4xl mx-auto">
        {placeholders.map((num) => (
          <motion.div
            key={num}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="group relative h-20 sm:h-24 md:h-28 bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.30)] rounded-[24px] flex items-center justify-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-default select-none"
          >
            <span className="font-['Poppins',sans-serif] text-base sm:text-lg md:text-xl font-[500] text-[#8D8F93] group-hover:text-[#E1E1E1] tracking-wider transition-colors duration-200">
              Logo
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
