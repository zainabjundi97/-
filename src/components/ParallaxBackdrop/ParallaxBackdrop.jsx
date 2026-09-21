import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap';
import { gsapPresets } from '../../lib/animations';

/**
 * Soft blurred accent blobs behind a masthead. They drift slowly (CSS) and move at
 * different speeds as the parent scrolls out (GSAP scrub). Place inside a
 * `relative overflow-hidden` parent.
 * @param {{ colors: [string, string], className?: string }} props
 */
export default function ParallaxBackdrop({ colors, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = {
          trigger: ref.current.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        };
        gsap.to('.backdrop-blob-a', { yPercent: gsapPresets.blobParallax, ease: 'none', scrollTrigger });
        gsap.to('.backdrop-blob-b', { yPercent: -gsapPresets.blobParallax, ease: 'none', scrollTrigger });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      <div className="backdrop-blob-a absolute -top-1/4 start-[-10%] w-[55%] aspect-square">
        <div
          className="blob-drift w-full h-full rounded-full blur-3xl opacity-50"
          style={{ background: `radial-gradient(circle, ${colors[0]}55, transparent 70%)` }}
        />
      </div>
      <div className="backdrop-blob-b absolute -bottom-1/3 end-[-5%] w-[45%] aspect-square">
        <div
          className="blob-drift w-full h-full rounded-full blur-3xl opacity-40 [animation-delay:-7s]"
          style={{ background: `radial-gradient(circle, ${colors[1]}55, transparent 70%)` }}
        />
      </div>
    </div>
  );
}
