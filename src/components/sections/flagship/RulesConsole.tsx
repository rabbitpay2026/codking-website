"use client";

import { motion } from "motion/react";
import { Ban, CornerDownRight, IndianRupee, ShoppingBag } from "lucide-react";

import { DemoFrame, LiveDot } from "@/components/sections/flagship/DemoFrame";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { cn } from "@/lib/utils";

type Verdict = "hidden" | "fee";

interface Rule {
  readonly id: string;
  readonly when: string;
  readonly action: string;
  readonly verdict: Verdict;
}

/**
 * The rules exactly as a merchant would order them in the app: first match
 * wins, and the last rule is the catch-all. Showing the catch-all is what
 * makes the list read as a complete policy rather than as three examples.
 */
const RULES: readonly Rule[] = [
  {
    id: "pincode",
    when: "Pincode is in the high-RTO list",
    action: "Hide COD",
    verdict: "hidden",
  },
  {
    id: "cart-low",
    when: "Cart under ₹499",
    action: "Hide COD",
    verdict: "hidden",
  },
  {
    id: "tag",
    when: "Customer tagged repeat-rto",
    action: "Hide COD",
    verdict: "hidden",
  },
  {
    id: "cart-high",
    when: "Cart over ₹5,000",
    action: "COD + ₹99",
    verdict: "fee",
  },
  {
    id: "default",
    when: "Every other order",
    action: "COD + ₹49",
    verdict: "fee",
  },
];

/** One incoming order per rule, so every branch of the policy is shown firing. */
const ORDERS = [
  { id: "o1", who: "Patna · 800001", value: "₹1,299" },
  { id: "o2", who: "Jaipur · 302001", value: "₹380" },
  { id: "o3", who: "Aditya M. · repeat-rto", value: "₹2,140" },
  { id: "o4", who: "Bengaluru · 560001", value: "₹6,400" },
  { id: "o5", who: "Mumbai · 400050", value: "₹1,299" },
] as const;

/**
 * COD Rules, demonstrated rather than described.
 *
 * The merchant's question about this control is never "can you filter orders"
 * — it is "what happens to *my* orders". So the panel does not list
 * capabilities: it runs the policy. An order arrives, the rule that catches it
 * lights up, and the checkout underneath changes accordingly. Watch it twice
 * and you understand first-match-wins without a sentence of explanation.
 *
 * The highlight is a single element moved between rows with a shared layout
 * id, so it travels down the list the way an evaluator would rather than
 * blinking on and off in place. Motion that traces the mechanism is the only
 * kind this page uses.
 */
export function RulesConsole() {
  const { ref, step } = useStepCycle<HTMLDivElement>(ORDERS.length, 2300);

  const order = ORDERS[step] ?? ORDERS[0];
  const rule = RULES[step] ?? RULES[RULES.length - 1];
  const hidden = rule.verdict === "hidden";

  return (
    <div ref={ref}>
      <DemoFrame
        label="COD rules"
        status={<LiveDot label="Live" />}
        bodyClassName="p-3.5 sm:p-4"
      >
        {/* The order being evaluated. */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-cloud px-3 py-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-background text-muted-foreground shadow-card">
            <ShoppingBag aria-hidden className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground/70 uppercase">
              Incoming order
            </p>
            <motion.p
              key={order.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-0.5 truncate text-[13px] font-semibold"
            >
              {order.who}
            </motion.p>
          </div>
          <span className="shrink-0 text-[13px] font-semibold tabular-nums">
            {order.value}
          </span>
        </div>

        <p className="mt-3 mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground/70 uppercase">
          <CornerDownRight aria-hidden className="size-3" />
          First rule that matches wins
        </p>

        <ul className="space-y-1.5">
          {RULES.map((entry, index) => {
            const active = index === step;

            return (
              <li key={entry.id} className="relative">
                {active ? (
                  <motion.span
                    layoutId="cod-rule-highlight"
                    aria-hidden
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                    className="absolute inset-0 rounded-xl bg-brand/8 ring-[1.5px] ring-brand"
                  />
                ) : null}

                <div
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors duration-300",
                    active
                      ? "border-transparent"
                      : "border-border bg-background",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-md transition-colors duration-300",
                      entry.verdict === "hidden"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-brand/10 text-brand",
                    )}
                  >
                    {entry.verdict === "hidden" ? (
                      <Ban aria-hidden className="size-3" />
                    ) : (
                      <IndianRupee aria-hidden className="size-3" />
                    )}
                  </span>

                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-[12.5px] transition-colors duration-300",
                      active
                        ? "font-semibold text-foreground"
                        : "font-medium text-foreground/70",
                    )}
                  >
                    {entry.when}
                  </span>

                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums transition-colors duration-300",
                      entry.verdict === "hidden"
                        ? "bg-destructive/8 text-destructive"
                        : "bg-brand/10 text-brand",
                    )}
                  >
                    {entry.action}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* What the buyer ends up seeing. */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-cloud px-3 py-2.5">
          <p className="text-[11px] font-medium text-muted-foreground">
            At checkout this buyer sees
          </p>
          <motion.span
            key={rule.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24 }}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
              hidden
                ? "bg-destructive/10 text-destructive"
                : "bg-brand-check/25 text-ink/80",
            )}
          >
            {hidden
              ? "No cash on delivery"
              : `Cash on delivery ${rule.action.replace("COD ", "")}`}
          </motion.span>
        </div>
      </DemoFrame>
    </div>
  );
}
