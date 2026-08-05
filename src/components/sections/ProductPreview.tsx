"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PreviewMock } from "@/components/sections/preview/PreviewMocks";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BorderBeam } from "@/components/ui/border-beam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Control, ProductPreviewPanel } from "@/types";

type Panel = ProductPreviewPanel & { readonly control: Control };

interface ProductPreviewProps {
  readonly panels: readonly Panel[];
}

/**
 * The interactive product preview.
 *
 * This is the one section that answers "what does it actually look like",
 * placed immediately after the feature showcase so a merchant who has just
 * read what the controls do can see them working before being asked for
 * anything.
 *
 * The band is scoped `dark` rather than styled with hardcoded colours: the
 * class flips the token layer for this subtree, so every child — including
 * the shared section heading — renders its dark values without knowing it is
 * on a dark surface. One dark band gives a long page a spine; a second one
 * would just be stripes.
 *
 * Panels are resolved on the server and passed in, so the client bundle
 * carries the interaction and not the content lookups.
 */
export function ProductPreview({ panels }: ProductPreviewProps) {
  const first = panels[0];
  if (!first) return null;

  return (
    <section className="dark bg-background py-20 text-foreground lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="See it working"
          title="What it looks like on a real store"
          description="No theme changes, no code. The controls run inside your existing Shopify checkout."
        />

        <Tabs
          defaultValue={first.controlSlug}
          className="mt-12 items-center lg:mt-14"
        >
          <TabsList>
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
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
                <BorderBeam
                  size={220}
                  duration={9}
                  colorFrom="var(--brand)"
                  colorTo="var(--brand-check)"
                />

                <div className="grid items-center gap-8 p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-balance">
                      {panel.headline}
                    </h3>
                    <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">
                      {panel.body}
                    </p>

                    <Link
                      href={panel.href}
                      className="mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand-accent transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      Read about {panel.control.name}
                      <ArrowRight aria-hidden className="size-3.5" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/40">
                    <div
                      aria-hidden
                      className="flex items-center gap-1.5 border-b border-border px-4 py-3"
                    >
                      <span className="size-2 rounded-full bg-muted-foreground/30" />
                      <span className="size-2 rounded-full bg-muted-foreground/30" />
                      <span className="size-2 rounded-full bg-muted-foreground/30" />
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
      </Container>
    </section>
  );
}
