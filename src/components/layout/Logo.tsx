import Image from "next/image";
import Link from "next/link";

import { routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

interface LogoProps extends WithClassName {
  /**
   * Load eagerly. True in the header, where the logo is above the fold on
   * every page; false in the footer, which is never the first paint.
   */
  readonly priority?: boolean;
}

/**
 * The logo, linking home.
 *
 * This is the tile lockup — the wordmark reversed out of its own violet
 * gradient panel — rather than the transparent violet-on-white wordmark used
 * before. The tile brings its background with it, so it is placed as a solid
 * object on the surface rather than as ink printed onto it. Every placement on
 * this site (header, footer, mobile drawer) sits on a light surface, so the
 * panel reads as intended in all three; a dark placement would need the
 * transparent wordmark instead, and there is not one today.
 *
 * The rendered height is larger than the old wordmark's on purpose. The tile
 * bakes in its own padding, so roughly forty percent of its height is margin —
 * matched pixel for pixel, the lettering inside would come out noticeably
 * smaller than the mark it replaces. `h-9 sm:h-10` puts the wordmark back at
 * the optical size the header was designed around.
 *
 * The focus ring radius is set from the artwork's own corner radius (about
 * 14% of its height) so the ring traces the tile rather than boxing it.
 *
 * `width`/`height` are the *rendered* box, not the file's intrinsic 1072×320,
 * and there is deliberately no `sizes`. This is a fixed-size image, and the
 * docs are explicit that omitting `sizes` is what makes Next emit a small 1x/2x
 * srcset for exactly that case; supplying one instead produces the full
 * responsive candidate list. That mattered here rather than being academic —
 * the mobile drawer mounts its logo inside a portal, the browser evaluated
 * `sizes` before that subtree had a layout, fell back to the largest candidate,
 * and asked for a 3840-wide render of a 121-pixel mark. It missed the header's
 * preloaded cache entry and the drawer opened with an empty space where the
 * logo should be. The ratio is preserved (134 ÷ 40 = 1072 ÷ 320), so the box is
 * still reserved correctly and the header stays free of layout shift.
 *
 * The image carries an empty `alt` because the link already has an accessible
 * name — labelling both would make a screen reader announce the brand twice.
 *
 * NOTE(assets): the source file is a 263 KB PNG for a mark that never renders
 * wider than ~135 CSS pixels. The optimiser serves a far smaller variant, so
 * nothing ships at that weight, but a tighter export from design is still worth
 * having.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href={routes.home}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-[8px]",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src="/logos/cod-king-logo-tile.png"
        alt=""
        width={134}
        height={40}
        priority={priority}
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
