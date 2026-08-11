"use client";

import { BadgeIndianRupee, ReceiptIndianRupee, Truck } from "lucide-react";

import { CodFeeCheckout } from "@/components/product/cod-fees/CodFeeCheckout";
import {
  CHOICE_STEP,
  CHOSE_COD_STEP,
  COD_TOTAL,
  DURATIONS,
  FEE_STEP,
  ORDER,
  inr,
} from "@/components/product/cod-fees/feeBeats";
import { siteConfig } from "@/constants/site";
import { cardHoverClass } from "@/constants/theme";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

interface FeeCard {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly note: string;
  /** The beat at which this card is the one describing the checkout. */
  readonly step: number;
}

/**
 * The three things that happen, beside the screen they happen on.
 *
 * One card per beat of the sequence the panel is playing, in the order it plays
 * them — so the column reads as a commentary on the checkout rather than as
 * decoration around it. That pairing is why the timeline lives in the scene and
 * not in either half: a card announcing "COD fee applied" over a summary that
 * has not applied it yet would be worse than no card at all.
 *
 * Each note is a fact the panel is showing at that moment — the fee, then the
 * total it produces — so a merchant can check the card against the screen
 * beside it instead of taking it on trust.
 */
const CARDS: readonly FeeCard[] = [
  {
    id: "selected",
    icon: Truck,
    title: "Customer selects COD",
    note: "At your Shopify checkout",
    step: CHOSE_COD_STEP,
  },
  {
    id: "fee",
    icon: BadgeIndianRupee,
    title: "COD fee applied",
    note: `${inr.format(ORDER.codFee)} · set by you`,
    step: FEE_STEP,
  },
  {
    id: "total",
    icon: ReceiptIndianRupee,
    title: "Customer sees the total",
    note: `${inr.format(COD_TOTAL)} on delivery`,
    step: CHOICE_STEP,
  },
];

/**
 * One beat of the sequence, floating beside the checkout.
 *
 * Mark, title, and one short line under it — no more. A card has to be legible
 * in the quarter second the eye spends on it on its way to the product, and
 * three paragraphs beside a checkout is a second article competing with the one
 * a visitor is trying to read.
 *
 * The active card is lifted rather than recoloured: a brand ring and a slightly
 * stronger shadow. Tinting the whole surface would put three different-coloured
 * blocks beside the panel over a loop, and the panel is what the composition
 * points at.
 *
 * Hidden from assistive technology — every one of these restates a step the
 * flow section below sets out in full, and the scene already carries an
 * `aria-label` describing the whole sequence.
 */
function Card({
  icon: Icon,
  title,
  note,
  active,
}: FeeCard & { readonly active: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-2xl border bg-white/80 px-2.5 py-2.5 backdrop-blur-xl",
        "transition-[border-color,box-shadow] duration-500 ease-emphasized",
        active
          ? "border-brand/35 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_14px_30px_-14px_rgba(37,99,235,0.5)]"
          : "border-white/90 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_10px_24px_-14px_rgba(11,27,54,0.4)]",
        cardHoverClass,
      )}
    >
      <span className="flex items-center gap-1.5">
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-lg ring-1 transition-colors duration-500",
            active
              ? "bg-brand/10 text-brand ring-brand/20"
              : "bg-ink/[0.05] text-ink/65 ring-ink/8",
          )}
        >
          <Icon className="size-3" strokeWidth={1.9} />
        </span>
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full transition-colors duration-500",
            active ? "bg-brand" : "bg-transparent",
          )}
        />
      </span>

      <span className="mt-1.5 block text-[10px] leading-[1.25] font-semibold text-balance text-ink/80">
        {title}
      </span>
      <span className="mt-0.5 block text-[9px] leading-[1.25] font-medium text-ink/40 tabular-nums">
        {note}
      </span>
    </div>
  );
}

/**
 * The hero's product scene.
 *
 * The buyer's checkout, and beside it the three moments the control is made of.
 * Two objects and one relationship: what the customer is shown on the left,
 * what is happening to it on the right — so a visitor understands before
 * reading a word that a fee is being added in the open rather than discovered
 * on a doorstep.
 *
 * The checkout is the larger of the two and gets the elevation, because it is
 * the surface the control acts on; the column beside it is deliberately small,
 * a commentary rather than a second screen competing with the first.
 *
 * One timeline, held here and read by both halves, so a card cannot claim the
 * fee is applied while the summary still shows the prepaid total. Under reduced
 * motion `useStepTimeline` parks on the last beat — cash on delivery selected,
 * the fee on its own line, the total updated and online payment still there
 * without one — which is the frame the whole sequence exists to reach. Nothing
 * runs at all while the hero is off screen.
 *
 * The cards are the first thing to go as the column narrows, and they go at
 * `xl` rather than at `lg`. A checkout is a wide object — two payment rows, a
 * four-line summary and a total — and at `lg` the hero's right column has about
 * 450px to give it; spending 165 of those on commentary leaves a panel whose
 * every label truncates, which argues against the craft the scene exists to
 * demonstrate. So below `xl` the checkout takes the column on its own, capped
 * near the width it has at `xl` so it reads the same size at every desktop
 * measure rather than ballooning. Nothing is lost: every beat the cards name is
 * a step the flow section below states in full, and the panel's own status chip
 * carries the moment the fee lands at every width.
 */
export function CodFeesScene({ className }: WithClassName) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Key light, so the panel is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 44% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <div
        role="img"
        aria-label={`${siteConfig.name} adds a COD fee to a Shopify checkout: the customer chooses cash on delivery, the merchant's ${inr.format(ORDER.codFee)} COD fee appears as its own line in the order summary, the total updates to ${inr.format(COD_TOTAL)}, and online payment stays available without the fee.`}
        className="flex items-center gap-4"
      >
        <CodFeeCheckout
          step={step}
          className="mx-auto max-w-[23rem] lg:max-w-[24.5rem] xl:mx-0 xl:max-w-none xl:flex-1"
        />

        <div className="hidden w-[9.25rem] shrink-0 flex-col gap-2.5 xl:flex">
          {CARDS.map((card) => (
            <Card key={card.id} {...card} active={step === card.step} />
          ))}
        </div>
      </div>
    </div>
  );
}
