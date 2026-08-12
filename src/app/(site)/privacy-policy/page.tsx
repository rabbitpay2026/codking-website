import {
  LegalPageTemplate,
  legalPageMetadata,
} from "@/components/templates/LegalPageTemplate";

/**
 * Privacy Policy (§3).
 *
 * One of four static legal routes. Each is its own segment rather than a
 * `[slug]` at the root of the site: a dynamic segment there would sit in front
 * of every other top-level path, and these four URLs are fixed, published, and
 * linked to from outside the site.
 */
export const metadata = legalPageMetadata("privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate slug="privacy-policy" />;
}
