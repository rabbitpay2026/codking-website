"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PreviewMock } from "@/components/sections/preview/PreviewMocks";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BorderBeam } from "@/components/ui/border-beam";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Noise } from "@/components/ui/noise";
import { Spotlight } from "@/components/ui/spotlight";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { Control, ProductPreviewPanel } from "@/types";

type Panel = ProductPreviewPanel & { readonly control: Control };

interface ProductPreviewProps {
  readonly panels: readonly Panel[];
}

/**
 * The interactive product preview.
 *
 * The one section that answers "what does it actually look like", placed
 * straight after the feature showcase so a merchant who has just read what
 * the controls do can see them working before being asked for anything.
 *
 * This is the page's single dark band, and it is dark on purpose: after five
 * light sections the eye needs a change of room, and a product shot reads
 * brightest against darkness. A second dark section would just be stripes, so
 * there is exactly one.
 *
 * The band is scoped `dark` rather than styled with fixed colours — the class
 * flips the token layer for the subtree, so every child, including the shared
 * heading, renders its dark values without knowing where it is. A spotlight
 * from above gives the surface a top and a bottom; an unlit dark panel reads
 * as a hole in the page.
 *
 * Panels are resolved on the server and passed in, so the client bundle
 * carries the interaction and not the content lookups.
 */
export function ProductPreview({ panels }: ProductPreviewProps) {
  const first = panels[0];
  if (!first) return null;

  return (
    <SectionShell
      tone="dark"
      size="spacious"
      variant="slab"
      backdrop={
        <>
          <Spotlight size="tall" />
          <GridPattern
            width={64}
            height={64}
            className={cn(
              "absolute inset-0 h-full stroke-white/[0.055]",
              "[mask-image:radial-gradient(75%_60%_at_50%_30%,white,transparent)]",
            )}
          />
          <Noise className="opacity-[0.05]" />
        </>
      }
    >
      <SectionHeading
        eyebrow="See it working"
        title="What it looks like on a real store"
        description="No theme changes, no code. The controls run inside your existing Shopify checkout."
      />

      <Tabs
        defaultValue={first.controlSlug}
        className="mt-14 items-center lg:mt-16"
      >
        <TabsList className="border-white/12 bg-white/5 backdrop-blur-xl">
          {panels.map((panel) => (
            <TabsTrigger key={panel.controlSlug} value={panel.controlSlug}>
              {panel.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {panels.map((panel) => (
          <TabsContent
            key={panel.controlSlug}
            value={panel.controlSlug}
            className="w-full"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
              <BorderBeam
                size={260}
                duration={10}
                colorFrom="var(--brand)"
                colorTo="var(--brand-check)"
              />

              <div className="grid items-center gap-10 p-7 lg:grid-cols-2 lg:gap-16 lg:p-12">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
                    {panel.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
                    {panel.body}
                  </p>

                  <Link
                    href={panel.href}
                    className="group mt-7 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand-accent transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    Read about {panel.control.name}
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-card/60 shadow-overlay backdrop-blur-xl">
                  <div
                    aria-hidden
                    className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3"
                  >
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="ml-2 text-[10px] text-muted-foreground">
                      {panel.control.name}
                    </span>
                  </div>

                  <PreviewMock slug={panel.controlSlug} />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </SectionShell>
  );
}
