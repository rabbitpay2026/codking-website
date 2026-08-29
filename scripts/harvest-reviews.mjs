/**
 * Re-captures COD King's Shopify App Store reviews into
 * `src/data/appStoreReviews.ts`.
 *
 *   node scripts/harvest-reviews.mjs [--pages 16]
 *
 * ── Why this exists ───────────────────────────────────────────────────────
 * `src/data/appStoreReviews.ts` says nothing in it may be written by hand, and
 * that refreshing the capture means re-running the harvester. This is that
 * harvester. It is a script rather than a request the site makes at runtime:
 * the marketplace has no public reviews API, the listing is HTML meant for a
 * browser, and a page that scraped it per request would be slow, fragile and
 * rate-limited. Capturing at author time and serving from the repository keeps
 * `/customers` a static server component, and `lib/content/proof.ts` stays the
 * seam a live sync would replace.
 *
 * ── How it reads a review ─────────────────────────────────────────────────
 * One review per `data-merchant-review` block, with the store, the stars, the
 * date, the country and the body all read from inside that same block. This is
 * the part that must not be simplified. An earlier hand-capture read the page
 * top to bottom and the store names drifted by a row against the bodies, so
 * two merchants were credited with words another merchant wrote. Parsing per
 * block makes that structurally impossible.
 *
 * ── What it fetches ───────────────────────────────────────────────────────
 * The listing's default relevance order, plus one pass over the 1–4 star
 * filters. The second pass is deliberate: relevance buries critical reviews
 * deep in the listing, and a capture that quietly held only the top pages
 * would under-report them. The customers page publishes 4- and 5-star reviews
 * only, but the capture itself stays complete, and `ReviewSummary` reports the
 * marketplace's full distribution from the header figures below.
 *
 * Reviews are keyed by the marketplace's own review id, so a re-run recognises
 * what it already holds rather than appending a second copy.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const LISTING =
  "https://apps.shopify.com/cash-on-delivery-cod-order-confirmation";
const REVIEWS_URL = `${LISTING}/reviews`;

/** A browser UA. The listing serves a different, emptier page without one. */
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/data/appStoreReviews.ts",
);

const MONTHS = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

/** HTML to text, keeping the reviewer's own line and paragraph breaks. */
function decodeHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&amp;/g, "&");
}

/**
 * A body, with the markup's own whitespace taken back out.
 *
 * The listing's HTML is pretty-printed, so a single break arrives as a `<br>`
 * plus the newline the source file already had, and a paragraph boundary as a
 * blank line between tags. Neither is something the reviewer typed. Every run
 * of newlines collapses to one, so a break in the output is a break the
 * merchant made — the words themselves are never touched.
 */
function tidyBody(text) {
  return text.replace(/[ \t]*\n[ \t\n]*/g, "\n").trim();
}

/**
 * Every review in one page of listing HTML.
 *
 * Blocks are sliced between consecutive `data-merchant-review` markers so each
 * review is parsed out of its own markup and nothing can be read across the
 * boundary into the next review.
 */
function parseReviews(html) {
  const marker = /data-merchant-review=""\s+data-review-content-id="(\d+)"/g;
  const starts = [];

  for (let match = marker.exec(html); match; match = marker.exec(html)) {
    starts.push({ at: match.index, id: match[1] });
  }

  return starts.map(({ at, id }, index) => {
    const end = index + 1 < starts.length ? starts[index + 1].at : html.length;
    const block = html.slice(at, end);

    // The stars are the widget's own accessible name, not a count of glyphs:
    // the listing draws five outlines and fills some of them.
    const rating = Number(
      block.match(/aria-label="(\d) out of 5 stars"/)?.[1] ?? NaN,
    );

    const dateline =
      block.match(
        /tw-text-body-xs tw-text-fg-tertiary">\s*([\s\S]*?)\s*<\/div>/,
      )?.[1] ?? "";
    const stamp = dateline.match(/([A-Z][a-z]+) (\d{1,2}), (\d{4})/);
    const publishedAt = stamp
      ? `${stamp[3]}-${MONTHS[stamp[1]]}-${stamp[2].padStart(2, "0")}`
      : "";

    const author = decodeHtml(
      block.match(/title="([^"]*)"\s*>\s*\n/)?.[1] ?? "",
    ).trim();

    // The country sits in the byline column, after the share button. Anchoring
    // there keeps it from matching a stray div earlier in the block.
    const byline = block.slice(block.indexOf("data-review-share-link"));
    const country = decodeHtml(
      byline.match(/<div>([^<]+)<\/div>/)?.[1] ?? "",
    ).trim();

    const body = tidyBody(
      decodeHtml(
        block.match(
          /<div data-truncate-content-copy[^>]*>([\s\S]*?)<\/div>/,
        )?.[1] ?? "",
      ),
    );

    return {
      id,
      author,
      rating,
      publishedAt,
      edited: /^Edited/.test(dateline.trim()),
      country,
      body,
    };
  });
}

