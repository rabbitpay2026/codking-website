import {
  LegalPageTemplate,
  legalPageMetadata,
} from "@/components/templates/LegalPageTemplate";

/** Terms & Conditions (§3). */
export const metadata = legalPageMetadata("terms-and-conditions");

export default function TermsAndConditionsPage() {
  return <LegalPageTemplate slug="terms-and-conditions" />;
}
