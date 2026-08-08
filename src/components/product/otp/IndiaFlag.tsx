import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * India's flag, drawn rather than fetched.
 *
 * The country picker in a verification panel is a two-centimetre detail that
 * decides whether the whole thing reads as software: an emoji renders as a
 * grey "IN" on most of Windows, and an image is a request that can fail on the
 * largest element on the page. Four boxes and a ring cost nothing and are
 * sharp at any density.
 *
 * Decorative — the dial code sits beside it in text every time it is used.
 */
export function IndiaFlag({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-ink/10",
        className,
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#FF9933]" />
      <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#138808]" />
      <span className="absolute top-1/2 left-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-[0.8px] ring-[#000088]" />
    </span>
  );
}
