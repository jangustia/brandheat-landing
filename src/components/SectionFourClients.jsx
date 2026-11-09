import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionFourClients Component
 * Renders Section 4: "OUR CLIENTS (so far)"
 * Built strictly according to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: none, rounded-[24px])
 * - Depth created purely through surface contrast, never with outlines or strokes
 * - Level 3 Subtle Hover State (#1e1e1e, subtle lift)
 * - Brand Typography: Manrope (headings) & Inter (body / labels)
 */
export default function SectionFourClients({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';
  const placeholders = [1, 2, 3, 4];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
      {/* 1. Header Title: OUR CLIENTS (so far) */}
      <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[700] tracking-[-0.02em] text-[#ffffff] text-center">
        {isEs ? 'OUR CLIENTS (so far)' : 'OUR CLIENTS (so far)'}
      </h2>

      {/* 2. Grid with 4 Logo Placeholders (Level 2 Parent Cards #151515, border: none, rounded-[24px]) */}
      <div className="mt-6 sm:mt-7 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 w-full max-w-4xl mx-auto">
        {placeholders.map((num) => (
          <motion.div
            key={num}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group relative h-20 sm:h-24 md:h-28 bg-[#151515] hover:bg-[#1e1e1e] rounded-[24px] flex items-center justify-center transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] cursor-default select-none"
          >
            <span className="font-['Inter',sans-serif] text-base sm:text-lg md:text-xl font-[500] text-[#8D8F93] group-hover:text-[#E1E1E1] tracking-wider transition-colors duration-200">
              Logo
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
