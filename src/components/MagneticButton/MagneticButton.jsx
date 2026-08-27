import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { magnetic } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionButton = motion.button;

/**
 * Button that gently pulls toward the pointer (Motion spring pattern).
 * Falls back to a plain button when prefers-reduced-motion is on.
 */
export default function MagneticButton({
  children,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magnetic.spring);
  const springY = useSpring(y, magnetic.spring);

  if (prefersReducedMotion) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={className}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const { style: restStyle, ...restProps } = rest;

  const onPointerMove = (event) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * magnetic.strength);
    y.set(offsetY * magnetic.strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionButton
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{ ...restStyle, x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...restProps}
    >
      {children}
    </MotionButton>
  );
}
