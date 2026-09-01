import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { getIntegrationsByCategory } from "@/lib/content";

/**
 * The payment-gateway showcase, as a subsection of the integrations band.
 *
 * It sits under the marketing-and-communication board rather than in a section
 * of its own, because it answers the same merchant question that board does —
 * "does this work with what I already use?" — and a second full band asking it
 * again would be the page repeating itself.
 *
 * ── On what these four marks mean ─────────────────────────────────────────
 * They are examples, and every word around them is written to keep them that
 * way. The confirmed product position is that a merchant uses whichever
 * gateway they prefer, so this block must never read as a compatibility list:
 * a merchant on a gateway not shown here has to come away certain the product
 * still works for them, not wondering. That is why the heading is about *their*
 * gateway rather than about ours, why the description says the choice is
 * theirs before a single logo is reached, and why the row ends in a card that
 * names no provider at all.
 *
 * The alternative — four logos under a heading like "Supported gateways" —
 * would be a claim the product does not make, and the expensive kind of wrong:
 * it loses the merchant it excludes silently.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Read from the integrations repository by category, so the four names live in
 * one place with the reasoning beside them rather than being typed into markup
 * here.
 *
 * A server component: no state, no effects, nothing shipped to the browser.
 */
export function PaymentGateways() {
  const gateways = getIntegrationsByCategory("payment-gateway");

  if (gateways.length === 0) {
    return null;
  }

  return (
    <div className="mt-14 md:mt-16">
      {/*
        The subsection's own heading, set here rather than by `SectionHeading`.

        Not for want of trying it: that component decouples the heading level
        from the type scale on purpose, so `as="h3"` gives the correct outline
        at the *section* size — 3rem on a desktop, identical to the `h2` this
        block sits under. Two headings at the same size are two sections, and
        the whole argument for putting payments here rather than in a band of
        its own is that this one is subordinate.

        So the elements below mirror `SectionHeading` exactly — same eyebrow
        rule and tracking, same centred measure, same rhythm — at roughly two
        thirds the scale. Changing `SectionHeading` itself would have reached
        every other section on the site to fix a problem local to this one.
      */}
      <div className="mx-auto flex max-w-3xl flex-col text-center">
        <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
          <span aria-hidden className="h-px w-6 bg-brand/40" />
          Payment gateways
          <span aria-hidden className="h-px w-6 bg-brand/40" />
        </p>

        {/*
          The accent is the page's one heading treatment, at this heading's
          smaller scale: the phrase in `text-brand`, the rest in ink. Set inline
          rather than read from a repository because this subsection holds its
          own copy — there is no stored record for a rewording to drift from.
        */}
        <h3 className="mt-4 text-[1.5rem] leading-[1.1] font-semibold tracking-[-0.028em] text-balance text-ink sm:text-[1.75rem] lg:text-[2rem]">
          Works with your{" "}
          <span className="text-brand">preferred payment gateway</span>
        </h3>

        <p className="mt-4 text-[14px] leading-relaxed text-pretty text-muted-foreground sm:text-[15px]">
          Prepaid and partial payments are collected through the gateway you
          already use, connected once from the COD King dashboard. A few that
          merchants commonly run:
        </p>
      </div>

      {/*
        One row on a desktop, two by two on a tablet, stacked on a phone. The
        fifth cell is the honest one and it comes last in every layout, so the
        sentence the row makes — four examples, then "and others" — survives
        the reflow rather than depending on where the grid happens to break.
      */}
      <ul className="mt-lede grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {gateways.map((gateway, index) => (
          <li key={gateway.slug} className="h-full">
            <BlurFade delay={0.05 * index} className="h-full">
              {/*
                The mark alone, centred, on the site's own card. No name in
                text beside it: each of these is a wordmark that already sets
                the provider's name in the provider's own type, and repeating
                it underneath would say the same thing twice in two fonts.

                `title` rather than a visible label, and a real `alt`, so the
                name is still available to anyone who cannot see the artwork.
              */}
              <div className="flex h-full surface-card items-center justify-center rounded-[1.15rem] px-5 py-6">
                {gateway.logo ? (
                  <Image
                    src={gateway.logo.src}
                    alt={gateway.name}
                    title={gateway.name}
                    width={gateway.logo.width}
                    height={gateway.logo.height}
                    className="h-auto max-h-7 w-auto max-w-[7.5rem] object-contain select-none"
                  />
                ) : (
                  <span className="text-[14.5px] font-semibold tracking-[-0.012em] text-ink">
                    {gateway.name}
                  </span>
                )}
              </div>
            </BlurFade>
          </li>
        ))}

        {/*
          The fifth card, and the point of the row.

          Not a link, and that is deliberate: `& More` on the board above goes
          to the integrations page because there is a list there to check, and
          there is no equivalent list of payment gateways to send anyone to —
          the answer is "the one you already use", not a longer roster. A link
          promising otherwise would be worse than no link.

          It spans both columns on the narrow layouts, where four cards make
          two clean rows and a fifth would otherwise sit half-width beside a
          gap. On a desktop it is the fifth cell of five.
        */}
        <li className="col-span-2 h-full lg:col-span-1">
          <BlurFade delay={0.05 * gateways.length} className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-[1.15rem] border border-dashed border-ink/12 bg-transparent px-5 py-6 text-center">
              <p className="text-[14.5px] leading-none font-semibold tracking-[-0.012em] text-ink">
                & others
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                Use whichever gateway you prefer.
              </p>
            </div>
          </BlurFade>
        </li>
      </ul>

      {/*
        Said once more in plain words, under the row.

        Redundant with the description above on purpose. A logo wall is skimmed,
        not read, and the one misreading this block can produce — "these four
        and no others" — is the one worth spending a line to prevent at the
        exact point the reader has finished looking at the logos.

        The marks stay each vendor's property, and saying so is both accurate
        and the ordinary courtesy of showing someone else's brand.
      */}
      <p className="mt-6 text-center text-[12.5px] leading-relaxed text-pretty text-ink/45">
        Shown as examples, not a supported-provider list — COD King does not
        restrict which gateway you connect. All marks belong to their respective
        owners.
      </p>
    </div>
  );
}
