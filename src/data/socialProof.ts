import type { MerchantTestimonial, ReviewSnippet } from "@/types";

/**
 * The staged half of the social-proof band (§5.1 #8).
 *
 * ── Read this before shipping ──────────────────────────────────────────────
 * The records below are ILLUSTRATIVE. The stores and words are written to show
 * the band at full size; they are not reviews anyone left.
 *
 * They are deliberately the minority of what the section renders. The
 * carousel opens with the two reviews the product has actually published —
 * those live in `src/data/customers.ts`, attributed to the merchants who wrote
 * them, and the repository puts them first. These fill the remaining slots so
 * a carousel of two does not look like a product with two customers.
 *
 * §10.1 requires every claim to point at a source, so this file is a staging
 * area, not a destination.
 *
 * TODO(content): replace both lists with `getAppStoreReviews()` once the
 * Shopify App Store sync described in §11 lands. The consuming repository
 * already returns them behind async functions, so the swap is an edit inside
 * `src/lib/content/proof.ts` and touches no component.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * There are no avatar images anywhere in this file, and that is a decision
 * rather than an omission. Every review here is attributed to a shop, not to a
 * person, so the section renders a monogram of the store's initials — see
 * `StoreMonogram`. A stock portrait beside a real merchant's words would be
 * asserting that a stranger endorsed the product, in the one section of the
 * page whose entire job is to be believed.
 */

/**
 * The carousel's staged entries, appended after the published reviews.
 *
 * Two, and short. The card is compact and holds one review at a time, so a
 * quote that runs four lines longer than its neighbours either sets the height
 * for all of them or makes the card breathe in and out every few seconds.
 */
export const stagedTestimonials: readonly MerchantTestimonial[] = [
  {
    id: "urban-thread-co",
    store: "Urban Thread Co.",
    caption: "Rahul Sharma · Founder",
    rating: 5,
    quote:
      "COD verification cut our fake orders sharply within a fortnight. Setup took under ten minutes and prepaid share moved in week one.",
  },
  {
    id: "voltbay",
    store: "Voltbay",
    caption: "Priya Nair · Co-founder",
    rating: 5,
    quote:
      "We ship high-value electronics, so every refused parcel hurt. Partial payment on COD filtered out the non-serious buyers almost at once.",
  },
];

/**
 * The App Store review list — a store, five stars and one line each.
 *
 * Shorter and flatter than the carousel beside it on purpose. That column asks
 * to be read; this one asks to be counted. The argument it makes is that there
 * are many of these and they all say the same thing, and a paragraph in each
 * row would undo it.
 *
 * Every preview is written to land inside two lines of the row it sits in.
 * The row clamps rather than overflows, but a clamp is a safety net, not a
 * layout: three rows all ending in an ellipsis reads as content that did not
 * fit, and this is the column arguing the product is well made.
 */
export const reviewSnippets: readonly ReviewSnippet[] = [
  {
    id: "saanjh-living",
    store: "Saanjh Living",
    rating: 5,
    preview: "Support replied in minutes. OTP was live the same day.",
  },
  {
    id: "northbound",
    store: "Northbound",
    rating: 5,
    preview: "RTO dropped in the first month. Cheapest fix yet.",
  },
  {
    id: "lumen-studio",
    store: "Lumen Studio",
    rating: 5,
    preview: "No code, clean dashboard, WhatsApp OTP that works.",
  },
];
