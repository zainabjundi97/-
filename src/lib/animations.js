/** Shared motion variants — reuse these; don't hand-roll per component. */

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const duration = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
  count: 0.9,
};

export const stagger = {
  word: 0.08,
  card: 0.12,
  type: 0.03,
};

/** Magnetic CTA pull toward pointer. */
export const magnetic = {
  strength: 0.35,
  spring: { stiffness: 280, damping: 22, mass: 0.5 },
};

/** 3D pointer-tilt (Motion useMotionValue pattern). */
export const tilt = {
  maxDeg: 10,
  perspective: 800,
  spring: { stiffness: 260, damping: 24, mass: 0.6 },
};

export const typeChar = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast * 0.5, ease: EASE_OUT },
  },
};

export const typeContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.type,
    },
  },
};

export const cursorBlink = {
  opacity: [1, 0, 1],
  transition: {
    duration: duration.slow,
    repeat: Infinity,
    ease: 'linear',
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: EASE_OUT },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: EASE_OUT },
  },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: EASE_OUT },
  },
};

export const scaleFade = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: duration.fast, ease: EASE_OUT },
  },
};

export const wordReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: EASE_OUT },
  },
};

export const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.word,
      delayChildren: 0.05,
    },
  },
};

/** Subtitle starts after heading word stagger completes. */
export function subtitleDelay(wordCount) {
  return 0.05 + wordCount * stagger.word + duration.base;
}

export const cardStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.card,
      delayChildren: 0.05,
    },
  },
};

export const cardItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: EASE_OUT },
  },
  hover: {
    y: -4,
    boxShadow: '0 12px 32px -8px rgba(139, 92, 246, 0.45)',
    transition: { duration: duration.fast, ease: EASE_OUT },
  },
};

export const iconHover = {
  rotate: 8,
  y: -2,
  transition: {
    duration: duration.fast,
    ease: EASE_OUT,
    type: 'spring',
    stiffness: 400,
    damping: 18,
  },
};

/** Child icon reacts when parent card enters `hover` variant. */
export const iconHoverVariant = {
  hover: iconHover,
};

/** One-shot glow pulse (1–2 beats) then settle — not continuous. */
export const glowPulseOnce = {
  hidden: {
    boxShadow: '0 0 0 0 rgba(139, 92, 246, 0)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  visible: {
    boxShadow: [
      '0 0 0 0 rgba(139, 92, 246, 0)',
      '0 0 20px 2px rgba(139, 92, 246, 0.45)',
      '0 0 8px 0 rgba(139, 92, 246, 0.2)',
    ],
    borderColor: [
      'rgba(139, 92, 246, 0.2)',
      'rgba(167, 139, 250, 0.7)',
      'rgba(139, 92, 246, 0.35)',
    ],
    transition: {
      duration: duration.slow * 2,
      ease: EASE_OUT,
      times: [0, 0.45, 1],
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.word,
      delayChildren: 0.05,
    },
  },
};

export const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  exit: { opacity: 1, y: 0, scale: 1, rotate: 0 },
};
