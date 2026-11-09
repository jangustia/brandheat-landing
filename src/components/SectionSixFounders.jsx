import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, RotateCcw } from 'lucide-react';

/**
 * SectionSixFounders Component
 * Renders Section 6: "Founder member"
 * - Displays 5 founder tiles in a horizontal grid.
 * - Clicking any tile opens an interactive detail modal with founder image,
 *   name, role, tag, and bio.
 * - Uses high-end placeholder imagery and text.
 */
export default function SectionSixFounders({ currentLang = 'es', onBackToStart }) {
  const isEs = currentLang === 'es';
  const [selectedFounder, setSelectedFounder] = useState(null);

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

  // Cascading animation variants
  const cascadeContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(14px)',
      y: -24,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeHeader = {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeTile = {
    hidden: { opacity: 0, y: 22, scale: 0.94, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
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
      {/* 1. Header Title: Founder member */}
      <motion.h2
        variants={cascadeHeader}
        className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[500] tracking-[-0.02em] text-white text-center"
      >
        {isEs ? 'Founder member' : 'Founder member'}
      </motion.h2>

      {/* 2. Horizontal Row of 5 Founder Tiles */}
      <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 w-full max-w-4xl lg:max-w-5xl mx-auto">
        {founders.map((founder) => (
          <motion.button
            key={founder.id}
            type="button"
            variants={cascadeTile}
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFounder(founder)}
            className="group relative aspect-square w-full rounded-[22px] sm:rounded-[26px] bg-[#111115]/90 hover:bg-[#16161c] border border-white/[0.08] hover:border-[#FF6637]/40 p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6637]/40"
            aria-label={`View bio for ${founder.name}`}
          >
            {/* Founder Avatar Placeholder */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] border border-white/[0.1] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-[#FF6637]/40 transition-all duration-300 shadow-inner">
              <span className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base text-white/70 group-hover:text-white transition-colors">
                {founder.initials}
              </span>
            </div>

            {/* Founder Name & Micro Role */}
            <h3 className="font-['Manrope',sans-serif] font-[700] text-xs sm:text-sm text-white tracking-[-0.01em] line-clamp-1 group-hover:text-[#FF6637] transition-colors">
              {founder.name}
            </h3>
            <p className="mt-1 font-['Manrope',sans-serif] font-[300] text-[10px] sm:text-[11px] text-white/50 tracking-[-0.01em] line-clamp-1">
              {founder.tag}
            </p>
          </motion.button>
        ))}
      </div>

      {/* 3. Subtle Hint beneath */}
      <motion.p
        variants={cascadeHeader}
        className="mt-6 text-[11px] sm:text-xs font-['Manrope',sans-serif] text-white/40 tracking-wide select-none"
      >
        {isEs ? 'Haz clic en un fundador para conocer su bio' : 'Click on a founder to view their bio'}
      </motion.p>

      {/* 4. Subtle Back to start button */}
      <motion.div variants={cascadeHeader} className="mt-4 sm:mt-6">
        <button
          type="button"
          onClick={onBackToStart}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Manrope',sans-serif] text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
        </button>
      </motion.div>

      {/* ========================================================
          INTERACTIVE BIO MODAL OVERLAY
         ======================================================== */}
      <AnimatePresence>
        {selectedFounder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFounder(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#121217] border border-white/[0.14] rounded-[28px] p-6 sm:p-8 text-left shadow-[0_24px_80px_rgba(0,0,0,0.85)] cursor-default overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedFounder(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer focus:outline-none"
                aria-label="Close bio"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                {/* Founder Image Placeholder */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#FF6637]/20 via-[#D70417]/10 to-transparent border border-white/[0.12] flex items-center justify-center shadow-lg">
                  <span className="font-['Manrope',sans-serif] font-[800] text-2xl sm:text-3xl text-white">
                    {selectedFounder.initials}
                  </span>
                </div>

                <div className="flex flex-col">
                  {/* Tag Badge */}
                  <span className="inline-block self-start text-[10px] font-['Manrope'] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#FF6637]/15 text-[#FF6637] border border-[#FF6637]/25 mb-1.5">
                    {selectedFounder.tag}
                  </span>

                  <h3 className="font-['Manrope',sans-serif] font-[800] text-xl sm:text-2xl text-white tracking-[-0.02em]">
                    {selectedFounder.name}
                  </h3>

                  <p className="font-['Manrope',sans-serif] font-[500] text-xs sm:text-sm text-[#FF6637] mt-0.5">
                    {selectedFounder.role}
                  </p>
                </div>
              </div>

              {/* Founder Bio Text */}
              <p className="mt-5 pt-5 border-t border-white/[0.08] font-['Manrope',sans-serif] font-[300] text-xs sm:text-sm text-white/75 leading-relaxed tracking-[-0.01em]">
                {selectedFounder.bio}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
