import React from 'react';
import { motion } from 'framer-motion';
import './SectionFourClients.css';

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
    <div className="section-four-container">
      {/* 1. Header Title: OUR CLIENTS (so far) */}
      <h2 className="section-four-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
        {isEs ? 'OUR CLIENTS (so far)' : 'OUR CLIENTS (so far)'}
      </h2>

      {/* 2. Grid with 4 Logo Placeholders (Level 2 Parent Cards #151515, border: none, rounded-[24px]) */}
      <div className="section-four-grid">
        {placeholders.map((num) => (
          <motion.div
            key={num}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-four-card"
          >
            <span className="section-four-logo-text text-base sm:text-lg md:text-xl">
              Logo
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

