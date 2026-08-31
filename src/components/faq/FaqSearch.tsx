"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useSyncExternalStore } from "react";

interface FaqSearchProps {
  /** The id of the element holding the rendered categories. */
  readonly targetId: string;
  /** How many questions the page renders, for the status line. */
  readonly total: number;
}

/** Every question card the page rendered, and the group it belongs to. */
const ITEM = "[data-faq-text]";
const CATEGORY = "[data-faq-category]";

/** No subscription: whether React has hydrated never changes after it has. */
const subscribe = () => () => {};

/**
 * Whether this is running in a browser that got as far as hydrating.
 *
 * `useSyncExternalStore` rather than the `useState` + `useEffect` pair that
 * usually stands in for this. The pair sets state during an effect purely to
 * force a second render, which is the thing the React lint rules exist to stop
 * — this asks the question directly instead, and the server snapshot is the
 * answer the server should give.
 */
const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

/**
 * Search across the questions this page already rendered.
 *
 * The filtering works on the DOM rather than on the data, and that is the whole
 * design of this component. The page is a server component whose entire point
 * is that all forty-odd answers are in the initial HTML — it was moved off the
 * Radix accordion onto native `<details>` precisely so that a closed answer is
 * still a rendered answer, crawlable and findable with the browser's own
 * find-in-page. Handing the categories to a client component to filter would
 * undo both halves of that: every question and answer would be serialised into
 * the RSC payload a second time, and the page's one server-only surface would
 * become a client tree.
 *
 * So the markup is untouched and this island only hides things. Each card was
 * rendered with its question and answer pre-lowercased into `data-faq-text`,
 * which means matching is a substring test against a string the server already
 * built — no `textContent` reads, no case folding per keystroke, and the link
 * row under an answer cannot accidentally become searchable text.
 *
 * The filtering runs in the change handler rather than in an effect, which is
 * where it belongs: hiding a card is this component telling an external system
 * about something the reader just did, not React synchronising itself with a
 * value that changed elsewhere. The only effect here restores the page on the
 * way out.
 *
 * It degrades honestly. With JavaScript off, every question is on the page and
 * this input never appears, because a search box that silently does nothing is
 * worse than no search box.
 *
 * The accordion is not touched. Hiding a card does not close it and clearing
 * the query does not open anything — a reader who opened a question, searched,
 * and cleared finds it exactly as they left it.
 */
export function FaqSearch({ targetId, total }: FaqSearchProps) {
  const [query, setQuery] = useState("");
  /** `null` while idle; a count once the reader has typed something. */
  const [matches, setMatches] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hydrated = useHydrated();
  const statusId = useId();

  const apply = useCallback(
    (next: string) => {
      setQuery(next);

      const root = document.getElementById(targetId);
      if (!root) return;

      const needle = next.trim().toLowerCase();
      let found = 0;
      let first: HTMLElement | null = null;

      for (const category of root.querySelectorAll<HTMLElement>(CATEGORY)) {
        let shown = 0;

        for (const item of category.querySelectorAll<HTMLElement>(ITEM)) {
          const hit = !needle || (item.dataset.faqText ?? "").includes(needle);
          item.hidden = !hit;
          if (hit) shown += 1;
        }

        category.hidden = shown === 0;
        found += shown;

        /*
          The rule between groups is drawn by `divide-y` on the container,
          which is a sibling selector and so cannot know that the groups above
          this one are hidden — without this the first surviving group would
          open on a stray hairline, with the padding of a group that has
          something above it. This attribute is what the container's own rule
          keys off.
        */
        if (!category.hidden && !first) {
          first = category;
          category.setAttribute("data-faq-first", "");
        } else {
          category.removeAttribute("data-faq-first");
        }
      }

      setMatches(needle ? found : null);
    },
    [targetId],
  );

  useEffect(() => {
    const root = document.getElementById(targetId);

    return () => {
      /*
        Anything this component hid, it un-hides — so unmounting can never
        leave a reader on a page with questions missing from it.
      */
      if (!root) return;
      for (const item of root.querySelectorAll<HTMLElement>(ITEM)) {
        item.hidden = false;
      }
      for (const category of root.querySelectorAll<HTMLElement>(CATEGORY)) {
        category.hidden = false;
        category.removeAttribute("data-faq-first");
      }
    };
  }, [targetId]);

  if (!hydrated) return null;

  return (
    <div className="mb-8">
      {/*
        The field.

        Built from the page's own furniture rather than a new set: the radius
        the question cards use, the same `border-border` hairline, the same
        `shadow-card` lift, and the brand ring every other focusable thing on
        the site takes. The only thing here the page did not already have is
        the magnifier.
      */}
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-ink/35"
          strokeWidth={2}
        />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => apply(event.target.value)}
          aria-label="Search frequently asked questions"
          aria-describedby={statusId}
          placeholder="Search frequently asked questions…"
          enterKeyHint="search"
          className={[
            "h-12 w-full rounded-xl border border-border bg-card pr-11 pl-11 sm:h-[3.25rem]",
            "text-[14.5px] text-ink placeholder:text-ink/40 sm:text-[15px]",
            "shadow-card transition-[border-color,box-shadow] duration-200 ease-[var(--ease-emphasized)]",
            "hover:border-ink/15",
            "focus:border-brand/35 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
            /* WebKit draws its own clear affordance on `type="search"`, and
               this component draws a better one that is in the tab order. */
            "[&::-webkit-search-cancel-button]:hidden",
          ].join(" ")}
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              apply("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink/45 transition-colors duration-200 hover:bg-ink/[0.05] hover:text-ink focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        ) : null}
      </div>

      {/*
        Said out loud for a screen reader, and drawn for everyone else only
        when there is nothing left to read. A running count under the field on
        every keystroke is noise; "none of the forty" is the one result a
        reader has to be told, because otherwise the page just looks broken.
      */}
      <p id={statusId} aria-live="polite" className="sr-only">
        {matches === null
          ? `${total} questions`
          : `${matches} of ${total} questions match your search.`}
      </p>

      {matches === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-card px-5 py-6 text-center">
          <p className="text-[14.5px] font-semibold text-ink">
            No matching questions found.
          </p>
          <p className="mt-1.5 text-[13.5px] text-ink/55">
            Try searching with a different keyword.
          </p>
        </div>
      ) : null}
    </div>
  );
}
