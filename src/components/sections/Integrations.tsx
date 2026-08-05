import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
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
 * shown and before pricing — rather than near the top.
 *
 * It is also a cost argument, not only a compatibility one: routing through a
 * regional provider is what cuts the per-message bill (§6.2).
 *
 * The orbit is decorative and marked as such. Every provider is also listed
 * as real text beneath it, so the information does not depend on the
 * animation being seen or on JavaScript running at all.
 */
export function Integrations() {
  const gateways = getIntegrationsByCategory("sms-gateway");
  const all = getIntegrations();

  const inner = gateways.slice(0, 3);
  const outer = gateways.slice(3);

  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Integrations"
              title="Use your own SMS provider and pay local rates"
              description="Connect a regional gateway and you pay your provider directly, in local currency. Merchants cut messaging costs by up to 70% against international rates."
            />

            <ul className="mt-8 flex flex-wrap gap-2">
              {all.map((integration) => (
                <li
                  key={integration.slug}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground/80"
                >
                  {integration.name}
                </li>
              ))}
            </ul>

            <Button asChild variant="secondary" size="lg" className="mt-8">
              <Link href={routes.integrations}>
                See all integrations
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>

          <BlurFade inView className="justify-self-center">
            <div
              aria-hidden
              className="relative flex h-[22rem] w-[22rem] items-center justify-center sm:h-[26rem] sm:w-[26rem]"
            >
              <span className="grid size-20 place-items-center rounded-2xl border border-border bg-card text-sm font-semibold shadow-card">
                COD King
              </span>

              <OrbitingCircles radius={90} duration={26} iconSize={54}>
                {inner.map((gateway) => (
                  <span
                    key={gateway.slug}
                    className="grid size-full place-items-center rounded-full border border-border bg-card px-2 text-[10px] font-medium text-foreground/70 shadow-card"
                  >
                    {gateway.name}
                  </span>
                ))}
              </OrbitingCircles>

              <OrbitingCircles radius={150} duration={34} reverse iconSize={58}>
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
      </Container>
    </section>
  );
}
