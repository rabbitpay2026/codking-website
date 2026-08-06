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
 * Composed as an invoice rather than a row of cards, because that *is* the
 * argument: the loss is real but no single bill ever totals it (§2). Reading
 * the costs as ruled line items — each with the control that removes it in the
 * right-hand column — makes the shape of the problem obvious before a word of
 * product copy is spent on it.
 *
 * The total row is the close, and it is the only place the figure can come
 * from: the merchant's own numbers. An earlier pass put a second, larger
 * calculator card underneath this one, hanging halfway into the next section.
 * It asked for the same click twice, and the clearance the overhang needed
 * left a corridor of empty page on either side of it. One invoice, one total,
 * one action — the seam closes and the argument gets sharper.
 *
 * The action here is the calculator, never the install. §5.2 is explicit that
 * the install is not asked for until the merchant has seen what it is worth.
 */
export function PainPoints() {
  const painPoints = getPainPoints();

  return (
    <SectionShell
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
        title="Cash on delivery sends an invoice nobody prints"
        description="It arrives in pieces — freight out, a refused parcel back, working capital riding around in a van. Item by item it looks like the cost of doing business."
      />

      <BlurFade inView className="mt-lede">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <ul>
            {painPoints.map((painPoint, index) => {
              const Icon = iconFor[painPoint.id] ?? PackageX;
              const control = getControlBySlug(painPoint.controlSlug);

              return (
                <li
                  key={painPoint.id}
                  className="group grid items-start gap-x-6 gap-y-3.5 border-b border-border p-6 transition-colors duration-300 last:border-b-0 hover:bg-accent/40 sm:grid-cols-[auto_1fr_auto] sm:p-7"
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
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
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
          <div className="relative flex flex-col gap-4 overflow-hidden border-t-2 border-dashed border-border bg-gradient-to-br from-brand-soft via-cloud to-brand-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div
              aria-hidden
              className="absolute -top-20 -right-10 size-56 rounded-full bg-brand/12 blur-3xl"
            />

            <div className="relative">
              <p className="text-base font-semibold sm:text-lg">
                Total
                <span className="ml-2.5 font-normal text-muted-foreground">
                  depends entirely on your store
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Three questions and you have the yearly figure. Free, and
                nothing to sign up for.
              </p>
            </div>

            <Button asChild size="lg" className="relative shrink-0">
              <Link href={routes.codCalculator}>
                Work out your number
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
