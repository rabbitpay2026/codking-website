import { ChevronRight, Lock, MapPin, Check } from "lucide-react";

import {
  MastercardMark,
  RupayMark,
  UpiMark,
  VisaMark,
} from "@/components/brand/BrandMarks";
import { StatusBar } from "@/components/sections/hero/PhoneChrome";

/**
 * A buyer's checkout with COD King's controls already applied.
 *
 * The front device in the hero, and the section's whole argument in one
 * screen: a fee sitting on the cash option, a discount pulling against it,
 * and an address the store has already verified. Three of the flagship
 * controls doing their job inside a surface every Shopify merchant
 * recognises, which is a far better case for the product than a feature list.
 *
 * The address block is the anchor the hero's callouts point at, so it carries
 * a soft halo and sits at a predictable height in the screen — the connectors
 * outside the device are aligned to it.
 *
 * Drawn in markup rather than screenshotted: it stays sharp at any density,
 * re-tints with the brand, costs no image bytes on the page's largest
 * element, and its text is real text.
 */
export function CheckoutScreen() {
  return (
    <div className="flex size-full flex-col bg-white text-ink">
      <StatusBar className="text-ink" />

      {/* Merchant identity — the store, not us. */}
      <div className="mt-2.5 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-ink text-[10px] font-bold text-white">
            A
          </span>
          <span className="text-[12px] font-semibold tracking-tight">
            Aurelia Living
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] font-medium text-ink/45">
          <Lock aria-hidden className="size-2.5" />
          Secure
        </span>
      </div>

      <div className="mt-3 h-px bg-ink/8" />

      {/* Basket */}
      <div className="mt-3 flex items-center gap-2.5 px-4">
        <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-brand via-brand-accent to-brand-check/70">
          <span className="absolute inset-x-1.5 bottom-1.5 h-3.5 rounded-sm bg-white/25" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-white/40" />
          <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-ink text-[8px] font-bold text-white">
            1
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] leading-tight font-semibold">
            Linen Throw Cushion
          </p>
          <p className="mt-0.5 text-[9px] text-ink/45">Sand · 45 × 45 cm</p>
        </div>
        <span className="text-[11px] font-semibold tabular-nums">₹1,299</span>
      </div>

      <p className="mt-4 px-4 text-[8.5px] font-semibold tracking-[0.1em] text-ink/35 uppercase">
        Deliver to
      </p>

      {/*
        The hero's callouts point here. `animate-halo` breathes the ring
        rather than moving the block, so the emphasis reads as a highlight
        and never as a wobble.
      */}
      <div className="relative mt-1.5 px-4">
        <span
          aria-hidden
          className="absolute inset-x-3.5 -inset-y-0.5 animate-halo rounded-xl bg-brand/12 ring-2 ring-brand/45"
        />
        <div className="relative rounded-xl bg-white p-2.5">
          <div className="flex items-start gap-2">
            <MapPin aria-hidden className="mt-0.5 size-3 shrink-0 text-brand" />
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-semibold">Aditi Sharma</p>
              <p className="mt-0.5 text-[9px] leading-relaxed text-ink/55">
                402, Sunder Residency, Linking Road
                <br />
                Bandra West, Mumbai 400050
              </p>
              <p className="mt-1 text-[9px] font-medium text-ink/45 tabular-nums">
                +91 98••• ••210
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-check/14 px-2 py-1">
            <Check aria-hidden className="size-2.5 text-ink/70" />
            <span className="text-[8.5px] font-semibold text-ink/70">
              Address verified · Pincode serviceable
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 px-4 text-[8.5px] font-semibold tracking-[0.1em] text-ink/35 uppercase">
        Payment
      </p>

      <div className="mt-1.5 space-y-1.5 px-4">
        {/* Prepaid, made deliberately more attractive than cash. */}
        <div className="rounded-xl border border-ink/10 p-2.5">
          <div className="flex items-center gap-2.5">
            <span className="size-3.5 shrink-0 rounded-full border-2 border-ink/20" />
            <p className="flex-1 text-[10px] font-semibold">Pay now</p>
            <span className="rounded-full bg-brand-check/25 px-1.5 py-0.5 text-[8px] font-bold text-ink/75">
              Save ₹120
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 pl-6">
            <UpiMark />
            <span className="h-2.5 w-px bg-ink/10" />
            <VisaMark />
            <MastercardMark />
            <RupayMark />
          </div>
        </div>

        {/* Cash, carrying its true cost. */}
        <div className="rounded-xl border-2 border-brand bg-brand-soft/70 p-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-brand">
              <Check aria-hidden className="size-2 text-white" />
            </span>
            <p className="flex-1 text-[10px] font-semibold">Cash on Delivery</p>
            <span className="text-[9px] font-semibold text-ink/60 tabular-nums">
              +₹49
            </span>
          </div>
          <p className="mt-1 pl-6 text-[8.5px] text-ink/50">
            Confirm by OTP after checkout
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-auto px-4 pt-3">
        <div className="space-y-1 border-t border-ink/8 pt-2.5 text-[9.5px]">
          <div className="flex justify-between text-ink/55">
            <span>Subtotal</span>
            <span className="tabular-nums">₹1,299</span>
          </div>
          <div className="flex justify-between text-ink/55">
            <span>COD fee</span>
            <span className="tabular-nums">₹49</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-[12px] tabular-nums">₹1,348</span>
          </div>
        </div>

        <div className="mt-2.5 mb-4 flex h-9 items-center justify-center gap-1 rounded-full bg-brand text-[11px] font-semibold text-white shadow-[0_6px_16px_-6px_var(--brand)]">
          Complete order
          <ChevronRight aria-hidden className="size-3" />
        </div>
      </div>
    </div>
  );
}
