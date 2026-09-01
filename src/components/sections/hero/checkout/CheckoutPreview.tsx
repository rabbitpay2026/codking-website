"use client";

import Image from "next/image";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Mail,
  MessageSquare,
  Pencil,
  Phone,
  Timer,
  Zap,
} from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import {
  CARD,
  CheckoutBody,
  CheckoutHeader,
  DiscountCard,
  IndiaFlag,
  LINK,
  OrderSummaryCard,
  PromoBar,
  SavedBanner,
  TrustFooter,
} from "@/components/sections/hero/checkout/CheckoutChrome";
import {
  CART,
  CART_TOTAL,
  CODE_LENGTH,
  DELIVERY,
  inr,
  inrShort,
  ORDER_ID,
  PAYMENT_OPTIONS,
  RESEND_SECONDS,
  SAVED_PHONE,
  SAVED_PHONE_PRETTY,
} from "@/components/sections/hero/checkout/checkoutDemo";
import { cn } from "@/lib/utils";

import type { PaymentOption } from "@/components/sections/hero/checkout/checkoutDemo";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

/**
 * The tempo of the demonstration, in milliseconds.
 *
 * Every automatic beat in this component reads its delay from here, so the
 * pacing of the whole loop can be read — and retuned — in one place instead of
 * being spread across seven effects. Nothing else in the file holds a number
 * of milliseconds.
 *
 * The values are uneven on purpose. Typing beats are short, because watching
 * something be typed slowly is watching someone type slowly. The beats that
 * carry the argument — the payment ladder before a method is chosen, and the
 * confirmation — are long enough to be read by someone who arrived at the page
 * mid-loop.
 */
const BEAT = {
  /**
   * The number screen, held before a single digit is typed.
   *
   * The most valuable pause in the loop, and the one the first pass did not
   * have. Somebody arriving here has a summary, a discount, a heading and a
   * field to read before anything moves; typing on arrival made the screen and
   * the typing compete for the same two seconds and neither was legible.
   * Nothing happens until the screen has been seen.
   */
  beforeTyping: 1800,
  /** Between two digits of the mobile number. */
  typeDigit: 140,
  /** Between the last digit and the press of Continue. */
  beforeContinue: 1000,
  /** The code screen, held before the first digit — see `beforeTyping`. */
  beforeCode: 1500,
  /** Between two digits of the code. */
  typeCode: 320,
  /** Between the last digit and the code being accepted. */
  beforeVerify: 1000,
  /**
   * The delivery details and the ladder, held long enough to be read.
   *
   * The longest beat in the loop, and it is one beat rather than two because
   * this design puts the address and the payment ladder on a single screen the
   * way the reference does. It therefore has to buy the time both would have
   * had separately: about two seconds to take in an address that was filled in
   * without being asked for, and about two more to read four ways to pay.
   */
  readLadder: 4200,
  /** The chosen row, held so the selection is seen before the screen leaves. */
  afterChoice: 1200,
  /** The order with the gateway, or with the COD verification. */
  processing: 1800,
  /** The confirmation, before the loop begins again. */
  confirmed: 3200,
  /**
   * How long a visitor who took the wheel is left alone before the
   * demonstration resumes.
   *
   * Long enough that nobody reading the payment ladder has it restart under
   * them — which means comfortably longer than the longest beat above — and
   * short enough that a hero abandoned mid-flow does not sit frozen for the
   * next visitor to the same page. Every press and every keystroke starts it
   * over.
   */
  idleResume: 20000,
} as const;

/** The code the demonstration types. Simulated — nothing is sent anywhere. */
const DEMO_CODE = "1234";

/**
 * The row the demonstration chooses.
 *
 * Cash on delivery, deliberately, and it is the whole reason the ladder is on
 * the screen: a merchant watching this is not evaluating a card form, they are
 * evaluating what happens when a buyer picks the option that costs them money.
 * The demonstration therefore ends on a COD order that was verified before it
 * was accepted, which is the product's argument in one frame.
 */
const AUTO_METHOD = "cod";

type Stage = "phone" | "code" | "pay" | "processing" | "done";

/** The order the flow runs in, so the back arrow has somewhere to go. */
const BACK_TO: Partial<Record<Stage, Stage>> = {
  code: "phone",
  pay: "code",
  done: "pay",
};

/**
 * The one-line description of the state a visitor is in, for the label on the
 * whole widget. A screen reader landing on an interactive graphic in a hero
 * should be told what it is before it is told what is in it.
 */
const STAGE_LABEL: Record<Stage, string> = {
  phone: "entering a mobile number",
  code: "verifying the one-time code",
  pay: "choosing how to pay",
  processing: "verifying the order",
  done: "order confirmed",
};

