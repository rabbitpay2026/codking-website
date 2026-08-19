import { cn } from "@/lib/utils";

import type { ResolvedFaqPageCategory, WithClassName } from "@/types";

interface FaqTopicLinksProps extends WithClassName {
  readonly categories: readonly ResolvedFaqPageCategory[];
}

/**
 * The topics, as a row of anchors under the headline.
 *
 * The hero of a page whose whole body is a list needs to show what that list
 * covers — a headline and one sentence over four hundred pixels of nothing is
 * the composition a reader reads as "unfinished". These are that, and they are
 * also the only navigation this page has below `lg`, where the contents rail is
 * hidden: a merchant on a phone can see the seven topics and jump to theirs
 * without scrolling past six of them first.
 *
 * Plain `<a href="#id">` rather than the rail's intercepted links, so they work
 * with no JavaScript at all. The landing position is not computed here — each
 * category carries its own `scroll-margin-top` and the document sets
 * `scroll-padding-top`, so the header offset lives in one place.
 *
 * Each chip carries its question count. It is a fact the page already has, and
 * it is what turns a row of labels into a row of decisions.
 */
export function FaqTopicLinks({ categories, className }: FaqTopicLinksProps) {
  return (
    <nav aria-label="FAQ topics" className={cn("min-w-0", className)}>
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`#${category.id}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-ink/[0.09] bg-white/70 px-3.5 py-1.5",
                "text-[13px] font-medium text-ink/70 backdrop-blur-sm",
                "transition-[color,border-color,background-color] duration-200 ease-[var(--ease-emphasized)]",
                "hover:border-brand/30 hover:bg-white hover:text-ink",
                "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
              )}
            >
              {category.title}
              <span
                aria-hidden
                className="text-[11.5px] font-semibold text-ink/35 tabular-nums"
              >
                {category.items.length}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
