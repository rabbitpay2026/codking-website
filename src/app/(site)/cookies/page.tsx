import {
  LegalPageTemplate,
  legalPageMetadata,
} from "@/components/templates/LegalPageTemplate";

/** Cookie Policy (§3). */
export const metadata = legalPageMetadata("cookies");

export default function CookiesPage() {
  return <LegalPageTemplate slug="cookies" />;
}
