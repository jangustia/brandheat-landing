import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { cascadeContainerVariants, cascadeItemVariants } from './cascadeVariants';
import './SectionTwoOverview.css';

/**
 * AnticipaIcon Component
 * Matches the diagonal megaphone with sound blast lines in Tier 1 Hot Red.
 */
function AnticipaIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8 text-[#ff453a]' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <g transform="rotate(-22 11 12)">
        <path d="m3 11 14-5v12L3 13v-2z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        <path d="M19.5 7.5l2-1.2" />
        <path d="M20.5 12l2.5 0" />
        <path d="M19.5 16.5l2 1.2" />
      </g>
    </svg>
  );
}

/**
 * EscalaIcon Component
 * Matches the ascending arrow & bar chart icon in official Tier 3 Rising Yellow.
 */
function EscalaIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8 text-[#eab308]' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M11 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="9" y1="15" x2="21" y2="3" />
      <rect x="7" y="13.5" width="2" height="3.5" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="11" y="10.5" width="2" height="6.5" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="15" y="7.5" width="2" height="9.5" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * SectionTwoOverview Component
 * Calibrated strictly to the reference design mockup:
 * - Centered comet flare logo (heat.png)
 * - "Meet brandheat." (Thin "Meet brand", Bold "heat.")
 * - Subtitle: "El always on que sigue el ritmo de la conversación."
 * - Description 2-lines:
 *   "Una sola plataforma para detectar, crear, publicar y medir en tiempo real."
 *   "Sin brief. Sin esperas. Sin llegar tarde."
 * - 3 Tall Rounded Modular Cards (#141414, rounded-[32px], border: none)
 * - Rounded Square Badges (ANTICIPA: wine/red, CREA: warm brown/orange, ESCALA: olive/yellow)
 * - Brand Typography: Manrope (headings) & Inter (body / labels)
 */
export default function SectionTwoOverview({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleGridScroll = (e) => {
    const el = e.currentTarget;
    if (!el) return;
    const cardWidth = el.scrollWidth / 3;
    if (cardWidth > 0) {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveCardIndex(Math.min(2, Math.max(0, idx)));
    }
  };

  return (
    <motion.div
      className="section-two-container"
      variants={cascadeContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 1. Top Flame Comet + "Meet brandheat." Title - Enlarged */}
      <motion.div variants={cascadeItemVariants} className="flex flex-col items-center">
        <div className="section-two-comet-wrapper">
          <img
            src="/heat.png"
            alt="Brand HEAT Comet"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </div>

        <h2 className="section-two-title text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[62px]">
          <span className="section-two-title-wrapper">
            <span className="section-two-title-light">MEET</span>
            <img
              src="/brandheat-logotype.png"
              alt="brandheat"
              className="section-two-logotype"
            />
          </span>
        </h2>
      </motion.div>

      {/* 2. Primary Tagline (#e1e1e1 in Inter) - Enlarged */}
      <motion.p
        variants={cascadeItemVariants}
        className="section-two-tagline text-base sm:text-xl md:text-2xl lg:text-[23px]"
      >
        {isEs
          ? 'El always on que sigue el ritmo de la conversación.'
          : 'The always-on that keeps pace with the conversation.'}
      </motion.p>

      {/* 3. Secondary Explanatory Copy (#8D8F93 in Inter) - Enlarged */}
      <motion.div
        variants={cascadeItemVariants}
        className="section-two-copy text-[15px] sm:text-[17px] lg:text-[18px] space-y-0.5"
      >
        <p>
          {isEs
            ? 'Una sola plataforma para detectar, crear, publicar y medir en tiempo real.'
            : 'A single platform to detect, create, publish, and measure in real time.'}
        </p>
        <p>
          {isEs
            ? 'Sin brief. Sin esperas. Sin llegar tarde.'
            : 'No brief. No waiting. No showing up late.'}
        </p>
      </motion.div>

      {/* 4. Three Level 2 Modular Feature Cards - Shrunk & Compact (#141414, border: none) */}
      <div className="section-two-grid" onScroll={handleGridScroll}>
        {/* Card 1: ANTICIPA */}
        <motion.div variants={cascadeItemVariants} className="group section-two-card">
          {/* Badge Icon: Hot Red Surface */}
          <div className="section-two-badge section-two-badge-anticipa">
            <AnticipaIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff453a]" />
          </div>

          <h3 className="section-two-card-title text-sm sm:text-[15px]">
            {isEs ? 'ANTICIPA' : 'ANTICIPATE'}
          </h3>

          <p className="section-two-card-desc">
            {isEs
              ? 'Llega antes a la conversación antes de que despegue.'
              : 'Get to the conversation before it takes off.'}
          </p>
        </motion.div>

        {/* Card 2: CREA */}
        <motion.div variants={cascadeItemVariants} className="group section-two-card">
          {/* Badge Icon: Warm Orange Surface */}
          <div className="section-two-badge section-two-badge-crea">
            <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea4325]" strokeWidth={2} />
          </div>

          <h3 className="section-two-card-title text-sm sm:text-[15px]">
            {isEs ? 'CREA' : 'CREATE'}
          </h3>

          <p className="section-two-card-desc">
            {isEs
              ? 'Piezas relevantes a conversaciones que ya son tendencia.'
              : 'Relevant content for conversations that are already trending.'}
          </p>
        </motion.div>

        {/* Card 3: ESCALA */}
        <motion.div variants={cascadeItemVariants} className="group section-two-card">
          {/* Badge Icon: Rising Yellow Surface */}
          <div className="section-two-badge section-two-badge-escala">
            <EscalaIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#eab308]" />
          </div>

          <h3 className="section-two-card-title text-sm sm:text-[15px]">
            {isEs ? 'ESCALA' : 'SCALE'}
          </h3>

          <p className="section-two-card-desc">
            {isEs
              ? 'Invierte solo en lo que mejor funciona.'
              : 'Invest only in what works best.'}
          </p>
        </motion.div>
      </div>

      {/* Mobile Swipe Pagination Dots */}
      <motion.div
        variants={cascadeItemVariants}
        className="flex md:hidden items-center justify-center gap-1.5 mt-2"
        aria-hidden="true"
      >
        {[0, 1, 2].map((idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeCardIndex === idx
                ? 'w-5 bg-[#ea4325]'
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

