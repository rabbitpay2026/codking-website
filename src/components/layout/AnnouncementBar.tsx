"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/shared/Container";
import { storageKeys } from "@/constants/storage";

import type { Announcement } from "@/types";

interface AnnouncementBarProps {
  readonly announcement: Announcement;
}

/**
 * The dismissible bar above the header (§5.1 #1).
 *
 * It scrolls away rather than sticking: it is the lowest-priority element on
 * the page, and pinning it would cost the merchant permanent vertical space
 * on the phone screens where most COD research happens (§4.4).
 *
 * Dismissal is stored against the announcement's id, so retiring one offer and
 * publishing another re-shows the bar to everyone instead of leaving returning
 * merchants permanently blind to it.
 */
export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(
        storageKeys.announcementDismissed,
        announcement.id,
      );
    } catch {
      // Private browsing or a storage quota error. The bar still closes for
      // this visit; it simply returns on the next one.
    }
    document.documentElement.setAttribute("data-announcement", "dismissed");
    setDismissed(true);
  };

  return (
    <div
      data-slot="announcement-bar"
      className="relative border-b border-border bg-brand-soft text-ink"
    >
      <Container className="flex min-h-10 items-center justify-center gap-x-3 gap-y-1 py-2 pr-8 text-center text-sm">
        <p className="text-pretty">
          <span className="text-ink/80">{announcement.message}</span>

          {announcement.link ? (
            <Link
              href={announcement.link.href}
              className="ml-2 inline-flex items-center gap-1 rounded-sm font-medium text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
            >
              {announcement.link.label}
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          ) : null}
        </p>
      </Container>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-background/60 hover:text-ink focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
