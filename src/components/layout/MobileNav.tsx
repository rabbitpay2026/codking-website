"use client";

import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useState } from "react";

import { ActionLink } from "@/components/layout/ActionLink";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { resourceNavIcons } from "@/components/layout/resourceNavIcons";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

import type {
  NavItem,
  PrimaryNavItem,
  ResourceNavItem,
  UtilityAction,
} from "@/types";

interface MobileNavProps {
  readonly items: readonly PrimaryNavItem[];
  readonly features: readonly NavItem[];
  readonly resources: readonly ResourceNavItem[];
  readonly utilityActions: readonly UtilityAction[];
}

const rowClass = cn(
  "flex items-center justify-between rounded-xl px-2 py-3 text-base font-medium text-foreground",
  "transition-colors hover:bg-accent hover:text-accent-foreground",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
);

/**
 * Full-screen navigation for phones and small tablets (§4.4).
 *
 * Mobile is the primary experience in COD-heavy markets, so this is a real
 * navigation rather than a reduced copy of the desktop one: it lists the same
 * six features the desktop menu offers, in the same order, and closes with the
 * link to the page carrying all of them.
 *
 * Radix Dialog provides the parts that make a drawer trustworthy — focus is
 * trapped while open and returned to the trigger on close, the page behind
 * cannot scroll, Escape closes, and the rest of the document is hidden from
 * assistive technology.
 */
export function MobileNav({
  items,
  features,
  resources,
  utilityActions,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);

  // Close whenever the route changes, including on browser back/forward where
  // no link was clicked. Adjusting state during render rather than in an
  // effect avoids the extra render pass an effect would cost, and the guard
  // means it runs once per navigation.
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    if (open) setOpen(false);
  }

  // Tapping a link to the page you are already on does not change the
  // pathname, so links close the drawer directly as well.
  const close = () => setOpen(false);

  const directLinks = items.filter((item) => item.behaviour === "link");
  const loginAction = utilityActions.find(
    (action) => action.variant === "link",
  );
  const installAction = utilityActions.find(
    (action) => action.variant === "primary",
  );
  // Book a Demo has no place on the persistent bottom bar (§4.4 gives its two
  // slots to Install and WhatsApp), so the drawer is the only surface where a
  // merchant on a phone can find it.
  const demoAction = utilityActions.find(
    (action) => action.variant === "secondary",
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="lg:hidden"
        >
          <Menu aria-hidden className="size-5" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden" />

        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-background lg:hidden",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <div className="flex h-header shrink-0 items-center justify-between border-b border-border px-4">
            <Logo />
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X aria-hidden className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          {/*
            Labelled distinctly from the desktop navigation: the desktop list
            stays in the DOM behind the drawer, and two nav landmarks sharing
            one name is ambiguous to a screen-reader user browsing by landmark.
          */}
          <nav
            aria-label="Site navigation"
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
          >
            <p className="px-2 text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Features
            </p>
            <div className="mt-1">
              {features.map((feature) => (
                <Link
                  key={feature.href}
                  href={feature.href}
                  onClick={close}
                  className={cn(rowClass, "py-2.5 text-sm font-normal")}
                >
                  {feature.label}
                </Link>
              ))}
            </div>

            <Link
              href={routes.features}
              onClick={close}
              className={cn(rowClass, "mt-2 text-sm text-brand")}
            >
              All features
              <ArrowRight aria-hidden className="size-4" />
            </Link>

            <div className="mt-4 border-t border-border pt-2">
              {directLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={rowClass}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="px-2 text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Resources
              </p>
              <div className="mt-1">
                {resources.map((resource) => {
                  const Icon = resourceNavIcons[resource.icon];

                  return (
                    <NavLink
                      key={resource.href}
                      item={resource}
                      onClick={close}
                      className={cn(rowClass, "text-sm font-normal")}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon
                          aria-hidden
                          className="size-4 shrink-0 text-muted-foreground"
                        />
                        {resource.label}
                      </span>
                      {/* Off-site only. The FAQ is a page of this site. */}
                      {resource.external ? (
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 shrink-0 text-muted-foreground"
                        />
                      ) : null}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="shrink-0 border-t border-border bg-background px-4 py-4">
            {installAction ? (
              <ActionLink action={installAction} size="lg" block />
            ) : null}

            {demoAction ? (
              <ActionLink
                action={demoAction}
                size="md"
                block
                className="mt-2"
              />
            ) : null}

            {loginAction ? (
              <div className="mt-2 text-center">
                <ActionLink action={loginAction} size="sm" />
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