/**
 * The mark that spins while something is happening elsewhere.
 *
 * A ring, an arc and our own mark — ours rather than the shop's, which is the
 * one place on this surface where that is the right way round. The app bar
 * belongs to the merchant, because a buyer's checkout carries the name of the
 * store they are buying from; these two waits are the moments COD King is
 * doing something, and the second of them is literally the order being
 * verified. The mark names who is working.
 *
 * The square icon rather than the wordmark, because the space it has to sit in
 * is a 38-pixel circle and a wordmark set to fit that is a smudge.
 *
 * `priority`, and that is not an optimisation: this mark is unmounted and
 * remounted on every turn of the loop, and left to lazy-load it missed its own
 * first appearance — the loader rendered as an empty ring on the opening
 * frame of the page, which is the one frame that has to be right.
 *
 * The arc is the only thing that moves, and under reduced motion it is not
 * drawn at all: a plain ring around the mark says "waiting" just as well.
 *
 * That withholding is done in CSS rather than from the `useReducedMotion`
 * value, and the difference is not cosmetic. The hook cannot know the
 * preference on the server, so branching the markup on it renders an arc that
 * the client then refuses to hydrate — a real mismatch, caught in a
 * reduced-motion pass. `motion-reduce:` is resolved by the browser after the
 * markup has already agreed with itself.
 */
function BrandSpinner() {
  return (
    <span className="relative grid size-[54px] shrink-0 place-items-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border-[3px] border-black/[0.07]"
      />
      <span
        aria-hidden
        className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#6d4aff] [animation-duration:1s] motion-reduce:hidden"
      />
      <span className="grid size-[38px] place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.14)]">
        <Image
          src="/logos/cod-king-icon.png"
          alt=""
          width={26}
          height={26}
          priority
          className="size-[25px] rounded-[7px]"
        />
      </span>
    </span>
  );
}

/**
 * The full-bleed wait, while the order is being verified.
 *
 * Deliberately without the app bar, the promotion or the trust strip — the
 * reference draws this moment the same way, and that is what makes it read as
 * the moment *between* two screens rather than as a screen with nothing on it.
 * Losing the chrome for a second and a half is also what gives the
 * confirmation an entrance when the chrome comes back.
 */
function WaitScreen({ label }: { readonly label: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-[20px] px-[28px]">
      <p className="text-center text-[13.5px] leading-tight font-medium text-[#0b1b36]/75">
        {label}
      </p>
      <BrandSpinner />
    </div>
  );
}

/** The heading a stage opens on, centred the way the reference centres it. */
function StageHead({
  title,
  children,
}: {
  readonly title: string;
  readonly children?: React.ReactNode;
}) {
  return (
    <div className="pt-[14px] text-center">
      <p className="text-[15.5px] leading-tight font-semibold text-[#0b1b36]">
        {title}
      </p>
      {children}
    </div>
  );
}

/**
 * One way to pay, as the store's rules offer it.
 *
 * The row is the whole control: pressing it chooses the method *and* commits
 * to it, which is what a payment sheet on a phone actually does — the chevron
 * on the right says so, and a separate confirm button underneath would be a
 * pattern this screen does not use.
 *
 * Selection is marked by a tint and a hairline ring and nothing else. No glow,
 * no coloured shadow: a lit-up payment row is the single most reliable tell
 * that a checkout was generated rather than designed.
 */
function PaymentRow({
  option,
  selected,
  first,
  onSelect,
}: {
  readonly option: PaymentOption;
  readonly selected: boolean;
  readonly first: boolean;
  readonly onSelect: () => void;
}) {
  const { icon: Icon, title, caption, amount, strike, note, noteTone } = option;

  return (
    <>
      {first ? null : (
        <span aria-hidden className="mx-[4px] block h-px bg-black/[0.06]" />
      )}

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "flex w-full items-center gap-[9px] rounded-[8px] px-[5px] py-[8px] text-left transition-colors duration-200",
          "focus-visible:ring-2 focus-visible:ring-[#2563eb]/45 focus-visible:outline-none",
          selected
            ? "bg-[#2563eb]/[0.05] ring-1 ring-[#2563eb]/25 ring-inset"
            : "hover:bg-black/[0.025]",
        )}
      >
        <Icon
          aria-hidden
          className={cn(
            "size-[17px] shrink-0",
            selected ? "text-[#2563eb]" : "text-[#0b1b36]/40",
          )}
          strokeWidth={1.7}
        />

        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] leading-tight font-semibold text-[#0b1b36]">
            {title}
          </span>
          <span className="mt-[3px] block text-[10.5px] leading-[1.35] text-[#0b1b36]/50">
            {caption}
          </span>
          {note ? (
            <span
              className={cn(
                "mt-[4px] flex items-center gap-[3px] text-[9.5px] leading-none font-semibold",
                noteTone === "cost" ? "text-[#dc2626]" : "text-[#16a34a]",
              )}
            >
              {noteTone === "good" ? (
                <span
                  aria-hidden
                  className="grid size-[10px] shrink-0 place-items-center rounded-full bg-[#16a34a]"
                >
                  <Check className="size-[7px] text-white" strokeWidth={4} />
                </span>
              ) : null}
              {note}
            </span>
          ) : null}
        </span>

        <span className="flex shrink-0 items-center gap-[5px]">
          <span className="flex flex-col items-end gap-[2px]">
            {strike ? (
              <span className="text-[9.5px] leading-none text-[#0b1b36]/35 tabular-nums line-through">
                {inrShort(strike)}
              </span>
            ) : null}
            <span className="text-[12.5px] leading-none font-semibold text-[#0b1b36] tabular-nums">
              {inrShort(amount)}
            </span>
          </span>
          <ChevronRight
            aria-hidden
            className="size-[13px] shrink-0 text-[#0b1b36]/30"
            strokeWidth={2.2}
          />
        </span>
      </button>
    </>
  );
}

