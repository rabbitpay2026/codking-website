import { Check } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { SectionShell } from "@/components/sections/SectionShell";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Meteors } from "@/components/ui/meteors";
import { Noise } from "@/components/ui/noise";
import { cn } from "@/lib/utils";
import { getProofMetrics, getUtilityActions } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

const REASSURANCES = [
  "7-day free trial",
  "No credit card required",
  "Cancel anytime",
];

/**
 * The close (§5.1 #11).
 *
 * Restates the offer and asks for the install, with Book a Demo beside it for
 * the larger merchants who need a conversation first (§9.4). Nothing new is
 * introduced — by this point the merchant has seen the loss, the system, the
 * proof and the price, and the only job left is to make the action easy.
 *
 * The richest surface on the page, and the last thing seen: a deep brand
 * gradient rather than the flat brand fill, lit from above, with meteors
 * carrying just enough movement to make the band feel alive. Grain over the
 * top stops a gradient this large from banding.
 */
export async function FinalCta() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <SectionShell
      tone="brand"
      size="spacious"
      ariaLabel="Get started with COD King"
      className="bg-gradient-to-b from-brand-deep via-brand to-brand-deep"
      containerClassName="text-center"
      backdrop={
        <>
          {/*
            The page fades into the brand rather than hitting it. This tone
            does not flip the token layer, so `background` here is still the
            light page colour above it — the band arrives instead of cutting in.
          */}
          <div
            aria-hidden
            // Kept shorter than the container's top padding at every
            // breakpoint, so the white never reaches the white heading.
            className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent sm:h-24 lg:h-28"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(60% 55% at 50% 0%, rgba(255,255,255,0.22), transparent 70%)",
            }}
          />
          <DotPattern
            width={28}
            height={28}
            cr={1}
            className={cn(
              "absolute inset-0 h-full fill-white/25",
              "[mask-image:radial-gradient(55%_50%_at_50%_45%,white,transparent)]",
            )}
          />
          <Meteors number={14} className="opacity-40" />
          <Noise className="opacity-[0.06]" />
        </>
      }
    >
      <h2 className="mx-auto max-w-3xl text-[2rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white sm:text-[2.75rem] lg:text-[3.25rem]">
        Ready to take control of your COD orders?
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
        Join {numberFormat.format(proof.merchantCount)}+ Shopify merchants
        reducing RTOs, blocking fake orders, and converting more COD buyers to
        prepaid.
      </p>

      <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {installAction ? (
          <ActionLink
            action={{ ...installAction, label: "Install free on Shopify" }}
            size="lg"
            className="bg-white text-brand shadow-[0_12px_35px_-10px_rgba(0,0,0,0.45)] hover:bg-white/90 hover:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)]"
          />
        ) : null}

        {demoAction ? (
          <ActionLink
            action={demoAction}
            size="lg"
            className="border-white/35 bg-white/10 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20 hover:text-white"
          />
        ) : null}
      </div>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-white/75">
        {REASSURANCES.map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5">
            <Check aria-hidden className="size-4 text-brand-check" />
            {item}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
