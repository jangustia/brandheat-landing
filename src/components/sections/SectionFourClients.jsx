import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from './client-logos/ClientLogos';
import './SectionFourClients.css';

/**
 * SectionFourClients Component
 * Renders Section 4: "OUR CLIENTS (so far)"
 * Built strictly according to design.md tokens:
 * - Level 2 Parent Cards (#141414 / #151515, border: none, rounded-[24px])
 * - Depth created purely through surface contrast, never with outlines or strokes
 * - Level 3 Subtle Hover State (#1c1c1c, subtle lift)
 * - Brand Typography: Manrope (headings) & Inter (body / labels)
 * - 2-row x 3-column responsive grid featuring 6 client logos from conversion template
 */
export default function SectionFourClients({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  return (
    <div className="section-four-container">
      {/* 1. Header Title: OUR CLIENTS (so far) */}
      <h2 className="section-four-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
        {isEs ? 'OUR CLIENTS (so far)' : 'OUR CLIENTS (so far)'}
      </h2>

      {/* 2. Grid with 6 Client Logos in 2 rows (3 columns x 2 rows on desktop) */}
      <div className="section-four-grid">
        {CLIENT_LOGOS.map(({ id, Component }) => (
          <motion.div
            key={id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-four-card"
          >
            <Component className="section-four-logo-svg" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

