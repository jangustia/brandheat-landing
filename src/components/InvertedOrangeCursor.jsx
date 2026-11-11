import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './InvertedOrangeCursor.css';

/**
 * InvertedOrangeCursor Component
 * - Sleek precision custom cursor with inverted difference blend mode.
 * - Reactive states:
 *   - Hovering regular text: expands to a 44px inverted lens.
 *   - Hovering bold text: expands to 76px in vibrant Brand HEAT Orange (#ea4325).
 *   - Hovering clickable controls (buttons, links): expands with an orange glowing ring and pinpoint dot.
 *   - Hovering input/textarea: preserves native I-beam cursor for typing precision.
 *   - Mousedown click feedback with elastic recoil.
 * - Robust cross-platform fail-safe backup:
 *   - Native cursor is active by default.
 *   - Only hides native cursor via .has-custom-cursor class once verified mouse movement occurs.
 *   - Instantly falls back to native cursor on touch, window blur, mouseleave, reduced-motion,
 *     or Windows high-contrast mode.
 */
export default function InvertedOrangeCursor() {
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'text' | 'bold' | 'clickable' | 'input'
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isEnabledRef = useRef(false);

  // Instant coordinates for pinpoint micro-dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth responsive spring physics for the fluid expanding outer ring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fail-safe check: Only enable on fine pointer (mouse/trackpad), not touch-only devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isForcedColors = window.matchMedia('(forced-colors: active)').matches;

    // If device doesn't support fine pointer or user requested reduced motion / high contrast:
    // Keep native cursor as 100% backup!
    if (!isFinePointer || isReducedMotion || isForcedColors) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    isEnabledRef.current = true;

    const activateCustomCursor = () => {
      if (!document.documentElement.classList.contains('has-custom-cursor')) {
        document.documentElement.classList.add('has-custom-cursor');
      }
      setIsVisible(true);
    };

    const deactivateCustomCursor = () => {
      document.documentElement.classList.remove('has-custom-cursor');
      setIsVisible(false);
      setCursorMode('default');
    };

    const handleMouseMove = (e) => {
      // Validate that pointer is within viewport bounds
      if (
        e.clientX < 0 ||
        e.clientY < 0 ||
        e.clientX > window.innerWidth ||
        e.clientY > window.innerHeight
      ) {
        deactivateCustomCursor();
        return;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) {
        activateCustomCursor();
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      deactivateCustomCursor();
    };

    const handleMouseEnter = (e) => {
      if (e.clientX >= 0 && e.clientY >= 0) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        activateCustomCursor();
      }
    };

    // When window loses focus (e.g. user Alt+Tabs on Windows or clicks taskbar)
    const handleWindowBlur = () => {
      deactivateCustomCursor();
    };

    // If user touches the screen on a Windows 2-in-1 / touchscreen laptop, fallback immediately to native
    const handleTouchStart = () => {
      deactivateCustomCursor();
    };

    // Optimized element hierarchy inspection without layout thrashing
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // 1. Text input / textarea: preserve native cursor experience
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorMode('input');
        return;
      }

      // 2. Clickable / interactive controls
      if (
        target.closest(
          'button, a, select, [role="button"], .ambient-mouse-indicator, [data-cursor="clickable"], .cursor-pointer'
        )
      ) {
        setCursorMode('clickable');
        return;
      }

      // 3. Bold / Emphasized text
      if (
        target.closest(
          'strong, b, [data-cursor="bold"], .section-one-bold, .section-three-title-bold, .section-four-title-bold, .section-five-title-bold, .font-bold, .font-extrabold, .font-black, [class*="font-[700]"], [class*="font-[800]"]'
        )
      ) {
        setCursorMode('bold');
        return;
      }

      // 4. Regular narrative text
      const textEl = target.closest(
        'p, h1, h2, h3, h4, h5, h6, span, li, label, blockquote, [data-cursor="text"]'
      );
      if (textEl && textEl.textContent && textEl.textContent.trim().length > 0) {
        setCursorMode('text');
        return;
      }

      // 5. Default background / empty space
      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [mouseX, mouseY, isVisible]);

  // Dynamic visual parameters for each interaction state
  const getVariants = () => {
    switch (cursorMode) {
      case 'input':
        return {
          width: 0,
          height: 0,
          opacity: 0,
          backgroundColor: '#ea4325',
          boxShadow: 'none',
          border: '0px solid transparent',
          mixBlendMode: 'normal',
          scale: 0,
        };
      case 'bold':
        return {
          width: 76,
          height: 76,
          opacity: isVisible ? 1 : 0,
          backgroundColor: '#ea4325',
          boxShadow: 'none',
          border: '0px solid transparent',
          mixBlendMode: 'difference',
          scale: isClicking ? 0.88 : 1,
        };
      case 'clickable':
        return {
          width: 54,
          height: 54,
          opacity: isVisible ? 1 : 0,
          backgroundColor: 'rgba(234, 67, 37, 0.22)',
          boxShadow: '0 0 20px rgba(234, 67, 37, 0.55)',
          border: '2px solid #ea4325',
          mixBlendMode: 'normal',
          scale: isClicking ? 0.82 : 1,
        };
      case 'text':
        return {
          width: 44,
          height: 44,
          opacity: isVisible ? 1 : 0,
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
          opacity: isVisible ? 1 : 0,
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

      {/* 2. Micro Pinpoint Center Dot - Appears when hovering a link or clickable control */}
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
