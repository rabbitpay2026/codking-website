import { routes } from "@/constants/routes";

import type { ResourceArticle, ResourceSection } from "@/types";

/**
 * The four resource surfaces (§7).
 *
 * Deliberately limited to four so each one stays useful and maintained. Docs
 * and Help are kept distinct on purpose: Docs explain how it works, Help
 * explains what to do when something goes wrong.
 */
export const resourceSections: readonly ResourceSection[] = [
  {
    kind: "guide",
    title: "Guides",
    href: routes.guides,
    purpose:
      "Practical how-to articles on reducing RTO, stopping fake orders, and setting COD rules.",
  },
  {
    kind: "blog",
    title: "Blog",
    href: routes.blog,
    purpose: "Product updates and news, newest first.",
  },
  /*
    Documentation points at `/documentation`, the address the documentation is
    actually published at, rather than at the `/resources/docs` placeholder
    this list used to name. The docs are a real, finished surface now — served
    from this origin by the rewrite in `next.config.ts` — and the hub's job is
    to be a door to the real thing.
  */
  {
    kind: "docs",
    title: "Documentation",
    href: routes.documentation,
    purpose: "How to set up and configure each control.",
  },
  {
    kind: "help",
    title: "Help Center",
    href: routes.help,
    purpose: "Troubleshooting and account questions.",
  },
];

/**
 * Article index.
 *
 * Empty by design: articles are authored content and arrive with the Resources
 * phase. The shape is fixed now so that publishing an article is a content
 * change rather than a code change — including the §7.1 `nextStep` rule, which
 * the type makes mandatory.
 */
export const resourceArticles: readonly ResourceArticle[] = [];
