import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * A plus that unfolds into a minus.
 *
 * Two bars, one of them rotated. Closed, the upright bar crosses the flat one
 * and the pair reads as a plus; open, it rotates back onto its partner and
 * the same two elements read as a minus. Nothing is swapped, nothing fades —
 * which is why the transition is a single continuous movement rather than one
 * glyph blinking into another.
 *
 * Driven by the open state of the element it sits in, so it needs no
 * JavaScript of its own and cannot fall out of step with the panel it belongs
 * to. That element must carry `group`.
 *
 * Two states are read rather than one, because the site now opens panels two
 * ways. `group-data-[state=open]` is Radix's, used by the homepage FAQ, the
 * pricing page and the feature pages. `group-open` is the native `[open]` of a
 * `<details>` element, used by the FAQ page — which is built on the native
 * disclosure so its answers exist in the server HTML rather than only after
 * hydration.
 *
 * The two cannot both be true, and neither can match the other's markup: a
 * Radix trigger is a `<button>` and is never `[open]`, and a `<details>` has no
 * `data-state`. So the pair is additive — every existing caller renders exactly
 * what it rendered before.
 */
export function PlusMinus({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-6 shrink-0 place-items-center rounded-full border border-border text-ink/50 transition-colors duration-200 group-hover:border-ink/20 group-hover:text-ink/70",
        className,
      )}
    >
      <span className="absolute h-px w-2.5 rounded-full bg-current" />
      <span className="absolute h-px w-2.5 rotate-90 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-emphasized)] group-open:rotate-0 group-data-[state=open]:rotate-0" />
    </span>
  );
}
