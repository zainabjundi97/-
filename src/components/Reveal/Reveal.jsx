import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import { fadeUp, reducedMotionVariants } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

/**
 * Once-only scroll reveal wrapper. No re-animation on scroll up/down.
 */
export default function Reveal({ children, className = '', id }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <MotionDiv
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? reducedMotionVariants : fadeUp}
    >
      {children}
    </MotionDiv>
  );
}
