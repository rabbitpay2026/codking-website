import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { CheckoutMock } from "@/components/product/otp";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import { getOtpCheckoutStages } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The arrow between two stages.
 *
 * One glyph that turns with the layout rather than two hidden behind
 * breakpoints: stacked it points down the page, in a row it points across, and
 * it is the same object either way.
 *
 * In a row it is offset to the centre line of the *screens* rather than of the
 * columns. Centred on the column it would drift with the length of the
 * paragraphs underneath, which is the clearest way to make three aligned
 * stages look like three unaligned ones.
 */
function StageArrow() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center py-2 lg:block lg:py-0"
    >
      {/* `18rem` is the screen height set on the mocks below, and `2rem` this
          arrow's own; the two are read together, which is why both are written
          out rather than hidden behind a constant a reader has to go and find. */}
      <span className="mx-auto grid size-8 place-items-center rounded-full border border-border bg-background text-ink/35 lg:mt-[calc((18rem-2rem)/2)]">
        <ArrowRight className="size-4 rotate-90 lg:rotate-0" />
      </span>
    </div>
  );
}

/**
 * What the buyer actually experiences.
 *
 * The objection this removes is the only real one a merchant has about
 * verification: *you are putting a step in front of my customers*. It is not
 * answered with a claim that the step is small — it is answered by showing the
 * checkout on either side of it and letting the merchant see for themselves
 * that the first and third screens are the same screen.
 *
 * Which is why the middle stage draws the verification *over* the checkout
 * rather than beside it. Over is the whole argument: one panel, inside the
 * flow the store already has, and then the order continues exactly as before.
 *
 * The three screens are one component in three states (`CheckoutMock`), so the
 * before and after frames cannot quietly drift into two different checkouts
 * and undo the point.
 */
export function OtpVerificationCheckout() {
  const stages = getOtpCheckoutStages();

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <SectionHeading
        as="h2"
        title="A seamless checkout experience"
        description="Verification is added inside the checkout you already have — without disrupting your store's design or the way a genuine buyer gets through it."
      />

      <BlurFade className="mt-lede">
        <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(11,27,54,0.04)] sm:p-6 lg:p-8">
          <div className="grid gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-x-5">
            {stages.map((stage, index) => {
              const highlighted = stage.id === "verify";

              return (
                <Fragment key={stage.id}>
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "rounded-[1.2rem]",
                        highlighted &&
                          "ring-2 ring-brand/20 ring-offset-4 ring-offset-card",
                      )}
                    >
                      {/*
                        The screens answer the cursor like the page's other
                        cards. The hover is on the screen itself rather than on
                        the wrapper so the highlight ring stays put while the
                        panel inside it lifts — a ring travelling with the card
                        reads as the whole diagram sliding.
                      */}
                      <CheckoutMock
                        stage={stage.id}
                        className={cn(
                          "h-[18rem]",
                          cardHoverClass,
                          highlighted &&
                            "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_16px_36px_-20px_rgba(11,27,54,0.4)]",
                        )}
                      />
                    </div>

                    <h3
                      className={cn(
                        "mt-5 text-[14px] leading-snug font-semibold tracking-[-0.012em] text-balance",
                        highlighted ? "text-brand" : "text-ink",
                      )}
                    >
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                      {stage.body}
                    </p>
                  </div>

                  {index < stages.length - 1 ? <StageArrow /> : null}
                </Fragment>
              );
            })}
          </div>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
