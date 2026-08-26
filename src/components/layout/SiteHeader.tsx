"use client";

import { ActionLink } from "@/components/layout/ActionLink";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/shared/Container";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

import type {
  FeaturesMegaMenu,
  PrimaryNavItem,
  ResourceNavItem,
  UtilityAction,
} from "@/types";

interface SiteHeaderProps {
  readonly items: readonly PrimaryNavItem[];
  readonly megaMenu: FeaturesMegaMenu;
  readonly resources: readonly ResourceNavItem[];
  readonly utilityActions: readonly UtilityAction[];
}

/**
 * The sticky global header (§4.1, §4.2).
 *
 * Everything it renders is passed in from the server layout, which reads the
 * content repository, so the repository itself is never bundled. The client
 * boundary exists only for the two things that genuinely need the browser:
 * the scroll state and the drawer.
 *
 * The mega-menu panel mounts when it opens, so its links are not in the
 * initial HTML. That is deliberate rather than an oversight — it keeps the
 * document light, and §4.5 already makes the footer the crawlable full index
 * of the site, where all ten controls are server-rendered.
 *
 * At rest the header is part of the page. Once content scrolls beneath it, it
 * earns a hairline border and a denser blur, which is the whole of the
 * treatment: a header that changes height or animates on scroll draws
 * attention away from the page it is meant to frame.
 */
export function SiteHeader({
  items,
  megaMenu,
  resources,
  utilityActions,
}: SiteHeaderProps) {
  const scrolled = useScrolled();

  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-40",
        "transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-emphasized)]",
        scrolled
          ? "border-b border-border bg-background/85 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur-xl"
          : "border-b border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <Container className="relative flex h-header items-center justify-between gap-4">
        {/* Tighter below `xl`, where the bar is at its narrowest. */}
        <div className="flex items-center gap-4 xl:gap-6">
          <Logo priority />
          <DesktopNav items={items} megaMenu={megaMenu} resources={resources} />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2">
            {/*
              Both actions at one size. The row used to hold a third — Log in,
              drawn a step smaller so it read as a text link beside two buttons
              — and with it gone the pair are peers, so the size is a constant
              rather than a decision made per action.
            */}
            {utilityActions.map((action) => (
              <ActionLink key={action.label} action={action} size="md" />
            ))}
          </div>

          <MobileNav
            items={items}
            features={megaMenu.items}
            resources={resources}
            utilityActions={utilityActions}
          />
        </div>
      </Container>
    </header>
  );
}
