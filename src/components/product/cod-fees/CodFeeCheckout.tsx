import {
  BadgeIndianRupee,
  CreditCard,
  Lock,
  ShoppingBag,
  Truck,
} from "lucide-react";

import {
  CHOICE_STEP,
  COD_TOTAL,
  FEE_STEP,
  ORDER,
  PREPAID_STEP,
  PREPAID_TOTAL,
  inr,
} from "@/components/product/cod-fees/feeBeats";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface CodFeeCheckoutProps {
  /** The current beat, from the scene's timeline. */
  readonly step: number;
  readonly className?: string;
}

/** One of the ways to pay, as the buyer sees it at checkout. */
function PaymentOption({
  selected,
  title,
  caption,
  badge,
  badgeLit,
  icon: Icon,
}: {
  readonly selected: boolean;
  readonly title: string;
  readonly caption: string;
  /** The one thing this option says about the fee. */
  readonly badge: string;
  /** Whether that line is currently the point being made. */
  readonly badgeLit: boolean;
  readonly icon: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3 py-2.5",
        "transition-[background-color,border-color,box-shadow] duration-500 ease-emphasized",
        selected
          ? "border-brand bg-brand/[0.05] shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_10%,transparent)]"
          : "border-ink/10 bg-background",
      )}
    >
      {/*
        The radio, drawn — a native input here would inherit focus behaviour
        this scene has no business claiming.
      */}
      <span
        className={cn(
          "grid size-4 shrink-0 place-items-center rounded-full border-[1.5px]",
          "transition-colors duration-500 ease-emphasized",
          selected ? "border-brand" : "border-ink/25",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full bg-brand transition-[opacity,scale] duration-500 ease-emphasized",
            selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] leading-tight font-semibold text-ink">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink/50">
          {caption}
        </span>
      </span>

      {/*
        The fee line for this option, in a slot of its own width so the two
        options stay the same shape whichever one is currently making the
        point. It warms rather than appears: a badge that pops into an option
        row is a notification, and this is a standing fact about the option.
      */}
      <span
        className={cn(
          "shrink-0 rounded-full px-1.5 py-0.5 text-[8.5px] leading-[1.4] font-bold tracking-[0.04em] uppercase",
          "transition-colors duration-500 ease-emphasized",
          badgeLit
            ? "bg-brand-check/16 text-ink/70"
            : "bg-ink/[0.05] text-ink/35",
        )}
      >
        {badge}
      </span>

      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors duration-500 ease-emphasized",
          selected ? "text-brand" : "text-ink/25",
        )}
        strokeWidth={1.7}
      />
    </div>
  );
}

/** One line of the order summary. */
function SummaryRow({
  label,
  value,
  className,
}: {
  readonly label: string;
  readonly value: string;
  readonly className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-3", className)}>
      <span className="min-w-0 truncate text-[11.5px] leading-none text-ink/50">
        {label}
      </span>
      <span className="shrink-0 text-[11.5px] leading-none font-medium text-ink/70 tabular-nums">
        {value}
      </span>
    </div>
  );
}

/**
 * The buyer's checkout, with the merchant's COD fee landing on it.
 *
 * This is the surface the whole control acts on, so it is the largest object in
 * the scene and the one the composition points at. Drawn in markup rather than
 * screenshotted — sharp at any density, themed by the same tokens as the rest
 * of the site, no image bytes on the largest element of the page, and its text
 * is genuinely text.
 *
 * The order summary is the argument. Two payment options are a choice; a
 * summary in which a labelled fee line appears and the total below it moves by
 * exactly that amount is *transparency*, which is the thing this control claims
 * and the thing a visitor can verify from the arithmetic on screen. That is why
 * the fee is a line item next to a total rather than a badge on the option.
 *
 * ── Why nothing here changes size ─────────────────────────────────────────
 * The obvious animation is to insert the fee row. It is also the wrong one: a
 * panel that grows a line every few seconds drags the hero around it up and
 * down. So the row is always in the layout and only its ink arrives, and the
 * total is two figures sharing one grid cell that cross-fade in place. The
 * height is whatever the panel needs, at every width, without a pixel being
 * guessed.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Presentational by contract: it takes the beat and renders it, holds no
 * timeline of its own, and knows nothing about the cards beside it beyond the
 * shared beats module they both read.
 */
