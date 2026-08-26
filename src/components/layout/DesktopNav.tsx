"use client";

import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";

import { FeatureMark } from "@/components/features/FeatureMark";
import { NavLink } from "@/components/layout/NavLink";
import { resourceNavIcons } from "@/components/layout/resourceNavIcons";
import { cn } from "@/lib/utils";

import type {
  FeaturesMegaMenu,
  PrimaryNavItem,
  ResourceNavItem,
} from "@/types";

interface DesktopNavProps {
  readonly items: readonly PrimaryNavItem[];
  readonly megaMenu: FeaturesMegaMenu;
  readonly resources: readonly ResourceNavItem[];
}

/**
 * `whitespace-nowrap` and the tighter padding below `xl` are one decision.
 *
 * The bar carries five items and three actions, and at exactly 1024 — the
 * width this nav first appears at — the natural set is about 40px wider than
 * the container. Flex resolved that by shrinking the widest item until "COD
 * Calculator" broke across two lines inside a 40px pill, which is the one
 * failure a header must not have. Taking four pixels of padding off each item
 * below `xl` buys back more than the deficit, and the `nowrap` makes the
 * guarantee explicit: these labels are single-line at every width, and any
 * future item that does not fit fails loudly instead of wrapping quietly.
 */
const triggerClass = cn(
  "group inline-flex h-10 items-center gap-1 rounded-full px-2 xl:px-3",
  "text-sm font-medium whitespace-nowrap text-foreground/80",
  "transition-colors duration-200 ease-[var(--ease-emphasized)]",
  "hover:bg-accent hover:text-accent-foreground",
  "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
);

const panelClass = cn(
  "rounded-2xl border border-border bg-popover p-6 shadow-overlay",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
);

const itemLinkClass = cn(
  "group block rounded-xl px-2.5 py-2",
  "transition-colors duration-200 ease-[var(--ease-emphasized)]",
  "hover:bg-accent",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
);

/**
 * Primary navigation for pointer-and-keyboard viewports (§4.1).
 *
 * Radix NavigationMenu supplies the behaviour that is genuinely hard to get
 * right by hand: hover intent, Escape to close with focus returned to the
 * trigger, arrow-key traversal, and the correct roles throughout.
 *
 * Both panels are absolutely positioned, but against different boxes. The
 * Features panel anchors to the header's container — hence the `static` Root,
 * which lets its `absolute` resolve against the container instead — so a
 * four-column menu opens edge to edge with the page grid. The Resources panel
 * anchors to its own item, because a narrow card floating at the page edge
 * would read as detached from the word that opened it.
 *
 * Nothing here is authored: every item comes from the content repository, so
 * the menu, the footer and the feature pages cannot list different controls.
 */
export function DesktopNav({ items, megaMenu, resources }: DesktopNavProps) {
  return (
    <NavigationMenu.Root
      className="static hidden lg:flex"
      aria-label="Primary"
      delayDuration={80}
    >
      <NavigationMenu.List className="flex items-center gap-0 xl:gap-0.5">
        {items.map((item) => {
          if (item.behaviour === "mega-menu") {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Trigger className={triggerClass}>
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>

                {/*
                  Sized and centred rather than stretched.

                  `inset-x-0` cannot work here: Radix wraps the list in its own
                  `position: relative` indicator track, and an inline style
                  cannot be overridden from a class — so an edge-to-edge panel
                  resolves against the width of the nav items instead of the
                  page, which is what squeezed six features into 420px. Giving
                  the panel its own measure and centring it on the trigger is
                  independent of that box, and the `100vw` clamp keeps it on
                  screen at every width the desktop nav appears at.
                */}
                <NavigationMenu.Content className="absolute top-full left-1/2 mt-2 w-[min(47rem,calc(100vw-2rem))] -translate-x-1/2">
                  <div className={panelClass}>
                    {/*
                      Two across, and as many rows as the repository holds. The
                      Features page's own order, read as a menu: each row is one
                      feature with its mark, so the set is scanned by icon and
                      name rather than read as four headed lists grouped by
                      order stage.

                      The panel grew from three rows to five when the four
                      controls that had no page of their own gained one. Nothing
                      about its width or its type had to change — a row is 2.5rem
                      of content in a 47rem panel, and five of them clear the
                      header with room under the viewport at every width the
                      desktop nav appears at.
                    */}
                    <ul className="grid grid-cols-2 gap-1">
                      {megaMenu.items.map((feature) => (
                        <li key={feature.href}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={feature.href}
                              className={cn(itemLinkClass, "flex gap-3 p-2.5")}
                            >
                              <FeatureMark
                                slug={feature.slug}
                                className="size-9 rounded-lg"
                              />

                              <span className="min-w-0">
                                <span className="block text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                                  {feature.label}
                                </span>
                                {feature.description ? (
                                  <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted-foreground">
                                    {feature.description}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
                      {megaMenu.footerLinks.map((link, index) => (
                        <NavigationMenu.Link asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-md px-1 text-sm font-medium",
                              "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                              index === 0
                                ? "text-muted-foreground hover:text-foreground"
                                : "text-brand hover:text-brand-deep",
                            )}
                          >
                            {link.label}
                            <ArrowRight aria-hidden className="size-3.5" />
                          </Link>
                        </NavigationMenu.Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          if (item.behaviour === "dropdown") {
            return (
              <NavigationMenu.Item key={item.href} className="relative">
                <NavigationMenu.Trigger className={triggerClass}>
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>

                {/*
                  Two rows, so the panel is sized to its contents rather than to
                  a grid it does not fill. `left-0` anchors it under the word
                  that opened it, and at 19rem it cannot reach either edge of
                  the viewport at any width the desktop nav appears at.
                */}
                <NavigationMenu.Content className="absolute top-full left-0 mt-5 w-[19rem]">
                  <ul className={cn(panelClass, "space-y-0.5 p-2")}>
                    {resources.map((resource) => {
                      const Icon = resourceNavIcons[resource.icon];

                      return (
                        <li key={resource.href}>
                          <NavigationMenu.Link asChild>
                            <NavLink
                              item={resource}
                              className={cn(itemLinkClass, "flex gap-3 p-2.5")}
                            >
                              <span
                                aria-hidden
                                className="grid size-9 shrink-0 place-items-center rounded-lg border border-ink/[0.08] bg-brand-soft text-brand transition-colors group-hover:border-brand/25"
                              >
                                <Icon className="size-4.5" />
                              </span>

                              <span className="min-w-0">
                                <span className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                                  {resource.label}
                                  {/*
                                    Marks the destination as off-site, and only
                                    when it is one — the FAQ is a page of this
                                    site, and an outbound glyph beside it would
                                    promise a new tab that never opens. It moves
                                    a pixel on hover in the direction it points,
                                    which is the whole animation.
                                  */}
                                  {resource.external ? (
                                    <ArrowUpRight
                                      aria-hidden
                                      className="size-3.5 text-muted-foreground transition-[transform,color] duration-200 ease-[var(--ease-emphasized)] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-brand"
                                    />
                                  ) : null}
                                </span>
                                {resource.description ? (
                                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                    {resource.description}
                                  </span>
                                ) : null}
                              </span>
                            </NavLink>
                          </NavigationMenu.Link>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Link asChild>
                <Link href={item.href} className={triggerClass}>
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
