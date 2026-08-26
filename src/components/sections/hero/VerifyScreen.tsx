"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronDown,
  Lock,
  Pencil,
  ShieldCheck,
  Smartphone,
  Truck,
  X,
} from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { StatusBar } from "@/components/sections/hero/PhoneChrome";
import { demoMerchant } from "@/constants/demoMerchant";
import { siteConfig } from "@/constants/site";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

const CODE = ["4", "9", "2", "7"] as const;

/**
 * The store the widget is wearing.
 *
 * Deliberately not COD King, and deliberately not a literal either: the
 * WhatsApp thread that closes the homepage wears the same store, and a visitor
 * scrolling from the hero to the close is meant to recognise it. The name is
 * therefore read from `demoMerchant` rather than typed here, so the two scenes
 * cannot drift apart. See that file for why the merchant's name is on the
 * buyer's screen and ours is not.
 */
const BRAND = demoMerchant.name;

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

/**
 * The three stages the rail draws, and what it calls them. The fourth is the
 * result, not a step.
 *
 * Named rather than drawn as three anonymous bars. Three unlabelled segments
 * tell a visitor how far through something the buyer is but never what the
 * something is, which is exactly the kind of ornament-shaped-like-information
 * that makes an interface read as a mockup of an interface. With the words
 * under them the rail states the whole flow on the first frame — verify,
 * address, payment — before any of it has happened.
 */
