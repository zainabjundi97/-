import { Suspense, lazy, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import MagneticButton from '../components/MagneticButton/MagneticButton';
import { getDepartment } from '../lib/departments';
import {
  staggerContainer,
  fadeScale,
  fadeUp,
  wordReveal,
  floatLoop,
  pulseRing,
  pulseRingOffset,
  reducedMotionVariants,
} from '../lib/animations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useUiSound } from '../hooks/useUiSound';

const HeroScene = lazy(() => import('../components/HeroScene/HeroScene'));

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionH1 = motion.h1;
const MotionP = motion.p;

/**
 * "قريباً" placeholder for a track whose page is still being built.
 * Generic: colors, label and 3D scene all come from the department theme.
 * @param {{ departmentId: string, onNavigate?: (id: string) => void }} props
 */
export default function ComingSoonPage({ departmentId, onNavigate }) {
  const dept = getDepartment(departmentId);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { play } = useUiSound();
  const sectionRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const { ref: inViewRef, inView } = useInView({ threshold: 0.15, rootMargin: '50px' });

  const setSectionRefs = (node) => {
    sectionRef.current = node;
    inViewRef(node);
  };

  // Mutate the ref only — HeroScene reads it inside useFrame.
  const onPointerMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clamp = (value) => Math.max(-0.5, Math.min(0.5, value));
    pointerRef.current = {
      x: clamp((event.clientX - rect.left) / rect.width - 0.5),
      y: clamp((event.clientY - rect.top) / rect.height - 0.5),
    };
  };

  const onPointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  const handleBack = () => {
    play('tap');
    onNavigate?.('home');
  };

  const pick = (variant) => (prefersReducedMotion ? reducedMotionVariants : variant);
  const subtitle = `صفحة قسم ${dept.label} قيد الإعداد، ترقبوا التفاصيل قريباً.`;

  return (
    <main className="flex-1 w-full flex flex-col">
      <section
        ref={setSectionRefs}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        aria-labelledby="coming-soon-title"
        className="relative flex-1 min-h-[60vh] overflow-hidden flex items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24"
        style={{ background: `linear-gradient(160deg, ${dept.heroFrom}, ${dept.heroTo})` }}
      >
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <HeroScene
              pointerRef={pointerRef}
              active={inView}
              variant={dept.sceneVariant}
              accent={dept.accent}
              accentSecondary={dept.accentSecondary}
            />
          </Suspense>
        )}

        {/* Vignette keeps the text legible over the scene. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 35%, ${dept.heroTo}aa 100%)`,
          }}
        />

        <MotionDiv
          className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5"
          initial="hidden"
          animate="visible"
          variants={pick(staggerContainer)}
        >
          <MotionSpan
            variants={pick(fadeScale)}
            className="rounded-full border px-4 py-1.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md"
            style={{
              backgroundColor: `${dept.accentSecondary}44`,
              borderColor: `${dept.accent}44`,
            }}
          >
            {dept.label}
          </MotionSpan>

          <MotionDiv
            variants={pick(fadeScale)}
            className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
          >
            {!prefersReducedMotion && (
              <>
                <MotionSpan
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: dept.accentSecondary }}
                  animate={pulseRing}
                />
                <MotionSpan
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: dept.accentSecondary }}
                  animate={pulseRingOffset}
                />
              </>
            )}
            <MotionSpan
              role="img"
              aria-label="روبوت"
              className="relative text-5xl sm:text-6xl drop-shadow-md"
              animate={prefersReducedMotion ? undefined : floatLoop}
            >
              🤖
            </MotionSpan>
          </MotionDiv>

          <MotionH1
            id="coming-soon-title"
            variants={pick(wordReveal)}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md"
          >
            قريباً
          </MotionH1>

          <MotionP
            variants={pick(fadeUp)}
            className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
          >
            {subtitle}
          </MotionP>

          <MotionDiv variants={pick(fadeUp)}>
            <MagneticButton
              onClick={handleBack}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm sm:text-base font-bold text-white shadow-md transition hover:-translate-y-0.5"
              style={{ backgroundColor: dept.accentSecondary }}
            >
              العودة للرئيسية →
            </MagneticButton>
          </MotionDiv>
        </MotionDiv>
      </section>
    </main>
  );
}
