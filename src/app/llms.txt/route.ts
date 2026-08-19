import { externalLinks } from "@/constants/external";
import { routeFor, routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { getPublishedControls } from "@/lib/content";
import { absoluteUrl } from "@/utils/url";

import type { Route } from "next";

/**
 * `/llms.txt` — the site, addressed to a model rather than to a merchant.
 *
 * A route handler rather than a file in `public/`, and that is the whole point
 * of building it here: a static `public/llms.txt` would be a second hand-typed
 * copy of every URL on this site, and it would be wrong the first time a route
 * moved. This reads the route registry, the controls repository and the
 * external-destinations table, so it cannot list a URL no page answers to and
 * it gains a feature page in the same commit the page lands.
 *
 * The format is the llms.txt convention: an H1 with the site's name, a
 * blockquote summary, then H2 sections of `- [Title](url): note` links. It is
 * a map, not a pitch — every line here is a destination and a reason to open
 * it, and there is no paragraph of marketing between them.
 *
 * Nothing below is authored for this file. The summary is `siteConfig`'s, each
 * control's note is its own `outcome` line from the controls repository, and
 * the page notes are the sentences those pages already publish as their meta
 * descriptions. That is deliberate: a machine-readable summary that describes
 * the product differently from the product is worse than none.
 *
 * The URLs are the indexable set, matching `sitemap.ts` exactly, plus the two
 * off-site destinations a model genuinely needs — the documentation subdomain
 * and the App Store listing the product installs from. Placeholder routes, the
 * draft legal documents and the controls still on the generic template are
 * absent for the same reason they are absent from the sitemap.
 */

interface Entry {
  readonly title: string;
  readonly url: string;
  readonly note: string;
}

interface Section {
  readonly heading: string;
  readonly entries: readonly Entry[];
}

/** An internal page, resolved to its canonical absolute URL. */
function page(title: string, path: Route, note: string): Entry {
  return { title, url: absoluteUrl(path), note };
}

function buildSections(): readonly Section[] {
  const sections: Section[] = [
    {
      heading: "Product",
      entries: [
        page(
          "Features",
          routes.features,
          "Every COD control, grouped by when it acts in the order — before it, at it, after it, and across the store.",
        ),
        /*
          One line per finished feature page, with the control's own outcome as
          its note. Read from the repository, so this section is never a stale
          summary of what the product does.
        */
        ...getPublishedControls().map((control) =>
          page(control.name, routeFor.control(control.slug), control.outcome),
        ),
        /*
          The FAQ, with the feature pages rather than under Company: it answers
          questions about the product, and it is the densest page on this site
          for exactly the kind of question a model is asked — what a COD fee is,
          whether the app needs a developer, how a deposit is collected.
        */
        page(
          "FAQ",
          routes.faq,
          "Answers to what merchants ask about setup, COD rules and fees, partial and prepaid payments, messaging costs, plans and billing.",
        ),
      ],
    },
    {
      heading: "Pricing and tools",
      entries: [
        page(
          "Pricing",
          routes.pricing,
          "Three plans, billed on your Shopify invoice. Starts free with unlimited orders.",
        ),
        page(
          "COD Calculator",
          routes.codCalculator,
          "A free tool that models what cash on delivery costs a store and what recovering it would be worth. No signup.",
        ),
      ],
    },
    {
      heading: "Company",
      entries: [
        page(
          "About",
          routes.about,
          "What COD King is, who builds it, and the problem it was built for.",
        ),
        page(
          "Contact",
          routes.contact,
          "How to reach support — WhatsApp, in-app chat, or the contact form.",
        ),
      ],
    },
  ];

  /*
    The off-site destinations, each included only if it is actually configured.
    `externalLinks` resolves an unset destination to `null` rather than to a
    placeholder, and a map that points a model at a dead URL is worse than one
    that stays quiet about it.

    The blog is knowingly absent: `constants/external.ts` records that its
    subdomain is decided but not yet live, and listing it would be advertising
    an address that does not answer.
  */
  const resources: Entry[] = [];

  if (externalLinks.docs) {
    resources.push({
      title: "Documentation",
      url: externalLinks.docs,
      note: "Setup and configuration reference for every control. Hosted on its own subdomain.",
    });
  }

  if (externalLinks.install) {
    resources.push({
      title: "Shopify App Store listing",
      url: externalLinks.install,
      note: "Where COD King is installed from, and where its public reviews and rating live.",
    });
  }

  if (resources.length > 0) {
    sections.push({ heading: "Resources", entries: resources });
  }

  return sections;
}

function render(): string {
  const sections = buildSections()
    .map(({ heading, entries }) => {
      const lines = entries.map(
        ({ title, url, note }) => `- [${title}](${url}): ${note}`,
      );
      return [`## ${heading}`, "", ...lines].join("\n");
    })
    .join("\n\n");

  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "COD King is a Shopify app for managing cash-on-delivery orders: verifying them, collecting payment upfront, controlling where COD is offered, pricing it with a fee, moving buyers to prepaid, and recovering carts that never converted. It runs inside the Shopify checkout a merchant already has.",
    "",
    sections,
    "",
  ].join("\n");
}

/**
 * Prerendered at build time rather than served per request.
 *
 * Route Handlers are dynamic by default from Next 15, and this one has no
 * reason to be: it reads three compile-time registries and touches no request
 * API, so every invocation would produce identical bytes from a server that
 * did not need to be woken. `robots.txt` and `sitemap.xml` are static for the
 * same reason — they simply get there by being Metadata Routes rather than by
 * asking.
 */
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(render(), {
    headers: {
      /*
        `text/plain` with an explicit charset. The file is Markdown by
        convention, but it is fetched to be read rather than rendered, and
        `text/markdown` is still the kind of type a proxy will decide to
        download instead of display.
      */
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
