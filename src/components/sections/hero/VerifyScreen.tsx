import { Check, MessageCircle, ShieldCheck } from "lucide-react";

import { StatusBar } from "@/components/sections/hero/PhoneChrome";

const CODE = ["4", "9", "2", "7"] as const;

/**
 * The verification the buyer completes after checkout.
 *
 * The rear device, and the second beat of the story the front one begins:
 * the order has been placed, and now it has to prove it is real. Showing the
 * WhatsApp message arriving above the code entry makes the mechanism obvious
 * without a caption — the buyer's own phone is the second factor.
 *
 * Deliberately a different kind of screen from the checkout: a message thread
 * and a single task, rather than a dense form. Two devices showing two
 * variations of the same layout would be repetition; two devices showing two
 * moments is a story.
 */
export function VerifyScreen() {
  return (
    <div className="flex size-full flex-col bg-gradient-to-b from-brand-soft via-white to-white text-ink">
      <StatusBar className="text-ink" />

      <div className="mt-3 flex items-center gap-2 px-4">
        <span className="grid size-7 place-items-center rounded-full bg-brand-check/20">
          <MessageCircle aria-hidden className="size-3.5 text-ink/70" />
        </span>
        <div className="min-w-0">
          <p className="text-[10.5px] leading-tight font-semibold">
            Aurelia Living
          </p>
          <p className="text-[8.5px] text-ink/45">WhatsApp · now</p>
        </div>
      </div>

      {/* The message itself. */}
      <div className="mt-2.5 px-4">
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white p-2.5 shadow-[0_2px_10px_rgba(20,16,58,0.08)]">
          <p className="text-[9.5px] leading-relaxed text-ink/75">
            Your code for order{" "}
            <span className="font-semibold text-ink">#1042</span> is
          </p>
          <p className="mt-1 text-[15px] font-bold tracking-[0.22em] tabular-nums">
            4927
          </p>
          <p className="mt-1 text-[8px] text-ink/40">
            Do not share this code with anyone.
          </p>
        </div>
      </div>

      <div className="mt-5 px-4 text-center">
        <span className="inline-grid size-10 place-items-center rounded-2xl bg-brand shadow-[0_8px_20px_-8px_var(--brand)]">
          <ShieldCheck aria-hidden className="size-5 text-white" />
        </span>
        <p className="mt-2.5 text-[13px] leading-snug font-semibold">
          Confirm your order
        </p>
        <p className="mt-1 text-[9px] leading-relaxed text-ink/50">
          Enter the code we just sent you
        </p>
      </div>

      {/* Code entry, three filled and one active. */}
      <div className="mt-3.5 flex gap-2 px-5" aria-hidden>
        {CODE.map((digit, index) => (
          <span
            key={`${digit}-${index}`}
            className={
              index < 3
                ? "grid h-10 flex-1 place-items-center rounded-xl border border-brand/30 bg-white text-[15px] font-bold shadow-sm"
                : "grid h-10 flex-1 place-items-center rounded-xl border-2 border-brand bg-white text-[15px] font-bold shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_14%,transparent)]"
            }
          >
            {digit}
          </span>
        ))}
      </div>

      <div className="mt-4 px-4">
        <div className="rounded-xl border border-ink/8 bg-white p-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] text-ink/50">Order #1042</span>
            <span className="text-[11px] font-bold tabular-nums">₹1,348</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="grid size-3 place-items-center rounded-full bg-brand-check/30">
              <Check aria-hidden className="size-2 text-ink/70" />
            </span>
            <span className="text-[8.5px] text-ink/50">
              Cash on Delivery · Mumbai 400050
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="grid h-9 place-items-center rounded-full bg-brand text-[11px] font-semibold text-white shadow-[0_6px_16px_-6px_var(--brand)]">
          Verify order
        </div>
        <p className="mt-2 text-center text-[8px] text-ink/40 tabular-nums">
          Resend in 0:24
        </p>
      </div>
    </div>
  );
}
