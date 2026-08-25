import { ArrowUpRight } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { Stars } from "@/components/sections/proof/Stars";
import { Button } from "@/components/ui/button";
import { formatRating } from "@/utils/format";
import { REVIEW_STARS } from "@/utils/reviews";

import type { AppStoreListing, ProofMetrics } from "@/types";

const numberFormat = new Intl.NumberFormat("en");

interface ReviewSummaryProps {
  readonly proof: ProofMetrics;
  readonly listing: AppStoreListing;
  /** How many reviews this site holds locally, for the capture note. */
  readonly captured: number;
}

/**
 * The two ratings, side by side and clearly labelled as different things.
 *
 * This is the whole reason the panel exists. The site presents a 5.0; the
 * Shopify listing reports 4.9 across 958 reviews. Both are true statements
 * about different things, and a page that shows one without the other is
 * either hiding the marketplace's number or contradicting the site's. So the
 * left panel is the site's presentation, named for what it actually is —
 * customer reviews from App Store merchants — and the right panel is the
 * marketplace's own record, named for the marketplace, with its real
 * distribution drawn underneath it.
 *
 * Nowhere does either panel say "Shopify App Store rating: 5.0", which would
 * be the one claim the listing contradicts.
 *
 * The distribution bars are the listing's own counts, critical reviews
 * included. They are drawn as plain divs at a percentage width — no chart, no
 * library, no client component — because five proportions do not need one.
 */
export function ReviewSummary({
  proof,
  listing,
  captured,
}: ReviewSummaryProps) {
  const rating = formatRating(proof.rating);
  const listingRating = formatRating(listing.averageRating);

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      {/* ── What the site presents ─────────────────────────────────────── */}
      <div className="flex flex-col justify-center rounded-[1.15rem] border border-border bg-card p-6">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
          Customer reviews
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[2.75rem] leading-none font-semibold tracking-[-0.035em] text-ink tabular-nums">
            {rating}
          </span>
          <Stars
            rating={proof.rating}
            className="size-4 shrink-0"
            label={`Rated ${rating} out of 5`}
          />
        </div>

        <p className="mt-3.5 max-w-sm text-[13px] leading-relaxed text-ink/55">
          Customer reviews from Shopify App Store merchants running COD King on
          their stores.
        </p>
      </div>

      {/* ── What the marketplace reports ───────────────────────────────── */}
      <div className="flex flex-col rounded-[1.15rem] border border-border bg-card p-6">
        <div className="flex items-start gap-2">
          <ShopifyMark className="mt-px size-[18px] shrink-0" />
          <h2 className="text-[0.9375rem] leading-tight font-semibold text-foreground">
            On the Shopify App Store
          </h2>
        </div>

        <div className="mt-3.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
            {listingRating}
          </span>
          <span className="text-[13px] text-ink/55">
            average across{" "}
            <span className="font-semibold text-ink tabular-nums">
              {numberFormat.format(listing.totalReviews)}
            </span>{" "}
            reviews
          </span>
        </div>

        {/*
          The distribution, as the listing reports it.

          Every level is drawn, including the ones nobody wants to point at.
          The bar is a percentage of the listing's own total, so the five rows
          add up to the number stated above them.
        */}
        <ul className="mt-4 space-y-1.5">
          {REVIEW_STARS.map((star) => {
            const count = listing.distribution[star];
            const share = (count / listing.totalReviews) * 100;

            return (
              <li key={star} className="flex items-center gap-2.5">
                <span className="w-8 shrink-0 text-[11.5px] leading-none font-medium text-ink/55 tabular-nums">
                  {star}★
                </span>

                <span
                  aria-hidden
                  className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-ink/[0.06]"
                >
                  <span
                    className="block h-full rounded-full bg-[#f5a623]"
                    style={{ width: `${Math.max(share, share > 0 ? 1 : 0)}%` }}
                  />
                </span>

                <span className="w-10 shrink-0 text-right text-[11.5px] leading-none text-ink/45 tabular-nums">
                  {numberFormat.format(count)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button asChild variant="secondary" size="sm" className="text-[12px]">
            <a href={listing.url} target="_blank" rel="noopener noreferrer">
              Read all reviews on Shopify
              <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>

          {/*
            What this page actually holds, stated rather than implied. The
            summary above is the marketplace's total; the list below is a
            capture of part of it, and a visitor counting cards deserves to
            know which number they are looking at.
          */}
          <p className="text-[11.5px] leading-snug text-ink/45">
            {numberFormat.format(captured)} of them are published on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
