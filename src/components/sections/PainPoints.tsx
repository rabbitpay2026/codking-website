import { ArrowRight, PackageX, TrendingDown, Wallet } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routeFor, routes } from "@/constants/routes";
import { getControlBySlug, getPainPoints } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — a copywriter changing a pain point should not have
 * to pick an icon.
 */
const iconFor: Record<string, LucideIcon> = {
  "fake-orders": PackageX,
  rto: TrendingDown,
  prepaid: Wallet,
};

/**
 * The COD loss, made visible (§5.1 #4).
 *
 * The emotional centre of the page. The loss is invisible because it is
 * spread across small line items no single bill totals (§2), so the section
 * names each one and then hands the merchant the tool that turns it into
 * their own number.
 *
 * The cards carry a warm severity rule and lift on hover, and the treatment
 * stops there: this is the one section where the copy has to do the work, and
 * decorating a problem undercuts it.
 *
 * The primary action is the calculator, not the install — §5.2 forbids asking
 * for the install before the merchant has seen the value.
 */
export function PainPoints() {
  const painPoints = getPainPoints();

  return (
    <SectionShell
      // The calculator card straddles the seam into the next section, so this
      // one has to be allowed to spill and to paint above its neighbour —
      // later siblings win the stacking order otherwise.
      allowOverflow
      className="z-20"
      containerClassName="pb-12 sm:pb-0"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(70% 50% at 50% 12%, color-mix(in oklab, var(--destructive) 7%, transparent), transparent 65%)",
          }}
        />
      }
    >
      <SectionHeading
        eyebrow="The COD loss"
        title="COD is costing you more than you think"
        description="The loss is spread across returned freight, fake orders, and cash tied up in parcels that never arrive. No single bill shows the total, so the problem stays invisible."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-16">
        {painPoints.map((painPoint, index) => {
          const Icon = iconFor[painPoint.id] ?? PackageX;
          const control = getControlBySlug(painPoint.controlSlug);

          return (
            <BlurFade
              key={painPoint.id}
              delay={0.06 * index}
              inView
              className="h-full"
            >
              <article className="group relative flex h-full surface-card flex-col overflow-hidden p-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-destructive/45 to-transparent"
                />

                <span className="grid size-11 place-items-center rounded-xl bg-destructive/8 text-destructive transition-transform duration-300 group-hover:scale-105">
                  <Icon aria-hidden className="size-5" />
                </span>

                <h3 className="mt-6 text-lg font-semibold">
                  {painPoint.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {painPoint.body}
                </p>

                {control ? (
                  <Link
                    href={routeFor.control(control.slug)}
                    className="mt-7 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    Fixed by {control.name}
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                ) : null}
              </article>
            </BlurFade>
          );
        })}
      </div>

      {/*
        Hangs half out of the section and into the one below. A card crossing
        the boundary stitches two sections together far more effectively than
        any amount of whitespace between them — and it puts the page's most
        useful action exactly where the eye is already travelling.
      */}
      <BlurFade inView delay={0.15} className="sm:translate-y-1/2">
        <div className="relative mt-14 flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-brand/20 bg-brand-soft px-8 py-10 text-center shadow-overlay sm:flex-row sm:justify-between sm:text-left lg:mt-16">
          <div
            aria-hidden
            className="absolute -top-24 -right-16 size-64 rounded-full bg-brand/15 blur-3xl"
          />

          <div className="relative">
            <p className="text-xl font-semibold text-ink sm:text-2xl">
              What is COD costing your store?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Answer three questions and see your own annual number. Free, no
              signup.
            </p>
          </div>

          <Button asChild size="lg" className="relative shrink-0">
            <Link href={routes.codCalculator}>
              Open the COD Calculator
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
