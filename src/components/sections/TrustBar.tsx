import { Star } from "lucide-react";

import { MerchantMark } from "@/components/brand/MerchantMarks";
import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { SectionShell } from "@/components/sections/SectionShell";
import { Marquee } from "@/components/ui/marquee";
import { getProofMetrics, getTrustedBrands } from "@/lib/content";
import { formatRating } from "@/utils/format";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The band this strip sits in.
 *
 * Two hairlines and a tint so faint it is closer to a change in air pressure
 * than a colour. Together they make this a band: the rules run the full width
 * so the strip is unmistakably its own horizontal register, and the tint starts
 * and ends at the page background so neither join is a step.
 *
 * The rules are set at 7% ink, which is roughly half the weight of a card
 * border. At full width, weight is the only thing standing between "this is a
 * section" and "the page has been cut in two".
 *
 * It is a backdrop rather than a border on the section box so the rules span
 * the viewport while the content stays on the page grid — the band is wide, the
 * content inside it is not.
 */
function TrustBand() {
  return (
    <>
      {/* Painted first, so the rules below sit on top of it rather than under. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background via-sky-50 to-background"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-ink/[0.07]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-ink/[0.07]"
      />
    </>
  );
}

/**
 * The trust strip (§5.1 #3).
 *
 * The first thing under the hero, with one job: turn the claim the hero just
 * made into someone else's word. So it carries no argument of its own — a
 * count, five marks, and the marketplace the product is certified on.
 *
 * It is deliberately not a card. An earlier pass floated this on a rounded
 * white panel pulled up over the hero's floor, and a panel is the wrong object
 * here: the hero ends in an almost-white field, so a white card on a white page
 * is a box drawn around content that did not need one. The strip now begins on
 * the same page grid the hero uses — same measure, same gutter, so its left
 * edge lines up with the headline above it — and is marked as its own register
 * by two full-width hairlines instead, which is enough to make it a section and
 * not enough to make it an object.
 *
 * The count and the wall are one component, not two things beside each other:
 * no rule between them and a gap tight enough that they share a line rather
 * than occupy columns. The only vertical hairline left is before the
 * marketplace verdict, which is a different kind of statement and earns the
 * separation.
 *
 * The figure is the focal point of the section and is sized like one. It is the
 * largest thing on the page after the headline, and everything around it — both
 * captions and the marks themselves — is set small and quiet so there is never
 * a question about what is being said.
 *
 * Below `lg` the three parts stack, and the wall keeps the container's gutter
 * rather than bleeding — a strip that runs to the screen edges stops sharing
 * the page's margin, and losing that alignment costs more than the bleed buys.
 *
 * Every figure is the proof repository (§11.1), so the count a visitor reads
 * here cannot drift from the hero's, the reviews section's, or the footer's.
 */
export async function TrustBar() {
  const proof = await getProofMetrics();
  const brands = getTrustedBrands();

  return (
    <SectionShell
      size="flush"
      ariaLabel="Merchants using COD King"
      backdrop={<TrustBand />}
      containerClassName="py-8 md:py-9 lg:py-10"
    >
      <div className="grid items-center gap-x-7 gap-y-7 lg:grid-cols-[auto_1fr_auto] xl:gap-x-9">
        {/*
          The count.

          Three tiers, stacked, in one column — label, figure, unit. A single
          sentence ("Trusted by 10,000+ D2C brands") gives all three the same
          weight and the number stops being the point; stacked, the figure is
          unambiguously the statement and the two lines around it are its
          caption. Setting them side by side instead spreads the block along the
          row and puts the figure in competition with the logos beside it.

          Both captions are uppercase and tracked out, at two different weights
          of grey. That pairing is what lets the number be this large without
          the block reading as loud: the small type is doing the framing, so the
          figure does not have to argue for its own importance.

          The figure is the only tabular number here — the two captions are
          letters, and letter-spacing is what holds them, not a shared advance.
        */}
        <div className="lg:pr-2">
          <p className="text-[10px] leading-none font-semibold tracking-[0.2em] text-ink/35 uppercase">
            Trusted by
          </p>

          <p className="mt-3 text-[2.6rem] leading-[0.9] font-semibold tracking-[-0.05em] text-ink tabular-nums sm:text-[2.9rem]">
            {numberFormat.format(proof.merchantCount)}+
          </p>

          <p className="mt-2.5 text-[11.5px] leading-none font-semibold tracking-[0.15em] text-ink/50 uppercase">
            D2C brands
          </p>
        </div>

        {/*
          The wall.

          `overflow-hidden` on the track and a fade at each end are what make an
          infinite marquee look infinite: without them a mark appears and
          disappears at a hard edge, and the eye reads the loop instead of the
          logos.

          `will-change-transform` promotes each repeat to its own compositor
          layer, so a translation this long runs off the main thread and cannot
          be made to stutter by anything else on the page.

          The track stays inside the page container at every width. An earlier
          pass let it break the gutter and run to the screen edges, which reads
          as a marquee continuing past the frame but costs the thing that
          matters more here: the wall stops sharing the page's left and right
          margin, and a trust strip that does not line up with the hero above it
          looks like a mistake long before it looks like a flourish.
        */}
        <div className="relative">
          {/*
            Hidden from assistive technology: the marquee repeats its children
            to fill the track, so a screen reader would hear every store named
            several times over. The sentence below states the list once, in
            order.

            `[&>div]:items-center` centres the marks against each other. The
            registry component lays each repeat out as a plain flex row, and a
            flex row's default `stretch` would pull a 22px wordmark up to the
            height of the tallest lockup beside it and distort it.
          */}
          <Marquee
            aria-hidden
            pauseOnHover
            className="p-0 [--duration:52s] [--gap:3.5rem] sm:[--gap:4.5rem] [&>div]:items-center [&>div]:will-change-transform"
          >
            {brands.map((brand) => (
              <MerchantMark
                key={brand.id}
                name={brand.name}
                logo={brand.logo}
                className="shrink-0"
              />
            ))}
          </Marquee>

          {/*
            Matched fades, and deliberately narrow.

            These exist to stop a mark appearing and disappearing at a hard
            edge, and that is all they are for. A wide one softens the loop
            beautifully and then costs the section its composition: the first
            logo no longer starts where the column starts, so the row opens on a
            gap that reads as a layout error. Both are the same width, so the
            track is symmetrical about its own centre.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-sky-50 to-transparent sm:w-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-sky-50 to-transparent sm:w-10"
          />

          <p className="sr-only">
            Stores using COD King include{" "}
            {brands.map((brand) => brand.name).join(", ")}.
          </p>
        </div>

        {/*
          The marketplace verdict. The one hairline in the row, because this is
          the only part that is not the merchant count restated — it is who
          vouches for the product rather than who uses it.
        */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 lg:flex-col lg:items-end lg:gap-y-2.5 lg:border-l lg:border-ink/[0.08] lg:pl-8 xl:pl-9">
          <span className="flex items-center gap-2">
            <ShopifyMark className="size-[18px]" />
            <span className="text-[13px] leading-none font-semibold tracking-[-0.005em] text-ink/80">
              Built for Shopify
            </span>
          </span>

          <span
            className="flex items-center gap-1.5 text-[13px] leading-none"
            aria-label={`Rated ${formatRating(proof.rating)} out of 5 from ${numberFormat.format(proof.reviewCount)} reviews`}
          >
            <span aria-hidden className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-[13px] fill-[#f5a623] text-[#f5a623]"
                />
              ))}
            </span>
            <span aria-hidden className="font-semibold text-ink tabular-nums">
              {formatRating(proof.rating)}
            </span>
            <span aria-hidden className="text-ink/40">
              · {numberFormat.format(proof.reviewCount)}+ reviews
            </span>
          </span>
        </div>
      </div>
    </SectionShell>
  );
}
