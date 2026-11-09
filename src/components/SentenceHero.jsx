import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import BottomAmbientGlow from './BottomAmbientGlow';
import SectionTwoOverview from './SectionTwoOverview';
import SectionThreeHowItWorks from './SectionThreeHowItWorks';
import SectionFourClients from './SectionFourClients';
import SectionFiveFeelTheHeat from './SectionFiveFeelTheHeat';
import SectionSixFounders from './SectionSixFounders';
import './SentenceHero.css';

/**
 * SentenceHero Component
 * Single 100vh viewport revealing sequential narrative stages on scrolling:
 * - Stage 0: The Hook (auto-reveals 3 problem statements in sequence without initial scroll)
 * - Stage 1: Section Two Overview (Meet brandheat + Anticipa, Crea, Escala in cascading waterfall)
 * - Stage 2: Section Three (How it Works: From spark to screen - 5 feature cards)
 * - Stage 3: Section Four (Our Clients (so far) - 4-logo placeholder grid)
 * - Stage 4: Section Five (FEEL THE HEAT - Interactive Early Access Form)
 * - Stage 5: Section Six (Founder member - 5 interactive founder tiles with bio modal)
 */
export default function SentenceHero({
  currentLang = 'es',
  currentIndex: controlledIndex,
  onIndexChange,
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const [hookSentenceIndex, setHookSentenceIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);

  const totalSentences = 6;
  const isEs = currentLang === 'es';

  // Navigate between main viewport stages with cooldown
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

  // Stage 0: Automatically reveal the 3 hook sentences in cascade without initial scroll
  useEffect(() => {
    if (currentIndex !== 0) return;

    if (hookSentenceIndex === 0) {
      const t1 = setTimeout(() => {
        setHookSentenceIndex(1);
      }, 3800);
      return () => clearTimeout(t1);
    } else if (hookSentenceIndex === 1) {
      const t2 = setTimeout(() => {
        setHookSentenceIndex(2);
      }, 4400);
      return () => clearTimeout(t2);
    }
  }, [currentIndex, hookSentenceIndex]);

  // Wheel listener: Scrolling down on Stage 0 smoothly enters Section Two (Stage 1)
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

  // Track language switch for smooth dissolve transition
  const [isLangSwitch, setIsLangSwitch] = useState(false);
  const prevLangRef = useRef(currentLang);

  useEffect(() => {
    if (prevLangRef.current !== currentLang) {
      prevLangRef.current = currentLang;
      setIsLangSwitch(true);
      const timer = setTimeout(() => {
        setIsLangSwitch(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [currentLang]);

  // Transition variants: smooth in-place blur & dissolve for language switch, vertical slide for scroll
  const stageVariants = {
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

  // Text crossfade within Stage 0 (The Hook)
  const hookTextVariants = {
    initial: {
      opacity: 0,
      filter: 'blur(14px)',
      y: 20,
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(14px)',
      y: -20,
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="sentence-hero-viewport relative w-full h-screen overflow-hidden bg-[#070709] flex flex-col justify-between items-center px-6 sm:px-10 pt-10 pb-0 m-0 select-none">
      {/* 1. Integrated Bottom Ambient Glow + Dots + Mouse Scroll with Language Support */}
      <BottomAmbientGlow
        onScrollClick={goToNext}
        currentLang={currentLang}
        isLastStage={currentIndex === totalSentences - 1}
      />

      {/* 2. Main Center Stage */}
      <main
        className={`relative z-20 my-auto w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center transition-transform duration-500 ${
          currentIndex === 1 || currentIndex === 2 || currentIndex === 3
            ? '-translate-y-2 sm:-translate-y-4 lg:-translate-y-6'
            : '-translate-y-6 sm:-translate-y-10 lg:-translate-y-12'
        }`}
      >
        <AnimatePresence mode="wait">
          {/* ========================================================
              STAGE 0: The Hook (3 Problem Statements automatically revealed in sequence)
             ======================================================== */}
          {currentIndex === 0 && (
            <motion.div
              key={`stage-hook-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full text-center flex flex-col items-center justify-center px-4"
            >
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
                    <h1 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full">
                      <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                        <span className="font-[200] text-white">
                          {isEs ? '¿Cuánto tarda' : 'How long does it take'}
                        </span>{' '}
                        <span className="font-[700] text-white">
                          {isEs ? 'tu marca' : 'your brand'}
                        </span>
                      </div>
                      <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                        <span className="font-[200] text-white">
                          {isEs ? 'en subirse a una' : 'to jump on a'}
                        </span>{' '}
                        <span className="font-[700] text-white">
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
                    <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full">
                      <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                        <span className="font-[200] text-white">
                          {isEs ? 'Una conversación que' : 'A conversation that'}
                        </span>{' '}
                        <span className="font-[700] text-white">
                          {isEs ? 'prendió,' : 'caught fire,'}
                        </span>{' '}
                        <span className="font-[200] text-white">
                          {isEs ? 'escala en horas.' : 'escalates in hours.'}
                        </span>
                      </div>
                      <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                        <span className="font-[200] text-white">
                          {isEs ? 'Una campaña,' : 'A campaign,'}
                        </span>{' '}
                        <span className="font-[700] text-white">
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
                    <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl md:text-[44px] lg:text-[58px] leading-[1.24] md:leading-[1.2] tracking-[-0.03em] text-white text-center w-full">
                      <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                        <span className="font-[200] text-white">
                          {isEs ? 'Ese gap es un problema' : 'That gap is a problem'}
                        </span>{' '}
                        <span className="font-[700] text-white">
                          {isEs ? 'cada vez más grande.' : 'getting bigger and bigger.'}
                        </span>
                      </div>
                      <div className="block my-1 sm:my-1.5 lg:whitespace-nowrap text-center">
                        <span className="font-[700] text-white">
                          {isEs ? 'Y más caro.' : 'And more expensive.'}
                        </span>
                      </div>
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sub-progress indicators for the 3 hook sentences */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHookSentenceIndex(idx)}
                    className={`transition-all duration-300 rounded-full h-1.5 ${
                      hookSentenceIndex === idx
                        ? 'w-6 bg-[#FF6637] shadow-[0_0_10px_rgba(255,102,55,0.7)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Jump to hook statement ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================
              STAGE 1: Section Two Overview (Meet brandheat + 3 Cascade Cards)
             ======================================================== */}
          {currentIndex === 1 && (
            <motion.div
              key={`stage-overview-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <SectionTwoOverview currentLang={currentLang} />
            </motion.div>
          )}

          {/* ========================================================
              STAGE 2: Section Three (How it Works: From spark to screen)
             ======================================================== */}
          {currentIndex === 2 && (
            <motion.div
              key={`stage-how-it-works-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <SectionThreeHowItWorks currentLang={currentLang} />
            </motion.div>
          )}

          {/* ========================================================
              STAGE 3: Section Four (Our Clients - Logo Grid)
             ======================================================== */}
          {currentIndex === 3 && (
            <motion.div
              key={`stage-clients-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <SectionFourClients currentLang={currentLang} />
            </motion.div>
          )}

          {/* ========================================================
              STAGE 4: Section Five (FEEL THE HEAT - Early Access Form)
             ======================================================== */}
          {currentIndex === 4 && (
            <motion.div
              key={`stage-feel-the-heat-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <SectionFiveFeelTheHeat
                currentLang={currentLang}
                onBackToStart={() => {
                  setHookSentenceIndex(0);
                  setCurrentIndex(0);
                }}
              />
            </motion.div>
          )}

          {/* ========================================================
              STAGE 5: Section Six (Founder member - 5 Interactive Founder Tiles)
             ======================================================== */}
          {currentIndex === 5 && (
            <motion.div
              key={`stage-founders-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <SectionSixFounders
                currentLang={currentLang}
                onBackToStart={() => {
                  setHookSentenceIndex(0);
                  setCurrentIndex(0);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Floating Minimal Navigation Dots (4 Main Stages) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2.5">
        {Array.from({ length: totalSentences }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? 'w-1.5 h-6 bg-[#FF6637] shadow-[0_0_12px_rgba(255,102,55,0.85)]'
                : 'w-1.5 h-3.5 bg-white/[0.10] hover:bg-white/40'
            }`}
            aria-label={`Go to stage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
