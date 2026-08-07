/**
 * Site-wide configuration consumed by metadata, sitemap and robots.
 *
 * Changing a value here updates every `<title>`, Open Graph tag and canonical
 * URL in the app. The description is the product's own one-line definition
 * from Website Architecture §1.
 */
export const siteConfig = {
  name: "COD King",
  description:
    "COD King helps Shopify merchants reduce fake orders, lower RTO, and make Cash on Delivery profitable.",
  /**
   * Absolute origin, required for canonical URLs and Open Graph images.
   * Set NEXT_PUBLIC_SITE_URL per environment; localhost is the dev fallback.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  lang: "en",
} as const;

export type SiteConfig = typeof siteConfig;
