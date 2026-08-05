import { Check } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { Container } from "@/components/shared/Container";
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
 * The close (§5.1 #11).
 *
 * Restates the offer and asks for the install, with Book a Demo beside it for
 * the larger merchants who need a conversation first (§9.4). Nothing new is
 * introduced here — by this point the merchant has seen the loss, the system,
 * the proof and the price, and the only job left is to make the action easy.
 */
export async function FinalCta() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <section className="relative overflow-hidden bg-brand">
      <DotPattern
        width={26}
        height={26}
        cr={1}
        className={cn(
          "absolute inset-0 h-full fill-white/25",
          "[mask-image:radial-gradient(520px_circle_at_50%_35%,white,transparent)]",
        )}
      />

      <Container className="relative py-20 text-center lg:py-24">
        <h2 className="mx-auto max-w-2xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-[2.75rem]">
          Ready to take control of your COD orders?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
          Join {numberFormat.format(proof.merchantCount)}+ Shopify merchants
          reducing RTOs, blocking fake orders, and converting more COD buyers to
          prepaid.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {installAction ? (
            <ActionLink
              action={{ ...installAction, label: "Install free on Shopify" }}
              size="lg"
              className="bg-white text-brand hover:bg-white/90 hover:shadow-none"
            />
          ) : null}

          {demoAction ? (
            <ActionLink
              action={demoAction}
              size="lg"
              className="border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
            />
          ) : null}
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/75">
          {REASSURANCES.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="size-4 text-brand-check" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
