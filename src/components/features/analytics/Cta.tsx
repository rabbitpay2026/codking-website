import { ChartNoAxesCombined } from "lucide-react";

import { FeatureCtaBand } from "@/components/features/sections";
import { getAnalyticsPageCopy } from "@/lib/content";

/**
 * The close.
 *
 * The shared band, unchanged but for its headline and its mark — same panel,
 * same treatment, same two actions the header has carried since the visitor
 * arrived. A page that invents a new button for its last section is telling the
 * merchant this is a different offer.
 *
 * The mark is the one the homepage board and the Features index already use for
 * this control, so a merchant who arrived from either recognises what they
 * clicked.
 */
export function Cta() {
  const copy = getAnalyticsPageCopy();

  return (
    <FeatureCtaBand
      title={copy.ctaTitle}
      description={copy.ctaDescription}
      icon={ChartNoAxesCombined}
    />
  );
}
