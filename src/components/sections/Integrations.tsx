import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { routes } from "@/constants/routes";
import { getIntegrations, getIntegrationsByCategory } from "@/lib/content";

/**
 * Integrations.
 *
 * The architecture keeps Integrations out of the primary navigation because
 * merchants check compatibility after they are interested, not before (§4.3).
 * That reasoning is why the section sits here — after the product has been
 * shown, before pricing — rather than near the top.
 *
 * It is a cost argument as much as a compatibility one: routing through a
 * regional provider is what cuts the per-message bill (§6.2).
 *
 * The orbit is decorative and marked as such. Every provider is also listed
 * as real text beside it, so nothing depends on the animation being seen or
 * on JavaScript running at all.
 */
export function Integrations() {
  const gateways = getIntegrationsByCategory("sms-gateway");
  const all = getIntegrations();

  const inner = gateways.slice(0, 3);
  const outer = gateways.slice(3);

  return (
    <SectionShell
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(50% 55% at 78% 50%, color-mix(in oklab, var(--brand) 11%, transparent), transparent 70%)",
          }}
        />
      }
    >
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Integrations"
            title="Use your own SMS provider and pay local rates"
            description="Connect a regional gateway and you pay your provider directly, in local currency. Merchants cut messaging costs by up to 70% against international rates."
          />

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {all.map((integration) => (
              <li
                key={integration.slug}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground/80 shadow-card transition-colors duration-300 hover:border-brand/30 hover:text-foreground"
              >
                {integration.name}
              </li>
            ))}
          </ul>

          <Button asChild variant="secondary" size="lg" className="mt-10">
            <Link href={routes.integrations}>
              See all integrations
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>

        <BlurFade inView className="justify-self-center">
          <div
            aria-hidden
            className="relative flex h-[22rem] w-[22rem] items-center justify-center sm:h-[27rem] sm:w-[27rem]"
          >
            <div className="absolute inset-[18%] rounded-full bg-brand/10 blur-3xl" />

            <span className="relative grid size-24 place-items-center rounded-3xl border border-border bg-card text-sm font-semibold shadow-overlay">
              COD King
            </span>

            <OrbitingCircles radius={95} duration={30} iconSize={56}>
              {inner.map((gateway) => (
                <span
                  key={gateway.slug}
                  className="grid size-full place-items-center rounded-full border border-border bg-card px-2 text-[10px] font-medium text-foreground/70 shadow-card"
                >
                  {gateway.name}
                </span>
              ))}
            </OrbitingCircles>

            <OrbitingCircles radius={158} duration={40} reverse iconSize={60}>
              {outer.map((gateway) => (
                <span
                  key={gateway.slug}
                  className="grid size-full place-items-center rounded-full border border-border bg-card px-2 text-[10px] font-medium text-foreground/70 shadow-card"
                >
                  {gateway.name}
                </span>
              ))}
            </OrbitingCircles>
          </div>
        </BlurFade>
      </div>
    </SectionShell>
  );
}
