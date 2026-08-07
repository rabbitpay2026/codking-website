import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { storageKeys } from "@/constants/storage";
import {
  getAnnouncement,
  getFeaturesMegaMenu,
  getMobileActions,
  getPrimaryNav,
  getResourcesNav,
  getUtilityActions,
} from "@/lib/content";

import type { WithChildren } from "@/types";

/**
 * The marketing shell (§4).
 *
 * Every page in the §3 sitemap renders inside it, in the order the
 * architecture specifies: announcement bar, header, content, footer, with the
 * persistent mobile action bar overlaying the bottom of the viewport.
 *
 * All navigation content is read here, on the server, and handed to the
 * components as plain data. The header needs a client boundary for its scroll
 * state and drawer, but the reading stays server-side, so the repository is
 * never bundled and every navigation link ships in the initial HTML.
 */
export default function SiteLayout({ children }: WithChildren) {
  const announcement = getAnnouncement();

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      {announcement ? (
        <>
          {/*
            Runs before first paint, so a merchant who already dismissed this
            announcement never sees it flash in and collapse. The matching CSS
            rule lives in globals.css; the key is shared with the component so
            the two cannot drift.
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `try{if(localStorage.getItem(${JSON.stringify(storageKeys.announcementDismissed)})===${JSON.stringify(announcement.id)}){document.documentElement.setAttribute("data-announcement","dismissed")}}catch(e){}`,
            }}
          />
          <AnnouncementBar announcement={announcement} />
        </>
      ) : null}

      <SiteHeader
        items={getPrimaryNav()}
        megaMenu={getFeaturesMegaMenu()}
        resources={getResourcesNav()}
        utilityActions={getUtilityActions()}
      />

      <main id="main" className="flex-1">
        {children}
      </main>

      <SiteFooter />

      <MobileActionBar actions={getMobileActions()} />
      {/* Keeps the fixed action bar from covering the end of the page. */}
      <div aria-hidden className="h-action-bar lg:hidden" />
    </>
  );
}
