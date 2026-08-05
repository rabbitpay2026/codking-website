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
 * The wordmark, linking home.
 *
 * The image carries an empty `alt` because the link already has an accessible
 * name — labelling both would make a screen reader announce the brand twice.
 * Intrinsic dimensions are passed so the browser reserves the right box before
 * the file arrives, which is what keeps the header free of layout shift.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href={routes.home}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-md",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src="/logos/cod-king-wordmark.png"
        alt=""
        width={885}
        height={190}
        priority={priority}
        sizes="(min-width: 640px) 150px, 130px"
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  );
}
