/**
 * Destinations that live outside this site.
 *
 * The architecture makes Install Free the primary action on every page (§4.2),
 * pointing at the Shopify App Store listing. These URLs differ between staging
 * and production and are owned by the business, not by the codebase, so they
 * are read from the environment with an inert fallback.
 *
 * A missing value resolves to `null` rather than `"#"`, so a component can
 * render a disabled state instead of a link that silently goes nowhere.
 */
/**
 * The overloads are what let a caller know whether a destination can be
 * missing. Given a published fallback the result is a `string`, so navigation
 * data can hold it without every consumer re-checking for null; given none it
 * stays `string | null` and the UI renders a disabled state.
 */
function externalUrl(value: string | undefined, fallback: string): string;
function externalUrl(value: string | undefined, fallback?: null): string | null;
function externalUrl(
  value: string | undefined,
  fallback: string | null = null,
): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/**
 * Where a published destination is already known, it is the fallback rather
 * than a blank. The App Store listing and the WhatsApp number are public and
 * live on codking.tech today, so the primary action works out of the box; the
 * environment variable still wins, which is what staging needs.
 */
const SHOPIFY_APP_LISTING =
  "https://apps.shopify.com/cash-on-delivery-cod-order-confirmation";

/**
 * The support number, and the sentence a merchant arrives in the thread with.
 *
 * Built rather than pasted as one encoded string. `wa.me` wants the message
 * percent-encoded, and a hand-encoded URL is the kind of thing that survives
 * exactly until someone edits the copy and leaves a literal space in it —
 * which produces a link that opens WhatsApp to an empty chat and looks fine
 * until a merchant taps it.
 *
 * The number is also published as a readable string, because a contact card
 * showing `+91 91307 51989` is worth more than one showing a URL.
 */
const WHATSAPP_NUMBER = "919130751989";
export const whatsappDisplayNumber = "+91 91307 51989";
const WHATSAPP_MESSAGE =
  "Hi, I just visited your website and would like more details about COD King.";
const WHATSAPP_CONTACT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/**
 * The social profiles.
 *
 * Published destinations, so they are the fallback rather than a blank — the
 * same treatment the App Store listing gets. Overridable from the environment
 * for the same reason: these are the business's accounts, not the codebase's.
 */
const YOUTUBE_CHANNEL = "https://www.youtube.com/@cod-king-shopify";
const FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=61583322967006";
const INSTAGRAM_PROFILE = "https://www.instagram.com/codkingshopify";

/**
 * Documentation and the blog are separate properties on their own subdomains,
 * not sections of this site. They are declared here — once — so the header
 * dropdown, the mobile drawer and the footer all read the same destination.
 *
 * The blog is not live yet. It is still a single value rather than a disabled
 * state: the subdomain is decided, and when it publishes, this line is the only
 * edit the site needs.
 */
const DOCS_SITE = "https://docs.codking.tech/";
const BLOG_SITE = "https://codking-blogs.mintlify.site/blog";

export const externalLinks = {
  /** Primary conversion target — the Shopify App Store listing (§1, §4.2). */
  install: externalUrl(
    process.env.NEXT_PUBLIC_SHOPIFY_APP_URL,
    SHOPIFY_APP_LISTING,
  ),
  /**
   * Secondary action, offered mainly to larger merchants (§1, §9.4).
   * There is no external booking tool, so this resolves to the contact page.
   */
  bookDemo: externalUrl(process.env.NEXT_PUBLIC_BOOK_DEMO_URL, "/contact"),
  /** Existing merchants signing in to the app (§4.2). */
  login: externalUrl(process.env.NEXT_PUBLIC_APP_LOGIN_URL),
  /** Secondary action on the persistent mobile bar (§4.4). */
  whatsapp: externalUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL, WHATSAPP_CONTACT),

  /** Setup and configuration reference, on its own subdomain (§7). */
  docs: externalUrl(process.env.NEXT_PUBLIC_DOCS_URL, DOCS_SITE),
  /** Product updates and news, on its own subdomain (§7). */
  blog: externalUrl(process.env.NEXT_PUBLIC_BLOG_URL, BLOG_SITE),

  /** Where the product demonstrates itself — setup walkthroughs and features. */
  youtube: externalUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL, YOUTUBE_CHANNEL),
  facebook: externalUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL, FACEBOOK_PAGE),
  instagram: externalUrl(
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    INSTAGRAM_PROFILE,
  ),
} as const;

export type ExternalLinkKey = keyof typeof externalLinks;
