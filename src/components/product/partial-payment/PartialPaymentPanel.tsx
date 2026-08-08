"use client";

import {
  Check,
  IndianRupee,
  Loader2,
  Lock,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";

import { siteConfig } from "@/constants/site";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

/**
 * The order under discussion.
 *
 * One object, so the split can never disagree with itself: the deposit and the
 * balance are derived from the total rather than typed three times, which is
 * how a mock ends up claiming ₹299 now, ₹1,000 later and a ₹1,299 total that
 * does not add up.
 */
const ORDER = {
  item: "Aurelia linen throw",
  variant: "Sand · 130 × 170 cm",
  total: 1299,
  deposit: 299,
} as const;

const BALANCE = ORDER.total - ORDER.deposit;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * The sequence, as a duration per beat.
 *
 * Beat 0 is what renders on the server and on a browser that never runs the
 * script: the order priced, both options offered, cash on delivery selected
 * because that is what the buyer arrived intending to do. It has to be a
 * legible frame on its own, so it holds longest of the unresolved beats.
 *
 * The beats after it are the argument, in order — the buyer takes the deposit
 * instead, pays it, and the order is secured with a balance still to collect.
 * The resolved frame holds for nearly three seconds because it is the only one
 * the whole sequence exists to reach.
 */
const BEATS = [
  { id: "reviewing", choice: "cod", ms: 1900 },
  { id: "choosing", choice: "partial", ms: 1500 },
  { id: "paying", choice: "partial", ms: 1100 },
  { id: "secured", choice: "partial", ms: 2900 },
] as const;

const DURATIONS = BEATS.map((beat) => beat.ms);

const PAYING_STEP = BEATS.findIndex((beat) => beat.id === "paying");
const SECURED_STEP = BEATS.findIndex((beat) => beat.id === "secured");

interface PartialPaymentPanelProps {
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
  badge,
  icon: Icon,
}: {
  readonly selected: boolean;
  readonly title: string;
  readonly caption: string;
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

      <Icon
        aria-hidden
        className={cn(
          "size-4 shrink-0 transition-colors duration-300 ease-emphasized",
          selected ? "text-brand" : "text-ink/25",
        )}
        strokeWidth={1.7}
      />
    </div>
  );
}

/**
 * A partial payment, being taken.
 *
 * This is the one surface COD King renders on the buyer's own screen for this
 * control, and it is the product's whole argument in a single frame: the buyer
 * arrives meaning to pay nothing, is offered a smaller number, and the order
 * becomes one somebody has money in. Drawn in markup rather than
 * screenshotted — sharp at any density, themed by the same tokens as the rest
 * of the site, no image bytes on the largest element of the page, and its text
 * is genuinely text.
 *
 * It runs the sequence end to end rather than showing a resolved state,
 * because the mechanism *is* the choice. A card already showing "₹299 paid"
 * proves somebody drew a receipt; watching the selection move off cash on
 * delivery and the split bar fill is the only version that proves the product
 * does something.
 *
 * The split meter is the piece that carries the idea. Two numbers side by side
 * are a fact; a bar where the paid part is small and the part still to collect
 * is large is the *shape* of the offer, and a merchant reads it before they
 * read either figure.
 *
 * Everything that changes between beats has its slot reserved at full height,
 * so a loop running inside a hero never nudges the layout around it.
 *
 * Standalone by design: it takes no props but a class name, carries its own
 * timeline, and parks itself when off screen or when the visitor has asked for
 * reduced motion — where it rests on the resolved frame, which makes the
 * argument anyway.
 */
export function PartialPaymentPanel({
  className,
  label,
}: PartialPaymentPanelProps) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);
  const beat = BEATS[step] ?? BEATS[0];
  const partial = beat.choice === "partial";
  const paying = step === PAYING_STEP;
  const secured = step === SECURED_STEP;

  const paidShare = Math.round((ORDER.deposit / ORDER.total) * 100);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={
        label ??
        `${siteConfig.name} secures a cash-on-delivery order with a partial payment: the buyer chooses to pay ${inr.format(ORDER.deposit)} of a ${inr.format(ORDER.total)} order at checkout, and the remaining ${inr.format(BALANCE)} is collected on delivery.`
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
          <ShieldCheck className="size-3.5 text-white" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold text-ink">
          Secure your order with Partial Payment
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
            <span className="size-3.5 rounded-[3px] bg-brand/25" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] leading-tight font-semibold text-ink">
              {ORDER.item}
            </span>
            <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink/45">
              {ORDER.variant}
            </span>
          </span>

          <span className="shrink-0 text-[14px] leading-none font-semibold text-ink tabular-nums">
            {inr.format(ORDER.total)}
          </span>
        </div>

        {/*
          The split.

          Its width animates rather than appearing, because the animation is
          the point being made: the bar starts at the whole order sitting
          unpaid and resolves to a small paid share against a large one still
          to collect.
        */}
        <div className="mt-3">
          <div
            aria-hidden
            className="h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.07]"
          >
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700 ease-emphasized"
              style={{ width: partial ? `${paidShare}%` : "0%" }}
            />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[10px] leading-none">
            <span
              className={cn(
                "font-semibold tabular-nums transition-colors duration-300",
                partial ? "text-brand" : "text-ink/35",
              )}
            >
              {inr.format(ORDER.deposit)} now
            </span>
            <span className="text-ink/45 tabular-nums">
              {inr.format(BALANCE)} on delivery
            </span>
          </div>
        </div>

        {/* The choice. */}
        <div className="mt-3.5 space-y-2">
          <PaymentOption
            selected={partial}
            icon={IndianRupee}
            title={`Pay ${inr.format(ORDER.deposit)} now`}
            caption={`Pay the remaining ${inr.format(BALANCE)} on delivery`}
            badge="Recommended"
          />
          <PaymentOption
            selected={!partial}
            icon={Truck}
            title="Cash on delivery"
            caption="Pay the full amount on delivery"
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
          {secured ? (
            <p className="flex h-full animate-in items-center gap-2 rounded-xl bg-brand-check/14 px-3 text-[11px] font-semibold text-ink/75 duration-300 fade-in-0 slide-in-from-bottom-1">
              <span
                aria-hidden
                className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check"
              >
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
              Order secured — {inr.format(BALANCE)} due on delivery
            </p>
          ) : (
            <p
              className={cn(
                "grid h-full place-items-center rounded-xl text-[12.5px] font-semibold text-white",
                "transition-colors duration-300 ease-emphasized",
                partial ? "bg-brand" : "bg-ink/25",
              )}
            >
              {paying ? (
                <span className="flex items-center gap-2">
                  <Loader2
                    aria-hidden
                    className="size-3.5 animate-spin"
                    strokeWidth={2.5}
                  />
                  Paying {inr.format(ORDER.deposit)}
                </span>
              ) : partial ? (
                `Proceed to pay ${inr.format(ORDER.deposit)}`
              ) : (
                "Place order"
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
