/** Shared motion variants — reuse these; don't hand-roll per component. */

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const duration = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
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

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 1, y: 0, scale: 1 },
};
