import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { routes } from "@/constants/routes";

import type { NavItem, WithClassName } from "@/types";

interface FeatureBreadcrumbProps extends WithClassName {
  /** The control's own name, which is also the current page. */
  readonly current: string;
}

/** Home → Features → this control. Fixed, so the pages pass only their name. */
const FEATURE_TRAIL: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Features", href: routes.features },
];

/**
 * The trail every feature page opens with (§4.6).
 *
 * The rendering lives in `Breadcrumb`, which the legal and company pages use
 * too. What stays here is the one thing that is specific to a feature page: its
 * ancestors are always Home and Features, so a page supplies its own name and
 * nothing else and no two feature pages can disagree about where they sit.
 */
export function FeatureBreadcrumb({
  current,
  className,
}: FeatureBreadcrumbProps) {
  return (
    <Breadcrumb trail={FEATURE_TRAIL} current={current} className={className} />
  );
}
