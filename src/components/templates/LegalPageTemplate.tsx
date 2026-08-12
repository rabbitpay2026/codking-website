import { CircleAlert, FileText, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { LegalContents } from "@/components/legal/LegalContents";
import { LegalText } from "@/components/legal/LegalText";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routeFor, routes } from "@/constants/routes";
import { panelHoverClass } from "@/constants/theme";
import { getLegalDocument, getLegalDocuments } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import type { LegalDocument, LegalSection, LegalSlug, NavItem } from "@/types";

import type { Metadata } from "next";

const LEGAL_TRAIL: readonly NavItem[] = [{ label: "Home", href: routes.home }];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * A legal page's metadata, built from the same record the page renders.
 *
 * `noIndex` while the documents are in review. A draft policy that ranks is a
 * draft policy someone quotes; it comes off the moment `status` does.
 */
export function legalPageMetadata(slug: LegalSlug): Metadata {
  const document = getLegalDocument(slug);

  if (!document) return createMetadata({ noIndex: true });

  return createMetadata({
    title: document.title,
    description: document.summary,
    path: routeFor.legal(slug),
    noIndex: document.status === "draft",
  });
}

interface LegalPageTemplateProps {
  readonly slug: LegalSlug;
}

/**
 * The shared layout for Privacy, Terms, Refund and Cookies (§3).
 *
 * All four are long-form documents with the same needs, so they share one
 * template. It is built as a reading surface rather than as a marketing page:
 * one measure, one type scale, hairline rules between sections, and a contents
 * rail on the left at desktop that tracks where you are without moving.
 *
 * The measure is fixed in `ch` rather than in the page grid. A legal document
 * set to the full 72rem container is a document nobody finishes; around 70
 * characters is the line length long prose is actually read at, and it is the
 * one place on this site where the container is deliberately not the authority.
 *
 * Body copy is set at 16px on a 1.8 leading in near-solid ink, and that is a
 * correction rather than a preference. The document was previously drawn at
 * 14.5px in `text-ink/60` — a marketing caption's treatment applied to text a
 * merchant is agreeing to be bound by. Emphasis is carried by `<strong>` inside
 * the source strings, so the phrase that actually binds someone is the phrase
 * that stands out, and it survives being printed or read aloud.
 *
 * Two things are structural rather than cosmetic. The revision date is omitted
 * when unknown, because a legal page showing an invented date is worse than one
 * showing none. And a document still in review says so at the top, in a banner
 * that cannot be mistaken for body copy — a page that reads as final while its
 * jurisdiction is still unset is the failure mode worth designing against.
 */
export function LegalPageTemplate({ slug }: LegalPageTemplateProps) {
  const document = getLegalDocument(slug);

  if (!document) notFound();

  const revised = document.lastUpdated
    ? dateFormat.format(new Date(document.lastUpdated))
    : null;

  /*
    The contents list is derived here rather than in the rail, so the only thing
    crossing to the client is an id and a label per section — not the document.
  */
  const contents = document.sections.map((section) => ({
    id: section.id,
    label: section.heading,
  }));

  return (
    <>
      <SectionShell
        size="compact"
        containerClassName="pt-5 pb-8 md:pt-6 md:pb-10"
        backdrop={<HeroEnvironment />}
      >
        <Breadcrumb trail={LEGAL_TRAIL} current={document.title} />

        {/*
          Words on the left, the document's own particulars on the right — the
          feature pages' split, at the one ratio a legal page can use it at.
          Before this the title block was capped at 46rem inside a 72rem
          container and the right third of the opening screen was empty page,
          which is the composition a reader reads as "unfinished", not as
          "restrained". The panel is not decoration: who the agreement is with
          and where to ask about it are the two questions a merchant opens a
          legal page holding, and they were previously answered in section 12.
        */}
        <div className="mt-7 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] md:items-start md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
          <div className="max-w-[42rem]">
            <FeatureEyebrow>Legal</FeatureEyebrow>

            <h1 className="mt-5 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.45rem]">
              {document.title}
            </h1>

            <p className="mt-5 text-[1.0625rem] leading-[1.65] text-pretty text-ink/70">
              {document.summary}
            </p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white/70 px-3 py-1.5 text-[12.5px] text-ink/55 backdrop-blur-sm">
              <Info aria-hidden className="size-3.5 shrink-0 text-ink/35" />
              {revised ? (
                <span>
                  Last updated{" "}
                  <time
                    dateTime={document.lastUpdated ?? undefined}
                    className="font-medium text-ink/75"
                  >
                    {revised}
                  </time>
                </span>
              ) : (
                <span>Revision date published when this document is final</span>
              )}
            </p>
          </div>

          <DocumentFacts document={document} />
        </div>
      </SectionShell>

      {/*
        `allowOverflow`, and it is the whole reason the rail used to scroll away
        with the page. `SectionShell` clips its surface by default so a backdrop
        cannot paint over its neighbours — but an ancestor with `overflow:
        hidden` becomes the scrolling ancestor of anything `position: sticky`
        inside it, and a sticky element inside a box that does not itself scroll
        simply never sticks. This section draws no backdrop, so it has nothing
        to clip and nothing to lose by letting the rail see the viewport.
      */}
      <SectionShell
        size="compact"
        allowOverflow
        className="border-t border-ink/[0.07]"
      >
        {/*
          The rail is a sibling of the article rather than a floated aside, so
          the article keeps its own measure and the rail cannot narrow it. Below
          `lg` it is replaced by a collapsed disclosure above the first section
          rather than dropped: a phone reader still needs to jump to the refund
          clause, but an expanded list of sixteen links there is a screen of
          navigation between them and the first sentence.
        */}
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          <aside className="hidden lg:block">
            <LegalContents variant="rail" items={contents} />
          </aside>

          <article className="max-w-[70ch] min-w-0">
            <LegalContents
              variant="compact"
              items={contents}
              className="mb-8 lg:hidden"
            />

            {document.status === "draft" ? (
              <ReviewNotice notice={document.notice} />
            ) : null}

            <div className="divide-y divide-ink/[0.07]">
              {document.sections.map((section) => (
                <LegalSectionBlock key={section.id} section={section} />
              ))}
            </div>

            <DocumentFooter slug={document.slug} />
          </article>
        </div>
      </SectionShell>
    </>
  );
}

