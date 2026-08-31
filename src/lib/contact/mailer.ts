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
}

/**
 * Where the message goes and who it comes from. Not what signs for it.
 *
 * `to` falls back to the mailbox the published legal pages already answer on —
 * read from `constants/external.ts` rather than retyped, so there is still one
 * support address in this codebase. `from` has no fallback and cannot have one:
 * it must be an address or domain verified in SES, which is a deployment fact,
 * not a code one. Guessing it produces a message SES rejects, which is a worse
 * failure than saying it is not configured. `region` likewise — SES identities
 * are per-region, so the wrong region is not a smaller mistake than none.
 *
 * ── Credentials are not read here, and must not be ───────────────────────
 * There is deliberately no `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` in
 * this function. Credentials are the SDK's job, resolved through its default
 * provider chain, and the chain is strictly better at it than anything this
 * file could assemble by hand.
 *
 * The previous version read those two variables and, when both were present,
 * passed them to the client explicitly. That is correct for a long-lived IAM
 * user key and wrong everywhere else, because it silently drops the third
 * component. A role-based runtime — Amplify's SSR compute, a Lambda, an ECS
 * task — publishes *temporary* credentials under those same two names plus
 * `AWS_SESSION_TOKEN`, and temporary credentials without their session token
 * do not sign: SES answers `UnrecognizedClientException`. So the old code took
 * the platform's own role credentials, threw a third of them away, and
 * presented the remainder as if they were static keys. It worked on a laptop
 * with a user key in `.env.local` and could not work on the deploy.
 *
 * Passing `credentials` also *overrides* the chain, so the SDK never got the
 * chance to resolve them correctly. Reading none of them is what fixes both
 * environments at once: the chain's own env provider picks up the same
 * `.env.local` keys Next.js loads into `process.env` locally, and picks up the
 * role — session token included, refreshed on expiry — in production.
 *
 * If there is no usable identity at all the send fails at the SDK rather than
 * here, and the log at the foot of this file names it
 * (`CredentialsProviderError`) rather than swallowing it.
 * ──────────────────────────────────────────────────────────────────────────
 */
type ConfigResult =
  { readonly config: MailConfig } | { readonly missing: readonly string[] };

