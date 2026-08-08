import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The small pill a feature section opens with.
 *
 * `SectionHeading` already carries an eyebrow, but it draws it as a line of
 * spaced capitals between two rules — the treatment the homepage uses. The
 * feature blueprints set theirs as a pill instead, and the difference matters
 * more than it looks: a ruled eyebrow reads as part of the heading beneath it,
 * a pill reads as a label on the section as a whole. Sections that lead with a
 * question ("Why use partial payments?") want the second.
 *
 * A separate component rather than a variant on `SectionHeading`, because that
 * component belongs to the homepage as much as to these pages and this is not
 * a change the homepage asked for.
 */
export function FeatureEyebrow({
  children,
  className,
}: WithClassName & { readonly children: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1",
        "text-[11px] leading-none font-semibold tracking-[0.1em] text-brand uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
