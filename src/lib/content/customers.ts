import { customerStories } from "@/data/customers";

import type { ControlSlug, CustomerStory } from "@/types";

export function getCustomerStories(): readonly CustomerStory[] {
  return customerStories;
}

/** Stories that credit a given control, for its proof section (§6.3). */
export function getStoriesForControl(
  slug: ControlSlug,
): readonly CustomerStory[] {
  return customerStories.filter((story) => story.controlSlugs.includes(slug));
}
