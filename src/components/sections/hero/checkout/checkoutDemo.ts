import { CreditCard, HandCoins, Truck, Wallet } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/**
 * The width the checkout is drawn at.
 *
 * Real pixels, because a dense interface is controlled in real pixels — an
 * 11px caption and a 46px field are decisions, not ratios. Every size in
 * `CheckoutPreview` and `CheckoutChrome` is expressed against it, and the
 * whole screen is then scaled to whatever width the device it sits in is
 * given. See the `screen-fit` utility for the arithmetic.
 *
 * It lives here, in the data, rather than beside the markup that uses it, and
 * that is a boundary rather than a preference: `HeroStage` renders on the
 * server and has to declare this same number on the glass, and every export of
 * a `"use client"` module reaches a server component as a reference to a
 * client function rather than as its value. Imported from `CheckoutPreview`
 * this arrived as `--screen-w: function() {…}` — the screen stopped being
 * scaled at all, silently, because an invalid custom property simply drops the
 * declaration that reads it.
 */
export const DESIGN_WIDTH = 390;

/**
 * The cart the hero's checkout is standing on.
 *
 * One object, because every figure on the screen is derived from it. The
 * checkout quotes the same money in seven places — the summary, the saved
 * banner, the discount badge, and four payment options that each split the
 * total a different way — and typing seven numbers is how a demonstration
 * ends up contradicting itself in front of the person it is meant to convince.
 *
 * The values are one merchant's *configured example*, not a default the
 * product advertises: the automatic discount, the prepaid incentive and the
 * COD fee are all rules a store sets for itself.
 */
export const CART = {
  itemCount: 1,
  /** List price, before any COD King rule fires. */
  mrp: 600,
  /** What the store's automatic discount rule takes off. */
  autoDiscount: 30,
  /** The extra a buyer keeps by paying online rather than on delivery. */
  prepaidIncentive: 62.7,
  /** What the courier charges to carry cash, added to a COD total. */
  codFee: 100,
  /** The first slice of a part-paid order, as a share of the cart. */
  partialShare: 0.1,
  /** The flat first slice the store offers as an alternative to the share. */
  partialFlat: 100,
} as const;

/** What the buyer owes once the automatic discount has fired. */
export const CART_TOTAL = CART.mrp - CART.autoDiscount;

/** Paying now costs this. */
export const PREPAID_TOTAL = round2(CART_TOTAL - CART.prepaidIncentive);

/** ...which is this much off the price the item is listed at. */
export const PREPAID_OFF = round2(CART.mrp - PREPAID_TOTAL);

/** The share of the cart a prepaid buyer keeps, as the row states it. */
export const PREPAID_SAVE_PERCENT = Math.round(
  (CART.prepaidIncentive / CART_TOTAL) * 100,
);

/** The tenth taken up front on the part-paid option. */
export const PARTIAL_NOW = round2(CART_TOTAL * CART.partialShare);

/** Paying on delivery costs the cart plus the fee for the cash handling. */
export const COD_TOTAL = CART_TOTAL + CART.codFee;

/**
 * Two formatters, because the screen quotes money two ways and the difference
 * is not an accident: the summary states an exact price to the paisa, and the
 * payment rows state a figure to be compared at a glance. Trailing zeros help
 * the first and clutter the second.
 */
const exact = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/*
  `minimumFractionDigits: 0` is the whole of the difference, and it has to be
  stated: the currency style defaults the minimum to two for INR, so leaving it
  out produces `₹57.00` and `₹507.30` — a payment ladder quoted to the paisa,
  which is exactly the register this formatter exists to avoid.
*/
const trim = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** `₹570.00` — the summary's register. */
export function inr(value: number): string {
  return exact.format(value);
}

