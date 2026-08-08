import { Check } from "lucide-react";
import Link from "next/link";

import { FeatureLink } from "@/components/features/FeatureLink";
import { FeatureMark } from "@/components/features/FeatureMark";
import { FlagshipVisual } from "@/components/sections/flagship/FlagshipVisual";
import { routeFor } from "@/constants/routes";

import type { FeatureIndexItem } from "@/types";

/**
 * The control that opens the page, shown working.
 *
 * The one block on this page that does not describe a capability but
 * demonstrates it. The demonstration is the project's own flagship visual —
 * drawn in markup, animated in the browser, no video bytes and real text
 * throughout — so the first thing a merchant sees on Features is the product
 * doing the thing, not a card claiming it does.
 *
 * Copy on the left, product on the right, both hanging from the same top edge.
 * The benefits are the record's own (§6.2); not a word of them is authored
 * here, and a control with none simply renders without the list.
 *
 * The whole panel is the link. It does not lift on hover — a block this size
 * moving under the cursor reads as the page jolting — so the response is the
 * border warming and the mark and the arrow answering together.
 */
export function FeatureLead({ control, title }: FeatureIndexItem) {
  return (
    <Link
      href={routeFor.control(control.slug)}
      className="group grid gap-8 rounded-[1.25rem] border border-border bg-card p-6 transition-[box-shadow,border-color] duration-300 ease-emphasized outline-none hover:border-ink/20 hover:shadow-card focus-visible:ring-2 focus-visible:ring-ring/60 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-10 lg:p-8"
    >
      <div className="flex flex-col items-start">
        <FeatureMark slug={control.slug} size="lg" />

        <h2 className="mt-5 text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.6rem]">
          {title}
        </h2>

        <p className="mt-3 text-[14px] leading-relaxed text-pretty text-ink/60">
          {control.outcome}
        </p>

        {control.benefits ? (
          <ul className="mt-5 space-y-2.5">
            {control.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-px grid size-[17px] shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/[0.06]"
                >
                  <Check className="size-2.5 text-brand" strokeWidth={3} />
                </span>
                <span className="text-[13px] leading-relaxed text-ink/75">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Directly under the list, not pinned to the foot of the column. The
            demonstration beside it is taller, and pushing this down to meet it
            would open a hand's width of nothing under the last benefit for the
            sake of aligning with a frame edge nobody is reading across to. */}
        <FeatureLink className="mt-6" />
      </div>

      <FlagshipVisual slug={control.slug} />
    </Link>
  );
}
