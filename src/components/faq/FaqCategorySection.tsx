import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PlusMinus } from "@/components/ui/plus-minus";

import type { NavItem, ResolvedFaqPageCategory } from "@/types";

interface FaqCategorySectionProps {
  readonly category: ResolvedFaqPageCategory;
}

/**
 * One topic on the FAQ page: a heading, a line, and its questions (§3).
 *
 * Built on the native `<details>` / `<summary>` disclosure rather than on the
 * Radix accordion the rest of the site uses, and that is a correctness decision
 * rather than a stylistic one. Radix renders a closed panel's children as
 * nothing — `children: isOpen && children` in the collapsible primitive — so
 * this page was serving forty-two questions and zero answers in its HTML, with
 * every answer reachable only after JavaScript ran and only for the one item
 * the reader had opened. On a page whose entire purpose is the answers, that is
 * the wrong trade: `<details>` keeps both halves in the document in every
 * state, opens with no JavaScript at all, and costs this page its last client
 * component. `forceMount` is not an alternative — it makes Radix render the
 * panel *open*, not present-but-hidden.
 *
 * Nothing about the drawing changes. Same card, same border, same padding, same
 * type, same plus-that-unfolds-into-a-minus, same brand edge when open — the
 * indicator reads the native `[open]` state through `group-open` instead of
 * Radix's `data-state`, and is the same component the homepage renders.
 *
 * No `aria-expanded` and no `aria-controls`. A `<summary>` is a disclosure
 * button by definition and browsers expose its expanded state from the parent's
 * `[open]`; adding the attributes by hand would be duplicating semantics the
 * element already has, and keeping them in step is then a thing that can go
 * wrong. Enter and Space toggle it natively, and the summary is in the tab
 * order without being given a `tabindex`.
 *
 * `name` makes each category an exclusive group, which is the behaviour the
 * Radix `type="single"` accordion had: opening a question closes the one open
 * beside it. Per category rather than per page, so opening a payments question
 * cannot silently collapse a getting-started answer two screens above. A
 * browser that does not support the attribute ignores it and simply allows more
 * than one open at a time, which is a degradation nobody notices.
 *
 * Nothing starts open. Forty answers expanded is a page nobody can scan, and
 * choosing one to open by default would be choosing it for every reader.
 *
 * `tabIndex={-1}` on the section is for the contents rail, which moves focus
 * here after scrolling so a keyboard user who picked a topic is reading it
 * rather than still tabbing through the list they picked it from. The scroll
 * margin is a breath on top of the header rather than the header again — `html`
 * already carries `scroll-padding-top`, and reserving it twice parks a heading
 * a hundred pixels down the viewport.
 */
export function FaqCategorySection({ category }: FaqCategorySectionProps) {
  return (
    <section
      id={category.id}
      tabIndex={-1}
      aria-labelledby={`${category.id}-heading`}
      className="scroll-mt-8 focus:outline-none"
    >
      <h2
        id={`${category.id}-heading`}
        className="text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.5rem]"
      >
        {category.title}
      </h2>

      <p className="mt-2 text-[14px] leading-relaxed text-pretty text-ink/55">
        {category.description}
      </p>

      <div className="mt-5 space-y-2.5">
        {category.items.map(({ faq, links }) => (
          <details
            key={faq.id}
            name={`faq-${category.id}`}
            data-slot="faq-disclosure"
            /*
              `not-open:hover:` rather than a bare `hover:`, and it is not a
              refinement — it is the difference between this card and the Radix
              one it replaces. Tailwind emits `hover:` *after* `open:`, so a
              plain hover would repaint an open card's brand edge back to grey
              the moment the pointer crossed it; Radix's `data-[state=open]`
              sorts after `hover:` and so never had to say this. Scoped to the
              closed state, the warm-on-hover belongs to a card you might open
              and the brand edge stays on the one you did.
            */
            className="group faq-disclosure rounded-xl border border-border bg-card px-4 transition-colors duration-200 open:border-brand/35 not-open:hover:border-ink/15 sm:px-5"
          >
            {/*
              `list-none` and the WebKit marker rule remove the default triangle
              — `display: flex` already does it in Chromium, but Safari draws
              its own pseudo-element and needs telling. The same pair the
              contents rail's disclosure uses.
            */}
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded-md py-3.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 [&::-webkit-details-marker]:hidden">
              {/* `min-w-0` is what keeps a long question wrapping inside the
                  row instead of pushing the indicator off a 320px screen. */}
              <h3 className="min-w-0 text-[14.5px] leading-snug font-medium text-ink sm:text-[15px]">
                {faq.question}
              </h3>

              <PlusMinus />
            </summary>

            <div className="pb-4">
              <p className="max-w-[68ch] text-[14px] leading-[1.75] text-pretty text-ink/65">
                {faq.answer}
              </p>

              {links.length > 0 ? <FaqAnswerLinks links={links} /> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/**
 * Where an answer sends the reader next.
 *
 * Beside the answer rather than woven into it, and that is a structural choice
 * rather than a stylistic one: the FAQPage schema states the answer text
 * verbatim, so anything rendered *inside* the answer would either have to
 * appear in the markup as well or make the two disagree. As a row underneath,
 * the answer a reader sees and the answer a crawler reads are the same string.
 *
 * Only where a page genuinely continues the answer. Most questions carry none.
 */
function FaqAnswerLinks({ links }: { readonly links: readonly NavItem[] }) {
  return (
    <ul className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group/link inline-flex items-center gap-1.5 rounded-sm py-1 text-[13px] font-semibold text-brand transition-colors duration-200 ease-[var(--ease-emphasized)] hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
          >
            {link.label}
            <ArrowRight
              aria-hidden
              className="size-3.5 shrink-0 transition-transform duration-200 ease-[var(--ease-emphasized)] group-hover/link:translate-x-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