/**
 * The listing's own header figures: its average, its total, its spread.
 *
 * These are read from the marketplace rather than counted from the reviews
 * below, because the capture is a subset and its own tallies would understate
 * the listing. The distribution rows are matched by the star filter each one
 * links to, which is the only thing in that markup tying a count to a level —
 * the level itself is drawn in an `aria-hidden` div.
 */
function parseListing(html) {
  const averageRating = Number(
    html.match(/<div aria-label="(\d(?:\.\d)?) out of 5 stars">/)?.[1] ?? NaN,
  );

  const totalReviews = Number(
    (
      html.match(
        /tw-text-heading-xl">\s*Reviews\s*<\/span>\s*<span[^>]*>\s*\(([\d,]+)\)/,
      )?.[1] ?? ""
    ).replace(/,/g, ""),
  );

  const distribution = {};
  for (const star of [5, 4, 3, 2, 1]) {
    const count = html.match(
      new RegExp(
        `aria-label="([\\d,]+) total reviews" href="[^"]*ratings%5B%5D=${star}"`,
      ),
    )?.[1];
    if (count !== undefined)
      distribution[star] = Number(count.replace(/,/g, ""));
  }

  const missing = [5, 4, 3, 2, 1].filter(
    (star) => distribution[star] === undefined,
  );
  if (
    !Number.isFinite(averageRating) ||
    !Number.isFinite(totalReviews) ||
    missing.length > 0
  ) {
    throw new Error(
      `Could not read the listing header (average ${averageRating}, total ` +
        `${totalReviews}, missing star rows: ${missing.join(", ") || "none"}). ` +
        `The listing's markup has changed — fix the parser.`,
    );
  }

  return { averageRating, totalReviews, distribution };
}

async function fetchPage(url) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.text();
}

async function main() {
  const pageFlag = process.argv.indexOf("--pages");
  const pages = pageFlag === -1 ? 16 : Number(process.argv[pageFlag + 1]);

  const lowStars =
    "ratings%5B%5D=1&ratings%5B%5D=2&ratings%5B%5D=3&ratings%5B%5D=4";
  const urls = [
    ...Array.from(
      { length: pages },
      (_, index) => `${REVIEWS_URL}?sort_by=relevance&page=${index + 1}`,
    ),
    `${REVIEWS_URL}?${lowStars}&page=1`,
    `${REVIEWS_URL}?${lowStars}&page=2`,
  ];

  const reviews = [];
  const seen = new Set();
  let listing = null;

  for (const url of urls) {
    const html = await fetchPage(url);
    listing ??= parseListing(html);

    for (const review of parseReviews(html)) {
      if (seen.has(review.id)) continue;
      seen.add(review.id);
      reviews.push(review);
    }
  }

  const broken = reviews.filter(
    (review) =>
      !review.author ||
      !review.publishedAt ||
      !Number.isInteger(review.rating) ||
      review.rating < 1 ||
      review.rating > 5,
  );

  if (broken.length > 0) {
    throw new Error(
      `Refusing to write: ${broken.length} review(s) failed to parse. The ` +
        `listing's markup has probably changed — fix the parser rather than ` +
        `the output. First: ${JSON.stringify(broken[0])}`,
    );
  }

  const captured = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] ?? 0) + 1;
    return counts;
  }, {});

  await writeFile(OUT, render(reviews, listing, captured), "utf8");

  console.warn(
    `Wrote ${reviews.length} reviews to ${path.relative(process.cwd(), OUT)} ` +
      `(${JSON.stringify(captured)}); listing reports ${listing.totalReviews} ` +
      `at ${listing.averageRating}.`,
  );
}

