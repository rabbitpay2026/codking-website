import { BadgeCheck, Check, PauseCircle, Truck, X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface DecidedOrder {
  readonly id: string;
  readonly total: number;
  readonly decision: "confirmed" | "held" | "cancelled";
  readonly label: string;
  readonly icon: LucideIcon;
}

/**
 * The order waiting on an answer, and the three already given.
 *
 * The queue used to be three decided orders, which showed the record of the
 * decisions but not the decision — and this control *is* the decision. So the
 * top row is now undecided and carries the three buttons, and the rows below
 * it are what happens after each of them is pressed. A merchant reads the
 * mechanism off the panel without a caption explaining it.
 *
 * Nothing on it is a claim. Example order ids, example values and three
 * decisions are the contents of one screen; there is no rate, no percentage
 * and no time saved anywhere on it.
 */
const PENDING = { id: "#1092", total: 1999 } as const;

const DECIDED: readonly DecidedOrder[] = [
  {
    id: "#1091",
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
const decisionClass: Record<DecidedOrder["decision"], string> = {
  confirmed: "bg-brand-check/12 text-ink/70 ring-brand-check/25",
  held: "bg-ink/[0.05] text-ink/55 ring-ink/[0.1]",
  cancelled: "bg-ink/[0.03] text-ink/40 ring-ink/[0.08]",
};

/**
 * One of the three answers, drawn as the control it is.
 *
 * These are the only button-shaped things in any product scene on the site,
 * and they are button-shaped because the point of this control is that a
 * person presses one. Confirm is filled because it is the answer that moves
 * the parcel; the other two are outlined, because a scene that drew cancel as
 * loudly as confirm would be describing a different product.
 */
function DecisionButton({
  icon: Icon,
  label,
  primary = false,
}: {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly primary?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] leading-none font-semibold",
        primary
          ? "bg-ink text-white shadow-[0_1px_2px_rgba(11,27,54,0.2)]"
          : "border border-ink/[0.12] bg-white text-ink/60",
      )}
    >
      <Icon
        aria-hidden
        className="size-3 shrink-0"
        strokeWidth={primary ? 2.6 : 2}
      />
      {label}
    </span>
  );
}

/**
 * The review queue, as the merchant sees it in the dashboard.
 *
 * One order waiting on a decision with the three answers under it, the orders
 * already answered beneath, and one line saying what happens next. That line
 * is the argument: a queue on its own is a list, and a queue that says only
 * confirmed orders move to fulfilment is a gate.
 */
export function OrderQueuePanel({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.07] bg-white p-4 sm:p-5",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
          <BadgeCheck className="size-[18px] text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[14px] leading-none font-semibold tracking-[-0.01em] text-ink">
            Orders to review
          </span>
          <span className="mt-1.5 block text-[11.5px] leading-none text-ink/45">
            Cash on delivery, before dispatch
          </span>
        </span>

        <span className="shrink-0 rounded-full bg-ink/[0.05] px-2.5 py-1 text-[11px] leading-none font-bold text-ink/55 tabular-nums">
          {DECIDED.length + 1}
        </span>
      </div>

      {/* The order that has not been answered yet. */}
      <div className="mt-4 rounded-xl border border-brand/25 bg-brand/[0.04] p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0">
            <span className="block text-[13px] leading-none font-semibold text-ink tabular-nums">
              Order {PENDING.id}
            </span>
            <span className="mt-1.5 block text-[11.5px] leading-none text-ink/50 tabular-nums">
              {inr.format(PENDING.total)} · Cash on Delivery
            </span>
          </span>

          <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] leading-none font-bold tracking-[0.05em] text-brand uppercase ring-1 ring-brand/20">
            Awaiting
          </span>
        </div>

        <div aria-hidden className="mt-3 flex gap-1.5">
          <DecisionButton icon={Check} label="Confirm" primary />
          <DecisionButton icon={PauseCircle} label="Hold" />
          <DecisionButton icon={X} label="Cancel" />
        </div>
      </div>

      <ul className="mt-2.5 space-y-1.5">
        {DECIDED.map((order) => (
          <li
            key={order.id}
            className="flex items-center gap-2.5 rounded-xl bg-ink/[0.02] px-3 py-2.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] leading-none font-semibold text-ink/80 tabular-nums">
                Order {order.id}
              </span>
              <span className="mt-1.5 block text-[11px] leading-none text-ink/45 tabular-nums">
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
              <span className="text-[10px] leading-none font-bold tracking-[0.04em] uppercase">
                {order.label}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div aria-hidden className="mt-4 h-px bg-ink/[0.07]" />

      <p className="mt-3 flex items-center gap-2 text-[11.5px] leading-none font-medium text-ink/50">
        <Truck aria-hidden className="size-3.5 shrink-0 text-brand-check" />
        Only confirmed orders move to fulfilment
      </p>
    </div>
  );
}
