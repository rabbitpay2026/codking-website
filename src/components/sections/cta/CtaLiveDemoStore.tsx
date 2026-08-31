import { Check, Lock, Store } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { demoStoreDisplayHost } from "@/constants/external";
import { siteConfig } from "@/constants/site";
import { getDemoStoreAction } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The live demo storefront, offered at the foot of the closing panel.
 *
 * Every other proof on this page is something the merchant is shown. This is
 * the one thing they can go and do, which is why it closes the band rather
 * than sitting among the sections that argue: a merchant who has read this far
 * and still wants to see it working can, in a real store, without installing
 * anything or speaking to anyone.
 *
 * It is not the Book a Demo action and must never be wired to one. That action
 * is a request to talk to a person and is reserved for the booking tool that
 * will answer it; this is a storefront. They ask for different things from
 * different people, and collapsing them would lose whichever merchant wanted
 * the other one.
 *
 * Nothing on it is a claim. The card is a payment step with cash on delivery
 * selected — the one thing every visitor to that store will see — and there is
 * no figure, no rating and no recording anywhere in the block. In particular
 * there is no poster frame and no play button: this button opens a store, and
 * a control that looked like it played something would be a lie about what
 * happens when it is pressed.
 *
 * A server component, like its siblings in this folder: no state, no effects,
 * nothing shipped to the browser.
 */
export function CtaLiveDemoStore({ className }: WithClassName) {
  /*
    Read from the repository rather than declared here, so this button and the
    homepage hero's secondary action are literally the same action — one label,
    one destination. It is deliberately not part of `utilityActions`; see
    `demoStoreAction` for why. `ActionLink` still renders it, so the new tab,
    the `rel` and the "(opens in a new tab)" announcement are the same contract
    every other outbound action on the site honours.
  */
  const action = getDemoStoreAction();

  return (
    <div
      className={cn(
        "@container relative isolate overflow-hidden border-t border-border pt-7 lg:pt-8",
        className,
      )}
    >
      <StoreField />

      {/*
        The card leads on a wide row and follows on a narrow one.

        `@2xl` is the container's own width, not the viewport's: this block is
        the full measure of the closing panel, which is wider than the column
        beside it and narrower than the page, so a viewport breakpoint would
        flip it at the wrong moment on a tablet.
      */}
      <div className="flex flex-col gap-6 @2xl:flex-row @2xl:items-center @2xl:gap-9">
        <StorefrontCard />

        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
            <span aria-hidden className="h-px w-6 bg-brand/40" />
            Live demo store
          </p>

          <h3 className="mt-3.5 text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.5rem]">
            See {siteConfig.name} in Action
          </h3>

          <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-pretty text-muted-foreground">
            Open a real Shopify storefront running {siteConfig.name} and take
            the cash-on-delivery checkout yourself — the same flow your buyers
            would.
          </p>

          {/*
            Emphatic, but still not filled. Install Free is the only solid
            action on the site by contract (§4.2), and it sits a few inches
            above this one inside the same panel — a second filled button here
            would make the page ask for two things at once. A brand edge, a
            brand label and a lifted shadow carry the weight instead.
          */}
          <ActionLink
            action={action}
            size="md"
            location="live-demo-store"
            icon={<Store aria-hidden className="size-[17px]" />}
            className={cn(
              "mt-5 gap-2.5 border-brand/25 bg-white px-4 text-[14px] font-semibold text-brand",
              "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_12px_30px_-14px_var(--brand)]",
              "hover:border-brand/45 hover:bg-brand-soft hover:text-brand-deep",
            )}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The light this block stands in.
 *
 * Gradients only, every one of them ending in `transparent`, for the reason
 * `CtaOrderProtection` gives at length: the panel around this is already a
 * bordered surface, and a filled rectangle inside it would be the second frame
 * this band was rebuilt to stop drawing. With no flat wash there is no edge to
 * see, so the field reads as light falling across the foot of the panel rather
 * than as another card laid on top of it.
 */
function StoreField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: [
          "radial-gradient(40% 62% at 18% 50%, color-mix(in oklab, var(--brand) 9%, transparent), transparent 72%)",
          "radial-gradient(36% 56% at 84% 46%, color-mix(in oklab, var(--brand-violet) 6%, transparent), transparent 70%)",
        ].join(","),
      }}
    />
  );
}

/**
 * The storefront, as the visitor will find it.
 *
 * Browser chrome and a payment step, drawn in markup for the same reasons the
 * rest of the product UI on this page is: it is sharp at any density, costs no
 * image bytes, its type is real type, and it is themed by the same tokens as
 * everything around it — so it cannot drift out of step the way a flat export
 * does the first time a colour changes.
 *
 * The address pill carries the host and not the full URL. `codking.store` is
 * the part a merchant can recognise and repeat; the product path and its
 * variant id are noise at this size, and the link itself already carries them.
 *
 * The second payment row is present and unselected on purpose. A selector with
 * one option in it is not a selector, and the choice is the whole point of the
 * store — cash on delivery is what the visitor is invited to take, but it is a
 * choice they make, exactly as a buyer would.
 */
function StorefrontCard() {
  return (
    <div
      role="img"
      aria-label={`The ${demoStoreDisplayHost} demo storefront at the payment step, with cash on delivery selected.`}
      className={cn(
        "relative z-10 w-full shrink-0 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white @2xl:w-[17.5rem]",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.45)]",
      )}
    >
      {/* Chrome. Three dots and a host, which is all a window needs to be one. */}
      <div className="flex items-center gap-2.5 border-b border-ink/[0.06] px-3 py-2.5">
        <span aria-hidden className="flex shrink-0 gap-1">
          <span className="size-1.5 rounded-full bg-ink/[0.13]" />
          <span className="size-1.5 rounded-full bg-ink/[0.13]" />
          <span className="size-1.5 rounded-full bg-ink/[0.13]" />
        </span>

        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-ink/[0.04] px-2 py-1">
          <Lock aria-hidden className="size-2.5 shrink-0 text-ink/35" />
          <span className="truncate text-[9.5px] leading-none font-medium text-ink/55">
            {demoStoreDisplayHost}
          </span>
        </span>
      </div>

      <div className="px-3 py-3">
        <p className="text-[8.5px] leading-none font-bold tracking-[0.1em] text-ink/35 uppercase">
          Payment method
        </p>

        <div className="mt-2.5 space-y-1.5">
          <div className="flex items-center gap-2 rounded-xl border border-brand/25 bg-brand/[0.05] px-2.5 py-2">
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full border-[3px] border-brand bg-white">
              <span className="size-1 rounded-full bg-brand" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] leading-none font-semibold text-ink">
              Cash on delivery
            </span>
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-brand-check">
              <Check
                aria-hidden
                className="size-2 text-white"
                strokeWidth={4}
              />
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-ink/[0.07] px-2.5 py-2">
            <span className="size-3.5 shrink-0 rounded-full border border-ink/15" />
            <span className="min-w-0 flex-1 truncate text-[11px] leading-none font-medium text-ink/45">
              Pay online
            </span>
          </div>
        </div>

        <div aria-hidden className="mt-3 h-px bg-ink/[0.07]" />

        <p className="mt-2.5 flex items-center gap-1.5 text-[9.5px] leading-none font-medium text-ink/40">
          <Lock aria-hidden className="size-2.5" />
          Checkout protected by{" "}
          <span className="font-bold text-ink/60">{siteConfig.name}</span>
        </p>
      </div>
    </div>
  );
}
