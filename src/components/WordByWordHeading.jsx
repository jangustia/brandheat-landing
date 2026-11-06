import React from 'react';
import { motion } from 'framer-motion';
import './WordByWordHeading.css';

export default function WordByWordHeading({ lang = 'es', animationKey = 0 }) {
  // Spanish headline strictly formatted into TWO LINES:
  // Line 1: "¿Cuánto tarda tu marca en subirse a una"
  // Line 2: "conversación que ya es tendencia?"
  const linesSpanish = [
    [
      { text: '¿Cuánto', bold: false },
      { text: 'tarda', bold: false },
      { text: 'tu', bold: true },
      { text: 'marca', bold: true },
      { text: 'en', bold: false },
      { text: 'subirse', bold: false },
      { text: 'a', bold: false },
      { text: 'una', bold: false },
    ],
    [
      { text: 'conversación', bold: false },
      { text: 'que', bold: false },
      { text: 'ya', bold: false },
      { text: 'es', bold: false },
      { text: 'tendencia?', bold: true },
    ],
  ];

  const linesEnglish = [
    [
      { text: 'How', bold: false },
      { text: 'fast', bold: false },
      { text: 'does', bold: false },
      { text: 'your', bold: true },
      { text: 'brand', bold: true },
      { text: 'jump', bold: false },
      { text: 'into', bold: false },
      { text: 'a', bold: false },
    ],
    [
      { text: 'conversation', bold: false },
      { text: 'that', bold: false },
      { text: 'is', bold: false },
      { text: 'already', bold: false },
      { text: 'trending?', bold: true },
    ],
  ];

  const lines = lang === 'en' ? linesEnglish : linesSpanish;
  const fullSentence = lines.flatMap((line) => line.map((w) => w.text)).join(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.h1
      key={`${lang}-${animationKey}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={fullSentence}
      className="relative z-20 flex flex-col items-center justify-center text-center font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.2] md:leading-[1.18] tracking-[-0.03em] max-w-7xl mx-auto px-4 select-none w-full"
    >
      {lines.map((lineWords, lineIndex) => (
        <div
          key={`line-${lineIndex}`}
          className="flex flex-wrap lg:flex-nowrap justify-center items-center w-full my-1 sm:my-1.5 lg:whitespace-nowrap text-center"
        >
          {lineWords.map((item, wordIndex) => (
            <motion.span
              key={`${item.text}-${lineIndex}-${wordIndex}`}
              variants={wordVariants}
              className={`inline-block mx-[0.14em] my-[0.04em] ${
                item.bold
                  ? 'font-[700] text-white'
                  : 'font-[200] text-white/95'
              }`}
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {item.text}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.h1>
  );
}
