import { motion, useScroll, useSpring } from 'motion/react';
import { progress } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

/**
 * Fixed top scroll progress bar (RTL: fills from the right via originX: 1).
 */
export default function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, progress.spring);

  return (
    <MotionDiv
      aria-hidden
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none bg-gradient-to-l from-violet-400 via-violet-500 to-fuchsia-500"
      style={{
        height: progress.height,
        scaleX: prefersReducedMotion ? scrollYProgress : scaleX,
        transformOrigin: '100% 50%',
      }}
    />
  );
}
