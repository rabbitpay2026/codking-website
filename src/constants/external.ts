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
 * The company behind the product, and the mailbox its legal pages publish.
 *
 * Both are read off the Terms & Conditions and Privacy Policy published on
 * codking.tech, which name Notifik Technologies as the operator and
 * `support@notifiktech.com` as the address for questions about either
 * document. They live here rather than in the legal copy for the reason every
 * other destination does: a mailbox retyped in two documents is a mailbox that
 * eventually differs between them.
 *
 * The registered address and the contracting entity's full legal name are
 * deliberately absent — the published documents do not state them, and a legal
 * page is the last place to guess.
 */
export const legalEntityName = "Notifik Technologies";
const SUPPORT_EMAIL = "support@notifiktech.com";

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
 * The public demo storefront.
 *
 * A real Shopify store running COD King, where anyone can take the
 * cash-on-delivery checkout themselves without installing anything. It is a
 * published destination, so it is the fallback rather than a blank — the same
 * treatment the App Store listing gets.
 *
 * Deliberately *not* `bookDemo`, and the two are not interchangeable.
 * `bookDemo` is a request to speak to someone and is reserved for the booking
 * tool that will eventually answer it; this is a storefront that asks the
 * visitor for nothing. Pointing either one at the other's destination would
 * strand a merchant who wanted the other thing.
 *
 * The host is published separately for the same reason the WhatsApp number is:
 * a storefront card showing `codking.store` is worth more than one showing the
 * full product URL with its variant id.
 */
const DEMO_STORE =
  "https://codking.store/products/the-collection-snowboard-hydrogen?variant=42518544777334";
export const demoStoreDisplayHost = "codking.store";

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
  /** Secondary action on the persistent mobile bar (§4.4). */
  whatsapp: externalUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL, WHATSAPP_CONTACT),

  /** The address the published legal documents answer on. */
  supportEmail: externalUrl(
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    SUPPORT_EMAIL,
  ),

  /**
   * The live demo storefront (§4.2). Never the booking action — see
   * `DEMO_STORE` above for why the two stay separate.
   */
  demoStore: externalUrl(process.env.NEXT_PUBLIC_DEMO_STORE_URL, DEMO_STORE),

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
