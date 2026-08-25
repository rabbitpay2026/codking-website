import { Check, Play } from "lucide-react";

import { CtaVideo, demoVideoUrlFor } from "@/components/sections/cta/CtaVideo";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { panelHoverClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { FeatureCheckpoint } from "@/types";

import type { ReactNode } from "react";

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
   *
   * Optional, because a page can demonstrate the control instead of recording
   * it — see `media`. Exactly one of the two is expected; a page that supplies
   * neither renders the copy column alone rather than an empty frame.
   */
  readonly videoId?: string;
  /**
   * A demonstration drawn in markup, shown in the player's place.
   *
   * The registry is deliberately empty for controls that have no recording of
   * their own, and until this existed such a page fell back to the site's
   * general demo — a real video, but the wrong one, which is worse than none
   * for a section headed "see this control in action". A page with a
   * demonstration it can draw passes it here and shows the control itself.
   *
   * `videoId` wins if both are given, so adding a recording to the registry is
   * all it takes to switch a page back to the player.
   */
  readonly media?: ReactNode;
  /** Overrides the eyebrow, for a section that is not a recording. */
  readonly eyebrow?: string;
}

/**
 * The product demo — the control on the left, the case for looking at it on
 * the right.
 *
 * The left column is a player where the page has a recording of its own, and a
 * demonstration drawn in markup where it does not. Both sit in the same box at
 * the same width, so the row is one layout rather than two.
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
  media,
  eyebrow = "Product demo",
}: FeatureDemoSplitProps) {
  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <BlurFade>
          {videoId ? (
            /*
              `panelHoverClass`, not `cardHoverClass`: this is a surface someone
              is about to press play on, and a target that moves three pixels as
              the pointer arrives is a target that has to be aimed at twice.
            */
            <CtaVideo
              videoId={videoId}
              title={title}
              className={cn(
                "w-full shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.4)]",
                panelHoverClass,
              )}
            />
          ) : (
            media
          )}
        </BlurFade>

        <BlurFade delay={0.06}>
          <div className="flex flex-col items-start">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
              <span aria-hidden className="h-px w-6 bg-brand/40" />
              {eyebrow}
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

            {/* Only where there is a recording to watch. A page demonstrating
                the control in markup has nothing this button could open. */}
            {videoId ? (
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
            ) : null}
          </div>
        </BlurFade>
      </div>
    </SectionShell>
  );
}
