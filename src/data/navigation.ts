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
 * The Resources dropdown — two destinations, both off-site (§4.1, §7).
 *
 * Deliberately not a mega-menu. Resources is a secondary errand: a merchant
 * opens it knowing whether they want to read how something is configured or
 * what shipped last month, and a panel of headed columns makes them read a
 * page to answer a question they already answered.
 *
 * Both URLs come from `externalLinks`, so this list, the mobile drawer and the
 * footer's Resources column cannot drift — and pointing the blog at its real
 * home when it launches is a one-line change in `constants/external.ts`.
 */
export const resourcesNav: readonly ResourceNavItem[] = [
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
 * only primary action, and Log in stays a text link so existing merchants do
 * not compete with it for attention.
 */
export const utilityActions: readonly UtilityAction[] = [
  { label: "Log in", href: externalLinks.login, variant: "link" },
  { label: "Book a Demo", href: externalLinks.bookDemo, variant: "secondary" },
  { label: "Install Free", href: externalLinks.install, variant: "primary" },
];

/**
 * The persistent mobile bottom bar (§4.4).
 *
 * Mobile is the primary experience in COD-heavy markets, so these two actions
 * are always visible rather than being reachable through the drawer.
 */
export const mobileActions: readonly UtilityAction[] = [
  { label: "Install Free", href: externalLinks.install, variant: "primary" },
  { label: "WhatsApp", href: externalLinks.whatsapp, variant: "secondary" },
];
