import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import './SectionSixFounders.css';

/**
 * SectionSixFounders Component
 * Renders Section 6: "Founder member"
 * Built strictly according to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: none, rounded-[24px])
 * - Depth created purely through surface contrast, never with outlines or strokes
 * - Level 3 Sub-containers (#212121) for avatar placeholder boxes and subtle hover state
 * - Level 4 Modal (#161618, backdrop-filter: blur(20px))
 * - Level 4 Active Option surface (#44251c) for warm orange accents and badges
 * - The ONE Brand Orange: #ea4325
 * - Typography: Manrope (headings / names) & Inter (body / roles / bio)
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
      role: isEs ? 'Creatividad Multimodal' : 'Multimodal Creative Lead',
      tag: isEs ? 'IA Creativa' : 'Generative AI',
      initials: 'SC',
      bio: isEs
        ? 'Pionera en dirección de arte generativa y flujos de trabajo con inteligencia artificial. Diseñando los motores creativos automatizados que alimentan Creative Studio.'
        : 'Pioneer in generative art direction and AI-assisted workflows. Architecting the automated creative engines behind Creative Studio.',
    },
    {
      id: 5,
      name: 'David Silva',
      role: isEs ? 'Medios & Rendimiento' : 'Media & Performance',
      tag: isEs ? 'Growth & Paid' : 'Growth & Paid Media',
      initials: 'DS',
      bio: isEs
        ? 'Experto en adquisición de audiencias, modelos algorítmicos y pauta automatizada. Optimizando conversión y retorno publicitario para marcas líderes en mercados globales.'
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
    <div className="section-six-container">
      {/* 1. Header Title: Founder member in Manrope */}
      <h2 className="section-six-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
        {isEs ? 'Founder member' : 'Founder member'}
      </h2>

      {/* 2. Horizontal Row of 5 Founder Tiles (Level 2 Parent Cards #151515, border: none, rounded-[24px]) */}
      <div className="section-six-grid">
        {founders.map((founder) => (
          <motion.button
            key={founder.id}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={() => setSelectedFounder(founder)}
            className="group section-six-tile"
            aria-label={`View bio for ${founder.name}`}
          >
            {/* Founder Avatar Placeholder: Level 3 Inner Container #212121, rounded-[16px] */}
            <div className="section-six-avatar">
              <span className="section-six-avatar-initials">
                {founder.initials}
              </span>
            </div>

            {/* Founder Name & Micro Role */}
            <h3 className="section-six-name">
              {founder.name}
            </h3>
            <p className="section-six-tag">
              {founder.tag}
            </p>
          </motion.button>
        ))}
      </div>

      {/* 3. Subtle Hint beneath in Inter */}
      <p className="section-six-hint">
        {isEs ? 'Haz clic en un fundador para conocer su bio' : 'Click on a founder to view their bio'}
      </p>

      {/* 4. Subtle Back to start button */}
      <div className="section-six-back-container">
        <button
          type="button"
          onClick={onBackToStart}
          className="section-six-back-btn"
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
                className="section-six-modal-overlay"
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="section-six-modal-card"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedFounder(null)}
                    className="section-six-modal-close"
                    aria-label="Close bio"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                    {/* Founder Image Placeholder */}
                    <div className="section-six-modal-avatar">
                      <span className="font-['Manrope',sans-serif] font-[700] text-2xl sm:text-3xl text-[#ffffff]">
                        {selectedFounder.initials}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      {/* Tag Badge: Warm Dark Surface #44251c + #ea4325 text */}
                      <span className="section-six-modal-badge">
                        {selectedFounder.tag}
                      </span>

                      <h3 className="font-['Manrope',sans-serif] font-[700] text-xl sm:text-2xl text-[#ffffff] tracking-[-0.02em]">
                        {selectedFounder.name}
                      </h3>

                      <p className="font-['Inter',sans-serif] font-[500] text-xs sm:text-sm text-[#ea4325] mt-0.5">
                        {selectedFounder.role}
                      </p>
                    </div>
                  </div>

                  {/* Founder Bio Text: Content #E1E1E1 in Inter */}
                  <p className="section-six-modal-bio">
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
