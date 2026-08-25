import { externalLinks } from "@/constants/external";
import { siteConfig } from "@/constants/site";

import type { ContactSubmission } from "@/types";

/**
 * Delivery for the contact form.
 *
 * Server-only by construction rather than by convention: nothing here is
 * exported to a client component, and every variable it reads is unprefixed, so
 * Next.js will not inline any of it into the browser bundle. The API key never
 * leaves this process.
 *
 * Resend over its HTTP API rather than its SDK, and that is the one choice
 * worth defending. The site had no mail infrastructure at all, so this was a
 * green field — and a single `fetch` to a documented JSON endpoint does
 * everything one transactional message needs while adding nothing to
 * `package.json`, nothing to the deploy, and no SMTP socket to a serverless
 * function. Swapping providers later is this file and nothing else: the route
 * knows only `sendContactMessage`.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * How long we wait on the provider before giving up.
 *
 * A merchant staring at a spinner needs an answer sooner than a socket needs to
 * time out. Ten seconds is longer than Resend has ever taken and short enough
 * that a provider outage shows the WhatsApp fallback instead of hanging.
 */
const SEND_TIMEOUT_MS = 10_000;

/**
 * Where the message goes, and who it comes from.
 *
 * `to` falls back to the mailbox the published legal pages already answer on —
 * read from `constants/external.ts` rather than retyped, so there is still one
 * support address in this codebase. `from` has no fallback and cannot have one:
 * it must be an address on a domain verified with the provider, which is a
 * deployment fact, not a code one. Guessing it produces a message the provider
 * rejects, which is a worse failure than saying it is not configured.
 */
function readConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || externalLinks.supportEmail;

  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to } as const;
}

export type SendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: "unconfigured" | "provider" };

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Everything a merchant typed is escaped before it reaches the HTML part.
 *
 * The body is assembled from untrusted input and lands in a colleague's mail
 * client, which will happily render markup. Escaping here is what keeps a
 * store URL from becoming a link nobody meant to send.
 */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]!);
}

/**
 * A subject that is useful in a list view.
 *
 * The name and the store, because those are what someone triaging a mailbox
 * sorts on. Newlines are stripped rather than escaped: a header cannot contain
 * one, and a submission carrying `\n` in the name field is trying to inject a
 * second header.
 */
function buildSubject(submission: ContactSubmission): string {
  const label = `${submission.name} — ${submission.shopUrl}`;
  return `Website enquiry: ${label.replace(/[\r\n]+/g, " ").slice(0, 160)}`;
}

function buildRows(submission: ContactSubmission): readonly [string, string][] {
  return [
    ["Name", submission.name],
    ["Phone", submission.phone],
    ["Email", submission.email || "— not given —"],
    ["Shop URL", submission.shopUrl],
  ];
}

function buildText(submission: ContactSubmission): string {
  const rows = buildRows(submission)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `New enquiry from the ${siteConfig.name} contact form.\n\n${rows}\n`;
}

function buildHtml(submission: ContactSubmission): string {
  const rows = buildRows(submission)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5b6472;font:14px system-ui,sans-serif;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#0b1b36;font:600 14px system-ui,sans-serif">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return (
    `<div style="font:14px system-ui,sans-serif;color:#0b1b36">` +
    `<p style="margin:0 0 16px">New enquiry from the ${escapeHtml(siteConfig.name)} contact form.</p>` +
    `<table role="presentation" cellpadding="0" cellspacing="0">${rows}</table>` +
    `</div>`
  );
}

/**
 * Sends one enquiry to the support mailbox.
 *
 * Never throws. A route that has to wrap this in a `try` to stay up is a route
 * that will one day forget to, so every failure — no configuration, a network
 * error, a timeout, a rejection from the provider — comes back as a value. The
 * caller only has to decide what to tell the merchant.
 */
export async function sendContactMessage(
  submission: ContactSubmission,
): Promise<SendResult> {
  const config = readConfig();
  if (!config) {
    // Said out loud, because the alternative is a 503 with nothing behind it in
    // the log and an afternoon spent looking for a bug that is a missing
    // variable on the deploy.
    console.error(
      "[contact] No mail configuration — set RESEND_API_KEY and CONTACT_EMAIL_FROM. Nothing was sent.",
    );
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: buildSubject(submission),
        text: buildText(submission),
        html: buildHtml(submission),
        // So hitting reply in the support mailbox answers the merchant rather
        // than the sending address, whenever they gave us somewhere to reply.
        ...(submission.email ? { reply_to: submission.email } : {}),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      // The provider's own message, in the server log only — it can name the
      // sending domain and the key's account, neither of which belongs in a
      // response body a browser receives.
      console.error(
        `[contact] Resend rejected the message (${response.status}): ${await response.text()}`,
      );
      return { ok: false, reason: "provider" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact] Could not reach the mail provider.", error);
    return { ok: false, reason: "provider" };
  }
}
