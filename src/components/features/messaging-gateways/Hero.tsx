import { FeatureHero } from "@/components/features/sections";
import { OperatorRelay } from "@/components/product/messaging-gateways";
import { getGatewayCheckpoints, getGatewayPageCopy } from "@/lib/content";

/**
 * The top of the Local SMS Operator Integration page.
 *
 * The shared feature hero, carrying this control's words and this control's
 * scene. Nothing about the composition is decided here — that is the point of
 * a blueprint — so a merchant arriving from any sibling feature page meets the
 * same frame with a different product inside it.
 *
 * The eyebrow is the product's own name for the arrangement,
 * "Direct-to-Operator Payment Model", rather than a category label. It is the
 * one phrase a merchant will have seen on the screen this page is about, and
 * it is a claim about who bills whom rather than a restatement of the headline
 * beneath it.
 *
 * The headline is the blueprint's three lines and the middle one carries the
 * colour, because it is the control in one statement rather than the name
 * above it.
 */
export function Hero() {
  const copy = getGatewayPageCopy();

  return (
    <FeatureHero
      current={copy.name}
      eyebrow={copy.eyebrow}
      headlineLead={copy.headlineLead}
      headlineAccent={copy.headlineAccent}
      headlineTail={copy.headlineTail}
      description={copy.description}
      checkpoints={getGatewayCheckpoints()}
      primaryLabel="Get started free"
      visual={<OperatorRelay />}
    />
  );
}
