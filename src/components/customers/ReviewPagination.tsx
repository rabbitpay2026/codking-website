import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { customersHref } from "@/components/customers/ReviewControls";
import { cn } from "@/lib/utils";

import type { ReviewSort, ReviewStar } from "@/utils/reviews";

/**
 * The page numbers worth drawing: the first, the last, and a window around
 * the current one, with gaps marked rather than filled.
 *
 * Twelve pages of numbers is a paragraph of digits; five plus two ends is a
 * control. The window is deliberately built from a set so the ends and the
 * middle cannot produce the same number twice when they overlap on a short
 * list.
 */
function pageWindow(page: number, pageCount: number): readonly number[] {
  const wanted = new Set<number>([1, pageCount, page - 1, page, page + 1]);

  return [...wanted]
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((a, b) => a - b);
}

const STEP = [
  "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border text-[12.5px] leading-none font-medium tabular-nums",
  "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-emphasized)]",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
].join(" ");

const IDLE =
  "border-ink/[0.12] bg-background text-ink/70 hover:border-ink/25 hover:text-ink";
const DISABLED = "border-ink/[0.08] bg-background text-ink/25";

interface ReviewPaginationProps {
  readonly page: number;
  readonly pageCount: number;
  readonly star: ReviewStar | null;
  readonly sort: ReviewSort;
}

/**
 * The pager, as links.
 *
 * Same reasoning as the filters: every page of this list is a real URL, so the
 * control is a set of anchors and the page stays a server component. The
 * current filter and sort travel with the page number, which is what keeps
 * "page 2 of the one-star reviews" a thing you can link someone to.
 *
 * The previous and next steps render as inert spans at the ends rather than as
 * links to nowhere — a disabled anchor is still focusable and still announces
 * as a link, which is worse than not being one.
 *
 * A single-page list renders nothing at all.
 */
export function ReviewPagination({
  page,
  pageCount,
  star,
  sort,
}: ReviewPaginationProps) {
  if (pageCount <= 1) return null;

  const pages = pageWindow(page, pageCount);

  return (
    <nav
      aria-label="Reviews pagination"
      className="flex flex-wrap items-center justify-center gap-1.5"
    >
      {page > 1 ? (
        <Link
          href={customersHref({ star, sort, page: page - 1 })}
          rel="prev"
          aria-label="Previous page"
          className={cn(STEP, IDLE)}
        >
          <ChevronLeft aria-hidden className="size-4" />
        </Link>
      ) : (
        <span aria-hidden className={cn(STEP, DISABLED)}>
          <ChevronLeft className="size-4" />
        </span>
      )}

      {pages.map((value, index) => {
        const previous = pages[index - 1];
        const gap = previous !== undefined && value - previous > 1;

        return (
          <span key={value} className="flex items-center gap-1.5">
            {gap ? (
              <span
                aria-hidden
                className="px-0.5 text-[12.5px] leading-none text-ink/30"
              >
                &hellip;
              </span>
            ) : null}

            <Link
              href={customersHref({ star, sort, page: value })}
              aria-label={`Page ${value}`}
              aria-current={value === page ? "page" : undefined}
              className={cn(
                STEP,
                value === page ? "border-ink bg-ink text-white" : IDLE,
              )}
            >
              {value}
            </Link>
          </span>
        );
      })}

      {page < pageCount ? (
        <Link
          href={customersHref({ star, sort, page: page + 1 })}
          rel="next"
          aria-label="Next page"
          className={cn(STEP, IDLE)}
        >
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : (
        <span aria-hidden className={cn(STEP, DISABLED)}>
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
