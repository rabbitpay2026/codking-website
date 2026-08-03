"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/common/Container";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { headerCta, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 12;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "border-b border-border bg-background/75 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "bg-background/55 backdrop-blur-md",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={routes.home}
          data-testid="header-logo"
          className="inline-flex items-center"
        >
          <Image
            src="/logos/cod logo.png"
            alt={siteConfig.name}
            width={885}
            height={190}
            sizes="(min-width: 1024px) 186px, 149px"
            priority
            className="h-8 w-auto lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-brand dark:text-white/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={headerCta.href}
            data-testid="header-cta"
            className="group hidden items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(25,107,245,0.22)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_18px_34px_rgba(25,107,245,0.3)] active:translate-y-0 sm:inline-flex"
          >
            {headerCta.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
            data-testid="mobile-menu-toggle"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink md:hidden dark:text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 hover:bg-secondary hover:text-brand dark:text-white/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={headerCta.href}
              onClick={() => setOpen(false)}
              data-testid="mobile-header-cta"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-deep"
            >
              {headerCta.label}
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
