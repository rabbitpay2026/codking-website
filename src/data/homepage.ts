import { routes } from "@/constants/routes";

import type {
  ControlBoardCard,
  HowItWorksStep,
  OutcomeMetric,
  PainPoint,
  PainPointsCopy,
  TrustedBrand,
} from "@/types";

/**
 * The hidden costs of COD (§5.1 #4).
 *
 * Every pain point names the control that removes it, so the section states a
 * problem and its fix in the same breath rather than leaving the merchant to
 * work out which feature applies to them (§6.4).
 */
export const painPoints: readonly PainPoint[] = [
  {
    id: "fake-orders",
    title: "Fake orders",
    body: "Fraudsters place cash orders they never intend to accept, and are gone by the time the parcel arrives.",
    controlSlug: "otp-verification",
  },
  {
    id: "rto",
    title: "High RTO",
    body: "Non-serious buyers refuse at the door. Freight out, freight back, and the packaging in between.",
    controlSlug: "partial-cod-payment",
  },
  {
    id: "prepaid",
    title: "Low prepaid share",
    body: "Most buyers default to cash, so working capital rides around in a van until the courier settles.",
    controlSlug: "cod-to-prepaid",
  },
];

/**
 * The problem section's own words.
 *
 * The titles above are deliberately the plain names a merchant already uses for
 * these — fake orders, RTO, prepaid share — rather than a more evocative
 * rewrite of them. This section's job is recognition, and recognition needs the
 * merchant's vocabulary, not ours. The line each card carries is what turns the
 * familiar name into a number leaving the business.
 */
export const painPointsCopy: PainPointsCopy = {
  title: "Why COD is killing your margins",
  description:
    "It arrives in pieces — freight out, a refused parcel back, working capital riding around in a van. Item by item it looks like the cost of doing business.",
  callout: "Every fake order costs shipping, packaging and reverse logistics.",
};

/**
 * Published results (§5.1 #3).
 *
 * Stated as the product states them — as ceilings, not averages — because a
 * figure a merchant cannot reproduce costs more trust than it buys (§10.1).
 */
export const outcomeMetrics: readonly OutcomeMetric[] = [
  {
    id: "fake-orders",
    value: 35,
    suffix: "%",
    label: "Fewer fake and RTO orders",
    caption: "Ceiling, once verification is switched on.",
  },
  {
    id: "sms-cost",
    value: 70,
    suffix: "%",
    label: "Saved on messaging",
    caption: "Ceiling, on a local messaging provider.",
  },
  {
    id: "roi",
    value: 3,
    prefix: "2–",
    suffix: "x",
    label: "Return within 30 days",
    caption: "Reported by merchants in month one.",
  },
];

/**
 * How long setup takes, in minutes (§5.1 #7).
 *
 * The one figure in the scale band that is not a proof metric. It is the same
 * claim the setup section makes, held here so the two cannot drift.
 */
export const setupMinutes = 10;

/**
 * Stores using COD King, shown as a logo wall (§5.1 #3).
 *
 * These are the merchants' own marks, supplied as artwork, not lockups drawn
 * for this page — a logo wall is a claim about someone else's brand, so the
 * shipped version has to be the version they handed over.
 *
 * Every file is trimmed to the artwork's own bounding box before it lands in
 * `public/logos/merchants`. Press-kit exports usually carry generous built-in
 * padding (Casio's arrived as a 350px wordmark inside a 1080px frame), and a
 * wall that respects that padding renders one brand a third the size of its
 * neighbours. The untouched downloads are kept in `assets/brand-source`.
 *
 * `width`/`height` are the rendered box, balanced by eye rather than set to a
 * shared height — see `BrandLogo`.
 */
