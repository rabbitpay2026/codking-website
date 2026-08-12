import {
  LegalPageTemplate,
  legalPageMetadata,
} from "@/components/templates/LegalPageTemplate";

/** Refund Policy (§3). */
export const metadata = legalPageMetadata("refund-policy");

export default function RefundPolicyPage() {
  return <LegalPageTemplate slug="refund-policy" />;
}
