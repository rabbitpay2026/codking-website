import Image from "next/image";

import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

import {
  CART,
  CART_TOTAL,
  DISCOUNT_NAME,
  inr,
  PROMO_LINE,
} from "@/components/sections/hero/checkout/checkoutDemo";
import { demoMerchant } from "@/constants/demoMerchant";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The furniture of the checkout, drawn once.
 *
 * Everything in this file survives every state change: the app bar, the
 * promotion, the summary, the coupon card and the trust strip are the frame
 * the flow moves through, so they are written here rather than repeated in
 * each screen. That is not only tidiness — it is what stops the header
 * drifting a pixel between the number screen and the code screen, which is the
 * tell that separates a real checkout from a sequence of mockups.
 *
 * Every size in this directory is expressed in the pixels of a 390-wide
 * design, because that is the width the reference screens were drawn at. The
 * whole surface is then scaled to whatever the hero column gives it, so the
 * layout at 275 pixels is the same layout as at 390 rather than merely a
 * similar one. See `CheckoutPreview` for the scaling itself.
 */

/** The card treatment every white panel on this screen shares. */
export const CARD =
  "rounded-[10px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_1px_6px_-2px_rgba(16,24,40,0.06)]";

/** The one saturated blue on the screen: links and nothing else. */
export const LINK = "text-[#2563eb]";

/**
 * India's flag, drawn rather than fetched.
 *
 * A country picker whose flag is a pending image request reads as broken for
 * as long as the request is in flight, and this one sits inside the first
 * field a visitor looks at. Three bars and a ring cost nothing, stay crisp at
 * any density, and cannot fail to load.
 */
export function IndiaFlag() {
  return (
    <span
      aria-hidden
      className="relative block h-[13px] w-[18px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10"
    >
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#ff9933]" />
      <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#128807]" />
      <span className="absolute top-1/2 left-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-[0.9px] ring-[#008]" />
    </span>
  );
}

/**
 * The wordmark, at whatever height the placement asks for.
 *
 * The transparent wordmark rather than the site header's tile lockup: this
 * sits on white and on a light field, and a violet panel dropped into a
 * checkout app bar would read as an advertisement inside the buyer's own
 * payment screen.
 *
 * `width`/`height` are the rendered box rather than the file's intrinsic
 * 885×190, and there is deliberately no `sizes` — see `Logo` for why that is
 * what makes Next emit a small 1x/2x pair instead of the full responsive
 * candidate list. The ratio is preserved, so the box is reserved correctly and
 * the bar cannot shift as the file lands.
 */
export function CodKingMark({
  height,
  className,
  priority = false,
}: {
  readonly height: number;
  readonly className?: string;
  readonly priority?: boolean;
}) {
  return (
    <Image
      src="/logos/cod-king-wordmark.png"
      alt="COD King"
      width={Math.round(height * (885 / 190))}
      height={height}
      priority={priority}
      className={cn("w-auto", className)}
      style={{ height }}
    />
  );
}

/**
 * The store's own lockup, split where a lockup splits.
 *
 * The name is read from `demoMerchant` rather than typed, so the shop on the
 * hero's checkout and the shop in the WhatsApp thread that closes the page are
 * the same shop — a visitor scrolling between the two demonstrations is meant
 * to recognise it, and that cannot be left to two files agreeing by
 * coincidence.
 *
 * The split is the last word onto its own line, which is how a two-line
 * wordmark is set and what the reference does with its own two-word name. It
 * is derived rather than stored so a one-word or four-word merchant still
 * produces a lockup instead of a crash.
 */
const NAME_WORDS = demoMerchant.name.split(" ");
const MARK_BOTTOM = NAME_WORDS.length > 1 ? NAME_WORDS.pop() : "";
const MARK_TOP = NAME_WORDS.join(" ");

/**
 * The merchant's mark: a shopping bag, drawn.
 *
 * A tile and a glyph, in the store's own colour rather than in ours. Drawn as
 * a path rather than placed as a file because there is no such shop and there
 * is therefore no artwork — and because a mark that has to load is a mark that
 * is briefly missing from the first thing a visitor looks at.
 *
 * A four-pointed spark rather than the shopping bag this started as, and the
 * reason is that the bag did not survive being small. A handle arced over a
 * solid body is a padlock at fourteen pixels — the browser-security glyph,
 * placed in the header of a payment screen, which is about the worst thing an
 * accidental resemblance could have landed on. The spark has no such twin: it
 * is the shape modern shop identities actually use, it reads as a *mark*
 * rather than as an interface icon at any size, and it cannot be mistaken for
 * a control.
 *
 * Slate rather than anything saturated. This tile sits four pixels from our
 * own wordmark at the foot of the same screen, and two coloured marks on one
 * surface read as two companies arguing. The merchant is the subject; we are
 * the footnote.
 */
