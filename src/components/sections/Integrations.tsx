import { Puzzle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routes } from "@/constants/routes";
import { getFeaturedIntegrations, getPlatformsCopy } from "@/lib/content";

/**
 * The vendor mark on a card.
 *
 * Held to one optical box rather than one height: these are five unrelated
 * marks — a wordmark under a glyph, a circle, a rounded triangle — and the only
 * thing that makes a row of them look deliberate is that each sits inside the
 * same square and touches its edges at the same distance. `object-contain`
 * inside a fixed box does that without cropping anything.
 *
 * `width`/`height` come from the record and are the rendered box, not the
 * file's intrinsic size, with the ratio exact so the row reserves its space
 * before an image has loaded. No `sizes`, deliberately: these are fixed-size
 * images, and Next only emits the small 1x/2x pair for that case when `sizes`
 * is absent.
 *
 * `alt` is empty because the provider's name is set in text directly beside it.
 */
function ProviderMark({
  logo,
  name,
}: {
  readonly logo?: { readonly src: string; width: number; height: number };
  readonly name: string;
}) {
  if (!logo) {
    return (
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center text-[13px] font-bold text-ink/40"
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span className="grid size-9 shrink-0 place-items-center">
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        className="h-auto max-h-9 w-auto max-w-9 object-contain select-none"
      />
    </span>
  );
}

/**
 * The platforms COD King connects to (§3.1).
 *
 * Compatibility sits here — after the product has been shown, before pricing —
 * because merchants check it once they are interested, not before (§4.3).
 *
 * Five cards on one row, and the fifth is the honest one. A board like this is
 * always incomplete, and a list that pretends otherwise invites the reader to
 * find the omission; naming the gap and pointing at the full page is both more
 * truthful and less work than growing the row every time a provider is added.
 *
 * The marks are the vendors' own artwork, in their own colours. That is the one
 * place on this page where saturation is the point: a merchant scanning for
 * "does it work with what I use" is looking for a logo, not reading names, and
 * a desaturated logo wall would defeat the only job this section has.
 *
 * Everything under the marks is the site's standard card — `surface-card`, one
 * radius, one shadow, one lift — so five brand palettes sit on the same surface
 * as every other card on the homepage rather than on a treatment of their own.
 *
 * Read from the integrations repository, so a provider the product does not
 * actually support cannot appear here: an integration claim is a promise, and
 * an unverified one is worse than an absent one.
 */
export function Integrations() {
  const featured = getFeaturedIntegrations();
  const copy = getPlatformsCopy();

  return (
    <SectionShell
      backdrop={<PageEnvironment />}
      containerClassName="pt-7 md:pt-8 lg:pt-9"
    >
      <SectionHeading title={copy.title} description={copy.description} />

      <ul className="mt-lede grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {featured.map((integration, index) => (
          <li key={integration.slug} className="h-full">
            <BlurFade delay={0.05 * index} className="h-full">
              <div className="group flex h-full surface-card items-start gap-3.5 rounded-[1.15rem] p-5">
                <ProviderMark logo={integration.logo} name={integration.name} />

                <div className="min-w-0">
                  <h3 className="text-[14.5px] leading-none font-semibold tracking-[-0.012em] text-ink">
                    {integration.name}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                    {integration.blurb}
                  </p>
                </div>
              </div>
            </BlurFade>
          </li>
        ))}

        {/*
          The rest, as one card rather than a second grid of near-empties. It is
          the only card here that is a link, because it is the only one making a
          claim the reader might want to check.

          Its mark is a lucide outline rather than artwork: there is no vendor to
          have supplied one, and a monochrome glyph is the honest way to say so
          beside four real logos.
        */}
        <li className="h-full">
          <BlurFade delay={0.05 * featured.length} className="h-full">
            <Link
              href={routes.integrations}
              className="group flex h-full surface-card items-start gap-3.5 rounded-[1.15rem] p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <span className="grid size-9 shrink-0 place-items-center">
                <Puzzle
                  aria-hidden
                  className="size-6 text-ink/30 transition-colors duration-300 ease-emphasized group-hover:text-brand"
                  strokeWidth={1.6}
                />
              </span>

              <div className="min-w-0">
                <h3 className="text-[14.5px] leading-none font-semibold tracking-[-0.012em] text-ink">
                  &amp; More
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                  Easy to integrate with other tools you use.
                </p>
              </div>
            </Link>
          </BlurFade>
        </li>
      </ul>
    </SectionShell>
  );
}
