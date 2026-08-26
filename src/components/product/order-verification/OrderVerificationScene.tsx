import { BadgeCheck, CircleSlash, PauseCircle } from "lucide-react";

import { OrderQueuePanel } from "@/components/product/order-verification/OrderQueuePanel";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The three things the merchant controls, ringing the thing the panel shows.
 *
 * Worded as settings rather than as benefits, which is the division that makes
 * the scene worth having two halves: the panel is the screen, these are what
 * the merchant decided about it. The same three words as benefits would be the
 * hero checklist a second time.
 */
const CONTROLS: readonly { id: string; icon: LucideIcon; label: string }[] = [
  { id: "confirm", icon: BadgeCheck, label: "Confirm what should ship" },
  { id: "hold", icon: PauseCircle, label: "Hold what needs a look" },
  { id: "cancel", icon: CircleSlash, label: "Cancel before packing" },
];

/**
 * The hero's product scene.
 *
 * The panel, and beside it the settings behind it. Two objects and one
 * relationship: what the screen shows on the left, what the merchant chose on
 * the right — so a visitor understands before reading a word that this is
 * configured rather than fixed.
 *
 * The chips are the first thing to go as the column narrows. Below `lg` there
 * is no room for a column of annotation beside a product panel, and a chip
 * crushed against the frame argues against the craft it exists to demonstrate;
 * the three settings are all named in the checklist beside the headline
 * anyway, so nothing is lost. They are hidden from assistive technology for
 * that same reason — a screen reader should hear that list once.
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

      <div className="flex items-center gap-4">
        <OrderQueuePanel className="mx-auto w-full max-w-[23rem] lg:mx-0 lg:max-w-none lg:flex-1" />

        <div
          aria-hidden
          className="hidden w-[8.75rem] shrink-0 flex-col gap-2.5 lg:flex"
        >
          {CONTROLS.map((control) => (
            <div
              key={control.id}
              className={cn(
                "rounded-2xl border border-white/90 bg-white/80 px-2.5 py-2.5 backdrop-blur-xl",
                "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_10px_24px_-14px_rgba(11,27,54,0.4)]",
              )}
            >
              <span className="grid size-6 place-items-center rounded-lg bg-ink/[0.05] ring-1 ring-ink/8">
                <control.icon className="size-3 text-ink/65" />
              </span>
              <span className="mt-2 block text-[10px] leading-[1.3] font-semibold text-balance text-ink/75">
                {control.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