/** `₹507.3` — the payment rows' register. */
export function inrShort(value: number): string {
  return trim.format(value);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * The number the checkout has seen before.
 *
 * Entirely invented, and deliberately inside the reserved 98765 block that
 * Indian documentation uses for examples — a demonstration on a public
 * homepage must never put a number somebody actually answers on screen.
 */
export const SAVED_PHONE = "9876543210";

/** The same number, spaced the way the checkout prints it. */
export const SAVED_PHONE_PRETTY = "+91 98765 43210";

/**
 * The address the buyer's number resolves to.
 *
 * Prefilled delivery details are one of the product's own controls — COD King
 * fetches the customer from their number or their past orders — so this
 * arrives on the screen already written rather than as an empty form. Fictional
 * for the same reason the number is.
 */
export const DELIVERY = {
  name: "Aarav Mehta",
  tag: "Home",
  line: "12 Green Park Avenue, Sector 21",
  area: "122001 Gurugram, India",
  phone: SAVED_PHONE_PRETTY,
  email: "aarav.mehta@example.com",
} as const;

/** The order number the confirmation quotes back. */
export const ORDER_ID = "#CK-10428";

/** The store's running promotion, as the black bar announces it. */
export const PROMO_LINE = "Free OTP for India - Coupon CODE - FREEDOM2026";

/** The name of the rule that fired, quoted by the summary and the coupon card. */
export const DISCOUNT_NAME = "COD King Custom Discount";

/** How long the buyer waits before the checkout will send a second code. */
export const RESEND_SECONDS = 58;

/** How many digits the code field holds. */
export const CODE_LENGTH = 4;

export interface PaymentOption {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly caption: string;
  /** What the buyer is charged at this step. */
  readonly amount: number;
  /** The list price this is measured against, struck through beside it. */
  readonly strike?: number;
  /** A one-line consequence of choosing this row. */
  readonly note?: string;
  /** Green for something gained, red for something it costs. */
  readonly noteTone?: "good" | "cost";
  /** What the confirmation says was collected now. */
  readonly paidNow: number;
  /** What the confirmation says is still owed to the courier. */
  readonly dueOnDelivery: number;
}

/**
 * The four ways the store's payment rules let this cart be paid.
 *
 * This list *is* the product's argument. A merchant running COD King does not
 * offer "prepaid or cash" — they offer a ladder, priced so that every rung
 * down costs the buyer more, and the two in the middle exist so that a buyer
 * who will not pay in full still puts money down. Ordered cheapest first, so
 * the ladder reads top to bottom.
 */
export const PAYMENT_OPTIONS: readonly PaymentOption[] = [
  {
    id: "prepaid",
    icon: CreditCard,
    title: "Prepaid Payment",
    caption: `Pay ${inrShort(PREPAID_TOTAL)} now and get ${inrShort(PREPAID_OFF)} off`,
    amount: PREPAID_TOTAL,
    strike: CART.mrp,
    note: `Save ${PREPAID_SAVE_PERCENT}%`,
    noteTone: "good",
    paidNow: PREPAID_TOTAL,
    dueOnDelivery: 0,
  },
  {
    id: "partial-share",
    icon: Wallet,
    title: "Pay 10% Now & Rest COD",
    caption: `Pay ${inrShort(PARTIAL_NOW)} now and ${inrShort(CART_TOTAL - PARTIAL_NOW)} on delivery`,
    amount: PARTIAL_NOW,
    paidNow: PARTIAL_NOW,
    dueOnDelivery: CART_TOTAL - PARTIAL_NOW,
  },
  {
    id: "partial-flat",
    icon: HandCoins,
    title: `Pay ${CART.partialFlat} Now & Rest COD`,
    caption: `Pay ${inrShort(CART.partialFlat)} now and ${inrShort(CART_TOTAL - CART.partialFlat)} on delivery`,
    amount: CART.partialFlat,
    paidNow: CART.partialFlat,
    dueOnDelivery: CART_TOTAL - CART.partialFlat,
  },
  {
    id: "cod",
    icon: Truck,
    title: "Cash on delivery",
    caption: `Pay ${inrShort(COD_TOTAL)} on delivery (${inrShort(CART.codFee)} COD fee applicable)`,
    amount: COD_TOTAL,
    strike: CART.mrp,
    note: `+${inrShort(CART.codFee)} COD fee`,
    noteTone: "cost",
    paidNow: 0,
    dueOnDelivery: COD_TOTAL,
  },
];
