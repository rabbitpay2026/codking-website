import { externalLinks } from "@/constants/external";
import { routes } from "@/constants/routes";

import type {
  NavItem,
  PrimaryNavItem,
  ResourceNavItem,
  UtilityAction,
} from "@/types";

/**
 * Primary navigation (§4.1).
 *
 * Each item answers a real merchant question rather than naming a department.
 * COD Calculator is a direct link and never a menu child: it is the highest
 * intent surface on the site and the architecture forbids burying it.
 *
 * Contact closes the bar. §4.3 made it footer-only, which is right for a page
 * that is not a conversion path — but a merchant evaluating a COD app for a
 * business they run should not have to scroll the site to find out whether
 * anyone answers. It stays the quietest item: a plain link, last, with no
 * button weight, so it never competes with Install Free.
 */
export const primaryNav: readonly PrimaryNavItem[] = [
  { label: "Features", href: routes.features, behaviour: "mega-menu" },
  { label: "COD Calculator", href: routes.codCalculator, behaviour: "link" },
  { label: "Pricing", href: routes.pricing, behaviour: "link" },
  { label: "Resources", href: routes.resources, behaviour: "dropdown" },
  { label: "Contact", href: routes.contact, behaviour: "link" },
];

/**
 * The Resources dropdown — three destinations a merchant opens for an answer
 * rather than for a feature (§4.1, §7).
 *
 * Deliberately not a mega-menu. Resources is a secondary errand: a merchant
 * opens it knowing whether they want to read how something is configured, what
 * everyone else asks, or what shipped last month, and a panel of headed columns
 * makes them read a page to answer a question they already answered.
 *
 * The FAQ is the one entry on our own site, and this is the only place in the
 * app it is declared as a navigation item. The header dropdown, the mobile
 * drawer and the footer's Resources column are all assembled from this list, so
 * adding it here puts it in three surfaces at once and in none of them twice —
 * which is also why it is *not* repeated in the footer's Company column. The URL
 * is `routes.faq` from the route registry rather than a literal.
 *
 * Order is by how deep the question is: the quick answer, the configuration
 * reference, then what changed. Docs and Blog keep reading their URLs from
 * `externalLinks`, so pointing the blog at its real home when it launches stays
 * a one-line change in `constants/external.ts`.
 */
export const resourcesNav: readonly ResourceNavItem[] = [
  {
    label: "FAQ",
    href: routes.faq,
    description: "The questions merchants ask most, answered.",
    icon: "faq",
  },
  {
    label: "Docs",
    href: externalLinks.docs,
    description: "Set up and configure every control.",
    icon: "docs",
    external: true,
  },
  {
    label: "Blog",
    href: externalLinks.blog,
    description: "Product updates, newest first.",
    icon: "blog",
    external: true,
  },
];

/** The mega-menu's closing row, beneath the four stage columns (§4.1). */
export const megaMenuFooterLinks: readonly NavItem[] = [
  { label: "All features", href: routes.features },
  { label: "Open COD Calculator", href: routes.codCalculator },
];

/**
 * Utility area, right side of the header (§4.2).
 *
 * Order is significant: it is also the visual weight order. Install Free is the
 * only primary action and Book a Demo is the quieter one beside it.
 *
 * There is no Log in. It was removed at the reviewer's instruction, and the
 * removal is here rather than in a stylesheet: the header, the mobile drawer
 * and every feature page's call to action are all assembled from this list, so
 * dropping the entry takes the action off all of them at once and leaves no
 * hidden control for a keyboard or a screen reader to find. Existing merchants
 * sign in from the Shopify admin, which is where the app runs.
 */
export const utilityActions: readonly UtilityAction[] = [
  {
    id: "book-demo",
    label: "Book a Demo",
    href: externalLinks.bookDemo,
    variant: "secondary",
  },
  {
    id: "install",
    label: "Install Free",
    href: externalLinks.install,
    variant: "primary",
  },
];

/**
 * The live demo storefront (§4.2).
 *
 * Deliberately outside `utilityActions`. That list is the site's navigation
 * chrome — the header, the mobile drawer and the feature call-to-action bands
 * all render it whole — so a third entry would put this button in half a dozen
 * places it does not belong.
 *
 * It lives here rather than inside either component that renders it, because
 * the homepage hero's secondary action and the storefront button at the foot
 * of the closing band are the same action pointing at the same store, and two
 * copies of it are two labels that eventually differ.
 *
 * It is never the Book a Demo action and must not be wired to one. That action
 * is a request to speak to a person; this is a storefront that asks the
 * visitor for nothing, and collapsing them would strand whichever merchant
 * wanted the other one.
 */
export const demoStoreAction: UtilityAction = {
  id: "demo-store",
  label: "Try Live Demo Store",
  href: externalLinks.demoStore,
  variant: "secondary",
};

/**
 * The persistent mobile bottom bar (§4.4).
 *
 * Mobile is the primary experience in COD-heavy markets, so these two actions
 * are always visible rather than being reachable through the drawer.
 */
export const mobileActions: readonly UtilityAction[] = [
  {
    id: "install",
    label: "Install Free",
    href: externalLinks.install,
    variant: "primary",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: externalLinks.whatsapp,
    variant: "secondary",
  },
];
