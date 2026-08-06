import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { Aurora } from "@/components/ui/aurora";
import { BlurFade } from "@/components/ui/blur-fade";
import { Noise } from "@/components/ui/noise";
import { routes } from "@/constants/routes";
import { getControlNavGroups, getOrderStages } from "@/lib/content";

/**
 * The Controls system (§5.1 #5).
 *
 * The point of the section is that COD King is a system, not a single feature.
 * Grouping by *when* a control acts lets a merchant enter at their symptom
 * rather than having to already know which feature solves their problem, and
 * shows at a glance the stages they are not yet using (§6.4).
 *
 * Rendered as glass over a soft colour field: the four stages are one
 * mechanism seen in sequence, and cards that share a background read as parts
 * of a whole where opaque cards would read as four separate products. The
 * numbered markers and the rule running between them carry the order.
 *
 * The "all ten controls" action is welded to the end of the fourth card rather
 * than floating in centred space below the grid. A lone button under a grid
 * needs air above and below it to look deliberate, and that air was reading as
 * the page having ended; attached to the composition it needs none.
 *
 * Stages and controls both come from the repository, so this section, the
 * mega-menu and the footer cannot disagree (§11).
 */
export function Solution() {
  const stages = getOrderStages();
  const groups = getControlNavGroups();

  return (
    <SectionShell
      tone="muted"
      seam="top"
      backdrop={
        <>
          <Aurora intensity="soft" />
          <Noise />
        </>
      }
    >
      <SectionHeading
        eyebrow="The system"
        title="Ten controls, four moments in an order"
        description="Each one acts at a specific point. Switch on what matches your problem and the rest stays out of the way."
      />

      <ol className="mt-lede grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const group = groups.find((item) => item.title === stage.label);

          return (
            // The reveal wrapper sits inside the list item, never between the
            // list and its items: a div there would break `ol > li` and with
            // it the list semantics a screen reader relies on.
            <li key={stage.id} className="h-full">
              <BlurFade delay={0.07 * index} inView className="h-full">
                <div className="flex h-full surface-glass flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-semibold text-white tabular-nums shadow-[0_4px_12px_-4px_var(--brand)]">
                      {index + 1}
                    </span>
                    <h3 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase">
                      {stage.label}
                    </h3>
                    {index < stages.length - 1 ? (
                      <span
                        aria-hidden
                        className="hidden h-px flex-1 bg-gradient-to-r from-brand/30 to-transparent lg:block"
                      />
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {stage.problem}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-border/70 pt-4">
                    {group?.items.map((control) => (
                      <li key={control.href}>
                        <Link
                          href={control.href}
                          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground transition-colors outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60"
                        >
                          <span
                            aria-hidden
                            className="size-1 rounded-full bg-brand/50"
                          />
                          {control.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Welded to the last card, so the action needs no clearing. */}
                  {index === stages.length - 1 ? (
                    <div className="mt-auto pt-6">
                      <Link
                        href={routes.features}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-background/70 px-3.5 py-2 text-[13px] font-semibold text-brand transition-colors outline-none hover:border-brand/50 hover:bg-background focus-visible:ring-2 focus-visible:ring-ring/60"
                      >
                        Explore all ten controls
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </BlurFade>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
