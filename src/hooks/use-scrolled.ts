"use client";

import { useEffect, useState } from "react";

/**
 * Whether the page has scrolled past a small threshold.
 *
 * Used by the header to earn its border and elevation only once it is
 * overlapping content, so a page at rest reads as one surface.
 *
 * The listener is passive and coalesced into a single animation frame: scroll
 * fires far more often than the header can usefully change, and doing state
 * work per event is what makes a sticky header feel heavy.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    // Run once on mount: the browser may restore a scroll position before
    // hydration, in which case no scroll event ever fires.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
