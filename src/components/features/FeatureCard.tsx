import { Check } from "lucide-react";
import Link from "next/link";

import { FeatureLink } from "@/components/features/FeatureLink";
import { FeatureMark } from "@/components/features/FeatureMark";
import { routeFor } from "@/constants/routes";
import { cn } from "@/lib/utils";

import type { FeatureIndexItem } from "@/types";

/**
 * One control, at one of two weights.
 *
 * `highlight` carries what the control actually does — the record's benefit
 * list, trimmed to three so two of these sit beside each other without either
 * becoming a wall. `supporting` carries the outcome line alone, because a row
 * of four is scanned rather than read.
 *
 * This is now every card on the page. There used to be a third, wider block
 * above these carrying the first control across the full measure; the reviewer
 * asked for that one to be a card too, so it is this component at `highlight`
 * like its neighbours.
 *
 * One component for both rather than two nearly-identical ones: the difference
 * between the tiers is how much they say, not how they look, and two files
 * would let the padding, the radius and the hover drift apart.
 *
 * The whole card is the link, never a "learn more" tucked in a corner of it.
 */
export function FeatureCard({ control, title, emphasis }: FeatureIndexItem) {
  const isHighlight = emphasis === "highlight";
  const benefits = isHighlight ? control.benefits?.slice(0, 3) : undefined;

  return (
    <Link
      href={routeFor.control(control.slug)}
      className={cn(
        "group flex h-full flex-col rounded-[1.15rem] border border-border bg-card outline-none",
        "transition-[translate,transform,box-shadow,border-color] duration-300 ease-emphasized",
        "hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card",
        "focus-visible:ring-2 focus-visible:ring-ring/60",
        isHighlight ? "p-6 lg:p-7" : "p-5 lg:p-6",
      )}
    >
      <FeatureMark slug={control.slug} />

      <h2
        className={cn(
          "mt-4 leading-snug font-semibold tracking-[-0.012em] text-balance text-ink",
          isHighlight ? "text-[17px]" : "text-[15px]",
        )}
      >
        {title}
      </h2>

      <p
        className={cn(
          "mt-2 leading-relaxed text-pretty text-ink/55",
          isHighlight ? "text-[13.5px]" : "text-[13px]",
        )}
      >
        {control.outcome}
      </p>

      {benefits ? (
        <ul className="mt-4 space-y-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5">
              <span
                aria-hidden
                className="mt-px grid size-[17px] shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/[0.06]"
              >
                <Check className="size-2.5 text-brand" strokeWidth={3} />
              </span>
              <span className="text-[12.5px] leading-relaxed text-ink/70">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* `mt-auto` puts every arrow in a row on one line, whatever the cards
          above it say. */}
      <FeatureLink className="mt-auto pt-5" />
    </Link>
  );
}
