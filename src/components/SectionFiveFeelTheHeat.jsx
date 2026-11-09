import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Check } from 'lucide-react';

/**
 * SectionFiveFeelTheHeat Component
 * Renders Section 5: "FEEL THE HEAT"
 * Exact layout from the design:
 * - Headline: "FEEL THE HEAT"
 * - Subtitle: "La gente ya está hablando. ¿Vas a entrar a la conversación?"
 * - Interactive email form:
 *   [Ingresar correo electronico] [Quiero acceso anticipado]
 * - Subtle "Volver al inicio" restart option.
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
        className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-[600] tracking-[0.04em] text-white text-center uppercase leading-tight"
      >
        FEEL THE HEAT
      </motion.h2>

      {/* 2. Subtitle */}
      <motion.p
        variants={cascadeItem}
        className="mt-3 sm:mt-4 font-['Manrope',sans-serif] text-base sm:text-lg md:text-xl lg:text-[22px] font-[400] text-white/80 tracking-[-0.01em] text-center max-w-2xl"
      >
        {isEs
          ? 'La gente ya está hablando. ¿Vas a entrar a la conversación?'
          : 'People are already talking. Are you joining the conversation?'}
      </motion.p>

      {/* 3. Interactive Early Access Form */}
      <motion.div variants={cascadeForm} className="mt-8 sm:mt-10 md:mt-12 w-full max-w-lg sm:max-w-xl mx-auto">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#18181c] border border-[#E54817]/40 text-white shadow-[0_0_28px_rgba(229,72,23,0.3)]"
          >
            <div className="w-6 h-6 rounded-full bg-[#E54817] flex items-center justify-center text-white">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-['Manrope',sans-serif] font-[600] text-sm sm:text-base">
              {isEs ? '¡Acceso solicitado! Te contactaremos pronto.' : 'Access requested! We will reach out soon.'}
            </span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full"
          >
            {/* Pill Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEs ? 'Ingresar correo electronico' : 'Enter your email'}
              required
              className="w-full sm:w-[320px] md:w-[340px] h-[52px] sm:h-[56px] px-6 rounded-full bg-[#141418] border border-white/[0.08] focus:border-[#E54817] text-white placeholder-white/35 text-sm sm:text-base font-['Manrope',sans-serif] font-[400] focus:outline-none focus:ring-2 focus:ring-[#E54817]/40 transition-all duration-200 shadow-inner"
            />

            {/* Pill Action Button */}
            <button
              type="submit"
              className="w-full sm:w-auto h-[52px] sm:h-[56px] px-7 sm:px-8 rounded-full bg-[#E54817] hover:bg-[#F25522] text-white font-['Manrope',sans-serif] font-[700] text-sm sm:text-base tracking-[-0.01em] transition-all duration-300 hover:scale-[1.02] shadow-[0_0_24px_rgba(229,72,23,0.45)] whitespace-nowrap flex items-center justify-center cursor-pointer select-none"
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
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Manrope',sans-serif] text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
