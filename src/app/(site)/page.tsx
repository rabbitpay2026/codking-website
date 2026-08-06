import { Faq } from "@/components/sections/Faq";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Integrations } from "@/components/sections/Integrations";
import { Metrics } from "@/components/sections/Metrics";
import { PainPoints } from "@/components/sections/PainPoints";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { Solution } from "@/components/sections/Solution";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { routes } from "@/constants/routes";
import { getProductPreviewPanels } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  description:
    "Verify every cash-on-delivery order, price cash properly, and move buyers to prepaid — inside the Shopify checkout you already have.",
  path: routes.home,
});

/**
 * The homepage.
 *
 * A composition file and nothing more: every section is a component that
 * reads its own content from the repository, so this page states the order of
 * the argument and holds no copy of its own.
 *
 * The order is the one §5.1 fixes, and §5.2 explains why it cannot be
 * shuffled — show the problem, show the system, prove it, price it, remove
 * doubt, close. Each section asks for slightly more commitment than the one
 * before it, which is why the install is not requested until the merchant has
 * seen what it is worth.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Metrics />
      <PainPoints />
      <Solution />
      <FeatureShowcase />
      <ProductPreview panels={getProductPreviewPanels()} />
      <HowItWorks />
      <Integrations />
      <Testimonials />
      <PricingPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
