/**
 * Keys for values persisted in the browser.
 *
 * Namespaced so they cannot collide with anything a third-party script writes,
 * and centralised because the announcement key is read in two places that must
 * agree: the dismiss handler in the component, and the pre-paint inline script
 * in the site layout that stops a dismissed bar from flashing on load.
 */
export const storageKeys = {
  announcementDismissed: "codking:announcement-dismissed",
} as const;
