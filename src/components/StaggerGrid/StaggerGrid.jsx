import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';
import {
  cardStaggerContainer,
  reducedMotionVariants,
} from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

/**
 * Once-only scroll stagger for grid children. Wrap each child in a
 * motion element that uses `cardItem` (AnimatedCard already does).
 */
export default function StaggerGrid({ children, className = '' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <MotionDiv
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={prefersReducedMotion ? reducedMotionVariants : cardStaggerContainer}
    >
      {children}
    </MotionDiv>
  );
}
