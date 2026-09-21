import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap';
import { gsapPresets } from '../../lib/animations';
import { SITE_THEME } from '../../lib/departments';
import SplitHeading from '../SplitHeading/SplitHeading';

const SIZES = {
  md: 'text-xl sm:text-2xl 3xl:text-3xl',
  lg: 'text-2xl sm:text-3xl 3xl:text-4xl',
};

/**
 * Accent bar + heading shared by every page section. The bar grows in and the
 * words rise when the title scrolls into view.
 * @param {{
 *   text: string,
 *   accentColor: string,
 *   size?: 'md' | 'lg',
 *   as?: 'h2' | 'h3',
 *   className?: string,
 *   id?: string,
 * }} props
 */
export default function SectionTitle({
  text,
  accentColor,
  size = 'md',
  as = 'h2',
  className = 'mb-6',
  id,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('.section-title-bar', {
          scaleY: 0,
          duration: gsapPresets.duration,
          ease: gsapPresets.ease,
          scrollTrigger: { trigger: ref.current, start: gsapPresets.revealStart, once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`flex items-center gap-3 ${className}`}>
      <span
        className="section-title-bar block w-1.5 self-stretch min-h-[1.75rem] rounded-full shrink-0 origin-top"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      <SplitHeading
        as={as}
        id={id}
        text={text}
        className={`${SIZES[size]} font-extrabold leading-snug`}
        style={{ color: SITE_THEME.textHeading }}
      />
    </div>
  );
}