export function MerchantTile({ size }: { readonly size: number }) {
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-[7px] bg-gradient-to-br from-[#334155] to-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.35)]"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        className="text-white"
        style={{ width: size * 0.62, height: size * 0.62 }}
      >
        {/*
          Four points with concave sides, which is what separates a spark from
          a plus sign: the curves pull the mass into the centre so the mark
          still reads as one shape when it is eleven pixels across.
        */}
        <path
          fill="currentColor"
          d="M12 2.4c.72 5.6 3.28 8.16 8.88 8.88v1.44c-5.6.72-8.16 3.28-8.88 8.88h-1.44C9.84 16 7.28 13.44 1.68 12.72v-1.44C7.28 10.56 9.84 8 10.56 2.4Z"
        />
      </svg>
    </span>
  );
}

/**
 * The merchant's lockup — mark and name, as an app bar wears it.
 *
 * Two lines of tight semibold beside the tile, because that is the shape of
 * the reference's own header and the shape most shop lockups take at this
 * size. Set as one accessible name so a screen reader hears the shop once
 * rather than hearing its name broken across two lines.
 */
export function MerchantMark({ scale = 1 }: { readonly scale?: number }) {
  return (
    <span
      className="flex items-center gap-[7px]"
      role="img"
      aria-label={demoMerchant.name}
    >
      <MerchantTile size={Math.round(24 * scale)} />
      <span
        aria-hidden
        className="flex flex-col leading-none tracking-[-0.02em] text-[#0f172a]"
        style={{ fontSize: 13 * scale }}
      >
        <span
          className="font-semibold opacity-70"
          style={{ fontSize: 10 * scale }}
        >
          {MARK_TOP}
        </span>
        <span className="mt-[2px] font-bold">{MARK_BOTTOM}</span>
      </span>
    </span>
  );
}

/**
 * The app bar.
 *
 * A back arrow, the shop, and nothing else — and the shop is the *merchant's*,
 * not ours. That is the whole point of the surface: a buyer's checkout carries
 * the name of the store they are buying from, COD King automates what happens
 * inside it, and a header reading "COD King" on a buyer's phone would tell a
 * merchant we brand their customers' screens for them. Our mark appears once,
 * small, at the foot of the trust strip, which is where a "powered by" belongs
 * and where the reference puts it too.
 *
 * The mark is centred against the *bar* rather than against the space left
 * over beside the arrow, which is why it is positioned absolutely: centred by
 * flex it would sit a few pixels right of true, and an off-centre logo is the
 * first thing that makes a header look drawn rather than built.
 */
export function CheckoutHeader({ onBack }: { readonly onBack?: () => void }) {
  return (
    <div className="relative flex h-[46px] shrink-0 items-center bg-white px-[12px]">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back a step"
        className="relative z-10 grid size-[26px] place-items-center rounded-full text-[#0b1b36]/70 transition-colors hover:bg-black/[0.05] focus-visible:ring-2 focus-visible:ring-[#2563eb]/50 focus-visible:outline-none"
      >
        <ArrowLeft className="size-[17px]" strokeWidth={1.9} />
      </button>

      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        <MerchantMark />
      </span>
    </div>
  );
}

/**
 * The store's running promotion.
 *
 * Black, full bleed, one line. It is the loudest band on the screen and it is
 * meant to be — a coupon nobody reads is a coupon nobody uses — but it earns
 * that by being 26 pixels tall and carrying a single sentence.
 */
export function PromoBar() {
  return (
    <p className="flex h-[26px] shrink-0 items-center justify-center bg-black px-[10px] text-center text-[11px] leading-none font-semibold tracking-[-0.005em] text-white">
      {PROMO_LINE}
    </p>
  );
}

/**
 * The running total of what the store's rules have handed back.
 *
 * Drawn twice in this flow and identically both times — inside the summary on
 * the first two states, and as a full-bleed band under the promotion once the
 * summary has been left behind. It is the one piece of copy that follows the
 * buyer the whole way down, because the argument it makes ("you are ahead") is
 * the argument that has to survive the payment sheet.
 */
export function SavedBanner({ className }: { readonly className?: string }) {
  return (
    <p
      className={cn(
        "bg-[#d7f5e0] py-[7px] text-center text-[11px] leading-[1.4] font-medium text-[#15803d]",
        className,
      )}
    >
      Yay! You&apos;ve saved{" "}
      <span className="font-bold">{inr(CART.autoDiscount)}</span> so far 🥳
    </p>
  );
}

/**
 * What is in the cart, and what the store already took off it.
 *
 * Three registers stacked in one card: the price, in ink; the rule that fired,
 * in green; and the running total of everything the rules have returned, on a
 * green field. Stacking them is the point — a discount stated on its own is a
 * claim, and a discount stated directly under the price it changed is
 * arithmetic the buyer can check.
 *
 * The green band runs to the card's own edges rather than sitting inset. Inset
 * it would be a fourth rounded box inside a rounded box; flush, it reads as
 * the card's own foot.
 */
