"use client";

import { Check, ChevronDown, Lock, ShieldCheck, X } from "lucide-react";

import { IndiaFlag } from "@/components/product/otp/IndiaFlag";
import { siteConfig } from "@/constants/site";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

/** The code, and the number it was sent to. One place, so nothing can drift. */
const CODE = ["4", "9", "2", "7", "1", "6"] as const;
const DIAL_CODE = "+91";
const NUMBER = "98765 43210";

/**
 * The sequence, as a duration per beat.
 *
 * Beat 0 is the frame that renders on the server and on a browser that never
 * runs the script: the code has been sent, the field is waiting, the resend
 * timer is counting. It has to be legible on its own, so it holds longest of
 * the unresolved beats.
 *
 * The six typing beats are deliberately short and slightly uneven — a code
 * entered at a metronome's pace reads as a progress bar, not as a person — and
 * the resolved frame holds for nearly three seconds, because it is the only
 * one the whole sequence exists to reach.
 */
const BEATS = [
  { id: "sent", filled: 0, ms: 1500 },
  { id: "d1", filled: 1, ms: 320 },
  { id: "d2", filled: 2, ms: 260 },
  { id: "d3", filled: 3, ms: 300 },
  { id: "d4", filled: 4, ms: 260 },
  { id: "d5", filled: 5, ms: 280 },
  { id: "d6", filled: 6, ms: 420 },
  { id: "checking", filled: 6, ms: 760 },
  { id: "verified", filled: 6, ms: 2800 },
] as const;

const DURATIONS = BEATS.map((beat) => beat.ms);

const CHECKING_STEP = BEATS.findIndex((beat) => beat.id === "checking");
const VERIFIED_STEP = BEATS.findIndex((beat) => beat.id === "verified");

interface OtpVerificationPanelProps {
  readonly className?: string;
  /**
   * Overrides the description announced to assistive technology. The default
   * describes the whole sequence, which is what a still image of it would be
   * captioned with.
   */
  readonly label?: string;
}

/**
 * The verification, running.
 *
 * This is the one surface COD King renders on a buyer's own screen, and it is
 * the product's entire argument in a single frame: nothing ships until the
 * person who placed the order proves the number is theirs. It is drawn in
 * markup rather than screenshotted — sharp at any density, themed by the same
 * tokens as the rest of the site, no image bytes on the largest element of the
 * page, and its text is genuinely text.
 *
 * It runs the sequence end to end rather than showing a resolved state,
 * because the mechanism *is* the sequence. A finished green tick proves
 * somebody drew a green tick; watching six digits land and the field turn is
 * the only version that proves the product does something.
 *
 * The digits fill one at a time, which is the single detail that separates
 * this from a mockup. Everything that changes between beats has its slot
 * reserved at full height, so a loop running inside a hero never nudges the
 * layout around it.
 *
 * Standalone and self-contained by design: it takes no props but a class name,
 * carries its own timeline, and parks itself when off screen or when the
 * visitor has asked for reduced motion. The remaining feature pages compose it
 * the same way this one does.
 */
