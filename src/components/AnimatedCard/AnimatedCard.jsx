import { motion } from 'motion/react';
import {
  cardItem,
  iconHoverVariant,
  reducedMotionVariants,
} from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionA = motion.a;
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
 * Use as="button" for clickable course cards, as="a" with href for link cards.
 */
export default function AnimatedCard({
  children,
  className = '',
  as = 'div',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disableHoverMotion = false,
  skipVariants = false,
  layoutId,
  transition,
  style,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = prefersReducedMotion ? reducedMotionVariants : cardItem;
  const useHover = !prefersReducedMotion && !disableHoverMotion;

  const sharedProps = {
    variants: skipVariants ? undefined : itemVariants,
    whileHover: useHover ? 'hover' : undefined,
    className,
    onClick,
    layoutId: prefersReducedMotion ? undefined : layoutId,
    transition,
    style,
  };

  if (as === 'button') {
    return (
      <MotionButton type={type} {...sharedProps}>
        {children}
      </MotionButton>
    );
  }

  if (as === 'a') {
    return (
      <MotionA href={href} target={target} rel={rel} {...sharedProps}>
        {children}
      </MotionA>
    );
  }

  return <MotionDiv {...sharedProps}>{children}</MotionDiv>;
}
