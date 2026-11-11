import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Lightbulb, SwatchBook, Rocket, BarChart3 } from 'lucide-react';
import { cascadeContainerVariants, cascadeItemVariants } from './cascadeVariants';
import './SectionThreeHowItWorks.css';

/**
 * SectionThreeHowItWorks Component
 * - Format: Icon on the left + title and text stacked on the right
 * - Clean surface contrast WITHOUT outline / borders (border: none)
 * - Typography: Manrope (headings) & Inter (subtitles / descriptions)
 */
export default function SectionThreeHowItWorks({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (!el) return;
    const cardWidth = el.scrollWidth / 5;
    if (cardWidth > 0) {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveCardIndex(Math.min(4, Math.max(0, idx)));
    }
  };

  const cards = [
    {
      id: 1,
      title: '1. HEAT Map',
      text: isEs
        ? 'Una sola plataforma para detectar, crear, publicar y medir en tiempo real. Sin brief. Sin esperas. Sin llegar tarde.'
        : 'One platform to detect, create, publish, and measure in real time. No brief. No waiting. No showing up late.',
      icon: <Flame className="section-three-icon fill-current" />,
    },
    {
      id: 2,
      title: '2. Ideas',
      text: isEs
        ? 'Lo que tu marca tiene para decir. Varias puntas creativas por tema.'
        : 'What your brand has to say. Multiple creative angles per topic.',
      icon: <Lightbulb className="section-three-icon" strokeWidth={1.85} />,
    },
    {
      id: 3,
      title: '3. Creative Studio',
      text: isEs
        ? 'De la idea a la pieza creativa en minutos. Video, imagen y texto listos para publicar.'
        : 'From idea to creative asset in minutes. Video, image, and copy ready to publish.',
      icon: <SwatchBook className="section-three-icon" strokeWidth={1.85} />,
    },
    {
      id: 4,
      title: '4. Campaigns',
      text: isEs
        ? 'Siente el pulso de las redes, crea, publica, prueba, y pauta. Todo en la misma plataforma.'
        : 'Feel the pulse of social, create, publish, test, and run paid media. All on the same platform.',
      icon: <Rocket className="section-three-icon" strokeWidth={1.85} />,
    },
    {
      id: 5,
      title: '5. Analytics',
      text: isEs
        ? 'Entiende qué rindió y por qué. No es solo un reporte, sino recomendaciones para la mejora continua de tus campañas.'
        : 'Understand what performed and why. Not just a report, but recommendations for continuous campaign improvement.',
      icon: <BarChart3 className="section-three-icon" strokeWidth={1.85} />,
    },
  ];

  return (
    <motion.div
      className="section-three-container"
      variants={cascadeContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 1. Header: Headline & Standardized Subheadline */}
      <motion.div variants={cascadeItemVariants} className="flex flex-col items-center">
        <h2 className="section-three-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
          <span className="section-three-title-light">
            {isEs ? 'Cómo funciona: ' : 'How It Works: '}
          </span>
          <span className="section-three-title-bold">
            From spark to screen.
          </span>
        </h2>

        {/* Subtitle: Always in English as requested */}
        <p className="section-three-sub text-base sm:text-lg lg:text-[20px]">
          Tu marca always on time. Always on point. Always on.
        </p>
      </motion.div>

      {/* 2. Proportional 5-Card Layout (Row 1: 3 cards, Row 2: 2 cards centered) */}
      <div className="section-three-cards-wrapper" onScroll={handleScroll}>
        {/* Row 1: Cards 1, 2, and 3 */}
        <div className="section-three-row-top">
          {cards.slice(0, 3).map((card) => (
            <motion.div key={card.id} variants={cascadeItemVariants} className="group section-three-card">
              <div className="section-three-icon-box">
                {card.icon}
              </div>
              <div className="section-three-card-content">
                <h3 className="section-three-card-title">
                  {card.title}
                </h3>
                <p className="section-three-card-text">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Cards 4 and 5 (Centered) */}
        <div className="section-three-row-bottom">
          {cards.slice(3, 5).map((card) => (
            <motion.div key={card.id} variants={cascadeItemVariants} className="group section-three-card">
              <div className="section-three-icon-box">
                {card.icon}
              </div>
              <div className="section-three-card-content">
                <h3 className="section-three-card-title">
                  {card.title}
                </h3>
                <p className="section-three-card-text">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Pagination Dots (5 cards) */}
      <motion.div
        variants={cascadeItemVariants}
        className="flex md:hidden items-center justify-center gap-1.5 mt-2"
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((idx) => (
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
