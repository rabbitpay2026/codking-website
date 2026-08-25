import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { CoinStack } from "@/components/sections/proof/CoinStack";
import { ReviewList } from "@/components/sections/proof/ReviewList";
import { Stars } from "@/components/sections/proof/Stars";
import { TestimonialCarousel } from "@/components/sections/proof/TestimonialCarousel";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { formatRating } from "@/utils/format";
import {
  getMerchantTestimonials,
  getProofMetrics,
  getReviewSnippets,
} from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The three panes are one object, so the surface is declared once here rather
 * than three times below.
 *
 * White paper, a 16px corner, one hairline, and a shadow you have to look for.
 * No tint on any of them — colour is what an advertisement uses to tell you
 * where to look, and a band arguing that the product can be trusted should not
 * be pointing. The eye goes to the rating because it is a large number, not
 * because the card under it is blue.
 *
 * `h-full` on every pane against `items-stretch` on the grid is what makes the
 * three end at the same line, whatever they contain.
 */
const CARD = [
  "flex h-full flex-col rounded-2xl border border-border bg-card p-5",
  "shadow-[0_1px_2px_rgba(11,27,54,0.04)]",
  "transition-[transform,box-shadow] duration-300 ease-[var(--ease-emphasized)]",
  "hover:-translate-y-px hover:shadow-[0_2px_6px_rgba(11,27,54,0.06)]",
].join(" ");

/** One heading weight for all three panes — they are peers, not a hierarchy. */
const HEADING = "text-[0.9375rem] leading-tight font-semibold text-foreground";

/**
 * Social proof, in three compact panes on one row.
 *
 * The blueprint puts the merchant reviews, the marketplace verdict and the
 * price beside each other rather than in three stacked sections, and the
 * reason holds up: these are the three questions a merchant asks at exactly
 * this point — do stores like mine use it, does the marketplace agree, what
 * does it cost — and answering all three in one glance is worth more than
 * answering them across three scrolls.
 *
 * Which is also why the band is short. A row a reader takes in at a glance is
 * the entire mechanism; the same three answers spread over a screen and a half
 * of card is just three sections again with a grid drawn round them. So the
 * padding is tight, the type is small, every pane ends on the same line, and
 * nothing inside one is spaced to fill a height it did not need.
 *
 * The design language is the hero's, deliberately and completely: white paper,
 * hairline borders, near-black type, and amber stars because that is the
 * colour a store rating is everywhere else on the internet. Nothing here is a
 * colour field. The hero is the one place on the page allowed to be the
 * loudest thing, and a proof band that competes with it wins the glance and
 * loses the argument.
 *
 * Every figure comes from the repository (§11.1), so this band cannot disagree
 * with the hero, the pricing page or the footer — the rating a visitor reads
 * here is the same object the hero read. The two reviews that open the
 * carousel are the published customer stories; the entries after them, and
 * every row in the list beside them, are real five-star reviews transcribed
 * from the Shopify App Store listing — `src/data/socialProof.ts` names the
 * source and carries the TODO for the sync that replaces the transcription
 * (§11).
 */
