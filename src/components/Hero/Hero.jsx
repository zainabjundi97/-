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
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const HeroScene = lazy(() => import('../HeroScene/HeroScene'));

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const HEADING_WORDS = [
  { text: 'اكتشف', accent: false },
  { text: 'عالم', accent: false },
  { text: 'هندسة', accent: true },
  { text: 'البرمجيات', accent: true },
];

export default function Hero() {
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
    : { delay: subtitleDelay(HEADING_WORDS.length) };

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7839/ingest/3657478a-a2a8-4aa6-9876-254e7f496f2d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '734eaa' },
      body: JSON.stringify({
        sessionId: '734eaa',
        runId: 'post-fix',
        hypothesisId: 'A-D',
        location: 'Hero.jsx:inView-effect',
        message: 'inView changed',
        data: {
          inView,
          pointerRef: pointerRef.current,
          pointerX: pointerX.get(),
          pointerY: pointerY.get(),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});

    if (!inView) {
      pointerX.set(0);
      pointerY.set(0);
      pointerRef.current = { x: 0, y: 0 };
    }
  }, [inView, pointerX, pointerY]);

  useEffect(() => {
    let scrollEndTimer;
    const onScroll = () => {
      isScrollingRef.current = true;
      pointerX.set(0);
      pointerY.set(0);
      pointerRef.current = { x: 0, y: 0 };
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollEndTimer);
    };
  }, [pointerX, pointerY]);
  // #endregion

  const onPointerMove = (event) => {
    if (prefersReducedMotion || !inView || isScrollingRef.current) return;
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (
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

    // #region agent log
    if (Math.abs(x) > 0.35 || Math.abs(y) > 0.35) {
      fetch('http://127.0.0.1:7839/ingest/3657478a-a2a8-4aa6-9876-254e7f496f2d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '734eaa' },
        body: JSON.stringify({
          sessionId: '734eaa',
          runId: 'post-fix',
          hypothesisId: 'B-C',
          location: 'Hero.jsx:onPointerMove',
          message: 'large pointer offset',
          data: {
            x,
            y,
            inView,
            rectTop: rect.top,
            rectHeight: rect.height,
            clientY: event.clientY,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
    // #endregion
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
      className="w-full py-12 md:py-20 text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#06030e] via-violet-950/80 to-transparent relative overflow-hidden min-h-[70vh] sm:min-h-[28rem]"
    >
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <HeroScene pointerRef={pointerRef} active={inView} />
        </Suspense>
      )}

      <MotionDiv
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-violet-600/10 blur-3xl rounded-full pointer-events-none z-[1]"
        style={
          prefersReducedMotion
            ? undefined
            : { x: glowX, y: glowY }
        }
      />

      <MotionDiv
        className="max-w-7xl mx-auto relative z-10"
        style={
          prefersReducedMotion
            ? undefined
            : { x: textX, y: textY }
        }
      >
        <MotionSpan
          initial="hidden"
          animate="visible"
          variants={badgeVariants}
          className="bg-violet-900/50 text-violet-300 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-violet-500/20 inline-block mb-4 backdrop-blur-md"
        >
          جامعة اللاذقية - قسم البرمجيات
        </MotionSpan>

        <MotionH1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md flex flex-wrap justify-center gap-x-[0.35em] gap-y-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {HEADING_WORDS.map((word) => (
            <MotionSpan
              key={word.text}
              variants={wordVariants}
              className={word.accent ? 'text-violet-400' : undefined}
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
          className="text-slate-300/80 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed"
        >
          أكثر من مجرد تكويد.. إنها صياغة المستقبل وبناء الأنظمة الذكية!
        </MotionP>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href="#courses"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById('courses')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition shadow-md"
          >
            استكشف المواد
          </a>
          <a
            href="#quiz"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById('quiz')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-100 text-sm font-semibold transition border border-violet-500/30"
          >
            هل يناسبني؟
          </a>
        </div>
      </MotionDiv>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent z-10" />
    </header>
  );
}
