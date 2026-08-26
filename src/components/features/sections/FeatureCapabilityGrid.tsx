import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { FeatureCapability } from "@/types";

import type { LucideIcon } from "lucide-react";

interface FeatureCapabilityGridProps {
  /** Optional label on the band, for pages that lead their sections with one. */
  readonly eyebrow?: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly FeatureCapability[];
  readonly iconFor: Record<string, LucideIcon>;
  readonly fallbackIcon: LucideIcon;
  /** The surface. `muted` where the neighbouring bands are both white. */
  readonly tone?: "default" | "muted";
}

/**
 * What the merchant can actually configure.
 *
 * Six, in a three-by-two grid, all the same size — because these are peers.
 * The moment one of six settings is drawn larger than the others the grid
 * becomes a ranking, and a merchant reads the largest card as the one that
 * matters rather than as the one that happened to have the longest line.
 *
 * The mark sits above the title rather than beside it. Beside it is the
 * arrangement the results band and the audience row use, and having all three
 * bands share it was most of why the pages read as one repeated object; giving
 * this one a stacked card puts a second rhythm on the page without inventing a
 * second design language for it. It also buys the title the full width of the
 * card, which is what lets these be sentences rather than labels.
 *
 * The type is set to be read rather than scanned — a 15px title over a 13px
 * body — because this is the band a merchant actually stops on. The previous
 * 13.5/12 pairing was the same size as the audience pills three bands down,
 * and a capability that reads at the weight of a category is a capability
 * nobody reads.
 *
 * `BlurFade` staggers them by index, which is the one place a feature grid is
 * allowed motion: the cards arrive as a rank rather than all at once, and the
 * whole run is over in under a third of a second.
 */
export function FeatureCapabilityGrid({
  eyebrow,
  title,
  description,
  capabilities,
  iconFor,
  fallbackIcon,
  tone = "default",
}: FeatureCapabilityGridProps) {
  return (
    <SectionShell
      tone={tone}
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <div className="flex flex-col items-center">
        {eyebrow ? <FeatureEyebrow>{eyebrow}</FeatureEyebrow> : null}
        <SectionHeading
          as="h2"
          title={title}
          description={description}
          className={cn(eyebrow && "mt-4 [&>h2]:mt-0")}
        />
      </div>

      <ul className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => {
          const Icon = iconFor[capability.id] ?? fallbackIcon;

          return (
            <li key={capability.id} className="h-full">
              <BlurFade delay={0.04 * index} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-ink/[0.08] bg-card px-5 py-5",
                    cardHoverClass,
                  )}
                >
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-sky-50 text-ink/45"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.7} />
                  </span>

                  <h3 className="mt-4 text-[15px] leading-snug font-semibold tracking-[-0.015em] text-balance text-ink">
                    {capability.title}
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-relaxed text-pretty text-ink/55">
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
