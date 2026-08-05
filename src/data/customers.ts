import type { CustomerStory } from "@/types";

/**
 * Named merchant stories, reused on the homepage, control pages, and the
 * Customers page (§11).
 *
 * Empty until stories are collected and permission to name each merchant is
 * confirmed. §10.1 requires every claim to point at a source, so an anonymous
 * story is not publishable and the shape reflects that by requiring a name.
 *
 * App Store reviews are not listed here — they are synced rather than stored
 * (§11) and are served by the proof repository.
 */
export const customerStories: readonly CustomerStory[] = [];
