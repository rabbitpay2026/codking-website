import Link from "next/link";

import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { REVIEW_STARS } from "@/utils/reviews";

import type { ReviewSort, ReviewStar } from "@/utils/reviews";

import type { Route } from "next";

const numberFormat = new Intl.NumberFormat("en");

/**
 * A `/customers` URL carrying the query it should arrive with.
 *
 * The page number is deliberately dropped whenever the filter or the sort
 * changes: page four of "all reviews" is not page four of "one star", and
 * carrying it over lands the visitor on an empty list. Defaults are omitted
 * rather than written out, so the unfiltered first page is plain `/customers`
 * and there is one canonical address for it rather than three spellings.
 */
export function customersHref(query: {
  readonly star?: ReviewStar | null;
  readonly sort?: ReviewSort;
  readonly page?: number;
}): Route {
  const params = new URLSearchParams();

  if (query.star) params.set("rating", String(query.star));
  if (query.sort && query.sort !== "relevance") params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));

  const search = params.toString();
  return (search ? `${routes.customers}?${search}` : routes.customers) as Route;
}

/** One filter or sort control. A link, because this page holds no state. */
function Chip({
  href,
  active,
  children,
}: {
  readonly href: Route;
  readonly active: boolean;
  readonly children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] leading-none font-medium",
        "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-emphasized)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        active
          ? "border-ink bg-ink text-white"
          : "border-ink/[0.12] bg-background text-ink/70 hover:border-ink/25 hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

interface ReviewControlsProps {
  readonly star: ReviewStar | null;
  readonly sort: ReviewSort;
  /** How many reviews each star filter would show, for the chip counts. */
  readonly counts: Readonly<Record<ReviewStar, number>>;
  readonly total: number;
}

/**
 * The filter and the sort, drawn as links rather than as controls.
 *
 * Every state of this page is a URL, which is what makes the whole thing a
 * server component: no `useState`, no client bundle, and a filtered view that
 * can be linked to, bookmarked, shared and opened in a new tab. The cost is a
 * navigation per change, and on a page of static text that is the right trade.
 *
 * Each star chip carries the number of reviews it would actually show, taken
 * from the local capture rather than from the marketplace's distribution —
 * these chips filter what is on this page, and a chip promising 943 reviews
 * that then shows a hundred would be lying about its own destination. A level
 * with nothing behind it renders as a disabled-looking chip rather than
 * vanishing, so the set of filters does not change shape as you use it.
 */
export function ReviewControls({
  star,
  sort,
  counts,
  total,
}: ReviewControlsProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="text-[11px] font-semibold tracking-[0.14em] text-ink/40 uppercase">
          Filter by rating
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <Chip href={customersHref({ sort })} active={star === null}>
            All reviews
            <span className="text-[11px] tabular-nums opacity-60">
              {numberFormat.format(total)}
            </span>
          </Chip>

          {REVIEW_STARS.map((value) => {
            const count = counts[value];

            if (count === 0) {
              return (
                <span
                  key={value}
                  aria-disabled
                  className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-ink/[0.08] bg-background px-3 py-1.5 text-[12.5px] leading-none font-medium text-ink/25"
                >
                  {value} star
                  <span className="text-[11px] tabular-nums">0</span>
                </span>
              );
            }

            return (
              <Chip
                key={value}
                href={customersHref({ star: value, sort })}
                active={star === value}
              >
                {value} star
                <span className="text-[11px] tabular-nums opacity-60">
                  {numberFormat.format(count)}
                </span>
              </Chip>
            );
          })}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="text-[11px] font-semibold tracking-[0.14em] text-ink/40 uppercase">
          Sort
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <Chip
            href={customersHref({ star, sort: "relevance" })}
            active={sort === "relevance"}
          >
            Most relevant
          </Chip>
          <Chip
            href={customersHref({ star, sort: "newest" })}
            active={sort === "newest"}
          >
            Newest
          </Chip>
        </div>
      </div>
    </div>
  );
}
