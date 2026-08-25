import {
  controlBoardTitle,
  homepageFeatures,
  howItWorksSteps,
  howItWorksTitle,
  outcomeMetrics,
  painPoints,
  painPointsCopy,
  platformsCopy,
  trustedBrands,
} from "@/data/homepage";
import { getControlBySlug } from "@/lib/content/controls";
import { getProofMetrics } from "@/lib/content/proof";

import type {
  ControlBoardCard,
  HowItWorksStep,
  OutcomeMetric,
  PainPoint,
  PainPointsCopy,
  PlatformStat,
  TrustedBrand,
} from "@/types";

export function getPainPoints(): readonly PainPoint[] {
  return painPoints;
}

export function getPainPointsCopy(): PainPointsCopy {
  return painPointsCopy;
}

export function getOutcomeMetrics(): readonly OutcomeMetric[] {
  return outcomeMetrics;
}

export function getTrustedBrands(): readonly TrustedBrand[] {
  return trustedBrands;
}

export function getHowItWorksSteps(): readonly HowItWorksStep[] {
  return howItWorksSteps;
}

export function getHowItWorksTitle(): string {
  return howItWorksTitle;
}

export function getPlatformsCopy() {
  return platformsCopy;
}

/**
 * The scale band under the trust strip — how big the platform being trusted is.
 *
 * Assembled here rather than stored, because every figure already lives in the
 * proof repository and §11.1 forbids a second copy. That is also why the order
 * count is divided down rather than written out: the repository holds ten
 * million, this turns it into the "10M+" a person can read, and the two can
 * never disagree because there is only one of them.
 *
 * These are platform facts, not merchant outcomes. What the product did for a
 * particular store belongs to `outcomeMetrics` further down the page, and the
 * distinction is the reason both exist — this band answers "how big is this",
 * that one answers "what will it do for me".
 *
 * A country count that is not yet verified drops out of the band rather than
 * rendering a placeholder (§5.1 #3).
 */
export async function getPlatformStats(): Promise<readonly PlatformStat[]> {
  const proof = await getProofMetrics();

  return [
    ...(proof.countriesServed
      ? ([
          {
            id: "countries",
            value: proof.countriesServed,
            suffix: "+",
            label: "Countries",
            caption: "Local numbers and carriers.",
            icon: "globe",
          },
        ] as const)
      : []),
    {
      id: "merchants",
      value: proof.merchantCount,
      suffix: "+",
      label: "Merchants",
      caption: "Live on Shopify today.",
      icon: "store",
    },
    {
      id: "orders",
      value: proof.ordersProcessed / 1_000_000,
      suffix: "M+",
      label: "Orders processed",
      caption: "Verified, priced or held.",
      icon: "orders",
    },
    {
      id: "uptime",
      value: proof.uptimePercent,
      suffix: "%",
      decimalPlaces: 1,
      label: "Platform uptime",
      caption: "Checkout never waits on us.",
      icon: "uptime",
    },
  ];
}

/**
 * The homepage's feature list, validated against the controls repository.
 *
 * The hero checklist and the capability board both read this, so the two are
 * one list seen twice and a control renamed in `data/controls` is renamed in
 * both. An entry naming a control that no longer exists is dropped here, once,
 * rather than rendering a card that links to a page the site does not have.
 */
export function getHomepageFeatures(): readonly ControlBoardCard[] {
  return homepageFeatures.filter((card) => getControlBySlug(card.slug));
}

export function getControlBoardTitle(): string {
  return controlBoardTitle;
}
