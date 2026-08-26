import { motion } from 'motion/react';
import {
  cardItem,
  iconHoverVariant,
  reducedMotionVariants,
} from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionSpan = motion.span;

export function AnimatedIcon({ children, className = '' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <MotionSpan
      className={`inline-block origin-center ${className}`}
      variants={prefersReducedMotion ? undefined : iconHoverVariant}
    >
      {children}
    </MotionSpan>
  );
}

/**
 * Card with scroll-in cardItem variants and hover lift+glow.
 * Use as="button" for clickable course cards.
 */
export default function AnimatedCard({
  children,
  className = '',
  as = 'div',
  onClick,
  type = 'button',
  disableHoverMotion = false,
  skipVariants = false,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = prefersReducedMotion ? reducedMotionVariants : cardItem;
  const useHover = !prefersReducedMotion && !disableHoverMotion;

  const sharedProps = {
    variants: skipVariants ? undefined : itemVariants,
    whileHover: useHover ? 'hover' : undefined,
    className,
    onClick,
  };

  if (as === 'button') {
    return (
      <MotionButton type={type} {...sharedProps}>
        {children}
      </MotionButton>
    );
  }

  return <MotionDiv {...sharedProps}>{children}</MotionDiv>;
}
