"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BadgePercent,
  Check,
  ChevronDown,
  Lock,
  MapPinHouse,
  Pencil,
  ShieldCheck,
  Smartphone,
  Truck,
  X,
} from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { StatusBar } from "@/components/sections/hero/PhoneChrome";
import { siteConfig } from "@/constants/site";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

const CODE = ["4", "9", "2", "7"] as const;

/**
 * The store the widget is wearing.
 *
 * Deliberately not COD King. The widget is rendered inside the merchant's own
 * checkout under the merchant's own name, and the header used to say "COD King
 * Verification" — which told a visitor the product brands their buyers'
 * screens for us. It says theirs instead, and the only mention of ours is the
 * "powered by" line at the foot, which is where it belongs.
 */
const BRAND = "Your Awesome Brand";

/**
 * The order on the screen.
 *
 * One object, so the widget cannot disagree with itself: the discount and the
 * prepaid total are derived from the cart rather than typed at three different
 * beats. The rate is a *configured example* — the product's own copy says the
 * prepaid discount is a percentage or a fixed value and is fully configurable
 * — so this is one merchant's setting rather than a default being advertised.
 */
const ORDER = {
  id: "#1042",
  total: 1299,
  discountRate: 0.1,
} as const;

const DISCOUNT = Math.round(ORDER.total * ORDER.discountRate);
const PREPAID_TOTAL = ORDER.total - DISCOUNT;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * The buyer's own details, as the widget fills them in.
 *
 * A prefilled address is one of the product's controls — it fetches the
 * customer's details from their phone number or their past orders — so the
 * address arrives on the screen already written rather than as an empty form.
 * The line under it says where it came from, because an address that appears
 * by itself with no explanation reads as a mockup.
 */
const ADDRESS = {
  name: "Aditi Sharma",
  line: "14 Nandanam Residency, 3rd Cross",
  area: "Indiranagar, Bengaluru",
  pin: "560038",
  phone: "+91 98765 43210",
} as const;

/**
 * The four stages of a successful COD checkout, and the beats inside them.
 *
 * The whole sequence is the happy case and nothing else: the buyer verifies
 * their number, their address is already filled in, the store's payment rules
 * offer them a cheaper way to pay, and the order is placed. There is no
 * failure state, no hold queue and no dispatch decision in here — those are
 * the merchant's side of the product, and this glass is the buyer's screen.
 *
 * Held as data rather than as conditionals scattered through the markup, so
 * the header, the progress rail and the body can never disagree about which
 * beat is showing. `filled` is how many digits are in the code field, and it
 * matters only while `stage` is `verify`.
 *
 * Beat 0 renders on the server and on a browser that never runs the script, so
 * it has to be a legible frame in its own right — a number entered and a code
 * on its way, not an empty form waiting for JavaScript to populate it.
 *
 * The durations are uneven on purpose. Typing beats are short; the three
 * frames that carry the argument — verified, the address already written, the
 * order placed — hold long enough to be read.
 */
const BEATS = [
  { id: "sending", stage: "verify", filled: 0, revealed: false, ms: 1800 },
  { id: "received", stage: "verify", filled: 0, revealed: true, ms: 1500 },
  { id: "filling", stage: "verify", filled: 3, revealed: true, ms: 900 },
  { id: "verified", stage: "verify", filled: 4, revealed: true, ms: 1600 },
  { id: "address", stage: "address", filled: 4, revealed: true, ms: 2700 },
  { id: "payment", stage: "payment", filled: 4, revealed: true, ms: 2900 },
  { id: "placed", stage: "placed", filled: 4, revealed: true, ms: 3000 },
] as const;

const DURATIONS = BEATS.map((beat) => beat.ms);

/** The three stages the rail draws. The fourth is the result, not a step. */
const STAGES = ["verify", "address", "payment"] as const;

const STAGE_INDEX: Record<(typeof BEATS)[number]["stage"], number> = {
  verify: 0,
  address: 1,
  payment: 2,
  placed: 3,
};

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

