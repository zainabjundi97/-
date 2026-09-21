/** Holds the active Lenis instance so any component can scroll in sync with ScrollTrigger. */
let lenisInstance = null;

/** @param {import('lenis').default | null} lenis */
export function setLenis(lenis) {
  lenisInstance = lenis;
}

/** Smooth-scroll to an element id (falls back to native scroll when Lenis is off). */
export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    // Honour the section's scroll-margin-top (scroll-mt-*) so sticky headers don't cover it.
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    lenisInstance.scrollTo(target, { offset: -margin });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Jump to top instantly (used between tab changes). */
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}
