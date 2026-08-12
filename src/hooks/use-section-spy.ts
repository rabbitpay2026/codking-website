"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * How long a clicked item stays pinned as active where `scrollend` is missing.
 *
 * A smooth scroll crosses every heading between here and the target, and the
 * observer reports each one on the way. Without a pin the contents rail flickers
 * down the list like a slot machine, which is exactly the kind of movement a
 * legal page should not have. The pin is released by `scrollend` where the
 * browser has it, because the scroll from the top of a sixteen-section document
 * to its last clause takes longer than any duration worth guessing at; this is
 * the fallback, and the ceiling on the safety net.
 */
const PIN_MS = 1500;

/** Fallback header height, used only if the header element cannot be found. */
const HEADER_FALLBACK = 64;

/**
 * The section currently being read, and a way to pin one while scrolling to it.
 *
 * The reading band is the shallow strip between the bottom of the sticky header
 * and roughly a fifth of the way down the viewport — where the heading of the
 * section you are reading sits. The section overlapping that band is the active
 * one.
 *
 * `IntersectionObserver` rather than a scroll listener: the browser computes the
 * intersections off the main thread, and a legal document is one of the few
 * pages where a reader scrolls continuously for a minute at a time.
 *
 * Two details make it correct in both directions. The active section is the
 * *last* one in document order overlapping the band, not the first and not the
 * most recent entry the callback happened to receive — entries arrive in
 * observation order rather than in position order, and the sections are
 * contiguous, so the one that has most recently started is the one being read.
 * Picking the first instead leaves the previous section highlighted for as long
 * as its final line clings to the top of the band, which is what makes a rail
 * feel a section behind the reader. And when nothing overlaps (above the first
 * section, or below the last with the footer on screen) the previous choice
 * stands, so the rail never blanks out on the way past the end of the document.
 *
 * The header is measured rather than assumed, so the announcement bar or a
 * future change to `--spacing-header` cannot put the band in the wrong place.
 */
export function useSectionSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const pinnedUntil = useRef(0);

  /*
    The ids as one string, so the effect re-runs when the document changes but
    not when a parent re-renders and hands over an equal array.
  */
  const key = ids.join("|");

  useEffect(() => {
    const order = key.split("|").filter(Boolean);

    const targets = order
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const header = document.querySelector<HTMLElement>(
      '[data-slot="site-header"]',
    );
    const top = Math.round(
      header?.getBoundingClientRect().height ?? HEADER_FALLBACK,
    );

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        if (Date.now() < pinnedUntil.current) return;

        const next = order.findLast((id) => visible.has(id));
        if (next) setActiveId(next);
      },
      /*
        The band has to be deep enough to still contain a heading that a click
        has just parked below the header, and shallow enough that the section
        after a one-line section cannot reach into it. Sections are separated by
        their own vertical rhythm, so anything under a quarter of the viewport
        satisfies both.
      */
      { rootMargin: `-${top + 8}px 0px -78% 0px`, threshold: 0 },
    );

    for (const target of targets) observer.observe(target);

    return () => observer.disconnect();
  }, [key]);

  /**
   * Holds an id active while the page scrolls to it.
   *
   * Released on `scrollend`, with the timeout as both the fallback for browsers
   * without it and the guarantee that a scroll which never ends — because the
   * target was already in place, so nothing moved — cannot pin the rail forever.
   */
  const pin = useCallback((id: string) => {
    pinnedUntil.current = Date.now() + PIN_MS;
    setActiveId(id);

    if (!("onscrollend" in window)) return;

    window.addEventListener("scrollend", () => (pinnedUntil.current = 0), {
      once: true,
    });
  }, []);

  return { activeId, pin };
}
