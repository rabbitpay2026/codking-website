import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { Aurora } from "@/components/ui/aurora";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Noise } from "@/components/ui/noise";
import { routes } from "@/constants/routes";
import { getControlNavGroups, getOrderStages } from "@/lib/content";

/**
 * The Controls system (§5.1 #5).
 *
 * The point of the section is that COD King is a system, not a single
 * feature. Grouping by when a control acts lets a merchant enter at their
 * symptom rather than having to already know which feature solves their
 * problem, and shows at a glance the stages they are not yet using (§6.4).
 *
 * Rendered as glass over a soft colour field: the four stages are one
 * mechanism seen in sequence, and cards that share a background read as parts
 * of a whole where opaque cards would read as four separate products. The
 * numbered markers and the rule between them carry the order.
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
      // Clears the calculator card hanging down from the section above.
      containerClassName="sm:pt-[9rem] md:pt-[10.5rem] lg:pt-[12.5rem]"
      backdrop={
        <>
          <Aurora intensity="soft" />
          <Noise />
        </>
      }
    >
      <SectionHeading
        eyebrow="The controls"
        title="One system, working at every stage of the order"
        description="Ten controls, grouped by when they act. Turn on the ones that match your problem and leave the rest off."
      />

      <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const group = groups.find((item) => item.title === stage.label);

          return (
            // The reveal wrapper sits inside the list item, never between the
            // list and its items: a div there would break `ol > li` and with
            // it the list semantics a screen reader relies on.
            <li key={stage.id} className="h-full">
              <BlurFade delay={0.07 * index} inView className="h-full">
                <div className="group flex h-full surface-glass flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-7 place-items-center rounded-full bg-brand text-[11px] font-semibold text-white tabular-nums shadow-[0_4px_12px_-4px_var(--brand)]">
                      {index + 1}
                    </span>
                    <h3 className="text-[13px] font-semibold tracking-[0.06em] uppercase">
                      {stage.label}
                    </h3>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {stage.problem}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-border/70 pt-5">
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
                </div>
              </BlurFade>
            </li>
          );
        })}
      </ol>

      <div className="mt-14 text-center">
        <Button asChild variant="secondary" size="lg">
          <Link href={routes.features}>
            Explore all ten controls
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
