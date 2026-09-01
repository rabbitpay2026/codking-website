import { ArrowDown, IndianRupee, PackageX, Wallet } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";

const RESULTS = [
  {
    percent: 35,
    title: "Lower Fake Orders",
    description: "Spot risky checkouts before dispatch.",
    icon: PackageX,
  },
  {
    percent: 20,
    title: "Higher Prepaid Orders",
    description: "Lift prepaid share with timely prompts.",
    icon: Wallet,
  },
  {
    percent: 30,
    title: "Reduced RTO",
    description: "Cut returns before they leave the warehouse.",
    icon: ArrowDown,
  },
  {
    percent: 25,
    title: "Increase in Revenue",
    description: "Turn cleaner orders into stronger revenue.",
    icon: IndianRupee,
  },
] as const;

export function Results() {
  return (
    <SectionShell
      size="flush"
      /*
        No top rule of its own any more.

        This used to open on `border-t` because it arrived out of a muted band
        with no edge of its own. It now arrives directly under the platform
        band, which closes on a hairline at exactly this section's top edge —
        so drawing a second one there would stack two near-identical greys into
        one heavier line. The two share that edge instead, which is the same
        arrangement the platform band already has with the trust strip above
        it.

        The top padding opens up to match: under a muted band a tight top read
        as the two belonging together, and under a hairline the heading needs
        the room to sit clear of the rule rather than against it.
      */
      containerClassName="pt-9 pb-8 md:pt-11 md:pb-10"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 50% 0%, rgba(238,246,255,0.9), transparent 72%)",
          }}
        />
      }
    >
      {/*
        The tail carries the accent, and it is the hero's own: flat `text-brand`
        on the phrase that matters, dark ink on the rest. It used to be a
        left-to-right run from `brand-violet` to `brand`, clipped to the text.
        Reusing the hero's treatment rather than a second one is the whole
        point — two headings a screen apart with two different accents read as
        two decisions, and the page makes one. It also drops a violet that was
        the only violet in a heading anywhere on the page.

        Split on the words rather than read from a data file, because this
        section holds its own copy inline; there is no repository record for a
        rewording to fall out of sync with.
      */}
      <SectionHeading
        title={
          <>
            Results Our <span className="text-brand">Merchants Achieve</span>
          </>
        }
      />

      <div className="mt-lede grid gap-4 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-4">
        {RESULTS.map((result, index) => {
          const Icon = result.icon;

          return (
            <BlurFade
              key={result.title}
              delay={0.06 * index}
              className="h-full"
            >
              {/*
                `h-full`, not a fixed height.

                This card used to be pinned to `h-[118px]`. Four across on a
                72rem page gives each one a 260px box, so after the padding and
                the mark there are about 178px of measure for the text — and
                every one of the four descriptions wraps to two lines at that
                width. The figure, the title and a two-line description come to
                roughly 99px, which with `p-6` needs about 147px of card. The
                content was therefore taller than the box that was meant to
                hold it, and because the card sets no `overflow`, it spilled
                past the border top and bottom rather than being clipped —
                which is what the review screenshot shows.

                `h-full` hands the sizing to the grid, where `md:auto-rows-fr`
                already equalises the row, so the four cards stay exactly the
                same height as each other and that height is now whatever the
                tallest of them actually needs. Nothing about the type, the
                spacing or the copy changes.
              */}
              <article className="group flex h-full items-center rounded-[1.05rem] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-emphasized)] hover:-translate-y-0.5 hover:border-[#D9DFE8] hover:shadow-[0_6px_18px_-16px_rgba(15,23,42,0.12)] sm:p-6">
                <div className="flex w-full items-center gap-4">
                  <Icon
                    aria-hidden
                    className="mt-1 size-[18px] shrink-0 text-ink/30 transition-colors duration-300 group-hover:text-ink/45"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[2.2rem] leading-none font-semibold tracking-[-0.04em] text-ink tabular-nums sm:text-[2.35rem]">
                      {result.percent}%
                    </p>

                    <h3 className="mt-1.5 text-[14px] leading-tight font-medium tracking-[-0.015em] text-ink">
                      {result.title}
                    </h3>

                    <p className="mt-1 text-[12.25px] leading-snug text-ink/45">
                      {result.description}
                    </p>
                  </div>
                </div>
              </article>
            </BlurFade>
          );
        })}
      </div>
    </SectionShell>
  );
}
