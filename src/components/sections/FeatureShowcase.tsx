import {
  BadgeIndianRupee,
  BadgePercent,
  ChartNoAxesCombined,
  MessageSquareText,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routeFor } from "@/constants/routes";
import { getControlBoard, getControlBoardTitle } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  "otp-verification": ShieldCheck,
  "partial-cod-payment": Wallet,
  "cod-fees": BadgeIndianRupee,
  "cod-show-hide": SlidersHorizontal,
  "cod-to-prepaid": BadgePercent,
  "messaging-gateways": MessageSquareText,
  analytics: ChartNoAxesCombined,
  "abandoned-cart-recovery": ShoppingCart,
};

/**
 * The capability board (§5.1 #6).
 *
 * The section directly before this one states the problem and refuses to
 * answer it. This is the answer, and it is deliberately a board rather than an
 * argument: a merchant arrives knowing their symptom, not our feature names, so
 * eight peers they can scan in one pass lets them find themselves in it. Ranked
 * rows would impose an order the merchant does not share.
 *
 * Four across, two rows, read left to right — which means the sequence has to
 * survive being cut after the fourth card. It does: the first row is everything
 * that stops a bad order before it ships, the second is everything that changes
 * what the buyer chooses and what you learn from it.
 *
 * Every card is a link to the control's own page, so this is also the page's
 * main branch point into the product — the card is the whole target, not a
 * "learn more" tucked in the corner of it.
 *
 * Same surface as every other card on the site: `surface-card`, one radius, one
 * shadow, one lift, a monochrome outline icon that warms to brand on hover. The
 * board is eight equal things, and eight equal things want one treatment.
 *
 * The set is read from the content repository and resolved by slug (§11), so
 * this grid, the hero's checklist and the feature pages are one list seen three
 * times and cannot disagree.
 */
export function FeatureShowcase() {
  const board = getControlBoard();
  const title = getControlBoardTitle();

  return (
    /*
      Matched to the trimmed padding under the problem section, so the two meet
      at roughly half the usual seam. They are one argument in two halves —
      here is what it costs, here is what stops it — and the page should not
      make a visitor cross a corridor between them.
    */
    <SectionShell
      backdrop={<PageEnvironment />}
      containerClassName="pt-7 md:pt-8 lg:pt-9"
    >
      <SectionHeading title={title} />

      <ul className="mt-lede grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {board.map((card, index) => {
          const Icon = iconFor[card.slug] ?? ShieldCheck;

          return (
            <li key={card.slug} className="h-full">
              {/*
                A short stagger across the board, and the only motion in the
                section. Eight cards arriving at once reads as a page repaint;
                arriving in sequence reads as a set being laid out.
              */}
              <BlurFade delay={0.04 * index} className="h-full">
                <Link
                  href={routeFor.control(card.slug)}
                  className="group flex h-full surface-card items-start gap-3.5 rounded-[1.15rem] p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <Icon
                    aria-hidden
                    className="mt-px size-5 shrink-0 text-ink/35 transition-colors duration-300 ease-emphasized group-hover:text-brand"
                    strokeWidth={1.6}
                  />

                  <div className="min-w-0">
                    <h3 className="text-[14.5px] leading-none font-semibold tracking-[-0.012em] text-ink">
                      {card.label}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                      {card.blurb}
                    </p>
                  </div>
                </Link>
              </BlurFade>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