export function OrderSummaryCard() {
  return (
    <div className={cn(CARD, "overflow-hidden px-[13px] pt-[11px]")}>
      <div className="flex items-start justify-between gap-[8px]">
        <p className="text-[15px] leading-none font-semibold text-[#0b1b36]">
          Order summary{" "}
          <span className="text-[11.5px] font-normal text-[#0b1b36]/45">
            ({CART.itemCount} item)
          </span>
        </p>

        <span className="flex shrink-0 items-center gap-[6px]">
          <span className="text-[11.5px] leading-none text-[#0b1b36]/40 tabular-nums line-through">
            {inr(CART.mrp)}
          </span>
          <span className="text-[13.5px] leading-none font-semibold text-[#0b1b36] tabular-nums">
            {inr(CART_TOTAL)}
          </span>
          <ChevronRight
            aria-hidden
            className="size-[13px] shrink-0 text-[#0b1b36]/35"
            strokeWidth={2.2}
          />
        </span>
      </div>

      <p className="mt-[7px] text-[11px] leading-[1.4] font-medium text-[#16a34a]">
        🎉 {DISCOUNT_NAME} Applied! You save {inr(CART.autoDiscount)}!
      </p>

      <SavedBanner className="mt-[9px] -mr-[13px] -ml-[13px]" />
    </div>
  );
}

/**
 * The coupon that fired by itself.
 *
 * The word doing the work is "Auto". A buyer who has ever hunted for a code
 * box knows what it costs to be offered a discount they have to go and find,
 * and the whole of this card is the claim that they did not have to.
 *
 * The coupon count is drawn as text rather than as a control. This is a
 * demonstration of a checkout, and a link that looks live and does nothing
 * when pressed is worse than one that never invited the press — the flow's
 * real controls are the number field, the code boxes and the payment rows.
 */
export function DiscountCard() {
  return (
    <div className={cn(CARD, "px-[13px] py-[11px]")}>
      <div className="flex items-center gap-[8px]">
        <span
          aria-hidden
          className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#22c55e]"
        >
          <span className="relative block size-[9px]">
            <span className="absolute top-1/2 left-0 h-[1.8px] w-full -translate-y-1/2 rounded-full bg-white" />
            <span className="absolute top-0 left-1/2 h-full w-[1.8px] -translate-x-1/2 rounded-full bg-white" />
          </span>
        </span>

        <p className="min-w-0 flex-1 text-[12.5px] leading-tight font-semibold text-[#0b1b36]">
          Auto {DISCOUNT_NAME}
        </p>

        <span className="shrink-0 rounded-[5px] bg-[#22c55e] px-[7px] py-[3.5px] text-[10px] leading-none font-semibold text-white tabular-nums">
          Saved ₹{CART.autoDiscount}
        </span>
      </div>

      <p className={cn("mt-[9px] text-[12px] leading-none font-medium", LINK)}>
        View (2) coupons
      </p>
    </div>
  );
}

interface TrustSignal {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly label: string;
}

/**
 * The four reassurances, in the order the doubts arrive.
 *
 * Is my card safe, is the payment safe, will the parcel come, is the shop
 * real. They are stated as a row of four rather than as a paragraph because
 * nobody reads a paragraph at this point in a checkout — a buyer is checking
 * that the words are there.
 */
const TRUST: readonly TrustSignal[] = [
  { id: "pci", icon: CreditCard, label: "PCI DSS compliant" },
  { id: "payments", icon: Wallet, label: "Secure payments" },
  { id: "delivery", icon: Truck, label: "Assured delivery" },
  { id: "seller", icon: ShieldCheck, label: "Verified seller" },
];

/**
 * The trust strip, pinned to the foot of the screen.
 *
 * White on the light field and closed by a hairline, so it reads as chrome
 * rather than as one more card in the stack. It does not move between states —
 * a footer that shifts as the flow advances is the clearest way to tell a
 * visitor they are watching a slideshow.
 */
export function TrustFooter() {
  return (
    <div className="mt-auto shrink-0 border-t border-black/[0.06] bg-white px-[12px] pt-[9px] pb-[8px]">
      <ul className="grid grid-cols-4 gap-[4px]">
        {TRUST.map(({ id, icon: Icon, label }) => (
          <li key={id} className="flex flex-col items-center gap-[4px]">
            <Icon
              aria-hidden
              className="size-[15px] shrink-0 text-[#0b1b36]/45"
              strokeWidth={1.5}
            />
            <span className="text-center text-[8.5px] leading-[1.25] font-medium text-[#0b1b36]/50">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-[9px] flex items-center justify-between gap-[8px]">
        <p className="text-[9px] leading-none font-medium text-[#0b1b36]/40">
          T&amp;C | Privacy Policy
        </p>
        <CodKingMark height={11} className="shrink-0 opacity-90" />
      </div>
    </div>
  );
}

/**
 * The scrolling middle of the screen.
 *
 * Fixed chrome above and below, one flexible band between them. The band
 * scrolls rather than growing, so a state carrying more than the last one
 * cannot push the trust strip off the bottom or stretch the surface the hero
 * has budgeted for it. The scrollbar is hidden because a phone does not draw
 * one, and this is a phone.
 */
export function CheckoutBody({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-0 flex-1 [scrollbar-width:none] overflow-x-hidden overflow-y-auto px-[10px] pt-[10px] pb-[12px] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
