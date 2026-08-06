"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, MousePointer2, Sparkles, Wallet } from "lucide-react";

import {
  MastercardMark,
  RupayMark,
  UpiMark,
  VisaMark,
} from "@/components/brand/BrandMarks";
import { DemoFrame } from "@/components/sections/flagship/DemoFrame";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { cn } from "@/lib/utils";

const CASH_TOTAL = "₹1,348";
const PREPAID_TOTAL = "₹1,179";

/**
 * COD to Prepaid, played from the buyer's seat.
 *
 * The control is usually explained from the merchant's side — "offer a prepaid
 * discount" — which is the least persuasive way to put it, because it sounds
 * like giving money away. The gap is the argument, so the gap is what the
 * panel shows: cash carrying its handling fee, prepaid carrying its discount,
 * and ₹169 sitting between two buttons at the exact moment a buyer is deciding.
 *
 * The pointer travels from cash to prepaid rather than the selection simply
 * flipping. That movement is the whole claim of the control: nobody was
 * forced, the cheaper option was just made obvious.
 */
export function PrepaidChoice() {
  const { ref, step } = useStepCycle<HTMLDivElement>(4, 1900);

  const targetingPrepaid = step >= 1;
  const prepaidChosen = step >= 2;
  const settled = step === 3;

  const cursor = (
    <motion.span
      layoutId="prepaid-pointer"
      aria-hidden
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="absolute -right-1 -bottom-1 grid size-6 place-items-center rounded-full bg-ink text-white shadow-overlay"
    >
      <MousePointer2 className="size-3 fill-white" />
    </motion.span>
  );

  return (
    <div ref={ref}>
      <DemoFrame
        label="Checkout · payment"
        status={
          <span className="text-[10px] font-medium text-muted-foreground">
            Aurelia Living
          </span>
        }
        bodyClassName="p-3.5 sm:p-4"
      >
        <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground/70 uppercase">
          How would you like to pay?
        </p>

        <div className="space-y-2">
          {/* Prepaid. */}
          <div
            className={cn(
              "relative rounded-xl border p-3 transition-all duration-300",
              prepaidChosen
                ? "border-brand bg-brand-soft/70 shadow-[0_4px_16px_-6px_var(--brand)]"
                : targetingPrepaid
                  ? "border-brand/45 bg-brand-soft/35"
                  : "border-border bg-background",
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full transition-colors duration-300",
                  prepaidChosen
                    ? "bg-brand"
                    : "border-2 border-border bg-background",
                )}
              >
                {prepaidChosen ? (
                  <Check className="size-2.5 text-white" />
                ) : null}
              </span>

              {/* Named for the method a real Shopify payment sheet lists,
                  not for a button. "Pay now" read as a call to action inside a
                  mockup, which is the one thing a product screen must not do. */}
              <span className="flex flex-1 items-center gap-1.5 text-[13px] font-semibold">
                Prepaid — UPI
                <Sparkles aria-hidden className="size-3 text-brand" />
              </span>

              <span className="text-right">
                <span className="block text-[15px] leading-none font-bold tabular-nums">
                  {PREPAID_TOTAL}
                </span>
                <span className="mt-0.5 block text-[10px] text-muted-foreground tabular-nums line-through">
                  {CASH_TOTAL}
                </span>
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 pl-6.5">
              <UpiMark />
              <span aria-hidden className="h-2.5 w-px bg-border" />
              <VisaMark />
              <MastercardMark />
              <RupayMark />
            </div>

            {/* Slot reserved, so the card cannot grow mid-loop. */}
            <div className="mt-2 min-h-[16px]">
              <AnimatePresence initial={false}>
                {prepaidChosen ? (
                  <motion.p
                    key="discount"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.26 }}
                    className="text-[11px] leading-none font-semibold text-brand"
                  >
                    ₹120 prepaid discount applied automatically
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>

            {targetingPrepaid ? cursor : null}
          </div>

          {/* Cash. */}
          <div
            className={cn(
              "relative rounded-xl border p-3 transition-all duration-300",
              prepaidChosen
                ? "border-border bg-background opacity-70"
                : "border-brand bg-brand-soft/50",
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full transition-colors duration-300",
                  prepaidChosen
                    ? "border-2 border-border bg-background"
                    : "bg-brand",
                )}
              >
                {prepaidChosen ? null : (
                  <Check className="size-2.5 text-white" />
                )}
              </span>

              <span className="flex flex-1 items-center gap-1.5 text-[13px] font-medium">
                <Wallet
                  aria-hidden
                  className="size-3.5 text-muted-foreground"
                />
                Cash on delivery
              </span>

              <span className="text-[15px] leading-none font-semibold tabular-nums">
                {CASH_TOTAL}
              </span>
            </div>

            <p className="mt-1.5 pl-6.5 text-[11px] text-muted-foreground">
              Includes a ₹49 handling fee
            </p>

            {targetingPrepaid ? null : cursor}
          </div>
        </div>

        {/*
          The summary, re-totalling as the choice changes. This is where the
          argument actually lands: the buyer does not read a discount badge,
          they read the last line of the bill.
        */}
        <dl className="mt-3 space-y-1 rounded-xl border border-dashed border-border bg-cloud px-3 py-2.5 text-[11.5px]">
          <div className="flex justify-between text-muted-foreground">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">₹1,299</dd>
          </div>

          <div className="flex justify-between">
            <motion.dt
              key={prepaidChosen ? "d-label" : "f-label"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
              className={
                prepaidChosen
                  ? "font-medium text-brand"
                  : "text-muted-foreground"
              }
            >
              {prepaidChosen ? "Prepaid discount" : "COD handling fee"}
            </motion.dt>
            <motion.dd
              key={prepaidChosen ? "d-value" : "f-value"}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={cn(
                "font-semibold tabular-nums",
                prepaidChosen ? "text-brand" : "text-muted-foreground",
              )}
            >
              {prepaidChosen ? "−₹120" : "+₹49"}
            </motion.dd>
          </div>

          <div className="flex justify-between border-t border-border pt-1.5 font-semibold">
            <dt>Total</dt>
            <motion.dd
              key={prepaidChosen ? "t-prepaid" : "t-cash"}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26 }}
              className="text-[14px] tabular-nums"
            >
              {prepaidChosen ? PREPAID_TOTAL : CASH_TOTAL}
            </motion.dd>
          </div>
        </dl>

        {/* The gap, named. */}
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <p className="text-[11px] font-medium text-muted-foreground">
            Difference at the moment of choice
          </p>
          <motion.span
            key={prepaidChosen ? "saved" : "gap"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24 }}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums",
              prepaidChosen
                ? "bg-brand-check/25 text-ink/80"
                : "bg-brand/10 text-brand",
            )}
          >
            {prepaidChosen ? "₹169 saved" : "₹169 cheaper to prepay"}
          </motion.span>
        </div>

        <div className="mt-2.5 min-h-[42px]">
          <AnimatePresence initial={false}>
            {settled ? (
              <motion.p
                key="settled"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="flex items-center gap-2 rounded-xl bg-brand-check/18 px-3 py-2.5 text-[11.5px] font-semibold text-ink/80"
              >
                <Check aria-hidden className="size-4 shrink-0" />
                Paid at checkout. Nothing to collect, nothing to bring back.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </DemoFrame>
    </div>
  );
}
