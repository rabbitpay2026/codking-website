"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useState } from "react";

import { ActionLink } from "@/components/layout/ActionLink";
import { Logo } from "@/components/layout/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

import type { NavGroup, NavItem, PrimaryNavItem, UtilityAction } from "@/types";

interface MobileNavProps {
  readonly items: readonly PrimaryNavItem[];
  readonly controlGroups: readonly NavGroup[];
  readonly resources: readonly NavItem[];
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
 * navigation rather than a reduced copy of the desktop one: the controls are
 * grouped by order stage exactly as they are in the mega-menu, and a merchant
 * can reach any of the ten from here.
 *
 * Radix Dialog provides the parts that make a drawer trustworthy — focus is
 * trapped while open and returned to the trigger on close, the page behind
 * cannot scroll, Escape closes, and the rest of the document is hidden from
 * assistive technology.
 */
export function MobileNav({
  items,
  controlGroups,
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
            <Accordion type="multiple">
              {controlGroups.map((group) => (
                <AccordionItem key={group.title} value={group.title}>
                  <AccordionTrigger>{group.title}</AccordionTrigger>
                  <AccordionContent className="space-y-0.5 pb-3">
                    {group.items.map((control) => (
                      <Link
                        key={control.href}
                        href={control.href}
                        onClick={close}
                        className={cn(rowClass, "py-2.5 text-sm font-normal")}
                      >
                        {control.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

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
                {resources.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    onClick={close}
                    className={cn(rowClass, "text-sm font-normal")}
                  >
                    {resource.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="shrink-0 border-t border-border bg-background px-4 py-4">
            {installAction ? (
              <ActionLink action={installAction} size="lg" block />
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
