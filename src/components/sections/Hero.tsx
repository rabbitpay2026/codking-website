import Image from "next/image";

import { Check, Star, Store } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { HeroStage } from "@/components/sections/hero/HeroStage";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  getDemoStoreAction,
  getHomepageFeatures,
  getProofMetrics,
  getUtilityActions,
} from "@/lib/content";
import { formatRating } from "@/utils/format";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The homepage hero.
 *
 * Nothing here fades in. Entrance animation on the first thing a visitor sees
 * buys nothing and risks everything: the reveal components start at
 * `opacity: 0` and depend on JavaScript to undo it, so a slow hydration, a
 * failed chunk or a blocked script leaves the most important screen on the
 * site blank. Below the fold that trade is fine, because the content has
 * scrolled into view by the time it matters. Here it is not.
 *
 * The copy is the blueprint's, verbatim — headline, supporting line, the
 * checklist items in their given order, and both button labels. It reads as a
 * positioning statement rather than as a paragraph of benefits, which is the
 * point: the argument is made by the device beside it, where the verification
 * that decides whether an order was ever real runs end to end. The words say
 * what the product *is*; the screen shows what it *does*.
 *
 * The premium here is deliberately achromatic. There is no colour field, no
 * gradient and no filled brand button anywhere in this section: the accent on
 * the headline is flat colour, and the only saturated things left are
 * Shopify's greens on the install button, the brand edge on the storefront
 * button, and the product's own interface behind the glass. That is the whole
 * trick — when the background stops competing, type, spacing and light are
 * what the eye reads as expensive, and the one coloured thing left is the one
 * thing worth looking at.
 */
