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
      // Jump directly to the final closing scroll section (index 11 of 12)
      setSentenceIndex(11);
    } else if (href === '#manifesto') {
      setSentenceIndex(4); // Meet brandheat
    } else if (href === '#how-it-works') {
      setSentenceIndex(8); // One platform to detect, create...
    }
  };

  const handleLogoClick = () => {
    setSentenceIndex(0);
  };

  return (
    <div className="app-container relative w-screen h-screen overflow-hidden bg-[#070709] text-white selection:bg-[#FF5722]/30 selection:text-white m-0 p-0">
      {/* Precision Inverted Orange Custom Cursor */}
      <InvertedOrangeCursor />

      {/* 1. Global Subtle Mouse Spotlight Layer */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700 opacity-25"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 87, 34, 0.08), transparent 80%)`,
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
