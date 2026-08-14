import { Check, Play } from "lucide-react";

import { CtaVideo, demoVideoUrlFor } from "@/components/sections/cta/CtaVideo";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { panelHoverClass } from "@/constants/theme";
import { getDemoVideoId, getOtpDemoPoints } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The product demo — player on the left, the case for pressing play on the
 * right.
 *
 * The embed is the site's existing `CtaVideo`, untouched: YouTube's own player
 * rather than a bespoke one, lazily loaded, with its box reserved by a 16:9
 * ratio so the row does not jump when the iframe arrives. A custom player here
 * would mean owning buffering, captions, quality switching and the keyboard
 * interface to end up somewhere behind what YouTube ships for free.
 *
 * The four points beside it are captions rather than benefits. A checklist next
 * to a player is read as a description of the recording, so every line names
 * something a visitor will actually see in it — a list of advantages the video
 * does not show is worse than no list at all.
 *
 * Both columns hang from the same top edge. Vertically centring the text
 * against a 16:9 box leaves the heading floating in the middle of the row at
 * exactly one viewport width and nowhere else.
 */
export function OtpVerificationDemo() {
  const videoId = getDemoVideoId("otp-verification");

  return (
    <SectionShell tone="muted" size="compact">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <BlurFade>
          {/*
            The player answers the cursor like every other card on the page,
            but through `panelHoverClass` rather than `cardHoverClass`: this is
            a surface someone is about to press play on, and a target that
            moves three pixels as the pointer arrives is a target that has to
            be aimed at twice.
          */}
          <CtaVideo
            videoId={videoId}
            title="See OTP verification in action"
            className={cn(
              "w-full shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.4)]",
              panelHoverClass,
            )}
          />
        </BlurFade>

        <BlurFade delay={0.06}>
          <div className="flex flex-col items-start">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
              <span aria-hidden className="h-px w-6 bg-brand/40" />
              Product demo
            </p>

            <h2 className="mt-4 text-[1.6rem] leading-[1.12] font-semibold tracking-[-0.028em] text-balance text-ink sm:text-[1.9rem]">
              See OTP verification in action
            </h2>

            <p className="mt-3.5 max-w-md text-[14px] leading-relaxed text-pretty text-ink/55">
              Two minutes of the real thing: a cash-on-delivery order placed, a
              code sent, and what happens to the orders nobody confirms.
            </p>

            <ul className="mt-5 space-y-2.5">
              {getOtpDemoPoints().map((point) => (
                <li key={point.id} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-px grid size-[17px] shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/[0.06]"
                  >
                    <Check className="size-2.5 text-brand" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] leading-relaxed text-ink/75">
                    {point.label}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="secondary"
              size="md"
              className="mt-6 border-ink/12 px-4 text-[13.5px] font-semibold text-ink/80 hover:border-ink/20 hover:text-ink"
            >
              <a
                href={demoVideoUrlFor(videoId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play aria-hidden className="size-3.5 fill-current" />
                Watch full demo
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </SectionShell>
  );
}
