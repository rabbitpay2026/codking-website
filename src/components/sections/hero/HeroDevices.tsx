import { BadgeIndianRupee, ShieldX, TrendingDown } from "lucide-react";

import { CheckoutScreen } from "@/components/sections/hero/CheckoutScreen";
import { OtpScreen } from "@/components/sections/hero/OtpScreen";
import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface StatusCardProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
  readonly className?: string;
  /** Offsets the float loop so the cards never rise and fall in unison. */
  readonly delay?: string;
}

/**
 * A live status card floating beside the devices.
 *
 * Glass rather than solid, so it reads as sitting above the scene rather than
 * pasted onto it, and each one names an outcome the product actually produces
 * rather than a feature it has.
 */
function StatusCard({
  icon: Icon,
  label,
  value,
  className,
  delay,
}: StatusCardProps) {
  return (
    <div
      aria-hidden
      style={delay ? { animationDelay: delay } : undefined}
      className={cn(
        "absolute z-30 animate-float",
        "flex items-center gap-2.5 rounded-2xl px-3 py-2.5",
        "border border-white/70 bg-white/85 shadow-overlay backdrop-blur-xl",
        className,
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-soft">
        <Icon className="size-4 text-brand" />
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] text-ink/55">{label}</span>
        <span className="block text-xs font-semibold text-ink">{value}</span>
      </span>
    </div>
  );
}

/**
 * The hero's product scene.
 *
 * Two devices, overlapping and turned slightly toward each other, telling the
 * story in the order the buyer lives it: the checkout where the controls are
 * applied, and the verification that decides whether the order is real. One
 * device shows a feature; two show a flow.
 *
 * Depth comes from the arrangement rather than from effects — different
 * scales, a rotation on each, a shadow that grows with proximity, and a lit
 * field behind. The rear device is dimmed slightly so the eye lands on the
 * checkout first.
 *
 * Below `sm` only the checkout is shown. Two phones at phone width is not a
 * composition, it is a crowd, and the hero has to stay legible on the screens
 * where most COD research actually happens.
 */
export function HeroDevices() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] [perspective:1800px]">
      {/* Lit field behind the scene. */}
      <div
        aria-hidden
        className="absolute inset-[8%] -z-10 rounded-[40%] bg-brand/25 blur-[90px]"
      />

      <div className="relative aspect-[5/6] w-full">
        {/* Rear device — OTP verification. */}
        <div className="absolute top-0 right-0 hidden w-[47%] sm:block">
          <div className="origin-bottom-left [transform:rotateY(-16deg)_rotateZ(5deg)]">
            <Iphone className="opacity-95 drop-shadow-[0_25px_45px_rgba(20,16,58,0.22)]">
              <OtpScreen />
            </Iphone>
          </div>
        </div>

        {/* Front device — checkout. */}
        <div className="absolute bottom-0 left-0 w-[64%] sm:w-[56%]">
          <div className="origin-bottom-right [transform:rotateY(10deg)_rotateZ(-4deg)]">
            <Iphone className="drop-shadow-[0_40px_60px_rgba(20,16,58,0.3)]">
              <CheckoutScreen />
            </Iphone>
          </div>
        </div>

        <StatusCard
          icon={ShieldX}
          label="Fake order"
          value="Blocked"
          className="top-[6%] left-[-2%] hidden md:flex"
        />
        <StatusCard
          icon={TrendingDown}
          label="RTO this month"
          value="Down 35%"
          className="right-[-4%] bottom-[26%] hidden sm:flex"
          delay="-2.4s"
        />
        <StatusCard
          icon={BadgeIndianRupee}
          label="Recovered"
          value="₹18,400"
          className="bottom-[4%] left-[38%] hidden lg:flex"
          delay="-4.8s"
        />
      </div>
    </div>
  );
}
