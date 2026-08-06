import { MapPinCheck, ShieldCheck, TrendingUp } from "lucide-react";

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

/**
 * An annotation pointing at something inside a device.
 *
 * Glass rather than solid, so it reads as sitting above the scene, and small
 * enough that it never competes with the screen it is explaining.
 */
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
        "rounded-2xl border border-white/70 bg-white/85 px-3 py-2.5 shadow-overlay backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft">
          <Icon className="size-3.5 text-brand" />
        </span>
        <span className="text-[11px] leading-tight font-semibold text-ink">
          {title}
        </span>
      </div>
      <p className="mt-1.5 text-[10px] leading-snug text-ink/55">{detail}</p>
    </div>
  );
}

/**
 * The hero's product scene.
 *
 * Two devices, one story: the checkout where the controls are applied, and
 * the verification that decides whether the order was ever real. The rear
 * device is smaller, dimmer and turned further away, so the eye lands on the
 * checkout first and reads the second phone as what happens next.
 *
 * The callouts on the left are connected to the address block by drawn lines
 * rather than left to float near it. A line removes the ambiguity: it says
 * *this* element, not *that region*. The lines are a single SVG on a 0–100
 * viewBox with `preserveAspectRatio="none"`, so their endpoints stay attached
 * to the same proportional points at every width.
 *
 * Below `md` the annotations are dropped and below `sm` the rear device goes
 * too. Annotation layers need room to point across; at phone width there is
 * none, and a callout overlapping the screen it explains is worse than no
 * callout at all.
 */
export function HeroDevices() {
  return (
    <div className="relative mx-auto w-full max-w-[38rem] [perspective:2000px]">
      {/* Contact shadow, so the devices sit on the floor rather than hover. */}
      <div
        aria-hidden
        className="absolute inset-x-[12%] bottom-[2%] h-10 rounded-[50%] bg-ink/20 blur-2xl"
      />

      <div className="relative aspect-[5/6] w-full">
        {/* Connectors: callout → address block. */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-20 hidden size-full md:block"
        >
          <line
            x1="27"
            y1="36.5"
            x2="36"
            y2="36.5"
            className="stroke-brand/60"
            strokeWidth="0.35"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
            style={{ animation: "var(--animate-trace)" }}
          />
          <line
            x1="24"
            y1="61"
            x2="36"
            y2="52"
            className="stroke-brand/45"
            strokeWidth="0.35"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: "var(--animate-trace)",
              animationDelay: "-1.3s",
            }}
          />
        </svg>

        {/* Anchor dots where the connectors meet the device. */}
        <span
          aria-hidden
          className="absolute top-[36.5%] left-[36%] z-30 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20 md:block"
        />
        <span
          aria-hidden
          className="absolute top-[52%] left-[36%] z-30 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20 md:block"
        />

        {/* Rear device — verification. */}
        <div className="absolute top-0 right-0 hidden w-[42%] sm:block">
          <div className="origin-bottom-left [transform:rotateY(-18deg)_rotateZ(4deg)]">
            <Iphone className="opacity-95 drop-shadow-[0_28px_50px_rgba(20,16,58,0.24)]">
              <VerifyScreen />
            </Iphone>
          </div>
        </div>

        {/* Front device — checkout. */}
        <div className="absolute right-[6%] bottom-0 w-[72%] sm:right-[12%] sm:w-[52%]">
          <div className="origin-bottom [transform:rotateY(8deg)_rotateZ(-2.5deg)]">
            <Iphone className="drop-shadow-[0_45px_70px_rgba(20,16,58,0.3)]">
              <CheckoutScreen />
            </Iphone>
          </div>
        </div>

        <Callout
          icon={MapPinCheck}
          title="Address checked"
          detail="Pincode serviceable before the order is taken"
          className="top-[27%] left-0 hidden w-[27%] md:block"
        />

        <Callout
          icon={ShieldCheck}
          title="COD priced"
          detail="A fee on cash, a discount on prepaid"
          className="bottom-[30%] left-0 hidden w-[24%] md:block"
          delay="-2.6s"
        />

        <Callout
          icon={TrendingUp}
          title="RTO down 35%"
          detail="Across verified orders"
          className="top-[8%] left-[16%] hidden w-[26%] lg:block"
          delay="-4.9s"
        />
      </div>
    </div>
  );
}
