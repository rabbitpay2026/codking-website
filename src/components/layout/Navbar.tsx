import Link from "next/link";

import { Container } from "@/components/common/Container";
import { primaryNav } from "@/constants/navigation";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import { transitionClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

/**
 * Global site header.
 *
 * Links are driven by `primaryNav`, so adding a route to the navigation is a
 * data change rather than a markup change. Mobile navigation, product menus
 * and the theme toggle are deliberately deferred to a later phase.
 */
export function Navbar() {
  return (
    <header className="border-b">
      <Container
        as="nav"
        className="flex h-16 items-center justify-between gap-6"
      >
        <Link href={routes.home} className="text-base font-semibold">
          {siteConfig.name}
        </Link>

        <ul className="flex items-center gap-6">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground",
                  transitionClass.colors,
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
