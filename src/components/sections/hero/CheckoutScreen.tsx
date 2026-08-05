import { Check, ChevronRight, MapPin, Tag } from "lucide-react";

import { StatusBar } from "@/components/sections/hero/PhoneChrome";

/**
 * The buyer's checkout, with COD King's controls in place.
 *
 * This is the front device in the hero and it carries most of the product
 * story in one glance: a COD fee on the cash option, a prepaid discount
 * nudging against it, and a partial payment splitting the total. Those are
 * three of the ten controls doing their job in the surface a merchant already
 * recognises — which argues the product far better than a feature list.
 *
 * Drawn in markup, so it stays sharp at any density, re-tints with the brand,
 * and adds no image weight to the largest element on the page.
 */
export function CheckoutScreen() {
  return (
    <div className="flex size-full flex-col bg-white text-ink">
      <StatusBar className="text-ink" />

      <div className="mt-2 flex items-center justify-between px-4">
        <span className="text-[13px] font-semibold">Checkout</span>
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[9px] font-semibold text-brand">
          Secure
        </span>
      </div>

      <div className="mt-3 space-y-2 px-4">
        <div className="flex items-center gap-2.5 rounded-xl border border-ink/8 bg-ink/[0.02] p-2.5">
          <span className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-brand to-brand-accent" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold">
              Wireless Pro Headphones
            </p>
            <p className="text-[9px] text-ink/50">Midnight · Qty 1</p>
          </div>
          <span className="text-[11px] font-semibold tabular-nums">₹1,299</span>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-ink/8 p-2.5">
          <MapPin className="mt-0.5 size-3 shrink-0 text-ink/40" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold">Aditi Sharma</p>
            <p className="truncate text-[9px] leading-relaxed text-ink/50">
              14 Linking Road, Bandra West, Mumbai 400050
            </p>
          </div>
          <span className="rounded-full bg-brand-check/15 px-1.5 py-0.5 text-[8px] font-semibold text-ink/70">
            Prefilled
          </span>
        </div>
      </div>

      <p className="mt-4 px-4 text-[9px] font-semibold tracking-[0.08em] text-ink/40 uppercase">
        Payment
      </p>

      <div className="mt-1.5 space-y-1.5 px-4">
        <div className="flex items-center gap-2.5 rounded-xl border border-ink/8 p-2.5">
          <span className="size-3.5 rounded-full border-2 border-ink/20" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold">Pay online</p>
            <p className="text-[8px] text-ink/45">UPI · Cards · Netbanking</p>
          </div>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-check/20 px-1.5 py-0.5 text-[8px] font-bold text-ink/75">
            <Tag className="size-2" />
            Save ₹100
          </span>
        </div>

        <div className="rounded-xl border-2 border-brand bg-brand-soft/60 p-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-brand">
              <Check className="size-2 text-white" />
            </span>
            <p className="flex-1 text-[10px] font-semibold">Cash on Delivery</p>
            <span className="text-[9px] font-semibold text-ink/55 tabular-nums">
              +₹49 fee
            </span>
          </div>

          <div className="mt-2 rounded-lg bg-white/80 p-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold text-brand">
                Pay ₹300 now
              </span>
              <span className="text-[8px] text-ink/45">
                Balance on delivery
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/10">
              <div className="h-full w-[23%] rounded-full bg-brand" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-ink/8 px-4 pt-2.5 pb-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[9px] text-ink/50">Total</span>
          <span className="text-[13px] font-bold tabular-nums">₹1,348</span>
        </div>

        <div className="mt-2 flex h-9 items-center justify-center gap-1 rounded-full bg-brand text-[11px] font-semibold text-white">
          Place order
          <ChevronRight className="size-3" />
        </div>
      </div>
    </div>
  );
}
