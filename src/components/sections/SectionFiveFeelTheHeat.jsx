import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Check, Mail } from 'lucide-react';
import { cascadeContainerVariants, cascadeItemVariants } from './cascadeVariants';
import './SectionFiveFeelTheHeat.css';

/**
 * SectionFiveFeelTheHeat Component
 * Renders Section 5: "FEEL THE HEAT"
 * Built strictly according to design.md tokens:
 * - Level 0 / 1 Contrast Canvas (#000000 / #08090c)
 * - Text Inputs: Card container color #151515 for clear contrast against background canvas
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
    <motion.div
      className="section-five-container"
      variants={cascadeContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 1. Header Title: FEEL THE HEAT */}
      <motion.h2
        variants={cascadeItemVariants}
        className="section-five-title text-3xl sm:text-4xl md:text-5xl lg:text-[50px]"
      >
        <span className="section-five-title-light">FEEL THE </span>
        <span className="section-five-title-bold">HEAT</span>
      </motion.h2>

      {/* 2. Subtitle: Content #E1E1E1 in Inter */}
      <motion.p
        variants={cascadeItemVariants}
        className="section-five-subtitle text-base sm:text-lg lg:text-[20px]"
      >
        {isEs
          ? 'La gente ya está hablando. ¿Vas a entrar a la conversación?'
          : 'People are already talking. Are you joining the conversation?'}
      </motion.p>

      {/* 3. Interactive Early Access Form */}
      <motion.div variants={cascadeItemVariants} className="section-five-form-wrapper">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="section-five-success"
          >
            <div className="w-6 h-6 rounded-full bg-[#ea4325] flex items-center justify-center text-[#ffffff]">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-['Inter',sans-serif] font-[600] text-sm sm:text-base text-[#ffffff]">
              {isEs ? '¡Acceso solicitado! Te contactaremos pronto.' : 'Access requested! We will reach out soon.'}
            </span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="section-five-form">
            {/* Pill Email Input with icon using card container color (#151515) for contrast */}
            <div className="section-five-input-wrapper">
              <Mail className="section-five-input-icon" strokeWidth={1.8} aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEs ? 'Ingresar correo electrónico' : 'Enter your email'}
                required
                className="section-five-input"
              />
            </div>

            {/* Pill Action Button: The ONE Brand Orange #ea4325 */}
            <button type="submit" className="section-five-btn">
              {isEs ? 'Quiero acceso anticipado' : 'I want early access'}
            </button>
          </form>
        )}
      </motion.div>

      {/* 4. Subtle Back to start button */}
      <motion.div variants={cascadeItemVariants} className="section-five-back-container">
        <button
          type="button"
          onClick={onBackToStart}
          className="section-five-back-btn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

