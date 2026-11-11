import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import BottomAmbientGlow from './BottomAmbientGlow';
import {
  SectionOneHero,
  SectionTwoOverview,
  SectionThreeHowItWorks,
  SectionFourClients,
  SectionFiveFeelTheHeat,
  SectionSixFounders,
} from './sections';
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

  // Stage 0: Automatically loop the 3 hook sentences continuously while on Section 1
  useEffect(() => {
    if (currentIndex !== 0) return;

    let delay = 3800;
    if (hookSentenceIndex === 1) delay = 4400;
    if (hookSentenceIndex === 2) delay = 4400;

    const timer = setTimeout(() => {
      setHookSentenceIndex((prev) => (prev + 1) % 3);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, hookSentenceIndex]);

  // Wheel listener: Scrolling down enters subsequent sections
  useEffect(() => {
    const handleWheel = (e) => {
      // Do not intercept if a modal dialog is open or if event target is scrollable
      if (
        document.querySelector('[role="dialog"]') ||
        e.target.closest('[role="dialog"]') ||
        e.target.closest('.custom-dialog-scrollbar') ||
        e.target.closest('.overflow-y-auto')
      ) {
        return;
      }

      e.preventDefault();
      if (isScrollingRef.current) return;

      if (e.deltaY > 25) {
        isScrollingRef.current = true;
        goToNext();
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 420);
      } else if (e.deltaY < -25) {
        isScrollingRef.current = true;
        goToPrev();
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 420);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goToNext, goToPrev]);

  // Touch swipe for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (
        document.querySelector('[role="dialog"]') ||
        e.target.closest('[role="dialog"]') ||
        e.target.closest('.overflow-y-auto')
      ) {
        return;
      }
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (
        document.querySelector('[role="dialog"]') ||
        e.target.closest('[role="dialog"]') ||
        e.target.closest('.overflow-y-auto')
      ) {
        return;
      }
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
      if (
        document.querySelector('[role="dialog"]') ||
        e.target.closest('[role="dialog"]')
      ) {
        // Allow arrow keys and PageUp/PageDown to scroll the modal dialog
        return;
      }

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

  // Fast, smooth single-stage transition with clean opacity and subtle lift (eliminating double-animations)
  const stageVariants = {
    initial: {
      opacity: 0,
      y: isLangSwitch ? 0 : 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isLangSwitch ? 0.24 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: isLangSwitch ? 0 : -8,
      transition: {
        duration: 0.18,
        ease: 'easeOut',
      },
    },
  };



  return (
    <div className="sentence-hero-viewport relative w-full h-screen overflow-hidden bg-[#08090c] flex flex-col justify-between items-center px-6 sm:px-10 pt-10 pb-0 m-0 select-none">
      {/* 1. Integrated Bottom Ambient Glow + Dots + Mouse Scroll with Language Support */}
      <BottomAmbientGlow
        onScrollClick={goToNext}
        currentLang={currentLang}
        isLastStage={currentIndex === totalSentences - 1}
      />

      {/* 2. Main Center Stage */}
      <main
        className={`relative z-20 my-auto w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center transition-transform duration-500 ${
          currentIndex === 0
            ? '-translate-y-4 sm:-translate-y-6 lg:-translate-y-8'
            : 'translate-y-0 sm:translate-y-1'
        }`}
      >
        <AnimatePresence mode="wait">
          {/* ========================================================
              STAGE 0: Section One (The Hook / Narrative Loop)
             ======================================================== */}
          {currentIndex === 0 && (
            <motion.div
              key={`stage-hook-${currentLang}`}
              variants={stageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <SectionOneHero
                currentLang={currentLang}
                hookSentenceIndex={hookSentenceIndex}
                setHookSentenceIndex={setHookSentenceIndex}
              />
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
              STAGE 4: Section Six (Founding Team - The Igniters)
             ======================================================== */}
          {currentIndex === 4 && (
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

          {/* ========================================================
              STAGE 5: Section Five (FEEL THE HEAT - Early Access Form - LAST SECTION)
             ======================================================== */}
          {currentIndex === 5 && (
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
                ? 'w-1.5 h-6 bg-[#ea4325] shadow-[0_0_12px_rgba(234,67,37,0.85)]'
                : 'w-1.5 h-3.5 bg-white/[0.10] hover:bg-white/40'
            }`}
            aria-label={`Go to stage ${index + 1}`}
          />
        ))}
      </div>

      {/* 4. Footer - ONLY appears in the last section (Stage 5) */}
      <AnimatePresence>
        {currentIndex === totalSentences - 1 && (
          <motion.footer
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="sentence-hero-footer"
          >
            <div className="sentence-hero-footer-left">
              <span>brandheat 2026 | All Rights Reserved.</span>
            </div>
            <div className="sentence-hero-footer-right">
              <a
                href="https://www.juanangustia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sentence-hero-footer-link"
              >
                <span>Created by</span>
                <span className="sentence-hero-footer-author">ANGUSTIA</span>
              </a>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