/**
 * Says the document is not final, on the document itself.
 *
 * Deliberately styled as a notice and not as a card: it borrows the amber-free,
 * quiet treatment the rest of the site uses for information, because a loud
 * warning band on a legal page reads as an error state and sends a merchant
 * looking for what they did wrong.
 */
function ReviewNotice({ notice }: { readonly notice?: string }) {
  return (
    <div className="mb-9 flex gap-3 rounded-xl border border-ink/[0.09] bg-sky-50 px-4 py-4">
      <CircleAlert
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-ink/45"
        strokeWidth={1.8}
      />
      <p className="text-[13.5px] leading-[1.7] text-ink/70">
        <span className="font-semibold text-ink">In review.</span>{" "}
        {notice ??
          "The sections below describe how COD King operates today. Points still to be confirmed with the business are listed within the section they belong to, rather than left as gaps in the text."}
      </p>
    </div>
  );
}

/**
 * The document's particulars, beside its title.
 *
 * Three or four short rows — who the agreement is with, what it covers, where
 * to ask — in the site's own card, with the contents rail's label treatment on
 * each key so the panel reads as part of the same document rather than as a
 * widget dropped beside it.
 *
 * `panelHoverClass` rather than `cardHoverClass`: this sits at the top of the
 * page next to an `h1`, and a card that lifts three pixels there is the first
 * thing in the frame that moves.
 *
 * Nothing here is authored by the component. A document with no `facts` renders
 * nothing at all and the title block simply takes the measure back, which is
 * what keeps this from becoming a box that has to be filled.
 */
