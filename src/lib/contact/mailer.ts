import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

import { externalLinks } from "@/constants/external";
import { siteConfig } from "@/constants/site";

import type { ContactSubmission } from "@/types";

/**
 * Delivery for the contact form, over Amazon SES.
 *
 * Server-only by construction rather than by convention: nothing here is
 * exported to a client component, and every variable it reads is unprefixed, so
 * Next.js will not inline any of it into the browser bundle. The AWS
 * credentials never leave this process, and there is no `NEXT_PUBLIC_*` name
 * anywhere in this file by design.
 *
 * The SDK rather than a signed `fetch`, and here that is the easy call. The
 * previous provider took a bearer token on a JSON endpoint, so one `fetch` did
 * the whole job; SES speaks SigV4, and hand-rolling a request signer — canonical
 * requests, a derived signing key, clock skew — to save a dependency would be
 * trading a maintained implementation for a subtle one. `@aws-sdk/client-sesv2`
 * is the official client and is scoped to SES alone rather than the whole SDK.
 *
 * Swapping providers again is this file and nothing else: the route knows only
 * `sendContactMessage` and the `SendResult` union below, neither of which
 * mentions a vendor.
 */

/**
 * How long we wait on SES before giving up.
 *
 * A merchant staring at a spinner needs an answer sooner than a socket needs to
 * time out. Ten seconds bounds the whole call including retries, and is long
 * enough that only an outage reaches it — at which point the form shows the
 * WhatsApp fallback instead of hanging.
 */
const SEND_TIMEOUT_MS = 10_000;

/**
 * Two attempts, not the SDK's default three.
 *
 * The default is tuned for a background job that would rather finish late than
 * fail. This is a person waiting on a form: one retry covers a dropped
 * connection, and a third would mostly spend the timeout budget above without
 * changing the outcome.
 */
const MAX_ATTEMPTS = 2;

interface MailConfig {
  readonly region: string;
  readonly from: string;
  readonly to: string;
  /**
   * Absent when the deployment supplies credentials some other way — see
   * `readConfig`.
   */
  readonly credentials?: {
    readonly accessKeyId: string;
    readonly secretAccessKey: string;
  };
}

/**
 * Where the message goes, who it comes from, and what signs for it.
 *
 * `to` falls back to the mailbox the published legal pages already answer on —
 * read from `constants/external.ts` rather than retyped, so there is still one
 * support address in this codebase. `from` has no fallback and cannot have one:
 * it must be an address or domain verified in SES, which is a deployment fact,
 * not a code one. Guessing it produces a message SES rejects, which is a worse
 * failure than saying it is not configured. `region` likewise — SES identities
 * are per-region, so the wrong region is not a smaller mistake than none.
 *
 * The credentials are the one part treated as optional, and deliberately.
 * `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are what a local machine and
 * most CI use, and when both are present they are passed explicitly. When
 * neither is, the client is left to the SDK's own credential chain, which is
 * what picks up the task or instance role on a container host — the site
 * already deploys to one. Demanding static keys there would mean minting a
 * long-lived secret for something the platform hands out automatically and
 * rotates on its own.
 *
 * The failure mode of that choice is honest: with no keys and no role, the send
 * fails at the SDK rather than here, and the log below says which.
 */
function readConfig(): MailConfig | null {
  const region = process.env.CODK_AWS_REGION?.trim();
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || externalLinks.supportEmail;

  if (!region || !from || !to) return null;

  return {
    region,
    from,
    to,
    ...(accessKeyId && secretAccessKey
      ? { credentials: { accessKeyId, secretAccessKey } }
      : {}),
  };
}

/**
 * One client, kept for the life of the process.
 *
 * Built on first use rather than at import, so a module that is merely loaded —
 * by a build, by a type check, by a route that is never called — does not
 * construct an AWS client or resolve a credential chain. Reused afterwards
 * because the connection pool underneath it is the whole reason not to build a
 * new one per message.
 *
 * The configuration it captures comes from the environment, which does not
 * change while the process is alive, so there is nothing to invalidate.
 */
let client: SESv2Client | undefined;

function getClient(config: MailConfig): SESv2Client {
  client ??= new SESv2Client({
    region: config.region,
    maxAttempts: MAX_ATTEMPTS,
    ...(config.credentials ? { credentials: config.credentials } : {}),
  });

  return client;
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
 * What we are willing to write down about a failure.
 *
 * An AWS error carries a `$metadata` and, on some paths, the request that
 * produced it. Serialising the whole object into a log is how an account id, an
 * identity ARN or a signed header ends up somewhere it was never meant to be,
 * so the three fields that actually help are pulled out by name and the rest is
 * dropped. `name` is the part that matters — `MessageRejected`,
 * `NotAuthorized`, `AccessDenied` and `CredentialsProviderError` each point at
 * a different line of the runbook.
 */
function describeError(error: unknown): string {
  if (typeof error !== "object" || error === null) return String(error);

  const { name, message } = error as { name?: string; message?: string };
  const status = (error as { $metadata?: { httpStatusCode?: number } })
    .$metadata?.httpStatusCode;

  return [name ?? "Error", status ? `(${status})` : "", message ?? ""]
    .filter(Boolean)
    .join(" ");
}

/**
 * Sends one enquiry to the support mailbox.
 *
 * Never throws. A route that has to wrap this in a `try` to stay up is a route
 * that will one day forget to, so every failure — no configuration, a network
 * error, a timeout, a rejection from SES — comes back as a value. The caller
 * only has to decide what to tell the merchant.
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
      "[contact] No mail configuration — set CODK_AWS_REGION and CONTACT_EMAIL_FROM. Nothing was sent.",
    );
    return { ok: false, reason: "unconfigured" };
  }

  try {
    await getClient(config).send(
      new SendEmailCommand({
        FromEmailAddress: config.from,
        Destination: { ToAddresses: [config.to] },
        // So hitting reply in the support mailbox answers the merchant rather
        // than the sending address, whenever they gave us somewhere to reply.
        ...(submission.email ? { ReplyToAddresses: [submission.email] } : {}),
        Content: {
          Simple: {
            Subject: { Data: buildSubject(submission), Charset: "UTF-8" },
            Body: {
              Text: { Data: buildText(submission), Charset: "UTF-8" },
              Html: { Data: buildHtml(submission), Charset: "UTF-8" },
            },
          },
        },
      }),
      // Bounds the whole call, retries included, rather than each attempt.
      { abortSignal: AbortSignal.timeout(SEND_TIMEOUT_MS) },
    );

    return { ok: true };
  } catch (error) {
    // SES's own message, in the server log only — it can name the sending
    // identity and the account, neither of which belongs in a response body a
    // browser receives.
    console.error(
      `[contact] SES rejected the message: ${describeError(error)}`,
    );
    return { ok: false, reason: "provider" };
  }
}