/** The heading every stage opens with: a mark, a title, and one line of why. */
function StageHead({
  icon: Icon,
  title,
  body,
}: {
  readonly icon: typeof ShieldCheck;
  readonly title: string;
  readonly body: string;
}) {
  return (
    <div className="px-5 text-center">
      <span
        aria-hidden
        className="relative inline-grid size-12 place-items-center rounded-[16px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_8px_22px_-8px_var(--brand)]"
      >
        <span className="absolute -inset-1.5 animate-halo rounded-[20px] bg-brand/15" />
        <Icon className="relative size-6 text-white" />
      </span>

      <p className="mt-3.5 text-[17px] leading-tight font-semibold tracking-[-0.02em]">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-[230px] text-[10.5px] leading-relaxed text-ink/50">
        {body}
      </p>
    </div>
  );
}

/** One of the two ways to pay, as the store's payment rules offer them. */
function PaymentOption({
  selected,
  title,
  caption,
  amount,
  strike,
  badge,
  icon: Icon,
}: {
  readonly selected: boolean;
  readonly title: string;
  readonly caption: string;
  readonly amount: string;
  readonly strike?: string;
  readonly badge?: string;
  readonly icon: typeof Truck;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3 py-2.5",
        selected
          ? "border-brand bg-brand/[0.05] shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_10%,transparent)]"
          : "border-ink/10 bg-white",
      )}
    >
      {/* The radio, drawn — a native input here would inherit focus behaviour
          this scene has no business claiming. */}
      <span
        aria-hidden
        className={cn(
          "grid size-4 shrink-0 place-items-center rounded-full border-[1.5px]",
          selected ? "border-brand" : "border-ink/25",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full bg-brand",
            selected ? "opacity-100" : "opacity-0",
          )}
        />
      </span>

      <Icon
        aria-hidden
        className={cn(
          "size-4 shrink-0",
          selected ? "text-brand" : "text-ink/25",
        )}
        strokeWidth={1.7}
      />

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] leading-tight font-semibold text-ink">
            {title}
          </span>
          {badge ? (
            <span className="rounded-full bg-brand/10 px-1.5 py-px text-[8.5px] leading-[1.4] font-bold tracking-[0.04em] text-brand uppercase">
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-[10px] leading-tight text-ink/50">
          {caption}
        </span>
      </span>

      <span className="flex shrink-0 items-baseline gap-1.5">
        {strike ? (
          <span className="text-[10px] leading-none text-ink/35 tabular-nums line-through">
            {strike}
          </span>
        ) : null}
        <span
          className={cn(
            "text-[12.5px] leading-none font-semibold tabular-nums",
            selected ? "text-brand" : "text-ink/45",
          )}
        >
          {amount}
        </span>
      </span>
    </div>
  );
}

/**
 * A cash-on-delivery order going through, on the buyer's own phone.
 *
 * This is the one screen the hero device shows, and it is the product's whole
 * argument in a single loop: the person who placed the order proves they
 * exist, their address is already written for them, the store's own payment
 * rules make paying now cheaper than paying later, and the order is placed.
 * Four stages, one after another, and every one of them succeeds — the review
 * asked for the happy case, and a hero is the wrong place to teach a merchant
 * what a blocked order looks like.
 *
 * An earlier pass ran the verification alone and closed on "Order #1042
 * released for dispatch". That was the wrong ending twice over: dispatch is a
 * decision taken in the merchant's admin rather than anything a buyer sees on
 * this screen, and stopping at the verification hid the two controls that
 * follow it in a real checkout.
 *
 * It runs end to end rather than showing a resolved state: the message
 * landing, the address arriving already filled and the total falling are the
 * mechanisms, and watching them happen proves the product does something in a
 * way a screenshot of a finished tick never does.
 *
 * The frame is fixed and the stages are swapped inside it, so a loop running
 * behind the headline never nudges the layout. The header, the progress rail
 * and the trust strip are outside the swap for the same reason — they are the
 * furniture the stages move through. The cycle is parked while the hero is off
 * screen, and under reduced motion it parks on the last beat — the order
 * placed — which is the frame that makes the argument anyway.
 *
 * Drawn in markup rather than screenshotted: sharp at any density, themed by
 * the same tokens as the rest of the site, no image bytes on the page's
 * largest element, and its text is genuinely text.
 */
