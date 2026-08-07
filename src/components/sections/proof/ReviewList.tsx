import { Stars } from "@/components/sections/proof/Stars";
import { StoreMonogram } from "@/components/sections/proof/StoreMonogram";
import { BlurFade } from "@/components/ui/blur-fade";

import type { ReviewSnippet } from "@/types";

interface ReviewListProps {
  readonly snippets: readonly ReviewSnippet[];
}

/**
 * The App Store review rows, as the blueprint stacks them.
 *
 * Three boxed rows of two lines each: who and how many stars on the first,
 * one sentence on the second. That is the whole design, and the compression is
 * the argument — this column is counted rather than read, and a paragraph in
 * each row would turn a wall of agreement back into three things to get
 * through.
 *
 * A server component. The entrance is the `reveal` utility — a CSS
 * scroll-driven animation with nothing behind it, which cannot leave a row
 * invisible if a script fails — and the lift is a CSS transition. Neither
 * needs a runtime, so this section ships one client component, not two.
 *
 * An empty feed renders nothing rather than an empty frame; the repository is
 * explicit that no reviews is a valid state (§11).
 */
export function ReviewList({ snippets }: ReviewListProps) {
  if (snippets.length === 0) return null;

  return (
    <ul className="flex min-w-0 flex-1 flex-col gap-2">
      {snippets.map((snippet, index) => (
        <li key={snippet.id} className="flex-1">
          {/*
            Staggered by index. `BlurFade` expresses the stagger as a slightly
            later entry range rather than a timer, so rows arrive in order as
            the column scrolls in without any of them waiting on a clock.
          */}
          <BlurFade delay={index * 0.1} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-lg border border-border px-2.5 py-2 transition-[transform,box-shadow] duration-300 ease-[var(--ease-emphasized)] hover:-translate-y-px hover:shadow-[0_1px_2px_rgba(11,27,54,0.06)]">
              <div className="flex items-center gap-1.5">
                <StoreMonogram store={snippet.store} size={20} />
                <p className="min-w-0 flex-1 truncate text-[11.5px] leading-tight font-semibold text-foreground">
                  {snippet.store}
                </p>
                {/* Small enough that the store name beside it is not the thing
                    that gets truncated — the name is what identifies the
                    review, and five stars are legible at ten pixels. */}
                <Stars
                  rating={snippet.rating}
                  className="size-[10px] shrink-0"
                />
              </div>

              <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">
                {snippet.preview}
              </p>
            </div>
          </BlurFade>
        </li>
      ))}
    </ul>
  );
}
