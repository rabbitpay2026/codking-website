import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { NavItem, WithClassName } from "@/types";

interface BreadcrumbProps extends WithClassName {
  /** The ancestors, nearest root first. Every one of them is a link. */
  readonly trail: readonly NavItem[];
  /** The page being read. Rendered as text, never as a link. */
  readonly current: string;
}

/**
 * The trail a page opens with (§4.6).
 *
 * A real `<nav>` around a real ordered list, with the current page carrying
 * `aria-current` and no link — a breadcrumb whose last item is clickable is
 * telling a keyboard user there is somewhere else to go and then not taking
 * them there.
 *
 * Small, quiet, and above whatever follows rather than beside it: this is
 * orientation, not content, and the first thing a visitor should read on the
 * page is the headline.
 *
 * The trail is a parameter because the feature pages, the legal documents and
 * the company pages sit at different depths and all three want the same object.
 * `FeatureBreadcrumb` is the feature pages' one-argument wrapper around it.
 */
export function Breadcrumb({ trail, current, className }: BreadcrumbProps) {
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
