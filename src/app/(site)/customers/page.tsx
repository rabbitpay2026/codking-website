import { CompanyHero } from "@/components/company";
import {
  ReviewCard,
  ReviewControls,
  ReviewPagination,
  ReviewSummary,
} from "@/components/customers";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routes } from "@/constants/routes";
import {
  getAppStoreListing,
  getAppStoreReviews,
  getProofMetrics,
} from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import {
  countByStar,
  paginateReviews,
  parsePage,
  parseSort,
  parseStar,
  selectReviews,
} from "@/utils/reviews";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Customer Reviews",
  description:
    "Shopify merchants share their experience of running COD King on their stores — the reviews they left on the Shopify App Store, in full.",
  path: routes.customers,
});

/**
 * The customer reviews page (§3.1).
 *
 * A composition file: it turns the URL into a query, reads the review feed
 * from the content repository, and hands the pieces to the components below.
 * It holds no copy and no review of its own.
 *
 * ── Why it is a server component with no state ────────────────────────────
 * The filter, the sort and the pager are links. Every view of this page is a
 * real URL, so a filtered list can be linked to and opened in a new tab, and
 * the page ships no JavaScript for any of it. `searchParams` is what makes the
 * route dynamic — it is rendered per request rather than prerendered, which is
 * the correct trade for a page whose whole job is to answer a query.
 *
 * ── On the two ratings ────────────────────────────────────────────────────
 * The site presents a 5.0; the Shopify listing reports 4.9 across 958 reviews.
 * `ReviewSummary` shows both and names which is which, and nothing on this
 * page describes the site's figure as the marketplace's. The reviews below are
 * the marketplace's own, critical ones included — this page represents the
 * feed, it does not curate it. The homepage band is where a selection is
 * appropriate; here it would be a page about reviews that hides reviews.
 */
export default async function CustomersPage({
  searchParams,
}: PageProps<"/customers">) {
  const [params, proof, listing, reviews] = await Promise.all([
    searchParams,
    getProofMetrics(),
    getAppStoreListing(),
    getAppStoreReviews(),
  ]);

  const star = parseStar(params.rating);
  const sort = parseSort(params.sort);
  const selected = selectReviews(reviews, { star, sort });
  const { items, page, pageCount, total } = paginateReviews(
    selected,
    parsePage(params.page),
  );

  return (
    <>
      <CompanyHero
        current="Customers"
        eyebrow="Customer reviews"
        headline={
          <>
            Trusted by <span className="text-brand">Shopify merchants</span>
          </>
        }
        description="Every review on this page was left by a merchant running COD King on their own store. They are reproduced from the Shopify App Store exactly as written — the critical ones alongside the rest."
      />

      <SectionShell size="compact" className="border-t border-ink/[0.07]">
        <ReviewSummary
          proof={proof}
          listing={listing}
          captured={reviews.length}
        />
      </SectionShell>

      <SectionShell
        size="compact"
        className="border-t border-ink/[0.07]"
        ariaLabel="Customer reviews"
      >
        <ReviewControls
          star={star}
          sort={sort}
          counts={countByStar(reviews)}
          total={reviews.length}
        />

        {/*
          An empty result is a real state — a star level with nothing behind it
          reached by a hand-typed URL — and it renders as a sentence rather
          than as a blank stretch of page.
        */}
        {items.length === 0 ? (
          <p className="mt-10 text-[14px] leading-relaxed text-ink/55">
            No reviews match this filter.
          </p>
        ) : (
          <>
            <ul className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((review, index) => (
                <li key={review.id} className="h-full">
                  {/*
                    A short stagger down the grid, capped by the row rather
                    than by the index: twelve cards each waiting a little
                    longer than the last would leave the final one arriving
                    half a second after the first.
                  */}
                  <BlurFade delay={0.03 * (index % 3)} className="h-full">
                    <ReviewCard review={review} />
                  </BlurFade>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-center text-[12.5px] leading-none text-ink/45">
              Page {page} of {pageCount} · {total}{" "}
              {total === 1 ? "review" : "reviews"}
            </p>

            <div className="mt-4">
              <ReviewPagination
                page={page}
                pageCount={pageCount}
                star={star}
                sort={sort}
              />
            </div>
          </>
        )}
      </SectionShell>
    </>
  );
}
