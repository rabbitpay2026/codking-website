import { PieChart, ShieldCheck, ShoppingCart, Tag, Wallet } from "lucide-react";

import { SectionShell } from "@/components/sections/SectionShell";
import { cn } from "@/lib/utils";
import { getPricingBenefits } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/** Keyed by benefit id, so a card cannot be drawn with another's mark. */
const benefitIcon: Record<string, LucideIcon> = {
  "otp-verification": ShieldCheck,
  "partial-payments": Wallet,
  "cod-fees": Tag,
  "abandoned-cart-recovery": ShoppingCart,
  analytics: PieChart,
};

/**
 * What the price actually buys (§3.1).
 *
 * The table above it is exhaustive and therefore unreadable at a glance; this
 * is the same product in five lines, for the merchant who scrolled past it.
 * Nothing here is a new claim — every card names a control the table already
 * lists.
 *
 * Five equal cards on one row, each as tall as the tallest. The descriptions
 * run to different lengths and cards sized by their own text would step down
 * across the row like a staircase.
 */
export function PricingBenefits() {
  const benefits = getPricingBenefits();

  return (
    <SectionShell
      tone="muted"
      size="compact"
      seam="top"
      className="border-t border-ink/10"
    >
      <h2 className="text-center text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.6rem]">
        What you get with COD King
      </h2>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {benefits.map((benefit) => {
          const Icon = benefitIcon[benefit.id];

          return (
            <li key={benefit.id} className="h-full">
              {/*
                The plan card's treatment, at this size: same radius, same
                border, same two pixels of lift on the same curve. Five cards
                that hover differently from the three above them would read as
                a second design rather than the same page.
              */}
              <div
                className={cn(
                  "flex h-full flex-col items-center rounded-2xl border border-border bg-card px-5 py-6 text-center",
                  "transition-[translate,transform,box-shadow,border-color] duration-300 ease-[var(--ease-emphasized)]",
                  "hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card",
                )}
              >
                {Icon ? (
                  // One tile, one size, one optical centre. Five unrelated
                  // marks drawn at their own sizes never line up across a row.
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-xl border border-border bg-sky-50 text-brand"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.6} />
                  </span>
                ) : null}
                <h3 className="mt-3.5 text-[14px] leading-snug font-semibold text-balance text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-pretty text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
