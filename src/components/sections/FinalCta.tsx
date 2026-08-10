import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { CtaVideo } from "@/components/sections/cta/CtaVideo";
import {
  getDemoVideoId,
  getProofMetrics,
  getUtilityActions,
} from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The close — words on the left, player on the right, both starting at the top.
 *
 * It renders no surface of its own. The blueprint draws one bordered panel
 * across the whole band with a rule down the middle, so `Faq` owns that panel
 * and this is the right-hand half of its contents. A card in here would be a
 * second border inside the first, which is what made the previous version read
 * as a large box floating in a larger one.
 *
 * Nothing is vertically centred. The heading, the line under it, the buttons
 * and the player all hang from the same top edge, which is the only reason the
 * three columns of the band line up on one baseline.
 *
 * The merchant count comes from the proof repository (§11.1), never a literal,
 * so the number closing the page is the number that opened it.
 */
export async function FinalCta() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    /*
      One column, one rhythm. `gap-5` sets the distance between every pair in
      the stack — heading to line, line to buttons, buttons to player — so the
      four elements read as one descending block rather than as a paragraph
      with things appended to it. Nothing carries its own top margin, which is
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
        finally large enough to be worth pressing play on.

        The recording is read from the demo registry by surface (§11) rather
        than left to the player's fallback, so the homepage's video is changed
        in the same file every other page's is.
      */}
      <CtaVideo
        videoId={getDemoVideoId("home")}
        title="How COD King works"
        className="w-full"
      />
    </div>
  );
}
