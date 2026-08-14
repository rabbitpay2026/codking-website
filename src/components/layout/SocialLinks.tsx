import { socialMarks } from "@/components/layout/socialMarks";
import { getSocialLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The row of social profiles, used by the footer and the contact page.
 *
 * Icon buttons rather than a list of platform names. A text link labelled
 * "Instagram" is one more row in a footer already carrying twenty; a 40px
 * tile is recognised without being read, and four of them occupy less vertical
 * space than one link column.
 *
 * Forty pixels is also the point of the tile. The glyph is 18px, which is the
 * right optical size beside `text-sm` copy and far below the 44px a thumb
 * needs — so the tile, not the glyph, is the target, and it stays comfortable
 * on a phone without the mark shouting on a desktop.
 *
 * The hover response is the footer's, not a new one: the border warms, the
 * surface lifts to white, and the mark takes brand. Nothing scales and nothing
 * moves, because a row of four icons that all jump is the kind of motion that
 * makes a footer feel cheap.
 *
 * Every one of them opens off-site, and says so to assistive technology rather
 * than silently replacing the page.
 */
export function SocialLinks({ className }: WithClassName) {
  const links = getSocialLinks();

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((link) => {
        const Mark = socialMarks[link.id];

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group grid size-10 place-items-center rounded-xl border border-ink/[0.08] bg-background text-ink/45",
                "transition-[color,border-color,background-color,box-shadow] duration-300 ease-emphasized",
                "hover:border-brand/25 hover:bg-white hover:text-brand hover:shadow-[0_1px_2px_rgba(11,27,54,0.05),0_8px_20px_-12px_rgba(11,27,54,0.35)]",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              )}
            >
              <Mark className="size-[18px]" />
              <span className="sr-only">
                {link.label}
                {link.detail ? ` — ${link.detail}` : ""} (opens in a new tab)
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
