"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Lock, ShieldCheck, X } from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { StatusBar } from "@/components/sections/hero/PhoneChrome";
import { siteConfig } from "@/constants/site";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { cn } from "@/lib/utils";

const CODE = ["4", "9", "2", "7"] as const;

/**
 * The five beats of a verification, and what each one puts on the screen.
 *
 * Held as data rather than as conditionals scattered through the markup, so
 * the code field, the message bubble and the status strip can never disagree
 * about which beat is showing.
 *
 * `filled` is how many digits are in the field. Beat 0 is what renders on the
 * server and on a browser that never runs the script, so it has to be a
 * legible frame in its own right — a number entered and a code on its way,
 * not an empty form waiting for JavaScript to populate it.
 */
const BEATS = [
  { id: "sending", filled: 0, revealed: false },
  { id: "received", filled: 0, revealed: true },
  { id: "filling", filled: 3, revealed: true },
  { id: "verified", filled: 4, revealed: true },
  { id: "released", filled: 4, revealed: true },
] as const;

const BEAT_MS = 1600;

/** India's flag, drawn — a country picker with a missing image reads as broken. */
function IndiaFlag() {
  return (
    <span
      aria-hidden
      className="relative block h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-ink/10"
    >
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#FF9933]" />
      <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#138808]" />
      <span className="absolute top-1/2 left-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-[0.8px] ring-[#000088]" />
    </span>
  );
}

/**
 * The verification, running on the buyer's own phone.
 *
 * This is the one screen the hero device shows, and it is the product's entire
 * argument in a single frame: a merchant looking at it understands within a
 * second that nothing ships until the person who placed the order proves they
 * exist.
 *
 * An earlier pass filled this glass with a checkout and floated the
 * verification beside it as a separate card. It was the wrong division. The
 * checkout is a *Shopify* surface — showing it inside our device says the
 * screen belongs to someone else, and it forced the one thing that is ours
 * out of the frame the whole composition points at. The screen now shows what
 * COD King actually renders on the buyer's phone, and the outcome chips around
 * the device carry the rest of the story.
 *
 * It runs the sequence end to end rather than showing a resolved state: the
 * message landing is the mechanism, and watching it land proves the product
 * sent it in a way a screenshot of a finished tick never does.
 *
 * Every slot that changes between beats has its height reserved, so a loop
 * running behind the headline never nudges the layout. The cycle is parked
 * while the hero is off screen, and under reduced motion it parks on the last
 * beat — the order released — which is the frame that makes the argument
 * anyway.
 *
 * Drawn in markup rather than screenshotted: sharp at any density, themed by
 * the same tokens as the rest of the site, no image bytes on the page's
 * largest element, and its text is genuinely text.
 */
