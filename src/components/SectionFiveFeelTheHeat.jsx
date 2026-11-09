import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Check } from 'lucide-react';

/**
 * SectionFiveFeelTheHeat Component
 * Renders Section 5: "FEEL THE HEAT"
 * Built strictly according to design.md tokens:
 * - Level 0 / 1 Contrast Canvas (#000000 / #08090c)
 * - Text Inputs (Standard):
 *   background: #000000, focus background: #08090c, border: 1.5px solid transparent,
 *   focus border-color: #212121, caret-color: #ea4325, placeholder: #8D8F93 (font-weight: 500)
 * - Primary CTA: Brand Orange #ea4325, hover shadow 0 6px 20px rgba(234, 67, 37, 0.50)
 * - Typography: Poppins font family, Primary #ffffff, Content #E1E1E1, Muted #8D8F93
 * - Small Text Rule: font-weight 500 for text < 14px
 */
export default function SectionFiveFeelTheHeat({ currentLang = 'es', onBackToStart }) {
  const isEs = currentLang === 'es';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  // Cascading animation variants
  const cascadeContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const cascadeItem = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeForm = {
    hidden: { opacity: 0, y: 22, scale: 0.95, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
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
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4"
    >
      {/* 1. Header Title: FEEL THE HEAT */}
      <motion.h2
        variants={cascadeItem}
        className="font-['Poppins',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-[700] tracking-[0.04em] text-[#ffffff] text-center uppercase leading-tight"
      >
        FEEL THE HEAT
      </motion.h2>

      {/* 2. Subtitle: Content #E1E1E1 */}
      <motion.p
        variants={cascadeItem}
        className="mt-2.5 sm:mt-3 font-['Poppins',sans-serif] text-base sm:text-lg md:text-xl lg:text-[20px] font-[400] text-[#E1E1E1] tracking-[-0.01em] text-center max-w-2xl"
      >
        {isEs
          ? 'La gente ya está hablando. ¿Vas a entrar a la conversación?'
          : 'People are already talking. Are you joining the conversation?'}
      </motion.p>

      {/* 3. Interactive Early Access Form calibrated to design.md tokens */}
      <motion.div variants={cascadeForm} className="mt-6 sm:mt-7 md:mt-8 w-full max-w-lg sm:max-w-xl mx-auto">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#151515] border border-[rgba(234,67,37,0.35)] text-[#ffffff] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="w-6 h-6 rounded-full bg-[#ea4325] flex items-center justify-center text-[#ffffff]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-[600] text-sm sm:text-base text-[#ffffff]">
              {isEs ? '¡Acceso solicitado! Te contactaremos pronto.' : 'Access requested! We will reach out soon.'}
            </span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full"
          >
            {/* Pill Email Input adhering to standard input tokens */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEs ? 'Ingresar correo electronico' : 'Enter your email'}
              required
              className="w-full sm:w-[320px] md:w-[340px] h-[52px] sm:h-[56px] px-6 rounded-full bg-[#000000] focus:bg-[#08090c] border-[1.5px] border-transparent focus:border-[#212121] text-[#ffffff] placeholder-[#8D8F93] placeholder:font-[500] text-sm sm:text-base font-['Poppins',sans-serif] font-[500] focus:outline-none transition-all duration-200 caret-[#ea4325] shadow-inner"
            />

            {/* Pill Action Button: The ONE Brand Orange #ea4325 */}
            <button
              type="submit"
              className="w-full sm:w-auto h-[52px] sm:h-[56px] px-7 sm:px-8 rounded-full bg-[#ea4325] hover:brightness-110 text-[#ffffff] font-['Poppins',sans-serif] font-[600] text-sm sm:text-base tracking-[-0.01em] transition-all duration-300 hover:scale-[1.02] shadow-[0_6px_20px_rgba(234,67,37,0.50)] whitespace-nowrap flex items-center justify-center cursor-pointer select-none"
            >
              {isEs ? 'Quiero acceso anticipado' : 'I want early access'}
            </button>
          </form>
        )}
      </motion.div>

      {/* 4. Subtle Back to start button */}
      <motion.div variants={cascadeItem} className="mt-8 sm:mt-10">
        <button
          type="button"
          onClick={onBackToStart}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Poppins',sans-serif] font-[500] text-[#8D8F93] hover:text-[#ffffff] transition-colors duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
