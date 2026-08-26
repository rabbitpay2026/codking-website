import {
  BadgeCheck,
  BadgeIndianRupee,
  BadgePercent,
  ChartNoAxesCombined,
  MapPinHouse,
  MessageSquareText,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";

import type { ControlSlug } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The mark for each control.
 *
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 * These are the same ten marks the homepage board uses for the same slugs, so
 * a merchant who arrives from there recognises the capability they clicked, and
 * the mega-menu, the Features index and the feature page all draw one glyph per
 * control rather than three.
 *
 * `Partial` because the map is keyed by the closed slug union and a control may
 * arrive before its art does; the fallback is the caller's, so a control
 * promoted onto the page without a mark degrades to a default rather than to an
 * empty box. Every slug the repository holds has one today.
 */
export const featureIcons: Partial<Record<ControlSlug, LucideIcon>> = {
  "otp-verification": ShieldCheck,
  "partial-cod-payment": Wallet,
  "cod-to-prepaid": BadgePercent,
  "abandoned-cart-recovery": ShoppingCart,
  "cod-show-hide": SlidersHorizontal,
  "cod-fees": BadgeIndianRupee,
  "address-validation": MapPinHouse,
  "order-verification": BadgeCheck,
  "messaging-gateways": MessageSquareText,
  analytics: ChartNoAxesCombined,
};

/** The mark for a control with no art of its own. */
export const fallbackFeatureIcon: LucideIcon = ShieldCheck;
