import { FeatureHero } from "@/components/features/sections";
import { AbandonedCartScene } from "@/components/product/abandoned-cart";
import { getCartCheckpoints, getCartPageCopy } from "@/lib/content";

/**
 * The top of the Abandoned Cart Recovery page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene. Nothing about the composition is decided here — that is the point of
 * a blueprint — so a merchant arriving from any sibling feature page meets the
 * same frame with a different product inside it.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour. "Win Back Lost Sales." is the control in four words, which is why it
 * is the statement drawn in brand rather than the name above it.
 */
export function Hero() {
  const copy = getCartPageCopy();

  return (
    <FeatureHero
      current="Abandoned Cart Recovery"
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getCartCheckpoints()}
      primaryLabel="Get started free"
      visual={<AbandonedCartScene />}
    />
  );
}
