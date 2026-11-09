import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Lightbulb, SwatchBook, Rocket, BarChart3 } from 'lucide-react';

/**
 * SectionThreeHowItWorks Component
 * Calibrated strictly to design.md tokens:
 * - Level 2 Parent Cards (#151515, border: 1px solid rgba(255,255,255,0.07), rounded-[24px])
 * - Level 3 Hover State (#212121)
 * - Brand Typography: Primary #ffffff, Content #E1E1E1, Headers/Labels #C5C5C5, Muted #8D8F93
 * - Small Text Rule: font-weight: 500 for font-size < 14px
 */
export default function SectionThreeHowItWorks({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

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
        <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-[500] leading-[1.15] tracking-[-0.03em] text-[#ffffff] text-center">
          <span className="font-[300] text-[#E1E1E1]">
            {isEs ? 'Cómo funciona: ' : 'How it Works: '}
          </span>
          <span className="font-[700] text-[#ffffff]">
            From spark to screen.
          </span>
        </h2>

        <p className="mt-2 sm:mt-2.5 font-['Poppins',sans-serif] text-xs sm:text-sm md:text-[15px] font-[500] text-[#8D8F93] tracking-[-0.01em] text-center">
          {isEs
            ? 'Tu marca, siempre a tiempo. Siempre al punto. Always on.'
            : 'Your Brand, always on time. Always on point. Always on.'}
        </p>
      </motion.div>

      {/* 2. Grid of 5 Level 2 Feature Cards (#151515, border: 1px solid rgba(255,255,255,0.07), rounded-[24px]) */}
      <div className="mt-6 sm:mt-7 md:mt-8 w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col gap-2.5 sm:gap-3">
        {/* Row 1: Cards 1 and 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Card 1: HEAT Map */}
          <motion.div
            variants={cascadeCard}
            whileHover={{ y: -3, scale: 1.015 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.3)] rounded-[24px] p-4 sm:p-5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-[#ffffff] group-hover:text-[#ea4325] group-hover:scale-110 transition-all duration-300">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Poppins',sans-serif] font-[700] text-sm sm:text-base text-[#ffffff] tracking-[-0.01em] mb-1">
                1. HEAT Map
              </h3>
              <p className="font-['Poppins',sans-serif] font-[500] text-xs sm:text-[13px] text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed tracking-[-0.01em] transition-colors">
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
            className="group relative bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.3)] rounded-[24px] p-4 sm:p-5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-[#ffffff] group-hover:text-[#ea4325] group-hover:scale-110 transition-all duration-300">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Poppins',sans-serif] font-[700] text-sm sm:text-base text-[#ffffff] tracking-[-0.01em] mb-1">
                2. Ideas
              </h3>
              <p className="font-['Poppins',sans-serif] font-[500] text-xs sm:text-[13px] text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed tracking-[-0.01em] transition-colors">
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
            className="group relative bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.3)] rounded-[24px] p-4 sm:p-5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-[#ffffff] group-hover:text-[#ea4325] group-hover:scale-110 transition-all duration-300">
              <SwatchBook className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Poppins',sans-serif] font-[700] text-sm sm:text-base text-[#ffffff] tracking-[-0.01em] mb-1">
                3. Creative Studio
              </h3>
              <p className="font-['Poppins',sans-serif] font-[500] text-xs sm:text-[13px] text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed tracking-[-0.01em] transition-colors">
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
            className="group relative bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.3)] rounded-[24px] p-4 sm:p-5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-[#ffffff] group-hover:text-[#ea4325] group-hover:scale-110 transition-all duration-300">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-['Poppins',sans-serif] font-[700] text-sm sm:text-base text-[#ffffff] tracking-[-0.01em] mb-1">
                4. Campaigns
              </h3>
              <p className="font-['Poppins',sans-serif] font-[500] text-xs sm:text-[13px] text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed tracking-[-0.01em] transition-colors">
                {isEs
                  ? 'Siente el pulso de las redes, crea, publica, prueba, y pauta. Todo en la misma plataforma.'
                  : 'Feel the pulse of social, create, publish, test, and run paid media. All on the same platform.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 3: Card 5 (Full Width Level 2 Card) */}
        <motion.div
          variants={cascadeCard}
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="group relative bg-[#151515] hover:bg-[#212121] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(234,67,37,0.3)] rounded-[24px] p-4 sm:p-5 md:p-5 flex items-start text-left transition-all duration-300 shadow-[0_6px_24px_rgba(0,0,0,0.35)] w-full"
        >
          <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mr-3.5 sm:mr-4 mt-0.5 text-[#ffffff] group-hover:text-[#ea4325] group-hover:scale-110 transition-all duration-300">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
          </div>

          <div className="flex flex-col">
            <h3 className="font-['Poppins',sans-serif] font-[700] text-sm sm:text-base text-[#ffffff] tracking-[-0.01em] mb-1">
              5. Analytics
            </h3>
            <p className="font-['Poppins',sans-serif] font-[500] text-xs sm:text-[13px] text-[#8D8F93] group-hover:text-[#C5C5C5] leading-relaxed tracking-[-0.01em] transition-colors">
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
