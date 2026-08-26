import { motion } from 'motion/react';
import {
  fadeScale,
  fadeUp,
  wordReveal,
  wordContainer,
  subtitleDelay,
  reducedMotionVariants,
} from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

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
  const badgeVariants = prefersReducedMotion ? reducedMotionVariants : fadeScale;
  const wordVariants = prefersReducedMotion ? reducedMotionVariants : wordReveal;
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : wordContainer;
  const subtitleVariants = prefersReducedMotion ? reducedMotionVariants : fadeUp;
  const subtitleTransition = prefersReducedMotion
    ? undefined
    : { delay: subtitleDelay(HEADING_WORDS.length) };

  return (
    <header className="w-full py-12 md:py-20 text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#06030e] via-violet-950/80 to-transparent relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
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
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </header>
  );
}
