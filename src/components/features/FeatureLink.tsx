import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The way in, at the foot of every block.
 *
 * Not a button and not a link of its own — the block around it is already the
 * target. This is the affordance that says so, which is why it is styled text
 * with an arrow rather than a control a merchant could miss and then wonder
 * why the card did nothing.
 *
 * Two pixels of travel on hover: enough to confirm the block is live, not
 * enough to be an animation.
 */
export function FeatureLink({ className }: WithClassName) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink/45",
        "transition-colors duration-300 ease-emphasized group-hover:text-brand",
        className,
      )}
    >
      Explore feature
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-300 ease-emphasized group-hover:translate-x-0.5"
      />
    </span>
  );
}
