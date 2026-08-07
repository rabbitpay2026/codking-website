import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

interface SpotlightProps extends WithClassName {
  /** Horizontal position of the light, as a percentage across the section. */
  readonly x?: number;
  /** How far down the section the light reaches. */
  readonly size?: "default" | "tall";
}

/**
 * A single overhead light.
 *
 * Used on dark surfaces, where an unlit flat panel reads as a hole in the
 * page rather than as a room. One soft ellipse from above gives the surface a
 * top and a bottom, which is all the depth a dark band needs.
 *
 * The colour comes from the brand token at low alpha, so the light is tinted
 * rather than grey — a white spotlight on a violet page looks like a mistake.
 */
export function Spotlight({
  className,
  x = 50,
  size = "default",
}: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0",
        size === "tall" ? "h-[46rem]" : "h-[32rem]",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(60% 100% at ${x}% 0%, color-mix(in oklab, var(--brand) 42%, transparent), transparent 70%)`,
      }}
    />
  );
}
