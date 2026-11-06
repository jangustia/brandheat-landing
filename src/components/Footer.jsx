import React from 'react';
import './Footer.css';

export default function Footer({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  return (
    <footer className="relative z-20 border-t border-white/[0.06] bg-[#060709] py-12 px-6 sm:px-8 lg:px-12 text-white/50 text-xs font-light">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/brandheat-logo.png"
            alt="Brand HEAT"
            className="h-6 w-auto object-contain opacity-70"
          />
          <span className="text-white/30">|</span>
          <span>© {new Date().getFullYear()} Brand HEAT Inc. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
        </div>

        <div className="flex items-center gap-6 text-white/50">
          <a href="#" className="hover:text-white transition-colors">
            {isEs ? 'Privacidad' : 'Privacy'}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {isEs ? 'Términos' : 'Terms'}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {isEs ? 'Contacto' : 'Contact'}
          </a>
        </div>
      </div>
    </footer>
  );
}

