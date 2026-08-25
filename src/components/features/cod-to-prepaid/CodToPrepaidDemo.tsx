import { FeatureDemoSplit } from "@/components/features/sections";
import { CodToPrepaidNudgePreview } from "@/components/product/cod-to-prepaid";
import {
  getPrepaidDemoPoints,
  getPrepaidPageCopy,
  getRegisteredDemoVideoId,
} from "@/lib/content";

/**
 * The two surfaces a buyer actually meets — drawn on the left, explained on
 * the right, by the shared `FeatureDemoSplit`.
 *
 * This section used to hold a player. The review flagged the recording in it
 * as the wrong one, and it was: the demo registry has no entry for this
 * control, so the player fell back to the site's *general* demo — a real
 * video, correctly embedded, showing a different feature. A section headed
 * "see COD to Prepaid in action" showing something else is worse than one
 * showing no video at all.
 *
 * So the split now carries the control itself: the banner that appears on the
 * Thank You and Order Status pages, and the WhatsApp reminder that follows it
 * with a payment link. Both are drawn in markup, which is how every other
 * demonstration on this site is built.
 *
 * The player slot is dormant rather than deleted. This passes both a
 * `videoId` and a `media`, and `FeatureDemoSplit` prefers the id whenever
 * there is one — so adding a COD-to-Prepaid recording to `demoVideos` swaps
 * the drawn preview for the player and nothing here changes.
 *
 * The id is read with `getRegisteredDemoVideoId()` rather than
 * `getDemoVideoId()`, and that is the fix for exactly what the review caught.
 * The lenient reader substitutes the site's general demo for a surface with no
 * recording of its own, which is how this section came to show a real video of
 * a different feature under a heading promising this one. The strict reader
 * returns nothing, and nothing is what keeps the preview on screen.
 *
 * The four points beside it are captions rather than benefits: every line
 * names something visible in the two surfaces on the left.
 */
export function CodToPrepaidDemo() {
  const copy = getPrepaidPageCopy();
  const videoId = getRegisteredDemoVideoId("cod-to-prepaid");

  return (
    <FeatureDemoSplit
      /*
        The eyebrow follows what is actually on the left. Drawn surfaces are
        what the buyer sees; a recording is the product demo every other
        feature page labels it as — so the section stays honest about its own
        contents in either state, without anyone remembering to change a word
        along with the registry.
      */
      eyebrow={videoId ? "Product demo" : "What your buyer sees"}
      title={copy.demoTitle}
      description={copy.demoDescription}
      points={getPrepaidDemoPoints()}
      videoId={videoId}
      media={<CodToPrepaidNudgePreview />}
    />
  );
}
