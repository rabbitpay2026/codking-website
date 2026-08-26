import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { ReactNode } from "react";

interface SectionHeadingProps extends WithClassName {
  /** Short label above the title, e.g. "The COD loss". */
  readonly eyebrow?: ReactNode;
  /**
   * How the eyebrow is drawn.
   *
   * `rule` is the homepage's original treatment — spaced capitals between two
   * hairlines — and reads as the top line of the heading beneath it. `pill`
   * sets the same words inside a bordered chip, which reads as a label on the
   * whole section rather than as part of its title. A section that is a *board*
   * rather than an argument wants the second: there is no sentence under the
   * heading for a ruled eyebrow to introduce.
   */
  readonly eyebrowAs?: "rule" | "pill";
  /**
   * `ReactNode` rather than `string`, so a section can colour part of its own
   * heading without owning the type scale. Everything about how a heading is
   * set — size, tracking, balance, the space above and below it — stays this
   * component's decision; the only thing a caller gains is which words inside
   * it carry an accent.
   */
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: "left" | "center";
  /**
   * Heading level. Sections on a page that already has an `<h1>` use `h2`;
   * the level is decoupled from the styling so the document outline stays
   * correct without dictating how large the text looks.
   */
  readonly as?: "h2" | "h3";
}

/**
 * The heading block every homepage section opens with.
 *
 * One component rather than a repeated three-element pattern, so the eyebrow
 * size, the heading scale, the measure of the description and the space
 * between them are decided once and stay identical down the page. Consistent
 * openings are most of what makes a long marketing page read as one document
 * rather than a stack of unrelated blocks.
 */
export function SectionHeading({
  eyebrow,
  eyebrowAs = "rule",
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const pill = eyebrowAs === "pill";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "inline-flex items-center font-semibold text-brand",
            centered && "justify-center",
            pill
              ? /* `self-center` so the chip is only as wide as its words:
                   without it a centred flex column stretches the paragraph to
                   the full measure and the border draws a bar across the page. */
                [
                  "gap-1.5 rounded-full border border-brand/20 bg-brand/[0.06] px-3.5 py-1.5",
                  "text-[12px] tracking-[0.02em]",
                  centered ? "self-center" : "self-start",
                ]
              : "gap-2 text-xs tracking-[0.14em] uppercase",
          )}
        >
          {pill ? null : <span aria-hidden className="h-px w-6 bg-brand/40" />}
          {eyebrow}
          {!pill && centered ? (
            <span aria-hidden className="h-px w-6 bg-brand/40" />
          ) : null}
        </p>
      ) : null}

      <Heading className="mt-5 text-[2rem] leading-[1.06] font-semibold tracking-[-0.025em] text-balance sm:text-[2.5rem] lg:text-[3rem]">
        {title}
      </Heading>

      {description ? (
        <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
