import type { MerchantTestimonial, ReviewSnippet } from "@/types";

/**
 * The App Store half of the social-proof band (§5.1 #8).
 *
 * ── Read this before editing ──────────────────────────────────────────────
 * Every entry below is a real, five-star, publicly visible review left on the
 * COD King listing in the Shopify App Store:
 *
 *   https://apps.shopify.com/cash-on-delivery-cod-order-confirmation/reviews
 *
 * The store name and the words are the reviewer's own. Nothing here may be
 * written, reworded, combined or strengthened: a review trimmed for the card
 * is cut at a sentence boundary and never edited, so what a visitor reads is
 * always a prefix of what the merchant actually wrote. §10.1 makes every claim
 * on this site traceable to its source, and a paraphrased review has stopped
 * being the merchant's statement.
 *
 * ── On attribution ────────────────────────────────────────────────────────
 * Store names and review bodies were paired by parsing the listing's own
 * markup — each review sits in its own `data-merchant-review` block carrying
 * its store, its country and its star widget — rather than by reading the
 * rendered page. That matters: an earlier pass transcribed the page by eye and
 * shifted two reviews onto the wrong stores. Attributing one merchant's words
 * to another is the worst failure this file has available to it, so the pairing
 * is machine-checked against the block, not eyeballed.
 *
 * Two reviews on the page are deliberately absent. One is a one-star review
 * and one is a five-star rating whose text is a complaint; a marketing
 * testimonial carousel carries the positive reviews, and neither is hidden
 * anywhere it counts — the band's own rating and review count are read from
 * `proof.ts` and cover every review on the listing, critical ones included.
 *
 * TODO(content): replace both lists with `getAppStoreReviews()` once the
 * Shopify App Store sync described in §11 lands, so the section stops being a
 * transcription and starts being a feed. The consuming repository already
 * returns them behind async functions, so the swap is an edit inside
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
 * The carousel's App Store entries, appended after the two published customer
 * stories.
 *
 * Two, because the carousel is capped at four and the published stories lead —
 * see `getMerchantTestimonials()`. Both of these were chosen for what they
 * name rather than for how warm they are: between them they mention OTP
 * verification, partial COD payments, COD rules, COD order management and fake
 * orders, which is the product a visitor is being asked to believe in.
 *
 * `caption` says where the review was left rather than inventing a job title
 * for someone who did not give one.
 */
export const stagedTestimonials: readonly MerchantTestimonial[] = [
  {
    id: "oham-shoham-ayurved",
    store: "Oham shoham ayurved",
    caption: "Shopify App Store review",
    rating: 5,
    quote:
      "We've had an excellent experience using COD King. The app is easy to set up and provides all the essential features we need, including OTP verification, partial COD payments, and flexible COD rules. It has helped us reduce fake COD orders and streamline our order confirmation process.",
  },
  {
    /*
      The first two sentences of a four-sentence review. The card holds one
      quote at a time and sets its height from the longest, so the two that
      name the controls are kept and the two that summarise are not.
    */
    id: "buybindas",
    store: "BuyBindas",
    caption: "Shopify App Store review",
    rating: 5,
    quote:
      "Using COD King has really helped improve my Shopify COD order management. The OTP verification and COD control features are very useful for reducing fake and risky orders.",
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
 * Each preview is one complete sentence of a real review, taken whole. The row
 * is roughly fifty characters across two lines, so the sentence has to fit
 * rather than be cut to fit: the row clamps as a safety net, but a clamp is not
 * a layout, and three rows all ending in an ellipsis reads as content that did
 * not fit in the column arguing the product is well made.
 */
export const reviewSnippets: readonly ReviewSnippet[] = [
  {
    id: "hasya",
    store: "HASYA",
    rating: 5,
    preview: "Solved my problem of RTO to a large extent",
  },
  {
    id: "velox",
    store: "VELOX",
    rating: 5,
    preview: "The support was very quick, helpful, and efficient.",
  },
  {
    id: "lost-my-buds",
    store: "Lost my buds",
    rating: 5,
    preview: "Excellent support experience!",
  },
];
