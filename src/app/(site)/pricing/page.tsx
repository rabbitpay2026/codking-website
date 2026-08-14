import { PlanFitSection } from "@/components/pricing/PlanFitSection";
import { PricingBenefits } from "@/components/pricing/PricingBenefits";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingCta } from "@/components/pricing/PricingCta";
import { PricingFaqSection } from "@/components/pricing/PricingFaqSection";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Three plans, billed on your Shopify invoice. Start free with unlimited orders, and pay only when COD fees, rules and message discounts are worth it.",
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
 */
export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PlanFitSection />
      <PricingComparison />
      <PricingBenefits />
      <PricingFaqSection />
      <PricingCta />
    </>
  );
}
