import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap';

/**
 * A line that fills in as you scroll past it (GSAP scrub). Vertical lines fill
 * top→bottom; horizontal lines fill from the inline start (right in RTL).
 * @param {{ orientation?: 'vertical' | 'horizontal', color: string, className?: string }} props
 */
export default function ScrollLine({ orientation = 'vertical', color, className = '' }) {
  const ref = useRef(null);
  const vertical = orientation === 'vertical';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('.scroll-line-fill', {
          [vertical ? 'scaleY' : 'scaleX']: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: vertical ? 'bottom 55%' : 'top 40%',
            scrub: 0.6,
          },
        });
      });
    },
    { scope: ref, dependencies: [vertical] }
  );

  return (
    <div
      ref={ref}
      className={`relative rounded-full overflow-hidden ${vertical ? 'w-1' : 'h-1'} ${className}`}
      style={{ backgroundColor: 'var(--card-border)' }}
      aria-hidden
    >
      <div
        className={`scroll-line-fill absolute inset-0 rounded-full ${vertical ? 'origin-top' : 'origin-right'}`}
        style={{ background: `linear-gradient(${vertical ? '180deg' : '270deg'}, ${color}, ${color}55)` }}
      />
    </div>
  );
}
