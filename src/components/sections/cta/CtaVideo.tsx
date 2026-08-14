import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * A recording on YouTube itself, from the same id the player embeds.
 *
 * Exported so a "watch the full demo" action anywhere on the site points at
 * the video beside it rather than at a URL typed out a second time that can
 * drift from it.
 *
 * No id lives in this file. Which recording a surface plays is content, and it
 * is answered in one place — `getDemoVideoId()` over the registry in
 * `src/data/demoVideos.ts` (§11). A default here would be a second source for
 * the same fact, and the one that goes stale is always the one in a component.
 */
export function demoVideoUrlFor(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Player parameters.
 *
 * `autoplay=0` is stated rather than left to the default: a video that starts
 * itself in the last section of a page is the fastest way to make someone
 * leave it. `rel=0` keeps the end screen on our channel instead of offering
 * competitors, and `modestbranding=1` drops the YouTube wordmark from the
 * control bar so the player reads as part of the row it sits in.
 */
const PLAYER_PARAMS = "autoplay=0&rel=0&modestbranding=1&playsinline=1";

interface CtaVideoProps extends WithClassName {
  /**
   * YouTube's id for the recording this surface plays.
   *
   * Required, and read from `getDemoVideoId()` rather than typed at the call
   * site. An optional id would let a surface silently fall back to whatever
   * this component happened to hardcode, which is exactly the failure the
   * registry exists to prevent.
   */
  readonly videoId: string;
  /** What this recording is, for the frame's accessible name. */
  readonly title: string;
}

/**
 * YouTube's own embed.
 *
 * Native rather than a custom player. A bespoke one would mean owning
 * buffering, captions, quality switching and the keyboard interface, all to
 * end up somewhere behind what YouTube ships for free — and it would be a
 * client component in a section that otherwise needs no JavaScript at all.
 *
 * Framed like an embedded player and not like a card: a twelve-pixel corner,
 * one hairline, no shadow. The caller sets the width and 16:9 sets the height,
 * so the box is reserved before anything loads and the row does not jump when
 * the iframe arrives. `loading="lazy"` keeps the player's payload off the
 * critical path — this sits at the very bottom of a long page, and almost
 * nobody who lands at the top pays for it.
 *
 * `videoId` is what makes one player serve every page. Each surface has its
 * own recording, and the alternative — a component per video — would mean six
 * copies of this markup differing by eleven characters.
 *
 * `title` names *this* recording for assistive technology and for the frame's
 * accessible name. It is not decorative: a page with four embeds all titled
 * the same thing is four identically-labelled frames in a screen reader's list.
 */
export function CtaVideo({ videoId, title, className }: CtaVideoProps) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted",
        className,
      )}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?${PLAYER_PARAMS}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
