import { proxyDocumentation } from "@/lib/documentation/proxy";

import type { NextRequest } from "next/server";

/**
 * Every documentation page below the front one (§7).
 *
 * A catch-all because the documentation nests to whatever depth its authors
 * choose — `/documentation/support/faq`, `/documentation/local-sms-gateway/…`
 * — and this site does not hold the list. The slug is handed to the proxy as
 * the path to request upstream, so a page published in the documentation is
 * reachable here the moment it exists, with no change to this repository.
 *
 * See `proxyDocumentation` for how the addresses are translated.
 */

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/documentation/[...slug]">,
) {
  const { slug } = await context.params;
  return proxyDocumentation(request, slug);
}

export async function HEAD(
  request: NextRequest,
  context: RouteContext<"/documentation/[...slug]">,
) {
  const { slug } = await context.params;
  return proxyDocumentation(request, slug);
}
