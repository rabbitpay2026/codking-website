import type { WithChildren } from "@/types";

/**
 * The marketing shell.
 *
 * Every page in the §3 sitemap lives in this group, and every one of them
 * carries the same chrome: the announcement bar, the four-item header with its
 * Features mega-menu, the persistent mobile action bar, and the footer index
 * (§4). Those are built in the site-shell phase and mount here.
 *
 * The group exists now, before that phase, for one reason: it means the shell
 * arrives without moving fifteen route directories, and a future route that
 * must not carry the chrome — a shared calculator report, an embed — can sit
 * outside the group without unpicking anything.
 */
export default function SiteLayout({ children }: WithChildren) {
  return <main className="flex-1">{children}</main>;
}
