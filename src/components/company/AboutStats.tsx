import { getProofMetrics } from "@/lib/content";
import { cn } from "@/lib/utils";

const compactFormat = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 0,
});
const numberFormat = new Intl.NumberFormat("en");

/**
 * The four figures the About page opens on.
 *
 * Every one of them is the proof repository's (§11.1) — the same object the
 * homepage, the pricing page and every feature hero read. An About page is
 * exactly where a hand-typed "over 12,000 merchants" gets written and then
 * never updated, which is what that rule exists to prevent.
 *
 * A rail rather than four cards. This sits directly under the hero copy, and
 * four bordered boxes there would compete with the headline above them;
 * hairline dividers give the same reading order at a fraction of the weight.
 *
 * A four-track grid rather than a wrapping flex row, and that is the whole
 * reason it is a grid: the dividers key off position in the list, so a row that
 * wraps puts a leading rule at the start of the second line, hanging in space
 * with nothing to its left. A grid wraps by changing how many tracks there are,
 * not by breaking a line, so the rules are only ever drawn between figures that
 * are genuinely side by side — two up on a phone, four across from `md`.
 */
export async function AboutStats() {
  const proof = await getProofMetrics();

  const stats = [
    {
      id: "merchants",
      value: `${compactFormat.format(proof.merchantCount)}+`,
      label: "Shopify merchants",
    },
    {
      id: "rating",
      value: `${proof.rating}★`,
      label: `${numberFormat.format(proof.reviewCount)}+ reviews`,
    },
    {
      id: "countries",
      value: `${proof.countriesServed}+`,
      label: "Countries served",
    },
    {
      id: "orders",
      value: `${compactFormat.format(proof.ordersProcessed)}+`,
      label: "Orders processed",
    },
  ];

  return (
    <dl className="mt-9 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4 md:gap-x-0">
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className={cn(
            "min-w-0",
            index === 0
              ? "md:pr-6"
              : "md:border-l md:border-ink/[0.09] md:pr-6 md:pl-6",
          )}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block text-[1.5rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
              {stat.value}
            </span>
            <span
              aria-hidden
              className="mt-1.5 block text-[12.5px] leading-snug text-ink/50"
            >
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
