import { parseContactSubmission } from "@/lib/contact/submission";
import { sendContactMessage } from "@/lib/contact/mailer";

import type { ContactResponse } from "@/types";
import type { NextRequest } from "next/server";

/**
 * `POST /api/contact` — the endpoint behind the contact form (§3.1).
 *
 * A route handler rather than a Server Action, for one reason: the form needs
 * to distinguish "your phone number is wrong" from "our mail provider is down"
 * and render each differently, and a status code plus a typed body says that
 * plainly. It is also the only shape a non-browser caller could use, and this
 * is a public contact form.
 *
 * Every response is a `ContactResponse`, so the client parses one thing.
 * Nothing the provider or the runtime says about *why* a send failed reaches
 * the browser — that goes to the server log, and the merchant gets a sentence
 * they can act on.
 */

/**
 * Never prerendered, never cached: it reads a request body and sends mail.
 * Declared rather than inferred so the intent survives a config change.
 */
export const dynamic = "force-dynamic";

/**
 * A ceiling on the body, checked before it is read.
 *
 * Four short fields cannot come to 8KB. Refusing a larger body outright means a
 * hostile caller cannot make this route buffer a megabyte of JSON it was only
 * ever going to reject on length.
 */
const MAX_BODY_BYTES = 8 * 1024;

/**
 * A best-effort throttle, per address, in this process's memory.
 *
 * Honest about what it is: serverless runtimes give each instance its own map
 * and recycle them, so this is not a guarantee and is not written as though it
 * were. What it does do is stop one browser — or one loop — from turning a
 * public form into a mailbox flood, which is the failure that actually happens.
 * A real limiter belongs at the edge, and this is not a substitute for one.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 } as const;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter(
    (at) => now - at < RATE_LIMIT.windowMs,
  );

  // Prune as we go. Without this the map is a slow leak on a long-lived
  // instance — one entry per address that ever submitted, kept forever.
  if (recent.length === 0) attempts.delete(key);
  else attempts.set(key, recent);

  if (recent.length >= RATE_LIMIT.max) return true;

  attempts.set(key, [...recent, now]);
  return false;
}

/**
 * The caller's address, as the proxy in front of us reports it.
 *
 * Spoofable, and that is fine for what it gates — a throttle, not
 * authorisation. Anything unattributable shares the `unknown` bucket rather
 * than escaping the limit.
 */
function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function json(body: ContactResponse, status: number): Response {
  return Response.json(body, { status });
}

export async function POST(request: NextRequest): Promise<Response> {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return json(
      { ok: false, message: "That message is too long to send." },
      413,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "We could not read that message." }, 400);
  }

  // The browser has already enforced `required` and the field types by now, and
  // none of that counts: this runs the same rules the form ran, because a POST
  // does not have to come from the form.
  const { data, errors, isValid } = parseContactSubmission(payload);
  if (!isValid) {
    return json(
      {
        ok: false,
        message: "Check the highlighted fields and send it again.",
        fields: errors,
      },
      422,
    );
  }

  // Counted here rather than at the top of the handler, so the limit counts
  // messages sent and not mistakes corrected. A merchant who mistypes their
  // store URL three times has cost the mailbox nothing, and a form that starts
  // refusing them for it is a form that punishes the wrong person.
  if (isRateLimited(clientKey(request))) {
    return json(
      {
        ok: false,
        message:
          "That is a few messages in a short time. Give it a few minutes, or message us on WhatsApp.",
      },
      429,
    );
  }

  const result = await sendContactMessage(data);

  if (!result.ok) {
    // 503 for both: the message did not go, and it was not the merchant's
    // fault either way. The two are told apart in the log, not in the reply —
    // "the mailbox is not configured" is our problem to read, not theirs.
    return json(
      {
        ok: false,
        message:
          "We could not send that just now. Try again in a moment, or message us on WhatsApp.",
      },
      503,
    );
  }

  return json({ ok: true }, 200);
}
