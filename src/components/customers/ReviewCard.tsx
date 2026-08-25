import { StoreMonogram } from "@/components/sections/proof/StoreMonogram";
import { Stars } from "@/components/sections/proof/Stars";
import { cardHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { AppStoreReview } from "@/types";

/**
 * The date, written the way the marketplace writes it.
 *
 * Locale-fixed to `en-GB` for the reason `utils/format` fixes its own: a date
 * formatted by the visitor's locale is formatted one way on the server and
 * possibly another in the browser, and the two disagreeing is a hydration
 * mismatch on a page that renders a hundred of them.
 */
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? iso : dateFormat.format(parsed);
}

interface ReviewCardProps {
  readonly review: AppStoreReview;
}

/**
 * One review, exactly as the merchant left it.
 *
 * Every card is the same object whatever it holds: the site's standard
 * `surface-card` treatment, the same hover as the feature board, the store's
 * monogram rather than a face — the reason `StoreMonogram` gives, reused here
 * because these are the same reviews the homepage band shows.
 *
 * The stars are the review's own rating and are never adjusted. A one-star
 * review renders one star, in the same card as a five-star one; a page that
 * quietly dressed its critics differently from its advocates would not be
 * worth publishing.
 *
 * `whitespace-pre-line` preserves the reviewer's own paragraph breaks, which
 * several of them use to number their points. Nothing is clamped: a long
 * review makes a taller card rather than a truncated one, because the grid
 * sizes rows independently and there is no neighbour for it to stretch.
 * `break-words` is what keeps an unbroken string — a URL, a long product code
 * — inside the card instead of through the side of it.
 *
 * A review left as a rating with no words is a real state on the marketplace,
 * so the body simply does not render rather than leaving an empty paragraph's
 * worth of space behind.
 */
export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.15rem] border border-border bg-card p-5",
        cardHoverClass,
      )}
    >
      <div className="flex items-start gap-3">
        <StoreMonogram store={review.author} size={34} />

        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] leading-tight font-semibold break-words text-ink">
            {review.author}
          </h3>

          <p className="mt-1 text-[11.5px] leading-tight text-ink/45">
            {review.country ? `${review.country} · ` : ""}
            {formatDate(review.publishedAt)}
            {review.edited ? " · edited" : ""}
          </p>
        </div>
      </div>

      <div className="mt-3.5">
        <Stars
          rating={review.rating}
          className="size-[13px] shrink-0"
          label={`Rated ${review.rating} out of 5`}
        />
      </div>

      {review.body ? (
        <p className="mt-3 text-[13px] leading-relaxed break-words whitespace-pre-line text-ink/70">
          {review.body}
        </p>
      ) : null}
    </article>
  );
}
