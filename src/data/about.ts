import type { AboutHero, CompanySection, CompanySectionCopy } from "@/types";

/**
 * The About page (§3.1).
 *
 * Everything here is the product's own positioning, restated: COD King is a
 * Shopify app for managing cash-on-delivery orders — verifying them, taking
 * money upfront, deciding when COD is offered at all, converting it to prepaid,
 * and recovering the carts that never became orders.
 *
 * There is no founding story, no headcount, no office, and no funding line,
 * because none of those are published anywhere this site can read them. An
 * About page that invents a garage and a year is the fastest way to make a
 * merchant distrust every other number on the site. What it says instead is
 * what the product does and why that is worth doing, which is the part we can
 * stand behind — and the live figures it does show are the proof repository's,
 * the same objects the homepage and the feature pages render.
 */
export const aboutHero: AboutHero = {
  eyebrow: "About COD King",
  headlineLead: "We build the controls",
  headlineAccent: "cash on delivery",
  headlineTail: "was always missing.",
  description:
    "COD is how a large share of the world buys online, and Shopify was never built to manage it. COD King is the layer that fills the gap — verification, upfront payments, rules and recovery — so a cash order behaves like a prepaid one.",
};

/** What the product is, stated as four things it actually does. */
export const aboutMission: CompanySection = {
  copy: {
    eyebrow: "What we do",
    title: "One app for the whole cash-on-delivery order",
    description:
      "Not a single feature bolted onto checkout. COD King acts at every stage a cash order can go wrong at — before it is placed, as it is placed, and after it is confirmed.",
  },
  points: [
    {
      id: "verify",
      title: "Verify every cash order",
      body: "An OTP over SMS or WhatsApp confirms a real buyer is behind the order before it enters fulfilment.",
    },
    {
      id: "commit",
      title: "Get commitment upfront",
      body: "A fixed or percentage deposit, collected at checkout through the store's own gateway, turns an intention into an order.",
    },
    {
      id: "control",
      title: "Decide where COD applies",
      body: "Rules on pin code, cart value, product and customer history decide whether cash is offered at all — and at what fee.",
    },
    {
      id: "convert",
      title: "Move buyers to prepaid",
      body: "A discount at the right moment converts cash orders to prepaid, and reminders bring back the carts that were never completed.",
    },
  ],
};

/** The problem, in the merchant's own vocabulary rather than ours. */
export const aboutProblem: CompanySection = {
  copy: {
    eyebrow: "The problem",
    title: "Cash on delivery is the sale you might not get paid for",
    description:
      "Every cash order carries a risk a prepaid order does not, and the cost of that risk does not arrive as one line on a statement. It arrives as freight, packaging, reverse logistics and working capital that never came back.",
  },
  points: [
    {
      id: "fake-orders",
      title: "Orders nobody intended to accept",
      body: "A cash order costs the buyer nothing to place, so the ones placed carelessly — or maliciously — look exactly like the ones placed seriously.",
    },
    {
      id: "rto",
      title: "Parcels that come back",
      body: "A refused delivery costs freight out, freight back, and the packaging in between, on a sale that never happened.",
    },
    {
      id: "cash-flow",
      title: "Money riding around in a van",
      body: "Cash orders settle when the courier settles. Until then, working capital is somewhere on a road, not in the business.",
    },
    {
      id: "abandoned",
      title: "Carts that stop short",
      body: "Buyers leave at checkout for reasons a store never sees, and without a reminder the cart is simply gone.",
    },
  ],
};

/**
 * The answer to the section above it, in the same four beats.
 *
 * Problem and fix are written as matching sets on purpose: each block here
 * closes the block that sits opposite it in `aboutProblem`, so a merchant
 * reading down the page gets "here is what it costs you" immediately followed
 * by "here is the control that stops it" rather than a general claim about
 * being helpful.
 */
export const aboutHelp: CompanySection = {
  copy: {
    eyebrow: "How we help",
    title: "Every one of those has a control that answers it",
    description:
      "Nothing here is advice about running a store better. Each is a switch in the app that changes what happens at checkout, and each maps to the problem directly above it.",
  },
  points: [
    {
      id: "verify",
      title: "A real buyer confirms the order",
      body: "An OTP over SMS or WhatsApp before the order enters fulfilment, so the careless and the malicious never reach the packing table.",
    },
    {
      id: "commit",
      title: "The buyer has something at stake",
      body: "A deposit at checkout, fixed or percentage, means a refused parcel costs the buyer something too — which is why fewer are refused.",
    },
    {
      id: "convert",
      title: "More of the money arrives upfront",
      body: "A prepaid discount at the moment of choice moves cash orders to prepaid, and settles the sale before the courier does.",
    },
    {
      id: "recover",
      title: "The cart gets a second chance",
      body: "Automated reminders over WhatsApp and SMS, with a direct link back to checkout, so an abandoned cart is a delay rather than a loss.",
    },
  ],
};

/** The Features cards' own heading. The six themselves are read from the index. */
export const aboutCapabilitiesCopy: CompanySectionCopy = {
  eyebrow: "Capabilities",
  title: "Six controls, one install",
  description:
    "Each one solves a different part of the same problem, and each is switched on independently. Start with the one costing you the most.",
};

/** Why a merchant picks this over building the same checks by hand. */
export const aboutReasons: CompanySection = {
  copy: {
    eyebrow: "Why merchants choose us",
    title: "Built for the way COD stores actually run",
    description:
      "The controls matter, but so does what it takes to run them. These are the things merchants tell us made the difference.",
  },
  points: [
    {
      id: "shopify-native",
      title: "Works on Shopify checkout",
      body: "Installed from the Shopify App Store and running inside the checkout you already have. No theme surgery, no developer.",
    },
    {
      id: "setup",
      title: "Configured in minutes",
      body: "Rules, fees, OTP and partial payment are set from the app. The first verified order can happen the same day you install.",
    },
    {
      id: "messaging",
      title: "Messaging that fits the market",
      body: "SMS or WhatsApp, through your own local provider, in the number format and language your buyers actually use.",
    },
    {
      id: "measurable",
      title: "Results you can check",
      body: "Verified against unverified orders, prepaid share, recovered carts — reported in the app, so the effect is a figure rather than a feeling.",
    },
    {
      id: "support",
      title: "Support seven days a week",
      body: "Live chat and email, every day, answered by people who know what an RTO rate is.",
    },
    {
      id: "scale",
      title: "Proven at volume",
      body: "Running on stores from single-product launches to established brands, across the markets where cash on delivery dominates.",
    },
  ],
};

/** The page's closing ask. */
export const aboutCtaTitle = "Make cash on delivery pay for itself";
