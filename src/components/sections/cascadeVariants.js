/**
 * cascadeVariants.js
 * Cinematic cascading (staggered waterfall) motion variants for Brand HEAT sections.
 * Features staggered entrance, fluid lift, and soft blur-in reveal matching brand standards.
 */

export const cascadeContainerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.18,
      ease: 'easeOut',
    },
  },
};

export const cascadeItemVariants = {
  initial: {
    opacity: 0,
    y: 22,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.52,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.16,
      ease: 'easeOut',
    },
  },
};

