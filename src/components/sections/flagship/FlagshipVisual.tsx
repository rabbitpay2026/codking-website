import { Ban, Check, ShieldCheck, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ControlSlug } from "@/types";

/**
 * The chrome every flagship visual sits in.
 *
 * A single frame shared by all three, so the section reads as three views of
 * one product rather than three unrelated illustrations.
 */
function Frame({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="surface-card overflow-hidden">
      <div
        aria-hidden
        className="flex items-center gap-2 border-b border-border bg-cloud px-4 py-3"
      >
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 text-[11px] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

const RULES = [
  { condition: "Pincode in high-RTO list", action: "Hide COD", blocked: true },
  { condition: "Cart value under ₹499", action: "Hide COD", blocked: true },
  {
    condition: "Customer tag: repeat-return",
    action: "Hide COD",
    blocked: true,
  },
  { condition: "Everything else", action: "COD + ₹49 fee", blocked: false },
];

/** COD Rules — a rule list, because that is literally what the merchant builds. */
function RulesVisual() {
  return (
    <Frame label="COD rules">
      <ul className="space-y-2">
        {RULES.map((rule) => (
          <li
            key={rule.condition}
            className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
          >
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-lg",
                rule.blocked
                  ? "bg-destructive/10 text-destructive"
                  : "bg-brand-check/20 text-ink/70",
              )}
            >
              {rule.blocked ? (
                <Ban aria-hidden className="size-3" />
              ) : (
                <Check aria-hidden className="size-3" />
              )}
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
              {rule.condition}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                rule.blocked
                  ? "bg-destructive/8 text-destructive"
                  : "bg-brand/10 text-brand",
              )}
            >
              {rule.action}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** OTP Verification — one order moving from placed to confirmed. */
function VerificationVisual() {
  return (
    <Frame label="Order #1042">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
        <div>
          <p className="text-[13px] font-semibold">Aditi Sharma</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
            +91 98••• ••210 · ₹1,348
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-check/20 px-2.5 py-1 text-[11px] font-semibold text-ink/75">
          <ShieldCheck aria-hidden className="size-3" />
          Verified
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {["4", "9", "2", "7"].map((digit, index) => (
          <span
            key={`${digit}-${index}`}
            aria-hidden
            className="grid h-11 flex-1 place-items-center rounded-xl border border-brand/25 bg-brand-soft/60 text-lg font-bold tabular-nums"
          >
            {digit}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Confirmed over WhatsApp in 8 seconds. Unconfirmed orders never reach
        dispatch.
      </p>
    </Frame>
  );
}

/** Prepaid Nudge — the choice as the buyer sees it, priced. */
function PrepaidVisual() {
  return (
    <Frame label="Checkout">
      <div className="space-y-2.5">
        <div className="rounded-xl border-2 border-brand bg-brand-soft/60 p-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
              <Sparkles aria-hidden className="size-3.5 text-brand" />
              Pay now
            </span>
            <span className="text-lg font-bold tabular-nums">₹1,179</span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-brand">
            ₹120 off applied automatically
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-muted-foreground">
              Cash on delivery
            </span>
            <span className="text-lg font-semibold text-muted-foreground tabular-nums">
              ₹1,348
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Includes ₹49 handling fee
          </p>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        A ₹169 gap, shown at the moment of choice.
      </p>
    </Frame>
  );
}

const visuals: Partial<Record<ControlSlug, () => React.ReactElement>> = {
  "cod-rules": RulesVisual,
  "otp-verification": VerificationVisual,
  "prepaid-nudge": PrepaidVisual,
};

/**
 * The product surface for one flagship capability.
 *
 * Drawn in markup rather than screenshotted, so each stays sharp, re-tints
 * with the brand, and costs no image weight. Returns `null` for a control
 * with no visual, so adding a flagship without art degrades to copy rather
 * than to a broken frame.
 */
export function FlagshipVisual({ slug }: { readonly slug: ControlSlug }) {
  const Visual = visuals[slug];
  return Visual ? <Visual /> : null;
}