export function OtpVerificationPanel({
  className,
  label,
}: OtpVerificationPanelProps) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);
  const beat = BEATS[step] ?? BEATS[0];
  const checking = step === CHECKING_STEP;
  const verified = step === VERIFIED_STEP;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={
        label ??
        `${siteConfig.name} verifies a cash-on-delivery order: a one-time password is sent to the buyer's mobile number, the buyer enters the six-digit code, and the order is confirmed.`
      }
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[1.25rem] border border-border bg-card",
        "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_18px_44px_-20px_rgba(11,27,54,0.35)]",
        className,
      )}
    >
      {/* A whisper of colour at the crown, so the panel is lit rather than flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-soft/70 to-transparent"
      />

      {/* The product's own chrome. */}
      <div className="relative flex items-center gap-2 border-b border-border px-4 py-3">
        <span
          aria-hidden
          className="grid size-[22px] shrink-0 place-items-center rounded-lg bg-brand"
        >
          <ShieldCheck className="size-3.5 text-white" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold text-ink">
          {siteConfig.name} Verification
        </p>
        <span
          aria-hidden
          className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/[0.05]"
        >
          <X className="size-3 text-ink/45" />
        </span>
      </div>

      <div className="relative px-4 pt-5 pb-4">
        {/* The ask. */}
        <div className="text-center">
          <span
            aria-hidden
            className="relative inline-grid size-11 place-items-center rounded-[15px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_8px_22px_-10px_var(--brand)]"
          >
            <span className="absolute -inset-1.5 animate-halo rounded-[19px] bg-brand/15" />
            <ShieldCheck className="relative size-[22px] text-white" />
          </span>

          <p className="mt-3 text-[15px] leading-tight font-semibold tracking-[-0.015em] text-ink">
            Verify your mobile number
          </p>
          <p className="mx-auto mt-1.5 max-w-[15rem] text-[10.5px] leading-relaxed text-ink/50">
            We send a one-time password to your number to confirm this
            cash-on-delivery order.
          </p>
        </div>

        {/* The number under verification. */}
        <div className="mt-4">
          <p className="text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
            Mobile number
          </p>
          <div
            className={cn(
              "mt-1.5 flex h-10 items-center gap-2 rounded-xl border bg-background px-2.5",
              "transition-colors duration-300 ease-emphasized",
              verified ? "border-brand-check/45" : "border-ink/12",
            )}
          >
            <IndiaFlag />
            <span className="text-[12px] font-semibold text-ink/70 tabular-nums">
              {DIAL_CODE}
            </span>
            <ChevronDown aria-hidden className="size-3 text-ink/30" />
            <span aria-hidden className="h-4 w-px bg-ink/10" />
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink tabular-nums">
              {NUMBER}
            </span>

            {verified ? (
              <span
                aria-hidden
                className="grid size-4 shrink-0 animate-in place-items-center rounded-full bg-brand-check duration-250 fade-in-0 zoom-in-50"
              >
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
            ) : null}
          </div>
        </div>

        {/* The code field, filling itself one digit at a time. */}
        <div className="mt-4">
          <p className="text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
            Enter OTP
          </p>
          <p className="mt-1 text-[10px] leading-none text-ink/45">
            6-digit code sent to{" "}
            <span className="font-semibold text-ink/60 tabular-nums">
              {DIAL_CODE} {NUMBER}
            </span>
          </p>

          <div className="mt-2 flex gap-1.5" aria-hidden>
            {CODE.map((digit, index) => {
              const filled = index < beat.filled;
              const active = index === beat.filled && !checking && !verified;

              return (
                <span
                  key={`${digit}-${index}`}
                  className={cn(
                    "grid h-11 min-w-0 flex-1 place-items-center rounded-[11px] border-[1.5px]",
                    "text-[16px] font-bold text-ink tabular-nums",
                    "transition-[background-color,border-color,box-shadow] duration-200 ease-emphasized",
                    filled
                      ? verified
                        ? "border-brand-check/50 bg-brand-check/10"
                        : "border-brand/45 bg-background"
                      : "border-ink/10 bg-ink/[0.02]",
                    active &&
                      "border-brand bg-background shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_14%,transparent)]",
                  )}
                >
                  {filled ? (
                    /*
                      A CSS entrance, not a JavaScript one.

                      The digit is the payload of the whole component, and an
                      element whose only route to `opacity: 1` runs through an
                      animation library is invisible whenever that library has
                      not started — a slow hydration, a blocked chunk, a
                      screenshot tool that does not run rAF. `animate-in` has
                      no fill mode, so the moment the animation is over — or
                      never begins — the digit is simply at its natural,
                      visible state. It can only fail towards being readable.
                    */
                    <span className="animate-in duration-200 fade-in-0 zoom-in-90">
                      {digit}
                    </span>
                  ) : active ? (
                    <span className="h-5 w-px animate-caret bg-brand" />
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>

        {/*
          The outcome.

          Three states share one reserved slot rather than animating a panel
          open and shut: a card that grows and shrinks every seven seconds
          drags whatever sits beside it up and down, and a hero that will not
          sit still is the opposite of confident.
        */}
        <div className="mt-3.5 h-9">
          {verified ? (
            <p className="flex h-full animate-in items-center gap-2 rounded-xl bg-brand-check/14 px-3 text-[10.5px] font-semibold text-ink/75 duration-300 fade-in-0 slide-in-from-bottom-1">
              <span
                aria-hidden
                className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check"
              >
                <Check className="size-2.5 text-white" strokeWidth={3} />
              </span>
              Number verified — order confirmed
            </p>
          ) : checking ? (
            <p className="flex h-full items-center gap-2 rounded-xl bg-brand/[0.07] px-3 text-[10.5px] font-semibold text-brand">
              <span aria-hidden className="flex items-center gap-1">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    style={{ animationDelay: `${dot * 0.16}s` }}
                    className="size-[3px] animate-halo rounded-full bg-brand"
                  />
                ))}
              </span>
              Verifying the code
            </p>
          ) : (
            <p className="flex h-full items-center justify-center rounded-xl bg-ink/[0.03] px-3 text-[10.5px] font-medium text-ink/45">
              Resend OTP in{" "}
              <span className="ml-1 font-semibold text-ink/60 tabular-nums">
                00:25
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Trust, and whose screen this is. */}
      <div className="relative mt-auto border-t border-border px-4 py-3">
        <p className="flex items-center justify-center gap-1.5 text-[9.5px] font-medium text-ink/50">
          <Lock aria-hidden className="size-3 text-ink/40" />
          Your data is safe with {siteConfig.name}
        </p>
        <p className="mt-1.5 text-center text-[9px] font-medium text-ink/35">
          Powered by{" "}
          <span className="font-bold text-ink/55">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
