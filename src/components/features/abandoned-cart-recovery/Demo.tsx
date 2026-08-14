import { FeatureDemoSplit } from "@/components/features/sections";
import {
  getCartDemoPoints,
  getCartPageCopy,
  getDemoVideoId,
} from "@/lib/content";

/**
 * The product demo — YouTube's own player on the left, the case for pressing
 * play on the right, drawn by the shared `FeatureDemoSplit`.
 *
 * The recording comes from the demo registry by surface (§11), so which video
 * this page plays is answered in one file alongside every other page's rather
 * than typed here.
 *
 * The four points beside it are captions rather than benefits. A checklist
 * next to a player is read as a description of the recording, so every line
 * names something the merchant will actually see configured in it.
 */
export function Demo() {
  const copy = getCartPageCopy();

  return (
    <FeatureDemoSplit
      title={copy.demoTitle}
      description={copy.demoDescription}
      points={getCartDemoPoints()}
      videoId={getDemoVideoId("abandoned-cart-recovery")}
    />
  );
}
