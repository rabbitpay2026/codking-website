import {
  BadgeIndianRupee,
  BadgePercent,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";

import type { ControlSlug } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The mark for each control on this page.
 *
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 * The marks match the homepage board's for the same slugs, so a merchant who
 * arrives from there recognises the capability they clicked.
 *
 * `Partial` because only the controls this page lists need one; the fallback
 * is the caller's, so a control promoted onto the page without art degrades to
 * a default rather than to an empty box.
 */
export const featureIcons: Partial<Record<ControlSlug, LucideIcon>> = {
  "otp-verification": ShieldCheck,
  "partial-cod-payment": Wallet,
  "cod-to-prepaid": BadgePercent,
  "abandoned-cart-recovery": ShoppingCart,
  "cod-rules": SlidersHorizontal,
  "cod-fees": BadgeIndianRupee,
};

/** The mark for a control with no art of its own. */
export const fallbackFeatureIcon: LucideIcon = ShieldCheck;
