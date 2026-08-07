"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, PackageCheck, Timer } from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { DemoFrame } from "@/components/sections/flagship/DemoFrame";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { cn } from "@/lib/utils";

const CODE = ["4", "9", "2", "7"] as const;

/**
 * The four beats of a verification, and how much of the code is entered at
 * each. Held as data so the timeline, the status chip and the code field can
 * never disagree about which beat is showing.
 */
const BEATS = [
  {
    id: "placed",
    label: "Order placed",
    status: "Awaiting confirmation",
    filled: 0,
  },
  {
    id: "sent",
    label: "Code sent on WhatsApp",
    status: "Code sent",
    filled: 0,
  },
  {
    id: "entering",
    label: "Buyer enters the code",
    status: "Confirming",
    filled: 2,
  },
  {
    id: "verified",
    label: "Verified — released to dispatch",
    status: "Verified",
    filled: 4,
  },
] as const;

/**
 * OTP Verification, shown as the thing it actually is: a clock.
 *
 * Every other way of presenting this control describes a state — verified or
 * not. But the merchant's real question is about *time*: how long an order
 * sits unconfirmed, and what happens to it if nobody answers. So the demo runs
 * the sequence end to end, with the hold timer visible the whole way, and ends
 * on the only frame that matters — the order released for dispatch.
 *
 * The message bubble arrives on its own beat rather than being present from
 * the start, because the arrival is the mechanism. A static screenshot of a
 * WhatsApp thread proves a message exists; watching it land proves the product
 * sent it.
 */
export function OtpFlow() {
  const { ref, step } = useStepCycle<HTMLDivElement>(BEATS.length, 1750);
  const beat = BEATS[step] ?? BEATS[0];
  const verified = beat.id === "verified";

  return (
    <div ref={ref}>
      <DemoFrame
        label="Order verification"
        status={
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground tabular-nums">
            <Timer aria-hidden className="size-3" />
            Auto-cancels in 11:58
          </span>
        }
        bodyClassName="p-3.5 sm:p-4"
      >
        {/* The order under verification. */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-cloud px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-[13px] leading-tight font-semibold">
              Aditi Sharma
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
              #1042 · +91 98••• ••210 · ₹1,348
            </p>
          </div>

          <motion.span
            key={beat.status}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap",
              verified
                ? "bg-brand-check/25 text-ink/80"
                : "bg-brand/10 text-brand",
            )}
          >
            {beat.status}
          </motion.span>
        </div>

        {/* The message, arriving. */}
        <div className="mt-3 min-h-[76px]">
          <AnimatePresence initial={false}>
            {step >= 1 ? (
              <motion.div
                key="bubble"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.34, ease: [0.2, 0, 0, 1] }}
                className="flex items-start gap-2.5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#25D366]/15"
                >
                  <WhatsappMark className="size-4" />
                </span>
                <div className="min-w-0 rounded-2xl rounded-tl-md border border-border bg-background px-3 py-2 shadow-card">
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Aurelia Living: your code for order{" "}
                    <span className="font-semibold text-foreground">#1042</span>{" "}
                    is
                  </p>
                  <p className="mt-1 text-[15px] leading-none font-bold tracking-[0.24em] tabular-nums">
                    4927
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[76px] items-center rounded-xl border border-dashed border-border px-3 text-[11px] text-muted-foreground"
              >
                Order placed. Nothing ships until the buyer confirms it.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Code entry. */}
        <div className="mt-3 flex gap-2" aria-hidden>
          {CODE.map((digit, index) => {
            const filled = index < beat.filled;

            return (
              <span
                key={`${digit}-${index}`}
                className={cn(
                  "grid h-11 flex-1 place-items-center rounded-xl border text-[17px] font-bold tabular-nums transition-colors duration-300",
                  filled
                    ? "border-brand bg-brand-soft/70 text-foreground"
                    : "border-border bg-background text-transparent",
                )}
              >
                {filled ? (
                  digit
                ) : index === beat.filled && !verified ? (
                  <span className="h-4 w-px animate-caret bg-brand" />
                ) : (
                  digit
                )}
              </span>
            );
          })}
        </div>

        {/* The sequence, with the current beat marked. */}
        <ol className="mt-3.5 space-y-1.5">
          {BEATS.map((entry, index) => {
            const done = index < step;
            const active = index === step;

            return (
              <li key={entry.id} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    done || active
                      ? "bg-brand-check/30"
                      : "border border-border bg-background",
                  )}
                >
                  {done || active ? (
                    <Check className="size-2.5 text-ink/70" />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "text-[11.5px] transition-colors duration-300",
                    active
                      ? "font-semibold text-foreground"
                      : done
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50",
                  )}
                >
                  {entry.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/*
          The payoff.

          Its slot is reserved rather than animated open. A looping demo that
          grows and shrinks drags the whole row up and down every few seconds,
          and a page that will not sit still is the opposite of confident — so
          the height is fixed and only the content fades.
        */}
        <div className="mt-3 min-h-[42px]">
          <AnimatePresence initial={false}>
            {verified ? (
              <motion.p
                key="released"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="flex items-center gap-2 rounded-xl bg-brand-check/18 px-3 py-2.5 text-[11.5px] font-semibold text-ink/80"
              >
                <PackageCheck aria-hidden className="size-4 shrink-0" />
                Confirmed in 8 seconds. Unconfirmed orders never reach dispatch.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </DemoFrame>
    </div>
  );
}
