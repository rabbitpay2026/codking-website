import type { SmsOperator } from "@/types";

/**
 * The operator picker, as a repository (§6.3, §11).
 *
 * Every record below is one row of the "Local SMS Operators" dropdown in the
 * COD King dashboard, in the order the dashboard lists them, spelled the way
 * the dashboard spells them. Nothing here is chosen for the page.
 *
 * ── Why this is not `src/data/integrations.ts` ────────────────────────────
 * The integrations repository answers "does COD King work with X?". This one
 * answers "which operator can I select, and who bills me for the traffic".
 * They overlap on two names and diverge everywhere else — the integrations
 * board carries Indian providers, and local operator integration is
 * unavailable in India — so keeping one list would mean the page either
 * offered an operator the product does not offer or hid one it does.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On the logos ──────────────────────────────────────────────────────────
 * Each `logo` is the operator's own artwork, taken from their own site and
 * resized without being recoloured, redrawn or re-proportioned. Four operators
 * carry none: Chat API, Branded SMS, PalPigeon and BulkSmsBdService publish no
 * reachable brand file today. Those render as a monogram rather than as
 * something drawn to look like a logo, which is the same rule the integrations
 * board follows — a wrong mark is worse than an absent one.
 *
 * `width` and `height` are each file's true pixel size, so `next/image`
 * reserves the right box and no mark is ever stretched to fill a cell.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const smsOperators: readonly SmsOperator[] = [
  {
    slug: "twilio",
    name: "Twilio",
    coverage: "Global",
    worldwide: true,
    logo: { src: "/logos/sms-operators/twilio.png", width: 318, height: 96 },
  },
  {
    slug: "wavecell",
    name: "Wavecell",
    coverage: "Global",
    worldwide: true,
    logo: { src: "/logos/sms-operators/wavecell.png", width: 360, height: 57 },
  },
  {
    slug: "chat-api",
    name: "Chat API",
    coverage: "WhatsApp Global",
    worldwide: true,
  },
  {
    slug: "prowebsms",
    name: "ProWebSms",
    alias: "Smshare",
    coverage: "Global",
    worldwide: true,
    logo: {
      src: "/logos/sms-operators/prowebsms.png",
      width: 84,
      height: 96,
    },
  },
  {
    slug: "veevotech",
    name: "Veevotech",
    coverage: "Pakistan",
    worldwide: false,
    logo: { src: "/logos/sms-operators/veevotech.png", width: 90, height: 60 },
  },
  {
    slug: "branded-sms",
    name: "Branded SMS",
    coverage: "Pakistan",
    worldwide: false,
  },
  {
    slug: "ismart",
    name: "iSmart",
    coverage: "Oman",
    worldwide: false,
    logo: { src: "/logos/sms-operators/ismart.png", width: 160, height: 30 },
  },
  {
    slug: "winsmspro",
    name: "Winsmspro",
    coverage: "Tunisia",
    worldwide: false,
    logo: {
      src: "/logos/sms-operators/winsmspro.png",
      width: 266,
      height: 95,
    },
  },
  {
    slug: "esms",
    name: "eSMS",
    coverage: "Vietnam",
    worldwide: false,
    logo: { src: "/logos/sms-operators/esms.png", width: 117, height: 38 },
  },
  {
    slug: "palpigeon",
    name: "PalPigeon",
    coverage: "Turkey",
    worldwide: false,
  },
  {
    slug: "movider",
    name: "Movider",
    coverage: "Philippines",
    worldwide: false,
    logo: { src: "/logos/sms-operators/movider.png", width: 339, height: 66 },
  },
  {
    slug: "boomcast",
    name: "BoomCast",
    coverage: "Bangladesh",
    worldwide: false,
    logo: { src: "/logos/sms-operators/boomcast.png", width: 360, height: 62 },
  },
  {
    slug: "smsmisr",
    name: "SmsMisr",
    coverage: "Egypt",
    worldwide: false,
    logo: { src: "/logos/sms-operators/smsmisr.png", width: 31, height: 31 },
  },
  {
    slug: "thaibulksms",
    name: "ThaiBulkSMS",
    coverage: "Thailand",
    worldwide: false,
    logo: {
      src: "/logos/sms-operators/thaibulksms.png",
      width: 320,
      height: 41,
    },
  },
  {
    slug: "bulksmsbdservice",
    name: "BulkSmsBdService",
    coverage: "Bangladesh",
    worldwide: false,
  },
];

/**
 * The picker's default, and deliberately not a member of `smsOperators`.
 *
 * "Cod King" is the row a merchant sees selected before they choose anything,
 * and it means the opposite of every other row: messages leave on COD King's
 * own sending rather than on an operator account the merchant holds. Listing
 * it beside the fifteen would present the product as one of its own local
 * operator partners, which is the single most misleading thing this page could
 * do — so it lives here, alone, and is rendered as a state rather than as a
 * card.
 */
export const codKingOperator: SmsOperator = {
  slug: "cod-king",
  name: "Cod King",
  coverage: "Default",
  worldwide: true,
  logo: { src: "/logos/sms-operators/cod-king.png", width: 322, height: 96 },
};

/**
 * The operators the dashboard recommends for a United States store.
 *
 * These two, and only these two, because these two are what the dashboard
 * names on that screen. It is a recommendation for one market rather than a
 * ranking of the fifteen, and both of them are worldwide operators — neither
 * is a United States operator, and the page must not imply one is.
 */
export const recommendedOperatorSlugs: readonly string[] = [
  "twilio",
  "chat-api",
];