export async function Hero() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();

  /*
    The homepage's one feature list, resolved against the repository — so an
    entry naming a control that no longer exists drops out instead of
    rendering a promise the product does not keep, and this checklist can
    never differ from the capability board further down the page.
  */
  const checklist = getHomepageFeatures();
  const rating = formatRating(proof.rating);

  const installAction = actions.find((action) => action.variant === "primary");

  /*
    The secondary action is the storefront, not the booker.

    It used to be Book a Demo, which is a request to speak to a person — the
    slowest thing a hero can ask for, and the one a merchant evaluating a COD
    app at eleven at night will not do. The store is already built and already
    linked from the closing band, so the hero now offers the same action under
    the same label: a real Shopify checkout they can take themselves, with
    nothing to install and nobody to talk to. Read from the repository so the
    two buttons cannot drift apart.
  */
  const demoStoreAction = getDemoStoreAction();

  return (
    <SectionShell
      containerClassName="pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14"
      backdrop={<HeroEnvironment />}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        <div className="max-w-xl">
          {/*
            The blueprint's two lines, verbatim, and broken where it breaks
            them. `text-balance` is deliberately not used here: it would
            re-wrap the pair wherever the measure happens to land and the
            headline would stop being the two statements the blueprint makes.

            The accent is the site's one headline treatment, not a new one:
            every other hero on the site — the feature pages, About, the OTP
            page — sets its accent phrase in flat `text-brand` beside black,
            and this does the same on the phrase the whole product is named
            for. Flat colour rather than a gradient, because a gradient
            headline is a different decision and this section does not make it.
          */}
          <h1 className="text-[2.55rem] leading-[1.06] font-semibold tracking-[-0.038em] text-ink sm:text-[3.1rem] lg:text-[3.45rem]">
            Reduce <span className="text-brand">Fake COD Orders.</span>
            <span className="block">Increase Profits.</span>
          </h1>

          <p className="mt-5 max-w-md text-[1.125rem] leading-snug text-pretty text-ink/55">
            The Complete COD Management Platform for Shopify Brands
          </p>

          {/*
            Two columns rather than a wrapping row: ten short items in a flex
            row break at a different point on every viewport and the list stops
            reading as a set. Column flow rather than row flow, so the pairs
            read down each column, and the second column stays aligned at all
            widths — which is what makes it scan as a specification.

            Five rows rather than four, because the list is ten long since the
            review added prefilled addresses and COD verification to it. The
            row count is stated rather than left to `auto` so the list fills
            the first column before it starts the second.
          */}
          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5">
            {checklist.map((item) => (
              <li key={item.slug} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-check/14 ring-1 ring-brand-check/25 ring-inset"
                >
                  <Check className="size-2.5 text-ink/60" strokeWidth={3} />
                </span>
                <span className="text-[13.5px] leading-none font-medium text-ink/75">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {installAction ? (
              /*
                Ink, not brand. A filled blue button under a headline this
                large is the loudest thing in the frame, and the loudest thing
                in the frame should be the product. Weight comes from the
                near-black fill and a shadow that reads as a lifted object;
                the only colour on it is Shopify's own mark, which is the one
                piece of information worth colouring.
              */
              <ActionLink
                action={{ ...installAction, label: "Install Free on Shopify" }}
                size="lg"
                location="homepage-hero"
                icon={<ShopifyMark className="size-[22px]" />}
                className="h-12 gap-2.5 bg-ink px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.24),0_10px_28px_-12px_rgba(11,27,54,0.7)] hover:bg-ink/90 hover:shadow-[0_2px_4px_rgba(11,27,54,0.24),0_14px_32px_-12px_rgba(11,27,54,0.75)]"
              />
            ) : null}

            {/*
              Filled, in brand, and named for what it does.

              Two passes at this were rejected for the same reason. It began as
              80% white on a near-white field with its label at 80% ink, which
              read as a disabled control; the next pass gave it a white surface
              and a brand edge, which read as an outline beside a solid. The
              instruction both times was that the second action has to look
              like an action, so it now carries a fill of its own.

              It is still not the install button and cannot be mistaken for it.
              Weight here is the same, but colour is doing the separating: the
              install is near-black with Shopify's greens on it, this is the
              brand's violet with a storefront on it. A merchant reads two
              different errands off the pair before reading either label — one
              installs the app, one opens a shop.

              Violet rather than blue, and it is the one non-blue this button
              could have taken. `--brand-violet` is the colour the wordmark at
              the top of the page is set in — the palette keeps it precisely so
              there is an accent to reach for when blue is doing something else
              — so the second action is tied to the brand rather than to a
              colour picked to be different. Blue was also the wrong separator
              here: it is the site's action colour, spent on links, the
              checklist and the product's own interface behind the glass, so a
              blue button beside a black one read as one action drawn twice.

              The hover is mixed off the same token rather than typed as a
              second hex, so there is exactly one violet in the file and the
              pressed state cannot drift from the resting one.

              The label is the whole point of the change. "Book a Demo" asks
              for a meeting, which is the slowest thing a hero can ask for and
              the one a merchant evaluating a COD app at eleven at night will
              not do. "Explore Live Demo Store" says exactly what the press
              produces: a real storefront, open now, asking nothing.

              Overridden here rather than in the repository, the way the
              install action's label is: the closing band offers the same store
              inside a block that has already introduced it by name, and needs
              the shorter label it has.
            */}
            <ActionLink
              action={{
                ...demoStoreAction,
                label: "Explore Live Demo Store",
              }}
              size="lg"
              location="homepage-hero"
              icon={<Store aria-hidden className="size-[18px]" />}
              className="h-12 gap-2.5 border-transparent bg-brand-violet px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(109,74,255,0.3),0_10px_28px_-12px_rgba(109,74,255,0.85)] hover:border-transparent hover:bg-[color-mix(in_oklab,var(--brand-violet)_86%,black)] hover:text-white hover:shadow-[0_2px_4px_rgba(109,74,255,0.3),0_14px_32px_-12px_rgba(109,74,255,0.9)]"
            />
          </div>

          {/*
            The Built for Shopify badge.

            Directly under the two buttons, because that is what it qualifies:
            the sentence a merchant is reading at that moment is "install
            this", and "Built for Shopify" is the answer to the question that
            follows it. Above the buttons it would be an eyebrow competing with
            the headline; beside them it would push the pair onto two lines on
            a narrow screen. It costs one line of height and no layout at any
            width.

            Drawn to the badge Shopify awards rather than to this site's
            eyebrow pill, which is what it was first built as: a soft blue
            tile, a squared radius rather than a capsule, the diamond, and the
            programme's name set in sentence case in ink. That distinction
            matters — an eyebrow is this site talking about itself, and this is
            a mark the platform grants, so it should not look like the former.

            The diamond is the supplied artwork in `public/logos`, placed
            rather than drawn. An earlier pass substituted an icon-library gem
            for it, and that is the one substitution this badge cannot take:
            the diamond is the programme's mark, and a lookalike traced from a
            different icon set is the same class of mistake as redrawing
            Shopify's bag. This component therefore draws nothing — it places
            the file at the size the badge wants.

            `width`/`height` are the rendered box rather than the file's
            intrinsic 512×512, and there is deliberately no `sizes`: this is a
            fixed-size image, and omitting `sizes` is what makes Next emit a
            small 1x/2x pair instead of the full responsive candidate list. The
            ratio is square, matching the source, so the box is reserved
            correctly and the row cannot shift as the file lands.

            `alt` is empty because the badge's own text names it — labelling
            both would have a screen reader announce Shopify twice.
          */}
          <p className="mt-5 inline-flex items-center gap-2 rounded-[10px] border border-brand/25 bg-brand/[0.09] px-3.5 py-2 text-[13px] leading-none font-semibold tracking-[-0.005em] text-ink">
            <Image
              src="/logos/diamond.png"
              alt=""
              width={18}
              height={18}
              className="size-[18px] shrink-0"
            />
            Built for Shopify
          </p>

          {/*
            The credentials rail.

            Three countable facts on one line, separated by hairlines rather
            than boxed into cards. Boxes would make three small numbers look
            like a dashboard; a single quiet line reads as a record — which is
            what it is.

            Every figure is the proof repository (§11.1), never a literal: the
            rating a visitor reads here is the same one the reviews section
            renders, and neither can drift from the App Store sync when it
            lands.
          */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[13px]">
            <span
              className="flex items-center gap-2"
              aria-label={`Rated ${rating} out of 5`}
            >
              <span aria-hidden className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="size-[15px] fill-[#f5a623] text-[#f5a623]"
                  />
                ))}
              </span>
              <span className="font-semibold text-ink tabular-nums">
                {rating}
              </span>
              <span className="text-ink/45">rating</span>
            </span>

            <span aria-hidden className="h-3.5 w-px bg-ink/12" />

            <span className="text-ink/55">
              <span className="font-semibold text-ink tabular-nums">
                {numberFormat.format(proof.reviewCount)}+
              </span>{" "}
              reviews
            </span>

            <span aria-hidden className="h-3.5 w-px bg-ink/12" />

            <span className="text-ink/55">
              <span className="font-semibold text-ink tabular-nums">
                {numberFormat.format(proof.merchantCount)}+
              </span>{" "}
              merchants
            </span>
          </div>
        </div>

        <HeroStage />
      </div>
    </SectionShell>
  );
}
