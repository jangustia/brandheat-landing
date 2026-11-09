import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame } from 'lucide-react';

/**
 * ManifestoModal Component
 * Renders the Brand HEAT Manifesto in a Level 4 modal dialog:
 * - Rendered via createPortal to document.body to ensure full viewport centering
 * - Scrim: rgba(0, 0, 0, 0.80) with backdrop-filter: blur(20px)
 * - Container: Level 4 (#161618), border: 1px solid rgba(255, 255, 255, 0.08), rounded-[28px]
 * - Warm dark badge: #44251c with #ea4325 text
 * - Dual-language support (ES / EN) matching the user specification
 * - Keyboard Escape listener & click-outside to close
 */
export default function ManifestoModal({ isOpen, onClose, currentLang = 'es' }) {
  const isEs = currentLang === 'es';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Optional query param scroll support for automated testing
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const scrollParam = params.get('scroll');
      if (scrollParam) {
        const t = setTimeout(() => {
          const el = document.querySelector('.custom-dialog-scrollbar');
          if (el) {
            if (scrollParam === 'bottom') el.scrollTop = el.scrollHeight;
            else el.scrollTop = parseInt(scrollParam, 10);
          }
        }, 200);
        return () => clearTimeout(t);
      }
    }
  }, [isOpen]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-[20px] cursor-pointer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="manifesto-title"
        >
          {/* Modal Shell (Level 4: #161618) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[82vh] flex flex-col bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[24px] sm:rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.9)] cursor-default overflow-hidden my-auto"
          >
            {/* Modal Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(255,255,255,0.06)] bg-[#161618]/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#44251c] text-[#ea4325] border border-[rgba(234,67,37,0.35)] text-[11px] font-['Manrope',sans-serif] font-[700] uppercase tracking-wider">
                  <Flame className="w-3 h-3 text-[#ea4325]" />
                  <span>{isEs ? 'MANIFIESTO' : 'MANIFESTO'}</span>
                </span>
                <span className="text-xs font-['Inter',sans-serif] font-[500] text-[#8D8F93] hidden sm:inline">
                  Brand HEAT
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#212121] hover:bg-[#272727] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8D8F93] hover:text-[#ffffff] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ea4325]/40"
                aria-label={isEs ? 'Cerrar manifiesto' : 'Close manifesto'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Content: flex-1 min-h-0 allows flexbox child to scroll within max-height */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 sm:px-8 md:px-10 py-6 sm:py-8 custom-dialog-scrollbar space-y-6 text-left font-['Inter',sans-serif]">
              {isEs ? (
                /* ========================================================
                   SPANISH MANIFESTO
                   ======================================================== */
                <>
                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>Nos bombardean con miles de mensajes por día.</p>
                    <p>Casi todos quieren vendernos algo.</p>
                    <p className="font-[600] text-[#ffffff]">Aprendimos a no escucharlos.</p>
                  </div>

                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>Lo que sí escuchamos es otra cosa.</p>
                    <p>Lo que nos interesa. Los temas que elegimos, que compartimos con nuestra gente.</p>
                    <p className="font-[600] text-[#ffffff]">Ahí está la atención. Ahí está la emoción. Ahí pasa todo.</p>
                  </div>

                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>Las marcas lo saben, y aun así siguen gritando desde afuera.</p>
                    <p>Llegan tarde. O no llegan.</p>
                    <p>Y después se preguntan por qué cuesta tanto vender y crecer.</p>
                  </div>

                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed p-4 rounded-2xl bg-[#212121]/60 border border-[rgba(255,255,255,0.06)]">
                    <p className="font-[700] text-[#ffffff]">Nosotros creemos otra cosa.</p>
                    <p>No hay que meter temas nuevos en la cabeza de la gente.</p>
                    <p className="font-[600] text-[#ea4325]">Hay que escuchar y entender, para poder participar.</p>
                  </div>

                  <div className="space-y-2 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>Creemos que una conversación es un lugar, no un canal.</p>
                    <p>Que no se entra con presupuesto, se entra con algo que decir.</p>
                    <p>Que las voces que importan son las que estaban cuando algo se puso caliente, no las que aparecen cuando ya se enfrió.</p>
                  </div>

                  <div className="space-y-2 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p className="font-[700] text-[#ffffff]">Para eso nace Brand Heat.</p>
                    <p>Para escuchar antes de hablar.</p>
                    <p>Para detectar el calor antes de que sea fuego.</p>
                    <p>Para que una marca llegue a tiempo, diciendo algo relevante que sume, y se vaya antes de molestar.</p>
                  </div>

                  <div className="space-y-2 text-sm sm:text-base text-[#E1E1E1] leading-relaxed pt-2">
                    <p>Las personas ya están hablando.</p>
                    <p className="font-[700] text-[#ffffff] text-base sm:text-lg">
                      La pregunta es si tu marca va a estar en la conversación o va a seguir interrumpiéndola.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-[800] text-lg sm:text-xl text-[#ffffff] tracking-tight">
                        brand<span className="text-[#ea4325]">heat.</span>
                      </span>
                      <span className="font-[600] text-xs sm:text-sm text-[#E1E1E1] mt-1">
                        Always on time.
                      </span>
                      <span className="font-[600] text-xs sm:text-sm text-[#ea4325]">
                        Always on point.
                      </span>
                    </div>

                    <div className="text-[11px] font-[500] text-[#8D8F93]">
                      #AlwaysOn
                    </div>
                  </div>
                </>
              ) : (
                /* ========================================================
                   ENGLISH MANIFESTO
                   ======================================================== */
                <>
                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>We’re hit with thousands of messages a day.</p>
                    <p>Almost all of them trying to sell us something.</p>
                    <p className="font-[600] text-[#ffffff]">We've learned to tune them out.</p>
                  </div>

                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>But there's something we do listen to.</p>
                    <p>The things we care about. The topics we choose. The conversations we share with our people.</p>
                    <p className="font-[600] text-[#ffffff]">That's where attention lives. That's where emotions ignite. That's where everything happens.</p>
                  </div>

                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>Brands know this.</p>
                    <p>And yet, they keep shouting from the outside.</p>
                    <p>They show up late. Or not at all.</p>
                    <p>And then they wonder why it's so hard to sell. So hard to grow. So hard to matter.</p>
                  </div>

                  <div className="space-y-1.5 text-sm sm:text-base text-[#E1E1E1] leading-relaxed p-4 rounded-2xl bg-[#212121]/60 border border-[rgba(255,255,255,0.06)]">
                    <p className="font-[700] text-[#ffffff]">It's not about putting new ideas into people's heads.</p>
                    <p className="font-[600] text-[#ea4325]">It's about listening. Understanding. And earning the right to participate.</p>
                  </div>

                  <div className="space-y-2 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p>We believe a conversation is a place, not a channel.</p>
                    <p>You don’t get in with a budget. You get in with something to say.</p>
                    <p>And the voices that matter aren't the ones that show up when the heat is gone.</p>
                    <p>They're the ones that were there when the first sparks flew.</p>
                  </div>

                  <div className="space-y-2 text-sm sm:text-base text-[#E1E1E1] leading-relaxed">
                    <p className="font-[700] text-[#ffffff]">That’s why Brand Heat exists.</p>
                    <p>To listen before speaking. To feel the heat before it turns to fire.</p>
                    <p>To help brands show up at the right moment, with something relevant, something that adds real value.</p>
                    <p>And to know when to step away.</p>
                  </div>

                  <div className="space-y-2 text-sm sm:text-base text-[#E1E1E1] leading-relaxed pt-2">
                    <p>People are already talking.</p>
                    <p className="text-sm sm:text-base text-[#E1E1E1]">The only question is:</p>
                    <p className="font-[700] text-[#ffffff] text-base sm:text-lg">
                      Will your brand be part of the conversation… Or will it keep interrupting it?
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-[800] text-lg sm:text-xl text-[#ffffff] tracking-tight">
                        brand<span className="text-[#ea4325]">heat.</span>
                      </span>
                      <span className="font-[600] text-xs sm:text-sm text-[#E1E1E1] mt-1">
                        Always on time.
                      </span>
                      <span className="font-[600] text-xs sm:text-sm text-[#E1E1E1]">
                        Always on point.
                      </span>
                      <span className="font-[600] text-xs sm:text-sm text-[#ea4325]">
                        Always on.
                      </span>
                    </div>

                    <div className="text-[11px] font-[500] text-[#8D8F93]">
                      #AlwaysOn
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
