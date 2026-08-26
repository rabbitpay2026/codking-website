import { AddressPanel } from "@/components/product/address-validation/AddressPanel";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The hero's product scene.
 *
 * The checkout, and nothing beside it. The floating annotation chips that used
 * to sit in a column to the right are gone from every feature page: they were
 * the same object on all four, they cost the panel a third of its width, and
 * what they said was already in the hero checklist two columns to the left.
 *
 * This page in particular could not afford them. Its panel is a *form* — five
 * labelled fields, a step rail and a button — and a form squeezed into two
 * thirds of a column is the one product scene where the loss is legible as
 * cramped rather than as small.
 */
export function AddressValidationScene({ className }: WithClassName) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Key light, so the panel is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 44% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <AddressPanel className="mx-auto w-full max-w-[25rem] lg:mx-0 lg:max-w-none" />
    </div>
  );
}
