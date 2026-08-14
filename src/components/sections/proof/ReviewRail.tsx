"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Stars } from "@/components/sections/proof/Stars";
import { StoreMonogram } from "@/components/sections/proof/StoreMonogram";
import { cardHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { MerchantTestimonial, WithClassName } from "@/types";

/** How long one position holds before the rail advances on its own. */
const DWELL_MS = 5500;

/**
 * Embla's transition length, in its own units (roughly milliseconds ÷ 10).
 * Slower than the default 25, because the slide is the only motion in the
 * section and a fast one draws more attention than what it is carrying.
 */
const SLIDE_DURATION = 30;

interface ReviewRailProps extends WithClassName {
  readonly testimonials: readonly MerchantTestimonial[];
  /** Names the rail for assistive technology. */
  readonly label?: string;
}

/** One review, as a card. Every rail position holds exactly one of these. */
function ReviewCard({ entry }: { readonly entry: MerchantTestimonial }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(11,27,54,0.04)]",
        cardHoverClass,
      )}
    >
      <Stars
        rating={entry.rating}
        className="size-[13px]"
        label={`Rated ${entry.rating} out of 5`}
      />

      <blockquote className="mt-3 flex-1 text-[12.5px] leading-[1.6] text-pretty text-ink/75">
        &ldquo;{entry.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-2.5 border-t border-border pt-3.5">
        <StoreMonogram store={entry.store} size={28} />
        <span className="min-w-0">
          <span className="block text-[12.5px] leading-tight font-semibold text-balance text-ink">
            {entry.store}
          </span>
          <span className="mt-0.5 block text-[11.5px] leading-tight text-pretty text-ink/45">
            {entry.caption}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Merchant reviews on a rail that advances one review at a time.
 *
 * Three visible on a desktop, two on a tablet, one on a phone — and the step
 * is always a single review, whatever the viewport. That combination is the
 * whole design: a row shows at a glance that there are many of these and that
 * they all say the same thing, which is the argument; moving by one keeps
 * every review reachable without asking anyone to read a screenful at once.
 *
 * Every slide is in the DOM the whole time inside one flex track, which buys
 * two things. The rail is already as tall as the longest review and stays that
 * height as it turns, so nothing below it moves; and the reviews a visitor
 * never scrolls to are still readable by a crawler and by anyone going through
 * the page linearly, with no visually hidden second copy to keep in step.
 *
 * Restraint is enforced in three places. The dwell is long and the transition
 * slow, because the review is the point and the movement is not. Autoplay
 * stops on hover and on focus and resumes when the pointer leaves, so the rail
 * never moves under someone reaching for it. And under reduced motion nothing
 * advances on its own — the dots and the arrows still work, so no review
 * becomes unreachable.
 *
 * The controls are real buttons with names, not decorated spans: on a viewport
 * showing fewer reviews than exist they are the only way to reach the rest, so
 * they have to be operable by keyboard and announced as controls.
 *
 * Reusable by contract — it takes the reviews and renders them, and knows
 * nothing about which page it is on.
 */
export function ReviewRail({
  testimonials,
  label = "Merchant reviews",
  className,
}: ReviewRailProps) {
  const prefersReduced = useReducedMotion();
  const count = testimonials.length;

  /*
    Constructed once, via a lazy initialiser, so the plugin instance survives
    re-renders. Building it inline would hand Embla a new plugin object on
    every state change and the dwell timer would restart each time the selected
    dot moved — a rail that never quite reaches the next review.
  */
  const [autoplay] = useState(() =>
    Autoplay({
      delay: DWELL_MS,
      /* Resume once the pointer leaves; a paused-forever carousel is one most
         visitors only ever see the first position of. */
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: SLIDE_DURATION,
      watchDrag: count > 1,
    },
    [autoplay],
  );

  /*
    Snap positions rather than slides. How many there are depends on how many
    slides fit, which depends on the viewport — so the dots are read from Embla
    after it has measured rather than derived from the review count, and they
    are re-read on `reInit`, which is what fires when the breakpoint changes.
  */
  const [snaps, setSnaps] = useState<readonly number[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
    };

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

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (count === 0) return null;

  const hasControls = snaps.length > 1;

  return (
    <div
      className={cn("flex flex-col", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/*
        The gutter between cards is padding on each slide against a negative
        margin on the track, not a `gap`. Embla measures slide widths to work
        out where the snap points are, and a flex gap sits outside that
        measurement — so a gapped track drifts a few pixels further out of
        alignment with every position it advances.
      */}
      {/*
        `py-2` is not decoration. The viewport clips at its padding box, and
        the cards inside lift three pixels on hover — without room reserved
        above them the lift is sliced off at the top edge and the card looks
        like it is sinking into a lid rather than rising off the page. The
        controls below give the same amount back so the rhythm is unchanged.
      */}
      <div ref={emblaRef} className="overflow-hidden py-2">
        <div className="-ml-4 flex items-stretch">
          {testimonials.map((entry, index) => (
            <div
              key={entry.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <ReviewCard entry={entry} />
            </div>
          ))}
        </div>
      </div>

      {hasControls ? (
        <div className="mt-4 flex items-center justify-center gap-3">
          <RailButton direction="previous" onClick={scrollPrev} label={label} />

          {/*
            The active dot stretches into a bar rather than only changing
            colour, which reads as position in a set at a glance and survives
            being looked at by someone who cannot tell the two tints apart.
          */}
          <div className="flex items-center gap-1.5">
            {snaps.map((snap, index) => {
              const active = index === selected;

              return (
                <button
                  key={snap}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to review ${index + 1} of ${snaps.length}`}
                  aria-current={active}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-emphasized",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active
                      ? "w-5 bg-ink/65"
                      : "w-1.5 bg-border hover:bg-ink/30",
                  )}
                />
              );
            })}
          </div>

          <RailButton direction="next" onClick={scrollNext} label={label} />
        </div>
      ) : null}
    </div>
  );
}

/** One of the two arrows flanking the dots. */
function RailButton({
  direction,
  onClick,
  label,
}: {
  readonly direction: "previous" | "next";
  readonly onClick: () => void;
  readonly label: string;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} — ${label}`}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background text-ink/45",
        "transition-colors duration-200 ease-emphasized",
        "hover:border-ink/20 hover:text-ink/70",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}
