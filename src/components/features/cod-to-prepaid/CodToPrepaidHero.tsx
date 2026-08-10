import { FeatureHero } from "@/components/features/sections";
import { CodToPrepaidScene } from "@/components/product/cod-to-prepaid";
import { getPrepaidCheckpoints, getPrepaidPageCopy } from "@/lib/content";

/**
 * The top of the COD to Prepaid page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene. Nothing about the composition is decided here — that is the point of
 * a blueprint — so a merchant arriving from the OTP or Partial COD Payment
 * page meets the same frame with a different product inside it.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour. "Get Paid Online." is the whole control in three words, which is why
 * it is the statement drawn in brand rather than the name above it.
 */
export function CodToPrepaidHero() {
  const copy = getPrepaidPageCopy();

  return (
    <FeatureHero
      current="COD to Prepaid"
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getPrepaidCheckpoints()}
      primaryLabel="Get started free"
      visual={<CodToPrepaidScene />}
    />
  );
}
