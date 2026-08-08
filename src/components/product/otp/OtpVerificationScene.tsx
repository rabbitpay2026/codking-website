import { CheckoutMock } from "@/components/product/otp/CheckoutMock";
import { OtpVerificationPanel } from "@/components/product/otp/OtpVerificationPanel";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The product scene: a checkout, and the verification standing in front of it.
 *
 * Two objects and one relationship. The checkout is the merchant's existing
 * screen, drawn quiet and pushed back; the verification is the only thing on
 * the page that belongs to us, so it is the sharpest, the brightest and the
 * one in front. A visitor should understand the arrangement before reading a
 * word: *this is what we add to what you already have*.
 *
 * The panel is in normal flow and the checkout is positioned against it, which
 * is the reason this survives every column width. Done the other way round —
 * checkout in flow, panel floated over it — the scene's height would be set by
 * the shorter of the two and the panel would hang out of the section at the
 * one breakpoint nobody checked.
 *
 * Below `sm` the checkout is dropped rather than shrunk. There is no width at
 * which two overlapping cards both stay legible on a phone, and a scene where
 * neither can be read argues against the craft it exists to demonstrate — so
 * the phone gets the one object that matters, at full size.
 */
export function OtpVerificationScene({ className }: WithClassName) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Key light, so the panel is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 62% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      {/*
        The merchant's checkout, behind.

        Given a height of its own rather than stretched to the panel's, so the
        verification overhangs it top and bottom. Two cards ending on the same
        line read as a pair; one standing proud of the other reads as the thing
        in front — which is the entire relationship this scene exists to state.
      */}
      <CheckoutMock
        chrome
        className="absolute top-1/2 left-0 hidden h-[19rem] w-[66%] -translate-y-1/2 sm:flex"
      />

      {/*
        Ours, in front.

        It takes a larger share of the scene from `lg` up, where the scene
        itself is the narrower of the hero's two columns. The six code fields
        set a floor on how narrow this panel can get before the digits stop
        looking like a keypad, and that floor matters more than keeping the
        overlap at a constant ratio.
      */}
      <div className="relative mx-auto w-full max-w-[22rem] sm:mr-0 sm:ml-[44%] sm:w-[56%] sm:max-w-none lg:ml-[40%] lg:w-[60%]">
        <OtpVerificationPanel />
      </div>
    </div>
  );
}
