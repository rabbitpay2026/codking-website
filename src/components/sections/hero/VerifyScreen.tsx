import { BadgeCheck, Check, PackageCheck } from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { StatusBar } from "@/components/sections/hero/PhoneChrome";

const CODE = ["4", "9", "2", "7"] as const;

/**
 * The verification the buyer completes after checkout.
 *
 * The rear device, and the second beat of the story the front one begins: the
 * order has been placed, and now it has to prove it is real. The WhatsApp
 * message arriving above the code entry makes the mechanism obvious without a
 * caption — the buyer's own phone is the second factor — and the approved
 * order underneath is the part a merchant actually cares about, so it is shown
 * rather than implied.
 *
 * Deliberately a different kind of screen from the checkout: one channel, one
 * task, one outcome, rather than a dense form. Two devices showing two
 * variations of the same layout would be repetition; two devices showing two
 * moments is a story.
 */
export function VerifyScreen() {
  return (
    <div className="flex size-full flex-col bg-gradient-to-b from-brand-soft via-white to-white text-ink">
      <StatusBar className="text-ink" />

      <div className="mt-3 flex items-center gap-2 px-3.5">
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-full bg-[#25D366]/15"
        >
          <WhatsappMark className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11px] leading-tight font-semibold">
            Aurelia Living
          </p>
          <p className="text-[8.5px] text-ink/45">WhatsApp · now</p>
        </div>
      </div>

      {/* The message itself. */}
      <div className="mt-2.5 px-3.5">
        <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white p-2.5 shadow-[0_2px_10px_rgba(20,16,58,0.09)]">
          <p className="text-[10px] leading-relaxed text-ink/75">
            Code for order <span className="font-semibold text-ink">#1042</span>
          </p>
          <p className="mt-1 text-[17px] leading-none font-bold tracking-[0.2em] tabular-nums">
            4927
          </p>
          <p className="mt-1.5 text-[8px] text-ink/40">Do not share this.</p>
        </div>
      </div>

      <div className="mt-3 px-3.5 text-center">
        <span
          aria-hidden
          className="inline-grid size-8 place-items-center rounded-xl bg-gradient-to-b from-brand to-brand-deep shadow-[0_8px_20px_-8px_var(--brand)]"
        >
          <BadgeCheck className="size-4 text-white" />
        </span>
        <p className="mt-1.5 text-[12.5px] leading-none font-semibold">
          Confirm your order
        </p>
        <p className="mt-1.5 text-[9px] leading-none text-ink/50">
          Enter the code we just sent
        </p>
      </div>

      {/* Code entry, all four accepted. */}
      <div className="mt-2.5 flex gap-1.5 px-3.5" aria-hidden>
        {CODE.map((digit, index) => (
          <span
            key={`${digit}-${index}`}
            className="grid h-10 flex-1 place-items-center rounded-[11px] border-[1.5px] border-brand bg-white text-[16px] font-bold tabular-nums shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_12%,transparent)]"
          >
            {digit}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex justify-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-check/20 px-2 py-0.5 text-[8.5px] font-bold text-ink/75">
          <Check aria-hidden className="size-2.5" />
          Verified in 8s
        </span>
      </div>

      {/* The outcome the merchant cares about. */}
      <div className="mt-auto px-3.5 pb-3">
        <div className="rounded-xl border border-ink/8 bg-white p-2.5 shadow-[0_2px_10px_rgba(20,16,58,0.05)]">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] text-ink/50">Order #1042</span>
            <span className="text-[12px] font-bold tabular-nums">₹1,348</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <PackageCheck aria-hidden className="size-3 text-brand" />
            <span className="text-[8.5px] text-ink/55">
              Cash on Delivery · Mumbai 400050
            </span>
          </div>
        </div>

        <div
          aria-hidden
          className="mt-2.5 flex h-9 items-center justify-center gap-1.5 rounded-full bg-brand-check/20 text-[11px] font-bold text-ink/80"
        >
          <Check className="size-3.5" />
          Order approved for dispatch
        </div>
        <p className="mt-2 text-center text-[8px] text-ink/40 tabular-nums">
          Unverified orders are held · Resend in 0:24
        </p>
      </div>
    </div>
  );
}
