import { FeatureHero } from "@/components/features/sections";
import { CodFeesScene } from "@/components/product/cod-fees";
import { getCodFeesCheckpoints, getCodFeesPageCopy } from "@/lib/content";

/**
 * The top of the COD Fees page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene. Nothing about the composition is decided here — that is the point of
 * a blueprint — so a merchant arriving from any sibling feature page meets the
 * same frame with a different product inside it.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour. "Make COD Pay Its Way." is the control in five words, which is why it
 * is the statement drawn in brand rather than the name above it.
 */
export function Hero() {
  const copy = getCodFeesPageCopy();

  return (
    <FeatureHero
      current={copy.name}
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getCodFeesCheckpoints()}
      primaryLabel="Get started free"
      visual={<CodFeesScene />}
    />
  );
}
