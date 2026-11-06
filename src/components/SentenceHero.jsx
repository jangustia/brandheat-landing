import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import BottomAmbientGlow from './BottomAmbientGlow';
import './SentenceHero.css';

/**
 * SentenceHero Component
 * Single 100vh viewport revealing 11 sequential narrative sentences on scrolling.
 * - Stage 09 formatted EXACTLY as attached:
 *   Line 1: "Una sola plataforma para " (200) "detectar, crear," (800)
 *   Line 2: "publicar y medir." (800) " En tiempo real." (200)
 * - Stages 06, 07, 08 formatted on a single line.
 * - Stage 05: heat.png fully passes the text "Meet brandheat." and fades out on the right side.
 * - Font: Manrope 58px (lg:text-[58px])
 * - Extra Thin: font-[200]
 * - Extra Bold: font-[800]
 */
export default function SentenceHero({
  currentLang = 'es',
  currentIndex: controlledIndex,
  onIndexChange,
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const [flameProgress, setFlameProgress] = useState(0);
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);

  const totalSentences = 12;
  const isEs = currentLang === 'es';

  // Navigate between sentences with cooldown
  const setCurrentIndex = useCallback(
    (updater) => {
      const nextIndex = typeof updater === 'function' ? updater(currentIndex) : updater;
      if (onIndexChange) {
        onIndexChange(nextIndex);
      } else {
        setInternalIndex(nextIndex);
      }
    },
    [currentIndex, onIndexChange]
  );

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSentences - 1));
  }, [setCurrentIndex, totalSentences]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, [setCurrentIndex]);

  // Wheel listener
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;

      if (e.deltaY > 25) {
        isScrollingRef.current = true;
        goToNext();
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 650);
      } else if (e.deltaY < -25) {
        isScrollingRef.current = true;
        goToPrev();
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goToNext, goToPrev]);

  // Touch swipe for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNext, goToPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goToNext();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Stage 5 flame reveal animation trigger
  useEffect(() => {
    if (currentIndex === 4) {
      setFlameProgress(0);
      const timer = setTimeout(() => {
        setFlameProgress(1);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      setFlameProgress(0);
    }
  }, [currentIndex]);

  // Track language switch for smooth dissolve transition
  const [isLangSwitch, setIsLangSwitch] = useState(false);
  const prevLangRef = useRef(currentLang);

  useEffect(() => {
    if (prevLangRef.current !== currentLang) {
      prevLangRef.current = currentLang;
      setIsLangSwitch(true);
      const timer = setTimeout(() => {
        setIsLangSwitch(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLang]);

  // Transition variants: smooth in-place blur & dissolve for language switch, vertical slide for scroll
  const sentenceVariants = {
    initial: {
      opacity: 0,
      filter: isLangSwitch ? 'blur(12px)' : 'blur(16px)',
      y: isLangSwitch ? 0 : 28,
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: isLangSwitch ? 0.42 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      filter: isLangSwitch ? 'blur(12px)' : 'blur(16px)',
      y: isLangSwitch ? 0 : -28,
      transition: {
        duration: isLangSwitch ? 0.28 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="sentence-hero-viewport relative w-full h-screen overflow-hidden bg-[#070709] flex flex-col justify-between items-center px-[40px] pt-[40px] pb-0 m-0 select-none">
      {/* 1. Integrated Bottom Ambient Glow + Dots + Mouse Scroll from User */}
      <BottomAmbientGlow onScrollClick={goToNext} />

      {/* 2. Main Center Stage: 12 Sentences strictly styled, Manrope Extra Thin (200) + Bold (700), 58px */}
      <main className="relative z-20 my-auto -translate-y-8 sm:-translate-y-12 lg:-translate-y-14 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {/* ========================================================
              01: ¿Cuánto tarda tu marca en subirse a una conversación que ya es tendencia?
             ======================================================== */}
          {currentIndex === 0 && (
            <motion.div
              key={`sentence-01-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h1 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full">
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[200] text-white">
                    {isEs ? '¿Cuánto tarda' : 'How long does it take'}
                  </span>{' '}
                  <span className="font-[700] text-white">
                    {isEs ? 'tu marca' : 'your brand'}
                  </span>{' '}
                  <span className="font-[200] text-white">
                    {isEs ? 'en subirse a una' : 'to join a'}
                  </span>
                </div>
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[200] text-white">
                    {isEs ? 'conversación que ya es' : "conversation that's already"}
                  </span>{' '}
                  <span className="font-[700] text-white">
                    {isEs ? 'tendencia?' : 'trending?'}
                  </span>
                </div>
              </h1>
            </motion.div>
          )}

          {/* ========================================================
              02: Una conversación que prendió escala en horas.
             ======================================================== */}
          {currentIndex === 1 && (
            <motion.div
              key={`sentence-02-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full">
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[200] text-white">
                    {isEs ? 'Una' : 'A'}
                  </span>{' '}
                  <span className="font-[700] text-white">
                    {isEs ? 'conversación' : 'conversation'}
                  </span>{' '}
                  <span className="font-[200] text-white">
                    {isEs ? 'que prendió' : 'that caught fire'}
                  </span>
                </div>
                <div className="block my-1 sm:my-1.5 font-[200] text-white lg:whitespace-nowrap text-center">
                  {isEs ? 'escala en horas.' : 'escalates in hours.'}
                </div>
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              03: Una campaña tarda semanas. "single lines"
             ======================================================== */}
          {currentIndex === 2 && (
            <motion.div
              key={`sentence-03-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] font-[200] text-white/95 text-center w-full whitespace-nowrap">
                {isEs ? 'Una campaña tarda semanas.' : 'A campaign takes weeks.'}
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              04: Ese gap es cada vez más grande. Y más caro.
             ======================================================== */}
          {currentIndex === 3 && (
            <motion.div
              key={`sentence-04-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] font-[200] text-white/95 text-center w-full">
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  {isEs ? 'Ese gap es cada vez más grande.' : 'That gap keeps getting bigger.'}
                </div>
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  {isEs ? 'Y más caro.' : 'And more expensive.'}
                </div>
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              05: Meet brandheat.
              heat.png fully passes the text and fades out on the right side
             ======================================================== */}
          {currentIndex === 4 && (
            <motion.div
              key={`sentence-05-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full flex flex-col items-center justify-center px-4 text-center overflow-visible"
            >
              <div className="relative inline-flex items-center justify-center w-full max-w-4xl py-6 overflow-visible text-center">
                {/* 1. Underlying dim placeholder text */}
                <div
                  aria-hidden="true"
                  className="font-['Manrope',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[104px] leading-[1.1] tracking-[-0.03em] opacity-10 select-none whitespace-nowrap text-center"
                >
                  <span className="font-[200] text-white">Meet brand</span>
                  <span className="font-[700] text-white">heat.</span>
                </div>

                {/* 2. Revealed text: Unveiled progressively from left to right as heat.png sweeps across */}
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{
                    clipPath: flameProgress === 1 ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  }}
                  transition={{
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center font-['Manrope',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[104px] leading-[1.1] tracking-[-0.03em] select-none whitespace-nowrap text-center"
                >
                  <span className="font-[200] text-white">
                    Meet brand
                  </span>
                  <span className="font-[700] text-white">
                    heat.
                  </span>
                </motion.div>

                {/* 3. heat.png image: Fully passes the text and fades out on the right side */}
                <motion.div
                  initial={{ left: '-25%', opacity: 0 }}
                  animate={{
                    left: flameProgress === 1 ? '135%' : '-25%',
                    opacity: flameProgress === 1 ? [0, 1, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 1.65,
                    times: [0, 0.12, 0.74, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-30"
                >
                  <div className="relative -translate-x-[92%] w-[180px] sm:w-[260px] md:w-[320px] lg:w-[380px] flex items-center justify-center">
                    {/* Clean heat.png asset without orange drop-shadow */}
                    <img
                      src="/heat.png"
                      alt="Brand HEAT"
                      className="w-full h-auto object-contain filter-none"
                    />

                    {/* Crisp white flare point at the leading tip of heat.png */}
                    <div className="absolute right-[4%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white blur-[1.5px] shadow-[0_0_16px_8px_rgba(255,255,255,0.85)] pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              06: Anticipá. Llegá antes a la conversación. (EN UNA SOLA LINEA)
             ======================================================== */}
          {currentIndex === 5 && (
            <motion.div
              key={`sentence-06-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full whitespace-nowrap">
                <span className="font-[700] text-white">
                  {isEs ? 'Anticipá.' : 'Anticipate.'}
                </span>{' '}
                <span className="font-[200] text-white">
                  {isEs ? 'Llegá antes a la conversación.' : 'Get to the conversation first.'}
                </span>
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              07: Creá. Lo de hoy ya no sirve mañana. / Create.
             ======================================================== */}
          {currentIndex === 6 && (
            <motion.div
              key={`sentence-07-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              {isEs ? (
                <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full whitespace-nowrap">
                  <span className="font-[700] text-white">Creá.</span>{' '}
                  <span className="font-[200] text-white">Lo de hoy ya no sirve mañana.</span>
                </h2>
              ) : (
                <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[38px] lg:text-[48px] leading-[1.22] md:leading-[1.18] tracking-[-0.03em] text-white text-center max-w-3xl lg:max-w-4xl mx-auto">
                  <div className="block my-1 sm:my-1.5 text-center">
                    <span className="font-[700] text-white">Create.</span>{' '}
                    <span className="font-[200] text-white">What works today</span>
                  </div>
                  <div className="block my-1 sm:my-1.5 text-center sm:whitespace-nowrap">
                    <span className="font-[200] text-white">won't work tomorrow.</span>
                  </div>
                </h2>
              )}
            </motion.div>
          )}

          {/* ========================================================
              08: Escalá. Invertí en lo que ya funciona. / Scale.
             ======================================================== */}
          {currentIndex === 7 && (
            <motion.div
              key={`sentence-08-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              {isEs ? (
                <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full whitespace-nowrap">
                  <span className="font-[700] text-white">Escalá.</span>{' '}
                  <span className="font-[200] text-white">Invertí en lo que ya funciona.</span>
                </h2>
              ) : (
                <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[38px] lg:text-[48px] leading-[1.22] md:leading-[1.18] tracking-[-0.03em] text-white text-center max-w-3xl lg:max-w-4xl mx-auto">
                  <div className="block my-1 sm:my-1.5 text-center">
                    <span className="font-[700] text-white">Scale.</span>{' '}
                    <span className="font-[200] text-white">Put your money on</span>
                  </div>
                  <div className="block my-1 sm:my-1.5 text-center sm:whitespace-nowrap">
                    <span className="font-[200] text-white">what's already working.</span>
                  </div>
                </h2>
              )}
            </motion.div>
          )}

          {/* ========================================================
              09: EXACT FORMAT FROM ATTACHED IMAGE:
              Line 1: "Una sola plataforma para " (200) "detectar, crear," (700)
              Line 2: "publicar y medir." (700) " En tiempo real." (200)
             ======================================================== */}
          {currentIndex === 8 && (
            <motion.div
              key={`sentence-09-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.2] tracking-[-0.03em] text-white text-center w-full">
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[200] text-white">
                    {isEs ? 'Una sola plataforma para' : 'One platform to'}
                  </span>{' '}
                  <span className="font-[700] text-white">
                    {isEs ? 'detectar, crear,' : 'detect, create,'}
                  </span>
                </div>
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[700] text-white">
                    {isEs ? 'publicar y medir.' : 'publish and measure.'}
                  </span>{' '}
                  <span className="font-[200] text-white">
                    {isEs ? 'En tiempo real.' : 'In real time.'}
                  </span>
                </div>
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              10: Sin brief. Sin esperas. Sin llegar tarde. (EN UNA SOLA LINEA)
             ======================================================== */}
          {currentIndex === 9 && (
            <motion.div
              key={`sentence-10-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full whitespace-nowrap">
                <span className="font-[700] text-white">
                  {isEs ? 'Sin brief.' : 'No brief.'}
                </span>{' '}
                <span className="font-[200] text-white">
                  {isEs ? 'Sin esperas. Sin llegar tarde.' : 'No waiting. No showing up late.'}
                </span>
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              11: From spark to screen. screen is bold.
             ======================================================== */}
          {currentIndex === 10 && (
            <motion.div
              key={`sentence-11-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[46px] lg:text-[62px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full whitespace-nowrap">
                <span className="font-[200] text-white">
                  From spark to
                </span>{' '}
                <span className="font-[700] text-white">
                  screen.
                </span>
              </h2>
            </motion.div>
          )}

          {/* ========================================================
              12: Your brand, always on time. Always on point. Always on.
              (CIERRE CON LOS DOS BOTONES)
             ======================================================== */}
          {currentIndex === 11 && (
            <motion.div
              key={`sentence-12-${currentLang}`}
              variants={sentenceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.2] tracking-[-0.03em] text-white text-center w-full mb-8">
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[700] text-white">
                    {isEs ? 'Tu marca,' : 'Your brand,'}
                  </span>{' '}
                  <span className="font-[200] text-white">
                    {isEs ? 'siempre a tiempo.' : 'always on time.'}
                  </span>
                </div>
                <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                  <span className="font-[200] text-white">
                    {isEs ? 'Siempre al punto.' : 'Always on point.'}
                  </span>{' '}
                  <span className="font-[700] text-white">
                    Always on.
                  </span>
                </div>
              </h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <a
                  href="mailto:contact@brandheat.ai"
                  className="inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 sm:py-4.5 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-[#FF6637] to-[#D70417] hover:brightness-110 shadow-[0_0_30px_rgba(255,102,55,0.5)] transition-all duration-300 hover:scale-105"
                >
                  <span>{isEs ? 'Solicitar Acceso Temprano' : 'Request Early Access'}</span>
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setCurrentIndex(0)}
                  className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 sm:py-4.5 rounded-full font-semibold text-sm sm:text-base text-white/80 hover:text-white bg-white/[0.06] border border-white/[0.14] hover:bg-white/[0.12] transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isEs ? 'Volver al inicio' : 'Back to start'}</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Floating Minimal Navigation Dots (12 Stages) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2">
        {Array.from({ length: totalSentences }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? 'w-1.5 h-6 bg-[#FF6637] shadow-[0_0_12px_rgba(255,102,55,0.85)]'
                : 'w-1.5 h-3.5 bg-white/[0.07] hover:bg-white/30'
            }`}
            aria-label={`Go to sentence ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
