import { Check, ShieldCheck } from "lucide-react";

/** The digits already entered, plus the position of the caret. */
const ENTERED = ["4", "9", "2", "7"] as const;
const REMAINING = 2;

/**
 * What the buyer sees when OTP Verification is on.
 *
 * Built as markup rather than shipped as a screenshot: it stays sharp at any
 * pixel density, follows the design tokens so it re-brands with everything
 * else, adds no image bytes to the largest element on the page, and its text
 * is real text — selectable, translatable, and legible to a screen reader.
 *
 * It illustrates the product's main tool against fake orders (§6.2), which is
 * the exact problem the headline beside it names.
 */
export function OtpScreen() {
  return (
    <div className="flex size-full flex-col bg-gradient-to-b from-brand-soft to-background px-5 pt-10 pb-6">
      <div className="flex items-center gap-1.5">
        <span className="grid size-5 place-items-center rounded-md bg-brand">
          <ShieldCheck aria-hidden className="size-3 text-white" />
        </span>
        <span className="text-[11px] font-semibold text-ink">COD King</span>
      </div>

      <div className="mt-6">
        <p className="text-[15px] leading-snug font-semibold text-ink">
          Verify your order
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-ink/55">
          We sent a 6-digit code to +91 •••••1989
        </p>
      </div>

      <div className="mt-5 flex gap-1.5" aria-hidden>
        {ENTERED.map((digit, index) => (
          <span
            key={`${digit}-${index}`}
            className="grid h-9 flex-1 place-items-center rounded-lg border border-brand/25 bg-white text-[13px] font-semibold text-ink"
          >
            {digit}
          </span>
        ))}
        <span className="grid h-9 flex-1 place-items-center rounded-lg border-2 border-brand bg-white">
          <span className="block h-4 w-px bg-brand" />
        </span>
        {Array.from({ length: REMAINING - 1 }, (_, index) => (
          <span
            key={`empty-${index}`}
            className="h-9 flex-1 rounded-lg border border-ink/10 bg-white/70"
          />
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-ink/8 bg-white/80 p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] text-ink/55">Order #1042</span>
          <span className="text-[12px] font-semibold text-ink">₹1,299</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <Check aria-hidden className="size-3 text-brand-check" />
          <span className="text-[9px] text-ink/55">
            Cash on Delivery · Mumbai 400001
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="grid h-9 place-items-center rounded-full bg-brand text-[12px] font-semibold text-white">
          Verify &amp; confirm
        </div>
        <p className="mt-2 text-center text-[9px] text-ink/40">
          Resend code in 0:24
        </p>
      </div>
    </div>
  );
}
