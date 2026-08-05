import { Check, MapPin, ShieldCheck, X } from "lucide-react";

import type { ControlSlug } from "@/types";

/**
 * Merchant-side illustrations of what each control does.
 *
 * These are drawn in markup for the same reasons as the hero screen: no image
 * weight on a page that is already carrying a device mockup, no re-export
 * cycle when the brand changes, and text that stays real text. They are
 * clearly product illustrations rather than screenshots, and are marked
 * `aria-hidden` because the panel beside them already states the same thing
 * in prose — a screen-reader user should not have to parse a fake table.
 */

const rowClass =
  "flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2.5";

function OrderQueueMock() {
  const orders = [
    { id: "#1042", value: "₹1,299", verified: true },
    { id: "#1041", value: "₹2,450", verified: true },
    { id: "#1040", value: "₹899", verified: false },
    { id: "#1039", value: "₹3,120", verified: true },
  ];

  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <div key={order.id} className={rowClass}>
          <div className="flex items-center gap-2.5">
            <span
              className={
                order.verified
                  ? "grid size-6 place-items-center rounded-full bg-brand-check/15"
                  : "grid size-6 place-items-center rounded-full bg-destructive/10"
              }
            >
              {order.verified ? (
                <Check className="size-3 text-foreground" />
              ) : (
                <X className="size-3 text-destructive" />
              )}
            </span>
            <span className="text-xs font-medium">{order.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground tabular-nums">
              {order.value}
            </span>
            <span
              className={
                order.verified
                  ? "rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-brand"
                  : "rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive"
              }
            >
              {order.verified ? "Verified" : "Blocked"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DepositMock() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">Order total</span>
          <span className="text-sm font-semibold tabular-nums">₹2,400</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/4 rounded-full bg-brand" />
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand">
            <ShieldCheck className="size-3.5" />
            Paid now (25%)
          </span>
          <span className="text-sm font-semibold text-brand tabular-nums">
            ₹600
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">
            Collected on delivery
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            ₹1,800
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-brand/20 bg-brand-soft px-4 py-3">
        <p className="text-xs text-ink/70">
          The buyer has money in the order, so the parcel gets accepted.
        </p>
      </div>
    </div>
  );
}

function RulesMock() {
  const rules = [
    { label: "Pin code 8xxxxx", value: "COD off" },
    { label: "Cart under ₹500", value: "COD off" },
    { label: "Tag: repeat-rto", value: "COD off" },
    { label: "Everyone else", value: "COD on" },
  ];

  return (
    <div className="space-y-2">
      {rules.map((rule) => {
        const off = rule.value === "COD off";

        return (
          <div key={rule.label} className={rowClass}>
            <span className="inline-flex items-center gap-2 text-xs font-medium">
              <MapPin className="size-3.5 text-muted-foreground" />
              {rule.label}
            </span>

            <span
              className={
                off
                  ? "rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive"
                  : "rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-brand"
              }
            >
              {rule.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const mocks: Partial<Record<ControlSlug, () => React.JSX.Element>> = {
  "otp-verification": OrderQueueMock,
  "partial-cod-payment": DepositMock,
  "cod-rules": RulesMock,
};

export function PreviewMock({ slug }: { readonly slug: ControlSlug }) {
  const Mock = mocks[slug];
  if (!Mock) return null;

  return (
    <div aria-hidden className="p-5">
      <Mock />
    </div>
  );
}
