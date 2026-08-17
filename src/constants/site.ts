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
   * Absolute origin, required for canonical URLs, Open Graph images, the
   * sitemap, `robots.txt` and the Organization schema.
   *
   * `NEXT_PUBLIC_SITE_URL` still wins, and `.env.example` sets it to localhost
   * so a developer copying it gets local URLs. The *fallback* is production
   * rather than localhost, and that direction is deliberate: the two ways this
   * can be wrong are not symmetric. A dev build that prints
   * `https://codking.tech/...` in a canonical tag nobody reads costs nothing;
   * a production deploy that forgets the variable and publishes a sitemap of
   * `http://localhost:3000` URLs poisons the index. The default belongs on the
   * side where being wrong is survivable.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codking.tech",
  locale: "en_US",
  lang: "en",
} as const;

export type SiteConfig = typeof siteConfig;
