import { FeatureHero } from "@/components/features/sections";
import { PartialPaymentScene } from "@/components/product/partial-payment";
import { getPartialCheckpoints, getPartialPageCopy } from "@/lib/content";

/**
 * The top of the Partial COD Payment page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene — deliberately the same composition, type scale and button treatment
 * as every other feature page, because two pages that open differently read as
 * two websites.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour: "Collect Payment Upfront." has to hold one line, since broken across
 * two it stops being one statement.
 */
export function PartialPaymentHero() {
  const copy = getPartialPageCopy();

  return (
    <FeatureHero
      current="Partial COD Payment"
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getPartialCheckpoints()}
      primaryLabel="Get started free"
      visual={<PartialPaymentScene />}
    />
  );
}
