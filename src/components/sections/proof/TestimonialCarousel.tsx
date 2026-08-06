"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { CustomerStory } from "@/types";

/** How long one quote holds before the carousel advances. */
const DWELL_MS = 7000;

interface TestimonialCarouselProps {
  readonly stories: readonly CustomerStory[];
  /** Stars to draw on each quote, from the proof repository. */
  readonly rating: number;
}

/**
 * The merchant quotes, as a carousel.
 *
 * One quote at a time. Two quotes side by side asks the reader to choose which
 * to read and they read neither; one quote at a time is read, and the dots
 * make the rest discoverable without spending the vertical space.
 *
 * Three things keep this on the right side of tasteful. The movement is small
 * — a fade and eight pixels of travel, not a slide — because a card that
 * launches across the viewport is the reader's whole attention for half a
 * second and the quote is the point, not the transition. The rotation stops
 * the moment anyone interacts, since a control that moves while you are
 * reaching for it is a broken control. And the whole thing is inert under
 * reduced motion: no auto-advance, no travel, the dots still work.
 *
 * Only the current quote is painted, so the full set is also written out
 * once, visually hidden, below the control. A carousel that keeps four
 * fifths of its content out of the document is invisible to a crawler and to
 * anyone reading the page linearly — and a testimonial nobody can find is not
 * proof of anything.
 */
export function TestimonialCarousel({
  stories,
  rating,
}: TestimonialCarouselProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = stories.length;

  const select = useCallback((next: number) => {
    setPaused(true);
    setIndex(next);
  }, []);

  useEffect(() => {
    if (paused || prefersReduced || count < 2) return;

    const timer = setInterval(
      () => setIndex((current) => (current + 1) % count),
      DWELL_MS,
    );

    return () => clearInterval(timer);
  }, [paused, prefersReduced, count]);

  if (count === 0) return null;

  const story = stories[index] ?? stories[0];
  if (!story) return null;

  return (
    <div
      className="flex h-full flex-col"
      onMouseEnter={() => setPaused(true)}
      onFocusCapture={() => setPaused(true)}
    >
      {/*
        The height is reserved rather than animated. Quotes differ in length,
        and a panel that grows and shrinks every seven seconds drags the two
        columns beside it up and down with it.

        The reservation is per breakpoint because the same quote is three lines
        across a stacked card and nine down a third-width column. One value
        tuned for the narrow case leaves a hand's depth of white under the wide
        one, which reads as a card that failed to finish loading.
      */}
      <div className="relative min-h-[15rem] flex-1 sm:min-h-[11rem] lg:min-h-[19rem]">
        <AnimatePresence initial={false} mode="wait">
          <motion.figure
            key={story.id}
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
            className="absolute inset-0 flex flex-col"
          >
            <Quote
              aria-hidden
              className="absolute -top-2 right-0 size-20 fill-brand/[0.06] text-transparent"
            />

            <div
              className="relative flex items-center gap-0.5"
              aria-label={`Rated ${rating} out of 5`}
            >
              {Array.from({ length: 5 }, (_, starIndex) => (
                <Star
                  key={starIndex}
                  aria-hidden
                  className="size-4 fill-brand text-brand"
                />
              ))}
            </div>

            <blockquote className="relative mt-5 flex-1 text-[15px] leading-relaxed text-pretty text-foreground/90">
              &ldquo;{story.quote}&rdquo;
            </blockquote>

            <figcaption className="relative mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
              <span className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-semibold text-brand"
                >
                  {story.merchantName.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-sm leading-snug font-semibold text-balance">
                  {story.merchantName}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block text-sm font-semibold text-brand">
                  {story.metricValue}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {story.metricLabel}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/*
        The dots.

        Real buttons with an accessible name each, not decorated spans: this is
        the only way to reach the other quotes, so it has to be reachable by
        keyboard and announced as a control. The active one stretches into a
        bar rather than merely changing colour, which reads as position in a
        set at a glance and survives being looked at by someone who cannot
        distinguish the two tints.
      */}
      {count > 1 ? (
        <div className="mt-7 flex items-center gap-2">
          {stories.map((entry, dotIndex) => {
            const active = dotIndex === index;

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => select(dotIndex)}
                aria-label={`Show the review from ${entry.merchantName}`}
                aria-current={active}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-emphasized)]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active ? "w-7 bg-brand" : "w-2 bg-border hover:bg-brand/40",
                )}
              />
            );
          })}
        </div>
      ) : null}

      {/* The whole set, in order, for anyone the carousel does not serve. */}
      <ul className="sr-only">
        {stories.map((entry) => (
          <li key={entry.id}>
            {entry.merchantName}: &ldquo;{entry.quote}&rdquo;
          </li>
        ))}
      </ul>
    </div>
  );
}
