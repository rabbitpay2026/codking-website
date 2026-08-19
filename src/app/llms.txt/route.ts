import { externalLinks } from "@/constants/external";
import { routeFor, routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { getFeatureIndex } from "@/lib/content";
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

function buildSections(): readonly Section[] {
  const sections: Section[] = [
    {
      heading: "Product",
      entries: [
        page(
          "Features",
          routes.features,
          "Overview of the finished COD controls.",
        ),
        ...getFeatureIndex().map(({ control, title }) =>
          page(title, routeFor.control(control.slug), control.outcome),
        ),
      ],
    },
    {
      heading: "Tools and pricing",
      entries: [
        page(
          "Pricing",
          routes.pricing,
          "Three plans billed on your Shopify invoice.",
        ),
        page(
          "COD Calculator",
          routes.codCalculator,
          "A free calculator for estimating COD cost and recovery value.",
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