function readConfig(): ConfigResult {
  const region = process.env.CODK_AWS_REGION?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const toVar = process.env.CONTACT_EMAIL_TO?.trim();
  const to = toVar || externalLinks.supportEmail;

  // Which ones, not just how many. "Something is unset" costs an afternoon of
  // reading a console that shows all three set — because the console shows the
  // *build* environment, and this runs in the SSR one. Naming them turns that
  // afternoon into a line in CloudWatch.
  if (!region || !from || !to) {
    return {
      missing: [
        ...(region ? [] : ["CODK_AWS_REGION"]),
        ...(from ? [] : ["CONTACT_EMAIL_FROM"]),
        ...(to ? [] : ["CONTACT_EMAIL_TO"]),
      ],
    };
  }

  // Said out loud because the fallback is silent otherwise, and silent is the
  // problem: with `CONTACT_EMAIL_TO` unset the send still succeeds and still
  // reports `ok`, having delivered to the legal pages' support address rather
  // than the mailbox someone is sitting watching. A message that arrived
  // somewhere else looks exactly like a message that never arrived.
  if (!toVar) {
    console.warn(
      "[contact] CONTACT_EMAIL_TO is unset at runtime — falling back to the " +
        "published support address. Enquiries will NOT go to the configured " +
        "recipient, and under the SES sandbox the fallback must itself be a " +
        "verified identity or SES answers MessageRejected.",
    );
  }

  return { config: { region, from, to } };
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
 *
 * Caching the client is only safe *because* no credentials are passed to it.
 * The SDK's provider chain lives inside the client and refreshes an expiring
 * role credential on its own; a static credential object handed in here would
 * be captured once and then held past its expiry for the life of the process,
 * which on a warm serverless instance is exactly long enough to start failing.
 * Region, retry policy and nothing else.
 */
let client: SESv2Client | undefined;

function getClient(config: MailConfig): SESv2Client {
  if (!client) {
    // Once per process, and the region by name — never an address, never a
    // credential. Region is the field worth printing: SES identities are
    // per-region, so an identity verified in the wrong one fails exactly like
    // an identity that was never verified, and this line is what tells the two
    // apart without opening the SES console.
    //
    // `warn` rather than `info` because `warn` and `error` are the two the
    // project's lint config lets through, and CloudWatch does not grade them
    // differently anyway — this is a deploy-diagnostic line, not an alarm.
    console.warn(
      `[contact] SES region configured: ${config.region} — FROM configured: true, TO configured: true.`,
    );

    client = new SESv2Client({
      region: config.region,
      maxAttempts: MAX_ATTEMPTS,
    });
  }

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

/**
 * The message, as label-and-value pairs, for both parts to render.
 *
 * The note is appended only when there is one. It is not given the "— not
 * given —" treatment `email` gets, and the difference is deliberate: an absent
 * reply-to changes how the person triaging the mailbox has to answer, so it is
 * worth a line saying so, whereas an absent note changes nothing and a row
 * announcing that the merchant had nothing to add is noise in every message
 * that does not have one.
 *
 * It goes last, after the four things support needs to act, because it is the
 * only row whose length is unbounded — putting it above `Shop URL` would push
 * the store domain off the first screen of a long enquiry.
 */
function buildRows(submission: ContactSubmission): readonly [string, string][] {
  return [
    ["Name", submission.name],
    ["Phone", submission.phone],
    ["Email", submission.email || "— not given —"],
    ["Shop URL", submission.shopUrl],
    ...(submission.note
      ? ([["Note", submission.note]] as [string, string][])
      : []),
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
 * `Display Name <someone@example.com>` reduced to the address alone.
 *
 * `CONTACT_EMAIL_FROM` may carry a display name, which is right for a header
 * and wrong in running text — "Best regards, COD King <info@…>" reads like a
 * mail client leaked into the copy. The header keeps the configured value
 * verbatim; only the signature uses this.
 */
function bareAddress(value: string): string {
  return value.match(/<([^>]+)>/)?.[1]?.trim() ?? value.trim();
}

/**
 * The acknowledgement the customer receives.
 *
 * Deliberately not a copy of the internal mail. It quotes back only what the
 * customer themselves wrote, so it carries nothing they did not already know:
 * no internal recipient, no routing, no reference the support desk uses. The
 * merchant's own note is echoed because seeing their words repeated is what
 * makes an acknowledgement feel like a receipt rather than an autoresponder —
 * and it is skipped entirely when they left the note empty, since a heading
 * over a blank quote reads like something was lost.
 */
function buildConfirmationSubject(): string {
  return `We've received your enquiry — ${siteConfig.name}`;
}

function buildConfirmationText(
  submission: ContactSubmission,
  from: string,
): string {
  const enquiry = submission.note
    ? `\n\nYour enquiry:\n${submission.note}`
    : "";

  return (
    `Hi ${submission.name},\n\n` +
    `Thank you for reaching out to ${siteConfig.name}.\n\n` +
    "We've successfully received your enquiry and our team will review it " +
    "shortly. We'll get back to you as soon as possible." +
    `${enquiry}\n\n` +
    "If you have any additional information you'd like to share, simply " +
    "reply to this email.\n\n" +
    `Best regards,\n${siteConfig.name} Team\n${bareAddress(from)}\n`
  );
}

/**
 * The same palette and type stack the internal mail uses, so both messages
 * look like they came from the same company. Inline styles because a mail
 * client is not a browser and a `<style>` block is the first thing stripped.
 */
function buildConfirmationHtml(
  submission: ContactSubmission,
  from: string,
): string {
  const enquiry = submission.note
    ? `<p style="margin:0 0 8px;color:#5b6472">Your enquiry:</p>` +
      `<blockquote style="margin:0 0 24px;padding:12px 16px;border-left:3px solid #0b1b36;background:#f6f7f9;color:#0b1b36;white-space:pre-wrap">${escapeHtml(submission.note)}</blockquote>`
    : "";

  return (
    `<div style="font:14px system-ui,sans-serif;color:#0b1b36;line-height:1.6;max-width:560px">` +
    `<p style="margin:0 0 16px">Hi ${escapeHtml(submission.name)},</p>` +
    `<p style="margin:0 0 16px">Thank you for reaching out to ${escapeHtml(siteConfig.name)}.</p>` +
    `<p style="margin:0 0 24px">We've successfully received your enquiry and our team will review it shortly. We'll get back to you as soon as possible.</p>` +
    enquiry +
    `<p style="margin:0 0 24px">If you have any additional information you'd like to share, simply reply to this email.</p>` +
    `<p style="margin:0;color:#5b6472">Best regards,<br />` +
    `<strong style="color:#0b1b36">${escapeHtml(siteConfig.name)} Team</strong><br />` +
    `${escapeHtml(bareAddress(from))}</p>` +
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
 * One SES send, for either of the two messages.
 *
 * Extracted so the second message did not arrive as a second copy of the
 * command, the timeout, the abort signal and the three log lines — two
 * transcriptions of that block would drift the first time one of them was
 * tuned, and the retry policy is exactly the thing that must not differ
 * between them.
 *
 * `label` is what the log calls this message. It is a fixed word rather than
 * the recipient, because the customer's address is theirs and does not belong
 * in a log line — "confirmation" says everything an operator needs.
 *
 * Never throws, for the same reason `sendContactMessage` does not: the caller
 * is orchestrating two sends and deciding what a failure of each one means,
 * which is a decision about values, not about exceptions.
 */
interface OutboundMessage {
  readonly config: MailConfig;
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly replyTo?: string;
  readonly label: "internal" | "confirmation";
}

async function dispatch(message: OutboundMessage): Promise<{ ok: boolean }> {
  const { config, label, replyTo } = message;

  try {
    console.warn(
      `[contact] Calling SES SendEmail (${label}) — region ${config.region}, reply-to ${
        replyTo ? "set" : "not set"
      }.`,
    );

    const response = await getClient(config).send(
      new SendEmailCommand({
        FromEmailAddress: config.from,
        Destination: { ToAddresses: [message.to] },
        ...(replyTo ? { ReplyToAddresses: [replyTo] } : {}),
        Content: {
          Simple: {
            Subject: { Data: message.subject, Charset: "UTF-8" },
            Body: {
              Text: { Data: message.text, Charset: "UTF-8" },
              Html: { Data: message.html, Charset: "UTF-8" },
            },
          },
        },
      }),
      // Bounds the whole call, retries included, rather than each attempt.
      { abortSignal: AbortSignal.timeout(SEND_TIMEOUT_MS) },
    );

    console.warn(
      `[contact] SES accepted the ${label} message. MessageId: ${
        response.MessageId ?? "(none returned — anomalous)"
      }`,
    );

    return { ok: true };
  } catch (error) {
    // SES's own message, in the server log only — it can name the sending
    // identity and the account, neither of which belongs in a response body a
    // browser receives.
    console.error(
      `[contact] SES rejected the ${label} message: ${describeError(error)}`,
    );
    return { ok: false };
  }
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
  // Proves the route reached the mailer at all, before any branch below can
  // return early. Without it, "no log line" is ambiguous between "the mailer
  // never ran" and "the mailer ran and said nothing".
  console.warn("[contact] sendContactMessage entered.");

  const configResult = readConfig();
  if ("missing" in configResult) {
    // Said out loud, because the alternative is a 503 with nothing behind it in
    // the log and an afternoon spent looking for a bug that is a missing
    // variable on the deploy.
    //
    // The pointer at Amplify is here rather than in a runbook because this is
    // the one failure whose cause is invisible from the console: the variables
    // *are* set there, on the app, and the console shows them set. They reach
    // the build container and stop, and the SSR runtime this code executes in
    // never sees them unless `amplify.yml` copies them into `.env.production`
    // first. Anyone reading this line is looking at a console that disagrees
    // with it, so the line has to say why.
    console.error(
      `[contact] No mail configuration — unset in the SSR runtime: ${configResult.missing.join(", ")}. ` +
        "Amplify console variables reach the build only; amplify.yml must write them to " +
        ".env.production for the server runtime to read them. Nothing was sent.",
    );
    return { ok: false, reason: "unconfigured" };
  }

  const config = configResult.config;

  // The team's copy first, and everything after it is contingent on this one
  // landing. The order is the requirement: an enquiry the team never receives
  // is a lost customer, while a missing acknowledgement is an inconvenience —
  // so the message that must not be lost goes first, and the merchant is only
  // told "sent" once it has been.
  const internal = await dispatch({
    config,
    to: config.to,
    subject: buildSubject(submission),
    text: buildText(submission),
    html: buildHtml(submission),
    // So hitting reply in the support mailbox answers the merchant rather
    // than the sending address, whenever they gave us somewhere to reply.
    replyTo: submission.email || undefined,
    label: "internal",
  });

  if (!internal.ok) return { ok: false, reason: "provider" };

  // The acknowledgement, and only when there is somewhere to send it.
  //
  // `email` is the one optional contact field, normalised to the empty string
  // when the merchant left it blank, so this guard is the whole of "validate
  // before attempting": a non-empty value has already been shape-checked by
  // `parseContactSubmission`, and re-checking it here would be a second copy of
  // a rule that exists precisely once on purpose.
  if (submission.email) {
    const confirmation = await dispatch({
      config,
      to: submission.email,
      subject: buildConfirmationSubject(),
      text: buildConfirmationText(submission, config.from),
      html: buildConfirmationHtml(submission, config.from),
      // No reply-to: a reply to an acknowledgement should reach the support
      // address it came from, which is what omitting this leaves it doing.
      label: "confirmation",
    });

    // Logged, and deliberately not returned. The enquiry is already with the
    // team, so reporting the submission as failed would be false twice over: it
    // would send the merchant to WhatsApp to repeat a message that arrived, and
    // it would tell support to expect nothing while the enquiry sits in their
    // mailbox. Only the acknowledgement was lost, and nobody is blocked on it.
    if (!confirmation.ok) {
      console.error(
        "[contact] The enquiry reached the team; the customer acknowledgement did not. " +
          "The enquiry itself needs no resend — only the acknowledgement was lost.",
      );
    }
  }

  return { ok: true };
}
