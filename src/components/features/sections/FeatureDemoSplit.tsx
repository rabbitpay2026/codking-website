import { Check, Play } from "lucide-react";

import { CtaVideo, demoVideoUrlFor } from "@/components/sections/cta/CtaVideo";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { panelHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { FeatureCheckpoint } from "@/types";

interface FeatureDemoSplitProps {
  readonly title: string;
  readonly description: string;
  readonly points: readonly FeatureCheckpoint[];
  /**
   * YouTube's id for this page's recording, from `getDemoVideoId()`.
   *
   * Every feature page shows its own demo, so this is the one thing about the
   * player a page decides — and it decides it by naming its surface to the
   * registry, not by typing an id here.
   */
  readonly videoId: string;
}

/**
 * The product demo — player on the left, the case for pressing play on the
 * right.
 *
 * The embed is the site's existing `CtaVideo`, untouched: YouTube's own player
 * rather than a bespoke one, lazily loaded, with its box reserved by a 16:9
 * ratio so the row does not jump when the iframe arrives. One component across
 * every feature page, so a merchant moving between them meets one player —
 * with a different recording inside it, named by the page.
 *
 * The points beside it are captions rather than benefits. A checklist next to
 * a player is read as a description of the recording, so every line should
 * name something the merchant will actually see configured in it.
 *
 * Both columns hang from the same top edge. Vertically centring the text
 * against a 16:9 box leaves the heading floating in the middle of the row at
 * exactly one viewport width and nowhere else.
 */
export function FeatureDemoSplit({
  title,
  description,
  points,
  videoId,
}: FeatureDemoSplitProps) {
  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <BlurFade>
          {/*
            `panelHoverClass`, not `cardHoverClass`: this is a surface someone
            is about to press play on, and a target that moves three pixels as
            the pointer arrives is a target that has to be aimed at twice.
          */}
          <CtaVideo
            videoId={videoId}
            title={title}
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
              {title}
            </h2>

            <p className="mt-3.5 max-w-md text-[14px] leading-relaxed text-pretty text-ink/55">
              {description}
            </p>

            <ul className="mt-5 space-y-2.5">
              {points.map((point) => (
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
