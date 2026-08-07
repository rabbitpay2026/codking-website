"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Stars } from "@/components/sections/proof/Stars";
import { StoreMonogram } from "@/components/sections/proof/StoreMonogram";
import { cn } from "@/lib/utils";

import type { MerchantTestimonial } from "@/types";

/** How long one testimonial holds before the carousel advances. */
const DWELL_MS = 5500;

/**
 * Embla's transition length, in its own units (roughly milliseconds ÷ 10).
 * Slower than the default 25, because the slide is the only motion in this
 * section and a fast one draws more attention than what it is carrying.
 */
const SLIDE_DURATION = 30;

interface TestimonialCarouselProps {
  readonly testimonials: readonly MerchantTestimonial[];
}

/**
 * The merchant reviews, one at a time, inside the blueprint's bordered panel.
 *
 * Embla rather than a hand-rolled index, and the reason is the height. Every
 * slide is in the DOM at once inside a flex track, so the panel is already as
 * tall as the longest review and stays that height as the carousel turns —
 * a card that grows and shrinks every five seconds would drag the two columns
 * beside it up and down with it. Keeping every slide in the document also
 * means the reviews a visitor has not reached yet are still readable by a
 * crawler and by anyone going through the page linearly, with no visually
 * hidden second copy to keep in step.
 *
 * Restraint is enforced in three places. The dwell is long and the advance is
 * slow, because the review is the point and the transition is not. Autoplay
 * stops on hover and on focus and resumes when the pointer leaves, so the
 * panel never moves under someone reaching for it. And under reduced motion
 * nothing advances on its own — the dots still work, so nothing becomes
 * unreachable.
 */
export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const prefersReduced = useReducedMotion();
  const count = testimonials.length;

  /*
    Constructed once, via a lazy initialiser, so the plugin instance survives
    re-renders. Building it inline would hand Embla a new plugin object on
    every state change and the dwell timer would restart each time the selected
    dot moved — a carousel that never quite reaches the next slide.
  */
  const [autoplay] = useState(() =>
    Autoplay({
      delay: DWELL_MS,
      /* Resume once the pointer leaves; a paused-forever carousel is one most
         visitors only ever see the first slide of. */
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: SLIDE_DURATION,
      watchDrag: count > 1,
    },
    [autoplay],
  );

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => setSelected(emblaApi.selectedScrollSnap());
    sync();
    emblaApi.on("select", sync).on("reInit", sync);

    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  /*
    The global reduced-motion rule in `globals.css` collapses CSS transitions,
    but Embla animates on its own frame loop and would keep advancing under it.
    Stopping the plugin is the only thing that actually honours the preference.
  */
  useEffect(() => {
    if (!emblaApi) return;
    if (prefersReduced || count < 2) emblaApi.plugins().autoplay?.stop();
  }, [emblaApi, prefersReduced, count]);

  const select = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  if (count === 0) return null;

  return (
    <div className="flex h-full flex-col">
      {/*
        The panel the blueprint draws: a white box on a white card, held apart
        by a hairline alone. No tint and no shadow — this is a frame around a
        quotation, not a second card stacked inside the first.

        The padding is on the panel and the clip is on a bare child inside it,
        which is not a spare div. `overflow: hidden` clips at the padding box,
        so putting both on one element leaves the next slide visible in the
        sixteen pixels of inset — a sliver of the following review sitting
        against the border, on the card whose whole job is to look composed.
      */}
      <div
        className="flex-1 rounded-xl border border-border p-4"
        role="group"
        aria-roledescription="carousel"
        aria-label="Merchant reviews"
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {testimonials.map((entry, index) => (
              <figure
                key={entry.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className="flex min-w-0 flex-[0_0_100%] flex-col"
              >
                <Stars
                  rating={entry.rating}
                  className="size-[13px]"
                  label={`Rated ${entry.rating} out of 5`}
                />

                <blockquote className="mt-2.5 flex-1 text-[12.5px] leading-[1.55] text-pretty text-foreground/85">
                  &ldquo;{entry.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-3.5 flex items-center gap-2.5">
                  <StoreMonogram store={entry.store} size={28} />
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] leading-tight font-semibold text-foreground">
                      {entry.store}
                    </span>
                    <span className="block truncate text-[11.5px] leading-tight text-muted-foreground">
                      {entry.caption}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/*
        The dots, centred under the panel as the blueprint places them.

        Real buttons with a name each, not decorated spans: these are the only
        way to reach the other reviews, so they have to be reachable by
        keyboard and announced as controls. The active one stretches into a bar
        rather than only changing colour, which reads as position in a set at a
        glance and survives being looked at by someone who cannot tell the two
        tints apart.
      */}
      {count > 1 ? (
        <div className="mt-3.5 flex items-center justify-center gap-1.5">
          {testimonials.map((entry, index) => {
            const active = index === selected;

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => select(index)}
                aria-label={`Show the review from ${entry.store}`}
                aria-current={active}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-emphasized)]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "w-5 bg-foreground/65"
                    : "w-1.5 bg-border hover:bg-foreground/30",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
