import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, LayoutGrid } from 'lucide-react';

/**
 * EscalaIcon Component
 * Matches the ascending arrow & bar chart icon in official Tier 3 Rising Yellow.
 */
function EscalaIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7 text-[#ffbf00]' }) {
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
 * Calibrated strictly to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: none, rounded-[24px])
 * - Depth created purely through surface contrast, never with outlines or strokes
 * - Level 3 Subtle Hover State (#1e1e1e / #212121, subtle lift)
 * - Brand Typography: Manrope (headings) & Inter (body / labels)
 * - Heat Scale Tiers: Red #ff453a, Orange #ea4325, Yellow #ffbf00
 */
export default function SectionTwoOverview({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
      {/* 1. Top Flame Comet with Flare + "Meet brandheat." Title */}
      <div className="flex flex-col items-center">
        <div className="relative w-28 sm:w-36 md:w-40 h-6 sm:h-7 md:h-8 mx-auto flex items-center justify-center mb-1">
          <img
            src="/heat.png"
            alt="Brand HEAT Comet"
            className="w-full h-full object-contain filter-none pointer-events-none select-none"
          />
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white blur-[0.8px] shadow-[0_0_10px_5px_rgba(255,255,255,0.9)] pointer-events-none" />
        </div>

        <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-[1.12] tracking-[-0.03em] text-[#ffffff] text-center">
          <span className="font-[200] text-[#ffffff]">Meet brand</span>
          <span className="font-[800] text-[#ffffff]">heat.</span>
        </h2>
      </div>

      {/* 2. Primary Tagline (High-Readability Content #E1E1E1 in Manrope) */}
      <p className="mt-2 sm:mt-2.5 font-['Manrope',sans-serif] text-base sm:text-lg md:text-xl lg:text-[22px] font-[500] text-[#E1E1E1] tracking-[-0.02em] text-center max-w-3xl">
        {isEs
          ? 'El always on que sigue el ritmo de la conversación.'
          : 'The always-on that keeps pace with the conversation.'}
      </p>

      {/* 3. Secondary Explanatory Copy (#C5C5C5 in Inter) */}
      <div className="mt-2 sm:mt-2.5 font-['Inter',sans-serif] text-xs sm:text-sm md:text-[14px] font-[500] text-[#C5C5C5] leading-relaxed tracking-[-0.01em] text-center max-w-2xl mx-auto space-y-0.5">
        <p>
          {isEs
            ? 'Una sola plataforma para detectar, crear, publicar y medir en tiempo real.'
            : 'One platform to detect, create, publish and measure in real time.'}
        </p>
        <p>
          {isEs
            ? 'Sin brief. Sin esperas. Sin llegar tarde.'
            : 'No brief. No waiting. No showing up late.'}
        </p>
      </div>

      {/* 4. Three Level 2 Modular Feature Cards (#151515, border: none, rounded-[24px]) */}
      <div className="mt-5 sm:mt-6 md:mt-7 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full max-w-4xl lg:max-w-5xl mx-auto">
        {/* Card 1: ANTICIPA (Tier 1 Hot Variant) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="group relative bg-[#151515] hover:bg-[#1e1e1e] rounded-[24px] p-4 sm:p-5 md:p-6 flex flex-row md:flex-col items-center text-left md:text-center transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] cursor-default"
        >
          {/* Badge Icon: Hot Red Surface (No stroke) */}
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl bg-[#260c10] flex items-center justify-center mr-3.5 md:mr-0 md:mb-3.5 transition-transform duration-300 shadow-[0_0_16px_rgba(255,69,58,0.2)]">
            <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff453a]" strokeWidth={2} />
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base md:text-lg tracking-[0.04em] text-[#ffffff] uppercase mb-1 md:mb-1.5">
              {isEs ? 'ANTICIPA' : 'ANTICIPATE'}
            </h3>
            <p className="font-['Inter',sans-serif] font-[500] text-xs sm:text-[13px] md:text-sm text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed max-w-[220px] transition-colors">
              {isEs
                ? 'Llega antes a la conversación antes de que despegue.'
                : 'Get to the conversation before it takes off.'}
            </p>
          </div>
        </motion.div>

        {/* Card 2: CREA (Tier 2 Warm / Brand Orange Variant) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="group relative bg-[#151515] hover:bg-[#1e1e1e] rounded-[24px] p-4 sm:p-5 md:p-6 flex flex-row md:flex-col items-center text-left md:text-center transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] cursor-default"
        >
          {/* Badge Icon: Warm Orange Surface (No stroke) */}
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl bg-[#260f08] flex items-center justify-center mr-3.5 md:mr-0 md:mb-3.5 transition-transform duration-300 shadow-[0_0_16px_rgba(234,67,37,0.2)]">
            <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea4325]" strokeWidth={2} />
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base md:text-lg tracking-[0.04em] text-[#ffffff] uppercase mb-1 md:mb-1.5">
              {isEs ? 'CREA' : 'CREATE'}
            </h3>
            <p className="font-['Inter',sans-serif] font-[500] text-xs sm:text-[13px] md:text-sm text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed max-w-[220px] transition-colors">
              {isEs
                ? 'Piezas relevantes a conversaciones que ya son tendencia.'
                : 'Relevant content for conversations that are already trending.'}
            </p>
          </div>
        </motion.div>

        {/* Card 3: ESCALA (Tier 3 Rising Yellow Variant) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="group relative bg-[#151515] hover:bg-[#1e1e1e] rounded-[24px] p-4 sm:p-5 md:p-6 flex flex-row md:flex-col items-center text-left md:text-center transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] cursor-default"
        >
          {/* Badge Icon: Rising Yellow Surface (No stroke) */}
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl bg-[#261c00] flex items-center justify-center mr-3.5 md:mr-0 md:mb-3.5 transition-transform duration-300 shadow-[0_0_16px_rgba(255,191,0,0.2)]">
            <EscalaIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffbf00]" />
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base md:text-lg tracking-[0.04em] text-[#ffffff] uppercase mb-1 md:mb-1.5">
              {isEs ? 'ESCALA' : 'SCALE'}
            </h3>
            <p className="font-['Inter',sans-serif] font-[500] text-xs sm:text-[13px] md:text-sm text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed max-w-[220px] transition-colors">
              {isEs
                ? 'Invierte solo en lo que mejor funciona.'
                : 'Invest only in what works best.'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
