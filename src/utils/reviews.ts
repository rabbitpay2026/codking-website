import type { AppStoreReview } from "@/types";

/**
 * Selecting from a review feed, as pure functions.
 *
 * The customers page is a server component and its "load more" is a link
 * rather than state, so everything here takes a list and a query and returns a
 * list. Nothing reads the URL, nothing holds state, and the same call on the
 * server and in a test gives the same answer.
 */

/** The star levels, highest first. `ReviewSummary` draws one row per level. */
export const REVIEW_STARS = [5, 4, 3, 2, 1] as const;

export type ReviewStar = (typeof REVIEW_STARS)[number];

/**
 * The lowest rating the customers page publishes.
 *
 * The page is a testimonial section, not a mirror of the listing: it shows the
 * four- and five-star reviews and sends anyone who wants the rest to Shopify.
 * That link is not decoration — `ReviewSummary` prints the marketplace's full
 * distribution, one- and two-star rows included, directly above this list, so
 * the page states what it is leaving out and where to read it. Nothing here
 * edits a review; the only editorial act is which ratings are shown at all.
 */
export const MIN_DISPLAY_RATING = 4;

/**
 * How many reviews a page shows at a time.
 *
 * Nine fills three rows of the three-column grid exactly, and a testimonial
 * wall that opens with nine strong reviews reads better than one that opens
 * with a hundred of anything.
 */
export const REVIEWS_STEP = 9;

/**
 * What a review is actually about, for ranking.
 *
 * These are the things merchants come to this page to find out — whether
 * support answers, whether setup is painful, whether OTP and partial payments
 * do what they claim, whether fake orders and RTO actually drop. A review that
 * names several of them tells a prospective merchant more than one that says
 * "good app", so it goes first.
 *
 * Ranking only. No review is rewritten, no review is scored out of the list,
 * and a review's rating is never changed by where it lands. The words are the
 * merchant's and the order is ours.
 */
const REVIEW_TOPICS: readonly RegExp[] = [
  /\bsupport|\bservice\b|\bteam\b|\bhelp(ed|ful|ing)?\b|\bassist/i,
  /\bquick|\bfast\b|\bprompt|\bimmediat|\bresponsiv|\b24[x*]7\b/i,
  /\bset[- ]?up\b|\binstall|\bintegrat|\bonboard|\beasy\b|\bsimple\b|\bsmooth/i,
  /\botp\b|\bverif/i,
  /\bpartial|\badvance\b|\bprepaid\b|\bpart[- ]payment/i,
  /\bfake\b|\bspam\b|\bbogus\b|\bfraud/i,
  /\brto\b|\breturn/i,
  /\bcod\b|\bcash on delivery\b|\border confirmation\b/i,
];

/**
 * How much a review has to say, as a small integer.
 *
 * One point per topic it covers, plus up to two for length — a two-sentence
 * account of a setup carries more than four words about the same setup, but
 * length alone should not outrank substance, so it is capped well below what
 * the topics can contribute. A rating left without words scores zero and sorts
 * to the back rather than being dropped.
 */
function reviewDepth(review: AppStoreReview): number {
  const body = review.body.trim();
  if (body.length === 0) return 0;

  const topics = REVIEW_TOPICS.reduce(
    (total, topic) => total + (topic.test(body) ? 1 : 0),
    0,
  );

  const length = body.length >= 320 ? 2 : body.length >= 140 ? 1 : 0;

  return topics + length;
}

/**
 * The reviews the customers page publishes, in the order it publishes them.
 *
 * Three keys, in order: rating descending, so every five-star review is seen
 * before the first four-star one; then depth, so the strongest and most
 * specific reviews open the page; then the feed's own position, which is the
 * marketplace's relevance ranking, so reviews that tie are left in the order
 * Shopify put them and the result is stable across renders.
 *
 * Sorting copies rather than sorting in place: the feed is shared across
 * requests, and `Array.prototype.sort` mutates. Sorting the repository's own
 * array would reorder it for every later reader on the server.
 */
export function selectPositiveReviews(
  reviews: readonly AppStoreReview[],
): readonly AppStoreReview[] {
  return reviews
    .map((review, position) => ({
      review,
      position,
      depth: reviewDepth(review),
    }))
    .filter(({ review }) => review.rating >= MIN_DISPLAY_RATING)
    .sort(
      (a, b) =>
        b.review.rating - a.review.rating ||
        b.depth - a.depth ||
        a.position - b.position,
    )
    .map(({ review }) => review);
}

/**
 * A raw search param, narrowed to a count of reviews to show.
 *
 * Anything unusable is one step — the page's opening state — rather than an
 * error, and the value is rounded up to a whole number of steps so a
 * hand-typed `?show=14` still renders complete rows.
 */
export function parseShown(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  if (!Number.isFinite(parsed) || parsed <= REVIEWS_STEP) return REVIEWS_STEP;

  return Math.ceil(parsed / REVIEWS_STEP) * REVIEWS_STEP;
}

export interface RevealedReviews {
  readonly items: readonly AppStoreReview[];
  /** How many are on screen, clamped to what the list actually holds. */
  readonly shown: number;
  readonly total: number;
  /**
   * What `?show=` should be to reveal the next step, or `null` when the list
   * is exhausted — which is what tells the page not to draw the button.
   */
  readonly next: number | null;
}

/** The first `shown` reviews of a selection, and whether more remain. */
export function revealReviews(
  reviews: readonly AppStoreReview[],
  shown: number,
): RevealedReviews {
  const visible = Math.min(Math.max(shown, REVIEWS_STEP), reviews.length);

  return {
    items: reviews.slice(0, visible),
    shown: visible,
    total: reviews.length,
    next: visible < reviews.length ? visible + REVIEWS_STEP : null,
  };
}
