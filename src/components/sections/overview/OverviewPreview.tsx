import { Ban, Check, IndianRupee, X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ControlSlug } from "@/types";

/**
 * The compact stills used by the product overview.
 *
 * Deliberately *not* the animated demonstrations from `flagship/`, and not the
 * merchant-side mocks from `preview/`. This page now shows each flagship
 * control three times, and the only way three appearances earn their place is
 * if each one does a different job: here it is the outcome in three lines,
 * below it is the mechanism running, and further down it is the admin surface
 * the merchant works in. Reprinting either of the other two here would make
 * this a repeat rather than an overview.
 *
 * Built from exactly the primitives the rest of the page already uses — the
 * bordered row, the brand chip, tabular figures — so nothing new enters the
 * visual language. Every still is three rows tall, so the three cards in the
 * grid align on the same baselines.
 *
 * Marked `aria-hidden` by the caller: the card beside each still already says
 * the same thing in prose, and a screen-reader user should not have to parse a
 * decorative table.
 */

/** The shared row. One definition, so the three stills cannot drift apart. */
const row =
  "flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-2.5 py-[7px]";

const chip = "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold";

/** COD Rules — a condition and the action it triggers. */
function RulesStill() {
  const rules = [
    { when: "Pincode 800001", action: "Hide COD", blocked: true },
    { when: "Cart under ₹499", action: "Hide COD", blocked: true },
    { when: "Every other order", action: "COD + ₹49", blocked: false },
  ];

  return (
    <div className="space-y-1.5">
      {rules.map((rule) => (
        <div key={rule.when} className={row}>
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded",
                rule.blocked
                  ? "bg-destructive/10 text-destructive"
                  : "bg-brand/10 text-brand",
              )}
            >
              {rule.blocked ? (
                <Ban className="size-2.5" />
              ) : (
                <IndianRupee className="size-2.5" />
              )}
            </span>
            <span className="truncate text-[11.5px] font-medium">
              {rule.when}
            </span>
          </span>

          <span
            className={cn(
              chip,
              rule.blocked
                ? "bg-destructive/8 text-destructive"
                : "bg-brand/10 text-brand",
            )}
          >
            {rule.action}
          </span>
        </div>
      ))}
    </div>
  );
}

/** COD to Prepaid — the two prices, and the gap between them. */
function PrepaidStill() {
  return (
    <div className="space-y-1.5">
      <div className={cn(row, "border-brand bg-brand-soft/60")}>
        <span className="text-[11.5px] font-semibold">Pay now</span>
        <span className="flex items-baseline gap-1.5">
          <span className="text-[10px] text-muted-foreground tabular-nums line-through">
            ₹1,348
          </span>
          <span className="text-[12px] font-bold tabular-nums">₹1,179</span>
        </span>
      </div>

      <div className={row}>
        <span className="text-[11.5px] font-medium text-muted-foreground">
          Cash on delivery
        </span>
        <span className="text-[12px] font-semibold text-muted-foreground tabular-nums">
          ₹1,348
        </span>
      </div>

      {/*
        A full row rather than a bare line. The three stills are bottom-anchored
        in their cards, so one of them being a row-height shorter than the
        others leaves its panel starting lower than its neighbours' — which
        reads as a misaligned grid, not as a smaller card.
      */}
      <div className={cn(row, "border-dashed")}>
        <span className="truncate text-[11.5px] text-muted-foreground">
          At the moment of choice
        </span>
        <span className={cn(chip, "bg-brand-check/25 text-ink/80")}>
          ₹169 cheaper
        </span>
      </div>
    </div>
  );
}

/** OTP Verification — the queue, already sorted into real and not. */
function VerificationStill() {
  const orders = [
    { id: "#1042", value: "₹1,299", verified: true },
    { id: "#1041", value: "₹2,450", verified: true },
    { id: "#1040", value: "₹899", verified: false },
  ];

  return (
    <div className="space-y-1.5">
      {orders.map((order) => (
        <div key={order.id} className={row}>
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full",
                order.verified
                  ? "bg-brand-check/25 text-ink/70"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {order.verified ? (
                <Check className="size-2.5" />
              ) : (
                <X className="size-2.5" />
              )}
            </span>
            <span className="text-[11.5px] font-medium tabular-nums">
              {order.id}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {order.value}
            </span>
            <span
              className={cn(
                chip,
                order.verified
                  ? "bg-brand-check/25 text-ink/80"
                  : "bg-destructive/8 text-destructive",
              )}
            >
              {order.verified ? "Verified" : "Held"}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

const stills: Partial<Record<ControlSlug, () => React.ReactElement>> = {
  "cod-rules": RulesStill,
  "prepaid-nudge": PrepaidStill,
  "otp-verification": VerificationStill,
};

/**
 * The still for one flagship control, or `null` where none exists — so
 * promoting a fourth control to flagship degrades to copy rather than to an
 * empty panel.
 */
export function OverviewPreview({ slug }: { readonly slug: ControlSlug }) {
  const Still = stills[slug];
  return Still ? <Still /> : null;
}
