import { OperatorPicker } from "@/components/product/messaging-gateways";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  getDefaultSmsOperator,
  getGatewayPageCopy,
  getSmsOperators,
} from "@/lib/content";

/**
 * The setting itself, under the board that showcases what goes in it.
 *
 * The board answers "is my market covered". This answers "and how do I choose
 * it", and it is deliberately the last thing on the page before the proof and
 * the ask: a merchant who has just found their own operator among fifteen
 * cards is exactly the merchant who wants to see the control it goes into.
 *
 * The picker is the product's own dropdown, carrying the same sixteen options
 * in the same order with the same default. It is the one interactive thing on
 * the page, so it is given a column of its own rather than being set under a
 * centred heading — a control centred under a paragraph reads as an
 * illustration of a control.
 *
 * `configureNote` is not decoration. This is a marketing page and the picker
 * does not configure anybody's store, so the section says which one does
 * rather than letting a working dropdown imply otherwise.
 */
export function Configure() {
  const copy = getGatewayPageCopy();

  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
        <div>
          <SectionHeading
            as="h2"
            eyebrow={copy.configureEyebrow}
            title={copy.configureTitle}
            description={copy.configureDescription}
            align="left"
          />

          <p className="mt-6 max-w-xl rounded-xl border border-ink/[0.07] bg-sky-50 px-4 py-3.5 text-[12.5px] leading-relaxed text-pretty text-ink/55">
            {copy.configureNote}
          </p>
        </div>

        <BlurFade>
          <OperatorPicker
            fallback={getDefaultSmsOperator()}
            operators={getSmsOperators()}
          />
        </BlurFade>
      </div>
    </SectionShell>
  );
}
