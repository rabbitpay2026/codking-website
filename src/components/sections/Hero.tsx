import { Check, Star } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { HeroStage } from "@/components/sections/hero/HeroStage";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  getHomepageControls,
  getProofMetrics,
  getUtilityActions,
} from "@/lib/content";

import type { ControlSlug } from "@/types";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The checklist, in the blueprint's own order and wording.
 *
 * Two things are being reconciled here. The blueprint fixes both the sequence
 * — four items down the left column, four down the right — and the words on
 * them, three of which differ from how the control repository names the same
 * capability ("COD Rules" is *Smart* COD Rules here, "COD to Prepaid" is
 * *Prepaid Discount*, "Messaging Gateways" is *WhatsApp & SMS*). A record is
 * named for the merchant already using the admin; a hero has one line in which
 * to be understood by someone who has never seen the product.
 *
 * But the list is still validated against the repository rather than being a
 * free-standing copy (§11): every entry is resolved by slug, and one naming a
 * control that does not exist is dropped rather than rendered. So the hero can
 * never advertise a capability the feature grid below it does not carry, while
 * still reading in the order and the words the blueprint specifies.
 *
 * An entry with no `label` falls back to the record's own name, which is why
 * the four that already match carry none.
 */
const CHECKLIST: readonly { slug: ControlSlug; label?: string }[] = [
  { slug: "otp-verification" },
  { slug: "partial-cod-payment" },
  { slug: "cod-fees" },
  { slug: "cod-rules", label: "Smart COD Rules" },
  { slug: "prepaid-nudge", label: "Prepaid Discount" },
  { slug: "messaging-gateways", label: "WhatsApp & SMS" },
  { slug: "abandoned-cart-recovery" },
  { slug: "analytics", label: "Analytics & Insights" },
];

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
 * The copy is the blueprint's, verbatim — headline, supporting line, the eight
 * checklist items in their given order, and both button labels. It reads as a
 * positioning statement rather than as a paragraph of benefits, which is the
 * point: the argument is made by the device beside it, where the verification
 * that decides whether an order was ever real runs end to end. The words say
 * what the product *is*; the screen shows what it *does*.
 *
 * The premium here is deliberately achromatic. There is no colour field, no
 * gradient headline and no filled brand button anywhere in this section: the
 * only saturated things on the screen are Shopify's greens on the install
 * button and the product's own interface behind the glass. That is the whole
 * trick — when the background stops competing, type, spacing and light are
 * what the eye reads as expensive, and the one coloured thing left is the one
 * thing worth looking at.
 */
export async function Hero() {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();

  /*
    Resolved against the repository, so an entry naming a control that no
    longer exists drops out instead of rendering a promise the product does
    not keep.
  */
  const controls = getHomepageControls();
  const checklist = CHECKLIST.flatMap((item) => {
    const control = controls.find((candidate) => candidate.slug === item.slug);
    return control
      ? [{ slug: item.slug, label: item.label ?? control.name }]
      : [];
  });

  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

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
          */}
          <h1 className="text-[2.55rem] leading-[1.06] font-semibold tracking-[-0.038em] text-ink sm:text-[3.1rem] lg:text-[3.45rem]">
            Reduce Fake COD Orders.
            <span className="block">Increase Profits.</span>
          </h1>

          <p className="mt-5 max-w-md text-[1.125rem] leading-snug text-pretty text-ink/55">
            The Complete COD Management Platform for Shopify Brands
          </p>

          {/*
            Two columns rather than a wrapping row: eight short items in a flex
            row break at a different point on every viewport and the list stops
            reading as a set. Column flow rather than row flow, so the pairs
            read down each column the way the blueprint groups them, and the
            second column stays aligned at all widths — which is what makes it
            scan as a specification.
          */}
          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
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
                icon={<ShopifyMark className="size-[22px]" />}
                className="h-12 gap-2.5 bg-ink px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.24),0_10px_28px_-12px_rgba(11,27,54,0.7)] hover:bg-ink/90 hover:shadow-[0_2px_4px_rgba(11,27,54,0.24),0_14px_32px_-12px_rgba(11,27,54,0.75)]"
              />
            ) : null}

            {demoAction ? (
              <ActionLink
                action={{ ...demoAction, label: "Book Demo" }}
                size="lg"
                className="h-12 border-ink/10 bg-white/80 px-6 text-[15px] font-semibold text-ink/80 shadow-[0_1px_2px_rgba(11,27,54,0.05)] backdrop-blur-md hover:border-ink/16 hover:bg-white hover:text-ink"
              />
            ) : null}
          </div>

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
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[13px]">
            <span
              className="flex items-center gap-2"
              aria-label={`Rated ${proof.rating} out of 5`}
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
                {proof.rating}
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
