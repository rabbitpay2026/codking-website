import type { Control, OrderStage } from "@/types";

/**
 * The four order stages and their problems, transcribed from §6.1.
 *
 * Declared in order — Before → At → After → Across — because that sequence is
 * itself part of the argument: it shows the merchant the whole system and the
 * stages they are not yet using (§6.4).
 */
export const orderStages: readonly OrderStage[] = [
  {
    id: "before-the-order",
    label: "Before the order",
    problem:
      "A bad COD order gets placed at all — a risky area, a repeat offender, or a low-value basket that should never have had COD.",
  },
  {
    id: "at-the-order",
    label: "At the order",
    problem:
      "The order is placed but may be fake or half-hearted, with no commitment from the buyer.",
  },
  {
    id: "after-the-order",
    label: "After the order",
    problem:
      "Orders are placed but carts are abandoned, or unverified orders ship anyway and come back.",
  },
  {
    id: "across-the-store",
    label: "Across the store",
    problem:
      "Messaging cost adds up, and the merchant cannot see what is working.",
  },
];

/**
 * The ten controls (§6.2), in stage order.
 *
 * `outcome` is a one-line compression of the architecture's own description of
 * each control, sized for the mega-menu (§4.1) and control cards (§12). Final
 * marketing copy — the problem narrative, how-it-works detail, setup notes and
 * proof — is a content-phase deliverable and is not modelled here.
 *
 * `featured` marks the four controls the homepage highlights (§5.1 #6).
 */
export const controls: readonly Control[] = [
  {
    slug: "cod-rules",
    name: "COD Rules",
    stage: "before-the-order",
    outcome:
      "Turn COD on or off by pincode, cart value, product, or customer tag.",
    featured: true,
  },
  {
    slug: "cod-fees",
    name: "COD Fees",
    stage: "before-the-order",
    outcome: "Add a fee on COD orders so prepaid looks more attractive.",
    featured: false,
  },
  {
    slug: "prepaid-nudge",
    name: "Prepaid Nudge",
    stage: "before-the-order",
    outcome: "Offer a checkout discount to move the buyer to paying online.",
    featured: true,
  },
  {
    slug: "otp-verification",
    name: "OTP Verification",
    stage: "at-the-order",
    outcome:
      "Confirm the buyer's phone by SMS or WhatsApp before the order is accepted.",
    featured: true,
  },
  {
    slug: "partial-cod-payment",
    name: "Partial COD Payment",
    stage: "at-the-order",
    outcome: "Collect a small advance so the buyer has a stake in the order.",
    featured: true,
  },
  {
    slug: "address-validation",
    name: "Address Validation",
    stage: "at-the-order",
    outcome: "Check and pre-fill delivery addresses so parcels are not lost.",
    featured: false,
  },
  {
    slug: "abandoned-cart-recovery",
    name: "Abandoned Cart Recovery",
    stage: "after-the-order",
    outcome:
      "Recover left-behind carts with SMS and WhatsApp reminders that link straight to checkout.",
    featured: false,
  },
  {
    slug: "order-verification",
    name: "Order Verification",
    stage: "after-the-order",
    outcome: "Confirm, hold, or cancel COD orders before they ship.",
    featured: false,
  },
  {
    slug: "messaging-gateways",
    name: "Messaging Gateways",
    stage: "across-the-store",
    outcome: "Route SMS through local providers to cut the per-message cost.",
    featured: false,
  },
  {
    slug: "analytics",
    name: "Analytics & Reports",
    stage: "across-the-store",
    outcome: "See RTO, fake-order, and prepaid trends in one place.",
    featured: false,
  },
];
