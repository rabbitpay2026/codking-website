import { Check } from "lucide-react";

import { Stars } from "@/components/sections/proof/Stars";
import { getContactAssurances, getProofMetrics } from "@/lib/content";
import { formatRating } from "@/utils/format";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The support panel under the channel cards.
 *
 * Every line in it is already stated elsewhere on the site — the hours and the
 * response time in the FAQ, the rating in the proof repository — so this
 * restates nothing new and invents no service level. It exists because a
 * contact page's unspoken question is "will anyone actually answer", and three
 * short lines answer it better than a paragraph would.
 *
 * Laid out as a band rather than a column: it runs the full width of the left
 * side under two cards that are already stacked in a grid, and a fourth tall
 * box there would leave the column ending in a step. The rating separates from
 * the claims with a rule at narrow widths and a hairline divider once they sit
 * on one line.
 *
 * The rating is read rather than typed, per §11.1, so it is the same figure the
 * header badge and every feature hero render.
 */
export async function ContactAssurances() {
  const proof = await getProofMetrics();
  const assurances = getContactAssurances();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink/[0.08] bg-cloud px-5 py-4 sm:flex-row sm:items-center sm:gap-5">
      <div
        className="flex shrink-0 items-center gap-2"
        aria-label={`Rated ${formatRating(proof.rating)} out of 5 from ${numberFormat.format(proof.reviewCount)} reviews`}
      >
        <Stars rating={proof.rating} className="size-[15px]" />
        <span aria-hidden className="text-[13px] font-semibold text-ink">
          {formatRating(proof.rating)}
        </span>
        <span aria-hidden className="text-[13px] text-ink/45">
          ({numberFormat.format(proof.reviewCount)}+)
        </span>
      </div>

      <span aria-hidden className="hidden h-8 w-px bg-ink/[0.09] sm:block" />

      <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/[0.07] pt-4 sm:border-0 sm:pt-0">
        {assurances.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span
              aria-hidden
              className="grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-check/14 ring-1 ring-brand-check/25 ring-inset"
            >
              <Check className="size-2.5 text-ink/60" strokeWidth={3} />
            </span>
            <span className="text-[12.5px] leading-snug text-ink/60">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
