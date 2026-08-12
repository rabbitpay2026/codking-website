import { CircleAlert, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routeFor, routes } from "@/constants/routes";
import { getFooterLegalLinks, getLegalDocument } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { LegalSection, LegalSlug, NavItem } from "@/types";

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
 * set to the full 72rem container is a document nobody finishes; around 68
 * characters is the line length long prose is actually read at, and it is the
 * one place on this site where the container is deliberately not the authority.
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

  return (
    <>
      <SectionShell
        size="compact"
        containerClassName="pt-5 pb-9 md:pt-6 md:pb-11"
        backdrop={<HeroEnvironment />}
      >
        <Breadcrumb trail={LEGAL_TRAIL} current={document.title} />

        <div className="mt-7 max-w-[46rem]">
          <FeatureEyebrow>Legal</FeatureEyebrow>

          <h1 className="mt-5 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.45rem]">
            {document.title}
          </h1>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-pretty text-ink/55">
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
      </SectionShell>

      <SectionShell size="compact" className="border-t border-ink/[0.07]">
        {/*
          The rail is a sibling of the article rather than a floated aside, so
          the article keeps its own measure and the rail cannot narrow it. It
          disappears below `lg`: a contents list stacked above a document on a
          phone is a screen of links between the reader and the first sentence.
        */}
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-[calc(var(--spacing-header)+1.5rem)]"
            >
              <p className="text-[0.6875rem] font-semibold tracking-[0.08em] text-ink/45 uppercase">
                On this page
              </p>
              <ul className="mt-3 space-y-0.5 border-l border-ink/[0.07]">
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-3 text-[13px] leading-snug text-ink/50 transition-colors duration-200 ease-[var(--ease-emphasized)] hover:border-brand/60 hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="max-w-[68ch] min-w-0">
            {document.status === "draft" ? <ReviewNotice /> : null}

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
function ReviewNotice() {
  return (
    <div className="mb-10 flex gap-3 rounded-xl border border-ink/[0.08] bg-sky-50 px-4 py-3.5">
      <CircleAlert
        aria-hidden
        className="mt-px size-4 shrink-0 text-ink/40"
        strokeWidth={1.8}
      />
      <p className="text-[13px] leading-relaxed text-ink/60">
        <span className="font-semibold text-ink/75">In review.</span> The
        sections below describe how COD King operates today. Points still to be
        confirmed with the business are listed within the section they belong
        to, rather than left as gaps in the text.
      </p>
    </div>
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
 * The list is the footer's own legal row, minus the page you are on.
 */
function DocumentFooter({ slug }: { readonly slug: LegalSlug }) {
  const siblings = getFooterLegalLinks().filter(
    (item) => item.href !== routeFor.legal(slug),
  );

  return (
    <div className="mt-10 border-t border-ink/[0.07] pt-7">
      <p className="text-[13.5px] leading-relaxed text-ink/55">
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
              className="rounded-sm py-1 text-[13px] text-ink/45 transition-colors duration-200 hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
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
    <BlurFade className="py-7 first:pt-0 last:pb-0">
      <section
        id={section.id}
        className="scroll-mt-[calc(var(--spacing-header)+2rem)]"
      >
        <h2 className="text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] text-ink">
          {section.heading}
        </h2>

        {section.body.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3.5 text-[14.5px] leading-[1.75] text-pretty text-ink/60"
          >
            {paragraph}
          </p>
        ))}

        {section.points ? (
          <ul className="mt-4 space-y-2.5">
            {section.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-ink/25"
                />
                <span className="text-[14.5px] leading-[1.7] text-pretty text-ink/60">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {section.confirm ? (
          <div className="mt-5 rounded-xl border border-dashed border-ink/[0.14] bg-cloud px-4 py-3.5">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-ink/45 uppercase">
              To be confirmed
            </p>
            <ul className="mt-2 space-y-1.5">
              {section.confirm.map((item) => (
                <li
                  key={item}
                  className="text-[13px] leading-relaxed text-ink/55"
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
