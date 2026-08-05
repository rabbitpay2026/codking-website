import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

interface SectionHeadingProps extends WithClassName {
  /** Short label above the title, e.g. "The COD loss". */
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
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
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
          {eyebrow}
        </p>
      ) : null}

      <Heading className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Heading>

      {description ? (
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
