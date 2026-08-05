import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { getControlNavGroups, getOrderStages } from "@/lib/content";

/**
 * The Controls system (§5.1 #5).
 *
 * The point of this section is that COD King is a system, not a single
 * feature. Grouping by when a control acts in the order lets a merchant enter
 * at their symptom rather than having to already know which feature solves
 * their problem, and shows at a glance the stages they are not yet using
 * (§6.4).
 *
 * Stages and controls both come from the repository, so this section, the
 * mega-menu and the footer cannot disagree (§11).
 */
export function Solution() {
  const stages = getOrderStages();
  const groups = getControlNavGroups();

  return (
    <section className="border-y border-border bg-cloud py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The controls"
          title="One system, working at every stage of the order"
          description="Ten controls, grouped by when they act. Turn on the ones that match your problem and leave the rest off."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => {
            const group = groups.find((item) => item.title === stage.label);

            return (
              // The reveal wrapper sits inside the list item, never between
              // the list and its items: a div there would break `ol > li` and
              // with it the list semantics a screen reader relies on.
              <li key={stage.id} className="h-full">
                <BlurFade delay={0.06 * index} inView className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-full bg-brand text-[11px] font-semibold text-white tabular-nums">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-semibold tracking-[0.06em] uppercase">
                        {stage.label}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {stage.problem}
                    </p>

                    <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                      {group?.items.map((control) => (
                        <li key={control.href}>
                          <Link
                            href={control.href}
                            className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-foreground transition-colors outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60"
                          >
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

        <div className="mt-12 text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href={routes.features}>
              Explore all ten controls
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
