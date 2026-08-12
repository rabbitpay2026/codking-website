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
      className="border-t border-[#ECEFF3]"
      containerClassName="pt-4 pb-8 md:pt-5 md:pb-10"
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
      <SectionHeading title="Results Our Merchants Achieve" />

      <div className="mt-lede grid gap-4 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-4">
        {RESULTS.map((result, index) => {
          const Icon = result.icon;

          return (
            <BlurFade
              key={result.title}
              delay={0.06 * index}
              className="h-full"
            >
              <article className="group flex h-[118px] items-center rounded-[1.05rem] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-emphasized)] hover:-translate-y-0.5 hover:border-[#D9DFE8] hover:shadow-[0_6px_18px_-16px_rgba(15,23,42,0.12)] sm:p-6">
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
