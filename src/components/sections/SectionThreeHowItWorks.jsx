import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Lightbulb, SwatchBook, Rocket, BarChart3 } from 'lucide-react';
import './SectionThreeHowItWorks.css';

/**
 * SectionThreeHowItWorks Component
 * Calibrated strictly to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: none, rounded-[24px])
 * - Depth created purely through surface contrast, never with outlines or strokes
 * - Level 3 Subtle Hover State (#1e1e1e / #212121, subtle lift)
 * - Brand Typography: Manrope (headings) & Inter (body / labels)
 */
export default function SectionThreeHowItWorks({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  return (
    <div className="section-three-container">
      {/* 1. Header: Headline & Subheadline */}
      <div className="flex flex-col items-center">
        <h2 className="section-three-title text-2xl sm:text-3xl md:text-4xl lg:text-[38px]">
          <span className="section-three-title-light">
            {isEs ? 'Cómo funciona: ' : 'How it Works: '}
          </span>
          <span className="section-three-title-bold">
            From spark to screen.
          </span>
        </h2>

        <p className="section-three-sub">
          {isEs
            ? 'Tu marca, siempre a tiempo. Siempre al punto. Always on.'
            : 'Your Brand, always on time. Always on point. Always on.'}
        </p>
      </div>

      {/* 2. Grid of 5 Level 2 Feature Cards (#151515, border: none, rounded-[24px]) */}
      <div className="section-three-cards-wrapper">
        {/* Row 1: Cards 1 and 2 */}
        <div className="section-three-row">
          {/* Card 1: HEAT Map */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>

            <div className="flex flex-col">
              <h3 className="section-three-card-title sm:text-base">
                1. HEAT Map
              </h3>
              <p className="section-three-card-text">
                {isEs
                  ? 'Una sola plataforma para detectar, crear, publicar y medir en tiempo real. Sin brief. Sin esperas. Sin llegar tarde.'
                  : 'One platform to detect, create, publish, and measure in real time. No brief. No waiting. No showing up late.'}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Ideas */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="section-three-card-title sm:text-base">
                2. Ideas
              </h3>
              <p className="section-three-card-text">
                {isEs
                  ? 'Lo que tu marca tiene para decir. Varias puntas creativas por tema.'
                  : 'What your brand has to say. Multiple creative angles per topic.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Cards 3 and 4 */}
        <div className="section-three-row">
          {/* Card 3: Creative Studio */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              <SwatchBook className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="section-three-card-title sm:text-base">
                3. Creative Studio
              </h3>
              <p className="section-three-card-text">
                {isEs
                  ? 'De la idea a la pieza creativa en minutos. Video, imagen y texto listos para publicar.'
                  : 'From idea to creative asset in minutes. Video, image, and copy ready to publish.'}
              </p>
            </div>
          </motion.div>

          {/* Card 4: Campaigns */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="section-three-card-title sm:text-base">
                4. Campaigns
              </h3>
              <p className="section-three-card-text">
                {isEs
                  ? 'Siente el pulso de las redes, crea, publica, prueba, y pauta. Todo en la misma plataforma.'
                  : 'Feel the pulse of social, create, publish, test, and run paid media. All on the same platform.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 3: Card 5 (Full Width Level 2 Card, No stroke) */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group section-three-card w-full"
        >
          <div className="section-three-icon-box">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
          </div>

          <div className="flex flex-col">
            <h3 className="section-three-card-title sm:text-base">
              5. Analytics
            </h3>
            <p className="section-three-card-text">
              {isEs
                ? 'Entiende qué rindió y por qué. No es solo un reporte, sino recomendaciones para la mejora continua de tus campañas.'
                : 'Understand what performed and why. Not just a report, but recommendations for continuous campaign improvement.'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

