import type { ContactFieldErrors, ContactSubmission } from "@/types";

/**
 * Validation for the contact form, written once and run twice.
 *
 * The route has to validate — a POST is a POST, and the browser's `required`
 * attribute is a suggestion to anyone not using a browser. The form wants the
 * same rules so a mistake is caught before a round trip. Duplicating them in
 * both places is how the two drift until the field the client accepts is the
 * field the server rejects, so they share this module: it imports nothing from
 * `next`, touches no environment and runs identically on either side.
 *
 * The rules themselves stay deliberately loose. This is a "tell us how to
 * reach you" form, not a checkout — every rule here has to earn its place
 * against the cost of turning away a real merchant who wrote their number with
 * a space in it. So: presence, a length ceiling, and a shape check only where a
 * wrong value is unusable rather than merely unusual.
 */

/**
 * Length ceilings, which are about the mailbox rather than the merchant.
 *
 * Nobody's store domain is 300 characters; a field that accepts one is a field
 * that will eventually receive a paragraph of spam. `email` is 254 because that
 * is the addressable maximum, and `shopUrl` 253 because that is a hostname's.
 */
const MAX_LENGTH = {
  name: 100,
  phone: 32,
  email: 254,
  shopUrl: 253,
} as const;

/**
 * Digits, and how many of them.
 *
 * The number is checked on its digits alone, after the spaces, dashes,
 * brackets and leading `+` a person writes are stripped out. Seven is the
 * shortest national number in use and fifteen is E.164's ceiling, so this
 * rejects a phone field with four digits in it without also rejecting
 * `+91 98765 43210`.
 */
const PHONE_DIGITS = /\d/g;
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

/**
 * One `@`, something either side, and a dot in the domain.
 *
 * Not RFC 5322 — nothing short of sending a message proves an address exists,
 * and the elaborate regexes that claim otherwise mostly reject valid mail. This
 * catches the typo that actually happens: a missing `@` or a bare `gmail`.
 */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** A hostname with a dot in it, with any scheme or path the merchant pasted. */
const SHOP_HOST_SHAPE = /^[^\s.]+(\.[^\s.]+)+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function countDigits(value: string): number {
  return value.match(PHONE_DIGITS)?.length ?? 0;
}

/**
 * The store domain, reduced to its host.
 *
 * A merchant pastes what is in their address bar, which is as likely to be
 * `https://yourstore.myshopify.com/admin` as the bare domain. Stripping the
 * scheme, the path and a `www.` leaves the one part support needs to look the
 * store up, and means the shape check below is judging a hostname rather than
 * a URL.
 */
function shopHost(value: string): string {
  return value
    .replace(/^[a-z][\w+.-]*:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/[/?#].*$/, "")
    .replace(/\.$/, "");
}

/**
 * Reads a submission out of arbitrary JSON.
 *
 * Returns the normalised values *and* the errors rather than throwing on the
 * first bad field: a form that reports one problem, then another after the next
 * attempt, is a form people abandon. `data` is safe to use only when `errors`
 * is empty — `isValid` says so for callers that would rather ask.
 */
export function parseContactSubmission(input: unknown): {
  readonly data: ContactSubmission;
  readonly errors: ContactFieldErrors;
  readonly isValid: boolean;
} {
  const source = (
    typeof input === "object" && input !== null ? input : {}
  ) as Record<string, unknown>;

  const data: ContactSubmission = {
    name: text(source.name),
    phone: text(source.phone),
    email: text(source.email),
    shopUrl: shopHost(text(source.shopUrl)),
  };

  const errors: ContactFieldErrors = {};

  if (!data.name) {
    errors.name = "Tell us your name.";
  } else if (data.name.length > MAX_LENGTH.name) {
    errors.name = "That name is too long.";
  }

  if (!data.phone) {
    errors.phone = "We need a number to reach you on.";
  } else if (data.phone.length > MAX_LENGTH.phone) {
    errors.phone = "That number is too long.";
  } else {
    const digits = countDigits(data.phone);
    if (digits < MIN_PHONE_DIGITS || digits > MAX_PHONE_DIGITS) {
      errors.phone = "That does not look like a phone number.";
    }
  }

  // Optional, so an empty value is correct. A value that is present still has
  // to be usable — a reply-to nobody reads is worse than no address at all.
  if (data.email) {
    if (data.email.length > MAX_LENGTH.email) {
      errors.email = "That address is too long.";
    } else if (!EMAIL_SHAPE.test(data.email)) {
      errors.email = "Check that address — it looks incomplete.";
    }
  }

  if (!data.shopUrl) {
    errors.shopUrl = "Which store is this about?";
  } else if (data.shopUrl.length > MAX_LENGTH.shopUrl) {
    errors.shopUrl = "That URL is too long.";
  } else if (!SHOP_HOST_SHAPE.test(data.shopUrl)) {
    errors.shopUrl = "Use the store domain, like yourstore.myshopify.com.";
  }

  return { data, errors, isValid: Object.keys(errors).length === 0 };
}
