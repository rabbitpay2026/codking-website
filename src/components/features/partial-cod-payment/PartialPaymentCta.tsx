import { PackageCheck } from "lucide-react";

import { FeatureCtaBand } from "@/components/features/sections";

/**
 * The close.
 *
 * The shared band, unchanged but for its headline and its mark — same panel,
 * same treatment, same two actions the header has carried since the visitor
 * arrived. A page that invents a new button for its last section is telling
 * the merchant this is a different offer.
 */
export function PartialPaymentCta() {
  return (
    <FeatureCtaBand title="Ready to secure more orders?" icon={PackageCheck} />
  );
}
