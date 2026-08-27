import { PackageCheck } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { SectionShell } from "@/components/sections/SectionShell";
import { getProofMetrics, getUtilityActions } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The close (§3.1).
 *
 * One strip, not a section: a merchant who has read the table and the answers
 * has already decided, and what is left is a button, not another argument. So
 * it is a single bordered band the width of the page — the mark, the line, the
 * two actions — and the page ends.
 *
 * The merchant count comes from the proof repository (§11.1), never a literal,
 * so the number closing this page is the number closing the homepage.
 */
export async function PricingCta() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <SectionShell
      size="compact"
      ariaLabel="Get started with COD King"
      className="border-t border-ink/10"
    >
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-sky-50 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
        <div className="flex items-center gap-4">
          {/*
            The blueprint's parcel, as an outline mark on a tinted tile rather
            than an illustration. It is the only picture in the band and its
            job is to say "shipping", not to be looked at.
          */}
          <span
            aria-hidden
            className="hidden size-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-brand sm:grid"
          >
            <PackageCheck className="size-6" strokeWidth={1.5} />
          </span>

          <div>
            <h2 className="text-[1.15rem] leading-[1.2] font-semibold tracking-[-0.02em] text-balance text-ink sm:text-[1.3rem]">
              Ready to reduce fake orders and increase profits?
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              Join {numberFormat.format(proof.merchantCount)}+ Shopify merchants
              who trust COD King.
            </p>
          </div>
        </div>

        {/*
          Wraps rather than overflows. Both labels are `whitespace-nowrap` by
          contract, so a row that cannot fit them pushes the second one outside
          the band instead of shrinking it.
        */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
          {installAction ? (
            <ActionLink
              action={{ ...installAction, label: "Install on Shopify" }}
              size="md"
              location="pricing-cta"
              icon={<ShopifyMark className="size-[18px]" />}
              className="gap-2.5 bg-ink px-4 text-[14px] font-semibold text-white hover:bg-ink/90"
            />
          ) : null}

          {demoAction ? (
            <ActionLink
              action={{ ...demoAction, label: "Book a Demo" }}
              size="md"
              location="pricing-cta"
              className="px-4 text-[14px] font-semibold text-ink/80 hover:text-ink"
            />
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
