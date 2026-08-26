import { Faq } from "@/components/sections/Faq";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { Metrics } from "@/components/sections/Metrics";
import { PainPoints } from "@/components/sections/PainPoints";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { Worldwide } from "@/components/sections/Worldwide";
import { routes } from "@/constants/routes";
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
 * The order follows the approved homepage blueprint — establish credibility,
 * show the system, name what it costs not to have it, prove it, remove doubt,
 * close. Each section asks for slightly more commitment than the one before
 * it, which is why the install is not requested until the merchant has seen
 * what it is worth.
 *
 * The problem section moved at the reviewer's instruction: it used to sit
 * directly above the capability board and now sits directly below it. The
 * argument still runs in two halves and they are still adjacent — the board
 * answers, then the costs say what the answer is worth — which is why the two
 * are next to each other in either arrangement and why nothing else on the
 * page had to move to accommodate the swap.
 *
 * The setup flow that used to sit between the capability board and the
 * integrations board is gone at the reviewer's instruction. `HowItWorks` is
 * still built and still holds its steps, because `llms.txt` describes the
 * setup sequence from the same repository — the section is off the page, not
 * out of the product.
 *
 * Coverage sits before results on purpose: a merchant outside India decides
 * whether the page is about them before they can be persuaded by what it did
 * for someone else. Results then hands straight to the merchants who report
 * them, so a figure never appears more than one section away from a name.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Metrics />
      <FeatureShowcase />
      <PainPoints />
      <Integrations />
      <Worldwide />
      <Results />
      {/*
        From here the blueprint composes rather than stacks, and these two
        sections follow it one to one. `Testimonials` is the three-column proof
        band — merchant quotes, the marketplace verdict, the price — and `Faq`
        carries the questions beside the close, so the install is in view at
        the moment the last objection resolves.
      */}
      <Testimonials />
      <Faq />
    </>
  );
}
