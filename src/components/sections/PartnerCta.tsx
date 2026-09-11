import { Handshake } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { SectionShell } from "@/components/sections/SectionShell";
import { siteConfig } from "@/constants/site";
import { getPartnerAction } from "@/lib/content";

/**
 * The partner programme, at the foot of the homepage.
 *
 * The page above it spends every section arguing to one reader — a merchant
 * deciding whether to install. This band is addressed to the other one who
 * reaches the bottom of it: the agency, the developer or the creator who has
 * just read what the product does and is asking whether there is a way to
 * work together. Without it the only answer on the homepage is nothing, and
 * that visitor leaves.
 *
 * It is deliberately the last thing on the page rather than a slot further up.
 * A partner offer above the questions would interrupt the argument for a
 * merchant, who is the reader the page is actually for; underneath them it
 * costs that reader one band they can scroll past, and it is exactly where the
 * second reader has run out of page.
 *
 * One row and three lines, which is the whole of the restraint. This is a
 * signpost, not a programme page: what it owes a visitor is the offer in a
 * sentence and a way in, and anything more would make the homepage close on
 * something other than the product.
 *
 * Nothing here is a new surface. The panel is the one `Faq` draws directly
 * above it — same radius, same hairline, same card fill — and the button is
 * the brand-edged treatment `CtaLiveDemoStore` uses for an emphatic action
 * that is not the install. Install Free stays the only filled action on the
 * site by contract (§4.2), and this band does not compete with it.
 *
 * The action is read from the repository, so this button, the header's, the
 * drawer's and the footer's are one action with one label and one
 * destination — see `partnerAction` in `data/navigation.ts`. `ActionLink`
 * gives it the new tab, the `rel` and the "(opens in a new tab)" announcement
 * every outbound action on the site honours.
 */
export function PartnerCta() {
  const action = getPartnerAction();

  return (
    <SectionShell size="compact" ariaLabel="Partner with COD King">
      <div className="rounded-[20px] border border-border bg-card p-6 lg:p-8">
        {/*
          Words left, the way in right, and stacked below `md` — where a
          button beside a two-line paragraph leaves neither enough measure to
          read as its own thing. `items-start` on the stack and `md:items-center`
          on the row, so the button sits on the block's optical centre once the
          two are side by side rather than hanging from its first line.
        */}
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
              <span aria-hidden className="h-px w-6 bg-brand/40" />
              Partner programme
            </p>

            <h2 className="mt-3 text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.5rem]">
              Send merchants our way, and earn on every one
            </h2>

            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-pretty text-muted-foreground">
              Agencies, developers and creators who bring Shopify stores to{" "}
              {siteConfig.name} earn a share of what those stores spend — for as
              long as they stay.
            </p>
          </div>

          <ActionLink
            action={action}
            size="lg"
            location="homepage-partner-cta"
            icon={<Handshake aria-hidden className="size-[18px]" />}
            className="shrink-0 gap-2.5 border-brand/25 bg-white px-5 text-[14px] font-semibold text-brand shadow-[0_1px_2px_rgba(11,27,54,0.06),0_12px_30px_-14px_var(--brand)] hover:border-brand/45 hover:bg-brand-soft hover:text-brand-deep"
          />
        </div>
      </div>
    </SectionShell>
  );
}
