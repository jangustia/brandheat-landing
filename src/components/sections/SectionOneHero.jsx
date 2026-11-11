import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SectionOneHero.css';

/**
 * Hook Sentences Definition:
 * 4 sequential narrative statements with exact line breaks and bold/light weights.
 */
const HOOK_SENTENCES = {
  es: [
    // 1. ¿Cuánto tarda tu marca en subirse / a una tendencia?
    {
      id: 'hook-1',
      tag: 'h1',
      lines: [
        [
          { text: '¿Cuánto', bold: false },
          { text: 'tarda', bold: false },
          { text: 'tu', bold: true },
          { text: 'marca', bold: true },
          { text: 'en', bold: false },
          { text: 'subirse', bold: false },
        ],
        [
          { text: 'a', bold: false },
          { text: 'una', bold: false },
          { text: 'tendencia?', bold: true },
        ],
      ],
    },
    // 2. Una conversación que prendió / escala en horas.
    {
      id: 'hook-2',
      tag: 'h2',
      lines: [
        [
          { text: 'Una', bold: false },
          { text: 'conversación', bold: true },
          { text: 'que', bold: false },
          { text: 'prendió', bold: false },
        ],
        [
          { text: 'escala', bold: false },
          { text: 'en', bold: false },
          { text: 'horas.', bold: false },
        ],
      ],
    },
    // 3. Una campaña tarda semanas...
    {
      id: 'hook-3',
      tag: 'h2',
      lines: [
        [
          { text: 'Una', bold: false },
          { text: 'campaña', bold: false },
          { text: 'tarda', bold: false },
          { text: 'semanas...', bold: true },
        ],
      ],
    },
    // 4. Ese gap es un problema cada vez / más grande. Y más caro.
    {
      id: 'hook-4',
      tag: 'h2',
      lines: [
        [
          { text: 'Ese', bold: false },
          { text: 'gap', bold: false },
          { text: 'es', bold: false },
          { text: 'un', bold: false },
          { text: 'problema', bold: false },
          { text: 'cada', bold: false },
          { text: 'vez', bold: false },
        ],
        [
          { text: 'más', bold: false },
          { text: 'grande.', bold: true },
          { text: 'Y', bold: false },
          { text: 'más', bold: false },
          { text: 'caro.', bold: true },
        ],
      ],
    },
  ],
  en: [
    // 1. How long does it take your brand to jump / on a trend?
    {
      id: 'hook-1',
      tag: 'h1',
      lines: [
        [
          { text: 'How', bold: false },
          { text: 'long', bold: false },
          { text: 'does', bold: false },
          { text: 'it', bold: false },
          { text: 'take', bold: false },
          { text: 'your', bold: true },
          { text: 'brand', bold: true },
          { text: 'to', bold: false },
          { text: 'jump', bold: false },
        ],
        [
          { text: 'on', bold: false },
          { text: 'a', bold: false },
          { text: 'trend?', bold: true },
        ],
      ],
    },
    // 2. A conversation that catches fire / escalates in hours.
    {
      id: 'hook-2',
      tag: 'h2',
      lines: [
        [
          { text: 'A', bold: false },
          { text: 'conversation', bold: true },
          { text: 'that', bold: false },
          { text: 'catches', bold: false },
          { text: 'fire', bold: false },
        ],
        [
          { text: 'escalates', bold: false },
          { text: 'in', bold: false },
          { text: 'hours.', bold: false },
        ],
      ],
    },
    // 3. A campaign takes weeks...
    {
      id: 'hook-3',
      tag: 'h2',
      lines: [
        [
          { text: 'A', bold: false },
          { text: 'campaign', bold: false },
          { text: 'takes', bold: false },
          { text: 'weeks...', bold: true },
        ],
      ],
    },
    // 4. That gap is a problem that keeps / getting bigger. And more expensive.
    {
      id: 'hook-4',
      tag: 'h2',
      lines: [
        [
          { text: 'That', bold: false },
          { text: 'gap', bold: false },
          { text: 'is', bold: false },
          { text: 'a', bold: false },
          { text: 'problem', bold: false },
          { text: 'that', bold: false },
          { text: 'keeps', bold: false },
        ],
        [
          { text: 'getting', bold: false },
          { text: 'bigger.', bold: true },
          { text: 'And', bold: false },
          { text: 'more', bold: false },
          { text: 'expensive.', bold: true },
        ],
      ],
    },
  ],
};

// Word-by-word blur-in motion variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    y: -10,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

const wordVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(14px)',
    y: 16,
  },
  animate: (i) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * SectionOneHero Component
 * Stage 0: The Hook - 4 sequential narrative hook statements.
 * Features cinematic word-by-word blur-in reveal with Manrope Thin (200) & Extra Bold (800).
 */
export default function SectionOneHero({
  currentLang = 'es',
  hookSentenceIndex = 0,
  setHookSentenceIndex,
}) {
  const isEs = currentLang === 'es';
  const sentences = isEs ? HOOK_SENTENCES.es : HOOK_SENTENCES.en;
  const currentSentence = sentences[hookSentenceIndex] || sentences[0];
  const HeadingTag = currentSentence.tag || 'h2';

  const fullSentenceAria = currentSentence.lines
    .flat()
    .map((w) => w.text)
    .join(' ');

  let globalWordCounter = 0;

  return (
    <div className="section-one-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={`hook-${currentSentence.id}-${hookSentenceIndex}-${currentLang}`}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full text-center"
        >
          <HeadingTag
            aria-label={fullSentenceAria}
            className="section-one-headline text-[34px] sm:text-[38px] md:text-[44px] lg:text-[58px]"
          >
            {currentSentence.lines.map((lineWords, lineIdx) => (
              <div key={lineIdx} className="section-one-line">
                {lineWords.map((word, wordIdx) => {
                  const wordOrder = globalWordCounter++;
                  return (
                    <motion.span
                      key={`${word.text}-${lineIdx}-${wordIdx}`}
                      custom={wordOrder}
                      variants={wordVariants}
                      className={`section-one-word ${
                        word.bold ? 'section-one-bold' : 'section-one-light'
                      }`}
                    >
                      {word.text}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </HeadingTag>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