function DocumentFacts({ document }: { readonly document: LegalDocument }) {
  if (!document.facts?.length) return null;

  return (
    <BlurFade>
      <div
        className={cn(
          "rounded-2xl border border-ink/[0.08] bg-white/70 p-5 backdrop-blur-md",
          "shadow-[0_1px_2px_rgba(11,27,54,0.04),0_10px_28px_-20px_rgba(11,27,54,0.35)]",
          panelHoverClass,
        )}
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink/45 uppercase">
          <FileText
            aria-hidden
            className="size-3.5 shrink-0 text-ink/30"
            strokeWidth={1.8}
          />
          This document
        </p>

        <dl className="mt-4 divide-y divide-ink/[0.07]">
          {document.facts.map((fact) => (
            <div key={fact.id} className="py-2.5 first:pt-0 last:pb-0">
              <dt className="text-[11.5px] leading-snug text-ink/55">
                {fact.label}
              </dt>
              <dd className="mt-1 text-[13.5px] leading-snug font-medium break-words text-ink/90">
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="rounded-sm text-brand transition-colors duration-200 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </BlurFade>
  );
}

/**
 * The end of the document: a way to ask, and the other three.
 *
 * Every one of these documents says "through the contact page" somewhere in its
 * closing section, and until now that was a sentence rather than a link. The
 * sibling row exists for the same reason — a merchant reading the refund policy
 * before installing is usually about to read the terms, and making them go back
 * to the footer for it is the kind of small friction a legal page can afford
 * least.
 *
 * The list is every other legal document, read from the repository rather than
 * from the footer. The footer now carries only Privacy and Terms — the two a
 * merchant looks up before installing — so taking the row from there would have
 * left Refund and Cookies reachable from nowhere on the site.
 */
function DocumentFooter({ slug }: { readonly slug: LegalSlug }) {
  const siblings = getLegalDocuments()
    .filter((sibling) => sibling.slug !== slug)
    .map((sibling) => ({
      label: sibling.title,
      href: routeFor.legal(sibling.slug),
    }));

  return (
    <div className="mt-10 border-t border-ink/[0.07] pt-7">
      <p className="text-[14.5px] leading-[1.7] text-ink/75">
        Something here you need clarified before installing?{" "}
        <Link
          href={routes.contact}
          className="rounded-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          Contact us
        </Link>{" "}
        and we will answer it.
      </p>

      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {siblings.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-sm py-1 text-[13.5px] font-medium text-ink/60 transition-colors duration-200 hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LegalSectionBlock({ section }: { readonly section: LegalSection }) {
  return (
    /*
      The rhythm lives on the wrapper, not on the `<section>`. `first:`/`last:`
      resolve against siblings, and the section is an only child of its own
      reveal wrapper — put them there and every section is both first and last,
      which collapses the padding on all of them.
    */
    <BlurFade className="py-8 first:pt-0 last:pb-0 md:py-9">
      {/*
        `tabIndex={-1}` exists for the contents rail: it moves focus here after
        scrolling, so a keyboard user who picked a section is reading it rather
        than still tabbing through the list they picked it from.

        The scroll margin is a breath on top of the header, not the header
        again: `html` already carries `scroll-padding-top: header + 1rem`, and
        the two add up. Reserving the header twice parked every anchored heading
        176px down the viewport — a hundred pixels of empty page under a sticky
        bar, on the one page where a reader wants as much of the document on
        screen as they can get.

        The extra 16px is the reveal. `BlurFade` enters from `translateY(16px)`,
        so a section is still 16px low when the scroll target is computed and
        rises by exactly that much as it settles — the heading lands tighter
        under the header than anything here asked for. Paying it back in the
        scroll margin is the smallest fix; the alternative is measuring an
        animation from JavaScript.
      */}
      <section
        id={section.id}
        tabIndex={-1}
        className="scroll-mt-8 focus:outline-none"
      >
        <h2 className="text-[1.1875rem] leading-snug font-semibold tracking-[-0.015em] text-ink sm:text-[1.3125rem]">
          {section.heading}
        </h2>

        {section.body?.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 text-[15.5px] leading-[1.8] text-pretty text-ink/85 sm:text-base"
          >
            <LegalText>{paragraph}</LegalText>
          </p>
        ))}

        {/*
          Clauses before points, because a section that has both states the
          obligation first and qualifies it afterwards.

          A real `<ol>` with its own counter rather than numbers typed into the
          strings: the numbering is then a fact about position, so inserting a
          clause renumbers the ones after it, and a screen reader announces
          "item 3 of 7" instead of reading a digit that happens to open the
          sentence. The marker sits in its own fixed column so a clause running
          to three lines keeps a straight left edge under its first word.
        */}
        {section.clauses ? (
          <ol className="mt-5 space-y-4">
            {section.clauses.map((clause, index) => (
              <li key={clause} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="w-5 shrink-0 text-[15px] leading-[1.8] font-semibold text-brand tabular-nums"
                >
                  {index + 1}.
                </span>
                <span className="text-[15.5px] leading-[1.8] text-pretty text-ink/85 sm:text-base">
                  <LegalText>{clause}</LegalText>
                </span>
              </li>
            ))}
          </ol>
        ) : null}

        {section.points ? (
          <ul className="mt-5 space-y-3.5">
            {section.points.map((point) => (
              <li key={point} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-brand/45"
                />
                <span className="text-[15.5px] leading-[1.8] text-pretty text-ink/85 sm:text-base">
                  <LegalText>{point}</LegalText>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {/*
          The open items stay quieter than the document around them, and that is
          the one place on this page where lighter type is the right answer: this
          is a note about the text, not the text a merchant is bound by.
        */}
        {section.confirm ? (
          <div className="mt-6 rounded-xl border border-dashed border-ink/[0.16] bg-cloud px-4 py-3.5">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-ink/50 uppercase">
              To be confirmed
            </p>
            <ul className="mt-2.5 space-y-2">
              {section.confirm.map((item) => (
                <li
                  key={item}
                  className="text-[13.5px] leading-[1.65] text-ink/65"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </BlurFade>
  );
}
