import { Undo2 } from "lucide-react";

import { FeatureCtaBand } from "@/components/features/sections";
import { getCartPageCopy } from "@/lib/content";

/**
 * The close.
 *
 * The shared band, unchanged but for its headline and its mark — same panel,
 * same treatment, same two actions the header has carried since the visitor
 * arrived. A page that invents a new button for its last section is telling
 * the merchant this is a different offer.
 */
export function Cta() {
  return <FeatureCtaBand title={getCartPageCopy().ctaTitle} icon={Undo2} />;
}
