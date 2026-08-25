import {
  Check,
  Lock,
  MapPinCheck,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The order on the card.
 *
 * An example order and nothing more — an id, a method and a value, which is
 * what a merchant sees in their own admin. Deliberately not the hero's `#1042`:
 * that one ends the hero loop paid online, and the same id closing the page as
 * a cash order would be the page contradicting itself for anyone who read both.
 *
 * There is no buyer name and no address here on purpose. The hero already
 * shows a real-shaped one on the buyer's phone, and a second invented person
 * at the foot of the page buys nothing the order line does not already say.
 */
const ORDER = {
  id: "#1087",
  method: "Cash on delivery",
  total: 2450,
} as const;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface ProtectionStep {
  readonly id: string;
  readonly index: string;
  readonly icon: LucideIcon;
  readonly label: string;
  /**
   * Where the card sits once there is room to float it.
   *
   * Written as a finished class string rather than composed from a side and a
   * position, because Tailwind reads these statically — a class built at
   * runtime is a class that is not in the stylesheet.
   *
   * The four offsets are symmetrical about the centre line: each card is 8rem
   * wide and laps the order card's edge by twelve pixels, so they read as
   * layered over it rather than parked beside it. Twelve and not more, because
   * the order card is padded by fourteen — the overlap has to land on that
   * padding and stop, or the corner it laps is the corner holding the shield
   * on one side and the verified pill on the other.
   *
   * They are anchored to the centre rather than to the frame so the group
   * stays gathered around the card as the column grows. That matters more than
   * it sounds: this slot is *widest* on a tablet, where the panel is one
   * column, and narrower again on a desktop, where it is two thirds of one —
   * edge-anchored cards would drift furthest apart on the smaller screen.
   *
   * The group spans 30rem all in. `@lg` — the container's own 32rem, not the
   * viewport's — is the narrowest column that fits it with room either side,
   * which is why the switch is a container query and not a breakpoint.
   */
  readonly place: string;
}

/**
 * What the product checked, in the order it checked it.
 *
 * The four states a protected cash order passes through, and they are the same
 * four the hero device walks through one at a time — verification, address,
 * payment, placed. The page opens by showing them happen and closes by showing
 * them done, which is why these are past-tense labels rather than feature
 * names: the close is a receipt, not a second feature list.
 *
 * Numbered, because four cards ringing a fifth have no reading order of their
 * own. `01`–`04` is what makes this a sequence rather than a cluster, and it
 * does the work a connector line would do without drawing four hairlines
 * across the card they point at.
 */
const STEPS: readonly ProtectionStep[] = [
  {
    id: "otp",
    index: "01",
    icon: ShieldCheck,
    label: "OTP Verified",
    place: "@lg:top-2 @lg:left-1/2 @lg:-translate-x-[15rem]",
  },
  {
    id: "address",
    index: "02",
    icon: MapPinCheck,
    label: "Address Confirmed",
    place: "@lg:bottom-2 @lg:left-1/2 @lg:-translate-x-[15rem]",
  },
  {
    id: "payment",
    index: "03",
    icon: Lock,
    label: "Payment Protected",
    place: "@lg:top-2 @lg:left-1/2 @lg:translate-x-[7rem]",
  },
  {
    id: "placed",
    index: "04",
    icon: PackageCheck,
    label: "Order Placed",
    place: "@lg:bottom-2 @lg:left-1/2 @lg:translate-x-[7rem]",
  },
];

/**
 * A cash order that cleared every check, as the merchant's admin shows it.
 *
 * This is the slot the homepage demo player used to hold. There is no approved
 * recording, and the honest replacement for a video is not a poster frame with
 * a play button painted on it — that is a control that does nothing, which is
 * the one thing worse than an empty column. So the space is filled with the
 * thing the video would have shown: an order, the checks it passed, and the
 * state it came out in.
 *
 * Drawn in markup rather than screenshotted, for the same reasons the hero
 * device is: it is sharp at any density, it costs no image bytes on a page
 * that is already long, its type is real type, and it is themed by the same
 * tokens as everything around it — so it cannot drift out of step with the
 * site the way a flat export does the first time a colour changes.
 *
 * No border and no fill of its own. The band it closes is already one bordered
 * panel with a rule down the middle, and the section it sits in exists partly
 * to avoid the box-inside-a-box the previous version of this block was. The
 * only crisp edge in here belongs to the order card, which is the point: one
 * piece of product UI, lit against a field rather than mounted in a frame.
 *
 * Nothing in it is a claim. An order id, a method, a value and four cleared
 * checks are the contents of one example order — the same class of thing the
 * hero device shows — and there is not a merchant count, a percentage or a
 * time saved anywhere on it.
 *
 * A server component: no state, no effects, no JavaScript shipped. The only
 * motion is the ambient float the design system already publishes, which the
 * global reduced-motion rule parks.
 */
export function CtaOrderProtection({ className }: WithClassName) {
  return (
    <div
      role="img"
      aria-label={`A cash-on-delivery order in ${siteConfig.name}: the buyer's number is verified by one-time password, the delivery address is confirmed, the payment is protected by the store's own rules, and order ${ORDER.id} is placed and ready to dispatch.`}
      className={cn(
        "@container relative isolate overflow-hidden rounded-[18px]",
        className,
      )}
    >
      <SceneField />

      {/*
        The composition.

        Below 32rem of column there is no room to float anything, so the card
        sits on its own and the four states fall into a two-by-two block
        underneath it — which is the same information in the only arrangement
        that fits a phone. From 32rem the block becomes `contents`, its children
        leave the flow, and each one takes the position it declares.

        The frame is padded on the narrow layout and taller on the wide one, so
        the floated cards have somewhere to be without the order card moving.
      */}
      <div className="relative flex flex-col px-4 py-5 @lg:min-h-[15.5rem] @lg:justify-center @lg:px-5 @lg:py-6">
        <OrderCard />

        <div className="mt-3 grid grid-cols-2 gap-2 @lg:contents">
          {STEPS.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The room the card stands in.
 *
 * Every layer in here is radial or masked, and there is no flat wash anywhere —
 * which is the entire point. A first pass gave this a pale gradient across the
 * whole box, and the result was a light rounded rectangle sitting inside the
 * panel's own rounded rectangle: two frames, one inside the other, which is the
 * exact fault the section it closes was rebuilt to remove. With nothing but
 * gradients that end in `transparent`, the field has no edge to see. It reads
 * as light falling on the panel rather than as a second surface laid over it.
 *
 * So the depth is all in the light: a wide brand bloom under the card, a colder
 * violet one off to one side so the two do not read as one symmetrical blob,
 * and a grid faint enough to pass for paper texture, masked to an ellipse so it
 * never reaches a corner. The grain the hero field uses is gone with the wash —
 * an overlay blend over nothing at all is nothing at all.
 */
function SceneField() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(44% 58% at 50% 52%, color-mix(in oklab, var(--brand) 10%, transparent), transparent 72%)",
            "radial-gradient(38% 50% at 16% 24%, color-mix(in oklab, var(--brand-violet) 7%, transparent), transparent 70%)",
            "radial-gradient(34% 46% at 88% 80%, color-mix(in oklab, var(--brand) 7%, transparent), transparent 70%)",
          ].join(","),
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(11,27,54,0.045) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(11,27,54,0.045) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(76% 74% at 50% 50%, #000 6%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(76% 74% at 50% 50%, #000 6%, transparent 68%)",
        }}
      />

      {/*
        Key light. Brightest and emptiest exactly where the card sits, so the
        product is lit against the field rather than placed on it — and so the
        bloom behind it never tints the white card itself.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(30% 46% at 50% 50%, rgba(255,255,255,0.96), rgba(255,255,255,0.6) 50%, transparent 78%)",
        }}
      />
    </>
  );
}

/**
 * The order itself.
 *
 * Read top to bottom it is a single sentence: which order, how it is being
 * paid, what it came to, that every check cleared, and what the merchant can
 * do with it now. The rail is four filled segments rather than a percentage
 * bar — four is the number of checks, and a bar at 100% is a statistic where a
 * count of things is a fact.
 *
 * Two widths, because it is doing two jobs. Floated, it is 15.5rem — narrow
 * enough that four status cards fit around it in the tightest column this slot
 * ever gets. Stacked, it widens to sit flush with the two-by-two block beneath
 * it: a 248px card centred over a full-width grid is a card that looks like it
 * failed to fill its row.
 */
function OrderCard() {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-[19rem] rounded-2xl border border-ink/[0.07] bg-white p-3.5 @lg:max-w-[15.5rem]",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.45)]",
      )}
    >
      <div className="flex items-start gap-2.5">
        <span className="relative grid size-8 shrink-0 place-items-center rounded-[11px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
          <span className="absolute -inset-1 animate-halo rounded-[14px] bg-brand/12" />
          <ShieldCheck className="relative size-4 text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] leading-none font-semibold tracking-[-0.01em] text-ink tabular-nums">
            Order {ORDER.id}
          </span>
          <span className="mt-1.5 block truncate text-[10.5px] leading-none text-ink/50">
            {ORDER.method}
          </span>
        </span>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-check/14 px-1.5 py-0.5">
          <Check className="size-2.5 text-brand-check" strokeWidth={3} />
          <span className="text-[8.5px] leading-[1.5] font-bold tracking-[0.04em] text-ink/65 uppercase">
            Verified
          </span>
        </span>
      </div>

      <div aria-hidden className="mt-3 h-px bg-ink/[0.07]" />

      <div className="mt-3 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10.5px] leading-none text-ink/50">
            Order total
          </span>
          <span className="text-[11.5px] leading-none font-semibold text-ink tabular-nums">
            {inr.format(ORDER.total)}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10.5px] leading-none text-ink/50">Status</span>
          <span className="text-[11.5px] leading-none font-semibold text-ink">
            Ready to dispatch
          </span>
        </div>
      </div>

      {/* The four checks, as four cleared segments. */}
      <div className="mt-3">
        <div aria-hidden className="flex gap-1">
          {STEPS.map((step) => (
            <span
              key={step.id}
              className="h-[3px] flex-1 rounded-full bg-brand-check"
            />
          ))}
        </div>
        <p className="mt-2 text-[9.5px] leading-none font-medium text-ink/45">
          {STEPS.length} of {STEPS.length} checks cleared
        </p>
      </div>

      <div aria-hidden className="mt-3 h-px bg-ink/[0.07]" />

      <p className="mt-2.5 flex items-center gap-1.5 text-[9.5px] leading-none font-medium text-ink/40">
        <Lock aria-hidden className="size-2.5" />
        Protected by{" "}
        <span className="font-bold text-ink/60">{siteConfig.name}</span>
      </p>
    </div>
  );
}

