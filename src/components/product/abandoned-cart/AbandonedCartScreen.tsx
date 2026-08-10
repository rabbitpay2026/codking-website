import {
  Check,
  ChevronLeft,
  Lock,
  Mic,
  Plus,
  Smile,
  Store,
  Video,
} from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { StatusBar } from "@/components/sections/hero/PhoneChrome";
import {
  CART,
  CLICKED_STEP,
  RECOVERED_STEP,
  WHATSAPP_STEP,
  inr,
} from "@/components/product/abandoned-cart/recoveryBeats";
import { cn } from "@/lib/utils";

interface AbandonedCartScreenProps {
  /** The beat the whole scene is on. See `recoveryBeats`. */
  readonly step: number;
}

/**
 * The delivery receipt — one pair of ticks delivered, blue ticks read.
 *
 * Only ever drawn on the buyer's own messages, which is the rule WhatsApp
 * itself follows: you see receipts on what you sent and never on what you
 * received. A mock that ticks the other side's messages is the tell that
 * nobody who uses the app drew it.
 */
function Receipt({ read }: { readonly read: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center transition-colors duration-300",
        read ? "text-[#34B7F1]" : "text-ink/35",
      )}
    >
      <Check className="-mr-[5px] size-[9px]" strokeWidth={3.5} />
      <Check className="size-[9px]" strokeWidth={3.5} />
    </span>
  );
}

/**
 * The time on the last line of a bubble, and the receipt beside it on the
 * buyer's own.
 *
 * Sits inside the bubble rather than under it, which is what WhatsApp does and
 * what stops a one-line message being three lines tall.
 */
function Stamp({
  time,
  read,
}: {
  readonly time: string;
  readonly read?: boolean;
}) {
  return (
    <span className="mt-0.5 flex items-center justify-end gap-1">
      <span className="text-[8px] leading-none font-medium text-ink/35">
        {time}
      </span>
      {read === undefined ? null : <Receipt read={read} />}
    </span>
  );
}

/** Every bubble arrives the same way: up from the foot of the thread. */
const ENTER = "animate-in duration-300 fade-in-0 slide-in-from-bottom-2";

/**
 * The brand's messages — left, green, square-cornered on the leading edge.
 *
 * Green on the brand's side rather than on the buyer's is a deliberate
 * departure from WhatsApp's own palette, and the one thing in this screen that
 * is a design decision rather than a reproduction: the merchant is looking at
 * this hero to see *their* messages working, so their messages are the
 * coloured ones. Everything else about the thread follows the app exactly.
 */
function FromBrand({
  children,
  time,
}: {
  readonly children: string;
  readonly time: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[78%] self-start rounded-[10px] rounded-tl-[3px] bg-[#D9FDD3] px-2 py-1.5",
        "shadow-[0_1px_2px_rgba(11,27,54,0.09)]",
        ENTER,
      )}
    >
      <p className="text-[10px] leading-[1.4] text-ink/80">{children}</p>
      <Stamp time={time} />
    </div>
  );
}

/** The buyer's replies — right, white, and the only ones that carry receipts. */
function FromBuyer({
  children,
  time,
  read,
}: {
  readonly children: string;
  readonly time: string;
  readonly read: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-[74%] self-end rounded-[10px] rounded-tr-[3px] bg-white px-2 py-1.5",
        "shadow-[0_1px_2px_rgba(11,27,54,0.09)]",
        ENTER,
      )}
    >
      <p className="text-[10px] leading-[1.4] text-ink/80">{children}</p>
      <Stamp time={time} read={read} />
    </div>
  );
}

/**
 * The recovery, as the buyer's own WhatsApp thread.
 *
 * This is the one surface COD King puts in front of a buyer for this control,
 * and a thread is the only honest way to draw it: the product's whole claim is
 * that a message arrives somewhere the buyer already reads, and a dashboard
 * card reading "reminder sent" demonstrates the opposite — the merchant's view
 * of a thing the merchant cannot see.
 *
 * It plays out rather than resting. The reminder arrives with the cart
 * attached, a follow-up lands, the buyer asks the question every
 * cash-on-delivery buyer asks, taps through, and the order comes back
 * confirmed. A merchant reads the whole mechanism off the glass without a
 * caption.
 *
 * Bubbles are mounted as they arrive rather than pre-rendered and faded in, and
 * the thread is anchored to its foot — so the stack grows upward exactly as a
 * real chat does, and an unsent message never reserves an empty rectangle in
 * the middle of the screen. The device itself never changes size, so nothing
 * outside the glass moves.
 *
 * The first beat is deliberately not an empty thread. It is the server-rendered
 * frame and the one a browser that never runs the script keeps, so it has to
 * make the argument on its own: the reminder is already there, with the
 * abandoned cart quoted inside it and the link waiting to be pressed.
 *
 * Presentational by contract. It takes the beat and draws it; the timeline
 * lives in the scene so the cards floating around the device can never be
 * describing a different moment than the screen is showing.
 *
 * Drawn in markup rather than screenshotted — sharp at any density, no image
 * bytes on the page's largest element, and its text is genuinely text.
 */
