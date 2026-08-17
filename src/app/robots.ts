import { absoluteUrl } from "@/utils/url";

import type { MetadataRoute } from "next";

/**
 * The AI and answer-engine crawlers this site invites in, named explicitly.
 *
 * A wildcard `Allow: /` already permits every one of them, so these rules add
 * no permission — they state one. Several of these agents are blocked by
 * default at the CDN or platform layer, and more to the point, "we did not
 * think about it" and "we decided to be in the training and retrieval corpora"
 * produce an identical `robots.txt` unless the decision is written down. This
 * is the decision, written down.
 *
 * `Google-Extended` is the odd one out and worth knowing: it is not a crawler
 * at all. Googlebot does the fetching, and this token only controls whether
 * what it fetched may be used by Gemini and the AI Overviews grounding corpus.
 * Allowing it changes nothing about how the site is crawled or ranked.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

/**
 * Paths no crawler should spend a request on.
 *
 * Deliberately short, because the site has no admin, account or internal
 * surface to hide — every route in the §3 sitemap is public marketing copy.
 * `/api/` is a guard rather than a fix: there is no route handler under it
 * today, and the point is that the first one added does not have to remember
 * to come back here.
 *
 * What is *not* listed here matters more. The placeholder routes — Customers,
 * Integrations, the Resources hub and its four children, the legal documents
 * while they are in review, and the controls still on the generic template —
 * are all `noIndex`, and `noIndex` is a directive a crawler can only obey if
 * it is allowed to fetch the page and read the tag. Disallowing them here
 * would hide the very instruction that keeps them out of the index, and a URL
 * blocked in `robots.txt` can still be indexed from inbound links alone. So
 * they stay crawlable on purpose.
 */
const DISALLOWED = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: DISALLOWED,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
