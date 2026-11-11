import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SectionOneHero.css';

/**
 * SectionOneHero Component
 * Stage 0: The Hook - Narrative hook loop with 3 rotating sentences.
 * Polished typography: Manrope (Thin 200 & Bold 700).
 */
export default function SectionOneHero({
  currentLang = 'es',
  hookSentenceIndex = 0,
  setHookSentenceIndex,
}) {
  const isEs = currentLang === 'es';

  const hookTextVariants = {
    initial: {
      opacity: 0,
      y: 12,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.18,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="section-one-container">
      <AnimatePresence mode="wait">
        {/* Sentence 1 */}
        {hookSentenceIndex === 0 && (
          <motion.div
            key={`hook-01-${currentLang}`}
            variants={hookTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full text-center"
          >
            <h1 className="section-one-headline text-2xl sm:text-3xl md:text-[44px] lg:text-[58px]">
              <div className="section-one-line">
                <span className="section-one-light">
                  {isEs ? '¿Cuánto tarda' : 'How long does it take'}
                </span>{' '}
                <span className="section-one-bold">
                  {isEs ? 'tu marca' : 'your brand'}
                </span>
              </div>
              <div className="section-one-line">
                <span className="section-one-light">
                  {isEs ? 'en subirse a una' : 'to jump on a'}
                </span>{' '}
                <span className="section-one-bold">
                  {isEs ? 'tendencia?' : 'trend?'}
                </span>
              </div>
            </h1>
          </motion.div>
        )}

        {/* Sentence 2 */}
        {hookSentenceIndex === 1 && (
          <motion.div
            key={`hook-02-${currentLang}`}
            variants={hookTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full text-center"
          >
            <h2 className="section-one-headline text-2xl sm:text-3xl md:text-[44px] lg:text-[58px]">
              <div className="section-one-line">
                <span className="section-one-light">
                  {isEs ? 'Una conversación que' : 'A conversation that'}
                </span>{' '}
                <span className="section-one-bold">
                  {isEs ? 'prendió,' : 'caught fire,'}
                </span>{' '}
                <span className="section-one-light">
                  {isEs ? 'escala en horas.' : 'escalates in hours.'}
                </span>
              </div>
              <div className="section-one-line">
                <span className="section-one-light">
                  {isEs ? 'Una campaña,' : 'A campaign,'}
                </span>{' '}
                <span className="section-one-bold">
                  {isEs ? 'tarda semanas...' : 'takes weeks...'}
                </span>
              </div>
            </h2>
          </motion.div>
        )}

        {/* Sentence 3 */}
        {hookSentenceIndex === 2 && (
          <motion.div
            key={`hook-03-${currentLang}`}
            variants={hookTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full text-center"
          >
            <h2 className="section-one-headline text-2xl sm:text-3xl md:text-[44px] lg:text-[58px]">
              <div className="section-one-line">
                <span className="section-one-light">
                  {isEs ? 'Ese gap es un problema' : 'That gap is a problem'}
                </span>{' '}
                <span className="section-one-bold">
                  {isEs ? 'cada vez más grande.' : 'getting bigger and bigger.'}
                </span>
              </div>
              <div className="section-one-line">
                <span className="section-one-bold">
                  {isEs ? 'Y más caro.' : 'And more expensive.'}
                </span>
              </div>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-progress indicators for the 3 hook sentences */}
      <div className="section-one-indicators">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setHookSentenceIndex && setHookSentenceIndex(idx)}
            className={`section-one-pill ${hookSentenceIndex === idx ? 'active' : ''}`}
            aria-label={`Jump to hook statement ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
