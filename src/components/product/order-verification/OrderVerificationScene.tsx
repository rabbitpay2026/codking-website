import { PackageCheck, PauseCircle, XCircle } from "lucide-react";

import { OrderQueuePanel } from "@/components/product/order-verification/OrderQueuePanel";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * What each answer means, under the screen that gives it.
 *
 * Three consequences rather than three settings. The panel above already shows
 * the buttons; a column of chips beside it repeating "confirm, hold, cancel"
 * would be labelling a label. What a merchant cannot read off the buttons is
 * what each one does to the parcel, so that is what this strip says.
 */
const OUTCOMES: readonly {
  id: string;
  icon: LucideIcon;
  label: string;
  note: string;
}[] = [
  {
    id: "confirm",
    icon: PackageCheck,
    label: "Confirm",
    note: "Goes to fulfilment",
  },
  {
    id: "hold",
    icon: PauseCircle,
    label: "Hold",
    note: "Waits for a second look",
  },
  { id: "cancel", icon: XCircle, label: "Cancel", note: "Never gets picked" },
];

/**
 * The hero's product scene.
 *
 * The queue, at the width the column gives it, with the consequence of each
 * answer set underneath as a three-part rule. The floating annotation chips
 * that used to sit beside it are gone: they were the same object on all four
 * feature pages, they cost the panel a third of its width, and what they said
 * was already in the hero checklist two columns to the left.
 *
 * The strip is drawn as one ruled row rather than three cards, so the scene
 * reads as a single instrument — a screen and its legend — instead of as a
 * panel with more cards stacked under it.
 */
export function OrderVerificationScene({ className }: WithClassName) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Key light, so the panel is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 44% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <OrderQueuePanel className="mx-auto w-full max-w-[27rem] lg:mx-0 lg:max-w-none" />

      <ul
        aria-hidden
        className="mx-auto mt-3 grid w-full max-w-[27rem] grid-cols-3 overflow-hidden rounded-xl border border-ink/[0.07] bg-white/70 backdrop-blur-sm lg:mx-0 lg:max-w-none"
      >
        {OUTCOMES.map((outcome, index) => (
          <li
            key={outcome.id}
            className={cn(
              "px-3 py-2.5 text-center",
              index > 0 && "border-l border-ink/[0.07]",
            )}
          >
            <outcome.icon
              className="mx-auto size-4 text-ink/35"
              strokeWidth={1.7}
            />
            <span className="mt-1.5 block text-[11px] leading-none font-semibold text-ink/75">
              {outcome.label}
            </span>
            <span className="mt-1 block text-[10px] leading-tight text-ink/40">
              {outcome.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
