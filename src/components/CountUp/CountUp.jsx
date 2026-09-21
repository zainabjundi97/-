import { useEffect, useState } from 'react';
import { animate } from 'motion';
import { useInView } from 'react-intersection-observer';
import { duration, EASE_OUT } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Animates an integer from 0 to `value` once it scrolls into view (and again when value changes).
 * Shows the final value instantly when prefers-reduced-motion is on.
 */
export default function CountUp({
  value = 0,
  suffix = '%',
  className = '',
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !inView) return undefined;

    const controls = animate(0, value, {
      duration: duration.count,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value, inView, prefersReducedMotion]);

  const shown = prefersReducedMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
