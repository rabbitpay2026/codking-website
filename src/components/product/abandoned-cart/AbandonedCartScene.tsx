"use client";

import {
  CheckCircle2,
  MessageSquareText,
  MousePointerClick,
  ScanSearch,
} from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { AbandonedCartScreen } from "@/components/product/abandoned-cart/AbandonedCartScreen";
import {
  CART,
  CLICKED_STEP,
  DETECTED_STEP,
  DURATIONS,
  RECOVERED_STEP,
  SMS_STEP,
  WHATSAPP_STEP,
  inr,
} from "@/components/product/abandoned-cart/recoveryBeats";
import { Iphone } from "@/components/ui/iphone";
import { cardHoverClass } from "@/constants/theme";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";

import type { WithClassName } from "@/types";

import type { ReactNode } from "react";

interface RecoveryCard {
  readonly id: string;
  /**
   * The mark.
   *
   * A component rather than a `LucideIcon`, so a card can carry a brand mark
   * where the brand *is* the point — the WhatsApp leg of the sequence is
   * named by WhatsApp's own glyph, and a generic speech bubble beside a card
   * reading "WhatsApp reminder sent" would be the one place this scene said
   * something it could have simply shown.
   */
  readonly icon: (props: { readonly className?: string }) => ReactNode;
  /** Drawn in brand when the card is the active one; brand marks keep theirs. */
  readonly tinted: boolean;
  readonly title: string;
  readonly note: string;
  /** The beat at which this card is the one describing the screen. */
  readonly step: number;
  /** Position within the stage. Only rendered from `lg` up. */
  readonly className: string;
  /** Negative, so the cards are already spread across the float cycle. */
  readonly delay: string;
}

/**
 * The journey, ringing the device.
 *
 * Five cards for five beats, and each one names the stage the screen is
 * currently playing — so the composition reads as one story told twice at two
 * densities rather than as a phone with decoration around it. That pairing is
 * the whole reason the timeline lives in this component: a card announcing
 * "reminder sent" over a thread that has already been paid would be worse than
 * no card at all.
 *
 * Both channels get a card, because both are what the merchant is buying: the
 * product sends over SMS *and* WhatsApp, and a scene that showed only the
 * WhatsApp leg would be selling half the control. The SMS card fires first and
 * the WhatsApp card second, which is why the reminder in the thread is still
 * undelivered while the SMS card is lit.
 *
 * Laid out as a zig-zag — left, right, left, right, left — so the order the eye
 * takes them in is the order they happen. Two staggered columns rather than
 * five in a stack: five cards down one side of a phone is a list, and a list is
 * what the flow section below already is.
 *
 * Positions are percentages of the stage box, so the whole composition scales
 * with the column instead of being pinned to pixels.
 */
const CARDS: readonly RecoveryCard[] = [
  {
    id: "detected",
    icon: ScanSearch,
    tinted: true,
    title: "Abandoned checkout detected",
    note: `${inr.format(CART.total)} cart`,
    step: DETECTED_STEP,
    className: "top-[1%] -left-[1%]",
    delay: "0s",
  },
  {
    id: "sms",
    icon: MessageSquareText,
    tinted: true,
    title: "SMS reminder sent",
    note: "Delivered",
    step: SMS_STEP,
    className: "top-[19%] -right-[1%]",
    delay: "-1.4s",
  },
  {
    id: "whatsapp",
    icon: WhatsappMark,
    tinted: false,
    title: "WhatsApp reminder sent",
    note: "Delivered",
    step: WHATSAPP_STEP,
    className: "top-[40%] -left-[1%]",
    delay: "-2.8s",
  },
  {
    id: "clicked",
    icon: MousePointerClick,
    tinted: true,
    title: "Checkout link clicked",
    note: "Customer returned",
    step: CLICKED_STEP,
    className: "top-[58%] -right-[1%]",
    delay: "-4.2s",
  },
  {
    id: "recovered",
    icon: CheckCircle2,
    tinted: true,
    title: "Order recovered",
    note: `Order ${CART.order}`,
    step: RECOVERED_STEP,
    className: "top-[78%] -left-[1%]",
    delay: "-5.6s",
  },
];

/**
 * One stage of the recovery, floating beside the device.
 *
 * Mark, title, and one short line under it — no more. A card has to be legible
 * in the quarter second the eye spends on it on its way to the product, and
 * four paragraphs orbiting a phone is a second article competing with the one
 * a visitor is trying to read.
 *
 * The active card is lifted rather than recoloured: a brand ring and a slightly
 * stronger shadow. Tinting the whole surface would put four different-coloured
 * blocks around the device over a loop, and the device is what the composition
 * points at.
 *
 * Hidden from assistive technology — every one of these restates a step the
 * flow section below sets out in full, and the phone already carries an
 * `aria-label` describing the whole sequence.
 */
