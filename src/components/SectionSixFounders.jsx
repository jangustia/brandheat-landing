import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

/**
 * SectionSixFounders Component
 * Renders Section 6: "Founder member"
 * Built strictly according to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: 1px solid rgba(255,255,255,0.07), rounded-[24px])
 * - Level 3 Sub-containers (#212121) for avatar placeholder boxes and hover state
 * - Level 4 Modal (#161618, backdrop-filter: blur(20px), border: 1px solid rgba(255,255,255,0.08))
 * - Level 4 Active Option surface (#44251c) for warm orange accents and badges
 * - The ONE Brand Orange: #ea4325
 * - Typography: Poppins font family, Primary #ffffff, Content #E1E1E1, Muted #8D8F93
 * - Small Text Rule: font-weight: 500 on all text < 14px
 */
export default function SectionSixFounders({ currentLang = 'es', onBackToStart }) {
  const isEs = currentLang === 'es';

  const founders = [
    {
      id: 1,
      name: 'Juan Angustia',
      role: isEs ? 'Co-Fundador & Head of Design' : 'Co-Founder & Head of Design',
      tag: isEs ? 'Diseño & Estrategia' : 'Design & Strategy',
      initials: 'JA',
      bio: isEs
        ? 'Líder en diseño de producto y experiencia con trayectoria transformando marcas tecnológicas de alto impacto. Dirigiendo la visión creativa y los sistemas de interfaz en Brand HEAT.'
        : 'Product design and experience leader with a track record transforming high-impact tech brands. Driving creative vision and interface systems at Brand HEAT.',
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: isEs ? 'Co-Fundadora & CEO' : 'Co-Founder & CEO',
      tag: isEs ? 'Negocio & Crecimiento' : 'Business & Growth',
      initials: 'ER',
      bio: isEs
        ? 'Estratega de negocios y emprendedora serial en la industria publicitaria. Especializada en escalamiento de modelos de suscripción y alianzas estratégicas con marcas globales.'
        : 'Business strategist and serial entrepreneur in advertising. Specialized in scaling subscription models and strategic partnerships with global brands.',
    },
    {
      id: 3,
      name: 'Mateo Morales',
      role: isEs ? 'Co-Fundador & CTO' : 'Co-Founder & CTO',
      tag: isEs ? 'IA & Arquitectura' : 'AI & Systems Architecture',
      initials: 'MM',
      bio: isEs
        ? 'Arquitecto de sistemas distribuidos y modelos de machine learning en tiempo real. Creador de los algoritmos de detección temprana de tendencias que potencian HEAT Map.'
        : 'Distributed systems architect and real-time machine learning specialist. Creator of the early trend detection algorithms powering HEAT Map.',
    },
    {
      id: 4,
      name: 'Sofia Chen',
      role: isEs ? 'Co-Fundadora & Head of Creative AI' : 'Co-Founder & Head of Creative AI',
      tag: isEs ? 'Creatividad Multimodal' : 'Multimodal Creative',
      initials: 'SC',
      bio: isEs
        ? 'Directora creativa enfocada en la intersección de modelos generativos visuales y cultura pop. Diseñando flujos de trabajo que van de la chispa al contenido en segundos.'
        : 'Creative director focused on the intersection of visual generative models and pop culture. Designing workflows that go from spark to content in seconds.',
    },
    {
      id: 5,
      name: 'David Silva',
      role: isEs ? 'Co-Fundador & Head of Growth' : 'Co-Founder & Head of Growth',
      tag: isEs ? 'Medios & Rendimiento' : 'Media & Performance',
      initials: 'DS',
      bio: isEs
        ? 'Experto en adquisición de audiencias, análisis algorítmico y pauta automatizada. Optimizando la conversión y el ROI para marcas líderes en múltiples mercados.'
        : 'Expert in audience acquisition, algorithmic analysis, and automated ad delivery. Optimizing conversion and ROI for leading brands across global markets.',
    },
  ];

  const [selectedFounder, setSelectedFounder] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fId = params.get('founder');
      if (fId) {
        return founders.find((f) => f.id === parseInt(fId, 10)) || null;
      }
    }
    return null;
  });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
      {/* 1. Header Title: Founder member */}
      <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[600] tracking-[-0.02em] text-[#ffffff] text-center">
        {isEs ? 'Founder member' : 'Founder member'}
      </h2>

      {/* 2. Horizontal Row of 5 Founder Tiles (Level 2 Parent Cards #151515, rounded-[24px]) */}
      <div className="mt-6 sm:mt-7 md:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5 md:gap-4 w-full max-w-4xl lg:max-w-5xl mx-auto">
        {founders.map((founder) => (
          <motion.button
            key={founder.id}
            type="button"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedFounder(founder)}
            className="group relative aspect-square w-full rounded-[24px] bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.30)] p-3 sm:p-4 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ea4325]/40"
            aria-label={`View bio for ${founder.name}`}
          >
            {/* Founder Avatar Placeholder: Level 3 Inner Container #212121, rounded-[16px] */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-[16px] bg-[#212121] group-hover:bg-[#272727] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(234,67,37,0.30)] flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-105 transition-all duration-300 shadow-inner">
              <span className="font-['Poppins',sans-serif] font-[700] text-sm sm:text-base text-[#ffffff] transition-colors">
                {founder.initials}
              </span>
            </div>

            {/* Founder Name & Micro Role */}
            <h3 className="font-['Poppins',sans-serif] font-[700] text-xs sm:text-sm text-[#ffffff] tracking-[-0.01em] line-clamp-1 group-hover:text-[#ea4325] transition-colors">
              {founder.name}
            </h3>
            <p className="mt-0.5 sm:mt-1 font-['Poppins',sans-serif] font-[500] text-[10px] sm:text-[11px] text-[#8D8F93] tracking-[-0.01em] line-clamp-1">
              {founder.tag}
            </p>
          </motion.button>
        ))}
      </div>

      {/* 3. Subtle Hint beneath */}
      <p className="mt-4 sm:mt-5 text-xs font-['Poppins',sans-serif] font-[500] text-[#8D8F93] tracking-wide select-none">
        {isEs ? 'Haz clic en un fundador para conocer su bio' : 'Click on a founder to view their bio'}
      </p>

      {/* 4. Subtle Back to start button */}
      <div className="mt-3 sm:mt-4">
        <button
          type="button"
          onClick={onBackToStart}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Poppins',sans-serif] font-[500] text-[#8D8F93] hover:text-[#ffffff] transition-colors duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
        </button>
      </div>

      {/* ========================================================
          INTERACTIVE BIO MODAL OVERLAY: Level 4 (#161618)
          Rendered via Portal to escape main's transform context
         ======================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedFounder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedFounder(null)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[20px] cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-6 sm:p-8 text-left shadow-[0_24px_80px_rgba(0,0,0,0.85)] cursor-default overflow-hidden"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedFounder(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#212121] hover:bg-[#272727] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8D8F93] hover:text-[#ffffff] transition-all cursor-pointer focus:outline-none"
                    aria-label="Close bio"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                    {/* Founder Image Placeholder */}
                    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] bg-gradient-to-br from-[#44251c] to-[#212121] border border-[rgba(234,67,37,0.30)] flex items-center justify-center shadow-lg">
                      <span className="font-['Poppins',sans-serif] font-[700] text-2xl sm:text-3xl text-[#ffffff]">
                        {selectedFounder.initials}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      {/* Tag Badge: Warm Dark Surface #44251c + #ea4325 text */}
                      <span className="inline-block self-start text-[11px] font-['Poppins',sans-serif] font-[600] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#44251c] text-[#ea4325] border border-[rgba(234,67,37,0.35)] mb-1.5">
                        {selectedFounder.tag}
                      </span>

                      <h3 className="font-['Poppins',sans-serif] font-[700] text-xl sm:text-2xl text-[#ffffff] tracking-[-0.02em]">
                        {selectedFounder.name}
                      </h3>

                      <p className="font-['Poppins',sans-serif] font-[500] text-xs sm:text-sm text-[#ea4325] mt-0.5">
                        {selectedFounder.role}
                      </p>
                    </div>
                  </div>

                  {/* Founder Bio Text: Content #E1E1E1 */}
                  <p className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.08)] font-['Poppins',sans-serif] font-[400] text-xs sm:text-sm text-[#E1E1E1] leading-relaxed tracking-[-0.01em]">
                    {selectedFounder.bio}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
