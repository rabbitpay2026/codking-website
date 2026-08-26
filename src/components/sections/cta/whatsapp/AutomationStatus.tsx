import { Check } from "lucide-react";

import { MILESTONES } from "@/components/sections/cta/whatsapp/messages";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * The checkpoint rail under the thread.
 *
 * Deliberately the quietest thing in the block. The conversation is the
 * demonstration; this is a legend for it — four small chips that light as the
 * sequence passes them, so a visitor arriving mid-loop can see how far through
 * a cash-on-delivery order they are looking at without reading three bubbles
 * to work it out.
 *
 * Chips in a row inside the panel rather than cards floating around it. A card
 * beside the panel is a second object at the same weight as the first, and
 * four of them is the "AI landing page" arrangement this section exists to
 * avoid; a row on the panel's own footer is a status bar, which is what it is.
 *
 * It wraps rather than scrolls, so the narrowest phone stacks the chips into
 * two rows instead of pushing the fourth outside the card.
 */
export function AutomationStatus({ step }: { readonly step: number }) {
  return (
    <div className="shrink-0 border-t border-ink/[0.07] bg-white px-4 py-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {MILESTONES.map((milestone) => {
          const reached = step >= milestone.reachedAt;

          return (
            <span
              key={milestone.id}
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-[10.5px] leading-none font-medium",
                "transition-colors duration-500 ease-emphasized",
                reached
                  ? "bg-brand-check/10 text-brand-check"
                  : "bg-ink/[0.04] text-ink/35",
              )}
            >
              <Check
                aria-hidden
                className={cn(
                  "size-2.5 transition-opacity duration-500 ease-emphasized",
                  reached ? "opacity-100" : "opacity-30",
                )}
                strokeWidth={3.5}
              />
              {milestone.label}
            </span>
          );
        })}
      </div>

      <p className="mt-2.5 flex items-center gap-1.5 text-[10.5px] leading-none font-medium text-ink/40">
        <Check aria-hidden className="size-2.5 shrink-0 text-brand-check" />
        <span className="truncate">
          Automated by{" "}
          <span className="font-bold text-ink/60">{siteConfig.name}</span>
        </span>
      </p>
    </div>
  );
}
