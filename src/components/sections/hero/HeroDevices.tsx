import { BadgeIndianRupee, SlidersHorizontal } from "lucide-react";

import { CheckoutScreen } from "@/components/sections/hero/CheckoutScreen";
import { VerifyScreen } from "@/components/sections/hero/VerifyScreen";
import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface CalloutProps {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly detail: string;
  readonly className?: string;
  readonly delay?: string;
}

/** An annotation pointing at one element inside a device. */
function Callout({
  icon: Icon,
  title,
  detail,
  className,
  delay,
}: CalloutProps) {
  return (
    <div
      aria-hidden
      style={delay ? { animationDelay: delay } : undefined}
      className={cn(
        "absolute z-30 animate-float",
        "rounded-2xl border border-white/80 bg-white/92 px-3 py-2.5 shadow-overlay backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand-soft">
          <Icon className="size-3 text-brand" />
        </span>
        <span className="text-[11px] leading-tight font-semibold text-ink">
          {title}
        </span>
      </div>
      <p className="mt-1 text-[10px] leading-snug text-ink/55">{detail}</p>
    </div>
  );
}

/**
 * The hero's product scene.
 *
 * Two devices, one story: the checkout where the controls are applied, then
 * the verification that decides whether the order was ever real. The rear
 * device is smaller, dimmer and set back so the eye lands on the checkout
 * first and reads the second phone as what happens next.
 *
 * The devices carry no 3D rotation. An earlier pass turned them on the Y axis
 * for perspective and paid for it in the only currency that matters here: a
 * rotated layer is rasterised flat and resampled, which softened every glyph
 * on the screens the whole hero exists to show. Depth is bought instead with
 * scale, a dimming pass on the rear device, layered contact shadows and the
 * key light behind them — none of which cost a pixel of sharpness.
 *
 * The layout is planned around the annotations rather than the other way
 * round. The front device is pushed right to leave a clear column for the
 * callouts, so a connector can travel from a callout to the address block
 * without crossing anything. A line says *this element*; a card floating
 * nearby can only say *that region*.
 *
 * Nothing here fades in — see `Hero` for why the first screen must not depend
 * on JavaScript to be visible. The only motion is the callouts' slow float and
 * the travelling connector dashes, both removed under reduced motion.
 */
export function HeroDevices() {
  return (
    <div className="relative w-full">
      {/*
        The scene's aspect is set per breakpoint from the tallest device it has
        to hold, not from what looks balanced empty. The devices are absolutely
        positioned against the bottom, so a scene shorter than the phone does
        not crop it — it pushes it up through the copy above.
      */}
      <div className="relative aspect-[5/8] w-full sm:aspect-[9/10] lg:aspect-[6/7]">
        {/* Contact shadows, so the devices sit on the floor rather than hover. */}
        <div
          aria-hidden
          className="absolute inset-x-[16%] bottom-[-2%] h-10 rounded-[50%] bg-ink/22 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute inset-x-[26%] bottom-[0.5%] h-5 rounded-[50%] bg-ink/25 blur-lg"
        />

        {/*
          Rear device — verification.

          Sized and placed so the front device covers only its outer bezel. An
          earlier pass let it run 26% under the checkout, which cropped the
          message bubble mid-word: a device showing broken text says the
          product has broken text.
        */}
        <div className="absolute top-[2%] -right-[3%] hidden w-[37%] sm:block">
          <Iphone depth="rear" screenWidth={220}>
            <VerifyScreen />
          </Iphone>
        </div>

        {/* Front device — checkout. */}
        <div className="absolute bottom-0 left-[4%] w-[78%] sm:left-[16%] sm:w-[54%]">
          <Iphone screenWidth={320}>
            <CheckoutScreen />
          </Iphone>
        </div>

        {/*
          No verification card floats over the devices.

          An earlier pass lifted the OTP entry out of the phone and parked it
          across both screens at hero size. It read well in isolation and cost
          too much in place: it covered the payment sheet the front device
          exists to show, and it duplicated the code entry already running on
          the rear one. The interaction was worth keeping — it now runs as the
          animated `OtpFlow` demonstration beside the controls that explain
          it, where a visitor has the context to read it.

          The annotations touch the device rather than pointing at it down a
          dashed line. The line came first and was cut: at this width it had
          four percent of the frame to travel in, which reads as a stray dash
          rather than as a connector.
        */}
        <Callout
          icon={SlidersHorizontal}
          title="COD rules applied"
          detail="Pincode, cart value, customer history"
          className="top-[34%] -left-[3%] hidden w-[21%] md:block"
        />

        <Callout
          icon={BadgeIndianRupee}
          title="Prepaid made cheaper"
          detail="Fee on cash, discount upfront"
          className="top-[62%] -left-[3%] hidden w-[21%] md:block"
          delay="-3.2s"
        />
      </div>
    </div>
  );
}
