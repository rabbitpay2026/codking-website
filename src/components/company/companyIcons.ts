import {
  BadgePercent,
  Banknote,
  CircleAlert,
  Gauge,
  Headset,
  LifeBuoy,
  MessageCircle,
  PackageX,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/**
 * The mark for each block on the company pages.
 *
 * Keyed by the point's id, so the content records in `src/data/about.ts` carry
 * no JSX and a copy change never means picking art. Same arrangement as
 * `featureIcons.ts`, and deliberately the same glyphs where a block names a
 * control the feature pages already have a mark for — a merchant reading About
 * should recognise the icon when they land on the feature page.
 */
export const companyIcons: Record<string, LucideIcon> = {
  // What we do.
  verify: ShieldCheck,
  commit: Wallet,
  control: SlidersHorizontal,
  convert: BadgePercent,

  // The problem.
  "fake-orders": CircleAlert,
  rto: PackageX,
  "cash-flow": Banknote,
  abandoned: ShoppingCart,

  // How we help. `verify`, `commit` and `convert` reuse the marks above, since
  // each answers the beat it shares a name with.
  recover: ShoppingCart,

  // Why merchants choose us.
  "shopify-native": Store,
  setup: Gauge,
  messaging: MessageCircle,
  measurable: TrendingUp,
  support: Headset,
  scale: LifeBuoy,
};

/** Drawn when a block's id has no mark of its own. */
export const fallbackCompanyIcon: LucideIcon = ShieldCheck;
