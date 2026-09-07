import { ViewTracker } from "@/components/analytics/ViewTracker";
import { PlanFitSection } from "@/components/pricing/PlanFitSection";
import { PricingBenefits } from "@/components/pricing/PricingBenefits";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingCta } from "@/components/pricing/PricingCta";
import { PricingFaqSection } from "@/components/pricing/PricingFaqSection";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingMarket } from "@/components/pricing/PricingMarket";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { routes } from "@/constants/routes";
import { analyticsEnabled } from "@/lib/analytics";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Four plans, priced in rupees and billed on your Shopify invoice. Start free with unlimited orders, and pay only when COD fees, rules and cheaper messaging are worth it.",
  path: routes.pricing,
});

/**
 * Plans and what they include, stated plainly (§3.1).
 *
 * A composition file and nothing more: every section is a component that reads
 * its own content from the repository, so this page states the order of the
 * argument and holds no copy or price of its own.
 *
 * The order answers a merchant's questions in the sequence they ask them —
 * what does it cost, which one is mine, what exactly differs, what am I
 * buying, what am I still unsure about, and then the install. Cost comes
 * before proof here, unlike the homepage, because someone on this URL has
 * already been persuaded and arrived to see the number.
 *
 * `pricing_view` is the one piece of tracking any page on this site declares
 * for itself, and it is here because there is one pricing page rather than a
 * family of them — the eleven feature pages share a segment layout that
 * declares `feature_view` once for all of them. It duplicates nothing: the
 * page view says a URL was opened, and this says the page a merchant reaches
 * when they have decided to check the price was one of them, which is the
 * event a funnel is built on.
 */
export default function PricingPage() {
  return (
    <>
      {analyticsEnabled ? <ViewTracker event="pricing_view" /> : null}

      <PricingHero />
      <PricingMarket />
      <PricingPlans />
      <PlanFitSection />
      <PricingComparison />
      <PricingBenefits />
      <PricingFaqSection />
      <PricingCta />
    </>
  );
}
