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
}
