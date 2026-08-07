import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * Film grain over a gradient surface.
 *
 * Kept at a few percent opacity — enough to break up the banding that large
 * flat gradients show on 8-bit displays, not enough to be seen as texture.
 * Applied above the colour and below the content.
 */
export function Noise({ className }: WithClassName) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay",
        className,
      )}
    />
  );
}
