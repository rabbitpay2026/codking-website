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
 * Two sections have been reordered at the reviewer's instruction, and both
 * moves were one line each: the results strip, which used to sit between
 * coverage and the proof band and now opens the argument above the capability
 * board, and the proof band itself, which now runs before coverage rather than
 * after it. See the comments beside each for what the moves buy and cost.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Metrics />
      {/*
        Results now opens the argument rather than closing it, at the
        reviewer's instruction, and the move is one line here because every
        section owns its own content.

        It reads well in the new position for the reason the old one was
        chosen: this is a strip of four outcome figures, and the three bands
        above it — the merchant wall, the platform scale, and now these — are
        all answers to "is this real", asked before a merchant has any reason
        to care how the product works. The capability board then arrives as the
        explanation of a number they have already been given, which is the
        stronger order of the two.

        What it costs is the adjacency it used to have with `Testimonials`,
        where a figure sat one section away from a merchant willing to put
        their name to it. That pairing is gone and the proof band now has to
        stand on its own quotes — which it does, because it carries the rating
        and the review count itself.
      */}
      <Results />
      <FeatureShowcase />
      <PainPoints />
      <Integrations />
      {/*
        The proof band now precedes coverage rather than following it, at the
        reviewer's instruction. `Testimonials` is the three-column band —
        merchant quotes, the marketplace verdict, the price — and it is the
        component itself that moved: nothing inside it changed, because a
        section that owns its own content can be reordered by moving one line.

        The pairing it gains is a good one. It closes on the price, and the
        section under it is the map of where that price applies, so "here is
        what it costs" hands straight to "and here is where it works". What it
        gives up is being the last thing read before the questions, which
        `Worldwide` now is — a quieter note to end the argument on, but a
        factual one.
      */}
      <Testimonials />
      <Worldwide />
      {/*
        `Faq` carries the questions beside the close, so the install is in view
        at the moment the last objection resolves.
      */}
      <Faq />
    </>
  );
}
