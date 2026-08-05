import { Check, ShieldCheck, Smartphone } from "lucide-react";

import { StatusBar } from "@/components/sections/hero/PhoneChrome";

const ENTERED = ["4", "9", "2", "7"] as const;

/**
 * What the buyer sees when OTP Verification is on.
 *
 * The rear device in the hero, and the second beat of the story the front one
 * starts: the order has been placed, and now it has to prove it is real. This
 * is the product's main tool against fake orders (§6.2), so it is the flow
 * worth showing beside the checkout.
 */
export function OtpScreen() {
  return (
    <div className="flex size-full flex-col bg-gradient-to-b from-brand-soft via-white to-white text-ink">
      <StatusBar className="text-ink" />

      <div className="mt-4 flex flex-col items-center px-5 text-center">
        <span className="grid size-11 place-items-center rounded-2xl bg-brand shadow-lg shadow-brand/30">
          <ShieldCheck aria-hidden className="size-5 text-white" />
        </span>

        <p className="mt-3 text-[14px] leading-snug font-semibold">
          Verify your order
        </p>
        <p className="mt-1 text-[9px] leading-relaxed text-ink/55">
          Enter the code sent to
          <br />
          +91 •••••&nbsp;1989
        </p>
      </div>

      <div className="mt-4 flex gap-1.5 px-4" aria-hidden>
        {ENTERED.map((digit, index) => (
          <span
            key={`${digit}-${index}`}
            className="grid h-9 flex-1 place-items-center rounded-lg border border-brand/25 bg-white text-[13px] font-bold shadow-sm"
          >
            {digit}
          </span>
        ))}
        <span className="grid h-9 flex-1 place-items-center rounded-lg border-2 border-brand bg-white">
          <span className="block h-4 w-px bg-brand" />
        </span>
        <span className="h-9 flex-1 rounded-lg border border-ink/10 bg-white/70" />
      </div>

      <div className="mt-3 px-4">
        <div className="rounded-xl border border-ink/8 bg-white p-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] text-ink/50">Order #1042</span>
            <span className="text-[11px] font-bold tabular-nums">₹1,348</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            <Check aria-hidden className="size-2.5 text-brand-check" />
            <span className="text-[8px] text-ink/50">
              Cash on Delivery · Mumbai
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-check/12 px-2.5 py-1.5">
          <Smartphone aria-hidden className="size-2.5 text-ink/60" />
          <span className="text-[8px] font-medium text-ink/65">
            Delivered over WhatsApp
          </span>
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="grid h-9 place-items-center rounded-full bg-brand text-[11px] font-semibold text-white">
          Verify &amp; confirm
        </div>
        <p className="mt-2 text-center text-[8px] text-ink/40">
          Resend code in 0:24
        </p>
      </div>
    </div>
  );
}
