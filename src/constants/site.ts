/**
 * Site-wide configuration consumed by metadata, sitemap and robots.
 *
 * The string values are deliberate placeholders for this phase. Replacing them
 * here updates every `<title>`, Open Graph tag and canonical URL in the app.
 */
export const siteConfig = {
  name: "COD King",
  description: "Site description pending.",
  /**
   * Absolute origin, required for canonical URLs and Open Graph images.
   * Set NEXT_PUBLIC_SITE_URL per environment; localhost is the dev fallback.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  lang: "en",
} as const;

export type SiteConfig = typeof siteConfig;
