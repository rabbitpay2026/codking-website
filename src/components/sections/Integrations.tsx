import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { getIntegrations } from "@/lib/content";

/**
 * The two rates, as the merchant meets them.
 *
 * `width` is the bar length, not a second claim: it is the visual expression
 * of the same ceiling the copy states, so the drawing and the sentence cannot
 * drift apart.
 */
const RATES = [
  {
    id: "bundled",
    label: "Bundled international rate",
    detail: "One global price, marked up, billed by the app",
    width: "100%",
    tone: "muted",
  },
  {
    id: "regional",
    label: "Your own regional gateway",
    detail: "Settled directly with the provider, in local currency",
    width: "30%",
    tone: "brand",
  },
] as const;

/**
 * Messaging gateways (§6.2).
 *
 * The architecture keeps Integrations out of the primary navigation because
 * merchants check compatibility after they are interested, not before (§4.3).
 * That reasoning is why the section sits here — after the product has been
 * shown, before pricing — rather than near the top.
 *
 * It is a cost argument far more than a compatibility one, so it is drawn as
 * one. An earlier pass put the providers in an orbit, which was pleasant and
 * said nothing: a ring of logos proves integrations exist, and the merchant's
 * question is what they *cost*. Two bars against each other answer that
 * before a word is read.
 *
 * Composed as one enclosing panel rather than the two-column text-and-visual
 * split used elsewhere on the page, so the section has a silhouette of its
 * own. The provider list runs full width along the bottom of the same panel,
 * which is where a compatibility list belongs — underneath the argument, not
 * instead of it.
 *
 * Every provider is real text. Nothing here depends on JavaScript.
 */
export function Integrations() {
  const all = getIntegrations();

  return (
    <SectionShell
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(55% 60% at 50% 0%, color-mix(in oklab, var(--brand) 10%, transparent), transparent 70%)",
          }}
        />
      }
    >
      <BlurFade inView>
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card">
          <div className="grid gap-8 p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                <span aria-hidden className="h-px w-6 bg-brand/40" />
                Messaging
              </p>

              <h2 className="mt-5 text-[1.9rem] leading-[1.08] font-semibold tracking-[-0.028em] text-balance lg:text-[2.4rem]">
                Bring your own gateway, pay their rate
              </h2>

              <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
                Every confirmation, every OTP, every recovery message is a line
                on somebody&rsquo;s bill. Connect a regional provider and it is
                theirs, at their price, in their currency — not a global rate
                with a margin on top.
              </p>

              <Button asChild variant="secondary" size="lg" className="mt-7">
                <Link href={routes.integrations}>
                  See all integrations
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </div>

            {/* The comparison. */}
            <div className="self-center">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground/70 uppercase">
                Cost of one message
              </p>

              <dl className="mt-5 space-y-6">
                {RATES.map((rate) => (
                  <div key={rate.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm font-semibold">{rate.label}</dt>
                      {rate.tone === "brand" ? (
                        <dd className="shrink-0 rounded-full bg-brand-check/25 px-2.5 py-1 text-[11px] font-bold text-ink/80">
                          up to 70% less
                        </dd>
                      ) : null}
                    </div>

                    <div
                      aria-hidden
                      className="mt-2.5 h-3 overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        style={{ width: rate.width }}
                        className={
                          rate.tone === "brand"
                            ? "h-full rounded-full bg-gradient-to-r from-brand to-brand-accent shadow-[0_2px_10px_-3px_var(--brand)]"
                            : "h-full rounded-full bg-foreground/15"
                        }
                      />
                    </div>

                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {rate.detail}
                    </p>
                  </div>
                ))}
              </dl>

              <p className="mt-6 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
                On COD volume, where every order costs at least one message,
                that is the difference between a bill and a rounding error.
              </p>
            </div>
          </div>

          {/* Compatibility, where it belongs — under the argument. */}
          <div className="border-t border-border bg-cloud px-7 py-5 lg:px-10">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground/70 uppercase">
              Connect any of these
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {all.map((integration) => (
                <li
                  key={integration.slug}
                  className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:border-brand/35 hover:text-foreground"
                >
                  {integration.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