export function VerifyScreen() {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);
  const beat = BEATS[step] ?? BEATS[0];
  const stage = beat.stage;
  const stageIndex = STAGE_INDEX[stage];
  const verified = stageIndex > 0 || beat.id === "verified";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`A cash-on-delivery order going through on ${siteConfig.name}: the buyer confirms a one-time password sent on WhatsApp, their delivery address is filled in from their number, the store's payment rules offer a discount for paying online, and the order is placed.`}
      className="relative flex size-full flex-col overflow-hidden bg-white text-ink"
    >
      {/* A whisper of colour at the crown, so the screen is lit rather than flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-soft to-transparent"
      />

      <StatusBar className="relative text-ink" />

      {/* App bar — the merchant's storefront, not ours. */}
      <div className="relative mt-2.5 flex items-center gap-2 px-5">
        <span
          aria-hidden
          className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand"
        >
          <ShieldCheck className="size-3.5 text-white" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold">
          {BRAND}
        </p>
        <span
          aria-hidden
          className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/6"
        >
          <X className="size-3 text-ink/45" />
        </span>
      </div>

      {/*
        The progress rail.

        Three segments for the three stages the buyer passes through, filling
        as they are cleared. It is what turns four unrelated screens into one
        journey: without it, a visitor who glances at the address stage has no
        way of knowing it follows the verification they saw a moment ago.
      */}
      <div aria-hidden className="relative mt-3 flex gap-1.5 px-5">
        {STAGES.map((id, index) => (
          <span
            key={id}
            className={cn(
              "h-[3px] flex-1 rounded-full transition-colors duration-500 ease-emphasized",
              index < stageIndex
                ? "bg-brand-check"
                : index === stageIndex
                  ? "bg-brand"
                  : "bg-ink/10",
            )}
          />
        ))}
      </div>

      {/*
        The stage itself.

        `mode="wait"` rather than a crossfade: two checkout stages dissolving
        through each other is illegible at this size, and the short pause
        between them reads as a screen being replaced, which is what it is.
      */}
      <div className="relative mt-5 min-h-0 flex-1">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex size-full flex-col"
          >
            {stage === "verify" ? (
              <>
                <StageHead
                  icon={ShieldCheck}
                  title="Verify your mobile number"
                  body="We sent a one-time password to your number. Enter it to confirm this cash-on-delivery order."
                />

                {/* The number under verification. */}
                <div className="mt-5 px-5">
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
                        <Check
                          className="size-2.5 text-white"
                          strokeWidth={3}
                        />
                      </motion.span>
                    ) : null}
                  </div>
                </div>

                {/*
                  The message, arriving on WhatsApp.

                  Its slot is reserved at full height rather than animated
                  open. A screen that grows and shrinks every beat drags the
                  whole scene with it, and a hero that will not sit still is
                  the opposite of confident.
                */}
                <div className="mt-4 flex min-h-[60px] items-start gap-2 px-5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#25D366]/12"
                  >
                    <WhatsappMark className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1 rounded-[14px] rounded-tl-[5px] border border-ink/6 bg-white px-2.5 py-2 shadow-[0_1px_4px_rgba(11,27,54,0.07)]">
                    <p className="text-[9.5px] leading-relaxed text-ink/50">
                      {BRAND} · code for order{" "}
                      <span className="font-semibold text-ink/75">
                        {ORDER.id}
                      </span>
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
                <div className="mt-4 flex gap-2 px-5" aria-hidden>
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

                {/* One reserved slot for the two states this stage has. */}
                <div className="mt-3.5 h-[38px] px-5">
                  {verified ? (
                    <p className="flex h-full items-center gap-2 rounded-xl bg-brand-check/14 px-3 text-[10.5px] font-semibold text-ink/75">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check">
                        <Check
                          className="size-2.5 text-white"
                          strokeWidth={3}
                        />
                      </span>
                      Number verified in 8 seconds
                    </p>
                  ) : (
                    <p className="flex h-full items-center rounded-xl bg-ink/[0.03] px-3 text-[10.5px] font-medium text-ink/45">
                      Enter the code to confirm this order
                    </p>
                  )}
                </div>
              </>
            ) : null}

            {stage === "address" ? (
              <>
                <StageHead
                  icon={MapPinHouse}
                  title="Confirm your address"
                  body="We filled this in from your verified number, so there is nothing to type."
                />

                <div className="mt-5 px-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
                      Delivery address
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-check/14 px-2 py-0.5 text-[8.5px] leading-[1.5] font-bold tracking-[0.04em] text-ink/60 uppercase">
                      <Check className="size-2.5" strokeWidth={3} />
                      Prefilled
                    </span>
                  </div>

                  <div className="mt-2 rounded-xl border border-brand-check/40 bg-brand-check/[0.05] px-3 py-3">
                    <p className="text-[12.5px] leading-tight font-semibold text-ink">
                      {ADDRESS.name}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-[1.55] text-ink/60">
                      {ADDRESS.line}
                      <br />
                      {ADDRESS.area} — {ADDRESS.pin}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-[10.5px] leading-none font-medium text-ink/50 tabular-nums">
                      <Smartphone aria-hidden className="size-3 text-ink/35" />
                      {ADDRESS.phone}
                    </p>
                  </div>

                  <p className="mt-2.5 flex items-center gap-1.5 text-[9.5px] leading-none text-ink/40">
                    <Pencil aria-hidden className="size-2.5" />
                    Tap to edit any line before you continue
                  </p>
                </div>

                <div className="mt-4 px-5">
                  <p className="grid h-10 place-items-center rounded-xl bg-brand text-[12.5px] font-semibold text-white">
                    Use this address
                  </p>
                </div>
              </>
            ) : null}

            {stage === "payment" ? (
              <>
                <StageHead
                  icon={BadgePercent}
                  title="Choose how to pay"
                  body="Your store's payment rules decide what is offered on this order — and what it costs."
                />

                <div className="mt-5 px-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[9px] font-bold tracking-[0.12em] text-ink/35 uppercase">
                      Payment rules
                    </p>
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[8.5px] leading-[1.5] font-bold tracking-[0.04em] text-brand uppercase">
                      Prepaid discount on
                    </span>
                  </div>

                  <div className="mt-2 space-y-2">
                    <PaymentOption
                      selected
                      icon={Smartphone}
                      title="Pay online now"
                      caption="UPI, cards, netbanking or wallets"
                      amount={inr.format(PREPAID_TOTAL)}
                      strike={inr.format(ORDER.total)}
                      badge={`Save ${inr.format(DISCOUNT)}`}
                    />
                    <PaymentOption
                      selected={false}
                      icon={Truck}
                      title="Cash on delivery"
                      caption="Pay the full amount on delivery"
                      amount={inr.format(ORDER.total)}
                    />
                  </div>
                </div>

                <div className="mt-4 px-5">
                  <p className="grid h-10 place-items-center rounded-xl bg-brand text-[12.5px] font-semibold text-white">
                    Pay {inr.format(PREPAID_TOTAL)} now
                  </p>
                </div>
              </>
            ) : null}

            {stage === "placed" ? (
              <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
                <span
                  aria-hidden
                  className="relative grid size-14 place-items-center rounded-full bg-brand-check"
                >
                  <span className="absolute -inset-2 animate-halo rounded-full bg-brand-check/15" />
                  <Check
                    className="relative size-7 text-white"
                    strokeWidth={3}
                  />
                </span>

                <p className="mt-4 text-[18px] leading-tight font-semibold tracking-[-0.02em]">
                  Order placed
                </p>
                <p className="mt-2 max-w-[220px] text-[10.5px] leading-relaxed text-ink/50">
                  Order {ORDER.id} is confirmed and paid. {BRAND} will be in
                  touch with the delivery updates.
                </p>

                <div className="mt-5 w-full space-y-1.5 rounded-xl border border-ink/8 bg-ink/[0.02] px-3 py-3 text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10.5px] text-ink/50">
                      Number verified
                    </span>
                    <span className="text-[10.5px] font-semibold text-ink/75">
                      {ADDRESS.phone}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10.5px] text-ink/50">
                      Delivering to
                    </span>
                    <span className="text-[10.5px] font-semibold text-ink/75 tabular-nums">
                      {ADDRESS.pin}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10.5px] text-ink/50">
                      Paid online
                    </span>
                    <span className="text-[10.5px] font-semibold text-ink tabular-nums">
                      {inr.format(PREPAID_TOTAL)}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust, and whose screen this is. */}
      <div className="relative px-5 pt-4 pb-6">
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
