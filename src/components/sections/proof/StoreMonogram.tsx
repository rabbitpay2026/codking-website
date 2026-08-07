import { cn } from "@/lib/utils";

/**
 * Two letters from a store's name.
 *
 * First letters of the first two words — "Bashariya Aferenz Life Style" is BA,
 * "Nuisance" is NU. A single word falls back to its first two letters rather
 * than one, because a lone capital in a circle reads as an icon and two reads
 * as a name.
 */
function initials(store: string): string {
  const words = store.split(/\s+/).filter(Boolean);
  const first = words[0] ?? "";

  if (words.length > 1) {
    const second = words[1] ?? "";
    return (first.slice(0, 1) + second.slice(0, 1)).toUpperCase();
  }

  return first.slice(0, 2).toUpperCase();
}

interface StoreMonogramProps {
  readonly store: string;
  /** Rendered diameter in pixels. */
  readonly size: number;
  readonly className?: string;
}

/**
 * The reviewer, as a monogram.
 *
 * These reviews are attributed to stores, not to people — "Nuisance" and
 * "Bashariya Aferenz Life Style" are shops — so a face is the wrong object
 * entirely. A stock portrait beside a real merchant's words would also be
 * saying, in the one section of the page whose entire job is to be believed,
 * that a person who has never heard of this product endorsed it. The Shopify
 * App Store shows no faces on its own reviews for the same reason.
 *
 * So: initials, one neutral tint, one hairline. It is the only element here
 * that repeats seven times, which is exactly why it stays achromatic — seven
 * coloured discs would be the first thing the eye finds in the section, and
 * the first thing the eye finds should be the 4.9.
 *
 * Decorative: the store's name sits beside it in text every time it is used,
 * so announcing "NU" to a screen reader would only repeat what follows it.
 */
export function StoreMonogram({ store, size, className }: StoreMonogramProps) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      className={cn(
        "grid shrink-0 place-items-center rounded-full select-none",
        "bg-muted font-semibold tracking-[0.02em] text-foreground/60",
        "ring-1 ring-black/[0.04] ring-inset",
        className,
      )}
    >
      {initials(store)}
    </span>
  );
}