/**
 * The COD King checkout, running.
 *
 * This is the hero's product scene, and it is the product itself rather than a
 * picture of it: a real number field, a real code field that accepts a paste,
 * real payment rows that take a press, and six states that follow one another
 * without the page ever navigating. Everything a visitor can press is a
 * `<button>` or an `<input>`, so the demonstration is reachable from a keyboard
 * and announces itself to a screen reader.
 *
 * It replaced an iPhone frame with a screen inside it. The frame was doing the
 * arguing — chamfered titanium, a dynamic island, three contact shadows — and
 * a merchant evaluating a COD app does not need to be told what a phone looks
 * like. What they need is to see the checkout their buyers will see, at the
 * size they will see it, doing the thing it does. So the hardware is gone and
 * the surface is the whole object.
 *
 * The flow is the happy case and nothing else: the number is verified, the
 * address is already written, the payment ladder makes paying now cheapest,
 * and the order goes through. A hero is the wrong place to teach a merchant
 * what a blocked order looks like.
 *
 * Nothing automatic runs while the section is off screen, and under reduced
 * motion the wait passes in a frame, the spinner's arc is not drawn and the
 * confirmation does not loop back to the beginning. The flow itself always
 * remains available by hand, because it is made of real controls.
 */
export function CheckoutPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25 });
  const prefersReduced = useReducedMotion() ?? false;

  const [stage, setStage] = useState<Stage>("phone");
  const [digits, setDigits] = useState("");
  const [code, setCode] = useState<readonly string[]>(() =>
    Array.from({ length: CODE_LENGTH }, () => ""),
  );
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  /*
    Nothing is chosen on arrival at the ladder, and that is what makes the
    selection beat legible: a row that is already lit when the screen opens
    cannot be seen being chosen.
  */
  const [method, setMethod] = useState<PaymentOption | null>(null);

  /*
    Whether the demonstration is driving.

    True until a visitor does something that only a person does — puts a caret
    in a field, presses a button, pastes a code — at which point every
    automatic beat stops mid-flow and the checkout becomes an ordinary one they
    can finish by hand. It comes back on its own after `BEAT.idleResume` of
    nothing happening, so a hero someone poked at and walked away from is
    running again for whoever arrives next.
  */
  const [auto, setAuto] = useState(true);
  /*
    Bumped by every interaction, and depended on by the idle timer — which is
    how "fifteen seconds since the *last* thing they did" is expressed without
    storing a timestamp and polling it.
  */
  const [touches, setTouches] = useState(0);

  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  /*
    A request, pending, for the caret to land in the first code box.

    Raised only when the code screen was reached by a press — a hero that grabs
    the caret on its own would scroll a visitor's page out from under them —
    and honoured by the box's own ref callback rather than by an effect on the
    stage. That is not a stylistic preference: the stages cross-fade, so at the
    moment the stage changes the boxes have not mounted yet and an effect fires
    at a ref array that is still empty. The callback fires when the field
    actually exists, which is the only moment focus can be given to it.
  */
  const wantsCaret = useRef(false);

  const phoneShown = digits;
  const verifiedNumber = digits.length === 10 ? digits : SAVED_PHONE;
  const prettyVerified = `+91 ${verifiedNumber.slice(0, 5)} ${verifiedNumber.slice(5)}`;

  const codOption =
    PAYMENT_OPTIONS.find((option) => option.id === AUTO_METHOD) ??
    PAYMENT_OPTIONS[PAYMENT_OPTIONS.length - 1];

  /*
    Whether the demonstration may take a beat right now.

    One expression, checked by every automatic effect below, so there is
    exactly one answer to "should this be moving" rather than seven of them.
    Three things have to be true: nobody has taken the wheel, the section is on
    screen — a chain of timers re-rendering a React tree for nobody is the same
    waste as an interval — and motion is not reduced, where a hero that plays
    itself is precisely what the preference asks us not to build.
  */
  const driving = auto && inView && !prefersReduced;

  /**
   * Wind the whole thing back to the first frame.
   *
   * Used by the loop, by the confirmation's own button and by "Not you?", so
   * there is one definition of what a fresh run looks like and no state can be
   * left behind from the run before. `auto` is deliberately not touched here:
   * the loop is already driving when it calls this, and a visitor pressing
   * Replay is asking for the demonstration back, which that button says
   * explicitly by setting it itself.
   */
  const restart = useCallback(() => {
    wantsCaret.current = false;
    setDigits("");
    setCode(Array.from({ length: CODE_LENGTH }, () => ""));
    setSeconds(RESEND_SECONDS);
    setMethod(null);
    setStage("phone");
  }, []);

  /**
   * A visitor has taken the wheel.
   *
   * Called from every control a person can reach. It stops the demonstration
   * where it stands rather than fighting it — an automatic beat landing in the
   * middle of somebody's typing is the one behaviour that would make this feel
   * broken — and restarts the idle countdown that eventually hands the wheel
   * back.
   */
  const takeOver = useCallback(() => {
    setAuto(false);
    setTouches((n) => n + 1);
  }, []);

  const writeDigit = useCallback((index: number, value: string) => {
    setCode((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  }, []);

  /**
   * Move to the code screen with whatever number is in the field.
   *
   * `byHand` decides one thing and it matters: whether the caret is moved into
   * the first code box. A hero that grabs the caret on its own would scroll a
   * visitor's page out from under them, so the demonstration never asks for
   * it — it types into state, not into a focused field.
   */
  const advance = useCallback(
    (byHand: boolean) => {
      wantsCaret.current = byHand;
      /*
        A short number is completed rather than rejected. The saved number is
        already on the screen under the field, so filling it in is what the
        "Continue with" row means — and a demonstration that dead-ends on a
        validation message has stopped demonstrating anything.
      */
      if (digits.length !== 10) setDigits(SAVED_PHONE);
      setSeconds(RESEND_SECONDS);
      setStage("code");
    },
    [digits],
  );

  /* ------------------------------------------------------------------
     The demonstration.

     Seven effects, one per beat, and every one of them holds at most a single
     timeout that it clears on the way out. That is the whole concurrency
     story: no intervals, nothing accumulating, and a component that unmounts
     mid-beat leaves nothing behind.

     The beats that type — the number and the code — schedule one character at
     a time and let the state change re-run the effect, which is what keeps a
     ten-digit animation to one live timer rather than ten.
     ------------------------------------------------------------------ */

  /* The number types itself, then presses Continue. */
  useEffect(() => {
    if (!driving || stage !== "phone") return;

    if (digits.length < SAVED_PHONE.length) {
      const id = window.setTimeout(
        () => setDigits(SAVED_PHONE.slice(0, digits.length + 1)),
        digits.length === 0 ? BEAT.beforeTyping : BEAT.typeDigit,
      );
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => advance(false), BEAT.beforeContinue);
    return () => window.clearTimeout(id);
  }, [advance, digits, driving, stage]);

  /* The resend countdown, which only runs while it is on screen. */
  useEffect(() => {
    if (stage !== "code" || seconds <= 0 || !inView) return;

    const id = window.setTimeout(() => setSeconds((left) => left - 1), 1000);
    return () => window.clearTimeout(id);
  }, [inView, seconds, stage]);

  /* The code types itself; a full code is accepted however it got there.

     One effect rather than two, because the typing and the acceptance are the
     same question asked of the same state — "is there an empty box left" — and
     splitting them is how two timers end up racing to leave the same screen. */
  useEffect(() => {
    if (stage !== "code") return;

    const next = code.findIndex((digit) => digit === "");

    if (next === -1) {
      const id = window.setTimeout(() => setStage("pay"), BEAT.beforeVerify);
      return () => window.clearTimeout(id);
    }

    if (!driving) return;

    const id = window.setTimeout(
      () => writeDigit(next, DEMO_CODE[next] ?? "0"),
      next === 0 ? BEAT.beforeCode : BEAT.typeCode,
    );
    return () => window.clearTimeout(id);
  }, [code, driving, stage, writeDigit]);

  /* The ladder is read, then cash on delivery is chosen, then the screen goes.

     The selection and the departure are two beats rather than one so the lit
     row is on screen long enough to be seen being lit — which is the only
     reason this screen is in the loop at all. */
  useEffect(() => {
    if (!driving || stage !== "pay") return;

    if (method?.id !== codOption.id) {
      const id = window.setTimeout(() => setMethod(codOption), BEAT.readLadder);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(
      () => setStage("processing"),
      BEAT.afterChoice,
    );
    return () => window.clearTimeout(id);
  }, [codOption, driving, method, stage]);

  /* The verification comes back. */
  useEffect(() => {
    if (stage !== "processing") return;

    const id = window.setTimeout(
      () => setStage("done"),
      prefersReduced ? 0 : BEAT.processing,
    );
    return () => window.clearTimeout(id);
  }, [prefersReduced, stage]);

  /* The confirmation holds, then the whole thing begins again. */
  useEffect(() => {
    if (!driving || stage !== "done") return;

    const id = window.setTimeout(restart, BEAT.confirmed);
    return () => window.clearTimeout(id);
  }, [driving, restart, stage]);

  /* A visitor who took the wheel and then stopped gets it taken back, from the
     top. `touches` is in the dependencies rather than the body: every press
     bumps it, which tears this timer down and starts a fresh one, so the wait
     is measured from the last thing they did rather than from the first. */
  useEffect(() => {
    if (auto || prefersReduced || !inView) return;

    const id = window.setTimeout(() => {
      restart();
      setAuto(true);
    }, BEAT.idleResume);
    return () => window.clearTimeout(id);
  }, [auto, inView, prefersReduced, restart, touches]);

  const goBack = useCallback(() => {
    takeOver();
    setStage((current) => BACK_TO[current] ?? current);
  }, [takeOver]);

  const onCodeChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      takeOver();
      const value = event.target.value.replace(/\D/g, "").slice(-1);
      if (!value) {
        writeDigit(index, "");
        return;
      }

      writeDigit(index, value);
      codeRefs.current[index + 1]?.focus();
    };

  const onCodeKeyDown =
    (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      takeOver();
      if (event.key === "Backspace" && !code[index] && index > 0) {
        event.preventDefault();
        writeDigit(index - 1, "");
        codeRefs.current[index - 1]?.focus();
        return;
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        codeRefs.current[index - 1]?.focus();
      }
      if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
        event.preventDefault();
        codeRefs.current[index + 1]?.focus();
      }
    };

  /* A code arrives from a message as four digits at once, so the field takes
     them that way rather than making somebody split a paste by hand. */
  const onCodePaste =
    (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
      const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
      if (!pasted) return;

      event.preventDefault();
      takeOver();
      setCode((current) => {
        const next = [...current];
        for (
          let offset = 0;
          index + offset < CODE_LENGTH && offset < pasted.length;
          offset += 1
        ) {
          next[index + offset] = pasted[offset];
        }
        return next;
      });

      const landed = Math.min(index + pasted.length, CODE_LENGTH - 1);
      codeRefs.current[landed]?.focus();
    };

  /**
   * A row pressed by a person.
   *
   * The two beats the demonstration takes over this — light the row, then
   * leave the screen — collapse into one short pause here, because somebody
   * who pressed the row already knows what they picked and is waiting on the
   * result rather than on a demonstration of their own press.
   */
  const choose = useCallback(
    (option: PaymentOption) => {
      takeOver();
      setMethod(option);
      window.setTimeout(() => setStage("processing"), 420);
    },
    [takeOver],
  );

  const bare = stage === "processing";

  /*
    What the wait and the confirmation are called depends on what was chosen,
    because a cash order is not a payment: nothing is taken from anybody, the
    order is checked and accepted. Saying "Processing your payment" over a COD
    order would be the one plainly untrue sentence on the screen — and COD is
    what the demonstration picks, so it is the wording a visitor reads.
  */
  const paidNow = (method?.paidNow ?? 0) > 0;

  /*
    What the confirmation reports on. Nothing reaches that screen without a row
    having been chosen, so this fallback is unreachable — it exists so the
    nullable selection does not leak an optional chain into six lines of a
    receipt, where a silently missing figure would be worse than a wrong one.
  */
  const settled = method ?? codOption;

  /* Which code box the demonstration is filling, or -1 when a person has the
     keyboard and the browser's own focus ring is doing this job. */
  const typingBox =
    driving && stage === "code" ? code.findIndex((digit) => digit === "") : -1;

  return (
    /*
      The checkout fills whatever box it is given, and draws no box of its own.

      It used to own its surface — a rounded card with a ring, three shadows
      and its own `screen-fit` scaler — because it was standing in the hero
      unframed. It is now the screen inside the device in `HeroStage`, so all
      of that belongs to the glass: a card with its own radius and shadow
      sitting inside a phone is a screenshot pasted onto a screen, which is the
      one thing a device mockup must not look like.

      What is left is the flow itself, unchanged. `flex-1` rather than a fixed
      aspect, so the fixed chrome above and below keeps its exact pixel sizes
      and the scrolling band between them takes the rest of the glass.
    */
    <div
      ref={rootRef}
      role="group"
      aria-label={`Interactive COD King checkout — ${STAGE_LABEL[stage]}`}
      className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#f4f6fb] font-sans text-[#0b1b36] antialiased"
    >
      {/*
              Two levels of presence rather than one, and the reason is a fault
              the first pass had: with the app bar, the promotion and the trust
              strip mounted outside the transition, they vanished the instant
              the payment was pressed while the sheet under them was still
              fading, and the surface collapsed a frame before it dissolved.

              So the chrome belongs to the checkout and leaves with it, and the
              stages cross-fade *inside* the chrome — which is also what keeps
              the header from moving a pixel between the number screen and the
              code screen. The wait, which the reference draws without any
              chrome at all, is the other half of the outer swap.
            */}
      <AnimatePresence initial={false} mode="wait">
        {bare ? (
          <motion.div
            key="wait"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <WaitScreen
              label={
                paidNow
                  ? "Processing your payment..."
                  : "Verifying your order..."
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <CheckoutHeader onBack={goBack} />
            <PromoBar />

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={stage}
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
                className="flex min-h-0 flex-1 flex-col"
              >
                {stage === "phone" ? (
                  <CheckoutBody>
                    <div className="space-y-[9px]">
                      <OrderSummaryCard />
                      <DiscountCard />
                    </div>

                    <StageHead title="Enter mobile number">
                      <p className="mt-[3px] text-[11.5px] leading-tight text-[#0b1b36]/45">
                        Provide your mobile number to continue
                      </p>
                    </StageHead>

                    {/* The field. One box, one divider, one caret. */}
                    <div
                      className={cn(
                        CARD,
                        "mt-[11px] flex h-[46px] items-center px-[11px]",
                      )}
                    >
                      <span className="flex shrink-0 items-center gap-[5px]">
                        <IndiaFlag />
                        <span className="text-[13px] leading-none font-medium text-[#0b1b36]">
                          +91
                        </span>
                        <ChevronDown
                          aria-hidden
                          className="size-[13px] text-[#0b1b36]/40"
                          strokeWidth={2.2}
                        />
                      </span>

                      <span
                        aria-hidden
                        className="mx-[10px] h-[22px] w-px shrink-0 bg-black/[0.09]"
                      />

                      {/*
                        16px, and that number is load-bearing rather than
                        aesthetic: Safari on iOS zooms the page when a field
                        below 16px takes focus, and it reads the computed size
                        rather than the scaled one. A checkout that jerks the
                        hero sideways on the first tap is not a good
                        demonstration of a checkout.
                      */}
                      <span className="relative min-w-0 flex-1 text-[16px] tabular-nums">
                        <input
                          value={phoneShown}
                          onFocus={takeOver}
                          onChange={(event) => {
                            takeOver();
                            setDigits(
                              event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10),
                            );
                          }}
                          onKeyDown={(event) => {
                            takeOver();
                            if (event.key === "Enter") advance(true);
                          }}
                          type="tel"
                          inputMode="numeric"
                          autoComplete="off"
                          aria-label="Mobile number"
                          placeholder="Phone"
                          className="w-full bg-transparent text-[16px] leading-none tracking-[0.01em] text-[#0b1b36] tabular-nums outline-none placeholder:font-normal placeholder:text-[#0b1b36]/35"
                        />

                        {/*
                          The caret the demonstration types behind.

                          Without it the digits simply appear, which reads as a
                          field being filled by a script — which is what it is,
                          and precisely what it must not look like. A caret
                          blinking at the end of the number is the one detail
                          that makes the sequence read as somebody entering
                          their number.

                          Placed in `ch`, which is the advance of a zero in the
                          current font: with `tabular-nums` every digit is that
                          same width, so the offset is exact arithmetic rather
                          than a measurement, and it stays exact at whatever
                          scale the hero renders the surface at. It is drawn
                          only while the demonstration is typing — a real caret
                          takes over the moment a visitor does.
                        */}
                        {driving && digits.length < 10 ? (
                          <span
                            aria-hidden
                            style={{ left: `${digits.length}ch` }}
                            className="pointer-events-none absolute top-1/2 h-[17px] w-[1.5px] -translate-y-1/2 animate-caret bg-[#0b1b36]/70"
                          />
                        ) : null}
                      </span>
                    </div>

                    {/* The number this checkout has seen before. */}
                    <div
                      className={cn(
                        CARD,
                        "relative mt-[10px] px-[13px] py-[10px]",
                      )}
                    >
                      <span
                        aria-hidden
                        className="absolute -top-[4px] right-[26px] size-[9px] rotate-45 rounded-[2px] bg-white"
                      />
                      <p className="relative text-[12px] leading-none text-[#0b1b36]/45">
                        Continue with
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          takeOver();
                          setDigits(SAVED_PHONE);
                        }}
                        className="relative mt-[8px] flex items-center gap-[7px] rounded-[4px] focus-visible:ring-2 focus-visible:ring-[#2563eb]/45 focus-visible:outline-none"
                      >
                        <Phone
                          aria-hidden
                          className="size-[13px] shrink-0 text-[#0b1b36]/45"
                          strokeWidth={1.8}
                        />
                        <span className="text-[12.5px] leading-none font-medium text-[#0b1b36] tabular-nums underline underline-offset-[3px]">
                          {SAVED_PHONE_PRETTY}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => advance(true)}
                      className="mt-[12px] flex h-[46px] w-full items-center justify-center gap-[8px] rounded-[9px] bg-black text-[14.5px] font-semibold tracking-[-0.01em] text-white transition-colors hover:bg-[#161620] focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <MessageSquare
                        aria-hidden
                        className="size-[15px]"
                        strokeWidth={1.9}
                      />
                      Continue
                    </button>

                    <p className="mt-[11px] flex items-center justify-center gap-[7px] text-[11.5px] leading-none text-[#0b1b36]/50">
                      Send OTP via
                      <span className="grid size-[19px] place-items-center rounded-[5px] bg-[#e8f9ee]">
                        <WhatsappMark className="size-[13px]" />
                      </span>
                    </p>
                  </CheckoutBody>
                ) : null}

                {stage === "code" ? (
                  <CheckoutBody>
                    <div className="space-y-[9px]">
                      <OrderSummaryCard />
                      <DiscountCard />
                    </div>

                    <StageHead title="Verify Mobile Number">
                      <p className="mt-[5px] flex items-center justify-center gap-[5px] text-[11.5px] leading-none text-[#0b1b36]/60">
                        Enter the code sent to{" "}
                        <span className="font-semibold text-[#0b1b36] tabular-nums">
                          {prettyVerified}
                        </span>
                        <button
                          type="button"
                          onClick={goBack}
                          aria-label="Change the mobile number"
                          className={cn(
                            "grid size-[15px] shrink-0 place-items-center rounded-[3px] ring-1 ring-[#2563eb]/30",
                            LINK,
                            "focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 focus-visible:outline-none",
                          )}
                        >
                          <Pencil className="size-[9px]" strokeWidth={2.2} />
                        </button>
                      </p>
                    </StageHead>

                    <div className="mt-[14px] flex items-center justify-center gap-[11px]">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(node) => {
                            codeRefs.current[index] = node;
                            if (index === 0 && node && wantsCaret.current) {
                              wantsCaret.current = false;
                              node.focus();
                            }
                          }}
                          value={digit}
                          onChange={onCodeChange(index)}
                          onKeyDown={onCodeKeyDown(index)}
                          onPaste={onCodePaste(index)}
                          onFocus={(event) => event.target.select()}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
                          className={cn(
                            "h-[48px] w-[52px] rounded-[7px] border bg-white text-center text-[17px] font-semibold text-[#0b1b36] tabular-nums transition-colors outline-none",
                            "border-black/[0.12] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20",
                            digit ? "border-[#2563eb]/60" : "",
                            /*
                                    The box the demonstration is about to type
                                    into, lit exactly as focus lights it.

                                    Nothing is really focused while the
                                    demonstration runs — see `wantsCaret` for
                                    why a hero must not take the caret — so
                                    without this the code appears box by box
                                    with no indication of where it is going,
                                    and the sequence reads as four fields being
                                    populated rather than as one being filled.
                                  */
                            index === typingBox &&
                              "border-[#2563eb] ring-2 ring-[#2563eb]/20",
                          )}
                        />
                      ))}
                    </div>

                    <p className="mt-[12px] flex items-center justify-center gap-[5px] text-center text-[11px] leading-none text-[#0b1b36]/50">
                      {seconds > 0 ? (
                        <>
                          Didn&apos;t receive the Code? Retry in
                          <Timer
                            aria-hidden
                            className={cn("size-[11px] shrink-0", LINK)}
                            strokeWidth={2}
                          />
                          <span
                            className={cn("font-semibold tabular-nums", LINK)}
                          >
                            {seconds}s
                          </span>
                        </>
                      ) : (
                        <>
                          Didn&apos;t receive the Code?
                          <button
                            type="button"
                            onClick={() => {
                              takeOver();
                              setSeconds(RESEND_SECONDS);
                            }}
                            className={cn(
                              "font-semibold underline underline-offset-[3px]",
                              LINK,
                              "rounded-[3px] focus-visible:ring-2 focus-visible:ring-[#2563eb]/45 focus-visible:outline-none",
                            )}
                          >
                            Resend OTP
                          </button>
                        </>
                      )}
                    </p>
                  </CheckoutBody>
                ) : null}

                {stage === "pay" ? (
                  <>
                    <SavedBanner className="shrink-0" />
                    <CheckoutBody className="pt-[8px] pb-[8px]">
                      {/* Where it is going — already written, from the number. */}
                      <div className={cn(CARD, "px-[13px] py-[11px]")}>
                        <div className="flex items-center justify-between gap-[8px]">
                          <p className="text-[14px] leading-none font-semibold text-[#0b1b36]">
                            Delivery details
                          </p>
                          <span
                            className={cn(
                              "text-[12px] leading-none font-semibold",
                              LINK,
                            )}
                          >
                            Change
                          </span>
                        </div>

                        <div className="mt-[9px] flex items-center gap-[7px]">
                          <p className="text-[12.5px] leading-none font-semibold text-[#0b1b36]">
                            {DELIVERY.name}
                          </p>
                          <span className="rounded-[5px] bg-black/[0.05] px-[6px] py-[3px] text-[9.5px] leading-none font-medium text-[#0b1b36]/55">
                            {DELIVERY.tag}
                          </span>
                        </div>

                        <p className="mt-[4px] text-[10.5px] leading-[1.45] text-[#0b1b36]/50">
                          {DELIVERY.line}, {DELIVERY.area}
                        </p>

                        <div className="mt-[6px] flex flex-wrap items-center gap-x-[12px] gap-y-[4px] text-[10px] leading-none text-[#0b1b36]/50">
                          <span className="flex items-center gap-[5px]">
                            <Phone
                              aria-hidden
                              className="size-[11px] shrink-0"
                              strokeWidth={1.8}
                            />
                            <span className="tabular-nums">
                              {DELIVERY.phone}
                            </span>
                          </span>
                          <span className="flex min-w-0 items-center gap-[5px]">
                            <Mail
                              aria-hidden
                              className="size-[11px] shrink-0"
                              strokeWidth={1.8}
                            />
                            <span className="truncate">{DELIVERY.email}</span>
                          </span>
                        </div>
                      </div>

                      {/* The ladder. Cheapest first, so it reads downward. */}
                      <div
                        className={cn(
                          CARD,
                          "mt-[9px] px-[9px] pt-[10px] pb-[8px]",
                        )}
                      >
                        <p className="px-[4px] text-[14px] leading-none font-semibold text-[#0b1b36]">
                          Pay via
                        </p>
                        <p className="mt-[5px] flex items-center gap-[5px] px-[4px] text-[10px] leading-none text-[#0b1b36]/45">
                          <Zap
                            aria-hidden
                            className="size-[11px] shrink-0 fill-[#2563eb] text-[#2563eb]"
                            strokeWidth={1.5}
                          />
                          Enjoy fast delivery on all prepaid orders
                        </p>

                        <div className="mt-[6px]">
                          {PAYMENT_OPTIONS.map((option, index) => (
                            <PaymentRow
                              key={option.id}
                              option={option}
                              first={index === 0}
                              selected={method?.id === option.id}
                              onSelect={() => choose(option)}
                            />
                          ))}
                        </div>

                        <p className="mt-[6px] px-[4px] text-right text-[9px] leading-none text-[#0b1b36]/35">
                          * Price inclusive of all taxes
                        </p>
                      </div>

                      <div className="mt-[10px] flex items-center justify-center gap-[8px]">
                        <span className="text-[11px] leading-none text-[#0b1b36]/50 tabular-nums">
                          {prettyVerified}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            takeOver();
                            restart();
                          }}
                          className="rounded-[6px] border border-black/[0.13] bg-white px-[8px] py-[4px] text-[10.5px] leading-none font-medium text-[#0b1b36]/65 transition-colors hover:bg-black/[0.03] focus-visible:ring-2 focus-visible:ring-[#2563eb]/45 focus-visible:outline-none"
                        >
                          Not you?
                        </button>
                      </div>
                    </CheckoutBody>
                  </>
                ) : null}

                {stage === "done" ? (
                  <>
                    <SavedBanner className="shrink-0" />
                    <CheckoutBody className="flex flex-col items-center pt-[26px] text-center">
                      <motion.span
                        aria-hidden
                        initial={
                          prefersReduced ? false : { scale: 0.7, opacity: 0 }
                        }
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.2, 0, 0, 1],
                          delay: 0.05,
                        }}
                        className="grid size-[58px] shrink-0 place-items-center rounded-full bg-[#22c55e] shadow-[0_4px_14px_-4px_rgba(34,197,94,0.7)]"
                      >
                        <Check
                          className="size-[30px] text-white"
                          strokeWidth={3}
                        />
                      </motion.span>

                      <p className="mt-[16px] text-[19px] leading-tight font-semibold tracking-[-0.02em] text-[#0b1b36]">
                        {paidNow ? "Payment successful!" : "Order confirmed!"}
                      </p>
                      <p className="mt-[6px] max-w-[250px] text-[11.5px] leading-[1.5] text-[#0b1b36]/50">
                        Your order has been placed successfully.
                      </p>

                      <div
                        className={cn(
                          CARD,
                          "mt-[18px] w-full space-y-[9px] px-[13px] py-[12px] text-left",
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-[8px]">
                          <span className="text-[10.5px] leading-none text-[#0b1b36]/50">
                            Order
                          </span>
                          <span className="text-[10.5px] leading-none font-semibold text-[#0b1b36]/80 tabular-nums">
                            {ORDER_ID}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-[8px]">
                          <span className="text-[10.5px] leading-none text-[#0b1b36]/50">
                            {paidNow ? "Paid via" : "Paying via"}
                          </span>
                          <span className="text-[10.5px] leading-none font-semibold text-[#0b1b36]/80">
                            {settled.title}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-[8px]">
                          <span className="text-[10.5px] leading-none text-[#0b1b36]/50">
                            Delivering to
                          </span>
                          <span className="text-[10.5px] leading-none font-semibold text-[#0b1b36]/80">
                            {DELIVERY.area}
                          </span>
                        </div>

                        <span
                          aria-hidden
                          className="block h-px bg-black/[0.07]"
                        />

                        <div className="flex items-baseline justify-between gap-[8px]">
                          <span className="text-[11px] leading-none font-medium text-[#0b1b36]/60">
                            {paidNow ? "Paid online" : "Payable on delivery"}
                          </span>
                          <span className="text-[13.5px] leading-none font-semibold text-[#0b1b36] tabular-nums">
                            {inrShort(
                              paidNow ? settled.paidNow : settled.dueOnDelivery,
                            )}
                          </span>
                        </div>
                        {paidNow && settled.dueOnDelivery > 0 ? (
                          <div className="flex items-baseline justify-between gap-[8px]">
                            <span className="text-[10.5px] leading-none text-[#0b1b36]/50">
                              Due on delivery
                            </span>
                            <span className="text-[10.5px] leading-none font-semibold text-[#0b1b36]/80 tabular-nums">
                              {inrShort(settled.dueOnDelivery)}
                            </span>
                          </div>
                        ) : null}
                      </div>

                      <p className="mt-[12px] text-[10px] leading-none text-[#16a34a]">
                        You saved {inr(CART.mrp - CART_TOTAL)} on this order
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          restart();
                          setAuto(true);
                        }}
                        className="mt-[14px] rounded-[7px] border border-black/[0.12] bg-white px-[12px] py-[6px] text-[11px] leading-none font-semibold text-[#0b1b36]/70 transition-colors hover:bg-black/[0.03] focus-visible:ring-2 focus-visible:ring-[#2563eb]/45 focus-visible:outline-none"
                      >
                        Replay the demo
                      </button>
                    </CheckoutBody>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <TrustFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
