"use client";

import { Button } from "@/components/ui/button";
import { externalLinks } from "@/constants/external";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

import type { CalculatorResult } from "@/types";

interface RecoverySummaryProps {
  readonly result: CalculatorResult;
}

/**
 * The period sits in a caption under the figure rather than inside it.
 *
 * A large store's annual saving runs to twelve characters before any suffix,
 * and appending "/ yr" to it pushes the string past its grid track on a tablet.
 * Splitting them keeps the number the widest thing in the cell and matches how
 * the result panel above already sets its headlines.
 */
function Figure({
  label,
  value,
  caption,
  tone,
}: {
  readonly label: string;
  readonly value: string;
  readonly caption: string;
  readonly tone: "loss" | "gain";
}) {
  return (
    <div className="min-w-0">
      <p className="text-[11.5px] leading-none font-medium text-ink/45">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 text-[1.5rem] leading-none font-semibold tracking-[-0.035em] tabular-nums sm:text-[1.7rem]",
          tone === "loss" ? "text-[#B42318]" : "text-brand",
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11px] leading-none text-ink/35">{caption}</p>
    </div>
  );
}

/**
 * The close (steps six and seven).
 *
 * A band rather than a card. The page has already spent three cards making its
 * argument, and a fourth floating surface at the end would read as a further
 * instalment of it instead of the summary of everything above.
 *
 * The wording is the load-bearing part. "Potential savings" and "based on the
 * assumptions you selected" are not hedges added for legal comfort — they are
 * accurate, because the figures come from three improvement rates the merchant
 * set themselves on this page. This section never says COD King *will* save
 * anything, and it should not be edited into saying so.
 */
export function RecoverySummary({ result }: RecoverySummaryProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-10 rounded-2xl border border-[#E5E7EB] bg-gradient-to-b from-sky-100 to-white px-5 py-6 sm:px-7"
    >
      <h2
        id="summary-heading"
        className="text-[1.35rem] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]"
      >
        What this could mean for your store
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Figure
          label="Current estimated COD loss"
          value={formatCurrency(result.current.codLoss.total)}
          caption="per month"
          tone="loss"
        />
        <Figure
          label="Potential savings"
          value={formatCurrency(result.monthlySavings)}
          caption="per month"
          tone="gain"
        />
        <Figure
          label="Potential annual savings"
          value={formatCurrency(result.annualSavings)}
          caption="per year"
          tone="gain"
        />
      </div>

      <p className="mt-5 max-w-2xl text-[11.5px] leading-relaxed text-ink/45">
        Based on the assumptions you selected. These are planning estimates, not
        measured or guaranteed results — the improvement rates are inputs on
        this page, and your own figures will depend on your catalogue, your
        delivery footprint and how the controls are configured.
      </p>

      {externalLinks.install ? (
        <Button asChild size="md" className="mt-5">
          <a
            href={externalLinks.install}
            target="_blank"
            rel="noreferrer noopener"
          >
            Install COD King free
          </a>
        </Button>
      ) : null}
    </section>
  );
}
