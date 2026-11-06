import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ currentLang, onToggleLang, onNavClick, onLogoClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: currentLang === 'es' ? 'Cómo funciona' : 'How it works', href: '#how-it-works' },
    { label: currentLang === 'es' ? 'Manifiesto' : 'Manifesto', href: '#manifesto' },
    { label: currentLang === 'es' ? 'Siente el calor' : 'Feel the heat', href: '#feel-the-heat' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(href);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md bg-[#060709]/40">
      <div className="w-full px-[40px] m-0 h-20 sm:h-24 flex items-center justify-between">
        {/* Brandheat Logo */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FF6637]/40 rounded-lg p-1"
          aria-label="Brand HEAT Home"
        >
          <img
            src="/brandheat-logo.png"
            alt="Brand HEAT"
            className="h-7 sm:h-8 w-auto object-contain brightness-100 transition-opacity duration-300 group-hover:opacity-90"
            style={{ maxHeight: '36px' }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 tracking-wide relative group py-1"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${link.href}-${currentLang}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {link.label}
                </motion.span>
              </AnimatePresence>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#FF6637] to-[#D70417] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right side: Language switcher & mobile menu trigger */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Language selector ES | EN */}
          <div
            className="inline-flex items-center text-xs tracking-wider font-medium text-white/80 bg-white/[0.04] rounded-full px-3 py-1.5 backdrop-blur-sm shadow-sm"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => onToggleLang('es')}
              className={`transition-colors duration-200 px-1.5 py-0.5 rounded ${
                currentLang === 'es'
                  ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(255,102,55,0.6)]'
                  : 'text-white/40 hover:text-white/80'
              }`}
              aria-pressed={currentLang === 'es'}
            >
              ES
            </button>
            <span className="text-white/20 select-none">|</span>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`transition-colors duration-200 px-1.5 py-0.5 rounded ${
                currentLang === 'en'
                  ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(255,102,55,0.6)]'
                  : 'text-white/40 hover:text-white/80'
              }`}
              aria-pressed={currentLang === 'en'}
            >
              EN
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#FF6637]/50"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0a0b0e]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-medium text-white/80 hover:text-white py-2 border-b border-white/[0.04] transition-colors"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${link.href}-${currentLang}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="inline-block"
                    >
                      {link.label}
                    </motion.span>
                  </AnimatePresence>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

