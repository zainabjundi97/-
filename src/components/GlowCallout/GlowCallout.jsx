import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import { glowPulseOnce, reducedMotionVariants } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

/**
 * Callout box with a one-shot glow pulse when scrolled into view.
 */
export default function GlowCallout({ children, className = '' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <MotionDiv
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? reducedMotionVariants : glowPulseOnce}
    >
      {children}
    </MotionDiv>
  );
}
