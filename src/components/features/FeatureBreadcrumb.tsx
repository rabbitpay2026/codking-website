import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

interface FeatureBreadcrumbProps extends WithClassName {
  /** The control's own name, which is also the current page. */
  readonly current: string;
}

/**
 * The trail every feature page opens with (§4.6).
 *
 * A real `<nav>` around a real ordered list, with the current page carrying
 * `aria-current` and no link — a breadcrumb whose last item is clickable is
 * telling a keyboard user there is somewhere else to go and then not taking
 * them there.
 *
 * Small, quiet, and above the badge rather than beside it: this is orientation,
 * not content, and the first thing a visitor should read on the page is the
 * headline.
 */
export function FeatureBreadcrumb({
  current,
  className,
}: FeatureBreadcrumbProps) {
  const trail = [
    { label: "Home", href: routes.home },
    { label: "Features", href: routes.features },
  ] as const;

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] text-ink/45">
        {trail.map((item) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <Link
              href={item.href}
              className="rounded-sm transition-colors duration-200 hover:text-ink/75 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
            >
              {item.label}
            </Link>
            <ChevronRight aria-hidden className="size-3 text-ink/25" />
          </li>
        ))}

        <li aria-current="page" className="font-medium text-ink/70">
          {current}
        </li>
      </ol>
    </nav>
  );
}
