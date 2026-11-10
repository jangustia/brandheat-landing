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
 * - Primary CTA: Brand Orange #ea4325, subtle hover shadow
 * - Typography: Manrope (headings) & Inter (body / labels)
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

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4">
      {/* 1. Header Title: FEEL THE HEAT */}
      <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-[800] tracking-[-0.02em] text-[#ffffff] text-center uppercase leading-tight">
        FEEL THE HEAT
      </h2>

      {/* 2. Subtitle: Content #E1E1E1 in Inter */}
      <p className="mt-2.5 sm:mt-3 font-['Inter',sans-serif] text-base sm:text-lg md:text-xl lg:text-[20px] font-[400] text-[#E1E1E1] tracking-[-0.01em] text-center max-w-2xl">
        {isEs
          ? 'La gente ya está hablando. ¿Vas a entrar a la conversación?'
          : 'People are already talking. Are you joining the conversation?'}
      </p>

      {/* 3. Interactive Early Access Form calibrated to design.md tokens */}
      <div className="mt-6 sm:mt-7 md:mt-8 w-full max-w-lg sm:max-w-xl mx-auto">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#151515] text-[#ffffff] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="w-6 h-6 rounded-full bg-[#ea4325] flex items-center justify-center text-[#ffffff]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-['Inter',sans-serif] font-[600] text-sm sm:text-base text-[#ffffff]">
              {isEs ? '¡Acceso solicitado! Te contactaremos pronto.' : 'Access requested! We will reach out soon.'}
            </span>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full"
          >
            {/* Pill Email Input using the same color as the card containers (#151515) for clear contrast */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEs ? 'Ingresar correo electronico' : 'Enter your email'}
              required
              className="w-full sm:w-[320px] md:w-[340px] h-[52px] sm:h-[56px] px-6 rounded-full bg-[#151515] hover:bg-[#1a1a1a] focus:bg-[#1e1e1e] border-none text-[#ffffff] placeholder-[#8D8F93] placeholder:font-[500] text-sm sm:text-base font-['Inter',sans-serif] font-[500] focus:outline-none transition-all duration-200 caret-[#ea4325] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            />

            {/* Pill Action Button: The ONE Brand Orange #ea4325 (Subtle Hover) */}
            <button
              type="submit"
              className="w-full sm:w-auto h-[52px] sm:h-[56px] px-7 sm:px-8 rounded-full bg-[#ea4325] hover:brightness-105 text-[#ffffff] font-['Manrope',sans-serif] font-[600] text-sm sm:text-base tracking-[-0.01em] transition-all duration-250 shadow-[0_6px_20px_rgba(234,67,37,0.40)] hover:shadow-[0_8px_25px_rgba(234,67,37,0.55)] whitespace-nowrap flex items-center justify-center cursor-pointer select-none"
            >
              {isEs ? 'Quiero acceso anticipado' : 'I want early access'}
            </button>
          </form>
        )}
      </div>

      {/* 4. Subtle Back to start button */}
      <div className="mt-8 sm:mt-10">
        <button
          type="button"
          onClick={onBackToStart}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-['Inter',sans-serif] font-[500] text-[#8D8F93] hover:text-[#ffffff] transition-colors duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
        </button>
      </div>
    </div>
  );
}
