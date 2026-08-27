import { Suspense, lazy, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  fadeScale,
  fadeUp,
  wordReveal,
  wordContainer,
  subtitleDelay,
  reducedMotionVariants,
  parallax,
} from '../../lib/animations';
import { getDepartment } from '../../lib/departments';
import { getSpecialtyContent } from '../../data/specialtyContent';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const HeroScene = lazy(() => import('../HeroScene/HeroScene'));

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const DEFAULT_SPECIALTY_CTAS = [
  { label: 'استكشف المواد', href: '#courses', type: 'scroll' },
  { label: 'هل يناسبني؟', href: '#quiz', type: 'scroll' },
];

/**
 * Specialty full-bleed hero with optional 3D scene.
 * @param {{
 *   departmentId?: string,
 *   onNavigate?: (id: string) => void,
 * }} props
 */
export default function Hero({ departmentId = 'software', onNavigate }) {
  const dept = getDepartment(departmentId);
  const hero = getSpecialtyContent(departmentId).hero;
  const headingWords = hero.headingWords;
  const ctas = hero.ctas ?? DEFAULT_SPECIALTY_CTAS;
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.15,
    rootMargin: '50px',
  });

  const setHeaderRefs = (node) => {
    headerRef.current = node;
    inViewRef(node);
  };

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, parallax.spring);
  const springY = useSpring(pointerY, parallax.spring);

  const glowX = useTransform(springX, [-0.5, 0.5], [-parallax.glow, parallax.glow]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-parallax.glow, parallax.glow]);
  const textX = useTransform(springX, [-0.5, 0.5], [parallax.text, -parallax.text]);
  const textY = useTransform(springY, [-0.5, 0.5], [parallax.text, -parallax.text]);

  const badgeVariants = prefersReducedMotion ? reducedMotionVariants : fadeScale;
  const wordVariants = prefersReducedMotion ? reducedMotionVariants : wordReveal;
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : wordContainer;
  const subtitleVariants = prefersReducedMotion ? reducedMotionVariants : fadeUp;
  const subtitleTransition = prefersReducedMotion
    ? undefined
    : { delay: subtitleDelay(headingWords.length) };

  const handleCta = (cta, event) => {
    event.preventDefault();
    if (cta.type === 'tab' && onNavigate) {
      onNavigate(cta.href);
      return;
    }
    const id = cta.href?.startsWith('#') ? cta.href.slice(1) : cta.href;
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (!inView) {
      pointerX.set(0);
      pointerY.set(0);
      pointerRef.current = { x: 0, y: 0 };
    }
  }, [inView, pointerX, pointerY]);

  useEffect(() => {
    let scrollEndTimer;
    const markScrolling = () => {
      isScrollingRef.current = true;
      pointerX.set(0);
      pointerY.set(0);
      pointerRef.current = { x: 0, y: 0 };
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 400);
    };
    window.addEventListener('scroll', markScrolling, { passive: true });
    window.addEventListener('wheel', markScrolling, { passive: true });
    return () => {
      window.removeEventListener('scroll', markScrolling);
      window.removeEventListener('wheel', markScrolling);
      clearTimeout(scrollEndTimer);
    };
  }, [pointerX, pointerY]);

  const onPointerMove = (event) => {
    if (prefersReducedMotion || !inView || isScrollingRef.current) return;
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (
      rect.top < -10 ||
      rect.bottom > window.innerHeight + 10 ||
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      return;
    }
    const rawX = (event.clientX - rect.left) / rect.width - 0.5;
    const rawY = (event.clientY - rect.top) / rect.height - 0.5;
    const x = Math.max(-0.5, Math.min(0.5, rawX));
    const y = Math.max(-0.5, Math.min(0.5, rawY));
    pointerX.set(x);
    pointerY.set(y);
    pointerRef.current = { x, y };
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <header
      ref={setHeaderRefs}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="w-full py-12 md:py-20 text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[70vh] sm:min-h-[28rem]"
      style={{
        background: `linear-gradient(to bottom, ${dept.heroFrom}, ${dept.heroTo}cc, transparent)`,
      }}
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

      <MotionDiv
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 blur-3xl rounded-full pointer-events-none z-[1]"
        style={{
          backgroundColor: `${dept.accent}22`,
          ...(prefersReducedMotion ? {} : { x: glowX, y: glowY }),
        }}
      />

      <MotionDiv
        className="max-w-7xl mx-auto relative z-10"
        style={prefersReducedMotion ? undefined : { x: textX, y: textY }}
      >
        <MotionSpan
          initial="hidden"
          animate="visible"
          variants={badgeVariants}
          className="text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border inline-block mb-4 backdrop-blur-md text-white"
          style={{
            backgroundColor: `${dept.accentSecondary}44`,
            borderColor: `${dept.accent}44`,
          }}
        >
          {hero.badge}
        </MotionSpan>

        <MotionH1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md flex flex-wrap justify-center gap-x-[0.35em] gap-y-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {headingWords.map((word) => (
            <MotionSpan
              key={word.text}
              variants={wordVariants}
              style={word.accent ? { color: '#F5F7FA' } : undefined}
            >
              {word.text}
            </MotionSpan>
          ))}
        </MotionH1>

        <MotionP
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          transition={subtitleTransition}
          className="text-white/90 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed"
        >
          {hero.subtitle}
        </MotionP>

        {ctas.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {ctas.map((cta, index) => {
              const isPrimary = index === 0;
              return (
                <a
                  key={cta.label}
                  href={cta.type === 'tab' ? `#${cta.href}` : cta.href}
                  onClick={(event) => handleCta(cta, event)}
                  className={`min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isPrimary
                      ? 'text-white shadow-md'
                      : 'bg-white/20 hover:bg-white/30 text-white border backdrop-blur-md'
                  }`}
                  style={
                    isPrimary
                      ? { backgroundColor: dept.accentSecondary }
                      : { borderColor: 'rgba(245,247,250,0.35)' }
                  }
                >
                  {cta.label}
                </a>
              );
            })}
          </div>
        )}
      </MotionDiv>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] z-10"
        style={{
          background: `linear-gradient(to right, transparent, ${dept.accent}33, transparent)`,
        }}
      />
    </header>
  );
}
