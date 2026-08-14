"use client";

import {
  BadgePercent,
  Check,
  Loader2,
  Lock,
  Smartphone,
  Truck,
  X,
} from "lucide-react";

import { siteConfig } from "@/constants/site";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

/**
 * The order under discussion.
 *
 * One object, so the panel can never disagree with itself: the discount and
 * the prepaid total are derived from the cart rather than typed three times,
 * which is how a mock ends up offering ₹130 off a ₹1,299 order and charging
 * ₹1,199 for it.
 *
 * The rate is a *configured example*, not a claim — the product's own copy
 * says discount rules are percentage or fixed value and fully configurable,
 * and this panel is showing one merchant's setting rather than a default.
 */
const ORDER = {
  item: "Nomad ceramic mug set",
  variant: "Set of 4 · Clay",
  total: 1299,
  discountRate: 0.1,
} as const;

const DISCOUNT = Math.round(ORDER.total * ORDER.discountRate);
const PREPAID_TOTAL = ORDER.total - DISCOUNT;
const DISCOUNT_LABEL = `${Math.round(ORDER.discountRate * 100)}% off`;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * The sequence, as a duration per beat.
 *
 * Beat 0 is what renders on the server and on a browser that never runs the
 * script: the order priced, both ways to pay offered, cash on delivery
 * selected because that is what the buyer arrived intending to do. It has to
 * be a legible frame on its own, so it holds longest of the unresolved beats.
 *
 * The beats after it are the product's argument in order — the nudge appears,
 * the buyer takes it, the payment goes through, and the order is settled
 * before it ships. The resolved frame holds for nearly three seconds because
 * it is the only one the whole sequence exists to reach.
 */
const BEATS = [
  { id: "cod", choice: "cod", nudge: false, ms: 1900 },
  { id: "nudge", choice: "cod", nudge: true, ms: 1700 },
  { id: "switch", choice: "prepaid", nudge: true, ms: 1400 },
  { id: "paying", choice: "prepaid", nudge: true, ms: 1100 },
  { id: "paid", choice: "prepaid", nudge: true, ms: 2900 },
] as const;

const DURATIONS = BEATS.map((beat) => beat.ms);

const PAYING_STEP = BEATS.findIndex((beat) => beat.id === "paying");
const PAID_STEP = BEATS.findIndex((beat) => beat.id === "paid");

interface CodToPrepaidPanelProps {
  readonly className?: string;
  /**
   * Overrides the description announced to assistive technology. The default
   * describes the whole sequence, which is what a still of it would be
   * captioned with.
   */
  readonly label?: string;
}

