import { BadgePercent, CircleCheck, ExternalLink, Lock } from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The order the two artefacts are about.
 *
 * One object, so the banner and the message cannot disagree: the discount and
 * the prepaid total are derived from the cart rather than typed twice. The
 * rate is a *configured example* — the product's own copy says the prepaid
 * discount is a percentage or a fixed value and is fully configurable — so
 * this is one merchant's setting rather than a default being advertised, and
 * it is the same setting the hero panel on this page shows.
 */
const ORDER = {
  id: "#1042",
  store: "Aurelia Living",
  total: 1299,
  discountRate: 0.1,
} as const;

const DISCOUNT = Math.round(ORDER.total * ORDER.discountRate);
const PREPAID_TOTAL = ORDER.total - DISCOUNT;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * What the buyer is shown after a cash-on-delivery order is placed.
 *
 * Two artefacts, stacked, because they are the two the product actually sends
 * and a merchant asking "what does this look like on my store" is asking about
 * both. The banner is what appears on the Thank You and Order Status pages the
 * moment the order goes through; the WhatsApp message is the reminder that
 * carries the payment link afterwards. Neither is a benefit statement — they
 * are the surfaces themselves.
 *
 * This replaces a video the review flagged as wrong. The demo registry has no
 * recording of its own for this control, so the section had been falling back
 * to the site's general demo — a real video, but one that shows something
 * else, which is worse than none in a section headed "see this in action".
 * Drawing the two surfaces answers the question the recording was supposed to.
 *
 * Static, and a server component. The panel in the hero of this page already
 * runs the conversion end to end; a second animation halfway down the page
 * competes with it and buys nothing, because these two artefacts are things to
 * be *read* rather than sequences to be watched.
 *
 * Drawn in markup rather than screenshotted: sharp at any density, themed by
 * the same tokens as the rest of the site, no image bytes, and its text is
 * genuinely text — including the discount, which is therefore impossible to
 * leave stale in one place and current in another.
 */
export function CodToPrepaidNudgePreview({ className }: WithClassName) {
  return (
    <div
      role="img"
      aria-label={`What a buyer sees after placing a cash-on-delivery order: a banner on the order confirmation page offering ${inr.format(DISCOUNT)} off for paying online, and a WhatsApp message carrying a secure payment link for ${inr.format(PREPAID_TOTAL)}.`}
      className={cn("flex flex-col gap-4", className)}
    >
      {/* ── The banner, on the order confirmation page ─────────────────── */}
      <figure className="m-0">
        <figcaption className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-ink/40 uppercase">
          On the Thank You &amp; Order Status page
        </figcaption>

        <div className="overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.4)]">
          {/* The store's own confirmation, so the banner is seen in the place
              it actually appears rather than floating on its own. */}
          <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
            <CircleCheck
              aria-hidden
              className="size-[18px] shrink-0 text-brand-check"
              strokeWidth={1.9}
            />
            <p className="min-w-0 flex-1 truncate text-[13px] leading-none font-semibold text-ink">
              Thank you, your order {ORDER.id} is confirmed
            </p>
          </div>

          <div className="px-4 py-4">
            <div className="rounded-xl border border-brand/25 bg-brand/[0.06] p-3.5">
              <div className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-brand ring-1 ring-brand/20 ring-inset"
                >
                  <BadgePercent className="size-4" strokeWidth={1.9} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-tight font-semibold text-ink">
                    Pay online now and save {inr.format(DISCOUNT)}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/55">
                    Switch this cash-on-delivery order to online payment and pay{" "}
                    <span className="font-semibold text-ink tabular-nums">
                      {inr.format(PREPAID_TOTAL)}
                    </span>{" "}
                    instead of{" "}
                    <span className="tabular-nums line-through">
                      {inr.format(ORDER.total)}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-8 items-center rounded-lg bg-brand px-3 text-[12px] font-semibold text-white">
                  Pay {inr.format(PREPAID_TOTAL)} now
                </span>
                <span className="text-[11px] font-medium text-ink/45">
                  Keep cash on delivery
                </span>
              </div>
            </div>

            {/* Whose banner this is, and what wrote it. The wording on it is
                the merchant's own — the pop-up copy is a setting. */}
            <p className="mt-3 flex items-center gap-1.5 text-[10px] leading-none font-medium text-ink/35">
              <Lock aria-hidden className="size-3" />
              Wording, discount and conditions set in {siteConfig.name}
            </p>
          </div>
        </div>
      </figure>

      {/* ── The reminder, on WhatsApp ──────────────────────────────────── */}
      <figure className="m-0">
        <figcaption className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-ink/40 uppercase">
          The reminder, on WhatsApp or SMS
        </figcaption>

        <div className="rounded-[1.25rem] border border-border bg-card p-4 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.4)]">
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#25D366]/12"
            >
              <WhatsappMark className="size-[18px]" />
            </span>

            <div className="min-w-0 flex-1 rounded-[16px] rounded-tl-[6px] border border-ink/6 bg-white px-3 py-2.5 shadow-[0_1px_4px_rgba(11,27,54,0.07)]">
              <p className="text-[11px] leading-none font-semibold text-ink/70">
                {ORDER.store}
              </p>

              <p className="mt-2 text-[12px] leading-[1.6] text-ink/75">
                Hi Aditi, your order {ORDER.id} is confirmed for cash on
                delivery. Pay online now and get {inr.format(DISCOUNT)} off —
                you pay {inr.format(PREPAID_TOTAL)} instead of{" "}
                {inr.format(ORDER.total)}.
              </p>

              <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-brand/25 bg-brand/[0.06] px-2.5 py-1.5 text-[11.5px] font-semibold text-brand">
                <ExternalLink aria-hidden className="size-3" />
                Pay {inr.format(PREPAID_TOTAL)} securely
              </span>

              <p className="mt-2 text-[9.5px] leading-none font-medium text-ink/35">
                Secure payment link
              </p>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}
