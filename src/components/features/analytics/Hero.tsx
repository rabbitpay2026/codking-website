import { FeatureHero } from "@/components/features/sections";
import { AnalyticsScene } from "@/components/product/analytics";
import { getAnalyticsCheckpoints, getAnalyticsPageCopy } from "@/lib/content";

/**
 * The top of the Analytics & Reports page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene. Nothing about the composition is decided here — that is the point of
 * a blueprint — so a merchant arriving from any sibling feature page meets the
 * same frame with a different product inside it.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour, because it is the control in one statement rather than the name
 * above it.
 */
export function Hero() {
  const copy = getAnalyticsPageCopy();

  return (
    <FeatureHero
      current={copy.name}
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getAnalyticsCheckpoints()}
      primaryLabel="Get started free"
      visual={<AnalyticsScene />}
    />
  );
}
