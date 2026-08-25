import { demoVideos, generalDemoVideoId } from "@/data/demoVideos";

import type { DemoVideoSurface } from "@/types";

/**
 * The recording one surface should play, as a YouTube id.
 *
 * Always returns something. A surface with no recording of its own falls back
 * to the site's general demo, so a page can be built before its video exists
 * and never renders an empty player.
 */
export function getDemoVideoId(surface: DemoVideoSurface): string {
  return demoVideos[surface] ?? generalDemoVideoId;
}

/**
 * The recording a surface has *of its own*, or nothing.
 *
 * The strict counterpart to `getDemoVideoId()` above, and the difference is
 * the whole point of it: this one never substitutes the general demo. A
 * surface that has not been given a recording gets `undefined`, and the
 * component decides what to show instead.
 *
 * That is what makes a player slot dormant rather than deleted. Two surfaces
 * are waiting for a recording — the homepage's closing band and the COD to
 * Prepaid page — and both are already wired to this function. Adding the id to
 * `demoVideos` is the entire change: the player appears, in the place and at
 * the size it was always going to occupy, with no component to edit.
 *
 * It exists because the fallback was actively wrong for those two. A review
 * flagged the COD to Prepaid page for showing the wrong video, and it was
 * showing the general demo through exactly that fallback — a real recording of
 * a different feature, under a heading promising this one.
 */
export function getRegisteredDemoVideoId(
  surface: DemoVideoSurface,
): string | undefined {
  return demoVideos[surface];
}

/**
 * The general demo, for a surface that is not one of the registered ones.
 *
 * Exported so a caller with no surface of its own — a component reused
 * somewhere the registry does not model — still reads the id from the
 * repository rather than typing it out a second time.
 */
export function getGeneralDemoVideoId(): string {
  return generalDemoVideoId;
}
