import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { tilt, cardItem, reducedMotionVariants } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

/**
 * 3D card tilt toward the pointer (Motion values + springs).
 * Outer element uses cardItem so it works inside StaggerGrid.
 * Skipped when prefers-reduced-motion is on (still participates in stagger).
 */
export default function TiltCard({ children, className = '' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateXRaw = useTransform(y, [0, 1], [tilt.maxDeg, -tilt.maxDeg]);
  const rotateYRaw = useTransform(x, [0, 1], [-tilt.maxDeg, tilt.maxDeg]);
  const rotateX = useSpring(rotateXRaw, tilt.spring);
  const rotateY = useSpring(rotateYRaw, tilt.spring);

  const itemVariants = prefersReducedMotion ? reducedMotionVariants : cardItem;

  if (prefersReducedMotion) {
    return (
      <MotionDiv className={className} variants={itemVariants}>
        {children}
      </MotionDiv>
    );
  }

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const onPointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <MotionDiv
      className={className}
      variants={itemVariants}
      style={{ perspective: `${tilt.perspective}px` }}
    >
      <MotionDiv
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: tilt.perspective,
        }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  );
}