export function AbandonedCartScreen({ step }: AbandonedCartScreenProps) {
  const followUp = step >= WHATSAPP_STEP;
  const opened = step >= CLICKED_STEP;
  const recovered = step >= RECOVERED_STEP;

  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-white text-ink">
      <StatusBar className="relative shrink-0 text-ink" />

      {/*
        The app bar.

        WhatsApp's own furniture, in this site's palette rather than in
        WhatsApp's green chrome: the identity is carried by the mark, the
        bubble shapes and the receipts, and a green header would be the one
        saturated block in a hero the rest of the page has kept achromatic.

        The account is generic on purpose. This screen stands for any
        merchant's store, and it carries no phone number and no customer name —
        a mock that shows a real-looking personal number is a mock somebody
        will eventually screenshot.
      */}
      <div className="relative flex shrink-0 items-center gap-2 px-2.5 pt-2.5 pb-2">
        <ChevronLeft
          aria-hidden
          className="size-4 shrink-0 text-ink/40"
          strokeWidth={2.2}
        />

        <span className="relative shrink-0">
          <span
            aria-hidden
            className="grid size-[29px] place-items-center rounded-full bg-muted text-foreground/45 ring-1 ring-black/[0.04] ring-inset"
          >
            <Store className="size-[14px]" strokeWidth={1.8} />
          </span>
          {/* Whose network this is, on the account it belongs to. */}
          <span className="absolute -right-0.5 -bottom-0.5 grid size-[13px] place-items-center rounded-full bg-white ring-1 ring-ink/5">
            <WhatsappMark className="size-[10px]" />
          </span>
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] leading-tight font-semibold">
            {CART.brand}
          </span>
          <span className="block truncate text-[8.5px] leading-tight font-medium text-ink/45">
            Tap here for contact info
          </span>
        </span>

        <Video aria-hidden className="size-[15px] shrink-0 text-ink/30" />
        <span
          aria-hidden
          className="flex flex-col gap-[2.5px] px-1 text-ink/30"
        >
          <span className="size-[2.5px] rounded-full bg-current" />
          <span className="size-[2.5px] rounded-full bg-current" />
          <span className="size-[2.5px] rounded-full bg-current" />
        </span>
      </div>

      <div aria-hidden className="relative h-px shrink-0 bg-ink/8" />

      {/*
        The thread.

        `justify-end` anchors the stack to the foot, so each bubble arrives from
        underneath the way a real conversation does and the messages already
        there move up rather than the new one dropping into a reserved hole.

        The wallpaper is a dot field rather than WhatsApp's beige, for the same
        reason the header is: this is a device inside a COD King page, and one
        warm surface in an otherwise cool frame reads as a pasted screenshot.
      */}
      <div
        className="relative flex min-h-0 flex-1 flex-col justify-end gap-1 overflow-hidden px-2.5 pt-2.5 pb-2"
        style={{
          backgroundColor: "#F4F6FB",
          backgroundImage:
            "radial-gradient(rgba(11,27,54,0.05) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/*
          The notice at the head of every WhatsApp thread.

          Not decoration for its own sake: a conversation anchored to the foot
          of a tall screen leaves a field above it, and this is the thing that
          is genuinely there in its place. It also says, without a word of
          marketing, that the reminder travels on the buyer's own encrypted
          channel rather than through some surface we invented.
        */}
        <p className="mx-auto mb-auto flex max-w-[88%] items-center justify-center gap-1 rounded-md bg-[#FDF3D2] px-2 py-1 text-center text-[8px] leading-[1.35] font-medium text-ink/50">
          <Lock aria-hidden className="size-[8px] shrink-0" strokeWidth={2.5} />
          Messages are end-to-end encrypted
        </p>

        <p className="mx-auto mb-1 rounded-full bg-white/80 px-2 py-[3px] text-[8px] leading-none font-bold tracking-[0.08em] text-ink/40 uppercase shadow-[0_1px_2px_rgba(11,27,54,0.04)]">
          Today
        </p>

        {/* The reminder, with the cart attached to it. */}
        <div className="max-w-[88%] self-start rounded-[10px] rounded-tl-[3px] bg-[#D9FDD3] p-1.5 shadow-[0_1px_2px_rgba(11,27,54,0.09)]">
          {/* The cart itself, quoted into the message. */}
          <div className="flex items-center gap-2 rounded-[8px] bg-white/70 p-1.5">
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-sky-200 to-brand-soft ring-1 ring-ink/[0.06] ring-inset"
            >
              <span className="h-2 w-3.5 rounded-[2px] bg-brand/25" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] leading-tight font-semibold">
                {CART.item}
              </span>
              <span className="mt-0.5 block truncate text-[8.5px] leading-tight text-ink/45">
                {CART.variant}
              </span>
            </span>
            <span className="shrink-0 text-[10.5px] leading-none font-bold tabular-nums">
              {inr.format(CART.total)}
            </span>
          </div>

          <p className="mt-1.5 px-0.5 text-[10px] leading-[1.4] text-ink/80">
            Hi {CART.buyerFirstName}, you left this in your cart. Tap below to
            return to checkout — your order takes one tap to finish.
          </p>

          {/*
            The link, and the tap.

            The one element on this screen that changes under a press, because
            it is the thing the entire sequence exists to get pressed.
          */}
          <span
            className={cn(
              "mt-1.5 flex items-center justify-center rounded-[7px] py-1.5 text-[9.5px] leading-none font-bold text-white",
              "transition-[background-color,box-shadow] duration-300 ease-emphasized",
              opened
                ? "bg-brand-deep shadow-[0_2px_8px_-3px_var(--brand)]"
                : "bg-brand",
            )}
          >
            Complete your order
          </span>

          <Stamp time="9:32 AM" />
        </div>

        {/* The second step of the sequence. */}
        {followUp ? (
          <FromBrand time="9:36 AM">
            Your cart is still saved — cash on delivery is available on this
            order too.
          </FromBrand>
        ) : null}

        {/* The question every cash-on-delivery buyer asks. */}
        {opened ? (
          <>
            <FromBuyer time="9:39 AM" read={recovered}>
              Is cash on delivery still available?
            </FromBuyer>
            <FromBrand time="9:39 AM">
              Yes — pay cash on delivery or online, whichever you prefer.
            </FromBrand>
          </>
        ) : null}

        {/* The order, back. */}
        {recovered ? (
          <>
            <FromBuyer time="9:40 AM" read>
              Great, ordering now.
            </FromBuyer>
            <div
              className={cn(
                "max-w-[88%] self-start rounded-[10px] rounded-tl-[3px] bg-[#D9FDD3] px-2 py-1.5",
                "shadow-[0_1px_2px_rgba(11,27,54,0.09)]",
                ENTER,
              )}
            >
              <p className="flex items-center gap-1.5 text-[10px] leading-none font-bold text-ink/80">
                <span
                  aria-hidden
                  className="grid size-[14px] shrink-0 place-items-center rounded-full bg-brand-check"
                >
                  <Check className="size-2 text-white" strokeWidth={3.5} />
                </span>
                Order {CART.order} confirmed
              </p>
              <p className="mt-1 text-[10px] leading-[1.4] text-ink/70">
                Thanks {CART.buyerFirstName}! We&rsquo;ll let you know as soon
                as it ships.
              </p>
              <Stamp time="9:41 AM" />
            </div>
          </>
        ) : null}
      </div>

      {/* The composer, and the home indicator under it. */}
      <div className="relative flex shrink-0 items-center gap-1.5 bg-white px-2.5 pt-1.5 pb-1">
        <Plus aria-hidden className="size-4 shrink-0 text-ink/30" />
        <span className="flex h-6.5 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 text-[9.5px] font-medium text-ink/30">
          <span className="min-w-0 flex-1 truncate">Message</span>
          <Smile aria-hidden className="size-3 shrink-0" />
        </span>
        <Mic aria-hidden className="size-4 shrink-0 text-ink/30" />
      </div>
      <div
        aria-hidden
        className="relative mx-auto mb-1.5 h-[3px] w-[34%] shrink-0 rounded-full bg-ink/20"
      />
    </div>
  );
}
