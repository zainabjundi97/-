import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  typeChar,
  typeContainer,
  cursorBlink,
} from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionSpan = motion.span;
const MotionDiv = motion.div;

/**
 * Staggered character reveal (Motion typewriter pattern).
 * Shows full text instantly when prefers-reduced-motion is on.
 */
export default function Typewriter({
  text,
  className = '',
  showCursor = true,
  replayKey = 0,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const chars = useMemo(() => Array.from(text ?? ''), [text]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <MotionDiv
      key={replayKey}
      className={`inline ${className}`}
      initial="hidden"
      animate="visible"
      variants={typeContainer}
      aria-label={text}
    >
      {chars.map((char, index) => (
        <MotionSpan
          key={`${replayKey}-${index}`}
          variants={typeChar}
          className="inline"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </MotionSpan>
      ))}
      {showCursor ? (
        <MotionSpan
          aria-hidden
          className="inline-block w-[0.5ch] ms-0.5 bg-emerald-400 align-baseline"
          style={{ height: '1em' }}
          animate={cursorBlink}
        />
      ) : null}
    </MotionDiv>
  );
}
