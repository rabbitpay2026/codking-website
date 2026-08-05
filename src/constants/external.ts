/**
 * Destinations that live outside this site.
 *
 * The architecture makes Install Free the primary action on every page (§4.2),
 * pointing at the Shopify App Store listing. These URLs differ between staging
 * and production and are owned by the business, not by the codebase, so they
 * are read from the environment with an inert fallback.
 *
 * A missing value resolves to `null` rather than `"#"`, so a component can
 * render a disabled state instead of a link that silently goes nowhere.
 */
function externalUrl(
  value: string | undefined,
  fallback: string | null = null,
): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/**
 * Where a published destination is already known, it is the fallback rather
 * than a blank. The App Store listing and the WhatsApp number are public and
 * live on codking.tech today, so the primary action works out of the box; the
 * environment variable still wins, which is what staging needs.
 */
const SHOPIFY_APP_LISTING =
  "https://apps.shopify.com/cash-on-delivery-cod-order-confirmation";
const WHATSAPP_CONTACT =
  "https://wa.me/919130751989?text=Hi%2C%20I%20just%20visited%20your%20website%20and%20would%20like%20more%20details.";

export const externalLinks = {
  /** Primary conversion target — the Shopify App Store listing (§1, §4.2). */
  install: externalUrl(
    process.env.NEXT_PUBLIC_SHOPIFY_APP_URL,
    SHOPIFY_APP_LISTING,
  ),
  /**
   * Secondary action, offered mainly to larger merchants (§1, §9.4).
   * There is no external booking tool, so this resolves to the contact page.
   */
  bookDemo: externalUrl(process.env.NEXT_PUBLIC_BOOK_DEMO_URL, "/contact"),
  /** Existing merchants signing in to the app (§4.2). */
  login: externalUrl(process.env.NEXT_PUBLIC_APP_LOGIN_URL),
  /** Secondary action on the persistent mobile bar (§4.4). */
  whatsapp: externalUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL, WHATSAPP_CONTACT),
} as const;

export type ExternalLinkKey = keyof typeof externalLinks;
