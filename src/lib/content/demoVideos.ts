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
 * The general demo, for a surface that is not one of the registered ones.
 *
 * Exported so a caller with no surface of its own — a component reused
 * somewhere the registry does not model — still reads the id from the
 * repository rather than typing it out a second time.
 */
export function getGeneralDemoVideoId(): string {
  return generalDemoVideoId;
}
