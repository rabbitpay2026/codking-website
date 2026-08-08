import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The blueprint's ringed tick.
 *
 * A hairline circle with a small check inside, rather than a bare glyph. In a
 * column of six lines the ring is what gives the list a left edge to hang
 * from — a loose tick drifts optically against the text beside it, and three
 * cards of drifting ticks read as three slightly different lists.
 *
 * Outline and one weight of brand, never a filled disc: at this size a solid
 * circle per row would put six coloured dots down a card that is meant to be
 * flat.
 *
 * Decorative by contract. The label beside it carries the meaning, and the
 * comparison table — where a tick *is* the content — states "Included" for
 * assistive technology itself.
 */
export function FeatureCheck({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-[17px] shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/[0.06]",
        className,
      )}
    >
      <Check className="size-2.5 text-brand" strokeWidth={3} />
    </span>
  );
}
