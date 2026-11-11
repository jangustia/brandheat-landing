import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
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

  return (
    <div className="section-two-container">
      {/* 1. Top Flame Comet + "Meet brandheat." Title */}
      <div className="flex flex-col items-center">
        <div className="section-two-comet-wrapper">
          <img
            src="/heat.png"
            alt="Brand HEAT Comet"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </div>

        <h2 className="section-two-title text-3xl sm:text-4xl md:text-5xl lg:text-[48px]">
          <span className="section-two-title-light">Meet brand</span>
          <span className="section-two-title-bold">heat.</span>
        </h2>
      </div>

      {/* 2. Primary Tagline (#e1e1e1 in Inter) */}
      <p className="section-two-tagline text-base sm:text-lg lg:text-[20px]">
        {isEs
          ? 'El always on que sigue el ritmo de la conversación.'
          : 'The always-on that keeps pace with the conversation.'}
      </p>

      {/* 3. Secondary Explanatory Copy (#8D8F93 in Inter) */}
      <div className="section-two-copy text-xs sm:text-sm md:text-[14px] space-y-0.5">
        <p>
          {isEs
            ? 'Una sola plataforma para detectar, crear, publicar y medir en tiempo real.'
            : 'A single platform to detect, create, publish, and measure in real time.'}
        </p>
        <p>
          {isEs
            ? 'Sin brief. Sin esperas. Sin llegar tarde.'
            : 'No briefs. No waiting. No showing up late.'}
        </p>
      </div>

      {/* 4. Three Level 2 Modular Feature Cards (#141414, rounded-[32px], border: none) */}
      <div className="section-two-grid">
        {/* Card 1: ANTICIPA */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group section-two-card"
        >
          {/* Badge Icon: Hot Red Surface */}
          <div className="section-two-badge section-two-badge-anticipa">
            <AnticipaIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-[#ff453a]" />
          </div>

          <h3 className="section-two-card-title text-base sm:text-lg">
            {isEs ? 'ANTICIPA' : 'ANTICIPATE'}
          </h3>

          <p className="section-two-card-desc">
            {isEs
              ? 'Llega antes a la conversación antes de que despegue.'
              : 'Get to the conversation before it takes off.'}
          </p>
        </motion.div>

        {/* Card 2: CREA */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group section-two-card"
        >
          {/* Badge Icon: Warm Orange Surface */}
          <div className="section-two-badge section-two-badge-crea">
            <LayoutGrid className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-[#ea4325]" strokeWidth={2} />
          </div>

          <h3 className="section-two-card-title text-base sm:text-lg">
            {isEs ? 'CREA' : 'CREATE'}
          </h3>

          <p className="section-two-card-desc">
            {isEs
              ? 'Piezas relevantes a conversaciones que ya son tendencia.'
              : 'Relevant content for conversations that are already trending.'}
          </p>
        </motion.div>

        {/* Card 3: ESCALA */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group section-two-card"
        >
          {/* Badge Icon: Rising Yellow Surface */}
          <div className="section-two-badge section-two-badge-escala">
            <EscalaIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-[#eab308]" />
          </div>

          <h3 className="section-two-card-title text-base sm:text-lg">
            {isEs ? 'ESCALA' : 'SCALE'}
          </h3>

          <p className="section-two-card-desc">
            {isEs
              ? 'Invierte solo en lo que mejor funciona.'
              : 'Invest only in what works best.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