export async function Testimonials() {
  const [proof, testimonials, snippets] = await Promise.all([
    getProofMetrics(),
    getMerchantTestimonials(),
    getReviewSnippets(),
  ]);

  const rating = formatRating(proof.rating);

  return (
    <SectionShell
      tone="muted"
      size="compact"
      /* Trimmed at the top specifically: this band arrives directly under the
         results strip, and the two together read as one piece of evidence. */
      containerClassName="pt-4 md:pt-5"
      ariaLabel="What merchants say about COD King"
    >
      {/*
        One row of three on desktop. The verdict pane is given slightly the
        most width because it is the only one holding two columns of its own,
        and pricing slightly the least because it is a heading, a line and a
        button. On tablet the two trust panes stay on a line together and
        pricing takes the full width beneath them — the right way round, since
        those two answer the same question as each other and the third does
        not.
      */}
      {/*
        Every track is `minmax(0, …)` rather than a bare `1fr`. A plain `fr`
        carries an automatic minimum of min-content, and the carousel's track
        holds four slides side by side — so the first column would refuse to
        size below four reviews laid end to end and push the row straight
        through the page gutter. The same reason `min-w-0` is on each pane.
      */}
      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.95fr)]">
        {/* ── Loved by N merchants ─────────────────────────────────────── */}
        <BlurFade inView className="h-full min-w-0">
          <div className={CARD}>
            <h2 className={HEADING}>
              Loved by {numberFormat.format(proof.merchantCount)}+ merchants
            </h2>

            <div className="mt-3.5 min-w-0 flex-1">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </BlurFade>

        {/* ── The marketplace verdict ──────────────────────────────────── */}
        <BlurFade delay={0.07} inView className="h-full min-w-0">
          <div className={CARD}>
            {/*
              `items-start`, because the heading is two lines at most of the
              widths this pane is given. Centred against a two-line heading the
              mark floats in the gutter between them; aligned to the top with a
              pixel of optical nudge it sits on the first line's cap height,
              which is the relationship the marks and labels have everywhere
              else on the site. `shrink-0` keeps the mark square when the
              heading takes the rest of the row.
            */}
            <div className="flex items-start gap-2">
              <ShopifyMark className="mt-px size-[18px] shrink-0" />
              {/*
                Named for whose reviews these are, not for whose score the
                number is. "Shopify App Store reviews" sitting directly above a
                rating reads as a quotation of the marketplace's own figure,
                and the listing reports 4.9 rather than the 5.0 the site is
                asked to display. The rows below are genuinely App Store
                customers' reviews, so the heading says exactly that and claims
                nothing about the rating beside it.
              */}
              <h2 className={HEADING}>
                Reviews from Shopify App Store customers
              </h2>
            </div>

            {/*
              The blueprint's split: the score and the way in on the left, the
              reviews themselves on the right. Stacked below `sm`, where two
              columns of this width would leave the rows too narrow to read.
            */}
            <div className="mt-3.5 flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">
              {/* Held narrow. Everything on the left is a number or a short
                  label and needs no more; the width it gives up goes to the
                  rows, where it is the difference between a store's name
                  fitting and being truncated. */}
              <div className="flex shrink-0 flex-col sm:w-[36%] sm:max-w-[9.5rem]">
                {/*
                  Wraps rather than squashes.

                  This column is 36% of the pane, which is about 127px on a
                  72rem page and about 109px at the width `lg` starts at. The
                  figure at 34px and five 13px stars with their gaps need
                  roughly 132px on one line — so the row did not fit, and
                  because neither the star row nor the glyphs inside it carried
                  `shrink-0`, what gave way was the stars: they compressed
                  horizontally and rendered as five slightly squashed shapes in
                  the one place on the page a rating has to be unmistakable.

                  `shrink-0` on the glyphs makes the star row incompressible,
                  and `flex-wrap` gives it somewhere to go — under the figure,
                  at full size, on the widths where it cannot sit beside it.
                  The column is a flex column inside a stretched pane, so the
                  extra line costs the layout nothing.
                */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span className="text-[2.125rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
                    {rating}
                  </span>
                  <Stars
                    rating={proof.rating}
                    className="size-[13px] shrink-0"
                    label={`Rated ${rating} out of 5`}
                  />
                </div>

                <p className="mt-2.5 text-[11.5px] leading-snug text-muted-foreground">
                  <span className="font-semibold text-foreground tabular-nums">
                    {numberFormat.format(proof.reviewCount)}+
                  </span>{" "}
                  verified reviews
                </p>

                <div className="mt-auto pt-4">
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    block
                    className="px-3 text-[11.5px]"
                  >
                    <Link href={routes.customers}>View all reviews</Link>
                  </Button>
                </div>
              </div>

              <ReviewList snippets={snippets} />
            </div>
          </div>
        </BlurFade>

        {/*
          ── The price ─────────────────────────────────────────────────────

          A signpost rather than a plan table: cost has to appear before the
          install is asked for (§5.1 #9), but a merchant deciding whether to
          keep reading needs the shape of the pricing, not the comparison. The
          comparison is one click away and is that page's whole job.
        */}
        <BlurFade
          delay={0.14}
          inView
          className="h-full min-w-0 md:col-span-2 lg:col-span-1"
        >
          {/*
            Text over illustration, except on tablet.

            This is the one pane whose shape changes with the grid. In a
            column it is tall and narrow, and the coins belong under the text
            where they can have the full width. On tablet it spans both tracks
            and becomes wide and short — and stacking there leaves the words
            hugging the left edge with a hand's width of nothing beside them.
            So at that one breakpoint the pane turns on its side: words left,
            coins right, which is the blueprint's own arrangement and the only
            one that fits a wide box.
          */}
          <div
            className={cn(CARD, "md:flex-row md:gap-4 lg:flex-col lg:gap-0")}
          >
            <div className="flex min-w-0 flex-col md:flex-1 lg:flex-none">
              <h2 className={HEADING}>Simple, transparent pricing</h2>

              <p className="mt-2 max-w-[22rem] text-[12.5px] leading-relaxed text-muted-foreground">
                Pay only for what you use. No setup fees. No hidden charges.
              </p>

              <div className="mt-4">
                <Button asChild size="sm" className="px-3.5 text-[12px]">
                  <Link href={routes.pricing}>
                    View pricing
                    <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/*
              The coins take every pixel this pane has left, which is why they
              are a flex child rather than a drawing with a width.

              This pane carries the least content on the row and inherits its
              height from the two beside it, so whatever is not text is the
              illustration's to fill. Beside the button the box would be barely
              a third of the card wide, the drawing would fit to that width,
              and the difference would sit above it as a hole — which is what
              it did. Under the button it gets the full width and the whole
              remainder of the height, and `xMaxYMax` keeps it in the bottom
              right corner the blueprint puts it in. The negative margins let
              it run into the card's own padding: the padding is cheaper to
              give up than the size of the one object this pane has to look at.

              The drawing is positioned out of flow, which is the only reason
              this works. A flex item's contribution to its container's
              intrinsic height is its max-content size, not its flex-basis —
              so an in-flow `<svg>` carrying a viewBox ratio claims width ÷
              ratio in height no matter what basis it is given, and this pane,
              the one with the least to say, ends up setting the height of the
              whole row. Absolute positioning removes it from that calculation
              entirely: the box takes the leftover, the drawing fills the box.
              The floor keeps the coins visible on a narrow viewport, where
              there is no leftover to take.
            */}
            <div className="relative mt-3 -mr-1.5 -mb-1.5 min-h-24 flex-1 md:mt-0 md:min-h-32 md:w-[38%] md:flex-none lg:mt-3 lg:min-h-24 lg:w-auto lg:flex-1">
              <CoinStack className="absolute inset-0 size-full" />
            </div>
          </div>
        </BlurFade>
      </div>
    </SectionShell>
  );
}
