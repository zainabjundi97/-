import { useRef } from 'react';
import { motion } from 'motion/react';
import { getDepartment } from '../../lib/departments';
import { fadeUp, fadeScale, reducedMotionVariants, subtitleDelay, gsapPresets } from '../../lib/animations';
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap';
import { scrollToId } from '../../lib/smoothScroll';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import SplitHeading from '../SplitHeading/SplitHeading';
import ParallaxBackdrop from '../ParallaxBackdrop/ParallaxBackdrop';

const MotionSpan = motion.span;
const MotionP = motion.p;
const MotionDiv = motion.div;

/**
 * Masthead for shell pages (home / basics). No 3D scene — animated split headline,
 * parallax backdrop, and a scrubbed exit as it scrolls away.
 * @param {{
 *   departmentId: string,
 *   badge: string,
 *   headingWords: { text: string, accent?: boolean }[],
 *   subtitle: string,
 *   ctas?: { label: string, href: string, type: 'scroll' | 'tab' }[],
 *   onNavigate?: (id: string) => void,
 * }} props
 */
export default function PageMasthead({
  departmentId,
  badge,
  headingWords,
  subtitle,
  ctas = [],
  onNavigate,
}) {
  const dept = getDepartment(departmentId);
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerRef = useRef(null);
  const afterHeading = { delay: subtitleDelay(headingWords.length) };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to('.masthead-content', {
          ...gsapPresets.heroExit,
          ease: 'none',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: headerRef }
  );

  const handleCta = (cta, event) => {
    event.preventDefault();
    if (cta.type === 'tab' && onNavigate) {
      onNavigate(cta.href);
      return;
    }
    scrollToId(cta.href?.startsWith('#') ? cta.href.slice(1) : cta.href);
  };

  return (
    <header
      ref={headerRef}
      className="w-full relative overflow-hidden border-b"
      style={{
        background: `linear-gradient(120deg, ${dept.heroFrom}14 0%, ${dept.heroTo}18 45%, var(--shell-bg) 100%)`,
        borderColor: 'var(--card-border)',
      }}
    >
      <ParallaxBackdrop colors={[dept.accentSecondary, dept.heroTo]} />

      <div className="masthead-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 3xl:py-28 origin-top">
        <MotionSpan
          initial="hidden"
          animate="visible"
          variants={prefersReducedMotion ? reducedMotionVariants : fadeScale}
          className="inline-block text-sm sm:text-base font-semibold px-4 py-1.5 rounded-full border mb-5 backdrop-blur-md"
          style={{
            color: dept.accent,
            backgroundColor: `${dept.accentSecondary}18`,
            borderColor: `${dept.accentSecondary}44`,
          }}
        >
          {badge}
        </MotionSpan>

        <SplitHeading
          as="h1"
          trigger="mount"
          words={headingWords}
          gradient={[dept.accentSecondary, dept.heroTo]}
          className="text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-5"
          style={{ color: 'var(--text-heading)' }}
        />

        <MotionP
          initial="hidden"
          animate="visible"
          variants={prefersReducedMotion ? reducedMotionVariants : fadeUp}
          transition={prefersReducedMotion ? undefined : afterHeading}
          className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </MotionP>

        {ctas.length > 0 && (
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? reducedMotionVariants : fadeUp}
            transition={prefersReducedMotion ? undefined : afterHeading}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            {ctas.map((cta, index) => {
              const isPrimary = index === 0;
              return (
                <a
                  key={cta.label}
                  href={cta.type === 'tab' ? `#${cta.href}` : cta.href}
                  onClick={(event) => handleCta(cta, event)}
                  className={`min-h-[44px] inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm sm:text-base font-bold transition hover:-translate-y-0.5 ${
                    isPrimary ? 'text-white shadow-lg' : 'border surface-card hover:opacity-90'
                  }`}
                  style={
                    isPrimary
                      ? {
                          backgroundImage: `linear-gradient(120deg, ${dept.accentSecondary}, ${dept.heroTo})`,
                          boxShadow: `0 10px 30px -10px ${dept.accentSecondary}aa`,
                        }
                      : { color: dept.accent, borderColor: 'var(--card-border)' }
                  }
                >
                  {cta.label}
                </a>
              );
            })}
          </MotionDiv>
        )}
      </div>
    </header>
  );
}
