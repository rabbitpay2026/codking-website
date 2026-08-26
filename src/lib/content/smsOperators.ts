import {
  codKingOperator,
  recommendedOperatorSlugs,
  smsOperators,
} from "@/data/smsOperators";

import type { SmsOperator, SmsOperatorGroup } from "@/types";

/** Every operator the picker offers, in the order the picker offers them. */
export function getSmsOperators(): readonly SmsOperator[] {
  return smsOperators;
}

/**
 * The picker's default.
 *
 * Returned on its own rather than from `getSmsOperators`, so no caller can
 * accidentally render COD King as one of the local operators it connects to.
 */
export function getDefaultSmsOperator(): SmsOperator {
  return codKingOperator;
}

/** The operators whose coverage the picker states as worldwide. */
export function getWorldwideSmsOperators(): readonly SmsOperator[] {
  return smsOperators.filter((operator) => operator.worldwide);
}

/**
 * The rest, gathered under the market each one is listed for.
 *
 * Grouped from the records rather than from a second hand-written list, so a
 * market cannot end up with an operator the picker does not list there, and an
 * operator added to the repository joins its market without a further edit.
 * Insertion order is preserved — first mention of a market fixes where that
 * market sits — which keeps the board in the picker's own order rather than in
 * an alphabetical one nothing else on the page uses.
 */
export function getRegionalSmsOperatorGroups(): readonly SmsOperatorGroup[] {
  const groups = new Map<string, SmsOperator[]>();

  for (const operator of smsOperators) {
    if (operator.worldwide) continue;

    const existing = groups.get(operator.coverage);
    if (existing) existing.push(operator);
    else groups.set(operator.coverage, [operator]);
  }

  return [...groups].map(([coverage, operators]) => ({ coverage, operators }));
}

/**
 * The two the dashboard recommends for a United States store.
 *
 * Resolved through the repository rather than duplicated, so the recommended
 * pair carries the same name, coverage and mark as its card further down and
 * cannot drift from it.
 */
export function getRecommendedSmsOperators(): readonly SmsOperator[] {
  return recommendedOperatorSlugs.flatMap((slug) => {
    const operator = smsOperators.find((record) => record.slug === slug);
    return operator ? [operator] : [];
  });
}
