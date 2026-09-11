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
  /**
   * The partner programme's sign-up, passed separately from `utilityActions`.
   *
   * It is not one of them by design — see `partnerAction` in
   * `data/navigation.ts` — so the header asks for it by name rather than
   * having it appear in every other surface that renders that list.
   */
  readonly partnerAction: UtilityAction;
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
  partnerAction,
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
            {/*
              Partner With Us, ahead of the two product actions.

              First in the row because it is the least expected of the three
              and the only one addressed to someone who is not installing
              anything — an agency, a developer or a creator — and a merchant
              reading left to right still lands on Install Free last, which is
              where §4.2 wants the eye to stop.

              Secondary weight and one size with its neighbours, so the row
              reads as three peers with the filled action closing it. The
              tighter padding below `xl` is the navbar's own established
              technique rather than a new one — `DesktopNav` takes four pixels
              off each item below `xl` for exactly this reason, and this is the
              longest label in the utility row.

              ── On the 1120px floor ──────────────────────────────────────
              The bar is full at the width the desktop nav first appears at.
              `DesktopNav` already documents that five items and the utility
              row clear a 1024px container by a margin measured in tens of
              pixels; this button is 134 of them, so below roughly 1092 the
              left group is compressed and "Contact" runs under it. That is
              measured rather than assumed — at 1024 the nav needs 616px and
              is given 548.

              The alternatives were all worse than a floor. Shrinking the
              existing two actions, or taking more padding off the five nav
              items, buys back about sixty of the sixty-seven pixels needed
              and visibly tightens a bar this brief says not to touch; letting
              it overflow puts a nav link under a button. So the button is
              withheld where it does not fit, at a floor set a little above the
              measured one so the gap between "Contact" and this button is the
              same 24px it is at `xl` rather than the 16px minimum.

              An arbitrary value rather than `xl`, because `xl` is 1280 and
              would withhold it from every viewport between 1092 and 1280 that
              has room for it — a quarter of the desktop range, and where a
              tablet in landscape sits. Below the floor the action is still on
              every page twice over: the drawer carries it under `lg`, and the
              footer and the homepage band carry it at every width.
              ─────────────────────────────────────────────────────────────
            */}
            <ActionLink
              action={partnerAction}
              size="md"
              location="header"
              className="hidden px-3 min-[1120px]:inline-flex xl:px-4"
            />

            {utilityActions.map((action) => (
              <ActionLink
                key={action.label}
                action={action}
                size="md"
                location="header"
              />
            ))}
          </div>

          <MobileNav
            items={items}
            features={megaMenu.items}
            resources={resources}
            utilityActions={utilityActions}
            partnerAction={partnerAction}
          />
        </div>
      </Container>
    </header>
  );
}
