import Link from "next/link";

import { Container } from "@/components/common/Container";
import { siteConfig } from "@/constants/site";
import { transitionClass } from "@/constants/theme";
import { footerGroups } from "@/data/footer";
import { cn } from "@/lib/utils";

/**
 * Global site footer.
 *
 * Columns are generated from `footerNav`. Rendered on the server, so the
 * copyright year is resolved at request/build time without shipping JS.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <Container as="div" className="flex flex-col gap-10 py-12">
        <div className="flex flex-wrap gap-12">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((item) => (
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
            </nav>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