/**
 * One cleared state, as a card floating off the order.
 *
 * Frosted rather than solid — `bg-white/85` over a blur — so where it laps the
 * order card underneath there is a hint of what is behind it. That is the whole
 * difference between a stack of layers and four rectangles pasted at the
 * corners.
 *
 * The hairline is ink and not white, and that one value is what makes the
 * layering legible. A white edge over a white card is no edge: the first pass
 * had these bordered in `white/90`, and where a status card crossed the order
 * card the two dissolved into a single pale blob with a label floating in it.
 * The same faint ink the order card is drawn with gives each one a boundary
 * that survives being laid over another white surface, and the drop shadow —
 * deeper than the order card's, because these are the layer above — puts it in
 * front rather than merely beside.
 *
 * The float is the design system's own ambient loop, staggered a beat per card
 * so the group breathes instead of pulsing in unison, and parked entirely by
 * the global reduced-motion rule.
 */
function StepCard({ step }: { readonly step: ProtectionStep }) {
  return (
    <div
      style={{ animationDelay: `${STEPS.indexOf(step) * 0.9}s` }}
      className={cn(
        "relative z-20 rounded-xl border border-ink/[0.07] bg-white/85 px-2.5 py-2 backdrop-blur-md",
        "shadow-[0_2px_4px_rgba(11,27,54,0.05),0_16px_34px_-14px_rgba(11,27,54,0.55)]",
        "@lg:absolute @lg:w-32 @lg:animate-float",
        step.place,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="grid size-5 shrink-0 place-items-center rounded-md bg-brand/[0.08] ring-1 ring-brand/12">
          <step.icon className="size-3 text-brand" strokeWidth={2} />
        </span>
        <span className="text-[8.5px] leading-none font-bold tracking-[0.1em] text-ink/30 tabular-nums">
          {step.index}
        </span>
        <span className="ml-auto grid size-3 shrink-0 place-items-center rounded-full bg-brand-check">
          <Check className="size-2 text-white" strokeWidth={4} />
        </span>
      </div>

      <p className="mt-1.5 text-[10.5px] leading-tight font-semibold text-ink/80">
        {step.label}
      </p>
    </div>
  );
}
