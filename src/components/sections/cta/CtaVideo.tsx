import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The demo video.
 *
 * The id alone, not a URL — the embed address is built from it below. Taken
 * from the share link's path (`youtu.be/<id>`); the `?si=` parameter YouTube
 * appends is share tracking and is deliberately not carried over.
 */
const VIDEO_ID = "gq2C3A0pbXY";

/**
 * The same recording on YouTube itself.
 *
 * Exported so a "watch the full demo" action anywhere on the site points at
 * the video this component embeds, rather than at a URL typed out a second
 * time that can drift from it.
 */
export const demoVideoUrl = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

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
 */
export function CtaVideo({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-xl border border-border bg-muted",
        className,
      )}
    >
      <iframe
        src={`https://www.youtube.com/embed/${VIDEO_ID}?${PLAYER_PARAMS}`}
        title="How COD King works"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
