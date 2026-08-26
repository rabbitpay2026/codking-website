import { Star } from "lucide-react";

import { OperatorMark } from "@/components/product/messaging-gateways";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import {
  getGatewayPageCopy,
  getRecommendedSmsOperators,
  getRegionalSmsOperatorGroups,
  getWorldwideSmsOperators,
} from "@/lib/content";
import { cn } from "@/lib/utils";

import type { SmsOperator } from "@/types";

/** The label above a band of operators. Small, so the cards stay the subject. */
function BoardHeading({ children }: { readonly children: string }) {
  return (
    <h3 className="flex items-center gap-3 text-[11px] leading-none font-bold tracking-[0.12em] text-ink/40 uppercase">
      {children}
      <span aria-hidden className="h-px flex-1 bg-ink/[0.07]" />
    </h3>
  );
}

/**
 * One operator, as a card.
 *
 * The logo sits in a box every card reserves at the same height, so a 8:1
 * wordmark and a square icon land on the same baseline and the name below
 * starts at the same place in all fifteen. Nothing is stretched to fill the
 * box: the marks are fitted, so an operator's own proportions survive the
 * grid.
 *
 * The badge carries the coverage the picker publishes and nothing more. It is
 * the market this operator is listed for — not the market it is good at, not a
 * region it might also reach.
 */
function OperatorCard({ operator }: { readonly operator: SmsOperator }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center rounded-xl border border-ink/[0.08] bg-card px-3 py-4 text-center",
        cardHoverClass,
      )}
    >
      <OperatorMark operator={operator} />

      <h4 className="mt-3.5 text-[12.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
        {operator.name}
        {operator.alias ? (
          <span className="font-medium text-ink/40"> ({operator.alias})</span>
        ) : null}
      </h4>

      {/*
        `mt-auto` so every badge in a row sits on the same line even where a
        two-word name wraps and a one-word name does not.
      */}
      <p className="mt-auto pt-2.5">
        <span className="inline-flex items-center rounded-full border border-ink/[0.09] bg-sky-50 px-2.5 py-1 text-[10.5px] leading-none font-semibold text-ink/55">
          {operator.coverage}
        </span>
      </p>
    </div>
  );
}

/**
 * The operators COD King connects to.
 *
 * This band stands where the sibling feature pages put their product demo.
 * There is no recording of an operator being selected, and the honest
 * replacement for a video is not a poster frame — it is the thing the video
 * would have shown. For this control that is the list itself: "which operators
 * do you support" is the first question a merchant asks about it, and the
 * second is "is mine on there".
 *
 * ── Why it is in three parts ──────────────────────────────────────────────
 * Fifteen cards in one grid is a wall, and a merchant scanning a wall for
 * their own market reads every card to find out that fourteen of them are not
 * it. So the board is split the way the product splits it: the two the
 * dashboard recommends for a United States store, the four whose coverage is
 * worldwide, and the eleven listed for a single market — those ordered by
 * market, so an operator's neighbour is the other operator for the same
 * country rather than whichever one the dropdown happens to list next.
 *
 * The markets are also named above the regional grid as a row of chips, which
 * is the fastest possible answer to "is my country on this page" — no card has
 * to be read to get it.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Every record is read from the operator repository, so this board cannot
 * offer an operator the product does not offer, cannot fall behind one that is
 * added, and cannot describe an operator's coverage differently from the
 * dropdown further down the page. COD King itself is not on it: it is the
 * picker's default rather than one of the local operators, and drawing it here
 * would present the product as its own partner.
 *
 * An empty band renders nothing rather than an empty board — the same failure
 * mode every other section on this page chose.
 */
export function Operators() {
  const copy = getGatewayPageCopy();
  const recommended = getRecommendedSmsOperators();
  const worldwide = getWorldwideSmsOperators();
  const regionalGroups = getRegionalSmsOperatorGroups();
  const regional = regionalGroups.flatMap((group) => group.operators);

  if (worldwide.length === 0 && regional.length === 0) return null;

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <SectionHeading
        as="h2"
        eyebrow={copy.operatorsEyebrow}
        title={copy.operatorsTitle}
        description={copy.operatorsDescription}
      />

      {recommended.length > 0 ? (
        <BlurFade className="mt-9">
          {/*
            The recommendation is a panel rather than two more cards in the
            grid below, because it is the dashboard's advice for one market and
            not a rank. Set on white against the muted section so it reads as
            lifted off the board rather than as the first row of it.
          */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-ink/[0.08] bg-card p-4 shadow-card sm:p-5">
            <p className="flex items-center gap-2 text-[11px] leading-none font-bold tracking-[0.12em] text-brand uppercase">
              <Star aria-hidden className="size-3.5" strokeWidth={2.2} />
              {copy.recommendedTitle}
            </p>

            <ul className="mt-4 grid items-stretch gap-3 sm:grid-cols-2">
              {recommended.map((operator) => (
                <li key={operator.slug} className="h-full">
                  <div className="flex h-full items-center gap-3.5 rounded-xl border border-ink/[0.07] bg-sky-50 px-3.5 py-3">
                    <span className="grid h-12 w-24 shrink-0 place-items-center rounded-lg border border-ink/[0.07] bg-white px-3">
                      <OperatorMark operator={operator} size="sm" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] leading-none font-semibold tracking-[-0.012em] text-ink">
                        {operator.name}
                      </span>
                      <span className="mt-1.5 block text-[11.5px] leading-none text-ink/50">
                        {operator.coverage}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-3.5 text-[12px] leading-relaxed text-pretty text-ink/45">
              {copy.recommendedNote}
            </p>
          </div>
        </BlurFade>
      ) : null}

      {worldwide.length > 0 ? (
        <div className="mt-10">
          <BoardHeading>{copy.worldwideTitle}</BoardHeading>

          <ul className="mt-4 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4">
            {worldwide.map((operator, index) => (
              <li key={operator.slug} className="h-full">
                <BlurFade delay={0.03 * index} className="h-full">
                  <OperatorCard operator={operator} />
                </BlurFade>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {regional.length > 0 ? (
        <div className="mt-9">
          <BoardHeading>{copy.regionalTitle}</BoardHeading>

          {/* The markets, before any card has to be read. */}
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {regionalGroups.map((group) => (
              <li key={group.coverage}>
                <span className="inline-flex items-center rounded-full border border-ink/[0.09] bg-background px-2.5 py-1 text-[11px] leading-none font-medium text-ink/55">
                  {group.coverage}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {regional.map((operator, index) => (
              <li key={operator.slug} className="h-full">
                <BlurFade delay={0.03 * index} className="h-full">
                  <OperatorCard operator={operator} />
                </BlurFade>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 text-center text-[13px] leading-relaxed text-pretty text-ink/50">
        {copy.operatorsNote}
      </p>
    </SectionShell>
  );
}
