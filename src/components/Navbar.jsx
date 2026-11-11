import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ManifestoModal from './ManifestoModal';
import './Navbar.css';

/**
 * Navbar Component
 * Displays the 5 main sections in the top header navigation:
 * - MEET BRANDHEAT
 * - CÓMO FUNCIONA (HOW IT WORKS)
 * - OUR CLIENTS
 * - FEEL THE HEAT
 * - FOUNDER
 * Next to the language selector on the left:
 * - MANIFIESTO (MANIFESTO) button opening the full manifesto dialog.
 * All items in ALL CAPS, bold (font-[700]), and calibrated to design.md tokens.
 */
export default function Navbar({
  currentLang = 'es',
  currentIndex = 0,
  onToggleLang,
  onNavClick,
  onLogoClick,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('manifesto') === 'true';
    }
    return false;
  });

  const navLinks = [
    {
      label: 'MEET BRANDHEAT',
      href: '#meet-brandheat',
      stage: 1,
    },
    {
      label: currentLang === 'es' ? 'CÓMO FUNCIONA' : 'HOW IT WORKS',
      href: '#how-it-works',
      stage: 2,
    },
    {
      label: 'OUR CLIENTS',
      href: '#clients',
      stage: 3,
    },
    {
      label: 'FOUNDER',
      href: '#founders',
      stage: 4,
    },
    {
      label: 'FEEL THE HEAT',
      href: '#feel-the-heat',
      stage: 5,
    },
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-md bg-[#08090c]/70">
      <div className="w-full px-4 sm:px-8 lg:px-10 m-0 h-16 sm:h-24 flex items-center justify-between">
        {/* Brandheat Logo */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="group flex items-center gap-2 sm:gap-3 transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#ea4325]/40 rounded-lg p-1"
          aria-label="Brand HEAT Home"
        >
          <img
            src="/brandheat-logo.png"
            alt="Brand HEAT"
            className="h-6 sm:h-8 w-auto object-contain brightness-100 transition-opacity duration-300 group-hover:opacity-90"
            style={{ maxHeight: '36px' }}
          />
        </a>

        {/* Desktop Navigation Links: ALL CAPS & BOLD */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentIndex === link.stage;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[11px] lg:text-xs xl:text-[13px] font-['Manrope',sans-serif] font-[800] uppercase tracking-[0.06em] transition-colors duration-200 relative group py-1 select-none ${
                  isActive ? 'text-[#ffffff]' : 'text-[#C5C5C5] hover:text-[#ffffff]'
                }`}
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

                {/* Active & Hover Underline Indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#ea4325] transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-full shadow-[0_0_10px_rgba(234,67,37,0.75)]'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right side: Manifesto Button, Language switcher & mobile menu trigger */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-4.5">
          {/* Manifiesto Button: Next to the language component on the left */}
          <button
            type="button"
            onClick={() => setManifestoOpen(true)}
            className="inline-flex items-center px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border-0 outline-none text-[11px] sm:text-xs font-['Manrope',sans-serif] font-[800] uppercase tracking-[0.06em] text-[#E1E1E1] hover:text-[#ffffff] transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ea4325]/40 select-none"
            aria-label={currentLang === 'es' ? 'Abrir manifiesto' : 'Open manifesto'}
          >
            <span>{currentLang === 'es' ? 'MANIFIESTO' : 'MANIFESTO'}</span>
          </button>

          {/* Language selector ES | EN */}
          <div
            className="inline-flex items-center text-xs tracking-wider font-['Inter',sans-serif] font-[500] text-white/80 bg-white/[0.04] rounded-full px-3 py-1.5 backdrop-blur-sm shadow-sm"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => onToggleLang('es')}
              className={`transition-colors duration-200 px-1.5 py-0.5 rounded cursor-pointer ${
                currentLang === 'es'
                  ? 'text-[#ea4325] font-bold drop-shadow-[0_0_8px_rgba(234,67,37,0.45)]'
                  : 'text-[#8D8F93] hover:text-[#ffffff]'
              }`}
              aria-pressed={currentLang === 'es'}
            >
              ES
            </button>
            <span className="text-white/20 select-none">|</span>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`transition-colors duration-200 px-1.5 py-0.5 rounded cursor-pointer ${
                currentLang === 'en'
                  ? 'text-[#ea4325] font-bold drop-shadow-[0_0_8px_rgba(234,67,37,0.45)]'
                  : 'text-[#8D8F93] hover:text-[#ffffff]'
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
            className="md:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#ea4325]/50 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with all 5 sections & Manifesto in ALL CAPS & Bold */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#08090c]/95 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.08)] px-6 py-6"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = currentIndex === link.stage;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-sm font-['Manrope',sans-serif] font-[800] uppercase tracking-[0.06em] py-2.5 border-b border-white/[0.04] transition-colors flex items-center justify-between ${
                      isActive ? 'text-[#ffffff]' : 'text-[#C5C5C5] hover:text-[#ffffff]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#ea4325] shadow-[0_0_8px_rgba(234,67,37,0.9)]" />
                    )}
                  </a>
                );
              })}

              {/* Mobile Manifesto Action */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setManifestoOpen(true);
                }}
                className="mt-2 text-sm font-['Manrope',sans-serif] font-[800] uppercase tracking-[0.06em] py-2.5 text-[#ea4325] flex items-center cursor-pointer"
              >
                <span>{currentLang === 'es' ? 'MANIFIESTO' : 'MANIFESTO'}</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level 4 Interactive Manifesto Modal Dialog */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
        currentLang={currentLang}
      />
    </header>
  );
}