/** One of the two ways to pay, as the buyer sees it at checkout. */
function PaymentOption({
  selected,
  title,
  caption,
  amount,
  badge,
  icon: Icon,
}: {
  readonly selected: boolean;
  readonly title: string;
  readonly caption: string;
  readonly amount: string;
  readonly badge?: string;
  readonly icon: typeof Truck;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3 py-2.5",
        "transition-[background-color,border-color,box-shadow] duration-300 ease-emphasized",
        selected
          ? "border-brand bg-brand/[0.05] shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_10%,transparent)]"
          : "border-ink/10 bg-background",
      )}
    >
      {/* The radio, drawn — a native input here would inherit focus behaviour
          this scene has no business claiming. */}
      <span
        aria-hidden
        className={cn(
          "grid size-4 shrink-0 place-items-center rounded-full border-[1.5px]",
          "transition-colors duration-300 ease-emphasized",
          selected ? "border-brand" : "border-ink/25",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full bg-brand transition-[opacity,scale] duration-300 ease-emphasized",
            selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>

      <Icon
        aria-hidden
        className={cn(
          "size-4 shrink-0 transition-colors duration-300 ease-emphasized",
          selected ? "text-brand" : "text-ink/25",
        )}
        strokeWidth={1.7}
      />

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12.5px] leading-tight font-semibold text-ink">
            {title}
          </span>
          {badge ? (
            <span className="rounded-full bg-brand/10 px-1.5 py-px text-[8.5px] leading-[1.4] font-bold tracking-[0.04em] text-brand uppercase">
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-[10.5px] leading-tight text-ink/50">
          {caption}
        </span>
      </span>

      <span
        className={cn(
          "shrink-0 text-[12.5px] leading-none font-semibold tabular-nums",
          "transition-colors duration-300 ease-emphasized",
          selected ? "text-ink" : "text-ink/40",
        )}
      >
        {amount}
      </span>
    </div>
  );
}

/**
 * A cash order being converted to a prepaid one.
 *
 * This is the one surface COD King renders on the buyer's own screen for this
 * control, and it is the product's whole argument in a single frame: the buyer
 * arrives meaning to pay on delivery, is shown a discount for paying now, and
 * the order leaves the checkout already settled. Drawn in markup rather than
 * screenshotted — sharp at any density, themed by the same tokens as the rest
 * of the site, no image bytes on the largest element of the page, and its text
 * is genuinely text.
 *
 * It runs the sequence end to end rather than showing a resolved state,
 * because the mechanism *is* the nudge. A card already reading "Paid online"
 * proves somebody drew a receipt; watching the banner arrive, the selection
 * move off cash on delivery and the total fall is the only version that proves
 * the product does something.
 *
 * The price line is the piece that carries the idea. Two payment options are a
 * choice; the same order priced twice — the cash figure struck through and the
 * prepaid one beside it — is the *reason* to make it, and a buyer reads that
 * before they read either label.
 *
 * Everything that changes between beats has its slot reserved at full height,
 * so a loop running inside a hero never nudges the layout around it — the
 * banner, the discount row and the button all occupy their space from the
 * first frame.
 *
 * Standalone by design: it takes no props but a class name, carries its own
 * timeline, and parks itself when off screen or when the visitor has asked for
 * reduced motion — where it rests on the resolved frame, which makes the
 * argument anyway.
 */
export function CodToPrepaidPanel({
  className,
  label,
}: CodToPrepaidPanelProps) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);
  const beat = BEATS[step] ?? BEATS[0];
  const prepaid = beat.choice === "prepaid";
  const paying = step === PAYING_STEP;
  const paid = step === PAID_STEP;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={
        label ??
        `${siteConfig.name} converts a cash-on-delivery order to prepaid: the buyer is offered a ${inr.format(DISCOUNT)} discount for paying online, switches from cash on delivery, and pays ${inr.format(PREPAID_TOTAL)} at checkout.`
      }
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

      {/* The product's own chrome. */}
      <div className="relative flex items-center gap-2 border-b border-border px-4 py-3">
        <span
          aria-hidden
          className="grid size-[22px] shrink-0 place-items-center rounded-lg bg-brand"
        >
          <BadgePercent className="size-3.5 text-white" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold text-ink">
          Pay online and save on this order
        </p>
        <span
          aria-hidden
          className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/[0.05]"
        >
          <X className="size-3 text-ink/45" />
        </span>
      </div>

      <div className="relative px-4 pt-4 pb-4">
        {/* The order. */}
        <div className="flex items-center gap-3 rounded-xl border border-ink/10 bg-background px-3 py-2.5">
          {/*
            A drawn thumbnail rather than a photograph. A stock product shot
            would be the only pixel-based thing in a scene that is otherwise
            markup, and it would date the panel the moment the catalogue
            changes.
          */}
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-200 to-brand-soft ring-1 ring-ink/[0.06] ring-inset"
          >
            <span className="size-3.5 rounded-full bg-brand/25" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] leading-tight font-semibold text-ink">
              {ORDER.item}
            </span>
            <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink/45">
              {ORDER.variant}
            </span>
          </span>

          {/*
            The order priced twice.

            The cash figure is struck through rather than replaced, so the
            saving is legible as a *difference* rather than as a number the
            buyer has to remember from two seconds ago. Both sit in the slot
            from the first frame — the struck one merely fades and shrinks its
            weight — so the row cannot change width as the beat turns.
          */}
          <span className="flex shrink-0 items-baseline gap-1.5">
            <span
              className={cn(
                "text-[11px] leading-none text-ink/35 tabular-nums line-through",
                "transition-opacity duration-300 ease-emphasized",
                prepaid ? "opacity-100" : "opacity-0",
              )}
            >
              {inr.format(ORDER.total)}
            </span>
            <span
              className={cn(
                "text-[14px] leading-none font-semibold tabular-nums",
                "transition-colors duration-300 ease-emphasized",
                prepaid ? "text-brand" : "text-ink",
              )}
            >
              {inr.format(prepaid ? PREPAID_TOTAL : ORDER.total)}
            </span>
          </span>
        </div>

        {/*
          The nudge itself — the one thing on this panel the merchant switched
          on. Its slot is held open from the first frame and only its contents
          arrive, which is what keeps a looping hero perfectly still.
        */}
        <div className="mt-3 h-[2.625rem]">
          <div
            className={cn(
              "flex h-full items-center gap-2.5 rounded-xl border border-brand/25 bg-brand/[0.06] px-3",
              "transition-[opacity,translate] duration-500 ease-emphasized",
              beat.nudge
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0",
            )}
          >
            <span
              aria-hidden
              className="grid size-6 shrink-0 place-items-center rounded-lg bg-white text-brand ring-1 ring-brand/20 ring-inset"
            >
              <BadgePercent className="size-3.5" strokeWidth={1.9} />
            </span>
            <p className="min-w-0 flex-1 text-[10.5px] leading-[1.35] font-semibold text-ink/75">
              Pay online now and save {inr.format(DISCOUNT)} on this order
            </p>
            <span className="shrink-0 rounded-full bg-brand px-1.5 py-0.5 text-[8.5px] leading-[1.4] font-bold tracking-[0.04em] text-white uppercase">
              {DISCOUNT_LABEL}
            </span>
          </div>
        </div>

        {/* The choice. */}
        <div className="mt-3 space-y-2">
          <PaymentOption
            selected={prepaid}
            icon={Smartphone}
            title="Pay online now"
            caption="UPI, cards, netbanking or wallets"
            amount={inr.format(PREPAID_TOTAL)}
            badge={`Save ${inr.format(DISCOUNT)}`}
          />
          <PaymentOption
            selected={!prepaid}
            icon={Truck}
            title="Cash on delivery"
            caption="Pay the full amount on delivery"
            amount={inr.format(ORDER.total)}
          />
        </div>

        {/*
          The action, and what it becomes.

          One reserved slot for three states rather than a button that swaps
          for a banner — a panel that changes height every few seconds drags
          whatever sits beside it up and down, and a hero that will not sit
          still is the opposite of confident.
        */}
        <div className="mt-3.5 h-10">
          {paid ? (
            <p className="flex h-full animate-in items-center gap-2 rounded-xl bg-brand-check/14 px-3 text-[11px] font-semibold text-ink/75 duration-300 fade-in-0 slide-in-from-bottom-1">
              <span
                aria-hidden
                className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check"
              >
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
              Paid online — no COD risk on this order
            </p>
          ) : (
            <p
              className={cn(
                "grid h-full place-items-center rounded-xl text-[12.5px] font-semibold text-white",
                "transition-colors duration-300 ease-emphasized",
                prepaid ? "bg-brand" : "bg-ink/25",
              )}
            >
              {paying ? (
                <span className="flex items-center gap-2">
                  <Loader2
                    aria-hidden
                    className="size-3.5 animate-spin"
                    strokeWidth={2.5}
                  />
                  Paying {inr.format(PREPAID_TOTAL)}
                </span>
              ) : prepaid ? (
                `Pay ${inr.format(PREPAID_TOTAL)} now`
              ) : (
                "Place COD order"
              )}
            </p>
          )}
        </div>
      </div>

      {/* Trust, and whose screen this is. */}
      <div className="relative mt-auto border-t border-border px-4 py-3">
        <p className="flex items-center justify-center gap-1.5 text-[9.5px] font-medium text-ink/50">
          <Lock aria-hidden className="size-3 text-ink/40" />
          Paid securely through your store&rsquo;s own gateway
        </p>
        <p className="mt-1.5 text-center text-[9px] font-medium text-ink/35">
          Powered by{" "}
          <span className="font-bold text-ink/55">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
