import { routes } from "@/constants/routes";

import type { Announcement } from "@/types";

/**
 * The current announcement (§5.1 #1).
 *
 * It points at the COD Calculator rather than at the install: a merchant who
 * has not yet seen their own number is not ready to be asked for the install,
 * and the calculator is the site's main lead magnet (§8). Set `active: false`
 * to retire the bar; change `id` to re-show a new one to everyone.
 */
export const announcement: Announcement = {
  id: "cod-calculator-2026-08",
  message: "Find out what COD is costing you — free, no signup.",
  link: {
    label: "Open the COD Calculator",
    href: routes.codCalculator,
  },
  active: true,
};
