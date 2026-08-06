import {
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { OverviewPreview } from "@/components/sections/overview/OverviewPreview";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routeFor } from "@/constants/routes";
import { getFeaturedControls } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * The one-line version of each flagship control.
 *
 * Owned by this section rather than stored on the record, for the same reason
 * the showcase below owns its own: the control's `outcome` is the description
 * reused on every surface, while this is the *introduction* — what the
 * capability is, in a breath, before anything is explained.
 *
 * Every line here is deliberately shorter than its counterpart below. If the
 * overview says as much as the walkthrough, the walkthrough has nothing left
 * to say and the reader has been made to read it twice.
 */
interface OverviewCard {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

const cards: Record<string, OverviewCard> = {
  "cod-rules": {
    icon: SlidersHorizontal,
    title: "Decide where cash is offered at all",
    body: "Show COD, hide it, or put a fee on it — by pincode, cart value, product or customer history.",
  },
  "prepaid-nudge": {
    icon: Sparkles,
    title: "Make prepaid the cheaper option",
    body: "A fee on cash, a discount on prepaid, and the gap shown at checkout. Buyers move themselves.",
  },
  "otp-verification": {
    icon: ShieldCheck,
    title: "Confirm the order before you pack it",
    body: "The buyer verifies over SMS or WhatsApp. Anything unconfirmed is held instead of shipped.",
  },
};

/**
 * The product overview.
 *
 * A bridge, and nothing more. By this point a merchant has seen the loss and
 * the shape of the system, and the next section spends two thousand pixels on
 * three capabilities — so this one names those three first, in a sentence
 * each, and gets out of the way. Someone who reads only this section still
 * knows what the product does.
 *
 * It carries no new visual language: the section shell, the heading, the
 * card surface, the reveal, the eyebrow rule and the link treatment are all
 * the ones already running down the page.
 *
 * The tone is `default` rather than `muted` on purpose. The system section
 * above it is muted, so the overview steps out of that band; the showcase
 * below it is also `default`, so the two share one surface and the eye reads
 * "here they are" and "here they are in detail" as one continuous move rather
 * than two sections that happen to be adjacent.
 *
 * Order comes from `getFeaturedControls()` — the same source, in the same
 * sequence, as the walkthrough underneath, so the introduction and the detail
 * cannot fall out of step.
 */
export function FlagshipOverview() {
  const controls = getFeaturedControls();

  return (
    <SectionShell ariaLabel="What COD King does">
      <SectionHeading
        eyebrow="Product overview"
        title="What the product actually does"
        description="Three capabilities carry almost all of the work. Here they are in a sentence each — the working detail follows underneath."
      />

      <div className="mt-lede grid items-stretch gap-5 lg:grid-cols-3">
        {controls.map((control, index) => {
          const card = cards[control.slug];
          if (!card) return null;

          const Icon = card.icon;

          return (
            <BlurFade
              key={control.slug}
              delay={0.07 * index}
              inView
              className="h-full"
            >
              <article className="flex h-full surface-card flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft"
                  >
                    <Icon className="size-4 text-brand" />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                    {control.name}
                  </p>
                </div>

                <h3 className="mt-5 text-lg leading-snug font-semibold tracking-[-0.02em] text-balance">
                  {card.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {card.body}
                </p>

                {/*
                  Pushed to the bottom so the stills — all three rows tall —
                  sit on the same line across the row regardless of how the
                  copy above them wraps.
                */}
                <div className="mt-auto pt-6">
                  <div
                    aria-hidden
                    className="rounded-xl border border-border bg-cloud p-2.5"
                  >
                    <OverviewPreview slug={control.slug} />
                  </div>

                  <Link
                    href={routeFor.control(control.slug)}
                    className="group mt-5 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    See {control.name}
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            </BlurFade>
          );
        })}
      </div>
    </SectionShell>
  );
}
