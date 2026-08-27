import { ActionLink } from "@/components/layout/ActionLink";
import { Container } from "@/components/shared/Container";

import type { UtilityAction } from "@/types";

interface MobileActionBarProps {
  readonly actions: readonly UtilityAction[];
}

/**
 * The persistent bottom bar on small viewports (§4.4).
 *
 * The architecture asks for Install Free and WhatsApp to be visible at all
 * times on mobile rather than reachable through the drawer, because in
 * COD-heavy markets most research happens on a phone and the install is the
 * one action the whole site exists to produce.
 *
 * It sits above the safe-area inset so the actions are not under a home
 * indicator, and the layout renders a spacer of the same height after the
 * footer so the bar never covers the end of the page.
 */
export function MobileActionBar({ actions }: MobileActionBarProps) {
  if (actions.length === 0) return null;

  return (
    <div
      data-slot="mobile-action-bar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
    >
      <Container className="flex h-action-bar items-center gap-2">
        {actions.map((action) => (
          <ActionLink
            key={action.label}
            action={action}
            size="md"
            block
            location="mobile-action-bar"
          />
        ))}
      </Container>
    </div>
  );
}