export function VerifyScreen() {
  const { ref, step } = useStepCycle<HTMLDivElement>(BEATS.length, BEAT_MS);
  const beat = BEATS[step] ?? BEATS[0];
  const verified = step >= 3;
  const released = step >= 4;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${siteConfig.name} verifies a cash-on-delivery order: a one-time password is sent to the buyer on WhatsApp, the buyer confirms it, and the order is released for dispatch.`}
      className="relative flex size-full flex-col overflow-hidden bg-white text-ink"
    >
      {/* A whisper of colour at the crown, so the screen is lit rather than flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-soft to-transparent"
      />

      <StatusBar className="relative text-ink" />

      {/* App bar. */}
      <div className="relative mt-2.5 flex items-center gap-2 px-5">
        <span
          aria-hidden
          className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand"
        >
          <ShieldCheck className="size-3.5 text-white" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold">
          {siteConfig.name} Verification
        </p>
        <span
          aria-hidden
          className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/6"
        >
          <X className="size-3 text-ink/45" />
        </span>
      </div>

      <div aria-hidden className="relative mt-2.5 h-px bg-ink/8" />

      {/* The ask. */}
      <div className="relative mt-6 px-5 text-center">
        <span
          aria-hidden
          className="relative inline-grid size-12 place-items-center rounded-[16px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_8px_22px_-8px_var(--brand)]"
        >
          <span className="absolute -inset-1.5 animate-halo rounded-[20px] bg-brand/15" />
          <ShieldCheck className="relative size-6 text-white" />
        </span>

        <p className="mt-3.5 text-[17px] leading-tight font-semibold tracking-[-0.02em]">
          Verify your mobile number
        </p>
        <p className="mx-auto mt-2 max-w-[230px] text-[10.5px] leading-relaxed text-ink/50">
          We sent a one-time password to your number. Enter it to confirm this
          cash-on-delivery order.
        </p>
      </div>

      {/* The number under verification. */}
      <div className="relative mt-5 px-5">
        <p className="text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
          Mobile number
        </p>
        <div
          className={cn(
            "mt-1.5 flex h-11 items-center gap-2 rounded-xl border bg-white px-2.5",
            "transition-colors duration-300",
            verified ? "border-brand-check/45" : "border-ink/12",
          )}
        >
          <IndiaFlag />
          <span className="text-[12px] font-semibold text-ink/70 tabular-nums">
            +91
          </span>
          <ChevronDown aria-hidden className="size-3 text-ink/30" />
          <span aria-hidden className="h-4 w-px bg-ink/10" />
          <span className="flex-1 text-[13.5px] font-semibold tracking-[0.01em] tabular-nums">
            98765 43210
          </span>

          {verified ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.26 }}
              aria-hidden
              className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check"
            >
              <Check className="size-2.5 text-white" strokeWidth={3} />
            </motion.span>
          ) : null}
        </div>
      </div>

      {/*
        The message, arriving on WhatsApp.

        Its slot is reserved at full height rather than animated open. A screen
        that grows and shrinks every 1.6 seconds drags the whole scene with it,
        and a hero that will not sit still is the opposite of confident.
      */}
      <div className="relative mt-4 flex min-h-[60px] items-start gap-2 px-5">
        <span
          aria-hidden
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#25D366]/12"
        >
          <WhatsappMark className="size-4" />
        </span>

        <div className="min-w-0 flex-1 rounded-[14px] rounded-tl-[5px] border border-ink/6 bg-white px-2.5 py-2 shadow-[0_1px_4px_rgba(11,27,54,0.07)]">
          <p className="text-[9.5px] leading-relaxed text-ink/50">
            Aurelia Living · code for order{" "}
            <span className="font-semibold text-ink/75">#1042</span>
          </p>

          <div className="mt-1 flex h-[18px] items-center">
            <AnimatePresence initial={false} mode="wait">
              {beat.revealed ? (
                <motion.p
                  key="code"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.26 }}
                  className="text-[16px] leading-none font-bold tracking-[0.22em] tabular-nums"
                >
                  4927
                </motion.p>
              ) : (
                <motion.span
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-hidden
                  className="flex items-center gap-1"
                >
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      style={{ animationDelay: `${dot * 0.16}s` }}
                      className="size-[3px] animate-halo rounded-full bg-ink/30"
                    />
                  ))}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* The code field, filling itself. */}
      <div className="relative mt-4 flex gap-2 px-5" aria-hidden>
        {CODE.map((digit, index) => {
          const filled = index < beat.filled;
          const active = index === beat.filled && !verified;

          return (
            <span
              key={`${digit}-${index}`}
              className={cn(
                "grid h-12 flex-1 place-items-center rounded-[13px] border-[1.5px] text-[19px] font-bold tabular-nums",
                "transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-emphasized)]",
                filled
                  ? verified
                    ? "border-brand-check/50 bg-brand-check/10 text-ink"
                    : "border-brand/45 bg-white text-ink"
                  : "border-ink/10 bg-ink/[0.02] text-transparent",
                active &&
                  "border-brand bg-white shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_14%,transparent)]",
              )}
            >
              {filled ? (
                digit
              ) : active ? (
                <span className="h-5 w-px animate-caret bg-brand" />
              ) : (
                digit
              )}
            </span>
          );
        })}
      </div>

      {/*
        The outcome. Three states share one reserved slot: the code on its way,
        the number confirmed, and the thing the merchant actually cares about —
        the order leaving the hold queue.
      */}
      <div className="relative mt-3.5 h-[38px] px-5">
        <AnimatePresence initial={false} mode="wait">
          {released ? (
            <motion.p
              key="released"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28 }}
              className="flex h-full items-center gap-2 rounded-xl bg-brand-check/14 px-3 text-[10.5px] font-semibold text-ink/75"
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check">
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
              Order #1042 released for dispatch
            </motion.p>
          ) : verified ? (
            <motion.p
              key="verified"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28 }}
              className="flex h-full items-center gap-2 rounded-xl bg-brand-check/14 px-3 text-[10.5px] font-semibold text-ink/75"
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check">
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
              Number verified in 8 seconds
            </motion.p>
          ) : (
            <motion.p
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full items-center rounded-xl bg-ink/[0.03] px-3 text-[10.5px] font-medium text-ink/45"
            >
              Nothing ships until this order is confirmed
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Resend, as a real countdown — a dead timer is the tell of a mockup. */}
      <div className="relative mt-3 flex h-[13px] items-center justify-center px-5">
        {verified ? null : (
          <p className="text-[10px] leading-none text-ink/40">
            Didn&rsquo;t get it?{" "}
            <span className="font-semibold text-ink/55 tabular-nums">
              Resend in 0:25
            </span>
          </p>
        )}
      </div>

      {/* Trust, and whose screen this is. */}
      <div className="relative mt-auto px-5 pb-6">
        <div className="flex items-center justify-center gap-1.5 rounded-xl bg-ink/[0.03] py-2">
          <Lock aria-hidden className="size-3 text-ink/40" />
          <span className="text-[9.5px] font-medium text-ink/50">
            Secure · trusted by 10,000+ merchants
          </span>
        </div>
        <p className="mt-3 text-center text-[9px] font-medium text-ink/35">
          Powered by{" "}
          <span className="font-bold text-ink/55">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
