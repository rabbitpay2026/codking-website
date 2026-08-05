"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";

import { cn } from "@/lib/utils";

import type { FeaturesMegaMenu, NavItem, PrimaryNavItem } from "@/types";

interface DesktopNavProps {
  readonly items: readonly PrimaryNavItem[];
  readonly megaMenu: FeaturesMegaMenu;
  readonly resources: readonly NavItem[];
}

const triggerClass = cn(
  "group inline-flex h-10 items-center gap-1 rounded-full px-3",
  "text-sm font-medium text-foreground/80",
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
      <NavigationMenu.List className="flex items-center gap-0.5">
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

                <NavigationMenu.Content className="absolute inset-x-0 top-full mt-2">
                  <div className={panelClass}>
                    <div className="grid grid-cols-4 gap-x-6 gap-y-8">
                      {megaMenu.columns.map((column) => (
                        <div key={column.title}>
                          <p className="px-2.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                            {column.title}
                          </p>

                          <ul className="mt-2 space-y-0.5">
                            {column.items.map((control) => (
                              <li key={control.href}>
                                <NavigationMenu.Link asChild>
                                  <Link
                                    href={control.href}
                                    className={itemLinkClass}
                                  >
                                    <span className="block text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                                      {control.label}
                                    </span>
                                    {control.description ? (
                                      <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted-foreground">
                                        {control.description}
                                      </span>
                                    ) : null}
                                  </Link>
                                </NavigationMenu.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

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

                <NavigationMenu.Content className="absolute top-full left-0 mt-5 w-[24rem]">
                  <ul className={cn(panelClass, "space-y-0.5 p-3")}>
                    {resources.map((resource) => (
                      <li key={resource.href}>
                        <NavigationMenu.Link asChild>
                          <Link href={resource.href} className={itemLinkClass}>
                            <span className="block text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                              {resource.label}
                            </span>
                            {resource.description ? (
                              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                {resource.description}
                              </span>
                            ) : null}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
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
