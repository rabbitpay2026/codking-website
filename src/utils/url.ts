import { siteConfig } from "@/constants/site";

/**
 * Resolve an app-relative path against the configured site origin.
 *
 * Canonical URLs, Open Graph images and sitemap entries must be absolute, and
 * the origin differs per environment — so it is never hardcoded.
 */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
