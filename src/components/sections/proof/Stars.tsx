import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The marketplace amber, not the brand blue.
 *
 * A blue star is a decision someone made; an amber one is the convention every
 * store rating on the internet already uses, and a merchant reads it without
 * having to be told what it means. It is also the hero's own star colour, so
 * the two ratings on the page match.
 */
const AMBER = "#f5a623";

interface StarsProps {
  /** Stars to fill, out of five. Rounded up, as marketplaces render it. */
  readonly rating: number;
  /** Tailwind size utility for one star, e.g. `size-4`. */
  readonly className?: string;
  /**
   * Names the rating for assistive technology. Omit inside a row that already
   * states the rating in text — a second announcement is noise, not access.
   */
  readonly label?: string;
}

/**
 * A five-star rating.
 *
 * Always five glyphs, the unearned ones drawn hollow rather than dropped, so
 * the row occupies the same width at every rating and a column of them stays
 * aligned. 4.9 fills five, which is what the App Store does and what a reader
 * expects to see beside the number.
 */
export function Stars({ rating, className, label }: StarsProps) {
  const filled = Math.round(rating);

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn("size-4", className)}
          style={
            index < filled
              ? { fill: AMBER, color: AMBER }
              : { fill: "transparent", color: "var(--border)" }
          }
        />
      ))}
    </span>
  );
}
