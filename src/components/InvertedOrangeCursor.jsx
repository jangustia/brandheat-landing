import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './InvertedOrangeCursor.css';

/**
 * InvertedOrangeCursor Component
 * - Sleek precision custom cursor with inverted difference blend mode.
 * - When hovering regular text: expands to a 44px inverted lens.
 * - When hovering bold text (strong, .font-[700], .font-bold): expands to 76px in vibrant Brand HEAT Orange (#ea4325).
 * - When hovering clickable buttons/links/inputs: expands with an orange glowing ring and pinpoint center dot.
 * - Mousedown click feedback with elastic recoil.
 * - Seamlessly hidden on mobile / touch devices.
 *
 * Windows & Fail-safe Backup:
 * - The inverse custom cursor is active by default across browsers and operating systems.
 * - If there are rendering issues (unsupported mix-blend-mode, Windows High Contrast mode,
 *   touch interactions on Surface/2-in-1s, or runtime exceptions), it automatically activates
 *   the native system backup cursor (.use-native-cursor-backup).
 */
export default function InvertedOrangeCursor() {
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'text' | 'bold' | 'clickable'
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Instant coordinates for pinpoint micro-dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth responsive spring physics for the fluid expanding outer ring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // 1. Check if device has a fine pointer (mouse / trackpad)
      if (!window.matchMedia('(pointer: fine)').matches) {
        document.documentElement.classList.add('use-native-cursor-backup');
        return;
      }

      // 2. Check if mix-blend-mode: difference is supported
      const supportsBlendMode =
        typeof CSS !== 'undefined' &&
        CSS.supports &&
        CSS.supports('mix-blend-mode', 'difference');

      // 3. Check Windows High Contrast mode
      const isHighContrast =
        window.matchMedia &&
        window.matchMedia('(forced-colors: active)').matches;

      // In case there are problems displaying the inverse cursor, activate native backup
      if (!supportsBlendMode || isHighContrast) {
        document.documentElement.classList.add('use-native-cursor-backup');
        setHasError(true);
        return;
      }

      // Normal state: inverse cursor active, remove any backup flag
      document.documentElement.classList.remove('use-native-cursor-backup');

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

      const handleTouchStart = () => {
        // Fallback for touch events (e.g. Windows Surface / 2-in-1 laptops)
        setIsVisible(false);
        document.documentElement.classList.add('use-native-cursor-backup');
      };

      // Element inspection on mouseover (restored to original behavior)
      const handleMouseOver = (e) => {
        const target = e.target;
        if (!target || !(target instanceof Element)) return;

        // 1. Interactive controls (including inputs, buttons, links, etc.)
        const isClickable = target.closest(
          'button, a, input, select, textarea, [role="button"], .ambient-mouse-indicator, [data-cursor="clickable"], .cursor-pointer'
        );
        if (isClickable) {
          setCursorMode('clickable');
          return;
        }

        // 2. Bold text elements
        const isBoldEl = target.closest(
          'strong, b, [data-cursor="bold"], .section-one-bold, .section-three-title-bold, .section-four-title-bold, .section-five-title-bold, .font-bold, .font-extrabold, .font-black, [class*="font-[700]"], [class*="font-[800]"]'
        );
        if (isBoldEl) {
          setCursorMode('bold');
          return;
        }

        // 3. Regular text elements
        const textEl = target.closest(
          'p, h1, h2, h3, h4, h5, h6, span, li, label, blockquote, [data-cursor="text"]'
        );
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
      window.addEventListener('touchstart', handleTouchStart, { passive: true });

      return () => {
        document.documentElement.classList.remove('use-native-cursor-backup');
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        window.removeEventListener('blur', handleMouseLeave);
        window.removeEventListener('touchstart', handleTouchStart);
      };
    } catch (err) {
      console.error('[BrandHEAT Cursor Backup]:', err);
      document.documentElement.classList.add('use-native-cursor-backup');
      setHasError(true);
    }
  }, [mouseX, mouseY, isVisible]);

  if (hasError) {
    return null;
  }

  // Dynamic visual parameters for each interaction state (identical to original)
  const getVariants = () => {
    switch (cursorMode) {
      case 'bold':
        return {
          width: 76,
          height: 76,
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
