import { siteConfig } from "@/constants/site";
import { absoluteUrl } from "@/utils/url";

import type { Metadata } from "next";

interface CreateMetadataOptions {
  /** Page title. Slotted into the root layout's title template. */
  readonly title?: string;
  readonly description?: string;
  /** App-relative path, used to derive the canonical and Open Graph URL. */
  readonly path?: string;
  /**
   * Keep the page out of the index.
   *
   * Every placeholder route sets this. Removing it is part of the definition
   * of done for the phase that gives the page real content — an empty page
   * that ranks is worse than one that does not exist.
   */
  readonly noIndex?: boolean;
}

/**
 * Build a page's metadata from a few inputs, filling in canonical URL, Open
 * Graph and Twitter tags consistently.
 *
 * Pages should call this rather than hand-writing a `Metadata` object, so SEO
 * defaults stay in one place.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = title ?? siteConfig.name;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: resolvedTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
  };
}
