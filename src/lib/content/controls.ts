import { controls, dedicatedControlPages, orderStages } from "@/data/controls";
import { featureIndexEntries } from "@/data/features";

import type {
  Control,
  ControlSlug,
  FeatureEmphasis,
  FeatureIndexItem,
  OrderStage,
  OrderStageId,
} from "@/types";

export function getOrderStages(): readonly OrderStage[] {
  return orderStages;
}

export function getOrderStage(id: OrderStageId): OrderStage | undefined {
  return orderStages.find((stage) => stage.id === id);
}

export function getControls(): readonly Control[] {
  return controls;
}

export function getControlBySlug(slug: string): Control | undefined {
  return controls.find((control) => control.slug === slug);
}

/**
 * Whether this control has a hand-built page rather than the generic template.
 *
 * Asked by two callers that must agree: `features/[control]` skips these slugs
 * when prerendering, and the sitemap includes only these slugs.
 */
export function hasDedicatedPage(slug: ControlSlug): boolean {
  return dedicatedControlPages.includes(slug);
}

/**
 * The controls whose feature page is finished, in declaration order.
 *
 * "Published" here means indexable: a control served by the generic template
 * has a URL that resolves, but the page says it is implemented in a later
 * phase and is `noIndex`, so it is not a canonical URL to advertise. The
 * sitemap and `llms.txt` both read this rather than the full set.
 */
export function getPublishedControls(): readonly Control[] {
  return controls.filter((control) => hasDedicatedPage(control.slug));
}

/** Controls belonging to one stage, in declaration order (§6.1). */
export function getControlsByStage(stage: OrderStageId): readonly Control[] {
  return controls.filter((control) => control.stage === stage);
}

/**
 * The Features index selection, resolved against the controls repository.
 *
 * Each entry is joined to its record here rather than in the page, so the
 * cards read their outcome line and their URL from the same declaration the
 * mega-menu and the control page use. An entry naming a control that no longer
 * exists is dropped rather than rendered as an empty card — the same failure
 * mode `getControlBoard()` chose, for the same reason.
 */
export function getFeatureIndex(): readonly FeatureIndexItem[] {
  return featureIndexEntries.flatMap((entry) => {
    const control = getControlBySlug(entry.slug);
    return control
      ? [
          {
            control,
            title: entry.title ?? control.name,
            emphasis: entry.emphasis,
          },
        ]
      : [];
  });
}

/** One tier of the Features page, in selection order. */
export function getFeaturesByEmphasis(
  emphasis: FeatureEmphasis,
): readonly FeatureIndexItem[] {
  return getFeatureIndex().filter((item) => item.emphasis === emphasis);
}

/** The controls highlighted on the homepage (§5.1 #6). */
export function getFeaturedControls(): readonly Control[] {
  return controls.filter((control) => control.featured);
}

/**
 * The controls adjacent to this one, for the related-controls rail (§6.3).
 *
 * Adjacency is derived from the stage rather than hand-listed per control:
 * controls that solve the same stage's problem are the ones a merchant should
 * consider next, and a derived list cannot rot when a control is added.
 */
export function getRelatedControls(slug: ControlSlug): readonly Control[] {
  const control = getControlBySlug(slug);
  if (!control) return [];

  return getControlsByStage(control.stage).filter(
    (candidate) => candidate.slug !== slug,
  );
}
