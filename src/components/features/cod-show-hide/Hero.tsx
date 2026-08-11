import { FeatureHero } from "@/components/features/sections";
import { CodShowHideScene } from "@/components/product/cod-show-hide";
import {
  getCodShowHideCheckpoints,
  getCodShowHidePageCopy,
} from "@/lib/content";

/**
 * The top of the COD Show/Hide page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene. Nothing about the composition is decided here — that is the point of
 * a blueprint — so a merchant arriving from any sibling feature page meets the
 * same frame with a different product inside it.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour. "Decide Who Gets COD." is the control in four words, which is why it
 * is the statement drawn in brand rather than the name above it.
 */
export function Hero() {
  const copy = getCodShowHidePageCopy();

  return (
    <FeatureHero
      current={copy.name}
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getCodShowHideCheckpoints()}
      primaryLabel="Get started free"
      visual={<CodShowHideScene />}
    />
  );
}
