import { Check } from "lucide-react";

import { ShopifyLockup } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { getProofMetrics, getUtilityActions } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

const REASSURANCES = [
  "7-day free trial",
  "No credit card required",
  "Cancel anytime",
];

/**
 * The close, as a card rather than a band.
 *
 * The blueprint sets it beside the questions instead of below them, and that
 * is the better arrangement: a merchant reading the FAQ is resolving the last
 * objection, and the action they need next should be in view when they finish
 * rather than one scroll further on. So this renders a surface with no section
 * shell of its own — `Faq` owns the band both halves sit on.
 *
 * Nothing new is introduced. By this point the merchant has seen the loss, the
 * system, the proof and the price, and the only job left is to make the action
 * easy.
 *
 * It is the one card on the page carrying a beam. That is deliberate and it is
 * the only place it appears: a moving edge is the strongest attention signal
 * the design system has, so spending it anywhere else would cost it the weight
 * it needs here.
 */
export async function FinalCta() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand/15 bg-gradient-to-b from-white via-sky-100 to-sky-200 p-8 text-center shadow-card lg:p-10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 50% 0%, color-mix(in oklab, var(--brand) 14%, transparent), transparent 72%)",
        }}
      />
      <DotPattern
        width={26}
        height={26}
        cr={1}
        className={cn(
          "absolute inset-0 -z-10 h-full fill-brand/20",
          "[mask-image:radial-gradient(60%_55%_at_50%_40%,white,transparent)]",
        )}
      />
      {/* The violet accent, as a single cool body behind the heading. */}
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[110px]"
      />
      <BorderBeam
        size={180}
        duration={11}
        colorFrom="var(--brand)"
        colorTo="var(--brand-accent)"
      />

      <ShopifyLockup title="Shopify" className="mx-auto h-8 text-ink/80" />

      <h2 className="mx-auto mt-6 max-w-md text-[1.75rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.15rem]">
        Your next cash order can be a verified one
      </h2>

      <p className="mx-auto mt-4 max-w-sm leading-relaxed text-pretty text-muted-foreground">
        Join {numberFormat.format(proof.merchantCount)}+ Shopify stores that
        stopped treating cash on delivery as a cost of doing business.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {installAction ? (
          <ActionLink
            action={{ ...installAction, label: "Install free on Shopify" }}
            size="lg"
            className="shadow-[0_14px_36px_-12px_var(--brand)]"
          />
        ) : null}

        {demoAction ? (
          <ActionLink
            action={demoAction}
            size="lg"
            className="border-white/80 bg-white/70 backdrop-blur-md"
          />
        ) : null}
      </div>

      <ul className="mt-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-8 text-[13px] text-muted-foreground">
        {REASSURANCES.map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5">
            <Check aria-hidden className="size-4 text-brand-check" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
