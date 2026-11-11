import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Lightbulb, SwatchBook, Rocket, BarChart3 } from 'lucide-react';
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
    <div className="section-three-container">
      {/* 1. Header: Headline & Standardized Subheadline */}
      <div className="flex flex-col items-center">
        <h2 className="section-three-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
          <span className="section-three-title-light">
            {isEs ? 'Cómo funciona: ' : 'How It Works: '}
          </span>
          <span className="section-three-title-bold">
            From spark to screen.
          </span>
        </h2>

        <p className="section-three-sub text-base sm:text-lg lg:text-[20px]">
          {isEs
            ? 'Tu marca, siempre a tiempo. Siempre al punto. Always on.'
            : 'Your brand, always on time. Always on point. Always on.'}
        </p>
      </div>

      {/* 2. Grid of Feature Cards (Icons on left, border: none) */}
      <div className="section-three-cards-wrapper" onScroll={handleScroll}>
        {/* Row 1: Cards 1 and 2 */}
        <div className="section-three-row">
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              {cards[0].icon}
            </div>
            <div className="section-three-card-content">
              <h3 className="section-three-card-title">
                {cards[0].title}
              </h3>
              <p className="section-three-card-text">
                {cards[0].text}
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              {cards[1].icon}
            </div>
            <div className="section-three-card-content">
              <h3 className="section-three-card-title">
                {cards[1].title}
              </h3>
              <p className="section-three-card-text">
                {cards[1].text}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Cards 3 and 4 */}
        <div className="section-three-row">
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              {cards[2].icon}
            </div>
            <div className="section-three-card-content">
              <h3 className="section-three-card-title">
                {cards[2].title}
              </h3>
              <p className="section-three-card-text">
                {cards[2].text}
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="group section-three-card"
          >
            <div className="section-three-icon-box">
              {cards[3].icon}
            </div>
            <div className="section-three-card-content">
              <h3 className="section-three-card-title">
                {cards[3].title}
              </h3>
              <p className="section-three-card-text">
                {cards[3].text}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 3: Card 5 (Full Width Card) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="group section-three-card w-full"
        >
          <div className="section-three-icon-box">
            {cards[4].icon}
          </div>
          <div className="section-three-card-content">
            <h3 className="section-three-card-title">
              {cards[4].title}
            </h3>
            <p className="section-three-card-text section-three-card-text-wide">
              {cards[4].text}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile Swipe Pagination Dots (5 cards) */}
      <div className="flex md:hidden items-center justify-center gap-1.5 mt-2" aria-hidden="true">
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
      </div>
    </div>
  );
}
