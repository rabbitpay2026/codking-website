import { externalLinks } from "@/constants/external";
import { routes } from "@/constants/routes";

import type { NavItem, PrimaryNavItem, UtilityAction } from "@/types";

/**
 * Primary navigation — exactly four items (§4.1).
 *
 * Each item answers a real merchant question rather than naming a department.
 * COD Calculator is a direct link and never a menu child: it is the highest
 * intent surface on the site and the architecture forbids burying it.
 */
export const primaryNav: readonly PrimaryNavItem[] = [
  { label: "Features", href: routes.features, behaviour: "mega-menu" },
  { label: "COD Calculator", href: routes.codCalculator, behaviour: "link" },
  { label: "Pricing", href: routes.pricing, behaviour: "link" },
  { label: "Resources", href: routes.resources, behaviour: "dropdown" },
];

/** The Resources dropdown, and the footer's Resources column (§4.1, §4.5). */
export const resourcesNav: readonly NavItem[] = [
  { label: "Guides", href: routes.guides },
  { label: "Blog", href: routes.blog },
  { label: "Documentation", href: routes.docs },
  { label: "Help Center", href: routes.help },
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
