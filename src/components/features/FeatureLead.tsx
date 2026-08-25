import { Check } from "lucide-react";
import Link from "next/link";

import { FeatureLink } from "@/components/features/FeatureLink";
import { FeatureMark } from "@/components/features/FeatureMark";
import { routeFor } from "@/constants/routes";

import type { FeatureIndexItem } from "@/types";

/**
 * The control that opens the page.
 *
 * The same card as every other tier, given the page's first position and the
 * room to say more: a larger mark, a larger headline, and the record's full
 * benefit list rather than the three a `highlight` card shows.
 *
 * It used to carry a live demonstration of the control beside the copy. That
 * was removed at the reviewer's instruction — the Features index is cards
 * only, and a preview here promised a shape the rest of the page does not
 * have. The demonstration still runs, on the control's own page, which is
 * where a merchant who wants it has already decided to go.
 *
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
      className="group block rounded-[1.25rem] border border-border bg-card p-6 transition-[box-shadow,border-color] duration-300 ease-emphasized outline-none hover:border-ink/20 hover:shadow-card focus-visible:ring-2 focus-visible:ring-ring/60 lg:p-8"
    >
      <div className="flex flex-col items-start">
        <FeatureMark slug={control.slug} size="lg" />

        <h2 className="mt-5 max-w-2xl text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.6rem]">
          {title}
        </h2>

        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-pretty text-ink/60">
          {control.outcome}
        </p>

        {/*
            Two columns from `sm` up. With the demonstration gone this card has
            the page's full measure, and four short benefits stacked down the
            left of it leaves the right half empty — which reads as a missing
            element rather than as a card. Paired, they fill the width and the
            block stays half as tall.
        */}
        {control.benefits ? (
          <ul className="mt-5 grid w-full gap-x-8 gap-y-2.5 sm:grid-cols-2">
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

        <FeatureLink className="mt-6" />
      </div>
    </Link>
  );
}