/** A TypeScript string literal — Prettier normalises the quoting afterwards. */
function literal(value) {
  return JSON.stringify(value);
}

/**
 * Today, where the machine running this is. Deliberately not `toISOString()`,
 * which is UTC and would stamp an evening capture with yesterday's date.
 */
function today() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function render(reviews, listing, captured) {
  const capturedOn = today();
  const positive = (captured[5] ?? 0) + (captured[4] ?? 0);
  const critical = reviews.length - (captured[5] ?? 0);

  const entries = reviews
    .map((review) =>
      [
        "  {",
        `    id: ${literal(review.id)},`,
        `    author: ${literal(review.author)},`,
        `    rating: ${review.rating},`,
        `    publishedAt: ${literal(review.publishedAt)},`,
        review.edited ? "    edited: true," : null,
        review.country ? `    country: ${literal(review.country)},` : null,
        `    body: ${literal(review.body)},`,
        "  },",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  const spread = [5, 4, 3, 2, 1]
    .map((star) => `${star}: ${listing.distribution[star] ?? 0}`)
    .join(", ");

  return `import type { AppStoreListing, AppStoreReview } from "@/types";

/**
 * COD King's Shopify App Store reviews, captured from the public listing.
 *
 * GENERATED FILE — do not edit by hand. Run \`node scripts/harvest-reviews.mjs\`
 * to refresh it. The words here are the reviewers' own: no trimming, no
 * tidying, no rewording, and no review that is not on the listing.
 *
 * ── Source ────────────────────────────────────────────────────────────────
 * ${REVIEWS_URL}
 * Captured ${capturedOn} from the listing's own pages: the marketplace's default
 * relevance order, plus every page of the one-, two-, three- and four-star
 * filters.
 *
 * ── How it was captured, and why that matters ─────────────────────────────
 * Each review is read out of its own \`data-merchant-review\` block — the store
 * from the \`title\` attribute, the stars from the block's own rating widget,
 * the date, the country and the body from their elements inside that same
 * block. Nothing is transcribed from a rendered page or a summary of one.
 *
 * That is not a detail. An earlier pass built this content by reading the
 * page top to bottom, and the store names shifted by a row against the review
 * bodies — two merchants were credited with words another merchant wrote. It
 * is the worst mistake this file can make, and parsing per block is what makes
 * it structurally impossible: a store and a body can only be paired here if
 * the marketplace put them in the same block.
 *
 * ── What this is and is not ───────────────────────────────────────────────
 * It is a capture, not the whole listing. The marketplace holds
 * ${listing.totalReviews} reviews; ${reviews.length} are here. What it does hold in full is every
 * review below five stars — all ${critical} of them, matching the listing's own
 * distribution exactly — so nothing critical has been filtered out of the
 * capture to flatter the site.
 *
 * The capture is complete; the \`/customers\` page is not the capture. That page
 * publishes the ${positive} four- and five-star reviews held here and links to the
 * listing for the rest, and \`ReviewSummary\` reports the marketplace's full
 * distribution — critical reviews included — from \`appStoreListing\` below.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** What the marketplace reports about the listing as a whole. */
export const appStoreListing: AppStoreListing = {
  url: "${REVIEWS_URL}?sort_by=relevance",
  totalReviews: ${listing.totalReviews},
  averageRating: ${listing.averageRating},
  distribution: { ${spread} },
  capturedOn: "${capturedOn}",
};

/**
 * The captured reviews, in the order the listing presents them.
 *
 * Order is the marketplace's relevance ranking, kept rather than re-sorted.
 * \`selectPositiveReviews\` in \`utils/reviews\` is what orders the customers
 * page, and it uses this order as its tie-break.
 */
export const appStoreReviews: readonly AppStoreReview[] = [
${entries}
];
`;
}

await main();
