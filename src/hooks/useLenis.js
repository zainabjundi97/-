import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { setLenis } from '../lib/smoothScroll';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Smooth scroll via Lenis, driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Skipped when prefers-reduced-motion is on.
 */
export function useLenis() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', ScrollTrigger.update);
      setLenis(null);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);
}
