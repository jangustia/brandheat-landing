import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './InvertedOrangeCursor.css';

/**
 * InvertedOrangeCursor Component
 * - Sleek precision custom cursor with inverted difference blend mode.
 * - When hovering regular text: expands to a 44px inverted lens.
 * - When hovering bold text (strong, .font-[700], .font-bold): expands to 74px in vibrant Brand HEAT Orange (#FF6637).
 * - When hovering clickable buttons/links: expands with an orange glowing ring.
 * - Mousedown click feedback with elastic recoil.
 * - Seamlessly hidden on mobile / touch devices.
 */
export default function InvertedOrangeCursor() {
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'text' | 'bold' | 'clickable'
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Instant coordinates for pinpoint micro-dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth responsive spring physics for the fluid expanding outer ring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on pointer-fine devices (disable on touchscreens)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorMode('default');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Deep inspect element hierarchy on mouseover
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // 1. Check for clickable / interactive controls
      const isClickable = target.closest(
        'button, a, input, select, textarea, [role="button"], .ambient-mouse-indicator, [data-cursor="clickable"]'
      );
      if (isClickable) {
        setCursorMode('clickable');
        return;
      }

      // 2. Check for bold text in target or its immediate parents
      let isBold = false;
      let curr = target;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        if (curr.matches && curr.matches('strong, b, [data-cursor="bold"]')) {
          isBold = true;
          break;
        }

        const cls = typeof curr.className === 'string' ? curr.className : '';
        if (
          cls.includes('font-[700]') ||
          cls.includes('font-bold') ||
          cls.includes('font-[800]') ||
          cls.includes('font-black') ||
          cls.includes('text-orange-400') ||
          cls.includes('text-[#FF6637]')
        ) {
          isBold = true;
          break;
        }

        try {
          const fw = window.getComputedStyle(curr).fontWeight;
          if (parseInt(fw, 10) >= 600) {
            isBold = true;
            break;
          }
        } catch {
          // ignore
        }

        curr = curr.parentElement;
      }

      if (isBold) {
        setCursorMode('bold');
        return;
      }

      // 3. Check for regular text elements
      const textEl = target.closest('p, h1, h2, h3, h4, h5, h6, span, li, label, blockquote, [data-cursor="text"]');
      if (textEl && textEl.textContent && textEl.textContent.trim().length > 0) {
        setCursorMode('text');
        return;
      }

      // 4. Default state
      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Dynamic visual parameters for each interaction state
  const getVariants = () => {
    switch (cursorMode) {
      case 'bold':
        return {
          width: 76,
          height: 76,
          backgroundColor: '#FF6637',
          boxShadow: 'none',
          border: '0px solid transparent',
          mixBlendMode: 'difference',
          scale: isClicking ? 0.88 : 1,
        };
      case 'clickable':
        return {
          width: 54,
          height: 54,
          backgroundColor: 'rgba(255, 102, 55, 0.22)',
          boxShadow: '0 0 20px rgba(255, 102, 55, 0.55)',
          border: '2px solid #FF6637',
          mixBlendMode: 'normal',
          scale: isClicking ? 0.82 : 1,
        };
      case 'text':
        return {
          width: 44,
          height: 44,
          backgroundColor: '#ffffff',
          boxShadow: 'none',
          border: '0px solid transparent',
          mixBlendMode: 'difference',
          scale: isClicking ? 0.85 : 1,
        };
      case 'default':
      default:
        return {
          width: 14,
          height: 14,
          backgroundColor: '#ffffff',
          boxShadow: 'none',
          border: '0px solid transparent',
          mixBlendMode: 'difference',
          scale: isClicking ? 0.75 : 1,
        };
    }
  };

  const variants = getVariants();

  return (
    <>
      {/* 1. Fluid Expanding Outer Lens / Inverted Orange Ring */}
      <motion.div
        className="inverted-orange-cursor"
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={variants}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.4,
        }}
        aria-hidden="true"
      />

      {/* 2. Micro Pinpoint Center Dot - Only appears when hovering a link or clickable control */}
      <motion.div
        className="inverted-orange-cursor-dot"
        style={{
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible && cursorMode === 'clickable' ? 1 : 0,
          scale: isVisible && cursorMode === 'clickable' ? (isClicking ? 0.75 : 1) : 0,
        }}
        transition={{
          duration: 0.18,
          ease: 'easeOut',
        }}
        aria-hidden="true"
      />
    </>
  );
}
