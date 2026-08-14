import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { FeatureCapability } from "@/types";

import type { LucideIcon } from "lucide-react";

interface FeatureCapabilityGridProps {
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly FeatureCapability[];
  readonly iconFor: Record<string, LucideIcon>;
  readonly fallbackIcon: LucideIcon;
}

/**
 * What the merchant can actually configure.
 *
 * Six, in a three-by-two grid, all the same size — because these are peers.
 * The moment one of six settings is drawn larger than the others the grid
 * becomes a ranking, and a merchant reads the largest card as the one that
 * matters rather than as the one that happened to have the longest line.
 *
 * The mark sits beside the title rather than above it, which is the same
 * arrangement as the results band and the capability rows on the sibling
 * pages: one relationship between a mark and its label, used everywhere, so
 * the site reads as one hand.
 *
 * No `subgrid` here, unlike the results band. That tool earns its complexity
 * where a label wraps in one column and not another; these titles are two or
 * three words each and hold one line at every width the grid produces, so the
 * descriptions already start on the same line. `items-stretch` on the grid is
 * all that is needed to end every card in a rank on the same edge.
 *
 * `BlurFade` staggers them by index, which is the one place a feature grid is
 * allowed motion: the cards arrive as a rank rather than all at once, and the
 * whole run is over in under a third of a second.
 */
export function FeatureCapabilityGrid({
  title,
  description,
  capabilities,
  iconFor,
  fallbackIcon,
}: FeatureCapabilityGridProps) {
  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <SectionHeading as="h2" title={title} description={description} />

      <ul className="mt-9 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => {
          const Icon = iconFor[capability.id] ?? fallbackIcon;

          return (
            <li key={capability.id} className="h-full">
              <BlurFade delay={0.04 * index} className="h-full">
                <div
                  className={cn(
                    "grid h-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 rounded-xl border border-ink/[0.08] bg-card px-4 py-4",
                    cardHoverClass,
                  )}
                >
                  <span
                    aria-hidden
                    className="col-start-1 row-start-1 grid size-9 shrink-0 place-items-center self-center rounded-lg border border-border bg-sky-50 text-ink/45"
                  >
                    <Icon className="size-[17px]" strokeWidth={1.7} />
                  </span>

                  <h3 className="col-start-2 row-start-1 self-center text-[13.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                    {capability.title}
                  </h3>

                  <p className="col-start-2 row-start-2 mt-2 text-[12px] leading-relaxed text-pretty text-ink/50">
                    {capability.body}
                  </p>
                </div>
              </BlurFade>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
