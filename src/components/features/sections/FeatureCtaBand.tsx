import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { panelHoverClass } from "@/constants/theme";
import { getProofMetrics, getUtilityActions } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

const numberFormat = new Intl.NumberFormat("en");

interface FeatureCtaBandProps {
  /** The one thing the page changes about its close. */
  readonly title: string;
  /**
   * The line under it, in the page's own words.
   *
   * Optional, and it falls back to the merchant count — the line every close
   * carried before this was added. A page that has something specific to say
   * about the decision the merchant is about to make says it here; a page that
   * does not falls back to the proof rather than to filler, and the count is
   * still drawn beside it either way.
   */
  readonly description?: string;
  readonly icon: LucideIcon;
}

/**
 * The close, shared by every feature page (§6.3).
 *
 * Same panel, same treatment, same two actions the header has carried since
 * the visitor arrived. A page that invents a new button for its last section
 * is telling the merchant this is a different offer — which is why the only
 * thing a page supplies here is its headline and its mark.
 *
 * The merchant count is the proof repository's (§11.1), so the number the page
 * closes on is the number it opened with.
 */
export async function FeatureCtaBand({
  title,
  description,
  icon: Icon,
}: FeatureCtaBandProps) {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();

  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <BlurFade>
        {/*
          `panelHoverClass`, not `cardHoverClass`. This band runs the full
          measure and holds the page's primary action; three pixels of lift
          here is not a card acknowledging the cursor, it is the install button
          stepping out from under the hand reaching for it.
        */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-b from-sky-100 to-background p-7 sm:p-9 lg:p-10",
            panelHoverClass,
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(46% 60% at 12% 0%, color-mix(in oklab, var(--brand) 8%, transparent), transparent 68%)",
            }}
          />

          <div className="relative flex flex-col items-center gap-7 text-center lg:flex-row lg:gap-10 lg:text-left">
            <span
              aria-hidden
              className="hidden size-16 shrink-0 place-items-center rounded-2xl border border-white/70 bg-white/70 text-brand shadow-[0_1px_2px_rgba(11,27,54,0.05)] backdrop-blur-sm lg:grid"
            >
              <Icon className="size-7" strokeWidth={1.5} />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.03em] text-pretty text-ink sm:text-[2rem]">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-pretty text-ink/55">
                {description ? (
                  <>
                    {description}{" "}
                    <span className="text-ink/40">
                      Join {numberFormat.format(proof.merchantCount)}+ Shopify
                      merchants who trust COD King.
                    </span>
                  </>
                ) : (
                  <>
                    Join {numberFormat.format(proof.merchantCount)}+ Shopify
                    merchants who trust COD King.
                  </>
                )}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:shrink-0">
              {installAction ? (
                <ActionLink
                  action={{ ...installAction, label: "Install on Shopify" }}
                  size="lg"
                  icon={<ShopifyMark className="size-[20px]" />}
                  className="h-12 gap-2.5 bg-ink px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.24),0_10px_28px_-12px_rgba(11,27,54,0.7)] hover:bg-ink/90"
                />
              ) : null}

              {demoAction ? (
                <ActionLink
                  action={demoAction}
                  size="lg"
                  className="h-12 border-ink/10 bg-white/80 px-6 text-[15px] font-semibold text-ink/80 backdrop-blur-md hover:border-ink/16 hover:bg-white hover:text-ink"
                />
              ) : null}
            </div>
          </div>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
