import type { AppStoreReview } from "@/types";

/**
 * Selecting from a review feed, as pure functions.
 *
 * The customers page is a server component and its filter, its sort and its
 * pager are links rather than state, so everything here takes a list and a
 * query and returns a list. Nothing reads the URL, nothing holds state, and
 * the same call on the server and in a test gives the same answer.
 */

/** The star filters the page offers, alongside "all". */
export const REVIEW_STARS = [5, 4, 3, 2, 1] as const;

export type ReviewStar = (typeof REVIEW_STARS)[number];

/**
 * How the list may be ordered.
 *
 * `relevance` is the marketplace's own ranking, which is the order the capture
 * preserves — so it is the default here for the same reason it is the default
 * there: it is the order a merchant sees on the source.
 */
export const REVIEW_SORTS = ["relevance", "newest"] as const;

export type ReviewSort = (typeof REVIEW_SORTS)[number];

/** How many reviews one page of the list holds. */
export const REVIEWS_PER_PAGE = 12;

export interface ReviewQuery {
  readonly page: number;
  readonly star: ReviewStar | null;
  readonly sort: ReviewSort;
}

/**
 * A raw search param, narrowed to a star filter.
 *
 * Anything that is not one of the five is `null` — an unfiltered list — rather
 * than an error. A hand-typed `?rating=9` should show the page, not break it.
 */
export function parseStar(
  value: string | string[] | undefined,
): ReviewStar | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return REVIEW_STARS.find((star) => star === parsed) ?? null;
}

/** A raw search param, narrowed to a sort. Unknown values fall back. */
export function parseSort(value: string | string[] | undefined): ReviewSort {
  const raw = Array.isArray(value) ? value[0] : value;
  return REVIEW_SORTS.find((sort) => sort === raw) ?? "relevance";
}

/** A raw search param, narrowed to a 1-based page number. */
export function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * The reviews a query selects, before paging.
 *
 * Sorting copies rather than sorting in place: the feed is shared across
 * requests, and `Array.prototype.sort` mutates. Sorting the repository's own
 * array would reorder it for every later reader on the server.
 */
export function selectReviews(
  reviews: readonly AppStoreReview[],
  query: Pick<ReviewQuery, "star" | "sort">,
): readonly AppStoreReview[] {
  const filtered =
    query.star === null
      ? reviews
      : reviews.filter((review) => review.rating === query.star);

  if (query.sort === "newest") {
    return [...filtered].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    );
  }

  return filtered;
}

export interface ReviewPage {
  readonly items: readonly AppStoreReview[];
  /** 1-based, and clamped into range — a `?page=99` shows the last page. */
  readonly page: number;
  readonly pageCount: number;
  readonly total: number;
}

/** One page of a selection, with the page number clamped into range. */
export function paginateReviews(
  reviews: readonly AppStoreReview[],
  page: number,
  perPage: number = REVIEWS_PER_PAGE,
): ReviewPage {
  const pageCount = Math.max(1, Math.ceil(reviews.length / perPage));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * perPage;

  return {
    items: reviews.slice(start, start + perPage),
    page: current,
    pageCount,
    total: reviews.length,
  };
}

/**
 * How many of a feed sit at each star level.
 *
 * The customers page reports the marketplace's own distribution rather than
 * this one, but the filter chips need to know how many reviews each of them
 * would actually show — a chip that leads to an empty list is worse than a
 * chip that says it holds three.
 */
export function countByStar(
  reviews: readonly AppStoreReview[],
): Readonly<Record<ReviewStar, number>> {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<ReviewStar, number>;

  for (const review of reviews) {
    const star = REVIEW_STARS.find((value) => value === review.rating);
    if (star) counts[star] += 1;
  }

  return counts;
}
