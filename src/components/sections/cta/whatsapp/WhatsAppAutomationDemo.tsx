"use client";

import { AutomationStatus } from "@/components/sections/cta/whatsapp/AutomationStatus";
import { MessageBubble } from "@/components/sections/cta/whatsapp/MessageBubble";
import {
  MESSAGES,
  MESSAGE_DURATIONS,
  VISIBLE_MESSAGES,
  WHATSAPP,
} from "@/components/sections/cta/whatsapp/messages";
import { WhatsAppHeader } from "@/components/sections/cta/whatsapp/WhatsAppHeader";
import { demoMerchant } from "@/constants/demoMerchant";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

interface WhatsAppAutomationDemoProps extends WithClassName {
  /** The block's own heading. Read from the repository by the caller. */
  readonly title: string;
  readonly description: string;
}

/**
 * The customer journey, as the merchant's own WhatsApp sends it.
 *
 * A product demonstration rather than a mockup: one branded thread under the
 * store's name, a buyer who says they have ordered, and the five automated
 * updates that answer them — the order confirmation with the order attached,
 * the payment, the packing update, the delivery notice, and the abandoned-cart
 * reminder with the product on it.
 *
 * ── What moves, and why ───────────────────────────────────────────────────
 * Only the messages move. The panel, the heading and the section around them
 * are still, because a page that animates its own layout is a page that is
 * hard to read. A new message enters from its sender's side — the buyer's one
 * line from the left, every automated update from the right — and pushes the
 * oldest of the three visible bubbles up and out through the top of the
 * viewport, which is what a real thread does and is the only reason this reads
 * as live rather than as a screenshot.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── The viewport does not resize. Ever. ───────────────────────────────────
 * The six messages are wildly different heights — one line, an order card, a
 * product card — so a thread sized to its contents would change height six
 * times a loop, and every one of those changes would be inherited by the panel,
 * the closing band and the questions beside it. A section that twitches every
 * three seconds is worse than no animation at all.
 *
 * So the conversation area is a fixed height and the message stack is taken out
 * of the flow entirely: `absolute`, pinned to the bottom edge, growing upwards
 * into a box that clips. Nothing inside it can report a height to anything
 * outside it, which makes the panel's height a function of three constants —
 * header, viewport, status rail — and nothing else. The tallest frames run off
 * the top and are cropped by the thread exactly as they would be on a phone.
 *
 * A fixed height on the *conversation* is the opposite of a fixed height on
 * the section: the band still measures itself from its contents, and the
 * contents simply no longer change.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The timeline is `useStepTimeline`: nothing ticks while the block is off
 * screen, and under reduced motion it parks on the last beat — the
 * abandoned-cart reminder, the richest frame of the six. Step 0 renders on the
 * server and on a browser that never runs the script, which is why the window
 * wraps rather than grows: the first frame is as full as every other one.
 *
 * `role="img"` with one label, so assistive technology is given the whole
 * demonstration once rather than a thread that rewrites itself every three
 * seconds under a screen reader's cursor.
 */
export function WhatsAppAutomationDemo({
  title,
  description,
  className,
}: WhatsAppAutomationDemoProps) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(MESSAGE_DURATIONS);

  /*
    The three messages standing in the thread, oldest first.

    The window wraps around the end of the array rather than growing from one,
    so the viewport is as full on the first beat as on the last — and the wrap
    tells the truth about the sequence, because the beat before "Hi, I just
    placed my order" is the abandoned-cart reminder that recovered it.
  */
  const visible = Array.from({ length: VISIBLE_MESSAGES }, (_, offset) => {
    const index =
      (step - (VISIBLE_MESSAGES - 1) + offset + MESSAGES.length * 2) %
      MESSAGES.length;

    return MESSAGES[index];
  }).filter((message) => message !== undefined);

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      {/*
        The caption. A heading and one line, at the size of copy rather than of
        a section title — the column already carries the page's closing
        headline directly above this, and a second heading at that weight would
        read as two sections stacked in one place.
      */}
      <h3 className="text-[15px] leading-snug font-semibold tracking-[-0.015em] text-balance text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-pretty text-ink/55">
        {description}
      </p>

      <div
        role="img"
        aria-label={`A customer messages ${demoMerchant.name} to say they have placed an order, and the store's WhatsApp automation answers with the order confirmation, the payment received, the parcel packed, the order out for delivery, and an abandoned-cart reminder with the product on it.`}
        className={cn(
          "mt-4 flex flex-col overflow-hidden rounded-2xl",
          "border border-ink/[0.07] bg-white",
          "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.4)]",
        )}
      >
        <WhatsAppHeader />

        {/*
          The conversation viewport.

          A fixed height and `overflow-hidden`, and the two are one decision:
          the height is what keeps the panel still, and the clipping is what
          lets the height be honoured no matter how tall the messages get.
          `h-*` rather than `min-h-*` — a minimum is a height that content is
          still allowed to argue with.

          Two sizes and nothing between them. The narrow one is for a phone,
          where the same messages wrap onto more lines and a taller box would
          push the install button off the screen; the wide one is for the
          closing band, where the thread is the largest object in the column
          and has to be readable across a room.
        */}
        <div
          className="relative h-[17rem] shrink-0 overflow-hidden lg:h-[19.5rem]"
          style={{ backgroundColor: WHATSAPP.wallpaper }}
        >
          {/*
            The date chip, floating over the thread rather than scrolling with
            it — which is where WhatsApp itself keeps it, and the only way it
            survives in a viewport whose contents are usually taller than it is.
          */}
          <p className="absolute inset-x-0 top-3 z-20 mx-auto w-fit rounded-full bg-white/80 px-2.5 py-1 text-[9.5px] leading-none font-semibold tracking-[0.08em] text-ink/45 uppercase backdrop-blur-[2px]">
            Today
          </p>

          {/*
            Out of the flow, pinned to the bottom, growing upwards. This is the
            mechanism: a stack that is `absolute` cannot contribute its height
            to the box that clips it, so no message — not the order card, not
            the product card — can move the panel by a pixel.
          */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end gap-2 px-3.5 pb-3.5">
            {/*
              Keyed by message id, so React keeps a bubble that is only being
              pushed up the thread and mounts a genuinely new one — which is
              what lets the arriving message run its own entrance instead of
              the text simply swapping inside a node that never changed.
            */}
            {visible.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/*
            The crop, softened. A bubble sheared off by a hard edge reads as a
            clipping bug; the same bubble fading into the wallpaper reads as a
            conversation that continues above the fold, which is what it is.

            Solid for its first half and only then fading, which is what gives
            the date chip a clean strip to sit on. A chip floating over the
            half-legible tail of a message it is not related to is the one
            arrangement here that looks like a mistake rather than like a
            thread. Over the messages, under the chip.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-[3.25rem]"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${WHATSAPP.wallpaper} 46%, transparent)`,
            }}
          />
        </div>

        <AutomationStatus step={step} />
      </div>
    </div>
  );
}
