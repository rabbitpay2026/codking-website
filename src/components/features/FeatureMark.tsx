import {
  fallbackFeatureIcon,
  featureIcons,
} from "@/components/features/featureIcons";
import { cn } from "@/lib/utils";

import type { ControlSlug, WithClassName } from "@/types";

interface FeatureMarkProps extends WithClassName {
  readonly slug: ControlSlug;
  /** The lead block carries a larger tile; everything else uses the default. */
  readonly size?: "md" | "lg";
}

/**
 * One control's mark, in the tile every block on this page uses.
 *
 * Six unrelated glyphs drawn at their own sizes never line up down a page;
 * held inside one tile at one size they read as a set. Quiet at rest and brand
 * on hover, driven by the `group` on the block around it — so the whole area
 * responds as one thing rather than the icon animating on its own.
 */
export function FeatureMark({
  slug,
  size = "md",
  className,
}: FeatureMarkProps) {
  // A plain lookup, not a call: the component identity has to come
  // straight out of the module-scope map to stay stable across renders.
  const Icon = featureIcons[slug] ?? fallbackFeatureIcon;

  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-xl border border-border bg-sky-50 text-ink/40",
        "transition-colors duration-300 ease-emphasized",
        "group-hover:border-brand/25 group-hover:text-brand",
        size === "lg" ? "size-12" : "size-10",
        className,
      )}
    >
      <Icon
        className={size === "lg" ? "size-[22px]" : "size-[18px]"}
        strokeWidth={1.6}
      />
    </span>
  );
}
