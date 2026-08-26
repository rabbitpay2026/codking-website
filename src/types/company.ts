/**
 * The two company pages — About and Contact (§3.1).
 *
 * They share a type module because they share a job: neither sells a feature,
 * both answer "who is behind this and can I reach them", and both are built
 * from short titled blocks rather than from long prose.
 */

/** The opening of a section: label, headline, and the line under it. */
export interface CompanySectionCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

/**
 * One titled block inside a section — a thing we do, a problem we solve, a
 * reason to pick us.
 *
 * `id` is the icon key as well as the React key. Icons are presentation and are
 * mapped from the id in the component, the same way control marks are mapped in
 * `featureIcons.ts`, so the content record carries no JSX.
 */
export interface CompanyPoint {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/** The About hero. The headline is three statements; the middle one is coloured. */
export interface AboutHero {
  readonly eyebrow: string;
  readonly headlineLead: string;
  readonly headlineAccent: string;
  readonly headlineTail: string;
  readonly description: string;
}

/** A section built from a heading and a set of blocks. */
export interface CompanySection {
  readonly copy: CompanySectionCopy;
  readonly points: readonly CompanyPoint[];
}

/**
 * One way to reach us.
 *
 * `href` is `null` where the channel exists but has no link of its own — live
 * chat opens inside the app, not from this website — so the card renders as a
 * statement rather than as a link that goes nowhere.
 */
export interface ContactChannel {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly href: string | null;
  readonly actionLabel: string | null;
  readonly external: boolean;
}

/**
 * One field of the contact form.
 *
 * `type` is the input type verbatim, so the browser's own keyboard and
 * validation follow from the record: `tel` opens a numeric pad on a phone, and
 * `email` is checked before the submit handler ever runs. A generic `"text"`
 * for everything would have meant re-deriving all of that in the component from
 * the field's name.
 *
 * `url` is deliberately absent. A `type="url"` input rejects
 * `yourstore.myshopify.com` for want of a scheme, which is exactly how a
 * merchant writes their own store — so the shop field is plain text with
 * `autoComplete="url"`, and the browser helps without blocking the submit.
 */
export interface ContactField {
  readonly name: string;
  readonly label: string;
  readonly type: "text" | "email" | "tel";
  readonly placeholder: string;
  readonly autoComplete?: string;
  readonly required: boolean;
  /**
   * Draws the control as a `textarea` instead of an `input`.
   *
   * A flag rather than a `"textarea"` member of `type`, because `type` is
   * written straight onto the element as its HTML type attribute and a
   * textarea does not have one. This keeps every existing record untouched and
   * keeps the two concerns — what kind of value, what kind of box — apart.
   */
  readonly multiline?: boolean;
}

/**
 * The contact form's payload, once trimmed.
 *
 * Keyed by the same `name`s the fields in `data/contact.ts` declare, which is
 * what lets the route hand a per-field error map straight back to the inputs
 * that produced it.
 */
export interface ContactSubmission {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly shopUrl: string;
  /**
   * Anything else the merchant wanted to say. Optional.
   *
   * Typed as `string` rather than `string | undefined`, exactly as `email`
   * already is: the parser normalises every field to a trimmed string, so
   * "not given" is the empty string throughout and no caller has to handle two
   * shapes of absent. The mailer is what decides an empty one is not printed.
   */
  readonly note: string;
}

/** Per-field messages, keyed by field name. Absent keys are valid fields. */
export type ContactFieldErrors = Partial<
  Record<keyof ContactSubmission, string>
>;

/**
 * What `POST /api/contact` answers with.
 *
 * A failure always carries a sentence fit to render — the form shows it
 * verbatim rather than inventing one from the status code — and carries
 * `fields` only when the failure was the merchant's input rather than ours.
 */
export type ContactResponse =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly message: string;
      readonly fields?: ContactFieldErrors;
    };
