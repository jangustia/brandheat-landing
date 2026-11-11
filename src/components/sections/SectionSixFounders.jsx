import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import './SectionSixFounders.css';

/**
 * SectionSixFounders Component
 * Renders Section 6: "FOUNDING TEAM: THE IGNITERS"
 * Built strictly according to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: none, rounded-[24px])
 * - Depth created purely through surface contrast, never with outlines or strokes
 * - Level 3 Sub-containers (#212121) for avatar portrait boxes
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
      name: 'Fernando Vega Olmos',
      role: isEs ? 'Creatividad & Estrategia Cultural' : 'Creative & Cultural Strategy',
      tag: isEs ? 'Creatividad & Cultura' : 'Creativity & Culture',
      initials: 'FVO',
      image: '/founders/fernando.png',
      bio: isEs
        ? 'Uno de los líderes creativos más influyentes de América Latina. Fundador de agencias icónicas como VegaOlmosPonce, LOLA y Picnic, lideró proyectos globales de construcción de marca para grandes compañías, entre ellas Unilever. Ex Worldwide Chief Creative Officer de JWT y de Lowe, es reconocido mundialmente por haber marcado el pensamiento creativo moderno y la estrategia cultural de marcas.'
        : 'One of Latin America\'s most influential creative leaders. Founder of iconic agencies like VegaOlmosPonce, LOLA, and Picnic, he led global brand-building initiatives for top enterprises including Unilever. Former Worldwide Chief Creative Officer at JWT and Lowe, globally recognized for shaping modern creative thinking and cultural brand strategy.',
    },
    {
      id: 2,
      name: 'Nacho Zuccarino',
      role: isEs ? 'Estrategia de Marca & IA' : 'Brand Strategy & AI',
      tag: isEs ? 'Marca & Innovación' : 'Brand & Innovation',
      initials: 'NZ',
      image: '/founders/nacho.png',
      bio: isEs
        ? 'Multipremiado líder en marca e innovación, que desarrolló iniciativas globales para compañías como Google, Netflix y SpaceX. Ex ejecutivo de la industria tecnológica y asesor de equipos directivos, es orador TEDx y pionero en la aplicación de la inteligencia artificial a la estrategia de marca y la inteligencia cultural.'
        : 'Multi-award-winning brand and innovation leader who spearheaded global initiatives for Google, Netflix, and SpaceX. Former tech executive and board advisor, TEDx speaker, and pioneer in applying artificial intelligence to brand strategy and cultural intelligence.',
    },
    {
      id: 3,
      name: 'Sole D’Agostino',
      role: isEs ? 'Liderazgo de Producto & IA' : 'Product Leadership & AI',
      tag: isEs ? 'Producto & IA' : 'Product & AI',
      initials: 'SD',
      image: '/founders/sole.jpg',
      bio: isEs
        ? 'Ejecutiva de producto con más de 15 años de experiencia escalando plataformas de 0 a 1 en IA y medios. Lideró 4 lanzamientos de producto en YouTube, el escalamiento de YouTube Live y el lanzamiento del Google Pixel Fold. Graduada del programa CPO del MIT y ganadora del Fire Hydrant Award; fundadora de Sidereal, donde guía a startups de alto crecimiento en su transformación con IA.'
        : 'Product executive with 15+ years scaling 0-to-1 platforms in AI and media. Led 4 major product launches at YouTube, the scaling of YouTube Live, and the launch of Google Pixel Fold. MIT CPO graduate, Fire Hydrant Award recipient, and founder of Sidereal, guiding high-growth startups through AI transformation.',
    },
    {
      id: 4,
      name: 'Trini Vega Olmos',
      role: isEs ? 'Estrategia de Comunicación' : 'Communication Strategy',
      tag: isEs ? 'Comunicación & Producción' : 'Communication & Production',
      initials: 'TVO',
      image: '/founders/trini.png',
      bio: isEs
        ? 'Estratega de comunicación y productora independiente, con trayectoria en publicidad, medios y producción. Lideró proyectos de lanzamiento de marcas e innovación en Argentina y a nivel internacional, combinando visión estratégica, ejecución creativa y espíritu emprendedor.'
        : 'Communication strategist and independent producer with extensive background across advertising, media, and production. Led brand launch and innovation projects across Argentina and globally, uniting strategic vision, creative execution, and entrepreneurial drive.',
    },
    {
      id: 5,
      name: 'Matias Molinas',
      role: isEs ? 'Ingeniería en IA & ML' : 'AI & ML Engineering',
      tag: isEs ? 'IA & Machine Learning' : 'AI & Machine Learning',
      initials: 'MM',
      image: '/founders/matias.png',
      bio: isEs
        ? 'Primer Google Developer Expert para YouTube de América y uno de los dos primeros del mundo, reconocimiento que obtuvo por su contribución a una aplicación open source de recomendación de videos de YouTube. Desde hace diez años trabaja en inteligencia artificial y machine learning en startups.'
        : 'First Google Developer Expert for YouTube in the Americas and one of the first two worldwide, earned for his contribution to an open-source YouTube video recommendation engine. Over a decade engineering artificial intelligence and machine learning architectures for startups.',
    },
    {
      id: 6,
      name: 'Eugenio Borzone',
      role: isEs ? 'Investigación en IA & Grafos' : 'AI Research & Graph Systems',
      tag: isEs ? 'IA & Redes Neuronales' : 'AI & Neural Networks',
      initials: 'EB',
      image: '/founders/euge.png',
      bio: isEs
        ? 'Doctorado en Inteligencia Artificial, con investigaciones publicadas en IEEE Transactions. Se especializa en redes neuronales en grafos y sistemas agenticos. Docente en la UNL, con experiencia en analítica predictiva y optimización de procesos.'
        : 'PhD in Artificial Intelligence with published research in IEEE Transactions. Specializes in graph neural networks and agentic systems. Professor at UNL with deep expertise in predictive analytics and process optimization.',
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
      {/* 1. Header Title: FOUNDING TEAM: THE IGNITERS */}
      <div className="flex flex-col items-center">
        <h2 className="section-six-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
          <span className="section-six-title-light">FOUNDING TEAM: </span>
          <span className="section-six-title-bold">THE IGNITERS</span>
        </h2>

        {/* 2. Subtitle copy */}
        <p className="section-six-subheadline">
          {isEs
            ? 'Un equipo que ha construido marcas, escalado tecnología y operado en la intersección entre creatividad y cultura, a nivel global.'
            : 'A team that has built brands, scaled technology, and operated at the intersection of creativity and culture globally.'}
        </p>
      </div>

      {/* 3. Horizontal Row of 6 Founder Tiles (Level 2 Parent Cards #151515, border: none, rounded-[24px]) */}
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
            {/* Founder Avatar with real photograph */}
            <div className="section-six-avatar">
              <img
                src={founder.image}
                alt={founder.name}
                className="section-six-avatar-img"
                loading="lazy"
              />
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

      {/* 4. Subtle Hint beneath in Inter */}
      <p className="section-six-hint">
        {isEs ? 'Haz clic en un fundador para conocer su bio' : 'Click on a founder to view their bio'}
      </p>

      {/* 5. Subtle Back to start button */}
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
                    {/* Founder Image in Modal */}
                    <div className="section-six-modal-avatar">
                      <img
                        src={selectedFounder.image}
                        alt={selectedFounder.name}
                        className="section-six-modal-avatar-img"
                      />
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