export const trustedBrands: readonly TrustedBrand[] = [
  {
    id: "casio",
    name: "Casio",
    logo: { src: "/logos/merchants/casio.png", width: 130, height: 24 },
  },
  {
    id: "himalaya",
    name: "Himalaya Herbals",
    logo: { src: "/logos/merchants/himalaya.png", width: 117, height: 40 },
  },
  {
    id: "redtape",
    name: "RedTape",
    logo: { src: "/logos/merchants/redtape.png", width: 131, height: 38 },
  },
  {
    id: "slobberman",
    name: "Slobberman",
    logo: { src: "/logos/merchants/slobberman.png", width: 191, height: 22 },
  },
  {
    id: "qwerty-cases",
    name: "Qwerty Cases",
    logo: { src: "/logos/merchants/qwerty-cases.png", width: 138, height: 38 },
  },
];

/**
 * The homepage feature list (§5.1 #6).
 *
 * One list, read twice: the hero's checklist beside the headline and the
 * capability board further down the page are the same ten entries in the same
 * order, so a rename happens here and nowhere else. They used to be two
 * declarations — a slug list for the hero and a card list for the board — and
 * two lists of the same thing are two lists that eventually disagree.
 *
 * `label` and `blurb` are the homepage's own words rather than the control
 * record's `name` and `outcome`, which is the distinction `ControlBoardCard`
 * exists to carry: a record is named for the merchant already inside the
 * admin, a homepage card has one line to be understood by someone who has
 * never seen the product.
 *
 * The order is the order a bad COD order meets them: verified, confirmed,
 * priced, filtered by risk, moved to prepaid, addressed, messaged, measured,
 * recovered.
 *
 * Every one of the ten now has a feature page of its own, so every card on the
 * board and every line of the hero checklist is a link to something finished
 * rather than to the generic template.
 *
 * Every entry is resolved by slug against the controls repository before it
 * renders — one naming a control that does not exist is dropped rather than
 * shown, so neither surface can promise something the feature pages do not
 * carry.
 */
export const homepageFeatures: readonly ControlBoardCard[] = [
  {
    slug: "otp-verification",
    label: "OTP Verification",
    blurb: "Verify customers with OTP to block fake orders.",
  },
  {
    slug: "order-verification",
    label: "COD Verification",
    blurb: "Confirm, hold or cancel COD orders before they ship.",
  },
  {
    slug: "partial-cod-payment",
    label: "Partial Payment",
    blurb: "Collect advance payment to confirm serious orders.",
  },
  {
    slug: "cod-fees",
    label: "COD Fees",
    blurb: "Add COD charges to reduce non-serious orders.",
  },
  {
    /*
      Labelled for the outcome rather than for the setting. This is the
      control the product documents as the one that reduces RTO — it restricts
      cash on delivery for risky pin codes, risky locations and customers with
      a history of cancellations — and "Smart RTO Detection" is the name the
      review asks the homepage to use for it. The record it resolves to, and
      therefore the page it links to, is unchanged.
    */
    slug: "cod-show-hide",
    label: "Smart RTO Detection",
    blurb: "Restrict COD for high-risk locations, customers and orders.",
  },
  {
    slug: "cod-to-prepaid",
    label: "COD to Prepaid",
    blurb: "Offer discounts to customers who choose prepaid.",
  },
  {
    slug: "address-validation",
    label: "Prefilled Addresses",
    blurb: "Fetch customer details from their phone number or past orders.",
  },
  {
    /*
      Named for the channel rather than for the subsystem, and the review was
      explicit about it: this card is "Branded WhatsApp & SMS". A merchant
      reading a homepage board is being told what reaches their buyer, not
      which provider account carries it — the routing is the same control's
      other half, and the Features menu and its own page publish it under the
      name it is sold as, Local SMS Gateway Integration.

      One card, not two. There is exactly one control behind both halves and a
      second entry pointing at the same page would be the board advertising the
      same feature twice.
    */
    slug: "messaging-gateways",
    label: "Branded WhatsApp & SMS",
    blurb: "Send order updates, OTP and notifications via WhatsApp or SMS.",
  },
  {
    slug: "analytics",
    label: "Analytics & Insights",
    blurb: "Track performance and make data-driven decisions.",
  },
  {
    slug: "abandoned-cart-recovery",
    label: "Abandoned Cart",
    blurb: "Recover lost sales with smart WhatsApp reminders.",
  },
];

