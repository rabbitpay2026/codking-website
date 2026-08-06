import { ArrowRight, Banknote, PackageX, Undo2 } from "lucide-react";
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
 * stored on the record — changing a line of copy should not mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  "fake-orders": PackageX,
  rto: Undo2,
  prepaid: Banknote,
};

/**
 * The COD loss, made visible (§5.1 #4).
 *
 * Composed as a statement rather than a row of cards, because that is the
 * argument: the loss is real but no single bill ever totals it (§2). Reading
 * the costs as ruled line items — each with the control that removes it in
 * the right-hand column — makes the shape of the problem obvious before a
 * word of product copy is spent on it, and the closing row is the only place
 * the total can come from: the merchant's own numbers.
 *
 * The action here is the calculator, never the install. §5.2 is explicit that
 * the install is not asked for until the merchant has seen what it is worth.
 */
export function PainPoints() {
  const painPoints = getPainPoints();

  return (
    <SectionShell
      allowOverflow
      className="z-20"
      containerClassName="pb-12 sm:pb-0"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(65% 45% at 50% 8%, color-mix(in oklab, var(--destructive) 6%, transparent), transparent 62%)",
          }}
        />
      }
    >
      <SectionHeading
        eyebrow="The hidden bill"
        title="Cash on delivery sends you an invoice nobody prints"
        description="It arrives in pieces — a freight charge here, a refused parcel there, working capital sitting in a van. Separately they look like the cost of doing business."
      />

      <BlurFade inView className="mt-14 lg:mt-16">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <ul>
            {painPoints.map((painPoint, index) => {
              const Icon = iconFor[painPoint.id] ?? PackageX;
              const control = getControlBySlug(painPoint.controlSlug);

              return (
                <li
                  key={painPoint.id}
                  className="group grid items-start gap-x-6 gap-y-4 border-b border-border p-7 transition-colors duration-300 last:border-b-0 hover:bg-accent/40 sm:grid-cols-[auto_1fr_auto] sm:p-8"
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="text-xs font-semibold text-muted-foreground/50 tabular-nums"
                    >
                      0{index + 1}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-destructive/8 text-destructive">
                      <Icon aria-hidden className="size-5" />
                    </span>
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {painPoint.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {painPoint.body}
                    </p>
                  </div>

                  {control ? (
                    <Link
                      href={routeFor.control(control.slug)}
                      className="inline-flex items-center gap-1.5 self-center rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none hover:border-brand/30 hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      {control.name}
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {/* The total line. Only the merchant can fill it in. */}
          <div className="flex flex-col gap-4 border-t-2 border-dashed border-border bg-cloud p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="text-base font-semibold">
              Total
              <span className="ml-2 font-normal text-muted-foreground">
                depends entirely on your store
              </span>
            </p>
            <Button asChild variant="secondary" size="md">
              <Link href={routes.codCalculator}>
                Work out your number
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </BlurFade>

      {/*
        Hangs into the section below. A card crossing the boundary stitches
        two sections together far more effectively than space between them.
      */}
      <BlurFade inView delay={0.12} className="sm:translate-y-1/2">
        <div className="relative mt-14 flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-brand/20 bg-brand-soft px-8 py-9 text-center shadow-overlay sm:flex-row sm:justify-between sm:text-left lg:mt-16">
          <div
            aria-hidden
            className="absolute -top-24 -right-16 size-64 rounded-full bg-brand/15 blur-3xl"
          />
          <div className="relative">
            <p className="text-xl font-semibold text-ink sm:text-2xl">
              Three questions. One number.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              See what cash on delivery costs your store in a year. Free, and
              nothing to sign up for.
            </p>
          </div>
          <Button asChild size="lg" className="relative shrink-0">
            <Link href={routes.codCalculator}>
              Open the calculator
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
