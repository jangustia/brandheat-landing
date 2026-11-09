import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SentenceHero from './components/SentenceHero';
import InvertedOrangeCursor from './components/InvertedOrangeCursor';
import './App.css';

export default function App() {
  const [currentLang, setCurrentLang] = useState('es');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sentenceIndex, setSentenceIndex] = useState(0);

  // Optional subtle spotlight tracking cursor over the dots
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleToggleLang = (lang) => {
    if (lang !== currentLang) {
      setCurrentLang(lang);
    }
  };

  // Handle header navigation links
  const handleNavClick = (href) => {
    if (href === '#feel-the-heat') {
      // Stage 4: Feel the Heat / Closing CTAs
      setSentenceIndex(4);
    } else if (href === '#how-it-works') {
      // Stage 2: How it Works: From spark to screen (5 steps)
      setSentenceIndex(2);
    } else if (href === '#manifesto') {
      // Stage 1: Meet brandheat & 3 Pillars (Anticipa, Crea, Escala)
      setSentenceIndex(1);
    }
  };

  const handleLogoClick = () => {
    setSentenceIndex(0);
  };

  return (
    <div className="app-container relative w-screen h-screen overflow-hidden bg-[#08090c] text-[#ffffff] selection:bg-[#ea4325]/30 selection:text-white m-0 p-0">
      {/* Precision Inverted Orange Custom Cursor */}
      <InvertedOrangeCursor />

      {/* 1. Global Subtle Mouse Spotlight Layer */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700 opacity-25"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(234, 67, 37, 0.08), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onNavClick={handleNavClick}
        onLogoClick={handleLogoClick}
      />

      {/* 3. Hero Viewport with Sentences Revealed on Scroll */}
      <SentenceHero
        currentLang={currentLang}
        currentIndex={sentenceIndex}
        onIndexChange={setSentenceIndex}
      />
    </div>
  );
}
