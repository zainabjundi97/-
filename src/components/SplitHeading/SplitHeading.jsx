import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap';
import { gsapPresets } from '../../lib/animations';

/**
 * Heading whose words rise out of a mask (GSAP). Words are split in React — never per
 * character — so Arabic letter joining is preserved.
 * @param {{
 *   as?: keyof JSX.IntrinsicElements,
 *   words?: { text: string, accent?: boolean }[],
 *   text?: string,
 *   trigger?: 'scroll' | 'mount',
 *   gradient?: [string, string],
 *   className?: string,
 *   style?: React.CSSProperties,
 *   id?: string,
 * }} props
 */
export default function SplitHeading({
  as = 'h2',
  words,
  text = '',
  trigger = 'scroll',
  gradient,
  className = '',
  style,
  id,
}) {
  const Tag = as;
  const ref = useRef(null);
  const list = words ?? text.split(/\s+/).filter(Boolean).map((word) => ({ text: word }));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('.word-inner', {
          yPercent: parseFloat(gsapPresets.wordRise),
          opacity: 0,
          duration: gsapPresets.duration,
          ease: gsapPresets.ease,
          stagger: gsapPresets.wordStagger,
          scrollTrigger:
            trigger === 'scroll'
              ? { trigger: ref.current, start: gsapPresets.revealStart, once: true }
              : undefined,
        });
      });
    },
    { scope: ref }
  );

  const gradientVars = gradient ? { '--grad-from': gradient[0], '--grad-to': gradient[1] } : {};

  return (
    <Tag ref={ref} id={id} className={className} style={{ ...gradientVars, ...style }}>
      {list.map((word, index) => (
        <span key={`${word.text}-${index}`}>
          <span className="word-mask">
            <span className={`word-inner ${word.accent && gradient ? 'text-gradient' : ''}`}>
              {word.text}
            </span>
          </span>
          {index < list.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
