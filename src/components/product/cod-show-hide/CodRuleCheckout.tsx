import { Ban, CreditCard, Lock, ShoppingBag, Truck } from "lucide-react";

import {
  HIDDEN_STEP,
  ORDER,
  inr,
} from "@/components/product/cod-show-hide/ruleBeats";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface CodRuleCheckoutProps {
  /** The current beat, from the scene's timeline. */
  readonly step: number;
  readonly className?: string;
}

/** One of the ways to pay, as the buyer sees it at checkout. */
function PaymentOption({
  selected,
  title,
  caption,
  icon: Icon,
}: {
  readonly selected: boolean;
  readonly title: string;
  readonly caption: string;
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

/**
 * The buyer's checkout, with the rule already applied to it.
 *
 * This is the surface the whole control acts on, so it is the largest object
 * in the scene and the one the composition points at. Drawn in markup rather
 * than screenshotted — sharp at any density, themed by the same tokens as the
 * rest of the site, no image bytes on the largest element of the page, and its
 * text is genuinely text.
 *
 * Online payment is listed first and cash on delivery second, which is both
 * how a Shopify checkout usually orders them and what makes the ending read
 * correctly: when the rule fires, what is left at the top of the list is a
 * real, selected way to pay rather than a gap where one used to be.
 *
 * ── Why cash on delivery leaves a mark ────────────────────────────────────
 * The obvious animation is to delete the row. It is also the wrong one twice
 * over: a panel that loses fifty pixels every few seconds drags the hero
 * around it up and down, and a row that simply vanishes shows a merchant the
 * *effect* while hiding the *cause*. So the slot is shared — the option and
 * the struck-through "hidden by your COD rule" strip occupy one grid cell and
 * cross-fade in place. The height is whatever the taller of the two needs, at
 * every width, without a pixel being guessed.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Presentational by contract: it takes the beat and renders it, holds no
 * timeline of its own, and knows nothing about the rule card above it beyond
 * the shared beats module they both read.
 */
export function CodRuleCheckout({ step, className }: CodRuleCheckoutProps) {
  const hidden = step === HIDDEN_STEP;

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
        {/* The order the rule is about to be read against. */}
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
              {ORDER.variant}
            </span>
          </span>

          <span className="shrink-0 text-[14px] leading-none font-semibold text-ink tabular-nums">
            {inr.format(ORDER.total)}
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
              "flex items-center gap-1 rounded-full bg-ink/[0.06] px-1.5 py-0.5",
              "text-[9px] leading-none font-bold tracking-[0.04em] text-ink/50 uppercase",
              "transition-opacity duration-500 ease-emphasized",
              hidden ? "opacity-100" : "opacity-0",
            )}
          >
            <Ban className="size-2.5" strokeWidth={2.5} />
            COD hidden
          </span>
        </div>

        <div className="mt-2 space-y-2">
          <PaymentOption
            selected={hidden}
            icon={CreditCard}
            title="Online payment"
            caption="UPI, cards and net banking"
          />

          {/*
            One cell, two states. Both children are laid into the same grid
            area, so the cell is as tall as the taller of them and nothing in
            the panel moves when they trade places.
          */}
          <div className="grid">
            <div
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-500 ease-emphasized",
                hidden ? "opacity-0" : "opacity-100",
              )}
            >
              <PaymentOption
                selected={!hidden}
                icon={Truck}
                title="Cash on delivery"
                caption={`Pay ${inr.format(ORDER.total)} when it arrives`}
              />
            </div>

            <div
              className={cn(
                "col-start-1 row-start-1 flex items-center gap-2.5 rounded-xl border border-dashed border-ink/15 bg-ink/[0.02] px-3 py-2.5",
                "transition-opacity duration-500 ease-emphasized",
                hidden ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-ink/[0.06]">
                <Ban className="size-2.5 text-ink/35" strokeWidth={2.5} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] leading-tight font-semibold text-ink/35 line-through">
                  Cash on delivery
                </span>
                <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-ink/35">
                  Hidden by your COD rule
                </span>
              </span>
            </div>
          </div>
        </div>

        {/*
          The action, in a slot of its own height for the same reason the
          option list has one.
        */}
        <div className="mt-3.5 h-10">
          <p
            className={cn(
              "grid h-full place-items-center rounded-xl text-[12.5px] font-semibold text-white",
              "transition-colors duration-500 ease-emphasized",
              hidden ? "bg-brand" : "bg-ink",
            )}
          >
            {hidden ? `Pay ${inr.format(ORDER.total)}` : "Place order"}
          </p>
        </div>
      </div>

      {/* Whose rule decided what is on this screen. */}
      <div className="relative mt-auto border-t border-border px-4 py-2.5">
        <p className="text-center text-[9px] leading-none font-medium text-ink/35">
          Payment options managed by{" "}
          <span className="font-bold text-ink/55">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
