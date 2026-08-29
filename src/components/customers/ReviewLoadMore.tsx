import Link from "next/link";

import { routes } from "@/constants/routes";
import { REVIEWS_STEP } from "@/utils/reviews";

import type { Route } from "next";

const numberFormat = new Intl.NumberFormat("en");

/**
 * A `/customers` URL showing a given number of reviews.
 *
 * The opening state is written as plain `/customers` rather than `?show=9`, so
 * the page has one canonical address rather than two spellings of the same
 * view.
 */
export function customersHref(shown?: number | null): Route {
  return (
    shown && shown > REVIEWS_STEP
      ? `${routes.customers}?show=${shown}`
      : routes.customers
  ) as Route;
}

interface ReviewLoadMoreProps {
  /** The `?show=` value that reveals the next step. */
  readonly next: number;
  /** How many reviews are still unrevealed, for the count on the button. */
  readonly remaining: number;
}

/**
 * "Load more reviews", as a link.
 *
 * Every state of this list is a real URL, which is what keeps the whole page a
 * server component: no `useState`, no client bundle, and a view that can be
 * linked to, bookmarked and opened in a new tab. The cost is a navigation per
 * press, and on a page of static text that is the right trade.
 *
 * `scroll={false}` is the detail that makes it read as loading rather than as
 * paging: the cards already on screen stay where they are and the new ones
 * appear below them, instead of the viewport jumping back to the top of a page
 * the visitor has already read.
 *
 * The remaining count is on the button because a bare "load more" says nothing
 * about whether it is worth pressing. It counts what this page will actually
 * show — not the marketplace's total, which `ReviewSummary` reports separately
 * and which is a different, larger number for a stated reason.
 */
export function ReviewLoadMore({ next, remaining }: ReviewLoadMoreProps) {
  return (
    <div className="mt-10 flex justify-center">
      <Link
        href={customersHref(next)}
        scroll={false}
        className={[
          "inline-flex items-center gap-2 rounded-full border border-ink/[0.12] bg-background px-5 py-2.5",
          "text-[13px] leading-none font-medium text-ink/75",
          "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-emphasized)]",
          "hover:border-ink/25 hover:text-ink",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        ].join(" ")}
      >
        Load more reviews
        <span className="text-[12px] tabular-nums opacity-55">
          {numberFormat.format(remaining)} more
        </span>
      </Link>
    </div>
  );
}
