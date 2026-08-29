import { CompanyHero } from "@/components/company";
import {
  ReviewCard,
  ReviewLoadMore,
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
  parseShown,
  revealReviews,
  selectPositiveReviews,
} from "@/utils/reviews";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Customer Reviews",
  description:
    "Shopify merchants share their experience of running COD King on their stores — their four- and five-star reviews from the Shopify App Store, in their own words.",
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
 * "Load more reviews" is a link. Every view of this page is a real URL, so a
 * longer list can be linked to and opened in a new tab, and the page ships no
 * JavaScript for any of it. `searchParams` is what makes the route dynamic —
 * it is rendered per request rather than prerendered, which is the correct
 * trade for a page whose whole job is to answer a query.
 *
 * ── What this page shows, and what it does not ────────────────────────────
 * The four- and five-star reviews, ordered five-star first. This is a
 * testimonial section rather than a mirror of the listing, and the filtering
 * is by rating only: no review is rewritten, shortened or improved, and every
 * name, country, date, rating and word is the marketplace's.
 *
 * What keeps that honest is the panel above the list. `ReviewSummary` prints
 * the marketplace's own average, its total, and its full distribution — the
 * one- and two-star rows included, at their real counts — and links to the
 * listing itself. So the page states the shape of the whole record directly
 * above a list that admits to being the positive part of it, rather than
 * implying the list is everything there is.
 *
 * ── On the two ratings ────────────────────────────────────────────────────
 * The site presents a 5.0; the Shopify listing reports 4.9 across 962 reviews.
 * `ReviewSummary` shows both and names which is which, and nothing on this
 * page describes the site's figure as the marketplace's.
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

  const published = selectPositiveReviews(reviews);
  const { items, shown, total, next } = revealReviews(
    published,
    parseShown(params.show),
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
        description="Every review on this page was left by a merchant running COD King on their own store, and is reproduced from the Shopify App Store exactly as written. These are the four- and five-star reviews; the full listing, every rating included, is a click away."
      />

      <SectionShell size="compact" className="border-t border-ink/[0.07]">
        <ReviewSummary proof={proof} listing={listing} published={total} />
      </SectionShell>

      <SectionShell
        size="compact"
        className="border-t border-ink/[0.07]"
        ariaLabel="Customer reviews"
      >
        {/*
          An empty feed is a real state — the content repository is allowed to
          return nothing — and it renders as a sentence rather than as a blank
          stretch of page.
        */}
        {items.length === 0 ? (
          <p className="text-[14px] leading-relaxed text-ink/55">
            Reviews are on their way. In the meantime they can all be read on
            the Shopify App Store.
          </p>
        ) : (
          <>
            <ul className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((review, index) => (
                <li key={review.id} className="h-full">
                  {/*
                    A short stagger down the grid, capped by the row rather
                    than by the index: nine cards each waiting a little longer
                    than the last would leave the final one arriving half a
                    second after the first.
                  */}
                  <BlurFade delay={0.03 * (index % 3)} className="h-full">
                    <ReviewCard review={review} />
                  </BlurFade>
                </li>
              ))}
            </ul>

            {next === null ? null : (
              <ReviewLoadMore next={next} remaining={total - shown} />
            )}

            <p className="mt-8 text-center text-[12.5px] leading-none text-ink/45">
              Showing {shown} of {total} {total === 1 ? "review" : "reviews"}{" "}
              published here
            </p>
          </>
        )}
      </SectionShell>
    </>
  );
}
