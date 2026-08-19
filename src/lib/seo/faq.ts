import { routes } from "@/constants/routes";
import { organizationId } from "@/lib/seo/organization";
import { absoluteUrl } from "@/utils/url";

import type { ResolvedFaqPageCategory } from "@/types";

/**
 * FAQPage structured data for `/faq` (§7).
 *
 * Built from the same resolved categories the page renders, and that is the
 * whole design of it: the argument is not passed a list of questions chosen for
 * the schema, it is passed the page's own content. A question cannot appear
 * here without appearing on the page, and an answer cannot be worded
 * differently in the markup from the way a reader sees it — which is the
 * specific thing Google penalises this type for.
 *
 * The answer text is the answer string exactly. The "Related" links the page
 * draws beneath some answers are navigation rather than part of the answer, so
 * they are deliberately absent; adding them would put text in the schema that
 * is not part of what the reader is told.
 *
 * `publisher` points at the Organization node the root layout already declares
 * rather than restating it — the reason that node was given a stable `@id`.
 * The FAQPage itself gets no `@id`: nothing else in this graph refers back to
 * it, and an identifier that is never referenced is one more thing to keep
 * consistent for no benefit.
 *
 * Answers are plain sentences today. `acceptedAnswer.text` accepts a limited
 * subset of HTML, but nothing in the question pool contains markup, so nothing
 * here escapes or transforms it — `JsonLd` handles the one character that could
 * end the script element early.
 */
export function buildFaqPageSchema(
  categories: readonly ResolvedFaqPageCategory[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Frequently Asked Questions",
    url: absoluteUrl(routes.faq),
    publisher: { "@id": organizationId },
    mainEntity: categories.flatMap((category) =>
      category.items.map(({ faq }) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    ),
  };
}
