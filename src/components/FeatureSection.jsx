import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Compass, Sparkles, TrendingUp, Clock } from 'lucide-react';
import './FeatureSection.css';

export default function FeatureSection({ currentLang = 'es' }) {
  const isEs = currentLang === 'es';

  const cards = [
    {
      icon: <Compass className="w-6 h-6 text-[#FF6637]" />,
      badge: isEs ? 'Detección en tiempo real' : 'Real-time Radar',
      title: isEs ? 'Radar Cultural & Social Heat' : 'Cultural Radar & Social Heat',
      description: isEs
        ? 'Monitorea picos de conversación antes de que se vuelvan mainstream. Detecta el momento exacto en que tu marca debe participar.'
        : 'Monitor conversation spikes before they hit mainstream. Detect the exact window when your brand should engage.',
      stat: '0.4s',
      statLabel: isEs ? 'latencia de detección' : 'detection latency',
      glow: '#FF6637',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#D70417]" />,
      badge: isEs ? 'Velocidad de reacción' : 'Reaction Velocity',
      title: isEs ? 'De 72 horas a 15 minutos' : 'From 72 hours to 15 minutes',
      description: isEs
        ? 'Las agencias tradicionales tardan días en aprobar un post. Con Brand HEAT analizas el contexto y lanzas tu activación mientras la tendencia arde.'
        : 'Traditional agencies take days to approve content. Brand HEAT lets you analyze context and launch activation while the trend is blazing.',
      stat: '15 min',
      statLabel: isEs ? 'tiempo promedio de activación' : 'average activation time',
      glow: '#D70417',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#3E3183]" />,
      badge: isEs ? 'Inteligencia Creativa' : 'Creative AI Studio',
      title: isEs ? 'Generación de Contenido On-Brand' : 'On-Brand Content Studio',
      description: isEs
        ? 'Propuestas creativas alineadas a la voz, tono y valores de tu marca. Copys, copys visuales y ángulos de enfoque listos para publicar.'
        : 'Creative ideas aligned to your brand voice, tone, and guardrails. Ready-to-publish copy, visual angles, and strategic hooks.',
      stat: '98%',
      statLabel: isEs ? 'afinidad de tono' : 'tone affinity match',
      glow: '#3E3183',
    },
  ];

  return (
    <section id="how-it-works" className="relative z-20 py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-[#FF6637] mb-4"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>{isEs ? 'El Poder de la Inmediatez' : 'The Power of Immediacy'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6"
        >
          {isEs ? (
            <>
              La cultura no espera a tu <span className="font-bold text-white">comité de aprobación</span>.
            </>
          ) : (
            <>
              Culture doesn't wait for your <span className="font-bold text-white">approval committee</span>.
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 font-light leading-relaxed"
        >
          {isEs
            ? 'Cuando una tendencia explota en redes sociales, la ventana de relevancia de una marca dura menos de 4 horas. Brand HEAT te sitúa en el epicentro antes de que se enfríe.'
            : 'When a cultural conversation explodes, a brand’s relevance window lasts less than 4 hours. Brand HEAT puts you at the epicenter before it cools down.'}
        </motion.p>
      </div>

      {/* 3 Pillars / Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl bg-[#0c0d12]/70 border border-white/[0.08] p-8 overflow-hidden backdrop-blur-md flex flex-col justify-between"
          >
            {/* Ambient Card Hover Glow */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: card.glow }}
            />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  {card.icon}
                </div>
                <span className="text-xs font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.05]">
                  {card.badge}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                {card.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                {card.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-bold text-white tracking-tight">
                  {card.stat}
                </div>
                <div className="text-xs text-white/40 font-light mt-0.5">
                  {card.statLabel}
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 rounded-3xl p-8 sm:p-12 border border-white/[0.1] relative overflow-hidden text-center bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl"
      >
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-50"
          style={{ background: 'radial-gradient(circle, #FF6637 0%, #D70417 60%, transparent 80%)' }}
        />

        <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 relative z-10">
          {isEs ? '¿Listo para encender tu marca?' : 'Ready to ignite your brand?'}
        </h3>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-8 relative z-10 font-light">
          {isEs
            ? 'Únete a las marcas líderes que ya están liderando las conversaciones culturales en tiempo real.'
            : 'Join leading brands that are already commanding cultural conversations in real time.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
          <a
            href="mailto:contact@brandheat.ai"
            className="px-8 py-3.5 rounded-full font-medium text-sm text-white bg-gradient-to-r from-[#FF6637] to-[#D70417] hover:brightness-110 shadow-[0_0_24px_rgba(255,102,55,0.4)] transition-all duration-300 hover:scale-105"
          >
            {isEs ? 'Solicitar Acceso Temprano' : 'Request Early Access'}
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-full font-medium text-sm text-white/80 hover:text-white bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-all duration-300"
          >
            {isEs ? 'Ver Demostración' : 'Watch Demo'}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

