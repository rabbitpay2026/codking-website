import { Check, ChevronRight, Lock, MapPin, Phone } from "lucide-react";

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
 * screen: an address the store has already verified, a fee sitting on the cash
 * option, a discount pulling against it, and a deposit splitting the rest.
 * Four of the flagship controls doing their job inside a surface every Shopify
 * merchant recognises — which is a far better case for the product than a
 * feature list.
 *
 * It is drawn as a *complete* checkout rather than as a suggestive fragment.
 * A mockup that trails off into placeholder rows tells a merchant the product
 * was not finished; one that carries the merchant's logo, the real basket, the
 * full address, every payment method and a totalled summary tells them it was.
 *
 * The address block is the anchor the hero's callouts point at, so it carries
 * a soft halo and sits at a predictable height in the screen — the connectors
 * outside the device are aligned to it.
 *
 * Drawn in markup rather than screenshotted: it stays sharp at any density,
 * re-tints with the brand, costs no image bytes on the page's largest element,
 * and its text is real text.
 */
export function CheckoutScreen() {
  return (
    <div className="flex size-full flex-col bg-white text-ink">
      <StatusBar className="text-ink" />

      {/* Merchant identity — the store, not us. */}
      <div className="mt-2.5 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid size-[26px] place-items-center rounded-[9px] bg-gradient-to-br from-ink to-[#3a2f6b] text-[12px] font-bold text-white shadow-[0_2px_6px_rgba(20,16,58,0.28)]"
          >
            A
          </span>
          <span className="text-[13px] leading-none font-semibold tracking-[-0.01em]">
            Aurelia Living
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-1.5 py-0.5 text-[9px] font-semibold text-ink/50">
          <Lock aria-hidden className="size-2.5" />
          Secure
        </span>
      </div>

      {/* Checkout progress, so the screen is placed in a flow. */}
      <div
        aria-hidden
        className="mt-2.5 flex items-center gap-1.5 px-4 text-[8.5px] font-medium text-ink/35"
      >
        <span>Cart</span>
        <ChevronRight className="size-2" />
        <span>Address</span>
        <ChevronRight className="size-2" />
        <span className="font-bold text-brand">Payment</span>
      </div>

      <div className="mt-2 h-px bg-ink/8" />

      {/* Basket */}
      <div className="mt-2.5 flex items-center gap-2.5 px-4">
        <span
          aria-hidden
          className="relative size-[46px] shrink-0 overflow-hidden rounded-[10px] bg-gradient-to-br from-[#efe6d8] via-[#e3d5c1] to-[#d6c4ab] ring-1 ring-ink/8"
        >
          {/* A cushion, drawn: corners pinched, a seam across the middle. */}
          <span className="absolute inset-[18%] rounded-[26%] bg-gradient-to-br from-white/70 to-[#c9b69a]/60" />
          <span className="absolute inset-x-[24%] top-1/2 h-px -translate-y-1/2 bg-ink/12" />
          <span className="absolute -top-1 -right-1 grid size-[17px] place-items-center rounded-full bg-ink text-[9px] font-bold text-white ring-2 ring-white">
            1
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] leading-tight font-semibold">
            Linen Throw Cushion
          </p>
          <p className="mt-0.5 text-[9.5px] text-ink/45">Sand · 45 × 45 cm</p>
        </div>
        <span className="text-[12px] font-semibold tabular-nums">₹1,299</span>
      </div>

      <p className="mt-3 px-4 text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
        Deliver to
      </p>

      {/*
        The hero's callouts point here. `animate-halo` breathes the ring rather
        than moving the block, so the emphasis reads as a highlight and never
        as a wobble.
      */}
      <div className="relative mt-1.5 px-4">
        <span
          aria-hidden
          className="absolute inset-x-3.5 -inset-y-1 animate-halo rounded-[13px] bg-brand/10 ring-[1.5px] ring-brand/50"
        />
        <div className="relative rounded-xl bg-white p-2.5">
          <div className="flex items-start gap-2">
            <MapPin
              aria-hidden
              className="mt-0.5 size-3.5 shrink-0 text-brand"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] leading-none font-semibold">
                Aditi Sharma
              </p>
              <p className="mt-1 text-[10px] leading-[1.45] text-ink/60">
                402, Sunder Residency, Linking Road
                <br />
                Bandra West · Mumbai, MH
              </p>
              <p className="mt-1 flex items-center gap-2 text-[10px] font-semibold text-ink/70 tabular-nums">
                <span className="rounded bg-ink/6 px-1 py-px">400050</span>
                <span className="inline-flex items-center gap-1 font-medium text-ink/45">
                  <Phone aria-hidden className="size-2.5" />
                  +91 98••• ••210
                </span>
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-check/18 px-2 py-1">
            <span className="grid size-3 shrink-0 place-items-center rounded-full bg-brand-check">
              <Check aria-hidden className="size-2 text-white" />
            </span>
            <span className="text-[9px] font-semibold text-ink/75">
              Pincode serviceable · Address verified
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 px-4 text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
        Payment
      </p>

      <div className="mt-1.5 space-y-1.5 px-4">
        {/*
          Prepaid, made deliberately more attractive than cash.

          Named for what it is on a real Shopify payment sheet — the method,
          not a button. "Pay now" was the label here and read as a call to
          action inside a mockup, which is exactly the thing this screen must
          not look like.
        */}
        <div className="rounded-xl border border-ink/10 bg-white p-2.5">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="size-3.5 shrink-0 rounded-full border-2 border-ink/20"
            />
            <p className="flex-1 text-[11px] font-semibold">Prepaid — UPI</p>
            <span className="rounded-full bg-brand-check/25 px-1.5 py-0.5 text-[8.5px] font-bold text-ink/75">
              Save ₹120
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 pl-6">
            <UpiMark />
            <span aria-hidden className="h-2.5 w-px bg-ink/12" />
            <VisaMark />
            <MastercardMark />
            <RupayMark />
          </div>
        </div>

        {/* Cash, carrying its true cost. */}
        <div className="rounded-xl border-[1.5px] border-brand bg-brand-soft/80 p-2.5 shadow-[0_2px_10px_-4px_var(--brand)]">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-3.5 shrink-0 place-items-center rounded-full bg-brand"
            >
              <Check className="size-2 text-white" />
            </span>
            <p className="flex-1 text-[11px] font-semibold">Cash on Delivery</p>
            <span className="text-[10px] font-semibold text-ink/60 tabular-nums">
              +₹49
            </span>
          </div>
          <p className="mt-1 pl-6 text-[9px] text-ink/50">
            Confirm by OTP after checkout
          </p>

          {/* Split payment — part now, the rest on delivery. */}
          <div className="mt-2 rounded-lg bg-white/90 p-2 ring-1 ring-brand/12">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-bold text-brand">
                ₹300 advance
              </span>
              <span className="text-[8.5px] text-ink/45 tabular-nums">
                ₹1,048 on delivery
              </span>
            </div>
            <div
              aria-hidden
              className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/10"
            >
              <div className="h-full w-[22%] rounded-full bg-gradient-to-r from-brand to-brand-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-auto px-4 pt-2.5">
        <div className="space-y-[3px] border-t border-ink/8 pt-2.5 text-[10px]">
          <div className="flex justify-between text-ink/55">
            <span>Subtotal</span>
            <span className="tabular-nums">₹1,299</span>
          </div>
          <div className="flex justify-between text-ink/55">
            <span>COD fee</span>
            <span className="tabular-nums">₹49</span>
          </div>
          <div className="flex justify-between text-ink/55">
            <span>Delivery</span>
            <span className="font-medium text-ink/70 tabular-nums">Free</span>
          </div>
          <div className="flex justify-between pt-1 font-semibold">
            <span>Total</span>
            <span className="text-[13px] tabular-nums">₹1,348</span>
          </div>
        </div>

        <div
          aria-hidden
          className="mt-2.5 mb-3.5 flex h-10 items-center justify-center gap-1 rounded-full bg-gradient-to-b from-brand to-brand-deep text-[12px] font-semibold text-white shadow-[0_6px_18px_-6px_var(--brand)]"
        >
          Complete order
          <ChevronRight className="size-3.5" />
        </div>
      </div>
    </div>
  );
}
