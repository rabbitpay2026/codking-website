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
function externalUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const externalLinks = {
  /** Primary conversion target — the Shopify App Store listing (§1, §4.2). */
  install: externalUrl(process.env.NEXT_PUBLIC_SHOPIFY_APP_URL),
  /** Secondary action, offered mainly to larger merchants (§1, §9.4). */
  bookDemo: externalUrl(process.env.NEXT_PUBLIC_BOOK_DEMO_URL),
  /** Existing merchants signing in to the app (§4.2). */
  login: externalUrl(process.env.NEXT_PUBLIC_APP_LOGIN_URL),
  /** Secondary action on the persistent mobile bar (§4.4). */
  whatsapp: externalUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL),
} as const;

export type ExternalLinkKey = keyof typeof externalLinks;