function Card({
  icon: Icon,
  tinted,
  title,
  note,
  className,
  delay,
  active,
}: RecoveryCard & { readonly active: boolean }) {
  return (
    <div
      aria-hidden
      style={{ animationDelay: delay }}
      className={cn(
        "absolute z-30 w-[26%] animate-float",
        "rounded-2xl border bg-white/85 px-2.5 py-2 backdrop-blur-xl",
        "transition-[border-color,box-shadow] duration-500 ease-emphasized",
        active
          ? "border-brand/35 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_14px_30px_-14px_rgba(37,99,235,0.5)]"
          : "border-white/90 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_10px_24px_-14px_rgba(11,27,54,0.4)]",
        cardHoverClass,
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-lg ring-1 transition-colors duration-500",
            active && tinted
              ? "bg-brand/10 text-brand ring-brand/20"
              : "bg-ink/[0.05] text-ink/65 ring-ink/8",
          )}
        >
          <Icon className={tinted ? "size-3" : "size-[13px]"} />
        </span>
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full transition-colors duration-500",
            active ? "bg-brand" : "bg-transparent",
          )}
        />
      </span>

      <span className="mt-1.5 block text-[10px] leading-[1.25] font-semibold text-balance text-ink/80">
        {title}
      </span>
      <span className="mt-0.5 block text-[9px] leading-[1.25] font-medium text-ink/40">
        {note}
      </span>
    </div>
  );
}

/**
 * The hero's product scene.
 *
 * One device, centred, showing the buyer's own WhatsApp thread, with the four
 * stages of the recovery floating around it. The same composition the homepage
 * hero uses, because it is the right one: the product's screen is the argument
 * and everything else in the frame is an annotation on it.
 *
 * The screen and the cards share one timeline, held in `recoveryBeats` and run
 * here. Under reduced motion `useStepTimeline` parks on the last beat — the
 * order confirmed, the fourth card lit — which is the frame the whole sequence
 * exists to reach, and the global stylesheet stops the cards' float at the same
 * time. Nothing runs at all while the hero is off screen.
 *
 * Depth is bought with light rather than with rotation. A rotated device is
 * rasterised at its pre-transform size and then resampled, which softens every
 * glyph on the screen — and the screen is the entire point.
 *
 * The stage box is sized from the device it has to hold at each breakpoint, and
 * everything inside is positioned as a percentage of it, so the composition
 * survives every column width instead of being tuned for one. The cards are the
 * first thing to go as the column narrows: below `lg` the hero is one column
 * and there is no room for annotation beside a phone, so they are dropped
 * rather than shrunk into the gutter. Nothing is lost — every one of them is a
 * step the flow section states in full.
 */
export function AbandonedCartScene({ className }: WithClassName) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);

  return (
    /*
      Capped below `lg`, where the hero is one column and the stage would
      otherwise take the full measure — a phone drawn 380px wide on a tablet is
      not impressive, it is a phone nobody can see the top and bottom of at
      once. From `lg` the cap comes off, because the stage is sharing the row
      with the headline and needs every pixel of its half.
    */
    <div
      ref={ref}
      className={cn(
        "relative mx-auto w-full max-w-[26rem] lg:max-w-none",
        className,
      )}
    >
      {/* Key light, so the device is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-10%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(44% 42% at 50% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 48%, transparent 76%)",
        }}
      />

      {/*
        The stage box.

        Its aspect is derived from the device it has to hold rather than
        guessed: the device is `2.037 ×` its own width tall, so a stage that is
        `w × 62%` wide in devices needs at least `1.26 w` of height or the
        phone runs out through the top. Each breakpoint below pairs a device
        width with the smallest aspect that clears it, plus a little air.
      */}
      <div
        role="img"
        aria-label={`${siteConfig.name} recovers an abandoned cash-on-delivery checkout worth ${inr.format(CART.total)}: the abandoned cart is detected, reminders carrying a direct checkout link are sent to the customer over SMS and WhatsApp, the customer taps the link, and order ${CART.order} is recovered.`}
        className="relative aspect-[1/1.50] w-full lg:aspect-[1/1.18]"
      >
        {/*
          The device, and the shadows it casts.

          The shadows are children of the device's own box rather than of the
          stage, so they are expressed relative to the thing casting them and
          stay correct at every width — a device casting a shadow next to
          itself is the clearest tell that a scene was assembled rather than
          lit.
        */}
        <div className="absolute bottom-[1%] left-1/2 w-[72%] -translate-x-1/2 lg:w-[50%]">
          <div
            aria-hidden
            className="absolute inset-x-[-9%] bottom-[-1.5%] h-[6%] rounded-[50%] bg-ink/16 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-[12%] bottom-[-0.5%] h-[3%] rounded-[50%] bg-ink/22 blur-lg"
          />

          <Iphone screenWidth={300}>
            <AbandonedCartScreen step={step} />
          </Iphone>
        </div>

        {CARDS.map((card) => (
          /*
            `lg:block`, and the card's own class list sets no display — so this
            is the only display utility in play and tailwind-merge has nothing
            to resolve against.
          */
          <Card
            key={card.id}
            {...card}
            active={step === card.step}
            className={cn("hidden lg:block", card.className)}
          />
        ))}
      </div>
    </div>
  );
}
