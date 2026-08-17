import { externalLinks } from "@/constants/external";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { absoluteUrl } from "@/utils/url";

/**
 * The organisation's stable identifier in the graph.
 *
 * A fragment on the site's own origin rather than a bare URL, so that the
 * schema types added in later phases — SoftwareApplication, Article, FAQPage —
 * can point a `publisher` or `provider` at `{ "@id": organizationId }` and be
 * understood as referring to *this* node rather than declaring a second one.
 * That is the whole reason it is exported.
 */
export const organizationId = `${absoluteUrl("/")}#organization`;

/**
 * The logo, at its real dimensions.
 *
 * This is the tile lockup the header, footer and mobile drawer all render, so
 * the mark in the graph is the mark on the page. The numbers are the file's
 * intrinsic size, not its rendered box — an `ImageObject` that misstates them
 * is worse than a bare URL, and a bare URL is all the property requires.
 */
const LOGO = {
  path: "/logos/cod-king-logo-tile.png",
  width: 1072,
  height: 320,
} as const;

/**
 * Sitewide Organization structured data.
 *
 * Every value is read from a registry this site already treats as
 * authoritative — the name and description from `siteConfig`, the profiles and
 * the support mailbox from `constants/external.ts`, the logo from the file the
 * `Logo` component renders. Nothing is asserted here that the site does not
 * already state somewhere a merchant can read it, which is the only defensible
 * standard for a file whose entire purpose is being believed.
 *
 * `sameAs` therefore holds the three profiles the business publishes and
 * nothing else. It is the property most often padded with a plausible
 * LinkedIn or Crunchbase page, and a `sameAs` pointing at an account the
 * business does not control is an entity-resolution error that is far harder
 * to withdraw than it was to add.
 *
 * Built by a function rather than declared as a constant because the profile
 * URLs are environment-overridable and can resolve to `null`; a module-level
 * object would freeze whatever they were at import time.
 */
export function buildOrganizationSchema() {
  /*
    Filtered rather than assumed. Each of these has a published fallback today
    so all three are present, but they are `string | null` by contract, and a
    `sameAs` array containing a null is invalid JSON-LD rather than a partial
    one.
  */
  const sameAs = [
    externalLinks.youtube,
    externalLinks.facebook,
    externalLinks.instagram,
  ].filter((profile): profile is string => Boolean(profile));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: absoluteUrl(routes.home),
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO.path),
      width: LOGO.width,
      height: LOGO.height,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    /*
      The mailbox the published Privacy Policy and Terms answer on, and the
      page that lists every way to reach the team. No `telephone`: the contact
      page deliberately publishes none, and the WhatsApp number it does publish
      is a chat thread rather than a line someone answers.
    */
    ...(externalLinks.supportEmail
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: externalLinks.supportEmail,
            url: absoluteUrl(routes.contact),
          },
        }
      : {}),
  };
}
