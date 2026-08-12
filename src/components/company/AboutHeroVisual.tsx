import { Check, ShieldCheck, SlidersHorizontal, Wallet } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { cardHoverClass, panelHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface Stage {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  /** The control that acts at this stage, or `null` where Shopify does. */
  readonly icon: LucideIcon | null;
}

/**
 * One cash order, passing through the four controls, in the order they act.
 *
 * The amounts are the illustrative order the feature scenes already use — the
 * same ₹2,499 cart the COD Fees checkout shows — so a visitor moving between
 * About and a feature page sees one product rather than two sets of invented
 * numbers. Nothing here is a claim about results; the figures that are claims
 * live in `AboutStats` and come from the proof repository.
 */
const STAGES: readonly Stage[] = [
  {
    id: "placed",
    label: "Cash order placed",
    detail: "₹2,499 · Shopify checkout",
    icon: null,
  },
  {
    id: "rules",
    label: "COD allowed by your rules",
    detail: "Pin code and cart value passed",
    icon: SlidersHorizontal,
  },
  {
    id: "verified",
    label: "Buyer confirmed the order",
    detail: "OTP over WhatsApp",
    icon: ShieldCheck,
  },
  {
    id: "deposit",
    label: "₹500 collected upfront",
    detail: "₹1,999 due on delivery",
    icon: Wallet,
  },
];

/**
 * The right half of the About hero.
 *
 * The page's argument is that a cash order can be made to behave like a prepaid
 * one, and this is that sentence drawn: one order descending a rail, with the
 * control that acts on it marked at each step. It is the feature heroes'
 * composition — a panel with the product in it, small cards floating off its
 * edges — assembled entirely from vocabulary the site already owns, so it reads
 * as the same website rather than as an illustration commissioned for one page.
 *
 * Deliberately not a screenshot and not a device: About is the one page where a
 * product mock would be answering a question nobody asked. What it shows is the
 * shape of the thing, at the size a hero can carry.
 *
 * No animation of its own. The feature scenes run a timeline because they are
 * demonstrating a sequence a merchant has not seen yet; this is a diagram, and
 * a diagram that loops is a diagram that never lets the headline beside it be
 * read. The only motion is the pointer response every card on the site has.
 *
 * Hidden from assistive technology as a whole and given one label: every stage
 * it names is stated in full by the section directly beneath the hero, and a
 * screen reader should not have to walk a diagram to reach it.
 */
export function AboutHeroVisual() {
  return (
    <div className="relative hidden w-full lg:block">
      {/*
        Key light, as the feature scenes do it: the panel is lit against the
        hero field rather than placed on top of it.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-14%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 50% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <div
        role="img"
        aria-label="A ₹2,499 cash-on-delivery order passing through COD King: the order is placed at Shopify checkout, COD is allowed by the merchant's pin code and cart-value rules, the buyer confirms it with a one-time password over WhatsApp, and ₹500 is collected upfront leaving ₹1,999 due on delivery."
        className="flex items-center gap-4"
      >
        <div
          className={cn(
            "mx-auto max-w-[25rem] rounded-2xl border border-ink/[0.08] bg-white/80 p-5 backdrop-blur-xl",
            "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.45)]",
            "xl:mx-0 xl:max-w-none xl:flex-1",
            panelHoverClass,
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] pb-3.5">
            <span className="flex items-center gap-2 text-[12.5px] font-semibold text-ink/70">
              <ShopifyMark className="size-4 shrink-0" />
              Order #1042
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/[0.06] px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.06em] text-brand uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              Under control
            </span>
          </div>

          {/*
            A single rail behind the marks rather than a border per row. Four
            separated rows read as four unrelated facts; one line through them
            reads as one order moving, which is the entire point of the panel.
          */}
          <ol className="relative mt-4 space-y-3.5">
            <span
              aria-hidden
              className="absolute top-4 bottom-4 left-[15px] w-px bg-gradient-to-b from-ink/[0.06] via-brand/25 to-brand/40"
            />

            {STAGES.map((stage) => (
              <li key={stage.id} className="relative flex items-start gap-3">
                <StageMark icon={stage.icon} />

                <span className="min-w-0 pt-0.5">
                  <span className="block text-[13px] leading-snug font-semibold text-ink/85">
                    {stage.label}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-ink/45 tabular-nums">
                    {stage.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/*
          The before and after, beside the panel rather than floating over it.

          A column in the flex row, the way `CodFeesScene` hangs its commentary
          off the checkout — not absolutely positioned. Absolute cards on a panel
          that is already flush with the container edge have nowhere to go but
          inward, over the labels they are supposed to be annotating.

          They are the first thing to go as the column narrows, and they go at
          `xl`: below it the hero's right track cannot hold a panel and a card
          without taking the panel down to a width its own labels wrap at.
        */}
        <div className="hidden w-[9.25rem] shrink-0 flex-col gap-2.5 xl:flex">
          <EdgeCard label="Before" value="No money upfront" />
          <EdgeCard label="COD King" value="Rules, OTP, deposit" />
          <EdgeCard label="After" value="Verified & part-paid" accent />
        </div>
      </div>
    </div>
  );
}

/**
 * The mark on a stage row.
 *
 * A control's own glyph where a control acts, and the brand-check tick where
 * Shopify does — which is the one place on the page the logo green appears, as
 * a fill and never as text. The tile is `FeatureMark`'s treatment at a smaller
 * size; it is not that component because these rows key off a stage rather than
 * a control slug, and half of them have no control at all.
 */
function StageMark({ icon: Icon }: { readonly icon: LucideIcon | null }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative z-10 grid size-8 shrink-0 place-items-center rounded-lg border",
        Icon
          ? "border-brand/20 bg-brand/[0.07] text-brand"
          : "border-brand-check/25 bg-brand-check/[0.12] text-ink/60",
      )}
    >
      {Icon ? (
        <Icon className="size-4" strokeWidth={1.7} />
      ) : (
        <Check className="size-3.5" strokeWidth={2.6} />
      )}
    </span>
  );
}

function EdgeCard({
  label,
  value,
  accent = false,
}: {
  readonly label: string;
  readonly value: string;
  /** The second card is where the page's argument lands, so it takes the brand. */
  readonly accent?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex flex-col rounded-xl border bg-white/85 px-3 py-2.5 backdrop-blur-xl",
        accent
          ? "border-brand/30 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_14px_30px_-16px_rgba(37,99,235,0.45)]"
          : "border-white/90 shadow-[0_1px_2px_rgba(11,27,54,0.05),0_12px_26px_-16px_rgba(11,27,54,0.4)]",
        cardHoverClass,
      )}
    >
      <span className="text-[9.5px] leading-none font-semibold tracking-[0.08em] text-ink/40 uppercase">
        {label}
      </span>
      <span
        className={cn(
          "mt-1.5 text-[11.5px] leading-tight font-semibold",
          accent ? "text-brand" : "text-ink/75",
        )}
      >
        {value}
      </span>
    </div>
  );
}
