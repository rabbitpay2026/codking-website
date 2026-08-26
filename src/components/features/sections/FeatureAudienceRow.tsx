import { SectionShell } from "@/components/sections/SectionShell";
import { cn } from "@/lib/utils";

import type { AudienceSegment } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The row's width at `lg`, keyed by how many segments there are.
 *
 * Written out rather than interpolated, because a class name assembled at
 * runtime is a class name the compiler never sees and therefore never emits.
 * Anything outside this range falls back to four across and wraps, which is
 * ragged rather than broken.
 */
const columnsClass: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

interface FeatureAudienceRowProps {
  readonly title: string;
  /** One line under the heading. Optional — several pages need none. */
  readonly description?: string;
  readonly segments: readonly AudienceSegment[];
  readonly iconFor: Record<string, LucideIcon>;
  readonly fallbackIcon: LucideIcon;
}

/**
 * Who this is for.
 *
 * Four blocks, on the page's own surface rather than in a bordered panel each.
 * The band used to be a row of pills at ten-and-a-half point, which made the
 * one section on the page that answers "is this for a store like mine" the
 * hardest thing on it to read — a question that important cannot be set at
 * caption size.
 *
 * So the pills are gone and what is left is the content: a mark, the category,
 * and the line that makes it concrete. They are separated by a hairline rather
 * than boxed, which keeps the row light without making each entry a rectangle
 * — this page already has enough of those, and a category is not an object the
 * way a capability is.
 *
 * A segment may carry no note at all and that is on purpose: some categories
 * are already concrete, and inventing a parenthetical for them would be
 * padding the row to look symmetrical.
 */
export function FeatureAudienceRow({
  title,
  description,
  segments,
  iconFor,
  fallbackIcon,
}: FeatureAudienceRowProps) {
  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.875rem]">
          {title}
        </h2>

        {description ? (
          <p className="mt-4 text-[15px] leading-relaxed text-pretty text-ink/55">
            {description}
          </p>
        ) : null}
      </div>

      {/*
        The rule sits to the left of every block but the first, and only at the
        width where the blocks are actually side by side. Stacked, they are
        separated by space instead — a vertical rule running down a stacked
        column would be pointing across a gap that is not there.
      */}
      <ul
        className={cn(
          "mt-9 grid gap-y-7 sm:grid-cols-2 sm:gap-x-8",
          columnsClass[segments.length] ?? "lg:grid-cols-4",
        )}
      >
        {segments.map((segment, index) => {
          const Icon = iconFor[segment.id] ?? fallbackIcon;

          return (
            <li
              key={segment.id}
              className={cn(
                index % 2 === 1 && "sm:border-l sm:border-ink/[0.07] sm:pl-8",
                "lg:border-l lg:border-ink/[0.07] lg:pl-8",
                index === 0 && "lg:border-l-0 lg:pl-0",
              )}
            >
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-xl border border-border bg-sky-50 text-ink/45"
              >
                <Icon className="size-[18px]" strokeWidth={1.7} />
              </span>

              <h3 className="mt-4 text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                {segment.title}
              </h3>

              {segment.note ? (
                <p className="mt-2 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                  {segment.note}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
