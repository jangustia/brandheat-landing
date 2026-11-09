import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, LayoutGrid } from 'lucide-react';

/**
 * EscalaIcon Component
 * Faithfully matches the exact ascending arrow & bar chart icon
 * from the Brand HEAT Section Two design.
 */
function EscalaIcon({ className = 'w-7 h-7 text-[#E5A93C]' }) {
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
      {/* Outer rounded window with open corner */}
      <path d="M11 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5" />
      {/* Ascending arrow bursting through top-right */}
      <polyline points="15 3 21 3 21 9" />
      <line x1="9" y1="15" x2="21" y2="3" />
      {/* Ascending bar chart columns */}
      <rect x="7" y="13.5" width="2" height="3.5" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="11" y="10.5" width="2" height="6.5" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="15" y="7.5" width="2" height="9.5" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * SectionTwoOverview Component
 * Renders the unified second section with a cascading waterfall animation:
 * 1. Top Flame graphic + "Meet brandheat."
 * 2. Tagline: "El always on que sigue el ritmo de la conversación."
 * 3. Subtext: "Una sola plataforma para detectar, crear, publicar y medir en tiempo real..."
 * 4. Three modular feature cards: ANTICIPA, CREA, ESCALA.
 */
export default function SectionTwoOverview({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  // Cascading container variant orchestrating waterfall children
  const cascadeContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(14px)',
      y: -24,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeItem = {
    hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeCard = {
    hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cascadeContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4"
    >
      {/* 1. Top Flame Comet with Flare + "Meet brandheat." Title */}
      <motion.div variants={cascadeItem} className="flex flex-col items-center">
        {/* Flame comet asset with bright flare tip */}
        <div className="relative w-32 sm:w-40 md:w-44 h-7 sm:h-8 md:h-9 mx-auto flex items-center justify-center mb-1">
          <img
            src="/heat.png"
            alt="Brand HEAT Comet"
            className="w-full h-full object-contain filter-none pointer-events-none select-none"
          />
          {/* Crisp white flare point at leading edge */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white blur-[0.8px] shadow-[0_0_12px_6px_rgba(255,255,255,0.9)] pointer-events-none" />
        </div>

        <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.12] tracking-[-0.03em] text-white text-center">
          <span className="font-[200] text-white">Meet brand</span>
          <span className="font-[800] text-white">heat.</span>
        </h2>
      </motion.div>

      {/* 2. Primary Tagline */}
      <motion.p
        variants={cascadeItem}
        className="mt-2.5 sm:mt-3 font-['Manrope',sans-serif] text-base sm:text-xl md:text-2xl lg:text-[25px] font-[400] text-white tracking-[-0.02em] text-center max-w-3xl"
      >
        {isEs
          ? 'El always on que sigue el ritmo de la conversación.'
          : 'The always-on that keeps pace with the conversation.'}
      </motion.p>

      {/* 3. Secondary Explanatory Copy */}
      <motion.div
        variants={cascadeItem}
        className="mt-2.5 sm:mt-3 font-['Manrope',sans-serif] text-xs sm:text-sm md:text-[15px] font-[300] text-white/65 leading-relaxed tracking-[-0.01em] text-center max-w-2xl mx-auto space-y-0.5"
      >
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
      </motion.div>

      {/* 4. Three Modular Feature Cards (ANTICIPA, CREA, ESCALA) */}
      <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6 w-full max-w-4xl lg:max-w-5xl mx-auto">
        {/* Card 1: ANTICIPA */}
        <motion.div
          variants={cascadeCard}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 flex flex-row md:flex-col items-center text-left md:text-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
        >
          {/* Badge Icon */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF453A]/15 border border-[#FF453A]/25 flex items-center justify-center mr-4 md:mr-0 md:mb-5 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,69,58,0.2)]">
            <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF5247]" strokeWidth={2} />
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-['Manrope',sans-serif] font-[800] text-sm sm:text-base md:text-lg tracking-[0.06em] text-white uppercase mb-1 md:mb-2">
              {isEs ? 'ANTICIPA' : 'ANTICIPATE'}
            </h3>
            <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] md:text-sm text-white/60 leading-relaxed max-w-[220px]">
              {isEs
                ? 'Llega antes a la conversación antes de que despegue.'
                : 'Get to the conversation before it takes off.'}
            </p>
          </div>
        </motion.div>

        {/* Card 2: CREA */}
        <motion.div
          variants={cascadeCard}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 flex flex-row md:flex-col items-center text-left md:text-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
        >
          {/* Badge Icon */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/25 flex items-center justify-center mr-4 md:mr-0 md:mb-5 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
            <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF7A00]" strokeWidth={2} />
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-['Manrope',sans-serif] font-[800] text-sm sm:text-base md:text-lg tracking-[0.06em] text-white uppercase mb-1 md:mb-2">
              {isEs ? 'CREA' : 'CREATE'}
            </h3>
            <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] md:text-sm text-white/60 leading-relaxed max-w-[220px]">
              {isEs
                ? 'Piezas relevantes a conversaciones que ya son tendencia.'
                : 'Relevant content for conversations that are already trending.'}
            </p>
          </div>
        </motion.div>

        {/* Card 3: ESCALA */}
        <motion.div
          variants={cascadeCard}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.25 }}
          className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 flex flex-row md:flex-col items-center text-left md:text-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
        >
          {/* Badge Icon */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E5A93C]/15 border border-[#E5A93C]/25 flex items-center justify-center mr-4 md:mr-0 md:mb-5 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(229,169,60,0.2)]">
            <EscalaIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#E5A93C]" />
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-['Manrope',sans-serif] font-[800] text-sm sm:text-base md:text-lg tracking-[0.06em] text-white uppercase mb-1 md:mb-2">
              {isEs ? 'ESCALA' : 'SCALE'}
            </h3>
            <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] md:text-sm text-white/60 leading-relaxed max-w-[220px]">
              {isEs
                ? 'Invierte solo en lo que mejor funciona.'
                : 'Invest only in what works best.'}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

