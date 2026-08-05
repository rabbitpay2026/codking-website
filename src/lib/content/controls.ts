import { controls, orderStages } from "@/data/controls";

import type { Control, ControlSlug, OrderStage, OrderStageId } from "@/types";

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

/** Controls belonging to one stage, in declaration order (§6.1). */
export function getControlsByStage(stage: OrderStageId): readonly Control[] {
  return controls.filter((control) => control.stage === stage);
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
