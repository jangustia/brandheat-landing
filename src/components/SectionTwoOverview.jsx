import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
      {/* 1. Top Flame Comet + "Meet brandheat." Title */}
      <div className="flex flex-col items-center">
        <div className="w-32 sm:w-36 md:w-40 h-7 sm:h-8 md:h-9 mx-auto flex items-center justify-center mb-3 sm:mb-3.5">
          <img
            src="/heat.png"
            alt="Brand HEAT Comet"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </div>

        <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-[1.12] tracking-[-0.03em] text-[#ffffff] text-center">
          <span className="font-[200] text-[#ffffff]">Meet brand</span>
          <span className="font-[800] text-[#ffffff]">heat.</span>
        </h2>
      </div>

      {/* 2. Primary Tagline (#ffffff in Manrope) */}
      <p className="mt-2.5 sm:mt-3 font-['Manrope',sans-serif] text-lg sm:text-xl md:text-[22px] lg:text-[23px] font-[500] text-[#ffffff] tracking-[-0.02em] text-center max-w-3xl">
        {isEs
          ? 'El always on que sigue el ritmo de la conversación.'
          : 'The always-on that keeps pace with the conversation.'}
      </p>

      {/* 3. Secondary Explanatory Copy (#8D8F93 in Inter) */}
      <div className="mt-3 sm:mt-3.5 font-['Inter',sans-serif] text-xs sm:text-sm md:text-[14px] font-[400] text-[#8D8F93] leading-relaxed tracking-[-0.01em] text-center max-w-2xl mx-auto space-y-0.5">
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
      <div className="mt-8 sm:mt-9 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-4xl lg:max-w-5xl mx-auto">
        {/* Card 1: ANTICIPA */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group relative bg-[#141414] hover:bg-[#1a1a1a] rounded-[28px] sm:rounded-[32px] py-8 sm:py-9 md:py-10 px-5 sm:px-6 md:px-7 flex flex-col items-center text-center justify-center transition-colors duration-250 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.6)] cursor-default"
        >
          {/* Badge Icon: Hot Red Surface */}
          <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-[18px] bg-[#2b1214] flex items-center justify-center mb-6 sm:mb-7 transition-colors">
            <AnticipaIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-[#ff453a]" />
          </div>

          <h3 className="font-['Manrope',sans-serif] font-[700] text-base sm:text-lg tracking-[0.05em] text-[#ffffff] uppercase mb-2 sm:mb-2.5">
            {isEs ? 'ANTICIPA' : 'ANTICIPATE'}
          </h3>

          <p className="font-['Inter',sans-serif] font-[400] text-xs sm:text-[13px] md:text-[14px] text-[#8D8F93] leading-relaxed max-w-[210px] mx-auto">
            {isEs
              ? 'Llega antes a la conversación antes de que despegue.'
              : 'Get to the conversation before it takes off.'}
          </p>
        </motion.div>

        {/* Card 2: CREA */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group relative bg-[#141414] hover:bg-[#1a1a1a] rounded-[28px] sm:rounded-[32px] py-8 sm:py-9 md:py-10 px-5 sm:px-6 md:px-7 flex flex-col items-center text-center justify-center transition-colors duration-250 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.6)] cursor-default"
        >
          {/* Badge Icon: Warm Orange Surface */}
          <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-[18px] bg-[#2d1810] flex items-center justify-center mb-6 sm:mb-7 transition-colors">
            <LayoutGrid className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-[#ea4325]" strokeWidth={2} />
          </div>

          <h3 className="font-['Manrope',sans-serif] font-[700] text-base sm:text-lg tracking-[0.05em] text-[#ffffff] uppercase mb-2 sm:mb-2.5">
            {isEs ? 'CREA' : 'CREATE'}
          </h3>

          <p className="font-['Inter',sans-serif] font-[400] text-xs sm:text-[13px] md:text-[14px] text-[#8D8F93] leading-relaxed max-w-[220px] mx-auto">
            {isEs
              ? 'Piezas relevantes a conversaciones que ya son tendencia.'
              : 'Relevant content for conversations that are already trending.'}
          </p>
        </motion.div>

        {/* Card 3: ESCALA */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group relative bg-[#141414] hover:bg-[#1a1a1a] rounded-[28px] sm:rounded-[32px] py-8 sm:py-9 md:py-10 px-5 sm:px-6 md:px-7 flex flex-col items-center text-center justify-center transition-colors duration-250 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.6)] cursor-default"
        >
          {/* Badge Icon: Rising Yellow Surface */}
          <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-[18px] bg-[#2b250d] flex items-center justify-center mb-6 sm:mb-7 transition-colors">
            <EscalaIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-[#eab308]" />
          </div>

          <h3 className="font-['Manrope',sans-serif] font-[700] text-base sm:text-lg tracking-[0.05em] text-[#ffffff] uppercase mb-2 sm:mb-2.5">
            {isEs ? 'ESCALA' : 'SCALE'}
          </h3>

          <p className="font-['Inter',sans-serif] font-[400] text-xs sm:text-[13px] md:text-[14px] text-[#8D8F93] leading-relaxed max-w-[210px] mx-auto">
            {isEs
              ? 'Invierte solo en lo que mejor funciona.'
              : 'Invest only in what works best.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}