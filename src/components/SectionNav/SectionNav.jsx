import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { layoutTransition } from '../../lib/animations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionSpan = motion.span;

const SECTIONS = [
  { id: 'about', label: 'تعريف' },
  { id: 'myths', label: 'خرافات' },
  { id: 'courses', label: 'مواد' },
  { id: 'stack', label: 'كيف يعمل' },
  { id: 'try', label: 'جرّب' },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

/**
 * Sticky compact section nav; active item from IntersectionObserver on section ids.
 */
export default function SectionNav() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState('about');

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.2, rootMargin: '-15% 0px -55% 0px' },
      );
      io.observe(el);
      return io;
    }).filter(Boolean);

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  return (
    <nav
      aria-label="أقسام الصفحة"
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md"
      style={{
        borderColor: '#7957A844',
        backgroundColor: 'rgba(30, 27, 75, 0.9)',
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 overflow-x-auto">
        <ul className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 min-w-max mx-auto">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="relative">
                <button
                  type="button"
                  onClick={() => scrollToId(section.id)}
                  className={`relative min-h-[44px] px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-[#a78bfa]'
                  }`}
                >
                  {isActive &&
                    (prefersReducedMotion ? (
                      <span className="absolute inset-0 rounded-lg border" style={{ backgroundColor: '#7957A880', borderColor: '#5DBB7844' }} />
                    ) : (
                      <MotionSpan
                        layoutId="section-nav-active"
                        className="absolute inset-0 rounded-lg border"
                        style={{ backgroundColor: '#7957A880', borderColor: '#5DBB7844' }}
                        transition={layoutTransition}
                      />
                    ))}
                  <span className="relative z-10">{section.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
