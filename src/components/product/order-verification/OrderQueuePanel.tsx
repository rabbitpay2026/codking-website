import { BadgeCheck, Check, PauseCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface QueuedOrder {
  readonly id: string;
  readonly total: number;
  readonly decision: "confirmed" | "held" | "cancelled";
  readonly label: string;
  readonly icon: LucideIcon;
}

/**
 * Three cash orders and the three answers they got.
 *
 * One of each, on purpose: the control publishes exactly three verbs — confirm,
 * hold, cancel — and a queue showing two confirmations and a hold would make
 * the third look like an edge case rather than one of the three things this
 * screen does.
 *
 * Example orders and nothing more — an id and a value, which is what a merchant
 * sees in their own admin. The ids run on from the one the homepage's closing
 * visual uses so no two example orders on this site share a number, and there
 * is no buyer name anywhere: a decision to cancel somebody's order is the last
 * place to invent a person to attach it to.
 */
const QUEUE: readonly QueuedOrder[] = [
  {
    id: "#1092",
    total: 1899,
    decision: "confirmed",
    label: "Confirmed",
    icon: BadgeCheck,
  },
  {
    id: "#1093",
    total: 4250,
    decision: "held",
    label: "On hold",
    icon: PauseCircle,
  },
  {
    id: "#1094",
    total: 899,
    decision: "cancelled",
    label: "Cancelled",
    icon: X,
  },
];

/**
 * How each decision is drawn.
 *
 * Only one of the three is coloured, and it is the one that means the parcel
 * ships. A queue that lit a hold in amber and a cancellation in red would put
 * two palettes on the site that exist nowhere else on it, to distinguish states
 * the words already distinguish — and it would read as an alarm rather than as
 * a decision somebody made on purpose.
 */
const decisionClass: Record<QueuedOrder["decision"], string> = {
  confirmed: "bg-brand-check/12 text-ink/70 ring-brand-check/25",
  held: "bg-ink/[0.05] text-ink/55 ring-ink/[0.1]",
  cancelled: "bg-ink/[0.03] text-ink/40 ring-ink/[0.08]",
};

/**
 * The review queue, as the merchant sees it in the dashboard.
 *
 * Three orders waiting on a decision, each with the answer it was given, and
 * one line underneath saying what happens next. That line is the argument: a
 * queue on its own is a list, and a queue that says only confirmed orders move
 * to fulfilment is a gate.
 *
 * Nothing on it is a claim. Three example order ids, three values and three
 * decisions are the contents of one screen; there is no rate, no percentage and
 * no time saved anywhere on it.
 */
export function OrderQueuePanel({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.07] bg-white p-4",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-[11px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
          <BadgeCheck className="size-4 text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[13px] leading-none font-semibold tracking-[-0.01em] text-ink">
            Orders to review
          </span>
          <span className="mt-1.5 block text-[11px] leading-none text-ink/45">
            Cash on delivery, before dispatch
          </span>
        </span>

        <span className="shrink-0 rounded-full bg-ink/[0.05] px-2 py-0.5 text-[10px] leading-[1.6] font-bold text-ink/55 tabular-nums">
          {QUEUE.length}
        </span>
      </div>

      <div aria-hidden className="mt-3.5 h-px bg-ink/[0.07]" />

      <ul className="mt-3 space-y-1.5">
        {QUEUE.map((order) => (
          <li
            key={order.id}
            className="flex items-center gap-2.5 rounded-xl bg-ink/[0.02] px-2.5 py-2"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[11.5px] leading-none font-semibold text-ink tabular-nums">
                Order {order.id}
              </span>
              <span className="mt-1.5 block text-[10px] leading-none text-ink/45 tabular-nums">
                {inr.format(order.total)}
              </span>
            </span>

            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 ring-1",
                decisionClass[order.decision],
              )}
            >
              <order.icon
                aria-hidden
                className="size-2.5"
                strokeWidth={order.decision === "cancelled" ? 3 : 2}
              />
              <span className="text-[9px] leading-none font-bold tracking-[0.04em] uppercase">
                {order.label}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div aria-hidden className="mt-3.5 h-px bg-ink/[0.07]" />

      <p className="mt-3 flex items-center gap-1.5 text-[10.5px] leading-none font-medium text-ink/45">
        <Check aria-hidden className="size-3 shrink-0 text-brand-check" />
        Only confirmed orders move to fulfilment
      </p>
    </div>
  );
}