/** The board's own heading. */
export const controlBoardTitle = "Everything you need to control COD";

/**
 * The two things the board's opening says beyond the heading itself.
 *
 * `eyebrow` is the hero's own words for the product — "The Complete COD
 * Management Platform for Shopify Brands" — reduced to the noun. A label above
 * a heading has one job, which is to say what class of thing is below it, and
 * borrowing the phrase the top of the page already used means the section is
 * introduced in the site's vocabulary rather than in a new one written for it.
 *
 * `titleAccent` is the tail of `controlBoardTitle` and nothing else: the board
 * draws the heading with its last two words in brand, and this is the
 * substring it splits on. Held as data rather than as a character count in the
 * markup, so rewording the heading cannot silently colour the wrong half — a
 * tail that no longer occurs simply renders the heading in one colour.
 *
 * There is no description here. The section reads `siteConfig.description`,
 * which is the product's own one-line definition and is already what the
 * Features page prints under this same heading; a second sentence written for
 * the homepage would be the two surfaces introducing one set of controls
 * differently.
 */
export const controlBoardCopy = {
  eyebrow: "COD Management Platform",
  titleAccent: "control COD",
} as const;

/**
 * The two sentences the closing WhatsApp demonstration says in words.
 *
 * The block beside the questions shows six automated messages arriving over a
 * cash-on-delivery order, and a demonstration that shows without saying leaves
 * the visitor to work out what they are looking at. These are the caption: what
 * the merchant gets, and when.
 *
 * The sequence itself — the messages, their order and their timing — is the
 * mock the scene plays rather than copy the page owns, so it lives beside the
 * component in `components/sections/cta/whatsapp/messages.ts`. Only these two
 * lines are content, and only these two are read through the repository.
 *
 * Neither claims anything new. Branded WhatsApp and SMS updates are what the
 * homepage board already calls this control, and "every stage of the customer
 * journey" is a description of the six stages the demonstration draws — each
 * of which is a capability published on its own feature page.
 */
export const whatsappJourneyCopy = {
  title: "Have complete control over WhatsApp in simple steps",
  description:
    "Automate every customer update from verification to fulfilment.",
} as const;

/**
 * Setup, stated with the effort it actually takes (§5.1 #7).
 *
 * Four steps, and only two of them are work. That is the argument: the merchant
 * installs and configures, and from there the sequence carries on without them
 * — a buyer orders, the product acts. Stating the last two steps as things that
 * happen rather than things to do is the whole reason the flow is four long
 * instead of two.
 */
export const howItWorksSteps: readonly HowItWorksStep[] = [
  {
    id: "install",
    title: "Install app",
    body: "Install COD King from the Shopify App Store.",
  },
  {
    id: "configure",
    title: "Configure rules",
    body: "Set OTP, COD fees, partial payment and other rules.",
  },
  {
    id: "order",
    title: "Customer places order",
    body: "Customer places the order on your Shopify store.",
  },
  {
    id: "protect",
    title: "COD King protects every order",
    body: "We verify, collect, validate and help you grow.",
  },
];

/** The flow's own heading. */
export const howItWorksTitle = "How COD King works";

/** The integrations board's own heading (§3.1). */
export const platformsCopy = {
  title: "Connect your marketing & communication platforms",
  /**
   * The words the heading's accent lands on.
   *
   * Held here rather than spanned in the markup for the reason
   * `controlBoardCopy.titleAccent` is: the heading is data, so a rewording that
   * no longer contains this phrase simply fails to match and the line renders
   * in one colour — rather than leaving the accent on words that have moved.
   *
   * The qualifier rather than the noun. "Platforms" is the generic half of the
   * phrase and every board on this page is a board of something; what a
   * merchant is scanning for is which *kind*.
   */
  titleAccent: "marketing & communication",
  description: "COD King works seamlessly with your favorite tools.",
} as const;

/** Where the homepage sends a merchant who wants to size the problem (§5.1 #4). */
export const calculatorHref = routes.codCalculator;
