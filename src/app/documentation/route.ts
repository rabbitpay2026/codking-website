import { proxyDocumentation } from "@/lib/documentation/proxy";

import type { NextRequest } from "next/server";

/**
 * The documentation's own front page, at `codking.tech/documentation` (§7).
 *
 * Its nested pages are served by the catch-all beside this file. The two are
 * separate route files rather than one optional catch-all because Next derives
 * its route types from the file tree, and an optional catch-all registers only
 * its bracketed form — which would leave the literal `/documentation` unusable
 * as a checked `Route` in `constants/routes.ts` and in every link to it.
 *
 * Both files defer to `proxyDocumentation`, which is where the whole
 * arrangement is explained.
 */

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  return proxyDocumentation(request);
}

export function HEAD(request: NextRequest) {
  return proxyDocumentation(request);
}
