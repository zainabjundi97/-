import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';
import { gsapPresets } from '../lib/animations';

/**
 * Cascades matching children (e.g. table rows) in once as the scope scrolls into view.
 * @param {React.RefObject<HTMLElement>} scopeRef
 * @param {string} selector
 */
export function useScrollStagger(scopeRef, selector) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(selector, {
          y: gsapPresets.rowRise,
          opacity: 0,
          duration: gsapPresets.duration,
          ease: gsapPresets.easeSoft,
          stagger: gsapPresets.rowStagger,
          scrollTrigger: { trigger: scopeRef.current, start: gsapPresets.revealStart, once: true },
        });
      });
    },
    { scope: scopeRef, dependencies: [selector] }
  );
}
