import {
  companyIcons,
  fallbackCompanyIcon,
} from "@/components/company/companyIcons";
import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { CompanySection } from "@/types";

interface CompanyPointGridProps extends CompanySection {
  /**
   * Three across or two. Six short blocks read as a set at three; four longer
   * ones read as pairs at two, and forcing them to three leaves a hole in the
   * second row.
   */
  readonly columns?: 2 | 3;
  /** `muted` for the section that has to sit apart from its neighbours. */
  readonly tone?: "default" | "muted";
}

/**
 * A titled section of cards, used three times on the About page.
 *
 * One component rather than three near-identical blocks, for the reason the
 * feature pages give for `FeatureOutcomeGrid`: two sections on one page arguing
 * in two different card shapes read as two pages. The heading treatment, the
 * card, the mark tile and the hover response are decided once here, and a
 * section brings only its words.
 *
 * The heading is left-aligned rather than centred. These sections are read in
 * sequence down a page that opened left-aligned, and a centred heading in the
 * middle of that reads as a different document — the homepage centres its
 * headings because its sections are set pieces, which these are not.
 *
 * `cardHoverClass` rather than `surface-card`: the cards set their own radius,
 * border weight and fill, and `surface-card` would silently override all three.
 */
export function CompanyPointGrid({
  copy,
  points,
  columns = 3,
  tone = "default",
}: CompanyPointGridProps) {
  return (
    <SectionShell
      tone={tone}
      size="compact"
      className="border-t border-ink/[0.07]"
      containerClassName="py-9 md:py-11"
    >
      <BlurFade>
        <div className="max-w-2xl">
          <FeatureEyebrow>{copy.eyebrow}</FeatureEyebrow>

          <h2 className="mt-3.5 text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.03em] text-pretty text-ink sm:text-[1.9rem]">
            {copy.title}
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-ink/55">
            {copy.description}
          </p>
        </div>
      </BlurFade>

      <ul
        className={cn(
          "mt-7 grid gap-3 sm:grid-cols-2",
          columns === 3 && "lg:grid-cols-3",
        )}
      >
        {points.map((point, index) => {
          const Icon = companyIcons[point.id] ?? fallbackCompanyIcon;

          return (
            <li key={point.id}>
              <BlurFade delay={index * 0.05} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col rounded-xl border border-ink/[0.08] bg-card p-5",
                    cardHoverClass,
                  )}
                >
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-sky-50 text-ink/45"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.7} />
                  </span>

                  <h3 className="mt-4 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                    {point.title}
                  </h3>

                  <p className="mt-2 text-[13.5px] leading-relaxed text-pretty text-ink/55">
                    {point.body}
                  </p>
                </div>
              </BlurFade>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