export function CodFeeCheckout({ step, className }: CodFeeCheckoutProps) {
  const cod = step > PREPAID_STEP;
  const feeApplied = step >= FEE_STEP;
  const total = feeApplied ? COD_TOTAL : PREPAID_TOTAL;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[1.25rem] border border-border bg-card",
        "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_18px_44px_-20px_rgba(11,27,54,0.35)]",
        className,
      )}
    >
      {/* A whisper of colour at the crown, so the panel is lit rather than flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-soft/70 to-transparent"
      />

      {/* The store's own chrome — this is the buyer's screen, not the app's. */}
      <div className="relative flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="grid size-[22px] shrink-0 place-items-center rounded-lg bg-ink">
          <ShoppingBag className="size-3.5 text-white" strokeWidth={1.8} />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold text-ink">
          Checkout
        </p>
        <span className="flex shrink-0 items-center gap-1 text-[9.5px] leading-none font-semibold text-ink/40">
          <Lock className="size-3" strokeWidth={2} />
          Secure
        </span>
      </div>

      <div className="relative px-4 pt-3.5 pb-4">
        {/* The cart the fee is about to be added to. */}
        <div className="flex items-center gap-3 rounded-xl border border-ink/10 bg-background px-3 py-2.5">
          {/*
            A drawn thumbnail rather than a photograph. A stock product shot
            would be the only pixel-based thing in a scene that is otherwise
            markup, and it would date the panel the moment the catalogue
            changes.
          */}
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-200 to-brand-soft ring-1 ring-ink/[0.06] ring-inset">
            <span className="size-3.5 rounded-[3px] bg-brand/25" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] leading-tight font-semibold text-ink">
              {ORDER.item}
            </span>
            <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink/45">
              {ORDER.variant} · Qty {ORDER.quantity}
            </span>
          </span>

          <span className="shrink-0 text-[14px] leading-none font-semibold text-ink tabular-nums">
            {inr.format(ORDER.subtotal)}
          </span>
        </div>

        {/*
          The payment header, and the one word of status the checkout carries.

          Its own line at a fixed height, so the chip arriving cannot move the
          options underneath it.
        */}
        <div className="mt-3.5 flex h-4 items-center justify-between gap-2">
          <p className="text-[10px] leading-none font-semibold tracking-[0.12em] text-ink/40 uppercase">
            Payment
          </p>
          <span
            className={cn(
              "flex items-center gap-1 rounded-full bg-brand/[0.08] px-1.5 py-0.5",
              "text-[9px] leading-none font-bold tracking-[0.04em] text-brand uppercase",
              "transition-opacity duration-500 ease-emphasized",
              feeApplied ? "opacity-100" : "opacity-0",
            )}
          >
            <BadgeIndianRupee className="size-2.5" strokeWidth={2.5} />
            COD fee applied
          </span>
        </div>

        <div className="mt-2 space-y-2">
          <PaymentOption
            selected={!cod}
            icon={CreditCard}
            title="Online payment"
            caption="UPI, cards and net banking"
            badge="No COD fee"
            badgeLit={step === CHOICE_STEP}
          />
          <PaymentOption
            selected={cod}
            icon={Truck}
            title="Cash on delivery"
            caption="Pay when your order arrives"
            badge="+ COD fee"
            badgeLit={feeApplied}
          />
        </div>

        {/*
          The order summary — the part a merchant is really being shown.

          The fee row is always in the layout and only its ink arrives, so the
          panel never changes height; the rule above the total is dashed
          because it separates a running list from its sum rather than one
          section of the panel from the next.
        */}
        <div className="mt-3.5 rounded-xl border border-ink/10 bg-background px-3 py-2.5">
          <SummaryRow label="Subtotal" value={inr.format(ORDER.subtotal)} />
          <SummaryRow
            label="Shipping"
            value={ORDER.shipping === 0 ? "Free" : inr.format(ORDER.shipping)}
            className="mt-2"
          />

          <div
            className={cn(
              "-mx-1.5 mt-2 flex items-center justify-between gap-3 rounded-md px-1.5 py-1",
              "transition-[opacity,background-color] duration-500 ease-emphasized",
              feeApplied ? "bg-brand/[0.05] opacity-100" : "opacity-0",
            )}
          >
            {/*
              The label and its qualification on one line rather than stacked.
              The row holds its slot whether or not the fee applies, so every
              pixel it reserves is a pixel of blank in the summary on the beats
              before it lands — and "Configured by merchant" is the note that
              keeps ₹49 from reading as a rate COD King sets, so it stays.
            */}
            <span className="flex min-w-0 items-baseline gap-1.5">
              <span className="shrink-0 text-[11.5px] leading-none font-semibold text-ink/70">
                COD fee
              </span>
              <span className="truncate text-[9px] leading-none font-medium text-ink/40">
                Configured by merchant
              </span>
            </span>
            <span className="shrink-0 text-[11.5px] leading-none font-semibold text-brand tabular-nums">
              + {inr.format(ORDER.codFee)}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-dashed border-ink/12 pt-2.5">
            <span className="text-[11.5px] leading-none font-semibold text-ink/70">
              Total
            </span>

            {/*
              One cell, two figures. Both are laid into the same grid area and
              right-aligned, so the total cross-fades to its new value in
              place rather than the row reflowing around a wider number.
            */}
            <span className="grid shrink-0 justify-items-end">
              {[PREPAID_TOTAL, COD_TOTAL].map((amount) => (
                <span
                  key={amount}
                  className={cn(
                    "col-start-1 row-start-1 text-[15px] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums",
                    "transition-opacity duration-500 ease-emphasized",
                    total === amount ? "opacity-100" : "opacity-0",
                  )}
                >
                  {inr.format(amount)}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/*
          The action, in a slot of its own height for the same reason the
          summary has one.
        */}
        <div className="mt-3.5 h-10">
          <p
            className={cn(
              "grid h-full place-items-center rounded-xl text-[12.5px] font-semibold text-white",
              "transition-colors duration-500 ease-emphasized",
              cod ? "bg-ink" : "bg-brand",
            )}
          >
            {cod
              ? `Place order · ${inr.format(total)} on delivery`
              : `Pay ${inr.format(PREPAID_TOTAL)} now`}
          </p>
        </div>
      </div>

      {/* Whose fee decided what is on this screen. */}
      <div className="relative mt-auto border-t border-border px-4 py-2.5">
        <p className="text-center text-[9px] leading-none font-medium text-ink/35">
          COD fee managed by{" "}
          <span className="font-bold text-ink/55">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