const STAGES = [
  { id: "verify", label: "Verify" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
] as const;

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

/**
 * The heading every stage opens with.
 *
 * Set flush left, which is the whole of the change and most of the reason the
 * screen stopped looking generated. Each stage used to open on a 48px
 * brand-gradient tile with a halo pulsing behind it, over a centred title and
 * a centred paragraph measured to 230px — the glowing-icon-above-centred-copy
 * arrangement that appears on approximately every AI-rendered product shot and
 * on approximately no real checkout. A buyer's checkout is a form. Forms are
 * ranged left, because that is where the next line starts and where every
 * field label under it begins.
 *
 * Losing the tile costs nothing: the stage is already named by the rail above
 * it and by the title itself, so the icon was carrying no information that was
 * not written twice over beside it.
 */
function StageHead({
  title,
  body,
}: {
  readonly title: string;
  readonly body: string;
}) {
  return (
    <div className="px-5">
      <p className="text-[16.5px] leading-tight font-semibold tracking-[-0.02em] text-ink">
        {title}
      </p>
      <p className="mt-1.5 text-[11px] leading-[1.55] text-ink/50">{body}</p>
    </div>
  );
}

/** The label above a field or a group of them. */
function FieldLabel({ children }: { readonly children: string }) {
  return (
    <p className="text-[9.5px] leading-none font-bold tracking-[0.1em] text-ink/40 uppercase">
      {children}
    </p>
  );
}

/**
 * The action that closes a stage.
 *
 * Every stage now ends on one, and it is pinned to the foot of the screen
 * rather than left to fall wherever the content above it happens to stop. The
 * verification had no button at all — it filled its own code field and moved
 * on by itself, which left a third of the glass empty under it and made the
 * one screen a visitor looks at longest read as a layout that had run out of
 * content. A phone checkout puts its content at the top and its commitment at
 * the bottom, within reach of a thumb, and doing the same here turns that
 * empty band from an accident into the space the pattern asks for.
 *
 * Drawn as a paragraph rather than a button: this is a picture of an
 * interface, and a real `<button>` here would offer a keyboard a stop that
 * does nothing when it gets there.
 */
function PrimaryAction({ children }: { readonly children: string }) {
  return (
    <p className="grid h-12 place-items-center rounded-[13px] bg-brand text-[13.5px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgba(37,99,235,0.32),0_8px_18px_-8px_rgba(37,99,235,0.55)]">
      {children}
    </p>
  );
}

/**
 * One of the two ways to pay, as the store's payment rules offer them.
 *
 * The selected row is marked by its border and a four-percent wash and nothing
 * else. It used to carry a 3px brand-coloured spread shadow as well — a glow
 * around the chosen option — and a glowing radio row is the single most
 * reliable tell that a screen was generated rather than designed: no shipping
 * payment sheet has ever lit its selected method up like that. Border, tint
 * and the filled radio are three signals of selection already, which is two
 * more than the pattern needs.
 */
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
        "flex items-center gap-3 rounded-[13px] border px-3 py-3.5",
        selected ? "border-brand bg-brand/[0.04]" : "border-ink/10 bg-white",
      )}
    >
      {/* The radio, drawn — a native input here would inherit focus behaviour
          this scene has no business claiming. */}
      <span
        aria-hidden
        className={cn(
          "grid size-[17px] shrink-0 place-items-center rounded-full border-[1.5px]",
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
          "size-[18px] shrink-0",
          selected ? "text-brand" : "text-ink/30",
        )}
        strokeWidth={1.7}
      />

      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] leading-tight font-semibold text-ink">
          {title}
        </span>
        <span className="mt-1 block text-[10.5px] leading-[1.35] text-ink/45">
          {caption}
        </span>
      </span>

      {/*
        Price, then what it saves, in one right-hand column.

        The saving used to sit inline after the title, and at this measure
        there is not room for both on a line: the badge wrapped, the caption
        wrapped under it, and the discounted row came out half again as tall as
        the one below it — two options that are meant to be weighed against
        each other, drawn at two different sizes. Stacking the money together
        also puts the argument where the eye goes to compare, which is the
        column with the numbers in it.
      */}
      <span className="flex shrink-0 flex-col items-end gap-1">
        {strike ? (
          <span className="text-[10px] leading-none text-ink/35 tabular-nums line-through">
            {strike}
          </span>
        ) : null}
        <span
          className={cn(
            "text-[13px] leading-none font-semibold tabular-nums",
            selected ? "text-ink" : "text-ink/55",
          )}
        >
          {amount}
        </span>
        {badge ? (
          <span className="rounded-[5px] bg-brand/10 px-1.5 py-[2px] text-[8.5px] leading-[1.3] font-bold tracking-[0.03em] text-brand uppercase">
            {badge}
          </span>
        ) : null}
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
 * The review's verdict on the drawing itself was that it looked generated, and
 * it was right for reasons that were all the same reason: every stage opened
 * on a glowing gradient tile over centred copy, the selected payment method
 * sat inside a coloured halo, the verification had no action to complete and
 * left a third of the glass blank under it, and three unlabelled bars stood in
 * for a flow nothing named. What replaces them is the ordinary grammar of a
 * checkout — a named step rail, ranged-left headings, labelled fields, one
 * primary action at the foot of every stage, selection marked by a border
 * rather than by light — and the ordinariness is the point. It should look
 * like the product, not like a picture of a product.
 *
 * The frame is fixed and the stages are swapped inside it, so a loop running
 * behind the headline never nudges the layout. The header, the step rail and
 * the trust strip are outside the swap for the same reason — they are the
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
      {/*
        A whisper of colour at the crown, so the screen is lit rather than
        flat. Half the height and rather less of it than before: it used to run
        160px down the glass behind a brand-coloured badge, and the two
        together read as a coloured header band rather than as light.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-soft/70 to-transparent"
      />

      <StatusBar className="relative text-ink" />

      {/*
        App bar — the merchant's storefront, not ours.

        Closed by a hairline, which is what makes it chrome. Without one the
        merchant's name and the first line of the stage under it read as two
        parts of the same heading.
      */}
      <div className="relative mt-2.5 flex items-center gap-2.5 border-b border-ink/[0.06] px-5 pb-3">
        <span
          aria-hidden
          className="grid size-[26px] shrink-0 place-items-center rounded-[9px] bg-brand shadow-[0_1px_2px_rgba(37,99,235,0.35)]"
        >
          <ShieldCheck className="size-[15px] text-white" strokeWidth={2.1} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] leading-tight font-semibold tracking-[-0.01em]">
            {BRAND}
          </span>
          <span className="mt-0.5 block text-[9.5px] leading-none font-medium text-ink/40 tabular-nums">
            Order {ORDER.id}
          </span>
        </span>

        <span
          aria-hidden
          className="grid size-[22px] shrink-0 place-items-center rounded-full bg-ink/[0.05]"
        >
          <X className="size-3 text-ink/45" strokeWidth={2.2} />
        </span>
      </div>

      {/*
        The step rail.

        Three named segments for the three stages the buyer passes through,
        filling as they are cleared. It is what turns four unrelated screens
        into one journey: without it, a visitor who glances at the address
        stage has no way of knowing it follows the verification they saw a
        moment ago — and without the words under it, no way of knowing what
        either of them is.
      */}
      <div aria-hidden className="relative mt-3.5 flex gap-2 px-5">
        {STAGES.map(({ id, label }, index) => {
          const done = index < stageIndex;
          const current = index === stageIndex;

          return (
            <div key={id} className="flex-1">
              <span
                className={cn(
                  "block h-[3px] rounded-full transition-colors duration-500 ease-emphasized",
                  done
                    ? "bg-brand-check"
                    : current
                      ? "bg-brand"
                      : "bg-ink/[0.09]",
                )}
              />
              <span
                className={cn(
                  "mt-[7px] block text-[9px] leading-none font-semibold tracking-[-0.005em] transition-colors duration-500 ease-emphasized",
                  done
                    ? "text-ink/45"
                    : current
                      ? "text-ink/80"
                      : "text-ink/25",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/*
        The stage itself.

        `mode="wait"` rather than a crossfade: two checkout stages dissolving
        through each other is illegible at this size, and the short pause
        between them reads as a screen being replaced, which is what it is.
      */}
      <div className="relative mt-4 min-h-0 flex-1">
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
                  title="Verify your mobile number"
                  body="We sent a one-time password to your number. Enter it to confirm this cash-on-delivery order."
                />

                {/* The number under verification. */}
                <div className="mt-5 px-5">
                  <FieldLabel>Mobile number</FieldLabel>
                  <div
                    className={cn(
                      "mt-2 flex h-[46px] items-center gap-2.5 rounded-[13px] border bg-white px-3",
                      "transition-colors duration-300",
                      verified ? "border-brand-check/45" : "border-ink/12",
                    )}
                  >
                    <IndiaFlag />
                    <span className="text-[12.5px] font-semibold text-ink/70 tabular-nums">
                      +91
                    </span>
                    <ChevronDown aria-hidden className="size-3 text-ink/30" />
                    <span aria-hidden className="h-4 w-px bg-ink/10" />
                    <span className="flex-1 text-[14px] font-semibold tracking-[0.01em] tabular-nums">
                      98765 43210
                    </span>

                    {verified ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.26 }}
                        aria-hidden
                        className="grid size-[17px] shrink-0 place-items-center rounded-full bg-brand-check"
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
                <div className="mt-4 flex min-h-[62px] items-start gap-2.5 px-5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-[30px] shrink-0 place-items-center rounded-full bg-[#25D366]/12"
                  >
                    <WhatsappMark className="size-[17px]" />
                  </span>

                  <div className="min-w-0 flex-1 rounded-[14px] rounded-tl-[5px] border border-ink/[0.07] bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(11,27,54,0.06)]">
                    {/*
                      Short enough to hold one line at this measure. It read
                      "code for order #1042" and wrapped onto a second, which
                      put a two-line caption above a one-line code and made
                      the bubble top-heavy — and the words it lost are stated
                      by the heading above and by the code underneath.
                    */}
                    <p className="truncate text-[10px] leading-none text-ink/45">
                      {BRAND} ·{" "}
                      <span className="font-semibold text-ink/70">
                        {ORDER.id}
                      </span>
                    </p>

                    <div className="mt-2 flex h-[19px] items-center">
                      <AnimatePresence initial={false} mode="wait">
                        {beat.revealed ? (
                          <motion.p
                            key="code"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.26 }}
                            className="text-[17px] leading-none font-bold tracking-[0.22em] tabular-nums"
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
                          "grid h-[52px] flex-1 place-items-center rounded-[13px] border-[1.5px] text-[21px] font-bold tabular-nums",
                          "transition-[background-color,border-color,color] duration-300 ease-[var(--ease-emphasized)]",
                          filled
                            ? verified
                              ? "border-brand-check/50 bg-brand-check/[0.08] text-ink"
                              : "border-brand/45 bg-white text-ink"
                            : "border-ink/10 bg-ink/[0.02] text-transparent",
                          active && "border-brand bg-white",
                        )}
                      >
                        {filled ? (
                          digit
                        ) : active ? (
                          <span className="h-6 w-px animate-caret bg-brand" />
                        ) : (
                          digit
                        )}
                      </span>
                    );
                  })}
                </div>

                {/*
                  The resend line, which is the one thing every real one-time
                  password screen has and this one did not. It costs a line and
                  buys the whole field group its credibility.
                */}
                <p className="mt-3 px-5 text-[10px] leading-none text-ink/40">
                  Didn&rsquo;t get it?{" "}
                  <span className="font-semibold text-brand">
                    Resend on SMS
                  </span>
                </p>

                {/*
                  The foot of the stage: one reserved slot for the two states
                  the verification has, and the action under it. `mt-auto`
                  pins the pair to the bottom of the glass — see
                  `PrimaryAction` for why every stage ends this way.
                */}
                <div className="mt-auto px-5 pt-5">
                  <div className="h-[38px]">
                    {verified ? (
                      <p className="flex h-full items-center gap-2 rounded-[11px] bg-brand-check/12 px-3 text-[11px] font-semibold text-ink/75">
                        <span className="grid size-[17px] shrink-0 place-items-center rounded-full bg-brand-check">
                          <Check
                            className="size-2.5 text-white"
                            strokeWidth={3}
                          />
                        </span>
                        Number verified in 8 seconds
                      </p>
                    ) : (
                      <p className="flex h-full items-center rounded-[11px] bg-ink/[0.03] px-3 text-[11px] font-medium text-ink/45">
                        Enter the code to confirm this order
                      </p>
                    )}
                  </div>

                  <div className="mt-2.5">
                    <PrimaryAction>
                      {verified ? "Continue" : "Verify & continue"}
                    </PrimaryAction>
                  </div>
                </div>
              </>
            ) : null}

            {stage === "address" ? (
              <>
                <StageHead
                  title="Confirm your address"
                  body="We filled this in from your verified number, so there is nothing to type."
                />

                <div className="mt-5 px-5">
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel>Delivery address</FieldLabel>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-check/12 px-2 py-[3px] text-[8.5px] leading-[1.4] font-bold tracking-[0.03em] text-ink/60 uppercase">
                      <Check className="size-2.5" strokeWidth={3} />
                      Prefilled
                    </span>
                  </div>

                  {/*
                    A neutral card with a green badge above it, rather than a
                    green card. The tint used to run across the whole panel,
                    which said "this address is a success state" — it is just
                    an address. The badge is where the claim belongs.
                  */}
                  <div className="mt-2.5 rounded-[13px] border border-ink/10 bg-white px-3.5 py-3.5">
                    <p className="text-[13px] leading-tight font-semibold text-ink">
                      {ADDRESS.name}
                    </p>
                    <p className="mt-2 text-[11.5px] leading-[1.6] text-ink/60">
                      {ADDRESS.line}
                      <br />
                      {ADDRESS.area} — {ADDRESS.pin}
                    </p>

                    <span
                      aria-hidden
                      className="mt-3 block h-px bg-ink/[0.07]"
                    />

                    <p className="mt-3 flex items-center gap-2 text-[11px] leading-none font-medium text-ink/55 tabular-nums">
                      <Smartphone
                        aria-hidden
                        className="size-3.5 text-ink/30"
                      />
                      {ADDRESS.phone}
                      <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-brand">
                        <Pencil aria-hidden className="size-2.5" />
                        Edit
                      </span>
                    </p>
                  </div>
                </div>

                {/*
                  What the order comes to, stated on the step before the one
                  that offers to reduce it. It is the same figure the payment
                  stage strikes through a beat later, so the two screens read
                  as one transaction rather than as two mockups — and it is the
                  line a real checkout puts here, above the button, for exactly
                  that reason.
                */}
                <div className="mt-auto px-5 pt-5">
                  <p className="flex items-baseline justify-between rounded-[11px] bg-ink/[0.03] px-3.5 py-3">
                    <span className="text-[11px] leading-none text-ink/50">
                      Order total
                    </span>
                    <span className="text-[13px] leading-none font-semibold text-ink tabular-nums">
                      {inr.format(ORDER.total)}
                    </span>
                  </p>

                  <div className="mt-2.5">
                    <PrimaryAction>Use this address</PrimaryAction>
                  </div>
                </div>
              </>
            ) : null}

            {stage === "payment" ? (
              <>
                <StageHead
                  title="Choose how to pay"
                  body="Your store's payment rules decide what is offered on this order — and what it costs."
                />

                <div className="mt-5 px-5">
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel>Payment rules</FieldLabel>
                    <span className="rounded-full bg-brand/10 px-2 py-[3px] text-[8.5px] leading-[1.4] font-bold tracking-[0.03em] text-brand uppercase">
                      Prepaid discount on
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-2.5">
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

                {/* The same slot the address stage fills, carrying the figure
                    the whole control exists to produce. */}
                <div className="mt-auto px-5 pt-5">
                  <p className="flex items-baseline justify-between rounded-[11px] bg-brand/[0.05] px-3.5 py-3">
                    <span className="text-[11px] leading-none text-ink/55">
                      You save by paying now
                    </span>
                    <span className="text-[13px] leading-none font-semibold text-brand tabular-nums">
                      {inr.format(DISCOUNT)}
                    </span>
                  </p>

                  <div className="mt-2.5">
                    <PrimaryAction>
                      {`Pay ${inr.format(PREPAID_TOTAL)} now`}
                    </PrimaryAction>
                  </div>
                </div>
              </>
            ) : null}

            {stage === "placed" ? (
              <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
                {/*
                  The one badge left in the screen, and the only one that was
                  ever carrying its weight: a result genuinely wants a mark.
                  The halo pulsing behind it does not, and has gone with the
                  rest of them.
                */}
                <span
                  aria-hidden
                  className="grid size-14 place-items-center rounded-full bg-brand-check"
                >
                  <Check className="size-7 text-white" strokeWidth={3} />
                </span>

                <p className="mt-4 text-[19px] leading-tight font-semibold tracking-[-0.02em]">
                  Order placed
                </p>
                <p className="mt-2 max-w-[230px] text-[11px] leading-[1.55] text-ink/50">
                  Order {ORDER.id} is confirmed and paid. {BRAND} will be in
                  touch with the delivery updates.
                </p>

                <div className="mt-6 w-full space-y-2.5 rounded-[13px] border border-ink/[0.08] bg-ink/[0.015] px-3.5 py-3.5 text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] text-ink/50">
                      Number verified
                    </span>
                    <span className="text-[11px] font-semibold text-ink/75 tabular-nums">
                      {ADDRESS.phone}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] text-ink/50">
                      Delivering to
                    </span>
                    <span className="text-[11px] font-semibold text-ink/75 tabular-nums">
                      {ADDRESS.pin}
                    </span>
                  </div>

                  <span aria-hidden className="block h-px bg-ink/[0.07]" />

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-medium text-ink/60">
                      Paid online
                    </span>
                    <span className="text-[13px] font-semibold text-ink tabular-nums">
                      {inr.format(PREPAID_TOTAL)}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/*
        Trust, and whose screen this is.

        A hairline and two quiet lines rather than a filled pill. The pill was
        a third rounded container stacked under two others at the one point in
        the screen where nothing is being asked of the buyer, and the rule does
        the same job — separating the chrome from the stage — without adding an
        object to a frame that already had enough of them.
      */}
      <div className="relative border-t border-ink/[0.06] px-5 pt-3.5 pb-5">
        <p className="flex items-center justify-center gap-1.5">
          <Lock aria-hidden className="size-3 text-ink/35" />
          <span className="text-[10px] leading-none font-medium text-ink/45">
            Secure · trusted by 10,000+ merchants
          </span>
        </p>
        <p className="mt-2 text-center text-[9.5px] leading-none font-medium text-ink/30">
          Powered by{" "}
          <span className="font-bold text-ink/55">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
