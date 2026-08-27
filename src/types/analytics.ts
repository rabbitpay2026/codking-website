/**
 * The analytics domain — every event this site is allowed to send, and every
 * parameter it may attach to one.
 *
 * Both are closed unions rather than free-form strings, and that is the whole
 * point of the file. GA4 accepts any event name and any parameter, which means
 * a typo produces a second event that looks like the first one in a report, and
 * a careless spread produces a column of customer email addresses in a
 * warehouse nobody meant to put them in. Neither compiles here.
 *
 * The parameter keys below are deliberately the only ones that exist. There is
 * no key for a name, an address, a phone number, an email, a store URL or a
 * figure a merchant typed into the calculator, so no caller can send one —
 * counts and identifiers are the most specific thing this site measures.
 */

/**
 * The events this site sends.
 *
 * `page_view` is GA4's own name for the automatic event, sent by hand here
 * because the tag is configured not to send it (see
 * `components/analytics/GoogleAnalytics.tsx`). The rest are custom.
 */
export const ANALYTICS_EVENTS = [
  "page_view",

  /** Install Free on Shopify — the primary action on every page (§4.2). */
  "install_free_click",
  /** Book a Demo — the secondary action beside it. */
  "book_demo_click",
  /** A link into the contact page from somewhere else on the site. */
  "contact_click",
  /** Any WhatsApp thread opened from the site. */
  "whatsapp_click",
  /** Try Live Demo Store — the public storefront running the product. */
  "demo_store_click",

  /** First interaction with the contact form, and a delivered submission. */
  "contact_form_start",
  "contact_form_submit",

  /** First edit to the COD calculator, and every business input answered. */
  "cod_calculator_start",
  "cod_calculator_complete",

  /** A feature page and the pricing page, viewed. */
  "feature_view",
  "pricing_view",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

/** What a parameter may hold. Objects are not sent — GA4 flattens them badly. */
export type AnalyticsParamValue = string | number | boolean;

/**
 * Every parameter key in use, and there are no others.
 *
 * `page_*` are GA4's own reserved names for a page view. The rest are this
 * site's: `button_name` and `location` say which control was pressed and which
 * band of which page it sat in, `feature_*` identify a control page,
 * `form_name` and `calculator_name` identify the surface rather than its
 * contents, and `fields_completed` is a count — never the numbers counted.
 */
export type AnalyticsParamKey =
  | "page_path"
  | "page_location"
  | "page_title"
  | "button_name"
  | "location"
  | "feature_name"
  | "feature_slug"
  | "form_name"
  | "calculator_name"
  | "fields_completed";

export type AnalyticsEventParams = Partial<
  Record<AnalyticsParamKey, AnalyticsParamValue>
>;

/**
 * The `gtag.js` surface, as this site uses it.
 *
 * Hand-declared rather than pulled from `@types/gtag.js`: four commands and one
 * global are not worth a dependency, and a narrow signature is what makes the
 * parameter union above binding at every call site.
 */
export type GtagCommand = "js" | "config" | "set" | "event";

export type Gtag = (
  command: GtagCommand,
  target: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    /** The queue the Google tag drains. Created by the inline snippet. */
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}
