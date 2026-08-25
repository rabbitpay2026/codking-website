import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { CtaOrderProtection } from "@/components/sections/cta/CtaOrderProtection";
import { CtaVideo } from "@/components/sections/cta/CtaVideo";
import {
  getProofMetrics,
  getRegisteredDemoVideoId,
  getUtilityActions,
} from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The close — the last thing the page says before it asks for the install.
 *
 * It renders no surface of its own. The blueprint draws one bordered panel
 * across the whole band with a rule down the middle, so `Faq` owns that panel
 * and this is the right-hand half of its contents. A card in here would be a
 * second border inside the first, which is what made the previous version read
 * as a large box floating in a larger one.
 *
 * Nothing is vertically centred. The heading, the line under it and the
 * buttons all hang from the same top edge, which is the only reason the
 * columns of the band line up on one baseline.
 *
 * The demo player that used to close this block is dormant rather than gone.
 * The reviewer asked for that specific recording to be removed, so the `home`
 * entry is commented out of the demo registry — but the slot, its width and
 * its framing are all still here. Restoring a video is one line in
 * `src/data/demoVideos.ts`; nothing in this file has to change.
 *
 * What stands in the slot meanwhile is `CtaOrderProtection`, and it is a
 * product visual rather than a stand-in for the missing video: no poster
 * frame, no play button, nothing that suggests there is something to watch.
 * Without it the column ended at the buttons while the questions beside it ran
 * on for another six rows, which left the half of the panel doing the asking
 * looking like the half that had run out of things to say.
 *
 * It reads the registry through `getRegisteredDemoVideoId()`, never
 * `getDemoVideoId()`. The difference matters: the latter substitutes the
 * site's general demo for a surface with no recording of its own, which would
 * put a video of a different subject at the bottom of the homepage the moment
 * this section trusted it.
 *
 * The merchant count comes from the proof repository (§11.1), never a literal,
 * so the number closing the page is the number that opened it.
 */
export async function FinalCta() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();
  const videoId = getRegisteredDemoVideoId("home");
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    /*
      One column, one rhythm. `gap-5` sets the distance between every pair in
      the stack — heading to line, line to buttons — so the three elements read
      as one descending block rather than as a paragraph with things appended
      to it. Nothing carries its own top margin, which is
      what keeps that spacing from drifting when any one of them changes.
    */
    <div className="flex flex-col items-start gap-5">
      <h2 className="text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.55rem]">
        Ready to stop losing money on fake COD orders?
      </h2>

      <p className="text-[13.5px] leading-relaxed text-muted-foreground">
        Join {numberFormat.format(proof.merchantCount)}+ Shopify merchants who
        trust COD King.
      </p>

      {/*
        Wraps rather than overflows. Both labels are `whitespace-nowrap` by
        contract, so a row that cannot fit them does not shrink them — it
        pushes the second one outside the column.
      */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {installAction ? (
          /*
              The hero's install button, to the pixel. Ink rather than brand,
              with Shopify's mark as the only colour on it — the most useful
              thing this button can say is which platform it runs on, and the
              mark says it faster than the label does.
            */
          <ActionLink
            action={{ ...installAction, label: "Install Free on Shopify" }}
            size="md"
            icon={<ShopifyMark className="size-[19px]" />}
            className="gap-2.5 bg-ink px-4 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.24),0_10px_28px_-12px_rgba(11,27,54,0.7)] hover:bg-ink/90"
          />
        ) : null}

        {demoAction ? (
          <ActionLink
            action={demoAction}
            size="md"
            className="border-ink/10 px-4 text-[14px] font-semibold text-ink/80 hover:border-ink/16 hover:bg-accent hover:text-ink"
          />
        ) : null}
      </div>

      {/*
        Full width, at the foot of the stack. Beside the words it was a small
        rectangle competing with them for the same line; underneath it is the
        last thing the block says, and at the column's full measure it is
        finally large enough to carry an object.

        The slot is never empty now, and it never shows the wrong thing either.
        With a recording registered for the homepage it plays that recording;
        with none — which is where the registry stands — it holds the product
        visual instead. What it will not do is fake the first with the second:
        `CtaOrderProtection` is an order card, not a poster frame, and there is
        no play button anywhere on it.

        This is what closed the empty column. The block above it is three short
        elements, the questions beside it are six, and the difference was a
        third of the panel's height of nothing on the side that is asking for
        the install.
      */}
      {videoId ? (
        <CtaVideo
          videoId={videoId}
          title="How COD King works"
          className="w-full"
        />
      ) : (
        <CtaOrderProtection className="w-full" />
      )}
    </div>
  );
}
