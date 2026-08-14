import { FeatureDemoSplit } from "@/components/features/sections";
import {
  getDemoVideoId,
  getPrepaidDemoPoints,
  getPrepaidPageCopy,
} from "@/lib/content";

/**
 * The product demo — YouTube's own player on the left, the case for pressing
 * play on the right, drawn by the shared `FeatureDemoSplit`.
 *
 * The recording comes from the demo registry by surface (§11). This control
 * has no entry there yet, so the player shows the site's general demo — the
 * embed is real and works, it simply is not this control's own recording. The
 * registry carries the TODO; nothing about that substitution is decided here.
 *
 * The four points beside it are captions rather than benefits. A checklist
 * next to a player is read as a description of the recording, so every line
 * names something the merchant will actually see configured in it.
 */
export function CodToPrepaidDemo() {
  const copy = getPrepaidPageCopy();

  return (
    <FeatureDemoSplit
      title={copy.demoTitle}
      description={copy.demoDescription}
      points={getPrepaidDemoPoints()}
      videoId={getDemoVideoId("cod-to-prepaid")}
    />
  );
}
