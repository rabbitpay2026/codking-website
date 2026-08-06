import { MapPinCheck, ShieldCheck } from "lucide-react";

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
        "rounded-2xl border border-white/80 bg-white/90 px-3 py-2.5 shadow-overlay backdrop-blur-xl",
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
 * device is smaller and turned further away so the eye lands on the checkout
 * first and reads the second phone as what happens next.
 *
 * The layout is planned around the annotations rather than the other way
 * round. The devices are pushed right to leave a clear column on the left for
 * the callouts, so a line can travel from the callout to the address block
 * without crossing anything. A line says *this element*; a card floating
 * nearby can only say *that region*.
 *
 * Nothing here fades in — see `Hero` for why the first screen must not depend
 * on JavaScript to be visible. The only motion is the callouts' slow float,
 * which starts from a visible state and is removed under reduced motion.
 */
export function HeroDevices() {
  return (
    <div className="relative w-full [perspective:2200px]">
      {/* Contact shadow, so the devices sit on the floor rather than hover. */}
      <div
        aria-hidden
        className="absolute inset-x-[26%] bottom-[1%] h-12 rounded-[50%] bg-ink/20 blur-2xl"
      />

      <div className="relative aspect-[7/8] w-full sm:aspect-[8/7] lg:aspect-[7/8]">
        {/* Connectors from the callouts to the address block. */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-20 hidden size-full md:block"
        >
          <line
            x1="20"
            y1="35"
            x2="23"
            y2="35"
            className="stroke-brand"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            style={{ animation: "var(--animate-trace)" }}
          />
          <line
            x1="19"
            y1="66"
            x2="23"
            y2="56"
            className="stroke-brand/70"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "var(--animate-trace)",
              animationDelay: "-1.3s",
            }}
          />
        </svg>

        {/* Anchor dots where each connector meets the device. */}
        <span
          aria-hidden
          className="absolute top-[35%] left-[23%] z-30 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/25 md:block"
        />
        <span
          aria-hidden
          className="absolute top-[56%] left-[23%] z-30 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/25 md:block"
        />

        {/* Rear device — verification. */}
        <div className="absolute top-0 right-0 hidden w-[36%] sm:block">
          <div className="origin-bottom [transform:rotateY(-13deg)_rotateZ(3deg)]">
            <Iphone>
              <VerifyScreen />
            </Iphone>
          </div>
        </div>

        {/* Front device — checkout. */}
        <div className="absolute bottom-0 left-[8%] w-[76%] sm:left-[21%] sm:w-[48%]">
          <div className="origin-bottom [transform:rotateY(7deg)_rotateZ(-2deg)]">
            <Iphone>
              <CheckoutScreen />
            </Iphone>
          </div>
        </div>

        <Callout
          icon={MapPinCheck}
          title="Address checked"
          detail="Pincode serviceable"
          className="top-[27%] left-0 hidden w-[23%] md:block"
        />

        <Callout
          icon={ShieldCheck}
          title="Cash priced"
          detail="Fee on cash, discount on prepaid"
          className="top-[57%] left-0 hidden w-[23%] md:block"
          delay="-3.2s"
        />
      </div>
    </div>
  );
}
