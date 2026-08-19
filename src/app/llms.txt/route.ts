import { externalLinks } from "@/constants/external";
import { routeFor, routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import {
  getCalculatorDefinitions,
  getPricingPlans,
  getPublishedControls,
} from "@/lib/content";
import { absoluteUrl } from "@/utils/url";

import type { Route } from "next";

interface Entry {
  readonly title: string;
  readonly url: string;
  readonly note: string;
}

interface Section {
  readonly heading: string;
  readonly entries: readonly Entry[];
}

function page(title: string, path: Route, note: string): Entry {
  return { title, url: absoluteUrl(path), note };
}

/**
 * "A, B and C" — the names of a repository list, written as a sentence.
 *
 * The plan and calculator notes name what each page actually contains, and the
 * names are read from the repositories that own them rather than retyped here.
 * A plan renamed on the pricing page is renamed in this file by the same edit,
 * which is the whole reason the notes are derived instead of written out.
 */
function joinList(names: readonly string[]): string {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function buildSections(): readonly Section[] {
  const planNames = joinList(getPricingPlans().map((plan) => plan.name));
  const calculatorNames = joinList(
    getCalculatorDefinitions().map((definition) => definition.title),
  );

  const sections: Section[] = [
    {
      heading: "Product",
      entries: [
        page(
          siteConfig.name,
          routes.home,
          "Verify every cash-on-delivery order, price cash properly, and move buyers to prepaid — inside the Shopify checkout a merchant already has.",
        ),
        page(
          "Features",
          routes.features,
          "Overview of the finished COD controls.",
        ),
        /*
          The controls with a finished page of their own, read from the
          publication registry rather than from the Features page's selection.

          Both lists name the same six controls today, but they answer
          different questions. `featureIndexEntries` is a marketing decision —
          which controls the Features page leads with, in what order, under
          what headline — and it is free to promote a control that is still on
          the generic `noIndex` template, or to drop a finished one from the
          page. Either edit would have silently changed what this file
          advertises: the first leaks a page whose own metadata asks not to be
          indexed, the second withdraws a canonical URL from the AI-readable
          map while leaving it in the sitemap.

          `getPublishedControls()` answers the question this file is actually
          asking — which control pages are real and indexable — and it is the
          same function the sitemap reads, so the two cannot disagree. Its
          order is the controls repository's own: the §6.1 stage sequence,
          Before → At → After the order, which is how the mega-menu, the
          Features page sections and the product itself group them.
        */
        /*
          A control published under two names is listed under both.

          Only `cod-show-hide` is: the record's `name` is "COD Rules", the name
          every other surface renders, while the product markets it — and
          titles its page and its URL — as "COD Show/Hide". A merchant asks an
          assistant using whichever one they met first, and an entry carrying
          one of them answers half of them. The alias is read from the control
          record rather than spelled out here, so this stays a rule about
          controls with two names rather than a hardcoded exception for one.
        */
        ...getPublishedControls().map((control) =>
          page(
            control.alias ? `${control.name} / ${control.alias}` : control.name,
            routeFor.control(control.slug),
            control.outcome,
          ),
        ),
      ],
    },
    {
      heading: "Tools and pricing",
      entries: [
        page(
          "Pricing",
          routes.pricing,
          `${planNames} plans, billed on your Shopify invoice.`,
        ),
        page(
          "COD Calculator",
          routes.codCalculator,
          `${calculatorNames} on one free page, no signup.`,
        ),
      ],
    },
    {
      heading: "Frequently asked questions",
      entries: [
        page(
          "FAQ",
          routes.faq,
          "Answers to setup, COD rules and fees, partial and prepaid payments, messaging costs, plans, and billing.",
        ),
      ],
    },
    {
      heading: "Company",
      entries: [
        page(
          "About",
          routes.about,
          "What COD King is, who builds it, and the problem it solves.",
        ),
        page(
          "Contact",
          routes.contact,
          "WhatsApp, in-app chat, or the contact form.",
        ),
      ],
    },
  ];

  if (externalLinks.docs) {
    sections.push({
      heading: "Documentation",
      entries: [
        {
          title: "Documentation",
          url: externalLinks.docs,
          note: "Setup and configuration reference for every control.",
        },
      ],
    });
  }

  if (externalLinks.blog) {
    sections.push({
      heading: "Blog",
      entries: [
        {
          title: "Blog",
          url: externalLinks.blog,
          note: "Product updates and news.",
        },
      ],
    });
  }

  if (externalLinks.install) {
    sections.push({
      heading: "Shopify",
      entries: [
        {
          title: "Shopify App Store listing",
          url: externalLinks.install,
          note: "Official Shopify App Store listing.",
        },
      ],
    });
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
    "COD King is a Shopify app for merchants who use cash on delivery and want to reduce fake orders, lower RTO, and recover abandoned revenue. It verifies orders, collects payment upfront, controls where COD is offered, moves buyers to prepaid, and helps teams see what is working.",
    "",
    sections,
    "",
  ].join("\n");
}

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(render(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
