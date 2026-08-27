import { motion } from 'motion/react';
import { layoutTransition } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionDiv = motion.div;

/**
 * Visual-only quiz step dots with a sliding layoutId highlight.
 */
export default function QuizSteps({ total, current, accent = '#7957A8' }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="flex items-center justify-center gap-2"
      role="list"
      aria-label={`خطوة ${current + 1} من ${total}`}
    >
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === current;
        const isPast = index < current;

        return (
          <div
            key={index}
            role="listitem"
            className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full"
            style={{
              backgroundColor: isPast ? `${accent}66` : '#cbd5e1',
            }}
          >
            {isActive &&
              (prefersReducedMotion ? (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              ) : (
                <MotionDiv
                  layoutId="quiz-active-step"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 12px ${accent}73`,
                  }}
                  transition={layoutTransition}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}
