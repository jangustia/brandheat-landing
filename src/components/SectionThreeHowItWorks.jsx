import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Lightbulb, SwatchBook, Rocket, BarChart3 } from 'lucide-react';

/**
 * SectionThreeHowItWorks Component
 * Renders Section 3: "How it Works: From spark to screen."
 * Displays the 5 sequential modular platform features:
 * 1. HEAT Map
 * 2. Ideas
 * 3. Creative Studio
 * 4. Campaigns
 * 5. Analytics (Full width bottom card)
 */
export default function SectionThreeHowItWorks({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  // Cascading animation variants
  const cascadeContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cascadeHeader = {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cascadeCard = {
    hidden: { opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
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
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4"
    >
      {/* 1. Header: Headline & Subheadline */}
      <motion.div variants={cascadeHeader} className="flex flex-col items-center">
        <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-[500] leading-[1.15] tracking-[-0.03em] text-white text-center">
          <span className="font-[300] text-white/90">
            {isEs ? 'Cómo funciona: ' : 'How it Works: '}
          </span>
          <span className="font-[700] text-white">
            From spark to screen.
          </span>
        </h2>

        <p className="mt-2 sm:mt-2.5 font-['Manrope',sans-serif] text-xs sm:text-sm md:text-[15px] font-[300] text-white/60 tracking-[-0.01em] text-center">
          {isEs
            ? 'Tu marca, siempre a tiempo. Siempre al punto. Always on.'
            : 'Your Brand, always on time. Always on point. Always on.'}
        </p>
      </motion.div>

      {/* 2. Grid of 5 Modular Feature Cards (2 Rows of 2 + 1 Full Width) */}
      <div className="mt-6 sm:mt-7 md:mt-8 w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col gap-2.5 sm:gap-3">
        {/* Row 1: Cards 1 and 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Card 1: HEAT Map */}
          <motion.div
            variants={cascadeCard}
            whileHover={{ y: -3, scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[18px] sm:rounded-[22px] p-4 sm:p-4.5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.3)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-white/85 text-white/85" />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base text-white tracking-[-0.01em] mb-1">
                1. HEAT Map
              </h3>
              <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] text-white/65 leading-relaxed tracking-[-0.01em]">
                {isEs
                  ? 'Una sola plataforma para detectar, crear, publicar y medir en tiempo real. Sin brief. Sin esperas. Sin llegar tarde.'
                  : 'One platform to detect, create, publish, and measure in real time. No brief. No waiting. No showing up late.'}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Ideas */}
          <motion.div
            variants={cascadeCard}
            whileHover={{ y: -3, scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[18px] sm:rounded-[22px] p-4 sm:p-4.5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.3)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white/85" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base text-white tracking-[-0.01em] mb-1">
                2. Ideas
              </h3>
              <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] text-white/65 leading-relaxed tracking-[-0.01em]">
                {isEs
                  ? 'Lo que tu marca tiene para decir. Varias puntas creativas por tema.'
                  : 'What your brand has to say. Multiple creative angles per topic.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Cards 3 and 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Card 3: Creative Studio */}
          <motion.div
            variants={cascadeCard}
            whileHover={{ y: -3, scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[18px] sm:rounded-[22px] p-4 sm:p-4.5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.3)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <SwatchBook className="w-5 h-5 sm:w-6 sm:h-6 text-white/85" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base text-white tracking-[-0.01em] mb-1">
                3. Creative Studio
              </h3>
              <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] text-white/65 leading-relaxed tracking-[-0.01em]">
                {isEs
                  ? 'De la idea a la pieza creativa en minutos. Video, imagen y texto listos para publicar.'
                  : 'From idea to creative asset in minutes. Video, image, and copy ready to publish.'}
              </p>
            </div>
          </motion.div>

          {/* Card 4: Campaigns */}
          <motion.div
            variants={cascadeCard}
            whileHover={{ y: -3, scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[18px] sm:rounded-[22px] p-4 sm:p-4.5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.3)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white/85" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base text-white tracking-[-0.01em] mb-1">
                4. Campaigns
              </h3>
              <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] text-white/65 leading-relaxed tracking-[-0.01em]">
                {isEs
                  ? 'Siente el pulso de las redes, crea, publica, prueba, y pauta. Todo en la misma plataforma.'
                  : 'Feel the pulse of social, create, publish, test, and run paid media. All on the same platform.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 3: Card 5 (Full Width) */}
        <motion.div
          variants={cascadeCard}
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="group relative bg-[#111115]/90 hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-[18px] sm:rounded-[22px] p-4 sm:p-4.5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.3)] w-full"
        >
          <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white/85" strokeWidth={1.8} />
          </div>

          <div className="flex flex-col">
            <h3 className="font-['Manrope',sans-serif] font-[700] text-sm sm:text-base text-white tracking-[-0.01em] mb-1">
              5. Analytics
            </h3>
            <p className="font-['Manrope',sans-serif] font-[300] text-xs sm:text-[13px] text-white/65 leading-relaxed tracking-[-0.01em]">
              {isEs
                ? 'Entiende qué rindió y por qué. No es solo un reporte, sino recomendaciones para la mejora continua de tus campañas.'
                : 'Understand what performed and why. Not just a report, but recommendations for continuous campaign improvement.'}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

