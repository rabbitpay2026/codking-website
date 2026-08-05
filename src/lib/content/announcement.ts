import { announcement } from "@/data/announcement";

import type { Announcement } from "@/types";

/**
 * The announcement to render, or `null` when there is none (§5.1 #1).
 *
 * Returning `null` rather than an inactive record keeps the decision here:
 * the shell renders nothing at all instead of an empty bar that still
 * occupies space.
 */
export function getAnnouncement(): Announcement | null {
  return announcement.active ? announcement : null;
}
